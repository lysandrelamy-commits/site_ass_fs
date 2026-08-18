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

// ==========================================
// CONFIGURATION SUPABASE & FORMULAIRE SPONSOR
// ==========================================

// Remplacez ces valeurs par vos identifiants Supabase
const SUPABASE_URL = 'https://idaveivxkjibcarhcanl.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkYXZlaXZ4a2ppYmNhcmhjYW5sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwNjA4MDksImV4cCI6MjEwMjYzNjgwOX0.kyqeY7cL023PwYBWZn9TDXCtzkb2s7XNYw_Bg5QuIIM';

// Initialisation du client
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Détection de l'élément formulaire sur la page
document.addEventListener('DOMContentLoaded', () => {
  const sponsorForm = document.getElementById('form-sponsor');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('btn-submit');

  // Si le formulaire est présent sur la page courante
  if (sponsorForm) {
    sponsorForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // État de chargement
      if (submitBtn) submitBtn.disabled = true;
      if (formStatus) {
        formStatus.style.color = '#333';
        formStatus.textContent = 'Envoi en cours...';
      }

      // Récupération des données du formulaire
      const nom = document.getElementById('nom').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      try {
        // Envoi à la table SQL 'sponsors'
        const { data, error } = await supabase
          .from('sponsors')
          .insert([{ nom: nom, email: email, message: message }]);

        if (error) throw error;

        // Message de succès
        if (formStatus) {
          formStatus.style.color = 'green';
          formStatus.textContent = '✅ Message envoyé avec succès !';
        }
        sponsorForm.reset();

      } catch (error) {
        console.error('Erreur d\'envoi Supabase :', error);
        if (formStatus) {
          formStatus.style.color = 'red';
          formStatus.textContent = '❌ Erreur lors de l\'envoi. Veuillez réessayer.';
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }
});

