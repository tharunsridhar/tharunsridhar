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

[GitHub](https://github.com/tharunsridhar/malware-vision-ai)

---

### PhotoShare API &middot; Photo & Video Sharing Backend
`FastAPI` `Async SQLAlchemy` `JWT` `ImageKit`

- Async FastAPI backend with JWT auth via fastapi-users: register, login, email verification, forgot/reset-password
- Media streamed to a temp file then pushed to the ImageKit CDN, with UUID-keyed async SQLAlchemy models
- Ownership-based authorization returns 403 on delete attempts by non-owners
- REST API and static frontend served from a single FastAPI process, with zero CORS overhead

[GitHub](https://github.com/tharunsridhar/photoshare-api)

---

## Security Case Study Research

Outside of shipping features, I read post-mortems of real breaches to understand how systems actually fail: a React Server Components RCE, the Star Health IDOR breach, and Zero Trust vs. Adaptive Trust in multi-cloud identity.

[Full repo](https://github.com/tharunsridhar/security-research-portfolio)

---

## Skills

**AI Engineering** *(still learning)* &middot; Generative AI &middot; Prompt Engineering &middot; LangChain &middot; RAG &middot; Groq LLM API &middot; Google Gemini API &middot; OpenAI API &middot; Flask &middot; Gradio &middot; Streamlit

**Applied ML Engineering** &middot; PyTorch &middot; TensorFlow &middot; Keras &middot; Computer Vision &middot; Image Classification &middot; Image Segmentation &middot; EfficientNetV2/B3/B4 &middot; MobileNetV3 &middot; ConvNeXt Tiny &middot; Attention U-Net &middot; DenseNet/ResNet/VGG &middot; GradCAM (XAI) &middot; Ensemble Learning &middot; Transfer Learning &middot; Model Fine-Tuning &middot; Data Augmentation &middot; Class Imbalance Handling &middot; OpenCV &middot; Scikit-learn &middot; Matplotlib &middot; Pandas/NumPy &middot; Faster-Whisper

**Backend Development** &middot; Python &middot; FastAPI &middot; REST API Design &middot; SQLAlchemy (Sync + Async) &middot; Alembic Migrations &middot; JWT Auth &middot; fastapi-users &middot; bcrypt &middot; Pydantic &middot; SQLite &middot; MySQL &middot; Role-Based Access Control &middot; Async Programming &middot; Custom Middleware &middot; Pytest &middot; ImageKit CDN &middot; Web Scraping (BeautifulSoup) &middot; PyPDF &middot; PDF Generation (fpdf2) &middot; Jinja2 &middot; uv &middot; Vanilla JS/HTML/CSS &middot; Postman &middot; Git & GitHub

---

## Certifications

- AWS Certified Solutions Architect &ndash; Associate (SAA-C03) Specialization &middot; Packt (Jul 2026)
- Develop Generative AI Applications: Get Started &middot; IBM &middot; Coursera (Aug 2026)
- Artificial Intelligence (Credit Course) &middot; SmartBridge &times; Google for Developers (May&ndash;Jun 2025)

## Badges

- AI Fluency: Framework & Foundations &middot; Anthropic
- Introduction to Model Context Protocol &middot; Anthropic
- Model Context Protocol: Advanced Topics &middot; Anthropic
- Problem Solving, Java, Python, SQL (5-star) &middot; HackerRank

---

## Contact

📧 [tharunsridhar@gmail.com](mailto:tharunsridhar@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/tharun-sridhar-5a978029b)
🔗 [HackerRank](https://www.hackerrank.com/profile/tharunsridhar)
🔗 [LeetCode](https://leetcode.com/u/tharun_sridhar/)
🔗 [Hugging Face](https://huggingface.co/tharunsridhar)
