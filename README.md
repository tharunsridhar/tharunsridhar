# Hi, I'm Tharun Sridhar Natarajan

## `Python Backend Dev` | `AI Engineer`

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-F57C00?style=flat-square&logo=tensorflow&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white)

Python backend developer and AI engineer building systems end-to-end.

- REST API design, database integration, model training, ensemble design, and LLM-powered pipelines
- Applied work in computer vision, transfer learning, GradCAM explainability, and automated report generation
- Generative AI / RAG, currently expanding into LangChain and agentic patterns

---

## About Me

### `B.Tech, Computer Science`  &middot; VIT, Vellore &middot; 2022&ndash;2026

- Bengaluru, India
- I like building things that actually run: APIs, pipelines, and full machine learning systems, not just notebooks
- Comfortable going from model training and evaluation through to deployment and wiring the result into a real backend
- Curious about secure system design: how systems fail in production, and how authorization and architecture choices prevent that

---

## Worked On

- REST APIs with FastAPI, JWT auth, and relational data modeling
- Deep learning systems: training, ensembling, segmentation, and serving models
- LLM integrations and automation pipelines (Groq, Gemini, OpenAI, and now LangChain/RAG)
- Backend systems with clean structure, auditable data, and role-based access

---

## Flagship Projects

### Inventra &middot; Role-Based Inventory Management System
`Django` `DRF` `PostgreSQL` `Redis` `Celery` `JWT`

- Load tested with Locust: without row-level locking, 40 concurrent users silently lost 16 units of stock with zero HTTP errors; `select_for_update()` closes the race to zero discrepancy
- Admin / Manager / Employee RBAC with JWT access and DB-blacklisted refresh tokens, rate limited per scope; append-only stock ledger enforced twice (no write route registered, and Django Admin permissions hard-disabled)
- Redis-cached reports with version-counter invalidation, cache hits collapse 9 queries down to 1 (proven via query-count assertions, not just timing)
- Celery background jobs and Beat schedule for async invoices, low-stock alerts, and nightly ledger reconciliation; deployed on AWS behind an Application Load Balancer

[GitHub](https://github.com/tharunsridhar/Inventra) &middot; [Live Demo](http://inventra-alb-164557112.ap-south-1.elb.amazonaws.com/app)

---

### Corrective RAG &middot; Self-Evaluating Local RAG Pipeline, Benchmarked with RAGAS
`FastAPI` `Ollama` `ChromaDB` `RAGAS` `DuckDuckGo`

- Grades its own retrieval relevance, rewrites the query and re-retrieves on weak results, then falls back to live DuckDuckGo web search when local evidence still isn't enough
- Claim-level verification stage extracts atomic claims from the generated answer and checks each against a deduplicated, citation-tagged evidence set, correcting and re-verifying anything unsupported
- Runs fully local by default on Ollama (Llama 3.2 3B) with Chroma + sentence-transformers, with Groq/OpenRouter as opt-in cloud fallbacks
- RAGAS-based evaluation harness benchmarks the corrective pipeline against a plain baseline RAG system on faithfulness, context precision/recall, and answer relevancy

[GitHub](https://github.com/tharunsridhar/Corrective-RAG)

---

### PhotoShare API &middot; Photo & Video Sharing Backend
`FastAPI` `Async SQLAlchemy` `JWT` `ImageKit`

- Async FastAPI backend with JWT auth via fastapi-users: register, login, email verification, forgot/reset-password
- Media streamed to a temp file then pushed to the ImageKit CDN, with UUID-keyed async SQLAlchemy models
- Ownership-based authorization returns 403 on delete attempts by non-owners
- REST API and static frontend served from a single FastAPI process, with zero CORS overhead

[GitHub](https://github.com/tharunsridhar/photoshare-api)

---

### Finvoro &middot; Personal Finance Management API
`Django` `DRF` `PostgreSQL` `JWT` `pytest`

- Django REST Framework backend for multi-account tracking, categorized transactions, monthly budgets, and spending reports
- JWT auth (djangorestframework-simplejwt) with per-user data ownership enforced end-to-end on every endpoint
- Versioned API under `/api/v1/`, live-computed account balances and budget spent/remaining figures, no stale duplicated values
- pytest + pytest-django coverage suite; interactive Swagger/ReDoc docs via drf-spectacular

[GitHub](https://github.com/tharunsridhar/finvoro-finance)

---

### MCP Agent Toolkit &middot; Model Context Protocol Server & Agent, Built from Scratch
`MCP` `FastMCP` `Groq` `FastAPI` `Pytest`

- Real FastMCP server exposing Tools, Resources, and a Prompt as its own separate process; the agent reaches every one of them only through an MCP ClientSession over stdio, never by importing a Python function directly
- Live "what the client discovered" panel and a per-turn call trace show the actual `list_tools` / `list_resources` / `list_prompts` results and `call_tool` arguments, not simulated for the UI
- Swapping in a real third-party MCP server (filesystem, GitHub, Slack) only means changing the `StdioServerParameters`, and nothing about the agent loop changes, proving the protocol boundary actually holds
- Test suite spins up the real MCP server subprocess and drives it through the full protocol (discovery, tool calls, resource reads, prompt templates) with no API key or network needed

[GitHub](https://github.com/tharunsridhar/mcp-agent-toolkit)

---

### Framework Showdown &middot; The Same Two-Agent Workflow, Built on Three Different Frameworks
`CrewAI` `AutoGen` `BeeAI` `FastAPI` `Pytest`

- The same researcher-writer two-agent workflow implemented three separate times: CrewAI (sequential Process with task context-passing), AutoGen (`RoundRobinGroupChat` until a TERMINATE signal), and BeeAI (a single ReAct agent deciding for itself whether to call a tool)
- CrewAI and BeeAI pin incompatible pydantic versions and won't share a virtualenv, so the FastAPI app runs AutoGen in-process and shells out to two separate Python 3.11 venvs as subprocesses for the other two, each returning one line of JSON on stdout
- Tests validate request handling, venv wiring, and that a missing interpreter fails with a clear 500 error message instead of a silent crash, with no Groq calls needed to run them

[GitHub](https://github.com/tharunsridhar/agent-framework-showdown)

---

### Task Manager Agent &middot; LangGraph Tool-Calling Agent with Human-in-the-Loop Safety
`LangGraph` `FastAPI` `SQLite` `Groq` `Pytest`

- LangGraph agent adds, lists, updates, completes, and deletes tasks, and pauses mid-run for human confirmation before any delete via `interrupt()` / `Command(resume=...)`
- Conversation state persisted across requests with a SQLite checkpointer, so context survives a page refresh, not just an in-memory session
- Test suite swaps in a scripted FakeModel to exercise the real graph, real tools, and real interrupt/resume flow with no API key or network call
- FastAPI backend with a raw request/response inspector in the UI, showing exactly what the agent sent and received on each turn

[GitHub](https://github.com/tharunsridhar/langgraph-task-manager-agent)

---

### NeuroScan AI &middot; Brain Tumor MRI Analysis
`PyTorch` `TensorFlow` `FastAPI` `Groq LLM` `OpenCV` `GradCAM`

- 4-model classification ensemble (EfficientNetV2-S, MobileNetV3, ConvNeXt Tiny) fused with an adaptive, lesion-aware weighting layer
- EfficientNetB4 Attention U-Net segmentation reaching a Dice score of ~0.88
- Diagnostic Reliability Index cross-validates Grad-CAM attention against the segmentation mask, gating predictions into Accepted / Caution / Specialist-Review tiers
- Groq LLM radiology report generation and PDF export via FastAPI, backed by 4 pytest suites

[GitHub](https://github.com/tharunsridhar/NeuroScan-AI) &middot; [Model on Hugging Face](https://huggingface.co/tharunsridhar/brain_tumor_net-ensemble)

---

## Open Source Contributions

- **[drkrillo/good-first-issues](https://github.com/drkrillo/good-first-issues)** &ndash; Render labels as readable text instead of a Python list repr ([#167](https://github.com/drkrillo/good-first-issues/pull/167)); case-insensitive good-first-issue label drop ([#170](https://github.com/drkrillo/good-first-issues/pull/170))
- **[Ayorinha/ayorai-vision-intelligence](https://github.com/Ayorinha/ayorai-vision-intelligence)** &ndash; Add MCP least-privilege regression tests ([#23](https://github.com/Ayorinha/ayorai-vision-intelligence/pull/23)); add execution tracing example ([#24](https://github.com/Ayorinha/ayorai-vision-intelligence/pull/24))
- **[yunaremaia/gfi](https://github.com/yunaremaia/gfi)** &ndash; Add LICENSE, Dockerfile, and raise test coverage 81%&rarr;93% ([#52](https://github.com/yunaremaia/gfi/pull/52))

---

## Skills

**Backend Development** &middot; Python, FastAPI, REST API Design, SQLAlchemy & Alembic, JWT Auth & RBAC, Async Programming, Pytest, Git & GitHub

**RAG & Agentic AI** &middot; Generative AI, Prompt Engineering, Tool Calling, RAG, Advanced RAG, Embeddings, Vector Databases (ChromaDB), LangChain, LangGraph, AI Agents, MCP, RAGAS, PyTorch, TensorFlow, GradCAM (XAI), OpenCV, Scikit-learn

*Full breakdown with the complete tag list is on the [live portfolio site](https://tharunsridhar.github.io/tharunsridhar/).*

---

## Certifications

- AWS Solutions Architect Associate (SAA-C03) &ndash; Packt (Jul 2026)
- IBM RAG and Agentic AI Professional Certificate &middot; IBM (Aug&ndash;Sep 2026)
- Artificial Intelligence (Credit Course) &middot; SmartBridge &times; Google for Developers (May&ndash;Jun 2025)
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
