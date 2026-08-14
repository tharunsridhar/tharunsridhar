# Hi, I'm Tharun Sridhar Natarajan

## `Python Backend Dev` | `Applied ML Engineer` | `AI Engineer`

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-F57C00?style=flat-square&logo=tensorflow&logoColor=white)
![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat-square&logo=langchain&logoColor=white)

Python backend developer, applied ML engineer, and AI engineer building systems end-to-end: REST API design, database integration, model training, ensemble design, and LLM-powered pipelines. Applied work in computer vision, transfer learning, GradCAM explainability, automated report generation, and Generative AI / RAG (currently expanding into LangChain and agentic patterns).

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

### NeuroScan AI &middot; Brain Tumor MRI Analysis
`PyTorch` `TensorFlow` `FastAPI` `Groq LLM` `OpenCV` `GradCAM`

- 4-model classification ensemble (EfficientNetV2-S, MobileNetV3, ConvNeXt Tiny) fused with an adaptive, lesion-aware weighting layer
- EfficientNetB4 Attention U-Net segmentation reaching a Dice score of ~0.88
- Diagnostic Reliability Index cross-validates Grad-CAM attention against the segmentation mask, gating predictions into Accepted / Caution / Specialist-Review tiers
- Groq LLM radiology report generation and PDF export via FastAPI, backed by 4 pytest suites

[GitHub](https://github.com/tharunsridhar/NeuroScan-AI) &middot; [Model on Hugging Face](https://huggingface.co/tharunsridhar/brain_tumor_net-ensemble)

---

### Inventra &middot; Role-Based Inventory Management System
`FastAPI` `SQLAlchemy 2.0` `Alembic` `JWT` `SQLite`

- Admin / Manager / Employee access control with JWT access and revocable, database-stored refresh tokens
- Full REST surface: 51 endpoints across 13 routers (auth, products, purchases, sales, returns, damage, reports, notifications)
- Every stock-affecting action writes exactly one immutable inventory transaction row, with no update or delete path
- Atomic, idempotent purchase-receiving and sales-completion flows, safe to retry without side effects

[GitHub](https://github.com/tharunsridhar/Inventra)

---

### Malware Vision AI &middot; Multi-Class Malware Family Classification
`TensorFlow` `EfficientNetV2` `Transfer Learning` `NumPy`

- Converted 13,747 PE executable samples into grayscale image tensors, with no malware execution required
- Fine-tuned EfficientNetV2-S across 31 malware families with class-balanced training
- ~95% test accuracy, macro F1 of 0.96, weighted F1 of 0.95
- Validated with confusion matrices and per-class precision/recall, not just aggregate accuracy

[GitHub](https://github.com/tharunsridhar/malware-vision-ai) &middot; [Model on Hugging Face](https://huggingface.co/tharunsridhar/malware-detector)

---

### PhotoShare API &middot; Photo & Video Sharing Backend
`FastAPI` `Async SQLAlchemy` `JWT` `ImageKit`

- Async FastAPI backend with JWT auth via fastapi-users: register, login, email verification, forgot/reset-password
- Media streamed to a temp file then pushed to the ImageKit CDN, with UUID-keyed async SQLAlchemy models
- Ownership-based authorization returns 403 on delete attempts by non-owners
- REST API and static frontend served from a single FastAPI process, with zero CORS overhead

[GitHub](https://github.com/tharunsridhar/photoshare-api)

---

## Skills

**AI Engineering** *(still learning)* &middot; Generative AI, Prompt Engineering, LangChain, RAG, LLM APIs (Groq / Gemini / OpenAI), Gradio, Streamlit

**Applied ML Engineering** &middot; PyTorch, TensorFlow, Computer Vision (classification & segmentation), Transfer Learning & Fine-Tuning, Model Ensembling, GradCAM (XAI), OpenCV, Scikit-learn

**Backend Development** &middot; Python, FastAPI, REST API Design, SQLAlchemy & Alembic, JWT Auth & RBAC, Async Programming, Pytest, Git & GitHub

*Full breakdown with the complete tag list is on the [live portfolio site](https://tharunsridhar.github.io/tharunsridhar/).*

---

## Certifications

- AWS Certified Solutions Architect &ndash; Associate (SAA-C03) Specialization &middot; Packt (Jul 2026)
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
🔗 [LeetCode](https://leetcode.com/u/tharun_sridhar/)
🔗 [Hugging Face](https://huggingface.co/tharunsridhar)
