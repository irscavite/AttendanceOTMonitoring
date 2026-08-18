self.addEventListener("notificationclick",(event)=>{
  event.notification.close();
  const raw=event.notification?.data?.url || "./";
  const targetUrl=new URL(raw,self.registration.scope).href;
  event.waitUntil((async()=>{
    const windows=await clients.matchAll({type:"window",includeUncontrolled:true});
    const target=new URL(targetUrl);
    for(const client of windows){
      try{
        const current=new URL(client.url);
        if(current.origin===target.origin && current.pathname===target.pathname){
          if("navigate" in client)await client.navigate(targetUrl);
          if("focus" in client)return client.focus();
        }
      }catch{}
    }
    return clients.openWindow(targetUrl);
  })());
});

importScripts("https://www.gstatic.com/firebasejs/12.17.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey:"AIzaSyAPvKUwUvEVJ96oiI0ZhI7WsmzsSBEkGyk",
  authDomain:"otmonitoring.firebaseapp.com",
  databaseURL:"https://otmonitoring-default-rtdb.firebaseio.com",
  projectId:"otmonitoring",
  storageBucket:"otmonitoring.firebasestorage.app",
  messagingSenderId:"243995453146",
  appId:"1:243995453146:web:9fe4281a03803b6a68a7e3",
  measurementId:"G-0H9VT0JKP3"
});

const messaging=firebase.messaging();
messaging.onBackgroundMessage((payload)=>{
  const data=payload?.data||{};
  const title=data.title||"New notification";
  const body=data.body||"You have a new update in Attendance, Leave & Overtime System.";
  const target=data.targetPage?`?open=${encodeURIComponent(data.targetPage)}`:"./";
  self.registration.showNotification(title,{
    body,
    icon:"./icon-192.png",
    badge:"./icon-192.png",
    tag:data.notificationId||undefined,
    renotify:Boolean(data.notificationId),
    data:{url:target,targetPage:data.targetPage||""}
  });
});
