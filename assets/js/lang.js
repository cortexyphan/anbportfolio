
(function () {
  const section = document.getElementById('languages');
  if (!section) return;

  const flagBtns  = section.querySelectorAll('.lang-flag-btn');
  const barGroups = section.querySelectorAll('.lang-bars');
  // NON pre-selezioniamo le note qui — le cerchiamo ogni volta

function switchLang(lang) {
    // Bottoni
    flagBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === lang));

    // Barre
    barGroups.forEach(g => {
      const isActive = g.dataset.lang === lang;
      g.classList.toggle('active', isActive);
      if (isActive) {
        g.querySelectorAll('.lang-bar-fill').forEach(fill => {
          fill.style.width = '0';
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              fill.style.width = fill.dataset.w;
            });
          });
        });
      } else {
        g.querySelectorAll('.lang-bar-fill').forEach(fill => {
          fill.style.width = '0';
        });
      }
    });

    // Note
    section.querySelectorAll('.lang-note').forEach(n => {
      n.classList.toggle('active', n.dataset.lang === lang);
    });

    // Sfondo lang-panel
    const panel = section.querySelector('.lang-panel');
    panel.className = 'lang-panel lang-panel--' + lang;
  }

  flagBtns.forEach(btn => {
    btn.addEventListener('click', () => switchLang(btn.dataset.lang));
  });

  const initObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        switchLang('it');
        initObs.disconnect();
      }
    });
  }, { threshold: .2 });
  initObs.observe(section);
})();