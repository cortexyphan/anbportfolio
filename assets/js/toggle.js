(function () {
  // Cerca tutti i .cert-item nell'intera sezione #skills,
  // non solo dentro .cert-list — così funziona anche per
  // gli item fuori dalla lista (es. "percorsi recenti")
  const skillsSection = document.querySelector('#skills');
  if (!skillsSection) return;

  skillsSection.querySelectorAll('.cert-item .cert-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.cert-item');
      const isAlreadyOpen = item.classList.contains('is-open');

      // Chiudi tutti i pannelli aperti nell'intera sezione
      skillsSection.querySelectorAll('.cert-item.is-open').forEach(open => {
        open.classList.remove('is-open');
      });

      // Se non era già aperto, aprilo
      if (!isAlreadyOpen) {
        item.classList.add('is-open');
      }
    });
  });
})();