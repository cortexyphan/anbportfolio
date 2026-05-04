(function () {
  const grid = document.getElementById('skills-grid');
  if (!grid) return;

  // Apri card
  grid.querySelectorAll('.skill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.skill-card');
      // Dai alla griglia un'altezza fissa pari alla sua altezza attuale
      // così lo spazio non collassa quando le altre card spariscono
      grid.style.minHeight = grid.offsetHeight + 'px';
      grid.classList.add('has-expanded');
      card.classList.add('is-expanded');
    });
  });

  // Chiudi card
  grid.querySelectorAll('.skill-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.skill-card');
      card.classList.remove('is-expanded');
      grid.classList.remove('has-expanded');
      grid.style.minHeight = '';
    });
  });

  // Chiudi anche premendo Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      grid.querySelectorAll('.skill-card.is-expanded').forEach(c => c.classList.remove('is-expanded'));
      grid.classList.remove('has-expanded');
      grid.style.minHeight = '';
    }
  });
})();