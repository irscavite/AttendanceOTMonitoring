
const DEPARTMENTS = [
  "Operation",
  "S&F Depth.",
  "MnR",
  "Warehouse",
  "Admin",
  "Maintenance",
  "Bauan",
  "TE"
];


const EMPLOYEES_BY_DEPARTMENT = Object.fromEntries(DEPARTMENTS.map(dep=>[dep,[]]));

// No built-in/demo accounts in the Firebase build.
// Initial IT and HR accounts are created through the first-run setup form.
const USERS = {};

const STORE_KEY = "hrOvertimeMonitoringV3";
const SESSION_KEY = "hrOvertimeSessionV3";
const EMPLOYEE_SCHEDULE_KEY = "hrEmployeeSchedulesV1";
const EMPLOYEE_SHIFT_TIME_KEY = "hrEmployeeShiftTimesV1";
const CUSTOM_EMPLOYEES_KEY = "hrCustomEmployeesV1";
const EMPLOYEE_LOCATION_KEY = "hrEmployeeLocationsV1";
const EMPLOYEE_DAYOFF_KEY = "hrEmployeeDayOffV1";
const EMPLOYEE_PROFILE_KEY = "hrEmployeeProfileOverridesV1";
const EMPLOYEE_LEAVE_CREDIT_OVERRIDE_KEY = "hrEmployeeLeaveCreditOverridesV1";
const OT_LOCATIONS = ["Bacao","Enlin","Yard 2.1","Malabon","Batangas"];
const MAINTENANCE_EQUIPMENT = [
  { equipment:"RS-01", location:"Bacao" },
  { equipment:"RS-03", location:"Bacao" },
  { equipment:"RS-02", location:"Bacao" },
  { equipment:"RS-04", location:"Bacao" },
  { equipment:"ECH-06", location:"Bacao" },
  { equipment:"ECH-07", location:"Enlin" },
  { equipment:"ECH-08", location:"Enlin" },
  { equipment:"ECH-09", location:"Enlin" },
  { equipment:"ECH-03", location:"Enlin" }
];
const DAY_OFF_OPTIONS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const EMPLOYMENT_STATUSES = ["Probationary","Regular","On-Call","AWOL","Resigned","End Of Contract"];

// Official Philippine national holidays for 2026.
// OT classification rules for configured PH holidays:
// - Regular Holiday -> OT Type: Regular Holiday.
// - Special Non-Working / Special Working -> OT Type: Special Holiday.
// - Worked time starts from Schedule In so scheduled shift hours are included in OT.
const PH_HOLIDAYS = [
  {date:"2026-01-01",name:"New Year's Day",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-02-17",name:"Chinese New Year",category:"special-non-working",label:"Special (Non-Working) Day",otType:"Special Holiday"},
  {date:"2026-02-25",name:"EDSA People Power Revolution Anniversary",category:"special-working",label:"Special Working Day",otType:"Special Holiday"},
  {date:"2026-03-20",name:"Eid'l Fitr (Feast of Ramadhan)",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-04-02",name:"Maundy Thursday",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-04-03",name:"Good Friday",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-04-04",name:"Black Saturday",category:"special-non-working",label:"Special (Non-Working) Day",otType:"Special Holiday"},
  {date:"2026-04-09",name:"Araw ng Kagitingan",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-05-01",name:"Labor Day",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-05-27",name:"Eid'l Adha (Feast of Sacrifice)",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-06-12",name:"Independence Day",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-08-21",name:"Ninoy Aquino Day",category:"special-non-working",label:"Special (Non-Working) Day",otType:"Special Holiday"},
  {date:"2026-08-31",name:"National Heroes Day",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-11-01",name:"All Saints' Day",category:"special-non-working",label:"Special (Non-Working) Day",otType:"Special Holiday"},
  {date:"2026-11-02",name:"All Souls' Day",category:"special-non-working",label:"Special (Non-Working) Day",otType:"Special Holiday"},
  {date:"2026-11-30",name:"Bonifacio Day",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-12-08",name:"Feast of the Immaculate Conception of Mary",category:"special-non-working",label:"Special (Non-Working) Day",otType:"Special Holiday"},
  {date:"2026-12-24",name:"Christmas Eve",category:"special-non-working",label:"Additional Special (Non-Working) Day",otType:"Special Holiday"},
  {date:"2026-12-25",name:"Christmas Day",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-12-30",name:"Rizal Day",category:"regular",label:"Regular Holiday",otType:"Regular Holiday"},
  {date:"2026-12-31",name:"Last Day of the Year",category:"special-non-working",label:"Special (Non-Working) Day",otType:"Special Holiday"}
];
const PH_HOLIDAY_YEARS = [...new Set(PH_HOLIDAYS.map(h=>Number(h.date.slice(0,4))))].sort((a,b)=>a-b);
const MANAGER_NOTIFICATION_KEY = "hrManagerNotificationsV1";
const HR_NOTIFICATION_KEY = "hrDecisionNotificationsV1";
const IT_ACCOUNT_REQUEST_KEY = "hrITAccountCreationRequestsV1";
const IT_MANAGED_ACCOUNTS_KEY = "hrITManagedSystemAccountsV1";
const EMPLOYEE_LEAVE_NOTIFICATION_KEY = "hrEmployeeLeaveNotificationsV1";
const SUPERVISOR_EMPLOYEE_NOTIFICATION_KEY = "hrSupervisorEmployeeNotificationsV1";
const LEAVE_REQUEST_KEY = "hrLeaveRequestsV1";
const ATTENDANCE_STORE_KEY = "hrDailyAttendanceV1";
const EMPLOYEE_ATTENDANCE_OT_KEY = "hrEmployeeAttendanceOTSubmissionsV1";
const CHAT_STORE_KEY = "hrInternalChatV1";
const CHAT_READ_KEY = "hrInternalChatReadV1";
const CHAT_PREF_KEY = "hrInternalChatPrefsV1";
const SAMPLE_DATA_REVISION_KEY = "hrOvertimeSampleRevision";
const SAMPLE_DATA_REVISION = "2026-08-11-restday-holiday-full-ot-v2";
const CLEAN_DATA_REVISION_KEY = "hrManualFlowCleanResetRevision";
const CLEAN_DATA_REVISION = "2026-08-12-manual-flow-clean-v1";
const HR_DATA_CLEAN_REVISION_KEY = "hrCustomOnlyCleanRevision";
const HR_DATA_CLEAN_REVISION = "2026-08-12-hr-custom-only-v1";
const HR_MASTER_CUSTOM_ONLY_KEY = "hrMasterCustomOnlyV1";
const FULL_FLOW_RESET_REVISION_KEY = "hrFullFlowResetRevision";
const FULL_FLOW_RESET_REVISION = "2026-08-14-firebase-clean-auth-v1";
const FIREBASE_ACCOUNT_DIRECTORY_KEY = "hrFirebaseAccountDirectoryV1";

function cloudSetItem(key,value){
  window.localStorage.setItem(key,value);
  window.OTFirebase?.syncKey?.(key,value);
}
function cloudRemoveItem(key){
  window.localStorage.removeItem(key);
  window.OTFirebase?.removeKey?.(key);
}
function getFirebaseAccountDirectory(){
  try{return JSON.parse(window.localStorage.getItem(FIREBASE_ACCOUNT_DIRECTORY_KEY)) || []}
  catch{return []}
}
function getSystemAccountDirectory(){
  const merged=new Map();
  getFirebaseAccountDirectory().forEach(a=>{if(a?.username)merged.set(String(a.username).toLowerCase(),a);});
  getITManagedAccounts?.().forEach?.(a=>{if(a?.username && !merged.has(String(a.username).toLowerCase()))merged.set(String(a.username).toLowerCase(),a);});
  return [...merged.values()];
}
function getSystemAccountByUsername(username){
  const key=String(username||"").trim().toLowerCase();
  return getSystemAccountDirectory().find(a=>String(a.username||"").toLowerCase()===key) || null;
}


const loginView = document.getElementById("loginView");
const appView = document.getElementById("appView");
const loginForm = document.getElementById("loginForm");
const content = document.getElementById("content");
const sideNav = document.getElementById("sideNav");
const toast = document.getElementById("toast");
const modalRoot = document.getElementById("modalRoot");

let hrCombinedRequestView="leave"; // leave | ot
let currentUser = null;
let currentPage = "dashboard";
let hrDashboardDateKey = toDateKey(new Date());
let employeeLeaveHistoryPage = 1;
let hrCutoffStartKey = null;
let hrCutoffEndKey = null;
let hrCutoffSearch = "";
let hrAttendanceListDepartment = "All Departments";
let hrAttendanceListSearch = "";
let hrLeaveSearch = "";
let hrLeaveDepartment = "";
let hrLeaveStatus = "";
let attendanceSummaryCutoffKey = null;
let attendanceSummaryDepartment = "All Departments";
let supervisorAttendanceDateKey = getYesterdayDateKey();
let supervisorEmployeeSubmissionDateKey = getYesterdayDateKey();
let employeeAttendanceDateKey = getEmployeeDutyDateKey();
let roleSelfServiceContext = null;
let hrAdminOTEmployeeNo = "";
let hrAdminLeaveEmployeeNo = "";
let hrAttendanceCutoffKey = null;
let hrAttendanceDepartment = "All Departments";
let hrAttendanceStatus = "All";
let hrAttendanceSearch = "";
let activeChatUser = null;
let chatUIBound = false;
let chatAudioContext = null;
let chatAudioUnlocked = false;
let chatSoundEnabled = true;
let holidayCalendarYear = PH_HOLIDAY_YEARS.includes(new Date().getFullYear()) ? new Date().getFullYear() : PH_HOLIDAY_YEARS[PH_HOLIDAY_YEARS.length-1];
let holidayCalendarMonth = new Date().getMonth();

function unlockChatNotificationAudio(){
  if(chatAudioUnlocked)return;
  try{
    const AudioCtx=window.AudioContext||window.webkitAudioContext;
    if(!AudioCtx)return;
    chatAudioContext=chatAudioContext||new AudioCtx();
    if(chatAudioContext.state==="suspended")chatAudioContext.resume();
    chatAudioUnlocked=true;
  }catch{}
}
function playChatNotificationSound(){
  if(!chatSoundEnabled)return;
  try{
    const AudioCtx=window.AudioContext||window.webkitAudioContext;
    if(!AudioCtx)return;
    chatAudioContext=chatAudioContext||new AudioCtx();
    if(chatAudioContext.state==="suspended"){
      chatAudioContext.resume().catch(()=>{});
      if(!chatAudioUnlocked)return;
    }
    const ctx=chatAudioContext;
    const now=ctx.currentTime;
    const gain=ctx.createGain();
    gain.gain.setValueAtTime(0.0001,now);
    gain.gain.exponentialRampToValueAtTime(0.12,now+0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001,now+0.42);
    gain.connect(ctx.destination);
    [660,880].forEach((frequency,index)=>{
      const osc=ctx.createOscillator();
      const toneGain=ctx.createGain();
      const start=now+(index*0.105);
      osc.type="sine";
      osc.frequency.setValueAtTime(frequency,start);
      toneGain.gain.setValueAtTime(0.0001,start);
      toneGain.gain.exponentialRampToValueAtTime(index===0?0.72:0.58,start+0.012);
      toneGain.gain.exponentialRampToValueAtTime(0.0001,start+0.22);
      osc.connect(toneGain);
      toneGain.connect(gain);
      osc.start(start);
      osc.stop(start+0.24);
    });
  }catch{}
}

function escapeHtml(value){
  return String(value ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}



function getChatMessages(){
  try{
    const rows=JSON.parse(localStorage.getItem(CHAT_STORE_KEY));
    return Array.isArray(rows)?rows:[];
  }catch{return []}
}
function saveChatMessages(rows){
  cloudSetItem(CHAT_STORE_KEY,JSON.stringify(rows));
}
function getChatReadState(){
  try{return JSON.parse(localStorage.getItem(CHAT_READ_KEY)) || {}}
  catch{return {}}
}
function saveChatReadState(state){
  cloudSetItem(CHAT_READ_KEY,JSON.stringify(state));
}
function getChatPrefs(){
  try{return JSON.parse(localStorage.getItem(CHAT_PREF_KEY)) || {}}
  catch{return {}}
}
function saveChatPrefs(prefs){
  cloudSetItem(CHAT_PREF_KEY,JSON.stringify(prefs));
}
function syncChatSoundPreference(){
  const prefs=getChatPrefs();
  chatSoundEnabled=prefs.sound!==false;
  const btn=document.getElementById("chatSoundBtn");
  if(btn){
    btn.textContent=chatSoundEnabled?"🔊":"🔇";
    btn.classList.toggle("muted",!chatSoundEnabled);
    btn.setAttribute("aria-pressed",String(!chatSoundEnabled));
    btn.title=chatSoundEnabled?"Mute message sound":"Enable message sound";
  }
}
function toggleChatSound(){
  chatSoundEnabled=!chatSoundEnabled;
  saveChatPrefs({...getChatPrefs(),sound:chatSoundEnabled});
  syncChatSoundPreference();
  showToast(chatSoundEnabled?"Messenger sound enabled.":"Messenger sound muted.");
}
function toggleChatExpanded(){
  const panel=document.getElementById("chatPanel");
  if(!panel)return;
  panel.classList.toggle("chat-expanded");
  const expanded=panel.classList.contains("chat-expanded");
  const btn=document.getElementById("chatExpandBtn");
  if(btn){
    btn.textContent=expanded?"↙":"↗";
    btn.title=expanded?"Restore messenger":"Expand messenger";
    btn.setAttribute("aria-label",btn.title);
  }
}
function updateChatCharCount(){
  const input=document.getElementById("chatMessageInput");
  const count=document.getElementById("chatCharCount");
  if(input && count)count.textContent=`${input.value.length}/1000`;
}
function chatThreadKey(a,b){
  return [String(a||""),String(b||"")].sort().join("::");
}
function getChatContact(username){
  if(!username)return null;
  const account=getSystemAccountByUsername(username);
  return account ? {username:String(account.username).toLowerCase(),...account} : null;
}
function chatInitials(user){
  if(!user)return "?";
  if(user.role==="Request Approver")return "Request Approver";
  if(user.role==="HR")return "HR";
  if(user.role==="Employee")return "E";
  const dep=String(user.department||"").replace(/[^A-Za-z0-9]/g,"");
  return dep.slice(0,2).toUpperCase() || "S";
}
function formatChatTime(value){
  const d=new Date(value);
  if(Number.isNaN(d.getTime()))return "";
  const now=new Date();
  const sameDay=d.toDateString()===now.toDateString();
  if(sameDay)return d.toLocaleTimeString("en-PH",{hour:"numeric",minute:"2-digit"});
  return d.toLocaleDateString("en-PH",{month:"short",day:"numeric"});
}
function formatChatMessageTime(value){
  const d=new Date(value);
  if(Number.isNaN(d.getTime()))return "";
  return d.toLocaleTimeString("en-PH",{hour:"numeric",minute:"2-digit"});
}
function chatDayLabel(value){
  const d=new Date(value);
  if(Number.isNaN(d.getTime()))return "";
  const today=new Date();
  const yesterday=new Date(today); yesterday.setDate(today.getDate()-1);
  if(d.toDateString()===today.toDateString())return "Today";
  if(d.toDateString()===yesterday.toDateString())return "Yesterday";
  return d.toLocaleDateString("en-PH",{month:"short",day:"numeric",year:d.getFullYear()===today.getFullYear()?undefined:"numeric"});
}
function getConversationMessages(contactUsername){
  if(!currentUser || !contactUsername)return [];
  return getChatMessages()
    .filter(m=>(m.from===currentUser.username && m.to===contactUsername)||(m.from===contactUsername && m.to===currentUser.username))
    .sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
}
function markChatRead(contactUsername,readAt=new Date().toISOString()){
  if(!currentUser || !contactUsername)return;
  const state=getChatReadState();
  state[currentUser.username]=state[currentUser.username]||{};
  state[currentUser.username][contactUsername]=readAt;
  saveChatReadState(state);
}
function chatLastReadFor(viewer,contact){
  return getChatReadState()?.[viewer]?.[contact] || "";
}
function unreadChatCount(contactUsername=null){
  if(!currentUser)return 0;
  const messages=getChatMessages();
  const contacts=contactUsername?[contactUsername]:getSystemAccountDirectory().filter(a=>a?.username && a.username!==currentUser.username && a.role!=="Employee" && a.active!==false).map(a=>a.username);
  return contacts.reduce((total,contact)=>{
    const lastRead=chatLastReadFor(currentUser.username,contact);
    return total+messages.filter(m=>m.from===contact && m.to===currentUser.username && (!lastRead || m.createdAt>lastRead)).length;
  },0);
}
function latestChatMessageWith(contactUsername){
  const rows=getConversationMessages(contactUsername);
  return rows.length?rows[rows.length-1]:null;
}
function messageSeenByRecipient(message){
  if(!message || !currentUser || message.from!==currentUser.username)return false;
  const readAt=chatLastReadFor(message.to,currentUser.username);
  return Boolean(readAt && readAt>=message.createdAt);
}
function updateChatLauncherBadge(){
  const badge=document.getElementById("chatLauncherBadge");
  const summary=document.getElementById("chatUnreadSummary");
  const total=unreadChatCount();
  if(badge){
    badge.textContent=total>99?"99+":String(total);
    badge.classList.toggle("hidden",total===0);
  }
  if(summary){
    summary.textContent=total===1?"1 unread":`${total} unread`;
    summary.classList.toggle("hidden",total===0);
  }
}
function renderChatContacts(){
  const list=document.getElementById("chatContactList");
  if(!list || !currentUser)return;
  const q=(document.getElementById("chatSearchInput")?.value||"").trim().toLowerCase();
  const contacts=getSystemAccountDirectory()
    .filter(user=>user?.username && user.username!==currentUser.username && user.role!=="Employee" && user.active!==false)
    .map(user=>{
      const username=String(user.username).toLowerCase();
      const last=latestChatMessageWith(username);
      return {username,...user,last,unread:unreadChatCount(username)};
    })
    .filter(c=>!q || c.displayName.toLowerCase().includes(q) || c.department.toLowerCase().includes(q) || c.role.toLowerCase().includes(q))
    .sort((a,b)=>{
      const at=a.last?new Date(a.last.createdAt).getTime():0;
      const bt=b.last?new Date(b.last.createdAt).getTime():0;
      if(bt!==at)return bt-at;
      return a.displayName.localeCompare(b.displayName);
    });
  if(!contacts.length){
    list.innerHTML='<div class="chat-no-results">No people found.</div>';
    return;
  }
  list.innerHTML=contacts.map(c=>{
    const preview=c.last
      ? `${c.last.from===currentUser.username?"You: ":""}${escapeHtml(c.last.text).replace(/\n/g," ")}`
      : `${escapeHtml(c.role)} • ${escapeHtml(c.department)}`;
    return `<button class="chat-contact ${activeChatUser===c.username?"active":""} ${c.unread?"has-unread":""}" type="button" data-chat-user="${escapeHtml(c.username)}">
      <span class="chat-avatar-wrap"><span class="chat-avatar">${escapeHtml(chatInitials(c))}</span>${c.unread?'<span class="chat-contact-dot"></span>':""}</span>
      <span class="chat-contact-copy">
        <span class="chat-contact-top"><strong>${escapeHtml(c.displayName)}</strong><small>${c.last?formatChatTime(c.last.createdAt):""}</small></span>
        <span class="chat-contact-bottom"><em>${preview}</em>${c.unread?`<b class="chat-contact-badge">${c.unread>99?"99+":c.unread}</b>`:""}</span>
      </span>
    </button>`;
  }).join("");
  list.querySelectorAll("[data-chat-user]").forEach(btn=>btn.addEventListener("click",()=>openChatConversation(btn.dataset.chatUser)));
}
function renderChatConversation(){
  const empty=document.getElementById("chatEmptyState");
  const conversation=document.getElementById("chatConversation");
  if(!empty || !conversation)return;
  const contact=getChatContact(activeChatUser);
  if(!contact || !currentUser){
    empty.classList.remove("hidden");
    conversation.classList.add("hidden");
    return;
  }
  empty.classList.add("hidden");
  conversation.classList.remove("hidden");
  document.getElementById("chatActiveAvatar").textContent=chatInitials(contact);
  document.getElementById("chatActiveName").textContent=contact.displayName;
  document.getElementById("chatActiveMeta").textContent=`${contact.role} · ${contact.department}`;
  const rolePill=document.getElementById("chatActiveRole");
  if(rolePill)rolePill.textContent=contact.role;
  const rows=getConversationMessages(activeChatUser);
  const list=document.getElementById("chatMessageList");
  if(!rows.length){
    list.innerHTML=`<div class="chat-start-state"><span>Start your conversation with <strong>${escapeHtml(contact.displayName)}</strong>.</span></div>`;
  }else{
    let previousDay="";
    list.innerHTML=rows.map((m,index)=>{
      const day=chatDayLabel(m.createdAt);
      const divider=day!==previousDay?`<div class="chat-day-divider"><span>${escapeHtml(day)}</span></div>`:"";
      previousDay=day;
      const mine=m.from===currentUser.username;
      const isLastMine=mine && !rows.slice(index+1).some(next=>next.from===currentUser.username);
      const status=isLastMine?`<span class="chat-message-status">${messageSeenByRecipient(m)?"Seen":"Sent"}</span>`:"";
      return `${divider}<div class="chat-message-row ${mine?"mine":"theirs"}">
        ${!mine?`<span class="chat-avatar chat-message-avatar">${escapeHtml(chatInitials(contact))}</span>`:""}
        <div class="chat-bubble-wrap">
          <div class="chat-bubble">${escapeHtml(m.text).replace(/\n/g,"<br>")}</div>
          <div class="chat-message-meta"><span>${formatChatMessageTime(m.createdAt)}</span>${status}</div>
        </div>
      </div>`;
    }).join("");
  }
  requestAnimationFrame(()=>{list.scrollTop=list.scrollHeight;});
}
function renderInternalChat(){
  updateChatLauncherBadge();
  renderChatContacts();
  renderChatConversation();
}
function openChatConversation(username){
  if(!getSystemAccountByUsername(username) || username===currentUser?.username)return;
  activeChatUser=username;
  const rows=getConversationMessages(username);
  const lastIncoming=[...rows].reverse().find(m=>m.from===username && m.to===currentUser.username);
  markChatRead(username,lastIncoming?.createdAt || new Date().toISOString());
  document.getElementById("chatPanel")?.classList.add("mobile-conversation-open");
  renderInternalChat();
  document.getElementById("chatMessageInput")?.focus();
}
function openInternalChat(){
  const panel=document.getElementById("chatPanel");
  const launcher=document.getElementById("chatLauncher");
  if(!panel || !launcher)return;
  panel.classList.remove("hidden");
  launcher.setAttribute("aria-expanded","true");
  syncChatSoundPreference();
  updateChatCharCount();
  if(activeChatUser){
    const rows=getConversationMessages(activeChatUser);
    const lastIncoming=[...rows].reverse().find(m=>m.from===activeChatUser && m.to===currentUser?.username);
    if(lastIncoming)markChatRead(activeChatUser,lastIncoming.createdAt);
  }
  renderInternalChat();
}
function closeInternalChat(){
  const panel=document.getElementById("chatPanel");
  const launcher=document.getElementById("chatLauncher");
  panel?.classList.add("hidden");
  panel?.classList.remove("mobile-conversation-open");
  launcher?.setAttribute("aria-expanded","false");
}
function sendInternalChatMessage(text){
  const clean=String(text||"").trim();
  if(!clean || !currentUser || !activeChatUser)return false;
  const rows=getChatMessages();
  rows.push({
    id:`chat-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
    thread:chatThreadKey(currentUser.username,activeChatUser),
    from:currentUser.username,
    to:activeChatUser,
    text:clean.slice(0,1000),
    createdAt:new Date().toISOString()
  });
  saveChatMessages(rows.slice(-5000));
  renderInternalChat();
  return true;
}
function bindInternalChat(){
  if(chatUIBound)return;
  const launcher=document.getElementById("chatLauncher");
  const panel=document.getElementById("chatPanel");
  const form=document.getElementById("chatMessageForm");
  const input=document.getElementById("chatMessageInput");
  if(!launcher || !panel || !form || !input)return;
  chatUIBound=true;
  launcher.addEventListener("click",()=>panel.classList.contains("hidden")?openInternalChat():closeInternalChat());
  document.getElementById("chatCloseBtn")?.addEventListener("click",closeInternalChat);
  document.getElementById("chatSoundBtn")?.addEventListener("click",toggleChatSound);
  document.getElementById("chatExpandBtn")?.addEventListener("click",toggleChatExpanded);
  document.getElementById("chatMobileBackBtn")?.addEventListener("click",()=>panel.classList.remove("mobile-conversation-open"));
  document.getElementById("chatSearchInput")?.addEventListener("input",renderChatContacts);
  form.addEventListener("submit",e=>{
    e.preventDefault();
    if(sendInternalChatMessage(input.value)){
      input.value="";
      input.style.height="auto";
      updateChatCharCount();
      input.focus();
    }
  });
  input.addEventListener("keydown",e=>{
    if(e.key==="Enter" && !e.shiftKey){
      e.preventDefault();
      form.requestSubmit();
    }
  });
  input.addEventListener("input",()=>{
    input.style.height="auto";
    input.style.height=Math.min(input.scrollHeight,120)+"px";
    updateChatCharCount();
  });
  syncChatSoundPreference();
  updateChatCharCount();
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape" && !panel.classList.contains("hidden"))closeInternalChat();
  });
}

function getEmployeeScheduleOverrides(){
  try{return JSON.parse(localStorage.getItem(EMPLOYEE_SCHEDULE_KEY)) || {}}
  catch{return {}}
}
function saveEmployeeScheduleOverrides(data){
  cloudSetItem(EMPLOYEE_SCHEDULE_KEY, JSON.stringify(data));
}
function getDefaultShiftTimes(schedule){
  if(schedule === "Night")return {start:"18:00",end:"03:00"};
  if(schedule === "Morning")return {start:"06:00",end:"15:00"};
  return {start:"",end:""};
}
function getEmployeeShiftTimeOverrides(){
  try{return JSON.parse(localStorage.getItem(EMPLOYEE_SHIFT_TIME_KEY)) || {}}
  catch{return {}}
}
function saveEmployeeShiftTimeOverrides(data){
  cloudSetItem(EMPLOYEE_SHIFT_TIME_KEY, JSON.stringify(data));
}
function updateEmployeeShiftTime(employeeNo,start,end){
  const normalizedStart=normalize24HourTime(start);
  const normalizedEnd=normalize24HourTime(end);
  if(!isValid24HourTime(normalizedStart) || !isValid24HourTime(normalizedEnd))return false;
  const overrides=getEmployeeShiftTimeOverrides();
  overrides[employeeNo]={start:normalizedStart,end:normalizedEnd,updatedAt:new Date().toISOString()};
  saveEmployeeShiftTimeOverrides(overrides);
  return true;
}
function clearEmployeeShiftTimeOverride(employeeNo){
  const overrides=getEmployeeShiftTimeOverrides();
  delete overrides[employeeNo];
  saveEmployeeShiftTimeOverrides(overrides);
}
function getCustomEmployees(){
  try{return JSON.parse(localStorage.getItem(CUSTOM_EMPLOYEES_KEY)) || []}
  catch{return []}
}
function saveCustomEmployees(data){
  cloudSetItem(CUSTOM_EMPLOYEES_KEY, JSON.stringify(data));
}
function addCustomEmployee(employee){
  const custom = getCustomEmployees();
  custom.push(employee);
  saveCustomEmployees(custom);
}
function deleteCustomEmployee(employeeNo, department){
  const custom = getCustomEmployees();
  const updated = custom.filter(emp => String(emp.no)!==String(employeeNo));
  saveCustomEmployees(updated);

  const overrides = getEmployeeScheduleOverrides();
  delete overrides[employeeNo];
  saveEmployeeScheduleOverrides(overrides);

  clearEmployeeShiftTimeOverride(employeeNo);

  const locationOverrides = getEmployeeLocationOverrides();
  delete locationOverrides[employeeNo];
  saveEmployeeLocationOverrides(locationOverrides);

  const dayOffOverrides = getEmployeeDayOffOverrides();
  delete dayOffOverrides[employeeNo];
  saveEmployeeDayOffOverrides(dayOffOverrides);

  const profileOverrides=getEmployeeProfileOverrides();
  delete profileOverrides[employeeNo];
  saveEmployeeProfileOverrides(profileOverrides);

  const leaveCreditOverrides=getEmployeeLeaveCreditOverrides();
  delete leaveCreditOverrides[employeeNo];
  saveEmployeeLeaveCreditOverrides(leaveCreditOverrides);

  // Remove only unfinished provisioning/roster notifications. Historical OT, attendance,
  // leave requests, and an already-created Firebase Authentication account are retained.
  saveITAccountRequests(getITAccountRequests().filter(row=>!(String(row.employeeNo)===String(employeeNo) && row.status!=="Created")));
  saveSupervisorEmployeeNotifications(getSupervisorEmployeeNotifications().filter(row=>String(row.employeeNo)!==String(employeeNo)));
}
function getEmployeeLocationOverrides(){
  try{return JSON.parse(localStorage.getItem(EMPLOYEE_LOCATION_KEY)) || {}}
  catch{return {}}
}
function saveEmployeeLocationOverrides(data){
  cloudSetItem(EMPLOYEE_LOCATION_KEY, JSON.stringify(data));
}
function updateEmployeeLocation(employeeNo, location){
  const overrides = getEmployeeLocationOverrides();
  overrides[employeeNo] = location;
  saveEmployeeLocationOverrides(overrides);
}
function clearEmployeeLocationOverride(employeeNo){
  const overrides = getEmployeeLocationOverrides();
  delete overrides[employeeNo];
  saveEmployeeLocationOverrides(overrides);
}
function getEmployeeDayOffOverrides(){
  try{return JSON.parse(localStorage.getItem(EMPLOYEE_DAYOFF_KEY)) || {}}
  catch{return {}}
}
function saveEmployeeDayOffOverrides(data){
  cloudSetItem(EMPLOYEE_DAYOFF_KEY, JSON.stringify(data));
}
function updateEmployeeDayOff(employeeNo, dayOff){
  const overrides = getEmployeeDayOffOverrides();
  if(dayOff)overrides[employeeNo]=dayOff;
  else delete overrides[employeeNo];
  saveEmployeeDayOffOverrides(overrides);
}
function clearEmployeeDayOffOverride(employeeNo){
  const overrides=getEmployeeDayOffOverrides();
  delete overrides[employeeNo];
  saveEmployeeDayOffOverrides(overrides);
}
function getLocationCssClass(location){
  return location === "Yard 2.1" ? "yard21" : String(location || "").toLowerCase().replace(/[^a-z0-9]+/g,"-");
}
function getEmployeeProfileOverrides(){
  try{return JSON.parse(localStorage.getItem(EMPLOYEE_PROFILE_KEY)) || {}}
  catch{return {}}
}
function saveEmployeeProfileOverrides(data){
  cloudSetItem(EMPLOYEE_PROFILE_KEY,JSON.stringify(data));
}
function updateEmployeeProfileOverride(employeeNo,changes){
  const profiles=getEmployeeProfileOverrides();
  profiles[employeeNo]={...(profiles[employeeNo]||{}),...changes,updatedAt:new Date().toISOString()};
  saveEmployeeProfileOverrides(profiles);
  return profiles[employeeNo];
}
function getBaseEmployeeRecords(){
  const profiles=getEmployeeProfileOverrides();
  const rows=[];
  DEPARTMENTS.forEach(originalDepartment=>{
    const source=EMPLOYEES_BY_DEPARTMENT[originalDepartment] || [];
    const split=Math.ceil(source.length/2);
    source.forEach((emp,index)=>{
      const profile=profiles[emp.no] || {};
      rows.push({
        ...emp,
        name:profile.name || emp.name,
        position:profile.position || emp.position,
        department:profile.department || originalDepartment,
        employmentStatus:profile.employmentStatus || emp.employmentStatus || "Regular",
        originalDepartment,
        location:emp.location || (index<split ? "Bacao" : "Enlin"),
        isCustom:false
      });
    });
  });
  return rows;
}
function getDepartmentEmployees(department){
  const profiles=getEmployeeProfileOverrides();
  const baseEmployees=getBaseEmployeeRecords().filter(emp=>emp.department===department);
  const customEmployees=getCustomEmployees()
    .map(emp=>{
      const profile=profiles[emp.no] || {};
      return {
        ...emp,
        name:profile.name || emp.name,
        position:profile.position || emp.position,
        department:profile.department || emp.department,
        employmentStatus:profile.employmentStatus || emp.employmentStatus || "Probationary",
        location:emp.location || "Unassigned",
        isCustom:true,
        originalDepartment:emp.department
      };
    })
    .filter(emp=>emp.department===department);

  const overrides=getEmployeeScheduleOverrides();
  const shiftTimeOverrides=getEmployeeShiftTimeOverrides();
  const locationOverrides=getEmployeeLocationOverrides();
  const dayOffOverrides=getEmployeeDayOffOverrides();

  return [...baseEmployees,...customEmployees].map(emp=>{
    const storedSchedule=Object.prototype.hasOwnProperty.call(overrides,emp.no) ? overrides[emp.no] : emp.schedule;
    const schedule=storedSchedule === "Morning" || storedSchedule === "Night" ? storedSchedule : "Unassigned";
    const defaults=getDefaultShiftTimes(schedule);
    const storedTimes=shiftTimeOverrides[emp.no] || {};
    const scheduleStart=isValid24HourTime(storedTimes.start) ? storedTimes.start : defaults.start;
    const scheduleEnd=isValid24HourTime(storedTimes.end) ? storedTimes.end : defaults.end;
    return {
      ...emp,
      schedule,
      scheduleStart,
      scheduleEnd,
      location:locationOverrides[emp.no] || emp.location || (emp.isCustom ? "Unassigned" : "Bacao"),
      dayOff:dayOffOverrides[emp.no] || emp.dayOff || ""
    };
  });
}
function updateEmployeeSchedule(employeeNo, schedule){
  const overrides = getEmployeeScheduleOverrides();
  if(schedule === "Morning" || schedule === "Night"){
    overrides[employeeNo] = schedule;
    const defaults=getDefaultShiftTimes(schedule);
    updateEmployeeShiftTime(employeeNo,defaults.start,defaults.end);
  }else{
    delete overrides[employeeNo];
    clearEmployeeShiftTimeOverride(employeeNo);
  }
  saveEmployeeScheduleOverrides(overrides);
}
function employeeHasValidWorkArea(employee){
  return OT_LOCATIONS.includes(employee?.location);
}
function isEmployeeSetupComplete(employee){
  return (employee?.schedule === "Morning" || employee?.schedule === "Night") && employeeHasValidWorkArea(employee);
}
function clearEmployeeScheduleOverride(employeeNo){
  const overrides=getEmployeeScheduleOverrides();
  delete overrides[employeeNo];
  saveEmployeeScheduleOverrides(overrides);
}
function updateCustomEmployee(employeeNo,changes){
  const employees=getCustomEmployees();
  const index=employees.findIndex(emp=>emp.no===employeeNo);
  if(index<0)return null;
  employees[index]={...employees[index],...changes,updatedAt:new Date().toISOString()};
  saveCustomEmployees(employees);
  return employees[index];
}
function allKnownEmployees(){
  const profiles=getEmployeeProfileOverrides();
  const base=getBaseEmployeeRecords();
  const custom=getCustomEmployees().map(emp=>{
    const profile=profiles[emp.no] || {};
    return {...emp,...profile,no:emp.no,isCustom:true,originalDepartment:emp.department};
  });
  return [...base,...custom];
}
function normalizeEmploymentStatus(status, isCustom=false){
  const value=String(status||"").trim();
  return EMPLOYMENT_STATUSES.includes(value) ? value : (isCustom ? "Probationary" : "Regular");
}
function employmentStatusCssClass(status){
  return `employment-${String(status||"").toLowerCase().replace(/[^a-z0-9]+/g,"-")}`;
}
function getLeaveCreditsForEmploymentStatus(status){
  const normalized=normalizeEmploymentStatus(status);
  return normalized === "Regular" ? {vl:5,sl:5} : {vl:0,sl:0};
}
function getEmployeeLeaveCreditOverrides(){
  try{return JSON.parse(localStorage.getItem(EMPLOYEE_LEAVE_CREDIT_OVERRIDE_KEY)) || {}}
  catch{return {}}
}
function saveEmployeeLeaveCreditOverrides(data){
  cloudSetItem(EMPLOYEE_LEAVE_CREDIT_OVERRIDE_KEY,JSON.stringify(data||{}));
}
function getEmployeeLeaveCreditEntitlement(employeeNo,status){
  const fallback=getLeaveCreditsForEmploymentStatus(status);
  const row=getEmployeeLeaveCreditOverrides()[employeeNo]||{};
  const vl=Number(row.vl);
  const sl=Number(row.sl);
  return {
    vl:Number.isFinite(vl)?Math.max(0,vl):fallback.vl,
    sl:Number.isFinite(sl)?Math.max(0,sl):fallback.sl
  };
}
function leaveRequestDayCount(startDate,endDate){
  return eachDateKey(startDate,endDate).length;
}
function isPaidLeaveRequest(request){
  return request?.payType === "With Pay" || request?.withPay === true;
}
function getEmployeeLeaveCreditSummary(employeeNo,employmentStatusOverride="",excludeRequestId=""){
  const employee=getEmployeeByNo(employeeNo) || {};
  const status=normalizeEmploymentStatus(employmentStatusOverride || employee.employmentStatus,employee.isCustom);
  const base=getEmployeeLeaveCreditEntitlement(employeeNo,status);
  let usedVL=0,usedSL=0,reservedVL=0,reservedSL=0;
  getLeaveRequests().forEach(request=>{
    if(excludeRequestId && String(request.id||"")===String(excludeRequestId))return;
    if(String(request.employeeNo||"")!==String(employeeNo||"") || !isPaidLeaveRequest(request))return;
    const leaveType=request.leaveType;
    if(leaveType!=="VL" && leaveType!=="SL")return;
    const days=Math.max(0,Number(
      request.status==="Approved" && Number.isFinite(Number(request.creditChargedDays))
        ? request.creditChargedDays
        : (Number.isFinite(Number(request.requestedCreditDays)) ? request.requestedCreditDays : leaveRequestDayCount(request.startDate,request.endDate))
    )||0);
    if(request.status==="Approved"){
      if(leaveType==="VL")usedVL+=days;else usedSL+=days;
    }else if(request.status==="Pending Supervisor" || request.status==="Pending HR" || request.status==="Pending Request Approver"){
      if(leaveType==="VL")reservedVL+=days;else reservedSL+=days;
    }
  });
  return {
    status,
    baseVL:base.vl,baseSL:base.sl,
    usedVL,usedSL,reservedVL,reservedSL,
    remainingVL:Math.max(0,base.vl-usedVL),
    remainingSL:Math.max(0,base.sl-usedSL),
    availableVL:Math.max(0,base.vl-usedVL-reservedVL),
    availableSL:Math.max(0,base.sl-usedSL-reservedSL)
  };
}
function setEmployeeLeaveCreditRemaining(employeeNo,remainingSL,remainingVL){
  const summary=getEmployeeLeaveCreditSummary(employeeNo);
  const sl=Math.max(0,Number(remainingSL)||0);
  const vl=Math.max(0,Number(remainingVL)||0);
  const overrides=getEmployeeLeaveCreditOverrides();
  overrides[employeeNo]={
    sl:sl+Number(summary.usedSL||0),
    vl:vl+Number(summary.usedVL||0),
    updatedAt:new Date().toISOString(),
    updatedBy:currentUser?.username||"Admin"
  };
  saveEmployeeLeaveCreditOverrides(overrides);
  return getEmployeeLeaveCreditSummary(employeeNo);
}
function getMasterEmployeeRows(){
  // Build the master list in one pass. The old implementation repeatedly rebuilt
  // department rosters and reparsed/scanned all leave requests once per employee,
  // which became very slow as attendance/leave history grew.
  const profiles=getEmployeeProfileOverrides();
  const base=getBaseEmployeeRecords();
  const custom=getCustomEmployees().map(emp=>{
    const profile=profiles[emp.no]||{};
    return {
      ...emp,
      ...profile,
      no:emp.no,
      name:profile.name||emp.name,
      position:profile.position||emp.position,
      department:profile.department||emp.department,
      employmentStatus:profile.employmentStatus||emp.employmentStatus||"Probationary",
      location:emp.location||"Unassigned",
      isCustom:true,
      originalDepartment:emp.department
    };
  });
  const employees=[...base,...custom];
  const scheduleOverrides=getEmployeeScheduleOverrides();
  const shiftTimeOverrides=getEmployeeShiftTimeOverrides();
  const locationOverrides=getEmployeeLocationOverrides();
  const dayOffOverrides=getEmployeeDayOffOverrides();
  const creditOverrides=getEmployeeLeaveCreditOverrides();
  const leaveTotals=new Map();

  getLeaveRequests().forEach(request=>{
    if(!request?.employeeNo || !isPaidLeaveRequest(request))return;
    if(request.leaveType!=="VL" && request.leaveType!=="SL")return;
    const status=String(request.status||"");
    const isUsed=status==="Approved";
    const isReserved=["Pending Supervisor","Pending HR","Pending Request Approver"].includes(status);
    if(!isUsed && !isReserved)return;
    const days=Math.max(0,Number(
      isUsed && Number.isFinite(Number(request.creditChargedDays))
        ? request.creditChargedDays
        : (Number.isFinite(Number(request.requestedCreditDays)) ? request.requestedCreditDays : leaveRequestDayCount(request.startDate,request.endDate))
    )||0);
    const key=String(request.employeeNo);
    const totals=leaveTotals.get(key)||{usedVL:0,usedSL:0,reservedVL:0,reservedSL:0};
    if(isUsed){
      if(request.leaveType==="VL")totals.usedVL+=days;else totals.usedSL+=days;
    }else if(request.leaveType==="VL")totals.reservedVL+=days;else totals.reservedSL+=days;
    leaveTotals.set(key,totals);
  });

  return employees.map(emp=>{
    const storedSchedule=Object.prototype.hasOwnProperty.call(scheduleOverrides,emp.no)?scheduleOverrides[emp.no]:emp.schedule;
    const schedule=storedSchedule==="Morning"||storedSchedule==="Night"?storedSchedule:"Unassigned";
    const defaults=getDefaultShiftTimes(schedule);
    const storedTimes=shiftTimeOverrides[emp.no]||{};
    const employmentStatus=normalizeEmploymentStatus(emp.employmentStatus,emp.isCustom);
    const fallback=getLeaveCreditsForEmploymentStatus(employmentStatus);
    const override=creditOverrides[emp.no]||{};
    const baseVL=Number.isFinite(Number(override.vl))?Math.max(0,Number(override.vl)):fallback.vl;
    const baseSL=Number.isFinite(Number(override.sl))?Math.max(0,Number(override.sl)):fallback.sl;
    const totals=leaveTotals.get(String(emp.no))||{usedVL:0,usedSL:0,reservedVL:0,reservedSL:0};
    return {
      ...emp,
      employmentStatus,
      schedule,
      scheduleStart:isValid24HourTime(storedTimes.start)?storedTimes.start:defaults.start,
      scheduleEnd:isValid24HourTime(storedTimes.end)?storedTimes.end:defaults.end,
      location:locationOverrides[emp.no]||emp.location||(emp.isCustom?"Unassigned":"Bacao"),
      dayOff:dayOffOverrides[emp.no]||emp.dayOff||"",
      leaveCreditVL:Math.max(0,baseVL-totals.usedVL),
      leaveCreditSL:Math.max(0,baseSL-totals.usedSL),
      leaveUsedVL:totals.usedVL,
      leaveUsedSL:totals.usedSL,
      leaveReservedVL:totals.reservedVL,
      leaveReservedSL:totals.reservedSL
    };
  }).sort((a,b)=>String(a.department||"").localeCompare(String(b.department||"")) || String(a.name||"").localeCompare(String(b.name||"")));
}

function getHRMasterEmployeeRows(){
  // HR Master List is master data and must always remain available.
  // It is the source roster for employee setup and account/workflow testing.
  return getMasterEmployeeRows();
}
function getEmployeeLeaveNotifications(){
  try{return JSON.parse(localStorage.getItem(EMPLOYEE_LEAVE_NOTIFICATION_KEY)) || []}
  catch{return []}
}
function saveEmployeeLeaveNotifications(data){
  cloudSetItem(EMPLOYEE_LEAVE_NOTIFICATION_KEY,JSON.stringify(data));
}
function employeeLeaveNotificationsFor(employeeNo){
  return getEmployeeLeaveNotifications().filter(n=>String(n.employeeNo||"")===String(employeeNo||""));
}
function unreadEmployeeLeaveNotificationCount(employeeNo){
  return employeeLeaveNotificationsFor(employeeNo).filter(n=>!n.read && n.leaveRequestId).length;
}
function addEmployeeLeaveNotification(request,type){
  if(!request?.employeeNo)return;
  const dateText=`${formatDate(request.startDate)}${request.endDate!==request.startDate?` – ${formatDate(request.endDate)}`:""}`;
  let title="Leave request update";
  let message=`${request.leaveType} • ${dateText}`;
  let details="";
  if(type==="submitted"){
    title="Leave request submitted";
    details=`Waiting for ${request.department||"department"} Supervisor approval.`;
  }else if(type==="supervisor-approved"){
    title="Supervisor approved your leave";
    details="Your request was forwarded to HR for review.";
  }else if(type==="supervisor-rejected"){
    title="Supervisor rejected your leave";
    details=request.supervisorRemarks || "The request stopped at Supervisor review. No leave credit was deducted.";
  }else if(type==="hr-approved"){
    title="HR approved your leave";
    details="Your request was forwarded to the Request Approver for final approval.";
  }else if(type==="hr-rejected"){
    title="HR rejected your leave";
    details=request.hrRemarks || "The request stopped at HR review. No leave credit was deducted.";
  }else if(type==="final-approved"){
    title="Leave request fully approved";
    if(isPaidLeaveRequest(request)){
      const credit=getEmployeeLeaveCreditSummary(request.employeeNo);
      const remaining=request.leaveType==="VL"?credit.remainingVL:credit.remainingSL;
      details=`Final approval completed. ${Number(request.creditChargedDays||0).toFixed(2)} ${request.leaveType} credit(s) deducted. Remaining balance: ${Number(remaining||0).toFixed(2)}.`;
    }else{
      details="Final approval completed. No leave credit deduction applies to this request.";
    }
  }else if(type==="final-rejected"){
    title="Request Approver rejected your leave";
    details=request.gmRemarks || "The request was rejected at final approval. No leave credit was deducted.";
  }
  const notifications=getEmployeeLeaveNotifications();
  const duplicate=notifications.some(n=>n.leaveRequestId===request.id && n.type===type);
  if(duplicate)return;
  notifications.unshift({
    id:`EMP-LV-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type,
    title,
    message,
    details,
    leaveRequestId:request.id,
    employeeNo:request.employeeNo,
    targetPage:"my-leave",
    createdAt:new Date().toISOString(),
    read:false
  });
  saveEmployeeLeaveNotifications(notifications.slice(0,250));
}
function markEmployeeLeaveNotificationRead(id){
  const notifications=getEmployeeLeaveNotifications();
  const item=notifications.find(n=>n.id===id);
  if(item)item.read=true;
  saveEmployeeLeaveNotifications(notifications);
  updateEmployeeLeaveNotificationUI();
}
function markAllEmployeeLeaveNotificationsRead(){
  const employeeNo=currentUser?.employeeNo;
  const notifications=getEmployeeLeaveNotifications().map(n=>String(n.employeeNo||"")===String(employeeNo||"")?{...n,read:true}:n);
  saveEmployeeLeaveNotifications(notifications);
  updateEmployeeLeaveNotificationUI();
}

function getSupervisorEmployeeNotifications(){
  try{return JSON.parse(localStorage.getItem(SUPERVISOR_EMPLOYEE_NOTIFICATION_KEY)) || []}
  catch{return []}
}
function saveSupervisorEmployeeNotifications(data){
  cloudSetItem(SUPERVISOR_EMPLOYEE_NOTIFICATION_KEY,JSON.stringify(data));
}
function addSupervisorEmployeeNotification(employee){
  if(!employee?.department || !employee?.no)return;
  const notifications=getSupervisorEmployeeNotifications().filter(n=>!(n.employeeNo===employee.no && !n.resolved));
  notifications.unshift({
    id:`SUP-EMP-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type:"schedule-required",
    title:"New employee needs schedule & work area setup",
    message:`${employee.name || "New employee"} • ${employee.department}`,
    employeeNo:employee.no,
    department:employee.department,
    createdAt:new Date().toISOString(),
    read:false,
    resolved:false
  });
  saveSupervisorEmployeeNotifications(notifications.slice(0,100));
}
function supervisorNotificationsForDepartment(department){
  return getSupervisorEmployeeNotifications().filter(n=>n.department===department && !n.resolved);
}
function unreadSupervisorEmployeeNotificationCount(department){
  return supervisorNotificationsForDepartment(department).filter(n=>!n.read).length;
}
function markSupervisorEmployeeNotificationRead(id){
  const notifications=getSupervisorEmployeeNotifications();
  const item=notifications.find(n=>n.id===id);
  if(item)item.read=true;
  saveSupervisorEmployeeNotifications(notifications);
  updateSupervisorEmployeeNotificationUI();
}
function markAllSupervisorEmployeeNotificationsRead(){
  const department=currentUser?.department;
  const notifications=getSupervisorEmployeeNotifications().map(n=>n.department===department?{...n,read:true}:n);
  saveSupervisorEmployeeNotifications(notifications);
  updateSupervisorEmployeeNotificationUI();
}
function resolveSupervisorEmployeeNotification(employeeNo,department){
  const notifications=getSupervisorEmployeeNotifications().map(n=>
    n.employeeNo===employeeNo && n.department===department ? {...n,read:true,resolved:true,resolvedAt:new Date().toISOString()} : n
  );
  saveSupervisorEmployeeNotifications(notifications);
  updateSupervisorEmployeeNotificationUI();
}
function resetDepartmentSchedules(department){
  const overrides = getEmployeeScheduleOverrides();
  getDepartmentEmployees(department).forEach(emp=>delete overrides[emp.no]);
  saveEmployeeScheduleOverrides(overrides);
}

function getRequests(){
  try{
    const rows=JSON.parse(localStorage.getItem(STORE_KEY)) || [];
    let changed=false;
    rows.forEach(r=>{
      if(r.reviewedBy==="General Manager"){r.reviewedBy="Request Approver";changed=true;}
      if(r.managerReviewedBy==="General Manager"){r.managerReviewedBy="Request Approver";changed=true;}
    });
    if(changed)cloudSetItem(STORE_KEY,JSON.stringify(rows));
    return rows;
  }catch{return []}
}
function saveRequests(data){cloudSetItem(STORE_KEY, JSON.stringify(data))}

// ===== EMPLOYEE ATTENDANCE + OT SUBMISSIONS =====
// Employees own the daily attendance/OT input. Employee-filed OT first enters
// Supervisor OT review. The Supervisor may Edit, Reject, or Check/Forward it.
// Only Supervisor-checked OT enters the Request Approver queue. Attendance
// finalization remains separate from OT approval.
function getEmployeeAttendanceOTSubmissions(){
  try{return JSON.parse(localStorage.getItem(EMPLOYEE_ATTENDANCE_OT_KEY)) || []}
  catch{return []}
}
function saveEmployeeAttendanceOTSubmissions(data){
  cloudSetItem(EMPLOYEE_ATTENDANCE_OT_KEY,JSON.stringify(data));
}
function employeeAttendanceOTSubmissionKey(employeeNo,dateKey){
  return `${String(employeeNo||"").trim()}|${String(dateKey||"").trim()}`;
}
function getEmployeeAttendanceOTSubmission(employeeNo,dateKey){
  const key=employeeAttendanceOTSubmissionKey(employeeNo,dateKey);
  return getEmployeeAttendanceOTSubmissions().find(r=>employeeAttendanceOTSubmissionKey(r.employeeNo,r.date)===key) || null;
}
function upsertEmployeeAttendanceOTSubmission(record){
  if(!record?.employeeNo || !record?.date)return null;
  const rows=getEmployeeAttendanceOTSubmissions();
  const key=employeeAttendanceOTSubmissionKey(record.employeeNo,record.date);
  const index=rows.findIndex(r=>employeeAttendanceOTSubmissionKey(r.employeeNo,r.date)===key);
  const now=new Date().toISOString();
  const next={
    ...(index>=0?rows[index]:{}),
    ...record,
    id:index>=0?(rows[index].id||record.id||uid()):(record.id||uid()),
    createdAt:index>=0?(rows[index].createdAt||record.createdAt||now):(record.createdAt||now),
    updatedAt:now
  };
  if(index>=0)rows[index]=next;else rows.push(next);
  saveEmployeeAttendanceOTSubmissions(rows);
  return next;
}
function activeOTRequestForEmployeeDate(employeeNo,dateKey){
  return getRequests().find(r=>
    !isOtAmendment(r) && String(r.employeeNo||"")===String(employeeNo||"") &&
    r.otDate===dateKey && ["Pending","Approved"].includes(r.status) && Number(r.totalHours||0)>0
  ) || null;
}
function latestOTRequestForEmployeeDate(employeeNo,dateKey,requests=getRequests()){
  return (requests||[])
    .filter(r=>!isOtAmendment(r) && String(r.employeeNo||"")===String(employeeNo||"") && r.otDate===dateKey && isActualOTRecord(r))
    .sort((a,b)=>new Date(b.createdAt||b.reviewedAt||0)-new Date(a.createdAt||a.reviewedAt||0))[0] || null;
}
function rejectedOTRequestForEmployeeDate(employeeNo,dateKey,requests=getRequests()){
  const latest=latestOTRequestForEmployeeDate(employeeNo,dateKey,requests);
  return latest?.status==="Rejected" ? latest : null;
}
function employeeSubmissionIsNewerThanOTRequest(sub,request){
  if(!sub||!request)return false;
  const submittedAt=new Date(sub.submittedAt||sub.updatedAt||0).getTime();
  const requestDecisionAt=new Date(request.reviewedAt||request.createdAt||0).getTime();
  return submittedAt>requestDecisionAt && String(sub.supervisorRequestId||"")!==String(request.id||"");
}
function normalizeDepartmentName(value){
  return String(value||"").trim().toLowerCase();
}
function employeeSubmissionHasOT(sub){
  if(!sub)return false;
  // Keep compatibility with earlier employee submissions where hasOT may have
  // been missing/serialized differently but valid OT hours were already saved.
  const total=Number(sub.totalHours||0);
  const explicit=sub.hasOT===true || sub.hasOT===1 || String(sub.hasOT).toLowerCase()==="true";
  const hasTimes=Boolean((sub.normalOtStart&&sub.normalOtEnd)||(sub.straightDutyOtStart&&sub.straightDutyOtEnd));
  return total>0 && (explicit || hasTimes || Boolean(sub.otType));
}
function supervisorEligibleEmployeeOTSubmissions(department,dateKey,allSubmissions=getEmployeeAttendanceOTSubmissions(),allRequests=getRequests()){
  const dept=normalizeDepartmentName(department);
  return allSubmissions.filter(sub=>{
    if(normalizeDepartmentName(sub.department)!==dept || sub.date!==dateKey || !employeeSubmissionHasOT(sub))return false;
    const latest=latestOTRequestForEmployeeDate(sub.employeeNo,dateKey,allRequests);
    if(!latest)return true;
    if(["Pending","Approved"].includes(latest.status))return false;
    if(latest.status==="Rejected"){
      // The same rejected filing must stay rejected until the employee actually edits/resubmits it.
      return employeeSubmissionIsNewerThanOTRequest(sub,latest);
    }
    return true;
  });
}

// Build the approval record directly from an employee OT filing. This keeps OT
// approval independent from Supervisor attendance finalization and supports
// same-day/past as well as advance OT filing.
function employeeOTRequestPayload(sub,existing={}){
  const dateKey=sub.date;
  const holiday=getPhilippineHoliday(dateKey);
  return {
    ...existing,
    source:"Employee Direct OT Filing",
    filedDirectByEmployee:true,
    isAdvanceFiling:Boolean(sub.advanceOTFiling || dateKey>toDateKey(new Date())),
    employeeSubmissionId:sub.id||existing.employeeSubmissionId||"",
    employeeSubmittedAt:sub.submittedAt||sub.updatedAt||existing.employeeSubmittedAt||new Date().toISOString(),
    employeeSubmittedBy:sub.submittedByEmployee||existing.employeeSubmittedBy||"",
    employeeNo:sub.employeeNo,employeeName:sub.employeeName,position:sub.position||"",
    schedule:sub.schedule||"",scheduleStart:sub.scheduleStart||"",scheduleEnd:sub.scheduleEnd||"",
    scheduleTime:`${formatClockTime24(sub.scheduleStart)} – ${formatClockTime24(sub.scheduleEnd)}`,
    normalOtStart:sub.normalOtStart||"",normalOtEnd:sub.normalOtEnd||"",
    straightDuty:Boolean(sub.straightDuty),
    straightDutyScheduleStart:sub.straightDutyScheduleStart||"",straightDutyScheduleEnd:sub.straightDutyScheduleEnd||"",
    straightDutyOtStart:sub.straightDutyOtStart||"",straightDutyOtEnd:sub.straightDutyOtEnd||"",
    straightDutyStart:sub.straightDutyScheduleStart||"",straightDutyEnd:sub.straightDutyScheduleEnd||"",
    employeeDayOff:sub.employeeDayOff||"",attendanceStatus:"",attendanceType:"",leaveType:"",absentType:"",
    department:sub.department||"",supervisorName:"Filed directly by Employee",
    otDate:dateKey,otType:holiday?getAutomaticOtType(dateKey,false):(sub.otType||"Regular Day"),isHoliday:Boolean(holiday),
    holidayName:sub.holidayName||holiday?.name||"",holidayClassification:sub.holidayClassification||holiday?.label||"",
    startTime:sub.normalOtStart||sub.straightDutyOtStart||"",endTime:sub.normalOtEnd||sub.straightDutyOtEnd||"",
    totalHours:Number(sub.totalHours||0).toFixed(2),scheduledOtHours:Number(sub.scheduledOtHours||0).toFixed(2),extraOtHours:Number(sub.extraOtHours||0).toFixed(2),
    workArea:sub.workArea||"",maintenanceEquipment:sub.maintenanceEquipment||"",maintenanceEquipmentLocation:sub.maintenanceEquipmentLocation||"",
    reason:sub.reason||"",submittedBy:sub.submittedByEmployee||existing.submittedBy||"employee"
  };
}
function sendEmployeeOTDirectToApprover(sub,{notify=true}={}){
  if(!employeeSubmissionHasOT(sub))return null;
  const requests=getRequests();
  const latest=latestOTRequestForEmployeeDate(sub.employeeNo,sub.date,requests);
  const now=new Date().toISOString();
  let request=null;
  let created=false;

  if(latest?.status==="Approved"){
    request=latest;
  }else if(latest?.status==="Pending"){
    Object.assign(latest,employeeOTRequestPayload(sub,latest),{updatedAt:now});
    request=latest;
  }else{
    request={
      id:uid(),
      ...employeeOTRequestPayload(sub),
      status:"Pending",createdAt:now,reviewedBy:"",reviewedAt:"",managerRemarks:"",
      ...(latest?.status==="Rejected"?{previousRejectedRequestId:latest.id}: {})
    };
    requests.push(request);
    created=true;
  }
  saveRequests(requests);

  const submissions=getEmployeeAttendanceOTSubmissions();
  const key=employeeAttendanceOTSubmissionKey(sub.employeeNo,sub.date);
  const idx=submissions.findIndex(r=>employeeAttendanceOTSubmissionKey(r.employeeNo,r.date)===key);
  if(idx>=0){
    submissions[idx]={...submissions[idx],approverRequestId:request.id,supervisorRequestId:request.id,approverSubmittedAt:request.createdAt||now,supervisorForwardedAt:"",supervisorForwardedBy:"",updatedAt:now};
    saveEmployeeAttendanceOTSubmissions(submissions);
  }
  if(created && notify)addManagerNotification([request]);
  return request;
}
function migrateDirectPendingOTBackToSupervisorReview(){
  const MIGRATION_KEY="employeeOTSupervisorGateMigration20260813v1";
  if(localStorage.getItem(MIGRATION_KEY)==="done")return 0;
  const requests=getRequests();
  const pendingDirect=requests.filter(r=>!isOtAmendment(r) && r.status==="Pending" && r.filedDirectByEmployee===true);
  const removedIds=new Set(pendingDirect.map(r=>String(r.id)));
  if(removedIds.size)saveRequests(requests.filter(r=>!removedIds.has(String(r.id))));

  const submissions=getEmployeeAttendanceOTSubmissions();
  let changed=0;
  submissions.forEach(sub=>{
    if(!employeeSubmissionHasOT(sub))return;
    const linkedWasRemoved=removedIds.has(String(sub.approverRequestId||"")) || removedIds.has(String(sub.supervisorRequestId||""));
    const latest=latestOTRequestForEmployeeDate(sub.employeeNo,sub.date,getRequests());
    if(linkedWasRemoved || !latest){
      sub.approverRequestId="";
      sub.supervisorRequestId="";
      sub.approverSubmittedAt="";
      sub.supervisorForwardedAt="";
      sub.supervisorForwardedBy="";
      if(sub.supervisorOTReviewStatus!=="Rejected"){
        sub.supervisorOTReviewStatus="Pending";
        sub.supervisorOTReviewReason="";
        sub.supervisorOTReviewedAt="";
        sub.supervisorOTReviewedBy="";
      }
      sub.updatedAt=new Date().toISOString();
      changed++;
    }else if(latest?.status==="Pending"){
      sub.supervisorOTReviewStatus="Forwarded";
      sub.supervisorRequestId=latest.id;
      sub.approverRequestId=latest.id;
    }
  });
  if(changed)saveEmployeeAttendanceOTSubmissions(submissions);

  if(removedIds.size){
    const notifications=getManagerNotifications().filter(n=>{
      const ids=Array.isArray(n.requestIds)?n.requestIds:[];
      return !ids.some(id=>removedIds.has(String(id)));
    });
    saveManagerNotifications(notifications);
  }
  cloudSetItem(MIGRATION_KEY,"done");
  return removedIds.size;
}

// ===== DAILY ATTENDANCE REGISTER =====
// Attendance is intentionally stored separately from approval requests.
// Request Approver receives only OT requests (STORE_KEY) and Leave requests (LEAVE_REQUEST_KEY).
function getDailyAttendanceRecords(){
  try{return JSON.parse(localStorage.getItem(ATTENDANCE_STORE_KEY)) || []}
  catch{return []}
}
function saveDailyAttendanceRecords(data){
  cloudSetItem(ATTENDANCE_STORE_KEY,JSON.stringify(data));
}
function dailyAttendanceKey(employeeNo,dateKey){
  return `${String(employeeNo||"").trim()}|${String(dateKey||"").trim()}`;
}
function upsertDailyAttendanceRecord(record){
  if(!record?.employeeNo || !record?.date)return null;
  const rows=getDailyAttendanceRecords();
  const key=dailyAttendanceKey(record.employeeNo,record.date);
  const index=rows.findIndex(r=>dailyAttendanceKey(r.employeeNo,r.date)===key);
  const now=new Date().toISOString();
  const next={
    ...(index>=0?rows[index]:{}),
    ...record,
    id:index>=0?(rows[index].id||record.id||uid()):(record.id||uid()),
    createdAt:index>=0?(rows[index].createdAt||record.createdAt||now):(record.createdAt||now),
    updatedAt:now
  };
  if(index>=0)rows[index]=next;else rows.push(next);
  saveDailyAttendanceRecords(rows);
  return next;
}
function isActualOTRecord(record){
  return Boolean(record && !record.attendanceStatus && (isOtAmendment(record) || Number(record.totalHours||0)>0));
}
function getEmployeeAttendanceSchedule(employee){
  const shift=String(employee?.schedule||"");
  const defaults=getDefaultShiftTimes(shift);
  const start=isValid24HourTime(employee?.scheduleStart) ? employee.scheduleStart : defaults.start;
  const end=isValid24HourTime(employee?.scheduleEnd) ? employee.scheduleEnd : defaults.end;
  if(shift==="Night" || shift==="Morning")return {shift,start,end};
  return {shift:shift||"Unassigned",start:"",end:""};
}
const UNPAID_LUNCH_MINUTES=60;
const STANDARD_SHIFT_SPAN_MINUTES=9*60;
const LUNCH_DEDUCTION_TRIGGER_MINUTES=6*60;
function attendanceClockMinutes(value){
  if(!isValid24HourTime(value))return null;
  const [h,m]=value.split(":").map(Number);
  return h*60+m;
}
function getUnpaidLunchDeductionMinutes({scheduleSpanMinutes=0,scheduledOverlapMinutes=0}={}){
  // Standard 06:00–15:00 / 18:00–03:00 shifts span 9 clock hours,
  // but only 8 hours are paid because the 1-hour lunch break is unpaid.
  if(Number(scheduleSpanMinutes||0)<STANDARD_SHIFT_SPAN_MINUTES)return 0;
  return Number(scheduledOverlapMinutes||0)>LUNCH_DEDUCTION_TRIGGER_MINUTES ? UNPAID_LUNCH_MINUTES : 0;
}
function calculateAttendanceMetrics({status,timeIn,timeOut,scheduleStart,scheduleEnd,isHoliday=false,isDayOff=false}={}){
  const blank={workedHours:0,regularHours:0,lateMinutes:0,undertimeMinutes:0};
  if(status!=="Present" || !timeIn || !timeOut || !scheduleStart || !scheduleEnd)return blank;
  let sIn=attendanceClockMinutes(scheduleStart),sOut=attendanceClockMinutes(scheduleEnd);
  let aIn=attendanceClockMinutes(timeIn),aOut=attendanceClockMinutes(timeOut);
  if([sIn,sOut,aIn,aOut].some(v=>v===null))return blank;
  if(sOut<=sIn)sOut+=1440;
  if(aOut<=aIn)aOut+=1440;
  // Align early-after-midnight actual IN with an overnight schedule when needed.
  if(sIn>=12*60 && aIn<6*60){aIn+=1440;if(aOut<aIn)aOut+=1440;}
  const worked=Math.max(0,aOut-aIn);
  const overlap=Math.max(0,Math.min(aOut,sOut)-Math.max(aIn,sIn));
  const scheduleSpan=Math.max(0,sOut-sIn);
  const unpaidLunch=getUnpaidLunchDeductionMinutes({scheduleSpanMinutes:scheduleSpan,scheduledOverlapMinutes:overlap});
  const paidWorked=Math.max(0,worked-unpaidLunch);
  const paidRegular=Math.max(0,overlap-unpaidLunch);
  const exemptSchedulePenalty=isHoliday || isDayOff;
  return {
    workedHours:Number((paidWorked/60).toFixed(2)),
    regularHours:Number((exemptSchedulePenalty?0:paidRegular/60).toFixed(2)),
    lateMinutes:exemptSchedulePenalty?0:Math.max(0,Math.round(aIn-sIn)),
    undertimeMinutes:exemptSchedulePenalty?0:Math.max(0,Math.round(sOut-aOut))
  };
}
function getApprovedOTHoursForEmployeeDate(employeeNo,dateKey){
  return Number(getRequests().filter(r=>
    !isOtAmendment(r) && isActualOTRecord(r) && r.status==="Approved" &&
    String(r.employeeNo||"")===String(employeeNo||"") && r.otDate===dateKey
  ).reduce((sum,r)=>sum+Number(r.totalHours||0),0).toFixed(2));
}

// Backward-compatibility reconciliation for older datasets:
// an approved OT record proves the employee reported for work on that OT date.
// It must NOT overwrite an explicit Attendance / Leave / Absent / Day Off record,
// and pending, rejected, or future OT never creates Present attendance.
function syncApprovedOTToDailyAttendance(){
  const todayKey=toDateKey(new Date());
  const attendance=getDailyAttendanceRecords();
  const existingKeys=new Set(attendance.filter(r=>r.employeeNo&&r.date).map(r=>dailyAttendanceKey(r.employeeNo,r.date)));
  const additions=[];
  getRequests().filter(r=>
    !isOtAmendment(r) && isActualOTRecord(r) && r.status==="Approved" &&
    r.employeeNo && r.otDate && r.otDate<=todayKey
  ).forEach(r=>{
    const key=dailyAttendanceKey(r.employeeNo,r.otDate);
    if(existingKeys.has(key))return;
    const employee=getEmployeeByNo(r.employeeNo)||{};
    const department=r.department||employee.department||"";
    const configured=(getDepartmentEmployees(department)||[]).find(emp=>String(emp.no)===String(r.employeeNo))||employee;
    const schedule=getEmployeeAttendanceSchedule({...configured,schedule:r.schedule||configured.schedule});
    const scheduleStart=r.scheduleStart||schedule.start||"";
    const scheduleEnd=r.scheduleEnd||schedule.end||"";
    const holiday=getPhilippineHoliday(r.otDate);
    additions.push({
      id:`ATT-OT-${r.id||uid()}`,
      source:"Approved OT Reconciliation",
      sourceOTRequestId:r.id||"",
      employeeNo:r.employeeNo,
      employeeName:r.employeeName||configured.name||employee.name||"",
      position:r.position||configured.position||employee.position||"",
      department,
      date:r.otDate,
      shift:r.schedule||schedule.shift||"Unassigned",
      scheduleStart,
      scheduleEnd,
      employeeDayOff:r.employeeDayOff||configured.dayOff||"",
      status:"Present",
      attendanceType:"Present",
      leaveType:"",
      absentType:"",
      timeIn:"",
      timeOut:"",
      workedHours:0,
      regularHours:0,
      lateMinutes:0,
      undertimeMinutes:0,
      approvedOtHours:getApprovedOTHoursForEmployeeDate(r.employeeNo,r.otDate),
      holidayName:holiday?.name||"",
      holidayClassification:holiday?.label||"",
      remarks:"Present reconciled from approved OT. Exact Time In/Out was not recorded in the attendance register.",
      recordedBy:"System Reconciliation",
      createdAt:r.reviewedAt||r.createdAt||new Date().toISOString(),
      updatedAt:new Date().toISOString()
    });
    existingKeys.add(key);
  });
  if(additions.length)saveDailyAttendanceRecords([...attendance,...additions]);
  return additions.length;
}
// Current/future duty attendance must never reach HR from an employee submission alone.
// The Supervisor is the attendance finalization gate. Approved Leave is intentionally
// excluded from this cleanup because it has already completed its approval workflow.
function pruneUnfinalizedCurrentAttendance(){
  const todayKey=toDateKey(new Date());
  const rows=getDailyAttendanceRecords();
  const kept=rows.filter(r=>{
    if(!r?.date || r.date<todayKey)return true;
    const prematureEmployee=Boolean(r.sourceEmployeeSubmission) || r.source==="Employee Submission";
    const prematureReconcile=r.source==="Approved OT Reconciliation";
    return !(prematureEmployee || prematureReconcile);
  });
  if(kept.length!==rows.length)saveDailyAttendanceRecords(kept);
  return rows.length-kept.length;
}

function syncApprovedLeaveToDailyAttendance(leaveRequest){
  if(!leaveRequest || leaveRequest.status!=="Approved")return 0;
  const todayKey=toDateKey(new Date());
  const dueDates=eachDateKey(leaveRequest.startDate,leaveRequest.endDate).filter(date=>date<=todayKey);
  if(!dueDates.length)return 0;
  const rows=getDailyAttendanceRecords();
  const existingKeys=new Set(rows.map(r=>dailyAttendanceKey(r.employeeNo,r.date)));
  const missingDates=dueDates.filter(date=>!existingKeys.has(dailyAttendanceKey(leaveRequest.employeeNo,date)));
  // Fast path: almost every minute after the first sync, all approved-leave dates are
  // already stored. Exit before rebuilding employee/schedule data or writing Firebase.
  if(!missingDates.length)return 0;
  const employee=getEmployeeByNo(leaveRequest.employeeNo)||{};
  const configured=(getDepartmentEmployees(leaveRequest.department||employee.department||"")||[]).find(e=>e.no===leaveRequest.employeeNo)||employee;
  const schedule=getEmployeeAttendanceSchedule(configured);
  let added=0;
  missingDates.forEach(date=>{
    const now=new Date().toISOString();
    rows.push({
      id:uid(),
      source:"Approved Leave",
      sourceLeaveRequestId:leaveRequest.id,
      employeeNo:leaveRequest.employeeNo,
      employeeName:leaveRequest.employeeName,
      position:leaveRequest.position||configured.position||"",
      department:leaveRequest.department||configured.department||"",
      date,
      shift:schedule.shift,
      scheduleStart:schedule.start,
      scheduleEnd:schedule.end,
      employeeDayOff:configured.dayOff||"",
      status:"Leave",
      attendanceType:leaveRequest.leaveType||"Leave",
      leaveType:leaveRequest.leaveType||"",
      timeIn:"",timeOut:"",workedHours:0,regularHours:0,lateMinutes:0,undertimeMinutes:0,
      approvedOtHours:getApprovedOTHoursForEmployeeDate(leaveRequest.employeeNo,date),
      holidayName:getPhilippineHoliday(date)?.name||"",
      remarks:leaveRequest.reason||`${leaveRequest.leaveType||"Leave"} approved leave.`,
      recordedBy:leaveRequest.gmReviewedBy||"Request Approver",
      createdAt:leaveRequest.gmReviewedAt||leaveRequest.createdAt||now,
      updatedAt:now
    });
    existingKeys.add(dailyAttendanceKey(leaveRequest.employeeNo,date));
    added++;
  });
  if(added)saveDailyAttendanceRecords(rows);
  return added;
}
function syncLegacyAttendanceRecords(){
  const existing=new Set(getDailyAttendanceRecords().map(r=>dailyAttendanceKey(r.employeeNo,r.date)));
  const additions=[];
  getRequests().filter(r=>(r.attendanceStatus==="Leave"||r.attendanceStatus==="Absent")&&r.otDate).forEach(r=>{
    const key=dailyAttendanceKey(r.employeeNo,r.otDate);
    if(existing.has(key))return;
    const employee=getEmployeeByNo(r.employeeNo)||{};
    const schedule=getEmployeeAttendanceSchedule(employee);
    additions.push({
      id:uid(),source:"Legacy Attendance",employeeNo:r.employeeNo,employeeName:r.employeeName,position:r.position||employee.position||"",
      department:r.department||employee.department||"",date:r.otDate,shift:r.schedule||schedule.shift,scheduleStart:r.scheduleStart||schedule.start,
      scheduleEnd:r.scheduleEnd||schedule.end,employeeDayOff:r.employeeDayOff||employee.dayOff||"",status:r.attendanceStatus,
      attendanceType:r.attendanceType||r.leaveType||r.absentType||r.attendanceStatus,leaveType:r.leaveType||"",absentType:r.absentType||"",
      timeIn:"",timeOut:"",workedHours:0,regularHours:0,lateMinutes:0,undertimeMinutes:0,
      approvedOtHours:getApprovedOTHoursForEmployeeDate(r.employeeNo,r.otDate),holidayName:getPhilippineHoliday(r.otDate)?.name||"",
      remarks:r.reason||"",recordedBy:r.submittedBy||r.reviewedBy||"System",createdAt:r.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString()
    });
    existing.add(key);
  });
  if(additions.length)saveDailyAttendanceRecords([...getDailyAttendanceRecords(),...additions]);
  return additions.length;
}
function attendanceDisplayStatus(record){
  if(record?.status==="Present" && Number(record?.lateMinutes||0)>0)return "Late";
  return record?.status||"Not Recorded";
}
function attendanceStatusBadge(status){
  const cls={Present:"approved",Late:"warning",Leave:"approved",Absent:"rejected","Day Off":"primary",Holiday:"warning"}[status]||"pending";
  return `<span class="badge ${cls}">${escapeHtml(status||"Not Recorded")}</span>`;
}
function employmentStatusBadge(status){
  const normalized=String(status||"Probationary");
  const cls={Regular:"approved",Probationary:"warning","On-Call":"primary",AWOL:"rejected",Resigned:"rejected","End Of Contract":"pending"}[normalized]||"pending";
  return `<span class="badge ${cls}">${escapeHtml(normalized)}</span>`;
}
function getAttendanceCutoffs(records=getDailyAttendanceRecords()){
  const map=new Map();
  const add=c=>{if(c?.key&&!map.has(c.key))map.set(c.key,c)};
  records.filter(r=>r.date).forEach(r=>add(payrollCutoffForOTDate(r.date)));
  getRequests().filter(r=>r.otDate).forEach(r=>add(payrollCutoffForOTDate(r.otDate)));
  add(getPayrollCutoff(new Date()));add(getPreviousPayrollCutoff(new Date()));
  return [...map.values()].sort((a,b)=>b.start-a.start);
}
function attendanceRowsForCutoff(records,cutoff){
  return records.filter(r=>r.date&&r.date>=cutoff.startKey&&r.date<=cutoff.endKey);
}
function buildFullAttendanceEmployeeSummary(records){
  const map=new Map();
  records.forEach(r=>{
    const key=String(r.employeeNo||r.employeeName||"").toLowerCase();
    if(!key)return;
    if(!map.has(key))map.set(key,{employeeNo:r.employeeNo||"",employeeName:r.employeeName||"—",position:r.position||"—",department:r.department||"Unassigned",present:0,leave:0,absent:0,dayOff:0,holiday:0,late:0,undertime:0,workedHours:0,regularHours:0,approvedOtHours:0});
    const x=map.get(key);
    const displayStatus=attendanceDisplayStatus(r);
    if(displayStatus==="Present")x.present++;
    else if(displayStatus==="Late")x.late++;
    else if(r.status==="Leave")x.leave++;
    else if(r.status==="Absent")x.absent++;
    else if(r.status==="Day Off")x.dayOff++;
    else if(r.status==="Holiday")x.holiday++;
    if(Number(r.undertimeMinutes||0)>0)x.undertime++;
    x.workedHours+=Number(r.workedHours||0);x.regularHours+=Number(r.regularHours||0);x.approvedOtHours+=Number(r.approvedOtHours||0);
  });
  return [...map.values()].sort((a,b)=>a.department.localeCompare(b.department)||a.employeeName.localeCompare(b.employeeName));
}
function updateAttendanceRowPreview(row,dateKey){
  if(!row)return;
  const status=row.querySelector(".attendance-status")?.value||"Present";
  const timeIn=normalize24HourTime(row.querySelector(".attendance-time-in")?.value||"");
  const timeOut=normalize24HourTime(row.querySelector(".attendance-time-out")?.value||"");
  const isHoliday=Boolean(getPhilippineHoliday(dateKey));
  const weekday=dateKey?parseLocalDate(dateKey).toLocaleDateString("en-PH",{weekday:"long"}):"";
  const isDayOff=Boolean(row.dataset.dayOff&&row.dataset.dayOff===weekday);
  const metrics=calculateAttendanceMetrics({status,timeIn,timeOut,scheduleStart:row.dataset.scheduleStart||"",scheduleEnd:row.dataset.scheduleEnd||"",isHoliday,isDayOff});
  row.querySelector(".attendance-time-fields")?.classList.toggle("hidden",status!=="Present");
  row.querySelector(".attendance-absent-type-wrap")?.classList.toggle("hidden",status!=="Absent");
  const late=row.querySelector(".attendance-late");if(late)late.textContent=metrics.lateMinutes?`${metrics.lateMinutes} min`:"—";
  const under=row.querySelector(".attendance-undertime");if(under)under.textContent=metrics.undertimeMinutes?`${metrics.undertimeMinutes} min`:"—";
  const worked=row.querySelector(".attendance-worked");if(worked)worked.textContent=`${metrics.workedHours.toFixed(2)} h`;
  const regular=row.querySelector(".attendance-regular");if(regular)regular.textContent=`${metrics.regularHours.toFixed(2)} h`;
  row.classList.toggle("attendance-exception-row",status!=="Present");
  return metrics;
}
function renderSupervisorAttendance(){
  const dateKey=supervisorAttendanceDateKey||toDateKey(new Date());
  const holiday=getPhilippineHoliday(dateKey);
  const weekday=parseLocalDate(dateKey).toLocaleDateString("en-PH",{weekday:"long"});
  const allEmployees=getDepartmentEmployees(currentUser.department).filter(emp=>!["Resigned","End Of Contract"].includes(emp.employmentStatus||""));
  const existing=new Map(getDailyAttendanceRecords().filter(r=>r.date===dateKey&&r.department===currentUser.department).map(r=>[String(r.employeeNo),r]));
  setPage("Daily Attendance","SUPERVISOR ATTENDANCE",`Record Time In / Time Out and daily attendance for ${currentUser.department}. No attendance record is sent to Request Approver.`);
  content.innerHTML=`
    ${heroBanner("Daily attendance register","Record normal attendance here. Only overtime entered in New OT Request and employee Leave requests enter the approval workflow.",allEmployees.length,"employees in department")}
    <div class="card attendance-entry-card">
      <div class="card-header"><div class="card-title-group"><h3>${escapeHtml(currentUser.department)} Attendance</h3><p>${escapeHtml(weekday)} • ${formatDate(dateKey)}${holiday?` • ${escapeHtml(holiday.name)}`:""}</p></div><span class="badge ${holiday?"warning":"primary"}">${holiday?"PH HOLIDAY":"DAILY RECORD"}</span></div>
      <div class="card-body">
        <div class="attendance-toolbar">
          <label class="field compact-field"><span>Attendance Date</span><input id="attendanceDate" type="date" value="${escapeHtml(dateKey)}"></label>
          <button id="fillScheduledAttendance" class="btn btn-light btn-sm" type="button">Fill Scheduled Times</button>
          ${holiday?`<div class="holiday-status-banner ${getHolidayCategoryClass(holiday.category)}"><strong>${escapeHtml(holiday.name)}</strong><span>${escapeHtml(holiday.label)} • If an employee works, select Present. Regular Hours = 0 and the worked hours are handled as OT through New OT Request.</span></div>`:`<div class="holiday-status-banner holiday-regular-day"><strong>Regular Workday</strong><span>Enter actual Time In/Out. Example: Schedule In 06:00 and Time In 06:05 = 5 minutes Late.</span></div>`}
        </div>
        <div class="attendance-entry-table-wrap"><table class="data-table attendance-entry-table"><thead><tr><th>Employee</th><th>Shift / Schedule</th><th>Status</th><th>Actual Time In / Out</th><th>Worked</th><th>Regular</th><th>Late</th><th>Undertime</th><th>Approved OT</th><th>Remarks</th></tr></thead><tbody>
          ${allEmployees.map(emp=>{
            const schedule=getEmployeeAttendanceSchedule(emp);
            const prior=existing.get(String(emp.no));
            const approvedLeave=getApprovedLeaveForEmployeeDate(emp.no,dateKey);
            const isDayOff=Boolean(emp.dayOff&&emp.dayOff===weekday);
            let status=approvedLeave?"Leave":(prior?.status||(holiday?"Holiday":(isDayOff?"Day Off":"Present")));
            const type=approvedLeave?.leaveType||prior?.attendanceType||prior?.absentType||"AWOL";
            const timeIn=prior?.timeIn||"",timeOut=prior?.timeOut||"";
            const metrics=calculateAttendanceMetrics({status,timeIn,timeOut,scheduleStart:schedule.start,scheduleEnd:schedule.end,isHoliday:Boolean(holiday),isDayOff});
            const approvedOt=getApprovedOTHoursForEmployeeDate(emp.no,dateKey);
            return `<tr class="daily-attendance-row ${status!=="Present"?"attendance-exception-row":""}" data-employee-no="${escapeHtml(emp.no)}" data-employee-name="${escapeHtml(emp.name)}" data-position="${escapeHtml(emp.position)}" data-day-off="${escapeHtml(emp.dayOff||"")}" data-schedule="${escapeHtml(schedule.shift)}" data-schedule-start="${escapeHtml(schedule.start)}" data-schedule-end="${escapeHtml(schedule.end)}" data-approved-leave-id="${escapeHtml(approvedLeave?.id||"")}">
              <td><strong>${escapeHtml(emp.name)}</strong><small class="attendance-subline">${escapeHtml(emp.no)} • ${escapeHtml(emp.position)}</small></td>
              <td><span class="schedule-chip ${String(schedule.shift).toLowerCase()}">${escapeHtml(schedule.shift)}</span><small class="attendance-subline">${schedule.start&&schedule.end?`${escapeHtml(schedule.start)} – ${escapeHtml(schedule.end)}`:"Schedule not set"}${emp.dayOff?` • Day Off: ${escapeHtml(emp.dayOff)}`:""}</small></td>
              <td><select class="attendance-status" ${approvedLeave?"disabled":""}><option value="Present" ${status==="Present"?"selected":""}>Present</option><option value="Absent" ${status==="Absent"?"selected":""}>Absent</option><option value="Day Off" ${status==="Day Off"?"selected":""}>Day Off</option><option value="Holiday" ${status==="Holiday"?"selected":""}>Holiday</option><option value="Leave" ${status==="Leave"?"selected":""} ${!approvedLeave&&status!=="Leave"?"disabled":""}>Leave (Approved only)</option></select>${approvedLeave?`<small class="attendance-subline approved-leave-note">Approved ${escapeHtml(approvedLeave.leaveType)}</small>`:""}<label class="attendance-absent-type-wrap ${status==="Absent"?"":"hidden"}"><select class="attendance-absent-type"><option value="AWOL" ${type==="AWOL"?"selected":""}>AWOL</option><option value="Emergency Absent" ${type==="Emergency Absent"?"selected":""}>Emergency Absent</option></select></label></td>
              <td><div class="attendance-time-fields ${status==="Present"?"":"hidden"}"><input class="attendance-time-in" inputmode="numeric" maxlength="5" placeholder="IN HH:MM" value="${escapeHtml(timeIn)}"><span>→</span><input class="attendance-time-out" inputmode="numeric" maxlength="5" placeholder="OUT HH:MM" value="${escapeHtml(timeOut)}"></div>${status!=="Present"?`<small class="attendance-subline">No time required</small>`:""}</td>
              <td><strong class="attendance-worked">${metrics.workedHours.toFixed(2)} h</strong></td><td><strong class="attendance-regular">${metrics.regularHours.toFixed(2)} h</strong></td><td><span class="attendance-late">${metrics.lateMinutes?`${metrics.lateMinutes} min`:"—"}</span></td><td><span class="attendance-undertime">${metrics.undertimeMinutes?`${metrics.undertimeMinutes} min`:"—"}</span></td><td><strong>${approvedOt.toFixed(2)} h</strong></td>
              <td><input class="attendance-remarks" type="text" placeholder="Optional remarks" value="${escapeHtml(approvedLeave?.reason||prior?.remarks||"")}" ${approvedLeave?"readonly":""}></td>
            </tr>`;
          }).join("")}
        </tbody></table></div>
        <div class="attendance-save-footer"><div><strong>Attendance only</strong><span>Absent, Late, Undertime, Day Off and normal Time In/Out do not require Request Approver approval.</span></div><button id="saveDailyAttendance" class="btn btn-primary" type="button">Save Daily Attendance</button></div>
      </div>
    </div>`;
  const dateInput=document.getElementById("attendanceDate");
  dateInput?.addEventListener("change",()=>{if(dateInput.value){supervisorAttendanceDateKey=dateInput.value;renderSupervisorAttendance();}});
  document.getElementById("fillScheduledAttendance")?.addEventListener("click",()=>{
    document.querySelectorAll(".daily-attendance-row").forEach(row=>{
      if((row.querySelector(".attendance-status")?.value||"")!=="Present")return;
      const timeIn=row.querySelector(".attendance-time-in"),timeOut=row.querySelector(".attendance-time-out");
      if(timeIn&&!timeIn.value)timeIn.value=row.dataset.scheduleStart||"";
      if(timeOut&&!timeOut.value)timeOut.value=row.dataset.scheduleEnd||"";
      updateAttendanceRowPreview(row,dateKey);
    });
    showToast("Scheduled Time In/Out filled for Present employees. Edit exceptions before saving.");
  });
  document.querySelectorAll(".daily-attendance-row").forEach(row=>{
    row.querySelector(".attendance-status")?.addEventListener("change",()=>updateAttendanceRowPreview(row,dateKey));
    [".attendance-time-in",".attendance-time-out"].forEach(sel=>{
      const input=row.querySelector(sel);if(!input)return;
      input.addEventListener("input",()=>{let d=input.value.replace(/\D/g,"").slice(0,4);input.value=d.length>2?`${d.slice(0,2)}:${d.slice(2)}`:d;updateAttendanceRowPreview(row,dateKey)});
      input.addEventListener("blur",()=>{input.value=normalize24HourTime(input.value);updateAttendanceRowPreview(row,dateKey)});
    });
  });
  document.getElementById("saveDailyAttendance")?.addEventListener("click",()=>{
    const records=[];let invalid=null;
    document.querySelectorAll(".daily-attendance-row").forEach(row=>{
      if(invalid)return;
      const employeeNo=row.dataset.employeeNo;
      const approvedLeaveId=row.dataset.approvedLeaveId;
      const holidayForDate=getPhilippineHoliday(dateKey);
      const dayOff=Boolean(row.dataset.dayOff&&row.dataset.dayOff===weekday);
      const status=approvedLeaveId?"Leave":(row.querySelector(".attendance-status")?.value||"Present");
      const timeIn=normalize24HourTime(row.querySelector(".attendance-time-in")?.value||"");
      const timeOut=normalize24HourTime(row.querySelector(".attendance-time-out")?.value||"");
      if(status==="Present"&&(!isValid24HourTime(timeIn)||!isValid24HourTime(timeOut))){invalid=row;showToast(`Enter valid Time In and Time Out for ${row.dataset.employeeName}.`);return;}
      const metrics=calculateAttendanceMetrics({status,timeIn,timeOut,scheduleStart:row.dataset.scheduleStart,scheduleEnd:row.dataset.scheduleEnd,isHoliday:Boolean(holidayForDate),isDayOff:dayOff});
      const approvedLeave=approvedLeaveId?getLeaveRequestById(approvedLeaveId):null;
      const absentType=status==="Absent"?(row.querySelector(".attendance-absent-type")?.value||"AWOL"):"";
      records.push({source:approvedLeave?"Approved Leave":"Supervisor Attendance",employeeNo,employeeName:row.dataset.employeeName,position:row.dataset.position,department:currentUser.department,date:dateKey,shift:row.dataset.schedule,scheduleStart:row.dataset.scheduleStart,scheduleEnd:row.dataset.scheduleEnd,employeeDayOff:row.dataset.dayOff||"",status,attendanceType:approvedLeave?.leaveType||(status==="Absent"?absentType:status),leaveType:approvedLeave?.leaveType||"",absentType,timeIn:status==="Present"?timeIn:"",timeOut:status==="Present"?timeOut:"",...metrics,approvedOtHours:getApprovedOTHoursForEmployeeDate(employeeNo,dateKey),holidayName:holidayForDate?.name||"",holidayClassification:holidayForDate?.label||"",remarks:row.querySelector(".attendance-remarks")?.value.trim()||approvedLeave?.reason||"",recordedBy:currentUser.username,sourceLeaveRequestId:approvedLeave?.id||""});
    });
    if(invalid){invalid.querySelector(".attendance-time-in")?.focus();return;}
    records.forEach(upsertDailyAttendanceRecord);
    showToast(`${records.length} attendance record${records.length===1?"":"s"} saved for ${formatDate(dateKey)}.`);renderSupervisorAttendance();
  });
}
async function exportHRAttendanceExcel(records,cutoff){
  if(typeof ExcelJS==="undefined"){showToast("Excel export library could not load.");return;}
  if(!records.length){showToast("No attendance records match this cutoff/filter.");return;}
  const wb=new ExcelJS.Workbook();wb.creator="Eastern1961 Phils Inc";const ws=wb.addWorksheet("Attendance");
  ws.columns=[{header:"Date",key:"date",width:13},{header:"Employee No.",key:"no",width:14},{header:"Employee Name",key:"name",width:24},{header:"Position",key:"position",width:22},{header:"Department",key:"department",width:18},{header:"Shift",key:"shift",width:11},{header:"Schedule In",key:"scheduleIn",width:12},{header:"Schedule Out",key:"scheduleOut",width:12},{header:"Attendance Status",key:"status",width:18},{header:"Type",key:"type",width:18},{header:"Time In",key:"timeIn",width:11},{header:"Time Out",key:"timeOut",width:11},{header:"Worked Hours",key:"worked",width:14},{header:"Regular Hours",key:"regular",width:14},{header:"Late (min)",key:"late",width:12},{header:"Undertime (min)",key:"under",width:16},{header:"Approved OT Hours",key:"ot",width:18},{header:"PH Holiday",key:"holiday",width:30},{header:"Remarks",key:"remarks",width:35}];
  const header=ws.getRow(1);header.height=30;header.eachCell(c=>{c.font={bold:true,color:{argb:"FFFFFFFF"}};c.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF1E3A5F"}};c.alignment={vertical:"middle",horizontal:"center",wrapText:true}});
  [...records].sort((a,b)=>String(a.date).localeCompare(String(b.date))||String(a.employeeName).localeCompare(String(b.employeeName))).forEach(r=>{
    const row=ws.addRow({date:r.date,no:r.employeeNo,name:r.employeeName,position:r.position,department:r.department,shift:r.shift,scheduleIn:r.scheduleStart,scheduleOut:r.scheduleEnd,status:attendanceDisplayStatus(r),type:r.attendanceType||"",timeIn:r.timeIn||"",timeOut:r.timeOut||"",worked:Number(r.workedHours||0),regular:Number(r.regularHours||0),late:Number(r.lateMinutes||0),under:Number(r.undertimeMinutes||0),ot:Number(r.approvedOtHours||0),holiday:r.holidayName||"",remarks:r.remarks||""});
    row.eachCell(c=>{c.alignment={vertical:"middle",wrapText:true};c.border={top:{style:"thin",color:{argb:"FFD1D5DB"}},left:{style:"thin",color:{argb:"FFD1D5DB"}},bottom:{style:"thin",color:{argb:"FFD1D5DB"}},right:{style:"thin",color:{argb:"FFD1D5DB"}}}});
  });
  ws.autoFilter={from:"A1",to:"S1"};ws.views=[{state:"frozen",ySplit:1}];ws.pageSetup={orientation:"landscape",fitToPage:true,fitToWidth:1,fitToHeight:0};
  try{const buffer=await wb.xlsx.writeBuffer();const blob=new Blob([buffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`Eastern1961_Attendance_${cutoff.startKey}_to_${cutoff.endKey}.xlsx`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);showToast("Attendance Excel downloaded.");}catch(err){console.error(err);showToast("Attendance Excel export failed.");}
}
function renderHRAttendance(){
  const all=getDailyAttendanceRecords();const cutoffs=getAttendanceCutoffs(all);
  if(!hrAttendanceCutoffKey||!cutoffs.some(c=>c.key===hrAttendanceCutoffKey))hrAttendanceCutoffKey=(cutoffs[0]||getPayrollCutoff(new Date())).key;
  const cutoff=cutoffs.find(c=>c.key===hrAttendanceCutoffKey)||getPayrollCutoff(new Date());
  let rows=attendanceRowsForCutoff(all,cutoff);
  if(hrAttendanceDepartment!=="All Departments")rows=rows.filter(r=>r.department===hrAttendanceDepartment);
  // Always refresh OT values from approved OT records so attendance remains accurate after later approvals.
  rows=rows.map(r=>({...r,approvedOtHours:getApprovedOTHoursForEmployeeDate(r.employeeNo,r.date)}));

  const searchTerm=String(hrAttendanceSearch||"").trim().toLowerCase();
  if(hrAttendanceStatus!=="All")rows=rows.filter(r=>attendanceDisplayStatus(r)===hrAttendanceStatus);
  if(searchTerm)rows=rows.filter(r=>[
    r.employeeName,r.employeeNo,r.position,r.department,r.date,r.attendanceType,r.remarks
  ].some(v=>String(v||"").toLowerCase().includes(searchTerm)));

  const summary=buildFullAttendanceEmployeeSummary(rows);
  const present=rows.filter(r=>attendanceDisplayStatus(r)==="Present").length;
  const leave=rows.filter(r=>r.status==="Leave").length,absent=rows.filter(r=>r.status==="Absent").length;
  const late=rows.filter(r=>attendanceDisplayStatus(r)==="Late").length,under=rows.filter(r=>Number(r.undertimeMinutes||0)>0).length;
  const regularHours=rows.reduce((s,r)=>s+Number(r.regularHours||0),0),workedHours=rows.reduce((s,r)=>s+Number(r.workedHours||0),0),otHours=rows.reduce((s,r)=>s+Number(r.approvedOtHours||0),0);
  setPage("Attendance Records","HUMAN RESOURCES",`Complete attendance monitoring for ${cutoff.label}. Regular attendance never goes to Request Approver.`);
  content.innerHTML=`
    ${heroBanner("Attendance monitoring","Time In/Out, Present, Leave, Absent, Day Off, Holiday, Late, Undertime, regular worked hours and approved OT are consolidated here.",rows.length,"attendance records matching current filters")}
    <div class="card attendance-summary-filter-card"><div class="card-header"><div class="card-title-group"><h3>Attendance Filters</h3><p>Filter by cutoff, department, status, or employee</p></div><button type="button" id="downloadAttendanceExcel" class="btn btn-success btn-sm">⇩ Download Attendance Excel</button></div><div class="card-body"><div class="filters attendance-summary-filters attendance-report-filters"><label class="field"><span>Payroll Cutoff</span><select id="hrAttendanceCutoff">${cutoffs.map(c=>`<option value="${escapeHtml(c.key)}" ${c.key===cutoff.key?"selected":""}>${escapeHtml(c.label)}</option>`).join("")}</select></label><label class="field"><span>Department</span><select id="hrAttendanceDepartment"><option>All Departments</option>${DEPARTMENTS.map(d=>`<option value="${escapeHtml(d)}" ${hrAttendanceDepartment===d?"selected":""}>${escapeHtml(d)}</option>`).join("")}</select></label><label class="field"><span>Status</span><select id="hrAttendanceStatus"><option value="All" ${hrAttendanceStatus==="All"?"selected":""}>All Statuses</option><option value="Present" ${hrAttendanceStatus==="Present"?"selected":""}>Present</option><option value="Late" ${hrAttendanceStatus==="Late"?"selected":""}>Late</option><option value="Leave" ${hrAttendanceStatus==="Leave"?"selected":""}>Leave</option><option value="Absent" ${hrAttendanceStatus==="Absent"?"selected":""}>Absent</option><option value="Day Off" ${hrAttendanceStatus==="Day Off"?"selected":""}>Day Off</option><option value="Holiday" ${hrAttendanceStatus==="Holiday"?"selected":""}>Holiday</option></select></label><label class="field attendance-search-field"><span>Search</span><input id="hrAttendanceSearch" type="search" placeholder="Name, employee no., position..." value="${escapeHtml(hrAttendanceSearch)}"></label></div><div class="attendance-filter-note"><strong>Late rule:</strong> Schedule In 06:00 + actual Time In 06:05 = <strong>Late (5 min)</strong>. Late employees remain working-day attendance records, but appear as <strong>Late</strong> in this report.</div></div></div>
    <div class="stats-grid">${statCard("Present",present,`${cutoff.label} • on-time records`,"success")}${statCard("Leave Days",leave,"Approved employee leave","primary")}${statCard("Absent Days",absent,"No approver required","danger")}${statCard("Late",late,"Time In later than Schedule In","warning")}${statCard("Undertime",under,"Attendance occurrences","warning")}${statCard("Regular Hours",regularHours.toFixed(2),"Scheduled hours actually worked","primary")}${statCard("Approved OT",otHours.toFixed(2),"Approved OT linked to attendance","success")}</div>
    <div class="card"><div class="card-header"><div class="card-title-group"><h3>Per Employee — Cutoff Summary</h3><p>${escapeHtml(cutoff.label)}${hrAttendanceDepartment!=="All Departments"?` • ${escapeHtml(hrAttendanceDepartment)}`:""}${hrAttendanceStatus!=="All"?` • ${escapeHtml(hrAttendanceStatus)}`:""}</p></div></div><div class="table-wrap"><table class="data-table attendance-summary-table"><thead><tr><th>Employee</th><th>Department</th><th>Present</th><th>Leave</th><th>Absent</th><th>Day Off</th><th>Holiday</th><th>Late</th><th>Undertime</th><th>Worked Hrs</th><th>Regular Hrs</th><th>Approved OT</th></tr></thead><tbody>${summary.length?summary.map(x=>`<tr><td><strong>${escapeHtml(x.employeeName)}</strong><small class="attendance-subline">${escapeHtml(x.employeeNo)} • ${escapeHtml(x.position)}</small></td><td>${escapeHtml(x.department)}</td><td>${x.present}</td><td>${x.leave}</td><td>${x.absent}</td><td>${x.dayOff}</td><td>${x.holiday}</td><td>${x.late}</td><td>${x.undertime}</td><td>${x.workedHours.toFixed(2)}</td><td>${x.regularHours.toFixed(2)}</td><td>${x.approvedOtHours.toFixed(2)}</td></tr>`).join(""):`<tr><td colspan="12">${emptyState("No attendance records","No attendance matched the current search/status filters.")}</td></tr>`}</tbody></table></div></div>
    <div class="card hr-leave-absent-details-card"><div class="card-header"><div class="card-title-group"><h3>Leave / Absent Details</h3><p>Actual Leave and Absent dates are part of the Attendance Record and no longer use a separate HR tab.</p></div><span class="badge primary">${rows.filter(r=>r.status==="Leave"||r.status==="Absent").length} record${rows.filter(r=>r.status==="Leave"||r.status==="Absent").length===1?"":"s"}</span></div><div class="table-wrap"><table class="data-table attendance-detail-table"><thead><tr><th>Date</th><th>Employee</th><th>Department</th><th>Status</th><th>Type</th><th>Reason / Remarks</th></tr></thead><tbody>${rows.filter(r=>r.status==="Leave"||r.status==="Absent").length?rows.filter(r=>r.status==="Leave"||r.status==="Absent").sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(a.employeeName).localeCompare(String(b.employeeName))).map(r=>`<tr><td><strong>${formatDate(r.date)}</strong></td><td><strong>${escapeHtml(r.employeeName)}</strong><small class="attendance-subline">${escapeHtml(r.employeeNo||"—")} • ${escapeHtml(r.position||"—")}</small></td><td>${escapeHtml(r.department||"—")}</td><td>${attendanceStatusBadge(r.status)}</td><td>${escapeHtml(r.leaveType||r.absentType||r.attendanceType||r.status||"—")}</td><td>${escapeHtml(r.remarks||"—")}</td></tr>`).join(""):`<tr><td colspan="6">${emptyState("No Leave / Absent records","No Leave or Absent attendance records matched the current cutoff/filter/search.")}</td></tr>`}</tbody></table></div></div>
    <div class="card"><div class="card-header"><div class="card-title-group"><h3>Daily Attendance Details</h3><p>Time In/Out and calculated attendance exceptions</p></div></div><div class="table-wrap"><table class="data-table attendance-detail-table"><thead><tr><th>Date</th><th>Employee</th><th>Department</th><th>Status</th><th>Schedule</th><th>Time In</th><th>Time Out</th><th>Worked</th><th>Regular</th><th>Late</th><th>Undertime</th><th>Approved OT</th><th>Holiday / Remarks</th></tr></thead><tbody>${rows.length?[...rows].sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(a.employeeName).localeCompare(String(b.employeeName))).map(r=>{const displayStatus=attendanceDisplayStatus(r);return `<tr><td><strong>${formatDate(r.date)}</strong></td><td>${escapeHtml(r.employeeName)}</td><td>${escapeHtml(r.department)}</td><td>${attendanceStatusBadge(displayStatus)}${displayStatus==="Late"?`<small class="attendance-subline">${Number(r.lateMinutes||0)} min late</small>`:(r.attendanceType&&r.attendanceType!==r.status?`<small class="attendance-subline">${escapeHtml(r.attendanceType)}</small>`:"")}</td><td>${escapeHtml(r.scheduleStart||"—")} – ${escapeHtml(r.scheduleEnd||"—")}</td><td>${escapeHtml(r.timeIn||"—")}</td><td>${escapeHtml(r.timeOut||"—")}</td><td>${Number(r.workedHours||0).toFixed(2)}</td><td>${Number(r.regularHours||0).toFixed(2)}</td><td>${Number(r.lateMinutes||0)||"—"}</td><td>${Number(r.undertimeMinutes||0)||"—"}</td><td>${Number(r.approvedOtHours||0).toFixed(2)}</td><td>${r.holidayName?`<strong>${escapeHtml(r.holidayName)}</strong><br>`:""}<small>${escapeHtml(r.remarks||"—")}</small></td></tr>`}).join(""):`<tr><td colspan="13">${emptyState("No attendance records","No daily attendance matched the current cutoff/filter/search.")}</td></tr>`}</tbody></table></div></div>`;
  document.getElementById("hrAttendanceCutoff")?.addEventListener("change",e=>{hrAttendanceCutoffKey=e.target.value;renderHRAttendance()});
  document.getElementById("hrAttendanceDepartment")?.addEventListener("change",e=>{hrAttendanceDepartment=e.target.value;renderHRAttendance()});
  document.getElementById("hrAttendanceStatus")?.addEventListener("change",e=>{hrAttendanceStatus=e.target.value;renderHRAttendance()});
  const searchInput=document.getElementById("hrAttendanceSearch");
  searchInput?.addEventListener("input",e=>{
    hrAttendanceSearch=e.target.value;
    const cursor=e.target.selectionStart??hrAttendanceSearch.length;
    renderHRAttendance();
    requestAnimationFrame(()=>{const next=document.getElementById("hrAttendanceSearch");if(next){next.focus();try{next.setSelectionRange(cursor,cursor)}catch{}}});
  });
  document.getElementById("downloadAttendanceExcel")?.addEventListener("click",()=>exportHRAttendanceExcel(rows,cutoff));
}

function isOtAmendment(request){
  return request?.requestKind === "OT Amendment";
}
function getPendingOTAmendment(parentRequestId){
  return getRequests().find(r=>isOtAmendment(r) && r.parentRequestId===parentRequestId && r.status==="Pending") || null;
}
function getOTAmendments(parentRequestId){
  return getRequests().filter(r=>isOtAmendment(r) && r.parentRequestId===parentRequestId);
}
function getNextOTAmendmentNo(parentRequestId){
  const nums=getOTAmendments(parentRequestId).map(r=>Number(r.amendmentNo||0)).filter(Number.isFinite);
  return nums.length ? Math.max(...nums)+1 : 1;
}
function timeBlockHours(start,end){
  if(!start || !end || !isValid24HourTime(start) || !isValid24HourTime(end))return 0;
  return Number(calcHours(start,end)||0);
}
function paidScheduledBlockHours(start,end){
  const raw=timeBlockHours(start,end);
  return Number(Math.max(0,raw-(raw>=9?1:0)).toFixed(2));
}
function paidFullDutyBlockHours(start,end,scheduleStart,scheduleEnd){
  const raw=timeBlockHours(start,end);
  if(!raw)return 0;
  const scheduleRaw=timeBlockHours(scheduleStart,scheduleEnd);
  const includesScheduledLunch=start===scheduleStart && scheduleRaw>=9 && raw>6;
  return Number(Math.max(0,raw-(includesScheduledLunch?1:0)).toFixed(2));
}
function proposedOTBreakdown({scheduleStart="",scheduleEnd="",normalOtStart="",normalOtEnd="",otType="Regular Day",otDate="",straightDuty=false,straightDutyScheduleStart="",straightDutyScheduleEnd="",straightDutyOtStart="",straightDutyOtEnd=""}={}){
  const fullDutyOt=otType==="Rest Day OT" || Boolean(getPhilippineHoliday(otDate));
  const scheduledBase=fullDutyOt ? paidScheduledBlockHours(scheduleStart,scheduleEnd) : 0;
  const normalBlock=(normalOtStart && normalOtEnd) ? (fullDutyOt && normalOtStart===scheduleStart ? paidFullDutyBlockHours(normalOtStart,normalOtEnd,scheduleStart,scheduleEnd) : timeBlockHours(normalOtStart,normalOtEnd)) : 0;

  // Rest Day/Holiday rule:
  // every worked scheduled hour is OT, then any time beyond the schedule is added as extra OT.
  // Live entries normally use Schedule IN as OT IN. The second branch also supports
  // older/pending records whose OT IN was stored at Schedule OUT.
  let scheduledOtHours=0;
  let extraOtHours=normalBlock;
  if(fullDutyOt){
    if(normalOtStart && normalOtStart===scheduleStart){
      scheduledOtHours=Math.min(scheduledBase,normalBlock);
      extraOtHours=Math.max(0,normalBlock-scheduledOtHours);
    }else{
      scheduledOtHours=scheduledBase;
      extraOtHours=normalBlock;
    }
  }

  const straightScheduleHours=straightDuty && fullDutyOt ? paidScheduledBlockHours(straightDutyScheduleStart,straightDutyScheduleEnd) : 0;
  const straightExtraHours=straightDuty && straightDutyOtStart && straightDutyOtEnd ? timeBlockHours(straightDutyOtStart,straightDutyOtEnd) : 0;
  scheduledOtHours+=straightScheduleHours;
  extraOtHours+=straightExtraHours;

  const total=Number((scheduledOtHours+extraOtHours).toFixed(2));
  return {
    total,
    scheduledOtHours:Number(scheduledOtHours.toFixed(2)),
    extraOtHours:Number(extraOtHours.toFixed(2)),
    fullDutyOt
  };
}
function proposedOTTotalHours(args={}){
  return proposedOTBreakdown(args).total;
}

function getLeaveRequests(){
  try{
    const rows=JSON.parse(localStorage.getItem(LEAVE_REQUEST_KEY)) || [];
    let changed=false;
    rows.forEach(r=>{
      if(r.status==="Pending GM"){r.status="Pending Request Approver";changed=true;}
      if(r.status==="Rejected by GM"){r.status="Rejected by Request Approver";changed=true;}
      if(r.gmReviewedBy==="General Manager"){r.gmReviewedBy="Request Approver";changed=true;}
      if(r.reviewedBy==="General Manager"){r.reviewedBy="Request Approver";changed=true;}
    });
    if(changed)cloudSetItem(LEAVE_REQUEST_KEY,JSON.stringify(rows));
    return rows;
  }catch{return []}
}
function saveLeaveRequests(data){
  cloudSetItem(LEAVE_REQUEST_KEY,JSON.stringify(data));
}
function getLeaveRequestById(id){
  return getLeaveRequests().find(r=>r.id===id) || null;
}
function isLeaveRequestPendingForFilerEdit(request){
  return ["Pending Supervisor","Pending HR","Pending Request Approver"].includes(request?.status);
}
function canCurrentUserEditOwnLeaveRequest(request){
  if(!request || !currentUser || !isLeaveRequestPendingForFilerEdit(request))return false;
  const linkedEmployee=getLinkedEmployeeRecordForAccount(currentUser);
  if(!linkedEmployee || String(linkedEmployee.no)!==String(request.employeeNo||""))return false;
  const submittedBy=String(request.submittedBy||"").toLowerCase();
  const currentUsername=String(currentUser.username||"").toLowerCase();
  if(currentUser.role==="Employee"){
    return request.filedByRole==="Employee" && (!submittedBy || submittedBy===currentUsername);
  }
  if(currentUser.role==="Supervisor"){
    const direct=Boolean(request.directToRequestApprover || request.approvalRoute==="Supervisor Direct to Request Approver");
    return direct && request.filedByRole==="Supervisor" && (!submittedBy || submittedBy===currentUsername);
  }
  return false;
}
function clearPendingLeaveWorkflowNotifications(leaveRequestId){
  if(!leaveRequestId)return;
  saveSupervisorEmployeeNotifications(getSupervisorEmployeeNotifications().filter(n=>!(n.leaveRequestId===leaveRequestId && n.type==="leave-pending-supervisor")));
  saveHRNotifications(getHRNotifications().filter(n=>!(n.leaveRequestId===leaveRequestId && n.type==="leave-pending-hr")));
  saveManagerNotifications(getManagerNotifications().filter(n=>!(n.leaveRequestId===leaveRequestId && n.type==="leave-pending-gm")));
  saveEmployeeLeaveNotifications(getEmployeeLeaveNotifications().filter(n=>!(n.leaveRequestId===leaveRequestId && ["supervisor-approved","hr-approved"].includes(n.type))));
}
function leaveRequestIncludesDate(request,dateKey){
  if(!request || !dateKey || !request.startDate || !request.endDate)return false;
  return dateKey>=request.startDate && dateKey<=request.endDate;
}
function leaveDateHasArrived(dateKey){
  if(!dateKey)return false;
  return dateKey<=toDateKey(new Date());
}
function getApprovedLeaveForEmployeeDate(employeeNo,dateKey){
  if(!employeeNo || !dateKey || !leaveDateHasArrived(dateKey))return null;
  const targetEmployee=String(employeeNo).trim();
  return getLeaveRequests().find(r=>
    String(r.employeeNo||"").trim()===targetEmployee &&
    String(r.status||"").trim().toLowerCase()==="approved" &&
    leaveRequestIncludesDate(r,dateKey)
  ) || null;
}
function eachDateKey(startKey,endKey){
  const out=[];
  if(!startKey || !endKey || startKey>endKey)return out;
  let cursor=parseLocalDate(startKey);
  const end=parseLocalDate(endKey);
  let guard=0;
  while(cursor<=end && guard<370){
    out.push(toDateKey(cursor));
    cursor=new Date(cursor.getFullYear(),cursor.getMonth(),cursor.getDate()+1);
    guard++;
  }
  return out;
}
function getEmployeeByNo(employeeNo){
  return allKnownEmployees().find(emp=>emp.no===employeeNo) || null;
}
function syncApprovedLeaveAttendanceRecords(leaveRequest){
  if(!leaveRequest || leaveRequest.status!=="Approved")return 0;
  const todayKey=toDateKey(new Date());
  const rows=getRequests();
  const employee=getEmployeeByNo(leaveRequest.employeeNo) || {};
  const department=leaveRequest.department || employee.department || "";
  const configured=(getDepartmentEmployees(department)||[]).find(emp=>emp.no===leaveRequest.employeeNo) || employee;
  const dates=eachDateKey(leaveRequest.startDate,leaveRequest.endDate).filter(dateKey=>dateKey<=todayKey);
  let added=0;
  dates.forEach(dateKey=>{
    const existing=rows.find(r=>r.employeeNo===leaveRequest.employeeNo && r.otDate===dateKey && ["Pending","Approved"].includes(r.status));
    if(existing)return;
    rows.push({
      id:uid(),
      sourceLeaveRequestId:leaveRequest.id,
      employeeNo:leaveRequest.employeeNo,
      employeeName:leaveRequest.employeeName,
      position:leaveRequest.position || configured.position || "",
      schedule:configured.schedule || employee.schedule || "Unassigned",
      scheduleStart:"",
      scheduleEnd:"",
      scheduleTime:"",
      attendanceStatus:"Leave",
      attendanceType:leaveRequest.leaveType,
      leaveType:leaveRequest.leaveType,
      leavePayType:leaveRequest.payType || "Without Pay",
      leaveCreditCharged:Number(leaveRequest.creditChargedDays||0),
      absentType:"",
      normalOtStart:"",
      normalOtEnd:"",
      straightDuty:false,
      straightDutyScheduleStart:"",
      straightDutyScheduleEnd:"",
      straightDutyOtStart:"",
      straightDutyOtEnd:"",
      straightDutyStart:"",
      straightDutyEnd:"",
      employeeDayOff:configured.dayOff || "",
      department,
      supervisorName:leaveRequest.supervisorName || "",
      otDate:dateKey,
      otType:"",
      startTime:"",
      endTime:"",
      totalHours:"0.00",
      workArea:configured.location || "",
      reason:leaveRequest.reason || `${leaveRequest.leaveType} approved leave.`,
      status:"Approved",
      submittedBy:leaveRequest.submittedBy || "",
      createdAt:leaveRequest.createdAt || new Date().toISOString(),
      reviewedBy:leaveRequest.gmReviewedBy || "Request Approver",
      reviewedAt:leaveRequest.gmReviewedAt || new Date().toISOString(),
      managerRemarks:leaveRequest.gmRemarks || "Approved leave request."
    });
    added++;
  });
  if(added)saveRequests(rows);
  return added;
}
function syncAllApprovedLeavesDue(){
  let added=0;
  getLeaveRequests().filter(r=>r.status==="Approved").forEach(r=>{added+=syncApprovedLeaveAttendanceRecords(r);syncApprovedLeaveToDailyAttendance(r)});
  return added;
}
function leaveStatusBadge(status){
  const map={
    "Pending Supervisor":["pending","Pending Supervisor"],
    "Pending HR":["pending","Pending HR"],
    "Pending Request Approver":["warning","Pending Request Approver"],
    "Approved":["approved","Approved"],
    "Rejected by Supervisor":["rejected","Rejected by Supervisor"],
    "Rejected by HR":["rejected","Rejected by HR"],
    "Rejected by Request Approver":["rejected","Rejected by Request Approver"]
  };
  const [cls,label]=map[status]||["pending",status||"Pending"];
  return `<span class="badge ${cls}">${escapeHtml(label)}</span>`;
}
function addSupervisorLeaveSubmissionNotification(request){
  if(!request?.department)return;
  const notifications=getSupervisorEmployeeNotifications();
  notifications.unshift({
    id:`SUP-LV-NEW-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type:"leave-pending-supervisor",
    title:"Employee leave request for approval",
    message:`${request.employeeName} • ${request.leaveType} • ${request.payType||"Without Pay"}`,
    details:`${formatDate(request.startDate)}${request.endDate!==request.startDate?` – ${formatDate(request.endDate)}`:""} • ${request.reason||"No reason"}`,
    leaveRequestId:request.id,
    employeeNo:request.employeeNo,
    department:request.department,
    targetPage:"leave-requests",
    createdAt:new Date().toISOString(),
    read:false,
    resolved:false
  });
  saveSupervisorEmployeeNotifications(notifications.slice(0,160));
}
function resolveSupervisorLeaveSubmissionNotification(leaveRequestId){
  if(!leaveRequestId)return;
  const notifications=getSupervisorEmployeeNotifications().map(n=>
    n.leaveRequestId===leaveRequestId && n.type==="leave-pending-supervisor"
      ? {...n,read:true,resolved:true,resolvedAt:new Date().toISOString()}
      : n
  );
  saveSupervisorEmployeeNotifications(notifications);
  updateSupervisorEmployeeNotificationUI();
}

function addHRLeaveNotification(request){
  if(!request)return;
  const notifications=getHRNotifications();
  notifications.unshift({
    id:`HR-LV-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type:"leave-pending-hr",
    title:"Supervisor-approved leave for HR review",
    message:`${request.employeeName} • ${request.department} • ${request.leaveType} • ${request.payType||"Without Pay"}`,
    details:`${formatDate(request.startDate)}${request.endDate!==request.startDate?` – ${formatDate(request.endDate)}`:""}${isPaidLeaveRequest(request)?` • ${request.requestedCreditDays??leaveRequestDayCount(request.startDate,request.endDate)} credit day(s)`:""}`,
    leaveRequestId:request.id,
    targetPage:"leave-approvals",
    createdAt:new Date().toISOString(),
    read:false
  });
  saveHRNotifications(notifications.slice(0,100));
}
function addManagerLeaveNotification(request){
  if(!request)return;
  const notifications=getManagerNotifications();
  notifications.unshift({
    id:`GM-LV-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type:"leave-pending-gm",
    title:"Leave request ready for final approval",
    message:`${request.employeeName} • ${request.department} • ${request.leaveType} • ${request.payType||"Without Pay"}`,
    details:`${request.directToRequestApprover?"Supervisor self-filed • Direct to Request Approver":"HR approved"} • ${formatDate(request.startDate)}${request.endDate!==request.startDate?` – ${formatDate(request.endDate)}`:""}${isPaidLeaveRequest(request)?` • Deduct ${request.requestedCreditDays??leaveRequestDayCount(request.startDate,request.endDate)} credit day(s) after final approval`:""}`,
    leaveRequestId:request.id,
    targetPage:"dashboard",
    createdAt:new Date().toISOString(),
    read:false
  });
  saveManagerNotifications(notifications.slice(0,100));
}
function addSupervisorLeaveDecisionNotification(request,decision){
  if(!request)return;
  const notifications=getSupervisorEmployeeNotifications();
  const approved=decision==="approved";
  const creditSummary=approved && isPaidLeaveRequest(request) ? getEmployeeLeaveCreditSummary(request.employeeNo) : null;
  const remainingCredit=creditSummary ? (request.leaveType==="VL"?creditSummary.remainingVL:creditSummary.remainingSL) : null;
  notifications.unshift({
    id:`SUP-LV-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type:approved?"leave-final-approved":"leave-final-rejected",
    title:approved?"Leave request fully approved":"Leave request rejected",
    message:`${request.employeeName} • ${request.leaveType} • ${formatDate(request.startDate)}${request.endDate!==request.startDate?` – ${formatDate(request.endDate)}`:""}`,
    details:approved ? `${request.directToRequestApprover?"Supervisor self-filed leave was approved by the Request Approver.":"Supervisor, HR, and Request Approver approved the leave."}${isPaidLeaveRequest(request)?` ${Number(request.creditChargedDays||0).toFixed(2)} ${request.leaveType} credit(s) deducted; remaining balance ${Number(remainingCredit||0).toFixed(2)}.`:""} It will automatically appear on the employee row when the leave date arrives.` : (request.gmRemarks || request.hrRemarks || "Leave request was rejected. No leave credit was deducted."),
    leaveRequestId:request.id,
    department:request.department,
    targetPage:"leave-requests",
    createdAt:new Date().toISOString(),
    read:false,
    resolved:false
  });
  saveSupervisorEmployeeNotifications(notifications.slice(0,140));
}

function getManagerNotifications(){
  try{return JSON.parse(localStorage.getItem(MANAGER_NOTIFICATION_KEY)) || []}
  catch{return []}
}
function saveManagerNotifications(data){
  cloudSetItem(MANAGER_NOTIFICATION_KEY, JSON.stringify(data));
}
function addSupervisorOTRevisionNotification(request,decision){
  if(!request)return;
  const notifications=getSupervisorEmployeeNotifications();
  const approved=decision==="approved";
  notifications.unshift({
    id:`SUP-OTR-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type:approved?"ot-revision-approved":"ot-revision-rejected",
    title:approved?"Additional OT approved":"Additional OT rejected",
    message:`${request.employeeName} • ${formatDate(request.otDate)} • +${Number(request.additionalHours||0).toFixed(2)} hr`,
    details:approved ? `Request Approver re-approved the additional OT. New approved total: ${Number(request.proposedTotalHours||0).toFixed(2)} hrs.` : (request.managerRemarks || "The additional OT request was rejected."),
    requestId:request.id,
    parentRequestId:request.parentRequestId,
    department:request.department,
    targetPage:"my-requests",
    createdAt:new Date().toISOString(),
    read:false,
    resolved:false
  });
  saveSupervisorEmployeeNotifications(notifications.slice(0,160));
}

function addSupervisorOTApprovalNotification(request){
  if(!request?.employeeNo || !request?.department)return;
  const notifications=getSupervisorEmployeeNotifications();
  const duplicate=notifications.some(n=>n.type==="ot-final-approved" && n.requestId===request.id);
  if(duplicate)return;
  notifications.unshift({
    id:`SUP-OTA-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type:"ot-final-approved",
    title:"OT approved by Request Approver",
    message:`${request.employeeName || "Employee"} • ${formatDate(request.otDate)} • ${Number(request.totalHours||0).toFixed(2)} hrs`,
    details:`${request.otType || "Overtime"}${request.managerRemarks?` • ${request.managerRemarks}`:""} • Sent to HR for cutoff/payroll.`,
    requestId:request.id,
    employeeNo:request.employeeNo,
    employeeName:request.employeeName,
    department:request.department,
    targetPage:"new-request",
    createdAt:request.reviewedAt || new Date().toISOString(),
    read:false,
    resolved:false
  });
  saveSupervisorEmployeeNotifications(notifications.slice(0,160));
  updateSupervisorEmployeeNotificationUI();
}
function addEmployeeOTApprovalNotification(request){
  if(!request?.employeeNo)return;
  const notifications=getEmployeeLeaveNotifications();
  const duplicate=notifications.some(n=>n.type==="ot-final-approved" && n.requestId===request.id && String(n.employeeNo||"")===String(request.employeeNo||""));
  if(duplicate)return;
  notifications.unshift({
    id:`EMP-OTA-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type:"ot-final-approved",
    title:"Your OT has been approved",
    message:`${formatDate(request.otDate)} • ${Number(request.totalHours||0).toFixed(2)} hrs • ${request.otType || "Overtime"}`,
    details:`Approved by Request Approver.${request.managerRemarks?` ${request.managerRemarks}`:""} The approved OT has been sent to HR.`,
    requestId:request.id,
    employeeNo:request.employeeNo,
    targetPage:"my-ot",
    createdAt:request.reviewedAt || new Date().toISOString(),
    read:false
  });
  saveEmployeeLeaveNotifications(notifications.slice(0,250));
  updateEmployeeLeaveNotificationUI();
}

function addManagerNotification(entries){
  if(!entries?.length)return;
  const notifications=getManagerNotifications();
  const departments=[...new Set(entries.map(r=>r.department).filter(Boolean))];
  const locations=[...new Set(entries.map(r=>r.workArea).filter(Boolean))];
  const count=entries.length;
  const amendmentCount=entries.filter(isOtAmendment).length;
  const singleAmendment=count===1 && amendmentCount===1 ? entries[0] : null;
  notifications.unshift({
    id:`NTF-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type:singleAmendment?"ot-reapproval":"new-approval",
    title:singleAmendment ? "Additional OT needs re-approval" : (count===1 ? "New OT request for approval" : `${count} new OT requests for approval`),
    message:singleAmendment ? `${singleAmendment.employeeName} • +${Number(singleAmendment.additionalHours||0).toFixed(2)} hr additional OT` : `${entries.every(r=>r.filedDirectByEmployee)?"Employee direct filing":"Supervisor"} • ${departments.join(", ") || "All Departments"}${locations.length ? ` • ${locations.join(" & ")}` : ""}`,
    details:singleAmendment ? `Previously approved ${Number(singleAmendment.baseApprovedHours||0).toFixed(2)} hrs → revised ${Number(singleAmendment.proposedTotalHours||0).toFixed(2)} hrs` : "",
    requestIds:entries.map(r=>r.id),
    createdAt:new Date().toISOString(),
    read:false
  });
  saveManagerNotifications(notifications.slice(0,50));
}
function unreadManagerNotificationCount(){
  return getManagerNotifications().filter(n=>!n.read).length;
}
function markManagerNotificationRead(id){
  const notifications=getManagerNotifications();
  const item=notifications.find(n=>n.id===id);
  if(item)item.read=true;
  saveManagerNotifications(notifications);
  updateManagerNotificationUI();
}
function markAllManagerNotificationsRead(){
  const notifications=getManagerNotifications().map(n=>({...n,read:true}));
  saveManagerNotifications(notifications);
  updateManagerNotificationUI();
}
function getHRNotifications(){
  try{return JSON.parse(localStorage.getItem(HR_NOTIFICATION_KEY)) || []}
  catch{return []}
}
function saveHRNotifications(data){
  cloudSetItem(HR_NOTIFICATION_KEY, JSON.stringify(data));
}
function addHRDecisionNotification(request){
  if(!request || request.status!=="Approved")return;
  const notifications=getHRNotifications();
  const duplicate=notifications.some(n=>n.type==="approved" && n.requestId===request.id);
  if(duplicate)return;
  notifications.unshift({
    id:`HRNTF-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    type:"approved",
    title:"Approved OT received from Request Approver",
    message:`${request.employeeName || "Employee"} • ${request.department || "Department"}${request.workArea ? ` • ${request.workArea}` : ""}`,
    details:`${formatDate(request.otDate)} • ${request.otType || "Overtime"} • ${Number(request.totalHours||0).toFixed(2)} hrs${request.managerRemarks?` • ${request.managerRemarks}`:""}`,
    requestId:request.id,
    targetPage:"approved",
    createdAt:request.reviewedAt || new Date().toISOString(),
    read:false
  });
  saveHRNotifications(notifications.slice(0,80));
  updateHRNotificationUI();
}
function unreadHRNotificationCount(){
  return getHRNotifications().filter(n=>!n.read).length;
}
function markHRNotificationRead(id){
  const notifications=getHRNotifications();
  const item=notifications.find(n=>n.id===id);
  if(item)item.read=true;
  saveHRNotifications(notifications);
  updateHRNotificationUI();
}
function markAllHRNotificationsRead(){
  saveHRNotifications(getHRNotifications().map(n=>({...n,read:true})));
  updateHRNotificationUI();
}
function updateHRNotificationUI(){
  const wrap=document.getElementById("hrNotificationWrap");
  if(!wrap)return;
  const isHR=currentUser?.role==="HR";
  wrap.classList.toggle("hidden",!isHR);
  if(!isHR)return;

  const notifications=getHRNotifications();
  const unread=notifications.filter(n=>!n.read).length;
  const badge=document.getElementById("hrNotificationBadge");
  if(badge){
    badge.textContent=unread>99?"99+":String(unread);
    badge.classList.toggle("hidden",unread===0);
  }
  const list=document.getElementById("hrNotificationList");
  if(list){
    list.innerHTML=notifications.length ? notifications.slice(0,15).map(n=>{
      const isLeave=n.type==="leave-pending-hr";
      const icon=isLeave?"L":n.type==="approved"?"✓":n.type==="account-created"?"A":"×";
      return `
      <button class="notification-item hr-decision ${n.type} ${n.read?"":"unread"}" type="button" data-hr-notification-id="${escapeHtml(n.id)}" data-target-page="${escapeHtml(n.targetPage || (n.type==="approved"?"approved":"dashboard"))}">
        <span class="notification-item-icon">${icon}</span>
        <span class="notification-item-copy">
          <strong>${escapeHtml(n.title)}</strong>
          <span>${escapeHtml(n.message)}</span>
          ${n.details?`<em>${escapeHtml(n.details)}</em>`:""}
          <small>${relativeNotificationTime(n.createdAt)}</small>
        </span>
        ${n.read ? "" : `<span class="notification-unread-dot"></span>`}
      </button>`;
    }).join("") : `<div class="notification-empty"><strong>No HR notifications</strong><span>Leave requests and Request Approver OT decisions will appear here.</span></div>`;
    list.querySelectorAll(".notification-item").forEach(btn=>{
      btn.addEventListener("click",()=>{
        markHRNotificationRead(btn.dataset.hrNotificationId);
        document.getElementById("hrNotificationPanel")?.classList.add("hidden");
        document.getElementById("hrNotificationBtn")?.setAttribute("aria-expanded","false");
        navigateTo(btn.dataset.targetPage || "dashboard");
      });
    });
  }
}
function bindHRNotificationControls(){
  const btn=document.getElementById("hrNotificationBtn");
  const panel=document.getElementById("hrNotificationPanel");
  if(!btn || !panel || btn.dataset.bound)return;
  btn.dataset.bound="1";
  btn.addEventListener("click",e=>{
    e.stopPropagation();
    const willOpen=panel.classList.contains("hidden");
    panel.classList.toggle("hidden",!willOpen);
    btn.setAttribute("aria-expanded",String(willOpen));
    if(willOpen)updateHRNotificationUI();
  });
  document.getElementById("markAllHRNotificationsRead")?.addEventListener("click",e=>{
    e.stopPropagation();
    markAllHRNotificationsRead();
  });
  document.getElementById("openApprovedFromNotifications")?.addEventListener("click",()=>{
    panel.classList.add("hidden");
    btn.setAttribute("aria-expanded","false");
    navigateTo("approved");
  });
  document.addEventListener("click",e=>{
    if(panel.classList.contains("hidden"))return;
    if(!document.getElementById("hrNotificationWrap")?.contains(e.target)){
      panel.classList.add("hidden");
      btn.setAttribute("aria-expanded","false");
    }
  });
}

function updateEmployeeLeaveNotificationUI(){
  const wrap=document.getElementById("employeeNotificationWrap");
  if(!wrap)return;
  const isEmployee=currentUser?.role==="Employee";
  wrap.classList.toggle("hidden",!isEmployee);
  if(!isEmployee)return;
  const employeeNo=currentUser.employeeNo;
  const notifications=employeeLeaveNotificationsFor(employeeNo);
  const unread=notifications.filter(n=>!n.read).length;
  const badge=document.getElementById("employeeNotificationBadge");
  if(badge){
    badge.textContent=unread>99?"99+":String(unread);
    badge.classList.toggle("hidden",unread===0);
  }
  const list=document.getElementById("employeeNotificationList");
  if(list){
    list.innerHTML=notifications.length ? notifications.slice(0,15).map(n=>{
      const approved=String(n.type||"").includes("approved");
      const rejected=String(n.type||"").includes("rejected");
      const icon=rejected?"×":approved?"✓":"L";
      return `
      <button class="notification-item employee-leave-alert ${n.read?"":"unread"}" type="button" data-employee-notification-id="${escapeHtml(n.id)}" data-target-page="${escapeHtml(n.targetPage||"my-leave")}">
        <span class="notification-item-icon">${icon}</span>
        <span class="notification-item-copy">
          <strong>${escapeHtml(n.title)}</strong>
          <span>${escapeHtml(n.message)}</span>
          ${n.details?`<em>${escapeHtml(n.details)}</em>`:""}
          <small>${relativeNotificationTime(n.createdAt)}</small>
        </span>
        ${n.read?"":`<span class="notification-unread-dot"></span>`}
      </button>`;
    }).join("") : `<div class="notification-empty"><strong>No notifications</strong><span>Leave and OT updates from your Supervisor, HR, and Request Approver will appear here.</span></div>`;
    list.querySelectorAll(".notification-item").forEach(btn=>{
      btn.addEventListener("click",()=>{
        markEmployeeLeaveNotificationRead(btn.dataset.employeeNotificationId);
        document.getElementById("employeeNotificationPanel")?.classList.add("hidden");
        document.getElementById("employeeNotificationBtn")?.setAttribute("aria-expanded","false");
        navigateTo(btn.dataset.targetPage||"my-leave");
      });
    });
  }
}
function bindEmployeeLeaveNotificationControls(){
  const btn=document.getElementById("employeeNotificationBtn");
  const panel=document.getElementById("employeeNotificationPanel");
  if(!btn || !panel || btn.dataset.bound)return;
  btn.dataset.bound="1";
  btn.addEventListener("click",e=>{
    e.stopPropagation();
    const willOpen=panel.classList.contains("hidden");
    panel.classList.toggle("hidden",!willOpen);
    btn.setAttribute("aria-expanded",String(willOpen));
    if(willOpen)updateEmployeeLeaveNotificationUI();
  });
  document.getElementById("markAllEmployeeNotificationsRead")?.addEventListener("click",e=>{
    e.stopPropagation();
    markAllEmployeeLeaveNotificationsRead();
    buildNavigation();
  });
  document.getElementById("openMyLeaveFromNotifications")?.addEventListener("click",()=>{
    panel.classList.add("hidden");
    btn.setAttribute("aria-expanded","false");
    navigateTo("my-leave");
  });
  document.addEventListener("click",e=>{
    if(panel.classList.contains("hidden"))return;
    if(!document.getElementById("employeeNotificationWrap")?.contains(e.target)){
      panel.classList.add("hidden");
      btn.setAttribute("aria-expanded","false");
    }
  });
}

function updateSupervisorEmployeeNotificationUI(){
  const wrap=document.getElementById("supervisorNotificationWrap");
  if(!wrap)return;
  const isSupervisor=currentUser?.role==="Supervisor";
  wrap.classList.toggle("hidden",!isSupervisor);
  if(!isSupervisor)return;
  const notifications=supervisorNotificationsForDepartment(currentUser.department);
  const unread=notifications.filter(n=>!n.read).length;
  const badge=document.getElementById("supervisorNotificationBadge");
  if(badge){
    badge.textContent=unread>99?"99+":String(unread);
    badge.classList.toggle("hidden",unread===0);
  }
  const list=document.getElementById("supervisorNotificationList");
  if(list){
    list.innerHTML=notifications.length ? notifications.slice(0,15).map(n=>{
      const isFinalLeave=String(n.type||"").startsWith("leave-final-");
      const isPendingLeave=n.type==="leave-pending-supervisor";
      const icon=n.type==="ot-final-approved"?"✓":isPendingLeave?"L":isFinalLeave?(n.type==="leave-final-approved"?"✓":"×"):"◷";
      return `
      <button class="notification-item supervisor-employee-alert ${n.read?"":"unread"}" type="button" data-supervisor-notification-id="${escapeHtml(n.id)}" data-target-page="${escapeHtml(n.targetPage || "employee-schedule")}">
        <span class="notification-item-icon">${icon}</span>
        <span class="notification-item-copy">
          <strong>${escapeHtml(n.title)}</strong>
          <span>${escapeHtml(n.message)}</span>
          ${n.details?`<em>${escapeHtml(n.details)}</em>`:""}
          <small>${relativeNotificationTime(n.createdAt)}</small>
        </span>
        ${n.read?"":`<span class="notification-unread-dot"></span>`}
      </button>`;
    }).join("") : `<div class="notification-empty"><strong>No supervisor notifications</strong><span>Employee leave requests, OT approval decisions, employee setup alerts, and other workflow updates will appear here.</span></div>`;
    list.querySelectorAll(".notification-item").forEach(btn=>{
      btn.addEventListener("click",()=>{
        markSupervisorEmployeeNotificationRead(btn.dataset.supervisorNotificationId);
        document.getElementById("supervisorNotificationPanel")?.classList.add("hidden");
        document.getElementById("supervisorNotificationBtn")?.setAttribute("aria-expanded","false");
        navigateTo(btn.dataset.targetPage || "employee-schedule");
      });
    });
  }
}
function bindSupervisorEmployeeNotificationControls(){
  const btn=document.getElementById("supervisorNotificationBtn");
  const panel=document.getElementById("supervisorNotificationPanel");
  if(!btn || !panel || btn.dataset.bound)return;
  btn.dataset.bound="1";
  btn.addEventListener("click",e=>{
    e.stopPropagation();
    const willOpen=panel.classList.contains("hidden");
    panel.classList.toggle("hidden",!willOpen);
    btn.setAttribute("aria-expanded",String(willOpen));
    if(willOpen)updateSupervisorEmployeeNotificationUI();
  });
  document.getElementById("markAllSupervisorNotificationsRead")?.addEventListener("click",e=>{
    e.stopPropagation();
    markAllSupervisorEmployeeNotificationsRead();
  });
  document.getElementById("openEmployeeScheduleFromNotifications")?.addEventListener("click",()=>{
    panel.classList.add("hidden");
    btn.setAttribute("aria-expanded","false");
    navigateTo("employee-schedule");
  });
  document.addEventListener("click",e=>{
    if(panel.classList.contains("hidden"))return;
    if(!document.getElementById("supervisorNotificationWrap")?.contains(e.target)){
      panel.classList.add("hidden");
      btn.setAttribute("aria-expanded","false");
    }
  });
}

function relativeNotificationTime(value){
  const ms=Date.now()-new Date(value).getTime();
  if(!Number.isFinite(ms) || ms<0)return "Just now";
  const mins=Math.floor(ms/60000);
  if(mins<1)return "Just now";
  if(mins<60)return `${mins}m ago`;
  const hrs=Math.floor(mins/60);
  if(hrs<24)return `${hrs}h ago`;
  const days=Math.floor(hrs/24);
  return days<7 ? `${days}d ago` : formatDateTime(value);
}
function updateManagerNotificationUI(){
  const wrap=document.getElementById("managerNotificationWrap");
  if(!wrap)return;
  const isManager=currentUser?.role==="Request Approver";
  wrap.classList.toggle("hidden",!isManager);
  if(!isManager)return;

  const notifications=getManagerNotifications();
  const unread=notifications.filter(n=>!n.read).length;
  const badge=document.getElementById("managerNotificationBadge");
  if(badge){
    badge.textContent=unread>99?"99+":String(unread);
    badge.classList.toggle("hidden",unread===0);
  }
  const list=document.getElementById("managerNotificationList");
  if(list){
    list.innerHTML=notifications.length ? notifications.slice(0,12).map(n=>{
      const isLeave=n.type==="leave-pending-gm";
      return `
      <button class="notification-item ${n.read?"":"unread"}" type="button" data-notification-id="${escapeHtml(n.id)}" data-target-page="${escapeHtml(["approvals","leave-approvals"].includes(n.targetPage) ? "dashboard" : (n.targetPage || "dashboard"))}">
        <span class="notification-item-icon">${isLeave?"L":"✓"}</span>
        <span class="notification-item-copy">
          <strong>${escapeHtml(n.title)}</strong>
          <span>${escapeHtml(n.message)}</span>
          ${n.details?`<em>${escapeHtml(n.details)}</em>`:""}
          <small>${relativeNotificationTime(n.createdAt)}</small>
        </span>
        ${n.read ? "" : `<span class="notification-unread-dot"></span>`}
      </button>`;
    }).join("") : `<div class="notification-empty"><strong>No new notifications</strong><span>New OT submissions and HR-approved leave requests will appear here.</span></div>`;
    list.querySelectorAll(".notification-item").forEach(btn=>{
      btn.addEventListener("click",()=>{
        markManagerNotificationRead(btn.dataset.notificationId);
        document.getElementById("managerNotificationPanel")?.classList.add("hidden");
        document.getElementById("managerNotificationBtn")?.setAttribute("aria-expanded","false");
        navigateTo(btn.dataset.targetPage || "dashboard");
      });
    });
  }
  buildNavigation();
}
function bindManagerNotificationControls(){
  const btn=document.getElementById("managerNotificationBtn");
  const panel=document.getElementById("managerNotificationPanel");
  if(!btn || !panel || btn.dataset.bound)return;
  btn.dataset.bound="1";
  btn.addEventListener("click",e=>{
    e.stopPropagation();
    const willOpen=panel.classList.contains("hidden");
    panel.classList.toggle("hidden",!willOpen);
    btn.setAttribute("aria-expanded",String(willOpen));
    if(willOpen)updateManagerNotificationUI();
  });
  document.getElementById("markAllNotificationsRead")?.addEventListener("click",e=>{
    e.stopPropagation();
    markAllManagerNotificationsRead();
  });
  document.getElementById("openAllApprovals")?.addEventListener("click",()=>{
    panel.classList.add("hidden");
    btn.setAttribute("aria-expanded","false");
    navigateTo("dashboard");
  });
  document.addEventListener("click",e=>{
    if(panel.classList.contains("hidden"))return;
    if(!document.getElementById("managerNotificationWrap")?.contains(e.target)){
      panel.classList.add("hidden");
      btn.setAttribute("aria-expanded","false");
    }
  });
}
function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(()=>toast.classList.remove("show"),2300);
}
function initials(name){
  return String(name || "?").split(/\s+/).slice(0,2).map(x=>x[0]).join("").toUpperCase();
}
function formatDate(dateStr){
  if(!dateStr)return "—";
  return new Date(dateStr+"T00:00:00").toLocaleDateString("en-PH",{month:"short",day:"2-digit",year:"numeric"});
}
function formatDateTime(value){
  if(!value)return "—";
  return new Date(value).toLocaleString("en-PH",{month:"short",day:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});
}
function isValid24HourTime(value){
  return /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(String(value||""));
}
function normalize24HourTime(value){
  const raw=String(value||"").trim();
  if(isValid24HourTime(raw))return raw;
  const digits=raw.replace(/\D/g,"").slice(0,4);
  if(digits.length===4){
    const candidate=`${digits.slice(0,2)}:${digits.slice(2)}`;
    if(isValid24HourTime(candidate))return candidate;
  }
  return raw;
}
function formatClockTime24(value){
  const normalized=normalize24HourTime(value);
  return isValid24HourTime(normalized) ? normalized : String(value||"—");
}
function excelTimeFraction(value){
  const normalized=normalize24HourTime(value);
  if(!isValid24HourTime(normalized))return "";
  const [hours,minutes]=normalized.split(":").map(Number);
  return (hours*60+minutes)/1440;
}
function statusBadge(status){return `<span class="badge ${status.toLowerCase()}">${status}</span>`}
function departmentBadge(dep){return `<span class="department-badge">${escapeHtml(dep)}</span>`}
function uid(){
  const ymd = new Date().toISOString().slice(0,10).replaceAll("-","");
  return `OT-${ymd}-${Math.floor(1000+Math.random()*9000)}`;
}
function calcHours(start,end){
  if(!start || !end)return "";
  const [sh,sm]=start.split(":").map(Number), [eh,em]=end.split(":").map(Number);
  let a=sh*60+sm,b=eh*60+em;
  if(b<a)b+=1440;
  return ((b-a)/60).toFixed(2);
}
function currentMonthHours(rows){
  const now = new Date();
  return rows.filter(r=>{
    const d=new Date(r.otDate+"T00:00:00");
    return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
  }).reduce((sum,r)=>sum+Number(r.totalHours||0),0);
}
function getPayrollCutoff(referenceDate=new Date()){
  const ref=new Date(referenceDate.getFullYear(),referenceDate.getMonth(),referenceDate.getDate());
  const day=ref.getDate();
  let start,end;
  if(day>=6 && day<=20){
    start=new Date(ref.getFullYear(),ref.getMonth(),6);
    end=new Date(ref.getFullYear(),ref.getMonth(),20);
  }else if(day>=21){
    start=new Date(ref.getFullYear(),ref.getMonth(),21);
    end=new Date(ref.getFullYear(),ref.getMonth()+1,5);
  }else{
    start=new Date(ref.getFullYear(),ref.getMonth()-1,21);
    end=new Date(ref.getFullYear(),ref.getMonth(),5);
  }
  const sameMonth=start.getMonth()===end.getMonth() && start.getFullYear()===end.getFullYear();
  const startText=start.toLocaleDateString("en-PH",sameMonth?{month:"short",day:"numeric"}:{month:"short",day:"numeric"});
  const endText=end.toLocaleDateString("en-PH",{month:sameMonth?undefined:"short",day:"numeric",year:"numeric"});
  const label=sameMonth
    ? `${start.toLocaleDateString("en-PH",{month:"short"})} ${start.getDate()}–${end.getDate()}, ${end.getFullYear()}`
    : `${startText}–${endText}`;
  return {start,end,startKey:toDateKey(start),endKey:toDateKey(end),key:`${toDateKey(start)}_${toDateKey(end)}`,label};
}
function filterRowsByPayrollCutoff(rows,referenceDate=new Date()){
  const cutoff=getPayrollCutoff(referenceDate);
  return rows.filter(r=>r.otDate && r.otDate>=cutoff.startKey && r.otDate<=cutoff.endKey);
}
function getPreviousPayrollCutoff(referenceDate=new Date()){
  const current=getPayrollCutoff(referenceDate);
  const previousReference=new Date(current.start);
  previousReference.setDate(previousReference.getDate()-1);
  return getPayrollCutoff(previousReference);
}
function filterRowsByCutoffObject(rows,cutoff){
  return rows.filter(r=>r.otDate && r.otDate>=cutoff.startKey && r.otDate<=cutoff.endKey);
}
function payrollCutoffForOTDate(dateStr){
  return getPayrollCutoff(parseLocalDate(dateStr));
}
function buildPayrollCutoffHistory(records){
  const groups=new Map();
  records.forEach(r=>{
    if(!r.otDate)return;
    const cutoff=payrollCutoffForOTDate(r.otDate);
    if(!groups.has(cutoff.key)){
      const days=Math.round((cutoff.end-cutoff.start)/86400000)+1;
      groups.set(cutoff.key,{
        key:cutoff.key,
        label:cutoff.label.replace(/, \d{4}$/,""),
        fullLabel:cutoff.label,
        sortDate:new Date(cutoff.start),
        startKey:cutoff.startKey,
        endKey:cutoff.endKey,
        calendarDays:days,
        totalHours:0,
        people:new Set(),
        personDays:new Set(),
        requestCount:0
      });
    }
    const g=groups.get(cutoff.key);
    const person=reportPersonKey(r);
    g.totalHours+=Number(r.totalHours||0);
    if(person)g.people.add(person);
    if(person)g.personDays.add(`${person}|${r.otDate}`);
    g.requestCount++;
  });
  return [...groups.values()].sort((a,b)=>a.sortDate-b.sortDate).map(g=>({
    key:g.key,label:g.label,fullLabel:g.fullLabel,sortDate:g.sortDate,startKey:g.startKey,endKey:g.endKey,
    calendarDays:g.calendarDays,totalHours:Number(g.totalHours.toFixed(2)),peopleCount:g.people.size,requestCount:g.requestCount,
    averagePerDay:Number((g.totalHours/g.calendarDays).toFixed(2)),
    averagePerPersonPerDay:averageOTHoursPerPersonPerDay(g.totalHours,g.people.size,g.calendarDays)
  }));
}

function getITAccountRequests(){
  try{return JSON.parse(localStorage.getItem(IT_ACCOUNT_REQUEST_KEY)) || []}
  catch{return []}
}
function saveITAccountRequests(rows){cloudSetItem(IT_ACCOUNT_REQUEST_KEY,JSON.stringify(rows||[]));}
function getITManagedAccounts(){
  try{return JSON.parse(localStorage.getItem(IT_MANAGED_ACCOUNTS_KEY)) || []}
  catch{return []}
}
function saveITManagedAccounts(rows){cloudSetItem(IT_MANAGED_ACCOUNTS_KEY,JSON.stringify(rows||[]));}
function accountUsernameExists(username,excludeId=""){
  const key=String(username||"").trim().toLowerCase();
  if(!key)return false;
  if(getSystemAccountDirectory().some(a=>String(a.username||"").toLowerCase()===key && String(a.id||a.uid||"")!==String(excludeId||"")))return true;
  return getITManagedAccounts().some(a=>String(a.username||"").toLowerCase()===key && a.id!==excludeId);
}
function suggestedEmployeeUsername(name){
  const parts=String(name||"").normalize("NFKD").replace(/[^a-zA-Z0-9 ]/g," ").trim().toLowerCase().split(/\s+/).filter(Boolean);
  const base=parts.length>1?`emp_${parts[0]}_${parts[parts.length-1]}`:`emp_${parts[0]||"employee"}`;
  let candidate=base, i=2;
  while(accountUsernameExists(candidate)){candidate=`${base}${i++}`;}
  return candidate;
}
function findITManagedAccountByEmployee(employeeNo){return getITManagedAccounts().find(a=>String(a.employeeNo)===String(employeeNo));}
function getLoginAccount(username){
  const account=getSystemAccountByUsername(username);
  if(!account || account.active===false)return null;
  return {role:account.role||"Employee",moduleAccess:normalizeAdminModuleAccess(account),department:account.department,displayName:account.displayName||account.employeeName,employeeNo:account.employeeNo,position:account.position,employeeDepartment:account.employeeDepartment||account.department,managedAccountId:account.id||account.uid,uid:account.uid};
}
function queueITAccountCreation(employee){
  if(!employee?.no)return;
  if(findITManagedAccountByEmployee(employee.no))return;
  const requests=getITAccountRequests();
  const idx=requests.findIndex(r=>String(r.employeeNo)===String(employee.no) && r.status!=="Created");
  const record={
    id:idx>=0?requests[idx].id:`ITREQ-${Date.now()}-${Math.floor(Math.random()*1000)}`,
    employeeNo:employee.no,
    employeeName:employee.name,
    department:employee.department,
    position:employee.position,
    status:"Pending",
    read:false,
    requestedAt:idx>=0?(requests[idx].requestedAt||new Date().toISOString()):new Date().toISOString(),
    requestedBy:"HR"
  };
  if(idx>=0)requests[idx]={...requests[idx],...record}; else requests.unshift(record);
  saveITAccountRequests(requests.slice(0,250));
  updateITNotificationUI();
}
function updateITRequestEmployeeSnapshot(employeeNo,patch={}){
  const rows=getITAccountRequests().map(r=>String(r.employeeNo)===String(employeeNo)?{...r,...patch}:r);
  saveITAccountRequests(rows);
  const accounts=getITManagedAccounts().map(a=>{
    if(String(a.employeeNo)!==String(employeeNo))return a;
    const employeeDepartment=patch.department||a.employeeDepartment||a.department;
    const accessDepartment=itAccessDepartment(a.role||"Employee",employeeDepartment,a.role==="Supervisor"?a.department:"");
    return {...a,employeeName:patch.employeeName||a.employeeName,displayName:patch.employeeName||a.displayName,employeeDepartment,department:accessDepartment,position:patch.position||a.position};
  });
  saveITManagedAccounts(accounts);
  updateITNotificationUI();
}
function syncITRequestsForCustomEmployees(){
  getCustomEmployees().forEach(emp=>{
    if(!findITManagedAccountByEmployee(emp.no)){
      const exists=getITAccountRequests().some(r=>String(r.employeeNo)===String(emp.no) && r.status!=="Created");
      if(!exists)queueITAccountCreation(emp);
    }
  });
}
function unreadITAccountRequestCount(){return getITAccountRequests().filter(r=>r.status==="Pending" && !r.read).length;}
function pendingITAccountRequestCount(){return getITAccountRequests().filter(r=>r.status==="Pending").length;}
function markITAccountRequestRead(id){saveITAccountRequests(getITAccountRequests().map(r=>r.id===id?{...r,read:true}:r));updateITNotificationUI();}
function markAllITAccountRequestsRead(){saveITAccountRequests(getITAccountRequests().map(r=>({...r,read:true})));updateITNotificationUI();}
function updateITNotificationUI(){
  const wrap=document.getElementById("itNotificationWrap");
  if(!wrap)return;
  const isIT=currentUser?.role==="IT";
  wrap.classList.toggle("hidden",!isIT);
  if(!isIT)return;
  const badge=document.getElementById("itNotificationBadge");
  const list=document.getElementById("itNotificationList");
  const unread=unreadITAccountRequestCount();
  badge.textContent=String(unread);badge.classList.toggle("hidden",!unread);
  const rows=getITAccountRequests().filter(r=>r.status==="Pending").slice(0,8);
  list.innerHTML=rows.length?rows.map(r=>`<button type="button" class="notification-item ${r.read?"":"unread"}" data-it-account-request-id="${escapeHtml(r.id)}"><strong>Account creation • ${escapeHtml(r.employeeName)}</strong><span>${escapeHtml(r.department)} • ${escapeHtml(r.position)}</span><small>${new Date(r.requestedAt).toLocaleString("en-PH")}</small></button>`).join(""):`<div class="notification-empty"><strong>No pending account requests</strong><span>New employees added by HR will appear here.</span></div>`;
  list.querySelectorAll("[data-it-account-request-id]").forEach(btn=>btn.addEventListener("click",()=>{markITAccountRequestRead(btn.dataset.itAccountRequestId);navigateTo("account-requests");document.getElementById("itNotificationPanel")?.classList.add("hidden");}));
}
function bindITNotificationControls(){
  const btn=document.getElementById("itNotificationBtn"), panel=document.getElementById("itNotificationPanel");
  if(btn && !btn.dataset.bound){btn.dataset.bound="1";btn.addEventListener("click",e=>{e.stopPropagation();const open=panel.classList.contains("hidden");panel.classList.toggle("hidden",!open);btn.setAttribute("aria-expanded",String(open));if(open)updateITNotificationUI();});}
  const mark=document.getElementById("markAllITNotificationsRead");
  if(mark && !mark.dataset.bound){mark.dataset.bound="1";mark.addEventListener("click",e=>{e.stopPropagation();markAllITAccountRequestsRead();});}
  const open=document.getElementById("openITAccountRequests");
  if(open && !open.dataset.bound){open.dataset.bound="1";open.addEventListener("click",()=>{navigateTo("account-requests");panel?.classList.add("hidden");});}
}

function statCard(label,value,sub,tone="",targetPage=""){
  const safeTarget=String(targetPage||"").trim();
  if(safeTarget){
    return `<button type="button" class="stat-card ${tone} stat-card-clickable" data-dashboard-page="${escapeHtml(safeTarget)}" aria-label="Open ${escapeHtml(label)}">
      <div class="stat-top"><span class="stat-label">${label}</span><span class="stat-icon">↗</span></div>
      <div class="stat-value">${value}</div>
      <div class="stat-sub">${sub}</div>
    </button>`;
  }
  return `<div class="stat-card ${tone}">
    <div class="stat-top"><span class="stat-label">${label}</span><span class="stat-icon">◆</span></div>
    <div class="stat-value">${value}</div>
    <div class="stat-sub">${sub}</div>
  </div>`;
}
function bindDashboardStatCards(){
  document.querySelectorAll("[data-dashboard-page]").forEach(card=>{
    card.addEventListener("click",()=>navigateTo(card.dataset.dashboardPage));
  });
}
function heroBanner(title,description,metaValue,metaLabel){
  return `<div class="hero-banner">
    <div class="hero-banner-copy">
      <span class="hero-banner-kicker">EASTERN1961 • OVERTIME &amp; LEAVE WORKFLOW</span>
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
    <div class="hero-banner-meta"><strong>${metaValue}</strong><span>${metaLabel}</span></div>
  </div>`;
}

function buildDemoAccounts(){
  const demo=document.getElementById("demoAccounts");
  if(demo)demo.innerHTML="";
}

async function login(username,password){
  unlockChatNotificationAudio();
  const key=String(username||"").trim().toLowerCase();
  try{
    const user=await window.OTFirebase.signIn(key,password);
    await window.OTFirebase.pullAppData();
    currentUser={username:String(user.username||key).toLowerCase(),...user};
    sessionStorage.setItem(SESSION_KEY,JSON.stringify(currentUser));
    currentPage="dashboard";
    if(currentUser.role==="HR")hrDashboardDateKey=toDateKey(new Date());
    showApp();
  }catch(error){
    showToast(error?.message||"Unable to sign in.");
  }
}
async function logout(){
  closeInternalChat();
  activeChatUser=null;
  sessionStorage.removeItem(SESSION_KEY);
  try{await window.OTFirebase?.signOut?.();}catch{}
  currentUser=null;
  appView.classList.remove("employee-mobile-app","approver-mobile-app","supervisor-app");
  appView.classList.add("hidden");
  loginView.classList.remove("hidden");
  loginForm.reset();
}

function showApp(){
  loginView.classList.add("hidden");
  appView.classList.remove("hidden");
  appView.classList.toggle("employee-mobile-app",["Employee","Request Approver"].includes(currentUser.role));
  appView.classList.toggle("approver-mobile-app",currentUser.role==="Request Approver");
  appView.classList.toggle("supervisor-app",currentUser.role==="Supervisor");
  document.getElementById("employeeMobileLogoutBtn")?.classList.toggle("hidden",!["Employee","Request Approver"].includes(currentUser.role));
  const linkedEmployee=currentUser.role==="Employee" ? getCurrentEmployeeRecord() : null;
  document.getElementById("sidebarRole").textContent=currentUser.role;
  document.getElementById("sidebarDepartment").textContent=currentUser.role==="Employee" ? `${linkedEmployee?.department||currentUser.department} • ${currentUser.employeeNo||""}` : currentUser.department;
  document.getElementById("sidebarUsername").textContent="@"+currentUser.username;
  document.getElementById("sideAvatar").textContent=currentUser.role==="HR"?"HR":currentUser.role==="IT"?"IT":currentUser.role==="Employee"?"E":currentUser.role[0];
  document.getElementById("topAvatar").textContent=currentUser.role==="HR"?"HR":currentUser.role==="IT"?"IT":currentUser.role==="Employee"?"E":currentUser.role[0];
  document.getElementById("topRole").textContent=currentUser.displayName;
  document.getElementById("todayText").textContent=new Date().toLocaleDateString("en-PH",{weekday:"short",month:"short",day:"numeric"});
  
  document.getElementById("internalChat")?.classList.toggle("hidden",currentUser.role==="Employee");
  bindManagerNotificationControls();
  bindHRNotificationControls();
  bindITNotificationControls();
  bindEmployeeLeaveNotificationControls();
  bindSupervisorEmployeeNotificationControls();
  // Keep approved leave current, but remove any current/future attendance that
  // older builds wrote directly from employee filing before Supervisor finalization.
  syncAllApprovedLeavesDue();
  syncITRequestsForCustomEmployees();
  syncLegacyAttendanceRecords();
  pruneUnfinalizedCurrentAttendance();
  normalizeStoredHolidayOTTypes();
  buildNavigation();
  renderPage();
  updateManagerNotificationUI();
  updateHRNotificationUI();
  updateITNotificationUI();
  updateEmployeeLeaveNotificationUI();
  updateSupervisorEmployeeNotificationUI();
  bindInternalChat();
  renderInternalChat();
}

function getPhilippineHoliday(dateKey){
  return PH_HOLIDAYS.find(holiday=>holiday.date===dateKey) || null;
}

function getAutomaticOtType(dateKey,isDayOff=false){
  const holiday=getPhilippineHoliday(dateKey);
  if(holiday)return holiday.otType || (holiday.category==="regular" ? "Regular Holiday" : "Special Holiday");
  // Weekly Day Off no longer auto-selects Rest Day OT automatically in legacy bulk entry.
  // A normal workday remains Regular Day.
  return "Regular Day";
}

function normalizeStoredHolidayOTTypes(){
  let submissionsChanged=false;
  const submissions=getEmployeeAttendanceOTSubmissions().map(sub=>{
    const holiday=getPhilippineHoliday(sub.date);
    if(!holiday || !employeeSubmissionHasOT(sub))return sub;
    const correctType=getAutomaticOtType(sub.date,false);
    if(sub.otType===correctType)return sub;
    submissionsChanged=true;
    return {...sub,otType:correctType,holidayName:sub.holidayName||holiday.name,holidayClassification:sub.holidayClassification||holiday.label,updatedAt:new Date().toISOString()};
  });
  if(submissionsChanged)saveEmployeeAttendanceOTSubmissions(submissions);

  let requestsChanged=false;
  const requests=getRequests().map(req=>{
    const dateKey=req.otDate||req.date||"";
    const holiday=getPhilippineHoliday(dateKey);
    if(!holiday || !isActualOTRecord(req))return req;
    const correctType=getAutomaticOtType(dateKey,false);
    if(req.otType===correctType)return req;
    requestsChanged=true;
    return {...req,otType:correctType,isHoliday:true,holidayName:req.holidayName||holiday.name,holidayClassification:req.holidayClassification||holiday.label};
  });
  if(requestsChanged)saveRequests(requests);
}

function getHolidayCategoryClass(category){
  if(category==="regular")return "holiday-regular";
  if(category==="special-non-working")return "holiday-special";
  return "holiday-working";
}

function getPhilippineHolidaysInRange(startKey,endKey){
  if(!startKey || !endKey)return [];
  return PH_HOLIDAYS
    .filter(holiday=>holiday.date>=startKey && holiday.date<=endKey)
    .sort((a,b)=>a.date.localeCompare(b.date));
}

function getCalendarMonthRange(dateKey=toDateKey(new Date())){
  const match=String(dateKey||"").match(/^(\d{4})-(\d{2})-/);
  const fallback=new Date();
  const year=match?Number(match[1]):fallback.getFullYear();
  const month=match?Number(match[2])-1:fallback.getMonth();
  const startKey=`${year}-${String(month+1).padStart(2,"0")}-01`;
  const endDay=new Date(year,month+1,0).getDate();
  const endKey=`${year}-${String(month+1).padStart(2,"0")}-${String(endDay).padStart(2,"0")}`;
  const label=new Date(year,month,1).toLocaleDateString("en-PH",{month:"long",year:"numeric"});
  return {startKey,endKey,label,year,month};
}

function getPhilippineHolidaysInMonth(dateKey=toDateKey(new Date())){
  const monthRange=getCalendarMonthRange(dateKey);
  return getPhilippineHolidaysInRange(monthRange.startKey,monthRange.endKey);
}

function renderHolidayCoverageCard(dateKey=toDateKey(new Date()),title="Philippine Holidays — Whole Month"){
  const monthRange=getCalendarMonthRange(dateKey);
  const holidays=getPhilippineHolidaysInMonth(dateKey);
  return `<div class="card cutoff-holiday-card">
    <div class="card-header">
      <div class="card-title-group"><h3>${escapeHtml(title)}</h3><p>All national holiday dates for ${escapeHtml(monthRange.label)} — not limited by payroll cutoff</p></div>
      <div class="holiday-card-actions">
        <span class="holiday-count-pill">${holidays.length} holiday${holidays.length===1?"":"s"}</span>
        <button class="btn btn-light btn-sm show-ph-holiday-calendar" type="button" data-calendar-date="${escapeHtml(monthRange.startKey)}">▣ Show Calendar</button>
      </div>
    </div>
    <div class="card-body">
      ${holidays.length?`<div class="cutoff-holiday-list">${holidays.map(holiday=>`<div class="cutoff-holiday-item ${getHolidayCategoryClass(holiday.category)}">
        <div><strong>${formatDate(holiday.date)}</strong><span>${escapeHtml(holiday.name)}</span></div>
        <div class="cutoff-holiday-meta"><span class="holiday-list-badge ${getHolidayCategoryClass(holiday.category)}">${escapeHtml(holiday.label)}</span><small>OT Type: ${escapeHtml(holiday.otType)}</small></div>
      </div>`).join("")}</div>`:`<div class="holiday-month-summary no-holiday"><strong>No Philippine national holiday in ${escapeHtml(monthRange.label)}</strong><span>No national holiday date is configured for this calendar month.</span></div>`}
    </div>
  </div>`;
}

function renderDashboardHolidayIndicator(dateKey){
  const holiday=getPhilippineHoliday(dateKey);
  if(!holiday)return "";
  return `<small class="dashboard-holiday-indicator ${getHolidayCategoryClass(holiday.category)}"><strong>${escapeHtml(holiday.name)}</strong> • ${escapeHtml(holiday.label)} • ${escapeHtml(holiday.otType)}</small>`;
}

function openPhilippineHolidayCalendar(dateKey=""){
  const match=String(dateKey||"").match(/^(\d{4})-(\d{2})-/);
  if(match){
    const year=Number(match[1]);
    const month=Number(match[2])-1;
    if(PH_HOLIDAY_YEARS.includes(year))holidayCalendarYear=year;
    if(month>=0 && month<=11)holidayCalendarMonth=month;
  }
  navigateTo("holidays");
}

function renderHolidayCalendar(){
  if(!PH_HOLIDAY_YEARS.length){
    setPage("PH Holiday Calendar","PHILIPPINE HOLIDAYS","No holiday calendar is currently loaded.");
    content.innerHTML=emptyState("No holiday data","Holiday dates have not been configured.");
    return;
  }
  if(!PH_HOLIDAY_YEARS.includes(holidayCalendarYear))holidayCalendarYear=PH_HOLIDAY_YEARS[PH_HOLIDAY_YEARS.length-1];
  holidayCalendarMonth=Math.max(0,Math.min(11,holidayCalendarMonth));
  const year=holidayCalendarYear;
  const month=holidayCalendarMonth;
  const monthName=new Date(year,month,1).toLocaleDateString("en-PH",{month:"long",year:"numeric"});
  const firstDay=new Date(year,month,1).getDay();
  const daysInMonth=new Date(year,month+1,0).getDate();
  const todayKey=toDateKey(new Date());
  const monthHolidays=PH_HOLIDAYS.filter(h=>Number(h.date.slice(0,4))===year && Number(h.date.slice(5,7))===month+1);
  const yearHolidays=PH_HOLIDAYS.filter(h=>Number(h.date.slice(0,4))===year).sort((a,b)=>a.date.localeCompare(b.date));
  const regularCount=yearHolidays.filter(h=>h.category==="regular").length;
  const specialCount=yearHolidays.filter(h=>h.category==="special-non-working").length;
  const workingCount=yearHolidays.filter(h=>h.category==="special-working").length;
  const leading=Array.from({length:firstDay},()=>`<div class="ph-calendar-day calendar-empty-day" aria-hidden="true"></div>`).join("");
  const days=Array.from({length:daysInMonth},(_,index)=>{
    const day=index+1;
    const key=`${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
    const holiday=getPhilippineHoliday(key);
    const categoryClass=holiday?getHolidayCategoryClass(holiday.category):"";
    const isToday=key===todayKey;
    return `<div class="ph-calendar-day ${categoryClass} ${isToday?"calendar-today":""}">
      <div class="calendar-day-top"><span class="calendar-day-number">${day}</span>${isToday?`<span class="calendar-today-badge">Today</span>`:""}</div>
      ${holiday?`<span class="calendar-holiday-type">${escapeHtml(holiday.label)}</span><strong class="calendar-holiday-name">${escapeHtml(holiday.name)}</strong><small>OT Type: ${escapeHtml(holiday.otType)}</small>`:`<small class="calendar-regular-label">Regular Day</small>`}
    </div>`;
  }).join("");
  const trailingCount=(7-((firstDay+daysInMonth)%7))%7;
  const trailing=Array.from({length:trailingCount},()=>`<div class="ph-calendar-day calendar-empty-day" aria-hidden="true"></div>`).join("");

  setPage("Philippine Holiday Calendar","PH NATIONAL HOLIDAYS",`Official national holiday calendar loaded for ${year}.`);
  content.innerHTML=`
    ${heroBanner("Philippine Holiday Calendar","Holiday dates are connected to Supervisor New OT Request. OT Type is automatically classified when the OT date changes.",yearHolidays.length,`official national dates loaded for ${year}`)}
    <div class="stats-grid holiday-stats-grid">
      ${statCard("Regular Holidays",regularCount,"Auto OT Type: Regular Holiday","danger")}
      ${statCard("Special Non-Working",specialCount,"Auto OT Type: Special Holiday","warning")}
      ${statCard("Special Working",workingCount,"Auto OT Type: Special Holiday","primary")}
    </div>
    <div class="card ph-calendar-card">
      <div class="card-header holiday-calendar-header">
        <div class="card-title-group"><h3>${monthName}</h3><p>National holidays • Philippine calendar</p></div>
        <div class="holiday-calendar-controls">
          <button id="holidayPrevMonth" class="btn btn-light btn-sm" type="button" ${month===0?"disabled":""}>‹ Previous</button>
          <select id="holidayMonthSelect" aria-label="Calendar month">${Array.from({length:12},(_,m)=>`<option value="${m}" ${m===month?"selected":""}>${new Date(2000,m,1).toLocaleDateString("en-PH",{month:"long"})}</option>`).join("")}</select>
          <select id="holidayYearSelect" aria-label="Calendar year">${PH_HOLIDAY_YEARS.map(y=>`<option value="${y}" ${y===year?"selected":""}>${y}</option>`).join("")}</select>
          <button id="holidayNextMonth" class="btn btn-light btn-sm" type="button" ${month===11?"disabled":""}>Next ›</button>
        </div>
      </div>
      <div class="card-body">
        <div class="holiday-legend">
          <span><i class="holiday-legend-dot holiday-regular"></i>Regular Holiday</span>
          <span><i class="holiday-legend-dot holiday-special"></i>Special Non-Working</span>
          <span><i class="holiday-legend-dot holiday-working"></i>Special Working</span>
        </div>
        <div class="ph-calendar-scroll">
          <div class="ph-calendar-weekdays">${["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day=>`<div>${day}</div>`).join("")}</div>
          <div class="ph-calendar-grid">${leading}${days}${trailing}</div>
        </div>
        ${monthHolidays.length?`<div class="holiday-month-summary"><strong>${monthHolidays.length} holiday${monthHolidays.length===1?"":"s"} in ${monthName}</strong><span>${monthHolidays.map(h=>`${formatDate(h.date)} — ${escapeHtml(h.name)}`).join(" • ")}</span></div>`:`<div class="holiday-month-summary no-holiday"><strong>No national holiday this month</strong><span>OT Type defaults to Regular Day unless the employee's weekly Day Off applies.</span></div>`}
      </div>
    </div>
`;

  document.getElementById("holidayPrevMonth")?.addEventListener("click",()=>{holidayCalendarMonth=Math.max(0,holidayCalendarMonth-1);renderHolidayCalendar();});
  document.getElementById("holidayNextMonth")?.addEventListener("click",()=>{holidayCalendarMonth=Math.min(11,holidayCalendarMonth+1);renderHolidayCalendar();});
  document.getElementById("holidayMonthSelect")?.addEventListener("change",e=>{holidayCalendarMonth=Number(e.target.value);renderHolidayCalendar();});
  document.getElementById("holidayYearSelect")?.addEventListener("change",e=>{holidayCalendarYear=Number(e.target.value);renderHolidayCalendar();});
}


function normalizeInteractiveButtonTypes(root=document){
  root.querySelectorAll?.("button:not([type])").forEach(button=>button.type="button");
}

function stabilizeSupervisorInteractions(){
  // Intentionally empty. Native buttons/dropdowns keep their normal browser
  // hit-testing; Supervisor controls already have targeted event handlers.
}

function refreshSupervisorScheduleNavBadge(){
  if(currentUser?.role!=="Supervisor")return;
  const navButton=sideNav?.querySelector?.('.nav-btn[data-page="employee-schedule"]');
  if(!navButton)return;
  const count=supervisorNotificationsForDepartment(currentUser.department)
    .filter(n=>n.type==="schedule-required").length;
  let badge=navButton.querySelector('.nav-count-badge');
  if(count){
    if(!badge){
      badge=document.createElement('span');
      badge.className='nav-count-badge';
      navButton.appendChild(badge);
    }
    badge.textContent=String(count);
  }else{
    badge?.remove();
  }
}

function buildNavigation(){
  const adminModuleNav=ADMIN_MODULE_ACCESS
    .filter(item=>hasAdminModuleAccess(item.id,currentUser))
    .map(item=>({id:item.id,label:item.label,icon:item.id==="employees"?"♙":item.id==="leave-approvals"?"✓":item.id==="last-cutoff"?"↶":"▦"}));
  const nav = {
    Supervisor:[
      {id:"dashboard",label:"Dashboard",icon:"⌂"},
      {id:"new-request",label:"New OT Request",icon:"＋"},
      {id:"supervisor-file-leave",label:"File Leave",icon:"＋"},
      {id:"employee-schedule",label:"Employee Schedule",icon:"◷"},
      {id:"leave-requests",label:"Leave Requests",icon:"□"},
      {id:"my-requests",label:"Department Requests",icon:"▤"},
      ...(adminModuleNav.length?[{separator:true,label:"ADMIN DEPARTMENT"}]:[]),
      ...adminModuleNav
    ],
    "Request Approver":[
      {id:"dashboard",label:"Dashboard",icon:"⌂"},
      {id:"attendance-summary",label:"Leave / Absent",icon:"◫"},
      {id:"history",label:"OT History",icon:"▤"},
      {id:"reports",label:"Reports",icon:"⌁"}
    ],
    IT:[
      {id:"dashboard",label:"Dashboard",icon:"⌂"},
      {id:"account-requests",label:"Account Requests",icon:"＋"},
      {id:"system-accounts",label:"System Accounts",icon:"♙"},
      {id:"data-maintenance",label:"Data Maintenance",icon:"⌫"}
    ],
    HR:[
      {id:"dashboard",label:"Dashboard",icon:"⌂"},
      {id:"hr-new-ot",label:"New OT Request",icon:"＋"},
      {id:"hr-leave-request",label:"Leave Request",icon:"□"},
      {id:"employees",label:"Employee Master List",icon:"♙"},
      {id:"leave-approvals",label:"Leave & Approved OT",icon:"✓"},
      {id:"last-cutoff",label:"Cutoff",icon:"↶"},
      {id:"departments",label:"Department Summary",icon:"▦"}
    ],
    Employee:[
      {id:"dashboard",label:"Dashboard",icon:"⌂"},
      {id:"attendance-ot",label:"Attendance & OT",icon:"◫"},
      {id:"my-ot",label:"My OT Submissions",icon:"✓"},
      {id:"file-leave",label:"File Leave",icon:"＋"},
      {id:"my-leave",label:"My Leave Requests",icon:"□"},
      ...(adminModuleNav.length?[{separator:true,label:"ADMIN DEPARTMENT"}]:[]),
      ...adminModuleNav
    ]
  }[currentUser.role] || [];

  sideNav.innerHTML = nav.map(item=>item.separator
    ? `<div class="nav-process-separator" role="separator" aria-label="${escapeHtml(item.label)}"><span>${escapeHtml(item.label)}</span></div>`
    : `
    <button class="nav-btn ${currentPage===item.id?"active":""}" data-page="${item.id}" type="button">
      <span class="nav-icon">${item.icon}</span><span>${item.label}</span>
      ${currentUser.role==="Request Approver" && item.id==="dashboard" && (getRequests().filter(r=>r.status==="Pending" && !r.attendanceStatus && (isOtAmendment(r) || Number(r.totalHours||0)>0)).length + getLeaveRequests().filter(r=>r.status==="Pending Request Approver").length) ? `<span class="nav-count-badge">${getRequests().filter(r=>r.status==="Pending" && !r.attendanceStatus && (isOtAmendment(r) || Number(r.totalHours||0)>0)).length + getLeaveRequests().filter(r=>r.status==="Pending Request Approver").length}</span>` : ""}
      ${(currentUser.role==="HR" || hasAdminModuleAccess("leave-approvals",currentUser)) && item.id==="leave-approvals" && getLeaveRequests().filter(r=>r.status==="Pending HR").length ? `<span class="nav-count-badge">${getLeaveRequests().filter(r=>r.status==="Pending HR").length}</span>` : ""}
      ${currentUser.role==="IT" && item.id==="account-requests" && pendingITAccountRequestCount() ? `<span class="nav-count-badge">${pendingITAccountRequestCount()}</span>` : ""}
      ${currentUser.role==="Supervisor" && item.id==="leave-requests" && getLeaveRequests().filter(r=>r.department===currentUser.department && r.status==="Pending Supervisor").length ? `<span class="nav-count-badge">${getLeaveRequests().filter(r=>r.department===currentUser.department && r.status==="Pending Supervisor").length}</span>` : ""}
      ${currentUser.role==="Supervisor" && item.id==="employee-schedule" && supervisorNotificationsForDepartment(currentUser.department).filter(n=>n.type==="schedule-required").length ? `<span class="nav-count-badge">${supervisorNotificationsForDepartment(currentUser.department).filter(n=>n.type==="schedule-required").length}</span>` : ""}
      ${currentUser.role==="Employee" && item.id==="my-leave" && unreadEmployeeLeaveNotificationCount(currentUser.employeeNo) ? `<span class="nav-count-badge">${unreadEmployeeLeaveNotificationCount(currentUser.employeeNo)}</span>` : ""}
    </button>`).join("");
  sideNav.querySelectorAll(".nav-btn").forEach(btn=>{
    btn.addEventListener("click",event=>{
      event.preventDefault();
      event.stopPropagation();
      navigateTo(btn.dataset.page);
    });
  });
}

function updateNavigationActiveState(){
  sideNav?.querySelectorAll?.(".nav-btn").forEach(btn=>{
    btn.classList.toggle("active",btn.dataset.page===currentPage);
  });
}
function navigateTo(page){
  if(!page)return;
  roleSelfServiceContext=null;
  currentPage=page;
  if(currentUser?.role==="Employee" && currentPage==="my-leave")employeeLeaveHistoryPage=1;
  updateNavigationActiveState();
  renderPage();
}

function setPage(title,eyebrow,subtitle){
  document.getElementById("pageTitle").textContent=title;
  document.getElementById("pageEyebrow").textContent=eyebrow;
  document.getElementById("pageSubtitle").textContent=subtitle;
}
function renderPage(){
  // Navigation must stay immediate. Data synchronization is handled on app load,
  // on record changes, and by the periodic due-date sync — never before every page click.
  if(currentPage==="holidays")return renderHolidayCalendar();
  // `leave-approvals` is shared by HR and the Request Approver.
  // Do not let the Admin-module access gate intercept the Request Approver's
  // final leave approval page before renderManager() can handle it.
  const isRequestApproverLeaveApproval=currentUser?.role==="Request Approver" && currentPage==="leave-approvals";
  const isAdminModulePage=ADMIN_MODULE_ACCESS.some(item=>item.id===currentPage) && !isRequestApproverLeaveApproval;
  if(isAdminModulePage){
    // Admin Department module grants are additive. An Admin Supervisor keeps the
    // Supervisor workspace and can also open whichever HR/Admin modules IT grants.
    if(currentUser.role==="HR" || hasAdminModuleAccess(currentPage,currentUser))return renderHR();
    currentPage="dashboard";
    showToast("This account does not have access to that Admin module.");
  }
  if(currentUser.role==="Employee")return renderEmployee();
  if(currentUser.role==="Supervisor"){
    renderSupervisor();
    stabilizeSupervisorInteractions();
    return;
  }
  if(currentUser.role==="Request Approver")return renderManager();
  if(currentUser.role==="IT")return renderIT();
  return renderHR();
}




const IT_ACCESS_ROLES=["Employee","Supervisor","Request Approver","IT"];
const ADMIN_MODULE_ACCESS=[
  {id:"employees",label:"Employee Master List"},
  {id:"leave-approvals",label:"Leave & Approved OT"},
  {id:"last-cutoff",label:"Cutoff"},
  {id:"departments",label:"Department Summary"}
];
function normalizeAdminModuleAccess(account={}){
  // Legacy HR-managed accounts are treated as Admin employees with all four HR modules.
  if(account?.role==="HR")return ADMIN_MODULE_ACCESS.map(item=>item.id);
  const raw=Array.isArray(account?.moduleAccess)?account.moduleAccess:[];
  return [...new Set(raw.filter(id=>ADMIN_MODULE_ACCESS.some(item=>item.id===id)))];
}
function hasAdminModuleAccess(page,account=currentUser){
  return normalizeAdminModuleAccess(account).includes(page);
}
function isAdminDepartmentSupervisor(account=currentUser){
  if(!account || account.role!=="Supervisor")return false;
  const employeeDepartment=String(account.employeeDepartment||account.department||"").trim().toLowerCase();
  return employeeDepartment==="admin";
}
function canUseAdminExcelExport(requiredModule="",account=currentUser){
  if(!account)return false;
  if(account.role==="HR")return true;
  if(!isAdminDepartmentSupervisor(account))return false;
  return requiredModule?hasAdminModuleAccess(requiredModule,account):normalizeAdminModuleAccess(account).length>0;
}
function adminModuleAccessOptions(selected=[]){
  const chosen=new Set(selected||[]);
  return ADMIN_MODULE_ACCESS.map(item=>`<label class="it-module-access-option"><input class="it-module-access-checkbox" type="checkbox" value="${escapeHtml(item.id)}" ${chosen.has(item.id)?"checked":""}><span>${escapeHtml(item.label)}</span></label>`).join("");
}
function getSelectedAdminModuleAccess(){
  return [...document.querySelectorAll('.it-module-access-checkbox:checked')].map(el=>String(el.value));
}
function itAccessDepartment(role,employeeDepartment,supervisorDepartment=""){
  if(role==="Supervisor")return supervisorDepartment||employeeDepartment||DEPARTMENTS[0];
  if(role==="Request Approver")return "All Departments";
  if(role==="IT")return "Information Technology";
  return employeeDepartment||"";
}
function itRoleOptions(selected="Employee"){
  const safeSelected=selected==="HR"?"Employee":selected;
  return IT_ACCESS_ROLES.map(role=>`<option value="${escapeHtml(role)}" ${role===safeSelected?"selected":""}>${escapeHtml(role)}</option>`).join("");
}
function itDepartmentOptions(selected=""){
  return DEPARTMENTS.map(dep=>`<option value="${escapeHtml(dep)}" ${dep===selected?"selected":""}>${escapeHtml(dep)}</option>`).join("");
}

function getEmployeeScheduleInputSummary(){
  const employees=allKnownEmployees();
  const scheduleOverrides=getEmployeeScheduleOverrides();
  const timeOverrides=getEmployeeShiftTimeOverrides();
  const locationOverrides=getEmployeeLocationOverrides();
  const dayOffOverrides=getEmployeeDayOffOverrides();
  const configured=employees.filter(emp=>{
    const schedule=Object.prototype.hasOwnProperty.call(scheduleOverrides,emp.no)?scheduleOverrides[emp.no]:emp.schedule;
    const location=locationOverrides[emp.no]||emp.location||"";
    const dayOff=dayOffOverrides[emp.no]||emp.dayOff||"";
    return schedule==="Morning" || schedule==="Night" || Boolean(location) || Boolean(dayOff) || Boolean(timeOverrides[emp.no]);
  }).length;
  return {
    employees:employees.length,
    configured,
    scheduleOverrides:Object.keys(scheduleOverrides).length,
    timeOverrides:Object.keys(timeOverrides).length,
    locationOverrides:Object.keys(locationOverrides).length,
    dayOffOverrides:Object.keys(dayOffOverrides).length
  };
}

function getOperationalDataSummary(){
  const schedule=getEmployeeScheduleInputSummary();
  return {
    ...schedule,
    overtime:getRequests().length,
    leave:getLeaveRequests().length,
    attendance:getDailyAttendanceRecords().length,
    employeeSubmissions:getEmployeeAttendanceOTSubmissions().length,
    managerNotifications:getManagerNotifications().length,
    hrNotifications:getHRNotifications().length,
    employeeLeaveNotifications:getEmployeeLeaveNotifications().length,
    supervisorNotifications:getSupervisorEmployeeNotifications().length
  };
}

function clearAllOperationalDataKeepEmployeesAndAccounts(){
  const now=new Date().toISOString();
  const employees=allKnownEmployees();
  const before=getOperationalDataSummary();

  // Clear all operational transactions entered by employees, supervisors,
  // Admin/HR module users, and Request Approver workflows.
  saveRequests([]);
  saveLeaveRequests([]);
  saveDailyAttendanceRecords([]);
  saveEmployeeAttendanceOTSubmissions([]);

  // Remove notifications generated from the cleared operational transactions.
  saveManagerNotifications([]);
  saveHRNotifications([]);
  saveEmployeeLeaveNotifications([]);

  // Clear every Supervisor -> Employee Schedule input.
  saveEmployeeScheduleOverrides({});
  saveEmployeeShiftTimeOverrides({});
  saveEmployeeLocationOverrides({});
  saveEmployeeDayOffOverrides({});

  // HR-created/custom employees also carry schedule fields in their base record.
  // Reset only schedule/setup fields. Employee identity/master-list fields remain.
  const custom=getCustomEmployees().map(emp=>({
    ...emp,
    schedule:"Unassigned",
    location:"",
    dayOff:"",
    updatedAt:now
  }));
  saveCustomEmployees(custom);

  // Old Supervisor operational notices are cleared. Fresh setup-required notices
  // are created so each department knows schedules must be entered again.
  const setupNotices=employees.map((emp,index)=>({
    id:`SUP-RESET-${Date.now()}-${index}`,
    type:"schedule-required",
    title:"Employee schedule setup required",
    message:`${emp.name || "Employee"} • ${emp.department || "Unassigned"}`,
    employeeNo:emp.no,
    department:emp.department||"",
    createdAt:now,
    read:false,
    resolved:false
  }));
  saveSupervisorEmployeeNotifications(setupNotices.slice(0,300));
  updateSupervisorEmployeeNotificationUI();

  // Preserved intentionally:
  // - Employee Master List/custom employees and profile overrides
  // - Position, Department, Employment Status, SL/VL entitlement overrides
  // - Firebase Authentication/system accounts and IT access configuration
  // - IT account creation requests and internal chat
  return {employees:employees.length,before};
}

function openITClearOperationalDataModal(){
  const summary=getOperationalDataSummary();
  const transactionTotal=summary.overtime+summary.leave+summary.attendance+summary.employeeSubmissions;
  modalRoot.innerHTML=`<div class="modal-backdrop" id="itClearOperationalBackdrop"><div class="modal" role="dialog" aria-modal="true"><div class="modal-header"><span>IT • DATA MAINTENANCE</span><h3>Clear All Operational Data?</h3></div><div class="modal-body"><div class="note-box" style="margin-bottom:14px"><strong>This clears schedule setup AND employee/supervisor inputs.</strong><br><small>It will clear Employee Schedule setup, Attendance records, Employee Attendance/OT submissions, OT requests, Leave requests, approval results tied to those requests, and operational notifications.</small><br><small><strong>Preserved:</strong> Employee Master List, Position, Department, Status, SL/VL setup, Firebase Authentication accounts, IT access configuration, account-creation records, and internal chat.</small></div><div class="master-attendance-history-summary"><div><span>Employees Preserved</span><strong>${summary.employees}</strong></div><div><span>Operational Records</span><strong>${transactionTotal}</strong></div><div><span>With Schedule Data</span><strong>${summary.configured}</strong></div></div><div class="note-box" style="margin-top:14px"><small>Because Leave records will be cleared, used/reserved leave counts return to zero. SL/VL configured entitlement values remain unchanged.</small></div><label class="field" style="margin-top:14px"><span>Type CLEAR ALL DATA to confirm</span><input id="itClearOperationalConfirmText" autocomplete="off" placeholder="CLEAR ALL DATA"></label></div><div class="modal-footer"><button id="itCancelClearOperational" class="btn btn-light" type="button">Cancel</button><button id="itConfirmClearOperational" class="btn btn-danger" type="button" disabled>Clear All Operational Data</button></div></div></div>`;
  const close=()=>{modalRoot.innerHTML="";};
  const input=document.getElementById("itClearOperationalConfirmText");
  const confirmBtn=document.getElementById("itConfirmClearOperational");
  input?.addEventListener("input",()=>{if(confirmBtn)confirmBtn.disabled=String(input.value||"").trim().toUpperCase()!=="CLEAR ALL DATA";});
  document.getElementById("itCancelClearOperational")?.addEventListener("click",close);
  document.getElementById("itClearOperationalBackdrop")?.addEventListener("click",e=>{if(e.target.id==="itClearOperationalBackdrop")close();});
  confirmBtn?.addEventListener("click",()=>{
    if(String(input?.value||"").trim().toUpperCase()!=="CLEAR ALL DATA")return;
    const result=clearAllOperationalDataKeepEmployeesAndAccounts();
    close();
    showToast(`Operational data cleared. ${result.employees} employee record${result.employees===1?"":"s"} and all system accounts were preserved.`);
    renderIT();
  });
}

function renderIT(){
  const requests=getITAccountRequests();
  const managed=getITManagedAccounts();
  const pending=requests.filter(r=>r.status==="Pending");
  if(currentPage==="dashboard"){
    setPage("IT Account Management","INFORMATION TECHNOLOGY","Create employee system accounts and assign the access level requested for each user.");
    content.innerHTML=`
      ${heroBanner("Account Management","HR-created employees are sent here for system account creation. IT verifies the employee identity, creates the login, and manages account access.",pending.length,"pending account request(s)")}
      <div class="stats-grid">
        ${statCard("Pending Account Creation",pending.length,"New employees waiting for IT","warning","account-requests")}
        ${statCard("IT-Managed Accounts",managed.length,"Employee accounts created by IT","primary","system-accounts")}
        ${statCard("Active Managed Accounts",managed.filter(a=>a.active!==false).length,"Currently allowed to sign in","success","system-accounts")}
        ${statCard("Disabled Accounts",managed.filter(a=>a.active===false).length,"Access blocked by IT","danger","system-accounts")}
      </div>
      <div class="card"><div class="card-header"><div class="card-title-group"><h3>Latest Account Creation Requests</h3><p>Name, department, and position come directly from the HR Employee Master List.</p></div><button id="itOpenRequests" class="btn btn-primary btn-sm" type="button">Open Account Requests</button></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Employee Name</th><th>Department</th><th>Position</th><th>Requested</th><th>Status</th></tr></thead><tbody>${requests.slice(0,8).length?requests.slice(0,8).map(r=>`<tr><td><strong>${escapeHtml(r.employeeName)}</strong><small class="attendance-subline">${escapeHtml(r.employeeNo)}</small></td><td>${escapeHtml(r.department)}</td><td>${escapeHtml(r.position)}</td><td>${new Date(r.requestedAt).toLocaleString("en-PH")}</td><td><span class="badge ${r.status==="Created"?"success":"warning"}">${escapeHtml(r.status)}</span></td></tr>`).join(""):`<tr><td colspan="5">${emptyState("No account requests","When HR adds a new employee, the account creation request will appear here automatically.")}</td></tr>`}</tbody></table></div></div>`;
    bindDashboardStatCards();
    document.getElementById("itOpenRequests")?.addEventListener("click",()=>navigateTo("account-requests"));
    return;
  }
  if(currentPage==="account-requests"){
    const rows=requests.filter(r=>r.status==="Pending");
    setPage("Account Creation Requests","INFORMATION TECHNOLOGY","Employees added by HR who still need a system login.");
    content.innerHTML=`${heroBanner("Account Creation Requests","Review the employee information sent by HR, then create the Employee account.",rows.length,"pending request(s)")}
      <div class="card"><div class="card-header"><div class="card-title-group"><h3>Pending Requests</h3><p>Source: HR Employee Master List</p></div></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Employee Name</th><th>Department</th><th>Position</th><th>Employee No.</th><th>Requested</th><th>Action</th></tr></thead><tbody>${rows.length?rows.map(r=>`<tr><td><strong>${escapeHtml(r.employeeName)}</strong></td><td>${escapeHtml(r.department)}</td><td>${escapeHtml(r.position)}</td><td>${escapeHtml(r.employeeNo)}</td><td>${new Date(r.requestedAt).toLocaleString("en-PH")}</td><td><button type="button" class="btn btn-primary btn-sm it-create-account-btn" data-request-id="${escapeHtml(r.id)}">Create Account</button></td></tr>`).join(""):`<tr><td colspan="6">${emptyState("No pending account creation","All HR-created employee account requests have been completed.")}</td></tr>`}</tbody></table></div></div>`;
    document.querySelectorAll(".it-create-account-btn").forEach(btn=>btn.addEventListener("click",()=>openITCreateAccountModal(btn.dataset.requestId)));
    return;
  }
  if(currentPage==="data-maintenance"){
    const summary=getOperationalDataSummary();
    const transactionTotal=summary.overtime+summary.leave+summary.attendance+summary.employeeSubmissions;
    setPage("Data Maintenance","INFORMATION TECHNOLOGY","Clear operational test/input data while keeping employee records and system accounts.");
    content.innerHTML=`${heroBanner("Data Maintenance","Use this when you need a clean operational slate without re-registering employees or recreating Firebase accounts.",transactionTotal,"operational record(s)")}
      <div class="card"><div class="card-header"><div class="card-title-group"><h3>Operational Data Reset</h3><p>Clears schedule setup plus employee/supervisor Attendance, OT, and Leave inputs.</p></div></div>
      <div class="stats-grid" style="padding:0 18px 18px">
        ${statCard("Employees Preserved",summary.employees,"Master-list records stay intact","success","")}
        ${statCard("Schedule Setups",summary.configured,"Will require re-entry","warning","")}
        ${statCard("Attendance Records",summary.attendance,"Will be cleared","danger","")}
        ${statCard("OT / Employee Inputs",summary.overtime+summary.employeeSubmissions,"Will be cleared","danger","")}
        ${statCard("Leave Requests",summary.leave,"Will be cleared","danger","")}
      </div>
      <div class="note-box" style="margin:0 18px 18px"><strong>Will be cleared:</strong> Work Area, Morning/Night Shift, Shift In/Out, Day Off, Attendance, Employee Attendance/OT submissions, OT requests, Leave requests, related approvals/decisions, and operational notifications.<br><small><strong>Will NOT be cleared:</strong> Employee Master List, Position, Department, Status, SL/VL setup, Firebase Authentication accounts, IT access, account-creation records, or internal chat.</small></div>
      <div style="display:flex;justify-content:flex-end;padding:0 18px 20px"><button id="itClearAllOperationalData" class="btn btn-danger" type="button">Clear All Operational Data</button></div></div>`;
    document.getElementById("itClearAllOperationalData")?.addEventListener("click",openITClearOperationalDataModal);
    return;
  }
  if(currentPage==="system-accounts"){
    const directory=getSystemAccountDirectory();
    const managedByUsername=new Map(managed.map(a=>[String(a.username||"").toLowerCase(),a]));
    const all=directory.map(a=>{
      const managedRecord=managedByUsername.get(String(a.username||"").toLowerCase());
      return managedRecord?{...a,...managedRecord,uid:a.uid||managedRecord.uid,source:"IT Managed"}:{...a,source:a.source||"Firebase"};
    });
    setPage("System Accounts","INFORMATION TECHNOLOGY","View system logins and manage employee accounts created by IT.");
    content.innerHTML=`${heroBanner("System Accounts","Firebase Authentication secures sign-in. IT-managed accounts can have their access changed or be disabled. Passwords are not stored in the browser or Realtime Database.",managed.length,"IT-managed employee account(s)")}
      <div class="card"><div class="card-header"><div class="card-title-group"><h3>Account Directory</h3><p>Managed accounts stay linked to the HR Employee Master List while IT controls their system access.</p></div><input id="itAccountSearch" class="employee-master-search" type="search" placeholder="Search username / employee / department..."></div>
      <div class="table-wrap"><table class="data-table" id="itSystemAccountsTable"><thead><tr><th>Username</th><th>Employee / Account</th><th>Access</th><th>Department</th><th>Position</th><th>Status</th><th>Source</th><th>Action</th></tr></thead><tbody>${all.map(a=>`<tr data-account-search="${escapeHtml(`${a.username} ${a.employeeName||a.displayName||""} ${a.role} ${a.department||""} ${a.position||""}`.toLowerCase())}"><td><strong>${escapeHtml(a.username)}</strong></td><td>${escapeHtml(a.employeeName||a.displayName||"—")}</td><td>${escapeHtml(a.role==="HR"?"Employee":(a.role||"—"))}${normalizeAdminModuleAccess(a).length?`<small class="attendance-subline">${escapeHtml(normalizeAdminModuleAccess(a).map(id=>ADMIN_MODULE_ACCESS.find(item=>item.id===id)?.label||id).join(" • "))}</small>`:""}</td><td>${escapeHtml(a.employeeDepartment||a.department||"—")}</td><td>${escapeHtml(a.position||"—")}</td><td><span class="badge ${a.active===false?"danger":"success"}">${a.active===false?"Disabled":"Active"}</span></td><td>${escapeHtml(a.source)}</td><td>${a.source==="IT Managed"?`<div class="btn-row"><button type="button" class="btn btn-primary btn-sm it-change-access-btn" data-account-id="${escapeHtml(a.id)}">Change Access</button><button type="button" class="btn btn-secondary btn-sm it-reset-password-btn" data-account-id="${escapeHtml(a.id)}">Password Help</button><button type="button" class="btn ${a.active===false?"btn-success":"btn-danger"} btn-sm it-toggle-account-btn" data-account-id="${escapeHtml(a.id)}">${a.active===false?"Enable":"Disable"}</button></div>`:`<span class="muted">Read only</span>`}</td></tr>`).join("")}</tbody></table></div></div>`;
    const applySearch=()=>{const q=String(document.getElementById("itAccountSearch")?.value||"").trim().toLowerCase();document.querySelectorAll("#itSystemAccountsTable tbody tr").forEach(row=>row.classList.toggle("hidden",!!q&&!row.dataset.accountSearch.includes(q)));};
    document.getElementById("itAccountSearch")?.addEventListener("input",applySearch);
    document.querySelectorAll(".it-change-access-btn").forEach(btn=>btn.addEventListener("click",()=>openITChangeAccessModal(btn.dataset.accountId)));
    document.querySelectorAll(".it-reset-password-btn").forEach(btn=>btn.addEventListener("click",()=>openITResetPasswordModal(btn.dataset.accountId)));
    document.querySelectorAll(".it-toggle-account-btn").forEach(btn=>btn.addEventListener("click",()=>toggleITManagedAccount(btn.dataset.accountId)));
    return;
  }
  currentPage="dashboard";renderIT();
}
function openITCreateAccountModal(requestId){
  const request=getITAccountRequests().find(r=>r.id===requestId && r.status==="Pending");
  if(!request)return;
  const suggested=suggestedEmployeeUsername(request.employeeName);
  modalRoot.innerHTML=`<div class="modal-backdrop" id="itCreateAccountBackdrop"><div class="modal" role="dialog" aria-modal="true"><div class="modal-header"><span>IT • ACCOUNT MANAGEMENT</span><h3>Create System Account</h3></div><form id="itCreateAccountForm"><div class="modal-body"><div class="master-attendance-history-summary"><div><span>Employee</span><strong>${escapeHtml(request.employeeName)}</strong></div><div><span>Department</span><strong>${escapeHtml(request.department)}</strong></div><div><span>Position</span><strong>${escapeHtml(request.position)}</strong></div></div><label class="field"><span>Account Access</span><select id="itNewRole" required>${itRoleOptions("Employee")}</select></label><label class="field" id="itSupervisorDepartmentField" hidden><span>Supervisor Access Department</span><select id="itSupervisorDepartment">${itDepartmentOptions(request.department)}</select></label>${request.department==="Admin"?`<div class="it-module-access-panel"><span class="it-module-access-title">Admin Department Access</span><div class="it-module-access-grid">${adminModuleAccessOptions([])}</div><p class="schedule-management-note">HR is part of the Admin Department. Keep the account as Employee, then grant only the Admin modules this employee needs.</p></div>`:""}<label class="field"><span>Username</span><input id="itNewUsername" value="${escapeHtml(suggested)}" autocomplete="off" required></label><label class="field"><span>Temporary Password</span><input id="itNewPassword" type="password" autocomplete="new-password" required minlength="6" placeholder="Minimum 6 characters"></label><p class="schedule-management-note" id="itAccessNote">This login stays linked to ${escapeHtml(request.employeeNo)}. IT controls which system workspace the user can access.</p></div><div class="modal-footer"><button id="itCancelCreateAccount" class="btn btn-light" type="button">Cancel</button><button class="btn btn-primary" type="submit">Create Account</button></div></form></div></div>`;
  const close=()=>{modalRoot.innerHTML="";};
  const roleEl=document.getElementById("itNewRole");
  const supField=document.getElementById("itSupervisorDepartmentField");
  const refreshRole=()=>{const role=roleEl?.value||"Employee";if(supField)supField.hidden=role!=="Supervisor";};
  roleEl?.addEventListener("change",refreshRole);refreshRole();
  document.getElementById("itCancelCreateAccount")?.addEventListener("click",close);
  document.getElementById("itCreateAccountBackdrop")?.addEventListener("click",e=>{if(e.target.id==="itCreateAccountBackdrop")close();});
  document.getElementById("itCreateAccountForm")?.addEventListener("submit",async e=>{
    e.preventDefault();
    const username=String(document.getElementById("itNewUsername")?.value||"").trim().toLowerCase();
    const password=String(document.getElementById("itNewPassword")?.value||"");
    const role=String(document.getElementById("itNewRole")?.value||"Employee");
    const supervisorDepartment=String(document.getElementById("itSupervisorDepartment")?.value||request.department);
    const moduleAccess=request.department==="Admin"?getSelectedAdminModuleAccess():[];
    if(!IT_ACCESS_ROLES.includes(role)){showToast("Choose a valid account access level.");return;}
    if(!/^[a-z0-9._-]{3,40}$/.test(username)){showToast("Username must use 3–40 letters, numbers, dot, dash, or underscore.");return;}
    if(password.length<6){showToast("Temporary password must be at least 6 characters.");return;}
    if(accountUsernameExists(username)){showToast("Username already exists.");return;}
    if(findITManagedAccountByEmployee(request.employeeNo)){showToast("This employee already has a managed account.");return;}
    const department=itAccessDepartment(role,request.department,supervisorDepartment);
    const createdAt=new Date().toISOString();
    const submitButton=e.submitter; if(submitButton)submitButton.disabled=true;
    try{
      const firebaseAccount=await window.OTFirebase.createManagedUser({username,password,profile:{role,moduleAccess,employeeNo:request.employeeNo,employeeName:request.employeeName,displayName:request.employeeName,department,employeeDepartment:request.department,position:request.position,active:true,createdAt,createdBy:currentUser.username}});
      const account={id:`ITACC-${Date.now()}-${Math.floor(Math.random()*1000)}`,uid:firebaseAccount.uid,username,role,moduleAccess,employeeNo:request.employeeNo,employeeName:request.employeeName,displayName:request.employeeName,department,employeeDepartment:request.department,position:request.position,active:true,createdAt,createdBy:currentUser.username};
      const accounts=getITManagedAccounts();accounts.unshift(account);saveITManagedAccounts(accounts);
      saveITAccountRequests(getITAccountRequests().map(r=>r.id===request.id?{...r,status:"Created",read:true,createdAt:new Date().toISOString(),createdUsername:username,createdRole:role,accessDepartment:department}:r));
      const hrNotifications=getHRNotifications();hrNotifications.unshift({id:`HR-ACC-${Date.now()}`,type:"account-created",title:"System account created",message:`${request.employeeName} • ${request.department} • ${request.position}`,details:`Username: ${username} • Access: ${role}${role==="Supervisor"?` (${department})`:""}${moduleAccess.length?` • Admin modules: ${moduleAccess.map(id=>ADMIN_MODULE_ACCESS.find(item=>item.id===id)?.label||id).join(", ")}`:""}`,createdAt:new Date().toISOString(),read:false,targetPage:"employees"});saveHRNotifications(hrNotifications.slice(0,100));
      close();updateITNotificationUI();showToast(`${request.employeeName} ${role} access created in Firebase.`);renderIT();
    }catch(error){showToast(error?.message||"Unable to create Firebase account.");if(submitButton)submitButton.disabled=false;}
  });
}
function openITChangeAccessModal(accountId){
  const account=getITManagedAccounts().find(a=>a.id===accountId);if(!account)return;
  const employeeDepartment=account.employeeDepartment||getEmployeeByNo(account.employeeNo)?.department||account.department||DEPARTMENTS[0];
  const effectiveRole=account.role==="HR"?"Employee":(account.role||"Employee");
  const selectedSupervisorDepartment=effectiveRole==="Supervisor"?account.department:employeeDepartment;
  const selectedModules=normalizeAdminModuleAccess(account);
  modalRoot.innerHTML=`<div class="modal-backdrop" id="itChangeAccessBackdrop"><div class="modal" role="dialog" aria-modal="true"><div class="modal-header"><span>IT • ACCESS CONTROL</span><h3>Change Account Access</h3></div><form id="itChangeAccessForm"><div class="modal-body"><div class="master-attendance-history-summary"><div><span>User</span><strong>${escapeHtml(account.employeeName||account.displayName||account.username)}</strong></div><div><span>Current Access</span><strong>${escapeHtml(effectiveRole)}</strong></div><div><span>Position</span><strong>${escapeHtml(account.position||"—")}</strong></div></div><label class="field"><span>Account Access</span><select id="itEditRole" required>${itRoleOptions(effectiveRole)}</select></label><label class="field" id="itEditSupervisorDepartmentField" ${effectiveRole==="Supervisor"?"":"hidden"}><span>Supervisor Access Department</span><select id="itEditSupervisorDepartment">${itDepartmentOptions(selectedSupervisorDepartment)}</select></label>${employeeDepartment==="Admin"?`<div class="it-module-access-panel"><span class="it-module-access-title">Admin Department Access</span><div class="it-module-access-grid">${adminModuleAccessOptions(selectedModules)}</div><p class="schedule-management-note">HR is handled as an Admin Department employee. Grant the required HR/Admin modules here instead of assigning an HR role.</p></div>`:""}<p class="schedule-management-note">Changing access changes which workspace this username can open. The account remains linked to the same Employee Master List record.</p></div><div class="modal-footer"><button id="itCancelChangeAccess" class="btn btn-light" type="button">Cancel</button><button class="btn btn-primary" type="submit">Save Access</button></div></form></div></div>`;
  const close=()=>{modalRoot.innerHTML="";};
  const roleEl=document.getElementById("itEditRole"), field=document.getElementById("itEditSupervisorDepartmentField");
  const refresh=()=>{if(field)field.hidden=(roleEl?.value!=="Supervisor");};roleEl?.addEventListener("change",refresh);refresh();
  document.getElementById("itCancelChangeAccess")?.addEventListener("click",close);
  document.getElementById("itChangeAccessBackdrop")?.addEventListener("click",e=>{if(e.target.id==="itChangeAccessBackdrop")close();});
  document.getElementById("itChangeAccessForm")?.addEventListener("submit",async e=>{e.preventDefault();const role=String(roleEl?.value||"Employee");const supDep=String(document.getElementById("itEditSupervisorDepartment")?.value||employeeDepartment);const moduleAccess=employeeDepartment==="Admin"?getSelectedAdminModuleAccess():[];if(!IT_ACCESS_ROLES.includes(role)){showToast("Choose a valid account access level.");return;}const department=itAccessDepartment(role,employeeDepartment,supDep);try{if(account.uid)await window.OTFirebase.updateManagedProfile(account.uid,{role,moduleAccess,department,employeeDepartment,accessUpdatedBy:currentUser.username});saveITManagedAccounts(getITManagedAccounts().map(a=>a.id===accountId?{...a,role,moduleAccess,department,employeeDepartment,updatedAt:new Date().toISOString(),accessUpdatedBy:currentUser.username}:a));close();showToast(`${account.employeeName||account.username} access updated.`);renderIT();}catch(error){showToast(error?.message||"Unable to change access.");}});
}
function openITResetPasswordModal(accountId){
  const account=getITManagedAccounts().find(a=>a.id===accountId);if(!account)return;
  modalRoot.innerHTML=`<div class="modal-backdrop" id="itResetPasswordBackdrop"><div class="modal" role="dialog" aria-modal="true"><div class="modal-header"><span>IT • FIREBASE AUTHENTICATION</span><h3>Password Management</h3></div><div class="modal-body"><p><strong>${escapeHtml(account.employeeName||account.username)}</strong> • @${escapeHtml(account.username)}</p><p class="schedule-management-note">Passwords are now secured by Firebase Authentication and are never stored in Realtime Database or localStorage. To reset another user's password, use Firebase Console → Authentication → Users, or add a trusted Admin SDK backend later.</p></div><div class="modal-footer"><button id="itCancelResetPassword" class="btn btn-primary" type="button">Close</button></div></div></div>`;
  const close=()=>{modalRoot.innerHTML="";};document.getElementById("itCancelResetPassword")?.addEventListener("click",close);document.getElementById("itResetPasswordBackdrop")?.addEventListener("click",e=>{if(e.target.id==="itResetPasswordBackdrop")close();});
}
async function toggleITManagedAccount(accountId){
  const accounts=getITManagedAccounts();const account=accounts.find(a=>a.id===accountId);if(!account)return;const next=account.active===false;try{if(account.uid)await window.OTFirebase.updateManagedProfile(account.uid,{active:next});saveITManagedAccounts(accounts.map(a=>a.id===accountId?{...a,active:next,updatedAt:new Date().toISOString()}:a));showToast(`${account.employeeName} account ${next?"enabled":"disabled"}.`);renderIT();}catch(error){showToast(error?.message||"Unable to update account status.");}
}

function getSupervisorForDepartment(department){
  const match=getSystemAccountDirectory().find(user=>user?.role==="Supervisor" && user.department===department && user.active!==false);
  return match ? {username:String(match.username).toLowerCase(),...match} : null;
}
function getLinkedEmployeeRecordForAccount(account=currentUser){
  if(!account?.employeeNo)return null;
  const baseEmployee=getEmployeeByNo(account.employeeNo);
  if(!baseEmployee)return null;
  const configuredEmployee=(getDepartmentEmployees(baseEmployee.department)||[])
    .find(emp=>String(emp.no)===String(account.employeeNo));
  return configuredEmployee || baseEmployee;
}
function getCurrentEmployeeRecord(){
  if(currentUser?.role!=="Employee")return null;
  return getLinkedEmployeeRecordForAccount(currentUser);
}
function leaveRequestProgressLabel(request){
  const status=request?.status||"";
  const supervisorDirect=Boolean(request?.directToRequestApprover || request?.approvalRoute==="Supervisor Direct to Request Approver");
  if(supervisorDirect){
    if(status==="Pending Request Approver")return "Direct filing • Waiting for Request Approver";
    if(status==="Approved")return "Direct filing • Fully Approved";
    if(status==="Rejected by Request Approver")return "Direct filing • Rejected by Request Approver";
  }
  if(status==="Pending Supervisor")return "1 of 4 • Waiting for Supervisor";
  if(status==="Pending HR")return "2 of 4 • Supervisor approved • Waiting for HR";
  if(status==="Pending Request Approver")return "3 of 4 • HR approved • Waiting for Request Approver";
  if(status==="Approved")return "4 of 4 • Fully Approved";
  return status.startsWith("Rejected") ? `Stopped • ${status}` : status;
}
function renderSupervisorLeaveRequests(){
  setPage("Leave Requests","SUPERVISOR LEAVE REVIEW","Review leave requests filed by employees in your department. Approved requests move to HR.");
  const rows=getLeaveRequests()
    .filter(r=>r.department===currentUser.department)
    .sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  const pendingSupervisor=rows.filter(r=>r.status==="Pending Supervisor");
  const pendingHR=rows.filter(r=>r.status==="Pending HR").length;
  const pendingApprover=rows.filter(r=>r.status==="Pending Request Approver").length;
  const approved=rows.filter(r=>r.status==="Approved").length;

  content.innerHTML=`
    ${heroBanner(
      "Employee leave approval queue",
      "Employees file their own VL / SL request. The department Supervisor is the first approver before HR and the Request Approver.",
      pendingSupervisor.length,
      "request(s) waiting for your decision"
    )}
    <div class="stats-grid">
      ${statCard("For Supervisor Approval",pendingSupervisor.length,"Employee-filed leave requests","warning")}
      ${statCard("Pending HR",pendingHR,"Already approved by Supervisor","primary")}
      ${statCard("Pending Request Approver",pendingApprover,"HR-approved or Supervisor direct filing")}
      ${statCard("Fully Approved",approved,"Final Request Approver decision","success")}
    </div>
    <div class="card leave-approval-flow-card">
      <div class="card-header"><div class="card-title-group"><h3>Approval Flow</h3><p>Employee → Supervisor → HR → Request Approver → Supervisor</p></div><span class="badge pending">Supervisor is Step 1 Approval</span></div>
      <div class="card-body"><div class="leave-flow-track">
        <span class="leave-flow-node done">Employee<br><small>Files Leave</small></span><b>→</b>
        <span class="leave-flow-node active">Supervisor<br><small>Approve / Reject</small></span><b>→</b>
        <span class="leave-flow-node">HR<br><small>Approve / Reject</small></span><b>→</b>
        <span class="leave-flow-node">Request Approver<br><small>Final Decision</small></span><b>→</b>
        <span class="leave-flow-node">Employee + Supervisor<br><small>Final Notification</small></span>
      </div></div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title-group"><h3>Department Leave Requests</h3><p>${escapeHtml(currentUser.department)} • employee-filed VL / SL / Emergency Leave requests</p></div></div>
      <div class="table-wrap leave-table-wrap">
        <table class="leave-request-table">
          <thead><tr><th>Employee</th><th>Type</th><th>Leave Date</th><th>Reason</th><th>Filed</th><th>Progress</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>${rows.length?rows.map(r=>{
            const actionable=r.status==="Pending Supervisor";
            return `<tr class="${actionable?"leave-action-row":""}">
              <td><strong>${escapeHtml(r.employeeName)}</strong><br><small class="muted">${escapeHtml(r.position||"")} • ${escapeHtml(r.employeeNo||"")}</small></td>
              <td><span class="leave-type-badge">${escapeHtml(r.leaveType)}</span><br><small class="muted">${escapeHtml(r.payType||"Without Pay")}${isPaidLeaveRequest(r)?` • ${escapeHtml(String(r.requestedCreditDays??leaveRequestDayCount(r.startDate,r.endDate)))} credit day(s)`:""}</small></td>
              <td>${formatDate(r.startDate)}${r.endDate!==r.startDate?`<br><small class="muted">to ${formatDate(r.endDate)}</small>`:""}</td>
              <td class="wrap-cell">${escapeHtml(r.reason||"")}</td>
              <td><strong>${escapeHtml(r.filedByName||r.employeeName)}</strong><br><small>${formatDateTime(r.createdAt)}</small></td>
              <td><small class="leave-progress-label">${escapeHtml(leaveRequestProgressLabel(r))}</small></td>
              <td>${leaveStatusBadge(r.status)}</td>
              <td>${actionable?`<div class="actions"><button type="button" class="btn btn-success btn-sm" data-supervisor-leave-review="approve" data-id="${escapeHtml(r.id)}">Approve</button><button type="button" class="btn btn-danger btn-sm" data-supervisor-leave-review="reject" data-id="${escapeHtml(r.id)}">Reject</button></div>`:`<small class="muted">${r.status==="Approved"?"Completed":"No action"}</small>`}</td>
            </tr>`;
          }).join(""):`<tr><td colspan="8">${emptyState("No employee leave requests","Employee-filed leave requests for your department will appear here.")}</td></tr>`}</tbody>
        </table>
      </div>
    </div>`;

  document.querySelectorAll("[data-supervisor-leave-review]").forEach(btn=>btn.addEventListener("click",()=>openSupervisorLeaveReviewModal(btn.dataset.id,btn.dataset.supervisorLeaveReview)));
}
function openSupervisorLeaveReviewModal(id,action){
  const request=getLeaveRequestById(id);
  if(!request || request.status!=="Pending Supervisor" || currentUser?.role!=="Supervisor" || request.department!==currentUser.department)return;
  const approving=action==="approve";
  modalRoot.innerHTML=`
    <div class="modal-backdrop" id="supervisorLeaveBackdrop"><div class="modal">
      <div class="modal-header"><span>SUPERVISOR LEAVE REVIEW</span><h3>${approving?"Approve":"Reject"} ${escapeHtml(request.leaveType)} Request</h3></div>
      <div class="modal-body">
        <div class="note-box"><strong>${escapeHtml(request.employeeName)}</strong> • ${escapeHtml(request.department)}<br>${escapeHtml(request.leaveType)} • ${escapeHtml(request.payType||"Without Pay")} • ${formatDate(request.startDate)}${request.endDate!==request.startDate?` – ${formatDate(request.endDate)}`:""}<br><small>${escapeHtml(request.reason||"")}</small></div>
        <label class="field" style="margin-top:14px"><span>Supervisor Remarks ${approving?"(Optional)":"(Required)"}</span><textarea id="supervisorLeaveRemarks" rows="4" placeholder="${approving?"Optional approval note...":"Enter rejection reason..."}"></textarea></label>
      </div>
      <div class="modal-footer"><button type="button" class="btn btn-light" id="cancelSupervisorLeaveReview">Cancel</button><button type="button" class="btn ${approving?"btn-success":"btn-danger"}" id="confirmSupervisorLeaveReview">Confirm ${approving?"Approval":"Rejection"}</button></div>
    </div></div>`;
  const close=()=>modalRoot.innerHTML="";
  document.getElementById("cancelSupervisorLeaveReview")?.addEventListener("click",close);
  document.getElementById("supervisorLeaveBackdrop")?.addEventListener("click",e=>{if(e.target.id==="supervisorLeaveBackdrop")close()});
  document.getElementById("confirmSupervisorLeaveReview")?.addEventListener("click",()=>{
    const remarks=document.getElementById("supervisorLeaveRemarks")?.value.trim()||"";
    if(!approving && !remarks){showToast("Remarks are required when rejecting a leave request.");return;}
    const all=getLeaveRequests();
    const item=all.find(r=>r.id===id);
    if(!item || item.status!=="Pending Supervisor")return;
    const now=new Date().toISOString();
    item.supervisorName=currentUser.displayName;
    item.supervisorReviewedBy=currentUser.displayName;
    item.supervisorReviewedAt=now;
    item.supervisorRemarks=remarks;
    if(approving){
      item.status="Pending HR";
      saveLeaveRequests(all);
      resolveSupervisorLeaveSubmissionNotification(item.id);
      addHRLeaveNotification(item);
      addEmployeeLeaveNotification(item,"supervisor-approved");
      showToast("Leave approved by Supervisor and forwarded to HR.");
    }else{
      item.status="Rejected by Supervisor";
      item.creditChargedDays=0;
      item.creditDeductedAt="";
      saveLeaveRequests(all);
      resolveSupervisorLeaveSubmissionNotification(item.id);
      addEmployeeLeaveNotification(item,"supervisor-rejected");
      showToast("Leave request rejected by Supervisor. No leave credit was deducted.");
    }
    close();
    buildNavigation();
    renderSupervisorLeaveRequests();
    updateSupervisorEmployeeNotificationUI();
    updateHRNotificationUI();
  });
}
function renderSupervisorOwnLeaveForm(){
  const employee=getLinkedEmployeeRecordForAccount(currentUser);
  if(!employee){
    setPage("File Leave","SUPERVISOR OWN LEAVE","Your Supervisor login must be linked to your HR Employee Master List record before you can file your own leave.");
    content.innerHTML=`${heroBanner("Supervisor own leave","Your login is not linked to an employee number yet.",0,"linked employee")}
      <div class="card"><div class="card-body">${emptyState("Supervisor employee record not linked","Ask IT to create/change your Supervisor access from your HR Employee Master List account so the login keeps your Employee No.")}</div></div>`;
    return;
  }
  const todayKey=toDateKey(new Date());
  const status=normalizeEmploymentStatus(employee.employmentStatus,employee.isCustom);
  const rows=getLeaveRequests().filter(r=>String(r.employeeNo)===String(employee.no)).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  const recent=rows.slice(0,5);
  setPage("File Leave","SUPERVISOR OWN LEAVE",`${employee.name} • ${employee.department} • Your leave request goes directly to the Request Approver.`);
  content.innerHTML=`
    ${heroBanner("Supervisor Leave Filing","Supervisor self-filed leave skips Supervisor and HR review and goes directly to the Request Approver.",rows.filter(r=>r.status==="Pending Request Approver").length,"pending Request Approver")}
    ${renderEmployeeLeaveCredits(employee)}
    <div class="grid-2 employee-leave-form-grid">
      <div class="card">
        <div class="card-header"><div class="card-title-group"><h3>New Leave Request — ${escapeHtml(employee.name)}</h3><p>${escapeHtml(employee.position||"—")} • Employee No. ${escapeHtml(employee.no)}</p></div><span class="badge pending">Direct to Request Approver</span></div>
        <div class="card-body">
          <form id="supervisorOwnLeaveForm" class="leave-request-form">
            <div class="employee-leave-identity"><div><span>Employee</span><strong>${escapeHtml(employee.name)}</strong></div><div><span>Position</span><strong>${escapeHtml(employee.position||"—")}</strong></div><div><span>Department</span><strong>${escapeHtml(employee.department||currentUser.department||"—")}</strong></div></div>
            <label class="field"><span>Leave Type</span><select id="supervisorOwnLeaveType" required><option value="VL">VL — Vacation Leave</option><option value="SL">SL — Sick Leave</option><option value="Emergency Leave">Emergency Leave</option></select></label>
            <label class="field"><span>Leave Pay</span><select id="supervisorOwnLeavePayType" required><option value="With Pay" ${status==="Regular"?"":"disabled"}>With Pay</option><option value="Without Pay" ${status==="Regular"?"":"selected"}>Without Pay</option></select></label>
            <div class="leave-credit-summary"><div><span>Selected Credit Balance</span><strong id="supervisorOwnLeaveCreditBalance">—</strong></div><div><span>Pending Reserved</span><strong id="supervisorOwnLeaveCreditReserved">—</strong></div><div><span>Requested Days</span><strong id="supervisorOwnLeaveCreditRequested">1</strong></div><div><span>Balance After Approval</span><strong id="supervisorOwnLeaveCreditAfter">—</strong></div></div>
            <div class="leave-date-grid"><label class="field"><span>Leave From</span><input id="supervisorOwnLeaveStart" type="date" min="${todayKey}" value="${todayKey}" required></label><label class="field"><span>Leave To</span><input id="supervisorOwnLeaveEnd" type="date" min="${todayKey}" value="${todayKey}" required></label></div>
            <label class="field"><span>Reason</span><select id="supervisorOwnLeaveReason" required><option value="">Select reason</option><option value="Emergency">Emergency</option><option value="Going to province">Going to province</option><option value="Not feeling well">Not feeling well</option><option value="Important Matter">Important Matter</option><option value="Flood/Heavy Rain that Causes Flood">Flood/Heavy Rain that Causes Flood</option></select></label>
            <button class="btn btn-primary" type="submit">Submit Leave to Request Approver</button>
          </form>
        </div>
      </div>
      <div class="card"><div class="card-header"><div class="card-title-group"><h3>Supervisor Filing Route</h3><p>Your own leave does not enter your department approval queue.</p></div></div><div class="card-body"><div class="leave-workflow-steps"><div><b>1</b><span><strong>Supervisor files own leave</strong><small>The Employee No. linked to this Supervisor login is used automatically.</small></span></div><div><b>2</b><span><strong>Direct to Request Approver</strong><small>Supervisor review and HR review are skipped for this self-filing route.</small></span></div><div><b>3</b><span><strong>Final approval</strong><small>Paid VL / SL credits are deducted only after Request Approver approval.</small></span></div><div><b>4</b><span><strong>Attendance sync</strong><small>Approved leave automatically appears as Leave when the leave date arrives.</small></span></div></div></div></div>
    </div>
    <div class="card" style="margin-top:16px"><div class="card-header"><div class="card-title-group"><h3>My Recent Leave Requests</h3><p>Latest leave filings for your linked Employee No. Pending self-filed leave can be edited before final approval.</p></div></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Type</th><th>Leave Date</th><th>Pay</th><th>Reason</th><th>Route</th><th>Status</th><th>Filed</th><th>Action</th></tr></thead><tbody>${recent.length?recent.map(r=>`<tr><td>${escapeHtml(r.leaveType||"")}</td><td>${formatDate(r.startDate)}${r.endDate!==r.startDate?`<small class="attendance-subline">to ${formatDate(r.endDate)}</small>`:""}</td><td>${escapeHtml(r.payType||"Without Pay")}</td><td class="wrap-cell">${escapeHtml(r.reason||"")}</td><td>${r.directToRequestApprover?`<span class="badge primary">Direct to Approver</span>`:`<small class="muted">Standard workflow</small>`}</td><td>${leaveStatusBadge(r.status)}</td><td>${formatDateTime(r.createdAt)}${r.lastEditedAt?`<small class="attendance-subline">Edited ${formatDateTime(r.lastEditedAt)}</small>`:""}</td><td>${canCurrentUserEditOwnLeaveRequest(r)?`<button type="button" class="btn btn-light btn-sm" data-own-leave-edit="${escapeHtml(r.id)}">Edit</button>`:`<small class="muted">${r.status==="Approved"?"Locked":"—"}</small>`}</td></tr>`).join(""):`<tr><td colspan="8">${emptyState("No leave requests yet","Submit your first Supervisor leave request above.")}</td></tr>`}</tbody></table></div></div>`;

  bindOwnLeaveEditButtons();
  const typeInput=document.getElementById("supervisorOwnLeaveType");
  const payInput=document.getElementById("supervisorOwnLeavePayType");
  const startInput=document.getElementById("supervisorOwnLeaveStart");
  const endInput=document.getElementById("supervisorOwnLeaveEnd");
  const updatePreview=()=>{
    const leaveType=typeInput?.value||"VL";
    const creditLeave=leaveType==="VL"||leaveType==="SL";
    const requested=leaveRequestDayCount(startInput?.value||todayKey,endInput?.value||startInput?.value||todayKey)||1;
    const summary=getEmployeeLeaveCreditSummary(employee.no,status);
    const withPayOption=payInput?.querySelector('option[value="With Pay"]');
    if(withPayOption)withPayOption.disabled=status!=="Regular"||!creditLeave;
    if((status!=="Regular"||!creditLeave) && payInput)payInput.value="Without Pay";
    const remaining=leaveType==="VL"?summary.remainingVL:leaveType==="SL"?summary.remainingSL:0;
    const reserved=leaveType==="VL"?summary.reservedVL:leaveType==="SL"?summary.reservedSL:0;
    const available=leaveType==="VL"?summary.availableVL:leaveType==="SL"?summary.availableSL:0;
    const withPay=payInput?.value==="With Pay";
    document.getElementById("supervisorOwnLeaveCreditBalance").textContent=creditLeave&&status==="Regular"?`${Number(remaining).toFixed(2)} ${leaveType}`:"N/A";
    document.getElementById("supervisorOwnLeaveCreditReserved").textContent=creditLeave&&status==="Regular"?`${Number(reserved).toFixed(2)} pending`:"N/A";
    document.getElementById("supervisorOwnLeaveCreditRequested").textContent=creditLeave?String(requested):"N/A";
    document.getElementById("supervisorOwnLeaveCreditAfter").textContent=creditLeave&&status==="Regular"&&withPay?`${Math.max(0,Number(available)-requested).toFixed(2)} ${leaveType}`:"No deduction";
  };
  startInput?.addEventListener("change",()=>{if(endInput){endInput.min=startInput.value||todayKey;if(!endInput.value||endInput.value<startInput.value)endInput.value=startInput.value;}updatePreview();});
  endInput?.addEventListener("change",updatePreview);typeInput?.addEventListener("change",updatePreview);payInput?.addEventListener("change",updatePreview);updatePreview();

  document.getElementById("supervisorOwnLeaveForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const leaveType=typeInput?.value||"VL";
    const creditLeave=leaveType==="VL"||leaveType==="SL";
    const payType=creditLeave?(payInput?.value||"Without Pay"):"Without Pay";
    const startDate=startInput?.value||"",endDate=endInput?.value||"",reason=document.getElementById("supervisorOwnLeaveReason")?.value||"";
    if(!startDate||!endDate){showToast("Select the leave date.");return;}
    if(startDate<todayKey){showToast("Leave requests cannot be filed for a past date.");return;}
    if(endDate<startDate){showToast("Leave To cannot be earlier than Leave From.");return;}
    if(!reason){showToast("Select the leave reason.");return;}
    const requestedCreditDays=leaveRequestDayCount(startDate,endDate);
    if(payType==="With Pay"){
      if(!creditLeave){showToast("Emergency Leave is filed Without Pay.");return;}
      if(status!=="Regular"){showToast("Only Regular employees can file VL / SL With Pay.");return;}
      const summary=getEmployeeLeaveCreditSummary(employee.no,status);const available=leaveType==="VL"?summary.availableVL:summary.availableSL;
      if(requestedCreditDays>available){showToast(`You have only ${Number(available).toFixed(2)} ${leaveType} credit(s) available after pending requests.`);return;}
    }
    const overlapping=getLeaveRequests().find(r=>String(r.employeeNo)===String(employee.no)&&["Pending Supervisor","Pending HR","Pending Request Approver","Approved"].includes(r.status)&&!(endDate<r.startDate||startDate>r.endDate));
    if(overlapping){showToast("You already have an active leave request covering that date.");return;}
    const conflictingOT=getRequests().find(r=>String(r.employeeNo)===String(employee.no)&&r.otDate>=startDate&&r.otDate<=endDate&&["Pending","Approved"].includes(r.status));
    if(conflictingOT){showToast(`You already have an OT/payroll record on ${formatDate(conflictingOT.otDate)}.`);return;}
    const now=new Date().toISOString();
    const request={id:`LV-${Date.now()}-${Math.floor(Math.random()*1000)}`,employeeNo:employee.no,employeeName:employee.name,position:employee.position||"",department:employee.department||currentUser.department||"",supervisorName:currentUser.displayName,submittedBy:currentUser.username,filedByRole:"Supervisor",filedByName:currentUser.displayName||employee.name,leaveType,payType,requestedCreditDays:payType==="With Pay"?requestedCreditDays:0,creditChargedDays:0,startDate,endDate,reason,status:"Pending Request Approver",createdAt:now,directToRequestApprover:true,approvalRoute:"Supervisor Direct to Request Approver",supervisorReviewedBy:currentUser.displayName,supervisorReviewedAt:now,supervisorRemarks:"Supervisor self-filed leave — department Supervisor review skipped.",hrReviewedBy:"",hrReviewedAt:"",hrRemarks:"Supervisor self-filing route — HR review skipped; sent directly to Request Approver.",gmReviewedBy:"",gmReviewedAt:"",gmRemarks:""};
    const all=getLeaveRequests();all.unshift(request);saveLeaveRequests(all);addManagerLeaveNotification(request);
    showToast(payType==="With Pay"?`Leave submitted directly to Request Approver. ${requestedCreditDays} ${leaveType} credit day(s) reserved while pending.`:"Leave submitted directly to Request Approver.");
    buildNavigation();renderSupervisorOwnLeaveForm();updateManagerNotificationUI();
  });
}

function renderEmployeeLeaveCredits(employee){
  const status=normalizeEmploymentStatus(employee?.employmentStatus,employee?.isCustom);
  const credit=getEmployeeLeaveCreditSummary(employee?.no||"",status);
  return `<div class="stats-grid employee-leave-credit-grid">
    ${statCard("VL Credit",Number(credit.remainingVL).toFixed(2),`Available now: ${Number(credit.availableVL).toFixed(2)} • Reserved: ${Number(credit.reservedVL).toFixed(2)}`,"primary")}
    ${statCard("SL Credit",Number(credit.remainingSL).toFixed(2),`Available now: ${Number(credit.availableSL).toFixed(2)} • Reserved: ${Number(credit.reservedSL).toFixed(2)}`,"success")}
    ${statCard("Employment Status",escapeHtml(status),status==="Regular"?"Regular employees receive 5 VL + 5 SL credits":"Paid VL / SL credits are available to Regular employees only")}
  </div>`;
}
function renderEmployeeLeaveTable(rows,title="My Leave Requests",options={}){
  const showViewAll=Boolean(options.showViewAll);
  const pagination=options.pagination||null;
  const headerAction=showViewAll?`<button id="employeeViewAllLeaveRequests" class="btn btn-light btn-sm" type="button">View All</button>`:"";
  const paginationHtml=pagination?`<div class="employee-leave-pagination">
    <button id="employeeLeavePrevPage" class="btn btn-light btn-sm" type="button" ${pagination.page<=1?"disabled":""}>‹ Previous</button>
    <span>Page <strong>${pagination.page}</strong> of <strong>${pagination.totalPages}</strong><small>${pagination.totalItems} request(s) total • 5 per page</small></span>
    <button id="employeeLeaveNextPage" class="btn btn-light btn-sm" type="button" ${pagination.page>=pagination.totalPages?"disabled":""}>Next ›</button>
  </div>`:"";
  return `<div class="card">
    <div class="card-header"><div class="card-title-group"><h3>${escapeHtml(title)}</h3><p>${showViewAll?"Your latest filed leave request.":"Track every approval step from Supervisor to final Request Approver decision."}</p></div>${headerAction}</div>
    <div class="table-wrap leave-table-wrap">
      <table class="leave-request-table employee-leave-history-table">
        <thead><tr><th>Request</th><th>Type</th><th>Leave Date</th><th>Reason</th><th>Supervisor</th><th>HR</th><th>Request Approver</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>${rows.length?rows.map(r=>`<tr>
          <td data-label="Request"><span class="request-id">${escapeHtml(r.id)}</span><br><small>${formatDateTime(r.createdAt)}</small>${r.lastEditedAt?`<br><small class="muted">Edited ${formatDateTime(r.lastEditedAt)}</small>`:""}<br><small class="leave-progress-label">${escapeHtml(leaveRequestProgressLabel(r))}</small></td>
          <td data-label="Type"><span class="leave-type-badge">${escapeHtml(r.leaveType)}</span><br><small class="muted">${escapeHtml(r.payType||"Without Pay")}${isPaidLeaveRequest(r)?` • ${escapeHtml(String(r.status==="Approved"?(r.creditChargedDays??r.requestedCreditDays??0):(r.requestedCreditDays??0)))} credit day(s)`:""}</small></td>
          <td data-label="Leave Date">${formatDate(r.startDate)}${r.endDate!==r.startDate?`<br><small>to ${formatDate(r.endDate)}</small>`:""}</td>
          <td data-label="Reason" class="wrap-cell">${escapeHtml(r.reason||"")}</td>
          <td data-label="Supervisor">${r.supervisorReviewedAt?`<strong>${escapeHtml(r.supervisorReviewedBy||r.supervisorName||"Supervisor")}</strong><br><small>${formatDateTime(r.supervisorReviewedAt)}</small>${r.supervisorRemarks?`<br><small>${escapeHtml(r.supervisorRemarks)}</small>`:""}`:"—"}</td>
          <td data-label="HR">${r.hrReviewedAt?`<strong>${escapeHtml(r.hrReviewedBy||"HR")}</strong><br><small>${formatDateTime(r.hrReviewedAt)}</small>${r.hrRemarks?`<br><small>${escapeHtml(r.hrRemarks)}</small>`:""}`:"—"}</td>
          <td data-label="Request Approver">${r.gmReviewedAt?`<strong>${escapeHtml(r.gmReviewedBy||"Request Approver")}</strong><br><small>${formatDateTime(r.gmReviewedAt)}</small>${r.gmRemarks?`<br><small>${escapeHtml(r.gmRemarks)}</small>`:""}`:"—"}</td>
          <td data-label="Status">${leaveStatusBadge(r.status)}</td>
          <td data-label="Action">${canCurrentUserEditOwnLeaveRequest(r)?`<button type="button" class="btn btn-light btn-sm" data-own-leave-edit="${escapeHtml(r.id)}">Edit</button>`:`<small class="muted">${r.status==="Approved"?"Locked after approval":r.status?.startsWith("Rejected")?"Closed":"—"}</small>`}</td>
        </tr>`).join(""):`<tr><td colspan="9">${emptyState("No leave requests yet","Use File Leave to submit your first VL / SL request.")}</td></tr>`}</tbody>
      </table>
    </div>
    ${paginationHtml}
  </div>`;
}

function bindOwnLeaveEditButtons(){
  document.querySelectorAll("[data-own-leave-edit]").forEach(btn=>{
    btn.addEventListener("click",()=>openOwnLeaveEditModal(btn.dataset.ownLeaveEdit));
  });
}
function openOwnLeaveEditModal(id){
  const request=getLeaveRequestById(id);
  if(!canCurrentUserEditOwnLeaveRequest(request)){
    showToast("This leave can no longer be edited. Only your own pending leave request is editable before final approval.");
    return;
  }
  const employee=getLinkedEmployeeRecordForAccount(currentUser);
  if(!employee)return;
  const todayKey=toDateKey(new Date());
  const earliestDate=request.startDate && request.startDate<todayKey ? request.startDate : todayKey;
  const employmentStatus=normalizeEmploymentStatus(employee.employmentStatus,employee.isCustom);
  const reasons=["Emergency","Going to province","Not feeling well","Important Matter","Flood/Heavy Rain that Causes Flood"];
  const reasonOptions=(reasons.includes(request.reason)?reasons:[request.reason,...reasons].filter(Boolean)).map(reason=>`<option value="${escapeHtml(reason)}" ${reason===request.reason?"selected":""}>${escapeHtml(reason)}</option>`).join("");
  const direct=Boolean(request.directToRequestApprover || request.approvalRoute==="Supervisor Direct to Request Approver");
  modalRoot.innerHTML=`
    <div class="modal-backdrop" id="ownLeaveEditBackdrop"><div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header"><span>EDIT PENDING LEAVE</span><h3>${escapeHtml(request.employeeName)} • ${escapeHtml(request.leaveType)}</h3></div>
      <div class="modal-body">
        <div class="note-box"><strong>${direct?"Supervisor direct filing":"Employee leave filing"}</strong><br><small>${direct?"After saving, the edited request stays Pending Request Approver.":"Because the leave details changed, any prior Supervisor/HR review is cancelled and the request returns to Pending Supervisor."}</small></div>
        <div class="leave-date-grid" style="margin-top:14px">
          <label class="field"><span>Leave Type</span><select id="editOwnLeaveType" required><option value="VL" ${request.leaveType==="VL"?"selected":""}>VL — Vacation Leave</option><option value="SL" ${request.leaveType==="SL"?"selected":""}>SL — Sick Leave</option><option value="Emergency Leave" ${request.leaveType==="Emergency Leave"?"selected":""}>Emergency Leave</option></select></label>
          <label class="field"><span>Leave Pay</span><select id="editOwnLeavePayType" required><option value="With Pay" ${request.payType==="With Pay"?"selected":""} ${employmentStatus==="Regular"?"":"disabled"}>With Pay</option><option value="Without Pay" ${request.payType!=="With Pay"?"selected":""}>Without Pay</option></select></label>
        </div>
        <div class="leave-credit-summary" style="margin-top:12px"><div><span>Available Credit</span><strong id="editOwnLeaveAvailable">—</strong></div><div><span>Other Pending Reserved</span><strong id="editOwnLeaveReserved">—</strong></div><div><span>Requested Days</span><strong id="editOwnLeaveRequested">—</strong></div><div><span>Balance After Approval</span><strong id="editOwnLeaveAfter">—</strong></div></div>
        <div class="leave-date-grid" style="margin-top:14px"><label class="field"><span>Leave From</span><input id="editOwnLeaveStart" type="date" min="${earliestDate}" value="${escapeHtml(request.startDate||todayKey)}" required></label><label class="field"><span>Leave To</span><input id="editOwnLeaveEnd" type="date" min="${earliestDate}" value="${escapeHtml(request.endDate||request.startDate||todayKey)}" required></label></div>
        <label class="field" style="margin-top:14px"><span>Reason</span><select id="editOwnLeaveReason" required>${reasonOptions}</select></label>
      </div>
      <div class="modal-footer"><button id="cancelOwnLeaveEdit" class="btn btn-light" type="button">Cancel</button><button id="saveOwnLeaveEdit" class="btn btn-primary" type="button">Save Changes</button></div>
    </div></div>`;

  const typeInput=document.getElementById("editOwnLeaveType");
  const payInput=document.getElementById("editOwnLeavePayType");
  const startInput=document.getElementById("editOwnLeaveStart");
  const endInput=document.getElementById("editOwnLeaveEnd");
  const close=()=>{modalRoot.innerHTML="";};
  const updatePreview=()=>{
    const leaveType=typeInput?.value||"VL";
    const creditLeave=leaveType==="VL" || leaveType==="SL";
    const withPayOption=payInput?.querySelector('option[value="With Pay"]');
    if(withPayOption)withPayOption.disabled=employmentStatus!=="Regular" || !creditLeave;
    if((employmentStatus!=="Regular" || !creditLeave) && payInput)payInput.value="Without Pay";
    const requestedDays=leaveRequestDayCount(startInput?.value||request.startDate,endInput?.value||startInput?.value||request.endDate)||1;
    const summary=getEmployeeLeaveCreditSummary(employee.no,employmentStatus,request.id);
    const available=leaveType==="VL"?summary.availableVL:leaveType==="SL"?summary.availableSL:0;
    const reserved=leaveType==="VL"?summary.reservedVL:leaveType==="SL"?summary.reservedSL:0;
    const withPay=payInput?.value==="With Pay";
    document.getElementById("editOwnLeaveAvailable").textContent=creditLeave&&employmentStatus==="Regular"?`${Number(available).toFixed(2)} ${leaveType}`:"N/A";
    document.getElementById("editOwnLeaveReserved").textContent=creditLeave&&employmentStatus==="Regular"?`${Number(reserved).toFixed(2)} pending`:"N/A";
    document.getElementById("editOwnLeaveRequested").textContent=creditLeave?String(requestedDays):"N/A";
    document.getElementById("editOwnLeaveAfter").textContent=creditLeave&&employmentStatus==="Regular"&&withPay?`${Math.max(0,Number(available)-requestedDays).toFixed(2)} ${leaveType}`:"No deduction";
  };
  startInput?.addEventListener("change",()=>{if(endInput){endInput.min=startInput.value||earliestDate;if(!endInput.value||endInput.value<startInput.value)endInput.value=startInput.value;}updatePreview();});
  endInput?.addEventListener("change",updatePreview);
  typeInput?.addEventListener("change",updatePreview);
  payInput?.addEventListener("change",updatePreview);
  updatePreview();
  document.getElementById("cancelOwnLeaveEdit")?.addEventListener("click",close);
  document.getElementById("ownLeaveEditBackdrop")?.addEventListener("click",e=>{if(e.target.id==="ownLeaveEditBackdrop")close();});
  document.getElementById("saveOwnLeaveEdit")?.addEventListener("click",()=>{
    const all=getLeaveRequests();
    const item=all.find(r=>r.id===id);
    if(!canCurrentUserEditOwnLeaveRequest(item)){
      close();showToast("This leave was already decided or is no longer editable.");renderPage();return;
    }
    const leaveType=typeInput?.value||"VL";
    const creditLeave=leaveType==="VL" || leaveType==="SL";
    const payType=creditLeave?(payInput?.value||"Without Pay"):"Without Pay";
    const startDate=startInput?.value||"";
    const endDate=endInput?.value||"";
    const reason=document.getElementById("editOwnLeaveReason")?.value||"";
    if(!startDate||!endDate){showToast("Select the leave date.");return;}
    if(startDate<earliestDate){showToast("You cannot move this leave to an earlier backdated date.");return;}
    if(endDate<startDate){showToast("Leave To cannot be earlier than Leave From.");return;}
    if(!reason){showToast("Select the leave reason.");return;}
    const requestedCreditDays=leaveRequestDayCount(startDate,endDate);
    if(payType==="With Pay"){
      if(!creditLeave){showToast("Emergency Leave is filed Without Pay.");return;}
      if(employmentStatus!=="Regular"){showToast("Only Regular employees can file VL / SL With Pay.");return;}
      const summary=getEmployeeLeaveCreditSummary(employee.no,employmentStatus,item.id);
      const available=leaveType==="VL"?summary.availableVL:summary.availableSL;
      if(requestedCreditDays>available){showToast(`You have only ${Number(available).toFixed(2)} ${leaveType} credit(s) available after other pending requests.`);return;}
    }
    const overlapping=all.find(r=>r.id!==item.id && String(r.employeeNo)===String(employee.no) && ["Pending Supervisor","Pending HR","Pending Request Approver","Approved"].includes(r.status) && !(endDate<r.startDate || startDate>r.endDate));
    if(overlapping){showToast("You already have another active leave request covering that date.");return;}
    const conflictingOT=getRequests().find(r=>String(r.employeeNo)===String(employee.no) && r.otDate>=startDate && r.otDate<=endDate && ["Pending","Approved"].includes(r.status));
    if(conflictingOT){showToast(`You already have an OT/payroll record on ${formatDate(conflictingOT.otDate)}.`);return;}

    const previousStatus=item.status;
    const previousSnapshot={editedAt:new Date().toISOString(),leaveType:item.leaveType,payType:item.payType,startDate:item.startDate,endDate:item.endDate,reason:item.reason,status:item.status};
    item.editHistory=[previousSnapshot,...(Array.isArray(item.editHistory)?item.editHistory:[])].slice(0,10);
    item.leaveType=leaveType;
    item.payType=payType;
    item.requestedCreditDays=payType==="With Pay"?requestedCreditDays:0;
    item.creditChargedDays=0;
    item.startDate=startDate;
    item.endDate=endDate;
    item.reason=reason;
    item.lastEditedAt=new Date().toISOString();
    item.lastEditedBy=currentUser.displayName || employee.name;
    item.editCount=Number(item.editCount||0)+1;
    clearPendingLeaveWorkflowNotifications(item.id);

    const isDirect=Boolean(item.directToRequestApprover || item.approvalRoute==="Supervisor Direct to Request Approver");
    if(isDirect){
      item.status="Pending Request Approver";
      item.supervisorReviewedBy=currentUser.displayName || employee.name;
      item.supervisorReviewedAt=item.lastEditedAt;
      item.supervisorRemarks="Supervisor self-filed leave — edited while pending; direct Request Approver route retained.";
      item.hrReviewedBy="";item.hrReviewedAt="";item.hrRemarks="Supervisor self-filing route — HR review skipped; edited request sent directly to Request Approver.";
      item.gmReviewedBy="";item.gmReviewedAt="";item.gmRemarks="";
    }else{
      const supervisor=getSupervisorForDepartment(item.department);
      if(supervisor)item.supervisorName=supervisor.displayName;
      item.status="Pending Supervisor";
      item.supervisorReviewedBy="";item.supervisorReviewedAt="";item.supervisorRemarks="";
      item.hrReviewedBy="";item.hrReviewedAt="";item.hrRemarks="";
      item.gmReviewedBy="";item.gmReviewedAt="";item.gmRemarks="";
    }
    saveLeaveRequests(all);
    if(isDirect){
      addManagerLeaveNotification(item);
      updateManagerNotificationUI();
    }else{
      addSupervisorLeaveSubmissionNotification(item);
      updateSupervisorEmployeeNotificationUI();
    }
    close();
    buildNavigation();
    renderPage();
    showToast(isDirect?"Leave updated. The edited request is pending Request Approver approval.":previousStatus==="Pending Supervisor"?"Leave updated. Your Supervisor will review the revised request.":"Leave updated. Previous approval steps were reset because the leave details changed; it is back to Pending Supervisor.");
  });
}

function getEmployeeOTSubmissionHistory(employeeNo){
  const empNo=String(employeeNo||"");
  const submissions=getEmployeeAttendanceOTSubmissions()
    .filter(r=>String(r.employeeNo||"")===empNo && employeeSubmissionHasOT(r))
    .sort((a,b)=>String(b.date||"").localeCompare(String(a.date||"")) || new Date(b.submittedAt||b.updatedAt||0)-new Date(a.submittedAt||a.updatedAt||0));
  const requests=getRequests().filter(r=>!isOtAmendment(r) && String(r.employeeNo||"")===empNo && isActualOTRecord(r));
  return submissions.map(sub=>{
    const linkedRequest=sub.supervisorRequestId?requests.find(r=>r.id===sub.supervisorRequestId):null;
    const latestDateRequest=requests.filter(r=>r.otDate===sub.date).sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0))[0] || null;
    const request=linkedRequest || (latestDateRequest?.status==="Rejected" && employeeSubmissionIsNewerThanOTRequest(sub,latestDateRequest)?null:latestDateRequest);
    let status="Pending Supervisor Review";
    let statusClass="warning";
    let statusNote="Waiting for Supervisor to Check, Edit, or Reject this OT.";
    if(request){
      if(request.status==="Approved"){
        status="Approved";statusClass="approved";statusNote="Approved by Request Approver.";
      }else if(request.status==="Rejected"){
        status="Rejected by Request Approver";statusClass="rejected";statusNote=request.managerRemarks?`Rejected by Request Approver: ${request.managerRemarks}`:"Rejected by Request Approver.";
      }else{
        status="Pending Request Approver";statusClass="warning";statusNote=`Checked by ${request.supervisorName||"Supervisor"}; waiting for Request Approver decision.`;
      }
    }else if(sub.supervisorOTReviewStatus==="Rejected"){
      status="Rejected by Supervisor";statusClass="rejected";statusNote=sub.supervisorOTReviewReason?`Rejected by Supervisor: ${sub.supervisorOTReviewReason}`:"Rejected by Supervisor. Edit and resubmit your OT.";
    }else if(sub.supervisorOTReviewStatus==="Forwarded" || sub.supervisorForwardedAt){
      status="Pending Request Approver";statusClass="warning";statusNote="Checked by Supervisor; waiting for Request Approver decision.";
    }
    return {...sub,linkedRequest:request,displayOTStatus:status,displayOTStatusClass:statusClass,displayOTStatusNote:statusNote};
  });
}
function renderEmployeeOTSubmissionTable(employeeNo,options={}){
  const allRows=getEmployeeOTSubmissionHistory(employeeNo);
  const limit=Number(options.limit||0);
  const rows=limit?allRows.slice(0,limit):allRows;
  const showViewAll=Boolean(options.showViewAll && allRows.length>limit);
  const title=options.title||"My OT Submissions";
  return `<div class="card employee-ot-history-card">
    <div class="card-header"><div class="card-title-group"><h3>${escapeHtml(title)}</h3><p>Track each OT from Supervisor review through the Request Approver decision, including advance filings.</p></div>${showViewAll?`<button id="employeeViewAllOTSubmissions" class="btn btn-light btn-sm" type="button">View All (${allRows.length})</button>`:""}</div>
    <div class="table-wrap"><table class="data-table employee-ot-history-table"><thead><tr><th>Duty Date</th><th>OT Type</th><th>OT Time</th><th>Total OT</th><th>Submitted</th><th>Status</th><th>Reason</th></tr></thead><tbody>${rows.length?rows.map(r=>`<tr>
      <td><strong>${formatDate(r.date)}</strong><small class="attendance-subline">${escapeHtml(r.schedule||"")} Shift</small></td>
      <td><span class="badge primary">${escapeHtml(r.otType||"OT")}</span>${r.straightDuty?`<small class="attendance-subline">Straight Duty</small>`:""}</td>
      <td>${escapeHtml(r.normalOtStart||r.straightDutyOtStart||"—")} → ${escapeHtml(r.normalOtEnd||r.straightDutyOtEnd||"—")}</td>
      <td><strong>${Number(r.totalHours||0).toFixed(2)} h</strong>${Number(r.scheduledOtHours||0)>0?`<small class="attendance-subline">${Number(r.scheduledOtHours||0).toFixed(2)} sched + ${Number(r.extraOtHours||0).toFixed(2)} extra</small>`:""}</td>
      <td>${formatDateTime(r.submittedAt||r.createdAt||r.updatedAt)}</td>
      <td><span class="badge ${escapeHtml(r.displayOTStatusClass)}">${escapeHtml(r.displayOTStatus)}</span><small class="attendance-subline">${escapeHtml(r.displayOTStatusNote)}</small>${r.supervisorEditedAt?`<small class="attendance-subline"><b>Edited by Supervisor:</b> ${escapeHtml(r.supervisorEditedBy||"Supervisor")} • ${formatDateTime(r.supervisorEditedAt)}</small>`:""}${r.linkedRequest?.reviewedAt?`<small class="attendance-subline">Reviewed ${formatDateTime(r.linkedRequest.reviewedAt)}</small>`:""}</td>
      <td class="wrap-cell">${escapeHtml(r.reason||"—")}</td>
    </tr>`).join(""):`<tr><td colspan="7">${emptyState("No OT submitted yet","Your filed overtime will appear here after you submit Attendance & OT.")}</td></tr>`}</tbody></table></div>
  </div>`;
}
function renderEmployeeOTHistory(employee){
  const rows=getEmployeeOTSubmissionHistory(employee.no);
  const pendingSupervisor=rows.filter(r=>r.displayOTStatus==="Pending Supervisor Review").length;
  const pendingApprover=rows.filter(r=>r.displayOTStatus==="Pending Request Approver" || r.displayOTStatus==="Forwarded to Approver").length;
  const approved=rows.filter(r=>r.displayOTStatus==="Approved").length;
  const rejected=rows.filter(r=>String(r.displayOTStatus||"").startsWith("Rejected")).length;
  setPage("My OT Submissions","EMPLOYEE OVERTIME TRACKING","See whether your OT is with the Supervisor, Request Approver, Approved, or Rejected—and why.");
  content.innerHTML=`${heroBanner("My overtime submissions",`${escapeHtml(employee.name)} • ${escapeHtml(employee.department||"")}`,rows.length,"OT submission(s)")}
    <div class="stats-grid">${statCard("Supervisor Review",pendingSupervisor,"Waiting for Supervisor check","warning")}${statCard("Request Approver",pendingApprover,"Checked and forwarded by Supervisor","primary")}${statCard("Approved",approved,"Final approved OT","success")}${statCard("Rejected",rejected,"Rejected OT request","danger")}</div>
    ${renderEmployeeOTSubmissionTable(employee.no,{title:"Complete OT History"})}`;
}

function renderEmployeeAttendanceOT(employeeBase){
  const employee=(getDepartmentEmployees(employeeBase.department)||[]).find(e=>String(e.no)===String(employeeBase.no)) || employeeBase;
  const dutyDateKey=getEmployeeDutyDateKey();
  const todayKey=toDateKey(new Date());
  const candidateDate=String(employeeAttendanceDateKey||"").trim();
  const dateKey=/^\d{4}-\d{2}-\d{2}$/.test(candidateDate) ? candidateDate : dutyDateKey;
  const isAdvanceFiling=dateKey>todayKey;
  employeeAttendanceDateKey=dateKey;
  const schedule=getEmployeeAttendanceSchedule(employee);
  const holiday=getPhilippineHoliday(dateKey);
  const weekday=parseLocalDate(dateKey).toLocaleDateString("en-PH",{weekday:"long"});
  const isDayOff=Boolean(employee.dayOff && employee.dayOff===weekday);
  const approvedLeave=getApprovedLeaveForEmployeeDate(employee.no,dateKey);
  const scheduledDayOffNoHoliday=Boolean(isDayOff && !holiday && !approvedLeave);
  const prior=getEmployeeAttendanceOTSubmission(employee.no,dateKey);
  const setupComplete=isEmployeeSetupComplete(employee);
  const lockedRequest=activeOTRequestForEmployeeDate(employee.no,dateKey);
  const otReviewLocked=Boolean(lockedRequest && ["Pending","Approved"].includes(lockedRequest.status));
  const latestRejectedRequest=rejectedOTRequestForEmployeeDate(employee.no,dateKey);
  const rejectedRequest=latestRejectedRequest && !employeeSubmissionIsNewerThanOTRequest(prior,latestRejectedRequest)?latestRejectedRequest:null;
  const defaultStatus=approvedLeave?"Leave":(prior?.attendanceStatus || (holiday?"Holiday":(isDayOff?"Day Off":"Present")));
  const defaultOtType=holiday?getAutomaticOtType(dateKey,false):(prior?.otType || (isDayOff ? "Rest Day OT" : "Regular Day"));
  const fullDutyDefault=Boolean(holiday) || (isDayOff && defaultOtType==="Rest Day OT");
  const defaultOtStart=prior?.normalOtStart || (fullDutyDefault?schedule.start:schedule.end);

  const selfServiceMode=roleSelfServiceContext?.employeeNo && String(roleSelfServiceContext.employeeNo)===String(employee.no) ? roleSelfServiceContext : null;
  const directToApprover=Boolean(selfServiceMode?.directApprover);
  const canEditOwnShiftTime=selfServiceMode?.type==="supervisor-own-ot";
  const pageTitle=selfServiceMode?.type==="supervisor-own-ot"?"My New OT Request":"My Attendance & OT";
  const pageEyebrow=selfServiceMode?.type==="supervisor-own-ot"?"SUPERVISOR OWN INPUT":"EMPLOYEE DAILY INPUT";
  setPage(pageTitle,pageEyebrow,`Attendance/OT duty date: ${formatDate(dateKey)} • default duty date stays active until 03:00 AM the next day.`);

  if(!setupComplete){
    content.innerHTML=`${heroBanner("Attendance & OT submission",`${escapeHtml(employee.name)} • ${escapeHtml(employee.department||"")}`,0,"submission blocked")}
      <div class="schedule-required-alert"><div><span class="schedule-required-icon">◷</span><div><strong>Work Area / shift setup is incomplete</strong><span>Your Supervisor must assign your Work Area and Morning/Night shift before you can submit attendance and OT.</span></div></div></div>`;
    return;
  }

  const statusOptions=["Present","Absent","Day Off","Holiday"];
  if(approvedLeave)statusOptions.push("Leave");
  const priorAttendance=isAdvanceFiling?"Present":(prior?.attendanceStatus||defaultStatus);
  const hasOT=Boolean(isAdvanceFiling || (prior?.hasOT && priorAttendance==="Present"));
  const attendanceMetrics=prior?.attendanceStatus ? {
    workedHours:Number(prior.workedHours||0),regularHours:Number(prior.regularHours||0),lateMinutes:Number(prior.lateMinutes||0),undertimeMinutes:Number(prior.undertimeMinutes||0)
  } : {workedHours:0,regularHours:0,lateMinutes:0,undertimeMinutes:0};

  content.innerHTML=`
    ${heroBanner(
      "Employee attendance & overtime",
      `${escapeHtml(employee.name)} • ${escapeHtml(employee.position||"")} • ${escapeHtml(employee.location||"")} • ${escapeHtml(schedule.shift)} Shift`,
      prior?1:0,
      prior?"submission saved for selected date":"submission for selected date"
    )}
    ${lockedRequest?`<div class="info-banner employee-ot-forwarded"><span class="info-icon">✓</span><div><strong>OT already checked by Supervisor.</strong><br><small>${escapeHtml(lockedRequest.status)} • ${Number(lockedRequest.totalHours||0).toFixed(2)} OT hour(s) • waiting for/finalized by Request Approver. OT editing is locked while in this stage.</small></div></div>`:""}
    ${rejectedRequest?`<div class="info-banner" style="border-color:#fecaca;background:#fff7f7"><span class="info-icon">!</span><div><strong>OT Rejected by Request Approver</strong><br><small><b>Reason:</b> ${escapeHtml(rejectedRequest.managerRemarks||"No rejection reason recorded.")} • Edit the attendance/OT details and submit again when corrected.</small></div></div>`:""}
    ${prior?.supervisorOTReviewStatus==="Rejected"?`<div class="info-banner" style="border-color:#fecaca;background:#fff7f7"><span class="info-icon">!</span><div><strong>OT Rejected by Supervisor</strong><br><small><b>Reason:</b> ${escapeHtml(prior.supervisorOTReviewReason||"No rejection reason recorded.")} • Correct the OT details and resubmit for Supervisor review.</small></div></div>`:""}
    <div class="card employee-attendance-ot-card">
      <div class="card-header"><div class="card-title-group"><h3>Daily Attendance & OT Form</h3><p>${scheduledDayOffNoHoliday?"No attendance submission is required on your scheduled Day Off. Submit only if you actually worked Rest Day OT.":"Attendance can be submitted even when you have no overtime."}</p></div><span class="badge ${scheduledDayOffNoHoliday&&!prior?"warning":prior?"approved":"pending"}">${scheduledDayOffNoHoliday&&!prior?"DAY OFF — No Submission Needed":prior?"Submitted":"Not Yet Submitted"}</span></div>
      <div class="card-body">
        <form id="employeeAttendanceOTForm" class="employee-attendance-ot-form">
          <div class="employee-attendance-toolbar">
            <label class="field compact-field"><span>Time In Date / Attendance Date</span><input id="employeeAttendanceDate" type="date" value="${escapeHtml(dateKey)}" required><small class="attendance-subline">This is the calendar date when you actually started duty. Default follows duty date: today until 03:00 AM the next day.</small></label>
            <div class="employee-work-context"><div><span>Department</span><strong>${escapeHtml(employee.department||"—")}</strong></div><div><span>Work Area</span><strong>${escapeHtml(employee.location||"—")}</strong></div><div><span>Shift</span><strong>${escapeHtml(schedule.shift)}</strong></div>${canEditOwnShiftTime?`<div class="supervisor-own-shift-time"><span>Shift Time (Editable)</span><div class="own-shift-time-inputs"><input id="supervisorOwnScheduleStart" class="time-24-input" type="text" inputmode="numeric" maxlength="5" value="${escapeHtml(prior?.scheduleStart||schedule.start)}" placeholder="HH:MM"><b>→</b><input id="supervisorOwnScheduleEnd" class="time-24-input" type="text" inputmode="numeric" maxlength="5" value="${escapeHtml(prior?.scheduleEnd||schedule.end)}" placeholder="HH:MM"></div></div>`:`<div><span>Schedule</span><strong>${escapeHtml(schedule.start)} – ${escapeHtml(schedule.end)}</strong></div>`}<div><span>Day Off</span><strong>${escapeHtml(employee.dayOff||"Not set")}</strong></div></div>
          </div>
          ${isAdvanceFiling?`<div class="holiday-status-banner holiday-special"><strong>Advance OT Filing — ${formatDate(dateKey)}</strong><span>This files OT to your Supervisor for review now. No future attendance record will be created; attendance is filed/finalized when the duty date occurs.</span></div>`:""}
          ${holiday?`<div class="holiday-status-banner ${getHolidayCategoryClass(holiday.category)}"><strong>${escapeHtml(holiday.name)}</strong><span>${escapeHtml(holiday.label)} • OT Type: <b>${escapeHtml(getAutomaticOtType(dateKey,false))}</b> • If you work on this date, scheduled paid hours are included in OT.</span></div>`:""}
          ${scheduledDayOffNoHoliday?`<div class="holiday-status-banner employee-auto-dayoff-banner"><div><strong>Scheduled Day Off — ${escapeHtml(employee.dayOff||weekday)}</strong><span>No attendance submission is needed. Your Supervisor's New OT Request roster will show DAY OFF automatically for this date.</span></div><button id="employeeRestDayOTMode" class="btn btn-primary btn-sm" type="button">${prior?.hasOT?"Edit Rest Day OT":"I Worked — File Rest Day OT"}</button></div>`:""}
          ${approvedLeave?`<div class="holiday-status-banner holiday-special"><strong>Approved ${escapeHtml(approvedLeave.leaveType)}</strong><span>${escapeHtml(approvedLeave.reason||"Approved leave")} • Attendance status is locked to Leave for this date.</span></div>`:""}

          <div class="employee-attendance-section">
            <div class="employee-section-heading"><div><span class="section-label">ATTENDANCE</span><h4>Actual Attendance</h4></div></div>
            <div class="employee-attendance-grid">
              <label class="field"><span>Status</span><select id="employeeAttendanceStatus" ${(approvedLeave||isAdvanceFiling)?"disabled":""}>${statusOptions.map(st=>`<option value="${st}" ${st===priorAttendance?"selected":""}>${st}</option>`).join("")}</select></label>
              <label class="field attendance-present-field"><span>Actual Time In</span><input id="employeeTimeIn" class="time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(prior?.timeIn||"")}" ${isAdvanceFiling?"disabled":""}></label>
              <label class="field attendance-present-field"><span>Actual Time Out</span><input id="employeeTimeOut" class="time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(prior?.timeOut||"")}" ${isAdvanceFiling?"disabled":""}></label>
              <label class="field employee-absence-type-field ${priorAttendance==="Absent"?"":"hidden"}"><span>Absent Type</span><select id="employeeAbsentType"><option value="AWOL" ${prior?.absentType==="AWOL"?"selected":""}>AWOL</option><option value="Emergency Absent" ${prior?.absentType==="Emergency Absent"?"selected":""}>Emergency Absent</option></select></label>
            </div>
            <div class="employee-attendance-metrics" id="employeeAttendanceMetrics">
              <div><span>Worked</span><strong id="employeeWorkedHours">${attendanceMetrics.workedHours.toFixed(2)} h</strong></div>
              <div><span>Regular</span><strong id="employeeRegularHours">${attendanceMetrics.regularHours.toFixed(2)} h</strong></div>
              <div><span>Late</span><strong id="employeeLateMinutes">${attendanceMetrics.lateMinutes?`${attendanceMetrics.lateMinutes} min`:"—"}</strong></div>
              <div><span>Undertime</span><strong id="employeeUndertimeMinutes">${attendanceMetrics.undertimeMinutes?`${attendanceMetrics.undertimeMinutes} min`:"—"}</strong></div>
            </div>
          </div>

          <div class="employee-attendance-section employee-ot-section">
            <div class="employee-section-heading"><div><span class="section-label">OVERTIME</span><h4>Overtime Details</h4><p>Optional. Leave this off if you have no OT.</p></div><label class="employee-ot-toggle"><input id="employeeHasOT" type="checkbox" ${hasOT?"checked":""} ${(priorAttendance!=="Present"||approvedLeave||isAdvanceFiling||otReviewLocked)?"disabled":""}><span>I rendered overtime</span></label></div>
            <div id="employeeOTFields" class="employee-ot-fields ${hasOT?"":"hidden"}">
              <div class="employee-ot-grid">
                <label class="field"><span>OT Type</span><select id="employeeOTType" ${(otReviewLocked||holiday)?"disabled":""}><option value="Regular Day" ${defaultOtType==="Regular Day"?"selected":""}>Regular Day</option><option value="Rest Day OT" ${defaultOtType==="Rest Day OT"?"selected":""}>Rest Day OT</option><option value="Special Holiday" ${defaultOtType==="Special Holiday"?"selected":""}>Special Holiday</option><option value="Regular Holiday" ${defaultOtType==="Regular Holiday"?"selected":""}>Regular Holiday</option></select></label>
                <label class="field"><span>OT In</span><input id="employeeOTStart" class="time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(hasOT?defaultOtStart:"")}" ${otReviewLocked?"disabled":""}></label>
                <label class="field"><span>OT Out</span><input id="employeeOTEnd" class="time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(prior?.normalOtEnd||"")}" ${otReviewLocked?"disabled":""}></label>
                <label class="employee-straight-duty-toggle"><input id="employeeStraightDuty" type="checkbox" ${prior?.straightDuty?"checked":""} ${otReviewLocked?"disabled":""}><span>Straight Duty</span></label>
              </div>
              <div id="employeeStraightDutyFields" class="employee-straight-duty-fields ${prior?.straightDuty?"":"hidden"}">
                <label class="field"><span>Straight Duty Schedule In</span><input id="employeeSDScheduleStart" class="time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(prior?.straightDutyScheduleStart||"")}" ${otReviewLocked?"disabled":""}></label>
                <label class="field"><span>Straight Duty Schedule Out</span><input id="employeeSDScheduleEnd" class="time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(prior?.straightDutyScheduleEnd||"")}" ${otReviewLocked?"disabled":""}></label>
                <label class="field"><span>Straight Duty OT In</span><input id="employeeSDOTStart" class="time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(prior?.straightDutyOtStart||"")}" ${otReviewLocked?"disabled":""}></label>
                <label class="field"><span>Straight Duty OT Out</span><input id="employeeSDOTEnd" class="time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(prior?.straightDutyOtEnd||"")}" ${otReviewLocked?"disabled":""}></label>
              </div>
              ${currentUser.department==="Maintenance"?`<div class="employee-maintenance-grid"><label class="field"><span>Equipment</span><select id="employeeMaintenanceEquipment"><option value="">Select equipment</option>${MAINTENANCE_EQUIPMENT.map(item=>`<option value="${escapeHtml(item.equipment)}" ${prior?.maintenanceEquipment===item.equipment?"selected":""}>${escapeHtml(item.equipment)}</option>`).join("")}</select></label><div class="employee-equipment-location"><span>Equipment Location</span><strong id="employeeMaintenanceEquipmentLocation">${escapeHtml(prior?.maintenanceEquipmentLocation||"—")}</strong></div></div>`:""}
              <div class="employee-ot-total"><span>Total OT Hours</span><strong id="employeeOTTotal">${prior?.hasOT?Number(prior.totalHours||0).toFixed(2):"0.00"}</strong><small id="employeeOTBreakdown"></small></div>
            </div>
          </div>

          <label class="field"><span>Reason / Remarks</span><textarea id="employeeAttendanceReason" rows="3" placeholder="Required for OT or absence; optional for normal attendance">${escapeHtml(prior?.reason||approvedLeave?.reason||"")}</textarea></label>
          <div class="employee-submit-footer"><div><strong>${scheduledDayOffNoHoliday?"Day Off — submit only if worked":isAdvanceFiling?"Advance OT → Supervisor Review":"Attendance + OT Filing"}</strong><span>${scheduledDayOffNoHoliday?"No attendance is required for your scheduled Day Off. If you worked, use Rest Day OT and submit your actual attendance + OT.":"Attendance remains in the attendance workflow. Any OT you file first goes to your Supervisor for Check/Edit/Reject; only checked OT goes to the Request Approver."}</span></div><button id="employeeAttendanceSubmit" class="btn btn-primary ${scheduledDayOffNoHoliday&&!prior?.hasOT?"hidden":""}" type="submit">${isAdvanceFiling?(prior?.hasOT?"Update Advance OT":"Submit Advance OT for Supervisor Review"):(prior?.hasOT&&scheduledDayOffNoHoliday?"Update Rest Day OT":prior?"Update Attendance & OT":"Submit Attendance & OT")}</button></div>
        </form>
      </div>
    </div>
    ${renderEmployeeOTSubmissionTable(employee.no,{title:"Recent OT Submissions",limit:5,showViewAll:true})}`;

  document.getElementById("employeeViewAllOTSubmissions")?.addEventListener("click",()=>{navigateTo("my-ot")});

  const dateInput=document.getElementById("employeeAttendanceDate");
  const statusInput=document.getElementById("employeeAttendanceStatus");
  const timeIn=document.getElementById("employeeTimeIn");
  const timeOut=document.getElementById("employeeTimeOut");
  const hasOTInput=document.getElementById("employeeHasOT");
  const otFields=document.getElementById("employeeOTFields");
  const otType=document.getElementById("employeeOTType");
  const otStart=document.getElementById("employeeOTStart");
  const otEnd=document.getElementById("employeeOTEnd");
  const straightDuty=document.getElementById("employeeStraightDuty");
  const straightFields=document.getElementById("employeeStraightDutyFields");
  const ownScheduleStart=document.getElementById("supervisorOwnScheduleStart");
  const ownScheduleEnd=document.getElementById("supervisorOwnScheduleEnd");
  const getActiveSchedule=()=>{
    if(!canEditOwnShiftTime)return schedule;
    const start=normalize24HourTime(ownScheduleStart?.value||schedule.start);
    const end=normalize24HourTime(ownScheduleEnd?.value||schedule.end);
    return {shift:schedule.shift,start,end};
  };

  const normalizeTimeInput=input=>{
    if(!input)return;
    input.addEventListener("input",()=>{
      let digits=input.value.replace(/\D/g,"").slice(0,4);
      input.value=digits.length>2?`${digits.slice(0,2)}:${digits.slice(2)}`:digits;
    });
    input.addEventListener("blur",()=>{
      const normalized=normalize24HourTime(input.value);
      if(normalized && isValid24HourTime(normalized)){input.value=normalized;input.classList.remove("invalid-time");}
      else if(input.value){input.classList.add("invalid-time");showToast("Use 24-hour HH:MM format (00:00–23:59).");}
      updateEmployeePreview();
    });
  };
  content.querySelectorAll(".time-24-input").forEach(normalizeTimeInput);

  const calculateOT=()=>{
    if(!hasOTInput?.checked || statusInput?.value!=="Present")return {total:0,scheduledOtHours:0,extraOtHours:0,fullDutyOt:false};
    const activeSchedule=getActiveSchedule();
    return proposedOTBreakdown({
      scheduleStart:activeSchedule.start,scheduleEnd:activeSchedule.end,
      normalOtStart:normalize24HourTime(otStart?.value||""),normalOtEnd:normalize24HourTime(otEnd?.value||""),
      otType:otType?.value||"Regular Day",otDate:dateKey,
      straightDuty:Boolean(straightDuty?.checked),
      straightDutyScheduleStart:normalize24HourTime(document.getElementById("employeeSDScheduleStart")?.value||""),
      straightDutyScheduleEnd:normalize24HourTime(document.getElementById("employeeSDScheduleEnd")?.value||""),
      straightDutyOtStart:normalize24HourTime(document.getElementById("employeeSDOTStart")?.value||""),
      straightDutyOtEnd:normalize24HourTime(document.getElementById("employeeSDOTEnd")?.value||"")
    });
  };
  const updateEmployeePreview=()=>{
    const status=statusInput?.value||defaultStatus;
    const present=status==="Present";
    content.querySelectorAll(".attendance-present-field").forEach(el=>el.classList.toggle("hidden",!present));
    document.querySelector(".employee-absence-type-field")?.classList.toggle("hidden",status!=="Absent");
    if(hasOTInput){hasOTInput.disabled=!present || Boolean(approvedLeave);if(!present)hasOTInput.checked=false;}
    otFields?.classList.toggle("hidden",!hasOTInput?.checked);
    straightFields?.classList.toggle("hidden",!(hasOTInput?.checked && straightDuty?.checked));
    const activeSchedule=getActiveSchedule();
    const metrics=calculateAttendanceMetrics({status,timeIn:normalize24HourTime(timeIn?.value||""),timeOut:normalize24HourTime(timeOut?.value||""),scheduleStart:activeSchedule.start,scheduleEnd:activeSchedule.end,isHoliday:Boolean(holiday),isDayOff});
    document.getElementById("employeeWorkedHours").textContent=`${metrics.workedHours.toFixed(2)} h`;
    document.getElementById("employeeRegularHours").textContent=`${metrics.regularHours.toFixed(2)} h`;
    document.getElementById("employeeLateMinutes").textContent=metrics.lateMinutes?`${metrics.lateMinutes} min`:"—";
    document.getElementById("employeeUndertimeMinutes").textContent=metrics.undertimeMinutes?`${metrics.undertimeMinutes} min`:"—";
    const breakdown=calculateOT();
    document.getElementById("employeeOTTotal").textContent=breakdown.total.toFixed(2);
    const breakdownEl=document.getElementById("employeeOTBreakdown");
    if(breakdownEl)breakdownEl.textContent=breakdown.fullDutyOt&&breakdown.total>0?`${breakdown.scheduledOtHours.toFixed(2)} schedule + ${breakdown.extraOtHours.toFixed(2)} extra`:"";
    const validRestDayWorkMode=present && Boolean(hasOTInput?.checked) && (otType?.value||"")==="Rest Day OT";
    document.getElementById("employeeAttendanceSubmit")?.classList.toggle("hidden",scheduledDayOffNoHoliday && !validRestDayWorkMode);
  };

  document.getElementById("employeeRestDayOTMode")?.addEventListener("click",()=>{
    if(statusInput)statusInput.value="Present";
    if(hasOTInput){hasOTInput.disabled=false;hasOTInput.checked=true;}
    if(otType)otType.value="Rest Day OT";
    if(otStart && !otStart.value)otStart.value=getActiveSchedule().start;
    updateEmployeePreview();
    timeIn?.focus();
    showToast("Rest Day OT mode opened. Enter your actual Time In/Out and OT details, then submit.");
  });

  dateInput?.addEventListener("change",()=>{
    const selected=String(dateInput.value||"").trim();
    if(!/^\d{4}-\d{2}-\d{2}$/.test(selected)){
      employeeAttendanceDateKey=dutyDateKey;
      rerenderRoleSelfServiceOT(employeeBase);
      return;
    }
    employeeAttendanceDateKey=selected;
    rerenderRoleSelfServiceOT(employeeBase);
  });
  statusInput?.addEventListener("change",updateEmployeePreview);
  [timeIn,timeOut,otStart,otEnd,ownScheduleStart,ownScheduleEnd].forEach(input=>["input","change"].forEach(evt=>input?.addEventListener(evt,updateEmployeePreview)));
  hasOTInput?.addEventListener("change",()=>{
    if(hasOTInput.checked && !otStart.value){const activeSchedule=getActiveSchedule();otStart.value=(holiday || (isDayOff && (otType?.value||"")==="Rest Day OT"))?activeSchedule.start:activeSchedule.end;}
    updateEmployeePreview();
  });
  otType?.addEventListener("change",()=>{
    if(isDayOff && !holiday && otType.value!=="Rest Day OT")showToast("This is your weekly Day Off. Use Rest Day OT if you worked.");
    if(hasOTInput?.checked){const activeSchedule=getActiveSchedule();otStart.value=(holiday || otType.value==="Rest Day OT")?activeSchedule.start:activeSchedule.end;}
    updateEmployeePreview();
  });
  straightDuty?.addEventListener("change",updateEmployeePreview);
  content.querySelectorAll("#employeeSDScheduleStart,#employeeSDScheduleEnd,#employeeSDOTStart,#employeeSDOTEnd").forEach(input=>["input","change"].forEach(evt=>input.addEventListener(evt,updateEmployeePreview)));
  document.getElementById("employeeMaintenanceEquipment")?.addEventListener("change",e=>{
    const item=MAINTENANCE_EQUIPMENT.find(x=>x.equipment===e.target.value);
    document.getElementById("employeeMaintenanceEquipmentLocation").textContent=item?.location||"—";
  });
  updateEmployeePreview();

  document.getElementById("employeeAttendanceOTForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const advanceSubmission=dateKey>toDateKey(new Date());
    const status=advanceSubmission?"":(approvedLeave?"Leave":(statusInput?.value||"Present"));
    const normalizedIn=normalize24HourTime(timeIn?.value||"");
    const normalizedOut=normalize24HourTime(timeOut?.value||"");
    const isPresent=!advanceSubmission && status==="Present";
    if(isPresent && (!isValid24HourTime(normalizedIn) || !isValid24HourTime(normalizedOut))){showToast("Enter valid Actual Time In and Time Out in HH:MM format.");return;}
    const reason=document.getElementById("employeeAttendanceReason")?.value.trim()||"";
    const activeSchedule=getActiveSchedule();
    if(canEditOwnShiftTime && (!isValid24HourTime(activeSchedule.start)||!isValid24HourTime(activeSchedule.end))){showToast("Enter valid Shift In and Shift Out in HH:MM format.");return;}
    const employeeHasOT=Boolean(hasOTInput?.checked && (isPresent || advanceSubmission));
    if(advanceSubmission && !employeeHasOT){showToast("Advance filing requires OT details.");return;}
    if(scheduledDayOffNoHoliday && !employeeHasOT){showToast("No attendance submission is needed on your scheduled Day Off. Submit only if you worked Rest Day OT.");return;}
    if((status==="Absent" || employeeHasOT) && !reason){showToast("Reason / Remarks is required for absence or overtime.");return;}

    const chosenOtType=holiday?getAutomaticOtType(dateKey,false):(otType?.value||"Regular Day");
    if(employeeHasOT && isDayOff && !holiday && chosenOtType!=="Rest Day OT"){showToast("This date is your weekly Day Off. Select Rest Day OT before submitting.");return;}
    const normalOtStart=employeeHasOT?normalize24HourTime(otStart?.value||""):"";
    const normalOtEnd=employeeHasOT?normalize24HourTime(otEnd?.value||""):"";
    const hasNormalOT=Boolean(normalOtStart||normalOtEnd);
    if(employeeHasOT && hasNormalOT && (!isValid24HourTime(normalOtStart)||!isValid24HourTime(normalOtEnd))){showToast("Complete OT In and OT Out using valid HH:MM time.");return;}

    const sdEnabled=Boolean(employeeHasOT && straightDuty?.checked);
    const sdScheduleStart=sdEnabled?normalize24HourTime(document.getElementById("employeeSDScheduleStart")?.value||""):"";
    const sdScheduleEnd=sdEnabled?normalize24HourTime(document.getElementById("employeeSDScheduleEnd")?.value||""):"";
    const sdOtStart=sdEnabled?normalize24HourTime(document.getElementById("employeeSDOTStart")?.value||""):"";
    const sdOtEnd=sdEnabled?normalize24HourTime(document.getElementById("employeeSDOTEnd")?.value||""):"";
    if(sdEnabled && [sdScheduleStart,sdScheduleEnd,sdOtStart,sdOtEnd].some(v=>!v||!isValid24HourTime(v))){showToast("Complete all Straight Duty schedule and OT time fields.");return;}

    const breakdown=employeeHasOT?proposedOTBreakdown({scheduleStart:activeSchedule.start,scheduleEnd:activeSchedule.end,normalOtStart,normalOtEnd,otType:chosenOtType,otDate:dateKey,straightDuty:sdEnabled,straightDutyScheduleStart:sdScheduleStart,straightDutyScheduleEnd:sdScheduleEnd,straightDutyOtStart:sdOtStart,straightDutyOtEnd:sdOtEnd}):{total:0,scheduledOtHours:0,extraOtHours:0};
    if(employeeHasOT && breakdown.total<=0){showToast("Enter valid overtime hours before submitting.");return;}

    let maintenanceEquipment="",maintenanceEquipmentLocation="";
    if(employee.department==="Maintenance" && employeeHasOT){
      maintenanceEquipment=document.getElementById("employeeMaintenanceEquipment")?.value||"";
      const item=MAINTENANCE_EQUIPMENT.find(x=>x.equipment===maintenanceEquipment);
      maintenanceEquipmentLocation=item?.location||"";
      if(!maintenanceEquipment){showToast("Select the equipment for this Maintenance OT.");return;}
    }

    const metrics=advanceSubmission?{workedHours:0,regularHours:0,lateMinutes:0,undertimeMinutes:0}:calculateAttendanceMetrics({status,timeIn:normalizedIn,timeOut:normalizedOut,scheduleStart:activeSchedule.start,scheduleEnd:activeSchedule.end,isHoliday:Boolean(holiday),isDayOff});
    // Employee filing is a submission for Supervisor review only.
    // Do NOT write to HR Daily Attendance here. The Supervisor commits attendance
    // only when the completed duty roster is finalized. Advance OT remains OT-only.

    const priorLinkedRequest=prior?.supervisorRequestId?getRequests().find(r=>r.id===prior.supervisorRequestId):latestOTRequestForEmployeeDate(employee.no,dateKey);
    const resubmittingRejectedOT=Boolean(employeeHasOT && priorLinkedRequest?.status==="Rejected");
    if(canEditOwnShiftTime)updateEmployeeShiftTime(employee.no,activeSchedule.start,activeSchedule.end);
    const saved=upsertEmployeeAttendanceOTSubmission({
      employeeNo:employee.no,employeeName:employee.name,position:employee.position||"",department:employee.department||currentUser.department,workArea:employee.location||"",schedule:schedule.shift,scheduleStart:activeSchedule.start,scheduleEnd:activeSchedule.end,employeeDayOff:employee.dayOff||"",date:dateKey,advanceOTFiling:advanceSubmission,
      attendanceStatus:status,attendanceType:status==="Absent"?(document.getElementById("employeeAbsentType")?.value||"AWOL"):status,absentType:status==="Absent"?(document.getElementById("employeeAbsentType")?.value||"AWOL"):"",leaveType:status==="Leave"?(approvedLeave?.leaveType||"Leave"):"",
      timeIn:isPresent?normalizedIn:"",timeOut:isPresent?normalizedOut:"",workedHours:metrics.workedHours,regularHours:metrics.regularHours,lateMinutes:metrics.lateMinutes,undertimeMinutes:metrics.undertimeMinutes,
      hasOT:employeeHasOT,otType:employeeHasOT?chosenOtType:"",normalOtStart:employeeHasOT?normalOtStart:"",normalOtEnd:employeeHasOT?normalOtEnd:"",straightDuty:sdEnabled,
      straightDutyScheduleStart:sdScheduleStart,straightDutyScheduleEnd:sdScheduleEnd,straightDutyOtStart:sdOtStart,straightDutyOtEnd:sdOtEnd,totalHours:Number(breakdown.total||0).toFixed(2),scheduledOtHours:Number(breakdown.scheduledOtHours||0).toFixed(2),extraOtHours:Number(breakdown.extraOtHours||0).toFixed(2),
      maintenanceEquipment,maintenanceEquipmentLocation,holidayName:holiday?.name||"",holidayClassification:holiday?.label||"",reason,submittedByEmployee:currentUser.username,submittedByEmployeeName:currentUser.displayName,submittedAt:new Date().toISOString(),
      supervisorOTReviewStatus:employeeHasOT?(otReviewLocked?(prior?.supervisorOTReviewStatus||"Forwarded"):"Pending"):"",supervisorOTReviewReason:otReviewLocked?(prior?.supervisorOTReviewReason||""):"",supervisorOTReviewedAt:otReviewLocked?(prior?.supervisorOTReviewedAt||""):"",supervisorOTReviewedBy:otReviewLocked?(prior?.supervisorOTReviewedBy||""):"",supervisorEditedAt:otReviewLocked?(prior?.supervisorEditedAt||""):"",supervisorEditedBy:otReviewLocked?(prior?.supervisorEditedBy||""):"",
      ...(resubmittingRejectedOT?{supervisorForwardedAt:"",supervisorForwardedBy:"",supervisorRequestId:"",approverRequestId:"",approverSubmittedAt:"",previousRejectedRequestId:priorLinkedRequest.id,resubmittedAfterRejectionAt:new Date().toISOString()}: {})
    });
    let directlyForwarded=null;
    if(employeeHasOT && directToApprover && !otReviewLocked){
      try{directlyForwarded=forwardEmployeeOTBySupervisor(employee.no,dateKey);}catch(error){showToast(error?.message||"OT was saved but could not be forwarded to the Request Approver.");}
    }
    showToast(employeeHasOT
      ? (directlyForwarded
          ? `${advanceSubmission?"Advance OT":"OT"} ${Number(saved.totalHours||0).toFixed(2)} hour(s) submitted directly to Request Approver.`
          : `${advanceSubmission?"Advance OT":"OT"} ${Number(saved.totalHours||0).toFixed(2)} hour(s) submitted to Supervisor for review.`)
      : (selfServiceMode?.type==="supervisor-own-ot"?"Your attendance was saved. No OT was filed.":"Attendance submitted for Supervisor review. No OT was filed."));
    rerenderRoleSelfServiceOT(employeeBase);
  });
}


function rerenderRoleSelfServiceOT(employeeBase){
  if(roleSelfServiceContext?.type==="supervisor-own-ot")return renderSupervisorOwnOTForm();
  return renderEmployeeAttendanceOT(employeeBase);
}
function renderSupervisorOwnOTForm(){
  const employee=getLinkedEmployeeRecordForAccount(currentUser);
  if(!employee){
    setPage("My New OT Request","SUPERVISOR OWN INPUT","Your Supervisor login must be linked to your HR Employee Master List record before you can file your own OT.");
    content.innerHTML=`${heroBanner("Supervisor own OT","Your login is not linked to an employee number yet.",0,"linked employee")}
      <div class="card"><div class="card-body">${emptyState("Supervisor employee record not linked","Ask IT to create/change your Supervisor access from your HR Employee Master List account so the login keeps your Employee No.")}<div style="margin-top:14px"><button id="backSupervisorOTReview" class="btn btn-secondary" type="button">← Back to New OT Request</button></div></div></div>`;
    document.getElementById("backSupervisorOTReview")?.addEventListener("click",()=>{roleSelfServiceContext=null;renderSupervisorEmployeeSubmittedOT();});
    return;
  }
  roleSelfServiceContext={type:"supervisor-own-ot",employeeNo:employee.no,directApprover:true};
  renderEmployeeAttendanceOT(employee);
  setPage("My New OT Request","SUPERVISOR OWN INPUT",`${employee.name} • ${employee.department} • Your OT goes directly to Request Approver after you submit it.`);
  content.insertAdjacentHTML("afterbegin",`<div class="card" style="margin-bottom:16px"><div class="card-body" style="display:flex;justify-content:space-between;gap:14px;align-items:center;flex-wrap:wrap"><div><span class="badge primary">Supervisor Own Entry</span><h3 style="margin:7px 0 3px">${escapeHtml(employee.name)}</h3><p class="muted" style="margin:0">${escapeHtml(employee.position||"—")} • ${escapeHtml(employee.department||currentUser.department)} • Employee No. ${escapeHtml(employee.no)}</p></div><button id="backSupervisorOTReview" class="btn btn-secondary" type="button">← Back to Department New OT Request</button></div></div>`);
  document.getElementById("backSupervisorOTReview")?.addEventListener("click",()=>{roleSelfServiceContext=null;renderSupervisorEmployeeSubmittedOT();});
}

function renderEmployee(){
  const employee=getCurrentEmployeeRecord();
  if(!employee){
    setPage("Employee Leave Account","LEAVE ONLY","This employee account is not linked to an employee record.");
    content.innerHTML=emptyState("Employee record not found","Ask HR to verify the employee number assigned to this login.");
    return;
  }
  const rows=getLeaveRequests().filter(r=>String(r.employeeNo)===String(employee.no)).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  const active=rows.filter(r=>["Pending Supervisor","Pending HR","Pending Request Approver"].includes(r.status));
  const approved=rows.filter(r=>r.status==="Approved");

  if(currentPage==="attendance-ot")return renderEmployeeAttendanceOT(employee);
  if(currentPage==="my-ot")return renderEmployeeOTHistory(employee);

  if(currentPage==="dashboard"){
    const employeeSchedule=getEmployeeAttendanceSchedule(employee);
    const employeeDashboardDateKey=toDateKey(new Date());
    const employeeDashboardDate=parseLocalDate(employeeDashboardDateKey);
    const todayWeekday=employeeDashboardDate.toLocaleDateString("en-PH",{weekday:"long"});
    const todayIsDayOff=Boolean(employee.dayOff && employee.dayOff===todayWeekday);
    const todayHoliday=getPhilippineHoliday(employeeDashboardDateKey);
    setPage("My Dashboard","EMPLOYEE SELF-SERVICE",`Dashboard date: ${formatDate(employeeDashboardDateKey)} • Today. Attendance & OT records still follow the employee's Actual Time In date.`);
    content.innerHTML=`
      ${heroBanner(escapeHtml(employee.name),`${escapeHtml(employee.position||"")} • ${escapeHtml(employee.department||"")}`,todayIsDayOff?"Day Off":"Today",todayIsDayOff?"scheduled day off today":"today's work schedule")}
      <div class="card employee-dayoff-card">
        <div class="card-header"><div class="card-title-group"><h3>My Work Schedule</h3><p>Your assigned work setup from the Supervisor.</p></div><span class="badge ${todayIsDayOff?"warning":"approved"}">${todayIsDayOff?"DAY OFF TODAY":"Assigned"}</span></div>
        <div class="card-body">
          <div class="employee-work-context employee-dashboard-work-context">
            <div><span>Department</span><strong>${escapeHtml(employee.department||"Not set")}</strong></div>
            <div><span>Work Area</span><strong>${escapeHtml(employee.location||"Not set")}</strong></div>
            <div><span>Shift</span><strong>${escapeHtml(employeeSchedule.shift||"Not set")}</strong></div>
            <div><span>Schedule</span><strong>${employeeSchedule.start&&employeeSchedule.end?`${escapeHtml(employeeSchedule.start)} – ${escapeHtml(employeeSchedule.end)}`:"Not set"}</strong></div>
            <div class="employee-dayoff-highlight"><span>My Day Off</span><strong>${escapeHtml(employee.dayOff||"Not set")}</strong></div>
            <div class="employee-holiday-highlight"><span>Holiday Today</span><strong>${todayHoliday?escapeHtml(todayHoliday.name):"No Holiday"}</strong>${todayHoliday?`<small>${escapeHtml(todayHoliday.label)}</small>`:""}</div>
          </div>
        </div>
      </div>
      ${renderEmployeeLeaveCredits(employee)}
      <div class="grid-2 employee-leave-dashboard-grid">
        <div class="card"><div class="card-header"><div class="card-title-group"><h3>Attendance & OT</h3><p>Employee-owned daily attendance input.</p></div></div><div class="card-body"><p class="muted">${todayIsDayOff?"Today is your scheduled Day Off. No attendance submission is required for today unless you actually work and later file Rest Day OT after duty.":"Attendance & OT filing is separate from this dashboard date. After duty is completed, confirm the calendar date of your Actual Time In; the record will be stored under that Time In date."}</p><button type="button" id="employeeAttendanceShortcut" class="btn btn-primary">${todayIsDayOff?"File Rest Day OT":"Open Attendance & OT"}</button></div></div>
        <div class="card"><div class="card-header"><div class="card-title-group"><h3>My OT Submissions</h3><p>Check the OT you already filed.</p></div></div><div class="card-body">${(()=>{const otRows=getEmployeeOTSubmissionHistory(employee.no);const approvedOT=otRows.filter(r=>r.displayOTStatus==="Approved").length;const rejectedOT=otRows.filter(r=>String(r.displayOTStatus||"").startsWith("Rejected")).length;const inProcessOT=otRows.filter(r=>r.displayOTStatus!=="Approved"&&!String(r.displayOTStatus||"").startsWith("Rejected")).length;return `<div class="mini-list"><div class="mini-item"><div><strong>${otRows.length}</strong><span>Total OT filed</span></div></div><div class="mini-item"><div><strong>${approvedOT}</strong><span>Approved</span></div></div><div class="mini-item"><div><strong>${inProcessOT}</strong><span>In process</span></div></div><div class="mini-item"><div><strong>${rejectedOT}</strong><span>Rejected</span></div></div></div>`})()}<button type="button" id="employeeOTHistoryShortcut" class="btn btn-light">View My OT Submissions</button></div></div>
        <div class="card"><div class="card-header"><div class="card-title-group"><h3>File a Leave</h3><p>Submit your own VL, SL, or Emergency Leave request.</p></div></div><div class="card-body"><p class="muted">Your request goes first to the ${escapeHtml(employee.department)} Supervisor.</p><button type="button" id="employeeFileLeaveShortcut" class="btn btn-light">＋ File Leave Request</button></div></div>
        <div class="card"><div class="card-header"><div class="card-title-group"><h3>Leave Summary</h3><p>Your request history</p></div></div><div class="card-body"><div class="mini-list"><div class="mini-item"><div><strong>${rows.length}</strong><span>Total requests</span></div></div><div class="mini-item"><div><strong>${active.length}</strong><span>Still in approval</span></div></div><div class="mini-item"><div><strong>${approved.length}</strong><span>Fully approved</span></div></div></div></div></div>
      </div>
      ${renderEmployeeLeaveTable(rows.slice(0,1),"Recent Leave Requests",{showViewAll:true})}`;
    document.getElementById("employeeAttendanceShortcut")?.addEventListener("click",()=>{navigateTo("attendance-ot")});
    document.getElementById("employeeOTHistoryShortcut")?.addEventListener("click",()=>{navigateTo("my-ot")});
    document.getElementById("employeeFileLeaveShortcut")?.addEventListener("click",()=>{navigateTo("file-leave")});
    document.getElementById("employeeViewAllLeaveRequests")?.addEventListener("click",()=>{employeeLeaveHistoryPage=1;navigateTo("my-leave")});
    bindOwnLeaveEditButtons();
    return;
  }

  if(currentPage==="file-leave"){
    const todayKey=toDateKey(new Date());
    const status=normalizeEmploymentStatus(employee.employmentStatus,employee.isCustom);
    setPage("File Leave","EMPLOYEE LEAVE FILING","Submit a leave request to your department Supervisor.");
    content.innerHTML=`
      ${heroBanner("File VL / SL / Emergency Leave",`This account can file leave only. Your request goes to the ${escapeHtml(employee.department)} Supervisor first.`,rows.length,"leave request(s) filed")}
      ${renderEmployeeLeaveCredits(employee)}
      <div class="grid-2 leave-workflow-grid employee-file-leave-grid">
        <div class="card">
          <div class="card-header"><div class="card-title-group"><h3>New Leave Request</h3><p>${escapeHtml(employee.name)} • ${escapeHtml(employee.no)}</p></div><span class="badge pending">Employee Filing</span></div>
          <div class="card-body">
            <form id="employeeLeaveRequestForm" class="leave-request-form">
              <div class="employee-leave-identity"><div><span>Employee</span><strong>${escapeHtml(employee.name)}</strong></div><div><span>Position</span><strong>${escapeHtml(employee.position||"—")}</strong></div><div><span>Department</span><strong>${escapeHtml(employee.department||"—")}</strong></div></div>
              <label class="field"><span>Leave Type</span><select id="employeeLeaveType" required><option value="VL">VL — Vacation Leave</option><option value="SL">SL — Sick Leave</option><option value="Emergency Leave">Emergency Leave</option></select></label>
              <label class="field"><span>Leave Pay</span><select id="employeeLeavePayType" required><option value="With Pay" ${status==="Regular"?"":"disabled"}>With Pay</option><option value="Without Pay" ${status==="Regular"?"":"selected"}>Without Pay</option></select></label>
              <div class="leave-credit-summary" id="employeeLeaveCreditPreview"><div><span>Selected Credit Balance</span><strong id="employeeLeaveCreditBalance">—</strong></div><div><span>Pending Reserved</span><strong id="employeeLeaveCreditReserved">—</strong></div><div><span>Requested Days</span><strong id="employeeLeaveCreditRequested">1</strong></div><div><span>Balance After Approval</span><strong id="employeeLeaveCreditAfter">—</strong></div></div>
              <div class="leave-date-grid"><label class="field"><span>Leave From</span><input id="employeeLeaveStartDate" type="date" min="${todayKey}" value="${todayKey}" required></label><label class="field"><span>Leave To</span><input id="employeeLeaveEndDate" type="date" min="${todayKey}" value="${todayKey}" required></label></div>
              <label class="field"><span>Reason</span><select id="employeeLeaveReason" required><option value="">Select reason</option><option value="Emergency">Emergency</option><option value="Going to province">Going to province</option><option value="Not feeling well">Not feeling well</option><option value="Important Matter">Important Matter</option><option value="Flood/Heavy Rain that Causes Flood">Flood/Heavy Rain that Causes Flood</option></select></label>
              <button class="btn btn-primary" type="submit">Submit Leave Request to Supervisor</button>
            </form>
          </div>
        </div>
        <div class="card"><div class="card-header"><div class="card-title-group"><h3>Before You Submit</h3><p>Leave-credit rules</p></div></div><div class="card-body"><div class="leave-workflow-steps"><div><b>1</b><span><strong>Regular employee credits</strong><small>VL = 5 and SL = 5. Paid leave uses the selected credit after final approval.</small></span></div><div><b>2</b><span><strong>Pending requests reserve credits</strong><small>This prevents filing more paid leave than the available balance.</small></span></div><div><b>3</b><span><strong>No deduction on rejection</strong><small>Credits are deducted only when the Request Approver gives final approval.</small></span></div><div><b>4</b><span><strong>Automatic payroll leave</strong><small>When a fully approved leave date arrives, the employee is automatically marked Leave — VL / SL / Emergency Leave.</small></span></div></div></div></div>
      </div>`;

    const typeInput=document.getElementById("employeeLeaveType");
    const payInput=document.getElementById("employeeLeavePayType");
    const startInput=document.getElementById("employeeLeaveStartDate");
    const endInput=document.getElementById("employeeLeaveEndDate");
    const updatePreview=()=>{
      const leaveType=typeInput?.value||"VL";
      const requestedDays=leaveRequestDayCount(startInput?.value||todayKey,endInput?.value||startInput?.value||todayKey)||1;
      const summary=getEmployeeLeaveCreditSummary(employee.no,status);
      const creditLeave=leaveType==="VL" || leaveType==="SL";
      const withPayOption=payInput?.querySelector('option[value="With Pay"]');
      if(withPayOption)withPayOption.disabled=status!=="Regular" || !creditLeave;
      if(!creditLeave && payInput)payInput.value="Without Pay";
      const remaining=leaveType==="VL"?summary.remainingVL:leaveType==="SL"?summary.remainingSL:0;
      const reserved=leaveType==="VL"?summary.reservedVL:leaveType==="SL"?summary.reservedSL:0;
      const available=leaveType==="VL"?summary.availableVL:leaveType==="SL"?summary.availableSL:0;
      const withPay=payInput?.value==="With Pay";
      document.getElementById("employeeLeaveCreditBalance").textContent=creditLeave&&status==="Regular"?`${Number(remaining).toFixed(2)} ${leaveType}`:"N/A";
      document.getElementById("employeeLeaveCreditReserved").textContent=creditLeave&&status==="Regular"?`${Number(reserved).toFixed(2)} pending`:"N/A";
      document.getElementById("employeeLeaveCreditRequested").textContent=creditLeave?String(requestedDays):"N/A";
      document.getElementById("employeeLeaveCreditAfter").textContent=creditLeave&&status==="Regular"&&withPay?`${Math.max(0,Number(available)-requestedDays).toFixed(2)} ${leaveType}`:(creditLeave&&withPay?"Not eligible":"No deduction");
    };
    startInput?.addEventListener("change",()=>{if(endInput){endInput.min=startInput.value||todayKey;if(!endInput.value||endInput.value<startInput.value)endInput.value=startInput.value;}updatePreview();});
    endInput?.addEventListener("change",updatePreview);
    typeInput?.addEventListener("change",updatePreview);
    payInput?.addEventListener("change",updatePreview);
    updatePreview();

    document.getElementById("employeeLeaveRequestForm")?.addEventListener("submit",e=>{
      e.preventDefault();
      const leaveType=typeInput?.value||"VL";
      const creditLeave=leaveType==="VL" || leaveType==="SL";
      const payType=creditLeave?(payInput?.value||"Without Pay"):"Without Pay";
      const startDate=startInput?.value||"";
      const endDate=endInput?.value||"";
      const reason=document.getElementById("employeeLeaveReason")?.value||"";
      if(!startDate||!endDate){showToast("Select the leave date.");return;}
      if(startDate<todayKey){showToast("Leave requests cannot be filed for a past date.");return;}
      if(endDate<startDate){showToast("Leave To cannot be earlier than Leave From.");return;}
      if(!reason){showToast("Select the leave reason.");return;}
      const requestedCreditDays=leaveRequestDayCount(startDate,endDate);
      if(payType==="With Pay"){
        if(!creditLeave){showToast("Emergency Leave does not use VL / SL credits and is filed Without Pay.");return;}
        if(status!=="Regular"){showToast("Only Regular employees can file VL / SL With Pay.");return;}
        const summary=getEmployeeLeaveCreditSummary(employee.no,status);
        const available=leaveType==="VL"?summary.availableVL:summary.availableSL;
        if(requestedCreditDays>available){showToast(`You have only ${Number(available).toFixed(2)} ${leaveType} credit(s) available after pending requests.`);return;}
      }
      const overlapping=getLeaveRequests().find(r=>String(r.employeeNo)===String(employee.no) && ["Pending Supervisor","Pending HR","Pending Request Approver","Approved"].includes(r.status) && !(endDate<r.startDate || startDate>r.endDate));
      if(overlapping){showToast("You already have an active leave request covering that date.");return;}
      const conflictingPayroll=getRequests().find(r=>String(r.employeeNo)===String(employee.no) && r.otDate>=startDate && r.otDate<=endDate && ["Pending","Approved"].includes(r.status));
      if(conflictingPayroll){showToast(`You already have an OT/payroll record on ${formatDate(conflictingPayroll.otDate)}.`);return;}
      const supervisor=getSupervisorForDepartment(employee.department);
      if(!supervisor){showToast("No Supervisor account is assigned to your department.");return;}
      const request={
        id:`LV-${Date.now()}-${Math.floor(Math.random()*1000)}`,
        employeeNo:employee.no,
        employeeName:employee.name,
        position:employee.position,
        department:employee.department,
        supervisorName:supervisor.displayName,
        submittedBy:currentUser.username,
        filedByRole:"Employee",
        filedByName:employee.name,
        leaveType,
        payType,
        requestedCreditDays:payType==="With Pay"?requestedCreditDays:0,
        creditChargedDays:0,
        startDate,endDate,reason,
        status:"Pending Supervisor",
        createdAt:new Date().toISOString(),
        supervisorReviewedBy:"",supervisorReviewedAt:"",supervisorRemarks:"",
        hrReviewedBy:"",hrReviewedAt:"",hrRemarks:"",
        gmReviewedBy:"",gmReviewedAt:"",gmRemarks:""
      };
      const all=getLeaveRequests();all.unshift(request);saveLeaveRequests(all);addSupervisorLeaveSubmissionNotification(request);addEmployeeLeaveNotification(request,"submitted");
      showToast(payType==="With Pay"?`Leave submitted to your Supervisor. ${requestedCreditDays} ${leaveType} credit day(s) are reserved while approval is pending.`:"Leave submitted to your Supervisor as Without Pay.");
      employeeLeaveHistoryPage=1;navigateTo("my-leave");updateEmployeeLeaveNotificationUI();updateSupervisorEmployeeNotificationUI();
    });
    return;
  }

  setPage("My Leave Requests","EMPLOYEE LEAVE STATUS","Track Supervisor, HR, and Request Approver decisions.");
  const pageSize=5;
  const totalPages=Math.max(1,Math.ceil(rows.length/pageSize));
  employeeLeaveHistoryPage=Math.min(Math.max(1,employeeLeaveHistoryPage),totalPages);
  const pageStart=(employeeLeaveHistoryPage-1)*pageSize;
  const pageRows=rows.slice(pageStart,pageStart+pageSize);
  content.innerHTML=`${heroBanner("My Leave Requests","See the current status and reviewer details for every leave you filed.",rows.length,"total leave request(s)")}${renderEmployeeLeaveCredits(employee)}${renderEmployeeLeaveTable(pageRows,"All Leave Requests",{pagination:{page:employeeLeaveHistoryPage,totalPages,totalItems:rows.length}})}`;
  document.getElementById("employeeLeavePrevPage")?.addEventListener("click",()=>{if(employeeLeaveHistoryPage>1){employeeLeaveHistoryPage-=1;renderPage();}});
  document.getElementById("employeeLeaveNextPage")?.addEventListener("click",()=>{if(employeeLeaveHistoryPage<totalPages){employeeLeaveHistoryPage+=1;renderPage();}});
  bindOwnLeaveEditButtons();
}

function renderLeaveApprovalPage(role){
  const isHR=role==="HR";
  const pendingStatus=isHR?"Pending HR":"Pending Request Approver";
  const allRows=getLeaveRequests().sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  // HR sees requests only after Supervisor approval; Request Approver sees requests only after HR approval.
  const eligibleRows=isHR
    ? allRows.filter(r=>["Pending HR","Pending Request Approver","Approved","Rejected by HR","Rejected by Request Approver"].includes(r.status))
    : allRows.filter(r=>["Pending Request Approver","Approved","Rejected by Request Approver"].includes(r.status));
  const leaveSearchNeedle=isHR?String(hrLeaveSearch||"").trim().toLowerCase():"";
  const rows=eligibleRows.filter(r=>{
    if(!isHR)return true;
    const matchesSearch=!leaveSearchNeedle || [r.id,r.employeeName,r.employeeNo,r.position,r.leaveType,r.reason].join(" ").toLowerCase().includes(leaveSearchNeedle);
    const matchesDepartment=!hrLeaveDepartment || r.department===hrLeaveDepartment;
    const matchesStatus=!hrLeaveStatus || r.status===hrLeaveStatus;
    return matchesSearch&&matchesDepartment&&matchesStatus;
  });
  const pending=rows.filter(r=>r.status===pendingStatus);
  const filterBar=isHR?`<div class="card" style="margin-bottom:16px"><div class="card-body"><div class="filters" style="align-items:end">
    <label class="field" style="margin:0;min-width:240px"><span>Search</span><input id="hrLeaveSearch" type="search" placeholder="Employee / ID / leave type / reason..." value="${escapeHtml(hrLeaveSearch)}"></label>
    <label class="field" style="margin:0;min-width:200px"><span>Department</span><select id="hrLeaveDepartment"><option value="">All Departments</option>${DEPARTMENTS.map(d=>`<option value="${escapeHtml(d)}" ${hrLeaveDepartment===d?"selected":""}>${escapeHtml(d)}</option>`).join("")}</select></label>
    <label class="field" style="margin:0;min-width:220px"><span>Status</span><select id="hrLeaveStatus"><option value="">All Statuses</option>${["Pending HR","Pending Request Approver","Approved","Rejected by HR","Rejected by Request Approver"].map(st=>`<option value="${escapeHtml(st)}" ${hrLeaveStatus===st?"selected":""}>${escapeHtml(st)}</option>`).join("")}</select></label>
    <button id="applyHRLeaveSearch" class="btn btn-primary" type="button">Search</button>
    <button id="clearHRLeaveFilters" class="btn btn-secondary" type="button" ${(hrLeaveSearch||hrLeaveDepartment||hrLeaveStatus)?"":"disabled"}>Clear Filters</button>
    <button id="downloadHRLeaveExcel" class="btn btn-success" type="button">⇩ Download Excel</button>
  </div><p class="muted" style="margin:10px 0 0">Excel exports only the leave records currently matched by these filters.</p></div></div>`:"";
  setPage(isHR?"Leave Approval — HR":"Leave Approval — Request Approver",isHR?"HR LEAVE REVIEW":"FINAL LEAVE APPROVAL",isHR?"Review employee-filed VL/SL requests already approved by the department Supervisor.":"Final approval for standard employee leave and Supervisor self-filed leave sent directly to the Request Approver.");
  content.innerHTML=`
    ${heroBanner(
      isHR?"HR leave approval queue":"Final leave approval queue",
      isHR?"HR is the second approval step after Supervisor review. Approved requests are automatically forwarded to the Request Approver.":"Request Approver gives the final approval for standard employee leave and Supervisor self-filed leave. The final decision is automatically returned by notification.",
      pending.length,
      "leave request(s) awaiting action"
    )}
    <div class="stats-grid">
      ${statCard("For Approval",pending.length,pendingStatus,"warning")}
      ${statCard("Fully Approved",rows.filter(r=>r.status==="Approved").length,"Final Request Approver-approved requests","success")}
      ${statCard("Rejected",rows.filter(r=>r.status.startsWith("Rejected")).length,"HR / Request Approver rejected")}
      ${statCard("Workflow",isHR?"Step 2 / 3 approvals":"Final Approval",isHR?"After Supervisor approval":"Standard + Supervisor direct leave","primary")}
    </div>
    ${filterBar}
    <div class="card">
      <div class="card-header"><div class="card-title-group"><h3>${pending.length?"Pending Leave Requests":"Leave Request History"}</h3><p>${isHR?"Employee → Supervisor → HR → Request Approver":"Standard: Supervisor + HR → Request Approver • Supervisor own leave: Direct → Request Approver"}</p></div></div>
      <div class="table-wrap leave-table-wrap">
        <table class="leave-request-table">
          <thead><tr><th>Request</th><th>Employee</th><th>Department</th><th>Type</th><th>Leave Date</th><th>Reason</th><th>Supervisor Review</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>${rows.length?rows.map(r=>{
            const actionable=r.status===pendingStatus;
            return `<tr class="${actionable?"leave-action-row":""}">
              <td><span class="request-id">${escapeHtml(r.id)}</span><br><small>${formatDateTime(r.createdAt)}</small></td>
              <td><strong>${escapeHtml(r.employeeName)}</strong><br><small class="muted">${escapeHtml(r.position||"")}</small></td>
              <td>${departmentBadge(r.department)}</td>
              <td><span class="leave-type-badge">${escapeHtml(r.leaveType)}</span><br><small class="muted">${escapeHtml(r.payType||"Without Pay")}${isPaidLeaveRequest(r)?` • ${escapeHtml(String(r.requestedCreditDays??leaveRequestDayCount(r.startDate,r.endDate)))} day(s)`:""}</small></td>
              <td>${formatDate(r.startDate)}${r.endDate!==r.startDate?`<br><small>to ${formatDate(r.endDate)}</small>`:""}</td>
              <td class="wrap-cell">${escapeHtml(r.reason||"")}</td>
              <td>${r.directToRequestApprover?`<strong>${escapeHtml(r.filedByName||r.supervisorReviewedBy||"Supervisor")}</strong><br><small>Self-filed • Direct to Request Approver</small>`:(r.supervisorReviewedAt?`<strong>${escapeHtml(r.supervisorReviewedBy||r.supervisorName||"Supervisor")}</strong><br><small>${formatDateTime(r.supervisorReviewedAt)}</small>${r.supervisorRemarks?`<br><small>${escapeHtml(r.supervisorRemarks)}</small>`:""}`:"—")}</td>
              <td>${leaveStatusBadge(r.status)}</td>
              <td>${actionable?`<div class="actions"><button type="button" class="btn btn-success btn-sm" data-leave-review="approve" data-id="${escapeHtml(r.id)}">Approve</button><button type="button" class="btn btn-danger btn-sm" data-leave-review="reject" data-id="${escapeHtml(r.id)}">Reject</button></div>`:`<small class="muted">${r.status==="Approved"?"Completed":"No action"}</small>`}</td>
            </tr>`;
          }).join(""):`<tr><td colspan="9">${emptyState("No leave requests","There are no leave requests in the workflow yet.")}</td></tr>`}</tbody>
        </table>
      </div>
    </div>`;
  if(isHR){
    const applyLeaveFilters=()=>{
      hrLeaveSearch=String(document.getElementById("hrLeaveSearch")?.value||"").trim();
      hrLeaveDepartment=document.getElementById("hrLeaveDepartment")?.value||"";
      hrLeaveStatus=document.getElementById("hrLeaveStatus")?.value||"";
      renderHRLeaveOTCombined();
    };
    document.getElementById("applyHRLeaveSearch")?.addEventListener("click",applyLeaveFilters);
    document.getElementById("hrLeaveSearch")?.addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();applyLeaveFilters();}});
    document.getElementById("hrLeaveDepartment")?.addEventListener("change",applyLeaveFilters);
    document.getElementById("hrLeaveStatus")?.addEventListener("change",applyLeaveFilters);
    document.getElementById("clearHRLeaveFilters")?.addEventListener("click",()=>{hrLeaveSearch="";hrLeaveDepartment="";hrLeaveStatus="";renderHRLeaveOTCombined();});
    document.getElementById("downloadHRLeaveExcel")?.addEventListener("click",()=>exportHRLeaveExcel(rows,{search:hrLeaveSearch,department:hrLeaveDepartment,status:hrLeaveStatus}));
  }
  document.querySelectorAll("[data-leave-review]").forEach(btn=>btn.addEventListener("click",()=>openLeaveReviewModal(btn.dataset.id,role,btn.dataset.leaveReview)));
}

function openLeaveReviewModal(id,role,action){
  const request=getLeaveRequestById(id);if(!request)return;
  const isHR=role==="HR";
  const expectedStatus=isHR?"Pending HR":"Pending Request Approver";
  if(request.status!==expectedStatus)return;
  const approving=action==="approve";
  const reviewerLabel=isHR?"HR":"Request Approver";
  modalRoot.innerHTML=`
    <div class="modal-backdrop" id="leaveReviewBackdrop"><div class="modal">
      <div class="modal-header"><span>${escapeHtml(reviewerLabel.toUpperCase())} LEAVE REVIEW</span><h3>${approving?"Approve":"Reject"} ${escapeHtml(request.leaveType)} Request</h3></div>
      <div class="modal-body">
        <div class="note-box"><strong>${escapeHtml(request.employeeName)}</strong> • ${escapeHtml(request.department)}<br>${escapeHtml(request.leaveType)} • ${escapeHtml(request.payType||"Without Pay")} • ${formatDate(request.startDate)}${request.endDate!==request.startDate?` – ${formatDate(request.endDate)}`:""}<br>${isPaidLeaveRequest(request)?`<small>${escapeHtml(String(request.requestedCreditDays??leaveRequestDayCount(request.startDate,request.endDate)))} leave credit day(s) requested</small><br>`:""}<small>${escapeHtml(request.reason)}</small></div>
        ${isPaidLeaveRequest(request)?(()=>{const credit=getEmployeeLeaveCreditSummary(request.employeeNo);const remaining=request.leaveType==="VL"?credit.remainingVL:credit.remainingSL;return `<div class="leave-credit-summary" style="margin-top:12px"><div><span>Current ${escapeHtml(request.leaveType)} Balance</span><strong>${Number(remaining).toFixed(2)}</strong></div><div><span>Deduct on Final Approval</span><strong>${escapeHtml(String(request.requestedCreditDays??leaveRequestDayCount(request.startDate,request.endDate)))}</strong></div></div>`})():""}
        <label class="field" style="margin-top:14px"><span>${reviewerLabel} Remarks ${approving?"(Optional)":"(Required)"}</span><textarea id="leaveReviewRemarks" rows="4" placeholder="${approving?"Optional approval note...":"Enter rejection reason..."}"></textarea></label>
      </div>
      <div class="modal-footer"><button type="button" class="btn btn-light" id="cancelLeaveReview">Cancel</button><button type="button" class="btn ${approving?"btn-success":"btn-danger"}" id="confirmLeaveReview">Confirm ${approving?"Approval":"Rejection"}</button></div>
    </div></div>`;
  const close=()=>modalRoot.innerHTML="";
  document.getElementById("cancelLeaveReview")?.addEventListener("click",close);
  document.getElementById("leaveReviewBackdrop")?.addEventListener("click",e=>{if(e.target.id==="leaveReviewBackdrop")close()});
  document.getElementById("confirmLeaveReview")?.addEventListener("click",()=>{
    const remarks=document.getElementById("leaveReviewRemarks")?.value.trim()||"";
    if(!approving && !remarks){showToast("Remarks are required when rejecting a leave request.");return;}
    const all=getLeaveRequests();const item=all.find(r=>r.id===id);if(!item)return;
    const now=new Date().toISOString();
    if(isHR){
      item.hrReviewedBy=currentUser.displayName;item.hrReviewedAt=now;item.hrRemarks=remarks;
      if(approving){item.status="Pending Request Approver";saveLeaveRequests(all);addManagerLeaveNotification(item);addEmployeeLeaveNotification(item,"hr-approved");showToast("Leave approved by HR and forwarded to the Request Approver.");}
      else{item.status="Rejected by HR";saveLeaveRequests(all);addSupervisorLeaveDecisionNotification(item,"rejected");addEmployeeLeaveNotification(item,"hr-rejected");showToast("Leave rejected. Supervisor and employee notified.");}
    }else{
      item.gmReviewedBy=currentUser.displayName;item.gmReviewedAt=now;item.gmRemarks=remarks;
      if(approving){
        let creditCharge=0;
        if(isPaidLeaveRequest(item)){
          const employee=getEmployeeByNo(item.employeeNo) || {};
          const employeeStatus=normalizeEmploymentStatus(employee.employmentStatus,employee.isCustom);
          if(employeeStatus!=="Regular"){showToast("This employee is no longer Regular. Paid VL / SL cannot be approved until HR updates the leave request.");return;}
          creditCharge=Math.max(0,Number(item.requestedCreditDays??leaveRequestDayCount(item.startDate,item.endDate))||0);
          const credit=getEmployeeLeaveCreditSummary(item.employeeNo,employeeStatus);
          const remaining=item.leaveType==="VL"?credit.remainingVL:credit.remainingSL;
          if(creditCharge>remaining){showToast(`Insufficient ${item.leaveType} credit. Remaining balance is ${Number(remaining).toFixed(2)}.`);return;}
        }
        item.status="Approved";
        item.finalApprovedAt=now;
        item.creditChargedDays=creditCharge;
        item.creditDeductedAt=creditCharge>0?now:"";
        saveLeaveRequests(all);
        syncApprovedLeaveAttendanceRecords(item);
        addSupervisorLeaveDecisionNotification(item,"approved");
        addEmployeeLeaveNotification(item,"final-approved");
        const balanceAfter=creditCharge>0?getEmployeeLeaveCreditSummary(item.employeeNo):null;
        const after=item.leaveType==="VL"?balanceAfter?.remainingVL:balanceAfter?.remainingSL;
        showToast(creditCharge>0?`Leave fully approved. ${creditCharge} ${item.leaveType} credit(s) deducted. Remaining: ${Number(after||0).toFixed(2)}.`:"Leave fully approved. It will auto-activate in New OT Request on the leave date.");
      }
      else{item.status="Rejected by Request Approver";item.creditChargedDays=0;item.creditDeductedAt="";saveLeaveRequests(all);addSupervisorLeaveDecisionNotification(item,"rejected");addEmployeeLeaveNotification(item,"final-rejected");showToast("Leave rejected. No leave credit was deducted. Supervisor and employee notified.");}
    }
    close();buildNavigation();
    if(isHR)renderHRLeaveOTCombined();
    else renderLeaveApprovalPage(role);
    updateManagerNotificationUI();updateHRNotificationUI();updateSupervisorEmployeeNotificationUI();
  });
}

function finalizeSupervisorBlankAttendance(department,dateKey,employees,submissions){
  const todayKey=toDateKey(new Date());
  // Today and future dates are not completed duty dates in the Supervisor UI.
  if(dateKey>=todayKey)return {attendance:0,absent:0,dayOff:0,holiday:0,leave:0,skippedFuture:true};
  const dept=normalizeDepartmentName(department);
  const validSubmissions=(submissions||[]).filter(r=>
    normalizeDepartmentName(r.department)===dept && r.date===dateKey &&
    !r.advanceOTFiling && Boolean(r.attendanceStatus)
  );
  const submitted=new Set(validSubmissions.map(r=>String(r.employeeNo)));
  const holiday=getPhilippineHoliday(dateKey);
  const weekday=parseLocalDate(dateKey).toLocaleDateString("en-PH",{weekday:"long"});
  const result={attendance:0,absent:0,dayOff:0,holiday:0,leave:0,skippedFuture:false};

  // Commit employee-filed attendance to HR only at Supervisor finalization.
  validSubmissions.forEach(sub=>{
    const emp=(employees||[]).find(e=>String(e.no)===String(sub.employeeNo)) || getEmployeeByNo(sub.employeeNo) || {};
    const schedule=getEmployeeAttendanceSchedule({...emp,schedule:sub.schedule||emp.schedule});
    const status=sub.attendanceStatus||"Present";
    upsertDailyAttendanceRecord({
      source:"Supervisor Finalized Employee Submission",
      sourceEmployeeSubmission:true,
      sourceEmployeeSubmissionId:sub.id||"",
      employeeNo:sub.employeeNo,employeeName:sub.employeeName||emp.name||"",position:sub.position||emp.position||"",department,
      date:dateKey,shift:sub.schedule||schedule.shift,scheduleStart:sub.scheduleStart||schedule.start,scheduleEnd:sub.scheduleEnd||schedule.end,employeeDayOff:sub.employeeDayOff||emp.dayOff||"",
      status,attendanceType:sub.attendanceType||status,leaveType:sub.leaveType||"",absentType:sub.absentType||"",
      timeIn:sub.timeIn||"",timeOut:sub.timeOut||"",workedHours:Number(sub.workedHours||0),regularHours:Number(sub.regularHours||0),
      lateMinutes:Number(sub.lateMinutes||0),undertimeMinutes:Number(sub.undertimeMinutes||0),approvedOtHours:getApprovedOTHoursForEmployeeDate(sub.employeeNo,dateKey),
      holidayName:sub.holidayName||holiday?.name||"",holidayClassification:sub.holidayClassification||holiday?.label||"",remarks:sub.reason||"",
      recordedBy:currentUser?.displayName||"Supervisor",supervisorFinalizedAt:new Date().toISOString()
    });
    result.attendance++;
  });

  const existingRows=getDailyAttendanceRecords().filter(r=>normalizeDepartmentName(r.department)===dept && r.date===dateKey);
  const existingMap=new Map(existingRows.map(r=>[String(r.employeeNo),r]));
  (employees||[]).filter(emp=>isEmployeeSetupComplete(emp)).forEach(emp=>{
    const employeeNo=String(emp.no);
    if(submitted.has(employeeNo))return;
    const existing=existingMap.get(employeeNo);
    const approvedLeave=getApprovedLeaveForEmployeeDate(emp.no,dateKey);
    const schedule=getEmployeeAttendanceSchedule(emp);

    if(approvedLeave){
      if(!existing || existing.status!=="Leave"){
        upsertDailyAttendanceRecord({
          source:"Approved Leave",sourceLeaveRequestId:approvedLeave.id||"",employeeNo:emp.no,employeeName:emp.name,position:emp.position||"",department,
          date:dateKey,shift:schedule.shift,scheduleStart:schedule.start,scheduleEnd:schedule.end,employeeDayOff:emp.dayOff||"",
          status:"Leave",attendanceType:approvedLeave.leaveType||"Leave",leaveType:approvedLeave.leaveType||"",absentType:"",timeIn:"",timeOut:"",
          workedHours:0,regularHours:0,lateMinutes:0,undertimeMinutes:0,approvedOtHours:getApprovedOTHoursForEmployeeDate(emp.no,dateKey),
          holidayName:holiday?.name||"",holidayClassification:holiday?.label||"",remarks:approvedLeave.reason||"Approved leave.",recordedBy:"System — Approved Leave"
        });
      }
      result.leave++;
      return;
    }

    if(!holiday && emp.dayOff && emp.dayOff===weekday){
      if(!existing){
        upsertDailyAttendanceRecord({
          source:"Supervisor Daily Finalization",employeeNo:emp.no,employeeName:emp.name,position:emp.position||"",department,
          date:dateKey,shift:schedule.shift,scheduleStart:schedule.start,scheduleEnd:schedule.end,employeeDayOff:emp.dayOff||"",
          status:"Day Off",attendanceType:"Day Off",leaveType:"",absentType:"",timeIn:"",timeOut:"",workedHours:0,regularHours:0,lateMinutes:0,undertimeMinutes:0,
          approvedOtHours:getApprovedOTHoursForEmployeeDate(emp.no,dateKey),holidayName:"",holidayClassification:"",remarks:"Scheduled weekly Day Off.",recordedBy:currentUser?.displayName||"Supervisor"
        });
      }
      result.dayOff++;
      return;
    }

    if(holiday){
      if(!existing){
        upsertDailyAttendanceRecord({
          source:"Supervisor Daily Finalization",employeeNo:emp.no,employeeName:emp.name,position:emp.position||"",department,
          date:dateKey,shift:schedule.shift,scheduleStart:schedule.start,scheduleEnd:schedule.end,employeeDayOff:emp.dayOff||"",
          status:"Holiday",attendanceType:"Holiday",leaveType:"",absentType:"",timeIn:"",timeOut:"",workedHours:0,regularHours:0,lateMinutes:0,undertimeMinutes:0,
          approvedOtHours:getApprovedOTHoursForEmployeeDate(emp.no,dateKey),holidayName:holiday.name||"",holidayClassification:holiday.label||"",remarks:holiday.name||"PH Holiday",recordedBy:currentUser?.displayName||"Supervisor"
        });
      }
      result.holiday++;
      return;
    }

    // Never overwrite an existing attendance record. Only a truly blank normal-workday row becomes Absent.
    if(existing)return;
    upsertDailyAttendanceRecord({
      source:"Supervisor New OT Finalization",employeeNo:emp.no,employeeName:emp.name,position:emp.position||"",department,
      date:dateKey,shift:schedule.shift,scheduleStart:schedule.start,scheduleEnd:schedule.end,employeeDayOff:emp.dayOff||"",
      status:"Absent",attendanceType:"Absent",leaveType:"",absentType:"Absent",timeIn:"",timeOut:"",workedHours:0,regularHours:0,lateMinutes:0,undertimeMinutes:0,
      approvedOtHours:getApprovedOTHoursForEmployeeDate(emp.no,dateKey),holidayName:"",holidayClassification:"",
      remarks:"No attendance submission received when Supervisor finalized the daily roster.",recordedBy:currentUser?.displayName||"Supervisor"
    });
    result.absent++;
  });
  return result;
}

function forwardEmployeeOTBySupervisor(employeeNo,dateKey){
  const sub=getEmployeeAttendanceOTSubmission(employeeNo,dateKey);
  if(!employeeSubmissionHasOT(sub))throw new Error("Employee OT submission could not be found.");
  const requests=getRequests();
  const latest=latestOTRequestForEmployeeDate(employeeNo,dateKey,requests);
  if(latest && ["Pending","Approved"].includes(latest.status))return latest;
  if(sub.supervisorOTReviewStatus==="Rejected")throw new Error("This OT was rejected by Supervisor. Wait for the employee to correct and resubmit it.");
  const now=new Date().toISOString();
  const request={id:uid(),...employeeOTRequestPayload(sub),source:"Supervisor Checked Employee OT",filedDirectByEmployee:false,status:"Pending",createdAt:now,reviewedBy:"",reviewedAt:"",managerRemarks:"",supervisorName:currentUser.displayName,supervisorReviewedBy:currentUser.displayName,supervisorReviewedAt:now,supervisorRemarks:"Checked and forwarded to Request Approver."};
  requests.push(request);saveRequests(requests);
  const rows=getEmployeeAttendanceOTSubmissions();
  const key=employeeAttendanceOTSubmissionKey(employeeNo,dateKey);
  const idx=rows.findIndex(r=>employeeAttendanceOTSubmissionKey(r.employeeNo,r.date)===key);
  if(idx>=0){rows[idx]={...rows[idx],supervisorOTReviewStatus:"Forwarded",supervisorOTReviewReason:"",supervisorOTReviewedAt:now,supervisorOTReviewedBy:currentUser.displayName,supervisorForwardedAt:now,supervisorForwardedBy:currentUser.displayName,supervisorRequestId:request.id,approverRequestId:request.id,approverSubmittedAt:now,updatedAt:now};saveEmployeeAttendanceOTSubmissions(rows);}
  addManagerNotification([request]);return request;
}
function rejectEmployeeOTBySupervisor(employeeNo,dateKey,reason){
  const sub=getEmployeeAttendanceOTSubmission(employeeNo,dateKey);if(!employeeSubmissionHasOT(sub))throw new Error("Employee OT submission could not be found.");
  const latest=latestOTRequestForEmployeeDate(employeeNo,dateKey);if(latest && ["Pending","Approved"].includes(latest.status))throw new Error("This OT has already been forwarded to the Request Approver.");
  const rows=getEmployeeAttendanceOTSubmissions();const key=employeeAttendanceOTSubmissionKey(employeeNo,dateKey);const idx=rows.findIndex(r=>employeeAttendanceOTSubmissionKey(r.employeeNo,r.date)===key);const now=new Date().toISOString();
  if(idx>=0){rows[idx]={...rows[idx],supervisorOTReviewStatus:"Rejected",supervisorOTReviewReason:String(reason||"").trim(),supervisorOTReviewedAt:now,supervisorOTReviewedBy:currentUser.displayName,supervisorForwardedAt:"",supervisorForwardedBy:"",supervisorRequestId:"",approverRequestId:"",approverSubmittedAt:"",updatedAt:now};saveEmployeeAttendanceOTSubmissions(rows);}return rows[idx]||null;
}
function openSupervisorEmployeeOTRejectModal(employeeNo,dateKey){
  const sub=getEmployeeAttendanceOTSubmission(employeeNo,dateKey);if(!sub)return;
  modalRoot.innerHTML=`<div class="modal-backdrop" id="supervisorEmployeeOTRejectBackdrop"><div class="modal"><div class="modal-header"><span>SUPERVISOR OT REVIEW</span><h3>Reject Employee OT</h3></div><div class="modal-body"><div class="note-box" style="margin-bottom:13px"><strong>${escapeHtml(sub.employeeName)}</strong> • ${formatDate(sub.date)}<br>${escapeHtml(sub.otType||"OT")} • ${Number(sub.totalHours||0).toFixed(2)} hrs</div><label class="field"><span>Reason for Rejection (Required)</span><textarea id="supervisorEmployeeOTRejectReason" rows="4" placeholder="Example: OT filed too early / incorrect OT time / wrong OT type"></textarea></label></div><div class="modal-footer"><button class="btn btn-light" id="cancelSupervisorEmployeeOTReject" type="button">Cancel</button><button class="btn btn-danger" id="confirmSupervisorEmployeeOTReject" type="button">✕ Reject OT</button></div></div></div>`;
  const close=()=>modalRoot.innerHTML="";document.getElementById("cancelSupervisorEmployeeOTReject")?.addEventListener("click",close);document.getElementById("supervisorEmployeeOTRejectBackdrop")?.addEventListener("click",e=>{if(e.target.id==="supervisorEmployeeOTRejectBackdrop")close();});
  document.getElementById("confirmSupervisorEmployeeOTReject")?.addEventListener("click",()=>{const reason=document.getElementById("supervisorEmployeeOTRejectReason")?.value.trim()||"";if(!reason){showToast("Enter the reason before rejecting the employee OT.");return;}try{rejectEmployeeOTBySupervisor(employeeNo,dateKey,reason);close();showToast("OT rejected by Supervisor. The employee can see the reason and resubmit after correction.");renderSupervisorEmployeeSubmittedOT();}catch(error){showToast(error?.message||"Unable to reject OT.");}});
}
function openSupervisorEmployeeOTEditModal(employeeNo,dateKey){
  const sub=getEmployeeAttendanceOTSubmission(employeeNo,dateKey);if(!employeeSubmissionHasOT(sub))return;const latest=latestOTRequestForEmployeeDate(employeeNo,dateKey);if(latest && ["Pending","Approved"].includes(latest.status)){showToast("This OT is already with the Request Approver and can no longer be edited here.");return;}
  const subHoliday=getPhilippineHoliday(sub.date);
  const normalizedHolidayOtType=subHoliday?getAutomaticOtType(sub.date,false):"";
  modalRoot.innerHTML=`<div class="modal-backdrop" id="supervisorEmployeeOTEditBackdrop"><div class="modal ot-revision-modal supervisor-employee-ot-edit-modal"><div class="modal-header"><span>SUPERVISOR OT REVIEW</span><h3>Edit Employee OT</h3></div><div class="modal-body"><div class="note-box" style="margin-bottom:13px"><strong>${escapeHtml(sub.employeeName)}</strong> • ${formatDate(sub.date)} • ${escapeHtml(sub.schedule||"")} Shift<br><small>Schedule ${escapeHtml(sub.scheduleStart||"—")} – ${escapeHtml(sub.scheduleEnd||"—")}</small></div><div class="revision-time-grid"><label class="field"><span>OT Type</span><select id="supervisorEditEmployeeOTType" ${subHoliday?"disabled":""}><option value="Regular Day" ${(subHoliday?normalizedHolidayOtType:sub.otType)==="Regular Day"?"selected":""}>Regular Day</option><option value="Rest Day OT" ${(subHoliday?normalizedHolidayOtType:sub.otType)==="Rest Day OT"?"selected":""}>Rest Day OT</option><option value="Special Holiday" ${(subHoliday?normalizedHolidayOtType:sub.otType)==="Special Holiday"?"selected":""}>Special Holiday</option><option value="Regular Holiday" ${(subHoliday?normalizedHolidayOtType:sub.otType)==="Regular Holiday"?"selected":""}>Regular Holiday</option></select></label><label class="field"><span>OT In</span><input id="supervisorEditEmployeeOTStart" class="time-24-input" type="text" inputmode="numeric" maxlength="5" value="${escapeHtml(sub.normalOtStart||"")}" placeholder="HH:MM"></label><label class="field"><span>OT Out</span><input id="supervisorEditEmployeeOTEnd" class="time-24-input" type="text" inputmode="numeric" maxlength="5" value="${escapeHtml(sub.normalOtEnd||"")}" placeholder="HH:MM"></label></div><label class="employee-straight-duty-toggle" style="margin-top:12px"><input id="supervisorEditEmployeeStraightDuty" type="checkbox" ${sub.straightDuty?"checked":""}><span>Straight Duty</span></label><div id="supervisorEditEmployeeStraightFields" class="straight-duty-revision-block ${sub.straightDuty?"":"hidden"}" style="margin-top:10px"><div class="revision-time-grid"><label class="field"><span>Straight Schedule In</span><input id="supervisorEditEmployeeSDScheduleStart" class="time-24-input" type="text" maxlength="5" value="${escapeHtml(sub.straightDutyScheduleStart||"")}" placeholder="HH:MM"></label><label class="field"><span>Straight Schedule Out</span><input id="supervisorEditEmployeeSDScheduleEnd" class="time-24-input" type="text" maxlength="5" value="${escapeHtml(sub.straightDutyScheduleEnd||"")}" placeholder="HH:MM"></label><label class="field"><span>Straight OT In</span><input id="supervisorEditEmployeeSDOTStart" class="time-24-input" type="text" maxlength="5" value="${escapeHtml(sub.straightDutyOtStart||"")}" placeholder="HH:MM"></label><label class="field"><span>Straight OT Out</span><input id="supervisorEditEmployeeSDOTEnd" class="time-24-input" type="text" maxlength="5" value="${escapeHtml(sub.straightDutyOtEnd||"")}" placeholder="HH:MM"></label></div></div><label class="field" style="margin-top:12px"><span>Reason / Remarks</span><textarea id="supervisorEditEmployeeOTReason" rows="3">${escapeHtml(sub.reason||"")}</textarea></label><div class="revision-hours-panel" style="margin-top:12px"><div><span>Recalculated OT</span><strong id="supervisorEditEmployeeOTTotal">${Number(sub.totalHours||0).toFixed(2)} hrs</strong></div></div></div><div class="modal-footer"><button class="btn btn-light" id="cancelSupervisorEmployeeOTEdit" type="button">Cancel</button><button class="btn btn-primary" id="saveSupervisorEmployeeOTEdit" type="button">Save OT Edit</button></div></div></div>`;
  const close=()=>modalRoot.innerHTML="";const straight=document.getElementById("supervisorEditEmployeeStraightDuty");const straightFields=document.getElementById("supervisorEditEmployeeStraightFields");
  const getValues=()=>({otType:subHoliday?normalizedHolidayOtType:(document.getElementById("supervisorEditEmployeeOTType")?.value||"Regular Day"),normalOtStart:normalize24HourTime(document.getElementById("supervisorEditEmployeeOTStart")?.value||""),normalOtEnd:normalize24HourTime(document.getElementById("supervisorEditEmployeeOTEnd")?.value||""),straightDuty:Boolean(straight?.checked),straightDutyScheduleStart:normalize24HourTime(document.getElementById("supervisorEditEmployeeSDScheduleStart")?.value||""),straightDutyScheduleEnd:normalize24HourTime(document.getElementById("supervisorEditEmployeeSDScheduleEnd")?.value||""),straightDutyOtStart:normalize24HourTime(document.getElementById("supervisorEditEmployeeSDOTStart")?.value||""),straightDutyOtEnd:normalize24HourTime(document.getElementById("supervisorEditEmployeeSDOTEnd")?.value||"")});
  const refreshTotal=()=>{const v=getValues();const b=proposedOTBreakdown({scheduleStart:sub.scheduleStart,scheduleEnd:sub.scheduleEnd,otDate:sub.date,...v});const out=document.getElementById("supervisorEditEmployeeOTTotal");if(out)out.textContent=`${Number(b.total||0).toFixed(2)} hrs`;return b;};
  straight?.addEventListener("change",()=>{straightFields?.classList.toggle("hidden",!straight.checked);refreshTotal();});["supervisorEditEmployeeOTType","supervisorEditEmployeeOTStart","supervisorEditEmployeeOTEnd","supervisorEditEmployeeSDScheduleStart","supervisorEditEmployeeSDScheduleEnd","supervisorEditEmployeeSDOTStart","supervisorEditEmployeeSDOTEnd"].forEach(id=>document.getElementById(id)?.addEventListener("input",refreshTotal));document.getElementById("cancelSupervisorEmployeeOTEdit")?.addEventListener("click",close);document.getElementById("supervisorEmployeeOTEditBackdrop")?.addEventListener("click",e=>{if(e.target.id==="supervisorEmployeeOTEditBackdrop")close();});
  document.getElementById("saveSupervisorEmployeeOTEdit")?.addEventListener("click",()=>{const v=getValues();const hasNormal=Boolean(v.normalOtStart||v.normalOtEnd);if(hasNormal && (!isValid24HourTime(v.normalOtStart)||!isValid24HourTime(v.normalOtEnd))){showToast("Complete OT In and OT Out in HH:MM format.");return;}if(!hasNormal && !v.straightDuty){showToast("Enter OT In/Out or enable Straight Duty.");return;}if(v.straightDuty && [v.straightDutyScheduleStart,v.straightDutyScheduleEnd,v.straightDutyOtStart,v.straightDutyOtEnd].some(t=>!isValid24HourTime(t))){showToast("Complete all Straight Duty time fields in HH:MM format.");return;}const b=refreshTotal();if(Number(b.total||0)<=0){showToast("OT hours must be greater than zero.");return;}const rows=getEmployeeAttendanceOTSubmissions();const key=employeeAttendanceOTSubmissionKey(employeeNo,dateKey);const idx=rows.findIndex(r=>employeeAttendanceOTSubmissionKey(r.employeeNo,r.date)===key);if(idx<0)return;const now=new Date().toISOString();rows[idx]={...rows[idx],...v,totalHours:Number(b.total||0).toFixed(2),scheduledOtHours:Number(b.scheduledOtHours||0).toFixed(2),extraOtHours:Number(b.extraOtHours||0).toFixed(2),reason:document.getElementById("supervisorEditEmployeeOTReason")?.value.trim()||"",supervisorOTReviewStatus:"Pending",supervisorOTReviewReason:"",supervisorEditedAt:now,supervisorEditedBy:currentUser.displayName,updatedAt:now};saveEmployeeAttendanceOTSubmissions(rows);close();showToast("Employee OT updated by Supervisor. Review it, then press ✓ to forward to Request Approver.");renderSupervisorEmployeeSubmittedOT();});refreshTotal();
}

function renderSupervisorEmployeeSubmittedOT(){
  const yesterdayKey=getYesterdayDateKey();
  const todayKey=toDateKey(new Date());
  const candidateDate=String(supervisorEmployeeSubmissionDateKey||"").trim();
  const dateKey=/^\d{4}-\d{2}-\d{2}$/.test(candidateDate)?candidateDate:yesterdayKey;
  supervisorEmployeeSubmissionDateKey=dateKey;
  const isCompletedDutyDate=dateKey<todayKey;
  const dateContext=dateKey===yesterdayKey?"Yesterday":dateKey===todayKey?"Today":dateKey<todayKey?"Past Date":"Advance Date";
  const employees=getDepartmentEmployees(currentUser.department);
  const supervisorSelf=getLinkedEmployeeRecordForAccount(currentUser);
  const scheduledEmployees=employees.filter(emp=>isEmployeeSetupComplete(emp));
  const incompleteEmployees=employees.filter(emp=>!isEmployeeSetupComplete(emp));
  const submissions=getEmployeeAttendanceOTSubmissions().filter(r=>normalizeDepartmentName(r.department)===normalizeDepartmentName(currentUser.department) && r.date===dateKey);
  const submissionMap=new Map(submissions.map(r=>[String(r.employeeNo),r]));
  const dateRequests=getRequests().filter(r=>!isOtAmendment(r) && r.department===currentUser.department && r.otDate===dateKey && isActualOTRecord(r));
  const latestRequestMap=new Map();
  dateRequests.slice().sort((a,b)=>new Date(a.createdAt||a.reviewedAt||0)-new Date(b.createdAt||b.reviewedAt||0)).forEach(r=>latestRequestMap.set(String(r.employeeNo),r));
  const activeRequests=dateRequests.filter(r=>["Pending","Approved"].includes(r.status));
  const activeMap=new Map(activeRequests.map(r=>[String(r.employeeNo),r]));
  const rejectedRequests=[...latestRequestMap.values()].filter(r=>{
    if(r.status!=="Rejected")return false;
    const sub=submissionMap.get(String(r.employeeNo));
    return !employeeSubmissionIsNewerThanOTRequest(sub,r);
  });
  const rejectedMap=new Map(rejectedRequests.map(r=>[String(r.employeeNo),r]));
  const submittedCount=scheduledEmployees.filter(emp=>submissionMap.has(String(emp.no))).length;
  const pendingApproverOT=[...latestRequestMap.values()].filter(r=>r.status==="Pending");
  const pendingSupervisorOT=submissions.filter(r=>{
    if(!employeeSubmissionHasOT(r) || r.supervisorOTReviewStatus==="Rejected")return false;
    const latest=latestRequestMap.get(String(r.employeeNo));
    return !latest || (latest.status==="Rejected" && employeeSubmissionIsNewerThanOTRequest(r,latest));
  });
  const supervisorRejectedOT=submissions.filter(r=>{
    if(!employeeSubmissionHasOT(r) || r.supervisorOTReviewStatus!=="Rejected")return false;
    const latest=latestRequestMap.get(String(r.employeeNo));
    return !latest || (latest.status==="Rejected" && employeeSubmissionIsNewerThanOTRequest(r,latest));
  });
  const approvedDirectOT=[...latestRequestMap.values()].filter(r=>r.status==="Approved");
  const attendanceOnly=submissions.filter(r=>!employeeSubmissionHasOT(r));
  const alreadyForwarded=submissions.filter(r=>employeeSubmissionHasOT(r) && activeMap.has(String(r.employeeNo)));
  const totalReadyHours=pendingSupervisorOT.reduce((sum,r)=>sum+Number(r.totalHours||0),0);
  const hasStraightDuty=submissions.some(r=>r.hasOT && r.straightDuty);
  const isMaintenanceSupervisor=currentUser.department==="Maintenance";
  const holiday=getPhilippineHoliday(dateKey);
  const selectedWeekday=parseLocalDate(dateKey).toLocaleDateString("en-PH",{weekday:"long"});
  const attendanceMap=new Map(getDailyAttendanceRecords().filter(r=>normalizeDepartmentName(r.department)===normalizeDepartmentName(currentUser.department) && r.date===dateKey).map(r=>[String(r.employeeNo),r]));
  const automaticLeaveCount=scheduledEmployees.filter(emp=>Boolean(getApprovedLeaveForEmployeeDate(emp.no,dateKey)) && !submissionMap.has(String(emp.no))).length;
  const automaticDayOffCount=holiday?0:scheduledEmployees.filter(emp=>!getApprovedLeaveForEmployeeDate(emp.no,dateKey) && emp.dayOff===selectedWeekday && !submissionMap.has(String(emp.no))).length;
  const autoAbsentCount=scheduledEmployees.filter(emp=>{
    const row=attendanceMap.get(String(emp.no));
    return !submissionMap.has(String(emp.no)) && row?.status==="Absent" && row?.source==="Supervisor New OT Finalization";
  }).length;
  const blankWorkdayCount=scheduledEmployees.filter(emp=>{
    if(submissionMap.has(String(emp.no)) || attendanceMap.has(String(emp.no)))return false;
    if(getApprovedLeaveForEmployeeDate(emp.no,dateKey))return false;
    if(holiday)return false;
    return !(emp.dayOff && emp.dayOff===selectedWeekday);
  }).length;

  setPage("New OT Request","SUPERVISOR REVIEW",`${dateContext}: ${formatDate(dateKey)} • ${currentUser.department}${isCompletedDutyDate?" • completed duty":" • view only"}.`);
  content.innerHTML=`
    ${heroBanner(
      "Employee-submitted attendance & OT",
      "Names and positions stay fixed by Work Area and shift. Normal row details stay blank until the employee submits. Scheduled Day Off is shown automatically; the employee submits only when working Rest Day OT.",
      submittedCount,
      `${submittedCount} submitted • ${pendingSupervisorOT.length} OT for Supervisor review • ${automaticLeaveCount} approved Leave • ${automaticDayOffCount} Day Off`
    )}
    ${supervisorSelf?`<div class="card" style="margin-bottom:16px;border:2px solid #dbeafe"><div class="card-body" style="display:flex;justify-content:space-between;gap:14px;align-items:center;flex-wrap:wrap"><div><span class="badge primary">Your Own Entry — Always on Top</span><h3 style="margin:7px 0 3px">${escapeHtml(supervisorSelf.name)}</h3><p class="muted" style="margin:0">${escapeHtml(supervisorSelf.position||"Supervisor")} • Employee No. ${escapeHtml(supervisorSelf.no)} • Your own OT bypasses self-review and goes directly to Request Approver.</p></div><button id="supervisorOwnOTEntry" class="btn btn-primary" type="button">＋ Input My Own Data</button></div></div>`:`<div class="schedule-required-alert compact"><div><span class="schedule-required-icon">!</span><div><strong>Your Supervisor login is not linked to an employee record</strong><span>IT should assign Supervisor access from your HR Employee Master List account so your own name can appear at the top and you can input your own data.</span></div></div></div>`}
    ${incompleteEmployees.length?`<div class="schedule-required-alert compact"><div><span class="schedule-required-icon">◷</span><div><strong>${incompleteEmployees.length} employee${incompleteEmployees.length===1?"":"s"} missing Work Area / shift setup</strong><span>Complete their setup from the Employee Schedule menu. This notice is informational only and will not redirect the New OT Request page.</span></div></div></div>`:""}
    <div class="card supervisor-employee-submission-card">
      <div class="card-header"><div class="card-title-group"><h3>${escapeHtml(currentUser.department)} New OT Request — ${dateContext}</h3><p>${formatDate(dateKey)} • ${isCompletedDutyDate?"Completed duty. Attendance may be finalized.":"Attendance finalization is view-only until the duty date is completed."} Filed OT can still be Check/Edit/Rejected now, including advance OT.</p></div><span class="badge pending">Employee → Supervisor Review → Request Approver</span></div>
      <div class="card-body">
        <div class="bulk-ot-toolbar employee-submission-toolbar">
          <label class="field compact-field"><span>Attendance / OT Date</span><input id="employeeSubmissionOTDate" type="date" value="${escapeHtml(dateKey)}"></label>
          <div class="date-view-mode-note"><strong>${dateContext}</strong><span>${isCompletedDutyDate?"Completed duty date — attendance finalization is available.":"Attendance finalization is disabled; OT review remains available."}</span></div>
          <div class="employee-submission-summary"><span><strong>${submittedCount}</strong> submitted</span><span><strong>${automaticLeaveCount}</strong> approved Leave</span><span><strong>${automaticDayOffCount}</strong> automatic Day Off</span><span><strong>${attendanceOnly.length}</strong> attendance only</span><span><strong>${pendingSupervisorOT.length}</strong> OT waiting Supervisor</span><span><strong>${pendingApproverOT.length}</strong> Pending Approver</span><span><strong>${approvedDirectOT.length}</strong> OT approved</span><span><strong>${supervisorRejectedOT.length+rejectedRequests.length}</strong> rejected</span><span><strong>${blankWorkdayCount}</strong> blank → Absent on submit</span><span><strong>${autoAbsentCount}</strong> Absent finalized</span><span><strong>${totalReadyHours.toFixed(2)}</strong> pending OT hours</span></div>
          ${holiday?`<div class="holiday-status-banner ${getHolidayCategoryClass(holiday.category)}"><strong>${escapeHtml(holiday.name)}</strong><span>${escapeHtml(holiday.label)} • Employee-submitted holiday work includes paid scheduled hours in OT; the 1-hour lunch break is excluded.</span></div>`:""}
        </div>

        ${OT_LOCATIONS.map(location=>`
          <section class="location-ot-group ${getLocationCssClass(location)}-location-group">
            <div class="location-ot-heading"><div><span class="location-badge ${getLocationCssClass(location)}">${location}</span><div><h4>${location} Location</h4><p>Morning and Night shift employee submissions</p></div></div><strong>${scheduledEmployees.filter(emp=>emp.location===location).length} employee(s)</strong></div>
            ${["Morning","Night"].map(shift=>{
              const shiftEmployees=employees.filter(emp=>emp.location===location && emp.schedule===shift);
              const scheduleLabel=shift==="Morning"?"06:00 – 15:00":"18:00 – 03:00";
              return `<div class="shift-table-section ${shift.toLowerCase()}-section">
                <div class="shift-table-heading"><div><span class="schedule-chip ${shift.toLowerCase()}">${shift} Shift</span><h4>${location} — ${shift} Shift</h4><p>${scheduleLabel} • ${shiftEmployees.length} employee(s)</p></div><div class="shift-end-label">Employee-submitted data only</div></div>
                <div class="ot-entry-table-wrap"><table class="ot-entry-table employee-submission-table">
                  <thead><tr><th>Name</th><th>Position</th><th>Schedule</th><th>OT</th><th>OT Type</th><th>Straight Duty</th>${hasStraightDuty?`<th>Straight Duty Schedule</th><th>Straight Duty OT</th>`:""}<th>Total OT Hours</th><th>Day Off</th><th>Leave (Auto)</th>${isMaintenanceSupervisor?`<th>Equipment</th><th>Location</th>`:""}<th>Reason</th><th>Supervisor Action</th></tr></thead>
                  <tbody>${shiftEmployees.length?shiftEmployees.map(emp=>{
                    const sub=submissionMap.get(String(emp.no));
                    const latestRequest=latestRequestMap.get(String(emp.no));
                    const request=latestRequest?.status==="Rejected" && employeeSubmissionIsNewerThanOTRequest(sub,latestRequest)?null:latestRequest;
                    const rejectedRequest=request?.status==="Rejected"?request:null;
                    const approvedLeave=getApprovedLeaveForEmployeeDate(emp.no,dateKey);
                    const dailyRecord=attendanceMap.get(String(emp.no));
                    const isAutoLeave=Boolean(approvedLeave && !sub);
                    const isAutoDayOff=Boolean(!sub && !approvedLeave && !holiday && emp.dayOff && emp.dayOff===selectedWeekday);
                    const isAutoAbsent=Boolean(!sub && dailyRecord?.status==="Absent" && dailyRecord?.source==="Supervisor New OT Finalization");
                    const attendanceText=!sub?"":sub.attendanceStatus==="Present"?`${sub.timeIn||"—"} → ${sub.timeOut||"—"}${Number(sub.lateMinutes||0)>0?` • Late ${Number(sub.lateMinutes)}m`:""}${Number(sub.undertimeMinutes||0)>0?` • UT ${Number(sub.undertimeMinutes)}m`:""}`:sub.attendanceStatus;
                    const otText=sub?.hasOT?`${sub.normalOtStart||"—"} → ${sub.normalOtEnd||"—"}`:"";
                    const leaveText=approvedLeave?.leaveType || (sub?.attendanceStatus==="Leave" ? (sub.leaveType||"Leave") : "");
                    const dayOffText=sub?(sub.holidayName||sub.employeeDayOff||""):(isAutoDayOff?emp.dayOff:"");
                    const reasonText=approvedLeave?.reason || sub?.reason || "";
                    return `<tr class="employee-submission-row ${sub?"has-employee-submission":isAutoLeave?"automatic-leave-row":isAutoDayOff?"automatic-dayoff-row":isAutoAbsent?"automatic-absent-row":"waiting-employee-submission"}" data-employee-no="${escapeHtml(emp.no)}">
                      <td><div class="employee-cell roster-employee"><strong>${escapeHtml(emp.name)}</strong><small class="row-location-note">${escapeHtml(location)}</small>${sub?`<span class="employee-submission-state submitted">Submitted ${formatDateTime(sub.submittedAt||sub.updatedAt||sub.createdAt)}</span>`:isAutoLeave?`<span class="employee-submission-state submitted">${escapeHtml(leaveText)} • Fully Approved Leave • No attendance submission required</span>`:isAutoDayOff?`<span class="employee-submission-state dayoff-auto">DAY OFF • No attendance submission required</span>`:isAutoAbsent?`<span class="employee-submission-state absent-auto">ABSENT • Finalized by Supervisor</span>`:`<span class="employee-submission-state waiting">Waiting for employee</span>`}${request?`<span class="employee-submission-state ${request.status==="Rejected"?"absent-auto":"forwarded"}">${request.status==="Rejected"?"REJECTED by Request Approver":request.status==="Approved"?"APPROVED by Request Approver":"PENDING Request Approver"}</span>${request.status==="Rejected"?`<small class="attendance-subline"><b>Rejection reason:</b> ${escapeHtml(request.managerRemarks||"No reason recorded.")}</small>`:""}`:sub?.supervisorOTReviewStatus==="Rejected"?`<span class="employee-submission-state absent-auto">REJECTED by Supervisor</span><small class="attendance-subline"><b>Reason:</b> ${escapeHtml(sub.supervisorOTReviewReason||"No reason recorded.")}</small>`:employeeSubmissionHasOT(sub)?`<span class="employee-submission-state waiting">PENDING Supervisor Review</span>`:""}</div></td>
                      <td>${escapeHtml(emp.position)}</td>
                      <td>${sub?`<div class="submitted-schedule-cell"><span class="schedule-chip ${shift.toLowerCase()}">${escapeHtml(sub.schedule||shift)}</span><small>${escapeHtml(sub.scheduleStart||"")} – ${escapeHtml(sub.scheduleEnd||"")}</small><em>Attendance: ${escapeHtml(attendanceText)}</em></div>`:isAutoAbsent?`<span class="badge rejected">ABSENT</span><small class="attendance-subline">No employee submission when Supervisor finalized</small>`:""}</td>
                      <td>${sub?.hasOT?`<strong>${escapeHtml(otText)}</strong>`:""}</td>
                      <td>${sub?.hasOT?`<span class="badge primary">${escapeHtml(sub.otType||"")}</span>`:""}</td>
                      <td>${sub?.hasOT&&sub.straightDuty?`<span class="badge warning">Straight Duty</span>`:""}</td>
                      ${hasStraightDuty?`<td>${sub?.hasOT&&sub.straightDuty?`${escapeHtml(sub.straightDutyScheduleStart||"")} → ${escapeHtml(sub.straightDutyScheduleEnd||"")}`:""}</td><td>${sub?.hasOT&&sub.straightDuty?`${escapeHtml(sub.straightDutyOtStart||"")} → ${escapeHtml(sub.straightDutyOtEnd||"")}`:""}</td>`:""}
                      <td>${employeeSubmissionHasOT(sub)?`<strong>${Number(sub.totalHours||0).toFixed(2)}</strong>${Number(sub.scheduledOtHours||0)>0?`<small class="attendance-subline">${Number(sub.scheduledOtHours||0).toFixed(2)} sched + ${Number(sub.extraOtHours||0).toFixed(2)} extra</small>`:""}${request?`<small class="attendance-subline"><span class="badge ${request.status==="Rejected"?"rejected":request.status==="Approved"?"approved":"warning"}">${request.status==="Rejected"?"Rejected — Employee Must Correct":request.status==="Approved"?"Approved":"Not Yet Approved"}</span></small>${request.status==="Rejected"?`<small class="attendance-subline"><b>Why:</b> ${escapeHtml(request.managerRemarks||"No reason recorded.")}</small>`:""}`:`<small class="attendance-subline"><span class="badge warning">Pending Supervisor Review</span></small>`}`:sub?`<small class="attendance-subline">Attendance only • No OT approval needed</small>`:""}</td>
                      <td>${sub?escapeHtml(dayOffText):isAutoDayOff?`<span class="badge warning">DAY OFF</span><small class="attendance-subline">${escapeHtml(dayOffText)} • Automatic</small>`:""}</td>
                      <td>${leaveText?`<span class="leave-type-badge">${escapeHtml(leaveText)}</span>${approvedLeave?`<small class="attendance-subline">Automatic • Fully Approved</small>`:""}`:""}</td>
                      ${isMaintenanceSupervisor?`<td>${sub?.hasOT?escapeHtml(sub.maintenanceEquipment||""):""}</td><td>${sub?.hasOT?escapeHtml(sub.maintenanceEquipmentLocation||""):""}</td>`:""}
                      <td class="wrap-cell">${escapeHtml(reasonText)}${rejectedRequest?`<small class="attendance-subline" style="color:#b91c1c"><b>Request Approver rejected:</b> ${escapeHtml(rejectedRequest.managerRemarks||"No reason recorded.")}</small>`:""}${sub?.supervisorOTReviewStatus==="Rejected"?`<small class="attendance-subline" style="color:#b91c1c"><b>Supervisor rejected:</b> ${escapeHtml(sub.supervisorOTReviewReason||"No reason recorded.")}</small>`:""}</td>
                      <td class="supervisor-ot-action-cell">${employeeSubmissionHasOT(sub)?(request?`<span class="badge ${request.status==="Approved"?"approved":request.status==="Rejected"?"rejected":"warning"}">${request.status==="Approved"?"Approved":request.status==="Rejected"?"Rejected by Approver":"Pending Approver"}</span>`:sub.supervisorOTReviewStatus==="Rejected"?`<span class="badge rejected">Rejected by Supervisor</span><small class="attendance-subline">Waiting for employee correction</small>`:`<div class="supervisor-ot-row-actions"><button class="ot-review-icon check" type="button" title="Check & forward to Request Approver" aria-label="Check and forward OT" data-supervisor-ot-action="check" data-employee-no="${escapeHtml(emp.no)}">✓</button><button class="ot-review-icon reject" type="button" title="Reject OT" aria-label="Reject OT" data-supervisor-ot-action="reject" data-employee-no="${escapeHtml(emp.no)}">✕</button><button class="btn btn-light btn-sm ot-review-edit" type="button" data-supervisor-ot-action="edit" data-employee-no="${escapeHtml(emp.no)}">Edit</button></div>`):""}</td>
                    </tr>`;
                  }).join(""):`<tr><td colspan="${11+(hasStraightDuty?2:0)+(isMaintenanceSupervisor?2:0)}"><div class="empty compact-empty">No ${shift.toLowerCase()} shift employees assigned to ${location}.</div></td></tr>`}</tbody>
                </table></div>
              </div>`;
            }).join("")}
          </section>`).join("")}

        <div class="bulk-ot-footer employee-submission-footer"><div class="bulk-summary"><span><strong>${pendingSupervisorOT.length}</strong> OT waiting Supervisor review</span><span><strong>${pendingApproverOT.length}</strong> Pending Request Approver</span><span><strong>${approvedDirectOT.length}</strong> OT approved</span><span><strong>${supervisorRejectedOT.length+rejectedRequests.length}</strong> OT rejected</span><span><strong>${blankWorkdayCount}</strong> blank workday row(s) → Absent</span><small>${isCompletedDutyDate?"Use each OT row’s <strong>✓ / ✕ / Edit</strong> controls for OT review. The bottom button finalizes <strong>attendance only</strong>.":"OT review controls remain available for filed OT, including advance OT. Attendance finalization stays disabled until the duty date is completed."}</small></div><div class="actions"><button id="submitEmployeeOTToApprover" class="btn btn-primary" type="button" ${isCompletedDutyDate?"":"disabled"}>${isCompletedDutyDate?"Finalize Attendance Roster":"View Only — Duty Not Completed"}</button></div></div>
      </div>
    </div>`;

  document.getElementById("supervisorOwnOTEntry")?.addEventListener("click",()=>renderSupervisorOwnOTForm());
  document.getElementById("employeeSubmissionOTDate")?.addEventListener("change",e=>{
    e.stopPropagation();
    const selected=String(e.target.value||"").trim();
    supervisorEmployeeSubmissionDateKey=/^\d{4}-\d{2}-\d{2}$/.test(selected)?selected:yesterdayKey;
    renderSupervisorEmployeeSubmittedOT();
  });
  document.querySelectorAll("[data-supervisor-ot-action]").forEach(btn=>btn.addEventListener("click",event=>{
    event.preventDefault();event.stopPropagation();
    const action=event.currentTarget.dataset.supervisorOtAction;const employeeNo=event.currentTarget.dataset.employeeNo;if(!employeeNo)return;
    if(action==="check"){try{const request=forwardEmployeeOTBySupervisor(employeeNo,dateKey);showToast(`${request.employeeName} OT checked and forwarded to Request Approver.`);renderSupervisorEmployeeSubmittedOT();}catch(error){showToast(error?.message||"Unable to forward OT.");}}
    else if(action==="reject")openSupervisorEmployeeOTRejectModal(employeeNo,dateKey);
    else if(action==="edit")openSupervisorEmployeeOTEditModal(employeeNo,dateKey);
  }));

  document.getElementById("submitEmployeeOTToApprover")?.addEventListener("click",event=>{
    event.preventDefault();
    event.stopPropagation();
    currentPage="new-request";
    const submitButton=event.currentTarget;
    if(submitButton?.dataset.submitting==="1")return;
    try{
      if(!isCompletedDutyDate){showToast("Today and advance duty dates are view-only. Finalize only after the duty date is completed.");return;}
      if(submitButton){submitButton.dataset.submitting="1";submitButton.disabled=true;submitButton.textContent="Finalizing Attendance...";}
      const allSubmissions=getEmployeeAttendanceOTSubmissions();
      const rosterEmployees=getDepartmentEmployees(currentUser.department);
      const finalization=finalizeSupervisorBlankAttendance(currentUser.department,dateKey,rosterEmployees,allSubmissions);
      const parts=[];
      if(finalization.absent)parts.push(`${finalization.absent} blank employee row(s) recorded as Absent`);
      if(finalization.attendance)parts.push(`${finalization.attendance} employee attendance finalized`);
      if(finalization.dayOff)parts.push(`${finalization.dayOff} Day Off`);
      if(finalization.holiday)parts.push(`${finalization.holiday} Holiday`);
            if(finalization.skippedFuture)parts.push("future-date blank rows were not marked Absent");
      showToast(parts.length?`${parts.join(" • ")}.`:"Daily roster already finalized. No new OT or blank workday rows found.");
      currentPage="new-request";
      renderSupervisorEmployeeSubmittedOT();
    }catch(error){
      console.error("Supervisor attendance finalization failed:",error);
      showToast(`Unable to finalize attendance: ${error?.message || "Unexpected error"}`);
      currentPage="new-request";
      buildNavigation();
      renderSupervisorEmployeeSubmittedOT();
    }finally{
      if(submitButton){delete submitButton.dataset.submitting;}
    }
  });
  stabilizeSupervisorInteractions();
}

function renderSupervisor(){
  // Attendance is consolidated into New OT Request for Supervisor accounts.
  // Keep this redirect for older saved sessions/bookmarks that still point to the removed page.
  if(currentPage==="attendance")currentPage="new-request";
  if(currentPage==="supervisor-file-leave")return renderSupervisorOwnLeaveForm();
  if(currentPage==="leave-requests")return renderSupervisorLeaveRequests();
  if(currentPage==="new-request")return renderSupervisorEmployeeSubmittedOT();
  const allSupervisorRequests=getRequests().filter(r=>r.department===currentUser.department);
  const rows=allSupervisorRequests.filter(r=>!isOtAmendment(r));
  const dashboardDateKey=toDateKey(new Date());
  const dashboardRows=rows.filter(r=>r.otDate===dashboardDateKey);
  const pendingReapprovals=allSupervisorRequests.filter(r=>isOtAmendment(r) && r.status==="Pending" && r.otDate===dashboardDateKey).length;
  const pending=dashboardRows.filter(r=>r.status==="Pending").length;
  const approved=dashboardRows.filter(r=>r.status==="Approved").length;
  const rejected=dashboardRows.filter(r=>r.status==="Rejected").length;
  const dashboardHours=dashboardRows.reduce((sum,r)=>sum+Number(r.totalHours||0),0);

  if(currentPage==="dashboard"){
    setPage(`${currentUser.department} Supervisor`,"SUPERVISOR WORKSPACE",`Dashboard date: ${formatDate(dashboardDateKey)} • Today.`);
    const latest=[...dashboardRows].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,6);
    const scheduleNotifications=supervisorNotificationsForDepartment(currentUser.department).filter(n=>n.type==="schedule-required");
    content.innerHTML = `
      ${heroBanner(
        `${currentUser.department} Overtime`,
        `Employees submit their own attendance and OT for ${currentUser.department}. You review/finalize attendance. Employee OT appears in New OT Request for Supervisor Check/Edit/Reject; only checked OT is forwarded to the Request Approver.`,
        dashboardRows.length,
        `requests for ${formatDate(dashboardDateKey)} • Today`
      )}
      ${scheduleNotifications.length ? `
        <div class="schedule-required-alert">
          <div><span class="schedule-required-icon">◷</span><div><strong>${scheduleNotifications.length} new employee${scheduleNotifications.length===1?"":"s"} need Work Area / schedule setup</strong><span>HR assigned ${scheduleNotifications.length===1?"an employee":"employees"} to ${escapeHtml(currentUser.department)}. Set Work Area and Morning/Night shift before the employee can submit Attendance & OT.</span></div></div>
          <button id="openScheduleSetup" class="btn btn-primary btn-sm" type="button">Set Up Employee</button>
        </div>` : ""}
      <div class="stats-grid">
        ${statCard("Today Requests",dashboardRows.length,formatDate(dashboardDateKey),"primary","my-requests")}
        ${statCard("Pending",pending,`Today • waiting for Request Approver${pendingReapprovals?` • ${pendingReapprovals} additional OT re-approval${pendingReapprovals===1?"":"s"}`:""}`,"warning","my-requests")}
        ${statCard("Approved",approved,"Today • approved OT","success","my-requests")}
        ${statCard("Today OT Hours",dashboardHours.toFixed(2),"OT hours recorded for today","danger","my-requests")}
      </div>
      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <div class="card-title-group"><h3>Today Department Requests</h3><p>${formatDate(dashboardDateKey)} • current dashboard date</p></div>
            <button type="button" id="newOtQuick" class="btn btn-primary btn-sm">＋ New Request</button>
          </div>
          <div class="card-body">
            ${latest.length?`<div class="mini-list">${latest.map(r=>miniItem(r)).join("")}</div>`:emptyState("No requests for today","No OT requests are recorded for today yet.")}
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title-group"><h3>Access Rules</h3><p>Department-level controls</p></div></div>
          <div class="card-body">
            <div class="info-banner"><span class="info-icon">i</span><div>
              Your login is assigned to <strong>${escapeHtml(currentUser.department)}</strong>. You cannot submit or view overtime records from another department.
            </div></div>
            <div class="note-box" style="margin-top:10px">
              <strong>Approval flow:</strong><br>
              Employee OT filing → Request Approver approval → HR. Supervisor separately reviews/finalizes attendance and only sees whether the employee OT is approved, pending, or rejected.
            </div>
          </div>
        </div>
      </div>`;
    bindDashboardStatCards();
    document.getElementById("newOtQuick")?.addEventListener("click",()=>{navigateTo("new-request")});
    document.getElementById("openScheduleSetup")?.addEventListener("click",()=>{navigateTo("employee-schedule")});
    return;
  }

  if(currentPage==="new-request"){
    setPage("New Overtime Entry","SUPERVISOR INPUT",`Enter overtime for employees under ${currentUser.department}.`);
    const employees = getDepartmentEmployees(currentUser.department);
    const isMaintenanceSupervisor=currentUser.role==="Supervisor" && currentUser.department==="Maintenance";
    const incompleteEmployees=employees.filter(emp=>!isEmployeeSetupComplete(emp));
    const scheduledEmployees=employees.filter(emp=>isEmployeeSetupComplete(emp));

    content.innerHTML = `
      ${heroBanner(
        "Department overtime entry",
        "Your department roster is listed below. Approved VL/SL appears automatically when the leave date arrives. Use New OT Request as the Supervisor's single daily entry screen; HR keeps the consolidated Cutoff view.",
        scheduledEmployees.length,
        "employees ready for OT"
      )}
      ${incompleteEmployees.length?`<div class="schedule-required-alert compact"><div><span class="schedule-required-icon">◷</span><div><strong>${incompleteEmployees.length} employee${incompleteEmployees.length===1?"":"s"} not yet available for OT entry</strong><span>Set both Work Area and Morning/Night schedule first in Employee Schedule.</span></div></div><button id="goToScheduleSetupFromOT" class="btn btn-secondary btn-sm" type="button">Employee Schedule</button></div>`:""}

      <div class="card">
        <div class="card-header">
          <div class="card-title-group">
            <h3>${escapeHtml(currentUser.department)} Employee OT List</h3>
            <p>${escapeHtml(currentUser.displayName)} • One submission can include multiple employees.</p>
          </div>
          <span class="badge pending">For Request Approver Approval</span>
        </div>

        <div class="card-body">
          <div class="bulk-ot-toolbar">
            <label class="field compact-field">
              <span>Overtime Date</span>
              <input id="bulkOtDate" type="date" required>
            </label>
            <div id="bulkHolidayStatus" class="holiday-status-banner" aria-live="polite"></div>
            <button id="openHolidayCalendarFromOT" class="btn btn-light btn-sm holiday-calendar-shortcut" type="button">▣ PH Holiday Calendar</button>
            <div class="schedule-legend">
              <span><strong>Morning default:</strong> 06:00 – 15:00 <small>• Shift Time is editable per employee</small></span>
              <span><strong>Night default:</strong> 18:00 – 03:00 <small>• Shift Time is editable per employee</small></span>
            </div>
          </div>

          ${OT_LOCATIONS.map(location=>`
            <section class="location-ot-group ${getLocationCssClass(location)}-location-group">
              <div class="location-ot-heading">
                <div>
                  <span class="location-badge ${getLocationCssClass(location)}">${location}</span>
                  <div>
                    <h4>${location} Location</h4>
                    <p>Morning and Night shift overtime entry tables</p>
                  </div>
                </div>
                <strong>${scheduledEmployees.filter(emp=>emp.location===location).length} employee(s)</strong>
              </div>

              ${["Morning","Night"].map(shift=>{
                const shiftEmployees = employees.filter(emp=>emp.location===location && emp.schedule===shift);
                const scheduleLabel = shift==="Morning" ? "Default 06:00 – 15:00" : "Default 18:00 – 03:00";
                return `
                  <div class="shift-table-section ${shift.toLowerCase()}-section">
                    <div class="shift-table-heading">
                      <div>
                        <span class="schedule-chip ${shift.toLowerCase()}">${shift} Shift</span>
                        <h4>${location} — ${shift} Shift</h4>
                        <p>${scheduleLabel} • ${shiftEmployees.length} employee(s)</p>
                      </div>
                      <div class="shift-end-label">Employee Shift Time can be edited below</div>
                    </div>

                    <div class="ot-entry-table-wrap">
                      <table class="ot-entry-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Schedule</th>
                            <th>OT</th>
                            <th>OT Type</th>
                            <th>Straight Duty</th>
                            <th class="straight-duty-extra-col straight-duty-schedule-col hidden">Straight Duty Schedule</th>
                            <th class="straight-duty-extra-col straight-duty-ot-col hidden">Straight Duty OT</th>
                            <th>Total OT Hours</th>
                            <th>Day Off</th>
                            <th>Leave (Auto)</th>
                            ${isMaintenanceSupervisor?`<th>Equipment</th><th>Location</th>`:""}
                            <th>Reason</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${shiftEmployees.length ? shiftEmployees.map((emp,index)=>{
                            const employeeSchedule=getEmployeeAttendanceSchedule(emp);
                            const startValue = employeeSchedule.end;
                            const employeeScheduleLabel=`${employeeSchedule.start} – ${employeeSchedule.end}`;
                            return `
                              <tr class="ot-entry-row" data-index="${index}" data-employee-no="${escapeHtml(emp.no)}" data-employee-name="${escapeHtml(emp.name)}" data-position="${escapeHtml(emp.position)}" data-location="${escapeHtml(location)}" data-schedule="${escapeHtml(emp.schedule)}" data-day-off="${escapeHtml(emp.dayOff || "")}" data-schedule-start="${escapeHtml(employeeSchedule.start)}" data-schedule-end="${escapeHtml(employeeSchedule.end)}">
                                <td>
                                  <div class="employee-cell roster-employee">
                                    <strong>${escapeHtml(emp.name)}</strong>
                                    <small class="row-location-note">${location}</small>
                                  </div>
                                </td>
                                <td>${escapeHtml(emp.position)}</td>
                                <td class="schedule-mode-cell">
                                  <div class="newot-schedule-view">
                                    <div>
                                      <span class="schedule-chip ${shift.toLowerCase()}">${shift}</span>
                                      <small class="schedule-time current-schedule-time">${employeeScheduleLabel}</small>
                                    </div>
                                    <button class="mini-edit-btn newot-edit-time-btn" type="button" title="Edit regular schedule time">✎ Edit Time</button>
                                  </div>
                                  <div class="newot-time-edit hidden">
                                    <label>
                                      <small>Schedule In</small>
                                      <input class="schedule-start-time time-24-input" type="text" inputmode="numeric" maxlength="5" pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" placeholder="HH:MM" title="Use 24-hour time, e.g. 06:00 or 18:30" value="${escapeHtml(employeeSchedule.start)}">
                                    </label>
                                    <span class="time-arrow">→</span>
                                    <label>
                                      <small>Schedule Out</small>
                                      <input class="schedule-end-time time-24-input" type="text" inputmode="numeric" maxlength="5" pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" placeholder="HH:MM" title="Use 24-hour time, e.g. 15:00 or 03:00" value="${escapeHtml(employeeSchedule.end)}">
                                    </label>
                                    <div class="mini-edit-actions">
                                      <button class="mini-save-btn newot-save-time-btn" type="button">Save</button>
                                      <button class="mini-cancel-btn newot-cancel-time-btn" type="button">Cancel</button>
                                    </div>
                                  </div>
                                </td>
                                <td class="ot-mode-cell normal-ot-cell">
                                  <div class="ot-time-pair normal-ot-time-pair">
                                    <label><small>OT In</small><input class="row-ot-start time-24-input" type="text" inputmode="numeric" maxlength="5" pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" placeholder="HH:MM" title="Use 24-hour time, e.g. 15:00" value="${startValue}"></label>
                                    <span class="time-arrow">→</span>
                                    <label><small>OT Out</small><input class="row-ot-end time-24-input" type="text" inputmode="numeric" maxlength="5" pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" placeholder="HH:MM" title="Use 24-hour time, e.g. 19:30"></label>
                                  </div>
                                </td>
                                <td class="ot-mode-cell ot-type-mode-cell">
                                  <div class="ot-type-cell">
                                    <select class="row-ot-type" aria-label="OT type for ${escapeHtml(emp.name)}">
                                      <option value="Regular Day" selected>Regular Day</option>
                                      <option value="Rest Day OT">Rest Day OT</option>
                                      <option value="Special Holiday">Special Holiday</option>
                                      <option value="Regular Holiday">Regular Holiday</option>
                                    </select>
                                    <small class="row-holiday-note hidden"></small>
                                  </div>
                                </td>
                                <td class="ot-mode-cell straight-duty-mode-cell">
                                  <div class="straight-duty-control">
                                    <label class="straight-duty-toggle"><input class="row-straight-duty" type="checkbox"><span>Straight Duty</span></label>
                                  </div>
                                </td>
                                <td class="ot-mode-cell straight-duty-extra-cell straight-duty-schedule-cell hidden">
                                  <div class="straight-duty-schedule-fields straight-duty-conditional hidden">
                                    <label><small>Schedule In</small><input class="straight-duty-schedule-start time-24-input" type="text" inputmode="numeric" maxlength="5" pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" placeholder="HH:MM"></label>
                                    <span class="time-arrow">→</span>
                                    <label><small>Schedule Out</small><input class="straight-duty-schedule-end time-24-input" type="text" inputmode="numeric" maxlength="5" pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" placeholder="HH:MM"></label>
                                  </div>
                                </td>
                                <td class="ot-mode-cell straight-duty-extra-cell straight-duty-ot-cell hidden">
                                  <div class="straight-duty-ot-fields straight-duty-conditional hidden">
                                    <label><small>OT In</small><input class="straight-duty-ot-start time-24-input" type="text" inputmode="numeric" maxlength="5" pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" placeholder="HH:MM"></label>
                                    <span class="time-arrow">→</span>
                                    <label><small>OT Out</small><input class="straight-duty-ot-end time-24-input" type="text" inputmode="numeric" maxlength="5" pattern="(?:[01][0-9]|2[0-3]):[0-5][0-9]" placeholder="HH:MM"></label>
                                  </div>
                                </td>
                                <td class="ot-mode-cell total-hours-mode-cell">
                                  <input class="row-total-hours total-hours-box" type="text" value="" readonly placeholder="0.00">
                                  <small class="row-ot-breakdown attendance-subline hidden"></small>
                                </td>
                                <td class="ot-mode-cell dayoff-mode-cell">
                                  <div class="row-dayoff-cell">
                                    <span class="row-dayoff-name">${emp.dayOff ? escapeHtml(emp.dayOff) : "Not set"}</span>
                                    <span class="row-dayoff-active-badge hidden">DAY OFF</span>
                                  </div>
                                </td>
                                <td class="attendance-choice-cell leave-choice-cell">
                                  <div class="auto-leave-cell">
                                    <span class="row-leave-auto-badge muted">—</span>
                                    <small class="row-leave-auto-note hidden"></small>
                                  </div>
                                  <input class="row-leave hidden" type="checkbox" tabindex="-1" aria-hidden="true">
                                  <select class="row-leave-type hidden" tabindex="-1" aria-hidden="true"><option value="VL">VL</option><option value="SL">SL</option></select>
                                </td>
                                ${isMaintenanceSupervisor?`
                                <td class="ot-mode-cell maintenance-equipment-mode-cell">
                                  <select class="row-maintenance-equipment maintenance-equipment-select" aria-label="Equipment for ${escapeHtml(emp.name)}">
                                    <option value="">Select equipment</option>
                                    ${MAINTENANCE_EQUIPMENT.map(item=>`<option value="${escapeHtml(item.equipment)}">${escapeHtml(item.equipment)}</option>`).join("")}
                                  </select>
                                </td>
                                <td class="ot-mode-cell maintenance-equipment-mode-cell">
                                  <span class="row-maintenance-equipment-location maintenance-equipment-location">—</span>
                                </td>`:""}
                                <td>
                                  <input class="row-reason" type="text" placeholder="Enter reason...">
                                </td>
                              </tr>`;
                          }).join("") : `
                            <tr>
                              <td colspan="${isMaintenanceSupervisor?14:12}"><div class="empty compact-empty">No ${shift.toLowerCase()} shift employees assigned to ${location}.</div></td>
                            </tr>`}
                        </tbody>
                      </table>
                    </div>
                  </div>`;
              }).join("")}
            </section>`).join("")}

          <div class="bulk-ot-footer">
            <div class="bulk-summary">
              <span><strong id="selectedOtCount">0</strong> employee entry(s)</span>
              <span><strong id="selectedOtHours">0.00</strong> total OT hours</span>
            </div>
            <div class="actions">
              <button id="clearBulkOt" class="btn btn-light" type="button">Clear Entries</button>
              <button id="submitBulkOt" class="btn btn-primary" type="button">Submit Overtime to Request Approver</button>
            </div>
          </div>
        </div>
      </div>`;

    document.getElementById("goToScheduleSetupFromOT")?.addEventListener("click",()=>{navigateTo("employee-schedule")});
    document.getElementById("openHolidayCalendarFromOT")?.addEventListener("click",()=>openPhilippineHolidayCalendar(document.getElementById("bulkOTDate")?.value||toDateKey(new Date())));
    const rows = [...document.querySelectorAll(".ot-entry-row")];
    const countEl = document.getElementById("selectedOtCount");
    const hoursEl = document.getElementById("selectedOtHours");

    const calculateTimeBlockHours = (start,end)=>{
      if(!start || !end)return 0;
      if(!isValid24HourTime(start) || !isValid24HourTime(end))return 0;
      const hours=Number(calcHours(start,end));
      return Number.isFinite(hours) && hours>0 ? hours : 0;
    };

    const getRowAttendanceStatus = row=>{
      if(row.querySelector(".row-leave")?.checked)return "Leave";
      if(row.querySelector(".row-absent")?.checked)return "Absent";
      return "";
    };

    const calculateRowHours = row=>{
      if(getRowAttendanceStatus(row)){
        const totalBox=row.querySelector(".row-total-hours");
        if(totalBox)totalBox.value="";
        row.classList.remove("active-ot-row");
        return 0;
      }
      const normalStart=row.querySelector(".row-ot-start")?.value || "";
      const normalEnd=row.querySelector(".row-ot-end")?.value || "";
      const straightDuty=row.querySelector(".row-straight-duty")?.checked || false;
      const straightScheduleStart=row.querySelector(".straight-duty-schedule-start")?.value || "";
      const straightScheduleEnd=row.querySelector(".straight-duty-schedule-end")?.value || "";
      const straightOtStart=row.querySelector(".straight-duty-ot-start")?.value || "";
      const straightOtEnd=row.querySelector(".straight-duty-ot-end")?.value || "";
      const totalBox=row.querySelector(".row-total-hours");

      const breakdown=proposedOTBreakdown({
        scheduleStart:row.dataset.scheduleStart||"",
        scheduleEnd:row.dataset.scheduleEnd||"",
        normalOtStart:normalStart,
        normalOtEnd:normalEnd,
        otType:row.querySelector(".row-ot-type")?.value||"Regular Day",
        otDate:document.getElementById("bulkOtDate")?.value||"",
        straightDuty,
        straightDutyScheduleStart:straightScheduleStart,
        straightDutyScheduleEnd:straightScheduleEnd,
        straightDutyOtStart:straightOtStart,
        straightDutyOtEnd:straightOtEnd
      });
      const totalHours=breakdown.total;
      const breakdownEl=row.querySelector(".row-ot-breakdown");
      row.dataset.scheduledOtHours=breakdown.scheduledOtHours.toFixed(2);
      row.dataset.extraOtHours=breakdown.extraOtHours.toFixed(2);

      if(totalHours<=0){
        if(totalBox)totalBox.value="";
        if(breakdownEl){breakdownEl.textContent="";breakdownEl.classList.add("hidden");}
        row.classList.remove("active-ot-row");
        return 0;
      }

      if(totalBox)totalBox.value=totalHours.toFixed(2);
      if(breakdownEl){
        if(breakdown.fullDutyOt){
          breakdownEl.textContent=`${breakdown.scheduledOtHours.toFixed(2)} sched + ${breakdown.extraOtHours.toFixed(2)} extra`;
          breakdownEl.classList.remove("hidden");
        }else{
          breakdownEl.textContent="";
          breakdownEl.classList.add("hidden");
        }
      }
      row.classList.add("active-ot-row");
      return totalHours;
    };

    const updateBulkSummary = ()=>{
      let count = 0;
      let total = 0;

      rows.forEach(row=>{
        const hours = calculateRowHours(row);
        const attendanceStatus=getRowAttendanceStatus(row);
        if(hours > 0 || (attendanceStatus && attendanceStatus!=="Leave")){
          count++;
          total += hours;
        }
      });

      if(countEl) countEl.textContent = String(count);
      if(hoursEl) hoursEl.textContent = total.toFixed(2);
    };

    const formatTime24 = value=>formatClockTime24(value);

    const prepare24HourInput = input=>{
      if(!input)return;
      input.addEventListener("input",()=>{
        let digits=input.value.replace(/\D/g,"").slice(0,4);
        if(digits.length>2)input.value=`${digits.slice(0,2)}:${digits.slice(2)}`;
        else input.value=digits;
      });
      input.addEventListener("blur",()=>{
        const normalized=normalize24HourTime(input.value);
        if(isValid24HourTime(normalized)){
          input.value=normalized;
          input.classList.remove("invalid-time");
        }else if(input.value){
          input.classList.add("invalid-time");
          showToast("Use 24-hour time in HH:MM format (00:00–23:59).");
        }else{
          input.classList.remove("invalid-time");
        }
        updateBulkSummary();
      });
    };

    content.querySelectorAll(".time-24-input").forEach(prepare24HourInput);

    const getSelectedOtDateKey=()=>document.getElementById("bulkOtDate")?.value || "";
    const getSelectedOtWeekday=()=>{
      const value=getSelectedOtDateKey();
      if(!value)return "";
      return parseLocalDate(value).toLocaleDateString("en-PH",{weekday:"long"});
    };

    const updateDayOffAndHolidayIndicators=()=>{
      const selectedDate=getSelectedOtDateKey();
      const selectedDay=getSelectedOtWeekday();
      const holiday=getPhilippineHoliday(selectedDate);
      const status=document.getElementById("bulkHolidayStatus");
      if(status){
        if(holiday){
          status.className=`holiday-status-banner ${getHolidayCategoryClass(holiday.category)}`;
          status.innerHTML=`<strong>${escapeHtml(holiday.name)}</strong><span>${escapeHtml(holiday.label)} • OT Type: ${escapeHtml(getAutomaticOtType(selectedDate,false))} • Paid schedule hours (1-hour lunch excluded) + extra OT hours = Total OT Hours</span>`;
        }else{
          status.className="holiday-status-banner holiday-regular-day";
          status.innerHTML=`<strong>Regular Day</strong><span>No national holiday on ${selectedDate?formatDate(selectedDate):"the selected date"}. Day Off rules still apply per employee.</span>`;
        }
      }

      rows.forEach(row=>{
        const approvedLeave=getApprovedLeaveForEmployeeDate(row.dataset.employeeNo,selectedDate);
        const leaveToggle=row.querySelector(".row-leave");
        const leaveType=row.querySelector(".row-leave-type");
        const autoLeaveBadge=row.querySelector(".row-leave-auto-badge");
        const autoLeaveNote=row.querySelector(".row-leave-auto-note");
        const absentToggle=row.querySelector(".row-absent");
        const reasonInput=row.querySelector(".row-reason");
        const previouslyAutoLeave=row.dataset.autoLeaveReason==="true";

        if(approvedLeave){
          if(leaveToggle)leaveToggle.checked=true;
          if(leaveType)leaveType.value=approvedLeave.leaveType;
          if(absentToggle){absentToggle.checked=false;absentToggle.disabled=true;}
          row.querySelector(".row-absent-type")?.classList.add("hidden");
          row.dataset.approvedLeaveRequestId=approvedLeave.id;
          row.dataset.autoLeaveReason="true";
          if(autoLeaveBadge){
            autoLeaveBadge.textContent=approvedLeave.leaveType;
            autoLeaveBadge.className="row-leave-auto-badge leave-type-badge";
          }
          if(autoLeaveNote){autoLeaveNote.textContent=`Approved ${approvedLeave.leaveType} • ${formatDate(approvedLeave.startDate)}${approvedLeave.endDate!==approvedLeave.startDate?` – ${formatDate(approvedLeave.endDate)}`:""}`;autoLeaveNote.classList.remove("hidden");}
          if(reasonInput){reasonInput.value=approvedLeave.reason||`${approvedLeave.leaveType} approved leave.`;reasonInput.readOnly=true;}
        }else{
          if(leaveToggle)leaveToggle.checked=false;
          if(absentToggle)absentToggle.disabled=false;
          delete row.dataset.approvedLeaveRequestId;
          if(autoLeaveBadge){autoLeaveBadge.textContent="—";autoLeaveBadge.className="row-leave-auto-badge muted";}
          if(autoLeaveNote){autoLeaveNote.textContent="";autoLeaveNote.classList.add("hidden");}
          if(previouslyAutoLeave && reasonInput)reasonInput.value="";
          if(reasonInput)reasonInput.readOnly=false;
          delete row.dataset.autoLeaveReason;
        }

        const attendanceStatus=getRowAttendanceStatus(row);
        const leaveActive=attendanceStatus==="Leave";
        const absentActive=attendanceStatus==="Absent";
        row.classList.toggle("attendance-status-active",Boolean(attendanceStatus));
        row.classList.toggle("leave-status-active",leaveActive);
        row.classList.toggle("absent-status-active",absentActive);
        if(attendanceStatus){
          const otStart=row.querySelector(".row-ot-start");if(otStart)otStart.value="";
          const otEnd=row.querySelector(".row-ot-end");if(otEnd)otEnd.value="";
          const total=row.querySelector(".row-total-hours");if(total)total.value="";
          const straight=row.querySelector(".row-straight-duty");if(straight)straight.checked=false;
          row.querySelectorAll(".straight-duty-schedule-start, .straight-duty-schedule-end, .straight-duty-ot-start, .straight-duty-ot-end").forEach(input=>input.value="");
          row.classList.remove("straight-duty-active","active-ot-row");
        }else{
          const otStart=row.querySelector(".row-ot-start");
          const currentlyDayOff=Boolean(selectedDay && row.dataset.dayOff && selectedDay===row.dataset.dayOff);
          if(otStart && !otStart.value && !currentlyDayOff)otStart.value=row.dataset.scheduleEnd || "";
        }

        const isDayOff=Boolean(selectedDay && row.dataset.dayOff && selectedDay===row.dataset.dayOff);
        const isHoliday=Boolean(holiday);
        const badge=row.querySelector(".row-dayoff-active-badge");
        const dayOffName=row.querySelector(".row-dayoff-name");
        const otTypeSelect=row.querySelector(".row-ot-type");
        const holidayNote=row.querySelector(".row-holiday-note");
        row.dataset.activeDayOff=isDayOff ? "true" : "false";
        row.dataset.activeHoliday=isHoliday ? "true" : "false";
        row.classList.toggle("employee-dayoff-active",(isDayOff || isHoliday) && !attendanceStatus);

        // Holiday applies to every employee. Show the actual holiday in the Day Off column.
        if(dayOffName){
          dayOffName.textContent=isHoliday ? holiday.name : (row.dataset.dayOff || "Not set");
        }
        if(badge){
          badge.textContent=isHoliday ? "HOLIDAY" : "DAY OFF";
          badge.classList.toggle("hidden",(!isHoliday && !isDayOff) || Boolean(attendanceStatus));
        }

        // PH Holiday OT Type follows the configured holiday classification.
        // A non-holiday weekly Day Off stays Regular Day until Rest Day OT is manually selected.
        const automaticType=getAutomaticOtType(selectedDate,isDayOff);
        const manuallyOverridden=Boolean(!isHoliday && otTypeSelect?.dataset.manualOverrideDate===selectedDate);
        if(otTypeSelect && !manuallyOverridden && !attendanceStatus){
          otTypeSelect.value=automaticType;
          otTypeSelect.dataset.autoType=automaticType;
        }
        if(otTypeSelect)otTypeSelect.disabled=Boolean(isHoliday || attendanceStatus);

        const restDayOtSelected=otTypeSelect?.value==="Rest Day OT";
        // Leave and Absent mean the employee did not work, so Schedule and OT controls stay hidden.
        // Holiday overrides weekly Day Off: schedule is visible and all worked hours from Schedule In count as OT.
        // A normal non-holiday Day Off keeps Schedule blank until Rest Day OT is selected.
        const showSchedule=!attendanceStatus && (isHoliday || !isDayOff || restDayOtSelected);
        const scheduleView=row.querySelector(".newot-schedule-view");
        const scheduleEdit=row.querySelector(".newot-time-edit");
        if(!showSchedule){
          scheduleView?.classList.add("hidden");
          scheduleEdit?.classList.add("hidden");
          delete row.dataset.scheduleEditing;
          const otStart=row.querySelector(".row-ot-start");
          const otEnd=row.querySelector(".row-ot-end");
          if(otStart && !otEnd?.value && [row.dataset.scheduleStart,row.dataset.scheduleEnd].includes(otStart.value))otStart.value="";
        }else{
          if(row.dataset.scheduleEditing==="true"){
            scheduleView?.classList.add("hidden");
            scheduleEdit?.classList.remove("hidden");
          }else{
            scheduleEdit?.classList.add("hidden");
            scheduleView?.classList.remove("hidden");
          }
          const fullDutyOt=isHoliday || (isDayOff && restDayOtSelected);
          if(fullDutyOt && !leaveActive){
            const otStart=row.querySelector(".row-ot-start");
            // Do not auto-create an OT request: only OT In is prefilled. Supervisor still enters OT Out for employees who actually worked.
            if(otStart && (!otStart.value || otStart.value===row.dataset.scheduleEnd))otStart.value=row.dataset.scheduleStart || "";
          }else if(!isDayOff && !leaveActive){
            const otStart=row.querySelector(".row-ot-start");
            // Returning from a holiday to a normal workday restores the standard OT start at Schedule Out.
            if(otStart && (!otStart.value || otStart.value===row.dataset.scheduleStart))otStart.value=row.dataset.scheduleEnd || "";
          }
        }

        if(holidayNote){
          const notes=[];
          if(!attendanceStatus && holiday)notes.push(`${holiday.name} • Paid schedule hours (1-hour lunch excluded) + extra OT hours = Total OT`);
          if(!attendanceStatus && isDayOff && !isHoliday)notes.push(restDayOtSelected ? "Day Off • Schedule hours + extra OT hours = Total Rest Day OT" : "Employee Day Off • Select Rest Day OT to enter worked hours");
          if(notes.length){holidayNote.textContent=notes.join(" • ");holidayNote.classList.remove("hidden");}
          else{holidayNote.textContent="";holidayNote.classList.add("hidden");}
        }
      });
      updateBulkSummary();
    };

    document.getElementById("bulkOtDate")?.addEventListener("change",()=>{
      document.querySelectorAll(".row-ot-type").forEach(select=>delete select.dataset.manualOverrideDate);
      updateDayOffAndHolidayIndicators();
    });
    document.querySelectorAll(".row-ot-type").forEach(select=>{
      select.addEventListener("change",()=>{
        select.dataset.manualOverrideDate=getSelectedOtDateKey();
        delete select.dataset.autoType;
        updateDayOffAndHolidayIndicators();
        updateBulkSummary();
      });
    });

    const todayInput=document.getElementById("bulkOtDate");
    if(todayInput && !todayInput.value)todayInput.value=toDateKey(new Date());
    updateDayOffAndHolidayIndicators();

    rows.forEach(row=>{
      const viewBox = row.querySelector(".newot-schedule-view");
      const editBox = row.querySelector(".newot-time-edit");
      const editBtn = row.querySelector(".newot-edit-time-btn");
      const saveBtn = row.querySelector(".newot-save-time-btn");
      const cancelBtn = row.querySelector(".newot-cancel-time-btn");
      const scheduleStart = row.querySelector(".schedule-start-time");
      const scheduleEnd = row.querySelector(".schedule-end-time");
      const scheduleText = row.querySelector(".current-schedule-time");
      const otStart = row.querySelector(".row-ot-start");
      const straightDutyToggle=row.querySelector(".row-straight-duty");
      const straightDutyFields=[...row.querySelectorAll(".straight-duty-conditional")];
      const leaveToggle=row.querySelector(".row-leave");
      const absentToggle=row.querySelector(".row-absent");
      const leaveType=row.querySelector(".row-leave-type");
      const absentType=row.querySelector(".row-absent-type");
      const reasonInput=row.querySelector(".row-reason");
      const maintenanceEquipmentSelect=row.querySelector(".row-maintenance-equipment");
      const maintenanceEquipmentLocation=row.querySelector(".row-maintenance-equipment-location");
      maintenanceEquipmentSelect?.addEventListener("change",()=>{
        const item=MAINTENANCE_EQUIPMENT.find(eq=>eq.equipment===maintenanceEquipmentSelect.value);
        if(maintenanceEquipmentLocation)maintenanceEquipmentLocation.textContent=item?.location || "—";
      });

      const updateStraightDutyColumns=()=>{
        const table=row.closest("table");
        if(!table)return;
        const hasStraightDuty=[...table.querySelectorAll(".row-straight-duty")].some(cb=>cb.checked && !cb.closest(".ot-entry-row")?.classList.contains("attendance-status-active"));
        table.querySelectorAll(".straight-duty-extra-col, .straight-duty-extra-cell").forEach(el=>{
          el.classList.toggle("hidden",!hasStraightDuty);
        });
        table.querySelectorAll(".ot-entry-row").forEach(r=>{
          const attendanceActive=Boolean(getRowAttendanceStatus(r));
          const checked=(r.querySelector(".row-straight-duty")?.checked || false) && !attendanceActive;
          r.querySelectorAll(".straight-duty-conditional").forEach(el=>el.classList.toggle("hidden",!checked));
          r.classList.toggle("straight-duty-active",checked);
        });
      };

      const setAttendanceMode=mode=>{
        if(mode==="Leave" && leaveToggle?.checked && absentToggle)absentToggle.checked=false;
        if(mode==="Absent" && absentToggle?.checked && leaveToggle)leaveToggle.checked=false;
        const status=getRowAttendanceStatus(row);
        const leaveActive=status==="Leave";
        const absentActive=status==="Absent";

        if(leaveType)leaveType.classList.add("hidden");
        absentType?.classList.toggle("hidden",!absentActive);
        row.classList.toggle("attendance-status-active",Boolean(status));
        row.classList.toggle("leave-status-active",leaveActive);
        row.classList.toggle("absent-status-active",absentActive);

        if(reasonInput){
          reasonInput.placeholder=leaveActive ? "Enter leave reason..." : absentActive ? "Enter absence reason..." : "Enter reason...";
        }

        if(status){
          const normalOtStart=row.querySelector(".row-ot-start");if(normalOtStart)normalOtStart.value="";
          const normalOtEnd=row.querySelector(".row-ot-end");if(normalOtEnd)normalOtEnd.value="";
          const totalHours=row.querySelector(".row-total-hours");if(totalHours)totalHours.value="";
          if(straightDutyToggle)straightDutyToggle.checked=false;
          straightDutyFields.forEach(el=>el.classList.add("hidden"));
          row.querySelectorAll(".straight-duty-schedule-start, .straight-duty-schedule-end, .straight-duty-ot-start, .straight-duty-ot-end").forEach(input=>input.value="");
          row.classList.remove("straight-duty-active","active-ot-row","employee-dayoff-active");
        }else{
          const normalOtStart=row.querySelector(".row-ot-start");
          const selectedDay=getSelectedOtWeekday();
          const isDayOff=Boolean(selectedDay && row.dataset.dayOff && selectedDay===row.dataset.dayOff);
          const isHoliday=Boolean(getPhilippineHoliday(getSelectedOtDateKey()));
          if(normalOtStart && !normalOtStart.value){
            if(isHoliday)normalOtStart.value=row.dataset.scheduleStart || "";
            else if(!isDayOff)normalOtStart.value=row.dataset.scheduleEnd || "";
          }
        }

        updateStraightDutyColumns();
        updateDayOffAndHolidayIndicators();
        updateBulkSummary();
      };

      leaveToggle?.addEventListener("change",()=>setAttendanceMode("Leave"));
      absentToggle?.addEventListener("change",()=>setAttendanceMode("Absent"));

      straightDutyToggle?.addEventListener("change",()=>{
        if(getRowAttendanceStatus(row)){
          straightDutyToggle.checked=false;
          return;
        }
        const enabled=straightDutyToggle.checked;
        straightDutyFields.forEach(el=>el.classList.toggle("hidden",!enabled));
        row.classList.toggle("straight-duty-active",enabled);
        if(!enabled){
          row.querySelectorAll(".straight-duty-schedule-start, .straight-duty-schedule-end, .straight-duty-ot-start, .straight-duty-ot-end").forEach(input=>{
            input.value="";
          });
        }
        updateStraightDutyColumns();
        updateBulkSummary();
      });

      updateStraightDutyColumns();

      editBtn?.addEventListener("click",()=>{
        scheduleStart.value = row.dataset.scheduleStart;
        scheduleEnd.value = row.dataset.scheduleEnd;
        row.dataset.scheduleEditing="true";
        viewBox.classList.add("hidden");
        editBox.classList.remove("hidden");
      });

      cancelBtn?.addEventListener("click",()=>{
        scheduleStart.value = row.dataset.scheduleStart;
        scheduleEnd.value = row.dataset.scheduleEnd;
        delete row.dataset.scheduleEditing;
        editBox.classList.add("hidden");
        viewBox.classList.remove("hidden");
      });

      saveBtn?.addEventListener("click",()=>{
        scheduleStart.value=normalize24HourTime(scheduleStart.value);
        scheduleEnd.value=normalize24HourTime(scheduleEnd.value);
        if(!scheduleStart.value || !scheduleEnd.value){
          showToast("Complete the employee schedule time.");
          return;
        }
        if(!isValid24HourTime(scheduleStart.value) || !isValid24HourTime(scheduleEnd.value)){
          showToast("Schedule must use 24-hour HH:MM format (00:00–23:59).");
          return;
        }

        row.dataset.scheduleStart = scheduleStart.value;
        row.dataset.scheduleEnd = scheduleEnd.value;
        updateEmployeeShiftTime(row.dataset.employeeNo,scheduleStart.value,scheduleEnd.value);
        scheduleText.textContent = `${formatTime24(scheduleStart.value)} – ${formatTime24(scheduleEnd.value)}`;

        // On Holiday / Rest Day OT, all worked hours including the scheduled shift are overtime,
        // so OT In follows Schedule In. On a normal workday, OT starts at Schedule Out.
        const fullDutyOt=row.dataset.activeHoliday==="true" || (row.dataset.activeDayOff==="true" && row.querySelector(".row-ot-type")?.value==="Rest Day OT");
        otStart.value = fullDutyOt ? scheduleStart.value : scheduleEnd.value;

        delete row.dataset.scheduleEditing;
        editBox.classList.add("hidden");
        viewBox.classList.remove("hidden");

        updateBulkSummary();
        showToast(`${row.dataset.employeeName} Shift Time saved: ${scheduleStart.value} – ${scheduleEnd.value}. It will be used for future OT and attendance entries.`);
      });
    });

    rows.forEach(row=>{
      const hourInputs=[
        row.querySelector(".row-ot-start"),
        row.querySelector(".row-ot-end"),
        row.querySelector(".straight-duty-ot-start"),
        row.querySelector(".straight-duty-ot-end")
      ];
      ["input","change"].forEach(eventName=>{
        hourInputs.forEach(input=>input?.addEventListener(eventName,()=>updateBulkSummary()));
      });
    });

    // Keep total hours live for both the original OT block and the separate Straight Duty OT block.
    content.addEventListener("input",e=>{
      if(e.target.matches(".row-ot-start, .row-ot-end, .straight-duty-ot-start, .straight-duty-ot-end")){
        const row = e.target.closest(".ot-entry-row");
        if(row) calculateRowHours(row);
        updateBulkSummary();
      }
    });

    content.addEventListener("change",e=>{
      if(e.target.matches(".row-ot-start, .row-ot-end, .straight-duty-ot-start, .straight-duty-ot-end")){
        const row = e.target.closest(".ot-entry-row");
        if(row) calculateRowHours(row);
        updateBulkSummary();
      }
    });

    updateBulkSummary();

    document.getElementById("clearBulkOt").addEventListener("click",()=>{
      rows.forEach(row=>{
        row.querySelector(".row-ot-start").value = row.dataset.scheduleEnd || (row.dataset.schedule==="Night" ? "03:00" : "15:00");
        row.querySelector(".row-ot-end").value="";
        row.querySelector(".row-total-hours").value="";
        row.querySelector(".row-reason").value="";
        row.querySelector(".row-reason").placeholder="Enter reason...";
        const leaveToggle=row.querySelector(".row-leave");
        const absentToggle=row.querySelector(".row-absent");
        if(leaveToggle)leaveToggle.checked=false;
        if(absentToggle)absentToggle.checked=false;
        const leaveType=row.querySelector(".row-leave-type");
        const absentType=row.querySelector(".row-absent-type");
        if(leaveType){leaveType.value="VL";leaveType.classList.add("hidden");}
        if(absentType){absentType.value="AWOL";absentType.classList.add("hidden");}
        row.classList.remove("attendance-status-active","leave-status-active","absent-status-active");
        const otTypeSelect=row.querySelector(".row-ot-type");
        if(otTypeSelect){otTypeSelect.value="Regular Day";delete otTypeSelect.dataset.manualOverrideDate;delete otTypeSelect.dataset.autoType;}
        const straightToggle=row.querySelector(".row-straight-duty");
        if(straightToggle)straightToggle.checked=false;
        row.querySelectorAll(".straight-duty-conditional").forEach(el=>el.classList.add("hidden"));
        row.querySelectorAll(".straight-duty-placeholder").forEach(el=>el.classList.remove("hidden"));
        row.querySelectorAll(".straight-duty-schedule-start, .straight-duty-schedule-end, .straight-duty-ot-start, .straight-duty-ot-end").forEach(input=>input.value="");
        const maintenanceEquipmentSelect=row.querySelector(".row-maintenance-equipment");
        if(maintenanceEquipmentSelect)maintenanceEquipmentSelect.value="";
        const maintenanceEquipmentLocation=row.querySelector(".row-maintenance-equipment-location");
        if(maintenanceEquipmentLocation)maintenanceEquipmentLocation.textContent="—";
        row.classList.remove("active-ot-row","straight-duty-active");
      });
      updateDayOffAndHolidayIndicators();
      updateBulkSummary();
      showToast("Overtime entries cleared.");
    });

    document.getElementById("submitBulkOt").addEventListener("click",()=>{
      const otDate=document.getElementById("bulkOtDate").value;

      if(!otDate){
        showToast("Please select the overtime date.");
        return;
      }

      const entries=[];
      let hasMissingReason=false;
      let hasEntryError=false;

      rows.forEach(row=>{
        const attendanceStatus=getRowAttendanceStatus(row);
        const attendanceType=attendanceStatus==="Leave"
          ? (row.querySelector(".row-leave-type")?.value || "VL")
          : attendanceStatus==="Absent"
            ? (row.querySelector(".row-absent-type")?.value || "AWOL")
            : "";
        const attendanceReason=row.querySelector(".row-reason")?.value.trim() || "";

        // Approved VL/SL is already final-approved and is auto-posted to HR payroll
        // when the leave date arrives. Do not resubmit it through the OT approval flow.
        if(attendanceStatus==="Leave" && row.dataset.approvedLeaveRequestId)return;

        if(attendanceStatus){
          if(!attendanceReason){
            hasMissingReason=true;
            row.querySelector(".row-reason")?.focus();
            return;
          }
          entries.push({
            id:uid(),
            employeeNo:row.dataset.employeeNo,
            employeeName:row.dataset.employeeName,
            position:row.dataset.position,
            schedule:row.dataset.schedule,
            scheduleStart:"",
            scheduleEnd:"",
            scheduleTime:"",
            attendanceStatus,
            attendanceType,
            leaveType:attendanceStatus==="Leave" ? attendanceType : "",
            absentType:attendanceStatus==="Absent" ? attendanceType : "",
            normalOtStart:"",
            normalOtEnd:"",
            straightDuty:false,
            straightDutyScheduleStart:"",
            straightDutyScheduleEnd:"",
            straightDutyOtStart:"",
            straightDutyOtEnd:"",
            straightDutyStart:"",
            straightDutyEnd:"",
            employeeDayOff:row.dataset.dayOff || "",
            department:currentUser.department,
            supervisorName:currentUser.displayName,
            otDate,
            otType:"",
            startTime:"",
            endTime:"",
            totalHours:"0.00",
            workArea:row.dataset.location || "",
            maintenanceEquipment:"",
            maintenanceEquipmentLocation:"",
            reason:attendanceReason,
            status:"Pending",
            submittedBy:currentUser.username,
            createdAt:new Date().toISOString(),
            reviewedBy:"",
            reviewedAt:"",
            managerRemarks:""
          });
          return;
        }

        const startInput=row.querySelector(".row-ot-start");
        const endInput=row.querySelector(".row-ot-end");
        const normalStart=normalize24HourTime(startInput.value);
        const normalEnd=normalize24HourTime(endInput.value);
        startInput.value=normalStart;
        endInput.value=normalEnd;

        const straightDuty=row.querySelector(".row-straight-duty")?.checked || false;
        const sdScheduleStartInput=row.querySelector(".straight-duty-schedule-start");
        const sdScheduleEndInput=row.querySelector(".straight-duty-schedule-end");
        const sdOtStartInput=row.querySelector(".straight-duty-ot-start");
        const sdOtEndInput=row.querySelector(".straight-duty-ot-end");
        const straightDutyScheduleStart=normalize24HourTime(sdScheduleStartInput?.value || "");
        const straightDutyScheduleEnd=normalize24HourTime(sdScheduleEndInput?.value || "");
        const straightDutyOtStart=normalize24HourTime(sdOtStartInput?.value || "");
        const straightDutyOtEnd=normalize24HourTime(sdOtEndInput?.value || "");
        if(sdScheduleStartInput)sdScheduleStartInput.value=straightDutyScheduleStart;
        if(sdScheduleEndInput)sdScheduleEndInput.value=straightDutyScheduleEnd;
        if(sdOtStartInput)sdOtStartInput.value=straightDutyOtStart;
        if(sdOtEndInput)sdOtEndInput.value=straightDutyOtEnd;

        const hasNormalOt=Boolean(normalEnd);
        const hasAnyEntry=hasNormalOt || straightDuty;
        if(!hasAnyEntry)return;

        const maintenanceEquipmentSelect=row.querySelector(".row-maintenance-equipment");
        const maintenanceEquipment=maintenanceEquipmentSelect?.value || "";
        const maintenanceEquipmentItem=MAINTENANCE_EQUIPMENT.find(item=>item.equipment===maintenanceEquipment);
        const maintenanceEquipmentLocation=maintenanceEquipmentItem?.location || "";
        if(isMaintenanceSupervisor && !maintenanceEquipment){
          showToast(`Select Equipment for ${row.dataset.employeeName}.`);
          maintenanceEquipmentSelect?.focus();
          hasEntryError=true;
          return;
        }

        if(hasNormalOt && (!isValid24HourTime(normalStart) || !isValid24HourTime(normalEnd))){
          showToast(`Use valid 24-hour HH:MM for the regular OT of ${row.dataset.employeeName}.`);
          endInput.focus();
          hasEntryError=true;
          return;
        }

        if(straightDuty){
          const straightFields=[straightDutyScheduleStart,straightDutyScheduleEnd,straightDutyOtStart,straightDutyOtEnd];
          if(straightFields.some(value=>!value || !isValid24HourTime(value))){
            showToast(`Complete the separate Straight Duty Schedule and Straight Duty OT for ${row.dataset.employeeName}.`);
            hasEntryError=true;
            return;
          }
          const straightOtHours=calculateTimeBlockHours(straightDutyOtStart,straightDutyOtEnd);
          if(straightOtHours<=0){
            showToast(`Invalid Straight Duty OT time for ${row.dataset.employeeName}.`);
            hasEntryError=true;
            return;
          }
        }

        const reason=row.querySelector(".row-reason").value.trim();
        const otType=row.querySelector(".row-ot-type")?.value || "";
        if(!otType){
          showToast(`Select an OT Type for ${row.dataset.employeeName}.`);
          row.querySelector(".row-ot-type")?.focus();
          hasEntryError=true;
          return;
        }

        // If the selected date is this employee's Day Off, any worked OT must be
        // explicitly classified as Rest Day OT. This also guarantees that the
        // schedule is visible/editable before the record can be submitted.
        if(row.dataset.activeDayOff==="true" && row.dataset.activeHoliday!=="true" && otType!=="Rest Day OT"){
          showToast(`${row.dataset.employeeName} is on Day Off. Select Rest Day OT first to show/edit the duty schedule.`);
          row.querySelector(".row-ot-type")?.focus();
          hasEntryError=true;
          return;
        }

        if(!reason){
          hasMissingReason=true;
          row.querySelector(".row-reason").focus();
          return;
        }

        const computedHours = calculateRowHours(row);
        if(computedHours <= 0){
          showToast(`Enter a valid regular OT and/or Straight Duty OT time for ${row.dataset.employeeName}.`);
          hasEntryError=true;
          return;
        }

        // startTime/endTime stay backward-compatible for current HR/Manager views.
        // New explicit fields keep regular OT and Straight Duty OT fully separate.
        const displayStart=hasNormalOt ? normalStart : straightDutyOtStart;
        const displayEnd=hasNormalOt ? normalEnd : straightDutyOtEnd;

        entries.push({
          id:uid(),
          employeeNo:row.dataset.employeeNo,
          employeeName:row.dataset.employeeName,
          position:row.dataset.position,
          schedule:row.dataset.schedule,
          scheduleStart:row.dataset.scheduleStart,
          scheduleEnd:row.dataset.scheduleEnd,
          scheduleTime:`${formatTime24(row.dataset.scheduleStart)} – ${formatTime24(row.dataset.scheduleEnd)}`,
          normalOtStart:hasNormalOt ? normalStart : "",
          normalOtEnd:hasNormalOt ? normalEnd : "",
          straightDuty,
          straightDutyScheduleStart:straightDuty ? straightDutyScheduleStart : "",
          straightDutyScheduleEnd:straightDuty ? straightDutyScheduleEnd : "",
          straightDutyOtStart:straightDuty ? straightDutyOtStart : "",
          straightDutyOtEnd:straightDuty ? straightDutyOtEnd : "",
          // Legacy aliases retained for older records/views.
          straightDutyStart:straightDuty ? straightDutyScheduleStart : "",
          straightDutyEnd:straightDuty ? straightDutyScheduleEnd : "",
          employeeDayOff:row.dataset.dayOff || "",
          attendanceStatus:"",
          attendanceType:"",
          leaveType:"",
          absentType:"",
          department:currentUser.department,
          supervisorName:currentUser.displayName,
          otDate,
          otType,
          isHoliday:Boolean(getPhilippineHoliday(otDate)),
          holidayName:getPhilippineHoliday(otDate)?.name || "",
          holidayClassification:getPhilippineHoliday(otDate)?.label || "",
          startTime:displayStart,
          endTime:displayEnd,
          totalHours:computedHours.toFixed(2),
          scheduledOtHours:Number(row.dataset.scheduledOtHours||0).toFixed(2),
          extraOtHours:Number(row.dataset.extraOtHours||0).toFixed(2),
          workArea:row.dataset.location || "",
          maintenanceEquipment:isMaintenanceSupervisor ? maintenanceEquipment : "",
          maintenanceEquipmentLocation:isMaintenanceSupervisor ? maintenanceEquipmentLocation : "",
          reason,
          status:"Pending",
          submittedBy:currentUser.username,
          createdAt:new Date().toISOString(),
          reviewedBy:"",
          reviewedAt:"",
          managerRemarks:""
        });
      });

      if(hasEntryError)return;

      if(hasMissingReason){
        showToast("Please enter a reason for every employee entry.");
        return;
      }

      if(!entries.length){
        showToast("Enter OT time for at least one employee.");
        return;
      }

      const all=getRequests();
      all.push(...entries);
      saveRequests(all);
      addManagerNotification(entries);

      showToast(`${entries.length} employee request(s) submitted to Request Approver.`);
      navigateTo("my-requests");
    });

    return;
  }

  if(currentPage==="employee-schedule"){
    setPage(
      "Employee Schedule",
      "SUPERVISOR SCHEDULE SETUP",
      `HR manages employee creation and department assignment. Set Work Area, Morning/Night schedule, editable Shift Time, and Day Off for ${currentUser.department}.`
    );

    const employees = getDepartmentEmployees(currentUser.department);
    const savedShiftTimeOverrides = getEmployeeShiftTimeOverrides();
    const morningCount = employees.filter(emp=>emp.schedule==="Morning").length;
    const nightCount = employees.filter(emp=>emp.schedule==="Night").length;
    const unassignedCount = employees.filter(emp=>!isEmployeeSetupComplete(emp)).length;

    content.innerHTML = `
      ${heroBanner(
        "Employee roster & schedule",
        "New employees are added by HR and assigned to a department. Supervisors set each employee's Work Area, Morning/Night schedule, editable Shift Time, and weekly Day Off.",
        employees.length,
        "employees"
      )}

      ${unassignedCount?`<div class="schedule-required-alert"><div><span class="schedule-required-icon">◷</span><div><strong>${unassignedCount} employee${unassignedCount===1?"":"s"} waiting for Work Area / schedule setup</strong><span>Set both Work Area and Morning/Night shift so ${unassignedCount===1?"this employee":"these employees"} can appear in New OT Request.</span></div></div></div>`:""}

      <div class="schedule-summary-grid">
        <div class="schedule-summary-card morning-card">
          <span class="schedule-chip morning">Morning Shift</span>
          <strong>${morningCount}</strong>
          <small>Default 06:00 – 15:00</small>
        </div>
        <div class="schedule-summary-card night-card">
          <span class="schedule-chip night">Night Shift</span>
          <strong>${nightCount}</strong>
          <small>Default 18:00 – 03:00</small>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-title-group">
            <h3>${escapeHtml(currentUser.department)} Employee List</h3>
            <p>HR controls employee creation and department assignment. Supervisors set Work Area, Morning/Night schedule, and Day Off.</p>
          </div>
        </div>

        <div class="schedule-management-wrap">
          <table class="schedule-management-table">
            <thead>
              <tr><th>Name</th><th>Position</th><th>Work Area</th><th>Schedule</th><th>Shift Time</th><th>Day Off</th><th>Status</th></tr>
            </thead>
            <tbody>
              ${employees.map(emp=>`
                <tr data-employee-no="${escapeHtml(emp.no)}" data-is-custom="${emp.isCustom ? "true" : "false"}" class="${!isEmployeeSetupComplete(emp)?"schedule-required-row":""}">
                  <td><strong>${escapeHtml(emp.name)}</strong>${emp.isCustom ? `<small class="custom-employee-tag">Added by HR</small>` : ""}</td>
                  <td>${escapeHtml(emp.position)}</td>
                  <td>
                    <select class="employee-workarea-select" aria-label="Work area for ${escapeHtml(emp.name)}">
                      <option value="" disabled ${!employeeHasValidWorkArea(emp)?"selected":""}>Select</option>
                      ${OT_LOCATIONS.map(location=>`<option value="${escapeHtml(location)}" ${location===emp.location?"selected":""}>${escapeHtml(location)}</option>`).join("")}
                    </select>
                  </td>
                  <td>
                    <div class="employee-shift-view">
                      <span class="schedule-chip ${emp.schedule==="Unassigned"?"unassigned":emp.schedule.toLowerCase()} employee-current-shift">${emp.schedule==="Unassigned"?"Schedule Required":`${emp.schedule} Shift`}</span>
                      <button class="mini-edit-btn employee-edit-shift-btn" type="button">${emp.schedule==="Unassigned"?"Set Schedule":"✎ Edit Shift"}</button>
                    </div>
                    <div class="employee-shift-edit hidden">
                      <select class="employee-shift-select">
                        <option value="Morning" ${emp.schedule==="Morning"?"selected":""}>Morning Shift</option>
                        <option value="Night" ${emp.schedule==="Night"?"selected":""}>Night Shift</option>
                      </select>
                      <div class="mini-edit-actions"><button class="mini-save-btn employee-save-shift-btn" type="button">Save</button><button class="mini-cancel-btn employee-cancel-shift-btn" type="button">Cancel</button></div>
                    </div>
                  </td>
                  <td class="schedule-preview">
                    ${emp.schedule==="Unassigned"?`<span class="muted">Set shift first</span>`:`<div class="employee-shift-time-editor">
                      <input class="employee-shift-start time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(emp.scheduleStart||"")}" aria-label="Shift start for ${escapeHtml(emp.name)}">
                      <span>→</span>
                      <input class="employee-shift-end time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(emp.scheduleEnd||"")}" aria-label="Shift end for ${escapeHtml(emp.name)}">
                      <button class="mini-save-btn employee-save-shift-time-btn ${savedShiftTimeOverrides[emp.no]?"hidden":""}" type="button">Save Time</button>
                    </div>`}
                  </td>
                  <td>
                    <select class="employee-dayoff-select" aria-label="Day off for ${escapeHtml(emp.name)}">
                      <option value="" ${!emp.dayOff?"selected":""}>Not set</option>
                      ${DAY_OFF_OPTIONS.map(day=>`<option value="${day}" ${day===emp.dayOff?"selected":""}>${day}</option>`).join("")}
                    </select>
                  </td>
                  <td class="employee-schedule-status">${!isEmployeeSetupComplete(emp)?`<span class="badge pending">Needs Setup</span>`:`<span class="badge approved">Ready</span>`}</td>
                </tr>`).join("")}
            </tbody>
          </table>
        </div>
        <div class="schedule-management-note">HR manages employee creation and department assignment. Supervisors manage Work Area, schedule, editable Shift Time, and Day Off. Day Off is automatically highlighted in New OT Request when the selected OT date matches that employee's weekly Day Off. Changes apply to future OT entries and do not modify historical OT records.</div>
      </div>`;

    document.querySelectorAll(".schedule-management-table tbody tr").forEach(row=>{
      const editBtn=row.querySelector(".employee-edit-shift-btn");
      const saveBtn=row.querySelector(".employee-save-shift-btn");
      const cancelBtn=row.querySelector(".employee-cancel-shift-btn");
      const viewBox=row.querySelector(".employee-shift-view");
      const editBox=row.querySelector(".employee-shift-edit");
      const select=row.querySelector(".employee-shift-select");
      const chip=row.querySelector(".employee-current-shift");
      const preview=row.querySelector(".schedule-preview");
      const shiftStartInput=row.querySelector(".employee-shift-start");
      const shiftEndInput=row.querySelector(".employee-shift-end");
      const saveShiftTimeBtn=row.querySelector(".employee-save-shift-time-btn");
      const statusCell=row.querySelector(".employee-schedule-status");
      const workAreaSelect=row.querySelector(".employee-workarea-select");
      const dayOffSelect=row.querySelector(".employee-dayoff-select");
      if(!editBtn || !saveBtn || !cancelBtn || !select)return;
      dayOffSelect?.addEventListener("change",event=>{
        event.stopPropagation();
        const employeeNo=row.dataset.employeeNo;
        const employeeName=row.querySelector("strong")?.textContent||"Employee";
        const dayOff=dayOffSelect.value;
        updateEmployeeDayOff(employeeNo,dayOff);
        if(row.dataset.isCustom==="true")updateCustomEmployee(employeeNo,{dayOff});
        showToast(dayOff ? `${employeeName} Day Off set to ${dayOff}.` : `${employeeName} Day Off cleared.`);
      });
      workAreaSelect?.addEventListener("change",event=>{
        event.stopPropagation();
        const employeeNo=row.dataset.employeeNo;
        const employeeName=row.querySelector("strong")?.textContent||"Employee";
        const newArea=workAreaSelect.value;
        if(!newArea){
          clearEmployeeLocationOverride(employeeNo);
          if(row.dataset.isCustom==="true")updateCustomEmployee(employeeNo,{location:""});
          if(statusCell)statusCell.innerHTML=`<span class="badge pending">Needs Setup</span>`;
          row.classList.add("schedule-required-row");
          showToast(`Select a valid Work Area for ${employeeName}.`);
          return;
        }
        updateEmployeeLocation(employeeNo,newArea);
        if(row.dataset.isCustom==="true")updateCustomEmployee(employeeNo,{location:newArea});
        const currentEmployee=getDepartmentEmployees(currentUser.department).find(emp=>emp.no===employeeNo);
        const complete=currentEmployee && isEmployeeSetupComplete(currentEmployee);
        if(statusCell)statusCell.innerHTML=complete?`<span class="badge approved">Ready</span>`:`<span class="badge pending">Needs Setup</span>`;
        row.classList.toggle("schedule-required-row",!complete);
        if(complete)resolveSupervisorEmployeeNotification(employeeNo,currentUser.department);
        showToast(`${employeeName} Work Area set to ${newArea}.`);
        // Keep the active Employee Schedule row and native select stable.
        // Rebuilding the whole Supervisor navigation here caused a visible UI
        // repaint/jump immediately after a Work Area selection.
        refreshSupervisorScheduleNavBadge();
      });
      [shiftStartInput,shiftEndInput].forEach(input=>{
        if(!input)return;
        input.addEventListener("input",()=>{
          let digits=input.value.replace(/\D/g,"").slice(0,4);
          input.value=digits.length>2?`${digits.slice(0,2)}:${digits.slice(2)}`:digits;
          saveShiftTimeBtn?.classList.remove("hidden");
        });
        input.addEventListener("blur",()=>{
          const normalized=normalize24HourTime(input.value);
          if(normalized && isValid24HourTime(normalized)){input.value=normalized;input.classList.remove("invalid-time");}
          else if(input.value)input.classList.add("invalid-time");
        });
      });
      saveShiftTimeBtn?.addEventListener("click",event=>{
        event.preventDefault();event.stopPropagation();
        const employeeNo=row.dataset.employeeNo;
        const employeeName=row.querySelector("strong")?.textContent||"Employee";
        const start=normalize24HourTime(shiftStartInput?.value||"");
        const end=normalize24HourTime(shiftEndInput?.value||"");
        if(!isValid24HourTime(start)||!isValid24HourTime(end)){showToast("Enter valid Shift In and Shift Out in HH:MM format.");return;}
        if(!updateEmployeeShiftTime(employeeNo,start,end)){showToast("Unable to save shift time.");return;}
        shiftStartInput.value=start;shiftEndInput.value=end;
        saveShiftTimeBtn.classList.add("hidden");
        showToast(`${employeeName} shift time saved: ${start} – ${end}.`);
      });
      editBtn.addEventListener("click",event=>{
        event.preventDefault();
        event.stopPropagation();
        select.value=chip.textContent.includes("Night")?"Night":"Morning";
        viewBox.classList.add("hidden");editBox.classList.remove("hidden");select.focus();
      });
      cancelBtn.addEventListener("click",event=>{event.preventDefault();event.stopPropagation();editBox.classList.add("hidden");viewBox.classList.remove("hidden");});
      saveBtn.addEventListener("click",event=>{
        event.preventDefault();
        event.stopPropagation();
        const employeeNo=row.dataset.employeeNo;
        const employeeName=row.querySelector("strong")?.textContent||"Employee";
        const newShift=select.value;
        const previousShift=chip.textContent.includes("Night")?"Night":chip.textContent.includes("Morning")?"Morning":"Unassigned";
        if(previousShift!==newShift)updateEmployeeSchedule(employeeNo,newShift);
        chip.textContent=`${newShift} Shift`;
        chip.classList.remove("morning","night","unassigned");chip.classList.add(newShift.toLowerCase());
        const currentAfterShift=getDepartmentEmployees(currentUser.department).find(emp=>emp.no===employeeNo);
        const defaults={start:currentAfterShift?.scheduleStart||getDefaultShiftTimes(newShift).start,end:currentAfterShift?.scheduleEnd||getDefaultShiftTimes(newShift).end};
        if(preview){
          preview.innerHTML=`<div class="employee-shift-time-editor"><input class="employee-shift-start time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${defaults.start}"><span>→</span><input class="employee-shift-end time-24-input" type="text" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${defaults.end}"><button class="mini-save-btn employee-save-shift-time-btn" type="button">Save Time</button></div>`;
        }
        const currentEmployee=getDepartmentEmployees(currentUser.department).find(emp=>emp.no===employeeNo);
        const complete=currentEmployee && isEmployeeSetupComplete(currentEmployee);
        if(statusCell)statusCell.innerHTML=complete?`<span class="badge approved">Ready</span>`:`<span class="badge pending">Needs Setup</span>`;
        row.classList.toggle("schedule-required-row",!complete);editBtn.textContent="✎ Edit Shift";
        if(complete)resolveSupervisorEmployeeNotification(employeeNo,currentUser.department);
        editBox.classList.add("hidden");viewBox.classList.remove("hidden");
        showToast(previousShift===newShift?`${employeeName} remains on ${newShift} Shift. Shift Time kept at ${defaults.start} – ${defaults.end}.`:`${employeeName} schedule set to ${newShift} Shift. Shift Time reset to ${defaults.start} – ${defaults.end}; you can edit it anytime.`);
        refreshSupervisorScheduleNavBadge();
        renderSupervisor();
      });
    });
    return;
  }

  setPage("Department OT Status","SUPERVISOR OT STATUS",`View employee-filed OT approval status for ${currentUser.department}. Supervisor does not forward or approve these OT requests.`);
  renderTable(rows,{mode:"supervisor",fixedDepartment:currentUser.department});
}


function clockDateTimeOnDutyDate(dateKey,clockValue,dayOffset=0){
  if(!/^\d{4}-\d{2}-\d{2}$/.test(String(dateKey||"")) || !isValid24HourTime(clockValue))return null;
  const d=parseLocalDate(dateKey);
  const [hours,minutes]=String(clockValue).split(":").map(Number);
  d.setDate(d.getDate()+Number(dayOffset||0));
  d.setHours(hours,minutes,0,0);
  return d;
}
function isEmployeeDutyCompletedForFiling({dateKey,status,timeIn,timeOut,scheduleStart,scheduleEnd,referenceDate=new Date()}={}){
  const todayKey=toDateKey(referenceDate);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(String(dateKey||"")) || dateKey>todayKey)return false;
  if(status==="Present" && isValid24HourTime(timeIn) && isValid24HourTime(timeOut)){
    const inMinutes=attendanceClockMinutes(timeIn);
    const outMinutes=attendanceClockMinutes(timeOut);
    const timeOutDate=clockDateTimeOnDutyDate(dateKey,timeOut,outMinutes<=inMinutes?1:0);
    return Boolean(timeOutDate && referenceDate>=timeOutDate);
  }
  if(isValid24HourTime(scheduleStart) && isValid24HourTime(scheduleEnd)){
    const startMinutes=attendanceClockMinutes(scheduleStart);
    const endMinutes=attendanceClockMinutes(scheduleEnd);
    const scheduledEnd=clockDateTimeOnDutyDate(dateKey,scheduleEnd,endMinutes<=startMinutes?1:0);
    return Boolean(scheduledEnd && referenceDate>=scheduledEnd);
  }
  return dateKey<todayKey;
}

function parseLocalDate(dateStr){
  const [y,m,d] = String(dateStr).split("-").map(Number);
  return new Date(y,m-1,d);
}
function toDateKey(date){
  const y=date.getFullYear();
  const m=String(date.getMonth()+1).padStart(2,"0");
  const d=String(date.getDate()).padStart(2,"0");
  return `${y}-${m}-${d}`;
}
function getEmployeeDutyDateKey(referenceDate=new Date()){
  const d=new Date(referenceDate.getFullYear(),referenceDate.getMonth(),referenceDate.getDate());
  const hour=referenceDate.getHours();
  const minute=referenceDate.getMinutes();
  // A duty date remains active through 03:00 AM of the following calendar day.
  // Example: Aug 12 duty date is the default until Aug 13 03:00; at 03:01 it becomes Aug 13.
  if(hour<3 || (hour===3 && minute===0))d.setDate(d.getDate()-1);
  return toDateKey(d);
}
function getYesterdayDateKey(referenceDate=new Date()){
  const d=new Date(referenceDate.getFullYear(),referenceDate.getMonth(),referenceDate.getDate());
  d.setDate(d.getDate()-1);
  return toDateKey(d);
}
function startOfWeek(date){
  const d=new Date(date.getFullYear(),date.getMonth(),date.getDate());
  const day=d.getDay();
  const diff=day===0 ? -6 : 1-day;
  d.setDate(d.getDate()+diff);
  return d;
}
function daysInMonthFromDate(date){
  return new Date(date.getFullYear(),date.getMonth()+1,0).getDate();
}
function reportPersonKey(r){
  return String(r.employeeName||"").trim().toLowerCase();
}
function averageOTHoursPerPersonPerDay(totalHours,employeeCount,totalDays){
  const employees=Number(employeeCount||0);
  const days=Math.max(1,Number(totalDays||1));
  if(!employees)return 0;
  return Number((Number(totalHours||0)/(employees*days)).toFixed(2));
}
function buildOTReportSeries(records,granularity){
  const groups=new Map();

  records.forEach(r=>{
    if(!r.otDate)return;
    const date=parseLocalDate(r.otDate);
    let key,label,sortDate,calendarDays;

    if(granularity==="daily"){
      key=toDateKey(date);
      label=date.toLocaleDateString("en-PH",{month:"short",day:"numeric"});
      sortDate=new Date(date);
      calendarDays=1;
    }else if(granularity==="weekly"){
      const start=startOfWeek(date);
      const end=new Date(start);
      end.setDate(end.getDate()+6);
      key=toDateKey(start);
      const startLabel=start.toLocaleDateString("en-PH",{month:"short",day:"numeric"});
      const endLabel=end.toLocaleDateString("en-PH",{month:"short",day:"numeric"});
      label=`Mon ${startLabel} – Sun ${endLabel}`;
      sortDate=new Date(start);
      calendarDays=7;
    }else{
      key=`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}`;
      label=date.toLocaleDateString("en-PH",{month:"short",year:"numeric"});
      sortDate=new Date(date.getFullYear(),date.getMonth(),1);
      calendarDays=daysInMonthFromDate(date);
    }

    if(!groups.has(key)){
      groups.set(key,{
        key,label,sortDate,calendarDays,
        totalHours:0,
        people:new Set(),
        personDays:new Set(),
        activeDays:new Set(),
        requestCount:0
      });
    }

    const g=groups.get(key);
    const person=reportPersonKey(r);
    const dateKey=r.otDate;
    g.totalHours += Number(r.totalHours||0);
    if(person)g.people.add(person);
    if(person)g.personDays.add(`${person}|${dateKey}`);
    g.activeDays.add(dateKey);
    g.requestCount++;
  });

  return [...groups.values()]
    .sort((a,b)=>a.sortDate-b.sortDate)
    .map(g=>({
      key:g.key,
      label:g.label,
      sortDate:g.sortDate,
      totalHours:Number(g.totalHours.toFixed(2)),
      peopleCount:g.people.size,
      personDayCount:g.personDays.size,
      activeDays:g.activeDays.size,
      calendarDays:g.calendarDays,
      averagePerDay:Number((g.totalHours/g.calendarDays).toFixed(2)),
      averagePerWeek:Number((g.totalHours/(g.calendarDays/7)).toFixed(2)),
      averagePerPersonPerDay:averageOTHoursPerPersonPerDay(g.totalHours,g.people.size,g.calendarDays),
      requestCount:g.requestCount
    }));
}
function reportPeriodName(granularity){
  return granularity==="daily" ? "Day" : granularity==="weekly" ? "Week" : "Month";
}
function reportEmptyChart(message){
  return `<div class="report-chart-empty">${escapeHtml(message)}</div>`;
}
function svgLineChart(data,series,options={}){
  if(!data.length)return reportEmptyChart("No approved overtime data for this view.");
  const width=760,height=250,left=52,right=18,top=22,bottom=48;
  const plotW=width-left-right,plotH=height-top-bottom;
  const values=data.flatMap(d=>series.map(s=>Number(d[s.key]||0)));
  const max=Math.max(...values,1);
  const niceMax=Math.ceil(max*1.15*2)/2;
  const x=(i)=>data.length===1 ? left+plotW/2 : left+(i/(data.length-1))*plotW;
  const y=(v)=>top+plotH-(Number(v||0)/niceMax)*plotH;
  const grid=[0,.25,.5,.75,1];

  const gridLines=grid.map(p=>{
    const val=niceMax*p;
    const yy=y(val);
    return `<line x1="${left}" y1="${yy}" x2="${width-right}" y2="${yy}" class="chart-grid"/>
      <text x="${left-8}" y="${yy+4}" text-anchor="end" class="chart-axis-text">${val.toFixed(val<10?1:0)}</text>`;
  }).join("");

  const maxLabels=options.showAllLabels ? data.length : granularityLabelLimit(data.length);
  const step=Math.max(1,Math.ceil(data.length/maxLabels));
  const labels=data.map((d,i)=>{
    if(i%step!==0 && i!==data.length-1)return "";
    return `<text x="${x(i)}" y="${height-18}" text-anchor="middle" class="chart-axis-text">${escapeHtml(d.label)}</text>`;
  }).join("");

  const lineSeries=series.map((s,si)=>{
    const points=data.map((d,i)=>`${x(i)},${y(d[s.key])}`).join(" ");
    const dots=data.map((d,i)=>`<circle cx="${x(i)}" cy="${y(d[s.key])}" r="3.5" class="chart-dot chart-series-${si}"><title>${escapeHtml(d.label)}: ${Number(d[s.key]).toFixed(2)} ${escapeHtml(s.suffix||"")}</title></circle>`).join("");
    return `<polyline points="${points}" class="chart-line chart-series-${si}"/>${dots}`;
  }).join("");

  return `<div class="report-chart">
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(options.aria||"Overtime report chart")}">
      ${gridLines}
      ${lineSeries}
      ${labels}
    </svg>
    <div class="chart-legend">${series.map((s,i)=>`<span><i class="legend-dot chart-series-${i}"></i>${escapeHtml(s.label)}</span>`).join("")}</div>
  </div>`;
}
function granularityLabelLimit(length){
  if(length<=7)return 7;
  if(length<=12)return 8;
  return 7;
}
function svgBarChart(data,key,options={}){
  if(!data.length)return reportEmptyChart("No approved overtime data for this view.");

  const width=940,height=320,left=68,right=24,top=34,bottom=58;
  const plotW=width-left-right,plotH=height-top-bottom;
  const values=data.map(d=>Number(d[key]||0));
  const max=Math.max(...values,1);
  const rawStep=max/5;
  const magnitude=Math.pow(10,Math.floor(Math.log10(Math.max(rawStep,.01))));
  const normalized=rawStep/magnitude;
  const niceFactor=normalized<=1?1:normalized<=2?2:normalized<=5?5:10;
  const tickStep=Math.max(.5,niceFactor*magnitude);
  const niceMax=Math.max(tickStep,Math.ceil(max/tickStep)*tickStep);
  const slot=plotW/data.length;
  const barW=Math.min(54,Math.max(12,slot*.56));
  const y=(v)=>top+plotH-(Number(v||0)/niceMax)*plotH;
  const tickCount=Math.max(1,Math.round(niceMax/tickStep));
  const ticks=Array.from({length:tickCount+1},(_,i)=>i*tickStep);

  const gridLines=ticks.map((val,i)=>{
    const yy=y(val);
    const label=Number.isInteger(val)?String(val):val.toFixed(1);
    return `<line x1="${left}" y1="${yy}" x2="${width-right}" y2="${yy}" class="chart-grid"/>
      <text x="${left-12}" y="${yy+4}" text-anchor="end" class="chart-axis-text">${label}</text>`;
  }).join("");

  const maxLabels=options.showAllLabels?data.length:granularityLabelLimit(data.length);
  const step=Math.max(1,Math.ceil(data.length/maxLabels));
  const bars=data.map((d,i)=>{
    const value=Number(d[key]||0);
    const x=left+i*slot+(slot-barW)/2;
    const yy=y(value);
    const h=top+plotH-yy;
    const center=x+barW/2;
    const showLabel=i%step===0 || i===data.length-1;
    const formattedValue=value.toFixed(value%1===0?0:1);
    const tooltip=`${escapeHtml(d.fullLabel||d.label)}: ${value.toFixed(2)} OT hours`;
    return `<g class="chart-bar-group">
      <rect x="${x}" y="${yy}" width="${barW}" height="${Math.max(h,1)}" rx="5" class="chart-bar">
        <title>${tooltip}</title>
      </rect>
      <text x="${center}" y="${Math.max(top+12,yy-8)}" text-anchor="middle" class="chart-value-label-simple">${formattedValue}</text>
      ${showLabel?`<text x="${center}" y="${height-24}" text-anchor="middle" class="chart-axis-text">${escapeHtml(d.label)}</text>`:""}
    </g>`;
  }).join("");

  const yTitle=options.yLabel
    ? `<text x="18" y="${top+plotH/2}" transform="rotate(-90 18 ${top+plotH/2})" text-anchor="middle" class="chart-axis-title">${escapeHtml(options.yLabel)}</text>`
    : "";

  return `<div class="report-chart report-chart-normal-bar">
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(options.aria||"Overtime hours bar chart")}">
      ${gridLines}${yTitle}${bars}
    </svg>
  </div>`;
}

function svgGroupedBarChart(data,series,options={}){
  if(!data.length)return reportEmptyChart("No approved overtime data for this view.");

  const width=760,height=250,left=52,right=18,top=22,bottom=48;
  const plotW=width-left-right,plotH=height-top-bottom;
  const values=data.flatMap(d=>series.map(s=>Number(d[s.key]||0)));
  const max=Math.max(...values,1);
  const niceMax=Math.ceil(max*1.2*2)/2;
  const groupSlot=plotW/data.length;
  const groupWidth=Math.min(groupSlot*.72,56);
  const barGap=4;
  const barW=Math.max(5,(groupWidth-barGap*(series.length-1))/series.length);
  const y=(v)=>top+plotH-(Number(v||0)/niceMax)*plotH;

  const grid=[0,.25,.5,.75,1].map(p=>{
    const val=niceMax*p;
    const yy=y(val);
    return `<line x1="${left}" y1="${yy}" x2="${width-right}" y2="${yy}" class="chart-grid"/>
      <text x="${left-8}" y="${yy+4}" text-anchor="end" class="chart-axis-text">${val.toFixed(val<10?1:0)}</text>`;
  }).join("");

  const maxLabels=granularityLabelLimit(data.length);
  const step=Math.max(1,Math.ceil(data.length/maxLabels));

  const bars=data.map((d,i)=>{
    const center=left+i*groupSlot+groupSlot/2;
    const startX=center-groupWidth/2;

    const rects=series.map((s,si)=>{
      const value=Number(d[s.key]||0);
      const x=startX+si*(barW+barGap);
      const yy=y(value);
      const h=top+plotH-yy;
      return `<rect x="${x}" y="${yy}" width="${barW}" height="${Math.max(h,1)}" rx="4" class="chart-bar chart-bar-series-${si}">
        <title>${escapeHtml(d.label)} • ${escapeHtml(s.label)}: ${value.toFixed(2)} ${escapeHtml(s.suffix||"")}</title>
      </rect>`;
    }).join("");

    const label=(i%step===0 || i===data.length-1)
      ? `<text x="${center}" y="${height-18}" text-anchor="middle" class="chart-axis-text">${escapeHtml(d.label)}</text>`
      : "";

    return rects+label;
  }).join("");

  return `<div class="report-chart">
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(options.aria||"Grouped overtime bar chart")}">
      ${grid}${bars}
    </svg>
    <div class="chart-legend">
      ${series.map((s,i)=>`<span><i class="legend-dot chart-bar-series-${i}"></i>${escapeHtml(s.label)}</span>`).join("")}
    </div>
  </div>`;
}

function reportKpiCard(label,value,sub,accent="primary"){
  return `<div class="report-kpi ${accent}">
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(String(value))}</strong>
    <small>${escapeHtml(sub)}</small>
  </div>`;
}


function renderGeneralManagerReports(options={}){
  const hrMode=Boolean(options.hrMode);
  setPage(
    hrMode?"Department Summary":"Reports",
    hrMode?"HR ANALYTICS":"REQUEST APPROVER ANALYTICS",
    "Analyze approved overtime hours, employee participation, and averages."
  );

  const approvedAll=getRequests().filter(r=>r.status==="Approved" && !r.attendanceStatus && !isOtAmendment(r) && Number(r.totalHours||0)>0);
  const defaultReportDate=new Date();
  defaultReportDate.setDate(defaultReportDate.getDate()-1);
  let reportDateKey=toDateKey(defaultReportDate);
  content.innerHTML=`
    <div class="report-controls-card">
      <div>
        <span class="report-overline">APPROVED OVERTIME ANALYTICS</span>
        <h3>Overtime Performance Report</h3>
        <p>Select a report date, then review the matching daily, weekly, or monthly approved overtime analytics.</p>
      </div>
      <div class="report-controls">
        <label class="field compact-report-field">
          <span>Department</span>
          <select id="reportDepartment">
            <option value="">All Departments</option>
            ${DEPARTMENTS.map(d=>`<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join("")}
          </select>
        </label>
        <label class="field compact-report-field">
          <span>Report Date</span>
          <input id="reportReferenceDate" type="date" value="${escapeHtml(reportDateKey)}">
        </label>
        <div class="report-tabs" id="reportTabs">
          <button type="button" class="report-tab active" data-granularity="daily">Daily</button>
          <button type="button" class="report-tab" data-granularity="weekly">Weekly</button>
          <button type="button" class="report-tab" data-granularity="monthly">Monthly</button>
        </div>
        ${hrMode?`<button id="downloadHRReportExcel" class="btn btn-success" type="button">⇩ Download Excel</button>`:""}
      </div>
    </div>
    <div id="reportBody"></div>
    ${hrMode?`<div class="card" style="margin-top:18px">
      <div class="card-header">
        <div class="card-title-group"><h3>Employee OT by Department</h3><p>Choose a department to view each employee's Morning and Night shift overtime for the current payroll cutoff.</p></div>
      </div>
      <div class="card-body">
        <div class="filters hr-department-breakdown-controls" style="align-items:end">
          <label class="field compact-report-field" style="margin:0;min-width:260px">
            <span>Department</span>
            <select id="hrDepartmentBreakdownSelect">
              <option value="">Select Department</option>
              ${DEPARTMENTS.map(d=>`<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`).join("")}
            </select>
          </label>
          <button id="hrViewDepartmentOT" class="btn btn-primary" type="button">View Employee OT</button>
        </div>
      </div>
    </div>`:""}`;

  let granularity="daily";
  const departmentSelect=document.getElementById("reportDepartment");
  const reportDateInput=document.getElementById("reportReferenceDate");
  const getReferenceDate=()=>{
    const key=reportDateInput?.value || reportDateKey;
    return /^\d{4}-\d{2}-\d{2}$/.test(key) ? parseLocalDate(key) : new Date(defaultReportDate);
  };
  if(hrMode){
    document.getElementById("downloadHRReportExcel")?.addEventListener("click",()=>{
      const dep=departmentSelect.value;
      const referenceDate=getReferenceDate();
      let startDate,endDate;
      if(granularity==="weekly"){
        startDate=startOfWeek(referenceDate);
        endDate=new Date(startDate);
        endDate.setDate(endDate.getDate()+6);
      }else if(granularity==="monthly"){
        startDate=new Date(referenceDate.getFullYear(),referenceDate.getMonth(),1);
        endDate=new Date(referenceDate.getFullYear(),referenceDate.getMonth()+1,0);
      }else{
        startDate=new Date(referenceDate.getFullYear(),referenceDate.getMonth(),referenceDate.getDate());
        endDate=new Date(startDate);
      }
      const startKey=toDateKey(startDate);
      const endKey=toDateKey(endDate);
      const exportRows=approvedAll.filter(r=>(!dep||r.department===dep) && r.otDate && r.otDate>=startKey && r.otDate<=endKey);
      exportHRRowsToExcel(exportRows,{startKey,endKey,department:dep||""});
    });
  }
  const hrDepartmentBreakdownSelect=hrMode?document.getElementById("hrDepartmentBreakdownSelect"):null;
  const hrViewDepartmentOT=hrMode?document.getElementById("hrViewDepartmentOT"):null;
  if(hrMode && hrDepartmentBreakdownSelect && hrViewDepartmentOT){
    const currentCutoffRows=filterRowsByPayrollCutoff(approvedAll);
    const openSelectedDepartment=()=>{
      const department=hrDepartmentBreakdownSelect.value;
      if(!department){showToast("Please select a department.");return;}
      openDepartmentEmployeeOTBreakdown(department,currentCutoffRows);
    };
    hrViewDepartmentOT.addEventListener("click",openSelectedDepartment);
    hrDepartmentBreakdownSelect.addEventListener("change",()=>{
      const department=hrDepartmentBreakdownSelect.value;
      if(department){
        departmentSelect.value=department;
        redraw();
      }
    });
  }

  const summarizeRecords=(records)=>{
    const people=new Set();
    const personDays=new Set();
    let totalHours=0;
    records.forEach(r=>{
      const person=reportPersonKey(r);
      totalHours+=Number(r.totalHours||0);
      if(person)people.add(person);
      if(person&&r.otDate)personDays.add(`${person}|${r.otDate}`);
    });
    return {
      totalHours:Number(totalHours.toFixed(2)),
      peopleCount:people.size,
      personDayCount:personDays.size,
      requestCount:records.length,
      averagePerPersonPerDay:averageOTHoursPerPersonPerDay(totalHours,people.size,1)
    };
  };

  const buildCurrentWeekDailySeries=(records,referenceDate)=>{
    const selectedDate=new Date(referenceDate.getFullYear(),referenceDate.getMonth(),referenceDate.getDate());
    const weekStart=startOfWeek(selectedDate);
    return Array.from({length:7},(_,i)=>{
      const day=new Date(weekStart);
      day.setDate(day.getDate()+i);
      const key=toDateKey(day);
      const dayRecords=records.filter(r=>r.otDate===key);
      const summary=summarizeRecords(dayRecords);
      return {
        key,
        label:day.toLocaleDateString("en-PH",{weekday:"short"}),
        fullLabel:day.toLocaleDateString("en-PH",{weekday:"long",month:"short",day:"numeric"}),
        sortDate:day,
        isToday:key===toDateKey(new Date()),
        isFuture:day>new Date(),
        ...summary
      };
    });
  };

  const redraw=()=>{
    const dep=departmentSelect.value;
    const filtered=approvedAll.filter(r=>!dep||r.department===dep);
    const reportBody=document.getElementById("reportBody");
    const departmentLabel=dep?escapeHtml(dep):"All Departments";
    const referenceDate=getReferenceDate();
    reportDateKey=toDateKey(referenceDate);

    if(granularity==="daily"){
      const selectedKey=toDateKey(referenceDate);
      const selectedRecords=filtered.filter(r=>r.otDate===selectedKey);
      const summary=summarizeRecords(selectedRecords);
      const dateLabel=referenceDate.toLocaleDateString("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"});

      reportBody.innerHTML=`
        <div class="report-period-banner">
          <div>
            <span>Selected Date</span>
            <strong>${escapeHtml(dateLabel)}</strong>
          </div>
          <small>${departmentLabel} • Approved OT only</small>
        </div>

        <div class="report-kpi-grid">
          ${reportKpiCard("Total OT Hours",summary.totalHours.toFixed(2),"Approved overtime on selected date","primary")}
          ${reportKpiCard("People with OT",summary.personDayCount,"Person-date count; same employee on different dates is counted again","success")}
          ${reportKpiCard("Avg Hours / Person / Day",summary.averagePerPersonPerDay.toFixed(2),"Selected-date OT hours ÷ employees with OT","warning")}
        </div>

        <div class="card period-detail-card">
          <div class="card-header">
            <div class="card-title-group">
              <h3>Selected Date Overtime Summary</h3>
              <p>Daily view shows summary numbers only. No graph.</p>
            </div>
          </div>
          <div class="card-body">
            ${selectedRecords.length?`
              <div class="mini-list">
                ${selectedRecords
                  .slice()
                  .sort((a,b)=>Number(b.totalHours||0)-Number(a.totalHours||0))
                  .map(r=>miniItem(r,true))
                  .join("")}
              </div>`:emptyState("No overtime on selected date",hrMode?"There are no approved overtime records for the selected date.":"There are no Request Approver-approved overtime records for the selected date.")}
          </div>
        </div>`;
      return;
    }

    if(granularity==="weekly"){
      const series=buildCurrentWeekDailySeries(filtered,referenceDate);
      const weekStart=series[0].sortDate;
      const weekEnd=series[6].sortDate;
      const weekRecords=filtered.filter(r=>r.otDate>=series[0].key&&r.otDate<=series[6].key);
      const summary=summarizeRecords(weekRecords);
      const weekLabel=`Mon ${weekStart.toLocaleDateString("en-PH",{month:"short",day:"numeric"})} – Sun ${weekEnd.toLocaleDateString("en-PH",{month:"short",day:"numeric",year:"numeric"})}`;
      const avgPerDay=Number((summary.totalHours/7).toFixed(2));
      // OT manpower uses person-date participation: the same employee on a different date
      // is another manpower-day. This preserves both total weekly manpower and daily manpower usage.
      const totalOTManpower=summary.personDayCount;
      const avgManpowerPerDay=Number((totalOTManpower/7).toFixed(2));
      const avgPerPersonPerOTDay=totalOTManpower
        ? Number((summary.totalHours/totalOTManpower).toFixed(2))
        : 0;

      reportBody.innerHTML=`
        <div class="report-period-banner">
          <div>
            <span>Selected Week</span>
            <strong>${escapeHtml(weekLabel)}</strong>
          </div>
          <small>${departmentLabel} • Approved OT only</small>
        </div>

        <div class="report-kpi-grid">
          ${reportKpiCard("Total OT Hours / Week",summary.totalHours.toFixed(2),"Approved overtime in selected week","primary")}
          ${reportKpiCard("Total OT Manpower",totalOTManpower,"Employee + date count; same person on another date counts again","success")}
          ${reportKpiCard("Avg Manpower / Day",avgManpowerPerDay.toFixed(2),"Total OT manpower ÷ 7 days","warning")}
          ${reportKpiCard("Avg OT Hours / Person / OT Day",avgPerPersonPerOTDay.toFixed(2),"Weekly OT hours ÷ total OT manpower","primary")}
        </div>

        <div class="report-chart-grid">
          <div class="card report-chart-card report-chart-wide weekly-chart-card">
            <div class="card-header">
              <div class="card-title-group">
                <h3>Daily OT Hours — Weekly Trend</h3>
                <p>Monday to Sunday • ${summary.totalHours.toFixed(2)} total approved OT hours in selected week</p>
              </div>
              <span class="report-chart-badge">MON–SUN</span>
            </div>
            <div class="card-body">${svgBarChart(series,"totalHours",{aria:"Daily overtime hours for the current week",enhanced:true,yLabel:"OT Hours",showAverage:true,highlightPeak:true})}</div>
          </div>
        </div>

        <div class="card period-detail-card">
          <div class="card-header">
            <div class="card-title-group">
              <h3>Weekly Daily Details</h3>
              <p>Day-by-day summary for the selected Monday–Sunday week.</p>
            </div>
          </div>
          <div class="period-detail-scroll">
            <div class="period-detail-grid">
              ${series.map(item=>`
                <div class="period-detail-item">
                  <div class="period-detail-date">${escapeHtml(item.fullLabel)}</div>
                  <div class="period-detail-total">
                    <span>Total OT</span>
                    <strong>${item.totalHours.toFixed(2)} hrs</strong>
                  </div>
                  <div class="period-number-row">
                    <span>OT Manpower</span>
                    <strong>${item.personDayCount}</strong>
                  </div>
                </div>`).join("")}
            </div>
          </div>
        </div>

        <div class="report-method-note">
        </div>`;
      return;
    }

    // MONTHLY VIEW: each bar is one complete Monday-Sunday week.
    // Include every full calendar week that intersects the selected month.
    const selectedMonthStart=new Date(referenceDate.getFullYear(),referenceDate.getMonth(),1);
    const selectedMonthEnd=new Date(referenceDate.getFullYear(),referenceDate.getMonth()+1,0);
    const firstWeekStart=startOfWeek(selectedMonthStart);
    const lastWeekStart=startOfWeek(selectedMonthEnd);
    const weekCount=Math.round((lastWeekStart-firstWeekStart)/(7*24*60*60*1000))+1;

    const series=Array.from({length:weekCount},(_,i)=>{
      const weekStart=new Date(firstWeekStart);
      weekStart.setDate(weekStart.getDate()+(i*7));
      const weekEnd=new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate()+6);
      const startKey=toDateKey(weekStart);
      const endKey=toDateKey(weekEnd);
      const weekRecords=filtered.filter(r=>r.otDate && r.otDate>=startKey && r.otDate<=endKey);
      const summary=summarizeRecords(weekRecords);
      return {
        key:startKey,
        label:`Mon ${weekStart.toLocaleDateString("en-PH",{month:"short",day:"numeric"})} – Sun ${weekEnd.toLocaleDateString("en-PH",{month:"short",day:"numeric"})}`,
        sortDate:weekStart,
        weekStart,
        weekEnd,
        totalHours:summary.totalHours,
        peopleCount:summary.peopleCount,
        personDayCount:summary.personDayCount,
        requestCount:summary.requestCount,
        averagePerDay:Number((summary.totalHours/7).toFixed(2)),
        averagePerPersonPerDay:summary.personDayCount?Number((summary.totalHours/summary.personDayCount).toFixed(2)):0
      };
    });

    const monthStartKey=toDateKey(selectedMonthStart);
    const monthEndKey=toDateKey(selectedMonthEnd);
    const selectedMonthRecords=filtered.filter(r=>r.otDate && r.otDate>=monthStartKey && r.otDate<=monthEndKey);
    const selectedMonthSummary=summarizeRecords(selectedMonthRecords);
    const selectedMonthLabel=selectedMonthStart.toLocaleDateString("en-PH",{month:"long",year:"numeric"});
    const displayedWeeklyHours=series.reduce((sum,item)=>sum+item.totalHours,0);

    reportBody.innerHTML=`
      <div class="report-period-banner">
        <div>
          <span>Selected Month</span>
          <strong>${escapeHtml(selectedMonthLabel)}</strong>
        </div>
        <small>${departmentLabel} • Approved OT only</small>
      </div>

      <div class="report-kpi-grid report-kpi-grid-single">
        ${reportKpiCard("Total OT Hours / Month",selectedMonthSummary.totalHours.toFixed(2),"Approved overtime dated within the selected month","primary")}
      </div>

      <div class="report-chart-grid">
        <div class="card report-chart-card report-chart-wide weekly-chart-card monthly-trend-card">
          <div class="card-header">
            <div class="card-title-group">
              <h3>Weekly OT Hours — Monthly View</h3>
              <p>Each bar is one complete Monday–Sunday week • ${displayedWeeklyHours.toFixed(2)} total hours across displayed full weeks</p>
            </div>
            <span class="report-chart-badge">MON–SUN</span>
          </div>
          <div class="card-body">${svgBarChart(series,"totalHours",{aria:"Weekly total overtime hours for the selected month, one Monday to Sunday week per bar",enhanced:true,yLabel:"OT Hours",showAverage:true,highlightPeak:true})}</div>
        </div>
      </div>

      <div class="card period-detail-card">
        <div class="card-header">
          <div class="card-title-group">
            <h3>Weekly Details</h3>
            <p>One row for each complete Monday–Sunday week shown in the graph.</p>
          </div>
        </div>
        <div class="period-detail-scroll">
          <div class="period-detail-grid">
            ${series.map(item=>`
              <div class="period-detail-item">
                <div class="period-detail-date">${escapeHtml(item.label)}</div>
                <div class="period-detail-total">
                  <span>Total OT / Week</span>
                  <strong>${item.totalHours.toFixed(2)} hrs</strong>
                </div>
                <div class="period-number-row">
                  <span>OT Manpower</span>
                  <strong>${item.personDayCount}</strong>
                </div>
                <div class="period-number-row">
                  <span>Avg Hours / Day</span>
                  <strong>${item.averagePerDay.toFixed(2)}</strong>
                </div>
                <div class="period-number-row">
                  <span>Avg OT Hours / Person / OT Day</span>
                  <strong>${item.averagePerPersonPerDay.toFixed(2)}</strong>
                </div>
              </div>`).join("")}
          </div>
        </div>
      </div>

      <div class="report-method-note">
        <strong>Weekly grouping:</strong>
        Every bar is exactly 7 days, from Monday through Sunday. Weeks that overlap the beginning or end of the selected month are still shown as complete Monday–Sunday weeks, so their bar total can include approved OT from the adjacent month.
        The Monthly Total KPI above counts only OT dates inside the selected month.
      </div>`;
  };

  document.querySelectorAll(".report-tab").forEach(btn=>{
    btn.addEventListener("click",()=>{
      granularity=btn.dataset.granularity;
      document.querySelectorAll(".report-tab").forEach(x=>x.classList.toggle("active",x===btn));
      redraw();
    });
  });
  departmentSelect.addEventListener("change",redraw);
  reportDateInput?.addEventListener("change",()=>{
    if(!reportDateInput.value)return;
    reportDateKey=reportDateInput.value;
    redraw();
  });
  redraw();
  if(hrMode){
    bindDepartmentDrilldown(filterRowsByPayrollCutoff(approvedAll));
  }
}



function getApprovedAttendanceRecords(){
  getLeaveRequests().filter(r=>r.status==="Approved").forEach(syncApprovedLeaveToDailyAttendance);
  return getDailyAttendanceRecords().filter(r=>(r.status==="Leave" || r.status==="Absent") && Boolean(r.date)).map(r=>({
    ...r,otDate:r.date,attendanceStatus:r.status,attendanceType:r.attendanceType||r.leaveType||r.absentType||r.status
  }));
}
function attendanceRecordEmployeeKey(record){
  return String(record.employeeNo||record.employeeName||"").trim().toLowerCase();
}
function getAttendanceSummaryCutoffs(records=getApprovedAttendanceRecords()){
  const cutoffMap=new Map();
  const addCutoff=cutoff=>{
    if(!cutoff?.key || cutoffMap.has(cutoff.key))return;
    cutoffMap.set(cutoff.key,cutoff);
  };
  // Keep every payroll period represented anywhere in the system selectable,
  // including periods with zero Leave / Absent days.
  getRequests().filter(r=>r.otDate).forEach(r=>addCutoff(payrollCutoffForOTDate(r.otDate)));
  records.forEach(r=>addCutoff(payrollCutoffForOTDate(r.otDate)));
  const current=getPayrollCutoff(new Date());
  addCutoff(current);
  addCutoff(getPreviousPayrollCutoff(new Date()));
  return [...cutoffMap.values()].sort((a,b)=>b.start-a.start);
}
function buildAttendanceCutoffSummary(records,cutoff){
  const inCutoff=filterRowsByCutoffObject(records,cutoff);
  const uniqueDaily=new Map();
  inCutoff.forEach(r=>{
    const employeeKey=attendanceRecordEmployeeKey(r);
    if(!employeeKey)return;
    const status=r.attendanceStatus==="Leave"?"Leave":"Absent";
    const dailyKey=`${employeeKey}|${r.otDate}|${status}`;
    if(!uniqueDaily.has(dailyKey))uniqueDaily.set(dailyKey,r);
  });

  const employeeMap=new Map();
  [...uniqueDaily.values()].forEach(r=>{
    const employeeKey=attendanceRecordEmployeeKey(r);
    if(!employeeMap.has(employeeKey)){
      employeeMap.set(employeeKey,{
        employeeNo:r.employeeNo||"",
        employeeName:r.employeeName||"—",
        position:r.position||"—",
        department:r.department||"Unassigned",
        leaveDays:0,
        absentDays:0,
        leaveTypes:{},
        absentTypes:{},
        dates:new Set(),
        leaveDates:new Set(),
        absentDates:new Set()
      });
    }
    const item=employeeMap.get(employeeKey);
    item.dates.add(r.otDate);
    const type=String(r.attendanceType||r.leaveType||r.absentType||(r.attendanceStatus==="Leave"?"Leave":"Absent")).trim() || (r.attendanceStatus==="Leave"?"Leave":"Absent");
    if(r.attendanceStatus==="Leave"){
      item.leaveDays++;
      item.leaveTypes[type]=(item.leaveTypes[type]||0)+1;
      item.leaveDates.add(r.otDate);
    }else{
      item.absentDays++;
      item.absentTypes[type]=(item.absentTypes[type]||0)+1;
      item.absentDates.add(r.otDate);
    }
  });

  const employees=[...employeeMap.values()].sort((a,b)=>
    a.department.localeCompare(b.department) || a.employeeName.localeCompare(b.employeeName)
  );
  const departmentMap=new Map(DEPARTMENTS.map(dep=>[dep,{department:dep,leaveDays:0,absentDays:0,employees:new Set()}]));
  employees.forEach(emp=>{
    if(!departmentMap.has(emp.department))departmentMap.set(emp.department,{department:emp.department,leaveDays:0,absentDays:0,employees:new Set()});
    const dep=departmentMap.get(emp.department);
    dep.leaveDays+=emp.leaveDays;
    dep.absentDays+=emp.absentDays;
    dep.employees.add(String(emp.employeeNo||emp.employeeName).toLowerCase());
  });
  const departments=[...departmentMap.values()].map(dep=>({...dep,employeeCount:dep.employees.size}));
  return {employees,departments,records:[...uniqueDaily.values()]};
}
function formatAttendanceTypeBreakdown(types){
  const entries=Object.entries(types||{}).sort((a,b)=>b[1]-a[1] || a[0].localeCompare(b[0]));
  if(!entries.length)return `<span class="muted">—</span>`;
  return entries.map(([type,count])=>`<span class="attendance-type-chip">${escapeHtml(type)} <strong>${count}</strong></span>`).join(" ");
}
function formatAttendanceDateBreakdown(emp){
  const leaveDates=[...(emp?.leaveDates||[])].sort();
  const absentDates=[...(emp?.absentDates||[])].sort();
  const parts=[];
  if(leaveDates.length)parts.push(`<div class="attendance-date-line"><strong>Leave:</strong> ${leaveDates.map(date=>`<span class="attendance-date-chip leave">${formatDate(date)}</span>`).join(" ")}</div>`);
  if(absentDates.length)parts.push(`<div class="attendance-date-line"><strong>Absent:</strong> ${absentDates.map(date=>`<span class="attendance-date-chip absent">${formatDate(date)}</span>`).join(" ")}</div>`);
  return parts.join("") || `<span class="muted">—</span>`;
}
function renderAttendanceCutoffSummary(){
  const roleLabel=currentUser?.role==="HR"?"HUMAN RESOURCES":"REQUEST APPROVER";
  const approvedAttendance=getApprovedAttendanceRecords();
  const cutoffs=getAttendanceSummaryCutoffs(approvedAttendance);
  if(!attendanceSummaryCutoffKey || !cutoffs.some(c=>c.key===attendanceSummaryCutoffKey)){
    attendanceSummaryCutoffKey=(cutoffs[0]||getPayrollCutoff(new Date())).key;
  }
  const cutoff=cutoffs.find(c=>c.key===attendanceSummaryCutoffKey) || getPayrollCutoff(new Date());
  const summary=buildAttendanceCutoffSummary(approvedAttendance,cutoff);
  const filteredEmployees=attendanceSummaryDepartment==="All Departments"
    ? summary.employees
    : summary.employees.filter(emp=>emp.department===attendanceSummaryDepartment);
  const filteredRecords=attendanceSummaryDepartment==="All Departments"
    ? summary.records
    : summary.records.filter(r=>r.department===attendanceSummaryDepartment);
  const leaveDays=filteredEmployees.reduce((sum,emp)=>sum+emp.leaveDays,0);
  const absentDays=filteredEmployees.reduce((sum,emp)=>sum+emp.absentDays,0);
  const employeesAffected=filteredEmployees.filter(emp=>emp.leaveDays+emp.absentDays>0).length;
  const departmentCount=new Set(filteredEmployees.map(emp=>emp.department)).size;

  setPage("Leave / Absent by Cutoff",roleLabel,`Approved Leave and recorded Absent days per employee and department for ${cutoff.label}.`);
  content.innerHTML=`
    ${heroBanner(
      "Cutoff attendance overview",
      "Review approved Leave and recorded Absent days without mixing them into overtime reporting. Each employee/date is counted once per attendance status.",
      leaveDays+absentDays,
      `Leave / Absent day${leaveDays+absentDays===1?"":"s"} in selected cutoff`
    )}
    <div class="card attendance-summary-filter-card">
      <div class="card-header">
        <div class="card-title-group"><h3>Cutoff & Department</h3><p>Switch payroll cutoff periods or focus on one department.</p></div>
        <span class="badge pending">6–20 / 21–5</span>
      </div>
      <div class="card-body">
        <div class="filters attendance-summary-filters">
          <label class="field"><span>Payroll Cutoff</span><select id="attendanceCutoffSelect">${cutoffs.map(c=>`<option value="${escapeHtml(c.key)}" ${c.key===cutoff.key?"selected":""}>${escapeHtml(c.label)}</option>`).join("")}</select></label>
          <label class="field"><span>Department</span><select id="attendanceDepartmentSelect"><option value="All Departments">All Departments</option>${DEPARTMENTS.map(dep=>`<option value="${escapeHtml(dep)}" ${attendanceSummaryDepartment===dep?"selected":""}>${escapeHtml(dep)}</option>`).join("")}</select></label>
        </div>
      </div>
    </div>
    <div class="stats-grid attendance-summary-stats">
      ${statCard("Leave Days",leaveDays,`${cutoff.label}${attendanceSummaryDepartment!=="All Departments"?` • ${attendanceSummaryDepartment}`:""}`,"success")}
      ${statCard("Absent Days",absentDays,`${cutoff.label}${attendanceSummaryDepartment!=="All Departments"?` • ${attendanceSummaryDepartment}`:""}`,"danger")}
      ${statCard("Employees",employeesAffected,"Employees with Leave / Absent")}
      ${statCard("Departments",departmentCount,attendanceSummaryDepartment==="All Departments"?"Departments with attendance records":"Selected department","primary")}
    </div>
    <div class="card attendance-department-summary-card">
      <div class="card-header"><div class="card-title-group"><h3>Per Department</h3><p>${escapeHtml(cutoff.label)} • approved Leave and recorded Absent days</p></div></div>
      <div class="card-body">
        <div class="attendance-department-grid">
          ${summary.departments.map(dep=>`<button type="button" class="attendance-department-card ${attendanceSummaryDepartment===dep.department?"active":""}" data-attendance-department="${escapeHtml(dep.department)}">
            <span>${escapeHtml(dep.department)}</span>
            <div><strong>${dep.leaveDays}</strong><small>Leave</small></div>
            <div><strong>${dep.absentDays}</strong><small>Absent</small></div>
            <em>${dep.employeeCount} employee${dep.employeeCount===1?"":"s"}</em>
          </button>`).join("")}
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title-group"><h3>Per Employee</h3><p>${escapeHtml(attendanceSummaryDepartment)} • maximum clarity by employee for ${escapeHtml(cutoff.label)}</p></div>
        <span class="attendance-summary-count">${filteredRecords.length} attendance day${filteredRecords.length===1?"":"s"}</span>
      </div>
      <div class="table-wrap attendance-summary-table-wrap">
        <table class="data-table attendance-summary-table">
          <thead><tr><th>Employee</th><th>Department</th><th>Date(s)</th><th>Leave</th><th>Leave Breakdown</th><th>Absent</th><th>Absent Breakdown</th><th>Total</th></tr></thead>
          <tbody>${filteredEmployees.length?filteredEmployees.map(emp=>`<tr>
            <td><strong>${escapeHtml(emp.employeeName)}</strong><br><small>${escapeHtml(emp.employeeNo||"—")} • ${escapeHtml(emp.position)}</small></td>
            <td>${departmentBadge(emp.department)}</td>
            <td class="attendance-dates-cell">${formatAttendanceDateBreakdown(emp)}</td>
            <td><span class="attendance-count attendance-count-leave">${emp.leaveDays}</span></td>
            <td class="attendance-breakdown-cell">${formatAttendanceTypeBreakdown(emp.leaveTypes)}</td>
            <td><span class="attendance-count attendance-count-absent">${emp.absentDays}</span></td>
            <td class="attendance-breakdown-cell">${formatAttendanceTypeBreakdown(emp.absentTypes)}</td>
            <td><strong>${emp.leaveDays+emp.absentDays}</strong></td>
          </tr>`).join(""):`<tr><td colspan="8">${emptyState("No Leave / Absent records",`No approved Leave or Absent days were found for ${escapeHtml(cutoff.label)}${attendanceSummaryDepartment!=="All Departments"?` in ${escapeHtml(attendanceSummaryDepartment)}`:""}.`)}</td></tr>`}</tbody>
        </table>
      </div>
    </div>`;

  document.getElementById("attendanceCutoffSelect")?.addEventListener("change",event=>{
    attendanceSummaryCutoffKey=event.target.value;
    renderAttendanceCutoffSummary();
  });
  document.getElementById("attendanceDepartmentSelect")?.addEventListener("change",event=>{
    attendanceSummaryDepartment=event.target.value;
    renderAttendanceCutoffSummary();
  });
  document.querySelectorAll("[data-attendance-department]").forEach(btn=>btn.addEventListener("click",()=>{
    attendanceSummaryDepartment=attendanceSummaryDepartment===btn.dataset.attendanceDepartment?"All Departments":btn.dataset.attendanceDepartment;
    renderAttendanceCutoffSummary();
  }));
}

function renderManager(){
  if(currentPage==="leave-approvals")return renderLeaveApprovalPage("Request Approver");
  if(currentPage==="attendance-summary")return renderAttendanceCutoffSummary();
  const rows=getRequests();
  const cutoff=getPayrollCutoff(new Date());
  const cutoffRows=filterRowsByPayrollCutoff(rows);
  const pending=rows.filter(r=>r.status==="Pending");
  const pendingOT=pending.filter(r=>!r.attendanceStatus && (isOtAmendment(r) || Number(r.totalHours||0)>0));
  const pendingLeave=getLeaveRequests()
    .filter(r=>r.status==="Pending Request Approver")
    .sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
  const dashboardDateKey=toDateKey(new Date());
  const approved=rows.filter(r=>r.status==="Approved" && isActualOTRecord(r) && r.otDate===dashboardDateKey);
  const rejected=rows.filter(r=>r.status==="Rejected" && isActualOTRecord(r) && r.otDate===dashboardDateKey);
  const dashboardApprovedHours=approved.reduce((sum,r)=>sum+Number(r.totalHours||0),0);
  const currentMonthHolidays=getPhilippineHolidaysInMonth(dashboardDateKey);

  if(currentPage==="dashboard"){
    const dashboardPendingOT=pendingOT;
    const dashboardPendingLeave=pendingLeave;
    setPage("Request Approver Dashboard","REQUEST APPROVER",`Dashboard date: ${formatDate(dashboardDateKey)} • Today.`);
    const latestOT=[...dashboardPendingOT].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    const latestLeave=dashboardPendingLeave;
    content.innerHTML=`
      ${heroBanner(
        "Company-wide approval queue",
        "Pending overtime and employee leave requests are separated below for faster review.",
        dashboardPendingOT.length+dashboardPendingLeave.length,
        `OT + leave across all filing dates awaiting review`
      )}
      <div class="stats-grid approver-top-stats">
        ${statCard("Pending OT",dashboardPendingOT.length,"All dates • includes advance filing","warning","approvals")}
        ${statCard("Pending Leave",dashboardPendingLeave.length,"All leave filing dates • includes advance filing","warning","leave-approvals")}
        ${statCard("Approved",approved.length,`Today • ${formatDate(dashboardDateKey)}`,"success","history")}
        ${statCard("Approved OT Hours",dashboardApprovedHours.toFixed(2),"Today's approved OT","primary","history")}
        ${statCard("PH Holidays",currentMonthHolidays.length,`${getCalendarMonthRange(dashboardDateKey).label} • whole month`,currentMonthHolidays.length?"danger":"primary","holidays")}
      </div>
      ${renderHolidayCoverageCard(dashboardDateKey,`Philippine Holidays — ${getCalendarMonthRange(dashboardDateKey).label}`)}
      <div class="grid-2">
        <div class="card pending-ot-approval-card">
          <div class="card-header">
            <div class="card-title-group"><h3>Pending Overtime for Approval — All Filing Dates</h3><p>Employee-filed OT appears here immediately, including advance OT filing.</p></div>
            <span class="badge pending">${latestOT.length} pending</span>
          </div>
          <div class="card-body">
            ${latestOT.length?`<div class="mini-list">${latestOT.map((r,index)=>`<div class="mini-item priority-approval-item${index>=5?" dashboard-queue-extra dashboard-queue-extra-ot is-hidden":""}">
              <div class="mini-item-main">
                <div class="mini-avatar">${initials(r.employeeName)}</div>
                <div class="mini-copy">
                  <strong>${escapeHtml(r.employeeName)}</strong>
                  <small>${escapeHtml(r.department)} • ${formatDate(r.otDate)} • ${r.otDate>dashboardDateKey?"Advance Filing":r.otDate===dashboardDateKey?"Today":"Past Duty"} • ${isOtAmendment(r)?`+${Number(r.additionalHours||r.totalHours||0).toFixed(2)} hr additional OT`:`${Number(r.totalHours||0).toFixed(2)} hrs`}</small>
                  ${renderDashboardHolidayIndicator(r.otDate)}
                  <small class="priority-approval-reason"><strong>Reason:</strong> ${escapeHtml(r.amendmentReason||r.reason||"—")}</small>
                </div>
              </div>
              <div class="priority-approval-actions">
                ${statusBadge(r.status)}
                <div class="actions">
                  <button type="button" class="btn btn-success btn-sm" data-dashboard-review="approve" data-id="${escapeHtml(r.id)}">${isOtAmendment(r)?"Approve Additional":"Approve"}</button>
                  <button type="button" class="btn btn-danger btn-sm" data-dashboard-review="reject" data-id="${escapeHtml(r.id)}">Reject</button>
                </div>
              </div>
            </div>`).join("")}</div>${latestOT.length>5?`<button type="button" class="dashboard-queue-viewall" data-dashboard-queue-toggle="ot" data-total="${latestOT.length}" aria-expanded="false">View all (<strong>${latestOT.length}</strong>)</button>`:""}`:emptyState("No pending overtime","There are no overtime requests waiting for approval.")}
          </div>
        </div>
        <div class="card pending-leave-approval-card">
          <div class="card-header">
            <div class="card-title-group"><h3>Pending Leave for Approval</h3><p>Review all employee leave requests here</p></div>
            <span class="badge pending">${latestLeave.length} pending</span>
          </div>
          <div class="card-body">
            ${latestLeave.length?`<div class="mini-list">${latestLeave.map((r,index)=>`<div class="mini-item priority-approval-item${index>=5?" dashboard-queue-extra dashboard-queue-extra-leave is-hidden":""}">
              <div class="mini-item-main">
                <div class="mini-avatar">${initials(r.employeeName)}</div>
                <div class="mini-copy">
                  <strong>${escapeHtml(r.employeeName)}</strong>
                  <small>${escapeHtml(r.department)} • ${escapeHtml(r.leaveType||"Leave")} • ${formatDate(r.startDate)}${r.endDate&&r.endDate!==r.startDate?` to ${formatDate(r.endDate)}`:""}</small>
                  <small class="priority-approval-reason"><strong>Reason:</strong> ${escapeHtml(r.reason||"—")}</small>
                </div>
              </div>
              <div class="priority-approval-actions">
                ${leaveStatusBadge(r.status)}
                <div class="actions">
                  <button type="button" class="btn btn-success btn-sm" data-dashboard-leave-review="approve" data-id="${escapeHtml(r.id)}">Approve</button>
                  <button type="button" class="btn btn-danger btn-sm" data-dashboard-leave-review="reject" data-id="${escapeHtml(r.id)}">Reject</button>
                </div>
              </div>
            </div>`).join("")}</div>${latestLeave.length>5?`<button type="button" class="dashboard-queue-viewall" data-dashboard-queue-toggle="leave" data-total="${latestLeave.length}" aria-expanded="false">View all (<strong>${latestLeave.length}</strong>)</button>`:""}`:emptyState("No pending leave","There are no employee leave requests waiting for final approval.")}
          </div>
        </div>
      </div>`;
    bindDashboardStatCards();
    document.querySelectorAll("[data-dashboard-review]").forEach(btn=>btn.addEventListener("click",()=>openReviewModal(btn.dataset.id,btn.dataset.dashboardReview)));
    document.querySelectorAll("[data-dashboard-leave-review]").forEach(btn=>btn.addEventListener("click",()=>openLeaveReviewModal(btn.dataset.id,"Request Approver",btn.dataset.dashboardLeaveReview)));
    document.querySelectorAll("[data-dashboard-queue-toggle]").forEach(btn=>btn.addEventListener("click",()=>{
      const type=btn.dataset.dashboardQueueToggle;
      const card=btn.closest(".card");
      if(!card)return;
      const extras=[...card.querySelectorAll(`.dashboard-queue-extra-${type}`)];
      const expanded=btn.getAttribute("aria-expanded")==="true";
      extras.forEach(item=>item.classList.toggle("is-hidden",expanded));
      btn.setAttribute("aria-expanded",String(!expanded));
      btn.innerHTML=expanded?`View all (<strong>${btn.dataset.total}</strong>)`:`Show less`;
    }));
    return;
  }
  if(currentPage==="approvals"){
    setPage("Pending Overtime for Approval","REQUEST APPROVER REVIEW","Approve or reject employee-filed overtime requests from all departments. OT appears here immediately, including advance filing; Supervisor attendance finalization is separate.");
    renderTable(pendingOT,{mode:"manager-pending"});
    return;
  }
  if(currentPage==="reports"){
    renderGeneralManagerReports();
    return;
  }
  setPage("OT History","REQUEST APPROVER OT HISTORY","Review all Pending, Approved, and Rejected overtime requests with their OT dates.");
  renderTable(rows.filter(r=>isActualOTRecord(r)),{mode:"manager-history",pageSize:5});
}



async function downloadExcelWorkbook(workbook,fileName,successMessage){
  try{
    const buffer=await workbook.xlsx.writeBuffer();
    const blob=new Blob([buffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;a.download=fileName;document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    showToast(successMessage||"Excel downloaded.");
  }catch(err){console.error(err);showToast("Excel export failed. Please try again.");}
}

async function exportHRMasterListExcel(employees=[],attendanceStatsByEmployee=new Map(),context={}){
  if(!canUseAdminExcelExport("employees")){showToast("This account does not have permission to download Employee Master List Excel.");return;}
  if(typeof ExcelJS==="undefined"){showToast("Excel export library could not load. Please reload the page.");return;}
  if(!employees.length){showToast("No employees match the current Master List filters.");return;}
  const wb=new ExcelJS.Workbook();
  wb.creator="Eastern1961 HR System";wb.created=new Date();
  const ws=wb.addWorksheet("Employee Master List",{views:[{state:"frozen",ySplit:1}]});
  ws.columns=[
    {header:"Employee Name",key:"employeeName",width:30},{header:"Position",key:"position",width:26},
    {header:"Department",key:"department",width:20},{header:"Status",key:"status",width:18},
    {header:"Leave",key:"leaveDays",width:12},{header:"Absent",key:"absentDays",width:12},
    {header:"SL",key:"sl",width:12},{header:"VL",key:"vl",width:12}
  ];
  employees.forEach(emp=>{
    const stats=attendanceStatsByEmployee.get(emp.no)||{leaveRecords:[],absentRecords:[]};
    ws.addRow({employeeName:emp.name,position:emp.position,department:emp.department||"",status:emp.employmentStatus||"",
      leaveDays:stats.leaveRecords.length,absentDays:stats.absentRecords.length,
      sl:Number(emp.leaveCreditSL||0),vl:Number(emp.leaveCreditVL||0)});
  });
  const header=ws.getRow(1);header.font={bold:true,color:{argb:"FFFFFFFF"}};header.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF1F4E78"}};header.alignment={vertical:"middle",horizontal:"center"};
  ws.eachRow((row,rowNo)=>{row.eachCell(cell=>{cell.border={top:{style:"thin",color:{argb:"FFB7C9D6"}},left:{style:"thin",color:{argb:"FFB7C9D6"}},bottom:{style:"thin",color:{argb:"FFB7C9D6"}},right:{style:"thin",color:{argb:"FFB7C9D6"}}};if(rowNo>1)cell.alignment={vertical:"middle"};});});
  ws.autoFilter={from:{row:1,column:1},to:{row:1,column:8}};
  const dep=context.department?`_${String(context.department).replace(/[^A-Za-z0-9]+/g,"-")}`:"";
  await downloadExcelWorkbook(wb,`Eastern1961_Employee_Master_List${dep}.xlsx`,`Master List Excel downloaded: ${employees.length} employee(s).`);
}

async function exportHRLeaveExcel(rows=[],context={}){
  if(!canUseAdminExcelExport("leave-approvals")){showToast("This account does not have permission to download Leave Excel.");return;}
  if(typeof ExcelJS==="undefined"){showToast("Excel export library could not load. Please reload the page.");return;}
  if(!rows.length){showToast("No leave records match the current filters.");return;}
  const wb=new ExcelJS.Workbook();
  wb.creator="Eastern1961 HR System";wb.created=new Date();
  const ws=wb.addWorksheet("Leave Requests",{views:[{state:"frozen",ySplit:1}]});
  ws.columns=[
    {header:"Request ID",key:"id",width:22},{header:"Employee Name",key:"name",width:28},{header:"Position",key:"position",width:22},
    {header:"Department",key:"department",width:18},{header:"Leave Type",key:"leaveType",width:15},{header:"Pay Type",key:"payType",width:16},
    {header:"Start Date",key:"startDate",width:14},{header:"End Date",key:"endDate",width:14},{header:"Days",key:"days",width:10},
    {header:"Reason",key:"reason",width:35},{header:"Status",key:"status",width:24},{header:"Supervisor Remarks",key:"supervisorRemarks",width:30},
    {header:"HR Remarks",key:"hrRemarks",width:30},{header:"Request Approver Remarks",key:"gmRemarks",width:30}
  ];
  rows.forEach(r=>ws.addRow({id:r.id,name:r.employeeName,position:r.position||"",department:r.department||"",leaveType:r.leaveType||"Leave",payType:r.payType||"Without Pay",
    startDate:r.startDate||"",endDate:r.endDate||r.startDate||"",days:leaveRequestDayCount(r.startDate,r.endDate||r.startDate),reason:r.reason||"",status:r.status||"",
    supervisorRemarks:r.supervisorRemarks||"",hrRemarks:r.hrRemarks||"",gmRemarks:r.gmRemarks||""}));
  const header=ws.getRow(1);header.font={bold:true,color:{argb:"FFFFFFFF"}};header.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF1F4E78"}};header.alignment={vertical:"middle",horizontal:"center"};
  ws.eachRow((row,rowNo)=>{row.eachCell(cell=>{cell.border={top:{style:"thin",color:{argb:"FFB7C9D6"}},left:{style:"thin",color:{argb:"FFB7C9D6"}},bottom:{style:"thin",color:{argb:"FFB7C9D6"}},right:{style:"thin",color:{argb:"FFB7C9D6"}}};if(rowNo>1)cell.alignment={vertical:"middle",wrapText:true};});});
  ws.autoFilter={from:{row:1,column:1},to:{row:1,column:14}};
  await downloadExcelWorkbook(wb,"Eastern1961_HR_Leave_Requests_Filtered.xlsx",`Leave Excel downloaded: ${rows.length} filtered record(s).`);
}


function getHRAdminEmployees(){
  return getDepartmentEmployees("Admin").slice().sort((a,b)=>String(a.name||"").localeCompare(String(b.name||"")));
}
function resolveHRAdminEmployee(preferredNo=""){
  const employees=getHRAdminEmployees();
  if(!employees.length)return null;
  const linked=getLinkedEmployeeRecordForAccount(currentUser);
  const candidate=String(preferredNo||"").trim();
  return employees.find(e=>String(e.no)===candidate)
    || (linked && employees.find(e=>String(e.no)===String(linked.no)))
    || employees[0];
}
function renderHRAdminOTRequest(){
  const employees=getHRAdminEmployees();
  setPage("New OT Request","HR • ADMIN DEPARTMENT","HR can file overtime for Admin Department employees. HR-filed Admin OT goes directly to the Request Approver so HR does not approve its own filing.");
  if(!employees.length){
    content.innerHTML=`${heroBanner("Admin Department New OT Request","Add Admin employees first in Employee Master List.",0,"Admin employees")}
      <div class="card"><div class="card-body">${emptyState("No Admin employees yet","Use Employee Master List to register Admin Department employees. They will appear here automatically.")}</div></div>`;
    return;
  }
  const employee=resolveHRAdminEmployee(hrAdminOTEmployeeNo);
  hrAdminOTEmployeeNo=employee.no;
  const assigned=getEmployeeAttendanceSchedule(employee);
  const defaultShift=assigned.shift==="Night"?"Night":"Morning";
  const defaultStart=defaultShift==="Night"?"18:00":"06:00";
  const defaultEnd=defaultShift==="Night"?"03:00":"15:00";
  const todayKey=toDateKey(new Date());
  const holiday=getPhilippineHoliday(todayKey);
  const defaultOtType=holiday?getAutomaticOtType(todayKey,false):"Regular Day";
  const defaultOtStart=(holiday||defaultOtType==="Rest Day OT")?defaultStart:defaultEnd;
  const recent=getRequests().filter(r=>r.department==="Admin" && isActualOTRecord(r)).sort((a,b)=>new Date(b.createdAt||b.reviewedAt||0)-new Date(a.createdAt||a.reviewedAt||0)).slice(0,12);
  const options=employees.map(e=>`<option value="${escapeHtml(e.no)}" ${String(e.no)===String(employee.no)?"selected":""}>${escapeHtml(e.name)} — ${escapeHtml(e.position||"No Position")}</option>`).join("");
  content.innerHTML=`
    ${heroBanner("Admin Department New OT Request",`HR filing workspace • ${employees.length} Admin employee(s) registered.`,recent.length,"recent Admin OT request(s)")}
    <div class="card" style="margin-bottom:16px;border:2px solid #dbeafe">
      <div class="card-header"><div class="card-title-group"><h3>Admin Employee</h3><p>Select who the OT request is for. This includes HR/Admin personnel registered in the master list.</p></div><span class="badge primary">Admin Department</span></div>
      <div class="card-body"><label class="field" style="max-width:620px"><span>Employee</span><select id="hrAdminOTEmployee">${options}</select></label></div>
    </div>
    <div class="card">
      <div class="card-header"><div class="card-title-group"><h3>New OT Request — ${escapeHtml(employee.name)}</h3><p>${escapeHtml(employee.position||"—")} • Employee No. ${escapeHtml(employee.no)} • Admin Department</p></div><span class="badge pending">Direct to Request Approver</span></div>
      <div class="card-body">
        <form id="hrAdminOTForm">
          <div class="employee-attendance-toolbar">
            <label class="field compact-field"><span>OT Date</span><input id="hrAdminOTDate" type="date" value="${todayKey}" required></label>
            <label class="field compact-field"><span>Shift</span><select id="hrAdminOTShift"><option value="Morning" ${defaultShift==="Morning"?"selected":""}>Morning</option><option value="Night" ${defaultShift==="Night"?"selected":""}>Night</option></select></label>
            <label class="field compact-field"><span>Schedule In</span><input id="hrAdminScheduleStart" class="time-24-input" type="text" maxlength="5" value="${defaultStart}" placeholder="HH:MM" required></label>
            <label class="field compact-field"><span>Schedule Out</span><input id="hrAdminScheduleEnd" class="time-24-input" type="text" maxlength="5" value="${defaultEnd}" placeholder="HH:MM" required></label>
          </div>
          <div id="hrAdminHolidayStatus" class="holiday-status-banner ${holiday?getHolidayCategoryClass(holiday.category):"holiday-regular-day"}">${holiday?`<strong>${escapeHtml(holiday.name)}</strong><span>${escapeHtml(holiday.label)} • OT Type is automatic.</span>`:`<strong>Regular Workday</strong><span>Regular Day OT normally starts at Schedule Out.</span>`}</div>
          <div class="revision-time-grid" style="margin-top:14px">
            <label class="field"><span>OT Type</span><select id="hrAdminOTType" ${holiday?"disabled":""}><option value="Regular Day" ${defaultOtType==="Regular Day"?"selected":""}>Regular Day</option><option value="Rest Day OT" ${defaultOtType==="Rest Day OT"?"selected":""}>Rest Day OT</option><option value="Special Holiday" ${defaultOtType==="Special Holiday"?"selected":""}>Special Holiday</option><option value="Regular Holiday" ${defaultOtType==="Regular Holiday"?"selected":""}>Regular Holiday</option></select></label>
            <label class="field"><span>OT In</span><input id="hrAdminOTStart" class="time-24-input" type="text" maxlength="5" value="${defaultOtStart}" placeholder="HH:MM" required></label>
            <label class="field"><span>OT Out</span><input id="hrAdminOTEnd" class="time-24-input" type="text" maxlength="5" placeholder="HH:MM" required></label>
          </div>
          <label class="field" style="margin-top:14px"><span>Reason / Remarks</span><textarea id="hrAdminOTReason" rows="3" placeholder="Required" required></textarea></label>
          <div class="bulk-ot-footer" style="margin-top:16px"><div class="bulk-summary"><span><strong id="hrAdminOTTotal">0.00</strong> total OT hours</span><small id="hrAdminOTBreakdown"></small></div><button class="btn btn-primary" type="submit">Submit Admin OT to Request Approver</button></div>
        </form>
      </div>
    </div>
    <div class="card" style="margin-top:16px"><div class="card-header"><div class="card-title-group"><h3>Recent Admin OT Requests</h3><p>Latest requests filed for Admin Department employees.</p></div></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Date</th><th>Employee</th><th>Position</th><th>OT Type</th><th>OT Time</th><th>Total</th><th>Status</th><th>Reason</th></tr></thead><tbody>${recent.length?recent.map(r=>`<tr><td>${formatDate(r.otDate)}</td><td><strong>${escapeHtml(r.employeeName)}</strong><small class="attendance-subline">${escapeHtml(r.employeeNo||"")}</small></td><td>${escapeHtml(r.position||"")}</td><td>${escapeHtml(r.otType||"")}</td><td>${escapeHtml(r.startTime||r.normalOtStart||"")} → ${escapeHtml(r.endTime||r.normalOtEnd||"")}</td><td><strong>${Number(r.totalHours||0).toFixed(2)}</strong></td><td><span class="badge ${r.status==="Approved"?"approved":r.status==="Rejected"?"rejected":"warning"}">${escapeHtml(r.status||"Pending")}</span></td><td class="wrap-cell">${escapeHtml(r.reason||"")}</td></tr>`).join(""):`<tr><td colspan="8">${emptyState("No Admin OT requests yet","Submit the first Admin Department OT request above.")}</td></tr>`}</tbody></table></div>
    </div>`;

  const employeeSelect=document.getElementById("hrAdminOTEmployee");
  const dateInput=document.getElementById("hrAdminOTDate");
  const shiftInput=document.getElementById("hrAdminOTShift");
  const scheduleStart=document.getElementById("hrAdminScheduleStart");
  const scheduleEnd=document.getElementById("hrAdminScheduleEnd");
  const otType=document.getElementById("hrAdminOTType");
  const otStart=document.getElementById("hrAdminOTStart");
  const otEnd=document.getElementById("hrAdminOTEnd");
  const holidayStatus=document.getElementById("hrAdminHolidayStatus");
  const updateTotal=()=>{
    const dateKey=String(dateInput?.value||todayKey);
    const h=getPhilippineHoliday(dateKey);
    const type=h?getAutomaticOtType(dateKey,false):(otType?.value||"Regular Day");
    const b=proposedOTBreakdown({scheduleStart:normalize24HourTime(scheduleStart?.value||""),scheduleEnd:normalize24HourTime(scheduleEnd?.value||""),normalOtStart:normalize24HourTime(otStart?.value||""),normalOtEnd:normalize24HourTime(otEnd?.value||""),otType:type,otDate:dateKey});
    document.getElementById("hrAdminOTTotal").textContent=Number(b.total||0).toFixed(2);
    document.getElementById("hrAdminOTBreakdown").textContent=b.fullDutyOt&&b.total>0?`${Number(b.scheduledOtHours||0).toFixed(2)} schedule + ${Number(b.extraOtHours||0).toFixed(2)} extra`:"";
    return b;
  };
  const refreshDateType=()=>{
    const dateKey=String(dateInput?.value||todayKey);
    const h=getPhilippineHoliday(dateKey);
    if(h){
      otType.value=getAutomaticOtType(dateKey,false);otType.disabled=true;
      holidayStatus.className=`holiday-status-banner ${getHolidayCategoryClass(h.category)}`;
      holidayStatus.innerHTML=`<strong>${escapeHtml(h.name)}</strong><span>${escapeHtml(h.label)} • OT Type is automatic and worked scheduled hours count as OT.</span>`;
      otStart.value=normalize24HourTime(scheduleStart.value)||scheduleStart.value;
    }else{
      otType.disabled=false;
      if(["Special Holiday","Regular Holiday"].includes(otType.value))otType.value="Regular Day";
      holidayStatus.className="holiday-status-banner holiday-regular-day";
      holidayStatus.innerHTML="<strong>Regular Workday</strong><span>Regular Day OT normally starts at Schedule Out. Choose Rest Day OT when applicable.</span>";
      otStart.value=otType.value==="Rest Day OT"?(normalize24HourTime(scheduleStart.value)||scheduleStart.value):(normalize24HourTime(scheduleEnd.value)||scheduleEnd.value);
    }
    updateTotal();
  };
  employeeSelect?.addEventListener("change",()=>{hrAdminOTEmployeeNo=employeeSelect.value;renderHRAdminOTRequest();});
  shiftInput?.addEventListener("change",()=>{
    if(shiftInput.value==="Night"){scheduleStart.value="18:00";scheduleEnd.value="03:00";}else{scheduleStart.value="06:00";scheduleEnd.value="15:00";}
    refreshDateType();
  });
  dateInput?.addEventListener("change",refreshDateType);
  otType?.addEventListener("change",()=>{otStart.value=otType.value==="Rest Day OT"?(normalize24HourTime(scheduleStart.value)||scheduleStart.value):(normalize24HourTime(scheduleEnd.value)||scheduleEnd.value);updateTotal();});
  [scheduleStart,scheduleEnd,otStart,otEnd].forEach(el=>["input","change"].forEach(evt=>el?.addEventListener(evt,updateTotal)));
  document.getElementById("hrAdminOTForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const selected=resolveHRAdminEmployee(employeeSelect?.value||hrAdminOTEmployeeNo);if(!selected)return;
    const dateKey=String(dateInput?.value||"");
    const sStart=normalize24HourTime(scheduleStart?.value||""),sEnd=normalize24HourTime(scheduleEnd?.value||"");
    const oStart=normalize24HourTime(otStart?.value||""),oEnd=normalize24HourTime(otEnd?.value||"");
    if(!dateKey){showToast("Select the OT date.");return;}
    if([sStart,sEnd,oStart,oEnd].some(v=>!isValid24HourTime(v))){showToast("Enter valid Schedule and OT times in HH:MM format.");return;}
    const h=getPhilippineHoliday(dateKey);
    const type=h?getAutomaticOtType(dateKey,false):(otType?.value||"Regular Day");
    const reason=document.getElementById("hrAdminOTReason")?.value.trim()||"";if(!reason){showToast("Reason / Remarks is required.");return;}
    const b=proposedOTBreakdown({scheduleStart:sStart,scheduleEnd:sEnd,normalOtStart:oStart,normalOtEnd:oEnd,otType:type,otDate:dateKey});
    if(Number(b.total||0)<=0){showToast("OT hours must be greater than zero.");return;}
    const existing=latestOTRequestForEmployeeDate(selected.no,dateKey);
    if(existing && ["Pending","Approved"].includes(existing.status)){showToast(`This employee already has a ${existing.status.toLowerCase()} OT request for ${formatDate(dateKey)}.`);return;}
    const now=new Date().toISOString();
    upsertEmployeeAttendanceOTSubmission({employeeNo:selected.no,employeeName:selected.name,position:selected.position||"",department:"Admin",workArea:selected.location||"",schedule:shiftInput?.value||"Morning",scheduleStart:sStart,scheduleEnd:sEnd,employeeDayOff:selected.dayOff||"",date:dateKey,advanceOTFiling:dateKey>toDateKey(new Date()),attendanceStatus:"",attendanceType:"",absentType:"",leaveType:"",timeIn:"",timeOut:"",workedHours:0,regularHours:0,lateMinutes:0,undertimeMinutes:0,hasOT:true,otType:type,normalOtStart:oStart,normalOtEnd:oEnd,straightDuty:false,straightDutyScheduleStart:"",straightDutyScheduleEnd:"",straightDutyOtStart:"",straightDutyOtEnd:"",totalHours:Number(b.total||0).toFixed(2),scheduledOtHours:Number(b.scheduledOtHours||0).toFixed(2),extraOtHours:Number(b.extraOtHours||0).toFixed(2),holidayName:h?.name||"",holidayClassification:h?.label||"",reason,submittedByEmployee:currentUser.username,submittedByEmployeeName:currentUser.displayName,submittedAt:now,supervisorOTReviewStatus:"Pending",supervisorOTReviewReason:"",adminFiledByHR:true,adminFiledByHRAt:now});
    try{
      const request=forwardEmployeeOTBySupervisor(selected.no,dateKey);
      showToast(`${selected.name} OT ${Number(request.totalHours||b.total||0).toFixed(2)} hour(s) submitted directly to Request Approver.`);
      renderHRAdminOTRequest();
    }catch(error){showToast(error?.message||"OT was saved but could not be forwarded to Request Approver.");}
  });
  updateTotal();
}

function renderHRAdminLeaveRequest(){
  const employees=getHRAdminEmployees();
  setPage("Leave Request","HR • ADMIN DEPARTMENT","File Admin Department leave requests. HR-entered Admin leave is forwarded directly to the Request Approver to avoid HR approving its own filing.");
  if(!employees.length){
    content.innerHTML=`${heroBanner("Admin Department Leave Request","Add Admin employees first in Employee Master List.",0,"Admin employees")}
      <div class="card"><div class="card-body">${emptyState("No Admin employees yet","Use Employee Master List to register Admin Department employees. They will appear here automatically.")}</div></div>`;
    return;
  }
  const employee=resolveHRAdminEmployee(hrAdminLeaveEmployeeNo);
  hrAdminLeaveEmployeeNo=employee.no;
  const status=normalizeEmploymentStatus(employee.employmentStatus,employee.isCustom);
  const credit=getEmployeeLeaveCreditSummary(employee.no,status);
  const todayKey=toDateKey(new Date());
  const allRows=getLeaveRequests().filter(r=>r.department==="Admin").sort((a,b)=>new Date(b.createdAt||0)-new Date(a.createdAt||0));
  const recent=allRows.slice(0,12);
  const options=employees.map(e=>`<option value="${escapeHtml(e.no)}" ${String(e.no)===String(employee.no)?"selected":""}>${escapeHtml(e.name)} — ${escapeHtml(e.position||"No Position")}</option>`).join("");
  content.innerHTML=`
    ${heroBanner("Admin Department Leave Request",`${employees.length} Admin employee(s) available for HR filing.`,allRows.filter(r=>r.status==="Pending Request Approver").length,"pending Request Approver")}
    <div class="card" style="margin-bottom:16px;border:2px solid #dbeafe"><div class="card-header"><div class="card-title-group"><h3>Admin Employee</h3><p>Select the employee who is filing leave.</p></div><span class="badge primary">Admin Department</span></div><div class="card-body"><label class="field" style="max-width:620px"><span>Employee</span><select id="hrAdminLeaveEmployee">${options}</select></label></div></div>
    <div class="stats-grid">${statCard("VL Credit",Number(credit.remainingVL||0).toFixed(2),`Available: ${Number(credit.availableVL||0).toFixed(2)} • Reserved: ${Number(credit.reservedVL||0).toFixed(2)}`,"primary")}${statCard("SL Credit",Number(credit.remainingSL||0).toFixed(2),`Available: ${Number(credit.availableSL||0).toFixed(2)} • Reserved: ${Number(credit.reservedSL||0).toFixed(2)}`,"success")}${statCard("Employment Status",escapeHtml(status),status==="Regular"?"Eligible for paid VL / SL credits":"Paid VL / SL credits require Regular status")}</div>
    <div class="card">
      <div class="card-header"><div class="card-title-group"><h3>New Leave Request — ${escapeHtml(employee.name)}</h3><p>${escapeHtml(employee.position||"—")} • Employee No. ${escapeHtml(employee.no)}</p></div><span class="badge pending">Direct to Request Approver</span></div>
      <div class="card-body"><form id="hrAdminLeaveForm" class="leave-request-form">
        <div class="employee-leave-identity"><div><span>Employee</span><strong>${escapeHtml(employee.name)}</strong></div><div><span>Position</span><strong>${escapeHtml(employee.position||"—")}</strong></div><div><span>Department</span><strong>Admin</strong></div></div>
        <label class="field"><span>Leave Type</span><select id="hrAdminLeaveType" required><option value="VL">VL — Vacation Leave</option><option value="SL">SL — Sick Leave</option><option value="Emergency Leave">Emergency Leave</option></select></label>
        <label class="field"><span>Leave Pay</span><select id="hrAdminLeavePayType" required><option value="With Pay" ${status==="Regular"?"":"disabled"}>With Pay</option><option value="Without Pay" ${status==="Regular"?"":"selected"}>Without Pay</option></select></label>
        <div class="leave-credit-summary"><div><span>Selected Credit Balance</span><strong id="hrAdminLeaveCreditBalance">—</strong></div><div><span>Pending Reserved</span><strong id="hrAdminLeaveCreditReserved">—</strong></div><div><span>Requested Days</span><strong id="hrAdminLeaveCreditRequested">1</strong></div><div><span>Balance After Approval</span><strong id="hrAdminLeaveCreditAfter">—</strong></div></div>
        <div class="leave-date-grid"><label class="field"><span>Leave From</span><input id="hrAdminLeaveStart" type="date" min="${todayKey}" value="${todayKey}" required></label><label class="field"><span>Leave To</span><input id="hrAdminLeaveEnd" type="date" min="${todayKey}" value="${todayKey}" required></label></div>
        <label class="field"><span>Reason</span><select id="hrAdminLeaveReason" required><option value="">Select reason</option><option value="Emergency">Emergency</option><option value="Going to province">Going to province</option><option value="Not feeling well">Not feeling well</option><option value="Important Matter">Important Matter</option><option value="Flood/Heavy Rain that Causes Flood">Flood/Heavy Rain that Causes Flood</option></select></label>
        <button class="btn btn-primary" type="submit">Submit Admin Leave to Request Approver</button>
      </form></div>
    </div>
    <div class="card" style="margin-top:16px"><div class="card-header"><div class="card-title-group"><h3>Recent Admin Leave Requests</h3><p>Latest Admin Department leave filings.</p></div></div><div class="table-wrap"><table class="data-table"><thead><tr><th>Employee</th><th>Type</th><th>Leave Date</th><th>Pay</th><th>Reason</th><th>Status</th><th>Filed</th></tr></thead><tbody>${recent.length?recent.map(r=>`<tr><td><strong>${escapeHtml(r.employeeName)}</strong><small class="attendance-subline">${escapeHtml(r.employeeNo||"")}</small></td><td>${escapeHtml(r.leaveType||"")}</td><td>${formatDate(r.startDate)}${r.endDate!==r.startDate?`<small class="attendance-subline">to ${formatDate(r.endDate)}</small>`:""}</td><td>${escapeHtml(r.payType||"Without Pay")}</td><td class="wrap-cell">${escapeHtml(r.reason||"")}</td><td>${leaveStatusBadge(r.status)}</td><td>${formatDateTime(r.createdAt)}</td></tr>`).join(""):`<tr><td colspan="7">${emptyState("No Admin leave requests yet","Submit the first Admin Department leave request above.")}</td></tr>`}</tbody></table></div></div>`;

  const employeeSelect=document.getElementById("hrAdminLeaveEmployee");
  const typeInput=document.getElementById("hrAdminLeaveType");
  const payInput=document.getElementById("hrAdminLeavePayType");
  const startInput=document.getElementById("hrAdminLeaveStart");
  const endInput=document.getElementById("hrAdminLeaveEnd");
  const updatePreview=()=>{
    const selected=resolveHRAdminEmployee(employeeSelect?.value||hrAdminLeaveEmployeeNo)||employee;
    const selectedStatus=normalizeEmploymentStatus(selected.employmentStatus,selected.isCustom);
    const summary=getEmployeeLeaveCreditSummary(selected.no,selectedStatus);
    const leaveType=typeInput?.value||"VL";
    const creditLeave=leaveType==="VL"||leaveType==="SL";
    const requested=leaveRequestDayCount(startInput?.value||todayKey,endInput?.value||startInput?.value||todayKey)||1;
    const withPayOption=payInput?.querySelector('option[value="With Pay"]');
    if(withPayOption)withPayOption.disabled=selectedStatus!=="Regular"||!creditLeave;
    if((selectedStatus!=="Regular"||!creditLeave) && payInput)payInput.value="Without Pay";
    const remaining=leaveType==="VL"?summary.remainingVL:leaveType==="SL"?summary.remainingSL:0;
    const reserved=leaveType==="VL"?summary.reservedVL:leaveType==="SL"?summary.reservedSL:0;
    const available=leaveType==="VL"?summary.availableVL:leaveType==="SL"?summary.availableSL:0;
    const withPay=payInput?.value==="With Pay";
    document.getElementById("hrAdminLeaveCreditBalance").textContent=creditLeave&&selectedStatus==="Regular"?`${Number(remaining).toFixed(2)} ${leaveType}`:"N/A";
    document.getElementById("hrAdminLeaveCreditReserved").textContent=creditLeave&&selectedStatus==="Regular"?`${Number(reserved).toFixed(2)} pending`:"N/A";
    document.getElementById("hrAdminLeaveCreditRequested").textContent=creditLeave?String(requested):"N/A";
    document.getElementById("hrAdminLeaveCreditAfter").textContent=creditLeave&&selectedStatus==="Regular"&&withPay?`${Math.max(0,Number(available)-requested).toFixed(2)} ${leaveType}`:"No deduction";
  };
  employeeSelect?.addEventListener("change",()=>{hrAdminLeaveEmployeeNo=employeeSelect.value;renderHRAdminLeaveRequest();});
  startInput?.addEventListener("change",()=>{if(endInput){endInput.min=startInput.value||todayKey;if(!endInput.value||endInput.value<startInput.value)endInput.value=startInput.value;}updatePreview();});
  endInput?.addEventListener("change",updatePreview);typeInput?.addEventListener("change",updatePreview);payInput?.addEventListener("change",updatePreview);updatePreview();
  document.getElementById("hrAdminLeaveForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const selected=resolveHRAdminEmployee(employeeSelect?.value||hrAdminLeaveEmployeeNo);if(!selected)return;
    const selectedStatus=normalizeEmploymentStatus(selected.employmentStatus,selected.isCustom);
    const leaveType=typeInput?.value||"VL";const creditLeave=leaveType==="VL"||leaveType==="SL";
    const payType=creditLeave?(payInput?.value||"Without Pay"):"Without Pay";
    const startDate=startInput?.value||"",endDate=endInput?.value||"",reason=document.getElementById("hrAdminLeaveReason")?.value||"";
    if(!startDate||!endDate){showToast("Select the leave date.");return;}if(startDate<todayKey){showToast("Leave requests cannot be filed for a past date.");return;}if(endDate<startDate){showToast("Leave To cannot be earlier than Leave From.");return;}if(!reason){showToast("Select the leave reason.");return;}
    const requestedCreditDays=leaveRequestDayCount(startDate,endDate);
    if(payType==="With Pay"){
      if(!creditLeave){showToast("Emergency Leave is filed Without Pay.");return;}if(selectedStatus!=="Regular"){showToast("Only Regular employees can file VL / SL With Pay.");return;}
      const summary=getEmployeeLeaveCreditSummary(selected.no,selectedStatus);const available=leaveType==="VL"?summary.availableVL:summary.availableSL;
      if(requestedCreditDays>available){showToast(`${selected.name} has only ${Number(available).toFixed(2)} ${leaveType} credit(s) available after pending requests.`);return;}
    }
    const overlapping=getLeaveRequests().find(r=>String(r.employeeNo)===String(selected.no)&&["Pending Supervisor","Pending HR","Pending Request Approver","Approved"].includes(r.status)&&!(endDate<r.startDate||startDate>r.endDate));
    if(overlapping){showToast("This employee already has an active leave request covering that date.");return;}
    const conflictingOT=getRequests().find(r=>String(r.employeeNo)===String(selected.no)&&r.otDate>=startDate&&r.otDate<=endDate&&["Pending","Approved"].includes(r.status));
    if(conflictingOT){showToast(`This employee already has an OT request on ${formatDate(conflictingOT.otDate)}.`);return;}
    const now=new Date().toISOString();
    const request={id:`LV-${Date.now()}-${Math.floor(Math.random()*1000)}`,employeeNo:selected.no,employeeName:selected.name,position:selected.position||"",department:"Admin",supervisorName:"HR Admin Filing",submittedBy:currentUser.username,filedByRole:"HR",filedByName:currentUser.displayName,leaveType,payType,requestedCreditDays:payType==="With Pay"?requestedCreditDays:0,creditChargedDays:0,startDate,endDate,reason,status:"Pending Request Approver",createdAt:now,supervisorReviewedBy:currentUser.displayName,supervisorReviewedAt:now,supervisorRemarks:"Admin Department leave filed through HR; Supervisor step skipped.",hrReviewedBy:currentUser.displayName,hrReviewedAt:now,hrRemarks:"Admin Department filing forwarded directly to Request Approver.",gmReviewedBy:"",gmReviewedAt:"",gmRemarks:""};
    const all=getLeaveRequests();all.unshift(request);saveLeaveRequests(all);addManagerLeaveNotification(request);addEmployeeLeaveNotification(request,"hr-approved");
    showToast(payType==="With Pay"?`Admin leave submitted to Request Approver. ${requestedCreditDays} ${leaveType} credit day(s) reserved while pending.`:"Admin leave submitted directly to Request Approver.");
    renderHRAdminLeaveRequest();updateManagerNotificationUI();
  });
}

function renderHRLeaveOTCombined(){
  const approvedOT=getRequests().filter(r=>r.status==="Approved" && isActualOTRecord(r));
  const pendingLeave=getLeaveRequests().filter(r=>r.status==="Pending HR").length;
  const approvedOTHours=approvedOT.reduce((sum,r)=>sum+Number(r.totalHours||0),0);
  const switcher=`<div class="card" style="margin-bottom:16px">
    <div class="card-body" style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
      <button id="hrCombinedLeaveView" class="btn ${hrCombinedRequestView==="leave"?"btn-primary":"btn-secondary"}" type="button">Leave Approval${pendingLeave?` (${pendingLeave})`:""}</button>
      <button id="hrCombinedOTView" class="btn ${hrCombinedRequestView==="ot"?"btn-primary":"btn-secondary"}" type="button">Approved OT (${approvedOT.length})</button>
      <span class="muted">One HR workspace for leave review and final approved overtime records.</span>
    </div>
  </div>`;

  if(hrCombinedRequestView==="ot"){
    setPage("Leave & Approved OT","HUMAN RESOURCES",`Approved overtime receiving list • ${approvedOT.length} request(s) • ${approvedOTHours.toFixed(2)} OT hours.`);
    content.innerHTML=`${switcher}
      ${heroBanner("Approved overtime records","Only Request Approver-approved OT appears here for HR cutoff/payroll use.",approvedOTHours.toFixed(2),"approved OT hours")}
      <div class="stats-grid">
        ${statCard("Approved OT",approvedOT.length,"Final approved overtime","success")}
        ${statCard("Approved OT Hours",approvedOTHours.toFixed(2),"Total approved hours","primary")}
        ${statCard("Pending Leave",pendingLeave,"Waiting for HR review",pendingLeave?"warning":"")}
      </div>
      <div id="hrCombinedApprovedOTTable"></div>`;
    const target=document.getElementById("hrCombinedApprovedOTTable");
    renderTable(approvedOT,{mode:"hr",target});
  }else{
    renderLeaveApprovalPage("HR");
    setPage("Leave & Approved OT","HUMAN RESOURCES","Review Supervisor-approved leave requests and access final Approved OT in one HR workspace.");
    content.insertAdjacentHTML("afterbegin",switcher);
  }

  document.getElementById("hrCombinedLeaveView")?.addEventListener("click",()=>{
    hrCombinedRequestView="leave";
    renderHRLeaveOTCombined();
  });
  document.getElementById("hrCombinedOTView")?.addEventListener("click",()=>{
    hrCombinedRequestView="ot";
    renderHRLeaveOTCombined();
  });
}

function renderHR(){
  if(currentPage==="hr-new-ot")return renderHRAdminOTRequest();
  if(currentPage==="hr-leave-request")return renderHRAdminLeaveRequest();
  // HR attendance is Supervisor-finalized attendance. Approved OT alone must not
  // create a Present row, especially for today's not-yet-finalized duty.
  pruneUnfinalizedCurrentAttendance();
  if(currentPage==="attendance")currentPage="last-cutoff";
  if(currentPage==="approved"){
    hrCombinedRequestView="ot";
    currentPage="leave-approvals";
  }
  if(currentPage==="leave-approvals")return renderHRLeaveOTCombined();
  // HR attendance is consolidated inside the Cutoff tab.
  if(currentPage==="attendance-summary")currentPage="last-cutoff";
  const rows=getRequests();
  const cutoff=getPayrollCutoff(new Date());
  const approvedAll=rows.filter(r=>r.status==="Approved" && isActualOTRecord(r));
  const cutoffApprovedForExport=filterRowsByPayrollCutoff(approvedAll);
  const todayDashboardKey=toDateKey(new Date());
  const dashboardDateKey=hrDashboardDateKey||todayDashboardKey;
  const dashboardIsToday=dashboardDateKey===todayDashboardKey;
  const dashboardContextLabel=dashboardIsToday?"Today":"Selected Date";
  const approved=approvedAll.filter(r=>r.otDate===dashboardDateKey);
  const totalHours=approved.reduce((s,r)=>s+Number(r.totalHours||0),0);
  const uniqueEmployees=new Set(approved.map(r=>String(r.employeeName||"").trim().toLowerCase()).filter(Boolean)).size;
  const currentMonthHolidays=getPhilippineHolidaysInMonth(dashboardDateKey);
  const attendanceForDashboardDate=getDailyAttendanceRecords().filter(r=>r.date===dashboardDateKey);
  const attendancePresent=attendanceForDashboardDate.filter(r=>r.status==="Present").length;
  const attendanceAbsent=attendanceForDashboardDate.filter(r=>r.status==="Absent").length;
  const attendanceLate=attendanceForDashboardDate.filter(r=>Number(r.lateMinutes||0)>0).length;

  if(currentPage==="dashboard"){
    setPage("HR Dashboard","HUMAN RESOURCES",`Dashboard date: ${formatDate(dashboardDateKey)} • ${dashboardContextLabel}.`);
    const recent=[...approved].sort((a,b)=>new Date(b.reviewedAt)-new Date(a.reviewedAt)).slice(0,6);
    content.innerHTML=`
      <div class="card" style="margin-bottom:16px">
        <div class="card-body" style="display:flex;gap:12px;align-items:end;flex-wrap:wrap">
          <label class="field compact-field" style="margin:0;min-width:220px"><span>Dashboard Date</span><input id="hrDashboardDate" type="date" value="${escapeHtml(dashboardDateKey)}"></label>
          <button id="hrDashboardTodayBtn" class="btn btn-secondary" type="button" ${dashboardIsToday?"disabled":""}>Today</button>
          <span class="muted" style="padding-bottom:10px">All dashboard boxes below follow the selected date. Default is today.</span>
        </div>
      </div>
      ${heroBanner(
        "Approved overtime registry",
        `${dashboardContextLabel}: ${formatDate(dashboardDateKey)}.`,
        totalHours.toFixed(2),
        `approved OT hours for ${dashboardContextLabel.toLowerCase()}`
      )}
      <div class="stats-grid">
        ${statCard("Approved Requests",approved.length,`${dashboardContextLabel} • ${formatDate(dashboardDateKey)}`,"success","approved")}
        ${statCard("Approved OT Hours",totalHours.toFixed(2),`Approved overtime for ${dashboardContextLabel.toLowerCase()}`,"primary","approved")}
        ${statCard("Employees",uniqueEmployees,`Employees with approved OT for ${dashboardContextLabel.toLowerCase()}`,"","employees")}
        ${statCard("Dashboard Date",formatDate(dashboardDateKey),dashboardContextLabel,"warning")}
        ${statCard("PH Holidays",currentMonthHolidays.length,`${getCalendarMonthRange(dashboardDateKey).label} • whole month`,currentMonthHolidays.length?"danger":"primary","holidays")}
        ${statCard("Present",attendancePresent,`Attendance recorded for ${formatDate(dashboardDateKey)}`,"success","last-cutoff")}
        ${statCard("Absent",attendanceAbsent,`Attendance status for ${formatDate(dashboardDateKey)}`,"danger","last-cutoff")}
        ${statCard("Late",attendanceLate,`Employees with recorded late for ${formatDate(dashboardDateKey)}`,"warning","last-cutoff")}
      </div>
      ${renderHolidayCoverageCard(dashboardDateKey,`Philippine Holidays — ${getCalendarMonthRange(dashboardDateKey).label}`)}
      <div class="grid-2">
        <div class="card">
          <div class="card-header">
            <div class="card-title-group"><h3>Recently Approved — ${dashboardContextLabel}</h3><p>${formatDate(dashboardDateKey)}</p></div>
            <button type="button" id="viewApproved" class="btn btn-secondary btn-sm">View OT History</button>
          </div>
          <div class="card-body">${recent.length?`<div class="mini-list">${recent.map(r=>miniItem(r,true)).join("")}</div>`:emptyState(`No approved overtime for ${dashboardContextLabel.toLowerCase()}`,`Approved OT recorded for ${formatDate(dashboardDateKey)} will appear here.`)}</div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title-group"><h3>Department Coverage — ${dashboardContextLabel}</h3><p>Approved OT per department for ${formatDate(dashboardDateKey)}</p></div></div>
          <div class="card-body"><div class="department-grid">${departmentSummaryCards(approved)}</div></div>
        </div>
      </div>`;
    bindDashboardStatCards();
    document.getElementById("hrDashboardDate")?.addEventListener("change",e=>{
      const nextDate=String(e.target.value||"").trim();
      if(!/^\d{4}-\d{2}-\d{2}$/.test(nextDate)){showToast("Select a valid dashboard date.");return;}
      hrDashboardDateKey=nextDate;
      renderHR();
    });
    document.getElementById("hrDashboardTodayBtn")?.addEventListener("click",()=>{
      hrDashboardDateKey=toDateKey(new Date());
      renderHR();
    });
    document.getElementById("viewApproved")?.addEventListener("click",()=>{navigateTo("approved")});
    bindDepartmentDrilldown(approved);
    return;
  }
  if(currentPage==="employees"){
    const customEmployees=getCustomEmployees();
    const masterEmployees=getHRMasterEmployeeRows();
    const pendingSchedule=masterEmployees.filter(emp=>!isEmployeeSetupComplete(emp)).length;
    const inactiveEmployees=masterEmployees.filter(emp=>["AWOL","Resigned","End Of Contract"].includes(emp.employmentStatus)).length;
    // Build Leave/Absent counters once instead of scanning the complete attendance
    // history again for every employee. This keeps Master List opening responsive even
    // after the attendance database grows across many cutoffs.
    const masterAttendanceRecords=getDailyAttendanceRecords().filter(r=>(r.status==="Leave"||r.status==="Absent")&&Boolean(r.date));
    const todayKey=toDateKey(new Date());
    getLeaveRequests().filter(r=>r.status==="Approved").forEach(request=>{
      eachDateKey(request.startDate,request.endDate).filter(date=>date<=todayKey).forEach(date=>{
        masterAttendanceRecords.push({
          employeeNo:request.employeeNo,
          employeeName:request.employeeName,
          date,
          status:"Leave",
          attendanceType:request.leaveType||"Leave",
          leaveType:request.leaveType||"",
          remarks:request.reason||"",
          sourceLeaveRequestId:request.id
        });
      });
    });
    const attendanceStatsByEmployee=new Map(masterEmployees.map(emp=>[String(emp.no),{leaveRecords:[],absentRecords:[],seen:new Set()}]));
    const employeeNoLookup=new Map(masterEmployees.map(emp=>[String(emp.no||"").trim().toLowerCase(),String(emp.no)]));
    const employeeNameLookup=new Map(masterEmployees.map(emp=>[String(emp.name||"").trim().toLowerCase(),String(emp.no)]));
    masterAttendanceRecords.forEach(record=>{
      const recordNo=String(record.employeeNo||"").trim().toLowerCase();
      const recordName=String(record.employeeName||"").trim().toLowerCase();
      const employeeNo=employeeNoLookup.get(recordNo)||(!recordNo?employeeNameLookup.get(recordName):"");
      if(!employeeNo)return;
      const status=record.status==="Leave"?"Leave":record.status==="Absent"?"Absent":"";
      if(!status || !record.date)return;
      const stats=attendanceStatsByEmployee.get(employeeNo);
      if(!stats)return;
      const key=`${record.date}|${status}`;
      if(stats.seen.has(key))return;
      stats.seen.add(key);
      if(status==="Leave")stats.leaveRecords.push(record);else stats.absentRecords.push(record);
    });
    attendanceStatsByEmployee.forEach(stats=>{
      stats.leaveRecords.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
      stats.absentRecords.sort((a,b)=>String(b.date).localeCompare(String(a.date)));
      delete stats.seen;
    });
    setPage("Employee Master List","ADMIN DEPARTMENT","Employee roster with position, department, status, Leave, Absent, SL, and VL balances. Use Edit to update position, department, employment status, and SL/VL credits.");
    content.innerHTML=`
      ${heroBanner(
        "Employee Master List",
        "View employee names, positions, departments, employment status, Leave/Absent totals, and SL/VL balances. Approved paid leave automatically reduces the remaining credit.",
        masterEmployees.length,
        "employees in master list"
      )}
      <div class="stats-grid">
        ${statCard("Total Employees",masterEmployees.length,"All departments","primary")}
        ${statCard("Admin-added Employees",customEmployees.length,"New records created from Employee Master List")}
        ${statCard("Needs Supervisor Setup",pendingSchedule,"Missing Work Area or schedule","warning")}
        ${statCard("Inactive / AWOL",inactiveEmployees,"AWOL, Resigned, or End Of Contract","danger")}
      </div>
      <div class="card employee-add-card">
        <div class="card-header"><div class="card-title-group"><h3>Add New Employee</h3><p>Admin assigns the employee name, position, department, and employment status when creating the record.</p></div></div>
        <div class="card-body">
          <form id="hrAddEmployeeForm" class="employee-add-grid hr-employee-add-grid">
            <label class="field"><span>Employee Name</span><input id="hrNewEmployeeName" placeholder="Full name" required></label>
            <label class="field"><span>Position</span><input id="hrNewEmployeePosition" placeholder="Position / Job title" required></label>
            <label class="field"><span>Department</span><select id="hrNewEmployeeDepartment" required>${DEPARTMENTS.map(dep=>`<option value="${escapeHtml(dep)}">${escapeHtml(dep)}</option>`).join("")}</select></label>
            <label class="field"><span>Status</span><select id="hrNewEmployeeStatus" required>${EMPLOYMENT_STATUSES.map(status=>`<option value="${escapeHtml(status)}" ${status==="Probationary"?"selected":""}>${escapeHtml(status)}</option>`).join("")}</select></label>
            <div class="employee-add-action"><button class="btn btn-primary" type="submit">＋ Add Employee</button></div>
          </form>
        </div>
      </div>
      <div class="card employee-master-card">
        <div class="card-header employee-master-header">
          <div class="card-title-group"><h3>All Employee Master Data</h3><p>Click Leave or Absent to view dates. Use Edit for employee details and Delete to remove an employee from the active master list.</p></div>
          <div class="employee-master-filters">
            <input id="hrMasterSearch" class="employee-master-search" type="search" placeholder="Search employee / position / department / status...">
            <select id="hrMasterDepartmentFilter" class="employee-master-filter"><option value="">All Departments</option>${DEPARTMENTS.map(dep=>`<option value="${escapeHtml(dep)}">${escapeHtml(dep)}</option>`).join("")}</select>
            <button id="downloadMasterListExcel" class="btn btn-success btn-sm" type="button">⇩ Download Excel</button>
          </div>
        </div>
        <div class="schedule-management-wrap employee-master-wrap">
          <table class="schedule-management-table hr-employee-master-table">
            <thead><tr><th>Employee Name</th><th>Position</th><th>Department</th><th>Status</th><th class="master-leave-col">Leave</th><th class="master-absent-col">Absent</th><th class="master-sl-col">SL</th><th class="master-vl-col">VL</th><th>Action</th></tr></thead>
            <tbody>${masterEmployees.map(emp=>{
              const attendanceStats=attendanceStatsByEmployee.get(emp.no)||{leaveRecords:[],absentRecords:[]};
              return `<tr data-employee-no="${escapeHtml(emp.no)}" data-current-department="${escapeHtml(emp.department)}" data-is-custom="${emp.isCustom?"1":"0"}" data-master-search="${escapeHtml(`${emp.name} ${emp.position} ${emp.department} ${emp.employmentStatus}`.toLowerCase())}">
              <td><strong>${escapeHtml(emp.name)}</strong></td>
              <td>${escapeHtml(emp.position)}</td>
              <td>${escapeHtml(emp.department||"—")}</td>
              <td>${employmentStatusBadge(emp.employmentStatus)}</td>
              <td class="master-leave-col"><button class="master-attendance-count-btn leave" type="button" data-attendance-status="Leave" data-employee-no="${escapeHtml(emp.no)}" title="View Leave dates for ${escapeHtml(emp.name)}">${attendanceStats.leaveRecords.length}</button></td>
              <td class="master-absent-col"><button class="master-attendance-count-btn absent" type="button" data-attendance-status="Absent" data-employee-no="${escapeHtml(emp.no)}" title="View Absent dates for ${escapeHtml(emp.name)}">${attendanceStats.absentRecords.length}</button></td>
              <td class="master-sl-col"><span class="leave-credit-badge eligible sl-credit">${escapeHtml(Number(emp.leaveCreditSL||0).toFixed(2))}</span></td>
              <td class="master-vl-col"><span class="leave-credit-badge eligible vl-credit">${escapeHtml(Number(emp.leaveCreditVL||0).toFixed(2))}</span></td>
              <td><div class="master-row-actions"><button class="btn btn-primary btn-sm hr-master-edit-btn" type="button">✎ Edit</button><button class="btn btn-danger btn-sm hr-master-delete-btn" type="button">Delete</button></div></td>
            </tr>`;
            }).join("")}</tbody>
          </table>
        </div>
        <div class="schedule-management-note">SL and VL show the current remaining balances. Regular employees default to 5 SL and 5 VL. Use Edit to change Position, Department, Employment Status, and adjust these balances. Delete removes the employee from the active master list and schedule setup, while historical attendance/OT/leave records are retained.</div>
      </div>`;

    document.getElementById("hrAddEmployeeForm")?.addEventListener("submit",e=>{
      e.preventDefault();
      const name=document.getElementById("hrNewEmployeeName").value.trim();
      const position=document.getElementById("hrNewEmployeePosition").value.trim();
      const department=document.getElementById("hrNewEmployeeDepartment").value;
      const employmentStatus=document.getElementById("hrNewEmployeeStatus").value;
      if(!name || !position || !department || !EMPLOYMENT_STATUSES.includes(employmentStatus)){showToast("Complete all employee details.");return;}
      if(allKnownEmployees().some(emp=>String(emp.name||"").trim().toLowerCase()===name.toLowerCase())){showToast("Employee name already exists.");return;}
      const employee={no:`EMP-HR-${Date.now()}-${Math.floor(Math.random()*1000)}`,name,position,department,employmentStatus,location:"",schedule:"Unassigned",addedBy:currentUser.username,createdAt:new Date().toISOString()};
      addCustomEmployee(employee);clearEmployeeScheduleOverride(employee.no);addSupervisorEmployeeNotification(employee);queueITAccountCreation(employee);
      showToast(`${name} added to ${department} as ${employmentStatus}. IT notified for account creation.`);renderHR();
    });

    const filterMasterRows=()=>{
      const term=String(document.getElementById("hrMasterSearch")?.value||"").trim().toLowerCase();
      const department=document.getElementById("hrMasterDepartmentFilter")?.value||"";
      document.querySelectorAll(".hr-employee-master-table tbody tr[data-employee-no]").forEach(row=>{
        const matchesText=!term || String(row.dataset.masterSearch||"").includes(term);
        const matchesDepartment=!department || row.dataset.currentDepartment===department;
        row.classList.toggle("hidden",!(matchesText&&matchesDepartment));
      });
    };
    document.getElementById("hrMasterSearch")?.addEventListener("input",filterMasterRows);
    document.getElementById("hrMasterDepartmentFilter")?.addEventListener("change",filterMasterRows);
    document.getElementById("downloadMasterListExcel")?.addEventListener("click",()=>{
      const term=String(document.getElementById("hrMasterSearch")?.value||"").trim().toLowerCase();
      const department=document.getElementById("hrMasterDepartmentFilter")?.value||"";
      const filteredEmployees=masterEmployees.filter(emp=>{
        const hay=`${emp.name} ${emp.position} ${emp.department} ${emp.employmentStatus}`.toLowerCase();
        return (!term||hay.includes(term)) && (!department||emp.department===department);
      });
      exportHRMasterListExcel(filteredEmployees,attendanceStatsByEmployee,{search:term,department});
    });

    const closeMasterAttendanceModal=()=>{modalRoot.innerHTML="";};
    document.querySelectorAll(".master-attendance-count-btn").forEach(btn=>btn.addEventListener("click",()=>{
      const employeeNo=btn.dataset.employeeNo;
      const status=btn.dataset.attendanceStatus==="Absent"?"Absent":"Leave";
      const employee=masterEmployees.find(emp=>emp.no===employeeNo);
      if(!employee)return;
      const stats=attendanceStatsByEmployee.get(employeeNo)||{leaveRecords:[],absentRecords:[]};
      const records=status==="Leave"?stats.leaveRecords:stats.absentRecords;
      modalRoot.innerHTML=`
        <div class="modal-backdrop" id="masterAttendanceBackdrop">
          <div class="modal master-attendance-history-modal" role="dialog" aria-modal="true" aria-labelledby="masterAttendanceHistoryTitle">
            <div class="modal-header"><span>ADMIN • EMPLOYEE MASTER LIST</span><h3 id="masterAttendanceHistoryTitle">${escapeHtml(employee.name)} — ${status} History</h3></div>
            <div class="modal-body">
              <div class="master-attendance-history-summary">
                <div><span>Employee</span><strong>${escapeHtml(employee.name||"—")}</strong></div>
                <div><span>Position</span><strong>${escapeHtml(employee.position||"—")}</strong></div>
                <div><span>${status} Days</span><strong class="${status==="Leave"?"leave-text":"absent-text"}">${records.length}</strong></div>
              </div>
              <div class="table-wrap master-attendance-history-table-wrap">
                <table class="data-table master-attendance-history-table">
                  <thead><tr><th>Date</th><th>Type</th><th>Reason / Remarks</th></tr></thead>
                  <tbody>${records.length?records.map(record=>`<tr>
                    <td><strong>${formatDate(record.date)}</strong></td>
                    <td>${escapeHtml(record.leaveType||record.absentType||record.attendanceType||status)}</td>
                    <td>${escapeHtml(record.remarks||"—")}</td>
                  </tr>`).join(""):`<tr><td colspan="3">${emptyState(`No ${status} records`,`${employee.name} has no recorded ${status.toLowerCase()} dates yet.`)}</td></tr>`}</tbody>
                </table>
              </div>
            </div>
            <div class="modal-footer"><button class="btn btn-primary" id="closeMasterAttendanceHistory" type="button">Close</button></div>
          </div>
        </div>`;
      document.getElementById("closeMasterAttendanceHistory")?.addEventListener("click",closeMasterAttendanceModal);
      document.getElementById("masterAttendanceBackdrop")?.addEventListener("click",event=>{if(event.target.id==="masterAttendanceBackdrop")closeMasterAttendanceModal();});
    }));

    const closeEmployeeEditModal=()=>{modalRoot.innerHTML="";};
    document.querySelectorAll(".hr-master-edit-btn").forEach(btn=>btn.addEventListener("click",()=>{
      const row=btn.closest("tr[data-employee-no]");
      const employeeNo=row?.dataset.employeeNo;
      const employee=getHRMasterEmployeeRows().find(emp=>emp.no===employeeNo);
      if(!employee)return;
      const currentLeaveCredit=getEmployeeLeaveCreditSummary(employee.no,employee.employmentStatus);
      modalRoot.innerHTML=`
        <div class="modal-backdrop" id="employeeMasterEditBackdrop">
          <div class="modal employee-master-edit-modal" role="dialog" aria-modal="true" aria-labelledby="employeeMasterEditTitle">
            <div class="modal-header"><span>ADMIN • EMPLOYEE MASTER LIST</span><h3 id="employeeMasterEditTitle">Edit Employee Details</h3></div>
            <form id="employeeMasterEditForm">
              <div class="modal-body employee-master-edit-form">
                <div class="master-attendance-history-summary employee-credit-edit-summary">
                  <div><span>Employee Name</span><strong>${escapeHtml(employee.name)}</strong></div>
                  <div><span>Current Department</span><strong>${escapeHtml(employee.department||"—")}</strong></div>
                  <div><span>Current Status</span><strong>${escapeHtml(employee.employmentStatus||"—")}</strong></div>
                </div>
                <div class="employee-credit-edit-grid">
                  <label class="field"><span>Position</span><input id="editMasterPositionInput" value="${escapeHtml(employee.position||"")}" placeholder="Position / Job title" required></label>
                  <label class="field"><span>Department</span><select id="editMasterDepartmentInput" required>${DEPARTMENTS.map(dep=>`<option value="${escapeHtml(dep)}" ${dep===employee.department?"selected":""}>${escapeHtml(dep)}</option>`).join("")}</select></label>
                  <label class="field"><span>Employment Status</span><select id="editMasterEmploymentStatusInput" required>${EMPLOYMENT_STATUSES.map(status=>`<option value="${escapeHtml(status)}" ${status===employee.employmentStatus?"selected":""}>${escapeHtml(status)}</option>`).join("")}</select></label>
                  <label class="field"><span>SL Remaining Credit</span><input id="editMasterSLCreditInput" type="number" min="0" step="0.5" value="${Number(currentLeaveCredit.remainingSL||0).toFixed(2)}" required></label>
                  <label class="field"><span>VL Remaining Credit</span><input id="editMasterVLCreditInput" type="number" min="0" step="0.5" value="${Number(currentLeaveCredit.remainingVL||0).toFixed(2)}" required></label>
                </div>
                <div class="schedule-management-note">Position, Department, Employment Status, SL, and VL are editable here. Changing Department moves the employee to the selected department throughout the app. Approved paid leave already used is preserved, and future approved With Pay leave will continue deducting from the balance you save.</div>
              </div>
              <div class="modal-footer"><button class="btn btn-light" id="cancelEmployeeMasterEdit" type="button">Cancel</button><button class="btn btn-primary" type="submit">Save Changes</button></div>
            </form>
          </div>
        </div>`;
      document.getElementById("cancelEmployeeMasterEdit")?.addEventListener("click",closeEmployeeEditModal);
      document.getElementById("employeeMasterEditBackdrop")?.addEventListener("click",event=>{if(event.target.id==="employeeMasterEditBackdrop")closeEmployeeEditModal();});
      document.getElementById("employeeMasterEditForm")?.addEventListener("submit",event=>{
        event.preventDefault();
        const position=String(document.getElementById("editMasterPositionInput")?.value||"").trim();
        const department=document.getElementById("editMasterDepartmentInput")?.value||"";
        const employmentStatus=document.getElementById("editMasterEmploymentStatusInput")?.value||"";
        const sl=Number(document.getElementById("editMasterSLCreditInput")?.value);
        const vl=Number(document.getElementById("editMasterVLCreditInput")?.value);
        if(!position){showToast("Enter the employee position.");return;}
        if(!DEPARTMENTS.includes(department)){showToast("Select a valid department.");return;}
        if(!EMPLOYMENT_STATUSES.includes(employmentStatus)){showToast("Select a valid employment status.");return;}
        if(!Number.isFinite(sl) || sl<0 || !Number.isFinite(vl) || vl<0){showToast("Enter valid SL and VL credits of 0 or higher.");return;}
        updateEmployeeProfileOverride(employeeNo,{position,department,employmentStatus});
        setEmployeeLeaveCreditRemaining(employeeNo,sl,vl);
        showToast(`${employee.name} position, department, status, SL, and VL updated.`);
        closeEmployeeEditModal();
        renderHR();
      });
    }));


    const closeEmployeeDeleteModal=()=>{modalRoot.innerHTML="";};
    document.querySelectorAll(".hr-master-delete-btn").forEach(btn=>btn.addEventListener("click",()=>{
      const row=btn.closest("tr[data-employee-no]");
      const employeeNo=row?.dataset.employeeNo;
      const employee=getHRMasterEmployeeRows().find(emp=>String(emp.no)===String(employeeNo));
      if(!employee)return;
      const linkedAccount=findITManagedAccountByEmployee(employeeNo);
      modalRoot.innerHTML=`
        <div class="modal-backdrop" id="employeeMasterDeleteBackdrop">
          <div class="modal employee-master-delete-modal" role="dialog" aria-modal="true" aria-labelledby="employeeMasterDeleteTitle">
            <div class="modal-header"><span>ADMIN • EMPLOYEE MASTER LIST</span><h3 id="employeeMasterDeleteTitle">Delete Employee</h3></div>
            <div class="modal-body employee-master-delete-body">
              <div class="master-attendance-history-summary">
                <div><span>Employee Name</span><strong>${escapeHtml(employee.name||"—")}</strong></div>
                <div><span>Position</span><strong>${escapeHtml(employee.position||"—")}</strong></div>
                <div><span>Department</span><strong>${escapeHtml(employee.department||"—")}</strong></div>
              </div>
              <div class="employee-delete-warning"><strong>Delete this employee from the active master list?</strong><span>This removes the employee from Employee Master List and schedule/setup lists. Historical attendance, OT, and leave records are kept for reporting.</span>${linkedAccount?`<span class="employee-delete-account-note">This employee already has a system login. Deleting the master-list record does not delete the Firebase Authentication user. IT should disable or manage that login separately.</span>`:""}</div>
            </div>
            <div class="modal-footer"><button class="btn btn-light" id="cancelEmployeeMasterDelete" type="button">Cancel</button><button class="btn btn-danger" id="confirmEmployeeMasterDelete" type="button">Delete Employee</button></div>
          </div>
        </div>`;
      document.getElementById("cancelEmployeeMasterDelete")?.addEventListener("click",closeEmployeeDeleteModal);
      document.getElementById("employeeMasterDeleteBackdrop")?.addEventListener("click",event=>{if(event.target.id==="employeeMasterDeleteBackdrop")closeEmployeeDeleteModal();});
      document.getElementById("confirmEmployeeMasterDelete")?.addEventListener("click",()=>{
        deleteCustomEmployee(employeeNo,employee.department);
        showToast(`${employee.name} deleted from Employee Master List.`);
        closeEmployeeDeleteModal();
        renderHR();
      });
    }));
    return;
  }
  if(currentPage==="approved"){
    hrCombinedRequestView="ot";
    currentPage="leave-approvals";
    return renderHRLeaveOTCombined();
  }
  if(currentPage==="last-cutoff"){
    const currentCutoff=getPayrollCutoff(new Date());
    if(!hrCutoffStartKey || !hrCutoffEndKey){
      hrCutoffStartKey=currentCutoff.startKey;
      hrCutoffEndKey=currentCutoff.endKey;
    }
    const selectedStart=parseLocalDate(hrCutoffStartKey);
    const selectedEnd=parseLocalDate(hrCutoffEndKey);
    const selectedLabel=`${selectedStart.toLocaleDateString("en-PH",{month:"short",day:"numeric",year:"numeric"})} – ${selectedEnd.toLocaleDateString("en-PH",{month:"short",day:"numeric",year:"numeric"})}`;
    const cutoffSearchNeedle=String(hrCutoffSearch||"").trim().toLowerCase();
    const matchesCutoffEmployee=r=>!cutoffSearchNeedle || String(r.employeeName||"").toLowerCase().includes(cutoffSearchNeedle) || String(r.employeeNo||"").toLowerCase().includes(cutoffSearchNeedle);
    const cutoffApprovedAll=approvedAll.filter(r=>r.otDate && r.otDate>=hrCutoffStartKey && r.otDate<=hrCutoffEndKey);
    const cutoffAttendanceAll=getDailyAttendanceRecords().filter(r=>r.date && r.date>=hrCutoffStartKey && r.date<=hrCutoffEndKey);
    const cutoffEmployeeOTAll=getEmployeeAttendanceOTSubmissions().filter(r=>r.date && r.date>=hrCutoffStartKey && r.date<=hrCutoffEndKey && employeeSubmissionHasOT(r));
    const cutoffRequestsAll=getRequests().filter(r=>!isOtAmendment(r) && isActualOTRecord(r) && r.otDate && r.otDate>=hrCutoffStartKey && r.otDate<=hrCutoffEndKey);
    const cutoffApproved=cutoffApprovedAll.filter(matchesCutoffEmployee);
    const cutoffAttendance=cutoffAttendanceAll.filter(matchesCutoffEmployee);
    const cutoffEmployeeOT=cutoffEmployeeOTAll.filter(matchesCutoffEmployee);
    const cutoffRequests=cutoffRequestsAll.filter(matchesCutoffEmployee);
    const cutoffHours=cutoffApproved.reduce((s,r)=>s+Number(r.totalHours||0),0);
    const cutoffPresent=cutoffAttendance.filter(r=>r.status==="Present").length;
    const cutoffLeave=cutoffAttendance.filter(r=>r.status==="Leave").length;
    const cutoffAbsent=cutoffAttendance.filter(r=>r.status==="Absent").length;
    const attendanceListNameNeedle=String(hrAttendanceListSearch||"").trim().toLowerCase();
    const attendanceListRows=cutoffAttendance.filter(r=>{
      const departmentMatch=hrAttendanceListDepartment==="All Departments" || r.department===hrAttendanceListDepartment;
      const nameMatch=!attendanceListNameNeedle || String(r.employeeName||"").toLowerCase().includes(attendanceListNameNeedle);
      return departmentMatch && nameMatch;
    });

    const employeeSummaryMap=new Map();
    const ensureEmployeeSummary=r=>{
      const key=String(r.employeeNo||r.employeeName||"").trim().toLowerCase();
      if(!key)return null;
      if(!employeeSummaryMap.has(key))employeeSummaryMap.set(key,{employeeNo:r.employeeNo||"—",employeeName:r.employeeName||"—",department:r.department||"—",present:0,leave:0,absent:0,approvedOt:0,otHours:0});
      const item=employeeSummaryMap.get(key);
      if((!item.department || item.department==="—") && r.department)item.department=r.department;
      if((!item.employeeName || item.employeeName==="—") && r.employeeName)item.employeeName=r.employeeName;
      if((!item.employeeNo || item.employeeNo==="—") && r.employeeNo)item.employeeNo=r.employeeNo;
      return item;
    };
    cutoffAttendance.forEach(r=>{
      const item=ensureEmployeeSummary(r);if(!item)return;
      if(r.status==="Present")item.present+=1;
      else if(r.status==="Leave")item.leave+=1;
      else if(r.status==="Absent")item.absent+=1;
    });
    cutoffApproved.forEach(r=>{
      const item=ensureEmployeeSummary(r);if(!item)return;
      item.approvedOt+=1;
      item.otHours+=Number(r.totalHours||0);
    });
    const employeeSummary=[...employeeSummaryMap.values()].sort((a,b)=>String(a.employeeName).localeCompare(String(b.employeeName)));

    setPage("Cutoff Payroll Records","HR PAYROLL HISTORY",`Attendance and approved OT summary for ${selectedLabel}. Current cutoff is the default.`);
    content.innerHTML=`
      <div class="card" style="margin-bottom:18px">
        <div class="card-header">
          <div class="card-title-group"><h3>Cutoff & Employee Search</h3><p>Current payroll cutoff is selected by default. You can still review another period.</p></div>
          <button id="resetCutoffDates" class="btn btn-secondary btn-sm" type="button">Current Cutoff</button>
        </div>
        <div class="card-body">
          <div class="filters" style="align-items:end">
            <label class="field" style="margin:0;min-width:190px"><span>Start Date</span><input id="cutoffStartDate" type="date" value="${escapeHtml(hrCutoffStartKey)}"></label>
            <label class="field" style="margin:0;min-width:190px"><span>End Date</span><input id="cutoffEndDate" type="date" value="${escapeHtml(hrCutoffEndKey)}"></label>
            <label class="field" style="margin:0;min-width:240px"><span>Search Employee Name</span><input id="hrCutoffSearchInput" type="search" placeholder="Type employee name..." value="${escapeHtml(hrCutoffSearch)}"></label>
            <button id="applyCutoffDates" class="btn btn-primary" type="button">Apply</button>
            <button id="clearCutoffSearch" class="btn btn-secondary" type="button" ${hrCutoffSearch?"":"disabled"}>Clear Search</button>
            <button id="downloadSelectedCutoffExcel" class="btn btn-success" type="button">⇩ Download Attendance + OT Excel</button>
          </div>
          <p class="muted" style="margin:10px 0 0"><strong>No approval required to download.</strong> Excel creates one sheet per Department and groups records by Date. Department is not repeated as a column. Pending and Rejected OT are excluded; only Approved OT is included for HR.</p>
        </div>
      </div>
      ${heroBanner(
        "Current payroll cutoff",
        `${selectedLabel}${hrCutoffSearch?` • Filtered by ${escapeHtml(hrCutoffSearch)}`:""}.`,
        cutoffHours.toFixed(2),
        "approved OT hours in selected cutoff"
      )}
      <div class="stats-grid">
        ${statCard("Total Present",cutoffPresent,`Present attendance records • ${selectedLabel}`,"success","last-cutoff")}
        ${statCard("Total Leave",cutoffLeave,`Leave records • ${selectedLabel}`,"info","last-cutoff")}
        ${statCard("Total Absent",cutoffAbsent,`Absent records • ${selectedLabel}`,"danger","last-cutoff")}
        ${statCard("Total OT",cutoffApproved.length,`Approved OT records • ${selectedLabel}`,"primary","approved")}
        ${statCard("Total OT Hours",cutoffHours.toFixed(2),"Approved overtime hours in selected cutoff","primary","approved")}
        ${statCard("Cutoff Date",selectedLabel,hrCutoffSearch?`Filtered: ${hrCutoffSearch}`:"Current cutoff by default","warning")}
      </div>
      <div class="card" style="margin-bottom:18px">
        <div class="card-header">
          <div class="card-title-group"><h3>Per Employee — Cutoff Summary</h3><p>Present, Leave, Absent, and approved OT within ${escapeHtml(selectedLabel)}.</p></div>
          <span class="badge primary">${employeeSummary.length} employee${employeeSummary.length===1?"":"s"}</span>
        </div>
        <div class="table-wrap"><table class="data-table"><thead><tr><th>Employee</th><th>Department</th><th>Present</th><th>Leave</th><th>Absent</th><th>Approved OT</th><th>OT Hours</th></tr></thead><tbody>${employeeSummary.length?employeeSummary.map(x=>`<tr><td><strong>${escapeHtml(x.employeeName)}</strong><small class="attendance-subline">${escapeHtml(x.employeeNo)}</small></td><td>${escapeHtml(x.department)}</td><td>${x.present}</td><td>${x.leave}</td><td>${x.absent}</td><td>${x.approvedOt}</td><td>${x.otHours.toFixed(2)}</td></tr>`).join(""):`<tr><td colspan="7">${emptyState("No cutoff records",hrCutoffSearch?`No records found for ${escapeHtml(hrCutoffSearch)} in ${escapeHtml(selectedLabel)}.`:`No attendance or approved OT records were found in ${escapeHtml(selectedLabel)}.`)}</td></tr>`}</tbody></table></div>
      </div>
      <div class="card" style="margin-bottom:18px">
        <div class="card-header">
          <div class="card-title-group"><h3>Department Summary — Cutoff</h3><p>${escapeHtml(selectedLabel)} • Approved OT records${hrCutoffSearch?` • ${escapeHtml(hrCutoffSearch)}`:""}</p></div>
        </div>
        <div class="card-body"><div class="department-grid">${departmentSummaryCards(cutoffApproved)}</div></div>
      </div>
      <div class="section-heading-row" style="margin:4px 0 10px">
        <div><h3 style="margin:0">Attendance List</h3><p class="muted" style="margin:4px 0 0">All Supervisor-finalized attendance types within ${escapeHtml(selectedLabel)}: Present, Late, Leave, Absent, Day Off, and Holiday.</p></div>
        <span class="badge primary">${attendanceListRows.length} record${attendanceListRows.length===1?"":"s"}</span>
      </div>
      <div class="card" style="margin-bottom:12px">
        <div class="card-body">
          <div class="filters" style="align-items:end">
            <label class="field" style="margin:0;min-width:210px"><span>Department</span><select id="hrAttendanceListDepartment"><option value="All Departments" ${hrAttendanceListDepartment==="All Departments"?"selected":""}>All Departments</option>${DEPARTMENTS.map(d=>`<option value="${escapeHtml(d)}" ${hrAttendanceListDepartment===d?"selected":""}>${escapeHtml(d)}</option>`).join("")}</select></label>
            <label class="field" style="margin:0;min-width:260px"><span>Search Employee Name</span><input id="hrAttendanceListSearchInput" type="search" placeholder="Type employee name..." value="${escapeHtml(hrAttendanceListSearch)}"></label>
            <button id="applyAttendanceListSearch" class="btn btn-primary" type="button">Search</button>
            <button id="clearAttendanceListFilters" class="btn btn-secondary" type="button" ${(hrAttendanceListDepartment!=="All Departments"||hrAttendanceListSearch)?"":"disabled"}>Clear Filters</button>
          </div>
        </div>
      </div>
      <div id="lastCutoffTableHost"></div>`;
    const applyCutoffFilters=()=>{
      const start=document.getElementById("cutoffStartDate")?.value;
      const end=document.getElementById("cutoffEndDate")?.value;
      if(!start || !end){showToast("Please select both cutoff dates.");return;}
      if(start>end){showToast("Start date cannot be after end date.");return;}
      hrCutoffStartKey=start;
      hrCutoffEndKey=end;
      hrCutoffSearch=String(document.getElementById("hrCutoffSearchInput")?.value||"").trim();
      renderHR();
    };
    document.getElementById("applyCutoffDates")?.addEventListener("click",applyCutoffFilters);
    document.getElementById("hrCutoffSearchInput")?.addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();applyCutoffFilters();}});
    document.getElementById("clearCutoffSearch")?.addEventListener("click",()=>{hrCutoffSearch="";renderHR();});
    document.getElementById("resetCutoffDates")?.addEventListener("click",()=>{
      hrCutoffStartKey=currentCutoff.startKey;
      hrCutoffEndKey=currentCutoff.endKey;
      hrCutoffSearch="";
      hrAttendanceListDepartment="All Departments";
      hrAttendanceListSearch="";
      renderHR();
    });
    document.getElementById("hrAttendanceListDepartment")?.addEventListener("change",event=>{
      hrAttendanceListDepartment=event.target.value||"All Departments";
      renderHR();
    });
    const applyAttendanceListSearch=()=>{
      hrAttendanceListSearch=String(document.getElementById("hrAttendanceListSearchInput")?.value||"").trim();
      renderHR();
    };
    document.getElementById("applyAttendanceListSearch")?.addEventListener("click",applyAttendanceListSearch);
    document.getElementById("hrAttendanceListSearchInput")?.addEventListener("keydown",event=>{if(event.key==="Enter"){event.preventDefault();applyAttendanceListSearch();}});
    document.getElementById("clearAttendanceListFilters")?.addEventListener("click",()=>{hrAttendanceListDepartment="All Departments";hrAttendanceListSearch="";renderHR();});
    document.getElementById("downloadSelectedCutoffExcel")?.addEventListener("click",()=>{
      exportHRCutoffAttendanceOTExcel(cutoffAttendance,cutoffEmployeeOT,cutoffRequests,{startKey:hrCutoffStartKey,endKey:hrCutoffEndKey,search:hrCutoffSearch});
    });
    const host=document.getElementById("lastCutoffTableHost");
    if(attendanceListRows.length){
      const attendanceRows=[...attendanceListRows].sort((a,b)=>String(b.date||"").localeCompare(String(a.date||""))||String(a.employeeName||"").localeCompare(String(b.employeeName||"")));
      host.innerHTML=`<div class="card"><div class="table-wrap"><table class="data-table attendance-detail-table"><thead><tr><th>Date</th><th>Employee</th><th>Department</th><th>Attendance Type</th><th>Time In</th><th>Time Out</th><th>Worked Hrs</th><th>Late</th><th>Undertime</th><th>Approved OT Hrs</th><th>Reason / Remarks</th></tr></thead><tbody>${attendanceRows.map(r=>{const displayStatus=attendanceDisplayStatus(r);const attendanceType=r.status==="Leave"?(r.leaveType||r.attendanceType||"Leave"):(r.status==="Absent"?(r.absentType||r.attendanceType||"Absent"):displayStatus);return `<tr><td><strong>${formatDate(r.date)}</strong></td><td><strong>${escapeHtml(r.employeeName||"—")}</strong><small class="attendance-subline">${escapeHtml(r.position||"—")}</small></td><td>${escapeHtml(r.department||"—")}</td><td>${attendanceStatusBadge(displayStatus)}${attendanceType&&attendanceType!==displayStatus?`<small class="attendance-subline">${escapeHtml(attendanceType)}</small>`:""}</td><td>${escapeHtml(r.timeIn||"—")}</td><td>${escapeHtml(r.timeOut||"—")}</td><td>${Number(r.workedHours||0).toFixed(2)}</td><td>${Number(r.lateMinutes||0)?`${Number(r.lateMinutes||0)} min`:"—"}</td><td>${Number(r.undertimeMinutes||0)?`${Number(r.undertimeMinutes||0)} min`:"—"}</td><td>${Number(r.approvedOtHours||getApprovedOTHoursForEmployeeDate(r.employeeNo,r.date)||0).toFixed(2)}</td><td>${r.holidayName?`<strong>${escapeHtml(r.holidayName)}</strong><br>`:""}${escapeHtml(r.remarks||"—")}</td></tr>`}).join("")}</tbody></table></div></div>`;
    }else{
      host.innerHTML=`<div class="card"><div class="card-body">${emptyState("No Attendance List records",(hrAttendanceListSearch||hrAttendanceListDepartment!=="All Departments")?`No Supervisor-finalized attendance matches the selected Department / employee name filters within ${escapeHtml(selectedLabel)}.`:`There are no Supervisor-finalized attendance records dated within ${escapeHtml(selectedLabel)}.`)}</div></div>`;
    }
    bindDepartmentDrilldown(cutoffApproved);
    return;
  }
  renderGeneralManagerReports({hrMode:true});
}

function departmentSummaryCards(rows){
  return DEPARTMENTS.map(dep=>{
    const depRows=rows.filter(r=>r.department===dep);
    const hours=depRows.reduce((s,r)=>s+Number(r.totalHours||0),0);
    const people=new Set(depRows.map(r=>String(r.employeeName||"").trim().toLowerCase()).filter(Boolean)).size;
    return `<div class="department-card">
      <button class="department-drilldown-link" type="button" data-department="${escapeHtml(dep)}">${escapeHtml(dep)}</button>
      <strong>${hours.toFixed(2)}</strong>
      <small>${depRows.length} approved • ${people} people • OT hours</small>
    </div>`;
  }).join("");
}
function renderDepartmentSummary(approved){
  const graphRows=DEPARTMENTS.map(dep=>{
    const depRows=approved.filter(r=>r.department===dep);
    const hours=depRows.reduce((sum,r)=>sum+Number(r.totalHours||0),0);
    return {
      label:dep,
      fullLabel:dep,
      totalHours:Number(hours.toFixed(2)),
      requests:depRows.length,
      employees:new Set(depRows.map(r=>String(r.employeeName||"").trim().toLowerCase()).filter(Boolean)).size
    };
  });
  const totalHours=approved.reduce((sum,r)=>sum+Number(r.totalHours||0),0);
  const totalEmployees=new Set(approved.map(r=>String(r.employeeName||"").trim().toLowerCase()).filter(Boolean)).size;
  const cutoffLabel=getPayrollCutoff(new Date()).label;

  content.innerHTML=`
    ${heroBanner(
      "Department overtime summary",
      `Approved overtime by department for payroll cutoff ${cutoffLabel}.`,
      totalHours.toFixed(2),
      "approved OT hours in current cutoff"
    )}
    <div class="stats-grid">
      ${statCard("Approved Requests",approved.length,cutoffLabel,"success")}
      ${statCard("Total OT Hours",totalHours.toFixed(2),"Approved overtime in current cutoff","primary")}
      ${statCard("Employees",totalEmployees,"Unique employees with approved OT")}
      ${statCard("Departments",DEPARTMENTS.length,"Department comparison","warning")}
    </div>
    <div class="card report-chart-card report-chart-wide" style="margin-bottom:18px">
      <div class="card-header">
        <div class="card-title-group">
          <h3>Department OT Hours</h3>
          <p>${escapeHtml(cutoffLabel)} • Total approved overtime hours per department</p>
        </div>
        <span class="report-chart-badge">DEPARTMENT</span>
      </div>
      <div class="card-body">${svgBarChart(graphRows,"totalHours",{aria:"Approved overtime hours by department for the current payroll cutoff",enhanced:true,yLabel:"OT Hours",showAllLabels:true})}</div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-title-group"><h3>View Employee OT</h3><p>Select a department to see each employee's Morning and Night shift overtime.</p></div>
      </div>
      <div class="card-body">
        <div class="department-grid department-graph-links">
          ${graphRows.map(x=>`<div class="department-card">
            <button class="department-drilldown-link" type="button" data-department="${escapeHtml(x.label)}">${escapeHtml(x.label)}</button>
            <strong>${x.totalHours.toFixed(2)}</strong>
            <small>${x.requests} approved • ${x.employees} people • OT hours</small>
          </div>`).join("")}
        </div>
      </div>
    </div>`;
  bindDepartmentDrilldown(approved);
}

function openDepartmentEmployeeOTBreakdown(department,approvedRows){
  const rows=approvedRows.filter(r=>r.department===department);

  const employeeMap=new Map();
  rows.forEach(r=>{
    const name=String(r.employeeName||"").trim();
    if(!name)return;

    const key=name.toLowerCase();
    if(!employeeMap.has(key)){
      employeeMap.set(key,{
        name,
        totalHours:0,
        morningHours:0,
        nightHours:0,
        morningRecords:0,
        nightRecords:0,
        records:0,
        dates:new Set()
      });
    }

    const item=employeeMap.get(key);
    const hours = Number(r.totalHours||0);
    item.totalHours += hours;
    item.records++;

    if(String(r.schedule||"").toLowerCase()==="night"){
      item.nightHours += hours;
      item.nightRecords++;
    }else{
      item.morningHours += hours;
      item.morningRecords++;
    }

    if(r.otDate)item.dates.add(r.otDate);
  });

  const people=[...employeeMap.values()]
    .map(item=>({
      ...item,
      otDays:item.dates.size,
      averagePerOtDay:item.totalHours/(item.dates.size||1)
    }))
    .sort((a,b)=>b.totalHours-a.totalHours || a.name.localeCompare(b.name));

  const departmentTotal=people.reduce((sum,p)=>sum+p.totalHours,0);
  const departmentMorningTotal=people.reduce((sum,p)=>sum+p.morningHours,0);
  const departmentNightTotal=people.reduce((sum,p)=>sum+p.nightHours,0);

  const modal=document.createElement("div");
  modal.className="modal-backdrop";
  modal.innerHTML=`
    <div class="modal department-ot-modal">
      <div class="modal-header department-ot-modal-header">
        <div>
          <span class="modal-overline">HR • DEPARTMENT OT BREAKDOWN</span>
          <h3>${escapeHtml(department)}</h3>
          <p>${people.length} employee${people.length===1?"":"s"} • ${departmentTotal.toFixed(2)} total approved OT hours</p>
        </div>
        <button class="modal-close-icon" type="button" aria-label="Close">×</button>
      </div>

      <div class="department-employee-summary shift-separated-summary">
        <div>
          <span>Total Employees with OT</span>
          <strong>${people.length}</strong>
        </div>
        <div class="morning-summary-box">
          <span>Morning Shift OT Hours</span>
          <strong>${departmentMorningTotal.toFixed(2)}</strong>
        </div>
        <div class="night-summary-box">
          <span>Night Shift OT Hours</span>
          <strong>${departmentNightTotal.toFixed(2)}</strong>
        </div>
        <div>
          <span>Total OT Hours</span>
          <strong>${departmentTotal.toFixed(2)}</strong>
        </div>
      </div>

      <div class="department-employee-table-wrap">
        ${people.length ? `
          <table class="department-employee-ot-table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Morning OT Hours</th>
                <th>Night OT Hours</th>
                <th>OT Days</th>
                <th>Avg / OT Day</th>
                <th>Total OT Hours</th>
              </tr>
            </thead>
            <tbody>
              ${people.map((person,index)=>`
                <tr>
                  <td>
                    <div class="employee-rank-cell">
                      <span class="employee-rank">${index+1}</span>
                      <strong>${escapeHtml(person.name)}</strong>
                    </div>
                  </td>
                  <td>
                    <span class="shift-hour-value morning-hour-value">${person.morningHours.toFixed(2)} hrs</span>
                    <small class="shift-record-count">${person.morningRecords} record${person.morningRecords===1?"":"s"}</small>
                  </td>
                  <td>
                    <span class="shift-hour-value night-hour-value">${person.nightHours.toFixed(2)} hrs</span>
                    <small class="shift-record-count">${person.nightRecords} record${person.nightRecords===1?"":"s"}</small>
                  </td>
                  <td>${person.otDays}</td>
                  <td>${person.averagePerOtDay.toFixed(2)} hrs</td>
                  <td><strong>${person.totalHours.toFixed(2)} hrs</strong></td>
                </tr>`).join("")}
            </tbody>
          </table>` :
          `<div class="empty compact-empty">No approved overtime records for this department.</div>`}
      </div>

      <div class="modal-footer">
        <button class="btn btn-primary department-modal-close" type="button">Close</button>
      </div>
    </div>`;

  document.body.appendChild(modal);

  const close=()=>modal.remove();
  modal.querySelector(".modal-close-icon")?.addEventListener("click",close);
  modal.querySelector(".department-modal-close")?.addEventListener("click",close);
  modal.addEventListener("click",e=>{if(e.target===modal)close();});
}

function bindDepartmentDrilldown(approvedRows){
  document.querySelectorAll(".department-drilldown-link").forEach(btn=>{
    btn.addEventListener("click",()=>{
      openDepartmentEmployeeOTBreakdown(btn.dataset.department,approvedRows);
    });
  });
}

function miniItem(r,showDepartment=false){
  return `<div class="mini-item">
    <div class="mini-item-main">
      <div class="mini-avatar">${initials(r.employeeName)}</div>
      <div class="mini-copy">
        <strong>${escapeHtml(r.employeeName)}</strong>
        <small>${showDepartment?escapeHtml(r.department)+" • ":""}${formatDate(r.otDate)} • ${isOtAmendment(r)?`+${Number(r.additionalHours||r.totalHours||0).toFixed(2)} hr additional OT`:`${r.totalHours} hrs`}</small>
      </div>
    </div>
    ${statusBadge(r.status)}
  </div>`;
}
function emptyState(title,sub){
  return `<div class="empty"><div class="empty-icon">◇</div><strong>${title}</strong><span>${sub}</span></div>`;
}


function getRecordDutyTimes(record){
  const schedule=String(record.schedule||"").toLowerCase();
  return {
    dateIn: record.scheduleStart || (schedule==="night" ? "18:00" : "06:00"),
    dateOut: record.scheduleEnd || (schedule==="night" ? "03:00" : "15:00")
  };
}

function getRecordOTTimes(record){
  return {
    otIn: record.normalOtStart || record.startTime || "",
    otOut: record.normalOtEnd || record.endTime || ""
  };
}

function getHRExportEmployeeStatus(record){
  const attendanceType=record.attendanceType || record.leaveType || record.absentType || "";
  if(record.attendanceStatus==="Leave")return attendanceType || "Leave";
  if(record.attendanceStatus==="Absent")return attendanceType || "Absent";

  const labels=[];
  const dateObj=record.otDate ? parseLocalDate(record.otDate) : null;
  const dateWeekday=dateObj ? dateObj.toLocaleDateString("en-PH",{weekday:"long"}) : "";
  const isDayOff=record.otType==="Rest Day OT" || Boolean(record.employeeDayOff && dateWeekday===record.employeeDayOff);
  if(isDayOff)labels.push("Day Off");
  if(record.straightDuty)labels.push("Straight Duty");
  return labels.length ? labels.join(" / ") : "Working";
}

function getStraightDutyTimes(record){
  return {
    scheduleIn: record.straightDutyScheduleStart || record.straightDutyStart || "",
    scheduleOut: record.straightDutyScheduleEnd || record.straightDutyEnd || "",
    otIn: record.straightDutyOtStart || "",
    otOut: record.straightDutyOtEnd || ""
  };
}

function styleHRExcelEmployeeStatusCell(cell,status){
  const value=String(status||"").trim().toLowerCase();
  let fill="FFE2E8F0";
  let fontColor="FF334155";

  // Status colors are intentionally light so text stays readable and the workbook
  // remains printer-friendly while making exceptions easy for HR to scan.
  if(value==="vl" || value.includes("vacation leave")){
    fill="FFC6EFCE";       // light green
    fontColor="FF006100";
  }else if(value==="sl" || value.includes("sick leave")){
    fill="FFFFEB9C";       // light yellow
    fontColor="FF9C6500";
  }else if(value.includes("awol")){
    fill="FFFFC7CE";       // light red
    fontColor="FF9C0006";
  }else if(value.includes("emergency")){
    fill="FFFCE4D6";       // light orange
    fontColor="FFC65911";
  }else if(value.includes("day off") && value.includes("straight duty")){
    fill="FFD9EAD3";       // muted green for combined work exception
    fontColor="FF274E13";
  }else if(value.includes("day off")){
    fill="FFDDEBF7";       // light blue
    fontColor="FF1F4E78";
  }else if(value.includes("straight duty")){
    fill="FFE4DFEC";       // light purple
    fontColor="FF5F497A";
  }else if(value.includes("leave")){
    fill="FFC6EFCE";
    fontColor="FF006100";
  }else if(value.includes("absent")){
    fill="FFFFC7CE";
    fontColor="FF9C0006";
  }else if(value==="working" || value.includes("regular")){
    fill="FFE2F0D9";       // soft green for normal working status
    fontColor="FF375623";
  }

  cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:fill}};
  cell.font={...(cell.font||{}),bold:true,color:{argb:fontColor}};
}

function excelSafeSheetName(name,usedNames){
  const base=String(name||"Department")
    .replace(/[\\/?*\[\]:]/g," ")
    .replace(/\s+/g," ")
    .trim()
    .slice(0,31) || "Department";
  let candidate=base;
  let counter=2;
  while(usedNames.has(candidate.toLowerCase())){
    const suffix=` ${counter++}`;
    candidate=`${base.slice(0,31-suffix.length)}${suffix}`;
  }
  usedNames.add(candidate.toLowerCase());
  return candidate;
}


async function exportHRCutoffAttendanceOTExcel(attendanceRows=[],employeeOTRows=[],requestRows=[],context={}){
  if(!canUseAdminExcelExport("last-cutoff")){showToast("This account does not have permission to download Cutoff Excel.");return;}
  if(typeof ExcelJS==="undefined"){
    showToast("Excel export library could not load. Please check your internet connection and reload the page.");
    return;
  }

  const attendance=[...(attendanceRows||[])];
  const employeeOT=[...(employeeOTRows||[])];
  const requests=[...(requestRows||[])];

  // HR Excel is an attendance + payroll-ready OT file. Attendance is always included,
  // but OT details are exported only when the latest Request Approver decision is Approved.
  const requestKey=r=>`${String(r.employeeNo||"").trim()}|${String(r.otDate||"").trim()}`;
  const submissionKey=r=>`${String(r.employeeNo||"").trim()}|${String(r.date||"").trim()}`;
  const latestRequestByKey=new Map();
  requests.forEach(r=>{
    const key=requestKey(r);
    const prev=latestRequestByKey.get(key);
    const t=new Date(r.reviewedAt||r.createdAt||0).getTime();
    const pt=prev?new Date(prev.reviewedAt||prev.createdAt||0).getTime():-1;
    if(!prev || t>=pt)latestRequestByKey.set(key,r);
  });

  const approvedRequestByKey=new Map(
    [...latestRequestByKey.entries()].filter(([,r])=>r.status==="Approved")
  );
  const submissionByKey=new Map(employeeOT.map(r=>[submissionKey(r),r]));
  const attendanceByKey=new Map(attendance.map(r=>[`${String(r.employeeNo||"").trim()}|${String(r.date||"").trim()}`,r]));

  // Excel is driven by Supervisor-finalized HR attendance only. An Approved OT is
  // attached to its finalized attendance row; it must never create a standalone
  // attendance row for today/advance filing before Supervisor finalization.
  const keys=new Set([...attendanceByKey.keys()]);
  if(!keys.size){
    showToast("No Supervisor-finalized attendance records match the selected cutoff/filter.");
    return;
  }

  const rows=[...keys].map(key=>{
    const att=attendanceByKey.get(key)||{};
    const sub=submissionByKey.get(key)||{};
    const req=approvedRequestByKey.get(key)||{};
    const hasApprovedOT=!!req.id && req.status==="Approved";
    const date=att.date||req.otDate||sub.date||"";
    const employeeNo=att.employeeNo||req.employeeNo||sub.employeeNo||"";
    const employeeName=att.employeeName||req.employeeName||sub.employeeName||"";
    const position=att.position||req.position||sub.position||"";
    const employeeMaster=getEmployeeByNo(employeeNo)||{};
    const department=att.department||req.department||sub.department||employeeMaster.department||"Unassigned";
    const configuredEmployee=(getDepartmentEmployees(department)||[]).find(emp=>String(emp.no)===String(employeeNo))||{};
    const rawShift=att.shift||sub.schedule||req.schedule||configuredEmployee.schedule||employeeMaster.schedule||"";
    const shift=rawShift==="Morning"?"Morning Shift":rawShift==="Night"?"Night Shift":rawShift||"—";
    const attendanceStatus=att.status||"";
    const attendanceType=att.leaveType||att.absentType||att.attendanceType||attendanceStatus||"";

    return {
      date,employeeNo,employeeName,position,department,shift,
      attendanceType:attendanceType||"—",
      timeIn:att.timeIn||"",
      timeOut:att.timeOut||"",
      workedHours:Number(att.workedHours??0),
      lateMinutes:Number(att.lateMinutes??0),
      undertimeMinutes:Number(att.undertimeMinutes??0),
      otType:hasApprovedOT?(sub.otType||req.otType||""):"",
      otIn:hasApprovedOT?(sub.normalOtStart||req.normalOtStart||req.startTime||""):"",
      otOut:hasApprovedOT?(sub.normalOtEnd||req.normalOtEnd||req.endTime||""):"",
      approvedOtHours:hasApprovedOT?Number(req.totalHours||att.approvedOtHours||0):0,
      reason:hasApprovedOT?(sub.reason||req.reason||att.remarks||""):(att.remarks||"")
    };
  }).sort((a,b)=>String(a.department).localeCompare(String(b.department))||String(a.date).localeCompare(String(b.date))||String(a.employeeName).localeCompare(String(b.employeeName)));

  const wb=new ExcelJS.Workbook();
  wb.creator="Eastern1961 Phils Inc";
  wb.created=new Date();
  wb.modified=new Date();

  const startKey=context.startKey||"";
  const endKey=context.endKey||"";
  const approvedRows=rows.filter(r=>Number(r.approvedOtHours||0)>0);
  const summary=wb.addWorksheet("Cutoff Summary");
  const summaryData=[
    ["Cutoff Start",startKey],["Cutoff End",endKey],["Search Filter",context.search||"All Employees"],
    ["Attendance Records",rows.filter(r=>r.attendanceType&&r.attendanceType!=="—").length],
    ["Present",rows.filter(r=>String(r.attendanceType).toLowerCase().includes("present")||String(r.attendanceType).toLowerCase().includes("late")||String(r.attendanceType).toLowerCase().includes("working")).length],
    ["Leave",rows.filter(r=>String(r.attendanceType).toLowerCase().includes("leave")||["vl","sl"].includes(String(r.attendanceType).toLowerCase())).length],
    ["Absent",rows.filter(r=>String(r.attendanceType).toLowerCase().includes("absent")||String(r.attendanceType).toLowerCase().includes("awol")).length],
    ["Approved OT",approvedRows.length],
    ["Approved OT Hours",approvedRows.reduce((sum,r)=>sum+Number(r.approvedOtHours||0),0)]
  ];
  summary.columns=[{width:26},{width:28}];
  summaryData.forEach((r,i)=>{
    const row=summary.addRow(r);
    row.getCell(1).font={bold:true};
    row.getCell(1).fill={type:"pattern",pattern:"solid",fgColor:{argb:i<3?"FFDCE6F1":"FFF3F4F6"}};
    row.getCell(1).border={top:{style:"thin",color:{argb:"FFD1D5DB"}},left:{style:"thin",color:{argb:"FFD1D5DB"}},bottom:{style:"thin",color:{argb:"FFD1D5DB"}},right:{style:"thin",color:{argb:"FFD1D5DB"}}};
    row.getCell(2).border={top:{style:"thin",color:{argb:"FFD1D5DB"}},left:{style:"thin",color:{argb:"FFD1D5DB"}},bottom:{style:"thin",color:{argb:"FFD1D5DB"}},right:{style:"thin",color:{argb:"FFD1D5DB"}}};
  });
  summary.getColumn(2).numFmt="0.00";

  const safeSheetName=(name,index)=>{
    let clean=String(name||`Department ${index+1}`).replace(/[\\\/?*\[\]:]/g," ").trim()||`Department ${index+1}`;
    if(clean.length>31)clean=clean.slice(0,31);
    let candidate=clean, n=2;
    while(wb.getWorksheet(candidate)){
      const suffix=` ${n++}`;
      candidate=`${clean.slice(0,31-suffix.length)}${suffix}`;
    }
    return candidate;
  };

  // Department is represented by the sheet itself. These are the HR-required columns only.
  const dataHeaders=[
    "Employee Name","Position","Shift","Attendance Type","OT Type","Late (min)","Undertime (min)",
    "Time In","Time Out","OT In","OT Out","Worked Hours","Approved OT Hours","Reason / Remarks"
  ];
  const widths=[26,22,15,20,18,11,14,11,11,11,11,13,18,34];
  const departments=[...DEPARTMENTS];
  rows.forEach(r=>{if(r.department && !departments.includes(r.department))departments.push(r.department);});

  departments.forEach((department,index)=>{
    const deptRows=rows.filter(r=>r.department===department);
    if(!deptRows.length)return;
    const ws=wb.addWorksheet(safeSheetName(department,index),{properties:{defaultRowHeight:20}});
    ws.columns=widths.map(width=>({width}));

    const title=ws.addRow([`${department} — Attendance + Approved OT`]);
    ws.mergeCells(title.number,1,title.number,dataHeaders.length);
    title.height=28;
    title.getCell(1).font={bold:true,size:14,color:{argb:"FFFFFFFF"}};
    title.getCell(1).fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF1E3A5F"}};
    title.getCell(1).alignment={vertical:"middle",horizontal:"left"};

    const cutoffRow=ws.addRow([`Cutoff: ${startKey||"—"} to ${endKey||"—"}`]);
    ws.mergeCells(cutoffRow.number,1,cutoffRow.number,dataHeaders.length);
    cutoffRow.getCell(1).font={italic:true,color:{argb:"FF475569"}};
    cutoffRow.getCell(1).alignment={vertical:"middle",horizontal:"left"};
    ws.addRow([]);

    const dates=[...new Set(deptRows.map(r=>r.date).filter(Boolean))].sort();
    dates.forEach((date,dateIndex)=>{
      if(dateIndex>0)ws.addRow([]);
      const dateRow=ws.addRow([`DATE: ${formatDate(date)}`]);
      ws.mergeCells(dateRow.number,1,dateRow.number,dataHeaders.length);
      dateRow.height=24;
      dateRow.getCell(1).font={bold:true,size:12,color:{argb:"FF1E3A5F"}};
      dateRow.getCell(1).fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFDCE6F1"}};
      dateRow.getCell(1).alignment={vertical:"middle",horizontal:"left"};
      dateRow.getCell(1).border={top:{style:"medium",color:{argb:"FF1E3A5F"}},bottom:{style:"thin",color:{argb:"FF1E3A5F"}}};
      for(let c=1;c<=dataHeaders.length;c++){
        ws.getCell(dateRow.number,c).border={
          top:{style:"medium",color:{argb:"FF1E3A5F"}},
          left:{style:"thin",color:{argb:"FF64748B"}},
          bottom:{style:"thin",color:{argb:"FF1E3A5F"}},
          right:{style:"thin",color:{argb:"FF64748B"}}
        };
      }

      const header=ws.addRow(dataHeaders);
      header.height=32;
      header.eachCell(cell=>{
        cell.font={bold:true,color:{argb:"FFFFFFFF"}};
        cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF475569"}};
        cell.alignment={vertical:"middle",horizontal:"center",wrapText:true};
        cell.border={top:{style:"thin",color:{argb:"FF334155"}},left:{style:"thin",color:{argb:"FF334155"}},bottom:{style:"thin",color:{argb:"FF334155"}},right:{style:"thin",color:{argb:"FF334155"}}};
      });

      const dateDataRows=deptRows.filter(r=>r.date===date).sort((a,b)=>String(a.employeeName).localeCompare(String(b.employeeName)));
      dateDataRows.forEach(r=>{
        const row=ws.addRow([
          r.employeeName,r.position,r.shift,r.attendanceType,r.otType,r.lateMinutes,r.undertimeMinutes,
          r.timeIn,r.timeOut,r.otIn,r.otOut,r.workedHours,r.approvedOtHours,r.reason
        ]);
        row.eachCell({includeEmpty:true},cell=>{
          cell.alignment={vertical:"middle",wrapText:true};
          cell.border={top:{style:"thin",color:{argb:"FF64748B"}},left:{style:"thin",color:{argb:"FF64748B"}},bottom:{style:"thin",color:{argb:"FF64748B"}},right:{style:"thin",color:{argb:"FF64748B"}}};
        });
        [12,13].forEach(c=>row.getCell(c).numFmt="0.00");

        // Color-code Attendance Type for quick HR scanning in Excel.
        const attendanceCell=row.getCell(4);
        const attendanceLabel=String(r.attendanceType||"").trim().toLowerCase();
        let attendanceStyle={fill:"FFF1F5F9",font:"FF334155"}; // neutral / unspecified
        if(attendanceLabel.includes("absent") || attendanceLabel.includes("awol")){
          attendanceStyle={fill:"FFFEE2E2",font:"FFB91C1C"}; // red
        }else if(attendanceLabel.includes("late")){
          attendanceStyle={fill:"FFFEF3C7",font:"FF92400E"}; // amber
        }else if(attendanceLabel.includes("leave") || ["vl","sl","emergency leave"].includes(attendanceLabel)){
          attendanceStyle={fill:"FFDBEAFE",font:"FF1D4ED8"}; // blue
        }else if(attendanceLabel.includes("day off") || attendanceLabel.includes("rest day")){
          attendanceStyle={fill:"FFE5E7EB",font:"FF374151"}; // gray
        }else if(attendanceLabel.includes("holiday")){
          attendanceStyle={fill:"FFF3E8FF",font:"FF7E22CE"}; // purple
        }else if(attendanceLabel.includes("present") || attendanceLabel.includes("working")){
          attendanceStyle={fill:"FFDCFCE7",font:"FF166534"}; // green
        }
        attendanceCell.fill={type:"pattern",pattern:"solid",fgColor:{argb:attendanceStyle.fill}};
        attendanceCell.font={bold:true,color:{argb:attendanceStyle.font}};
        attendanceCell.alignment={vertical:"middle",horizontal:"center",wrapText:true};
      });
      if(dateDataRows.length){
        const lastRowNumber=ws.lastRow.number;
        for(let c=1;c<=dataHeaders.length;c++){
          const cell=ws.getCell(lastRowNumber,c);
          cell.border={
            top:cell.border?.top||{style:"thin",color:{argb:"FF64748B"}},
            left:cell.border?.left||{style:"thin",color:{argb:"FF64748B"}},
            bottom:{style:"medium",color:{argb:"FF334155"}},
            right:cell.border?.right||{style:"thin",color:{argb:"FF64748B"}}
          };
        }
      }
    });

    ws.pageSetup={orientation:"landscape",fitToPage:true,fitToWidth:1,fitToHeight:0};
    ws.views=[{state:"frozen",ySplit:3}];
  });

  const deptSheetCount=wb.worksheets.filter(ws=>ws.name!=="Cutoff Summary").length;
  if(!deptSheetCount){
    showToast("No department attendance or approved OT data available for the selected cutoff/filter.");
    return;
  }

  const fileName=`Eastern1961_HR_Attendance_Approved_OT_By_Department_${startKey||"start"}_to_${endKey||"end"}.xlsx`;
  try{
    const buffer=await wb.xlsx.writeBuffer();
    const blob=new Blob([buffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;link.download=fileName;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
    showToast(`Excel downloaded: ${deptSheetCount} department sheet${deptSheetCount===1?"":"s"}, grouped by date. Only Approved OT is included.`);
  }catch(err){
    console.error("Cutoff attendance/approved OT Excel export failed",err);
    showToast("Excel export failed. Please try again.");
  }
}

async function exportHRRowsToExcel(rows,context={}){
  if(!canUseAdminExcelExport("leave-approvals")){showToast("This account does not have permission to download Approved OT Excel.");return;}
  if(!rows.length){
    showToast("No approved payroll records match the active filter.");
    return;
  }
  if(typeof ExcelJS==="undefined"){
    showToast("Excel export library could not load. Please check your internet connection and reload the page.");
    return;
  }

  const sorted=[...rows].sort((a,b)=>{
    const dateCompare=String(a.otDate||"").localeCompare(String(b.otDate||""));
    if(dateCompare!==0)return dateCompare;
    return String(a.employeeName||"").localeCompare(String(b.employeeName||""));
  });

  const workbook=new ExcelJS.Workbook();
  workbook.creator="Eastern1961 Phils Inc";
  workbook.created=new Date();
  workbook.modified=new Date();

  const usedSheetNames=new Set();
  const departments=DEPARTMENTS.filter(dep=>sorted.some(r=>r.department===dep));
  const extraDepartments=[...new Set(sorted.map(r=>r.department).filter(Boolean))].filter(dep=>!departments.includes(dep));

  const thinBorder={style:"thin",color:{argb:"FF94A3B8"}};
  const mediumBorder={style:"medium",color:{argb:"FF1E3A5F"}};
  const tableBorder={top:thinBorder,left:thinBorder,bottom:thinBorder,right:thinBorder};

  [...departments,...extraDepartments].forEach(department=>{
    const departmentRows=sorted.filter(r=>r.department===department);
    if(!departmentRows.length)return;

    const sheetName=excelSafeSheetName(department,usedSheetNames);
    const ws=workbook.addWorksheet(sheetName,{properties:{defaultRowHeight:20}});

    // Compact 13-column payroll format requested by HR.
    // Header cells wrap so the complete table is easier to view on screen.
    ws.columns=[
      {key:"employee",width:22},
      {key:"dateIn",width:10},
      {key:"dateOut",width:10},
      {key:"otIn",width:9},
      {key:"otOut",width:9},
      {key:"sdIn",width:13},
      {key:"sdOut",width:13},
      {key:"sdOtIn",width:10},
      {key:"sdOtOut",width:10},
      {key:"total",width:12},
      {key:"employeeStatus",width:17},
      {key:"otType",width:17},
      {key:"reason",width:30}
    ];

    const dates=[...new Set(departmentRows.map(r=>r.otDate).filter(Boolean))].sort();

    dates.forEach((dateKey,dateIndex)=>{
      const dateObj=parseLocalDate(dateKey);
      const dateLabel=dateObj.toLocaleDateString("en-PH",{weekday:"long",month:"long",day:"numeric",year:"numeric"});

      // Highlighted DATE band. Keep cells unmerged for broad Excel compatibility.
      const dateRow=ws.addRow([`DATE: ${dateLabel}`,"","","","","","","","","","","",""]);
      dateRow.height=24;
      for(let c=1;c<=13;c++){
        const cell=dateRow.getCell(c);
        cell.font={bold:true,color:{argb:"FFFFFFFF"},size:12};
        cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FF1E3A5F"}};
        cell.alignment={vertical:"middle",horizontal:c===1?"left":"center",wrapText:true};
        cell.border={top:mediumBorder,left:c===1?mediumBorder:thinBorder,bottom:mediumBorder,right:c===13?mediumBorder:thinBorder};
      }

      const headerRow=ws.addRow([
        "Employee Name","Date IN","Date OUT","OT IN","OT OUT",
        "Straight Duty IN","Straight Duty OUT","S.D. OT IN","S.D. OT OUT",
        "TOTAL OT HOURS","ATTENDANCE STATUS","OT Type","REASON"
      ]);
      headerRow.height=38;
      headerRow.eachCell({includeEmpty:true},cell=>{
        cell.font={bold:true,color:{argb:"FF0F172A"}};
        cell.fill={type:"pattern",pattern:"solid",fgColor:{argb:"FFDCE6F1"}};
        cell.alignment={vertical:"middle",horizontal:"center",wrapText:true};
        cell.border=tableBorder;
      });
      headerRow.getCell(1).alignment={vertical:"middle",horizontal:"left",wrapText:true};

      departmentRows
        .filter(r=>r.otDate===dateKey)
        .sort((a,b)=>String(a.employeeName||"").localeCompare(String(b.employeeName||"")))
        .forEach(r=>{
          const duty=getRecordDutyTimes(r);
          const overtime=getRecordOTTimes(r);
          const straight=getStraightDutyTimes(r);
          const employeeStatus=getHRExportEmployeeStatus(r);

          // Never export OT without a schedule. If the employee actually worked any OT
          // (including Day Off OT or Straight Duty OT), Date IN/OUT must be present.
          // Schedule times stay blank only for true non-working Leave/Absent/Day Off records.
          const hasAnyOt = Boolean(
            overtime.otIn || overtime.otOut ||
            (r.straightDuty && (straight.otIn || straight.otOut)) ||
            Number(r.totalHours||0) > 0
          );
          const isNonWorkingStatus = r.attendanceStatus==="Leave" || r.attendanceStatus==="Absent" || employeeStatus.includes("Day Off");
          const noRegularSchedule = isNonWorkingStatus && !hasAnyOt;

          const row=ws.addRow([
            r.employeeName || "",
            !noRegularSchedule && duty.dateIn ? excelTimeFraction(duty.dateIn) : null,
            !noRegularSchedule && duty.dateOut ? excelTimeFraction(duty.dateOut) : null,
            overtime.otIn ? excelTimeFraction(overtime.otIn) : null,
            overtime.otOut ? excelTimeFraction(overtime.otOut) : null,
            r.straightDuty && straight.scheduleIn ? excelTimeFraction(straight.scheduleIn) : null,
            r.straightDuty && straight.scheduleOut ? excelTimeFraction(straight.scheduleOut) : null,
            r.straightDuty && straight.otIn ? excelTimeFraction(straight.otIn) : null,
            r.straightDuty && straight.otOut ? excelTimeFraction(straight.otOut) : null,
            Number(r.totalHours||0),
            employeeStatus,
            r.otType || "",
            r.reason || ""
          ]);

          row.height=24;
          row.eachCell({includeEmpty:true},cell=>{
            cell.border=tableBorder;
            cell.alignment={vertical:"middle",wrapText:true};
          });

          [2,3,4,5,6,7,8,9].forEach(col=>{
            const cell=row.getCell(col);
            if(typeof cell.value==="number")cell.numFmt="hh:mm";
            cell.alignment={vertical:"middle",horizontal:"center",wrapText:true};
          });
          row.getCell(10).numFmt="0.00";
          row.getCell(10).alignment={vertical:"middle",horizontal:"center",wrapText:true};
          row.getCell(11).alignment={vertical:"middle",horizontal:"center",wrapText:true};
          styleHRExcelEmployeeStatusCell(row.getCell(11),employeeStatus);
          row.getCell(12).alignment={vertical:"middle",horizontal:"center",wrapText:true};
          row.getCell(1).alignment={vertical:"middle",horizontal:"left",wrapText:true};
          row.getCell(13).alignment={vertical:"middle",horizontal:"left",wrapText:true};
        });

      if(dateIndex<dates.length-1){
        const spacer=ws.addRow(["","","","","","","","","","","","",""]);
        spacer.height=8;
      }
    });

    // Fully editable workbook: no worksheet or workbook protection is enabled.
    // Avoid frozen/split views that previously caused Excel recovery warnings.
    ws.pageSetup={orientation:"landscape",fitToPage:true,fitToWidth:1,fitToHeight:0};
  });

  if(!workbook.worksheets.length){
    showToast("No department data available for export.");
    return;
  }

  const startKey=context.startKey || sorted.map(r=>r.otDate).filter(Boolean).sort()[0] || "start";
  const endKeys=sorted.map(r=>r.otDate).filter(Boolean).sort();
  const endKey=context.endKey || endKeys[endKeys.length-1] || "end";
  const filterPart=context.department ? `_${String(context.department).replace(/[^A-Za-z0-9]+/g,"-").replace(/^-|-$/g,"")}` : "";
  const fileName=`Eastern1961_HR_OT_${startKey}_to_${endKey}${filterPart}.xlsx`;

  try{
    const buffer=await workbook.xlsx.writeBuffer();
    const blob=new Blob([buffer],{type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
    const url=URL.createObjectURL(blob);
    const link=document.createElement("a");
    link.href=url;
    link.download=fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
    showToast(`Excel downloaded: ${workbook.worksheets.length} department sheet${workbook.worksheets.length===1?"":"s"}.`);
  }catch(err){
    console.error("Excel export failed",err);
    showToast("Excel export failed. Please try again.");
  }
}


function openSupervisorPendingOTEditModal(id){
  const all=getRequests();
  const request=all.find(r=>r.id===id);
  if(!request || request.status!=="Pending"){
    showToast("Only pending overtime requests can be edited.");
    return;
  }
  if(request.attendanceStatus){
    showToast("Leave/Absent records are not edited from the OT editor.");
    return;
  }

  const amendment=isOtAmendment(request);
  const baseApprovedHours=amendment ? Number(request.baseApprovedHours||0) : 0;
  const regularStart=request.normalOtStart || (!request.straightDuty ? request.startTime : "") || "";
  const regularEnd=request.normalOtEnd || (!request.straightDuty ? request.endTime : "") || "";
  const scheduleStart=request.scheduleStart || (String(request.schedule||"").toLowerCase()==="night"?"18:00":"06:00");
  const scheduleEnd=request.scheduleEnd || (String(request.schedule||"").toLowerCase()==="night"?"03:00":"15:00");
  const canEditSchedule=request.otType==="Rest Day OT";
  const currentTotal=amendment ? Number(request.proposedTotalHours||0) : Number(request.totalHours||0);

  modalRoot.innerHTML=`
    <div class="modal-backdrop" id="pendingOtEditBackdrop">
      <div class="modal ot-revision-modal pending-ot-edit-modal">
        <div class="modal-header"><span>${amendment?"PENDING ADDITIONAL OT":"PENDING OT REQUEST"}</span><h3>${amendment?"Edit Pending Additional OT":"Edit Pending Overtime"}</h3></div>
        <div class="modal-body">
          <div class="note-box ot-revision-summary">
            <strong>${escapeHtml(request.employeeName)}</strong> • ${escapeHtml(request.department)} • ${formatDate(request.otDate)}<br>
            Request: <strong>${escapeHtml(request.id)}</strong>${amendment?` • Previously approved: <strong>${baseApprovedHours.toFixed(2)} hrs</strong>`:` • Current pending total: <strong>${currentTotal.toFixed(2)} hrs</strong>`}
          </div>
          <div class="revision-time-grid">
            <label class="field"><span>Schedule IN</span><input id="pendingScheduleStart" class="time24-input" inputmode="numeric" maxlength="5" value="${escapeHtml(scheduleStart)}" ${canEditSchedule?"":"readonly"}></label>
            <label class="field"><span>Schedule OUT</span><input id="pendingScheduleEnd" class="time24-input" inputmode="numeric" maxlength="5" value="${escapeHtml(scheduleEnd)}" ${canEditSchedule?"":"readonly"}></label>
            <label class="field"><span>Regular OT IN</span><input id="pendingNormalStart" class="time24-input" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(regularStart)}"></label>
            <label class="field"><span>Regular OT OUT</span><input id="pendingNormalEnd" class="time24-input" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(regularEnd)}"></label>
          </div>
          ${amendment?`<label class="field"><span>OT Type</span><input value="${escapeHtml(request.otType||"Regular Day")}" readonly></label>`:`
          <label class="field"><span>OT Type</span>
            <select id="pendingOtType">
              ${["Regular Day","Rest Day OT","Special Holiday","Regular Holiday"].map(v=>`<option value="${v}" ${request.otType===v?"selected":""}>${v}</option>`).join("")}
            </select>
          </label>`}
          <div class="pending-straight-duty-toggle-row">
            <label class="straight-duty-toggle"><input id="pendingStraightDuty" type="checkbox" ${request.straightDuty?"checked":""}><span>Straight Duty</span></label>
          </div>
          <div id="pendingStraightDutyFields" class="straight-duty-revision-block ${request.straightDuty?"":"hidden"}">
            <strong>Straight Duty</strong>
            <div class="revision-time-grid">
              <label class="field"><span>Straight Duty IN</span><input id="pendingSdScheduleStart" class="time24-input" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(request.straightDutyScheduleStart||request.straightDutyStart||"")}"></label>
              <label class="field"><span>Straight Duty OUT</span><input id="pendingSdScheduleEnd" class="time24-input" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(request.straightDutyScheduleEnd||request.straightDutyEnd||"")}"></label>
              <label class="field"><span>S.D. OT IN</span><input id="pendingSdOtStart" class="time24-input" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(request.straightDutyOtStart||"")}"></label>
              <label class="field"><span>S.D. OT OUT</span><input id="pendingSdOtEnd" class="time24-input" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(request.straightDutyOtEnd||"")}"></label>
            </div>
          </div>
          <div class="revision-hours-panel ${amendment?"":"pending-hours-two"}">
            ${amendment?`<div><span>Previously Approved</span><strong>${baseApprovedHours.toFixed(2)} hrs</strong></div>`:""}
            <div><span>${amendment?"Revised Total OT":"Pending OT Total"}</span><strong id="pendingTotalHours">${currentTotal.toFixed(2)} hrs</strong></div>
            ${amendment?`<div class="revision-additional"><span>Additional OT for Request Approver Approval</span><strong id="pendingAdditionalHours">+${Number(request.additionalHours||0).toFixed(2)} hrs</strong></div>`:""}
          </div>
          <label class="field"><span>Reason</span><textarea id="pendingReason" placeholder="Reason for overtime...">${escapeHtml(amendment?(request.amendmentReason||request.reason||""):(request.reason||""))}</textarea></label>
          <div class="info-banner"><span class="info-icon">i</span><div>Saving updates this same pending request. It stays in the Request Approver approval queue; no duplicate request is created.</div></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-light" id="cancelPendingOtEdit" type="button">Cancel</button>
          <button class="btn btn-primary" id="savePendingOtEdit" type="button">Save Changes</button>
        </div>
      </div>
    </div>`;

  const readVal=id=>normalize24HourTime(document.getElementById(id)?.value||"");
  const straightDutyToggle=document.getElementById("pendingStraightDuty");
  const straightDutyFields=document.getElementById("pendingStraightDutyFields");
  const recalc=()=>{
    const straightDuty=Boolean(straightDutyToggle?.checked);
    const selectedOtType=amendment ? (request.otType||"Regular Day") : (document.getElementById("pendingOtType")?.value||"Regular Day");
    const breakdown=proposedOTBreakdown({
      scheduleStart:readVal("pendingScheduleStart"),
      scheduleEnd:readVal("pendingScheduleEnd"),
      normalOtStart:readVal("pendingNormalStart"),
      normalOtEnd:readVal("pendingNormalEnd"),
      otType:selectedOtType,
      otDate:request.otDate,
      straightDuty,
      straightDutyScheduleStart:readVal("pendingSdScheduleStart"),
      straightDutyScheduleEnd:readVal("pendingSdScheduleEnd"),
      straightDutyOtStart:readVal("pendingSdOtStart"),
      straightDutyOtEnd:readVal("pendingSdOtEnd")
    });
    const total=breakdown.total;
    const totalEl=document.getElementById("pendingTotalHours");
    if(totalEl)totalEl.textContent=`${total.toFixed(2)} hrs`;
    if(amendment){
      const additional=Number((total-baseApprovedHours).toFixed(2));
      const addEl=document.getElementById("pendingAdditionalHours");
      if(addEl){
        addEl.textContent=`${additional>=0?"+":""}${additional.toFixed(2)} hrs`;
        addEl.classList.toggle("negative",additional<=0);
      }
      return {total,additional,breakdown};
    }
    return {total,additional:0,breakdown};
  };

  ["pendingScheduleStart","pendingScheduleEnd","pendingNormalStart","pendingNormalEnd","pendingSdScheduleStart","pendingSdScheduleEnd","pendingSdOtStart","pendingSdOtEnd"].forEach(inputId=>{
    const input=document.getElementById(inputId);
    if(!input || input.readOnly)return;
    input.addEventListener("input",()=>{
      let digits=input.value.replace(/\D/g,"").slice(0,4);
      if(digits.length>2)digits=`${digits.slice(0,2)}:${digits.slice(2)}`;
      input.value=digits;
      recalc();
    });
    input.addEventListener("blur",()=>{input.value=normalize24HourTime(input.value);recalc();});
  });

  straightDutyToggle?.addEventListener("change",()=>{
    straightDutyFields?.classList.toggle("hidden",!straightDutyToggle.checked);
    if(!straightDutyToggle.checked){
      ["pendingSdScheduleStart","pendingSdScheduleEnd","pendingSdOtStart","pendingSdOtEnd"].forEach(id=>{const el=document.getElementById(id);if(el)el.value="";});
    }
    recalc();
  });

  const otTypeSelect=document.getElementById("pendingOtType");
  otTypeSelect?.addEventListener("change",()=>{
    const editable=otTypeSelect.value==="Rest Day OT";
    ["pendingScheduleStart","pendingScheduleEnd"].forEach(id=>{
      const el=document.getElementById(id);
      if(!el)return;
      el.readOnly=!editable;
      if(!editable){
        el.value=id==="pendingScheduleStart" ? scheduleStart : scheduleEnd;
      }
    });
    const normalStartEl=document.getElementById("pendingNormalStart");
    if(normalStartEl){
      normalStartEl.value=editable ? readVal("pendingScheduleStart") : readVal("pendingScheduleEnd");
    }
    recalc();
  });

  recalc();
  const close=()=>modalRoot.innerHTML="";
  document.getElementById("cancelPendingOtEdit")?.addEventListener("click",close);
  document.getElementById("pendingOtEditBackdrop")?.addEventListener("click",e=>{if(e.target.id==="pendingOtEditBackdrop")close();});
  document.getElementById("savePendingOtEdit")?.addEventListener("click",()=>{
    const proposedScheduleStart=readVal("pendingScheduleStart");
    const proposedScheduleEnd=readVal("pendingScheduleEnd");
    const normalOtStart=readVal("pendingNormalStart");
    const normalOtEnd=readVal("pendingNormalEnd");
    const straightDuty=Boolean(straightDutyToggle?.checked);
    const sdScheduleStart=readVal("pendingSdScheduleStart");
    const sdScheduleEnd=readVal("pendingSdScheduleEnd");
    const sdOtStart=readVal("pendingSdOtStart");
    const sdOtEnd=readVal("pendingSdOtEnd");
    const reason=document.getElementById("pendingReason")?.value.trim()||"";
    const otType=amendment ? (request.otType||"Regular Day") : (document.getElementById("pendingOtType")?.value||"Regular Day");
    const {total,additional,breakdown}=recalc();

    if(!reason){showToast("Enter the overtime reason before saving.");document.getElementById("pendingReason")?.focus();return;}
    if(!proposedScheduleStart || !proposedScheduleEnd || !isValid24HourTime(proposedScheduleStart) || !isValid24HourTime(proposedScheduleEnd)){
      showToast("Enter a valid Schedule IN / OUT using 24-hour HH:MM.");return;
    }
    const hasNormal=Boolean(normalOtStart || normalOtEnd);
    if(hasNormal && (!normalOtStart || !normalOtEnd || !isValid24HourTime(normalOtStart) || !isValid24HourTime(normalOtEnd))){
      showToast("Complete the regular OT IN and OUT using 24-hour HH:MM.");return;
    }
    if(straightDuty){
      const sd=[sdScheduleStart,sdScheduleEnd,sdOtStart,sdOtEnd];
      if(sd.some(v=>!v || !isValid24HourTime(v))){showToast("Complete all Straight Duty and S.D. OT times using 24-hour HH:MM.");return;}
    }
    if(total<=0){showToast("Pending OT must have at least one valid OT time block.");return;}
    if(amendment && additional<=0){showToast("Additional OT must remain higher than the previously approved total.");return;}

    const fresh=getRequests();
    const target=fresh.find(r=>r.id===request.id);
    if(!target || target.status!=="Pending"){
      showToast("This request is no longer pending. Refresh the request list.");close();renderPage();return;
    }
    target.scheduleStart=proposedScheduleStart;
    target.scheduleEnd=proposedScheduleEnd;
    target.scheduleTime=`${formatClockTime24(proposedScheduleStart)} – ${formatClockTime24(proposedScheduleEnd)}`;
    target.normalOtStart=normalOtStart;
    target.normalOtEnd=normalOtEnd;
    target.straightDuty=straightDuty;
    target.straightDutyScheduleStart=straightDuty?sdScheduleStart:"";
    target.straightDutyScheduleEnd=straightDuty?sdScheduleEnd:"";
    target.straightDutyOtStart=straightDuty?sdOtStart:"";
    target.straightDutyOtEnd=straightDuty?sdOtEnd:"";
    target.straightDutyStart=straightDuty?sdScheduleStart:"";
    target.straightDutyEnd=straightDuty?sdScheduleEnd:"";
    target.otType=otType;
    target.startTime=normalOtStart || (straightDuty?sdOtStart:"");
    target.endTime=normalOtEnd || (straightDuty?sdOtEnd:"");
    if(amendment){
      target.proposedTotalHours=total.toFixed(2);
      target.proposedScheduledOtHours=Number(breakdown?.scheduledOtHours||0).toFixed(2);
      target.proposedExtraOtHours=Number(breakdown?.extraOtHours||0).toFixed(2);
      target.additionalHours=additional.toFixed(2);
      target.totalHours=additional.toFixed(2);
      target.amendmentReason=reason;
      target.reason=`Additional OT: ${reason}`;
    }else{
      target.totalHours=total.toFixed(2);
      target.scheduledOtHours=Number(breakdown?.scheduledOtHours||0).toFixed(2);
      target.extraOtHours=Number(breakdown?.extraOtHours||0).toFixed(2);
      target.reason=reason;
    }
    target.updatedAt=new Date().toISOString();
    target.editedBy=currentUser.username;
    target.editCount=Number(target.editCount||0)+1;
    saveRequests(fresh);
    addManagerNotification([target]);
    close();
    showToast(amendment?`Pending additional OT updated to +${additional.toFixed(2)} hr.`:`Pending OT updated to ${total.toFixed(2)} hrs.`);
    renderPage();
  });
}

function openSupervisorOTEditModal(id){
  const all=getRequests();
  const request=all.find(r=>r.id===id && !isOtAmendment(r));
  if(!request || request.status!=="Approved"){
    showToast("Only approved OT requests can be edited and resubmitted.");
    return;
  }
  if(request.attendanceStatus){
    showToast("Leave/Absent attendance records cannot use Additional OT resubmission.");
    return;
  }
  const pending=getPendingOTAmendment(request.id);
  if(pending){
    showToast("This request already has an additional OT request waiting for Request Approver approval.");
    return;
  }

  const baseHours=Number(request.totalHours||0);
  const regularStart=request.normalOtStart || request.startTime || "";
  const regularEnd=request.normalOtEnd || request.endTime || "";
  const canEditSchedule=request.otType==="Rest Day OT";
  const scheduleStart=request.scheduleStart || (String(request.schedule||"").toLowerCase()==="night"?"18:00":"06:00");
  const scheduleEnd=request.scheduleEnd || (String(request.schedule||"").toLowerCase()==="night"?"03:00":"15:00");

  modalRoot.innerHTML=`
    <div class="modal-backdrop" id="otRevisionBackdrop">
      <div class="modal ot-revision-modal">
        <div class="modal-header"><span>APPROVED OT REVISION</span><h3>Edit & Resubmit Additional OT</h3></div>
        <div class="modal-body">
          <div class="note-box ot-revision-summary">
            <strong>${escapeHtml(request.employeeName)}</strong> • ${escapeHtml(request.department)} • ${formatDate(request.otDate)}<br>
            Approved request: <strong>${escapeHtml(request.id)}</strong> • Current approved OT: <strong>${baseHours.toFixed(2)} hrs</strong>
          </div>
          <div class="revision-time-grid">
            <label class="field"><span>Schedule IN</span><input id="revScheduleStart" class="time24-input" inputmode="numeric" maxlength="5" value="${escapeHtml(scheduleStart)}" ${canEditSchedule?"":"readonly"}></label>
            <label class="field"><span>Schedule OUT</span><input id="revScheduleEnd" class="time24-input" inputmode="numeric" maxlength="5" value="${escapeHtml(scheduleEnd)}" ${canEditSchedule?"":"readonly"}></label>
            <label class="field"><span>Regular OT IN</span><input id="revNormalStart" class="time24-input" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(regularStart)}"></label>
            <label class="field"><span>Regular OT OUT</span><input id="revNormalEnd" class="time24-input" inputmode="numeric" maxlength="5" placeholder="HH:MM" value="${escapeHtml(regularEnd)}"></label>
          </div>
          ${request.straightDuty?`
            <div class="straight-duty-revision-block">
              <strong>Straight Duty</strong>
              <div class="revision-time-grid">
                <label class="field"><span>Straight Duty IN</span><input id="revSdScheduleStart" class="time24-input" inputmode="numeric" maxlength="5" value="${escapeHtml(request.straightDutyScheduleStart||request.straightDutyStart||"")}"></label>
                <label class="field"><span>Straight Duty OUT</span><input id="revSdScheduleEnd" class="time24-input" inputmode="numeric" maxlength="5" value="${escapeHtml(request.straightDutyScheduleEnd||request.straightDutyEnd||"")}"></label>
                <label class="field"><span>S.D. OT IN</span><input id="revSdOtStart" class="time24-input" inputmode="numeric" maxlength="5" value="${escapeHtml(request.straightDutyOtStart||"")}"></label>
                <label class="field"><span>S.D. OT OUT</span><input id="revSdOtEnd" class="time24-input" inputmode="numeric" maxlength="5" value="${escapeHtml(request.straightDutyOtEnd||"")}"></label>
              </div>
            </div>`:""}
          <div class="revision-hours-panel">
            <div><span>Previously Approved</span><strong>${baseHours.toFixed(2)} hrs</strong></div>
            <div><span>Revised Total OT</span><strong id="revTotalHours">${baseHours.toFixed(2)} hrs</strong></div>
            <div class="revision-additional"><span>Additional OT for Request Approver Re-approval</span><strong id="revAdditionalHours">+0.00 hrs</strong></div>
          </div>
          <label class="field"><span>Reason for Additional OT</span><textarea id="revReason" placeholder="Example: Employee exceeded the approved OT by 1 hour due to extended operation."></textarea></label>
          <div class="info-banner"><span class="info-icon">i</span><div>The original approved OT stays approved. Only the additional hours are sent to the Request Approver. After approval, HR automatically sees the revised total.</div></div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" id="cancelOtRevision">Cancel</button>
          <button type="button" class="btn btn-primary" id="submitOtRevision">Resubmit Additional OT</button>
        </div>
      </div>
    </div>`;

  const inputIds=["revScheduleStart","revScheduleEnd","revNormalStart","revNormalEnd","revSdScheduleStart","revSdScheduleEnd","revSdOtStart","revSdOtEnd"];
  inputIds.forEach(inputId=>{
    const input=document.getElementById(inputId);
    if(!input || input.readOnly)return;
    input.addEventListener("input",()=>{
      let digits=input.value.replace(/\D/g,"").slice(0,4);
      if(digits.length>2)digits=`${digits.slice(0,2)}:${digits.slice(2)}`;
      input.value=digits;
      recalc();
    });
    input.addEventListener("blur",()=>{input.value=normalize24HourTime(input.value);recalc();});
  });

  const readVal=id=>normalize24HourTime(document.getElementById(id)?.value||"");
  const recalc=()=>{
    const total=proposedOTTotalHours({
      scheduleStart:readVal("revScheduleStart"),
      scheduleEnd:readVal("revScheduleEnd"),
      normalOtStart:readVal("revNormalStart"),
      normalOtEnd:readVal("revNormalEnd"),
      otType:request.otType||"Regular Day",
      otDate:request.otDate,
      straightDuty:Boolean(request.straightDuty),
      straightDutyScheduleStart:readVal("revSdScheduleStart"),
      straightDutyScheduleEnd:readVal("revSdScheduleEnd"),
      straightDutyOtStart:readVal("revSdOtStart"),
      straightDutyOtEnd:readVal("revSdOtEnd")
    });
    const additional=Number((total-baseHours).toFixed(2));
    const totalEl=document.getElementById("revTotalHours");
    const addEl=document.getElementById("revAdditionalHours");
    if(totalEl)totalEl.textContent=`${total.toFixed(2)} hrs`;
    if(addEl){
      addEl.textContent=`${additional>=0?"+":""}${additional.toFixed(2)} hrs`;
      addEl.classList.toggle("negative",additional<0);
    }
    return {total,additional};
  };
  recalc();

  const close=()=>modalRoot.innerHTML="";
  document.getElementById("cancelOtRevision")?.addEventListener("click",close);
  document.getElementById("otRevisionBackdrop")?.addEventListener("click",e=>{if(e.target.id==="otRevisionBackdrop")close();});
  document.getElementById("submitOtRevision")?.addEventListener("click",()=>{
    const proposedScheduleStart=readVal("revScheduleStart");
    const proposedScheduleEnd=readVal("revScheduleEnd");
    const proposedNormalOtStart=readVal("revNormalStart");
    const proposedNormalOtEnd=readVal("revNormalEnd");
    const proposedSdScheduleStart=readVal("revSdScheduleStart");
    const proposedSdScheduleEnd=readVal("revSdScheduleEnd");
    const proposedSdOtStart=readVal("revSdOtStart");
    const proposedSdOtEnd=readVal("revSdOtEnd");
    const reason=document.getElementById("revReason")?.value.trim()||"";
    const {total,additional}=recalc();

    if(!reason){showToast("Enter the reason for the additional OT.");document.getElementById("revReason")?.focus();return;}
    if(!proposedScheduleStart || !proposedScheduleEnd || !isValid24HourTime(proposedScheduleStart) || !isValid24HourTime(proposedScheduleEnd)){
      showToast("The approved request must keep a valid Schedule IN / OUT.");return;
    }
    const hasNormal=Boolean(proposedNormalOtStart || proposedNormalOtEnd);
    if(hasNormal && (!proposedNormalOtStart || !proposedNormalOtEnd || !isValid24HourTime(proposedNormalOtStart) || !isValid24HourTime(proposedNormalOtEnd))){
      showToast("Complete the regular OT IN and OUT using 24-hour HH:MM.");return;
    }
    if(request.straightDuty){
      const sd=[proposedSdScheduleStart,proposedSdScheduleEnd,proposedSdOtStart,proposedSdOtEnd];
      if(sd.some(v=>!v || !isValid24HourTime(v))){showToast("Complete all Straight Duty and S.D. OT times using 24-hour HH:MM.");return;}
    }
    if(total<=baseHours || additional<=0){
      showToast("Revised OT must be higher than the already approved OT. Only additional OT can be resubmitted here.");return;
    }

    const fresh=getRequests();
    if(fresh.some(r=>isOtAmendment(r) && r.parentRequestId===request.id && r.status==="Pending")){
      showToast("An additional OT request is already pending for this approved record.");close();renderPage();return;
    }
    const amendmentNo=getNextOTAmendmentNo(request.id);
    const amendment={
      id:uid(),requestKind:"OT Amendment",parentRequestId:request.id,amendmentNo,
      employeeNo:request.employeeNo,employeeName:request.employeeName,position:request.position,
      schedule:request.schedule,scheduleStart:proposedScheduleStart,scheduleEnd:proposedScheduleEnd,
      scheduleTime:`${formatClockTime24(proposedScheduleStart)} – ${formatClockTime24(proposedScheduleEnd)}`,
      normalOtStart:proposedNormalOtStart,normalOtEnd:proposedNormalOtEnd,
      straightDuty:Boolean(request.straightDuty),
      straightDutyScheduleStart:request.straightDuty?proposedSdScheduleStart:"",
      straightDutyScheduleEnd:request.straightDuty?proposedSdScheduleEnd:"",
      straightDutyOtStart:request.straightDuty?proposedSdOtStart:"",
      straightDutyOtEnd:request.straightDuty?proposedSdOtEnd:"",
      straightDutyStart:request.straightDuty?proposedSdScheduleStart:"",
      straightDutyEnd:request.straightDuty?proposedSdScheduleEnd:"",
      employeeDayOff:request.employeeDayOff||"",attendanceStatus:"",attendanceType:"",leaveType:"",absentType:"",
      department:request.department,supervisorName:request.supervisorName||currentUser.displayName,
      otDate:request.otDate,otType:request.otType,
      startTime:proposedNormalOtStart || proposedSdOtStart,
      endTime:proposedNormalOtEnd || proposedSdOtEnd,
      totalHours:additional.toFixed(2),
      baseApprovedHours:baseHours.toFixed(2),proposedTotalHours:total.toFixed(2),additionalHours:additional.toFixed(2),
      baseNormalOtStart:request.normalOtStart||request.startTime||"",baseNormalOtEnd:request.normalOtEnd||request.endTime||"",
      baseStraightDutyOtStart:request.straightDutyOtStart||"",baseStraightDutyOtEnd:request.straightDutyOtEnd||"",
      workArea:request.workArea||"",reason:`Additional OT: ${reason}`,amendmentReason:reason,
      status:"Pending",submittedBy:currentUser.username,createdAt:new Date().toISOString(),reviewedBy:"",reviewedAt:"",managerRemarks:""
    };
    fresh.push(amendment);
    saveRequests(fresh);
    addManagerNotification([amendment]);
    close();
    showToast(`Additional ${additional.toFixed(2)} hr OT submitted to Request Approver for re-approval.`);
    renderPage();
  });
}

function renderTable(source,{mode,fixedDepartment="",target=content,pageSize=0}){
  const isPending=mode==="manager-pending";
  const isHistory=mode==="manager-history";
  const isHR=mode==="hr";
  const isSupervisor=mode==="supervisor";
  const showReviewed=isHistory||isHR;

  target.innerHTML=`
    <div class="card request-table-card ${isPending?"manager-pending-card":isHistory?"manager-history-card":""}">
      <div class="table-toolbar">
        <div class="filters">
          <input id="searchTable" placeholder="Search employee / ID...">
          ${fixedDepartment?`<select id="departmentFilter" disabled><option>${escapeHtml(fixedDepartment)}</option></select>`:
          `<select id="departmentFilter"><option value="">All Departments</option>${DEPARTMENTS.map(d=>`<option>${escapeHtml(d)}</option>`).join("")}</select>`}
          <select id="statusFilter">
            <option value="">All Status</option>
            <option>Pending</option><option>Approved</option><option>Rejected</option>
          </select>
        </div>
        <div class="table-toolbar-actions">
          <div id="tableCount" class="table-count"></div>
          ${isHR?`<button id="downloadHRExcel" class="btn btn-success btn-sm" type="button">⇩ Download Excel</button>`:""}
        </div>
      </div>
      <div id="tableArea" class="request-table-area"></div>
    </div>`;

  const search=document.getElementById("searchTable");
  const depFilter=document.getElementById("departmentFilter");
  const statusFilter=document.getElementById("statusFilter");
  if(isPending){statusFilter.value="Pending";statusFilter.disabled=true}
  if(isHR){statusFilter.value="Approved";statusFilter.disabled=true}
  let tablePage=1;

  const redraw=()=>{
    const q=search.value.trim().toLowerCase();
    const dep=fixedDepartment||depFilter.value;
    const status=statusFilter.value;
    const rows=source.filter(r=>{
      const hay=[r.id,r.employeeNo,r.employeeName,r.department,r.reason,r.supervisorName].join(" ").toLowerCase();
      return (!q||hay.includes(q)) && (!dep||r.department===dep) && (!status||r.status===status);
    }).sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
    const totalPages=pageSize?Math.max(1,Math.ceil(rows.length/pageSize)):1;
    tablePage=Math.min(Math.max(1,tablePage),totalPages);
    const pageRows=pageSize?rows.slice((tablePage-1)*pageSize,tablePage*pageSize):rows;
    document.getElementById("tableCount").textContent=pageSize && rows.length?`${rows.length} record${rows.length===1?"":"s"} • Page ${tablePage} of ${totalPages}`:`${rows.length} record${rows.length===1?"":"s"}`;
    document.getElementById("tableArea").innerHTML = rows.length?`
      <div class="table-wrap request-table-wrap"><table class="request-data-table ${isPending?"manager-pending-table":isHistory?"manager-history-table":""}">
        <thead><tr>
          <th>Request</th><th>Employee</th><th>Department</th>${isHistory?"<th>OT Date</th>":""}<th>OT Schedule</th><th>Type</th><th>Reason</th><th>Status</th>
          ${isPending?"<th>Action</th>":""}
          ${isSupervisor?"<th>Action</th>":""}
          ${showReviewed?"<th>Request Approver Review</th>":""}
        </tr></thead>
        <tbody>${pageRows.map(r=>`
          <tr>
            <td data-label="Request">${r.filedDirectByEmployee?`<span class="request-kind-badge">EMPLOYEE DIRECT</span><br>`:""}${r.isAdvanceFiling?`<span class="badge warning">ADVANCE FILING</span><br>`:""}${isOtAmendment(r)?`<span class="request-kind-badge">ADDITIONAL OT #${Number(r.amendmentNo||1)}</span><br>`:""}<span class="request-id">${escapeHtml(r.id)}</span>${isOtAmendment(r)?`<br><small class="muted">Original: ${escapeHtml(r.parentRequestId||"")}</small>`:""}<br><small class="muted">${formatDateTime(r.createdAt)}</small></td>
            <td data-label="Employee"><div class="employee-cell"><strong>${escapeHtml(r.employeeName)}</strong><small>${escapeHtml(r.supervisorName||"")}</small></div></td>
            <td data-label="Department">${departmentBadge(r.department)}</td>
            ${isHistory?`<td data-label="OT Date"><strong>${formatDate(r.otDate)}</strong><br><small class="muted">Duty / Time In date</small></td>`:""}
            <td data-label="OT Schedule">${isHistory?"":formatDate(r.otDate)}${isOtAmendment(r)?`<br><small class="muted">Proposed Regular OT: ${escapeHtml(r.normalOtStart||"—")}–${escapeHtml(r.normalOtEnd||"—")}</small>${r.straightDuty?`<br><small class="muted">Proposed S.D. OT: ${escapeHtml(r.straightDutyOtStart||"—")}–${escapeHtml(r.straightDutyOtEnd||"—")}</small>`:""}<br><span class="revision-delta-badge">${Number(r.baseApprovedHours||0).toFixed(2)} → ${Number(r.proposedTotalHours||0).toFixed(2)} hrs • +${Number(r.additionalHours||0).toFixed(2)} hr for approval</span>`:`<br><small class="muted">Regular OT: ${r.normalOtEnd?`${escapeHtml(r.normalOtStart||"")}–${escapeHtml(r.normalOtEnd||"")}`:(r.straightDuty?"—":`${escapeHtml(r.startTime||"")}–${escapeHtml(r.endTime||"")}`)}</small>${r.straightDuty?`<br><small class="muted">Straight Schedule: ${escapeHtml(r.straightDutyScheduleStart||r.straightDutyStart||"")}–${escapeHtml(r.straightDutyScheduleEnd||r.straightDutyEnd||"")}</small><br><span class="straight-duty-record-badge">Straight OT ${escapeHtml(r.straightDutyOtStart||"")}–${escapeHtml(r.straightDutyOtEnd||"")}</span>`:""}<br><strong>${r.totalHours} hrs</strong>${Number(r.revisionCount||0)>0?`<br><span class="revision-applied-badge">Re-approved ${Number(r.revisionCount)}× • Current total ${Number(r.totalHours||0).toFixed(2)} hrs</span>`:""}`}</td>
            <td data-label="Type">${isOtAmendment(r)?`<strong>Additional OT</strong><br><small>${escapeHtml(r.otType||"")}</small>`:escapeHtml(r.attendanceStatus ? (r.attendanceType||r.leaveType||r.absentType||r.attendanceStatus) : (getHRExportEmployeeStatus(r)!=="Working" ? `${getHRExportEmployeeStatus(r)}${r.otType?` • ${r.otType}`:""}` : r.otType))}</td>
            <td data-label="Reason">${escapeHtml(r.amendmentReason||r.reason)}${r.workArea?`<br><small class="muted">Area: ${escapeHtml(r.workArea)}</small>`:""}</td>
            <td data-label="Status">${statusBadge(r.status)}</td>
            ${isPending?`<td data-label="Action"><div class="actions">
              <button type="button" class="btn btn-success btn-sm" data-review="approve" data-id="${r.id}">${isOtAmendment(r)?"Approve Additional":"Approve"}</button>
              <button type="button" class="btn btn-danger btn-sm" data-review="reject" data-id="${r.id}">Reject</button>
            </div></td>`:""}
            ${isSupervisor?`<td data-label="Action">${(()=>{
              if(r.filedDirectByEmployee)return `<small class="muted">View only • Employee-filed OT</small>`;
              if(r.attendanceStatus)return `<small class="muted">—</small>`;
              if(isOtAmendment(r)){
                if(r.status==="Pending")return `<button type="button" class="btn btn-secondary btn-sm" data-edit-pending-ot="${escapeHtml(r.id)}">✎ Edit Pending Additional OT</button>`;
                return `<small class="muted">—</small>`;
              }
              const pendingEdit=getPendingOTAmendment(r.id);
              if(pendingEdit)return `<span class="badge pending">+${Number(pendingEdit.additionalHours||0).toFixed(2)} hr Pending Request Approver</span>`;
              if(r.status==="Pending")return `<button type="button" class="btn btn-secondary btn-sm" data-edit-pending-ot="${escapeHtml(r.id)}">✎ Edit Pending OT</button>`;
              if(r.status==="Approved")return `<button type="button" class="btn btn-secondary btn-sm" data-edit-resubmit-ot="${escapeHtml(r.id)}">✎ Edit & Resubmit</button>`;
              return `<small class="muted">—</small>`;
            })()}</td>`:""}
            ${showReviewed?`<td data-label="Request Approver Review">${r.reviewedBy?`<strong>${escapeHtml(r.reviewedBy)}</strong><br><small class="muted">${formatDateTime(r.reviewedAt)}</small>${r.managerRemarks?`<br><small>${escapeHtml(r.managerRemarks)}</small>`:""}`:"—"}</td>`:""}
          </tr>`).join("")}</tbody>
      </table></div>
      ${pageSize && rows.length>pageSize?`<div class="request-table-pagination">
        <button id="requestTablePrevPage" class="btn btn-light btn-sm" type="button" ${tablePage<=1?"disabled":""}>‹ Previous</button>
        <span>Page <strong>${tablePage}</strong> of <strong>${totalPages}</strong><small>${rows.length} record(s) total • ${pageSize} per page</small></span>
        <button id="requestTableNextPage" class="btn btn-light btn-sm" type="button" ${tablePage>=totalPages?"disabled":""}>Next ›</button>
      </div>`:""}`:emptyState("No matching records","Try a different search or filter.");
    document.getElementById("requestTablePrevPage")?.addEventListener("click",()=>{if(tablePage>1){tablePage-=1;redraw();}});
    document.getElementById("requestTableNextPage")?.addEventListener("click",()=>{if(tablePage<totalPages){tablePage+=1;redraw();}});
    if(isPending){
      document.querySelectorAll("[data-review]").forEach(btn=>btn.addEventListener("click",()=>openReviewModal(btn.dataset.id,btn.dataset.review)));
    }
    if(isSupervisor){
      document.querySelectorAll("[data-edit-pending-ot]").forEach(btn=>btn.addEventListener("click",()=>openSupervisorPendingOTEditModal(btn.dataset.editPendingOt)));
      document.querySelectorAll("[data-edit-resubmit-ot]").forEach(btn=>btn.addEventListener("click",()=>openSupervisorOTEditModal(btn.dataset.editResubmitOt)));
    }
    if(isHR){
      const exportBtn=document.getElementById("downloadHRExcel");
      if(exportBtn){
        exportBtn.onclick=()=>{
          const exportContext={department:dep||""};
          if(currentPage==="last-cutoff"){
            exportContext.startKey=hrCutoffStartKey;
            exportContext.endKey=hrCutoffEndKey;
          }
          exportHRRowsToExcel(rows,exportContext);
        };
      }
    }
  };

  search.addEventListener("input",()=>{tablePage=1;redraw();});
  depFilter.addEventListener("change",()=>{tablePage=1;redraw();});
  statusFilter.addEventListener("change",()=>{tablePage=1;redraw();});
  redraw();
}

function openReviewModal(id,action){
  const rows=getRequests();
  const r=rows.find(x=>x.id===id);
  if(!r)return;
  const approving=action==="approve";
  modalRoot.innerHTML=`
    <div class="modal-backdrop" id="reviewBackdrop">
      <div class="modal">
        <div class="modal-header"><span>REQUEST APPROVER REVIEW</span><h3>${approving?"Approve":"Reject"} ${isOtAmendment(r)?"Additional OT":"Overtime Request"}</h3></div>
        <div class="modal-body">
          <div class="note-box" style="margin-bottom:13px">
            <strong>${escapeHtml(r.employeeName)}</strong> • ${escapeHtml(r.department)}<br>
            ${isOtAmendment(r)?`${formatDate(r.otDate)} • Previously approved <strong>${Number(r.baseApprovedHours||0).toFixed(2)} hrs</strong> → revised <strong>${Number(r.proposedTotalHours||0).toFixed(2)} hrs</strong><br><span class="revision-delta-badge">Approve only the additional +${Number(r.additionalHours||0).toFixed(2)} hr</span><br><small>Proposed Regular OT ${escapeHtml(r.normalOtStart||"—")}–${escapeHtml(r.normalOtEnd||"—")}${r.straightDuty?` • S.D. OT ${escapeHtml(r.straightDutyOtStart||"—")}–${escapeHtml(r.straightDutyOtEnd||"—")}`:""}</small>`:`${formatDate(r.otDate)} • Regular OT ${r.normalOtEnd?`${escapeHtml(r.normalOtStart||"")}–${escapeHtml(r.normalOtEnd||"")}`:(r.straightDuty?"—":`${escapeHtml(r.startTime||"")}–${escapeHtml(r.endTime||"")}`)}${r.straightDuty?` • Straight Schedule ${escapeHtml(r.straightDutyScheduleStart||r.straightDutyStart||"")}–${escapeHtml(r.straightDutyScheduleEnd||r.straightDutyEnd||"")} • Straight OT ${escapeHtml(r.straightDutyOtStart||"")}–${escapeHtml(r.straightDutyOtEnd||"")}`:""} • ${r.totalHours} hrs`}
          </div>
          <label class="field"><span>Request Approver Remarks ${approving?"(Optional)":"(Required)"}</span>
            <textarea id="reviewRemarks" placeholder="${approving?"Optional approval note...":"Enter reason for rejection..."}"></textarea>
          </label>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" id="cancelReview">Cancel</button>
          <button type="button" class="btn ${approving?"btn-success":"btn-danger"}" id="confirmReview">Confirm ${approving?"Approval":"Rejection"}</button>
        </div>
      </div>
    </div>`;
  const close=()=>modalRoot.innerHTML="";
  document.getElementById("cancelReview").addEventListener("click",close);
  document.getElementById("reviewBackdrop").addEventListener("click",e=>{if(e.target.id==="reviewBackdrop")close()});
  document.getElementById("confirmReview").addEventListener("click",()=>{
    const remarks=document.getElementById("reviewRemarks").value.trim();
    if(!approving && !remarks){showToast("Remarks are required when rejecting.");return}
    const reviewedAt=new Date().toISOString();
    if(isOtAmendment(r)){
      r.reviewedBy=currentUser.displayName;
      r.reviewedAt=reviewedAt;
      r.managerRemarks=remarks;
      if(approving){
        const parent=rows.find(x=>x.id===r.parentRequestId && !isOtAmendment(x));
        if(!parent){showToast("Original approved OT request could not be found.");return;}
        if(parent.status!=="Approved"){showToast("Original request is no longer in Approved status.");return;}
        const previousTotal=Number(parent.totalHours||0);
        if(!parent.initialManagerRemarks)parent.initialManagerRemarks=parent.managerRemarks||"";
        parent.scheduleStart=r.scheduleStart;
        parent.scheduleEnd=r.scheduleEnd;
        parent.scheduleTime=r.scheduleTime;
        parent.normalOtStart=r.normalOtStart||"";
        parent.normalOtEnd=r.normalOtEnd||"";
        parent.straightDuty=Boolean(r.straightDuty);
        parent.straightDutyScheduleStart=r.straightDutyScheduleStart||"";
        parent.straightDutyScheduleEnd=r.straightDutyScheduleEnd||"";
        parent.straightDutyOtStart=r.straightDutyOtStart||"";
        parent.straightDutyOtEnd=r.straightDutyOtEnd||"";
        parent.straightDutyStart=r.straightDutyStart||"";
        parent.straightDutyEnd=r.straightDutyEnd||"";
        parent.startTime=r.startTime||"";
        parent.endTime=r.endTime||"";
        parent.totalHours=Number(r.proposedTotalHours||0).toFixed(2);
        parent.revisionCount=Number(parent.revisionCount||0)+1;
        parent.lastReapprovedBy=currentUser.displayName;
        parent.lastReapprovedAt=reviewedAt;
        parent.lastAdditionalHours=Number(r.additionalHours||0).toFixed(2);
        parent.lastAmendmentReason=r.amendmentReason||r.reason||"";
        parent.managerRemarks=`Additional ${Number(r.additionalHours||0).toFixed(2)} hr OT re-approved${remarks?` • ${remarks}`:""}`;
        parent.revisionHistory=[...(Array.isArray(parent.revisionHistory)?parent.revisionHistory:[]),{
          amendmentRequestId:r.id,amendmentNo:r.amendmentNo||1,previousTotalHours:previousTotal.toFixed(2),
          revisedTotalHours:parent.totalHours,additionalHours:Number(r.additionalHours||0).toFixed(2),
          reason:r.amendmentReason||"",approvedBy:currentUser.displayName,approvedAt:reviewedAt,gmRemarks:remarks
        }];
        r.status="Approved Adjustment";
        saveRequests(rows);
        addHRDecisionNotification(parent);
        addSupervisorOTRevisionNotification(r,"approved");
        close();
        showToast(`Additional ${Number(r.additionalHours||0).toFixed(2)} hr approved. HR now sees ${parent.totalHours} total OT hours.`);
      }else{
        r.status="Rejected Adjustment";
        saveRequests(rows);
        addSupervisorOTRevisionNotification(r,"rejected");
        close();
        showToast("Additional OT rejected. Original approved OT remains unchanged.");
      }
      renderPage();
      return;
    }
    r.status=approving?"Approved":"Rejected";
    r.reviewedBy=currentUser.displayName;
    r.reviewedAt=reviewedAt;
    r.managerRemarks=remarks;
    saveRequests(rows);
    if(approving){
      addSupervisorOTApprovalNotification(r);
      addEmployeeOTApprovalNotification(r);
      addHRDecisionNotification(r);
    }else{
      const notifications=getSupervisorEmployeeNotifications();
      notifications.unshift({id:uid(),type:"ot-rejected",employeeNo:r.employeeNo,employeeName:r.employeeName,department:r.department,title:"OT rejected by Request Approver",details:`${formatDate(r.otDate)} • ${Number(r.totalHours||0).toFixed(2)} hrs • Reason: ${remarks}`,createdAt:reviewedAt,read:false,resolved:false,requestId:r.id,targetPage:"new-request"});
      saveSupervisorEmployeeNotifications(notifications.slice(0,160));
    }
    close();
    showToast(approving?"Approved. Supervisor and employee were notified, and the approved OT was sent to HR.":"Rejected. Supervisor and employee can now see the rejection reason.");
    renderPage();
  });
}


function getSampleEmployeeSetup(){
  const locationOverrides={};
  const dayOffOverrides={};
  let employeeIndex=0;

  DEPARTMENTS.forEach(department=>{
    (EMPLOYEES_BY_DEPARTMENT[department] || []).forEach(emp=>{
      locationOverrides[emp.no]=OT_LOCATIONS[(employeeIndex*2 + 1) % OT_LOCATIONS.length];
      dayOffOverrides[emp.no]=DAY_OFF_OPTIONS[(employeeIndex*3 + 6) % DAY_OFF_OPTIONS.length];
      employeeIndex+=1;
    });
  });

  return {locationOverrides,dayOffOverrides};
}

function applySampleEmployeeSetup(){
  const setup=getSampleEmployeeSetup();
  saveEmployeeLocationOverrides(setup.locationOverrides);
  saveEmployeeDayOffOverrides(setup.dayOffOverrides);
}

function getSampleEmployees(){
  const setup=getSampleEmployeeSetup();
  const employees=[];
  DEPARTMENTS.forEach(department=>{
    (EMPLOYEES_BY_DEPARTMENT[department] || []).forEach(emp=>{
      employees.push({
        ...emp,
        department,
        sampleLocation:setup.locationOverrides[emp.no] || "Bacao",
        sampleDayOff:setup.dayOffOverrides[emp.no] || "Sunday"
      });
    });
  });
  return employees;
}

function sampleDateRange(startKey,endKey){
  const dates=[];
  let cursor=parseLocalDate(startKey);
  const end=parseLocalDate(endKey);
  let guard=0;
  while(cursor<=end && guard<370){
    dates.push(toDateKey(cursor));
    cursor=new Date(cursor.getFullYear(),cursor.getMonth(),cursor.getDate()+1);
    guard++;
  }
  return dates;
}

function sampleAddMinutes(time,minutes){
  const [h,m]=String(time).split(":").map(Number);
  const total=((h*60+m+minutes)%(24*60)+(24*60))%(24*60);
  return `${String(Math.floor(total/60)).padStart(2,"0")}:${String(total%60).padStart(2,"0")}`;
}

function getSampleData(){
  const employees=getSampleEmployees();
  const reasons=[
    "Extended yard and gate operations.",
    "Container movement and monitoring support.",
    "Urgent repair completion before dispatch.",
    "Inventory validation and material issuance.",
    "Preventive maintenance and equipment inspection.",
    "Documentation and end-of-day reconciliation.",
    "Late vessel and truck operation support.",
    "Urgent client and shipping requirement.",
    "Equipment troubleshooting and recovery.",
    "Cutoff report and record completion.",
    "Extended operational support due to workload.",
    "Completion of pending daily operational records."
  ];
  const hoursOptions=[1.5,2,2.5,3,3.5,4];
  const dates=sampleDateRange("2026-06-02","2026-08-10");
  const supervisorByDepartment={};
  getSystemAccountDirectory().forEach(user=>{
    if(user?.role==="Supervisor")supervisorByDepartment[user.department]={username:user.username,name:user.displayName};
  });
  const rows=[];
  let sequence=1;

  // 320 OT requests: 40 employees x 8 unique dates each.
  // OT remains separate from the Daily Attendance register.
  employees.forEach((emp,employeeIndex)=>{
    const usedDates=new Set();
    for(let recordIndex=0;recordIndex<8;recordIndex++){
      let dateIndex=(employeeIndex*5 + recordIndex*9 + (recordIndex%2)*3) % dates.length;
      let dateStr=dates[dateIndex];
      while(usedDates.has(dateStr)){
        dateIndex=(dateIndex+1)%dates.length;
        dateStr=dates[dateIndex];
      }
      usedDates.add(dateStr);

      const recordNumber=sequence++;
      const supervisor=supervisorByDepartment[emp.department] || {username:"sup_operation",name:`${emp.department} Supervisor`};
      const scheduleStart=emp.schedule==="Night" ? "18:00" : "06:00";
      const scheduleEnd=emp.schedule==="Night" ? "03:00" : "15:00";
      const weekday=parseLocalDate(dateStr).toLocaleDateString("en-PH",{weekday:"long"});
      const isDayOff=weekday===emp.sampleDayOff;
      const holiday=getPhilippineHoliday(dateStr);
      const fullDutyOt=Boolean(holiday) || isDayOff;
      const scheduleHours=paidScheduledBlockHours(scheduleStart,scheduleEnd);
      const normalHours=hoursOptions[(employeeIndex+recordIndex*2)%hoursOptions.length];
      const normalOtStart=fullDutyOt?scheduleStart:scheduleEnd;
      // normalHours represents the extra OT after the employee's scheduled shift.
      const normalOtEnd=sampleAddMinutes(scheduleEnd,Math.round(normalHours*60));
      const straightDuty=recordNumber%13===0;
      const straightDutyScheduleStart=straightDuty?normalOtEnd:"";
      const straightDutyScheduleEnd=straightDuty?sampleAddMinutes(straightDutyScheduleStart,8*60):"";
      const straightDutyOtStart=straightDuty?straightDutyScheduleEnd:"";
      const straightExtra=straightDuty?[1.5,2,2.5][recordNumber%3]:0;
      const straightDutyOtEnd=straightDuty?sampleAddMinutes(straightDutyOtStart,Math.round(straightExtra*60)):"";
      const scheduledOtHours=fullDutyOt ? scheduleHours+(straightDuty?8:0) : 0;
      const extraOtHours=normalHours+straightExtra;
      const totalHours=scheduledOtHours+extraOtHours;

      let status="Approved";
      if(recordNumber%8===0 || recordNumber%19===0)status="Pending";
      else if(recordNumber%17===0)status="Rejected";

      rows.push({
        id:`OT-SAMPLE-${String(recordNumber).padStart(3,"0")}`,
        department:emp.department,
        submittedBy:supervisor.username,
        supervisorName:supervisor.name,
        employeeNo:emp.no,
        employeeName:emp.name,
        position:emp.position,
        schedule:emp.schedule,
        scheduleStart,
        scheduleEnd,
        scheduleTime:`${scheduleStart} – ${scheduleEnd}`,
        otDate:dateStr,
        otType:holiday?getAutomaticOtType(dateStr,false):(isDayOff?"Rest Day OT":getAutomaticOtType(dateStr,false)),
        normalOtStart,
        normalOtEnd,
        straightDuty,
        straightDutyScheduleStart,
        straightDutyScheduleEnd,
        straightDutyOtStart,
        straightDutyOtEnd,
        straightDutyStart:straightDuty?straightDutyScheduleStart:"",
        straightDutyEnd:straightDuty?straightDutyScheduleEnd:"",
        employeeDayOff:emp.sampleDayOff,
        attendanceStatus:"",
        attendanceType:"",
        leaveType:"",
        absentType:"",
        startTime:normalOtStart,
        endTime:normalOtEnd,
        totalHours:totalHours.toFixed(2),
        scheduledOtHours:scheduledOtHours.toFixed(2),
        extraOtHours:extraOtHours.toFixed(2),
        workArea:emp.sampleLocation,
        reason:reasons[(employeeIndex+recordIndex*3)%reasons.length],
        status,
        reviewedBy:status==="Pending"?"":"Request Approver",
        reviewedAt:status==="Pending"?"":new Date(`${dateStr}T16:30:00+08:00`).toISOString(),
        managerRemarks:status==="Approved"?"Approved for sample operational requirement.":status==="Rejected"?"Sample rejected record for workflow testing.":"",
        createdAt:new Date(`${dateStr}T15:45:00+08:00`).toISOString(),
        sampleHolidayName:holiday?.name || ""
      });
    }
  });

  return rows;
}

function getSampleLeaveData(otRows=[]){
  const employees=getSampleEmployees();
  const reasons=["Emergency","Going to province","Not feeling well","Important Matter","Flood/Heavy Rain that Causes Flood"];
  const futureDates=sampleDateRange("2026-08-12","2026-08-30");
  const pastDates=sampleDateRange("2026-06-08","2026-08-08");
  const otDatesByEmployee=new Map();
  otRows.forEach(r=>{
    if(!otDatesByEmployee.has(r.employeeNo))otDatesByEmployee.set(r.employeeNo,new Set());
    otDatesByEmployee.get(r.employeeNo).add(r.otDate);
  });
  const usedLeaveDates=new Map();
  const pickDate=(emp,pool,seed)=>{
    const otDates=otDatesByEmployee.get(emp.no)||new Set();
    const used=usedLeaveDates.get(emp.no)||new Set();
    for(let step=0;step<pool.length;step++){
      const key=pool[(seed+step)%pool.length];
      if(otDates.has(key)||used.has(key))continue;
      used.add(key);usedLeaveDates.set(emp.no,used);return key;
    }
    const fallback=pool[seed%pool.length];
    used.add(fallback);usedLeaveDates.set(emp.no,used);return fallback;
  };
  const rows=[];
  for(let i=0;i<64;i++){
    const emp=employees[i%employees.length];
    const cycle=i%16;
    let status;
    if(cycle<4)status="Pending Supervisor";
    else if(cycle<8)status="Pending HR";
    else if(cycle<12)status="Pending Request Approver";
    else if(cycle<15)status="Approved";
    else status="Rejected by Request Approver";

    const isPending=status.startsWith("Pending");
    const dateStr=pickDate(emp,isPending?futureDates:pastDates,(i*5)+(Math.floor(i/employees.length)*7));
    const leaveType=i%2===0?"VL":"SL";
    const payType=i%3===0?"Without Pay":"With Pay";
    const createdAt=new Date(`${isPending?"2026-08-10":dateStr}T08:20:00+08:00`).toISOString();
    const request={
      id:`LV-SAMPLE-${String(i+1).padStart(3,"0")}`,
      employeeNo:emp.no,
      employeeName:emp.name,
      position:emp.position,
      department:emp.department,
      supervisorName:`${emp.department} Supervisor`,
      submittedBy:`sample_${emp.no.toLowerCase()}`,
      filedByRole:"Employee",
      filedByName:emp.name,
      leaveType,
      payType,
      requestedCreditDays:payType==="With Pay"?1:0,
      creditChargedDays:status==="Approved"&&payType==="With Pay"?1:0,
      creditDeductedAt:status==="Approved"&&payType==="With Pay"?new Date(`${dateStr}T11:00:00+08:00`).toISOString():"",
      startDate:dateStr,
      endDate:dateStr,
      reason:reasons[i%reasons.length],
      status,
      createdAt,
      supervisorReviewedBy:"",supervisorReviewedAt:"",supervisorRemarks:"",
      hrReviewedBy:"",hrReviewedAt:"",hrRemarks:"",
      gmReviewedBy:"",gmReviewedAt:"",gmRemarks:"",
      finalApprovedAt:status==="Approved"?new Date(`${dateStr}T11:00:00+08:00`).toISOString():""
    };
    if(["Pending HR","Pending Request Approver","Approved","Rejected by Request Approver"].includes(status)){
      request.supervisorReviewedBy=`${emp.department} Supervisor`;
      request.supervisorReviewedAt=new Date(`${isPending?"2026-08-10":dateStr}T09:00:00+08:00`).toISOString();
      request.supervisorRemarks="Reviewed and endorsed.";
    }
    if(["Pending Request Approver","Approved","Rejected by Request Approver"].includes(status)){
      request.hrReviewedBy="Human Resources";
      request.hrReviewedAt=new Date(`${isPending?"2026-08-10":dateStr}T10:00:00+08:00`).toISOString();
      request.hrRemarks="HR review completed.";
    }
    if(["Approved","Rejected by Request Approver"].includes(status)){
      request.gmReviewedBy="Request Approver";
      request.gmReviewedAt=new Date(`${dateStr}T11:00:00+08:00`).toISOString();
      request.gmRemarks=status==="Approved"?"Final leave approval completed.":"Rejected sample request for workflow testing.";
    }
    rows.push(request);
  }
  return rows.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
}

function getSampleAttendanceData(otRows=[],leaveRows=[]){
  const employees=getSampleEmployees();
  const dates=sampleDateRange("2026-06-01","2026-08-11");
  const approvedOtMap=new Map();
  otRows.filter(r=>r.status==="Approved").forEach(r=>{
    const key=dailyAttendanceKey(r.employeeNo,r.otDate);
    approvedOtMap.set(key,Number(((approvedOtMap.get(key)||0)+Number(r.totalHours||0)).toFixed(2)));
  });
  const approvedLeaveMap=new Map();
  leaveRows.filter(r=>r.status==="Approved").forEach(r=>{
    eachDateKey(r.startDate,r.endDate).forEach(dateKey=>approvedLeaveMap.set(dailyAttendanceKey(r.employeeNo,dateKey),r));
  });
  const rows=[];
  let sequence=1;

  employees.forEach((emp,employeeIndex)=>{
    const scheduleStart=emp.schedule==="Night"?"18:00":"06:00";
    const scheduleEnd=emp.schedule==="Night"?"03:00":"15:00";
    dates.forEach((dateStr,dayIndex)=>{
      // As of the morning of Aug. 11, only Morning shift employees have started today's duty.
      if(dateStr==="2026-08-11" && emp.schedule==="Night")return;
      const key=dailyAttendanceKey(emp.no,dateStr);
      const weekday=parseLocalDate(dateStr).toLocaleDateString("en-PH",{weekday:"long"});
      const isDayOff=weekday===emp.sampleDayOff;
      const holiday=getPhilippineHoliday(dateStr);
      const approvedLeave=approvedLeaveMap.get(key)||null;
      const approvedOtHours=approvedOtMap.get(key)||0;
      const marker=(employeeIndex*17 + dayIndex*11 + (employeeIndex%5)*3)%100;
      let status="Present";
      let attendanceType="";
      let absentType="";
      let leaveType="";
      let timeIn="";
      let timeOut="";
      let remarks="";

      if(approvedLeave){
        status="Leave";
        attendanceType=approvedLeave.leaveType;
        leaveType=approvedLeave.leaveType;
        remarks=approvedLeave.reason;
      }else if(isDayOff){
        status="Day Off";
        remarks=approvedOtHours>0?"Scheduled Day Off with approved OT.":"Scheduled weekly Day Off.";
      }else if(holiday && approvedOtHours<=0){
        status="Holiday";
        remarks=holiday.name;
      }else if(dateStr==="2026-08-11"){
        status="Present";
        const lateMinutes=(employeeIndex%7===0)?[5,8,12][employeeIndex%3]:0;
        timeIn=sampleAddMinutes(scheduleStart,lateMinutes);
        timeOut="";
        remarks="Present — shift in progress as of Aug. 11 sample data.";
      }else if(marker<3){
        status="Absent";
        attendanceType="AWOL";
        absentType="AWOL";
        remarks="Absent without prior notice.";
      }else if(marker<6){
        status="Absent";
        attendanceType="Emergency Absent";
        absentType="Emergency Absent";
        remarks="Emergency family/personal matter.";
      }else{
        status="Present";
        const lateMinutes=marker%9===0?[5,10,15,20][(employeeIndex+dayIndex)%4]:0;
        const undertimeMinutes=marker%13===0?[10,15,20,30][(employeeIndex+dayIndex)%4]:0;
        const earlyMinutes=lateMinutes?0:((marker%7===0)?5:0);
        timeIn=sampleAddMinutes(scheduleStart,lateMinutes-earlyMinutes);
        timeOut=sampleAddMinutes(scheduleEnd,-undertimeMinutes);
        if(lateMinutes&&undertimeMinutes)remarks="Late and undertime sample attendance.";
        else if(lateMinutes)remarks="Late arrival recorded.";
        else if(undertimeMinutes)remarks="Undertime recorded.";
        else remarks=holiday?`${holiday.name} — reported for duty.`:"Complete attendance.";
      }

      const metrics=calculateAttendanceMetrics({
        status,timeIn,timeOut,scheduleStart,scheduleEnd,
        isHoliday:Boolean(holiday),isDayOff
      });
      rows.push({
        id:`ATT-SAMPLE-${String(sequence++).padStart(5,"0")}`,
        source:"Sample Attendance",
        employeeNo:emp.no,
        employeeName:emp.name,
        position:emp.position,
        department:emp.department,
        date:dateStr,
        shift:emp.schedule,
        scheduleStart,
        scheduleEnd,
        employeeDayOff:emp.sampleDayOff,
        status,
        attendanceType,
        leaveType,
        absentType,
        timeIn,
        timeOut,
        workedHours:metrics.workedHours,
        regularHours:metrics.regularHours,
        lateMinutes:metrics.lateMinutes,
        undertimeMinutes:metrics.undertimeMinutes,
        approvedOtHours:Number(approvedOtHours.toFixed(2)),
        holidayName:holiday?.name||"",
        remarks,
        recordedBy:"Sample Data Generator",
        createdAt:new Date(`${dateStr}T${dateStr==="2026-08-11"?"08:45:00":"16:00:00"}+08:00`).toISOString(),
        updatedAt:new Date(`${dateStr}T${dateStr==="2026-08-11"?"08:45:00":"16:05:00"}+08:00`).toISOString()
      });
    });
  });
  return rows;
}

function loadCompleteSampleData(){
  applySampleEmployeeSetup();
  const otRows=getSampleData();
  const leaveRows=getSampleLeaveData(otRows);
  const attendanceRows=getSampleAttendanceData(otRows,leaveRows);
  saveRequests(otRows);
  saveLeaveRequests(leaveRows);
  saveDailyAttendanceRecords(attendanceRows);
  saveEmployeeAttendanceOTSubmissions([]);
  saveManagerNotifications([]);
  saveHRNotifications([]);
  saveEmployeeLeaveNotifications([]);
  saveSupervisorEmployeeNotifications([]);
  cloudSetItem(SAMPLE_DATA_REVISION_KEY,SAMPLE_DATA_REVISION);
  return {otRows,leaveRows,attendanceRows};
}

function seedSampleData(force=false){
  const hasData=getRequests().length || getLeaveRequests().length || getDailyAttendanceRecords().length || getEmployeeAttendanceOTSubmissions().length;
  if(!force && hasData && !confirm("Clear all current OT, Leave, Attendance and Employee Attendance/OT submissions and load the full sample dataset?"))return;
  const {otRows,leaveRows,attendanceRows}=loadCompleteSampleData();
  const presentCount=attendanceRows.filter(r=>r.status==="Present").length;
  showToast(`${otRows.length} OT, ${leaveRows.length} Leave and ${attendanceRows.length} Attendance records loaded (${presentCount} Present).`);
  if(currentUser)renderPage();
}

function clearTransactionalDataForManualFlow(){
  // One-time clean slate for manual workflow testing.
  // Employee master list, profile, location, shift/schedule and day-off setup are preserved.
  saveRequests([]);
  saveLeaveRequests([]);
  saveDailyAttendanceRecords([]);
  saveEmployeeAttendanceOTSubmissions([]);
  saveManagerNotifications([]);
  saveHRNotifications([]);
  saveEmployeeLeaveNotifications([]);
  saveSupervisorEmployeeNotifications([]);
  cloudSetItem(CHAT_STORE_KEY,JSON.stringify([]));
  cloudSetItem(CHAT_READ_KEY,JSON.stringify({}));
  cloudSetItem(SAMPLE_DATA_REVISION_KEY,SAMPLE_DATA_REVISION);
  cloudSetItem(CLEAN_DATA_REVISION_KEY,CLEAN_DATA_REVISION);
}

function isBuiltInSampleHRRecord(record){
  if(!record)return false;
  const id=String(record.id||"");
  const source=String(record.source||"").toLowerCase();
  const recordedBy=String(record.recordedBy||"").toLowerCase();
  return id.startsWith("OT-SAMPLE-") || id.startsWith("LV-SAMPLE-") || id.startsWith("ATT-SAMPLE-") || source.includes("sample") || recordedBy.includes("sample data generator");
}

function cleanHRDataKeepCustomCreated(){
  // HR-only cleanup for manual testing:
  // - Keep HR-created/custom employees and their saved setup.
  // - Hide built-in demo employees from HR Employee Master List only.
  // - Remove only sample/demo transaction rows; preserve anything manually created.
  cloudSetItem(HR_MASTER_CUSTOM_ONLY_KEY,"1");
  saveRequests(getRequests().filter(r=>!isBuiltInSampleHRRecord(r)));
  saveLeaveRequests(getLeaveRequests().filter(r=>!isBuiltInSampleHRRecord(r)));
  saveDailyAttendanceRecords(getDailyAttendanceRecords().filter(r=>!isBuiltInSampleHRRecord(r)));
  saveEmployeeAttendanceOTSubmissions(getEmployeeAttendanceOTSubmissions().filter(r=>!isBuiltInSampleHRRecord(r)));
  cloudSetItem(HR_DATA_CLEAN_REVISION_KEY,HR_DATA_CLEAN_REVISION);
}

function clearAllDataKeepAccountsForFlowTest(){
  // Firebase clean build: remove every local system dataset, including employees and accounts.
  const keys=[];
  for(let i=0;i<window.localStorage.length;i++){
    const key=window.localStorage.key(i);
    if(String(key||"").startsWith("hr") && key!==FIREBASE_ACCOUNT_DIRECTORY_KEY)keys.push(key);
  }
  keys.forEach(key=>window.localStorage.removeItem(key));
  window.localStorage.setItem(FULL_FLOW_RESET_REVISION_KEY,FULL_FLOW_RESET_REVISION);
}

function preload(){
  // IMPORTANT: Do not clear or seed hr* datasets during page startup.
  // A signed-in refresh must hydrate Firebase first; getters already safely return [] for missing keys.
  // Data clearing is only allowed through an explicit IT action, never automatically on refresh.
}



async function initializeFirebaseLoginUI(){
  const statusEl=document.getElementById("firebaseStatus");
  const setupWrap=document.getElementById("initialSetupWrap");
  if(!window.OTFirebase?.configured){
    if(statusEl){statusEl.className="firebase-status warning";statusEl.innerHTML="<strong>Firebase configuration incomplete.</strong><br>Database URL is set to otmonitoring, but the Web API Key still needs to be pasted into <code>firebase-config.js</code>.";}
    setupWrap?.classList.add("hidden");
    return;
  }
  try{
    const status=await window.OTFirebase.getBootstrapStatus();
    if(status.complete){
      if(statusEl){statusEl.className="firebase-status success";statusEl.innerHTML="<strong>Firebase connected.</strong><br>Realtime Database and Firebase Authentication are active.";}
      setupWrap?.classList.add("hidden");
    }else{
      if(statusEl){statusEl.className="firebase-status";statusEl.innerHTML="<strong>Firebase connected — first setup required.</strong><br>Create new IT/HR Authentication users or link the IT and HR users you already created in Firebase Authentication.";}
      setupWrap?.classList.remove("hidden");
    }
  }catch(error){
    if(statusEl){statusEl.className="firebase-status error";statusEl.textContent=error?.message||"Unable to read Firebase setup status.";}
    setupWrap?.classList.remove("hidden");
  }
}

document.getElementById("initialSetupForm")?.addEventListener("submit",async e=>{
  e.preventDefault();
  const button=e.submitter;if(button)button.disabled=true;
  try{
    await window.OTFirebase.bootstrapInitialAccounts({
      itUsername:document.getElementById("setupITUsername").value.trim().toLowerCase(),
      itPassword:document.getElementById("setupITPassword").value,
      hrUsername:document.getElementById("setupHRUsername").value.trim().toLowerCase(),
      hrPassword:document.getElementById("setupHRPassword").value
    });
    document.getElementById("initialSetupForm").reset();
    showToast("IT and HR Firebase accounts are linked to their system roles. You can sign in now.");
    await initializeFirebaseLoginUI();
  }catch(error){showToast(error?.message||"Initial Firebase setup failed.");}
  finally{if(button)button.disabled=false;}
});

function refreshCurrentUserAccessFromDirectory(){
  if(!currentUser)return false;
  const account=currentUser.uid
    ? getSystemAccountDirectory().find(a=>String(a.uid||"")===String(currentUser.uid||""))
    : getSystemAccountByUsername(currentUser.username);
  if(!account)return false;
  const before=JSON.stringify({role:currentUser.role,moduleAccess:normalizeAdminModuleAccess(currentUser),department:currentUser.department,employeeDepartment:currentUser.employeeDepartment,employeeNo:currentUser.employeeNo,active:currentUser.active});
  currentUser={
    ...currentUser,
    role:account.role||currentUser.role||"Employee",
    moduleAccess:normalizeAdminModuleAccess(account),
    department:account.department||currentUser.department||"",
    employeeDepartment:account.employeeDepartment||account.department||currentUser.employeeDepartment||"",
    employeeNo:account.employeeNo||currentUser.employeeNo||"",
    displayName:account.displayName||account.employeeName||currentUser.displayName||currentUser.username,
    position:account.position||currentUser.position||"",
    active:account.active!==false
  };
  sessionStorage.setItem(SESSION_KEY,JSON.stringify(currentUser));
  const after=JSON.stringify({role:currentUser.role,moduleAccess:normalizeAdminModuleAccess(currentUser),department:currentUser.department,employeeDepartment:currentUser.employeeDepartment,employeeNo:currentUser.employeeNo,active:currentUser.active});
  return before!==after;
}

window.addEventListener("ot-firebase-sync",event=>{
  if(!currentUser)return;
  if(event?.detail?.type==="accounts"){
    const accessChanged=refreshCurrentUserAccessFromDirectory();
    if(currentUser.active===false){showToast("This account was disabled by IT.");logout();return;}
    if(accessChanged)buildNavigation();
  }
  updateITNotificationUI?.();
  updateHRNotificationUI?.();
  updateManagerNotificationUI?.();
  updateSupervisorEmployeeNotificationUI?.();
  updateEmployeeLeaveNotificationUI?.();
  if(!document.hidden)renderPage();
});



loginForm.addEventListener("submit",e=>{
  e.preventDefault();
  login(document.getElementById("username").value,document.getElementById("password").value);
});
document.getElementById("logoutBtn").addEventListener("click",logout);
document.getElementById("employeeMobileLogoutBtn")?.addEventListener("click",logout);



normalizeInteractiveButtonTypes(document);

buildDemoAccounts();
preload();
migrateDirectPendingOTBackToSupervisorReview();
bindManagerNotificationControls();
bindHRNotificationControls();
bindEmployeeLeaveNotificationControls();
bindSupervisorEmployeeNotificationControls();
let lastLeaveAutoSyncDate=toDateKey(new Date());
setInterval(()=>{
  const currentDate=toDateKey(new Date());
  const added=syncAllApprovedLeavesDue();
  const dateChanged=currentDate!==lastLeaveAutoSyncDate;
  if(dateChanged)lastLeaveAutoSyncDate=currentDate;
  if(currentUser && (added || dateChanged) && ["new-request","dashboard","approved","last-cutoff","leave-requests"].includes(currentPage)){
    renderPage();
  }
},60000);
// Browsers require a user gesture before programmatic notification audio can play.
document.addEventListener("keydown",unlockChatNotificationAudio,{once:true,capture:true});
document.addEventListener("click",e=>{
  const button=e.target.closest?.(".show-ph-holiday-calendar");
  if(!button)return;
  openPhilippineHolidayCalendar(button.dataset.calendarDate||toDateKey(new Date()));
});

window.addEventListener("storage",e=>{
  if((e.key===CHAT_STORE_KEY || e.key===CHAT_READ_KEY) && currentUser){
    if(e.key===CHAT_STORE_KEY){
      let newest=null;
      try{
        const rows=JSON.parse(e.newValue||"[]");
        newest=Array.isArray(rows)?[...rows].reverse().find(m=>m.to===currentUser.username):null;
      }catch{}
      if(newest){
        const panel=document.getElementById("chatPanel");
        const isActiveOpen=!panel?.classList.contains("hidden") && activeChatUser===newest.from;
        if(isActiveOpen)markChatRead(newest.from,newest.createdAt);
        else if(newest.createdAt && Date.now()-new Date(newest.createdAt).getTime()<5000){
          const sender=getChatContact(newest.from);
          playChatNotificationSound();
          showToast(`New message from ${sender?.displayName||"Internal Chat"}.`);
        }
      }
    }
    renderInternalChat();
  }
  if(e.key===SUPERVISOR_EMPLOYEE_NOTIFICATION_KEY || e.key===CUSTOM_EMPLOYEES_KEY || e.key===EMPLOYEE_SCHEDULE_KEY || e.key===EMPLOYEE_SHIFT_TIME_KEY || e.key===LEAVE_REQUEST_KEY || e.key===ATTENDANCE_STORE_KEY){
    if(currentUser?.role==="Supervisor"){
      const before=Number(document.getElementById("supervisorNotificationBadge")?.textContent || 0);
      updateSupervisorEmployeeNotificationUI();
      const after=unreadSupervisorEmployeeNotificationCount(currentUser.department);
      if(e.key===SUPERVISOR_EMPLOYEE_NOTIFICATION_KEY && after>before){
        const latest=supervisorNotificationsForDepartment(currentUser.department)[0];
        if(latest?.type==="leave-pending-supervisor")showToast("New employee leave request received for Supervisor approval.");
        else if(String(latest?.type||"").startsWith("leave-final-"))showToast(latest.type==="leave-final-approved"?"Leave request fully approved.":"Leave request rejected.");
        else showToast("HR added a new employee. Schedule setup is required.");
      }
      if(["dashboard","employee-schedule","new-request","leave-requests"].includes(currentPage))renderPage();
    }
  }
  if(e.key===EMPLOYEE_ATTENDANCE_OT_KEY){
    if(currentUser?.role==="Supervisor" && currentPage==="new-request")renderSupervisorEmployeeSubmittedOT();
    if(currentUser?.role==="Employee" && currentPage==="attendance-ot")renderEmployeeAttendanceOT(getCurrentEmployeeRecord());
  }
  if(e.key===EMPLOYEE_LEAVE_NOTIFICATION_KEY && currentUser?.role==="Employee"){
    const before=Number(document.getElementById("employeeNotificationBadge")?.textContent || 0);
    updateEmployeeLeaveNotificationUI();
    const after=unreadEmployeeLeaveNotificationCount(currentUser.employeeNo);
    if(after>before){
      const latest=employeeLeaveNotificationsFor(currentUser.employeeNo)[0];
      if(latest)showToast(latest.title);
    }
    buildNavigation();
  }
  if(e.key===LEAVE_REQUEST_KEY && currentUser?.role==="Employee"){
    if(["dashboard","attendance-ot","file-leave","my-leave"].includes(currentPage))renderPage();
  }
    if(e.key===MANAGER_NOTIFICATION_KEY || e.key===STORE_KEY || e.key===LEAVE_REQUEST_KEY){
    if(currentUser?.role==="Request Approver"){
      const before=Number(document.getElementById("managerNotificationBadge")?.textContent || 0);
      updateManagerNotificationUI();
      const after=unreadManagerNotificationCount();
      if(e.key===MANAGER_NOTIFICATION_KEY && after>before){
        const latest=getManagerNotifications()[0];
        showToast(latest?.type==="leave-pending-gm"?"HR-approved leave request received for final approval.":"New overtime request received for approval.");
      }
      if(["dashboard","approvals","leave-approvals"].includes(currentPage))renderPage();
    }
  }
  if(e.key===HR_NOTIFICATION_KEY || e.key===STORE_KEY || e.key===LEAVE_REQUEST_KEY || e.key===ATTENDANCE_STORE_KEY){
    if(currentUser?.role==="HR"){
      const before=Number(document.getElementById("hrNotificationBadge")?.textContent || 0);
      updateHRNotificationUI();
      const after=unreadHRNotificationCount();
      if(e.key===HR_NOTIFICATION_KEY && after>before){
        const latest=getHRNotifications()[0];
        if(latest?.type==="leave-pending-hr")showToast("Supervisor-approved employee leave received for HR approval.");
        else showToast(latest?.type==="rejected"?"New rejected OT decision received.":"New approved OT decision received.");
      }
      if(["dashboard","approved","leave-approvals","last-cutoff"].includes(currentPage))renderPage();
    }
  }
});

(async function restoreSession(){
  await initializeFirebaseLoginUI();
  const session=sessionStorage.getItem(SESSION_KEY);
  if(!session)return;
  try{
    const saved=JSON.parse(session);
    const fresh=await window.OTFirebase?.restoreSession?.(saved.username);
    if(!fresh)throw new Error("No Firebase session");
    await window.OTFirebase.pullAppData();
    currentUser={username:String(fresh.username||saved.username).toLowerCase(),...fresh};
    showApp();
  }catch{
    sessionStorage.removeItem(SESSION_KEY);
  }
})();
