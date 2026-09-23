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
  const words = ['backend systems.', 'AI agents.', 'LLM pipelines.', 'REST APIs.', 'things that ship.'];
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
    role: 'Backend Dev',
    subtitle: 'Role-Based Inventory Management System',
    desc: [
      'Load tested with Locust: without row-level locking, 40 concurrent users silently lost 16 units of stock with zero HTTP errors; select_for_update() closes the race to zero discrepancy',
      'Admin / Manager / Employee RBAC with JWT access + DB-blacklisted refresh tokens, rate limited per scope; append-only stock ledger enforced twice (no write route registered, and Django Admin permissions hard-disabled)',
      'Redis-cached reports with version-counter invalidation, cache hits collapse 9 queries down to 1 (proven via query-count assertions, not just timing)',
      'Celery background jobs and Beat schedule for async invoices, low-stock alerts, and nightly ledger reconciliation; deployed on AWS behind an Application Load Balancer'
    ],
    tags: ['Python Backend', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'JWT'],
    links: [
      { label: 'GitHub', href: 'https://github.com/tharunsridhar/Inventra', icon: 'github' },
      { label: 'Live Demo', href: 'http://inventra-alb-164557112.ap-south-1.elb.amazonaws.com/app', icon: 'external' }
    ]
  },
  {
    title: 'Corrective RAG',
    category: 'AI Engineering',
    role: 'AI Dev',
    subtitle: 'Self-Evaluating Local RAG Pipeline, Benchmarked with RAGAS',
    desc: [
      'Grades its own retrieval relevance, rewrites the query and re-retrieves on weak results, then falls back to live DuckDuckGo web search when local evidence still isn’t enough',
      'Claim-level verification stage extracts atomic claims from the generated answer and checks each against a deduplicated, citation-tagged evidence set, correcting and re-verifying anything unsupported',
      'Runs fully local by default on Ollama (Llama 3.2 3B) with Chroma + sentence-transformers, with Groq/OpenRouter as opt-in cloud fallbacks',
      'RAGAS-based evaluation harness benchmarks the corrective pipeline against a plain baseline RAG system on faithfulness, context precision/recall, and answer relevancy'
    ],
    tags: ['AI Dev', 'FastAPI', 'Ollama', 'ChromaDB', 'RAGAS', 'DuckDuckGo'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/Corrective-RAG', icon: 'github' }]
  },
  {
    title: 'PhotoShare API',
    category: 'Backend',
    role: ['Team Member', 'Backend Dev'],
    subtitle: 'Photo & Video Sharing Backend',
    desc: [
      'Async FastAPI backend with JWT auth via fastapi-users: register, login, email verification, forgot/reset-password',
      'Media streamed to a temp file then pushed to the ImageKit CDN, with UUID-keyed async SQLAlchemy models',
      'Ownership-based authorization returns 403 on delete attempts by non-owners',
      'REST API and static frontend served from a single FastAPI process, with zero CORS overhead'
    ],
    tags: ['Python Backend', 'FastAPI', 'Async SQLAlchemy', 'JWT', 'ImageKit'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/photoshare-api', icon: 'github' }]
  },
  {
    title: 'Finvoro',
    category: 'Backend',
    role: 'Backend Dev',
    subtitle: 'Personal Finance Management API',
    desc: [
      'Django REST Framework backend for multi-account tracking, categorized transactions, monthly budgets, and spending reports',
      'JWT auth (djangorestframework-simplejwt) with per-user data ownership enforced end-to-end on every endpoint',
      'Versioned API under /api/v1/, live-computed account balances and budget spent/remaining figures, no stale duplicated values',
      'pytest + pytest-django coverage suite; interactive Swagger/ReDoc docs via drf-spectacular'
    ],
    tags: ['Python Backend', 'Django', 'DRF', 'PostgreSQL', 'JWT', 'pytest'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/finvoro-finance', icon: 'github' }]
  },
  {
    title: 'MCP Agent Toolkit',
    category: 'AI Engineering',
    role: 'AI Dev',
    subtitle: 'Model Context Protocol Server & Agent, Built from Scratch',
    desc: [
      'Real FastMCP server exposing Tools, Resources, and a Prompt as its own separate process; the agent reaches every one of them only through an MCP ClientSession over stdio, never by importing a Python function directly',
      'Live "what the client discovered" panel and a per-turn call trace show the actual list_tools / list_resources / list_prompts results and call_tool arguments, not simulated for the UI',
      'Swapping in a real third-party MCP server (filesystem, GitHub, Slack) only means changing the StdioServerParameters, and nothing about the agent loop changes, proving the protocol boundary actually holds',
      'Test suite spins up the real MCP server subprocess and drives it through the full protocol (discovery, tool calls, resource reads, prompt templates) with no API key or network needed'
    ],
    tags: ['AI Dev', 'MCP', 'FastMCP', 'Groq', 'FastAPI', 'Pytest'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/mcp-agent-toolkit', icon: 'github' }]
  },
  {
    title: 'Framework Showdown',
    category: 'AI Engineering',
    role: ['Team Member', 'AI Dev'],
    subtitle: 'The Same Two-Agent Workflow, Built on Three Different Frameworks',
    desc: [
      'The same researcher-writer two-agent workflow implemented three separate times: CrewAI (sequential Process with task context-passing), AutoGen (RoundRobinGroupChat until a TERMINATE signal), and BeeAI (a single ReAct agent deciding for itself whether to call a tool)',
      'CrewAI and BeeAI pin incompatible pydantic versions and won’t share a virtualenv, so the FastAPI app runs AutoGen in-process and shells out to two separate Python 3.11 venvs as subprocesses for the other two, each returning one line of JSON on stdout',
      'Tests validate request handling, venv wiring, and that a missing interpreter fails with a clear 500 error message instead of a silent crash, with no Groq calls needed to run them'
    ],
    tags: ['AI Dev', 'CrewAI', 'AutoGen', 'BeeAI', 'FastAPI', 'Pytest'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/agent-framework-showdown', icon: 'github' }]
  },
  {
    title: 'Task Manager Agent',
    category: 'AI Engineering',
    role: ['Team Lead', 'AI Dev'],
    subtitle: 'LangGraph Tool-Calling Agent with Human-in-the-Loop Safety',
    desc: [
      'LangGraph agent adds, lists, updates, completes, and deletes tasks, and pauses mid-run for human confirmation before any delete via interrupt() / Command(resume=...)',
      'Conversation state persisted across requests with a SQLite checkpointer, so context survives a page refresh, not just an in-memory session',
      'Test suite swaps in a scripted FakeModel to exercise the real graph, real tools, and real interrupt/resume flow with no API key or network call',
      'FastAPI backend with a raw request/response inspector in the UI, showing exactly what the agent sent and received on each turn'
    ],
    tags: ['AI Dev', 'LangGraph', 'FastAPI', 'SQLite', 'Groq', 'Pytest'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/langgraph-task-manager-agent', icon: 'github' }]
  },
  {
    title: 'NeuroScan AI',
    category: ['Backend'],
    role: ['Team Lead', 'Backend Dev'],
    subtitle: 'Brain Tumor MRI Analysis Platform',
    desc: [
      'Led the team; personally built the FastAPI serving layer wiring the classification ensemble, segmentation model, and reliability gating into a single production API',
      'Groq LLM radiology report generation and PDF export served through the same FastAPI backend, backed by 4 pytest suites',
      'Diagnostic Reliability Index cross-validates Grad-CAM attention against the segmentation mask server-side, gating predictions into Accepted / Caution / Specialist-Review tiers before they reach the API response',
      'Also trained the underlying models: a 4-model classification ensemble (EfficientNetV2-S, MobileNetV3, ConvNeXt Tiny) and an EfficientNetB4 Attention U-Net segmentation model reaching a Dice score of ~0.88'
    ],
    tags: ['Python Backend', 'FastAPI', 'Groq LLM', 'PyTorch/TensorFlow', 'OpenCV', 'GradCAM'],
    links: [
      { label: 'GitHub', href: 'https://github.com/tharunsridhar/NeuroScan-AI', icon: 'github' },
      { label: 'Model on HF', href: 'https://huggingface.co/tharunsridhar/brain_tumor_net-ensemble', icon: 'external' }
    ]
  }
];

const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17v3.22c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>'
};

const ROLE_FULL_NAME = { 'Backend Dev': 'Backend Engineer', 'AI Dev': 'AI Developer', 'Team Lead': 'Team Lead' };

function teamRoleLine(p) {
  if (!p.role) return '';
  const roles = Array.isArray(p.role) ? p.role : [p.role];
  const isTeam = roles.includes('Team Lead') || roles.includes('Team Member');
  const named = roles.filter(r => r !== 'Team Member').map(r => ROLE_FULL_NAME[r] || r);
  return `${isTeam ? 'Team' : 'Solo'} Project &mdash; ${named.join(', ')}`;
}

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card" style="animation-delay:${i * 0.08}s">
      <div class="project-top">
        <div>
          <h3 class="project-title">${p.title}</h3>
          ${teamRoleLine(p) ? `<p class="project-role-line">${teamRoleLine(p)}</p>` : ''}
        </div>
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
        <h3><span class="accomplish-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C7.802 0 4.487.472 2.784 2.784.472 4.487 0 7.802 0 12c0 4.198.472 7.513 2.784 9.216C4.487 23.528 7.802 24 12 24c4.198 0 7.513-.472 9.216-2.784C23.528 19.513 24 16.198 24 12c0-4.198-.472-7.513-2.784-9.216C19.513.472 16.198 0 12 0ZM8.61 4.771c.12 0 .243.03.351.09.394.201.55.674.365 1.062-.008.014-.85 1.663-.85 5.929v.288h7.076v-.288c0-4.29-.834-5.907-.842-5.921a.783.783 0 0 1 .343-1.05.83.83 0 0 1 1.09.34c.045.075.995 1.898.995 6.63v9.398a.81.81 0 0 1-.815.802.81.81 0 0 1-.815-.802v-4.037H8.476v4.037a.81.81 0 0 1-.815.802.81.81 0 0 1-.815-.802v-9.398c0-4.732.95-6.555.995-6.629a.81.81 0 0 1 .77-.432Z"/></svg></span>HackerRank: Verified Skills</h3>
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
        <h3><span class="accomplish-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.539.54-1.414.003-1.955-.54-.542-1.413-.542-1.955-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207.48-.593.387-1.462-.207-1.941l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0Zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382Z"/></svg></span>LeetCode</h3>
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
   Certification, course, and credential data
   ============================================================ */
const CERT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
const COURSE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5"/></svg>';

const CERT_GROUPS = [
  {
    title: 'AWS Certified Solutions Architect – Associate (SAA-C03) Specialization',
    icon: CERT_ICON,
    collapsible: true,
    issuer: 'Packt · Coursera',
    dateRange: 'Jul 2026',
    mainItem: { shortName: 'AWS Certified Solutions Architect – Associate (SAA-C03)', date: 'Jul 2026', link: 'https://coursera.org/verify/specialization/288QHZ5FL97M' },
    items: [
      { name: 'AWS Foundations and Core Services', issuer: 'Packt · Coursera', date: 'Jul 2026', link: 'https://coursera.org/verify/9A483W5VDOI8' },
      { name: 'AWS Networking, Compute & IAM Architecture', issuer: 'Packt · Coursera', date: 'Jul 2026', link: 'https://coursera.org/verify/81RY6JCL6ZYV' },
      { name: 'Advanced AWS Deployment, Databases & Optimization', issuer: 'Packt · Coursera', date: 'Jul 2026', link: 'https://coursera.org/verify/LWE7O3C75LUZ' }
    ]
  },
  {
    title: 'IBM RAG and Agentic AI',
    icon: CERT_ICON,
    collapsible: true,
    issuer: 'IBM · Coursera',
    dateRange: 'Aug 2026 – Sep 2026',
    items: [
      { name: 'Develop Generative AI Applications: Get Started', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'https://coursera.org/verify/0DCDBI140NPN' },
      { name: 'Build RAG Applications: Get Started', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'https://coursera.org/verify/QU4BKSV10SL7' },
      { name: 'Vector Databases for RAG: An Introduction', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'https://coursera.org/verify/9BVDOTL3HGGD' },
      { name: 'Advanced RAG with Vector Databases and Retrievers', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'https://coursera.org/verify/1L7EGAQ94135' },
      { name: 'Build Multimodal Generative AI Applications', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'https://coursera.org/verify/L36TT3J2RALB' },
      { name: 'Fundamentals of Building AI Agents', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'https://coursera.org/verify/HEI8XXD4VSOI' },
      { name: 'Agentic AI with LangChain and LangGraph', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'https://coursera.org/verify/XH8A43HDLU8L' },
      { name: 'Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'https://coursera.org/verify/LXH49VX9HKP3' },
      { name: 'Build AI Agents using MCP', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'https://coursera.org/verify/JJCEDZ51YGXF' }
    ]
  },
  {
    title: 'AI Engineering',
    icon: CERT_ICON,
    collapsible: true,
    issuer: 'SmartBridge × Google for Developers',
    dateRange: 'Jul 2025',
    items: [
      { name: 'Artificial Intelligence (Credit Course)', issuer: 'SmartBridge × Google for Developers', date: 'Jul 2025', link: 'assets/certificates/smartbridge-ai-credit-course.pdf' },
      { name: 'Certificate of Merit (100/100)', issuer: 'SmartBridge × Google for Developers', date: 'Jul 2025', link: 'assets/certificates/smartbridge-ai-merit.pdf' },
      { name: 'Project Completion: Dog Breed Identification using Transfer Learning', issuer: 'SmartBridge', date: 'Jul 2025', link: 'assets/certificates/smartbridge-ai-project-completion.pdf' }
    ]
  },
  {
    title: 'Anthropic Courses',
    icon: COURSE_ICON,
    collapsible: true,
    issuer: 'Anthropic',
    items: [
      { name: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: '2026', status: 'completed', link: 'assets/certificates/anthropic-ai-fluency.pdf' },
      { name: 'Introduction to Model Context Protocol', issuer: 'Anthropic', date: 'Feb 2026', status: 'completed', link: 'https://verify.skilljar.com/c/8v2nanvk5wsh' },
      { name: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', date: 'Feb 2026', status: 'completed', link: 'https://verify.skilljar.com/c/4xy6huookznu' },
      { name: 'Claude Code in Action', issuer: 'Anthropic', date: 'Feb 2026', status: 'completed', link: 'https://verify.skilljar.com/c/4ae9pz865x6p' },
      { name: 'Introduction to Agent Skills', issuer: 'Anthropic', date: null, status: 'completed', link: null },
      { name: 'Introduction to Subagents', issuer: 'Anthropic', date: null, status: 'completed', link: null },
      { name: 'Building with the Claude API', issuer: 'Anthropic', date: null, status: 'in-progress', link: null }
    ]
  }
];

function renderCertGroupItem(item) {
  const statusTag = item.status
    ? `<span class="cert-group-item-status${item.status === 'in-progress' ? ' in-progress' : ''}">${item.status === 'in-progress' ? 'In Progress' : 'Completed Course'}</span>`
    : '';
  const inner = `
      <span class="cert-group-item-name">${item.name}</span>
      ${statusTag}
      ${item.date ? `<span class="cert-group-item-date">${item.date}</span>` : ''}`;
  return item.link
    ? `<a class="cert-group-item" href="${item.link}" target="_blank" rel="noopener">${inner}</a>`
    : `<div class="cert-group-item cert-group-item-static">${inner}</div>`;
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
