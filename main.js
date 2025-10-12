// Helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const DAY = '2025-11-13', Z = '+01:00';

// ---- Time override for testing ----
function getNowMs() {
  const params = new URLSearchParams(location.search);
  const nowParam = params.get('now');
  const offsetMin = params.get('offset');
  if (nowParam) {
    const d = new Date(nowParam);
    if (!isNaN(d)) return d.getTime();
  }
  if (offsetMin) {
    const n = Number(offsetMin);
    if (!isNaN(n)) return Date.now() + n * 60000;
  }
  return Date.now();
}

// ---- Schedule data ----
const schedule = [
  {
    id: 'opening',
    start: `${DAY}T09:30:00${Z}`,
    end: `${DAY}T09:45:00${Z}`,
    title: 'Opening Remarks & Welcome',
    speaker: 'Chiedza Muguti — Product Leader & Coach',
    img: 'https://placehold.co/150x150',
    room: 'Main Auditorium',
    desc: 'Kick off the summit with inspiring remarks by product leader and coach Chiedza Muguti, setting the tone for a day of empowerment and connection.'
  },
  {
    id: 'fireside',
    start: `${DAY}T09:45:00${Z}`,
    end: `${DAY}T10:30:00${Z}`,
    title: 'Fireside Chat — Power in Action',
    speaker: 'Olamide Olowe — Founder & CEO of Topicals',
    img: 'https://placehold.co/150x150',
    room: 'Main Auditorium',
    desc: 'A conversation with Forbes 30 Under 30 entrepreneur Olamide Olowe on leadership, resilience, and driving systemic change in beauty and business.'
  },
  // ... (rest unchanged)
];

// ---- Time + banner logic ----
function fmt(iso){ return new Date(iso).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}); }
function within(now, s, e){ return now >= new Date(s) && now < new Date(e); }
function past(now, e){ return now >= new Date(e); }

function renderList(){
  const now = getNowMs();
  const html = schedule.map(s => {
    const isCurrent = within(now, s.start, s.end);
    const isPast = past(now, s.end);
    const cls = isCurrent ? 'session current' : isPast ? 'session past' : 'session';
    const imgHTML = s.img ? `<img class="speaker-pic" src="${s.img}" alt="${s.speaker || s.title}">` : '';
    return `
      <article id="${s.id}" class="${cls}">
        ${imgHTML}
        <h3>${s.title}${isCurrent ? '<span class="live-tag">LIVE</span>' : ''}</h3>
        <small>${fmt(s.start)}–${fmt(s.end)}${s.speaker ? ` · ${s.speaker}` : ''}</small>
        <p class="desc">${s.desc}</p>
      </article>`;
  }).join('');
  $('#schedule').innerHTML = html;

  $$('#schedule article').forEach(el => {
    el.addEventListener('click', () => {
      $$('#schedule article').forEach(a => a.classList.remove('active'));
      el.classList.add('active');
    });
  });

  renderBanner(now);
}

function renderBanner(now){
  const current = schedule.find(s => within(now, s.start, s.end));
  const next = schedule.find(s => new Date(s.start) > now);
  const banner = $('#liveBanner');

  if (current) {
    banner.innerHTML = `<div class="box"><strong>NOW:</strong> ${current.title}</div>`;
  } else if (next) {
    const mins = Math.round((new Date(next.start) - now) / 60000);
    banner.innerHTML = `<div class="box"><span class="upnext">UP NEXT:</span>${next.title} in ${mins} min</div>`;
  } else {
    banner.innerHTML = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  $('#tzLabel').textContent = 'CET (UTC+1)';
  renderList();
  setInterval(renderList, 30000);

  $('#showAll').onclick = () => $$('#schedule article').forEach(el => el.style.display = '');
  $('#showCurrent').onclick = () => {
    const now = getNowMs();
    $$('#schedule article').forEach(el => {
      const s = schedule.find(x => x.id === el.id);
      el.style.display = within(now, s.start, s.end) ? '' : 'none';
    });
  };
  $('#scrollTop').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
});
