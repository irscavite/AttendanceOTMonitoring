(function(){
  const init = () => {
    if (document.getElementById('halloweenDecorLayer')) return;
    const layer = document.createElement('div');
    layer.id = 'halloweenDecorLayer';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = [
      '<span class="hd-web hd-web-left"></span>',
      '<span class="hd-web hd-web-right"></span>',
      '<span class="hd-ghost hd-ghost-right"></span>',
      '<span class="hd-pumpkin hd-pumpkin-left"></span>',
      '<span class="hd-pumpkin hd-pumpkin-right"></span>'
    ].join('');
    document.body.appendChild(layer);
    if (document.getElementById('loginView')) document.body.classList.add('halloween-login-enabled');
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
