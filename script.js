// CLOCK / DATE / YEAR
function updateClock() {
  const clockEl = document.getElementById("clockCEST");
  if (!clockEl) return;

  // Europe/Zurich is CET/CEST; browser might already be correct but we'll label it
  const now = new Date();
  const dayOptions = { weekday: "long", month: "long", day: "numeric" };
  const dayPart = now.toLocaleDateString("en-GB", dayOptions);
  const timePart = now
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/^0/, "");

  clockEl.textContent = `${dayPart} — ${timePart} CEST`;
}

// very simple placeholders for Islamic/Hindi calendar display
function updateAltCalendars() {
  const islamicEl = document.getElementById("islamicDate");
  const hindiEl = document.getElementById("hindiDate");
  const now = new Date();

  // These are NOT true conversions.
  // Replace later with proper calendar conversion logic or API.
  if (islamicEl) {
    islamicEl.textContent = `Islamic: ${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()} (approx)`;
  }
  if (hindiEl) {
    hindiEl.textContent = `Hindi: ${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()} (approx)`;
  }
}

// footer year
function setYear() {
  const yearEl = document.getElementById("yearNow");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

// SIMPLE DROPDOWN SUPPORT FOR TOUCH
// We let touch/click toggle "open" class.
document.addEventListener("click", (e) => {
  const item = e.target.closest(".nav-item");
  const outsideAny = !e.target.closest(".nav-item");

  document.querySelectorAll(".nav-item").forEach((li) => {
    if (li !== item || outsideAny) {
      li.classList.remove("open");
    }
  });

  if (item && e.target.closest(".nav-btn")) {
    e.preventDefault();
    item.classList.toggle("open");
  }
});

// reflect "open" class in CSS by forcing display block
// (this way hover still works on desktop via CSS, and click works mobile)
const style = document.createElement("style");
style.textContent = `
  .nav-item.open .dropdown-menu {
    display: block;
  }
`;
document.head.appendChild(style);

// CONTACT MODAL
const modal = document.getElementById("contactModal");
const openModalBtns = [
  document.getElementById("openContactModal"),
  document.getElementById("openContactModalFromNav"),
];
const closeModalBtns = [
  document.getElementById("closeContactModal"),
  document.getElementById("closeModalAlt"),
];

openModalBtns.forEach((btn) => {
  if (!btn) return;
  btn.addEventListener("click", () => {
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  });
});
closeModalBtns.forEach((btn) => {
  if (!btn) return;
  btn.addEventListener("click", () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  });
});
// click overlay to close
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    }
  });
}

// LOAD POSTS FROM /content/posts/*.json
async function loadPosts() {
  const container = document.getElementById("postsContainer");
  if (!container) return;

  // Which posts to load:
  const postFiles = ["content/posts/post-1.json", "content/posts/post-2.json"];

  for (const file of postFiles) {
    try {
      const res = await fetch(file);
      if (!res.ok) continue;
      const data = await res.json();
      renderPostCard(data, container);
    } catch (err) {
      console.warn("Could not load", file, err);
    }
  }
}

function renderPostCard(post, container) {
  /* post = {
      title, date, region, category, excerpt, thumbnail
    } */
  const card = document.createElement("article");
  card.className = "post-card";

  const imgSrc = post.thumbnail || "assets/sample-thumb-1.jpg";

  card.innerHTML = `
    <img src="${imgSrc}" alt="" class="post-thumb" />
    <div class="post-body">
      <div class="post-meta">
        <span>${post.date}</span>
        <span>•</span>
        <span>${post.region}</span>
        <span>•</span>
        <span>${post.category}</span>
      </div>
      <div class="post-title">${post.title}</div>
      <div class="post-desc">${post.excerpt}</div>
    </div>
  `;

  container.appendChild(card);
}

// INIT
updateClock();
updateAltCalendars();
setYear();
loadPosts();

// keep clock fresh
setInterval(updateClock, 1000);
