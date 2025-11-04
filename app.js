// ===== 1) Modo oscuro con memoria =====
const root = document.documentElement;
const themeBtn = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
  root.classList.add('dark');
  if (themeBtn) themeBtn.textContent = '☀️';
}

themeBtn?.addEventListener('click', () => {
  root.classList.toggle('dark');
  const isDark = root.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '☀️' : '🌙';
});

// ===== 2) Menú mobile =====
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn?.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
});

// ===== 3) Animaciones on-scroll (reveal) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('show'); });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== 4) Validación de email + envío simulado =====
const form = document.getElementById('contactForm');
const email = document.getElementById('email');
const emailError = document.getElementById('emailError');
const sendBtn = document.getElementById('sendBtn');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');
const successMsg = document.getElementById('successMsg');

function validarEmail(valor) {
  // Simple y bastante permisivo (bueno para UX general)
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(valor);
}

email?.addEventListener('input', () => {
  if (email.value && !validarEmail(email.value)) {
    emailError.classList.remove('hidden');
    email.setAttribute('aria-invalid', 'true');
  } else {
    emailError.classList.add('hidden');
    email.removeAttribute('aria-invalid');
  }
});

form?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validarEmail(email.value)) {
    emailError.classList.remove('hidden');
    email.focus();
    return;
  }

  // Feedback inmediato
  sendBtn.disabled = true;
  btnText.textContent = 'Enviando...';
  btnSpinner.classList.remove('hidden');

  // Simulación de petición (reemplaza por fetch a tu API)
  await new Promise(r => setTimeout(r, 1200));

  btnText.textContent = 'Enviar';
  btnSpinner.classList.add('hidden');
  sendBtn.disabled = false;
  form.reset();
  successMsg.classList.remove('hidden');
  setTimeout(() => successMsg.classList.add('hidden'), 4000);
});

// ===== 5) Año automático =====
document.getElementById('year').textContent = new Date().getFullYear();
