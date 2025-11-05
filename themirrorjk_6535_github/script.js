const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];
document.getElementById("year").textContent = new Date().getFullYear();
function formatCEST() {
  const now = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false, timeZone: 'Europe/Zurich' };
  document.querySelector("#clock-cest span").textContent = new Intl.DateTimeFormat('en-GB', opts).format(now).replace(',', ' —');
}
function formatHijri() {
  try{
    const now = new Date();
    const opts = { day:'numeric', month:'long', year:'numeric', calendar:'islamic' };
    const fmt = new Intl.DateTimeFormat('en-u-ca-islamic', opts);
    document.querySelector("#cal-hijri span").textContent = fmt.format(now) + " AH";
  }catch(e){
    document.querySelector("#cal-hijri span").textContent = "Hijri calendar not supported";
  }
}
function formatVikramSamvatApprox(){
  const now = new Date();
  const gYear = now.getFullYear();
  const m = now.getMonth();
  const d = now.getDate();
  const vsYear = (m >= 3) ? gYear + 57 : gYear + 56;
  const months = ["Pausha","Magha","Phalguna","Chaitra","Vaisakh","Jyeshtha","Ashadha","Shravana","Bhadrapada","Ashwin","Kartik","Margashirsha"];
  const map = [9,10,11,3,4,5,6,7,8,0,1,2];
  const vsMonth = months[ map[m] ];
  document.querySelector("#cal-hindi span").textContent = `${vsMonth} ${d}, ${vsYear} VS`;
}
function updateTimes(){
  formatCEST(); formatHijri(); formatVikramSamvatApprox();
  const now = new Date();
  const fmt = (tz) => new Intl.DateTimeFormat('en-GB', { hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:false, timeZone: tz }).format(now);
  document.querySelector("#tz-ist span").textContent = fmt('Asia/Kolkata');
  document.querySelector("#tz-pkt span").textContent = fmt('Asia/Karachi');
}
updateTimes(); setInterval(updateTimes, 1000);
$$(".nav-item.has-sub > .nav-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    const li = e.currentTarget.closest(".nav-item");
    const isOpen = li.classList.contains("open");
    $$(".nav-item.open").forEach(n => n.classList.remove("open"));
    if(!isOpen){ li.classList.add("open"); }
  });
});
document.addEventListener("click", (e) => { if(!e.target.closest(".navbar")) $$(".nav-item.open").forEach(n => n.classList.remove("open")); });
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  if(!expanded){
    mobileMenu.innerHTML = "";
    const clone = document.getElementById("nav-list").cloneNode(true);
    clone.id = "nav-list-mobile";
    clone.querySelectorAll(".nav-item.has-sub > .nav-btn").forEach(b => {
      const text = b.textContent;
      const a = document.createElement("a");
      a.textContent = text;
      a.className = "nav-btn";
      a.href = "#";
      b.replaceWith(a);
    });
    mobileMenu.appendChild(clone);
    mobileMenu.hidden = False
  }else{
    mobileMenu.hidden = True
  }
});
const cities = [
  { key:"zurich", name:"Zurich", lat:47.3769, lon:8.5417 },
  { key:"jammu", name:"Jammu", lat:32.7266, lon:74.8570 },
  { key:"kashmir", name:"Kashmir", lat:34.0837, lon:74.7973 },
  { key:"ladakh", name:"Ladakh", lat:34.1526, lon:77.5771 },
  { key:"gilgit", name:"Gilgit", lat:35.9208, lon:74.3080 },
  { key:"baltistan", name:"Baltistan", lat:35.3025, lon:75.6360 },
  { key:"muzaffarabad", name:"Muzaffarabad", lat:34.37, lon:73.47 }
];
const weatherBar = document.getElementById("weather-bar");
const codeToIcon = (code)=>{
  if([0].includes(code)) return "☀️";
  if([1,2,3].includes(code)) return "⛅";
  if([45,48].includes(code)) return "🌫️";
  if([51,53,55,56,57].includes(code)) return "🌦️";
  if([61,63,65,66,67,80,81,82].includes(code)) return "🌧️";
  if([71,73,75,77,85,86].includes(code)) return "🌨️";
  if([95,96,99].includes(code)) return "⛈️";
  return "🌡️";
};
function createCityChip(name, text){
  const el = document.createElement("div");
  el.className = "city";
  el.innerHTML = `<span class="name">${name}:</span> <span class="temp">${text}</span>`;
  return el;
}
async function loadWeather(){
  weatherBar.textContent = "";
  for(const c of cities){
    const urlNew = `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,weather_code`;
    const urlOld = `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true`;
    try{
      let res = await fetch(urlNew);
      if(!res.ok) throw new Error("new API failed");
      let data = await res.json();
      let t = data?.current?.temperature_2m ?? null;
      let code = data?.current?.weather_code ?? null;
      if(t===null){
        const r2 = await fetch(urlOld);
        const d2 = await r2.json();
        t = d2?.current_weather?.temperature ?? "—";
        code = d2?.current_weather?.weathercode ?? null;
      }
      const icon = codeToIcon(Number(code));
      weatherBar.appendChild(createCityChip(c.name, `${t}°C ${icon}`));
    }catch(e){
      weatherBar.appendChild(createCityChip(c.name, "— °C"));
    }
  }
}
loadWeather();
function setTickerItems(items){
  const ul = document.getElementById("ticker-items");
  ul.innerHTML = "";
  items.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.toUpperCase();
    ul.appendChild(li);
  });
}
function fakeSearch(){
  const q = document.getElementById("search-input").value.trim();
  if(!q) return;
  alert(`Search for: ${q}\\n(Implement real search or connect to your CMS.)`);
}
const dlg = document.getElementById("contact-modal");
document.getElementById("open-contact").addEventListener("click", ()=> dlg.showModal());
document.getElementById("close-contact").addEventListener("click", ()=> dlg.close());
function tryShare(){
  if(navigator.share){
    navigator.share({ title: document.title, url: location.href }).catch(()=>{});
  }else{
    navigator.clipboard?.writeText(location.href);
    alert("Link copied to clipboard.");
  }
}
document.getElementById("share-btn").addEventListener("click", tryShare);
document.getElementById("sticky-share").addEventListener("click", tryShare);
document.getElementById("sticky-menu").addEventListener("click", ()=> window.scrollTo({top:0, behavior:'smooth'}));
document.getElementById("sticky-search").addEventListener("click", ()=> document.getElementById("search-input").focus());
document.getElementById("sticky-like").addEventListener("click", ()=> alert("Thanks for your support ❤️"));
