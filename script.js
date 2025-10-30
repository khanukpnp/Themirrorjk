// CLOCK + CALENDARS
function updateClockAndCalendars() {
  const clockEl = document.getElementById("live-clock");
  const islamicEl = document.getElementById("islamic-date");
  const hindiEl = document.getElementById("hindi-date");

  const now = new Date();

  // Clock (CEST label fixed as requested)
  const weekday = now.toLocaleDateString("en-GB", { weekday: "long" });
  const month = now.toLocaleDateString("en-GB", { month: "short" });
  const dayNum = now.getDate();
  const timeStr = now.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  clockEl.textContent = `${weekday}, ${month} ${dayNum} — CEST ${timeStr}`;

  // Islamic calendar (approx, civil tabular; offline fallback)
  // We generate a rough Hijri date based on known offset.
  // NOTE: This is approximation. For accuracy later you can call API.
  const hijriApprox = approxHijri(now);
  islamicEl.textContent = `Islamic: ${hijriApprox}`;

  // Hindi calendar label (we'll show Indian-style DD.MM.YYYY for now)
  const dd = String(dayNum).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  hindiEl.textContent = `Hindi: ${dd}.${mm}.${yyyy}`;
}

function approxHijri(gregDate) {
  // very rough conversion using days offset
  // source algorithm: Kuwaiti algorithm style approximation
  const msPerDay = 24 * 60 * 60 * 1000;
  const hijriEpoch = new Date(Date.UTC(622, 6, 16)); // 16 July 622
  const days = Math.floor((gregDate - hijriEpoch) / msPerDay);
  const hijriYear = Math.floor(days / 354.367);
  const hijriDayOfYear = days - Math.floor(hijriYear * 354.367);
  const hijriMonth = Math.floor(hijriDayOfYear / 29.53);
  const hijriDay = Math.floor(hijriDayOfYear - hijriMonth * 29.53) + 1;
  return `${hijriDay}.${hijriMonth + 1}.${hijriYear + 1}`;
}

// YEAR IN FOOTER
function setYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

// CONTACT MODAL
function setupContactModal() {
  const modal = document.getElementById("contact-modal");
  const openBtns = [
    document.getElementById("contact-open"),
    document.getElementById("contact-open-footer"),
  ].filter(Boolean);
  const closeBtn = document.getElementById("contact-close");
  const exitBtn = document.getElementById("contact-exit");
  const backdrop = modal.querySelector(".modal-backdrop");

  function open() {
    modal.classList.remove("hidden");
  }
  function close() {
    modal.classList.add("hidden");
  }

  openBtns.forEach((btn) => btn && btn.addEventListener("click", open));
  if (closeBtn) closeBtn.addEventListener("click", close);
  if (exitBtn) exitBtn.addEventListener("click", close);
  if (backdrop) backdrop.addEventListener("click", close);
}

// DARK MODE
function setupDarkToggle() {
  const toggleBtn = document.getElementById("dark-toggle");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
}

// SHARE BUTTON
function setupShare() {
  const shareBtn = document.querySelector(".share-btn");
  if (!shareBtn) return;
  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: "The Mirror Jammu Kashmir",
      text: "Champion justice & amplify the voices of the unheard.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        console.warn("Share cancelled", e);
      }
    } else {
      alert("Copy this link:\n" + window.location.href);
    }
  });
}

// TICKER CONTENT
function loadTicker() {
  // In future this can come from CMS.
  // For now we hardcode demo items.
  const headlines = [
    "UN experts raise alarm over civilian detentions in Jammu & Kashmir",
    "The Mirror JK calls for independent investigation into disappearances",
    "Global solidarity campaign to reach 33 capitals starts this week",
  ];

  const tickerEl = document.getElementById("ticker-content");
  tickerEl.textContent = " " + headlines.join("   •   ") + "   •   ";
}

// BLOG LIST LOADER (reads /posts/*.md headers)
async function loadBlogPosts() {
  const blogList = document.getElementById("blog-list");
  if (!blogList) return;

  // If you don't have dynamic fetch due to static hosting,
  // you can manually maintain an array here or later replace with Netlify function.
  // We'll just show one demo post from /posts/example-post-1.md:

  const demoPost = {
    title:
      "Voices from the Valley: Testimony on arbitrary detentions and media blackout",
    excerpt:
      "Families describe night raids, communication shutdowns, and fear. We document what officials deny.",
    date: "30 Oct 2025",
    tag: "Human Rights",
    thumb: "assets/sample-thumb2.jpg",
  };

  blogList.innerHTML = `
    <article class="blog-card">
      <img src="${demoPost.thumb}" alt="thumb" class="blog-thumb" />
      <div class="blog-body">
        <h3 class="blog-headline">${demoPost.title}</h3>
        <p class="blog-excerpt">${demoPost.excerpt}</p>
        <div class="blog-meta">
          <span class="blog-date">${demoPost.date}</span>
          <span class="blog-tag">${demoPost.tag}</span>
        </div>
      </div>
    </article>
  `;
}

// VLOG LOADER (reads /vlog/*.json)
async function loadVlog() {
  const vlogWrap = document.getElementById("vlog-embed");
  if (!vlogWrap) return;

  // Same logic: demo data for now.
  const demoVlog = {
    youtubeId: "dQw4w9WgXcQ",
    title: "Statement to International Community on Kashmir Human Rights",
    date: "30 Oct 2025",
  };

  vlogWrap.innerHTML = `
    <div class="video-wrapper">
      <iframe
        class="yt-frame"
        src="https://www.youtube.com/embed/${demoVlog.youtubeId}?rel=0"
        title="YouTube video"
        allowfullscreen
        loading="lazy"
      ></iframe>
    </div>
    <div class="vlog-meta">
      <div class="vlog-title">${demoVlog.title}</div>
      <div class="vlog-date">${demoVlog.date}</div>
    </div>
  `;
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  updateClockAndCalendars();
  setInterval(updateClockAndCalendars, 60000); // update every min

  setYear();
  setupContactModal();
  setupDarkToggle();
  setupShare();
  loadTicker();
  loadBlogPosts();
  loadVlog();
});
