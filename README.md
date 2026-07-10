<div align="center">

# 🏛️ CivicPulse AI

### The Autonomous Municipal Triage Engine

<br/>

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python_3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Fireworks AI](https://img.shields.io/badge/Fireworks_AI-FF6B35?style=for-the-badge&logo=fire&logoColor=white)](https://fireworks.ai/)
[![AMD](https://img.shields.io/badge/AMD_MI300X-ED1C24?style=for-the-badge&logo=amd&logoColor=white)](https://www.amd.com/)

<br/>

> **Built for the AMD AI Developer Hackathon** — Transforming citizen frustration into government action with a single photo.

<br/>

[🚀 Live Demo](https://civicpulse-ai.vercel.app) · [📖 API Docs](https://your-backend.railway.app/docs) · [🐛 Report Bug](https://github.com/Talha03creator/civicpulse-ai/issues) · [💡 Feature Request](https://github.com/Talha03creator/civicpulse-ai/issues)

</div>

---

## 📌 The Problem

Every day, municipal governments receive thousands of unstructured infrastructure complaints — potholes, broken streetlights, burst pipes, illegal dumps — via email, phone hotlines, and web forms. The existing workflow is **manual, slow, and expensive**:

| Pain Point | Impact |
|---|---|
| Citizens fill out multi-step forms | 70%+ drop-off rate |
| Staff manually read & categorize tickets | 4–8 hours average triage time |
| Wrong-department routing | Wastes 30% of response budget |
| No severity prioritization | Critical issues missed until they become disasters |

## ✅ The Solution

**CivicPulse AI** turns a single citizen photo into a fully-triaged, AI-dispatched government work order in under **3 seconds**.

Citizens upload one image → Gemma 4 Multimodal Vision analyzes structural damage → an agentic reasoning chain classifies category, severity, and department → the ticket auto-routes to the right team with an SLA deadline attached.

```
No forms. No phone calls. No human triage bottleneck.
```

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CITIZEN LAYER                               │
│   Browser (Next.js 16, App Router, Vercel Edge)                     │
│   • /report  → Photo Upload + Real-time CoT animation               │
│   • /admin   → Live Ticket Dashboard + Severity Heatmap             │
│   • /         → Marketing + CTA                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │  HTTPS / JSON
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE PROXY                                 │
│   app/api/proxy/[...route]/route.ts                                 │
│   • Strips CORS headers, relays to FastAPI                          │
│   • Eliminates browser cross-origin preflight                       │
└────────────────────────────┬────────────────────────────────────────┘
                             │  Internal HTTP
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    FASTAPI AGENTIC ENGINE                            │
│   Python 3.11 · Uvicorn · Pydantic v2                               │
│                                                                     │
│   POST /api/triage ──► gemma_agent.analyze_civic_issue()            │
│        │                    │                                        │
│        │                    ▼                                        │
│        │         ┌─────────────────────┐                            │
│        │         │  Fireworks AI API   │                            │
│        │         │  Gemma-4 Multimodal │  ◄── AMD MI300X GPU Cloud  │
│        │         │  Vision + Reasoning │                            │
│        │         └─────────────────────┘                            │
│        │                    │                                        │
│        ▼                    ▼                                        │
│   In-Memory Ticket DB ◄── Structured JSON Response                  │
│   GET /api/tickets                                                  │
└─────────────────────────────────────────────────────────────────────┘
```

**Data Flow:**
1. 📸 Citizen uploads image → Frontend converts to Base64
2. 🔀 Next.js proxy forwards POST to FastAPI (zero CORS friction)
3. 🤖 FastAPI sends image + prompt to **Gemma-4 Multimodal** on AMD MI300X via Fireworks AI
4. 🧠 Gemma reasons over the image: identifies damage type, estimates severity 1–10, selects responsible department, calculates SLA
5. 📋 Structured triage JSON returned, stored in-memory, rendered on Admin Dashboard
6. ✅ Ticket auto-dispatched with full AI reasoning trace

---

## ✨ Key Features

- **📷 Vision-First Reporting** — Upload any photo; no form fields required
- **🧠 Agentic Chain-of-Thought** — Live CoT animation shows the AI's reasoning steps in real-time
- **⚡ 3-Second Triage** — From raw image to dispatched work order
- **🎯 Severity Scoring** — 1–10 numerical score + urgency class (Critical / High / Medium / Low)
- **🏢 Dept Auto-Routing** — Public Works, Utilities, Sanitation, Traffic Engineering, Parks & Rec
- **📊 Admin Command Center** — Live ticket feed with SLA countdown & severity heatmap
- **🌐 Vercel + Railway Ready** — Zero-config split deployment
- **🛡️ CORS-Safe Proxy** — All backend calls routed through Next.js edge; API keys never touch the browser

---

## 🚀 Local Development Setup

### Prerequisites

| Tool | Version | Install |
|---|---|---|
| Node.js | ≥ 18 | [nodejs.org](https://nodejs.org) |
| Python | ≥ 3.11 | [python.org](https://python.org) |
| Git | Latest | [git-scm.com](https://git-scm.com) |

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/Talha03creator/civicpulse-ai.git
cd civicpulse-ai
```

---

### Step 2 — Start the FastAPI Backend

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create your local environment file
cp .env.example .env
# → Open .env and paste your Fireworks AI API key

# Start the development server (hot-reload enabled)
uvicorn main:app --reload --port 8000
```

✅ Backend is live at: **http://localhost:8000**
📖 Interactive API docs at: **http://localhost:8000/docs**

---

### Step 3 — Start the Next.js Frontend

```bash
# Open a new terminal and navigate to the frontend
cd civicpulse-ai

# Install Node dependencies (already done if node_modules exists)
npm install

# Create your local environment file
cp .env.example .env.local
# → Confirm NEXT_PUBLIC_API_URL=http://localhost:8000

# Start the development server
npm run dev
```

✅ Frontend is live at: **http://localhost:3000**

---

### Step 4 — Test the Full Pipeline

1. Navigate to **http://localhost:3000/report**
2. Upload any infrastructure photo (pothole, burst pipe, broken light, etc.)
3. Watch the **Chain-of-Thought** animation as Gemma 4 analyzes it live
4. See the fully triaged ticket with category, severity score, department, and AI reasoning
5. Navigate to **http://localhost:3000/admin** to see the live ticket queue

---

## 🔑 Environment Variables

### Frontend (`civicpulse-ai/.env.local`)

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ | Base URL of the FastAPI backend. `http://localhost:8000` for local dev. |
| `NEXT_PUBLIC_SITE_URL` | ✅ | Canonical site URL. `http://localhost:3000` for local dev. |
| `CONTACT_EMAIL_TO` | ⬜ | Destination email for contact-form submissions. |

### Backend (`backend/.env`)

| Variable | Required | Description |
|---|---|---|
| `FIREWORKS_API_KEY` | ✅ | Your Fireworks AI API key. Get one at [fireworks.ai](https://fireworks.ai) |
| `MODEL_NAME` | ⬜ | Defaults to `accounts/fireworks/models/gemma-4-e4b-multimodal` |

> ⚠️ **Never** commit `.env.local` or `.env` to Git. Both are already in `.gitignore`.

---

## ☁️ Production Deployment

### Frontend → Vercel (1-click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Talha03creator/civicpulse-ai&root-directory=civicpulse-ai)

After deploying, add environment variables in **Vercel Dashboard → Settings → Environment Variables**:
- `NEXT_PUBLIC_API_URL` = `https://your-backend.railway.app`
- `NEXT_PUBLIC_SITE_URL` = `https://civicpulse-ai.vercel.app`

### Backend → Railway / Render / Fly.io

```bash
# Railway CLI
railway init
railway up --service backend

# Set environment variables on Railway dashboard:
# FIREWORKS_API_KEY=fw_xxxxxxxxxxxxxxxxxxxx
```

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 16 (App Router) | React server components, streaming, SEO |
| **Styling** | Tailwind CSS + Framer Motion | Glassmorphism UI + micro-animations |
| **Type Safety** | TypeScript 5 | End-to-end type inference |
| **Forms** | React Hook Form + Zod | Schema-validated form handling |
| **Backend** | FastAPI + Uvicorn | High-performance async Python API |
| **AI Model** | Gemma-4 Multimodal (Gemma-4-E4B) | Vision + language reasoning |
| **AI Cloud** | Fireworks AI | AMD MI300X GPU inference at scale |
| **Validation** | Pydantic v2 | Request/response schema enforcement |
| **Deployment** | Vercel + Railway | Edge-optimized split architecture |

---

## 📁 Project Structure

```
civicpulse-ai/                   ← Monorepo root
├── backend/                     ← FastAPI Python service
│   ├── main.py                  ← App entry, CORS, route definitions
│   ├── schemas.py               ← Pydantic request/response models
│   ├── config.py                ← Environment variable loader
│   ├── requirements.txt         ← Python dependencies
│   └── services/
│       └── gemma_agent.py       ← Core AI orchestration logic
│
└── civicpulse-ai/               ← Next.js frontend
    ├── app/
    │   ├── (marketing)/         ← Public-facing pages
    │   │   ├── page.tsx         ← Landing page
    │   │   ├── report/          ← Citizen issue reporting
    │   │   ├── admin/           ← Admin triage dashboard
    │   │   ├── about/
    │   │   └── contact/
    │   ├── api/
    │   │   ├── proxy/[...route] ← ✨ Universal CORS-safe backend proxy
    │   │   └── contact/         ← Next.js email handler
    │   ├── layout.tsx
    │   └── globals.css
    ├── components/
    │   └── ui/                  ← GlassCard, Button, NavBar, etc.
    ├── lib/
    │   └── validations.ts       ← Shared Zod schemas
    ├── next.config.ts           ← Vercel-optimized config
    ├── tsconfig.json
    └── .env.example
```

---

## 🧪 API Reference

### `POST /api/triage`
Submit a civic infrastructure issue for AI triage.

**Request Body:**
```json
{
  "image_base64": "data:image/jpeg;base64,/9j/4AAQ...",
  "description": "Large pothole on Main Street near bus stop"
}
```

**Response:**
```json
{
  "issue_category": "Road Infrastructure",
  "urgency_level": "High",
  "severity_score": 7,
  "assigned_department": "Department of Public Works",
  "estimated_sla_hours": 24,
  "ai_reasoning": "The image reveals a large pothole approximately 40cm in diameter with exposed subsurface aggregate, indicating advanced pavement failure. Proximity to a bus stop presents imminent vehicle damage and pedestrian hazard risk. Recommending Priority 2 repair dispatch within 24 hours."
}
```

### `GET /api/tickets`
Returns all submitted tickets, sorted newest-first.

### `GET /api/health`
Health check endpoint. Returns AI engine status and compute backend info.

---

## 🗺️ Roadmap

- [x] Phase 1: Multimodal Vision Triage Engine
- [x] Phase 2: Admin Command Center Dashboard
- [x] Phase 3: Vercel + Railway Production Deployment
- [ ] Phase 4: Real-time WebSocket ticket updates
- [ ] Phase 5: GIS map integration (Leaflet / Mapbox)
- [ ] Phase 6: Multi-city government portal with RBAC
- [ ] Phase 7: Native mobile app (React Native / Expo)

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Please check the [issues page](https://github.com/Talha03creator/civicpulse-ai/issues) before opening a new one.

```bash
# Fork → Clone → Create feature branch
git checkout -b feature/your-amazing-feature

# Commit with a clear message
git commit -m "feat: add real-time WebSocket ticket streaming"

# Push and open a Pull Request
git push origin feature/your-amazing-feature
```

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 🙏 Acknowledgements

<div align="center">

| | |
|---|---|
| **🔥 Fireworks AI** | For AMD MI300X-powered Gemma-4 inference at hackathon speed |
| **🔴 AMD** | For the MI300X GPU cloud infrastructure powering this project |
| **🤖 Google DeepMind** | For open-sourcing the Gemma-4 multimodal foundation model |
| **▲ Vercel** | For seamless edge deployment and developer experience |

<br/>

---

**Built with 🔥 by [Talha](https://github.com/Talha03creator)**

**Powered by [Growthstack.dev](https://growthstack.dev)** — *AI Infrastructure for the Real World.*

<br/>

*"From citizen frustration to government action in 3 seconds."*

</div>
