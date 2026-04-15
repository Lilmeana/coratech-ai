/* ===== CORATECH AI — SHARED JAVASCRIPT ===== */

// ===== NAV SCROLL =====
window.addEventListener('scroll', function(){
  var nav = document.getElementById('mainNav');
  if(nav) nav.classList.toggle('scrolled', window.scrollY > 30);
  var st = document.getElementById('scrollTop');
  if(st) st.classList.toggle('visible', window.scrollY > 400);
});

// ===== HAMBURGER MENU =====
function toggleMenu(){
  var btn = document.querySelector('.hamburger');
  var menu = document.getElementById('mobileMenu');
  if(!btn || !menu) return;
  btn.classList.toggle('open');
  if(menu.classList.contains('open')){
    menu.classList.remove('open');
    menu.style.display = '';
    document.body.style.overflow = '';
  } else {
    menu.style.display = 'flex';
    requestAnimationFrame(function(){
      menu.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
  }
}

function closeMenu(){
  var btn = document.querySelector('.hamburger');
  var menu = document.getElementById('mobileMenu');
  if(btn) btn.classList.remove('open');
  if(menu){ menu.classList.remove('open'); document.body.style.overflow = ''; }
}

// Close menu on outside tap
document.addEventListener('click', function(e){
  var menu = document.getElementById('mobileMenu');
  var hamburger = document.querySelector('.hamburger');
  if(menu && menu.classList.contains('open') && !menu.contains(e.target) && hamburger && !hamburger.contains(e.target)){
    closeMenu();
  }
});

// ===== FAQ ACCORDION =====
function toggleFaq(btn){
  var item = btn.closest('.faq-item');
  var isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(function(el){ el.classList.remove('open'); });
  if(!isOpen) item.classList.add('open');
}

// ===== FADE IN OBSERVER =====
function initFadeIn(){
  if(!window.IntersectionObserver) {
    document.querySelectorAll('.fade-in').forEach(function(el){ el.classList.add('visible'); });
    return;
  }
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){ entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
  },{threshold:0.12});
  document.querySelectorAll('.fade-in').forEach(function(el){ obs.observe(el); });
}
document.addEventListener('DOMContentLoaded', initFadeIn);

// ===== SCROLL TO TOP =====
function scrollToTop(){
  window.scrollTo({top:0,behavior:'smooth'});
}

// ===== BOOKING MODAL =====
var selDate='',selTime='',selType='';
var monthOffset=0;
var MONTH_NAMES=['January','February','March','April','May','June','July','August','September','October','November','December'];
var DAY_NAMES=['Su','Mo','Tu','We','Th','Fr','Sa'];

function openBooking(){
  var modal = document.getElementById('bookingModal');
  if(!modal) return;
  modal.classList.add('open');
  document.body.style.overflow='hidden';
  renderCal();
}
function closeBooking(){
  var modal = document.getElementById('bookingModal');
  if(modal) modal.classList.remove('open');
  document.body.style.overflow='';
}

function selectBookingType(el,type){
  document.querySelectorAll('.booking-type').forEach(function(b){ b.classList.remove('selected'); });
  el.classList.add('selected');
  selType=type;
}
function renderCal(){
  var wrap = document.getElementById('calGrid');
  if(!wrap) return;
  var now = new Date(); now.setDate(1); now.setMonth(now.getMonth()+monthOffset);
  var y=now.getFullYear(), m=now.getMonth();
  var first=new Date(y,m,1).getDay(), days=new Date(y,m+1,0).getDate();
  var today=new Date();
  var label=document.getElementById('calMonthLabel');
  if(label) label.textContent=MONTH_NAMES[m]+' '+y;
  var html='';
  DAY_NAMES.forEach(function(d){ html+='<div class="cal-day-name">'+d+'</div>'; });
  for(var i=0;i<first;i++) html+='<div class="cal-day empty"></div>';
  for(var d=1;d<=days;d++){
    var dt=new Date(y,m,d);
    var past=dt<today&&dt.toDateString()!==today.toDateString();
    var sel=selDate===''+y+'-'+(m+1)+'-'+d;
    html+='<div class="cal-day'+(past?' past':'')+(sel?' selected':'')+'" onclick="selectDate('+y+','+(m+1)+','+d+')">'+d+'</div>';
  }
  wrap.innerHTML=html;
}
function prevMonth(){ monthOffset--; renderCal(); }
function nextMonth(){ monthOffset++; renderCal(); }
function selectDate(y,m,d){
  selDate=y+'-'+m+'-'+d;
  renderCal();
  var ts=document.getElementById('timeSlots');
  if(ts) ts.style.display='grid';
}
function selectTime(slot,el){
  selTime=slot;
  document.querySelectorAll('.time-slot').forEach(function(t){ t.classList.remove('selected'); });
  el.classList.add('selected');
}
function confirmBooking(){
  if(!selDate||!selTime){ alert('Please select a date and time to continue.'); return; }
  var nameEl=document.getElementById('bookName'), emailEl=document.getElementById('bookEmail'), msgEl=document.getElementById('bookMsg');
  if(nameEl&&!nameEl.value.trim()){ alert('Please enter your name.'); return; }
  if(emailEl&&!emailEl.value.trim()){ alert('Please enter your email.'); return; }
  document.getElementById('bookingForm').style.display='none';
  document.getElementById('bookingConfirm').style.display='block';
}

// ===== CHATBOT =====
var cbOpen=false, cbLeadCaptured=false, cbMsgs=[];
var cbFaqData=[
  {q:'What is AI automation?',a:'AI automation uses artificial intelligence to handle tasks that normally need human time — responding to queries, processing documents, generating reports, or routing data between systems.'},
  {q:'Do I need technical skills?',a:'Not at all. Everything we build is designed to be used by non-technical staff. We provide full training and documentation with every project.'},
  {q:'How long does implementation take?',a:'Most projects go from our first conversation to a working prototype in 4–8 weeks.'},
  {q:'Can AI integrate with my existing tools?',a:'Almost certainly. We regularly connect AI with CRMs, Google Workspace, Microsoft 365, Slack, WhatsApp, and more.'},
  {q:'Is AI expensive for a small business?',a:'AI is far more affordable than most people expect. We offer fixed-fee projects and most clients see ROI within months.'}
];

function cbAddMsg(text,type,asHtml){
  var d=document.getElementById('cbMessages');
  if(!d) return;
  var m=document.createElement('div');
  m.className='cb-msg '+type;
  if(asHtml){ m.innerHTML=text; } else { m.textContent=text; }
  d.appendChild(m); d.scrollTop=d.scrollHeight; cbMsgs.push({type,text});
}
function cbShowQuick(show){ var el=document.getElementById('cbQuickBtns'); if(el) el.style.display=show?'flex':'none'; }
function cbShowLeadForm(show){
  var el=document.getElementById('cbLeadForm'); if(!el) return;
  el.style.display=show?'flex':'none';
  if(show){ var n=document.getElementById('cbLeadName'); if(n) n.focus(); }
}
function cbHideAllActions(){
  cbShowQuick(false); cbShowLeadForm(false);
  var wa=document.getElementById('cbWhatsappRow'); if(wa) wa.style.display='none';
}
function toggleChatbot(){
  cbOpen=!cbOpen;
  var win=document.getElementById('chatbot-window'); if(!win) return;
  win.classList.toggle('open',cbOpen);
  var badge=document.querySelector('.chatbot-badge'); if(badge) badge.style.display='none';
  if(cbOpen&&cbMsgs.length===0){
    setTimeout(function(){
      cbAddMsg("Hi, I'm the Coratech AI Assistant. How can I help you today?",'bot');
      setTimeout(function(){ cbAddMsg("Select one of the options below to get started, or just type your question.",'bot'); cbShowQuick(true); },700);
    },300);
  }
}
function cbNewChat(){
  var d=document.getElementById('cbMessages'); if(d) d.innerHTML='';
  cbMsgs=[]; cbLeadCaptured=false;
  cbHideAllActions(); cbShowQuick(true);
  cbAddMsg("Hi, I'm the Coratech AI Assistant. How can I help you today?",'bot');
  setTimeout(function(){ cbAddMsg("Select an option below or type your question.",'bot'); },500);
}
function cbQuickAction(action){
  var labels={book:'Book a Consultation',solutions:'Our AI Solutions',usecases:'See Use Cases',faq:'FAQs',human:'Talk to a Person'};
  cbShowQuick(false); cbAddMsg(labels[action],'user');
  setTimeout(function(){
    if(action==='book'){
      cbAddMsg("To book a free discovery call, fill in the form below and our team will confirm your slot within a few hours.",'bot');
      setTimeout(function(){ cbShowLeadForm(true); },400);
    } else if(action==='solutions'){
      cbAddMsg("We offer five core AI solutions:\n\n1. AI Strategy & Readiness\n2. Automation & Workflows\n3. Internal Knowledge Hubs\n4. Chatbots & Conversational AI\n5. AI Dashboards & Analytics\n\nWhich would you like to know more about?",'bot');
      setTimeout(cbAddNewChatBtn,400);
    } else if(action==='usecases'){
      cbAddMsg("Popular use cases:\n\n• AI Customer Service Agent — handles queries 24/7\n• Internal Knowledge Hub — find any document instantly\n• Automated Reporting — reports that write themselves\n• Lead Qualification AI — auto-score your leads\n• Document Processing — zero data entry",'bot');
      setTimeout(cbAddNewChatBtn,400);
    } else if(action==='faq'){
      cbAddMsg("Here are our most common questions. Tap one to read the answer.",'bot');
      setTimeout(function(){
        var html='<div style="display:flex;flex-direction:column;gap:.4rem;margin-top:.3rem">';
        cbFaqData.forEach(function(item,i){ html+='<button onclick="cbShowFaqAnswer('+i+')" style="background:var(--glass);border:1px solid var(--border);color:var(--white);font-size:.8rem;font-weight:500;padding:.55rem .9rem;border-radius:10px;cursor:pointer;text-align:left;font-family:Inter,sans-serif">'+item.q+'</button>'; });
        html+='</div>'; cbAddMsg(html,'bot',true); setTimeout(cbAddNewChatBtn,200);
      },400);
    } else if(action==='human'){
      cbAddMsg("Of course. Share your details below and we'll be in touch within a few business hours.",'bot');
      setTimeout(function(){ cbShowLeadForm(true); var wa=document.getElementById('cbWhatsappRow'); if(wa) wa.style.display='block'; },400);
    }
  },500);
}
function cbShowFaqAnswer(i){
  var item=cbFaqData[i]; cbAddMsg(item.q,'user');
  setTimeout(function(){ cbAddMsg(item.a,'bot'); setTimeout(cbAddNewChatBtn,400); },400);
}
function cbAddNewChatBtn(){
  var d=document.getElementById('cbMessages'); if(!d) return;
  var div=document.createElement('div'); div.style.cssText='text-align:center;margin-top:.5rem';
  div.innerHTML='<button onclick="cbNewChat()" style="background:rgba(99,102,241,.12);border:1px solid var(--border);color:var(--muted);font-size:.75rem;padding:.4rem .9rem;border-radius:100px;cursor:pointer;font-family:Inter,sans-serif">Start a new chat</button>';
  d.appendChild(div); d.scrollTop=d.scrollHeight;
}
function cbSend(){
  var inp=document.getElementById('cbInput'); if(!inp) return;
  var val=inp.value.trim(); if(!val) return;
  cbAddMsg(val,'user'); inp.value=''; cbHideAllActions();
  var lower=val.toLowerCase();
  if(lower.includes('thank')){
    setTimeout(function(){ cbAddMsg("You're welcome. Feel free to reach out any time.",'bot'); setTimeout(toggleChatbot,1800); },500);
    return;
  }
  setTimeout(function(){
    var resp='';
    if(lower.includes('price')||lower.includes('cost')||lower.includes('much'))
      resp='We offer fixed-fee project pricing designed for SME budgets. The best way to get an accurate quote is through a free 30-minute discovery call — no obligation.';
    else if(lower.includes('book')||lower.includes('call')||lower.includes('consult'))
      resp='To book a call, share your name, email, and phone number below.';
    else if(lower.includes('whatsapp')||lower.includes('phone')||lower.includes('contact'))
      resp='You can reach us on WhatsApp: Ghana +233 536 026 175 | UK +44 7832 956 639. Or email hello@coratechai.com.';
    else if(lower.includes('time')||lower.includes('how long'))
      resp='Most projects go from first conversation to a working prototype in 4–8 weeks.';
    else if(lower.includes('data')||lower.includes('safe')||lower.includes('secur'))
      resp='Data security is built into every solution. We work within your own cloud environment — your data stays under your control at all times.';
    else
      resp="That's a great question. For the most helpful answer, I'd suggest speaking directly with one of our team — it's a free 30-minute call with no commitment.";
    cbAddMsg(resp,'bot');
    if(resp.includes('name, email')){ setTimeout(function(){ cbShowLeadForm(true); },400); }
    else { setTimeout(cbAddNewChatBtn,400); }
  },700);
}
function cbSubmitLead(){
  var n=document.getElementById('cbLeadName'), e=document.getElementById('cbLeadEmail'), p=document.getElementById('cbLeadPhone');
  if(!n||!n.value.trim()){ alert('Please enter your name.'); return; }
  if(!e||!e.value.trim()){ alert('Please enter your email.'); return; }
  cbShowLeadForm(false); var wa=document.getElementById('cbWhatsappRow'); if(wa) wa.style.display='none';
  cbAddMsg("Name: "+n.value.trim()+"\nEmail: "+e.value.trim()+(p&&p.value.trim()?"\nPhone: "+p.value.trim():''),'user');
  n.value=''; e.value=''; if(p) p.value=''; cbLeadCaptured=true;
  setTimeout(function(){ cbAddMsg("Thank you! A member of our team will be in touch within a few business hours to confirm your session.",'bot'); },600);
}

// ===== CONTACT FORMS =====
function submitContact(){
  var n=document.getElementById('cName'), e=document.getElementById('cEmail'), m=document.getElementById('cMessage');
  if(n&&!n.value.trim()){ alert('Please enter your name.'); return; }
  if(e&&!e.value.trim()){ alert('Please enter your email.'); return; }
  if(m&&!m.value.trim()){ alert('Please enter your message.'); return; }
  var s=document.getElementById('formSuccess'); if(s){ s.style.display='block'; }
  if(n) n.value=''; if(e) e.value=''; if(m) m.value='';
}
function submitContact2(){
  var n=document.getElementById('cName2'), e=document.getElementById('cEmail2'), m=document.getElementById('cMessage2');
  if(n&&!n.value.trim()){ alert('Please enter your name.'); return; }
  if(e&&!e.value.trim()){ alert('Please enter your email.'); return; }
  if(m&&!m.value.trim()){ alert('Please enter your message.'); return; }
  var s=document.getElementById('formSuccess2'); if(s){ s.style.display='block'; }
  if(n) n.value=''; if(e) e.value=''; if(m) m.value='';
}

// ===== INDUSTRY DETAILS =====
var industryData = {
  retail: {
    title:'Retail & eCommerce',
    desc:'AI solutions that personalise the customer journey, streamline operations, and turn your data into a competitive advantage.',
    cards:[
      {label:'Customer Experience',icon:'person',title:'Personalisation Engine',desc:'Deliver product recommendations, dynamic pricing, and personalised emails based on real customer behaviour.',outcome:'Up to 35% increase in average order value'},
      {label:'Operations',icon:'inventory',title:'Inventory AI',desc:'Predict demand and automate reorder points to reduce overstock and prevent stockouts.',outcome:'30–50% reduction in excess inventory'},
      {label:'Support',icon:'support_agent',title:'AI Customer Service',desc:'Handle returns, order tracking, and FAQs automatically across web and WhatsApp — 24/7.',outcome:'70% query resolution without human input'}
    ]
  },
  healthcare: {
    title:'Healthcare',
    desc:'Responsible, compliant AI solutions designed to improve patient outcomes and operational efficiency.',
    cards:[
      {label:'Clinical',icon:'monitor_heart',title:'Clinical Decision Support',desc:'Flag risk patients, surface drug interactions, and support diagnosis with evidence-based recommendations.',outcome:'20% reduction in missed diagnoses'},
      {label:'Operations',icon:'calendar_today',title:'Appointment & Scheduling AI',desc:'Reduce no-shows and optimise clinical scheduling with predictive AI.',outcome:'35% reduction in appointment no-shows'},
      {label:'Admin',icon:'description',title:'Medical Documentation',desc:'Auto-generate clinical notes, discharge summaries, and referral letters from dictation.',outcome:'2+ hours saved per clinician per day'}
    ]
  },
  finance: {
    title:'Finance & Banking',
    desc:'AI that enhances risk management, detects fraud, and delivers better financial experiences.',
    cards:[
      {label:'Risk',icon:'security',title:'Fraud Detection AI',desc:'Real-time anomaly detection across transactions, catching fraud patterns before they escalate.',outcome:'Up to 80% reduction in fraud losses'},
      {label:'Compliance',icon:'gavel',title:'Regulatory AI',desc:'Automated KYC checks, AML monitoring, and regulatory reporting — reducing manual compliance workload.',outcome:'60% faster compliance reporting'},
      {label:'Advisory',icon:'trending_up',title:'AI Financial Advisor',desc:'Personalised financial guidance and automated portfolio rebalancing at scale.',outcome:'3x increase in client engagement'}
    ]
  },
  legal: {
    title:'Legal',
    desc:'AI that accelerates document review, improves accuracy, and frees lawyers for high-value work.',
    cards:[
      {label:'Documents',icon:'article',title:'Contract Intelligence',desc:'Automated clause extraction, risk flagging, and contract comparison — 10x faster than manual review.',outcome:'94% clause extraction accuracy'},
      {label:'Research',icon:'search',title:'Legal Research AI',desc:'Surface relevant case law, statutes, and precedents in seconds rather than hours.',outcome:'80% reduction in research time'},
      {label:'Due Diligence',icon:'fact_check',title:'Due Diligence Automation',desc:'Process thousands of documents in M&A due diligence at a fraction of the traditional cost and time.',outcome:'75% faster due diligence cycles'}
    ]
  },
  agriculture: {
    title:'Agriculture',
    desc:'Data-driven AI solutions to maximise yield, reduce waste, and improve supply chain efficiency.',
    cards:[
      {label:'Yield',icon:'eco',title:'Crop Yield Prediction',desc:'Machine learning models that predict yield based on weather, soil, and historical data.',outcome:'15–25% increase in yield efficiency'},
      {label:'Operations',icon:'water_drop',title:'Smart Irrigation AI',desc:'Automate irrigation scheduling based on real-time soil moisture and weather data.',outcome:'40% reduction in water usage'},
      {label:'Supply Chain',icon:'local_shipping',title:'Supply Chain Optimisation',desc:'Reduce post-harvest waste and improve logistics timing with demand-forecasting AI.',outcome:'20% reduction in post-harvest losses'}
    ]
  },
  education: {
    title:'Education',
    desc:'AI solutions that improve student outcomes and reduce the administrative burden on educators.',
    cards:[
      {label:'Learning',icon:'school',title:'Adaptive Learning AI',desc:'Personalise learning pathways for each student based on their pace, strengths, and gaps.',outcome:'28% improvement in test scores'},
      {label:'Analytics',icon:'bar_chart',title:'Student Success Prediction',desc:'Identify at-risk students early and trigger timely interventions.',outcome:'40% reduction in dropout rates'},
      {label:'Admin',icon:'assignment',title:'AI Admin Assistant',desc:'Automate admissions, timetabling, and communications for administrative teams.',outcome:'15+ hours saved per week per admin'}
    ]
  }
};

function showIndustry(key){
  var data=industryData[key]; if(!data) return;
  var detail=document.getElementById('industryDetail'); if(!detail) return;
  var html='<div style="margin-bottom:2rem"><h2 style="font-family:\'Syne\',sans-serif;font-size:1.8rem;font-weight:800;margin-bottom:.75rem">'+data.title+'</h2><p style="color:var(--muted);line-height:1.8;max-width:600px;font-weight:300">'+data.desc+'</p></div>';
  html+='<div class="ind-detail-grid">';
  data.cards.forEach(function(c){
    html+='<div class="ind-detail-card"><div class="idc-label"><span class="material-symbols-outlined" style="font-size:.9rem">'+c.icon+'</span>'+c.label+'</div><h4>'+c.title+'</h4><p>'+c.desc+'</p><div class="ind-outcome">'+c.outcome+'</div></div>';
  });
  html+='</div>';
  detail.innerHTML=html; detail.classList.add('active');
  detail.scrollIntoView({behavior:'smooth',block:'start'});
}

// ===== INSIGHT ARTICLES =====
var insightArticles={
  'ai-frontlines':{
    tag:'Leadership',readTime:'8 min read',date:'March 2025',
    title:'Building Production AI: Lessons from the Frontlines',
    body:'<h2>The Problem</h2><p>Most businesses that invest in AI don\'t fail because the technology doesn\'t work — they fail because the implementation is treated as a technical project rather than a business one. The result? Expensive pilots that never reach production, internal resistance, and wasted budget.</p><div class="article-callout"><p>Over 70% of AI pilots fail to reach production. The reasons are almost never technical.</p></div><h2>What Actually Works</h2><p>Production-ready AI starts with clear business outcomes, not technology choices. Before writing a line of code, the best teams spend time understanding the problem, the data, the people, and what success actually looks like.</p><h3>Things that consistently separate success from failure</h3><ul><li><strong>One clear success metric</strong> — teams with a single measurable goal outperform those with vague objectives by 3x.</li><li><strong>Data review in week one</strong> — not month three.</li><li><strong>Users involved in the design</strong> — tools designed with end users are adopted at twice the rate.</li><li><strong>Prototype before you build</strong> — testing against real data early eliminates the biggest risks at the lowest cost.</li></ul><div class="article-example"><h4>A Real Example</h4><p>A logistics company wanted to "build an AI that summarises operations data." After one discovery session, we reframed it as: reduce dispatcher reporting time from 4 hours to 15 minutes. The tool now takes 12 minutes.</p></div>'
  },
  'roi-framework':{
    tag:'ROI & Measurement',readTime:'6 min read',date:'February 2025',
    title:'Delivering Measurable ROI with AI: A Framework for SMEs',
    body:'<h2>The Problem</h2><p>AI investments are hard to justify without a clear way to measure return. Many businesses invest, see some activity, but struggle to answer: what are we actually getting for this money?</p><div class="article-callout"><p>Businesses with a defined AI ROI framework are 4x more likely to expand their AI investment after the first deployment.</p></div><h2>A Simple Four-Dimension Framework</h2><p>We use four lenses to measure AI value: Time Saved, Cost Reduced, Revenue Generated, and Risk Mitigated.</p><h3>The Four Dimensions</h3><ul><li><strong>Time Saved:</strong> Hours per week recovered from manual tasks × average hourly cost</li><li><strong>Cost Reduced:</strong> Direct reduction in headcount, errors, or operational spend</li><li><strong>Revenue Generated:</strong> Better conversion, higher order value, or faster sales cycles</li><li><strong>Risk Mitigated:</strong> Compliance issues avoided, fraud prevented, downtime reduced</li></ul><div class="article-example"><h4>Professional Services Firm</h4><p>A 60-person consultancy deployed an internal knowledge hub. Time saved: 23 minutes per staff per day. At 60 staff × 240 working days, that\'s over £80,000 in annual productivity value from an £18,000 build cost.</p></div>'
  },
  'sme-use-cases':{
    tag:'Strategy',readTime:'10 min read',date:'January 2025',
    title:'5 AI Use Cases Every SME Should Consider in 2025',
    body:'<h2>The Reality in 2025</h2><p>For most SMEs, AI used to feel like something for large enterprises with big tech teams. That\'s no longer true. The most impactful AI applications are now accessible, affordable, and deployable in weeks.</p><h3>1. AI Customer Service Agent</h3><p>Handle FAQs, order queries, and support tickets automatically — 24/7, across web and WhatsApp.</p><h3>2. Internal Knowledge Hub</h3><p>Make your company\'s documents, SOPs, and institutional knowledge instantly searchable.</p><h3>3. Automated Reporting</h3><p>Replace manual reporting with AI dashboards that update automatically.</p><h3>4. Lead Qualification AI</h3><p>Score and prioritise inbound leads automatically using signals from your CRM and website behaviour.</p><h3>5. Document Processing</h3><p>Automate the extraction, classification, and routing of invoices, contracts, and forms.</p>'
  },
  'workflow-automation':{
    tag:'Automation',readTime:'7 min read',date:'December 2024',
    title:'How Workflow Automation Is Transforming Operations for SMEs',
    body:'<h2>The Problem</h2><p>The average knowledge worker spends 4.5 hours per week on repetitive manual tasks. Across a 20-person team, that\'s 90 hours of lost productivity every single week.</p><div class="article-callout"><p>Businesses that automate even 30% of their manual workflows report saving £40,000–£120,000 per year in operational costs.</p></div><h2>What Can Be Automated?</h2><ul><li>Invoice and document processing</li><li>Customer onboarding sequences</li><li>Lead routing and CRM updates</li><li>Weekly and monthly reporting</li><li>Inventory and stock management alerts</li><li>Internal approval workflows</li></ul><div class="article-example"><h4>Transport & Logistics</h4><p>A 35-person logistics firm was spending 12+ hours per week manually updating client records. We automated the entire post-delivery workflow. Result: 11 hours recovered per week, zero errors.</p></div>'
  },
  'ai-customer-service':{
    tag:'Chatbots',readTime:'5 min read',date:'November 2024',
    title:'Why Every SME Should Have an AI Customer Service Agent',
    body:'<h2>The Problem</h2><p>Customer expectations have shifted permanently. People now expect instant responses, around the clock. For a small team, meeting this expectation manually is either exhausting or simply impossible.</p><div class="article-callout"><p>64% of customers prefer to interact with an AI chatbot over waiting for a human — provided the AI can actually answer their question accurately.</p></div><h2>What It Can Handle</h2><ul><li>Order status and tracking queries</li><li>Returns and refund requests</li><li>Product and service FAQs</li><li>Booking and appointment requests</li><li>Lead qualification before handoff to sales</li></ul><div class="article-example"><h4>eCommerce Brand</h4><p>An online retailer deployed our AI agent across their website and WhatsApp. Within 6 weeks: 71% of queries resolved without human input, average first-response time dropped from 3.5 hours to 8 seconds.</p></div>'
  },
  'knowledge-hubs':{
    tag:'Knowledge Management',readTime:'6 min read',date:'October 2024',
    title:'How Internal Knowledge Hubs Are Changing the Way Teams Work',
    body:'<h2>The Problem</h2><p>The average employee spends 1.8 hours per day searching for information — documents buried in shared drives, answers locked in a colleague\'s head. As businesses grow, this problem gets worse.</p><div class="article-callout"><p>McKinsey estimates employees spend 19% of their working week searching for information. AI knowledge hubs can reclaim most of that time.</p></div><h2>How It Works</h2><p>An internal AI knowledge hub connects your existing documents — SharePoint, Google Drive, Notion — and gives every employee a conversational interface to ask questions and get sourced answers in seconds.</p><ul><li>Your documents are indexed and stored securely</li><li>Staff ask questions in plain English via a chat interface</li><li>Every answer cites its source — so you can verify it</li><li>New documents are indexed automatically</li></ul>'
  }
};

var currentArticle = null;
function showArticle(slug, returnPage){
  var a = insightArticles[slug]; if(!a) return;
  currentArticle = { slug, returnPage: returnPage || 'insights.html' };
  sessionStorage.setItem('articleData', JSON.stringify({slug, returnPage: returnPage || 'insights.html'}));
  window.location.href = 'pages/article.html?slug=' + slug + '&from=' + encodeURIComponent(returnPage || 'insights.html');
}
