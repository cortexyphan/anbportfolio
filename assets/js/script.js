  // Scroll reveal
  const obs = new IntersectionObserver(e => {
    e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); });
  }, { threshold: .1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Skill bars
  const barObs = new IntersectionObserver(e => {
    e.forEach(x => {
      if (x.isIntersecting) {
        const b = x.target.querySelector('.skill-bar');
        if (b) b.style.width = b.dataset.w;
      }
    });
  }, { threshold: .3 });
  document.querySelectorAll('.skill-card').forEach(el => barObs.observe(el));

  // Lang bars
  const langObs = new IntersectionObserver(e => {
    e.forEach(x => {
      if (x.isIntersecting)
        x.target.querySelectorAll('.lang-fill').forEach(b => b.style.width = b.dataset.w);
    });
  }, { threshold: .2 });
  document.querySelectorAll('.lang-card').forEach(el => langObs.observe(el));

  // Nav active link highlight
  const secs = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if (scrollY >= s.offsetTop - 80) cur = s.id; });
    links.forEach(a => { a.style.color = a.getAttribute('href') === '#' + cur ? 'var(--text)' : ''; });
  });

  // Chiude il menu mobile quando si clicca una voce
  (function () {
    const menuBtn = document.getElementById('menu-btn');
    if (!menuBtn) return;

    document.querySelectorAll('.menu li a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.checked = false;  // deseleziona la checkbox → menu si chiude
      });
    });
  })();

  // Form validation & submission
  function validate() {
    let ok = true;
    const rules = [
      { id: 'f-name',    check: () => document.getElementById('inp-name').value.trim().length > 1 },
      { id: 'f-email',   check: () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('inp-email').value.trim()) },
      { id: 'f-subject', check: () => document.getElementById('inp-subject').value !== '' },
      { id: 'f-msg',     check: () => document.getElementById('inp-msg').value.trim().length > 9 },
    ];
    rules.forEach(r => {
      const el = document.getElementById(r.id);
      if (r.check()) { el.classList.remove('error'); }
      else           { el.classList.add('error'); ok = false; }
    });
    return ok;
  }

  ['inp-name','inp-email','inp-subject','inp-msg'].forEach(id => {
    const el = document.getElementById(id);
    el.addEventListener('input',  () => el.closest('.field').classList.remove('error'));
    el.addEventListener('change', () => el.closest('.field').classList.remove('error'));
  });

  function handleSubmit() {
    const status = document.getElementById('form-status');
    const btn    = document.getElementById('send-btn');
    status.className = 'form-status';
    status.style.display = 'none';
    if (!validate()) return;
    btn.classList.add('loading');
    btn.disabled = true;
    // Sostituisci il setTimeout con una chiamata reale (Formspree, EmailJS, ecc.)
    setTimeout(() => {
      btn.classList.remove('loading');
      btn.disabled = false;
      status.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Messaggio inviato!';
      status.className = 'form-status ok';
      status.style.display = 'flex';
      document.getElementById('inp-name').value    = '';
      document.getElementById('inp-email').value   = '';
      document.getElementById('inp-subject').value = '';
      document.getElementById('inp-msg').value     = '';
      setTimeout(() => { status.style.display = 'none'; }, 5000);
    }, 1400);
  }