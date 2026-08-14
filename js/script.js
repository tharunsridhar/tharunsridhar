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
    title: 'NeuroScan AI',
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
    title: 'Inventra',
    subtitle: 'Role-Based Inventory Management System',
    desc: [
      'Admin / Manager / Employee access control with JWT access + revocable, database-stored refresh tokens',
      'Full REST surface: 51 endpoints across 13 routers (auth, products, purchases, sales, returns, damage, reports, notifications)',
      'Every stock-affecting action writes exactly one immutable inventory transaction row, with no update or delete path',
      'Atomic, idempotent purchase-receiving and sales-completion flows, safe to retry without side effects'
    ],
    tags: ['FastAPI', 'SQLAlchemy 2.0', 'Alembic', 'JWT', 'SQLite'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/Inventra', icon: 'github' }]
  },
  {
    title: 'Malware Vision AI',
    subtitle: 'Multi-Class Malware Family Classification',
    desc: [
      'Converted 13,747 PE executable samples into grayscale image tensors, with no malware execution required',
      'Fine-tuned EfficientNetV2-S across 31 malware families with class-balanced training',
      '~95% test accuracy, macro F1 of 0.96, weighted F1 of 0.95',
      'Validated with confusion matrices and per-class precision/recall, not just aggregate accuracy'
    ],
    tags: ['TensorFlow', 'EfficientNetV2', 'Transfer Learning', 'NumPy'],
    links: [
      { label: 'GitHub', href: 'https://github.com/tharunsridhar/malware-vision-ai', icon: 'github' },
      { label: 'Model on HF', href: 'https://huggingface.co/tharunsridhar/malware-detector', icon: 'external' }
    ]
  },
  {
    title: 'PhotoShare API',
    subtitle: 'Photo & Video Sharing Backend',
    desc: [
      'Async FastAPI backend with JWT auth via fastapi-users: register, login, email verification, forgot/reset-password',
      'Media streamed to a temp file then pushed to the ImageKit CDN, with UUID-keyed async SQLAlchemy models',
      'Ownership-based authorization returns 403 on delete attempts by non-owners',
      'REST API and static frontend served from a single FastAPI process, with zero CORS overhead'
    ],
    tags: ['FastAPI', 'Async SQLAlchemy', 'JWT', 'ImageKit'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/photoshare-api', icon: 'github' }]
  }
];

const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17v3.22c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>'
};

function renderProjects() {
  const grid = document.getElementById('projectsGrid');
  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card" style="animation-delay:${i * 0.08}s">
      <div class="project-top">
        <div>
          <h3 class="project-title">${p.title}</h3>
        </div>
        <span class="project-featured">Featured</span>
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
  'SQL (Basic)', 'SQL (Intermediate)', 'SQL (Advanced)',
  'Python (Basic)', 'Problem Solving (Basic)', 'Problem Solving (Intermediate)', 'R (Basic)'
];

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
        <a class="accomplish-link" href="https://leetcode.com/u/tharun_sridhar/" target="_blank" rel="noopener">View profile &rarr;</a>
      </div>
      <p class="accomplish-body">
        Actively practicing structured problem sets, from the full Blind 75 to an extended
        NeetCode-150-style tracker spanning 45+ patterns: two pointers, sliding window, heaps,
        tries, Union-Find, Dijkstra, segment trees, and more.
      </p>
      <div class="leetcode-stats">
        <div class="leetcode-stat"><span class="leetcode-stat-num">75</span><span class="leetcode-stat-label">Blind 75 Tracked</span></div>
        <div class="leetcode-stat"><span class="leetcode-stat-num">45+</span><span class="leetcode-stat-label">Patterns Covered</span></div>
      </div>
      <a class="btn btn-ghost btn-sm" href="https://leetcode.com/u/tharun_sridhar/" target="_blank" rel="noopener">Profile &amp; submissions</a>
    </div>
  `;
  window.dispatchEvent(new Event('content-injected'));
}
renderAccomplishments();

/* ============================================================
   Certification & badge data
   ============================================================ */
const CERTIFICATIONS = [
  { name: 'AWS Certified Solutions Architect – Associate (SAA-C03) Specialization', issuer: 'Packt', date: 'Jul 2026', icon: '☁️' },
  { name: 'Develop Generative AI Applications: Get Started', issuer: 'IBM · Coursera', date: 'Aug 2026', icon: '✨' },
  { name: 'Artificial Intelligence (Credit Course)', issuer: 'SmartBridge × Google for Developers', date: 'May–Jun 2025', icon: '🧠' }
];

const BADGES = [
  { name: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: '2026', icon: '🤖' },
  { name: 'Introduction to Model Context Protocol', issuer: 'Anthropic', date: '2026', icon: '🔗' },
  { name: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', date: '2026', icon: '🔗' },
  { name: 'Claude Code in Action', issuer: 'Anthropic', date: '2026', icon: '⚡' }
];

function renderCertCards(list, elId) {
  document.getElementById(elId).innerHTML = list.map(c => `
    <div class="cert-card">
      <div class="cert-icon">${c.icon}</div>
      <div class="cert-body">
        <p class="cert-name">${c.name}</p>
        <p class="cert-meta">${c.issuer} &middot; ${c.date}</p>
      </div>
    </div>
  `).join('');
}
renderCertCards(CERTIFICATIONS, 'certsGrid');
renderCertCards(BADGES, 'badgesGrid');
