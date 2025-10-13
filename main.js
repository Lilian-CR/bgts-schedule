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
    title: 'Arrival & Networking',
    speaker: 'Chiedza Muguti — Product Leader & Coach',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/685bb8865a3af01f3afa1aa1_Chiedza%20Muguti.jpeg',
    desc: 'Kick off the summit with inspiring remarks by product leader and coach Chiedza Muguti, setting the tone for a day of empowerment and connection.'
  },
  {
    id: 'fireside',
    start: `${DAY}T09:45:00${Z}`,
    end: `${DAY}T10:30:00${Z}`,
    title: 'Fireside Chat — Power in Action: Leading the Change and Shaping the Future for Black women',
    speaker: 'Olamide Olowe — Founder & CEO of Topicals',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68e3cd4f71d2601a907dfd9e_image_50405121%20(2).JPG',
    desc: 'A conversation with Forbes 30 Under 30 entrepreneur Olamide Olowe on leadership, resilience, and driving systemic change in beauty and business.'
  },
  {
    id: 'wealth',
    start: `${DAY}T10:30:00${Z}`,
    end: `${DAY}T11:15:00${Z}`,
    title: 'WORKSHOP: Level Up Your Wealth: Black Women´s Strategy for Financial Growth and Wealth Generation',
    speaker: 'Dineo Ledwaba-Chapman — Financial Adviser at Belvedere Wealth Management',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68b0c3931b97d76faef7ede6_Dineo%20-%20Photo.jpg',
    desc: 'Unlock the secrets to building lasting wealth with strategies tailored for Black women aiming to accelerate financial growth and independence.'
  },
  {
    id: 'break1',
    start: `${DAY}T11:20:00${Z}`,
    end: `${DAY}T11:30:00${Z}`,
    title: 'Break & Networking',
    img: 'https://media.gettyimages.com/id/1442269395/photo/two-businesswomen-walking-down-the-coworking-stairs.jpg?s=612x612&w=0&k=20&c=uTw48PtN1OcWEz1D_-jgFLzVuqJVSuFOR1O2Q7ptZYo=',
    img: 'https://media.gettyimages.com/id/1634161872/photo/young-adult-black-woman-having-coffee-break-at-the-office.jpg?s=612x612&w=0&k=20&c=SnVFYLo71c_VXX9zXk_TU5eme8f6d_ExAxH9rU4WHBw=',
    desc: 'Short networking break — connect and recharge with peers and mentors.'
  },
  {
    id: 'founders',
    start: `${DAY}T11:30:00${Z}`,
    end: `${DAY}T12:15:00${Z}`,
    title: 'Panel Discussion - Fueling Progress for Black Female Founders',
    speaker: 'Aneri Pradhan, Cosima Richardson, Leyla F Karaha, Gloria Niiquaye',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_800/B4EZk4qTLtKcAg-/0/1757592238613?e=1762992000&v=beta&t=wQtz2W5njYntVNfS-reJeRpsyVLKlgtoYibEJ8lpBhY',
    desc: 'How Black women founders scale purpose-driven startups through innovative funding models, partnerships and community-based approaches.'
  },
  {
    id: 'circle',
    start: `${DAY}T12:15:00${Z}`,
    end: `${DAY}T13:00:00${Z}`,
    title: 'Panel Discussion - Can We Talk for Real? A Sister Circle on Culture, Sector Challenges, and Society',
    speaker: 'PLiz Osumba (Product Designer, Zalando), Renee Kapuku (Co-Founder, To My Sisters), Idowu Adesina (Senior Product Designer, Zalando), Madame Joyce (Host & Producer)',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_800/B4EZk4qTLtKcAg-/0/1757592238613?e=1762992000&v=beta&t=wQtz2W5njYntVNfS-reJeRpsyVLKlgtoYibEJ8lpBhY',
    desc: 'Candid talk-show-style discussion on culture, industry challenges and collective empowerment among Black women creatives and tech professionals.'
  },
  {
    id: 'lunch',
    start: `${DAY}T13:00:00${Z}`,
    end: `${DAY}T14:00:00${Z}`,
    title: 'LLunch Break',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQHuhIBm7Xz0WA/feedshare-shrink_800/B4EZnHoDhnIoAg-/0/1759990791356?e=1762992000&v=beta&t=lqmsUhYMJ9wT4tnDWtYBVQRdudm1Rap7n2ong983Sns',
    desc: 'Lunch & Networking with leaders in technology and corporate.'
  },
  {
    id: 'ai',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: '1. AI & Automation: Unlocking Opportunities for Black Women in Tech',
    speaker: 'Furat Abdulle (Consultant, Avanade) · Jane Waithira (Developer, SAP SE)',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_800/B4EZk4qTLtKcAg-/0/1757592238613?e=1762992000&v=beta&t=wQtz2W5njYntVNfS-reJeRpsyVLKlgtoYibEJ8lpBhY',
    desc: 'Explore AI-driven career paths and inclusive innovation with hands-on insights from leading data and automation experts.'
  },
  {
    id: 'mental',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: '2.Resilience and Rising: Why Black Women in Europe Must Prioritise Mental Health in a Racist and Rising Fascist Society',
    speaker: 'Edith Esong Enowbi — Founder, Roots2Roof Coaching',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/685bb8c1240484e7801d8fc2_Edith%20Esong%20Enowbi.jpg',
    desc: 'Why Black women in Europe must prioritise mental health in an increasingly hostile social climate; tools for healing, strength and confidence.'
  },
  {
    id: 'content',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: '3. Content Creation & Building Influence: How Black Women Can Lead Industry Conversations on LinkedIn & TikTok',
    speaker: 'Various Industry Creators',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_800/B4EZk4qTLtKcAg-/0/1757592238613?e=1762992000&v=beta&t=wQtz2W5njYntVNfS-reJeRpsyVLKlgtoYibEJ8lpBhY',
    desc: 'How to build digital presence and income across LinkedIn, TikTok and beyond — strategies for authentic storytelling and sustainable growth.'
  },
  {
    id: 'executive',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: '1. Shattering the Glass Ceiling: Black Women Leading the Change in Executive & Board Roles',
    speaker: 'Dr. Audrey-Flore Ngomsik — Board Advisor & CEO, Trianon Scientific Communication',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68be85de6d671f8ef1cb4ef7_Dr%20Audrey-Flore%20Ngomsik%20(3)-min.jpg',
    desc: 'Pathways for Black women advancing into executive and board roles across Europe; transforming diversity into strategic advantage.'
  },
  {
    id: 'skills',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: '2. Future-Proof Your Skills: Tech Trends & Skills Every Black Woman Needs in 2026 and beyond',
    speaker: 'Florence Mottay — VP & CISO, Zalando',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68be862a9cdf82cd18e08af8_Florence_Mottay_03.jpg',
    desc: 'Explore in-demand digital skills and emerging trends to keep your career resilient and ahead of the curve.'
  },
  {
    id: 'cv',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: '3. Foundational Skills: Crafting CVs, Applications & Nailing Interviews',
    speaker: 'Ibtehal Hussein (Global TA Lead, HelloFresh) · Adenike Adekunbi (Talent Partner, DE)',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_800/B4EZk4qTLtKcAg-/0/1757592238613?e=1762992000&v=beta&t=wQtz2W5njYntVNfS-reJeRpsyVLKlgtoYibEJ8lpBhY',
    desc: 'Practical strategies for writing standout CVs, acing interviews, and navigating global hiring with confidence.'
  },
  {
    id: 'break2',
    start: `${DAY}T16:00:00${Z}`,
    end: `${DAY}T16:15:00${Z}`,
    title: 'Break',
    desc: 'Short refresh break before final sessions.'
  },
  {
    id: 'media',
    start: `${DAY}T16:15:00${Z}`,
    end: `${DAY}T17:00:00${Z}`,
    title: 'Panel Discussion - Thriving in Digital Media: Black Women Leading the Future of Content and Innovation',
    speaker: 'Panel: Sally Osei (Creator Manager, Zalando), Leanne Alie (Exec Producer, UK), Jade Vanriel (Content Creator), Oluwatoniloba Dreher Adenuga (Model & Poet)',
    img: 'https://media.licdn.com/dms/image/v2/D4D22AQE9MkUr4xFOSA/feedshare-shrink_1280/B4DZm1i_TMJYAs-/0/1759687473190?e=1762992000&v=beta&t=-1Iv3O8klCnZaVCYQd731zCaAnadySFRIJ9E7rbsUDk',
    desc: 'Hear from leading Black women redefining digital media, podcasting and influencer marketing in Europe’s creative industries.'
  },
  {
    id: 'closing',
    start: `${DAY}T17:00:00${Z}`,
    end: `${DAY}T17:30:00${Z}`,
    title: 'Closing Keynote Talk',
    speaker: 'Emamurho Ugherughe — Global Quality Lead, SAP AI Core Platform',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68c8322a9bfcdd3837d51543_IMG_2779.jpg',
    desc: 'Leadership, technology and purpose — Emamurho closes the summit with a powerful call to action for innovation and unity.'
  },
  {
    id: 'afterparty',
    start: `${DAY}T17:30:00${Z}`,
    end: `${DAY}T19:00:00${Z}`,
    title: 'The After-party!!!',
    img: 'https://media.gettyimages.com/id/1145839324/de/foto/teamapplaus-nach-treffen.jpg?s=612x612&w=0&k=20&c=DUXDVXxSIy5bD5srD04rXfwOibbsagjpNEgD79pqzaY=',
    img: 'https://t3.ftcdn.net/jpg/02/59/72/50/360_F_259725004_ZXZZe3fAcLY7e72W4cogM8JmLfVN11jQ.jpg',
    desc: 'Join us for building meaningful connections, great music, fun and drinks! - Unwind with community and friends to close the summit.'
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
