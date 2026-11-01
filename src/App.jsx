import React, { useState, useEffect, useMemo } from 'react';
import {
  Code2,
  Server,
  Database,
  Layout,
  Terminal,
  Sparkles,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Send,
  Copy,
  Check,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  TrendingUp,
  Satellite,
  CloudSun,
  IceCream,
  FileText,
  Globe,
  ArrowUpRight,
  ShieldAlert,
  Activity,
  ChevronRight,
  UserCheck,
  Inbox,
  Trash2,
  Download,
  X,
  Filter,
  Cpu,
  MessageSquare,
  Clock,
  IndianRupee
} from 'lucide-react';

// --- INITIAL SAMPLE INBOX REQUESTS FOR STUDIO PREVIEW ---
const INITIAL_REQUESTS = [
  {
    id: 'REQ-1042',
    clientName: 'Karthik Subramanian',
    clientEmail: 'karthik.s@chennaiventures.in',
    clientPhone: '+91 98401 23456',
    company: 'NextWave FinTech',
    serviceType: 'Full-Stack Web App (React + FastAPI)',
    features: ['Dashboard & Analytics', 'REST API Backend', 'PostgreSQL Database', 'Authentication Flow'],
    budget: '₹25,000 – ₹50,000',
    timeline: '3 - 4 Weeks',
    brief: 'We loved your IMA Trade project! Looking to build an internal portfolio analytics dashboard with FastAPI and React.',
    createdAt: 'Just now',
    status: 'New'
  }
];

// --- PROJECTS DATA ---
const PROJECTS = [
  {
    id: 'ima-trade',
    title: 'IMA Trade',
    subtitle: 'AI-Based Stock Market Analysis & Paper Trading System',
    category: 'Full-Stack • FinTech & AI',
    badge: 'Featured Flagship',
    accent: 'emerald',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'JavaScript', 'REST API'],
    summary:
      'A full-stack paper-trading platform with a virtual ₹1,00,000 balance for simulated stock transactions, interactive AI market signals, and real-time portfolio risk tracking.',
    highlights: [
      'Built a full-stack paper-trading platform with a virtual ₹1,00,000 balance for simulated stock transactions.',
      'Implemented dashboard, market search, trading interface, portfolio valuation, holdings, P&L tracking, trading history, and price alerts.',
      'Developed interactive market-signal and risk-analysis sections with Buy/Hold/Sell style insights and portfolio monitoring.',
      'Connected React frontend with FastAPI backend and PostgreSQL for application data and authentication workflows.'
    ],
    architecture: {
      frontend: 'React + Vite Interactive Dashboard, Live Order Ticket & P&L Charts',
      backend: 'FastAPI Asynchronous REST Endpoints + JWT Auth + Signal Engine',
      database: 'PostgreSQL Relational Schema (Users, Holdings, Orders, Price Alerts)'
    },
    hasInteractiveDemo: 'ima-trade'
  },
  {
    id: 'orbitguard',
    title: 'ORBITGUARD (TAPERS 395TF)',
    subtitle: 'Satellite Collision Risk & Orbit Anomaly Monitoring System',
    category: 'Full-Stack • Aerospace Telemetry',
    badge: 'Final-Year CSE Project',
    accent: 'cyan',
    tech: ['React', 'FastAPI', 'PostgreSQL', 'Python', 'REST API'],
    summary:
      'A specialized satellite and space-object monitoring dashboard designed to track orbital parameters, detect anomalies, and evaluate collision-risk levels.',
    highlights: [
      'Developed a satellite and space-object monitoring dashboard for a final-year CSE project.',
      'Implemented PostgreSQL-backed FastAPI APIs to retrieve satellite ID, object type, status, risk level, and orbital parameters.',
      'Designed monitoring features around collision-risk levels and orbit-anomaly analysis for tracked space objects.'
    ],
    architecture: {
      frontend: 'React Telemetry Command Center + Risk Matrix Visualization',
      backend: 'Python FastAPI Telemetry Ingestion & Collision Probability Calculator',
      database: 'PostgreSQL Orbital Ephemeris & Space-Object Registry'
    },
    hasInteractiveDemo: 'orbitguard'
  },
  {
    id: 'weather-app',
    title: 'Weather Web Application',
    subtitle: 'Real-Time City Meteorological Forecast Interface',
    category: 'Frontend • API Integration',
    badge: 'Web App',
    accent: 'amber',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Weather API'],
    summary:
      'A responsive weather application that retrieves and displays real-time city-based meteorological metrics through asynchronous API integration.',
    highlights: [
      'Built a responsive weather application that retrieves and displays city-based weather information through an API.',
      'Implemented API handling, user input validation, DOM manipulation, and dynamic weather state updates.'
    ],
    architecture: {
      frontend: 'Semantic HTML5, Modern CSS Grid/Flexbox & Vanilla JS DOM Engine',
      backend: 'RESTful Weather API Fetch Pipeline with Error Handling',
      database: 'Client-side Recent City Search State'
    },
    hasInteractiveDemo: 'weather'
  },
  {
    id: 'ice-cream-web',
    title: 'Artisan Ice Cream Website',
    subtitle: 'Product-Focused Responsive Brand Showcase',
    category: 'UI/UX • Responsive Web',
    badge: 'UI Design',
    accent: 'pink',
    tech: ['HTML5', 'CSS3', 'Responsive UI', 'Figma'],
    summary:
      'A vibrant, conversion-oriented product showcase website featuring structured flavor catalogs, smooth responsive layouts, and clean visual hierarchy.',
    highlights: [
      'Designed a responsive product-focused website with structured sections and a clean, user-friendly interface.',
      'Crafted mobile-first layouts ensuring seamless browsing across mobile, tablet, and desktop viewports.'
    ],
    architecture: {
      frontend: 'Custom CSS3 Animations, Responsive Breakpoints & Clean Typography',
      backend: 'Static High-Performance Asset Delivery',
      database: 'Structured Product Showcase Sections'
    },
    hasInteractiveDemo: null
  }
];

// --- SKILLS DATA ---
const SKILLS = [
  { name: 'React.js', category: 'Frontend', level: 92, desc: 'Component architecture, Hooks, State & Dashboards' },
  { name: 'JavaScript (ES6+)', category: 'Languages', level: 90, desc: 'Async/Await, DOM Manipulation, Fetch API' },
  { name: 'FastAPI', category: 'Backend', level: 88, desc: 'High-performance Python REST APIs & Pydantic schemas' },
  { name: 'Python', category: 'Languages', level: 88, desc: 'Backend logic, Data scripting & AI fundamentals' },
  { name: 'PostgreSQL', category: 'Databases', level: 86, desc: 'Relational schema design, Joins & CRUD persistence' },
  { name: 'MySQL', category: 'Databases', level: 85, desc: 'Database management, indexing & structured queries' },
  { name: 'PHP', category: 'Languages', level: 80, desc: 'Server-side web scripting & MySQL integration' },
  { name: 'HTML5 & CSS3', category: 'Frontend', level: 95, desc: 'Semantic markup, Flexbox, Grid & Responsive UI' },
  { name: 'REST APIs & Auth', category: 'Backend', level: 89, desc: 'Authentication flows, JSON contracts & CRUD routes' },
  { name: 'UI/UX (Figma)', category: 'Frontend', level: 84, desc: 'Certified Figma wireframing & modern interface design' },
  { name: 'Vite & Node.js (Basics)', category: 'Backend', level: 78, desc: 'Modern frontend tooling & JS runtime basics' },
  { name: 'Git, GitHub & Postman', category: 'Tools', level: 90, desc: 'Version control, API testing & VS Code workflows' }
];

// --- TRANSLATIONS FOR DESIGN REQUEST FORM (ENGLISH / TAMIL) ---
const FORM_TEXT = {
  en: {
    badge: 'STUDIO INBOX • DIRECT TO MOHAMED ANSHA',
    title: 'Start a Design or Full-Stack Project Request',
    subtitle:
      'Have a web application, UI/UX design in Figma, FastAPI backend, or hiring opportunity in mind? Fill out the brief below — it routes directly to mohamedansha05@gmail.com.',
    nameLabel: 'Your Name / Recruiter Name *',
    namePlaceholder: 'e.g., Arun Prakash',
    emailLabel: 'Your Email Address *',
    emailPlaceholder: 'e.g., arun@company.com',
    phoneLabel: 'Phone / WhatsApp Number',
    phonePlaceholder: '+91 98765 43210',
    companyLabel: 'Company / Startup / Organization',
    companyPlaceholder: 'e.g., TechNova Solutions',
    serviceLabel: 'What type of collaboration do you need? *',
    featuresLabel: 'Select Key Features / Scope Needed',
    budgetLabel: 'Estimated Budget / Compensation',
    timelineLabel: 'Expected Timeline',
    briefLabel: 'Project Details / Role Description *',
    briefPlaceholder:
      'Describe your project goals, pages/features needed, tech stack preference, or job opportunity details...',
    submitBtn: 'Save & Prepare Studio Email',
    emailBtn: 'Send via Email (mohamedansha05@gmail.com)',
    whatsappBtn: 'Send via WhatsApp (+91 863 767 5865)',
    copyBtn: 'Copy Brief',
    inboxTitle: 'Studio Inbox Preview',
    inboxHint: 'Requests submitted here are formatted for mohamedansha05@gmail.com'
  },
  ta: {
    badge: 'ஸ்டுடியோ இன்பாக்ஸ் • நேரடி தொடர்புக்கு',
    title: 'புதிய டிசைன் அல்லது வெப் ப்ராஜெக்ட் கோரிக்கை',
    subtitle:
      'உங்களுக்கு புதிய வெப்சைட், Figma UI/UX டிசைன், React + FastAPI அப்ளிகேஷன் அல்லது வேலைவாய்ப்பு தொடர்பாக பேச வேண்டுமா? கீழே உள்ள படிவத்தை நிரப்புங்கள் — இது நேரடியாக mohamedansha05@gmail.com முகவரிக்குச் செல்லும்.',
    nameLabel: 'உங்கள் பெயர் *',
    namePlaceholder: 'எ.கா., அருண் பிரகாஷ்',
    emailLabel: 'உங்கள் மின்னஞ்சல் (Email) *',
    emailPlaceholder: 'எ.கா., arun@company.com',
    phoneLabel: 'தொலைபேசி / வாட்ஸ்அப் எண்',
    phonePlaceholder: '+91 98765 43210',
    companyLabel: 'நிறுவனம் / ஸ்டார்ட்அப் பெயர்',
    companyPlaceholder: 'எ.கா., TechNova Solutions',
    serviceLabel: 'உங்களுக்கு எந்த வகையான சேவை தேவை? *',
    featuresLabel: 'தேவையான முக்கிய வசதிகள் (Features)',
    budgetLabel: 'உத்தேச பட்ஜெட்',
    timelineLabel: 'தேவையான கால அளவு',
    briefLabel: 'ப்ராஜெக்ட் விவரங்கள் / பணி விவரம் *',
    briefPlaceholder:
      'உங்கள் ப்ராஜெக்ட் தேவைகள், வெப்சைட் பக்கங்கள் அல்லது வேலைவாய்ப்பு விவரங்களை இங்கே குறிப்பிடவும்...',
    submitBtn: 'கோரிக்கையை உருவாக்கு & சேமி',
    emailBtn: 'மின்னஞ்சல் அனுப்பு (mohamedansha05@gmail.com)',
    whatsappBtn: 'WhatsApp மூலம் அனுப்பு (+91 863 767 5865)',
    copyBtn: 'காப்பி செய்',
    inboxTitle: 'ஸ்டுடியோ இன்பாக்ஸ் முன்னோட்டம்',
    inboxHint: 'இங்கு சமர்ப்பிக்கப்படும் கோரிக்கைகள் mohamedansha05@gmail.com-க்கு தயாராகின்றன'
  }
};

const SERVICE_OPTIONS = [
  'Full-Stack Web App (React + FastAPI + PostgreSQL)',
  'UI/UX Design & Prototyping in Figma',
  'Responsive Business / Product Website',
  'REST API, Dashboard & Database Integration',
  'Full-Time / Internship Hiring Opportunity (Software Engineer)'
];

const FEATURE_TAGS = [
  'Responsive UI/UX (Figma)',
  'React Interactive Dashboard',
  'FastAPI REST Backend',
  'PostgreSQL / MySQL Database',
  'User Authentication & Roles',
  'AI / Analytics Integration',
  'API Third-Party Integration',
  'Full-Time Role Interview'
];

export default function App() {
  // Navigation & Modal states
  const [activeSkillCategory, setActiveSkillCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  // Interactive Mini-Simulator States (IMA Trade & ORBITGUARD)
  const [virtualCash, setVirtualCash] = useState(100000);
  const [holdings, setHoldings] = useState([
    { symbol: 'TCS.NS', price: 4120, qty: 5, signal: 'BUY', change: '+2.4%' },
    { symbol: 'INFY.NS', price: 1860, qty: 8, signal: 'HOLD', change: '+1.1%' },
    { symbol: 'RELIANCE.NS', price: 2980, qty: 4, signal: 'BUY', change: '+3.2%' }
  ]);
  const [tradeFeedback, setTradeFeedback] = useState('Virtual ₹1,00,000 Paper Trading Engine Ready');

  const [selectedSatellite, setSelectedSatellite] = useState(0);
  const satellites = [
    {
      id: 'SAT-395TF-ALPHA',
      type: 'LEO Earth Observation',
      altitude: '542 km',
      inclination: '97.6°',
      risk: 'LOW',
      status: 'NOMINAL',
      anomalyScore: '0.04%'
    },
    {
      id: 'ORB-CARTOSAT-3B',
      type: 'Sun-Synchronous',
      altitude: '509 km',
      inclination: '97.5°',
      risk: 'MODERATE',
      status: 'TRACKING CONJUNCTION',
      anomalyScore: '1.82%'
    },
    {
      id: 'DEBRIS-COSMOS-92',
      type: 'Tracked Space Object',
      altitude: '540 km',
      inclination: '98.1°',
      risk: 'HIGH ALERT',
      status: 'ORBIT ANOMALY DETECTED',
      anomalyScore: '6.45%'
    }
  ];

  // Studio Request Form States
  const [formLang, setFormLang] = useState('en');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [company, setCompany] = useState('');
  const [serviceType, setServiceType] = useState(SERVICE_OPTIONS[0]);
  const [selectedFeatures, setSelectedFeatures] = useState([
    'Responsive UI/UX (Figma)',
    'React Interactive Dashboard',
    'FastAPI REST Backend'
  ]);
  const [budget, setBudget] = useState('₹15,000 – ₹35,000');
  const [timeline, setTimeline] = useState('2 - 4 Weeks');
  const [brief, setBrief] = useState('');
  const [requestsInbox, setRequestsInbox] = useState(INITIAL_REQUESTS);
  const [lastPreparedRequest, setLastPreparedRequest] = useState(null);
  const [copiedState, setCopiedState] = useState(false);
  const [formError, setFormError] = useState('');
  const [emailCopiedToast, setEmailCopiedToast] = useState(false);

  const t = FORM_TEXT[formLang];

  // Filtered skills
  const filteredSkills = useMemo(() => {
    if (activeSkillCategory === 'All') return SKILLS;
    return SKILLS.filter((skill) => skill.category === activeSkillCategory);
  }, [activeSkillCategory]);

  // Calculate Portfolio Valuation for IMA Trade simulator
  const holdingsValue = holdings.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalPortfolioValue = virtualCash + holdingsValue;

  const handleSimulatedTrade = (symbol, action) => {
    setHoldings((prev) =>
      prev.map((stock) => {
        if (stock.symbol !== symbol) return stock;
        if (action === 'BUY' && virtualCash >= stock.price) {
          setVirtualCash((c) => c - stock.price);
          setTradeFeedback(`Executed BUY 1x ${symbol} @ ₹${stock.price.toLocaleString('en-IN')}`);
          return { ...stock, qty: stock.qty + 1 };
        }
        if (action === 'SELL' && stock.qty > 0) {
          setVirtualCash((c) => c + stock.price);
          setTradeFeedback(`Executed SELL 1x ${symbol} @ ₹${stock.price.toLocaleString('en-IN')}`);
          return { ...stock, qty: stock.qty - 1 };
        }
        return stock;
      })
    );
  };

  const toggleFeatureTag = (tag) => {
    setSelectedFeatures((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  // Format structured email body for mohamedansha05@gmail.com
  const buildFormattedMessage = (reqObj) => {
    const data = reqObj || {
      clientName: clientName || 'Prospective Client',
      clientEmail: clientEmail || 'Not provided',
      clientPhone: clientPhone || 'Not provided',
      company: company || 'Independent / Direct',
      serviceType,
      features: selectedFeatures,
      budget,
      timeline,
      brief: brief || 'Interested in discussing a new project or role.'
    };

    return `Hello Mohamed Ansha,

You have received a new Studio Design / Full-Stack Project Request:

• Client Name: ${data.clientName}
• Email: ${data.clientEmail}
• Phone / WhatsApp: ${data.clientPhone}
• Organization: ${data.company}
• Service Requested: ${data.serviceType}
• Key Scope / Features: ${data.features.join(', ')}
• Estimated Budget: ${data.budget}
• Target Timeline: ${data.timeline}

Project / Role Brief:
${data.brief}

---
Sent via I Mohamed Ansha Portfolio & Studio Portal (mohamedansha05@gmail.com)`;
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !brief.trim()) {
      setFormError(
        formLang === 'en'
          ? 'Please enter your Name, Email, and a short Project/Role Brief.'
          : 'தயவுசெய்து உங்கள் பெயர், மின்னஞ்சல் மற்றும் ப்ராஜெக்ட் விவரத்தை நிரப்பவும்.'
      );
      return;
    }
    setFormError('');

    const newReq = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      clientName: clientName.trim(),
      clientEmail: clientEmail.trim(),
      clientPhone: clientPhone.trim() || 'Not specified',
      company: company.trim() || 'Direct Inquiry',
      serviceType,
      features: selectedFeatures.length ? selectedFeatures : ['Custom Scope'],
      budget,
      timeline,
      brief: brief.trim(),
      createdAt: 'Just now',
      status: 'Ready to Send'
    };

    setRequestsInbox((prev) => [newReq, ...prev]);
    setLastPreparedRequest(newReq);
  };

  const triggerMailto = (reqObj) => {
    const subject = encodeURIComponent(
      `[Studio Request] ${reqObj ? reqObj.serviceType : serviceType} — from ${
        reqObj ? reqObj.clientName : clientName || 'Client'
      }`
    );
    const body = encodeURIComponent(buildFormattedMessage(reqObj));
    window.location.href = `mailto:mohamedansha05@gmail.com?subject=${subject}&body=${body}`;
  };

  const triggerWhatsApp = (reqObj) => {
    const text = encodeURIComponent(buildFormattedMessage(reqObj));
    window.open(`https://wa.me/918637675865?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const copyBriefToClipboard = (reqObj) => {
    navigator.clipboard.writeText(buildFormattedMessage(reqObj));
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2500);
  };

  const copyDirectEmail = () => {
    navigator.clipboard.writeText('mohamedansha05@gmail.com');
    setEmailCopiedToast(true);
    setTimeout(() => setEmailCopiedToast(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* SUBTLE AMBIENT BACKGROUND GLOWS */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-lg shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition">
              MA
            </div>
            <div>
              <span className="font-bold tracking-tight text-white block leading-none">
                I MOHAMED ANSHA
              </span>
              <span className="text-xs text-emerald-400 font-mono">
                Full-Stack Dev • UI/UX Studio
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#projects" className="hover:text-emerald-400 transition">
              Projects
            </a>
            <a href="#skills" className="hover:text-emerald-400 transition">
              Tech Stack
            </a>
            <a href="#journey" className="hover:text-emerald-400 transition">
              Experience & Education
            </a>
            <a href="#studio-request" className="hover:text-emerald-400 transition font-medium text-emerald-300">
              Design & Project Request
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowResumeModal(true)}
              className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 flex items-center gap-1.5 transition"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Resume</span>
            </button>
            <a
              href="#studio-request"
              className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start a Request</span>
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main id="top" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 space-y-24">
        {/* HERO SECTION */}
        <section className="pt-4 lg:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Software Engineer Roles & Freelance Web/UI Requests
            </div>

            <div className="space-y-3">
              <p className="text-xs sm:text-sm uppercase tracking-widest text-cyan-400 font-mono font-semibold">
                Full-Stack Developer • CSE Student • UI/UX Designer
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Building Intelligent{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-indigo-400">
                  Web Apps, APIs & Interfaces.
                </span>
              </h1>
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              Hi, I’m <strong className="text-white">I Mohamed Ansha</strong> from Rajapalayam, Tamil Nadu. I architect responsive React interfaces, high-speed{' '}
              <span className="text-emerald-300 font-medium">FastAPI & PostgreSQL</span> backends, and Figma-driven UI/UX systems—from AI stock paper-trading platforms to satellite collision telemetry dashboards.
            </p>

            {/* CONTACT & LOCATION PILLS */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-slate-300">
              <button
                onClick={copyDirectEmail}
                title="Click to copy studio email"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 transition group"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span className="font-mono">mohamedansha05@gmail.com</span>
                {emailCopiedToast ? (
                  <span className="text-xs text-emerald-400 font-semibold ml-1">Copied!</span>
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300" />
                )}
              </button>

              <a
                href="tel:+918637675865"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 transition"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+91 863 767 5865</span>
              </a>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-slate-800">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>Rajapalayam, Tamil Nadu</span>
              </div>
            </div>

            {/* HERO CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#studio-request"
                className="px-6 py-3.5 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-xl shadow-emerald-500/20 flex items-center gap-2 transition transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>Submit Design / Dev Request</span>
              </a>
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl font-semibold bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 flex items-center gap-2 transition"
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Explore Live Projects</span>
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: STUDIO & ARCHITECTURAL SNAPSHOT CARD */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">
                    ansha.studio/profile.json
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  CGPA: 7.68/10
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="text-xs text-slate-400">Core Stack</div>
                  <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4 text-emerald-400" />
                    React + FastAPI
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">PostgreSQL • REST API</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="text-xs text-slate-400">Design & Web</div>
                  <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    <Layout className="w-4 h-4 text-cyan-400" />
                    Figma UI/UX
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Responsive HTML/CSS/JS</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="text-xs text-slate-400">AI Internship</div>
                  <div className="text-sm font-bold text-white mt-1 flex items-center gap-1.5">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    SAHAS DIGI NXT
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">AI Concepts & Apps</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="text-xs text-slate-400">Studio Inbox</div>
                  <div className="text-sm font-bold text-emerald-400 mt-1 truncate">
                    Direct Gmail
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 truncate">
                    mohamedansha05@gmail.com
                  </div>
                </div>
              </div>

              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800/90 space-y-2.5 text-xs font-mono">
                <div className="text-slate-400">
                  <span className="text-emerald-400">const</span> developer = {'{'}
                </div>
                <div className="pl-4 text-slate-300">
                  name: <span className="text-amber-300">'I Mohamed Ansha'</span>,
                </div>
                <div className="pl-4 text-slate-300">
                  degree: <span className="text-cyan-300">'B.E. CSE (2023–2027)'</span>,
                </div>
                <div className="pl-4 text-slate-300">
                  skills: [<span className="text-emerald-300">'React'</span>,{' '}
                  <span className="text-emerald-300">'FastAPI'</span>,{' '}
                  <span className="text-emerald-300">'PostgreSQL'</span>,{' '}
                  <span className="text-emerald-300">'PHP/MySQL'</span>],
                </div>
                <div className="pl-4 text-slate-300">
                  inbox: <span className="text-pink-300">'mohamedansha05@gmail.com'</span>
                </div>
                <div className="text-slate-400">{'};'}</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS & LIVE INTERACTIVE SIMULATORS */}
        <section id="projects" className="space-y-10 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                Engineering Portfolio • Real Systems
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
                Featured Full-Stack & Web Projects
              </h2>
            </div>
            <p className="text-sm text-slate-400 max-w-md">
              Includes interactive live previews of <strong className="text-slate-200">IMA Trade</strong> and{' '}
              <strong className="text-slate-200">ORBITGUARD</strong> right inside the cards below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-slate-700 transition flex flex-col justify-between overflow-hidden shadow-xl"
              >
                <div className="p-6 sm:p-7 space-y-5">
                  {/* Top Badge & Category */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-3 py-1 rounded-full">
                      {project.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                      {project.id === 'ima-trade' && <TrendingUp className="w-6 h-6 text-emerald-400 shrink-0" />}
                      {project.id === 'orbitguard' && <Satellite className="w-6 h-6 text-cyan-400 shrink-0" />}
                      {project.id === 'weather-app' && <CloudSun className="w-6 h-6 text-amber-400 shrink-0" />}
                      {project.id === 'ice-cream-web' && <IceCream className="w-6 h-6 text-pink-400 shrink-0" />}
                      <span>{project.title}</span>
                    </h3>
                    <p className="text-sm text-cyan-300/90 font-medium mt-1">{project.subtitle}</p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">{project.summary}</p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tItem) => (
                      <span
                        key={tItem}
                        className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {tItem}
                      </span>
                    ))}
                  </div>

                  {/* Key Bullet Highlights */}
                  <ul className="space-y-2 pt-1">
                    {project.highlights.map((bullet, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* INTERACTIVE MINI WIDGET 1: IMA TRADE PAPER TRADING SIMULATOR */}
                  {project.hasInteractiveDemo === 'ima-trade' && (
                    <div className="mt-4 rounded-xl bg-slate-950 border border-emerald-500/30 p-4 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span className="text-xs font-mono font-bold text-emerald-300">
                            LIVE DEMO: Virtual Paper-Trading Sandbox
                          </span>
                        </div>
                        <div className="text-xs font-mono text-slate-300">
                          Cash: <strong className="text-emerald-400">₹{virtualCash.toLocaleString('en-IN')}</strong> | Total:{' '}
                          <strong className="text-white">₹{totalPortfolioValue.toLocaleString('en-IN')}</strong>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {holdings.map((h) => (
                          <div
                            key={h.symbol}
                            className="flex items-center justify-between gap-2 text-xs bg-slate-900/90 px-3 py-2 rounded-lg border border-slate-800"
                          >
                            <div>
                              <span className="font-bold text-white font-mono">{h.symbol}</span>
                              <span className="ml-2 text-slate-400">₹{h.price}</span>
                              <span className="ml-2 text-emerald-400">{h.change}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  h.signal === 'BUY'
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}
                              >
                                AI: {h.signal}
                              </span>
                              <span className="text-slate-300 font-mono">Qty: {h.qty}</span>
                              <button
                                onClick={() => handleSimulatedTrade(h.symbol, 'BUY')}
                                className="px-2 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold transition"
                              >
                                +Buy
                              </button>
                              <button
                                onClick={() => handleSimulatedTrade(h.symbol, 'SELL')}
                                className="px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold transition"
                              >
                                -Sell
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                        <span>{tradeFeedback}</span>
                        <span className="text-emerald-400">FastAPI + PostgreSQL</span>
                      </div>
                    </div>
                  )}

                  {/* INTERACTIVE MINI WIDGET 2: ORBITGUARD TELEMETRY MONITOR */}
                  {project.hasInteractiveDemo === 'orbitguard' && (
                    <div className="mt-4 rounded-xl bg-slate-950 border border-cyan-500/30 p-4 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-2.5">
                        <div className="flex items-center gap-2">
                          <Activity className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs font-mono font-bold text-cyan-300">
                            LIVE DEMO: Satellite Collision Risk Telemetry
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">TAPERS 395TF API</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        {satellites.map((sat, index) => (
                          <button
                            key={sat.id}
                            onClick={() => setSelectedSatellite(index)}
                            className={`p-2 rounded-lg text-left border transition text-xs font-mono ${
                              selectedSatellite === index
                                ? 'bg-cyan-500/15 border-cyan-400 text-white'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            <div className="truncate font-bold">{sat.id}</div>
                            <div
                              className={`text-[10px] mt-0.5 ${
                                sat.risk === 'HIGH ALERT'
                                  ? 'text-rose-400'
                                  : sat.risk === 'MODERATE'
                                  ? 'text-amber-400'
                                  : 'text-emerald-400'
                              }`}
                            >
                              Risk: {sat.risk}
                            </div>
                          </button>
                        ))}
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs font-mono grid grid-cols-2 sm:grid-cols-4 gap-2">
                        <div>
                          <span className="text-slate-500 block text-[10px]">OBJECT TYPE</span>
                          <span className="text-slate-200">{satellites[selectedSatellite].type}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">ALTITUDE / INC</span>
                          <span className="text-cyan-300">
                            {satellites[selectedSatellite].altitude} ({satellites[selectedSatellite].inclination})
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">ANOMALY SCORE</span>
                          <span className="text-amber-300">{satellites[selectedSatellite].anomalyScore}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block text-[10px]">STATUS</span>
                          <span className="text-emerald-300">{satellites[selectedSatellite].status}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
                  >
                    <span>View System Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#studio-request"
                    onClick={() => {
                      setServiceType('Full-Stack Web App (React + FastAPI + PostgreSQL)');
                      setBrief(`Hi Mohamed, I saw your ${project.title} project and would like to discuss a similar system.`);
                    }}
                    className="text-xs text-slate-400 hover:text-white transition"
                  >
                    Request Similar Project →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL SKILLS MATRIX */}
        <section id="skills" className="space-y-8 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                Full-Stack Arsenal
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
                Technical Skills & Tooling
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Languages', 'Frontend', 'Backend', 'Databases', 'Tools'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
                    activeSkillCategory === cat
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="p-5 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-emerald-500/40 transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-base">{skill.name}</span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-slate-950 text-emerald-400 border border-slate-800">
                    {skill.category}
                  </span>
                </div>
                <p className="text-xs text-slate-400">{skill.desc}</p>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE, EDUCATION, CERTIFICATIONS & STRENGTHS */}
        <section id="journey" className="space-y-8 scroll-mt-20">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Academic & Industry Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">
              Internship, Education & Certifications
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 Cols: Internship & Education */}
            <div className="lg:col-span-7 space-y-6">
              {/* Internship Card */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <Briefcase className="w-3.5 h-3.5" />
                    INTERNSHIP EXPERIENCE
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    16 June 2026 – 26 June 2026
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Artificial Intelligence Intern
                </h3>
                <p className="text-sm text-cyan-300 font-medium">
                  SAHAS DIGI NXT SOLUTIONS LLP • Karur, Tamil Nadu
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Gained practical exposure to fundamental Artificial Intelligence concepts, real-world AI applications, and collaborative internship-based engineering activities.
                </p>
              </div>

              {/* B.E. CSE Card */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    <GraduationCap className="w-3.5 h-3.5" />
                    BACHELOR OF ENGINEERING (2023 – 2027)
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-lg">
                    CGPA: 7.68 / 10
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    B.E. Computer Science and Engineering
                  </h3>
                  <p className="text-sm text-slate-300 mt-0.5">
                    N S N College of Engineering and Technology, Anna University
                  </p>
                </div>

                <div>
                  <div className="text-xs font-mono text-slate-400 uppercase mb-2">
                    Core CSE Coursework:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Data Structures & Algorithms',
                      'DBMS',
                      'Operating Systems',
                      'Computer Networks',
                      'Object-Oriented Programming (OOP)',
                      'Software Engineering'
                    ].map((course) => (
                      <span
                        key={course}
                        className="px-2.5 py-1 rounded-md text-xs bg-slate-950 text-slate-300 border border-slate-800"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex flex-wrap justify-between gap-2">
                  <span>
                    <strong className="text-slate-200">Class XII (2023):</strong> S.S. Boys Govt. Higher Secondary School, Rajapalayam (52%)
                  </span>
                  <span>
                    <strong className="text-slate-200">Class X (2021):</strong> Pass
                  </span>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Certifications, Strengths & Languages */}
            <div className="lg:col-span-5 space-y-6">
              {/* Certifications */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase">
                  <Award className="w-4 h-4" />
                  <span>Verified Certifications</span>
                </div>
                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="font-bold text-white text-sm">UI/UX Design using Figma</div>
                    <div className="text-xs text-slate-400 mt-1">
                      Interface wireframing, design systems, interactive prototyping & responsive layouts.
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="font-bold text-white text-sm">
                      Internet Crimes and Cybersecurity
                    </div>
                    <div className="text-xs text-emerald-400 font-mono mt-0.5">
                      NPTEL (SWAYAM) Certification
                    </div>
                  </div>
                </div>
              </div>

              {/* Strengths & Languages */}
              <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase">
                  <UserCheck className="w-4 h-4" />
                  <span>Core Strengths & Spoken Languages</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Problem Solving',
                    'Communication',
                    'Teamwork',
                    'Leadership',
                    'Time Management',
                    'Adaptability'
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-slate-950 text-slate-200 border border-slate-800"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">Tamil (தமிழ்)</div>
                    <div className="text-sm font-bold text-white">Native Proficiency</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="text-xs text-slate-400">English</div>
                    <div className="text-sm font-bold text-white">Working Proficiency</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STUDIO DESIGN & PROJECT REQUEST FORM (CONNECTED TO mohamedansha05@gmail.com) */}
        <section
          id="studio-request"
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-950/30 border border-emerald-500/30 p-6 sm:p-10 shadow-2xl scroll-mt-20"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-slate-800">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
                <Inbox className="w-3.5 h-3.5" />
                <span>{t.badge}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">{t.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{t.subtitle}</p>
            </div>

            {/* Language Toggle (English / தமிழ்) */}
            <div className="flex items-center gap-2 self-start lg:self-center bg-slate-950 p-1.5 rounded-xl border border-slate-800">
              <Globe className="w-4 h-4 text-emerald-400 ml-2" />
              <button
                type="button"
                onClick={() => setFormLang('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  formLang === 'en'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setFormLang('ta')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  formLang === 'ta'
                    ? 'bg-emerald-500 text-slate-950'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                தமிழ் (Tamil)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-8">
            {/* LEFT 7 COLS: INTERACTIVE FORM */}
            <form onSubmit={handleRequestSubmit} className="lg:col-span-7 space-y-5">
              {formError && (
                <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-200 text-xs font-medium">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-400 focus:outline-none text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.emailLabel}
                  </label>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-400 focus:outline-none text-sm text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.phoneLabel}
                  </label>
                  <input
                    type="text"
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder={t.phonePlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-400 focus:outline-none text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.companyLabel}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={t.companyPlaceholder}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-400 focus:outline-none text-sm text-white"
                  />
                </div>
              </div>

              {/* Service Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.serviceLabel}
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-400 focus:outline-none text-sm text-white"
                >
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Multi-Select Feature Chips */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  {t.featuresLabel}
                </label>
                <div className="flex flex-wrap gap-2">
                  {FEATURE_TAGS.map((tag) => {
                    const active = selectedFeatures.includes(tag);
                    return (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => toggleFeatureTag(tag)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                          active
                            ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {active ? '✓ ' : '+ '}
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.budgetLabel}
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-400 focus:outline-none text-sm text-white"
                  >
                    <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000 (Starter / UI Design)</option>
                    <option value="₹15,000 – ₹35,000">₹15,000 – ₹35,000 (Full-Stack Project)</option>
                    <option value="₹35,000 – ₹75,000+">₹35,000 – ₹75,000+ (Custom SaaS / AI System)</option>
                    <option value="Full-Time / Internship CTC">Full-Time / Internship Role Offer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.timelineLabel}
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-400 focus:outline-none text-sm text-white"
                  >
                    <option value="Immediate / 1 Week">Immediate / Within 1 Week</option>
                    <option value="2 - 4 Weeks">2 - 4 Weeks</option>
                    <option value="1 - 2 Months">1 - 2 Months</option>
                    <option value="Flexible / Hiring Process">Flexible / Hiring Schedule</option>
                  </select>
                </div>
              </div>

              {/* Project Brief */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.briefLabel}
                </label>
                <textarea
                  rows={4}
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  placeholder={t.briefPlaceholder}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-400 focus:outline-none text-sm text-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{t.submitBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerMailto(lastPreparedRequest)}
                  className="px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-950 hover:bg-slate-800 text-emerald-300 border border-emerald-500/40 flex items-center gap-2 transition"
                >
                  <Mail className="w-4 h-4" />
                  <span>{t.emailBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => triggerWhatsApp(lastPreparedRequest)}
                  className="px-4 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-cyan-500/40 flex items-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.whatsappBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => copyBriefToClipboard(lastPreparedRequest)}
                  className="px-3.5 py-3 rounded-xl font-medium text-xs bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-1.5 transition"
                >
                  {copiedState ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{t.copyBtn}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* RIGHT 5 COLS: STUDIO INBOX LIVE PREVIEW (`mohamedansha05@gmail.com`) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-emerald-400" />
                      <span>{t.inboxTitle}</span>
                    </h3>
                    <p className="text-[11px] font-mono text-emerald-400 mt-0.5">
                      Target Inbox: mohamedansha05@gmail.com
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {requestsInbox.length} {requestsInbox.length === 1 ? 'Request' : 'Requests'}
                  </span>
                </div>

                <p className="text-xs text-slate-400">{t.inboxHint}</p>

                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {requestsInbox.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-emerald-400">{req.id}</span>
                        <span className="text-slate-400">{req.createdAt}</span>
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">
                          {req.clientName}{' '}
                          <span className="text-xs font-normal text-slate-400">({req.company})</span>
                        </div>
                        <div className="text-xs text-cyan-300 font-mono">{req.serviceType}</div>
                      </div>
                      <p className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                        “{req.brief}”
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {req.features.map((f) => (
                          <span
                            key={f}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-950 text-slate-300 border border-slate-800"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                        <span className="text-slate-400 font-mono">{req.budget}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => triggerMailto(req)}
                            className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold transition"
                          >
                            Email Now
                          </button>
                          <button
                            type="button"
                            onClick={() => triggerWhatsApp(req)}
                            className="px-2.5 py-1 rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-semibold transition"
                          >
                            WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Contact Card */}
              <div className="p-5 rounded-2xl bg-slate-950/90 border border-slate-800 space-y-2 text-xs">
                <div className="font-bold text-white text-sm">Direct Studio Contact</div>
                <div className="text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="font-mono">mohamedansha05@gmail.com</span>
                </div>
                <div className="text-slate-300 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="font-mono">+91 863 767 5865</span>
                </div>
                <div className="text-slate-400 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Rajapalayam, Tamil Nadu, India</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <strong className="text-white">I MOHAMED ANSHA</strong> — Full-Stack Developer & Computer Science Engineering Student
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:mohamedansha05@gmail.com" className="hover:text-emerald-400 transition">
              mohamedansha05@gmail.com
            </a>
            <span>•</span>
            <a href="tel:+918637675865" className="hover:text-cyan-400 transition">
              +91 863 767 5865
            </a>
          </div>
        </div>
      </footer>

      {/* SYSTEM ARCHITECTURE MODAL FOR SELECTED PROJECT */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-2xl w-full rounded-2xl bg-slate-900 border border-slate-700 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-emerald-400">{selectedProject.category}</span>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
                <p className="text-sm text-cyan-300">{selectedProject.subtitle}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono text-emerald-400 uppercase">Frontend Layer</div>
                <div className="text-sm text-white mt-1">{selectedProject.architecture.frontend}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono text-cyan-400 uppercase">Backend & API Layer</div>
                <div className="text-sm text-white mt-1">{selectedProject.architecture.backend}</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-xs font-mono text-indigo-400 uppercase">Database & Storage</div>
                <div className="text-sm text-white mt-1">{selectedProject.architecture.database}</div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-slate-800 text-slate-200 hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE FULL RESUME MODAL */}
      {showResumeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full rounded-2xl bg-slate-900 border border-slate-700 p-6 sm:p-8 space-y-6 my-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">I MOHAMED ANSHA</h2>
                <p className="text-xs sm:text-sm font-mono text-emerald-400">
                  FULL-STACK DEVELOPER | COMPUTER SCIENCE ENGINEERING STUDENT
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Rajapalayam, Tamil Nadu | mohamedansha05@gmail.com | +91 863 767 5865
                </p>
              </div>
              <button
                onClick={() => setShowResumeModal(false)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-300">
              <div>
                <h4 className="font-mono font-bold text-white uppercase text-xs mb-1">Profile</h4>
                <p>
                  Computer Science Engineering student with hands-on experience developing responsive web applications and full-stack academic projects. Skilled in React, JavaScript, FastAPI, PostgreSQL, PHP and MySQL, with practical experience building REST APIs, database-backed applications, authentication flows, dashboards and interactive user interfaces. Seeking an entry-level Software Engineer / Full-Stack Developer role.
                </p>
              </div>

              <div>
                <h4 className="font-mono font-bold text-white uppercase text-xs mb-1">Technical Skills</h4>
                <p><strong>Languages:</strong> JavaScript, Python, PHP, HTML, CSS, SQL</p>
                <p><strong>Frontend:</strong> React, Vite, Responsive UI, DOM Manipulation</p>
                <p><strong>Backend:</strong> FastAPI, REST APIs, Node.js (Basics), Authentication</p>
                <p><strong>Databases:</strong> PostgreSQL, MySQL, CRUD Operations</p>
                <p><strong>Tools:</strong> VS Code, Git, GitHub, Postman</p>
              </div>

              <div>
                <h4 className="font-mono font-bold text-white uppercase text-xs mb-1">Projects</h4>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>IMA Trade — AI-Based Stock Market Analysis & Paper Trading System</strong> (React • FastAPI • PostgreSQL • JavaScript • REST API): Virtual ₹1,00,000 balance paper-trading platform with market signals, portfolio valuation, holdings, P&L tracking, and price alerts.
                  </li>
                  <li>
                    <strong>ORBITGUARD (TAPERS 395TF) — Satellite Collision Risk & Orbit Anomaly Monitoring System</strong> (React • FastAPI • PostgreSQL • Python • REST API): Final-year CSE satellite monitoring dashboard tracking collision risk levels and orbital parameters.
                  </li>
                  <li>
                    <strong>Weather Web Application</strong> (HTML • CSS • JavaScript • Weather API): City-based dynamic weather dashboard.
                  </li>
                  <li>
                    <strong>Ice Cream Website</strong> (HTML • CSS): Responsive product-focused web interface.
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-mono font-bold text-white uppercase text-xs mb-1">Internship & Education</h4>
                <p>
                  <strong>SAHAS DIGI NXT SOLUTIONS LLP, Karur</strong> — Artificial Intelligence Intern (16 June 2026 – 26 June 2026)
                </p>
                <p className="mt-1">
                  <strong>B.E. Computer Science and Engineering</strong> — N S N College of Engineering and Technology, Anna University (2023–2027) | CGPA: 7.68/10
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              >
                Print / Save PDF
              </button>
              <button
                onClick={() => setShowResumeModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}