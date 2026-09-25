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
  onValue,
  runTransaction
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
let appDataUnsub = [];
let accountsUnsub = null;
let suppressRealtimeDispatch = false;
let employeeDirectoryWriteChain = Promise.resolve();
let dataResetRefreshPromise = null;

const DIRECTORY_KEY = "hrFirebaseAccountDirectoryV1";
const CLOUD_KEY_PREFIX = "hr";
// Stored outside the hr* namespace so cloud hydration never deletes it.
// This protects a save if the user refreshes immediately or the network briefly fails.
const PENDING_WRITE_KEY = "otFirebasePendingWritesV2";
const PENDING_WRITE_OWNER_KEY = "otFirebasePendingWriteOwnerV1";
// Each tab remembers the most recent full reset so old offline browser data
// cannot be uploaded again when it reconnects.
const DATA_RESET_MARKER_KEY = "otFirebaseDataResetSeenAtV1";
const RECORD_COLLECTION_KEYS = new Set([
  "hrOvertimeMonitoringV3",
  "hrDailyAttendanceV1",
  "hrEmployeeAttendanceOTSubmissionsV1",
  "hrOTAgreementsV1",
  "hrLeaveRequestsV1"
]);
const CLEARABLE_RECORD_COLLECTION_KEYS = new Set([
  "hrOvertimeMonitoringV3",
  "hrDailyAttendanceV1",
  "hrEmployeeAttendanceOTSubmissionsV1",
  "hrOTAgreementsV1",
  "hrLeaveRequestsV1"
]);
const IT_CLEARABLE_RECORD_COLLECTION_KEYS = new Set([
  ...CLEARABLE_RECORD_COLLECTION_KEYS
]);
const CUTOFF_RECORD_COLLECTION_KEYS = new Set([
  "hrOvertimeMonitoringV3",
  "hrDailyAttendanceV1",
  "hrEmployeeAttendanceOTSubmissionsV1"
]);
const HR_LEAVE_APPROVAL_RECORD_COLLECTION_KEYS = new Set([
  "hrOvertimeMonitoringV3",
  "hrLeaveRequestsV1"
]);
const EMPLOYEE_DIRECTORY_PATH = "v2/employeeDirectory";
const PUBLIC_ACCOUNT_DIRECTORY_PATH = "publicAccountDirectory";
const EMPLOYEE_COMPENSATION_PATH = "v2/privateEmployeeCompensation";
const EMPLOYEE_SALARY_KEY = "hrEmployeeMonthlySalaryV1";
const EMPLOYEE_PAYROLL_DEDUCTION_KEY = "hrEmployeePayrollDeductionsV1";
const EMPLOYEE_PRIVATE_PROFILE_KEY = "hrEmployeePrivateProfilesV1";
const RECRUITMENT_REQUEST_KEY = "hrRecruitmentRequestsV1";
const APPLICANT_MONITORING_KEY = "hrApplicantMonitoringV1";
const ACTIVITY_LOG_KEY = "hrActivityLogV1";
const RECRUITMENT_COMPAT_PREF_KEY = "hrInternalChatPrefsV1";
const RECRUITMENT_COMPAT_FIELD = "recruitmentRequestsV1";
const PAYROLL_DEDUCTION_KEYS = ["trustFund","donation","sss","pagIbig","philHealth"];
const PAYROLL_DEDUCTION_CUTOFFS = new Set(["Not Applied","Every 10th","Every 25th","Both Cutoffs"]);
const PRIVACY_SCHEMA_VERSION = 1;
const EMPLOYEE_DIRECTORY_APP_KEYS = new Set([
  "hrEmployeeSchedulesV1","hrEmployeeShiftTimesV1","hrCustomEmployeesV1",
  "hrEmployeeLocationsV1","hrEmployeeDayOffV1","hrEmployeeProfileOverridesV1",
  "hrEmployeeLeaveCreditOverridesV1"
]);
const EMPLOYEE_DIRECTORY_FIELD_BY_KEY = {
  hrEmployeeSchedulesV1:"schedule",
  hrEmployeeShiftTimesV1:"shiftTime",
  hrEmployeeLocationsV1:"location",
  hrEmployeeDayOffV1:"dayOff",
  hrEmployeeProfileOverridesV1:"profile",
  hrEmployeeLeaveCreditOverridesV1:"leaveCredit"
};
const SUPERVISOR_DIRECTORY_WRITE_KEYS = new Set([
  "hrEmployeeSchedulesV1","hrEmployeeShiftTimesV1",
  "hrEmployeeLocationsV1","hrEmployeeDayOffV1"
]);
const SHARED_APP_KEYS = [
  "hrManagerNotificationsV1","hrDecisionNotificationsV1",
  "hrITAccountCreationRequestsV1","hrITManagedSystemAccountsV1","hrEmployeeLeaveNotificationsV1",
  "hrSupervisorEmployeeNotificationsV1","hrInternalChatV1","hrInternalChatReadV1",
  "hrInternalChatPrefsV1",APPLICANT_MONITORING_KEY,"hrCompanyBulletinsV1","hrOvertimeSampleRevision","hrManualFlowCleanResetRevision",
  "hrCustomOnlyCleanRevision","hrMasterCustomOnlyV1","hrFullFlowResetRevision"
];
const SESSION_SCOPED_APP_KEYS = new Set([
  ...RECORD_COLLECTION_KEYS,
  ...EMPLOYEE_DIRECTORY_APP_KEYS,
  ...SHARED_APP_KEYS,
  EMPLOYEE_PRIVATE_PROFILE_KEY,
  ACTIVITY_LOG_KEY,
  DIRECTORY_KEY
]);

function appStorageForKey(key){
  return SESSION_SCOPED_APP_KEYS.has(key)?sessionStorage:localStorage;
}

function safePathPart(value,fallback="record"){
  const clean=String(value??"").trim().replace(/[.#$\[\]\/]/g,"_");
  return clean||fallback;
}

function parseRows(value){
  try{const rows=JSON.parse(String(value??"[]"));return Array.isArray(rows)?rows:[];}
  catch{return [];}
}

function parseObject(value){
  try{const row=JSON.parse(String(value??"{}"));return row && typeof row==="object" && !Array.isArray(row)?row:{};}
  catch{return {};}
}

async function writeRecruitmentCompatibility(value){
  if(!db)return false;
  const rows=parseRows(value);
  await runTransaction(ref(db,`appData/${RECRUITMENT_COMPAT_PREF_KEY}`),current=>{
    const prefs=parseObject(current);
    prefs[RECRUITMENT_COMPAT_FIELD]=rows;
    return JSON.stringify(prefs);
  });
  return true;
}

async function removeRecruitmentCompatibility(){
  if(!db)return false;
  await runTransaction(ref(db,`appData/${RECRUITMENT_COMPAT_PREF_KEY}`),current=>{
    const prefs=parseObject(current);
    delete prefs[RECRUITMENT_COMPAT_FIELD];
    return JSON.stringify(prefs);
  });
  return true;
}

function recordIdentity(row,index){
  return safePathPart(row?.id || `${row?.date||row?.otDate||row?.startDate||"record"}-${index}`);
}

function ownerIdentity(row,key){
  if(key==="hrPayslipsV1" && String(row?.recipientUid||"").trim()){
    return safePathPart(row.recipientUid,"unassigned");
  }
  return safePathPart(row?.employeeNo,"unassigned");
}

function normalizedDepartment(value){
  return String(value||"").trim().toLowerCase();
}

function departmentIdentity(value){
  return safePathPart(String(value||"Unassigned").trim(),"Unassigned");
}

function profileModuleAccess(profile={}){
  const fromList=Array.isArray(profile?.moduleAccess)?profile.moduleAccess:[];
  const fromMap=Object.entries(profile?.moduleAccessMap||{}).filter(([,enabled])=>enabled===true).map(([id])=>id);
  return [...new Set(fromList.concat(fromMap).map(id=>String(id||"").trim()).filter(Boolean))];
}

function isAdminModuleAccount(profile,moduleId){
  const employeeDepartment=profile?.employeeDepartment||profile?.department;
  return normalizedDepartment(employeeDepartment)==="admin" && profileModuleAccess(profile).includes(moduleId);
}

function hasAnyAdminModuleAccess(profile){
  const employeeDepartment=profile?.employeeDepartment||profile?.department;
  return normalizedDepartment(employeeDepartment)==="admin" && profileModuleAccess(profile).length>0;
}

function hasFullEmployeeDirectoryReadAccess(profile){
  return ["IT","HR","Request Approver"].includes(profile?.role) || hasAnyAdminModuleAccess(profile);
}

function hasFullEmployeeDirectoryWriteAccess(profile){
  return ["IT","HR"].includes(profile?.role) || isAdminModuleAccount(profile,"employees");
}

function hasEmployeeMasterAccess(profile){
  return profile?.role==="HR" || (profile?.role==="Supervisor" && isAdminModuleAccount(profile,"employees"));
}
function canReadActivityLog(profile){
  if(!profile || profile.active===false)return false;
  if(profile.role==="IT" || profile.role==="HR")return true;
  return profile.role==="Supervisor" && normalizedDepartment(profile.employeeDepartment||profile.department)==="admin";
}
function hasEmployeeSalaryAccess(){
  // Compensation/payroll features are retired from this attendance-monitoring build.
  return false;
}

function hasAdminLeaveApprovalAccess(profile,key){
  return isAdminModuleAccount(profile,"leave-approvals") && key==="hrLeaveRequestsV1";
}

function hasAdminPayslipAccess(profile,key){
  return profile?.role==="Supervisor" && isAdminModuleAccount(profile,"employees") && key==="hrPayslipsV1";
}

function hasFullRecordReadAccess(profile,key){
  if(key==="hrPayslipsV1")return profile?.role==="HR" || hasAdminPayslipAccess(profile,key);
  if(["IT","HR"].includes(profile?.role))return true;
  if(profile?.role==="Request Approver")return ["hrOvertimeMonitoringV3","hrLeaveRequestsV1"].includes(key);
  return (isAdminModuleAccount(profile,"last-cutoff") && CUTOFF_RECORD_COLLECTION_KEYS.has(key)) ||
    (isAdminModuleAccount(profile,"leave-approvals") && HR_LEAVE_APPROVAL_RECORD_COLLECTION_KEYS.has(key));
}

function normalizeRecordRow(row,key,index){
  const value=row && typeof row==="object" ? {...row} : {};
  if(!String(value.employeeNo||"").trim()){
    value.employeeNo=String(value.employeeId||value.no||`LEGACY-${safePathPart(key)}-${index+1}`);
  }
  if(!String(value.department||"").trim()){
    value.department=String(value.employeeDepartment||"Unassigned");
  }
  if(!String(value.id||"").trim()){
    value.id=`LEGACY-${safePathPart(key)}-${index+1}`;
  }
  return value;
}

function rowsFromCollection(value){
  const rows=[];
  Object.values(value||{}).forEach(owner=>{
    Object.values(owner?.items||{}).forEach(row=>{if(row && typeof row==="object")rows.push(row);});
  });
  return rows;
}

function flattenEmployeeDirectory(value){
  const rows={};
  Object.entries(value||{}).forEach(([departmentKey,group])=>{
    Object.entries(group?.employees||{}).forEach(([employeeNo,node])=>{
      if(!node || typeof node!=="object")return;
      rows[String(employeeNo)]={...node,__departmentKey:departmentKey};
    });
  });
  return rows;
}

function employeeDirectoryCloudProjection(directoryRows){
  const entries=Object.entries(directoryRows||{});
  const employees=[];
  const maps={
    hrEmployeeSchedulesV1:{},hrEmployeeShiftTimesV1:{},hrEmployeeLocationsV1:{},
    hrEmployeeDayOffV1:{},hrEmployeeProfileOverridesV1:{},hrEmployeeLeaveCreditOverridesV1:{}
  };
  entries.forEach(([employeeNo,node])=>{
    if(node?.employee && typeof node.employee==="object")employees.push({...node.employee,no:String(node.employee.no||employeeNo)});
    Object.entries(EMPLOYEE_DIRECTORY_FIELD_BY_KEY).forEach(([key,field])=>{
      if(Object.prototype.hasOwnProperty.call(node||{},field))maps[key][employeeNo]=node[field];
    });
  });
  employees.sort((a,b)=>String(a.name||"").localeCompare(String(b.name||"")));
  return {
    hrCustomEmployeesV1:JSON.stringify(employees),
    ...Object.fromEntries(Object.entries(maps).map(([key,value])=>[key,JSON.stringify(value)]))
  };
}

async function readEmployeeDirectory(profile){
  if(!profile)return {};
  if(hasFullEmployeeDirectoryReadAccess(profile)){
    const snap=await get(ref(db,EMPLOYEE_DIRECTORY_PATH));
    return flattenEmployeeDirectory(snap.val());
  }
  const department=profile.role==="Supervisor"?(profile.department||profile.employeeDepartment):(profile.employeeDepartment||profile.department);
  const departmentKey=departmentIdentity(department);
  if(profile.role==="Supervisor"){
    const snap=await get(ref(db,`${EMPLOYEE_DIRECTORY_PATH}/${departmentKey}`));
    return flattenEmployeeDirectory({[departmentKey]:snap.val()||{}});
  }
  if(profile.role==="Employee" && profile.employeeNo){
    const employeeNo=safePathPart(profile.employeeNo);
    const snap=await get(ref(db,`${EMPLOYEE_DIRECTORY_PATH}/${departmentKey}/employees/${employeeNo}`));
    return snap.exists()?{[String(profile.employeeNo)]:{...snap.val(),__departmentKey:departmentKey}}:{};
  }
  return {};
}

async function readDepartmentEmployeeDirectory(department){
  const departmentKey=departmentIdentity(department);
  const snap=await get(ref(db,`${EMPLOYEE_DIRECTORY_PATH}/${departmentKey}`));
  return flattenEmployeeDirectory({[departmentKey]:snap.val()||{}});
}

function employeeDirectoryNodePath(node,employeeNo){
  const departmentKey=node?.__departmentKey||departmentIdentity(node?._department||node?.profile?.department||node?.employee?.department);
  return `${departmentKey}/employees/${safePathPart(employeeNo)}`;
}

function localEmployeeSeed(employeeNo){
  const employees=parseRows(appStorageForKey("hrCustomEmployeesV1").getItem("hrCustomEmployeesV1"));
  const employee=employees.find(row=>String(row?.no||"")===String(employeeNo||""))||null;
  const profile=parseObject(appStorageForKey("hrEmployeeProfileOverridesV1").getItem("hrEmployeeProfileOverridesV1"))?.[employeeNo]||{};
  const department=String(profile?.department||employee?.department||"Unassigned");
  return {employee,profile,department};
}

async function writeEmployeeDirectoryProjection(key,value){
  const profile=await currentProfile();
  if(!profile || profile.active===false)throw new Error("An active system account is required.");
  const fullWrite=hasFullEmployeeDirectoryWriteAccess(profile);
  const supervisorWrite=profile.role==="Supervisor" && SUPERVISOR_DIRECTORY_WRITE_KEYS.has(key);
  if(!fullWrite && !supervisorWrite)throw new Error("This account cannot change employee master data.");
  if(key==="hrCustomEmployeesV1" && !fullWrite)throw new Error("Only IT or an authorized Admin account can change the Employee Master List.");

  const current=fullWrite?await readEmployeeDirectory(profile):await readDepartmentEmployeeDirectory(profile.department);
  const directoryPatch={};

  if(key==="hrCustomEmployeesV1"){
    const desiredRows=parseRows(value).filter(row=>String(row?.no||"").trim());
    const desiredByNo=new Map(desiredRows.map(row=>[String(row.no),row]));
    desiredRows.forEach(row=>{
      const employeeNo=String(row.no);
      const existing=current[employeeNo]||{};
      const existingProfile=existing.profile||{};
      const department=String(existingProfile.department||row.department||existing._department||"Unassigned");
      const departmentKey=departmentIdentity(department);
      const nextPath=`${departmentKey}/employees/${safePathPart(employeeNo)}`;
      const oldPath=Object.keys(existing).length?employeeDirectoryNodePath(existing,employeeNo):"";
      directoryPatch[`${departmentKey}/_department`]=department;
      directoryPatch[`${nextPath}/_department`]=department;
      directoryPatch[`${nextPath}/employee`]={...row,no:employeeNo};
      if(oldPath && oldPath!==nextPath){
        const moved={...existing,_department:department,employee:{...row,no:employeeNo}};
        delete moved.__departmentKey;
        directoryPatch[nextPath]=moved;
        directoryPatch[oldPath]=null;
      }
    });
    Object.entries(current).forEach(([employeeNo,node])=>{
      if(node?.employee && !desiredByNo.has(String(employeeNo)))directoryPatch[employeeDirectoryNodePath(node,employeeNo)]=null;
    });
  }else{
    const field=EMPLOYEE_DIRECTORY_FIELD_BY_KEY[key];
    if(!field)throw new Error("Unsupported employee directory update.");
    const desired=parseObject(value);
    for(const [employeeNo,fieldValue] of Object.entries(desired)){
      const existing=current[employeeNo]||{};
      const seed=localEmployeeSeed(employeeNo);
      const currentDepartment=String(existing._department||existing.profile?.department||existing.employee?.department||seed.department||profile.department||"Unassigned");
      const nextDepartment=field==="profile"?String(fieldValue?.department||currentDepartment):currentDepartment;
      if(supervisorWrite){
        // Supervisors may update only an already-authorized employee field.
        // Structural department/employee nodes remain controlled by HR/IT so a
        // Supervisor update does not require (or accidentally gain) master-list writes.
        if(!Object.keys(existing).length || normalizedDepartment(nextDepartment)!==normalizedDepartment(profile.department))continue;
        directoryPatch[`${employeeDirectoryNodePath(existing,employeeNo)}/${field}`]=fieldValue;
        continue;
      }
      const departmentKey=departmentIdentity(nextDepartment);
      const nextPath=`${departmentKey}/employees/${safePathPart(employeeNo)}`;
      const oldPath=Object.keys(existing).length?employeeDirectoryNodePath(existing,employeeNo):"";
      directoryPatch[`${departmentKey}/_department`]=nextDepartment;
      if(oldPath && oldPath!==nextPath){
        const moved={...existing,_department:nextDepartment,[field]:fieldValue};
        delete moved.__departmentKey;
        directoryPatch[nextPath]=moved;
        directoryPatch[oldPath]=null;
      }else{
        directoryPatch[`${nextPath}/_department`]=nextDepartment;
        if(!existing.employee && seed.employee)directoryPatch[`${nextPath}/employee`]={...seed.employee,no:String(seed.employee.no||employeeNo)};
        directoryPatch[`${nextPath}/${field}`]=fieldValue;
      }
    }
    Object.entries(current).forEach(([employeeNo,node])=>{
      if(Object.prototype.hasOwnProperty.call(node||{},field) && !Object.prototype.hasOwnProperty.call(desired,employeeNo)){
        directoryPatch[`${employeeDirectoryNodePath(node,employeeNo)}/${field}`]=null;
      }
    });
  }

  if(Object.keys(directoryPatch).length)await update(ref(db,EMPLOYEE_DIRECTORY_PATH),directoryPatch);
}

function enqueueEmployeeDirectoryWrite(key,value){
  const task=employeeDirectoryWriteChain.then(()=>writeEmployeeDirectoryProjection(key,value));
  employeeDirectoryWriteChain=task.catch(()=>{});
  return task;
}

async function readEmployeeSalaryMap(profile){
  if(!hasEmployeeSalaryAccess(profile))return {};
  const snap=await get(ref(db,EMPLOYEE_COMPENSATION_PATH));
  const salaries={};
  Object.entries(snap.val()||{}).forEach(([employeeNo,row])=>{
    const amount=Number(row?.monthlySalary);
    if(Number.isFinite(amount) && amount>=0)salaries[employeeNo]=amount;
  });
  return salaries;
}

async function writeEmployeeSalaryMap(value){
  const profile=await currentProfile();
  if(!profile || profile.active===false || !hasEmployeeSalaryAccess(profile)){
    throw new Error("Only HR or an Admin account with Employee Master List access can change salary information.");
  }
  const desired=parseObject(value);
  const snap=await get(ref(db,EMPLOYEE_COMPENSATION_PATH));
  const existing=snap.val()||{};
  const patch={};
  const now=new Date().toISOString();
  Object.entries(desired).forEach(([employeeNo,rawAmount])=>{
    const amount=Number(rawAmount);
    if(!Number.isFinite(amount) || amount<0 || amount>100000000)throw new Error("Monthly salary must be between 0 and 100,000,000.");
    const path=safePathPart(employeeNo);
    patch[`${path}/monthlySalary`]=amount;
    patch[`${path}/updatedAt`]=now;
    patch[`${path}/updatedBy`]=String(profile.username||profile.displayName||"HR");
  });
  Object.keys(existing).forEach(employeeNo=>{
    if(!Object.prototype.hasOwnProperty.call(desired,employeeNo))patch[safePathPart(employeeNo)]=null;
  });
  if(Object.keys(patch).length)await update(ref(db,EMPLOYEE_COMPENSATION_PATH),patch);
}

async function readEmployeePrivateProfileMap(profile){
  if(!hasEmployeeMasterAccess(profile))return {};
  const snap=await get(ref(db,EMPLOYEE_COMPENSATION_PATH));
  const profiles={};
  Object.entries(snap.val()||{}).forEach(([employeeNo,row])=>{
    if(row?.privateProfile&&typeof row.privateProfile==="object"&&!Array.isArray(row.privateProfile))profiles[employeeNo]=row.privateProfile;
  });
  return profiles;
}

async function getEmployeeProfilePhoto(employeeNo){
  await ready;
  const profile=await currentProfile();
  if(!profile || profile.active===false || !hasEmployeeMasterAccess(profile))return "";
  const path=safePathPart(employeeNo);
  const snap=await get(ref(db,`${EMPLOYEE_COMPENSATION_PATH}/${path}/profilePhoto`));
  const value=snap.val();
  return typeof value==="string" && /^data:image\/(jpeg|png|webp);base64,/i.test(value) ? value : "";
}

async function setEmployeeProfilePhoto(employeeNo,dataUrl){
  await ready;
  const profile=await currentProfile();
  if(!profile || profile.active===false || !hasEmployeeMasterAccess(profile)){
    throw new Error("Only HR or an Admin account with Employee Master List access can change employee profile photos.");
  }
  const photo=String(dataUrl||"");
  if(!/^data:image\/(jpeg|png|webp);base64,/i.test(photo))throw new Error("Profile photo must be a valid JPG, PNG, or WebP image.");
  if(photo.length>240000)throw new Error("Profile photo is too large. Choose a smaller image.");
  const path=safePathPart(employeeNo);
  const rowRef=ref(db,`${EMPLOYEE_COMPENSATION_PATH}/${path}`);
  const snap=await get(rowRef);
  const current=snap.val()||{};
  await update(rowRef,{
    profilePhoto:photo,
    monthlySalary:Number.isFinite(Number(current.monthlySalary))?Number(current.monthlySalary):0,
    updatedAt:new Date().toISOString(),
    updatedBy:String(profile.username||profile.displayName||"HR")
  });
  return true;
}

async function removeEmployeeProfilePhoto(employeeNo){
  await ready;
  const profile=await currentProfile();
  if(!profile || profile.active===false || !hasEmployeeMasterAccess(profile)){
    throw new Error("Only HR or an Admin account with Employee Master List access can change employee profile photos.");
  }
  const path=safePathPart(employeeNo);
  const rowRef=ref(db,`${EMPLOYEE_COMPENSATION_PATH}/${path}`);
  const snap=await get(rowRef);
  if(!snap.exists())return true;
  const current=snap.val()||{};
  await update(rowRef,{
    profilePhoto:null,
    monthlySalary:Number.isFinite(Number(current.monthlySalary))?Number(current.monthlySalary):0,
    updatedAt:new Date().toISOString(),
    updatedBy:String(profile.username||profile.displayName||"HR")
  });
  return true;
}

const LEAVE_PROOF_DATABASE_PATH="v2/leaveProofs";
const LEAVE_PROOF_DATA_URL_LIMIT=600000;

async function uploadLeaveProof({requestId,employeeNo,department,dataUrl,fileName,sizeBytes,contentType}={}){
  await ready;
  if(!auth?.currentUser || !db)throw new Error("Sign in before uploading leave proof.");
  const profile=await currentProfile();
  const employeeKey=String(employeeNo||"").trim();
  const accountEmployeeKey=String(profile?.employeeNo||"").trim();
  const canUpload=profile?.active!==false && (
    profile?.role==="HR" ||
    profile?.role==="IT" ||
    isAdminModuleAccount(profile,"leave-approvals") ||
    (["Employee","Supervisor"].includes(profile?.role) && accountEmployeeKey && accountEmployeeKey===employeeKey)
  );
  if(!canUpload)throw new Error("This account cannot upload proof for the selected employee.");
  const allowedTypes=new Set(["image/jpeg","image/png","image/webp"]);
  const normalizedType=String(contentType||"").toLowerCase();
  const proofData=String(dataUrl||"");
  const normalizedSize=Number(sizeBytes||0);
  if(!allowedTypes.has(normalizedType) || !new RegExp(`^data:${normalizedType.replace("/","\\/")};base64,`,`i`).test(proofData)){
    throw new Error("Leave proof must be a JPG, PNG, or WebP image.");
  }
  if(!Number.isFinite(normalizedSize) || normalizedSize<=0 || normalizedSize>450*1024 || proofData.length>LEAVE_PROOF_DATA_URL_LIMIT){
    throw new Error("The compressed leave proof is too large. Try a smaller image.");
  }
  const safeRequest=safePathPart(requestId,`leave-${Date.now()}`);
  // Use a deterministic employee/request path. Reviewers can reconstruct this
  // reference even if an older client omitted leaveProof metadata from the
  // leave record during a quick cross-device sync.
  const databasePath=`${LEAVE_PROOF_DATABASE_PATH}/${safePathPart(employeeKey,"unassigned")}/${safeRequest}`;
  const uploadedAt=new Date().toISOString();
  const node={
    requestId:String(requestId||"").slice(0,180),
    employeeNo:employeeKey.slice(0,100),
    department:String(department||profile?.employeeDepartment||profile?.department||"").slice(0,100),
    dataUrl:proofData,
    fileName:String(fileName||"leave-proof.jpg").slice(0,180),
    sizeBytes:Math.round(normalizedSize),
    contentType:normalizedType,
    uploadedAt,
    uploadedByUid:auth.currentUser.uid
  };
  try{await set(ref(db,databasePath),node);}
  catch(error){throw new Error(firebaseErrorMessage(error));}
  return {
    databasePath,
    ownerUid:auth.currentUser.uid,
    requestId:safeRequest,
    fileName:node.fileName,
    sizeBytes:node.sizeBytes,
    contentType:node.contentType,
    uploadedAt,
    uploadedByUid:auth.currentUser.uid
  };
}

// Update only the existing leave record. Re-saving a stale browser snapshot
// could accidentally revert an approval that happened before proof arrived.
async function attachLeaveProofToRequest({employeeNo,requestId,proof}={}){
  await ready;
  if(!auth?.currentUser || !db)throw new Error("Sign in before attaching leave proof.");
  const profile=await currentProfile();
  if(!["Employee","Supervisor"].includes(profile?.role) || String(profile.employeeNo||"")!==String(employeeNo||"")){
    throw new Error("Only the employee who filed this leave can attach its proof.");
  }
  const owner=safePathPart(employeeNo,"");
  const id=safePathPart(requestId,"");
  if(!owner || !id || String(proof?.databasePath||"")!==`${LEAVE_PROOF_DATABASE_PATH}/${owner}/${id}`){
    throw new Error("Upload proof for this leave request before attaching it.");
  }
  const recordRef=ref(db,`v2/collections/hrLeaveRequestsV1/${owner}/items/${id}`);
  try{
    const result=await runTransaction(recordRef,current=>{
      if(!current || String(current.id||"")!==String(requestId) || String(current.employeeNo||"")!==String(employeeNo))return;
      if(!["SL","Emergency Leave"].includes(current.leaveType) || !["Pending Supervisor","Pending Request Approver","Pending HR","Approved"].includes(current.status))return;
      if(current.leaveProofPath || current.leaveProof?.databasePath || current.photoProofExpected===true)return;
      return {...current,leaveProof:proof,leaveProofPath:proof.databasePath,photoProofExpected:true,proofToFollow:false};
    },{applyLocally:false});
    if(!result.committed)throw new Error("Leave is no longer eligible for proof upload. Refresh your leave history.");
    return result.snapshot.val();
  }catch(error){throw new Error(firebaseErrorMessage(error));}
}

async function getLeaveProof(databasePath){
  await ready;
  if(!auth?.currentUser || !db)throw new Error("Sign in before viewing leave proof.");
  const path=String(databasePath||"").trim();
  if(!path.startsWith(`${LEAVE_PROOF_DATABASE_PATH}/`))throw new Error("Invalid leave proof reference.");
  try{
    const snap=await get(ref(db,path));
    return snap.exists()?snap.val():null;
  }catch(error){throw new Error(firebaseErrorMessage(error));}
}

async function getLeaveProofForRequest({databasePath,requestId,employeeNo,submittedBy}={}){
  await ready;
  if(!auth?.currentUser || !db)throw new Error("Sign in before viewing leave proof.");
  const profile=await currentProfile();
  const safeRequest=safePathPart(requestId,"");
  const employeeKey=String(employeeNo||"").trim();
  const candidates=[];
  const addCandidate=path=>{
    const clean=String(path||"").trim();
    if(clean.startsWith(`${LEAVE_PROOF_DATABASE_PATH}/`)&&!candidates.includes(clean))candidates.push(clean);
  };
  addCandidate(databasePath);
  if(safeRequest&&employeeKey)addCandidate(`${LEAVE_PROOF_DATABASE_PATH}/${safePathPart(employeeKey,"unassigned")}/${safeRequest}`);
  // Compatibility with the first RTDB proof build, which stored the uploader
  // UID as the first path segment.
  if(safeRequest&&String(profile?.employeeNo||"")===employeeKey){
    addCandidate(`${LEAVE_PROOF_DATABASE_PATH}/${auth.currentUser.uid}/${safeRequest}`);
  }
  if(safeRequest&&["HR","IT"].includes(profile?.role)){
    const accountsSnap=await get(ref(db,"accounts")).catch(()=>null);
    const submittedUsername=String(submittedBy||"").trim().toLowerCase();
    const matchingUid=Object.entries(accountsSnap?.val()||{}).find(([,account])=>
      String(account?.employeeNo||"").trim()===employeeKey ||
      (submittedUsername&&String(account?.username||"").trim().toLowerCase()===submittedUsername)
    )?.[0];
    if(matchingUid)addCandidate(`${LEAVE_PROOF_DATABASE_PATH}/${matchingUid}/${safeRequest}`);
  }
  for(const path of candidates){
    try{
      const snap=await get(ref(db,path));
      if(snap.exists())return {...snap.val(),databasePath:path};
    }catch(error){
      if(!isPermissionDeniedError(error))throw new Error(firebaseErrorMessage(error));
    }
  }
  return null;
}

async function deleteLeaveProof(databasePath){
  await ready;
  if(!auth?.currentUser || !db)return false;
  const path=String(databasePath||"").trim();
  if(!path.startsWith(`${LEAVE_PROOF_DATABASE_PATH}/`))throw new Error("Invalid leave proof reference.");
  const profile=await currentProfile();
  const snap=await get(ref(db,path));
  if(!snap.exists())return true;
  if(String(snap.val()?.uploadedByUid||"")!==auth.currentUser.uid&&profile?.role!=="IT")throw new Error("Only the uploader can remove this leave proof.");
  try{await remove(ref(db,path));}
  catch(error){throw new Error(firebaseErrorMessage(error));}
  return true;
}

async function writeEmployeePrivateProfileMap(value){
  const account=await currentProfile();
  if(!account || account.active===false || !hasEmployeeMasterAccess(account)){
    throw new Error("Only HR or an Admin account with Employee Master List access can change private employee profiles.");
  }
  const desired=parseObject(value);
  const snap=await get(ref(db,EMPLOYEE_COMPENSATION_PATH));
  const existing=snap.val()||{};
  const patch={};
  const now=new Date().toISOString();
  Object.entries(desired).forEach(([employeeNo,privateProfile])=>{
    if(!privateProfile||typeof privateProfile!=="object"||Array.isArray(privateProfile))throw new Error("Private employee profile must be a valid object.");
    const path=safePathPart(employeeNo);
    patch[`${path}/privateProfile`]=privateProfile;
    patch[`${path}/updatedAt`]=now;
    patch[`${path}/updatedBy`]=String(account.username||account.displayName||"HR");
    if(!Number.isFinite(Number(existing?.[employeeNo]?.monthlySalary)))patch[`${path}/monthlySalary`]=0;
  });
  Object.keys(existing).forEach(employeeNo=>{
    if(existing?.[employeeNo]?.privateProfile && !Object.prototype.hasOwnProperty.call(desired,employeeNo))patch[`${safePathPart(employeeNo)}/privateProfile`]=null;
  });
  if(Object.keys(patch).length)await update(ref(db,EMPLOYEE_COMPENSATION_PATH),patch);
}

function normalizePrivatePayrollDeductions(raw={}){
  const source=raw&&typeof raw==="object"&&!Array.isArray(raw)?raw:{};
  return Object.fromEntries(PAYROLL_DEDUCTION_KEYS.map(key=>{
    const entry=source[key]&&typeof source[key]==="object"?source[key]:{};
    const amount=Number(entry.amount);
    return [key,{
      amount:Number.isFinite(amount)&&amount>=0&&amount<=100000000?Number(amount.toFixed(2)):0,
      cutoff:PAYROLL_DEDUCTION_CUTOFFS.has(entry.cutoff)?entry.cutoff:"Not Applied"
    }];
  }));
}

async function readEmployeePayrollDeductionMap(profile){
  if(!hasEmployeeSalaryAccess(profile))return {};
  const snap=await get(ref(db,EMPLOYEE_COMPENSATION_PATH));
  const deductions={};
  Object.entries(snap.val()||{}).forEach(([employeeNo,row])=>{
    if(row?.deductions&&typeof row.deductions==="object")deductions[employeeNo]=normalizePrivatePayrollDeductions(row.deductions);
  });
  return deductions;
}

async function writeEmployeePayrollDeductionMap(value){
  const profile=await currentProfile();
  if(!profile || profile.active===false || !hasEmployeeSalaryAccess(profile)){
    throw new Error("Only HR or an Admin account with Employee Master List access can change payroll deductions.");
  }
  const desired=parseObject(value);
  const snap=await get(ref(db,EMPLOYEE_COMPENSATION_PATH));
  const existing=snap.val()||{};
  const patch={};
  const now=new Date().toISOString();
  Object.entries(desired).forEach(([employeeNo,rawDeductions])=>{
    const path=safePathPart(employeeNo);
    const deductions=normalizePrivatePayrollDeductions(rawDeductions);
    if(!existing[employeeNo])patch[`${path}/monthlySalary`]=0;
    patch[`${path}/deductions`]=deductions;
    patch[`${path}/updatedAt`]=now;
    patch[`${path}/updatedBy`]=String(profile.username||profile.displayName||"HR");
  });
  Object.keys(existing).forEach(employeeNo=>{
    if(!Object.prototype.hasOwnProperty.call(desired,employeeNo)&&existing[employeeNo]?.deductions)patch[`${safePathPart(employeeNo)}/deductions`]=null;
  });
  if(Object.keys(patch).length)await update(ref(db,EMPLOYEE_COMPENSATION_PATH),patch);
}

function publicAccountProfile(profile={}){
  return {
    username:String(profile.username||""),
    displayName:String(profile.displayName||profile.employeeName||profile.username||"System User"),
    role:String(profile.role||"Employee"),
    department:String(profile.employeeDepartment||profile.department||""),
    active:profile.active!==false
  };
}

function shouldPublishAccount(profile={}){
  return profile.role!=="Employee";
}

async function directoryEmployeePatchFromAccount(profile={}){
  const employeeNo=String(profile.employeeNo||"").trim();
  if(!employeeNo)return {};
  const currentProfileValue=await currentProfile();
  const current=await readEmployeeDirectory(currentProfileValue);
  const existing=current[employeeNo]||{};
  const department=String(profile.employeeDepartment||existing._department||existing.profile?.department||existing.employee?.department||"Unassigned");
  const departmentKey=departmentIdentity(department);
  const nextPath=`${departmentKey}/employees/${safePathPart(employeeNo)}`;
  const oldPath=Object.keys(existing).length?employeeDirectoryNodePath(existing,employeeNo):"";
  const employee={
    ...(existing.employee||{}),
    no:employeeNo,
    name:String(profile.employeeName||profile.displayName||existing.employee?.name||profile.username||employeeNo),
    position:String(profile.position||existing.employee?.position||"Employee"),
    department,
    employmentStatus:String(existing.employee?.employmentStatus||"Regular")
  };
  const nextNode={...existing,_department:department,employee};
  delete nextNode.__departmentKey;
  const patch={
    [`${departmentKey}/_department`]:department,
    [nextPath]:nextNode
  };
  if(oldPath && oldPath!==nextPath)patch[oldPath]=null;
  return patch;
}

function buildEmployeeDirectoryFromLegacy(legacy={},accounts={}){
  const employees=parseRows(legacy.hrCustomEmployeesV1);
  const maps={
    schedule:parseObject(legacy.hrEmployeeSchedulesV1),
    shiftTime:parseObject(legacy.hrEmployeeShiftTimesV1),
    location:parseObject(legacy.hrEmployeeLocationsV1),
    dayOff:parseObject(legacy.hrEmployeeDayOffV1),
    profile:parseObject(legacy.hrEmployeeProfileOverridesV1),
    leaveCredit:parseObject(legacy.hrEmployeeLeaveCreditOverridesV1)
  };
  const accountByEmployee=new Map(Object.values(accounts).filter(row=>row?.employeeNo).map(row=>[String(row.employeeNo),row]));
  const employeeByNo=new Map(employees.filter(row=>row?.no).map(row=>[String(row.no),row]));
  const employeeNos=new Set([...employeeByNo.keys(),...accountByEmployee.keys(),...Object.values(maps).flatMap(map=>Object.keys(map))]);
  const grouped={};
  employeeNos.forEach(employeeNo=>{
    const account=accountByEmployee.get(employeeNo)||{};
    const sourceEmployee=employeeByNo.get(employeeNo)||null;
    const profileOverride=maps.profile[employeeNo]||{};
    const department=String(profileOverride.department||sourceEmployee?.department||account.employeeDepartment||account.department||"Unassigned");
    const departmentKey=departmentIdentity(department);
    grouped[departmentKey]??={_department:department,employees:{}};
    const employee=sourceEmployee||{
      no:employeeNo,
      name:account.employeeName||account.displayName||account.username||employeeNo,
      position:account.position||"Employee",
      department,
      employmentStatus:"Regular",
      migratedFromAccount:true
    };
    const node={_department:department,employee:{...employee,no:employeeNo}};
    Object.entries(maps).forEach(([field,map])=>{if(Object.prototype.hasOwnProperty.call(map,employeeNo))node[field]=map[employeeNo];});
    grouped[departmentKey].employees[safePathPart(employeeNo)]=node;
  });
  return grouped;
}

async function migratePrivacyDirectory(profile){
  if(profile?.role!=="IT")return false;
  const versionSnap=await get(ref(db,"system/privacySchemaVersion")).catch(()=>null);
  if(Number(versionSnap?.val()||0)>=PRIVACY_SCHEMA_VERSION)return false;
  const keys=[...EMPLOYEE_DIRECTORY_APP_KEYS];
  const [legacyResults,accountsSnap]=await Promise.all([
    Promise.all(keys.map(async key=>{const snap=await get(ref(db,`appData/${key}`)).catch(()=>null);return [key,snap?.val()];})),
    get(ref(db,"accounts"))
  ]);
  const legacy=Object.fromEntries(legacyResults);
  const accounts=accountsSnap.val()||{};
  const grouped=buildEmployeeDirectoryFromLegacy(legacy,accounts);
  await set(ref(db,EMPLOYEE_DIRECTORY_PATH),grouped);
  const publicAccounts={};
  Object.entries(accounts).forEach(([uid,row])=>{if(shouldPublishAccount(row))publicAccounts[uid]=publicAccountProfile(row);});
  await set(ref(db,PUBLIC_ACCOUNT_DIRECTORY_PATH),publicAccounts);
  await set(ref(db,"system/privacySchemaVersion"),PRIVACY_SCHEMA_VERSION);
  return true;
}

async function readVisibleAccountDirectory(profile){
  if(profile?.role==="IT" || hasEmployeeMasterAccess(profile)){
    const snap=await get(ref(db,"accounts"));
    return snap.val()||{};
  }
  if(profile?.role==="Employee"){
    const ownSnap=await get(ref(db,`accounts/${auth.currentUser.uid}`));
    return {[auth.currentUser.uid]:ownSnap.val()||{}};
  }
  const [publicSnap,ownSnap]=await Promise.all([
    get(ref(db,PUBLIC_ACCOUNT_DIRECTORY_PATH)),
    get(ref(db,`accounts/${auth.currentUser.uid}`))
  ]);
  return {...(publicSnap.val()||{}),[auth.currentUser.uid]:{...(publicSnap.val()?.[auth.currentUser.uid]||{}),...(ownSnap.val()||{})}};
}

async function visibleOwnerIds(profile){
  if(!profile)return [];
  if(profile.role==="Employee")return profile.employeeNo?[safePathPart(profile.employeeNo)]:[];
  if(profile.role==="Request Approver"){
    const directory=await readEmployeeDirectory(profile);
    return [...new Set(Object.entries(directory).filter(([,node])=>normalizedDepartment(node?.employee?.department||node?._department)==="admin").map(([employeeNo])=>safePathPart(employeeNo)))];
  }
  if(profile.role!=="Supervisor")return [];
  const directory=await readDepartmentEmployeeDirectory(profile.department).catch(()=>({}));
  return [...new Set(Object.keys(directory).map(employeeNo=>safePathPart(employeeNo)).concat(profile.employeeNo?[safePathPart(profile.employeeNo)]:[]))];
}

async function readRecordCollection(key,profile){
  if(profile?.role==="Request Approver" && !["hrOvertimeMonitoringV3","hrLeaveRequestsV1","hrPayslipsV1","hrEmployeeAttendanceOTSubmissionsV1"].includes(key))return [];
  if(key==="hrPayslipsV1" && profile?.role==="IT")return [];
  if(hasFullRecordReadAccess(profile,key)){
    const snap=await get(ref(db,`v2/collections/${key}`));
    return rowsFromCollection(snap.val());
  }
  const owners=key==="hrPayslipsV1"
    ? [...new Set([
        auth?.currentUser?.uid?safePathPart(auth.currentUser.uid):"",
        profile?.employeeNo?safePathPart(profile.employeeNo):""
      ].filter(Boolean))]
    : await visibleOwnerIds(profile);
  const snaps=await Promise.all(owners.map(owner=>get(ref(db,`v2/collections/${key}/${owner}`)).catch(()=>null)));
  const rows=snaps.flatMap(snap=>snap?.exists()?rowsFromCollection({owner:snap.val()}):[]);
  if(key!=="hrPayslipsV1")return rows;
  return [...new Map(rows.map((row,index)=>[String(row?.id||`payslip-${index}`),row])).values()];
}

async function readRecordCollectionForHydration(key,profile,unavailableKeys=[]){
  try{
    return await readRecordCollection(key,profile);
  }catch(error){
    const permissionDenied=isPermissionDeniedError(error);
    // Payslips were introduced after the other private record collections.
    // If Hosting is updated before the matching Database Rules, do not lock
    // every non-IT user out of the application. The inbox stays empty and all
    // payslip writes remain blocked until the rules are published.
    if((key==="hrPayslipsV1" || key==="hrOTAgreementsV1") && permissionDenied){
      unavailableKeys.push(key);
      console.warn(`Firebase ${key==="hrOTAgreementsV1"?"OT agreement":"payslip"} access is not active yet. Publish database.rules.json to enable this feature.`);
      return [];
    }
    throw error;
  }
}

function keepServerSubmissionReviewFields(row,saved){
  ["status","supervisorOTReviewStatus","gmReviewedAt","hrReviewedAt","supervisorOTReviewReason","supervisorOTReviewedAt","supervisorOTReviewedBy","supervisorEditedAt","supervisorEditedBy"].forEach(field=>{
    if(Object.prototype.hasOwnProperty.call(saved,field))row[field]=saved[field];
    else delete row[field];
  });
  return row;
}

async function writeRecordCollection(key,value){
  const desired=parseRows(value).map((row,index)=>normalizeRecordRow(row,key,index));
  const profile=await currentProfile();
  const adminLeaveApproval=hasAdminLeaveApprovalAccess(profile,key);
  const adminPayslip=hasAdminPayslipAccess(profile,key);
  const elevated=profile?.role==="HR" || (profile?.role==="IT" && key!=="hrPayslipsV1") || (profile?.role==="Request Approver" && ["hrOvertimeMonitoringV3","hrLeaveRequestsV1"].includes(key)) || adminLeaveApproval || adminPayslip;
  const canReconcileDeletes=key!=="hrPayslipsV1" && (profile?.role==="HR" || profile?.role==="IT");
  const supervisor=profile?.role==="Supervisor";
  const employee=profile?.role==="Employee";
  const allowed=desired.filter(row=>{
    if(key==="hrPayslipsV1")return elevated && Boolean(String(row?.recipientUid||"").trim());
    if(elevated)return true;
    if(supervisor)return normalizedDepartment(row?.department)===normalizedDepartment(profile.department);
    return employee && String(row?.employeeNo||"")===String(profile.employeeNo||"");
  }).map(row=>{
    if(adminLeaveApproval)return row;
    // Restricted writes use the authenticated account identity. This prevents
    // rejected saves from stale casing, department spelling, or number types.
    if(employee)return {...row,employeeNo:String(profile.employeeNo||row.employeeNo),department:String(profile.employeeDepartment||profile.department||row.department||"")};
    if(supervisor)return {...row,department:String(profile.department||row.department||"")};
    return row;
  });
  // A filtered-out record used to resolve as a successful Firebase save even
  // though nothing was written. Surface the authorization/linking problem so
  // the form keeps its local copy and tells the user that cloud saving failed.
  if(desired.length && !allowed.length){
    throw new Error("This account is not authorized to save the selected employee record. Verify the Employee No. and department linked to the login.");
  }
  if(employee && key==="hrEmployeeAttendanceOTSubmissionsV1" && allowed.length){
    // The employee's browser may still hold an older review state (including
    // after a denied write). Always use the current server state for fields
    // controlled by the Supervisor / Approver before submitting this batch.
    const owner=safePathPart(profile.employeeNo);
    const snapshot=await get(ref(db,`v2/collections/${key}/${owner}/items`));
    const existing=snapshot.val()||{};
    allowed.forEach((row,index)=>{
      const saved=existing[recordIdentity(row,index)];
      if(!saved)return;
      keepServerSubmissionReviewFields(row,saved);
    });
  }
  const grouped={};
  allowed.forEach((row,index)=>{
    const owner=ownerIdentity(row,key);
    grouped[owner]??={department:String(row?.department||profile?.employeeDepartment||profile?.department||""),items:{}};
    grouped[owner].items[recordIdentity(row,index)]=row;
  });
  let existingCollection={};
  let candidateOwners=Object.keys(grouped);
  // Only IT and HR are allowed to treat the browser snapshot as the complete
  // collection and reconcile deletions. Employee, Supervisor and Approver views
  // are intentionally partial; deleting records missing from those views causes
  // Firebase permission failures and leaves the save pending until a later refresh.
  if(canReconcileDeletes){
    const snap=await get(ref(db,`v2/collections/${key}`)).catch(()=>null);
    existingCollection=snap?.val()||{};
    candidateOwners=[...new Set(candidateOwners.concat(Object.keys(existingCollection)))];
  }
  // Commit every changed employee owner in one atomic update. Sequential owner
  // writes allowed realtime listeners to hydrate only the first employee and
  // re-render the form before the rest of a submitted batch completed.
  const collectionPatch={};
  candidateOwners.forEach(owner=>{
    const existing=existingCollection?.[owner]?.items||{};
    const next=grouped[owner]||{department:String(existingCollection?.[owner]?._department||""),items:{}};
    if(next.department)collectionPatch[`${owner}/_department`]=next.department;
    Object.entries(next.items).forEach(([id,row])=>{collectionPatch[`${owner}/items/${id}`]=row;});
    if(canReconcileDeletes){
      Object.keys(existing).forEach(id=>{
        if(!Object.prototype.hasOwnProperty.call(next.items,id))collectionPatch[`${owner}/items/${id}`]=null;
      });
    }
  });
  if(Object.keys(collectionPatch).length){
    await update(ref(db,`v2/collections/${key}`),collectionPatch);
  }
}

// Record the first actual visit to the employee's agreement page. A transaction
// leaves any simultaneous OK/NO response and other agreement fields intact.
async function markOTAgreementOpened(employeeNo,agreementId){
  await ready;
  if(!auth?.currentUser || !db)throw new Error("Sign in before opening an OT agreement.");
  const profile=await currentProfile();
  if(profile?.role!=="Employee" || String(profile.employeeNo||"")!==String(employeeNo||"")){
    throw new Error("Only the assigned employee can open this OT agreement.");
  }
  const recordRef=ref(db,`v2/collections/hrOTAgreementsV1/${safePathPart(employeeNo)}/items/${safePathPart(agreementId)}`);
  const result=await runTransaction(recordRef,current=>{
    if(!current || String(current.id)!==String(agreementId) || current.status!=="Pending Response" || current.employeeAgreementOpenedAt)return;
    return {...current,employeeAgreementOpenedAt:new Date().toISOString()};
  },{applyLocally:false});
  return result.snapshot.val()?.employeeAgreementOpenedAt||"";
}

async function deliverPayslips(rows=[]){
  await ready;
  if(!auth?.currentUser || !db)throw new Error("Sign in before sending payslips.");
  const profile=await currentProfile();
  if(!profile || profile.active===false || !(profile.role==="HR" || hasAdminPayslipAccess(profile,"hrPayslipsV1"))){
    throw new Error("This account is not authorized to send payslips.");
  }
  const accountsSnap=await get(ref(db,"accounts"));
  const accounts=accountsSnap.val()||{};
  const approved=[];
  const rejected=[];
  parseRows(JSON.stringify(rows||[])).forEach((source,index)=>{
    const row=normalizeRecordRow(source,"hrPayslipsV1",index);
    const recipientUid=String(row?.recipientUid||"").trim();
    const account=recipientUid?accounts[recipientUid]:null;
    const id=String(row?.id||"");
    if(!recipientUid || !account){rejected.push({id,employeeNo:String(row.employeeNo||""),reason:"recipient Firebase account was not found"});return;}
    if(account.active===false){rejected.push({id,employeeNo:String(row.employeeNo||""),reason:"recipient account is inactive"});return;}
    if(account.role==="IT"){rejected.push({id,employeeNo:String(row.employeeNo||""),reason:"IT accounts cannot receive payroll payslips"});return;}
    if(String(account.employeeNo||"")!==String(row.employeeNo||"")){
      rejected.push({id,employeeNo:String(row.employeeNo||""),reason:"recipient Employee No. no longer matches the payroll record"});return;
    }
    approved.push({row:{...row,recipientUid},owner:safePathPart(recipientUid),recordKey:recordIdentity(row,index)});
  });
  const payslipCollectionSnap=await get(ref(db,"v2/collections/hrPayslipsV1"));
  const payslipCollection=payslipCollectionSnap.val()||{};
  const periodIdentity=row=>[
    String(row?.employeeNo||"").trim(),
    String(row?.cutoffStart||"").trim(),
    String(row?.cutoffEnd||"").trim()
  ].join("|");
  const approvedPeriods=new Map(approved.map(delivery=>[periodIdentity(delivery.row),delivery]));
  const patch={};
  // Remove any older-key copy of the same employee/cutoff before writing the
  // canonical record. This makes resending an update, not another inbox card.
  Object.entries(payslipCollection).forEach(([existingOwner,node])=>{
    Object.entries(node?.items||{}).forEach(([existingKey,existingRow])=>{
      const replacement=approvedPeriods.get(periodIdentity(existingRow));
      if(!replacement)return;
      if(existingOwner===replacement.owner&&existingKey===replacement.recordKey)return;
      patch[`${existingOwner}/items/${existingKey}`]=null;
    });
  });
  approved.forEach(({row,owner,recordKey})=>{
    patch[`${owner}/_department`]=String(row.department||"");
    patch[`${owner}/items/${recordKey}`]=row;
  });
  if(Object.keys(patch).length)await update(ref(db,"v2/collections/hrPayslipsV1"),patch);
  const verification=await Promise.all(approved.map(async delivery=>{
    try{
      const snap=await get(ref(db,`v2/collections/hrPayslipsV1/${delivery.owner}/items/${delivery.recordKey}`));
      const saved=snap.val()||{};
      const verified=snap.exists() && String(saved.id||"")===String(delivery.row.id||"") && String(saved.recipientUid||"")===String(delivery.row.recipientUid||"") && String(saved.employeeNo||"")===String(delivery.row.employeeNo||"");
      return {...delivery,verified};
    }catch{return {...delivery,verified:false};}
  }));
  const delivered=[];
  verification.forEach(result=>{
    if(result.verified)delivered.push({id:String(result.row.id||""),employeeNo:String(result.row.employeeNo||""),recipientUid:String(result.row.recipientUid||"")});
    else rejected.push({id:String(result.row.id||""),employeeNo:String(result.row.employeeNo||""),reason:"Firebase could not verify the recipient inbox"});
  });
  return {delivered,rejected};
}

async function migrateLegacyRecordCollections(profile,cloud){
  if(profile?.role!=="IT")return false;
  const versionSnap=await get(ref(db,"system/schemaVersion")).catch(()=>null);
  if(Number(versionSnap?.val()||0)>=2)return false;
  for(const key of CLEARABLE_RECORD_COLLECTION_KEYS){
    const current=await readRecordCollection(key,profile);
    if(current.length){cloud[key]=JSON.stringify(current);continue;}
    const legacySnap=await get(ref(db,`appData/${key}`)).catch(()=>null);
    const legacyRows=parseRows(legacySnap?.val());
    if(legacyRows.length){
      await writeRecordCollection(key,JSON.stringify(legacyRows));
      cloud[key]=JSON.stringify(legacyRows);
    }
  }
  await set(ref(db,"system/schemaVersion"),2);
  return true;
}

function readPendingWrites(){
  try{
    const value=JSON.parse(sessionStorage.getItem(PENDING_WRITE_KEY)||"{}");
    return value && typeof value==="object" ? value : {};
  }catch{return {};}
}

function writePendingWrites(rows){
  const value=rows && typeof rows==="object" ? rows : {};
  if(Object.keys(value).length){
    sessionStorage.setItem(PENDING_WRITE_KEY,JSON.stringify(value));
    if(auth?.currentUser?.uid)sessionStorage.setItem(PENDING_WRITE_OWNER_KEY,auth.currentUser.uid);
  }else{
    sessionStorage.removeItem(PENDING_WRITE_KEY);
    sessionStorage.removeItem(PENDING_WRITE_OWNER_KEY);
  }
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

function isPermissionDeniedError(error){
  const details=`${error?.code||""} ${error?.message||""}`.toLowerCase().replace(/_/g,"-");
  return details.includes("permission-denied") || details.includes("permission denied");
}

function firebaseErrorMessage(error){
  const code = String(error?.code || "");
  if(code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) return "Invalid username or password.";
  if(code.includes("email-already-in-use")) return "That email/username already exists in Firebase Authentication.";
  if(code.includes("weak-password")) return "Password is too weak. Use at least 12 characters.";
  if(code.includes("invalid-email")) return "Invalid Firebase Authentication email/username.";
  if(code.includes("operation-not-allowed")) return "Email/Password sign-in is not enabled in Firebase Authentication. Enable it under Authentication → Sign-in method.";
  if(code.includes("too-many-requests")) return "Firebase temporarily blocked sign-in attempts because there were too many requests. Wait a moment and try again.";
  if(code.includes("unauthorized-domain")) return "This website domain is not authorized in Firebase Authentication settings.";
  if(code.includes("operation-not-supported-in-this-environment")) return "Firebase Authentication cannot run from this page environment. Open the app through localhost, GitHub Pages, or Firebase Hosting instead of file://.";
  if(code.includes("network-request-failed")) return "Cannot reach Firebase. Check the internet connection.";
  if(isPermissionDeniedError(error)) return "Firebase Authentication may be valid, but Realtime Database access was denied. Publish the included database.rules.json rules.";
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

function clearScopedBrowserData(){
  clearLocalAppKeys();
  localStorage.removeItem(DIRECTORY_KEY);
  SESSION_SCOPED_APP_KEYS.forEach(key=>sessionStorage.removeItem(key));
}

function applyDataResetMarker(marker){
  const value=Number(marker||0);
  if(!Number.isSafeInteger(value) || value<=Number(sessionStorage.getItem(DATA_RESET_MARKER_KEY)||0))return false;
  clearScopedBrowserData();
  writePendingWrites({});
  sessionStorage.setItem(DATA_RESET_MARKER_KEY,String(value));
  return true;
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

async function reserveEmployeeNo(){
  await ready;
  if(!auth?.currentUser || !db)throw new Error("Sign in before adding an employee.");
  const profile=await currentProfile();
  if(!profile || profile.active===false || !hasEmployeeMasterAccess(profile)){
    throw new Error("Only HR or an authorized Admin Employee Master List account can generate an Employee No.");
  }
  const year=String(new Date().getFullYear());
  for(let attempt=0;attempt<20;attempt+=1){
    const result=await runTransaction(ref(db,`system/employeeNumberCounters/${year}`),current=>{
      if(current!==null && (!Number.isInteger(current) || current<0 || current>=999999))return;
      return Number(current||0)+1;
    },{applyLocally:false});
    if(!result.committed)throw new Error("Unable to reserve the next Employee No.");
    const sequence=Number(result.snapshot.val());
    const candidate=`EMP-${year}-${String(sequence).padStart(4,"0")}`;
    const directory=await readEmployeeDirectory(profile);
    if(!Object.prototype.hasOwnProperty.call(directory,candidate))return candidate;
  }
  throw new Error(`Unable to generate a unique Employee No. for ${year}.`);
}

async function requireIT(){
  const profile=await currentProfile();
  if(!profile || profile.active===false || profile.role!=="IT") throw new Error("Only an active IT account can manage system accounts.");
  return profile;
}

function storeDirectory(accountsValue){
  const value=accountsValue||{};
  const rows=Object.entries(value).map(([uid,profile])=>({uid,...(profile||{})}));
  sessionStorage.setItem(DIRECTORY_KEY,JSON.stringify(rows));
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
  await setPersistence(auth,browserLocalPersistence);
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
    await set(ref(secondaryDb,`${PUBLIC_ACCOUNT_DIRECTORY_PATH}/${credential.user.uid}`),publicAccountProfile(profile));
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
  if(String(values.itPassword||"").length<12 || String(values.hrPassword||"").length<12)throw new Error("IT and HR passwords must be at least 12 characters.");
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
  let credential;
  try{
    credential=await signInWithEmailAndPassword(auth,usernameToEmail(username),password);
    let snap;
    try{
      snap=await get(ref(db,`accounts/${credential.user.uid}`));
    }catch(error){
      await signOut(auth);
      if(isPermissionDeniedError(error)){
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
    clearScopedBrowserData();
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
  const pendingOwner=sessionStorage.getItem(PENDING_WRITE_OWNER_KEY);
  if(Object.keys(rows).length && pendingOwner!==auth.currentUser.uid){
    // Never replay one account's unfinished browser save as another account.
    writePendingWrites({});
    return true;
  }
  let allOk=true;
  for(const [key,entry] of Object.entries(rows)){
    if(!isAppStorageKey(key)){clearPendingWrite(key);continue;}
    try{
      if(key===RECRUITMENT_REQUEST_KEY){
        if(entry?.op==="remove")await removeRecruitmentCompatibility();
        else await writeRecruitmentCompatibility(String(entry?.value??"[]"));
      }else if(RECORD_COLLECTION_KEYS.has(key)){
        if(entry?.op==="remove")await writeRecordCollection(key,"[]");
        else await writeRecordCollection(key,String(entry?.value??"[]"));
      }else if(EMPLOYEE_DIRECTORY_APP_KEYS.has(key)){
        if(entry?.op==="remove")await enqueueEmployeeDirectoryWrite(key,key==="hrCustomEmployeesV1"?"[]":"{}");
        else await enqueueEmployeeDirectoryWrite(key,String(entry?.value??(key==="hrCustomEmployeesV1"?"[]":"{}")));
      }else if(key===EMPLOYEE_SALARY_KEY){
        await writeEmployeeSalaryMap(entry?.op==="remove"?"{}":String(entry?.value??"{}"));
      }else if(key===EMPLOYEE_PAYROLL_DEDUCTION_KEY){
        await writeEmployeePayrollDeductionMap(entry?.op==="remove"?"{}":String(entry?.value??"{}"));
      }else if(key===EMPLOYEE_PRIVATE_PROFILE_KEY){
        await writeEmployeePrivateProfileMap(entry?.op==="remove"?"{}":String(entry?.value??"{}"));
      }else if(entry?.op==="remove")await remove(ref(db,`appData/${key}`));
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
  // Once a full reset has occurred, browser-only legacy data is never a
  // source of truth again, even if an older realtime callback completes late.
  if(sessionStorage.getItem(DATA_RESET_MARKER_KEY))return cloudValue||{};
  const cloud={...(cloudValue||{})};
  const local=collectLocalAppData();
  const patch={};
  Object.entries(local).forEach(([key,value])=>{
    if(RECORD_COLLECTION_KEYS.has(key) || EMPLOYEE_DIRECTORY_APP_KEYS.has(key) || key===EMPLOYEE_SALARY_KEY || key===EMPLOYEE_PAYROLL_DEDUCTION_KEY || key===EMPLOYEE_PRIVATE_PROFILE_KEY)return;
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
    if(SESSION_SCOPED_APP_KEYS.has(key)){
      // Transaction collections are scoped to the signed-in account. Keeping
      // them in localStorage let different localhost tabs overwrite each other.
      localStorage.removeItem(key);
      sessionStorage.setItem(key,String(value));
    }else localStorage.setItem(key,String(value));
  });
  Object.entries(pending).forEach(([key,entry])=>{
    if(!isAppStorageKey(key))return;
    const storage=appStorageForKey(key);
    if(entry?.op==="remove")storage.removeItem(key);
    else storage.setItem(key,String(entry?.value??""));
  });
}

async function pullAppData(){
  await ready;
  if(!auth?.currentUser || !db)return;
  suppressRealtimeDispatch=true;
  const unavailableRecordKeys=[];
  try{
    const resetSnap=await get(ref(db,"system/dataResetAt"));
    applyDataResetMarker(resetSnap.val());
    const profile=await currentProfile();
    if(profile?.role==="IT")await migratePrivacyDirectory(profile);
    const privacyVersionSnap=await get(ref(db,"system/privacySchemaVersion")).catch(()=>null);
    if(Number(privacyVersionSnap?.val()||0)<PRIVACY_SCHEMA_VERSION){
      throw new Error("Employee privacy migration is not ready. Sign in with the IT account once before other users continue.");
    }
    // Retry any save that was interrupted by refresh/offline before hydrating from cloud.
    await flushPendingWrites();
    const [sharedResults,recordResults,directoryRows,accountsValue,privateProfileMap]=await Promise.all([
      Promise.all(SHARED_APP_KEYS.map(async key=>{
        try{const snap=await get(ref(db,`appData/${key}`));return [key,snap.val()];}
        catch{return [key,null];}
      })),
      Promise.all([...RECORD_COLLECTION_KEYS].map(async key=>[key,await readRecordCollectionForHydration(key,profile,unavailableRecordKeys)])),
      readEmployeeDirectory(profile),
      readVisibleAccountDirectory(profile),
      readEmployeePrivateProfileMap(profile)
    ]);
    const cloud=Object.fromEntries(sharedResults.filter(([,value])=>value!==null && value!==undefined));
    if(canReadActivityLog(profile)){
      try{
        const activitySnap=await get(ref(db,"v2/activityLog"));
        if(activitySnap.exists()){
          const activityRows=Object.values(activitySnap.val()||{}).filter(Boolean).sort((a,b)=>new Date(a.at||0).getTime()-new Date(b.at||0).getTime()).slice(-400);
          cloud[ACTIVITY_LOG_KEY]=JSON.stringify(activityRows);
        }
      }catch(error){console.warn("Firebase activity log hydration:",error);}
    }
    Object.assign(cloud,employeeDirectoryCloudProjection(directoryRows));
    if(hasEmployeeMasterAccess(profile)){
      cloud[EMPLOYEE_PRIVATE_PROFILE_KEY]=JSON.stringify(privateProfileMap);
    }
    recordResults.forEach(([key,rows])=>{cloud[key]=JSON.stringify(rows);});
    await migrateLegacyRecordCollections(profile,cloud);
    await backfillLocalOnlyData(cloud);
    applyCloudSnapshot(cloud);
    storeDirectory(accountsValue);
  }finally{
    suppressRealtimeDispatch=false;
  }
  startRealtimeSync();
  return {unavailableRecordKeys:[...new Set(unavailableRecordKeys)]};
}

function refreshAfterDataReset(){
  if(!dataResetRefreshPromise){
    dataResetRefreshPromise=pullAppData()
      .then(result=>{dispatchCloudSync({type:"full-data-reset"});return result;})
      .finally(()=>{dataResetRefreshPromise=null;});
  }
  return dataResetRefreshPromise;
}

function startRealtimeSync(){
  if(!auth?.currentUser || !db)return;
  appDataUnsub.forEach(unsub=>unsub());
  appDataUnsub=[];
  if(accountsUnsub)accountsUnsub();
  currentProfile().then(async profile=>{
    const resetUnsub=onValue(ref(db,"system/dataResetAt"),snap=>{
      if(!applyDataResetMarker(snap.val()))return;
      refreshAfterDataReset().catch(error=>console.error("Firebase full reset refresh:",error));
    },error=>console.error("Firebase reset marker sync:",error));
    appDataUnsub.push(resetUnsub);
    for(const key of SHARED_APP_KEYS){
      const unsub=onValue(ref(db,`appData/${key}`),snap=>{
        // Keep a newer local save while its Firebase write is still pending.
        if(Object.prototype.hasOwnProperty.call(readPendingWrites(),key))return;
        const storage=appStorageForKey(key);
        if(snap.exists())storage.setItem(key,String(snap.val()));
        else storage.removeItem(key);
        dispatchCloudSync({type:"appData",key});
      },error=>console.error(`Firebase ${key} sync:`,error));
      appDataUnsub.push(unsub);
    }
    if(canReadActivityLog(profile)){
      const activityUnsub=onValue(ref(db,"v2/activityLog"),snap=>{
        if(snap.exists()){
          const activityRows=Object.values(snap.val()||{}).filter(Boolean).sort((a,b)=>new Date(a.at||0).getTime()-new Date(b.at||0).getTime()).slice(-400);
          sessionStorage.setItem(ACTIVITY_LOG_KEY,JSON.stringify(activityRows));
        }else sessionStorage.removeItem(ACTIVITY_LOG_KEY);
        dispatchCloudSync({type:"activity-log",key:ACTIVITY_LOG_KEY});
      },error=>console.error("Firebase activity log sync:",error));
      appDataUnsub.push(activityUnsub);
    }
    const employeeDirectoryPaths=hasFullEmployeeDirectoryReadAccess(profile)
      ? [EMPLOYEE_DIRECTORY_PATH]
      : profile.role==="Supervisor"
        ? [`${EMPLOYEE_DIRECTORY_PATH}/${departmentIdentity(profile.department)}`]
        : profile.role==="Employee" && profile.employeeNo
          ? [`${EMPLOYEE_DIRECTORY_PATH}/${departmentIdentity(profile.employeeDepartment||profile.department)}/employees/${safePathPart(profile.employeeNo)}`]
          : [];
    employeeDirectoryPaths.forEach(path=>{
      const unsub=onValue(ref(db,path),async()=>{
        const projection=employeeDirectoryCloudProjection(await readEmployeeDirectory(profile));
        Object.entries(projection).forEach(([key,value])=>{
          if(!Object.prototype.hasOwnProperty.call(readPendingWrites(),key))appStorageForKey(key).setItem(key,value);
        });
        dispatchCloudSync({type:"employee-directory"});
      },error=>console.error("Firebase employee directory sync:",error));
      appDataUnsub.push(unsub);
    });
    if(hasEmployeeMasterAccess(profile)){
      const unsub=onValue(ref(db,EMPLOYEE_COMPENSATION_PATH),async()=>{
        const pending=readPendingWrites();
        const profilePending=Object.prototype.hasOwnProperty.call(pending,EMPLOYEE_PRIVATE_PROFILE_KEY);
        if(profilePending)return;
        const privateProfileMap=await readEmployeePrivateProfileMap(profile);
        sessionStorage.setItem(EMPLOYEE_PRIVATE_PROFILE_KEY,JSON.stringify(privateProfileMap||{}));
        dispatchCloudSync({type:"employee-private-profile"});
      },error=>console.error("Firebase employee private-profile sync:",error));
      appDataUnsub.push(unsub);
    }
    const owners=await visibleOwnerIds(profile);
    for(const key of RECORD_COLLECTION_KEYS){
      const fullCollection=hasFullRecordReadAccess(profile,key);
      const keyOwners=key==="hrPayslipsV1"
        ? [...new Set([
            auth?.currentUser?.uid?safePathPart(auth.currentUser.uid):"",
            profile?.employeeNo?safePathPart(profile.employeeNo):""
          ].filter(Boolean))]
        : owners;
      const paths=fullCollection?[`v2/collections/${key}`]:keyOwners.map(owner=>`v2/collections/${key}/${owner}`);
      paths.forEach(path=>{
        const unsub=onValue(ref(db,path),async()=>{
          if(Object.prototype.hasOwnProperty.call(readPendingWrites(),key))return;
          const rows=await readRecordCollection(key,profile);
          if(Object.prototype.hasOwnProperty.call(readPendingWrites(),key))return;
          sessionStorage.setItem(key,JSON.stringify(rows));
          dispatchCloudSync({type:"records",key});
        },error=>console.error(`Firebase ${key} records sync:`,error));
        appDataUnsub.push(unsub);
      });
    }
    const accountUnsubs=[];
    const refreshAccounts=async()=>{
      storeDirectory(await readVisibleAccountDirectory(profile));
      dispatchCloudSync({type:"accounts"});
    };
    if(profile.role==="IT" || hasEmployeeMasterAccess(profile)){
      accountUnsubs.push(onValue(ref(db,"accounts"),refreshAccounts,error=>console.error("Firebase accounts sync:",error)));
    }else{
      if(profile.role!=="Employee")accountUnsubs.push(onValue(ref(db,PUBLIC_ACCOUNT_DIRECTORY_PATH),refreshAccounts,error=>console.error("Firebase public account directory sync:",error)));
      accountUnsubs.push(onValue(ref(db,`accounts/${auth.currentUser.uid}`),refreshAccounts,error=>console.error("Firebase own account sync:",error)));
    }
    accountsUnsub=()=>accountUnsubs.forEach(unsub=>unsub());
  }).catch(error=>console.error("Firebase realtime setup:",error));
}

async function appendActivityLog(entry={}){
  await ready;
  if(!auth?.currentUser || !db)return false;
  const profile=await currentProfile();
  if(!profile || profile.active===false)return false;
  const now=new Date().toISOString();
  const safeEntry={
    id:String(entry.id||`ACT-${Date.now()}-${Math.random().toString(36).slice(2,8)}`),
    module:String(entry.module||"System").slice(0,120),
    action:String(entry.action||"Updated").slice(0,80),
    target:String(entry.target||"").slice(0,220),
    detail:String(entry.detail||"").slice(0,500),
    recordId:String(entry.recordId||"").slice(0,180),
    at:now,
    actorUid:String(auth.currentUser.uid||"").slice(0,180),
    actorUsername:String(profile.username||"").slice(0,120),
    actorName:String(profile.displayName||profile.employeeName||profile.username||profile.role||"User").slice(0,180),
    actorRole:String(profile.role||"").slice(0,80),
    actorDepartment:String(profile.employeeDepartment||profile.department||"").slice(0,120)
  };
  await set(ref(db,`v2/activityLog/${safePathPart(safeEntry.id)}`),safeEntry);
  if(canReadActivityLog(profile)){
    let rows=[];
    try{const parsed=JSON.parse(sessionStorage.getItem(ACTIVITY_LOG_KEY)||"[]");if(Array.isArray(parsed))rows=parsed;}catch{}
    rows.push(safeEntry);
    rows=rows.filter(row=>row&&row.at).sort((a,b)=>new Date(a.at||0).getTime()-new Date(b.at||0).getTime()).slice(-400);
    sessionStorage.setItem(ACTIVITY_LOG_KEY,JSON.stringify(rows));
    dispatchCloudSync({type:"activity-log",key:ACTIVITY_LOG_KEY});
  }
  return true;
}

async function syncKey(key,value){
  if(!isAppStorageKey(key))return true;
  // Queue synchronously before the first await so an immediate browser refresh cannot lose this save.
  queuePendingWrite(key,{op:"set",value:String(value)});
  await ready;
  if(!auth?.currentUser || !db)return false;
  try{
    if(key===RECRUITMENT_REQUEST_KEY)await writeRecruitmentCompatibility(String(value));
    else if(RECORD_COLLECTION_KEYS.has(key))await writeRecordCollection(key,String(value));
    else if(EMPLOYEE_DIRECTORY_APP_KEYS.has(key))await enqueueEmployeeDirectoryWrite(key,String(value));
    else if(key===EMPLOYEE_SALARY_KEY)await writeEmployeeSalaryMap(String(value));
    else if(key===EMPLOYEE_PAYROLL_DEDUCTION_KEY)await writeEmployeePayrollDeductionMap(String(value));
    else if(key===EMPLOYEE_PRIVATE_PROFILE_KEY)await writeEmployeePrivateProfileMap(String(value));
    else await set(ref(db,`appData/${key}`),String(value));
    clearPendingWrite(key);
    if(key==="hrEmployeeAttendanceOTSubmissionsV1"){
      try{
        const profile=await currentProfile();
        if(profile?.role==="Employee"){
          const rows=await readRecordCollection(key,profile);
          appStorageForKey(key).setItem(key,JSON.stringify(rows));
        }
      }catch(error){console.warn("Employee submission was saved, but the local review state could not refresh:",error);}
    }
    dispatchCloudSync({type:"save-complete",key});
    return true;
  }catch(error){
    console.error(`Firebase sync failed for ${key}:`,error);
    window.dispatchEvent(new CustomEvent("ot-firebase-save-error",{detail:{key,message:firebaseErrorMessage(error)}}));
    return false;
  }
}

async function removeKey(key){
  if(!isAppStorageKey(key))return;
  queuePendingWrite(key,{op:"remove"});
  await ready;
  if(!auth?.currentUser || !db)return;
  try{
    if(key===RECRUITMENT_REQUEST_KEY)await removeRecruitmentCompatibility();
    else if(RECORD_COLLECTION_KEYS.has(key))await writeRecordCollection(key,"[]");
    else if(EMPLOYEE_DIRECTORY_APP_KEYS.has(key))await enqueueEmployeeDirectoryWrite(key,key==="hrCustomEmployeesV1"?"[]":"{}");
    else if(key===EMPLOYEE_SALARY_KEY)await writeEmployeeSalaryMap("{}");
    else if(key===EMPLOYEE_PAYROLL_DEDUCTION_KEY)await writeEmployeePayrollDeductionMap("{}");
    else if(key===EMPLOYEE_PRIVATE_PROFILE_KEY)await writeEmployeePrivateProfileMap("{}");
    else await remove(ref(db,`appData/${key}`));
    clearPendingWrite(key);
  }catch(error){
    console.error(`Firebase remove failed for ${key}:`,error);
  }
}

const IT_RECORD_GROUPS={
  attendance:["hrDailyAttendanceV1","hrEmployeeAttendanceOTSubmissionsV1"],
  leave:["hrLeaveRequestsV1"],
  overtime:["hrOvertimeMonitoringV3","hrOTAgreementsV1"],
  recruitment:[]
};
const IT_RECORD_GROUP_BY_KEY=Object.fromEntries(Object.entries(IT_RECORD_GROUPS).flatMap(([group,keys])=>keys.map(key=>[key,group])));
const IT_RECRUITMENT_KEYS=[RECRUITMENT_REQUEST_KEY,APPLICANT_MONITORING_KEY];
function itPhilippineDate(value){
  const time=new Date(value);
  if(!Number.isFinite(time.getTime()))return String(value||"").slice(0,10);
  const parts=Object.fromEntries(new Intl.DateTimeFormat("en-US",{timeZone:"Asia/Manila",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(time).map(part=>[part.type,part.value]));
  return `${parts.year}-${parts.month}-${parts.day}`;
}
function itRecordDateMatches(row,key,date){
  if(key==="hrLeaveRequestsV1")return String(row?.startDate||"")<=date && date<=String(row?.endDate||row?.startDate||"");
  if(key===RECRUITMENT_REQUEST_KEY)return itPhilippineDate(row?.createdAt)===date;
  if(key===APPLICANT_MONITORING_KEY)return String(row?.dateApplied||"")===date;
  return String(row?.date||row?.otDate||row?.dutyDate||"").slice(0,10)===date;
}
function itRecordDisplayDate(row,key){
  if(key==="hrLeaveRequestsV1")return [row.startDate,row.endDate].filter(Boolean).join(" to ");
  return key===RECRUITMENT_REQUEST_KEY?itPhilippineDate(row.createdAt):String(key===APPLICANT_MONITORING_KEY?row.dateApplied:row.date||row.otDate||row.dutyDate||"").slice(0,10);
}
async function readITRecordSources(){
  const snapshots=await Promise.all([
    ...Object.keys(IT_RECORD_GROUP_BY_KEY).map(key=>get(ref(db,`v2/collections/${key}`))),
    get(ref(db,`appData/${RECRUITMENT_REQUEST_KEY}`)),
    get(ref(db,`appData/${APPLICANT_MONITORING_KEY}`)),
    get(ref(db,`appData/${RECRUITMENT_COMPAT_PREF_KEY}`))
  ]);
  const collections={};
  Object.keys(IT_RECORD_GROUP_BY_KEY).forEach((key,index)=>{collections[key]=snapshots[index].val()||{};});
  const offset=Object.keys(IT_RECORD_GROUP_BY_KEY).length;
  const recruitment=parseRows(snapshots[offset].val());
  const applicants=parseRows(snapshots[offset+1].val());
  const preferences=parseObject(snapshots[offset+2].val());
  const byId=new Map();
  [...(Array.isArray(preferences[RECRUITMENT_COMPAT_FIELD])?preferences[RECRUITMENT_COMPAT_FIELD]:[]),...recruitment].forEach(row=>{
    if(!row?.id)return;
    const older=byId.get(String(row.id));
    if(!older || String(row.updatedAt||row.createdAt||"")>=String(older.updatedAt||older.createdAt||""))byId.set(String(row.id),row);
  });
  return {collections,recruitment:[...byId.values()],applicants,preferences};
}
function itRecordRows(sources,date,group="all"){
  const rows=[];
  for(const [key,collection] of Object.entries(sources.collections)){
    const category=IT_RECORD_GROUP_BY_KEY[key];
    if(group!=="all" && group!==category)continue;
    for(const [owner,node] of Object.entries(collection)){
      for(const [recordId,row] of Object.entries(node?.items||{})){
        if(!row || !itRecordDateMatches(row,key,date))continue;
        rows.push({group:category,key,owner,recordId,id:String(row.id||recordId),date:itRecordDisplayDate(row,key),name:String(row.employeeName||row.employeeNo||"Employee"),status:String(row.status||""),row});
      }
    }
  }
  if(group==="all" || group==="recruitment"){
    for(const [key,items] of [[RECRUITMENT_REQUEST_KEY,sources.recruitment],[APPLICANT_MONITORING_KEY,sources.applicants]]){
      items.forEach(row=>{
        if(!row?.id || !itRecordDateMatches(row,key,date))return;
        rows.push({group:"recruitment",key,owner:"",recordId:String(row.id),id:String(row.id),date:itRecordDisplayDate(row,key),name:String(row.fullName||row.department||"Recruitment"),status:String(row.status||""),row});
      });
    }
  }
  return rows;
}
async function listITRecordsForDate(date,group="all"){
  await ready;await requireIT();
  if(!/^\d{4}-\d{2}-\d{2}$/.test(String(date||"")))throw new Error("Select a valid date.");
  if(group!=="all" && !IT_RECORD_GROUPS[group])throw new Error("Select a valid record category.");
  const sources=await readITRecordSources();
  return itRecordRows(sources,date,group).map(({row,...summary})=>summary);
}
async function deleteITRecords({scope="day",date="",group="all",key="",owner="",recordId=""}={}){
  await ready;await requireIT();
  if(!["all","day","single"].includes(scope))throw new Error("Invalid deletion scope.");
  if(group!=="all" && !IT_RECORD_GROUPS[group])throw new Error("Invalid record category.");
  if(scope!=="all" && !/^\d{4}-\d{2}-\d{2}$/.test(String(date||"")))throw new Error("Select a valid date.");
  const sources=await readITRecordSources();
  const selected=scope==="all"
    ? [...Object.entries(sources.collections).flatMap(([recordKey,collection])=>Object.entries(collection).flatMap(([recordOwner,node])=>Object.entries(node?.items||{}).filter(([,row])=>Boolean(row)).map(([id,row])=>({group:IT_RECORD_GROUP_BY_KEY[recordKey],key:recordKey,owner:recordOwner,recordId:id,id:String(row.id||id),row})))),...sources.recruitment.map(row=>({group:"recruitment",key:RECRUITMENT_REQUEST_KEY,recordId:String(row.id),id:String(row.id),row})),...sources.applicants.map(row=>({group:"recruitment",key:APPLICANT_MONITORING_KEY,recordId:String(row.id),id:String(row.id),row}))]
    : itRecordRows(sources,date,group);
  const targets=scope==="single"?selected.filter(item=>item.key===key && item.owner===owner && item.recordId===recordId):selected;
  if(scope==="single" && targets.length!==1)throw new Error("Record no longer exists on this date. Refresh the list.");
  if(!targets.length)return {verified:true,count:0};
  const deletedParentOTIds=new Set(targets.filter(item=>item.key==="hrOvertimeMonitoringV3" && item.row?.requestKind!=="OT Amendment").map(item=>item.id));
  if(deletedParentOTIds.size){
    for(const [otOwner,node] of Object.entries(sources.collections.hrOvertimeMonitoringV3||{})){
      for(const [otId,otRow] of Object.entries(node?.items||{})){
        if(deletedParentOTIds.has(String(otRow?.parentRequestId||"")) && !targets.some(item=>item.key==="hrOvertimeMonitoringV3" && item.owner===otOwner && item.recordId===otId)){
          targets.push({group:"overtime",key:"hrOvertimeMonitoringV3",owner:otOwner,recordId:otId,id:String(otRow.id||otId),row:otRow});
        }
      }
    }
  }
  const patch={};
  const deletedIds=new Set();
  const leaveIds=new Set();
  const recruitmentIds=new Set();
  const applicantIds=new Set();
  for(const item of targets){
    deletedIds.add(String(item.id));
    if(item.key===RECRUITMENT_REQUEST_KEY){recruitmentIds.add(item.id);continue;}
    if(item.key===APPLICANT_MONITORING_KEY){applicantIds.add(item.id);continue;}
    patch[`v2/collections/${item.key}/${item.owner}/items/${item.recordId}`]=null;
    if(item.key==="hrLeaveRequestsV1"){
      leaveIds.add(item.id);
      if(scope!=="all"){
        const path=String(item.row.leaveProofPath||item.row.leaveProof?.databasePath||"");
        if(/^v2\/leaveProofs\/[^.#$\[\]\/]+\/[^.#$\[\]\/]+$/.test(path))patch[path]=null;
        if(item.row.employeeNo)patch[`${LEAVE_PROOF_DATABASE_PATH}/${safePathPart(item.row.employeeNo)}/${safePathPart(item.id)}`]=null;
      }
    }
  }
  // Generated attendance belongs to the deleted leave request, even when its
  // date is outside the selected day.
  if(leaveIds.size){
    for(const [attendanceOwner,node] of Object.entries(sources.collections.hrDailyAttendanceV1||{})){
      for(const [attendanceId,row] of Object.entries(node?.items||{})){
        if(leaveIds.has(String(row?.sourceLeaveRequestId||"")))patch[`v2/collections/hrDailyAttendanceV1/${attendanceOwner}/items/${attendanceId}`]=null;
      }
    }
  }
  if(scope==="all")patch[LEAVE_PROOF_DATABASE_PATH]=null;
  else if(leaveIds.size){
    const accountSnap=await get(ref(db,"accounts"));
    const accounts=accountSnap.val()||{};
    targets.filter(item=>item.key==="hrLeaveRequestsV1").forEach(item=>{
      const submittedBy=String(item.row.submittedBy||"").toLowerCase();
      Object.entries(accounts).forEach(([uid,account])=>{
        if(String(account?.employeeNo||"")===String(item.row.employeeNo||"") || (submittedBy && String(account?.username||"").toLowerCase()===submittedBy)){
          patch[`${LEAVE_PROOF_DATABASE_PATH}/${safePathPart(uid)}/${safePathPart(item.id)}`]=null;
        }
      });
    });
  }
  const deletedOTKeys=new Set(targets.filter(item=>item.key==="hrOvertimeMonitoringV3").map(item=>`${item.owner}/${item.recordId}`));
  if(deletedOTKeys.size){
    const remainingOT=Object.entries(sources.collections.hrOvertimeMonitoringV3||{}).flatMap(([otOwner,node])=>Object.entries(node?.items||{}).filter(([otId])=>!deletedOTKeys.has(`${otOwner}/${otId}`)).map(([,row])=>row));
    for(const [attendanceOwner,node] of Object.entries(sources.collections.hrDailyAttendanceV1||{})){
      for(const [attendanceId,row] of Object.entries(node?.items||{})){
        if(!row?.employeeNo || !row?.date || patch[`v2/collections/hrDailyAttendanceV1/${attendanceOwner}/items/${attendanceId}`]===null)continue;
        const deletedForEmployeeDate=targets.some(item=>item.key==="hrOvertimeMonitoringV3" && String(item.row.employeeNo)===String(row.employeeNo) && item.row.otDate===row.date);
        if(!deletedForEmployeeDate)continue;
        const remaining=remainingOT.filter(ot=>ot && ot.requestKind!=="OT Amendment" && ot.status==="Approved" && String(ot.employeeNo)===String(row.employeeNo) && ot.otDate===row.date).reduce((sum,ot)=>sum+Number(ot.totalHours||0),0);
        if(row.source==="Approved OT Reconciliation" && !remaining){patch[`v2/collections/hrDailyAttendanceV1/${attendanceOwner}/items/${attendanceId}`]=null;continue;}
        patch[`v2/collections/hrDailyAttendanceV1/${attendanceOwner}/items/${attendanceId}/approvedOtHours`]=Number(remaining.toFixed(2));
      }
    }
  }
  if(recruitmentIds.size){
    patch[`appData/${RECRUITMENT_REQUEST_KEY}`]=JSON.stringify(sources.recruitment.filter(row=>!recruitmentIds.has(String(row.id))));
    patch[`appData/${RECRUITMENT_COMPAT_PREF_KEY}`]=JSON.stringify({...sources.preferences,[RECRUITMENT_COMPAT_FIELD]:(sources.preferences[RECRUITMENT_COMPAT_FIELD]||[]).filter(row=>!recruitmentIds.has(String(row?.id)))});
  }
  if(applicantIds.size)patch[`appData/${APPLICANT_MONITORING_KEY}`]=JSON.stringify(sources.applicants.filter(row=>!applicantIds.has(String(row.id))));
  const notificationKeys=["hrManagerNotificationsV1","hrDecisionNotificationsV1","hrEmployeeLeaveNotificationsV1","hrSupervisorEmployeeNotificationsV1"];
  for(const notificationKey of notificationKeys){
    const snap=await get(ref(db,`appData/${notificationKey}`));
    if(!snap.exists())continue;
    const rows=parseRows(snap.val());
    const filtered=rows.filter(row=>{
      if(leaveIds.has(String(row?.leaveRequestId||"")) || deletedIds.has(String(row?.requestId||"")) || deletedIds.has(String(row?.agreementId||"")))return false;
      if(Array.isArray(row?.requestIds) && row.requestIds.some(id=>deletedIds.has(String(id))))return false;
      return true;
    });
    if(filtered.length!==rows.length)patch[`appData/${notificationKey}`]=JSON.stringify(filtered);
  }
  // All tabs discard pre-deletion browser saves before hydrating the
  // remaining records; master-list and schedule data are read back unchanged.
  const markerSnap=await get(ref(db,"system/dataResetAt"));
  const marker=Math.max(Date.now(),Number(markerSnap.val()||0)+1);
  patch["system/dataResetAt"]=marker;
  await update(ref(db),patch);
  applyDataResetMarker(marker);
  let verificationError=null;
  try{
    const affectedCollections=[...new Set(targets.filter(item=>IT_RECORD_GROUP_BY_KEY[item.key]).map(item=>item.key).concat(leaveIds.size||deletedOTKeys.size?["hrDailyAttendanceV1"]:[]))];
    const verifiedCollections=Object.fromEntries(await Promise.all(affectedCollections.map(async collectionKey=>[collectionKey,(await get(ref(db,`v2/collections/${collectionKey}`))).val()||{}])));
    for(const item of targets){
      if(IT_RECORD_GROUP_BY_KEY[item.key] && verifiedCollections[item.key]?.[item.owner]?.items?.[item.recordId]){
        throw new Error("Deletion completed, but a record is still present in Firebase. Reload before retrying.");
      }
    }
    if(recruitmentIds.size && parseRows((await get(ref(db,`appData/${RECRUITMENT_REQUEST_KEY}`))).val()).some(row=>recruitmentIds.has(String(row.id))))throw new Error("Recruitment deletion could not be verified.");
    if(applicantIds.size && parseRows((await get(ref(db,`appData/${APPLICANT_MONITORING_KEY}`))).val()).some(row=>applicantIds.has(String(row.id))))throw new Error("Applicant deletion could not be verified.");
  }catch(error){verificationError=error;}
  await refreshAfterDataReset();
  if(verificationError)throw verificationError;
  return {verified:true,count:targets.length};
}

async function createManagedUser({username,password,profile}){
  await ready;
  await requireIT();
  if(String(password||"").length<12)throw new Error("Temporary password must be at least 12 characters.");
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
    const directoryPatch=await directoryEmployeePatchFromAccount(record);
    const rootPatch={
      [`accounts/${credential.user.uid}`]:record,
      ...Object.fromEntries(Object.entries(directoryPatch).map(([path,value])=>[`${EMPLOYEE_DIRECTORY_PATH}/${path}`,value]))
    };
    if(shouldPublishAccount(record))rootPatch[`${PUBLIC_ACCOUNT_DIRECTORY_PATH}/${credential.user.uid}`]=publicAccountProfile(record);
    await update(ref(db),rootPatch);
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
  const snap=await get(ref(db,`accounts/${uid}`));
  if(!snap.exists())throw new Error("The system account no longer exists.");
  const next={...snap.val(),...patch,updatedAt:new Date().toISOString()};
  const directoryPatch=await directoryEmployeePatchFromAccount(next);
  const rootPatch={
    [`accounts/${uid}`]:next,
    [`${PUBLIC_ACCOUNT_DIRECTORY_PATH}/${uid}`]:shouldPublishAccount(next)?publicAccountProfile(next):null,
    ...Object.fromEntries(Object.entries(directoryPatch).map(([path,value])=>[`${EMPLOYEE_DIRECTORY_PATH}/${path}`,value]))
  };
  await update(ref(db),rootPatch);
}

async function signOutUser(){
  await ready;
  // Give queued local saves one final cloud flush before ending the Firebase session.
  try{await flushPendingWrites();}catch{}
  appDataUnsub.forEach(unsub=>unsub());
  appDataUnsub=[];
  if(accountsUnsub){accountsUnsub();accountsUnsub=null;}
  if(auth?.currentUser)await signOut(auth);
  writePendingWrites({});
  clearScopedBrowserData();
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
  appendActivityLog,
  syncKey,
  markOTAgreementOpened,
  removeKey,
  listITRecordsForDate,
  deleteITRecords,
  reserveEmployeeNo,
  getEmployeeProfilePhoto,
  setEmployeeProfilePhoto,
  removeEmployeeProfilePhoto,
  uploadLeaveProof,
  attachLeaveProofToRequest,
  getLeaveProof,
  getLeaveProofForRequest,
  deleteLeaveProof,
  createManagedUser,
  updateManagedProfile,
  signOut:signOutUser,
  firebaseErrorMessage
};
