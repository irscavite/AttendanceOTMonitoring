import { initializeApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { getMessaging } from "firebase-admin/messaging";
import { onValueWritten } from "firebase-functions/v2/database";
import { logger } from "firebase-functions";

initializeApp();

const KEYS={
  MANAGER:"hrManagerNotificationsV1",
  HR:"hrDecisionNotificationsV1",
  IT:"hrITAccountCreationRequestsV1",
  EMPLOYEE:"hrEmployeeLeaveNotificationsV1",
  SUPERVISOR:"hrSupervisorEmployeeNotificationsV1",
  CHAT:"hrInternalChatV1"
};
const SUPPORTED=new Set(Object.values(KEYS));

function parseRows(value){
  try{
    const rows=JSON.parse(typeof value==="string"?value:"[]");
    return Array.isArray(rows)?rows:[];
  }catch{return [];}
}
function rowId(row){return String(row?.id||"");}
function clean(value,max=220){
  const text=String(value||"").replace(/\s+/g," ").trim();
  return text.length>max?`${text.slice(0,max-1)}…`:text;
}
function lower(value){return String(value||"").trim().toLowerCase();}

function newRows(beforeValue,afterValue){
  const before=parseRows(beforeValue);
  const after=parseRows(afterValue);
  const ids=new Set(before.map(rowId).filter(Boolean));
  return after.filter(row=>rowId(row) && !ids.has(rowId(row)) && row?.read!==true);
}

function accountEntries(accounts){
  return Object.entries(accounts||{}).map(([uid,profile])=>({uid,...(profile||{})}));
}
function matchingUids(key,row,accounts){
  const list=accountEntries(accounts).filter(a=>a.active!==false);
  if(key===KEYS.MANAGER)return list.filter(a=>a.role==="Request Approver").map(a=>a.uid);
  if(key===KEYS.HR)return list.filter(a=>a.role==="HR").map(a=>a.uid);
  if(key===KEYS.IT)return list.filter(a=>a.role==="IT").map(a=>a.uid);
  if(key===KEYS.EMPLOYEE)return list.filter(a=>a.role==="Employee" && String(a.employeeNo||"")===String(row.employeeNo||"")).map(a=>a.uid);
  if(key===KEYS.SUPERVISOR)return list.filter(a=>a.role==="Supervisor" && lower(a.department)===lower(row.department)).map(a=>a.uid);
  if(key===KEYS.CHAT)return list.filter(a=>lower(a.username)===lower(row.to)).map(a=>a.uid);
  return [];
}
function profileByUsername(accounts,username){
  return accountEntries(accounts).find(a=>lower(a.username)===lower(username));
}
function payloadFor(key,row,accounts){
  if(key===KEYS.IT){
    return {
      title:"New account creation request",
      body:clean(`${row.employeeName||"Employee"} • ${row.department||""} • ${row.position||""}`),
      targetPage:"account-requests"
    };
  }
  if(key===KEYS.CHAT){
    const sender=profileByUsername(accounts,row.from);
    return {
      title:`New message from ${clean(sender?.displayName||sender?.username||row.from||"Internal Chat",80)}`,
      body:clean(row.text||"New internal message"),
      targetPage:"dashboard"
    };
  }
  return {
    title:clean(row.title||"New system notification",100),
    body:clean([row.message,row.details].filter(Boolean).join(" • ")||"You have a new system update."),
    targetPage:clean(row.targetPage||"dashboard",60)
  };
}
function registrationsForUids(pushRegistrations,uids){
  const rows=[];
  for(const uid of new Set(uids)){
    const devices=pushRegistrations?.[uid]||{};
    for(const [deviceId,record] of Object.entries(devices)){
      if(record?.fid)rows.push({uid,deviceId,fid:String(record.fid)});
    }
  }
  return rows;
}
async function sendPushToRegistrations(registrations,payload,row){
  if(!registrations.length)return;
  const messages=registrations.slice(0,500).map(reg=>({
    fid:reg.fid,
    data:{
      title:payload.title,
      body:payload.body,
      targetPage:payload.targetPage||"dashboard",
      notificationId:rowId(row),
      type:String(row?.type||"system")
    },
    webpush:{headers:{Urgency:"high"}}
  }));
  const response=await getMessaging().sendEach(messages);
  if(!response.failureCount)return;
  const cleanup=[];
  response.responses.forEach((result,index)=>{
    if(result.success)return;
    const code=String(result.error?.code||"").toLowerCase();
    logger.warn("Push send failed",{code,message:result.error?.message,fid:registrations[index]?.fid});
    if(code.includes("not-registered") || code.includes("registration-token-not-registered") || code.includes("invalid-argument")){
      const reg=registrations[index];
      if(reg)cleanup.push(getDatabase().ref(`pushRegistrations/${reg.uid}/${reg.deviceId}`).remove());
    }
  });
  await Promise.allSettled(cleanup);
}

export const pushNewSystemNotifications=onValueWritten(
  {ref:"/appData/{key}",instance:"otmonitoring-default-rtdb",region:"us-central1"},
  async(event)=>{
    const key=event.params.key;
    if(!SUPPORTED.has(key))return;
    if(!event.data.after.exists())return;
    const created=newRows(event.data.before.val(),event.data.after.val()).slice(0,20);
    if(!created.length)return;

    const db=getDatabase();
    const [accountsSnap,pushSnap]=await Promise.all([
      db.ref("accounts").get(),
      db.ref("pushRegistrations").get()
    ]);
    const accounts=accountsSnap.val()||{};
    const pushRegistrations=pushSnap.val()||{};

    for(const row of created.reverse()){
      const uids=matchingUids(key,row,accounts);
      const registrations=registrationsForUids(pushRegistrations,uids);
      if(!registrations.length)continue;
      const payload=payloadFor(key,row,accounts);
      await sendPushToRegistrations(registrations,payload,row);
    }
  }
);
