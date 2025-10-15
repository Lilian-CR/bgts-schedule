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
    id: 'arrival',
    start: `${DAY}T09:00:00${Z}`,
    end: `${DAY}T09:30:00${Z}`,
    title: 'Arrival & Networking',
    img: 'https://codingblackfemales.com/img/black-woman-phone.jpg',
    desc: 'Start your day connecting with fellow attendees over coffee. Collect your badge, meet new peers, and soak in the energy before the first talks begin. A relaxed space to make introductions and get ready for an inspiring summit ahead.'
  },
  {
    id: 'opening',
    start: `${DAY}T09:30:00${Z}`,
    end: `${DAY}T09:45:00${Z}`,
    title: 'Opening Remarks & Welcome',
    speaker: 'Chiedza Muguti — Product Leader & Coach',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/685bb8865a3af01f3afa1aa1_Chiedza%20Muguti.jpeg',
    desc: 'Host Chiedza Muguti opens the summit with warmth and purpose. A seasoned product leader and coach, she’ll set the tone for the day—highlighting community, growth, and the power of Black women driving progress through technology and collaboration.'
  },
  {
    id: 'fireside',
    start: `${DAY}T09:45:00${Z}`,
    end: `${DAY}T10:30:00${Z}`,
    title: 'Fireside Chat — Power in Action: Leading the Change and Shaping the Future for Black Women',
    speaker: 'Olamide Olowe — Founder & CEO of Topicals',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68e3cd4f71d2601a907dfd9e_image_50405121%20(2).JPG',
    desc: 'Join Olamide Olowe, Forbes 30 Under 30 founder of Topicals, for a candid conversation on leadership, resilience, and creating impact. Hear how she built one of Sephora’s fastest-growing brands and continues redefining beauty, representation, and success on her own terms.'
  },
  {
    id: 'wealth',
    start: `${DAY}T10:30:00${Z}`,
    end: `${DAY}T11:15:00${Z}`,
    title: 'Level Up Your Wealth: Black Women´s Strategy for Financial Growth and Wealth Generation',
    speaker: 'Dineo Ledwaba-Chapman — Financial Adviser at Belvedere Wealth Management',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68b0c3931b97d76faef7ede6_Dineo%20-%20Photo.jpg',
    desc: 'Led by Dineo Ledwaba-Chapman of Belvedere Wealth Management, this workshop empowers Black women to take control of their financial futures. Discover strategies for income growth, smart investing, and long-term wealth building through practical, life-centred financial planning.'
  },
  {
    id: 'break1',
    start: `${DAY}T11:20:00${Z}`,
    end: `${DAY}T11:30:00${Z}`,
    title: 'Morning Break & Networking',
    img: 'https://media.gettyimages.com/id/1442269395/photo/two-businesswomen-walking-down-the-coworking-stairs.jpg?s=612x612&w=0&k=20&c=uTw48PtN1OcWEz1D_-jgFLzVuqJVSuFOR1O2Q7ptZYo=',
    desc: 'Take a short pause to recharge, connect with peers, and reflect on the morning’s insights. Enjoy refreshments and conversations before the next inspiring panel begins.'
  },
  {
    id: 'founders',
    start: `${DAY}T11:30:00${Z}`,
    end: `${DAY}T12:15:00${Z}`,
    title: 'Panel Discussion – Fueling Progress for Black Female Founders',
    speaker: 'Aneri Pradhan — Founding Partner, Klimatic Ventures, Cosima Richardson — Founder & CEO, Kynd Hair, Leyla F. Karaha — Founder,  YourY Network & Catalyst Noir & Gloria Niiquaye — CEO & Co-Founder, COMESO',
    img: 'images/Aneri_Pradhan-Cosima_Richardson-Leyla_F_Karaha-Gloria_Niiquaye.jpg',
    desc: 'A dynamic panel exploring how Black women founders are scaling impact-driven startups through innovation, partnerships, and resilience. Featuring Aneri Pradhan, Cosima Richardson, Leyla F. Karaha, and Gloria Niiquaye—leaders turning ideas into thriving global ventures.'
  },
  {
    id: 'circle',
    start: `${DAY}T12:15:00${Z}`,
    end: `${DAY}T13:00:00${Z}`,
    title: 'Panel Discussion – Can We Talk for Real? A Sister Circle on Culture, Sector Challenges, and Society',
    speaker: 'Liz Osumba — Product Designer, Zalando, Renee Kapuku — Co-Founder, To My Sisters & Author,  Idowu Adesina — Snr Product Designer, Zalando & Madame Joyce — Presenter, Podcast Host & Producer',
    img: 'https://raw.githubusercontent.com/Lilian-CR/bgts-schedule/refs/heads/main/images/Liz_Osumba-Renee_Kapuku-Idowu_Adesina-Madame_Joyce.jpg',
    desc: 'Four influential women—Liz Osumba, Renee Kapuku, Idowu Adesina, and Madame Joyce—discuss culture, identity, and leadership in this honest, talk-show-style conversation about what it means to thrive as Black women in Europe’s creative and tech industries.'
  },
  {
    id: 'lunch',
    start: `${DAY}T13:00:00${Z}`,
    end: `${DAY}T14:00:00${Z}`,
    title: 'Lunch Break',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQHuhIBm7Xz0WA/feedshare-shrink_2048_1536/B4EZnHoDhnIoAw-/0/1759990791452?e=1762992000&v=beta&t=xcOVrselRKCTQ_EYSkQTNkcNy-Qs0ys1wwh-rlMuQZg',
    desc: 'Enjoy a nourishing meal and inspiring conversation with fellow attendees and industry leaders. A perfect moment to connect, exchange ideas, and refuel for the afternoon sessions.'
  },
  {
    id: 'ai',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: '1. AI & Automation: Unlocking Opportunities for Black Women in Tech',
    speaker: 'Furat Abdulle — Consultant, Avanade · Jane Waithira — Developer, SAP SE',
    img: 'https://raw.githubusercontent.com/Lilian-CR/bgts-schedule/refs/heads/main/images/Furat_Abdulle-Jane_Waithira.jpg',
    desc: 'With Furat Abdulle (Avanade) and Jane Waithira (SAP SE), learn how AI is reshaping industries and how Black women can gain the skills to lead this revolution. Discover accessible paths to upskilling and creating inclusive innovation.'
  },
  {
    id: 'mental',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: '2. Resilience and Rising: Prioritising Mental Health in a Racist and Rising Fascist Society',
    speaker: 'Edith Esong Enowbi — Founder, Roots2Roof Coaching',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/685bb8c1240484e7801d8fc2_Edith%20Esong%20Enowbi.jpg',
    desc: 'Edith Esong Enowbi explores why Black women in Europe must prioritise mental health in challenging times. Discover tools for healing, resilience, and confidence to thrive in an increasingly hostile social and political climate.'
  },
  {
    id: 'content',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: '3. Content Creation & Building Influence: How Black Women Can Lead Industry Conversations on TikTok',
    speaker: 'Amanda Uduku — Social Commerce Strategist & Former TikTok Shop Insider',
    img: 'images/Amanda_Uduku.jpeg',
    desc: 'Former TikTok insider Amanda Uduku reveals how Black women can build authentic influence in the creator economy. Learn to craft impactful content, grow audiences, and turn creativity into sustainable income on platforms like TikTok.'
  },
  {
    id: 'executive',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: '1. Shattering the Glass Ceiling: Black Women Leading in Executive & Board Roles',
    speaker: 'Dr. Audrey-Flore Ngomsik — Board Member and Brussels Policy Advisor',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68be85de6d671f8ef1cb4ef7_Dr%20Audrey-Flore%20Ngomsik%20(3)-min.jpg',
    desc: 'Dr. Audrey-Flore Ngomsik shares strategies for advancing into executive and board leadership. Explore how inclusive governance, sustainability, and representation can redefine corporate culture and drive meaningful change across Europe.'
  },
  {
    id: 'skills',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: '2. Protect Ya Neck: Cybersecurity, Hacking & Owning Your Data',
    speaker: 'Florence Mottay — VP & CISO, Zalando',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68be862a9cdf82cd18e08af8_Florence_Mottay_03.jpg',
    desc: 'Florence Mottay, VP & CISO at Zalando, explains how cybersecurity is power. Learn to safeguard your digital identity, understand online threats, and see security as an essential leadership skill for the modern world.'
  },
  {
    id: 'cv',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: '3. Foundational Skills: Crafting CVs, Applications & Nailing Interviews',
    speaker: 'Ibtehal Hussein — Global Talent Acquisition Team Lead, HelloFresh & Adenike Adekunbi — Talent Acquisition Partner, Germany',
    img: 'images/Ibtehal_Hussein-Adenike_Adekunbi.jpg',
    desc: 'Ibtehal Hussein (HelloFresh) and Adenike Adekunbi guide you through crafting standout CVs and mastering interviews. Gain practical insights to navigate bias, showcase strengths, and confidently advance your career in tech.'
  },
  {
    id: 'break2',
    start: `${DAY}T16:00:00${Z}`,
    end: `${DAY}T16:15:00${Z}`,
    title: 'Afternoon Break & Networking',
    img: 'https://media.gettyimages.com/id/1634161872/photo/young-adult-black-woman-having-coffee-break-at-the-office.jpg?s=612x612&w=0&k=20&c=SnVFYLo71c_VXX9zXk_TU5eme8f6d_ExAxH9rU4WHBw=',
    desc: 'Grab a coffee, chat with peers, and get ready for the final panels of the day. A quick recharge before we close with inspiration and celebration.'
  },
  {
    id: 'media',
    start: `${DAY}T16:15:00${Z}`,
    end: `${DAY}T17:00:00${Z}`,
    title: 'Panel Discussion – Thriving in Digital Media: Black Women Leading the Future of Content and Innovation',
    speaker: 'Sally Osei — Creator Manager, Zalando, Leanne Alie — Executive Producer and Podcast Leader, Jade Vanriel — Property and Lifestyle Content Creator & Oluwatoniloba Dreher Adenuga — Model, Content Creator & Poet',
    img: 'https://media.licdn.com/dms/image/v2/D4E22AQEMXkazuODgDA/feedshare-shrink_1280/B4EZk4qTLtKcAs-/0/1757592238619',
    desc: 'Sally Osei, Leanne Alie, Jade Vanriel, and Oluwatoniloba Dreher Adenuga explore how Black women are shaping digital media and influencer culture. Learn how to build a creative career in a fast-evolving $800 billion global industry.'
  },
  {
    id: 'closing',
    start: `${DAY}T17:00:00${Z}`,
    end: `${DAY}T17:30:00${Z}`,
    title: 'Closing Keynote Talk',
    speaker: 'Emamurho Ugherughe — Global Quality Lead, SAP AI Core Platform',
    img: 'https://cdn.prod.website-files.com/68406261f85bbcb0476c7540/68c8322a9bfcdd3837d51543_IMG_2779.jpg',
    desc: 'Emamurho Ugherughe (SAP AI Core Platform) closes the summit with a message of purpose and progress. Discover how leadership, innovation, and collaboration can drive inclusive technological change worldwide.'
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
    desc: 'End the day with music, drinks, and celebration! Build connections, share reflections, and dance together—because empowerment is also about joy, community, and collective energy. Join the movement. The Shift is here.'
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

    banner.innerHTML = `<div class="box"><span class="upnext">UP NEXT:</span> ${next.title} &#x203A; in ${timeStr}</div>`;
  } else {
    banner.innerHTML = '';
  }
}

// In(n)it
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
