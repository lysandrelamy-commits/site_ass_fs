(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  function updateNav() {
    if (window.scrollY > 40) { nav.classList.add('solid'); nav.classList.remove('transparent'); }
    else { nav.classList.remove('solid'); nav.classList.add('transparent'); }
  }
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
})();

function toggleMobileMenu() {
  const menu = document.getElementById('mobileNav');
  if (menu) menu.classList.toggle('open');
}
document.addEventListener('click', e => {
  const menu = document.getElementById('mobileNav');
  const burger = document.querySelector('.nav-burger');
  if (menu && burger && !menu.contains(e.target) && !burger.contains(e.target)) menu.classList.remove('open');
});

(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}
(function () {
  const section = document.querySelector('.stats-section');
  if (!section) return;
  const obs = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); } }, { threshold: 0.5 });
  obs.observe(section);
})();
