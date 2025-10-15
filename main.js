// Helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const DAY = '2025-11-13', Z = '+01:00';

// Testing
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

// Schedule Info (Data)
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
    title: 'Fireside Chat — Power in Action: Leading the Change and Shaping the Future for Black Women',
    speaker: 'Olamide Olowe — Founder & CEO of Topicals',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68e3cd4f71d2601a907dfd9e_image_50405121%20(2).JPG',
    desc: 'A conversation with Forbes 30 Under 30 entrepreneur Olamide Olowe on leadership, resilience, and driving systemic change in beauty and business.'
  },
  {
    id: 'wealth',
    start: `${DAY}T10:30:00${Z}`,
    end: `${DAY}T11:15:00${Z}`,
    title: 'WORKSHOP: Level Up Your Wealth – Black Women’s Strategy for Financial Growth and Wealth Generation',
    speaker: 'Dineo Ledwaba-Chapman — Financial Adviser at Belvedere Wealth Management',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68b0c3931b97d76faef7ede6_Dineo%20-%20Photo.jpg',
    desc: 'Unlock the secrets to building lasting wealth with strategies tailored for Black women aiming to accelerate financial growth and independence.'
  },
  {
    id: 'break1',
    start: `${DAY}T11:20:00${Z}`,
    end: `${DAY}T11:30:00${Z}`,
    title: 'Morning Break & Networking',
    img: 'https://media.gettyimages.com/id/1442269395/photo/two-businesswomen-walking-down-the-coworking-stairs.jpg?s=612x612&w=0&k=20&c=uTw48PtN1OcWEz1D_-jgFLzVuqJVSuFOR1O2Q7ptZYo=',
    desc: 'Short networking break — connect and recharge with peers and mentors.'
  },
  {
    id: 'founders',
    start: `${DAY}T11:30:00${Z}`,
    end: `${DAY}T12:15:00${Z}`,
    title: 'Panel Discussion – Fueling Progress for Black Female Founders',
    speaker: 'Aneri Pradhan, Cosima Richardson, Leyla F Karaha, Gloria Niiquaye',
    img: 'images/Aneri_Pradhan-Cosima_Richardson-Leyla_F_Karaha-Gloria_Niiquaye.jpg',
    desc: 'How Black women founders scale purpose-driven startups through innovative funding models, partnerships, and community-based approaches.'
  },
  {
    id: 'circle',
    start: `${DAY}T12:15:00${Z}`,
    end: `${DAY}T13:00:00${Z}`,
    title: 'Panel Discussion – Can We Talk for Real? A Sister Circle on Culture, Sector Challenges, and Society',
    speaker: 'Liz Osumba, Renee Kapuku, Idowu Adesina, Madame Joyce',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_1280/B4EZk4qTLtKcAs-/0/1757592238619?e=1762992000&v=beta&t=Y_jbeauK55kw4CQefXUuIW42j8-eXf_Zw579iwxA8WI',
    desc: 'Candid talk-show-style discussion on culture, industry challenges and collective empowerment among Black women creatives and tech professionals.'
  },
  {
    id: 'lunch',
    start: `${DAY}T13:00:00${Z}`,
    end: `${DAY}T14:00:00${Z}`,
    title: 'Lunch Break',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQHuhIBm7Xz0WA/feedshare-shrink_2048_1536/B4EZnHoDhnIoAw-/0/1759990791452?e=1762992000&v=beta&t=xcOVrselRKCTQ_EYSkQTNkcNy-Qs0ys1wwh-rlMuQZg',
    desc: 'Lunch & networking with leaders in technology and corporate.'
  },
  {
    id: 'ai',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: '1. AI & Automation: Unlocking Opportunities for Black Women in Tech',
    speaker: 'Furat Abdulle (Avanade) · Jane Waithira (SAP SE)',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_1280/B4EZk4qTLtKcAs-/0/1757592238619?e=1762992000&v=beta&t=Y_jbeauK55kw4CQefXUuIW42j8-eXf_Zw579iwxA8WI',
    desc: 'Explore AI-driven career paths and inclusive innovation with hands-on insights from leading data and automation experts.'
  },
  {
    id: 'mental',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: '2. Resilience and Rising: Prioritising Mental Health in a Racist and Rising Fascist Society',
    speaker: 'Edith Esong Enowbi — Founder, Roots2Roof Coaching',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/685bb8c1240484e7801d8fc2_Edith%20Esong%20Enowbi.jpg',
    desc: 'Why Black women in Europe must prioritise mental health in an increasingly hostile social climate; tools for healing, strength and confidence.'
  },
  {
    id: 'content',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: '3. Content Creation & Building Influence: How Black Women Can Lead Conversations on LinkedIn & TikTok',
    speaker: 'Various Industry Creators',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_1280/B4EZk4qTLtKcAs-/0/1757592238619?e=1762992000&v=beta&t=Y_jbeauK55kw4CQefXUuIW42j8-eXf_Zw579iwxA8WI',
    desc: 'How to build digital presence and income across LinkedIn, TikTok and beyond — strategies for authentic storytelling and sustainable growth.'
  },
  {
    id: 'executive',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: '1. Shattering the Glass Ceiling: Black Women Leading in Executive & Board Roles',
    speaker: 'Dr. Audrey-Flore Ngomsik — CEO, Trianon Scientific Communication',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68be85de6d671f8ef1cb4ef7_Dr%20Audrey-Flore%20Ngomsik%20(3)-min.jpg',
    desc: 'Pathways for Black women advancing into executive and board roles across Europe; transforming diversity into strategic advantage.'
  },
  {
    id: 'skills',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: '2. Future-Proof Your Skills: Tech Trends & Skills Every Black Woman Needs in 2026 and Beyond',
    speaker: 'Florence Mottay — VP & CISO, Zalando',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68be862a9cdf82cd18e08af8_Florence_Mottay_03.jpg',
    desc: 'Explore in-demand digital skills and emerging trends to keep your career resilient and ahead of the curve.'
  },
  {
    id: 'cv',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: '3. Foundational Skills: Crafting CVs, Applications & Nailing Interviews',
    speaker: 'Ibtehal Hussein (HelloFresh) · Adenike Adekunbi (Talent Partner, DE)',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_1280/B4EZk4qTLtKcAs-/0/1757592238619',
    desc: 'Practical strategies for writing standout CVs, acing interviews, and navigating global hiring with confidence.'
  },
  {
    id: 'break2',
    start: `${DAY}T16:00:00${Z}`,
    end: `${DAY}T16:15:00${Z}`,
    title: 'Afternoon Break & Networking',
    img: 'https://media.gettyimages.com/id/1634161872/photo/young-adult-black-woman-having-coffee-break-at-the-office.jpg?s=612x612&w=0&k=20&c=SnVFYLo71c_VXX9zXk_TU5eme8f6d_ExAxH9rU4WHBw=',
    desc: 'Short refresh break before final sessions — grab a coffee, relax, and prepare for the last talks.'
  },
  {
    id: 'media',
    start: `${DAY}T16:15:00${Z}`,
    end: `${DAY}T17:00:00${Z}`,
    title: 'Panel Discussion – Thriving in Digital Media: Black Women Leading the Future of Content & Innovation',
    speaker: 'Sally Osei, Leanne Alie, Jade Vanriel, Oluwatoniloba Dreher Adenuga',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_1280/B4EZk4qTLtKcAs-/0/1757592238619',
    desc: 'Hear from leading Black women redefining digital media, podcasting, and influencer marketing in Europe’s creative industries.'
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
    img: [
      'https://media.gettyimages.com/id/1145839324/de/foto/teamapplaus-nach-treffen.jpg?s=612x612&w=0&k=20&c=DUXDVXxSIy5bD5srD04rXfwOibbsagjpNEgD79pqzaY=',
      'https://t3.ftcdn.net/jpg/02/59/72/50/360_F_259725004_ZXZZe3fAcLY7e72W4cogM8JmLfVN11jQ.jpg'
    ],
    desc: 'Join us for building meaningful connections, great music, fun and drinks! Unwind with community and friends to close the summit.'
  }
];

// Render Logic
function fmt(iso) {
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
function within(now, s, e) { return now >= new Date(s) && now < new Date(e); }
function past(now, e) { return now >= new Date(e); }

function renderList(mode = 'all') {
  const now = getNowMs();
  let filtered = schedule;

  if (mode === 'now') filtered = schedule.filter(s => within(now, s.start, s.end));
  else if (mode === 'past') filtered = schedule.filter(s => past(now, s.end));

  const html = filtered.map(s => {
    const isCurrent = within(now, s.start, s.end);
    const isPast = past(now, s.end);
    const cls = isCurrent ? 'session current' : isPast ? 'session past' : 'session';

    let imgHTML = '';
    if (Array.isArray(s.img)) {
      imgHTML = s.img.map(url => `<img class="speaker-pic" src="${url}" alt="${s.speaker || s.title}">`).join('');
    } else if (s.img) {
      imgHTML = `<img class="speaker-pic" src="${s.img}" alt="${s.speaker || s.title}">`;
    }

    return `
      <article id="${s.id}" class="${cls}">
        <div class="session-header">
          <h3>${s.title}${isCurrent ? '<span class="live-tag">LIVE</span>' : ''}</h3>
          <button class="toggle-arrow" aria-label="Toggle details">▼</button>
        </div>
        <small>${fmt(s.start)}–${fmt(s.end)}${s.speaker ? ` · ${s.speaker}` : ''}</small>
        <div class="session-body">
          <p class="desc">${s.desc}</p>
          ${imgHTML}
        </div>
      </article>`;
  }).join('');

  $('#schedule').innerHTML = html;

  // Accordion logic — only one expanded
  $$('#schedule article').forEach(el => {
    const btn = el.querySelector('.toggle-arrow');
    const header = el.querySelector('.session-header');

    const toggle = () => {
      const isExpanded = el.classList.contains('expanded');
      $$('#schedule article.expanded').forEach(other => {
        if (other !== el) {
          other.classList.remove('expanded');
          const otherBtn = other.querySelector('.toggle-arrow');
          if (otherBtn) otherBtn.textContent = '▼';
        }
      });
      el.classList.toggle('expanded', !isExpanded);
      btn.textContent = el.classList.contains('expanded') ? '▲' : '▼';
    };

    btn.addEventListener('click', e => { e.stopPropagation(); toggle(); });
    header.addEventListener('click', e => { if (!e.target.classList.contains('toggle-arrow')) toggle(); });
  });

  renderBanner(now);
}

// Banner
function renderBanner(now) {
  const current = schedule.find(s => within(now, s.start, s.end));
  const next = schedule.find(s => new Date(s.start) > now);
  const banner = $('#liveBanner');

  if (current) {
    banner.innerHTML = `<div class="box"><strong>NOW:</strong> ${current.title}</div>`;
    return;
  }

  const summitStart = new Date(`${DAY}T00:00:00${Z}`).getTime();
  const hourSwitch = new Date(`${DAY}T00:01:00${Z}`).getTime();
  const minuteSwitch = new Date(`${DAY}T08:00:00${Z}`).getTime();

  if (next) {
    const diffMs = new Date(next.start).getTime() - now;
    let timeStr;

    // Before event day — show in days
    if (now < summitStart) {
      const days = Math.ceil((summitStart - now) / (1000 * 60 * 60 * 24));
      timeStr = `${days} day${days !== 1 ? 's' : ''}`;
    }
    // After midnight but before 8 am — show in hours
    else if (now >= hourSwitch && now < minuteSwitch) {
      const hours = Math.ceil(diffMs / (1000 * 60 * 60));
      timeStr = `${hours} hour${hours !== 1 ? 's' : ''}`;
    }
    // After 8 am on the day — show in minutes
    else {
      const mins = Math.ceil(diffMs / 60000);
      timeStr = `${mins} min`;
    }

    banner.innerHTML = `<div class="box"><span class="upnext">UP NEXT:</span> ${next.title} in ${timeStr}</div>`;
  } else {
    banner.innerHTML = '';
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  const tz = $('#tzLabel');
  if (tz) tz.textContent = 'CET (UTC+1)';

  renderList('all');
  setInterval(() => renderList('all'), 30000);

  $('#showAll').onclick = () => renderList('all');
  $('#showCurrent').onclick = () => renderList('now');
  $('#showPast').onclick = () => renderList('past');
  $('#scrollTop').onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
});
