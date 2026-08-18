import { initializeApp, deleteApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  inMemoryPersistence,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  set,
  remove,
  update,
  onValue
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-database.js";

const config = window.OT_FIREBASE_CONFIG || {};
const configured = Boolean(
  config.apiKey &&
  !String(config.apiKey).includes("PASTE_FIREBASE_WEB_API_KEY") &&
  config.databaseURL &&
  config.projectId
);

let app = null;
let auth = null;
let db = null;
let appDataUnsub = null;
let accountsUnsub = null;
let suppressRealtimeDispatch = false;

const DIRECTORY_KEY = "hrFirebaseAccountDirectoryV1";
const CLOUD_KEY_PREFIX = "hr";
// Stored outside the hr* namespace so cloud hydration never deletes it.
// This protects a save if the user refreshes immediately or the network briefly fails.
const PENDING_WRITE_KEY = "otFirebasePendingWritesV2";

function readPendingWrites(){
  try{
    const value=JSON.parse(localStorage.getItem(PENDING_WRITE_KEY)||"{}");
    return value && typeof value==="object" ? value : {};
  }catch{return {};}
}

function writePendingWrites(rows){
  const value=rows && typeof rows==="object" ? rows : {};
  if(Object.keys(value).length)localStorage.setItem(PENDING_WRITE_KEY,JSON.stringify(value));
  else localStorage.removeItem(PENDING_WRITE_KEY);
}

function queuePendingWrite(key,entry){
  const rows=readPendingWrites();
  rows[key]={...entry,queuedAt:new Date().toISOString()};
  writePendingWrites(rows);
}

function clearPendingWrite(key){
  const rows=readPendingWrites();
  if(!Object.prototype.hasOwnProperty.call(rows,key))return;
  delete rows[key];
  writePendingWrites(rows);
}

function usernameToEmail(username){
  const raw = String(username || "").trim().toLowerCase();
  if(raw.includes("@")) return raw;
  return `${raw}@otmonitoring.local`;
}

function normalizeUsername(username){
  return String(username || "").trim().toLowerCase();
}

function firebaseErrorMessage(error){
  const code = String(error?.code || "");
  if(code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) return "Invalid username or password.";
  if(code.includes("email-already-in-use")) return "That email/username already exists in Firebase Authentication.";
  if(code.includes("weak-password")) return "Password is too weak. Use at least 6 characters.";
  if(code.includes("invalid-email")) return "Invalid Firebase Authentication email/username.";
  if(code.includes("operation-not-allowed")) return "Email/Password sign-in is not enabled in Firebase Authentication. Enable it under Authentication → Sign-in method.";
  if(code.includes("too-many-requests")) return "Firebase temporarily blocked sign-in attempts because there were too many requests. Wait a moment and try again.";
  if(code.includes("unauthorized-domain")) return "This website domain is not authorized in Firebase Authentication settings.";
  if(code.includes("operation-not-supported-in-this-environment")) return "Firebase Authentication cannot run from this page environment. Open the app through localhost, GitHub Pages, or Firebase Hosting instead of file://.";
  if(code.includes("network-request-failed")) return "Cannot reach Firebase. Check the internet connection.";
  if(code.includes("permission-denied")) return "Firebase Authentication may be valid, but Realtime Database access was denied. Publish the included database.rules.json rules.";
  if(code.includes("invalid-api-key")) return "The Firebase Web API Key is missing or invalid.";
  return error?.message || "Firebase operation failed.";
}

function isAppStorageKey(key){
  return String(key || "").startsWith(CLOUD_KEY_PREFIX) && key !== DIRECTORY_KEY;
}

function clearLocalAppKeys(){
  const keys=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(isAppStorageKey(key))keys.push(key);
  }
  keys.forEach(key=>localStorage.removeItem(key));
}

async function waitForAuthState(){
  if(!auth) return null;
  return new Promise(resolve=>{
    let unsub=()=>{};
    unsub=onAuthStateChanged(auth,user=>{unsub();resolve(user);},()=>{unsub();resolve(null);});
  });
}

async function currentProfile(){
  if(!auth?.currentUser || !db)return null;
  const snap=await get(ref(db,`accounts/${auth.currentUser.uid}`));
  return snap.exists()?snap.val():null;
}

async function requireIT(){
  const profile=await currentProfile();
  if(!profile || profile.active===false || profile.role!=="IT") throw new Error("Only an active IT account can manage system accounts.");
  return profile;
}

function storeDirectory(accountsValue){
  const value=accountsValue||{};
  const rows=Object.entries(value).map(([uid,profile])=>({uid,...(profile||{})}));
  localStorage.setItem(DIRECTORY_KEY,JSON.stringify(rows));
}

function dispatchCloudSync(detail={}){
  if(suppressRealtimeDispatch)return;
  window.dispatchEvent(new CustomEvent("ot-firebase-sync",{detail}));
}

async function initialize(){
  if(!configured)return;
  app=initializeApp(config);
  auth=getAuth(app);
  db=getDatabase(app);
}

const AUTH_PERSISTENCE_MIGRATION_KEY = "otAuthLocalPersistenceV1";

async function ensureLocalAuthPersistence(){
  if(!auth)return;
  await setPersistence(auth,browserLocalPersistence);
  try{localStorage.setItem(AUTH_PERSISTENCE_MIGRATION_KEY,"1");}catch{}
}

const ready = initialize();

async function getBootstrapStatus(){
  await ready;
  if(!configured || !db)return {configured:false,complete:false};
  try{
    const snap=await get(ref(db,"system/bootstrapComplete"));
    return {configured:true,complete:snap.val()===true};
  }catch(error){
    throw new Error(firebaseErrorMessage(error));
  }
}

async function createBootstrapIdentity({username,password,role,department,displayName}){
  const normalized=normalizeUsername(username);
  const secondary=initializeApp(config,`bootstrap-${role}-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const secondaryAuth=getAuth(secondary);
  const secondaryDb=getDatabase(secondary);
  await setPersistence(secondaryAuth,inMemoryPersistence);
  let credential;
  try{
    try{
      credential=await createUserWithEmailAndPassword(secondaryAuth,usernameToEmail(normalized),password);
    }catch(error){
      if(String(error?.code||"").includes("email-already-in-use")){
        credential=await signInWithEmailAndPassword(secondaryAuth,usernameToEmail(normalized),password);
      }else throw error;
    }
    const profile={
      username:normalized,
      role,
      department,
      displayName,
      active:true,
      source:"Initial Setup",
      createdAt:new Date().toISOString()
    };
    await set(ref(secondaryDb,`accounts/${credential.user.uid}`),profile);
    await signOut(secondaryAuth);
    return {uid:credential.user.uid,profile};
  }finally{
    try{await deleteApp(secondary);}catch{}
  }
}

async function bootstrapInitialAccounts(values){
  await ready;
  if(!configured)throw new Error("Firebase is not configured yet. Add the Web API Key in firebase-config.js.");
  const status=await getBootstrapStatus();
  if(status.complete)throw new Error("Initial setup is already complete.");
  if(String(values.itPassword||"").length<6 || String(values.hrPassword||"").length<6)throw new Error("IT and HR passwords must be at least 6 characters.");
  const it=await createBootstrapIdentity({
    username:values.itUsername,
    password:values.itPassword,
    role:"IT",
    department:"Information Technology",
    displayName:"IT Account Management"
  });
  await createBootstrapIdentity({
    username:values.hrUsername,
    password:values.hrPassword,
    role:"HR",
    department:"Human Resources",
    displayName:"Human Resources"
  });
  await signInWithEmailAndPassword(auth,usernameToEmail(values.itUsername),values.itPassword);
  await set(ref(db,"system/bootstrapComplete"),true);
  await signOut(auth);
  return it;
}

async function signIn(username,password){
  await ready;
  if(!configured)throw new Error("Firebase is not configured yet. Add the Web API Key in firebase-config.js.");
  // LOCAL persistence keeps the Firebase session across browser/app closes.
  // An explicit Logout/signOut is the only normal action that clears it.
  await ensureLocalAuthPersistence();
  let credential;
  try{
    credential=await signInWithEmailAndPassword(auth,usernameToEmail(username),password);
    let snap;
    try{
      snap=await get(ref(db,`accounts/${credential.user.uid}`));
    }catch(error){
      await signOut(auth);
      if(String(error?.code||"").includes("permission-denied")){
        throw new Error("Firebase Authentication accepted this login, but Realtime Database could not read its system profile. Publish the included database.rules.json rules, then use Initial System Setup to create/link the IT and HR roles.");
      }
      throw error;
    }
    if(!snap.exists()){
      const bootstrap=await getBootstrapStatus().catch(()=>({complete:false}));
      await signOut(auth);
      if(!bootstrap.complete){
        throw new Error("Firebase Authentication accepted this account, but it is not linked to a system role yet. Under Initial System Setup, enter the same IT and HR Authentication email/username and passwords, then click Create / Link IT & HR Accounts.");
      }
      throw new Error("This Firebase Authentication user has no system profile. Ask IT to register/link the account in the system.");
    }
    const profile=snap.val();
    if(profile.active===false){
      await signOut(auth);
      throw new Error("This system account is disabled.");
    }
    return {uid:credential.user.uid,...profile,username:profile.username||normalizeUsername(username)};
  }catch(error){
    if(error?.message?.includes("system profile") || error?.message?.includes("system role") || error?.message?.includes("Authentication accepted") || error?.message?.includes("disabled"))throw error;
    throw new Error(firebaseErrorMessage(error));
  }
}

async function restoreSession(savedUsername=""){
  await ready;
  if(!configured)return null;
  const user=await waitForAuthState();
  if(!user)return null;
  // Migrate a session created by older builds (SESSION persistence) to LOCAL once.
  try{
    if(localStorage.getItem(AUTH_PERSISTENCE_MIGRATION_KEY)!=="1")await ensureLocalAuthPersistence();
  }catch{}
  const snap=await get(ref(db,`accounts/${user.uid}`));
  if(!snap.exists())return null;
  const profile=snap.val();
  if(profile.active===false)return null;
  if(savedUsername && profile.username && normalizeUsername(savedUsername)!==normalizeUsername(profile.username))return null;
  return {uid:user.uid,...profile};
}

async function flushPendingWrites(){
  await ready;
  if(!auth?.currentUser || !db)return false;
  const rows=readPendingWrites();
  let allOk=true;
  for(const [key,entry] of Object.entries(rows)){
    if(!isAppStorageKey(key)){clearPendingWrite(key);continue;}
    try{
      if(entry?.op==="remove")await remove(ref(db,`appData/${key}`));
      else await set(ref(db,`appData/${key}`),String(entry?.value??""));
      clearPendingWrite(key);
    }catch(error){
      allOk=false;
      console.error(`Firebase pending sync failed for ${key}:`,error);
    }
  }
  return allOk;
}

function collectLocalAppData(){
  const rows={};
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(!isAppStorageKey(key))continue;
    const value=localStorage.getItem(key);
    if(value!==null)rows[key]=String(value);
  }
  return rows;
}

async function backfillLocalOnlyData(cloudValue){
  if(!auth?.currentUser || !db)return cloudValue||{};
  const cloud={...(cloudValue||{})};
  const local=collectLocalAppData();
  const patch={};
  Object.entries(local).forEach(([key,value])=>{
    if(!Object.prototype.hasOwnProperty.call(cloud,key)){
      patch[key]=value;
      cloud[key]=value;
    }
  });
  if(Object.keys(patch).length){
    try{await update(ref(db,"appData"),patch);}
    catch(error){console.error("Firebase local-data backfill failed:",error);}
  }
  return cloud;
}

function applyCloudSnapshot(cloudValue){
  const cloud=cloudValue||{};
  const pending=readPendingWrites();
  const localKeys=[];
  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(isAppStorageKey(key))localKeys.push(key);
  }
  // Cloud is authoritative for fully-synced keys. Pending local saves are newer and must survive.
  localKeys.forEach(key=>{
    if(!Object.prototype.hasOwnProperty.call(cloud,key) && !Object.prototype.hasOwnProperty.call(pending,key)){
      localStorage.removeItem(key);
    }
  });
  Object.entries(cloud).forEach(([key,value])=>{
    if(!isAppStorageKey(key) || value===null || value===undefined)return;
    if(Object.prototype.hasOwnProperty.call(pending,key))return;
    localStorage.setItem(key,String(value));
  });
  Object.entries(pending).forEach(([key,entry])=>{
    if(!isAppStorageKey(key))return;
    if(entry?.op==="remove")localStorage.removeItem(key);
    else localStorage.setItem(key,String(entry?.value??""));
  });
}

async function pullAppData(){
  await ready;
  if(!auth?.currentUser || !db)return;
  suppressRealtimeDispatch=true;
  try{
    // Retry any save that was interrupted by refresh/offline before hydrating from cloud.
    await flushPendingWrites();
    const [dataSnap,accountsSnap]=await Promise.all([
      get(ref(db,"appData")),
      get(ref(db,"accounts"))
    ]);
    const cloud=await backfillLocalOnlyData(dataSnap.val()||{});
    applyCloudSnapshot(cloud);
    storeDirectory(accountsSnap.val()||{});
  }finally{
    suppressRealtimeDispatch=false;
  }
  startRealtimeSync();
}

function startRealtimeSync(){
  if(!auth?.currentUser || !db)return;
  if(appDataUnsub)appDataUnsub();
  if(accountsUnsub)accountsUnsub();
  appDataUnsub=onValue(ref(db,"appData"),snap=>{
    suppressRealtimeDispatch=true;
    try{
      applyCloudSnapshot(snap.val()||{});
    }finally{suppressRealtimeDispatch=false;}
    dispatchCloudSync({type:"appData"});
  },error=>console.error("Firebase appData sync:",error));
  accountsUnsub=onValue(ref(db,"accounts"),snap=>{
    storeDirectory(snap.val()||{});
    dispatchCloudSync({type:"accounts"});
  },error=>console.error("Firebase accounts sync:",error));
}

async function syncKey(key,value){
  if(!isAppStorageKey(key))return;
  // Queue synchronously before the first await so an immediate browser refresh cannot lose this save.
  queuePendingWrite(key,{op:"set",value:String(value)});
  await ready;
  if(!auth?.currentUser || !db)return;
  try{
    await set(ref(db,`appData/${key}`),String(value));
    clearPendingWrite(key);
  }catch(error){
    console.error(`Firebase sync failed for ${key}:`,error);
  }
}

async function removeKey(key){
  if(!isAppStorageKey(key))return;
  queuePendingWrite(key,{op:"remove"});
  await ready;
  if(!auth?.currentUser || !db)return;
  try{
    await remove(ref(db,`appData/${key}`));
    clearPendingWrite(key);
  }catch(error){
    console.error(`Firebase remove failed for ${key}:`,error);
  }
}

async function createManagedUser({username,password,profile}){
  await ready;
  await requireIT();
  const normalized=normalizeUsername(username);
  const secondary=initializeApp(config,`provision-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  const secondaryAuth=getAuth(secondary);
  await setPersistence(secondaryAuth,inMemoryPersistence);
  try{
    const credential=await createUserWithEmailAndPassword(secondaryAuth,usernameToEmail(normalized),password);
    const record={
      ...profile,
      username:normalized,
      active:true,
      createdAt:profile.createdAt||new Date().toISOString(),
      createdBy:profile.createdBy||"IT"
    };
    await set(ref(db,`accounts/${credential.user.uid}`),record);
    await signOut(secondaryAuth);
    return {uid:credential.user.uid,...record};
  }catch(error){
    throw new Error(firebaseErrorMessage(error));
  }finally{
    try{await deleteApp(secondary);}catch{}
  }
}

async function updateManagedProfile(uid,patch){
  await ready;
  await requireIT();
  await update(ref(db,`accounts/${uid}`),{...patch,updatedAt:new Date().toISOString()});
}


async function savePushRegistration({deviceId,fid,userAgent="",platform=""}){
  await ready;
  if(!auth?.currentUser || !db)throw new Error("Sign in before enabling push notifications.");
  const safeDeviceId=String(deviceId||"").replace(/[.#$\[\]/]/g,"_").slice(0,120);
  if(!safeDeviceId || !fid)throw new Error("Push registration is incomplete.");
  const profile=await currentProfile();
  if(!profile || profile.active===false)throw new Error("This account is not active.");
  await set(ref(db,`pushRegistrations/${auth.currentUser.uid}/${safeDeviceId}`),{
    fid:String(fid),
    deviceId:safeDeviceId,
    username:profile.username||"",
    role:profile.role||"",
    department:profile.department||"",
    employeeNo:profile.employeeNo||"",
    userAgent:String(userAgent||"").slice(0,500),
    platform:String(platform||"").slice(0,120),
    updatedAt:new Date().toISOString()
  });
  return true;
}

async function removePushRegistration(deviceId){
  await ready;
  if(!auth?.currentUser || !db)return false;
  const safeDeviceId=String(deviceId||"").replace(/[.#$\[\]/]/g,"_").slice(0,120);
  if(!safeDeviceId)return false;
  await remove(ref(db,`pushRegistrations/${auth.currentUser.uid}/${safeDeviceId}`));
  return true;
}

async function signOutUser(){
  await ready;
  // Give queued local saves one final cloud flush before ending the Firebase session.
  try{await flushPendingWrites();}catch{}
  if(appDataUnsub){appDataUnsub();appDataUnsub=null;}
  if(accountsUnsub){accountsUnsub();accountsUnsub=null;}
  if(auth?.currentUser)await signOut(auth);
}

window.addEventListener("online",()=>{
  flushPendingWrites().catch(error=>console.error("Firebase online retry failed:",error));
});

window.OTFirebase={
  configured,
  configSummary:{databaseURL:config.databaseURL||"",projectId:config.projectId||""},
  ready,
  getBootstrapStatus,
  bootstrapInitialAccounts,
  signIn,
  restoreSession,
  pullAppData,
  flushPendingWrites,
  syncKey,
  removeKey,
  createManagedUser,
  updateManagedProfile,
  savePushRegistration,
  removePushRegistration,
  signOut:signOutUser,
  firebaseErrorMessage
};
