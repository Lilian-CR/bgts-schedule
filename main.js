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
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/685bb8865a3af01f3afa1aa1_Chiedza%20Muguti.jpeg',
    room: 'Main Auditorium',
    desc: 'Kick off the summit with inspiring remarks by product leader and coach Chiedza Muguti, setting the tone for a day of empowerment and connection.'
  },
  {
    id: 'fireside',
    start: `${DAY}T09:45:00${Z}`,
    end: `${DAY}T10:30:00${Z}`,
    title: 'Fireside Chat — Power in Action',
    speaker: 'Olamide Olowe — Founder & CEO of Topicals',
    img: 'https://media.licdn.com/dms/image/v2/D4D22AQFNbWECwpT2nw/feedshare-shrink_1280/B4DZnE_HvDKsAs-/0/1759946506006?e=1762992000&v=beta&t=RcS637VjFOD16CROP3BuIwZgOdSoBk_9uAFiGmqtA_s',
    room: 'Main Auditorium',
    desc: 'A conversation with Forbes 30 Under 30 entrepreneur Olamide Olowe on leadership, resilience, and driving systemic change in beauty and business.'
  },
  {
    id: 'wealth',
    start: `${DAY}T10:30:00${Z}`,
    end: `${DAY}T11:15:00${Z}`,
    title: 'Level Up Your Wealth — Financial Growth Strategies',
    speaker: 'Dineo Ledwaba-Chapman — Financial Adviser at Belvedere Wealth Management',
    img: 'xxx',
    room: 'Main Auditorium',
    desc: 'Unlock the secrets to building lasting wealth with strategies tailored for Black women aiming to accelerate financial growth and independence.'
  },
  {
    id: 'break1',
    start: `${DAY}T11:20:00${Z}`,
    end: `${DAY}T11:30:00${Z}`,
    title: 'Break & Networking',
    img: '',
    desc: 'Short networking break — connect and recharge with peers and mentors.'
  },
  {
    id: 'founders',
    start: `${DAY}T11:30:00${Z}`,
    end: `${DAY}T12:15:00${Z}`,
    title: 'Fueling Progress for Black Female Founders',
    speaker: 'Panel: Aneri Pradhan, Cosima Richardson, Leyla F Karaha, Gloria Niiquaye',
    img: 'xxx',
    room: 'Main Auditorium',
    desc: 'How Black women founders scale purpose-driven startups through innovative funding models, partnerships and community-based approaches.'
  },
  {
    id: 'circle',
    start: `${DAY}T12:15:00${Z}`,
    end: `${DAY}T13:00:00${Z}`,
    title: 'Can We Talk for Real? A Sister Circle',
    speaker: 'Panel: Liz Osumba (Product Designer, Zalando), Renee Kapuku (Co-Founder, To My Sisters), Idowu Adesina (Senior Product Designer, Zalando), Madame Joyce (Host & Producer)',
    img: 'xxx',
    room: 'Main Auditorium',
    desc: 'Candid talk-show-style discussion on culture, industry challenges and collective empowerment among Black women creatives and tech professionals.'
  },
  {
    id: 'lunch',
    start: `${DAY}T13:00:00${Z}`,
    end: `${DAY}T14:00:00${Z}`,
    title: 'Lunch & Networking',
    img: '',
    desc: 'Networking lunch with community leaders and speakers.'
  },
  {
    id: 'ai',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: 'AI & Automation — Unlocking Opportunities',
    speaker: 'Furat Abdulle (Consultant, Avanade) · Jane Waithira (Developer, SAP SE)',
    img: 'xxx',
    room: 'Room A',
    desc: 'Explore AI-driven career paths and inclusive innovation with hands-on insights from leading data and automation experts.'
  },
  {
    id: 'mental',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: 'Resilience & Rising — Prioritising Mental Health',
    speaker: 'Edith Esong Enowbi — Founder, Roots2Roof Coaching',
    img: 'xxx',
    room: 'Room B',
    desc: 'Why Black women in Europe must prioritise mental health in an increasingly hostile social climate; tools for healing, strength and confidence.'
  },
  {
    id: 'content',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: 'Content Creation & Building Influence',
    speaker: 'Various Industry Creators',
    img: 'xxx',
    room: 'Room C',
    desc: 'How to build digital presence and income across LinkedIn, TikTok and beyond — strategies for authentic storytelling and sustainable growth.'
  },
  {
    id: 'executive',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: 'Shattering the Glass Ceiling — Black Women in Leadership',
    speaker: 'Dr. Audrey-Flore Ngomsik — Board Advisor & CEO, Trianon Scientific Communication',
    img: 'xxx',
    room: 'Room A',
    desc: 'Pathways for Black women advancing into executive and board roles across Europe; transforming diversity into strategic advantage.'
  },
  {
    id: 'skills',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: 'Future-Proof Your Skills — Tech Trends for 2026+',
    speaker: 'Florence Mottay — VP & CISO, Zalando',
    img: 'xxx',
    room: 'Room B',
    desc: 'Explore in-demand digital skills and emerging trends to keep your career resilient and ahead of the curve.'
  },
  {
    id: 'cv',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: 'Crafting CVs & Nailing Interviews',
    speaker: 'Ibtehal Hussein (Global TA Lead, HelloFresh) · Adenike Adekunbi (Talent Partner, DE)',
    img: 'xxx',
    room: 'Room C',
    desc: 'Practical strategies for writing standout CVs, acing interviews, and navigating global hiring with confidence.'
  },
  {
    id: 'break2',
    start: `${DAY}T16:00:00${Z}`,
    end: `${DAY}T16:15:00${Z}`,
    title: 'Break',
    img: '',
    desc: 'Short refresh break before final sessions.'
  },
  {
    id: 'media',
    start: `${DAY}T16:15:00${Z}`,
    end: `${DAY}T17:00:00${Z}`,
    title: 'Thriving in Digital Media — Black Women Leading Change',
    speaker: 'Panel: Sally Osei (Creator Manager, Zalando), Leanne Alie (Exec Producer, UK), Jade Vanriel (Content Creator), Oluwatoniloba Dreher Adenuga (Model & Poet)',
    img: 'xxx',
    room: 'Main Auditorium',
    desc: 'Hear from leading Black women redefining digital media, podcasting and influencer marketing in Europe’s creative industries.'
  },
  {
    id: 'closing',
    start: `${DAY}T17:00:00${Z}`,
    end: `${DAY}T17:30:00${Z}`,
    title: 'Closing Keynote Talk',
    speaker: 'Emamurho Ugherughe — Global Quality Lead, SAP AI Core Platform',
    img: 'xxx',
    room: 'Main Auditorium',
    desc: 'Leadership, technology and purpose — Emamurho closes the summit with a powerful call to action for innovation and unity.'
  },
  {
    id: 'afterparty',
    start: `${DAY}T17:30:00${Z}`,
    end: `${DAY}T19:00:00${Z}`,
    title: 'After-party!!!',
    img: 'xxx',
    desc: 'Music, joy, and celebration — connect, dance, and unwind with community and friends to close the summit.'
  }
];

// ---- Time & render logic ----
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
        <h3>${s.title}${isCurrent ? '<span class="live-tag">LIVE</span>' : ''}</h3>
        <small>${fmt(s.start)}–${fmt(s.end)}${s.speaker ? ` · ${s.speaker}` : ''}</small>
        <p class="desc">${s.desc}</p>
        ${imgHTML}
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
