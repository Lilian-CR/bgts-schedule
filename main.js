// ===== Helper functions =====
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const toDate = iso => new Date(iso);
const DAY = '2025-11-13', Z = '+01:00';

// ===== Schedule Data (short sample) =====
const schedule = [
  { id: 'opening', start: `${DAY}T09:30:00${Z}`, end: `${DAY}T09:45:00${Z}`, title: 'Opening Remarks & Welcome', room: 'Main Auditorium', type: 'Welcome', speaker: 'Chiedza Muguti' },
  { id: 'fireside', start: `${DAY}T09:45:00${Z}`, end: `${DAY}T10:30:00${Z}`, title: 'Fireside Chat — Power in Action', room: 'Main Auditorium', type: 'Fireside', speaker: 'Olamide Olowe' },
  { id: 'workshop', start: `${DAY}T10:30:00${Z}`, end: `${DAY}T11:15:00${Z}`, title: 'Level Up Your Wealth', room: 'Main Auditorium', type: 'Workshop', speaker: 'Dineo Ledwaba-Chapman' },
  { id: 'break', start: `${DAY}T11:20:00${Z}`, end: `${DAY}T11:30:00${Z}`, title: 'Break & Networking', type: 'Break' },
  { id: 'panel', start: `${DAY}T11:30:00${Z}`, end: `${DAY}T12:15:00${Z}`, title: 'Fueling Progress for Black Female Founders', type: 'Panel' },
  { id: 'afterparty', start: `${DAY}T17:30:00${Z}`, end: `${DAY}T19:00:00${Z}`, title: 'After-party', type: 'Social' },
];

// ===== Time helpers =====
function fmt(iso) { return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
function within(now, s, e) { return now >= toDate(s) && now < toDate(e); }
function past(now, e) { return now >= toDate(e); }

// ===== Render schedule =====
function renderList() {
  const now = Date.now();
  const list = schedule.map(s => {
    const isCurrent = within(now, s.start, s.end);
    const isPast = past(now, s.end);
    const cls = isCurrent ? 'session current' : isPast ? 'session past' : 'session';
    return `
      <article id="${s.id}" class="${cls}">
        <h3>${s.title}${isCurrent ? '<span class="live-tag">LIVE</span>' : ''}</h3>
        <small>${fmt(s.start)}–${fmt(s.end)} · ${s.room || ''}</small><br/>
        <small>${s.type}${s.speaker ? ' · ' + s.speaker : ''}</small>
      </article>`;
  }).join('');
  $('#schedule').innerHTML = list;
  renderBanner(now);
}

// ===== Live banner =====
function renderBanner(now) {
  const current = schedule.find(s => within(now, s.start, s.end));
  const banner = $('#liveBanner');
  if (current) {
    banner.innerHTML = `<div class="session current"><strong>Now:</strong> ${current.title}<br/><small>${fmt(current.start)}–${fmt(current.end)}</small></div>`;
  } else {
    const next = schedule.find(s => toDate(s.start) > now);
    if (next) {
      const mins = Math.round((toDate(next.start) - now) / 60000);
      banner.innerHTML = `<div class="session up-next"><strong>Up next:</strong> ${next.title} in ${mins} min</div>`;
    } else banner.innerHTML = '';
  }
}

// ===== Scroll helpers =====
function scrollToItem(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top: y, behavior: 'smooth' });
}

function jumpToCurrent() {
  const now = Date.now();
  const current = schedule.find(s => within(now, s.start, s.end));
  if (current) scrollToItem(current.id);
  else {
    const next = schedule.find(s => toDate(s.start) > now);
    if (next) scrollToItem(next.id);
  }
}

function filterView(mode) {
  const now = Date.now();
  $$('#schedule article').forEach(el => {
    const s = schedule.find(x => x.id === el.id);
    const show = mode === 'current' ? within(now, s.start, s.end) : true;
    el.style.display = show ? '' : 'none';
  });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  $('#tzLabel').textContent = 'CET (UTC+1)';
  renderList();
  setInterval(renderList, 30000);
  $('#jumpNowBtn').onclick = jumpToCurrent;
  $('#showAll').onclick = () => filterView('all');
  $('#showCurrent').onclick = () => filterView('current');
  $('#scrollTop').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
});
