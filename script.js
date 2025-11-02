function updateHeaderInfo() {
  const now = new Date();

  // Full date+time
  const nowDateTimeEl = document.getElementById("nowDateTime");
  if (nowDateTimeEl) {
    const weekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const weekday = weekdayNames[now.getDay()];
    const day = now.getDate();
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    const hh = now.getHours().toString().padStart(2,"0");
    const mm = now.getMinutes().toString().padStart(2,"0");
    const ss = now.getSeconds().toString().padStart(2,"0");

    nowDateTimeEl.textContent = `${weekday} ${day} ${month} ${year} • ${hh}:${mm}:${ss}`;
  }

  const clockIST = document.getElementById("clockIST");
  const clockPKT = document.getElementById("clockPKT");
  if (clockIST) {
    const ist = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false, timeZone: "Asia/Kolkata"
    }).format(now);
    clockIST.textContent = `IST (JKL): ${ist}`;
  }
  if (clockPKT) {
    const pkt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false, timeZone: "Asia/Karachi"
    }).format(now);
    clockPKT.textContent = `PKT (GBM): ${pkt}`;
  }

  const hijriEl = document.getElementById("hijriDate");
  const vikramEl = document.getElementById("vikramDate");
  if (hijriEl) {
    hijriEl.textContent = "Jumada I 12, 1447 AH"; // keep your current value if you already compute it
  }
  if (vikramEl) {
    vikramEl.textContent = "Magha 2, 2082 VS";    // keep your current value if you already compute it
  }

  // Weather placeholders; if you already update these from somewhere else, keep that.
  const w = {
    meteoZurich:      "Zurich: 12.4°C 🌧",
    meteoJammu:       "Jammu: 23.1°C ☀️",
    meteoKashmir:     "Kashmir: 14.4°C 🌤",
    meteoLadakh:      "Ladakh: 3.5°C 🌞",
    meteoGilgit:      "Gilgit: 8.3°C 🌤",
    meteoBaltistan:   "Baltistan: 11.7°C 🌤",
    meteoMuzaffarabad:"Muzaffarabad: 21.3°C ☀️"
  };
  Object.entries(w).forEach(([id,text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });
}

updateHeaderInfo();
setInterval(updateHeaderInfo, 1000);
