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

### `B.Tech, Computer Science` (Information Security Specialization) &middot; VIT, Vellore &middot; 2022&ndash;2026

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

- Admin / Manager / Employee RBAC with JWT access and DB-blacklisted refresh tokens; append-only stock ledger enforced twice (no write route registered, and Django Admin permissions hard-disabled)
- Load-tested the row-level locking guarantee: unlocked concurrent sales silently lost 16 of 78 units sold with zero HTTP errors; `select_for_update()` closes the race to 0 lost updates
- Redis-cached reports and dashboards (up to 9 queries collapsed to 1 on a cache hit) plus Celery background jobs for async invoices, low-stock alerts, and nightly ledger reconciliation
- Structured JSON logging traces one request id from the web process into any Celery task it dispatches; deployed on AWS behind an Application Load Balancer

[GitHub](https://github.com/tharunsridhar/Inventra) &middot; [Live Demo](http://inventra-alb-164557112.ap-south-1.elb.amazonaws.com/app)

---

### PhotoShare API &middot; Photo & Video Sharing Backend
`FastAPI` `Async SQLAlchemy` `JWT` `ImageKit`

- Async FastAPI backend with JWT auth via fastapi-users: register, login, email verification, forgot/reset-password
- Media streamed to a temp file then pushed to the ImageKit CDN, with UUID-keyed async SQLAlchemy models
- Ownership-based authorization returns 403 on delete attempts by non-owners
- REST API and static frontend served from a single FastAPI process, with zero CORS overhead

[GitHub](https://github.com/tharunsridhar/photoshare-api)

---

### NeuroScan AI &middot; Brain Tumor MRI Analysis
`PyTorch` `TensorFlow` `FastAPI` `Groq LLM` `OpenCV` `GradCAM`

- 4-model classification ensemble (EfficientNetV2-S, MobileNetV3, ConvNeXt Tiny) fused with an adaptive, lesion-aware weighting layer
- EfficientNetB4 Attention U-Net segmentation reaching a Dice score of ~0.88
- Diagnostic Reliability Index cross-validates Grad-CAM attention against the segmentation mask, gating predictions into Accepted / Caution / Specialist-Review tiers
- Groq LLM radiology report generation and PDF export via FastAPI, backed by 4 pytest suites

[GitHub](https://github.com/tharunsridhar/NeuroScan-AI) &middot; [Model on Hugging Face](https://huggingface.co/tharunsridhar/brain_tumor_net-ensemble)

---

## Skills

**Backend Development** &middot; Python, FastAPI, REST API Design, SQLAlchemy & Alembic, JWT Auth & RBAC, Async Programming, Pytest, Git & GitHub

**AI Engineering** *(still learning)* &middot; Generative AI, Prompt Engineering, LangChain, RAG, LLM APIs (Groq / Gemini / OpenAI), Gradio, Streamlit, PyTorch, TensorFlow, GradCAM (XAI), OpenCV, Scikit-learn

*Full breakdown with the complete tag list is on the [live portfolio site](https://tharunsridhar.github.io/tharunsridhar/).*

---

## Certifications

- AWS Solutions Architect Associate (SAA-C03) &ndash; Exam Prep Course &middot; Packt (Coursera) (Jul 2026)
- Develop Generative AI Applications: Get Started &middot; IBM &middot; Coursera (Aug 2026)
- Artificial Intelligence (Credit Course) &middot; SmartBridge &times; Google for Developers (May&ndash;Jun 2025)

## Badges

- AI Fluency: Framework & Foundations &middot; Anthropic
- Introduction to Model Context Protocol &middot; Anthropic
- Model Context Protocol: Advanced Topics &middot; Anthropic
- Claude Code in Action &middot; Anthropic
- Problem Solving, Java, Python, SQL (5-star) &middot; HackerRank

---

## Contact

📧 [tharunsridhar@gmail.com](mailto:tharunsridhar@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/tharun-sridhar-5a978029b)
🔗 [HackerRank](https://www.hackerrank.com/profile/tharunsridhar)
🔗 [LeetCode](https://leetcode.com/u/Tharunsridhar/)
🔗 [Hugging Face](https://huggingface.co/tharunsridhar)
