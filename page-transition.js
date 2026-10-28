(function(){
  'use strict';
  const shell=document.getElementById('emsTransition');
  if(!shell)return;
  let done=false;
  function ready(){if(done)return;done=true;shell.classList.add('ems-ready');setTimeout(()=>shell.remove(),260);}
  function check(){
    const app=document.getElementById('appView');
    if(!app || app.classList.contains('hidden'))return;
    const content=document.getElementById('content');
    if(content && /Loading your workspace/i.test(content.textContent||'') && content.textContent.trim().length<90)return;
    ready();
  }
  const observer=new MutationObserver(check);
  observer.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style']});
  const timer=setInterval(()=>{check();if(done){observer.disconnect();clearInterval(timer);}},250);
  check();
  // Prefetch only the next module that the user points at, not all 30 pages.
  const prefetched=new Set();
  function prefetch(page){
    const route=window.OT_PAGE_ROUTES?.[page];
    if(!route||prefetched.has(route)||route===location.pathname.split('/').pop())return;
    prefetched.add(route);
    const l=document.createElement('link');l.rel='prefetch';l.href=route;l.as='document';document.head.appendChild(l);
  }
  document.addEventListener('pointerover',e=>{
    const btn=e.target.closest?.('[data-page]');
    if(btn && btn.closest('#sideNav'))prefetch(btn.dataset.page);
  },{passive:true});
  document.addEventListener('click',e=>{
    const btn=e.target.closest?.('[data-page]');
    if(!btn||!btn.closest('#sideNav'))return;
    const next=window.OT_PAGE_ROUTES?.[btn.dataset.page];
    if(!next||next===location.pathname.split('/').pop())return;
    const msg=document.getElementById('emsLoadingText');if(msg)msg.textContent='Opening '+btn.textContent.trim()+'…';
    shell.classList.remove('ems-ready');
    if(!shell.isConnected)document.body.appendChild(shell);
  },true);
})();