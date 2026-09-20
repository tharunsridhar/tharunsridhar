// ============================================================
// Tharun Sridhar Natarajan, Portfolio interactions
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

/* ---------------- Theme toggle ---------------- */
(function themeInit() {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if (stored) root.setAttribute('data-theme', stored);

  toggle.addEventListener('click', () => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = root.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();

/* ---------------- Cursor glow ---------------- */
(function cursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.matchMedia('(max-width: 900px)').matches) return;
  window.addEventListener('mousemove', (e) => {
    glow.style.setProperty('--x', e.clientX + 'px');
    glow.style.setProperty('--y', e.clientY + 'px');
  });
})();

/* ---------------- Nav scroll state + scrollspy ---------------- */
(function nav() {
  const nav = document.getElementById('nav');
  const links = document.querySelectorAll('.nav-link');
  const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    let currentIndex = 0;
    sections.forEach((sec, i) => {
      if (sec && sec.getBoundingClientRect().top <= 120) currentIndex = i;
    });
    links.forEach((l, i) => l.classList.toggle('active', i === currentIndex));
  }, { passive: true });
})();

/* ---------------- Mobile menu ---------------- */
(function mobileMenu() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }));
})();

/* ---------------- Typewriter ---------------- */
(function typewriter() {
  const el = document.getElementById('typewriter');
  const words = ['backend systems.', 'deep learning models.', 'LLM pipelines.', 'REST APIs.', 'things that ship.'];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function tick() {
    const word = words[wordIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 85);
  }
  tick();
})();

/* ---------------- Reveal on scroll ---------------- */
(function reveal() {
  function refresh() {
    const targets = document.querySelectorAll('.reveal:not(.observed)');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(t => { t.classList.add('observed'); io.observe(t); });
  }
  refresh();
  window.addEventListener('content-injected', refresh);
})();

/* ============================================================
   Project data: curated flagship builds only
   ============================================================ */
const PROJECTS = [
  {
    title: 'Inventra',
    category: 'Backend',
    subtitle: 'Role-Based Inventory Management System',
    desc: [
      'Load tested with Locust: without row-level locking, 40 concurrent users silently lost 16 units of stock with zero HTTP errors; select_for_update() closes the race to zero discrepancy',
      'Admin / Manager / Employee RBAC with JWT access + DB-blacklisted refresh tokens, rate limited per scope; append-only stock ledger enforced twice (no write route registered, and Django Admin permissions hard-disabled)',
      'Redis-cached reports with version-counter invalidation, cache hits collapse 9 queries down to 1 (proven via query-count assertions, not just timing)',
      'Celery background jobs and Beat schedule for async invoices, low-stock alerts, and nightly ledger reconciliation; deployed on AWS behind an Application Load Balancer'
    ],
    tags: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'JWT'],
    links: [
      { label: 'GitHub', href: 'https://github.com/tharunsridhar/Inventra', icon: 'github' },
      { label: 'Live Demo', href: 'http://inventra-alb-164557112.ap-south-1.elb.amazonaws.com/app', icon: 'external' }
    ]
  },
  {
    title: 'Corrective RAG',
    category: 'AI Engineering',
    subtitle: 'Self-Evaluating Local RAG Pipeline, Benchmarked with RAGAS',
    desc: [
      'Grades its own retrieval relevance, rewrites the query and re-retrieves on weak results, then falls back to live DuckDuckGo web search when local evidence still isn’t enough',
      'Claim-level verification stage extracts atomic claims from the generated answer and checks each against a deduplicated, citation-tagged evidence set, correcting and re-verifying anything unsupported',
      'Runs fully local by default on Ollama (Llama 3.2 3B) with Chroma + sentence-transformers, with Groq/OpenRouter as opt-in cloud fallbacks',
      'RAGAS-based evaluation harness benchmarks the corrective pipeline against a plain baseline RAG system on faithfulness, context precision/recall, and answer relevancy'
    ],
    tags: ['FastAPI', 'Ollama', 'ChromaDB', 'RAGAS', 'DuckDuckGo'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/Corrective-RAG', icon: 'github' }]
  },
  {
    title: 'PhotoShare API',
    category: 'Backend',
    subtitle: 'Photo & Video Sharing Backend',
    desc: [
      'Async FastAPI backend with JWT auth via fastapi-users: register, login, email verification, forgot/reset-password',
      'Media streamed to a temp file then pushed to the ImageKit CDN, with UUID-keyed async SQLAlchemy models',
      'Ownership-based authorization returns 403 on delete attempts by non-owners',
      'REST API and static frontend served from a single FastAPI process, with zero CORS overhead'
    ],
    tags: ['FastAPI', 'Async SQLAlchemy', 'JWT', 'ImageKit'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/photoshare-api', icon: 'github' }]
  },
  {
    title: 'EchoBrief',
    category: 'AI Engineering',
    subtitle: 'AI Audio Transcription & Summarization Platform',
    desc: [
      'FastAPI backend transcribes uploaded MP3/M4A audio locally with Faster-Whisper',
      'Sends the raw transcript to Gemini for grammar cleanup and a concise professional summary',
      'Speech-to-text and LLM summarization split into independent, independently testable service modules',
      'Drag-and-drop vanilla-JS frontend with upload progress tracking and downloadable transcript/summary files'
    ],
    tags: ['FastAPI', 'Faster-Whisper', 'Gemini', 'Vanilla JS'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/echobrief-ai-audio-summarizer', icon: 'github' }]
  },
  {
    title: 'Finvoro',
    category: 'Backend',
    subtitle: 'Personal Finance Management API',
    desc: [
      'Django REST Framework backend for multi-account tracking, categorized transactions, monthly budgets, and spending reports',
      'JWT auth (djangorestframework-simplejwt) with per-user data ownership enforced end-to-end on every endpoint',
      'Versioned API under /api/v1/, live-computed account balances and budget spent/remaining figures, no stale duplicated values',
      'pytest + pytest-django coverage suite; interactive Swagger/ReDoc docs via drf-spectacular'
    ],
    tags: ['Django', 'DRF', 'PostgreSQL', 'JWT', 'pytest'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/finvoro-finance', icon: 'github' }]
  },
  {
    title: 'Clara AI',
    category: 'AI Engineering',
    subtitle: 'Voice Agent Configuration Pipeline',
    desc: [
      'Python pipeline turning raw call transcripts into production-ready voice-agent configurations',
      'Gemini 2.0 Flash extracts business hours, services, and escalation rules into strict, schema-validated JSON',
      'Parser recovers valid JSON from direct, markdown-fenced, or text-buried LLM output',
      'Versioning layer merges an initial extraction with a later onboarding update and generates a field-level changelog'
    ],
    tags: ['Python', 'Gemini 2.0 Flash'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/clara-ai-pipeline', icon: 'github' }]
  },
  {
    title: 'NeuroScan AI',
    category: ['AI Engineering'],
    subtitle: 'Brain Tumor MRI Analysis, Reliability Gating & Reporting',
    desc: [
      '4-model classification ensemble (EfficientNetV2-S, MobileNetV3, ConvNeXt Tiny) fused with an adaptive, lesion-aware weighting layer',
      'EfficientNetB4 Attention U-Net segmentation reaching a Dice score of ~0.88',
      'Diagnostic Reliability Index cross-validates Grad-CAM attention against the segmentation mask, gating predictions into Accepted / Caution / Specialist-Review tiers',
      'Groq LLM radiology report generation + PDF export via FastAPI, backed by 4 pytest suites'
    ],
    tags: ['PyTorch/TensorFlow', 'FastAPI', 'Groq LLM', 'OpenCV', 'GradCAM'],
    links: [
      { label: 'GitHub', href: 'https://github.com/tharunsridhar/NeuroScan-AI', icon: 'github' },
      { label: 'Model on HF', href: 'https://huggingface.co/tharunsridhar/brain_tumor_net-ensemble', icon: 'external' }
    ]
  },
  {
    title: 'Malware Vision AI',
    category: 'Computer Vision',
    subtitle: 'Multi-Class Malware Family Classification',
    desc: [
      'Converted 13,747 PE executable samples into grayscale image tensors, with no malware execution required',
      'Fine-tuned EfficientNetV2-S across 31 malware families with class-balanced training',
      'Evaluated with confusion matrices and per-class precision/recall alongside aggregate accuracy, not accuracy alone',
      'Macro F1 of 0.96 and weighted F1 of 0.95 across all 31 families'
    ],
    tags: ['TensorFlow', 'EfficientNetV2', 'Transfer Learning', 'NumPy'],
    links: [
      { label: 'GitHub', href: 'https://github.com/tharunsridhar/malware-vision-ai', icon: 'github' },
      { label: 'Model on HF', href: 'https://huggingface.co/tharunsridhar/malware-detector', icon: 'external' }
    ]
  }
];

const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17v3.22c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>'
};

const CATEGORY_CLASS = {
  'AI Engineering': 'cat-ai',
  'Computer Vision': 'cat-ml',
  'Backend': 'cat-backend'
};

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card" style="animation-delay:${i * 0.08}s">
      <div class="project-top">
        <div>
          <h3 class="project-title">${p.title}</h3>
        </div>
        <div class="project-badges">${(Array.isArray(p.category) ? p.category : [p.category]).map(c => `<span class="project-featured ${CATEGORY_CLASS[c] || ''}">${c}</span>`).join('')}</div>
      </div>
      <p class="project-desc" style="font-weight:600;color:var(--text-muted);margin-bottom:0.6rem;">${p.subtitle}</p>
      <div class="project-desc">
        <ul>${p.desc.map(d => `<li>${d}</li>`).join('')}</ul>
      </div>
      <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="project-links">
        ${p.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${ICONS[l.icon]}${l.label}</a>`).join('')}
      </div>
    </article>`).join('');
}
renderProjects();

/* ============================================================
   Security case study research: personal interest area
   ============================================================ */
const RESEARCH = [
  {
    tag: 'RCE · Framework Security',
    title: 'React2Shell: React Server Components RCE',
    rows: [
      ['What', 'A crafted Flight-protocol payload reached a server action endpoint and triggered insecure deserialization.'],
      ['How', 'Deserialization flaw led to prototype pollution, then command execution via Function() and child_process.'],
      ['Impact', 'Full server compromise: environment variables, database access, remote code execution.'],
      ['Prevention', 'Strict deserialization validation, restricted server-action exposure, framework patching, runtime monitoring.']
    ],
    href: 'https://github.com/tharunsridhar/security-research-portfolio/blob/main/Remote_Code_Execution_CVE-2025-55182.pdf'
  },
  {
    tag: 'IDOR · Broken Authorization',
    title: 'Star Health Insurance Breach',
    rows: [
      ['What', 'Attackers with valid credentials accessed unrelated user records through the backend API.'],
      ['How', 'Insecure Direct Object Reference (IDOR): missing object-level authorization allowed sequential ID enumeration.'],
      ['Impact', 'Large-scale exposure of sensitive personal and medical data.'],
      ['Prevention', 'Record-ownership verification, per-request authorization checks, anomalous-access monitoring.']
    ],
    href: 'https://github.com/tharunsridhar/security-research-portfolio/blob/main/star_health_data_breach.pdf'
  },
  {
    tag: 'Cloud Identity',
    title: 'Zero Trust &rarr; Adaptive Trust in Multi-Cloud',
    rows: [
      ['Studied', 'Identity-based security in distributed cloud systems and continuous verification models.'],
      ['Insight', 'Valid credentials no longer equal trusted activity; identity is now the primary security boundary.'],
      ['Model', 'Continuous behavioral evaluation replaces one-time login checks; anomalies trigger MFA and access throttling.']
    ],
    href: 'https://github.com/tharunsridhar/security-research-portfolio/blob/main/Zero_Trust_to_Adaptive_Trust_in_Multi-Cloud_Environments.pdf'
  }
];

function renderResearch() {
  const grid = document.getElementById('researchGrid');
  grid.innerHTML = RESEARCH.map((r, i) => `
    <article class="research-card reveal" style="animation-delay:${i * 0.08}s">
      <span class="research-tag">${r.tag}</span>
      <h3 class="research-title">${r.title}</h3>
      ${r.rows.map(([label, text]) => `
        <div class="research-row">
          <span class="research-row-label">${label}</span>
          <span class="research-row-text">${text}</span>
        </div>`).join('')}
      <a class="research-link" href="${r.href}" target="_blank" rel="noopener">Read the case study &rarr;</a>
    </article>`).join('');
  window.dispatchEvent(new Event('content-injected'));
}
renderResearch();

/* ============================================================
   Accomplishments: HackerRank + LeetCode (verified profiles)
   ============================================================ */
const HACKERRANK_BADGES = [
  { name: 'Problem Solving', stars: 5 },
  { name: 'Java', stars: 5 },
  { name: 'Python', stars: 5 },
  { name: 'SQL', stars: 5 }
];
const HACKERRANK_CERTS = [
  'SQL: Basic, Intermediate, Advanced',
  'Problem Solving: Basic, Intermediate',
  'Python (Basic)', 'R (Basic)',
  'Rest API (Intermediate)', 'Software Engineer'
];

const LEETCODE_STATS = { totalSolved: '250+' };

function renderLeetcodeStats(stats) {
  return `
    <div class="leetcode-solved-num">${stats.totalSolved}</div>
    <div class="leetcode-solved-label">Problems Solved</div>`;
}

function renderAccomplishments() {
  const grid = document.getElementById('accomplishGrid');
  grid.innerHTML = `
    <div class="accomplish-card reveal">
      <div class="accomplish-head">
        <h3>HackerRank: Verified Skills</h3>
        <a class="accomplish-link" href="https://www.hackerrank.com/profile/tharunsridhar" target="_blank" rel="noopener">View profile &rarr;</a>
      </div>
      <div class="badge-chips">
        ${HACKERRANK_BADGES.map(b => `<span class="badge-chip">${b.name} <span class="stars">${'&#9733;'.repeat(b.stars)}</span></span>`).join('')}
      </div>
      <div class="cert-mini-list">
        ${HACKERRANK_CERTS.map(c => `<div class="cert-mini"><span class="cert-mini-name">${c}</span><span class="cert-mini-status">Verified</span></div>`).join('')}
      </div>
    </div>
    <div class="accomplish-card leetcode-card reveal">
      <div class="accomplish-head">
        <h3>LeetCode</h3>
        <a class="accomplish-link" href="https://leetcode.com/u/Tharunsridhar/" target="_blank" rel="noopener">View profile &rarr;</a>
      </div>
      <div class="leetcode-stats">
        ${renderLeetcodeStats(LEETCODE_STATS)}
      </div>
      <a class="btn btn-ghost btn-sm" href="https://leetcode.com/u/Tharunsridhar/" target="_blank" rel="noopener">Profile</a>
    </div>
  `;
  window.dispatchEvent(new Event('content-injected'));
}
renderAccomplishments();

/* ============================================================
   Certification & badge data
   ============================================================ */
const CERT_GROUPS = [
  {
    title: 'AWS Certified Solutions Architect – Associate (SAA-C03) Specialization',
    icon: '☁️',
    collapsible: true,
    issuer: 'Packt · Coursera',
    dateRange: 'Jul 2026',
    mainItem: { shortName: 'AWS Certified Solutions Architect – Associate (SAA-C03)', date: 'Jul 11, 2026', link: 'https://coursera.org/verify/specialization/288QHZ5FL97M' },
    items: [
      { name: 'AWS Foundations and Core Services', issuer: 'Packt · Coursera', date: 'Jul 5, 2026', link: 'https://coursera.org/verify/9A483W5VDOI8' },
      { name: 'AWS Networking, Compute & IAM Architecture', issuer: 'Packt · Coursera', date: 'Jul 7, 2026', link: 'https://coursera.org/verify/81RY6JCL6ZYV' },
      { name: 'Advanced AWS Deployment, Databases & Optimization', issuer: 'Packt · Coursera', date: 'Jul 11, 2026', link: 'https://coursera.org/verify/LWE7O3C75LUZ' }
    ]
  },
  {
    title: 'IBM RAG and Agentic AI',
    icon: '✨',
    collapsible: true,
    issuer: 'IBM · Coursera',
    dateRange: 'Aug 2026 – Sep 2026',
    items: [
      { name: 'Develop Generative AI Applications: Get Started', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'https://coursera.org/verify/0DCDBI140NPN' },
      { name: 'Build RAG Applications: Get Started', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'https://coursera.org/verify/QU4BKSV10SL7' },
      { name: 'Vector Databases for RAG: An Introduction', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'https://coursera.org/verify/9BVDOTL3HGGD' },
      { name: 'Advanced RAG with Vector Databases and Retrievers', issuer: 'IBM · Coursera', date: 'Aug 26, 2026', link: 'https://coursera.org/verify/1L7EGAQ94135' },
      { name: 'Build Multimodal Generative AI Applications', issuer: 'IBM · Coursera', date: 'Sep 1, 2026', link: 'https://coursera.org/verify/L36TT3J2RALB' },
      { name: 'Fundamentals of Building AI Agents', issuer: 'IBM · Coursera', date: 'Sep 9, 2026', link: 'https://coursera.org/verify/HEI8XXD4VSOI' },
      { name: 'Agentic AI with LangChain and LangGraph', issuer: 'IBM · Coursera', date: 'Sep 16, 2026', link: 'https://coursera.org/verify/XH8A43HDLU8L' },
      { name: 'Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI', issuer: 'IBM · Coursera', date: 'Sep 18, 2026', link: 'https://coursera.org/verify/LXH49VX9HKP3' }
    ]
  },
  {
    title: 'AI Engineering',
    icon: '🧠',
    collapsible: true,
    issuer: 'SmartBridge × Google for Developers',
    dateRange: 'Jul 2025',
    items: [
      { name: 'Artificial Intelligence (Credit Course)', issuer: 'SmartBridge × Google for Developers', date: 'Jul 16, 2025', link: 'assets/certificates/smartbridge-ai-credit-course.pdf' },
      { name: 'Certificate of Merit — 100/100', issuer: 'SmartBridge × Google for Developers', date: 'Jul 16, 2025', link: 'assets/certificates/smartbridge-ai-merit.pdf' },
      { name: 'Project Completion: Dog Breed Identification using Transfer Learning', issuer: 'SmartBridge', date: 'Jul 14, 2025', link: 'assets/certificates/smartbridge-ai-project-completion.pdf' }
    ]
  },
  {
    title: 'Anthropic Badges',
    display: 'badges',
    items: [
      { name: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: '2026', icon: '🤖', link: 'assets/certificates/anthropic-ai-fluency.pdf' },
      { name: 'Introduction to Model Context Protocol', issuer: 'Anthropic', date: 'Feb 2026', icon: '🔗', link: 'https://verify.skilljar.com/c/8v2nanvk5wsh' },
      { name: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', date: 'Feb 2026', icon: '🔗', link: 'https://verify.skilljar.com/c/4xy6huookznu' },
      { name: 'Claude Code in Action', issuer: 'Anthropic', date: 'Feb 2026', icon: '⚡', link: 'https://verify.skilljar.com/c/4ae9pz865x6p' }
    ]
  }
];

function renderCertGroupItem(item) {
  return `
    <a class="cert-group-item" href="${item.link}" target="_blank" rel="noopener">
      <span class="cert-group-item-name">${item.name}</span>
      <span class="cert-group-item-date">${item.date}</span>
    </a>`;
}

function renderBadgeTiles(list) {
  return list.map(b => `
    <a class="badge-tile" href="${b.link}" target="_blank" rel="noopener">
      <span class="badge-tile-icon">${b.icon}</span>
      <span class="badge-tile-name">${b.name}</span>
      <span class="badge-tile-issuer">${b.issuer} &middot; ${b.date}</span>
    </a>
  `).join('');
}

function groupMetaParts(g) {
  return [g.issuer, g.dateRange].filter(Boolean).join(' &middot; ');
}

function renderCertGroupBlock(g, i) {
  if (g.collapsible) {
    const meta = groupMetaParts(g);
    return `
      <button type="button" class="cert-group-card cert-group-trigger" data-group-index="${i}">
        <span class="cert-group-icon">${g.icon}</span>
        <span class="cert-group-info">
          <span class="cert-group-name">${g.title}</span>
          ${meta ? `<span class="cert-group-count">${meta}</span>` : ''}
        </span>
        <span class="cert-group-arrow">&rarr;</span>
      </button>`;
  }
  if (g.display === 'badges') {
    return `
      <h3 class="cert-group-title">${g.title}</h3>
      <div class="badge-tile-grid">${renderBadgeTiles(g.items)}</div>`;
  }
}

function renderCertGroups() {
  document.getElementById('certGroups').innerHTML = CERT_GROUPS.map((g, i) => `
    <div class="cert-group-block reveal">${renderCertGroupBlock(g, i)}</div>
  `).join('');
  document.querySelectorAll('[data-group-index]').forEach(btn => {
    btn.addEventListener('click', () => openCertModal(Number(btn.dataset.groupIndex)));
  });
  window.dispatchEvent(new Event('content-injected'));
}
renderCertGroups();

/* ---------------- Certification group modal ---------------- */
const certModal = document.getElementById('certModal');

function openCertModal(i) {
  const g = CERT_GROUPS[i];
  certModal.innerHTML = `
    <div class="cert-modal-backdrop"></div>
    <div class="cert-modal-panel" role="dialog" aria-modal="true" aria-label="${g.title}">
      <button type="button" class="cert-modal-close" aria-label="Close">&times;</button>
      <div class="cert-modal-head">
        <span class="cert-group-icon">${g.icon}</span>
        <div>
          <h3 class="cert-modal-title">${g.title}</h3>
          <p class="cert-group-count">
            ${g.mainItem ? `<a class="cert-modal-mainlink" href="${g.mainItem.link}" target="_blank" rel="noopener">${g.mainItem.shortName} &#8599;</a> &middot; ` : ''}${groupMetaParts(g)}
          </p>
        </div>
      </div>
      <div class="cert-group-list">
        ${g.items.map(renderCertGroupItem).join('')}
      </div>
    </div>`;
  certModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  certModal.querySelector('.cert-modal-backdrop').addEventListener('click', closeCertModal);
  certModal.querySelector('.cert-modal-close').addEventListener('click', closeCertModal);
}

function closeCertModal() {
  certModal.classList.remove('open');
  document.body.style.overflow = '';
  certModal.innerHTML = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && certModal.classList.contains('open')) closeCertModal();
});
