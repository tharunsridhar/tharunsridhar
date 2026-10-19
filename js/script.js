// ============================================================
// Tharun Sridhar, Portfolio interactions
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

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
let diagramCount = 0;
function archDiagram({ label, boxes, arrows, notes = [] }) {
  const id = `arr${++diagramCount}`;
  const box = (b, i) => {
    const bi = i, cx = b.x + b.w / 2, cy = b.y + b.h / 2, n = b.lines.length;
    const ys = n === 1 ? [cy + 4] : n === 2 ? [cy - 3, cy + 12] : [cy - 10, cy + 5, cy + 19];
    return `<rect data-b="${i}" x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${b.h > 60 ? 12 : 10}"${b.hl ? ' style="stroke:var(--accent)"' : ''}/>` +
      b.lines.map((t, i) => `<text data-b="${bi}" x="${cx}" y="${ys[i]}"${i === 0 ? ' style="font-weight:600"' : ' style="fill:var(--text-muted)"'}>${t}</text>`).join('');
  };
  // each box is drawn inside one group so the fill/stroke styling applies, text is restyled per line
  const rects = boxes.map((b, i) => `<g style="fill:var(--surface-2);stroke:var(--border);stroke-width:1.5">${box(b, i).match(/<rect[^>]*\/>/)[0]}</g>`).join('');
  const texts = boxes.map((b, i) => box(b, i).replace(/<rect[^>]*\/>/, '')).join('');
  const paths = arrows.map(p => {
    const d = typeof p === 'string' ? p : p.d;
    const both = typeof p !== 'string' && p.both;
    return `<path d="${d}" marker-end="url(#${id})"${both ? ` marker-start="url(#${id})"` : ''}/>`;
  }).join('');
  const nt = notes.map(n => `<text x="${n.x}" y="${n.y}" style="fill:var(--text-faint);font-size:10px">${n.t}</text>`).join('');
  return `
<svg viewBox="0 0 520 220" role="img" aria-label="${label}">
  <defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10z" style="fill:var(--accent)"/></marker></defs>
  ${rects}
  <g style="stroke:var(--accent);stroke-width:1.6;fill:none">${paths}</g>
  <g style="fill:var(--text);font-family:var(--font-mono);font-size:11px;text-anchor:middle">${texts}${nt}</g>
</svg>`;
}

const INVENTRA_DIAGRAM = archDiagram({
  label: 'Inventra architecture: client to AWS load balancer to Django and DRF, backed by PostgreSQL and Redis, with a Celery worker and Beat schedule consuming jobs from Redis',
  boxes: [
    { x: 8, y: 90, w: 72, h: 40, lines: ['Client'] },
    { x: 100, y: 90, w: 76, h: 40, lines: ['AWS ALB'] },
    { x: 196, y: 75, w: 116, h: 70, lines: ['Django + DRF', 'JWT · RBAC'], hl: true },
    { x: 352, y: 14, w: 110, h: 44, lines: ['PostgreSQL', 'stock ledger'] },
    { x: 352, y: 88, w: 110, h: 44, lines: ['Redis', 'cache + broker'] },
    { x: 352, y: 162, w: 110, h: 44, lines: ['Celery worker', '+ Beat schedule'] }
  ],
  arrows: ['M80 110H98', 'M176 110H194', 'M312 100H332V36H350', 'M312 110H350', 'M407 132V160', 'M462 184H492V36H464']
});

const FINVORO_DIAGRAM = archDiagram({
  label: 'Finvoro architecture: client to a versioned Django REST Framework API with JWT, backed by PostgreSQL, with generated Swagger and ReDoc docs',
  boxes: [
    { x: 8, y: 90, w: 82, h: 40, lines: ['Client'] },
    { x: 130, y: 70, w: 150, h: 80, lines: ['Django REST', 'JWT · /api/v1/', 'per-user ownership'], hl: true },
    { x: 340, y: 24, w: 150, h: 44, lines: ['Swagger / ReDoc', 'drf-spectacular'] },
    { x: 340, y: 152, w: 150, h: 44, lines: ['PostgreSQL', 'live balances'] }
  ],
  arrows: [{ d: 'M90 110H128', both: true }, 'M280 95H300V46H338', 'M280 125H300V174H338']
});

const MCP_DIAGRAM = archDiagram({
  label: 'MCP Agent Toolkit architecture: a FastAPI agent loop backed by a Groq model talks over an MCP ClientSession on stdio to a separate FastMCP server process, which stores data in SQLite',
  boxes: [
    { x: 40, y: 12, w: 110, h: 44, lines: ['Groq LLM', 'tool calling'] },
    { x: 8, y: 72, w: 174, h: 80, lines: ['FastAPI agent loop', 'MCP ClientSession', 'discovers tools live'], hl: true },
    { x: 338, y: 72, w: 174, h: 80, lines: ['FastMCP server', 'Tools · Resources', 'Prompt · own process'] },
    { x: 368, y: 172, w: 114, h: 40, lines: ['SQLite', 'toolkit.db'] }
  ],
  arrows: [{ d: 'M95 72V58', both: true }, { d: 'M182 112H336', both: true }, 'M425 152V170'],
  notes: [{ x: 259, y: 104, t: 'stdio' }]
});

const TASK_AGENT_DIAGRAM = archDiagram({
  label: 'Task Manager Agent architecture: client to FastAPI to a LangGraph agent that calls a Groq model and task tools backed by SQLite, pausing for human confirmation before deletes, with state saved by a SQLite checkpointer',
  boxes: [
    { x: 8, y: 90, w: 72, h: 40, lines: ['Client'] },
    { x: 100, y: 90, w: 76, h: 40, lines: ['FastAPI'] },
    { x: 196, y: 70, w: 126, h: 80, lines: ['LangGraph agent', 'interrupt() gate', 'on delete'], hl: true },
    { x: 362, y: 14, w: 130, h: 44, lines: ['Groq LLM', 'tool calling'] },
    { x: 362, y: 88, w: 130, h: 44, lines: ['5 task tools', 'tasks.db (sqlite3)'] },
    { x: 362, y: 162, w: 130, h: 44, lines: ['SqliteSaver', 'checkpoints.db'] }
  ],
  arrows: ['M80 110H98', 'M176 110H194', { d: 'M322 92H342V36H360', both: true }, { d: 'M322 110H360', both: true }, 'M322 128H342V184H360']
});

const PHOTOSHARE_DIAGRAM = archDiagram({
  label: 'PhotoShare API architecture: client to a single async FastAPI process with JWT auth and ownership checks, backed by a SQLAlchemy database and the ImageKit CDN for media',
  boxes: [
    { x: 8, y: 90, w: 82, h: 40, lines: ['Client'] },
    { x: 130, y: 70, w: 150, h: 80, lines: ['FastAPI (async)', 'JWT · fastapi-users', 'owner-only delete'], hl: true },
    { x: 340, y: 40, w: 150, h: 44, lines: ['ImageKit CDN', 'photos + video'] },
    { x: 340, y: 136, w: 150, h: 44, lines: ['SQLAlchemy', 'UUID-keyed posts'] }
  ],
  arrows: [{ d: 'M90 110H128', both: true }, 'M280 95H300V62H338', 'M280 125H300V158H338']
});

const MRFIX_DIAGRAM = archDiagram({
  label: 'FixItBro architecture: React client to an Express and TypeScript API with JWT cookies and per-provider advisory locks, backed by PostgreSQL where an exclusion constraint rejects overlapping bookings',
  boxes: [
    { x: 8, y: 90, w: 82, h: 40, lines: ['React app'] },
    { x: 130, y: 70, w: 150, h: 80, lines: ['Express + TS', 'JWT · Zod', 'advisory lock'], hl: true },
    { x: 340, y: 24, w: 150, h: 44, lines: ['OpenAPI docs', 'Swagger UI'] },
    { x: 340, y: 130, w: 150, h: 66, lines: ['PostgreSQL', 'EXCLUDE gist', 'no overlaps'] }
  ],
  arrows: [{ d: 'M90 110H128', both: true }, 'M280 95H300V46H338', 'M280 125H300V163H338']
});

const PROJECTS = [
  {
    title: 'Inventra',
    visual: INVENTRA_DIAGRAM,
    category: 'Backend',
    role: 'Backend Dev',
    subtitle: 'Role-Based Inventory Management System',
    desc: [
      'Role-based inventory system (Admin / Manager / Employee) with JWT auth and an append-only stock ledger for a fully auditable history',
      'Row-level locking fixed a race condition found in Locust load tests: 40 concurrent users lost 16 units of stock before, zero after',
      'Redis-cached reports cut 9 queries to 1; Celery handles invoices, low-stock alerts, and nightly reconciliation; deployed on AWS'
    ],
    tags: ['Python Backend', 'Django', 'DRF', 'PostgreSQL', 'Redis', 'Celery', 'JWT'],
    links: [
      { label: 'GitHub', href: 'https://github.com/tharunsridhar/Inventra', icon: 'github' },
      { label: 'Live Demo', href: 'http://inventra-alb-164557112.ap-south-1.elb.amazonaws.com/app', icon: 'external' }
    ]
  },
  {
    title: 'FixItBro',
    visual: MRFIX_DIAGRAM,
    category: 'Backend',
    role: 'Backend Dev',
    subtitle: 'Local Services Booking Platform',
    desc: [
      'Local services booking platform with Customer / Provider / Admin roles and a booking state machine',
      'Double-booking prevented at three layers, down to a PostgreSQL exclusion constraint; race tests fire 8 simultaneous requests and exactly one succeeds',
      '62 automated tests, OpenAPI docs, and CI; live on Render'
    ],
    tags: ['Backend', 'Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'React'],
    links: [
      { label: 'GitHub', href: 'https://github.com/tharunsridhar/fixitbro', icon: 'github' },
      { label: 'Live Demo', href: 'https://fixitbro.onrender.com', icon: 'external' }
    ]
  },
  {
    title: 'PhotoShare API',
    visual: PHOTOSHARE_DIAGRAM,
    category: 'Backend',
    role: ['Team Member', 'Backend Dev'],
    subtitle: 'Photo & Video Sharing Backend',
    desc: [
      'Async FastAPI backend for photo and video sharing, with JWT auth covering register, login, email verification, and password reset',
      'Media goes to the ImageKit CDN; only the owner of a post can delete it',
      'API and frontend served from a single process, so no CORS setup is needed'
    ],
    tags: ['Python Backend', 'FastAPI', 'Async SQLAlchemy', 'JWT', 'ImageKit'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/photoshare-api', icon: 'github' }]
  },
  {
    title: 'Finvoro',
    visual: FINVORO_DIAGRAM,
    category: 'Backend',
    role: 'Backend Dev',
    subtitle: 'Personal Finance Management API',
    desc: [
      'Django REST Framework API for multi-account tracking, categorized transactions, monthly budgets, and spending reports',
      'JWT auth with per-user data isolation on every endpoint; balances and budget figures computed live, never stored stale',
      'Versioned API with Swagger/ReDoc docs and a pytest suite'
    ],
    tags: ['Python Backend', 'Django', 'DRF', 'PostgreSQL', 'JWT', 'pytest'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/finvoro-finance', icon: 'github' }]
  },
  {
    title: 'MCP Agent Toolkit',
    visual: MCP_DIAGRAM,
    category: 'AI Engineering',
    role: 'AI Dev',
    subtitle: 'Model Context Protocol Server & Agent, Built from Scratch',
    desc: [
      'Real FastMCP server (Tools, Resources, Prompt) running as its own process; the agent reaches it only through an MCP client session over stdio',
      'UI shows live discovery results and a per-turn call trace of actual protocol traffic, not a simulation',
      'Swapping in any third-party MCP server needs no change to the agent loop; tests drive the real server with no API key'
    ],
    tags: ['AI Dev', 'MCP', 'FastMCP', 'Groq', 'FastAPI', 'Pytest'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/mcp-agent-toolkit', icon: 'github' }]
  },
  {
    title: 'Task Manager Agent',
    visual: TASK_AGENT_DIAGRAM,
    category: 'AI Engineering',
    role: ['Team Lead', 'AI Dev'],
    subtitle: 'LangGraph Tool-Calling Agent with Human-in-the-Loop Safety',
    desc: [
      'LangGraph agent that manages tasks and pauses for human confirmation before any delete (interrupt / resume)',
      'Conversation state persisted in a SQLite checkpointer, so context survives a page refresh',
      'Tests run the real graph, tools, and interrupt flow with a scripted fake model, no API key; UI includes a raw request/response inspector'
    ],
    tags: ['AI Dev', 'LangGraph', 'FastAPI', 'SQLite', 'Groq', 'Pytest'],
    links: [{ label: 'GitHub', href: 'https://github.com/tharunsridhar/langgraph-task-manager-agent', icon: 'github' }]
  }
];

const ICONS = {
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-2.14c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.79 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.17v3.22c0 .3.21.66.79.55A10.52 10.52 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>'
};

const ROLE_FULL_NAME = { 'Backend Dev': 'Backend Engineer', 'AI Dev': 'AI Developer', 'Team Lead': 'Team Lead', 'Team Member': 'Team Member' };

function roleBadges(p) {
  if (!p.role) return '';
  const roles = Array.isArray(p.role) ? p.role : [p.role];
  return `<div class="project-roles">${roles.map(r => `<span class="role-badge">${ROLE_FULL_NAME[r] || r}</span>`).join('')}</div>`;
}

function projectCard(p, i) {
  return `
    <article class="project-card" style="animation-delay:${i * 0.08}s">
      <div class="project-top">
        <div>
          <h3 class="project-title">${p.title}</h3>
          ${roleBadges(p)}
        </div>
      </div>
      ${p.visual ? `<div class="project-visual">${p.visual}</div>` : ''}
      <p class="project-desc" style="font-weight:600;color:var(--text-muted);margin-bottom:0.6rem;flex-grow:0;">${p.subtitle}</p>
      <div class="project-desc">
        <ul>${p.desc.map(d => `<li>${d}</li>`).join('')}</ul>
      </div>
      <div class="project-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="project-links">
        ${p.links.map(l => `<a href="${l.href}" target="_blank" rel="noopener">${ICONS[l.icon]}${l.label}</a>`).join('')}
      </div>
    </article>`;
}

function renderProjects() {
  document.getElementById('projectsGrid').innerHTML = PROJECTS.map(projectCard).join('');
  document.querySelectorAll('.project-visual svg').forEach(initDraggableDiagram);
}

/* Drag any box in an architecture diagram: it stays inside the frame, the arrows follow it
   as straight ropes, and on release it springs back like rubber. */
function initDraggableDiagram(svg) {
  const NS = 'http://www.w3.org/2000/svg';
  const W = 520, H = 220, PAD = 4;
  const rects = [...svg.querySelectorAll('rect[data-b]')];
  const boxes = rects.map(r => {
    const i = r.dataset.b;
    return {
      x: +r.getAttribute('x'), y: +r.getAttribute('y'), w: +r.getAttribute('width'), h: +r.getAttribute('height'),
      els: [r, ...svg.querySelectorAll(`text[data-b="${i}"]`)], dx: 0, dy: 0, vx: 0, vy: 0
    };
  });
  const near = (px, py) => {
    let best = -1, bd = 1e9;
    boxes.forEach((b, i) => {
      const ex = Math.max(b.x - px, 0, px - (b.x + b.w)), ey = Math.max(b.y - py, 0, py - (b.y + b.h));
      const d = Math.hypot(ex, ey);
      if (d < bd) { bd = d; best = i; }
    });
    return best;
  };
  const endpoints = d => {
    const pts = []; let x = 0, y = 0;
    for (const m of d.matchAll(/([MHVL])\s*(-?[\d.]+)(?:[\s,]+(-?[\d.]+))?/g)) {
      if (m[1] === 'H') x = +m[2]; else if (m[1] === 'V') y = +m[2]; else { x = +m[2]; y = +m[3]; }
      pts.push([x, y]);
    }
    return [pts[0], pts[pts.length - 1]];
  };
  const links = [...svg.querySelectorAll('g > path')].filter(p => p.hasAttribute('marker-end')).map(p => {
    const d = p.getAttribute('d'), [a, b] = endpoints(d);
    return { p, d, a: near(a[0], a[1]), b: near(b[0], b[1]) };
  });
  const clip = (b, tx, ty) => {
    const cx = b.x + b.dx + b.w / 2, cy = b.y + b.dy + b.h / 2, vx = tx - cx, vy = ty - cy;
    const t = Math.min(vx ? (b.w / 2) / Math.abs(vx) : 1e9, vy ? (b.h / 2) / Math.abs(vy) : 1e9);
    return [cx + vx * t, cy + vy * t];
  };
  const draw = () => {
    boxes.forEach(b => b.els.forEach(e => e.setAttribute('transform', `translate(${b.dx.toFixed(2)} ${b.dy.toFixed(2)})`)));
    links.forEach(l => {
      const A = boxes[l.a], B = boxes[l.b];
      if (Math.abs(A.dx) + Math.abs(A.dy) + Math.abs(B.dx) + Math.abs(B.dy) < 0.4) { l.p.setAttribute('d', l.d); return; }
      const ac = [A.x + A.dx + A.w / 2, A.y + A.dy + A.h / 2], bc = [B.x + B.dx + B.w / 2, B.y + B.dy + B.h / 2];
      const s = clip(A, bc[0], bc[1]), e = clip(B, ac[0], ac[1]);
      l.p.setAttribute('d', `M${s[0].toFixed(1)} ${s[1].toFixed(1)}L${e[0].toFixed(1)} ${e[1].toFixed(1)}`);
    });
  };
  const toSvg = ev => {
    const pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
    return pt.matrixTransform(svg.getScreenCTM().inverse());
  };
  let active = null, grab = null, raf = 0;
  const spring = () => {
    let moving = false;
    boxes.forEach(b => {
      if (b === active) return;
      b.vx = (b.vx - b.dx * 0.16) * 0.8; b.vy = (b.vy - b.dy * 0.16) * 0.8;
      b.dx += b.vx; b.dy += b.vy;
      if (Math.abs(b.dx) + Math.abs(b.dy) + Math.abs(b.vx) + Math.abs(b.vy) < 0.05) { b.dx = b.dy = b.vx = b.vy = 0; } else moving = true;
    });
    draw();
    raf = moving || active ? requestAnimationFrame(spring) : 0;
  };
  rects.forEach((r, i) => {
    boxes[i].els.forEach(el => {
      el.setAttribute('data-drag', '');
      el.addEventListener('pointerdown', ev => {
        active = boxes[i]; const p = toSvg(ev);
        grab = [p.x - active.dx, p.y - active.dy];
        active.vx = active.vy = 0;
        el.setPointerCapture(ev.pointerId);
        svg.classList.add('dragging');
        if (!raf) raf = requestAnimationFrame(spring);
        ev.preventDefault();
      });
      el.addEventListener('pointermove', ev => {
        if (active !== boxes[i]) return;
        const p = toSvg(ev), b = active;
        b.dx = Math.min(Math.max(p.x - grab[0], PAD - b.x), W - PAD - b.w - b.x);
        b.dy = Math.min(Math.max(p.y - grab[1], PAD - b.y), H - PAD - b.h - b.y);
        draw();
      });
      const release = () => {
        if (active !== boxes[i]) return;
        active = null; svg.classList.remove('dragging');
        if (!raf) raf = requestAnimationFrame(spring);
      };
      el.addEventListener('pointerup', release);
      el.addEventListener('pointercancel', release);
    });
  });
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

const LEETCODE_STATS = { totalSolved: '250+' };

function renderLeetcodeStats(stats) {
  return `
    <div class="leetcode-solved-num">${stats.totalSolved}</div>
    <div class="leetcode-solved-label">Problems Solved</div>`;
}

function renderAccomplishments() {
  const grid = document.getElementById('accomplishGrid');
  grid.innerHTML = `
    <div class="accomplish-card leetcode-card reveal">
      <div class="accomplish-head">
        <h3><span class="accomplish-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C7.802 0 4.487.472 2.784 2.784.472 4.487 0 7.802 0 12c0 4.198.472 7.513 2.784 9.216C4.487 23.528 7.802 24 12 24c4.198 0 7.513-.472 9.216-2.784C23.528 19.513 24 16.198 24 12c0-4.198-.472-7.513-2.784-9.216C19.513.472 16.198 0 12 0ZM8.61 4.771c.12 0 .243.03.351.09.394.201.55.674.365 1.062-.008.014-.85 1.663-.85 5.929v.288h7.076v-.288c0-4.29-.834-5.907-.842-5.921a.783.783 0 0 1 .343-1.05.83.83 0 0 1 1.09.34c.045.075.995 1.898.995 6.63v9.398a.81.81 0 0 1-.815.802.81.81 0 0 1-.815-.802v-4.037H8.476v4.037a.81.81 0 0 1-.815.802.81.81 0 0 1-.815-.802v-9.398c0-4.732.95-6.555.995-6.629a.81.81 0 0 1 .77-.432Z"/></svg></span>HackerRank</h3>
      </div>
      <div class="badge-chips">
        ${HACKERRANK_BADGES.map(b => `<span class="badge-chip">${b.name} <span class="stars">${'&#9733;'.repeat(b.stars)}</span></span>`).join('')}
      </div>
      <div class="leetcode-stats hr-cert-panel">
        <div class="leetcode-solved-num hr-cert-title">Certified Software Engineer</div>      </div>
      <a class="btn btn-ghost btn-sm" href="https://www.hackerrank.com/profile/tharunsridhar" target="_blank" rel="noopener">Profile</a>
    </div>
    <div class="accomplish-card leetcode-card reveal">
      <div class="accomplish-head">
        <h3><span class="accomplish-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.539.54-1.414.003-1.955-.54-.542-1.413-.542-1.955-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207.48-.593.387-1.462-.207-1.941l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0Zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382Z"/></svg></span>LeetCode</h3>
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
   Open source contributions: PRs merged into other people's repos
   ============================================================ */
const OSS_CONTRIBUTIONS = [
  {
    repo: 'django-guardian/django-guardian',
    url: 'https://github.com/django-guardian/django-guardian',
    desc: 'Per-object permissions for Django, widely used for fine-grained access control.',
    prs: [
      { title: 'Fixed AUTO_PREFETCH permission bug for direct-permission models', number: 1030, url: 'https://github.com/django-guardian/django-guardian/pull/1030' }
    ]
  },
  {
    repo: 'drkrillo/good-first-issues',
    url: 'https://github.com/drkrillo/good-first-issues',
    desc: 'A GitHub Action + CLI that surfaces good-first-issue-labeled issues across repos to help new contributors find something to work on.',
    prs: [
      { title: 'CI smoke test for the action itself', number: 172, url: 'https://github.com/drkrillo/good-first-issues/pull/172' }
    ]
  },
  {
    repo: 'Ayorinha/ayorai-vision-intelligence',
    url: 'https://github.com/Ayorinha/ayorai-vision-intelligence',
    desc: 'An AI agent security framework enforcing least-privilege MCP tool access and policy-based, tamper-evident execution tracing.',
    prs: [
      { title: 'Restored corrupted CI workflow YAML', number: 26, url: 'https://github.com/Ayorinha/ayorai-vision-intelligence/pull/26' },
      { title: 'MCP least-privilege regression tests', number: 23, url: 'https://github.com/Ayorinha/ayorai-vision-intelligence/pull/23' }
    ]
  }
];

function renderOssCard(c) {
  return `
    <div class="accomplish-card reveal">
      <div class="accomplish-head">
        <h3><span class="accomplish-icon">${ICONS.github}</span>${c.repo}</h3>
        <a class="accomplish-link" href="${c.url}" target="_blank" rel="noopener">View repo &rarr;</a>
      </div>
      <p style="color:var(--text-muted);font-size:0.9rem;margin:0 0 1.4rem;">${c.desc}</p>
      <div class="cert-mini-list">
        ${c.prs.map(p => `
          <a class="cert-mini" href="${p.url}" target="_blank" rel="noopener">
            <span class="cert-mini-name">${p.title} <span style="color:var(--text-faint);font-weight:400;">#${p.number}</span></span>
            <span class="cert-mini-status">Merged</span>
          </a>`).join('')}
      </div>
    </div>`;
}

function renderOssContributions() {
  const grid = document.getElementById('ossGrid');
  grid.innerHTML = OSS_CONTRIBUTIONS.map(renderOssCard).join('');
  window.dispatchEvent(new Event('content-injected'));
}
renderOssContributions();

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
    title: 'IBM RAG and Agentic AI Professional Certificate',
    icon: CERT_ICON,
    collapsible: true,
    issuer: 'IBM · Coursera',
    dateRange: 'Aug 2026 – Sep 2026',
    mainItem: { shortName: 'IBM RAG and Agentic AI Professional Certificate', date: 'Sep 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-rag-agentic-ai-professional-certificate.pdf' },
    items: [
      { name: 'Develop Generative AI Applications: Get Started', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-1-develop-genai-apps.pdf' },
      { name: 'Build RAG Applications: Get Started', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-2-build-rag-apps.pdf' },
      { name: 'Vector Databases for RAG: An Introduction', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-3-vector-databases-rag.pdf' },
      { name: 'Advanced RAG with Vector Databases and Retrievers', issuer: 'IBM · Coursera', date: 'Aug 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-4-advanced-rag.pdf' },
      { name: 'Build Multimodal Generative AI Applications', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-5-multimodal-genai.pdf' },
      { name: 'Fundamentals of Building AI Agents', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-6-ai-agents-fundamentals.pdf' },
      { name: 'Agentic AI with LangChain and LangGraph', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-7-langchain-langgraph.pdf' },
      { name: 'Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-8-langgraph-crewai-autogen-beeai.pdf' },
      { name: 'Build AI Agents using MCP', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-10-ai-agents-mcp.pdf' },
      { name: 'RAG and Agentic AI Capstone Project', issuer: 'IBM · Coursera', date: 'Sep 2026', link: 'assets/certificates/ibm-rag-agentic-ai/ibm-11-capstone.pdf' }
    ]
  },
  {
    title: 'AI Engineering',
    icon: CERT_ICON,
    collapsible: true,
    issuer: 'SmartBridge × Google for Developers',
    dateRange: 'Jul 2025',
    items: [
      { name: 'Artificial Intelligence (Credit Course)', issuer: 'SmartBridge × Google for Developers', date: 'Jul 2025', link: 'assets/certificates/ai-engineering/smartbridge-ai-credit-course.pdf' }
    ]
  },
  {
    title: 'Anthropic Courses',
    icon: COURSE_ICON,
    collapsible: true,
    issuer: 'Anthropic',
    items: [
      { name: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', date: '2026', status: 'completed', link: 'assets/certificates/anthropic/anthropic-ai-fluency.pdf' },
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

document.querySelectorAll('.resume-menu').forEach(menu => {
  const btn = menu.querySelector('.resume-menu-btn');
  const setOpen = open => {
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
  };
  btn.addEventListener('click', e => {
    e.stopPropagation();
    setOpen(!menu.classList.contains('open'));
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', e => { if (!menu.contains(e.target)) setOpen(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
});
