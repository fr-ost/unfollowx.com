(() => {
  const root = document.documentElement;
  const key = 'unfollowx-theme';
  const saved = () => { try { return localStorage.getItem(key) || 'system'; } catch { return 'system'; } };
  const applyTheme = () => {
    const pref = saved();
    const dark = pref === 'dark' || (pref === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset.theme = dark ? 'dark' : 'light';
    root.style.colorScheme = dark ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#090d16' : '#f4f6fb');
  };
  applyTheme();
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', () => { if (saved() === 'system') applyTheme(); });
  document.querySelectorAll('.topbar').forEach(header => {
    let actions = header.querySelector('.nav-actions');
    if (!actions) {
      actions = document.createElement('div'); actions.className = 'nav-actions';
      const cta = header.querySelector('.nav-cta');
      if (cta) { cta.parentNode.insertBefore(actions, cta); actions.appendChild(cta); }
      else header.appendChild(actions);
      const toggle = document.createElement('button'); toggle.className = 'theme-toggle'; toggle.setAttribute('aria-label','Switch color theme'); toggle.title = 'Switch color theme'; toggle.innerHTML = '<span class="theme-sun">☼</span><span class="theme-moon">☾</span>';
      actions.insertBefore(toggle, actions.firstChild);
    }
  });
  document.querySelectorAll('.theme-toggle').forEach(button => button.addEventListener('click', () => {
    const isDark = root.dataset.theme === 'dark';
    try { localStorage.setItem(key, isDark ? 'light' : 'dark'); } catch {}
    applyTheme();
  }));
  const mobileToggle = document.querySelector('.mobile-toggle'), nav = document.querySelector('.nav');
  if (mobileToggle && nav) mobileToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); mobileToggle.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('.faq-q').forEach(q => q.addEventListener('click', () => { const item=q.closest('.faq-item'); item.classList.toggle('open'); q.setAttribute('aria-expanded',String(item.classList.contains('open'))); }));
  document.querySelectorAll('.faq-cats button').forEach(button => button.addEventListener('click', () => {
    document.querySelector('.faq-cats .active')?.classList.remove('active'); button.classList.add('active');
    document.querySelectorAll('.faq-item').forEach(item => item.hidden = button.dataset.cat !== 'all' && item.dataset.cat !== button.dataset.cat);
  }));
  const samples = {
    non: [
      ['A','avatar-purple','Atlas Archive','@atlasarchive','Doesn’t follow back'],
      ['M','avatar-orange','Monday Studio','@mondaystudio','Last post · 8 mo ago'],
      ['N','avatar-green','Northbound','@northbound','Doesn’t follow back']
    ],
    mutual: [
      ['L','avatar-green','Lena Park','@lenapark','Follows you back'],
      ['O','avatar-purple','Open Field','@openfield','Follows you back'],
      ['J','avatar-orange','Juniper House','@juniperhouse','Follows you back']
    ],
    inactive: [
      ['M','avatar-orange','Monday Studio','@mondaystudio','Last post · 8 mo ago'],
      ['B','avatar-purple','Blue Hour Notes','@bluehour','Last post · 5 mo ago'],
      ['W','avatar-green','Westward Journal','@westward','Last post · 4 mo ago']
    ]
  };
  const list = document.querySelector('#accountList');
  document.querySelectorAll('.account-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelector('.account-tab.selected')?.classList.remove('selected'); tab.classList.add('selected');
    if (!list) return;
    list.replaceChildren(...samples[tab.dataset.view].map(([initial,avatar,name,handle,status]) => {
      const row=document.createElement('div'); row.className='account-row';
      row.innerHTML=`<span class="user-avatar ${avatar}">${initial}</span><span class="user-info"><b>${name}</b><small>${handle}</small></span><span class="row-status">${status}</span><button class="row-keep" aria-label="Keep ${name}">♡</button>`;
      row.querySelector('.row-keep').addEventListener('click', e => { const b=e.currentTarget; b.classList.toggle('kept'); b.textContent=b.classList.contains('kept')?'♥':'♡'; });
      return row;
    }));
  }));
  document.querySelectorAll('.row-keep').forEach(button => button.addEventListener('click', () => { button.classList.toggle('kept'); button.textContent=button.classList.contains('kept')?'♥':'♡'; }));
  const scan = document.querySelector('#scanButton');
  if (scan) scan.addEventListener('click', () => { scan.classList.add('scanning'); scan.innerHTML='<span>↻</span> <b>Refreshing preview…</b>'; setTimeout(() => { scan.classList.remove('scanning'); scan.innerHTML='<span>✓</span> <b>Preview refreshed</b>'; const stamp=document.querySelector('.app-foot'); if(stamp) stamp.firstElementChild.textContent='Preview · just refreshed'; setTimeout(()=>scan.innerHTML='<span>↻</span> <b>Preview scan</b>',1800); },850); });
  const review = document.querySelector('#reviewButton');
  if (review) review.addEventListener('click', () => { review.innerHTML='Opening Chrome Web Store <span>↗</span>'; setTimeout(()=>location.href='https://chromewebstore.google.com/detail/x-twitter-mass-unfollow-t/igpjmagghnibmjkkdcgpjgpkfkpiglnl',350); });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12});
    document.querySelectorAll('.journey-card,.insight-card,.blog-card,.privacy-card').forEach(el=>{el.classList.add('reveal');observer.observe(el);});
  }
  const windowCard=document.querySelector('#productWindow');
  if(windowCard && matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    const visual=windowCard.closest('.hero-visual'); visual.addEventListener('pointermove',event=>{const r=visual.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;windowCard.style.transform=`rotateY(${-5+x*5}deg) rotateX(${2-y*4}deg) translateY(-2px)`;});
    visual.addEventListener('pointerleave',()=>windowCard.style.transform='rotateY(-5deg) rotateX(2deg)');
  }
})();
