// BLOG LOADER
async function loadBlogPosts() {
  const container = document.getElementById("blog-list");
  if (!container) return;

  // List of blog post data files to load, newest first
  const postFiles = [
    "content/blog/post-1.json"
  ];

  const posts = [];

  for (const file of postFiles) {
    try {
      const res = await fetch(file);
      if (!res.ok) continue;
      const data = await res.json();
      posts.push(data);
    } catch (err) {
      console.warn("Could not load", file, err);
    }
  }

  // Clear anything that was there
  container.innerHTML = "";

  // Build each article card in the same style as before
  posts.forEach(post => {
    const card = document.createElement("article");
    card.className = "card post";

    card.innerHTML = `
      <div class="media">
        <span class="badge cat">${post.category || ""}</span>
        <span class="badge time">${post.readTime || ""}</span>
        <img src="${post.image || "assets/sample-1.jpg"}" alt="" />
      </div>
      <div class="card-body">
        <h3>${post.title}</h3>
        <p>${post.summary}</p>
        <div class="meta">
          <span class="author">${post.author || ""}</span>
          <span class="date">${post.date || ""}</span>
        </div>
        <a class="read-more" href="${post.link || "#"}">Read More →</a>
      </div>
    `;

    container.appendChild(card);
  });
}

// FOOTER YEAR
function setYear() {
  const y = document.getElementById("year");
  if (y) {
    y.textContent = new Date().getFullYear();
  }
}

// CONTACT MODAL
function initContactModal() {
  const openBtn = document.getElementById("open-contact");
  const closeBtn = document.getElementById("close-contact");
  const modal = document.getElementById("contact-modal");

  if (!openBtn || !closeBtn || !modal) return;

  openBtn.addEventListener("click", () => modal.showModal());
  closeBtn.addEventListener("click", () => modal.close());
}

// MOBILE MENU
function initHamburger() {
  const burger = document.getElementById("hamburger");
  const menu = document.getElementById("mobile-menu");
  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", !expanded);
    if (expanded) {
      menu.hidden = true;
    } else {
      // clone desktop nav into mobile drawer
      const navList = document.getElementById("nav-list").cloneNode(true);
      navList.classList.add("mobile-nav-clone");
      menu.innerHTML = "";
      menu.appendChild(navList);
      menu.hidden = false;
    }
  });
}

// CLOCK (CEST)
function initClockCEST() {
  const cestEl = document.querySelector("#clock-cest span");
  if (!cestEl) return;
  function update() {
    const now = new Date();
    const opts = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Zurich" };
    cestEl.textContent = new Intl.DateTimeFormat("en-GB", opts).format(now) + " CEST";
  }
  update();
  setInterval(update, 60000);
}

// RUN ON PAGE LOAD
document.addEventListener("DOMContentLoaded", () => {
  setYear();
  initContactModal();
  initHamburger();
  initClockCEST();
  loadBlogPosts();
});
