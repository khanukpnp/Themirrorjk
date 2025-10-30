// CLOCK + CALENDARS DEMO
function updateClock() {
  const clockEl = document.getElementById("clockCEST");
  if (!clockEl) return;
  const now = new Date();
  // We'll just render a friendly format like "Thu, Oct 30 — CEST"
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const dayName = days[now.getDay()];
  const monthName = months[now.getMonth()];
  const dateNum = now.getDate();
  clockEl.textContent = `${dayName}, ${monthName} ${dateNum} — CEST`;
}
updateClock();
setInterval(updateClock, 60000);

// Placeholder Islamic/Hindu calendar text
const islamicEl = document.getElementById("islamicCal");
if (islamicEl) {
  islamicEl.textContent = "Islamic: 5 Rabi' al-Thani 1447 (example)";
}
const hinduEl = document.getElementById("hinduCal");
if (hinduEl) {
  hinduEl.textContent = "Hindu: Kartik, Shukla Paksha (example)";
}

// CONTACT MODAL
const contactModal = document.getElementById("contactModal");
const openContact = document.getElementById("openContact");
const closeContact = document.getElementById("closeContact");

if (openContact && contactModal) {
  openContact.addEventListener("click", () => {
    contactModal.classList.remove("hidden");
  });
}
if (closeContact && contactModal) {
  closeContact.addEventListener("click", () => {
    contactModal.classList.add("hidden");
  });
}

// SIMPLE SEARCH DEMO
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", () => {
    alert("Search for: " + searchInput.value);
  });
}
