// CLOCK + CALENDARS
function updateClockAndCalendars() {
  const clockEl = document.getElementById('clockCEST');
  const islamicEl = document.getElementById('islamicDate');
  const hindiEl = document.getElementById('hindiDate');
  const now = new Date();

  // Format: "Sunday, 2 November 2025 — CEST"
  // We'll derive weekday, date, month, year.
  const weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const weekday = weekdayNames[now.getDay()];
  const day = now.getDate();
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();

  // CEST/CET label: We're in Europe/Zurich (can flip between CET/CEST depending on DST).
  // We'll just show "CEST" for branding consistency.
  const clockText = `${weekday}, ${day} ${month} ${year} — CEST`;
  if (clockEl) clockEl.textContent = clockText;

  // PLACEHOLDER Islamic / Hindi calendar.
  // Later we can compute true Hijri / Vikram Samvat conversion. For now we just show
  // "1447 AH" and "Vikram Samvat 2082" style strings.
  if (islamicEl) islamicEl.textContent = "Islamic: 10 Rabiʿ al-Thani 1447 AH";
  if (hindiEl) hinduText = "Hindi: Kartik 11, Vikram Samvat 2082";
  if (hindiEl) hindiEl.textContent = hinduText;
}

updateClockAndCalendars();
setInterval(updateClockAndCalendars, 60 * 1000);

// YEAR IN FOOTER
const yearNowEl = document.getElementById('yearNow');
if (yearNowEl) {
  yearNowEl.textContent = new Date().getFullYear();
}

// BACK TO TOP
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// CONTACT MODAL
const contactModal = document.getElementById('contactModal');
const openContactButtons = [
  document.getElementById('openContactForm'),
  document.getElementById('openContactFormFooter'),
];
const closeContactButtons = [
  document.getElementById('closeContactModal'),
  document.getElementById('closeContactModalBottom'),
];

openContactButtons.forEach(btn => {
  if (!btn) return;
  btn.addEventListener('click', () => {
    contactModal.style.display = 'flex';
    contactModal.setAttribute('aria-hidden', 'false');
  });
});

closeContactButtons.forEach(btn => {
  if (!btn) return;
  btn.addEventListener('click', () => {
    contactModal.style.display = 'none';
    contactModal.setAttribute('aria-hidden', 'true');
  });
});

// close modal when clicking outside window
if (contactModal) {
  contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
      contactModal.style.display = 'none';
      contactModal.setAttribute('aria-hidden', 'true');
    }
  });
}

// MOBILE NAV BEHAVIOR
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');

if (mobileMenuToggle && mainNav) {
  mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    if (mainNav.classList.contains('open')) {
      mainNav.style.height = 'auto';
    } else {
      mainNav.style.height = '';
    }
  });
}

// TOUCH dropdowns on mobile
// On small screens, tapping a .has-dropdown > .nav-link should toggle its menu
function setupMobileDropdowns() {
  const dropdownParents = document.querySelectorAll('.has-dropdown');
  dropdownParents.forEach(parent => {
    const trigger = parent.querySelector('.nav-link');
    const menu = parent.querySelector('.dropdown-menu');
    if (!trigger || !menu) return;

    trigger.addEventListener('click', (e) => {
      // Prevent navigation
      e.preventDefault();
      // toggle
      const isVisible = menu.style.display === 'block';
      // close all others first
      document.querySelectorAll('.dropdown-menu').forEach(m => {
        m.style.display = 'none';
      });
      // open this one if it was closed
      if (!isVisible) {
        menu.style.display = 'block';
      }
    });
  });
}
setupMobileDropdowns();
