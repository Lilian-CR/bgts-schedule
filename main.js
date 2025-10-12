const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const DAY = '2025-11-13', Z = '+01:00';

const schedule = [
  {
    id: 'opening',
    start: `${DAY}T09:30:00${Z}`,
    end: `${DAY}T09:45:00${Z}`,
    title: 'Opening Remarks & Welcome',
    speaker: 'Chiedza Muguti',
    img: '',
    desc: 'Kick off the summit with inspiring remarks by product leader and coach Chiedza Muguti, setting the tone for a day of empowerment and connection.'
  },
  {
    id: 'fireside',
    start: `${DAY}T09:45:00${Z}`,
    end: `${DAY}T10:30:00${Z}`,
    title: 'Fireside Chat — Power in Action',
    speaker: 'Olamide Olowe',
    img: '',
    desc: 'A conversation with Olamide Olowe, founder of Topicals, on leadership, resilience, and driving systemic change in beauty and beyond.'
  },
  {
    id: 'wealth',
    start: `${DAY}T10:30:00${Z}`,
    end: `${DAY}T11:15:00${Z}`,
    title: 'Level Up Your Wealth',
    speaker: 'Dineo Ledwaba-Chapman',
    img: '',
    desc: 'Practical tools for financial growth and investment strategies tailored to Black women’s long-term wealth and independence.'
  },
  {
    id: 'break1',
    start: `${DAY}T11:20:00${Z}`,
    end: `${DAY}T11:30:00${Z}`,
    title: 'Break & Networking',
    desc: 'Short networking break — connect and recharge.'
  },
  {
    id: 'founders',
    start: `${DAY}T11:30:00${Z}`,
    end: `${DAY}T12:15:00${Z}`,
    title: 'Fueling Progress for Black Female Founders',
    speaker: 'Panel: Aneri Pradhan, Cosima Richardson, Leyla F Karaha, Gloria Niiquaye',
    img: '',
    desc: 'Explore pathways for scaling Black women-led startups and building sustainable, inclusive ventures across Europe and Africa.'
  },
  {
    id: 'circle',
    start: `${DAY}T12:15:00${Z}`,
    end: `${DAY}T13:00:00${Z}`,
    title: 'Can We Talk for Real? A Sister Circle',
    speaker: 'Panel: Liz Osumba, Renee Kapuku, Idowu Adesina, Madame Joyce',
    img: '',
    desc: 'A candid discussion on culture, challenges, and sisterhood within tech and creative industries.'
  },
  {
    id: 'lunch',
    start: `${DAY}T13:00:00${Z}`,
    end: `${DAY}T14:00:00${Z}`,
    title: 'Lunch & Networking',
    desc: 'Enjoy a networking lunch with industry leaders and peers.'
  },
  {
    id: 'ai',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: 'AI & Automation: Unlocking Opportunities',
    speaker: 'Furat Abdulle, Jane Waithira',
    img: '',
    desc: 'Insights on leveraging AI and automation for career growth and inclusive innovation in tech.'
  },
  {
    id: 'mental',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: 'Resilience and Rising',
    speaker: 'Edith Esong Enowbi',
    img: '',
    desc: 'Strategies for prioritising mental health and resilience for Black women in Europe.'
  },
  {
    id: 'content',
    start: `${DAY}T14:00:00${Z}`,
    end: `${DAY}T15:00:00${Z}`,
    title: 'Content Creation & Building Influence',
    desc: 'Practical guidance on building digital influence and income across LinkedIn, TikTok, and beyond.'
  },
  {
    id: 'executive',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: 'Shattering the Glass Ceiling',
    speaker: 'Dr. Audrey-Flore Ngomsik',
    img: '',
    desc: 'Empowering session on advancing into leadership and board roles across Europe.'
  },
  {
    id: 'skills',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: 'Future-Proof Your Skills',
    speaker: 'Florence Mottay',
    img: '',
    desc: 'Trends and future-ready tech skills every Black woman needs to thrive in 2026 and beyond.'
  },
  {
    id: 'cv',
    start: `${DAY}T15:00:00${Z}`,
    end: `${DAY}T16:00:00${Z}`,
    title: 'Crafting CVs & Nailing Interviews',
    speaker: 'Ibtehal Hussein, Adenike Adekunbi',
    img: '',
    desc: 'CV and interview tips tailored for standing out in today’s competitive market.'
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
    title: 'Thriving in Digital Media',
    speaker: 'Sally Osei, Leanne Alie, Jade Vanriel, Oluwatoniloba Dreher Adenuga',
    img: '',
    desc: 'Black women leading the digital content revolution — building inclusive media futures.'
  },
  {
    id: 'closing',
    start: `${DAY}T17:00:00${Z}`,
    end: `${DAY}T17:30:00${Z}`,
    title: 'Closing Keynote Talk',
    speaker: 'Emamurho Ugherughe',
    img: '',
    desc: 'Final keynote by SAP’s Global Quality Lead on leadership, technology, and purpose.'
  },
  {
    id: 'afterparty',
    start: `${DAY}T17:30:00${Z}`,
    end: `${DAY}T19:00:00${Z}`,
    title: 'After-party!!!',
    desc: 'Music, joy, community and connection to wrap up the Summit.'
  }
];

function fmt(iso){return new Date(iso).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});}
function within(now, s, e){return now>=new Date(s)&&now<new Date(e);}
function past(now,e){return now>=new Date(e);}

function renderList(){
  const now=Date.now();
  const list=schedule.map(s=>{
    const isCurrent=within(now,s.start,s.end);
    const isPast=past(now,s.end);
    const cls=isCurrent?'session current':isPast?'session past':'session';
    return `
      <article id="${s.id}" class="${cls}">
        <h3>${s.title}${isCurrent?'<span class="live-tag"> LIVE</span>':''}</h3>
        <small>${fmt(s.start)}–${fmt(s.end)} ${s.speaker?`· ${s.speaker}`:''}</small>
        ${s.img?`<img src="${s.img}" alt="${s.speaker||s.title}">`:''}
        <p class="desc">${s.desc}</p>
      </article>`;
  }).join('');
  $('#schedule').innerHTML=list;
  $$('#schedule article').forEach(el=>el.onclick=()=>el.classList.toggle('open'));
  renderBanner(now);
}

function renderBanner(now){
  const current=schedule.find(s=>within(now,s.start,s.end));
  const next=schedule.find(s=>new Date(s.start)>now);
  const banner=$('#liveBanner');
  if(current){
    banner.innerHTML=`Now: ${current.title}`;
  }else if(next){
    const mins=Math.round((new Date(next.start)-now)/60000);
    banner.innerHTML=`Up Next: ${next.title} in ${mins} min`;
  }else banner.innerHTML='';
}

document.addEventListener('DOMContentLoaded',()=>{
  $('#tzLabel').textContent='CET (UTC+1)';
  renderList();
  setInterval(renderList,30000);
  $('#showAll').onclick=()=>$$('#schedule article').forEach(el=>el.style.display='');
  $('#showCurrent').onclick=()=>{
    const now=Date.now();
    $$('#schedule article').forEach(el=>{
      const s=schedule.find(x=>x.id===el.id);
      el.style.display=within(now,s.start,s.end)?'':'none';
    });
  };
  $('#scrollTop').onclick=()=>window.scrollTo({top:0,behavior:'smooth'});
});
