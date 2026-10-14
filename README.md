# Hi, I'm Tharun Sridhar

## `Full Stack Dev` | `AI Engineer`

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![Django](https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white)

Full Stack Developer specializing in AI engineering. I build robust Python backends and scalable JavaScript applications, from REST APIs and database integration to RAG pipelines and LLM-powered automation.

- Full stack: JavaScript / TypeScript / React / Node.js on the web side, Python (Django, FastAPI) on the backend
- REST API design, database integration, concurrency-safe backends, and role-based access control
- RAG pipelines and retrieval strategies: chunking, hybrid search, reranking, and failure diagnosis
- Agentic AI / MCP / LangGraph, from protocol-level tool-calling to human-in-the-loop workflows
- Test-driven: every flagship project below ships with a real test suite, not a demo script

---

## About Me

### `B.Tech, Computer Science`  &middot; VIT, Vellore &middot; 2022&ndash;2026

- Bengaluru, India
- I like building things that actually run: APIs, agentic pipelines, and concurrency-safe backends, not just notebooks
- Comfortable going from model training and evaluation through to deployment and wiring the result into a real backend
- Curious about secure system design: how systems fail in production, and how authorization and architecture choices prevent that

---

## Worked On

- REST APIs with FastAPI/Django, JWT auth, and relational data modeling
- Concurrency-safe backends: row-level locking, cache invalidation, idempotent writes
- Agentic AI systems: MCP servers/clients, LangGraph tool-calling agents, human-in-the-loop workflows
- Backend systems with clean structure, auditable data, and role-based access

---

## Flagship Projects

### Inventra &middot; Role-Based Inventory Management System
`Django` `DRF` `PostgreSQL` `Redis` `Celery` `JWT`

- Role-based inventory system (Admin / Manager / Employee) with JWT auth and an append-only stock ledger for a fully auditable history
- Row-level locking fixed a race condition found in Locust load tests: 40 concurrent users lost 16 units of stock before, zero after
- Redis-cached reports cut 9 queries to 1; Celery handles invoices, low-stock alerts, and nightly reconciliation; deployed on AWS

[GitHub](https://github.com/tharunsridhar/Inventra) &middot; [Live Demo](http://inventra-alb-164557112.ap-south-1.elb.amazonaws.com/app)

---

### Mr Fix My Home &middot; Local Services Booking Platform
`Node.js` `TypeScript` `Express` `PostgreSQL` `Prisma` `React`

- Local services booking platform with Customer / Provider / Admin roles and a booking state machine
- Double-booking prevented at three layers, down to a PostgreSQL exclusion constraint; race tests fire 8 simultaneous requests and exactly one succeeds
- 62 automated tests, OpenAPI docs, and CI; live on Render + Neon

[GitHub](https://github.com/tharunsridhar/mr-fix-my-home) &middot; [Live Demo](https://mr-fix-my-home.onrender.com)

---

### PhotoShare API &middot; Photo & Video Sharing Backend
`FastAPI` `Async SQLAlchemy` `JWT` `ImageKit`

- Async FastAPI backend for photo and video sharing, with JWT auth covering register, login, email verification, and password reset
- Media goes to the ImageKit CDN; only the owner of a post can delete it
- API and frontend served from a single process, so no CORS setup is needed

[GitHub](https://github.com/tharunsridhar/photoshare-api)

---

### Finvoro &middot; Personal Finance Management API
`Django` `DRF` `PostgreSQL` `JWT` `pytest`

- Django REST Framework API for multi-account tracking, categorized transactions, monthly budgets, and spending reports
- JWT auth with per-user data isolation on every endpoint; balances and budget figures computed live, never stored stale
- Versioned API with Swagger/ReDoc docs and a pytest suite

[GitHub](https://github.com/tharunsridhar/finvoro-finance)

---

### MCP Agent Toolkit &middot; Model Context Protocol Server & Agent, Built from Scratch
`MCP` `FastMCP` `Groq` `FastAPI` `Pytest`

- Real FastMCP server (Tools, Resources, Prompt) running as its own process; the agent reaches it only through an MCP client session over stdio
- UI shows live discovery results and a per-turn call trace of actual protocol traffic, not a simulation
- Swapping in any third-party MCP server needs no change to the agent loop; tests drive the real server with no API key

[GitHub](https://github.com/tharunsridhar/mcp-agent-toolkit)

---

### Task Manager Agent &middot; LangGraph Tool-Calling Agent with Human-in-the-Loop Safety
`LangGraph` `FastAPI` `SQLite` `Groq` `Pytest`

- LangGraph agent that manages tasks and pauses for human confirmation before any delete (interrupt / resume)
- Conversation state persisted in a SQLite checkpointer, so context survives a page refresh
- Tests run the real graph, tools, and interrupt flow with a scripted fake model, no API key; UI includes a raw request/response inspector

[GitHub](https://github.com/tharunsridhar/langgraph-task-manager-agent)

---

## More Projects

- **[RAG Explorer](https://github.com/tharunsridhar/doc-chat-rag-explorer)** &ndash; A RAG debugger: chunking lab, 2D embedding map, side-by-side config comparison, retrieval-vs-generation failure diagnosis, and dense / MMR / BM25 / hybrid strategies. `FastAPI` `Chroma` `sentence-transformers` `Groq`
- **[Restaurant Recommendation System](https://github.com/tharunsridhar/restaurant-recommendation-system)** &ndash; Multimodal (text + CLIP image) vector search with a multi-agent LangGraph workflow for trend, cuisine, and nutrition-aware recommendations. `FastAPI` `LangGraph` `ChromaDB` `CLIP`
- **[Retriever Showdown](https://github.com/tharunsridhar/retriever-showdown)** &ndash; The same question through five retrieval strategies (baseline, MMR, multi-query, BM25, reciprocal rank fusion) side by side. `FastAPI` `LangChain`
- **[Vector Retrieval Lab](https://github.com/tharunsridhar/vector-retrieval-lab)** &ndash; ChromaDB fundamentals: HNSW index tuning, metadata and full-text filtered search, and RAG retrieval. `FastAPI` `ChromaDB` `Groq`
- **[Agent Building Blocks](https://github.com/tharunsridhar/agent-building-blocks)** &ndash; Seven panels covering tool creation, manual tool calling, LCEL, agent memory, a SQL agent, and a data-visualization agent. `FastAPI` `LangChain` `LangGraph`
- **[Agent Framework Showdown](https://github.com/tharunsridhar/agent-framework-showdown)** &ndash; One researcher-and-writer task built in CrewAI, AutoGen, and BeeAI. `CrewAI` `AutoGen` `BeeAI`

---

## Open Source Contributions

- **[django-guardian/django-guardian](https://github.com/django-guardian/django-guardian)** &ndash; Fixed AUTO_PREFETCH permission bug for direct-permission models ([#1030](https://github.com/django-guardian/django-guardian/pull/1030))
- **[drkrillo/good-first-issues](https://github.com/drkrillo/good-first-issues)** &ndash; CI smoke test for the action itself ([#172](https://github.com/drkrillo/good-first-issues/pull/172))
- **[Ayorinha/ayorai-vision-intelligence](https://github.com/Ayorinha/ayorai-vision-intelligence)** &ndash; Restored corrupted CI workflow YAML ([#26](https://github.com/Ayorinha/ayorai-vision-intelligence/pull/26)) and MCP least-privilege regression tests ([#23](https://github.com/Ayorinha/ayorai-vision-intelligence/pull/23))

---

## Skills

**Full Stack** &middot; JavaScript / TypeScript (React, Node.js, Express) on the web side, Python (Django, FastAPI) on the backend

**Languages** &middot; Python, TypeScript, JavaScript, Java, SQL

**CS Fundamentals** &middot; Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks

**Backend** &middot; Django, Django REST Framework, FastAPI, Node.js, Express, REST API Design, JWT Auth & RBAC, SQLAlchemy, Alembic, Celery, django-filter

**Frontend** &middot; React, HTML, CSS

**AI Engineering** &middot; LLM Integration (Gemini, Groq, OpenAI), Prompt Engineering, RAG (Hybrid Search, Reranking, ChromaDB), RAGAS, Agentic Tool-Calling, MCP, LangChain, LangGraph, Multi-Agent Frameworks (CrewAI, AutoGen, BeeAI)

**Databases** &middot; PostgreSQL, MySQL, SQLite, Redis, FAISS

**DevOps & Cloud** &middot; Docker, GitHub Actions (CI/CD), AWS (EC2, ALB, VPC, IAM), Railway, Git, Linux

**Testing** &middot; pytest, pytest-django, Locust

*Also on the [live portfolio site](https://tharunsridhar.github.io/tharunsridhar/).*

---

## Certifications

- AWS Solutions Architect Associate (SAA-C03) Specialization &ndash; Packt (Jul 2026)
- IBM RAG and Agentic AI Professional Certificate &middot; IBM (Aug&ndash;Sep 2026)
- Artificial Intelligence (Credit Course) &middot; SmartBridge &times; Google for Developers (Jul 2025)
- AI Fluency: Framework & Foundations &middot; Anthropic
- Introduction to Model Context Protocol &middot; Anthropic
- Model Context Protocol: Advanced Topics &middot; Anthropic
- Claude Code in Action &middot; Anthropic
- Problem Solving, Java, Python, SQL (5-star) &middot; HackerRank

---

## Contact

🔗 [LinkedIn](https://www.linkedin.com/in/tharun-sridhar-5a978029b)
🔗 [HackerRank](https://www.hackerrank.com/profile/tharunsridhar)
🔗 [LeetCode](https://leetcode.com/u/Tharunsridhar/)
🔗 [Hugging Face](https://huggingface.co/tharunsridhar)
