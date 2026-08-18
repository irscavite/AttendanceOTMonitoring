import { getApps, getApp, initializeApp } from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
import {
  getMessaging,
  isSupported,
  onMessage,
  onRegistered,
  onUnregistered,
  register as registerMessaging,
  unregister as unregisterMessaging
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging.js";

const DEVICE_KEY = "otPushDeviceIdV1";
const LAST_FID_KEY = "otPushLastFidV1";
let messaging = null;
let serviceWorkerRegistration = null;
let listenersBound = false;

function getDeviceId(){
  let id="";
  try{id=localStorage.getItem(DEVICE_KEY)||"";}catch{}
  if(!id){
    id=(globalThis.crypto?.randomUUID?.() || `device-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    try{localStorage.setItem(DEVICE_KEY,id);}catch{}
  }
  return id;
}

function setButtonState(state,title,icon){
  const btn=document.getElementById("pushNotificationBtn");
  const iconEl=document.getElementById("pushNotificationIcon");
  if(!btn)return;
  btn.dataset.pushState=state;
  btn.title=title;
  btn.setAttribute("aria-label",title);
  if(iconEl && icon)iconEl.textContent=icon;
}

async function ensureMessaging(){
  if(!(await isSupported())){
    setButtonState("unsupported","Push notifications are not supported in this browser.","🔕");
    return null;
  }
  const config=window.OT_FIREBASE_CONFIG||{};
  const app=getApps().length?getApp():initializeApp(config);
  messaging=messaging||getMessaging(app);
  if(!serviceWorkerRegistration){
    serviceWorkerRegistration=await navigator.serviceWorker.register("./firebase-messaging-sw.js",{scope:"./"});
  }
  bindMessagingListeners();
  return messaging;
}

function messagingOptions(){
  const options={serviceWorkerRegistration};
  const vapidKey=String(window.OT_FIREBASE_VAPID_KEY||"").trim();
  if(vapidKey)options.vapidKey=vapidKey;
  return options;
}

async function saveFidForCurrentUser(fid){
  if(!fid)return;
  try{localStorage.setItem(LAST_FID_KEY,fid);}catch{}
  await window.OTFirebase?.savePushRegistration?.({
    deviceId:getDeviceId(),
    fid,
    userAgent:navigator.userAgent||"",
    platform:navigator.userAgentData?.platform||navigator.platform||""
  });
  setButtonState("enabled","Phone notifications enabled on this device.","🔔");
}

function bindMessagingListeners(){
  if(listenersBound || !messaging)return;
  listenersBound=true;
  onRegistered(messaging,(fid)=>{
    saveFidForCurrentUser(fid).catch(error=>console.error("Push registration save failed:",error));
  });
  onUnregistered(messaging,(fid)=>{
    const last=localStorage.getItem(LAST_FID_KEY)||"";
    if(!fid || !last || fid===last)localStorage.removeItem(LAST_FID_KEY);
  });
  onMessage(messaging,(payload)=>{
    const data=payload?.data||{};
    const title=data.title||"New notification";
    const body=data.body||"You have a new update in Attendance, Leave & Overtime System.";
    try{
      if(Notification.permission==="granted"){
        const target=data.targetPage?`?open=${encodeURIComponent(data.targetPage)}`:"./";
        serviceWorkerRegistration?.showNotification(title,{
          body,
          icon:"./icon-192.png",
          badge:"./icon-192.png",
          tag:data.notificationId||undefined,
          data:{url:target,targetPage:data.targetPage||""}
        });
      }
    }catch{}
  });
}

async function syncForSignedInUser(){
  try{
    const m=await ensureMessaging();
    if(!m)return {enabled:false,reason:"Push notifications are not supported in this browser."};
    if(Notification.permission==="denied"){
      setButtonState("blocked","Notifications are blocked in browser settings.","🔕");
      return {enabled:false,reason:"Notifications are blocked in browser settings."};
    }
    if(Notification.permission!=="granted"){
      setButtonState("ready","Tap to enable phone notifications.","📲");
      return {enabled:false,reason:"Tap the phone notification button to allow notifications."};
    }
    await registerMessaging(m,messagingOptions());
    setButtonState("enabled","Phone notifications enabled on this device.","🔔");
    return {enabled:true};
  }catch(error){
    console.error("Push sync failed:",error);
    setButtonState("ready","Tap to retry phone notifications.","📲");
    return {enabled:false,reason:"Push setup needs Firebase Cloud Messaging configuration."};
  }
}

async function enableForCurrentUser(){
  const m=await ensureMessaging();
  if(!m)return {enabled:false,reason:"This browser does not support background push notifications."};
  let permission=Notification.permission;
  if(permission!=="granted")permission=await Notification.requestPermission();
  if(permission!=="granted"){
    setButtonState("blocked","Notifications are not allowed for this site.","🔕");
    return {enabled:false,reason:"Allow notifications for this site in Chrome settings."};
  }
  const vapidKey=String(window.OT_FIREBASE_VAPID_KEY||"").trim();
  if(!vapidKey){
    console.warn("OT_FIREBASE_VAPID_KEY is blank. Generate a Web Push certificate in Firebase Cloud Messaging and paste the public key in firebase-config.js.");
  }
  await registerMessaging(m,messagingOptions());
  // onRegistered() stores the FID asynchronously.
  setButtonState("enabled","Phone notifications enabled on this device.","🔔");
  return {enabled:true};
}

async function detachCurrentUser(){
  const deviceId=getDeviceId();
  try{await window.OTFirebase?.removePushRegistration?.(deviceId);}catch{}
  try{
    const m=await ensureMessaging();
    if(m)await unregisterMessaging(m);
  }catch{}
  try{localStorage.removeItem(LAST_FID_KEY);}catch{}
  setButtonState("ready","Tap to enable phone notifications.","📲");
}

window.OTPush={syncForSignedInUser,enableForCurrentUser,detachCurrentUser};

// Prepare the service worker early, but never prompt for permission automatically.
ensureMessaging().then(()=>{
  if(Notification.permission==="granted")setButtonState("enabled","Phone notifications enabled on this device.","🔔");
  else if(Notification.permission==="denied")setButtonState("blocked","Notifications are blocked in browser settings.","🔕");
  else setButtonState("ready","Tap to enable phone notifications.","📲");
}).catch(()=>setButtonState("unsupported","Push notifications unavailable.","🔕"));
