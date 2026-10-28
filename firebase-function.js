"use strict";

const {onCall, HttpsError} = require("firebase-functions/v2/https");
const {initializeApp} = require("firebase-admin/app");
const {getAuth} = require("firebase-admin/auth");
const {getDatabase} = require("firebase-admin/database");

initializeApp({databaseURL:"https://otmonitoring-default-rtdb.firebaseio.com"});

// The browser cannot delete another Firebase Authentication user. This
// callable verifies the IT role again on the server before using Admin SDK.
exports.deleteSystemAccount = onCall({region:"asia-southeast1"},async request=>{
  if(!request.auth?.uid)throw new HttpsError("unauthenticated","Sign in before deleting an account.");
  const uid=request.data?.uid;
  if(typeof uid!=="string" || !/^[A-Za-z0-9_-]{1,128}$/.test(uid)){
    throw new HttpsError("invalid-argument","A valid account UID is required.");
  }
  if(uid===request.auth.uid)throw new HttpsError("failed-precondition","You cannot delete your own IT login.");

  const db=getDatabase();
  const caller=(await db.ref(`accounts/${request.auth.uid}`).get()).val();
  if(caller?.role!=="IT" || caller?.active!==true){
    throw new HttpsError("permission-denied","Only an active IT account can delete system logins.");
  }

  const targetRef=db.ref(`accounts/${uid}`);
  const target=(await targetRef.get()).val();
  if(!target)throw new HttpsError("not-found","The system account no longer exists.");
  if(target.role==="IT" || target.source==="Initial Setup"){
    throw new HttpsError("permission-denied","IT and Initial Setup accounts are protected.");
  }

  // Block access immediately, even if Auth deletion or a later database write
  // fails. A retry can finish a partial deletion while the profile is disabled.
  const disabled=await targetRef.transaction(current=>{
    if(!current || current.role==="IT" || current.source==="Initial Setup")return;
    return {...current,active:false};
  },undefined,false);
  if(!disabled.committed){
    throw new HttpsError("failed-precondition","The account changed during deletion. Reload and try again.");
  }

  try{
    await getAuth().deleteUser(uid);
  }catch(error){
    if(error.code!=="auth/user-not-found"){
      console.error("Firebase Authentication deletion failed",{uid,error});
      throw new HttpsError("internal","The account was disabled, but Firebase Authentication deletion failed. Retry Delete.");
    }
    // Previous attempt already removed Auth but could not finish database cleanup.
  }

  try{
    const managedRef=db.ref("appData/hrITManagedSystemAccountsV1");
    await managedRef.transaction(raw=>{
      if(raw===null)return;
      const rows=JSON.parse(raw);
      if(!Array.isArray(rows))throw new Error("Managed account directory is not an array.");
      const remaining=rows.filter(row=>String(row?.uid||"")!==uid && !(!row?.uid && row?.username===target.username));
      return JSON.stringify(remaining);
    },undefined,false);
    await db.ref().update({
      [`accounts/${uid}`]:null,
      [`publicAccountDirectory/${uid}`]:null
    });
  }catch(error){
    console.error("Account directory cleanup failed after Auth deletion",{uid,error});
    throw new HttpsError("internal","Firebase Authentication was deleted, but database cleanup did not finish. Retry Delete.");
  }

  return {deleted:true,uid};
});
