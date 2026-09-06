 🏛️ BISync — National Standardization & Conformity Digital Ecosystem

> **Smart India Hackathon (SIH)** • Intelligent Indian Standards (IS) Discovery, NABL Lab Locator, HUID Hallmarking Verification & Statutory AI Regulatory Assistant (RAG Pipeline).

[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg?style=flat&logo=fastapi)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/Frontend-React_18_+_Vite-61DAFB.svg?style=flat&logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB.svg?style=flat&logo=python)](https://www.python.org)
[![Tests](https://img.shields.io/badge/Tests-Pytest_Passing-brightgreen.svg?style=flat&logo=pytest)](https://docs.pytest.org)

---

## 📖 Table of Contents
- [Executive Overview](#-executive-overview)
- [Key Features](#-key-features)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [1. Backend Setup & Run](#1-backend-setup--run)
  - [2. Frontend Setup & Run](#2-frontend-setup--run)
- [API Documentation](#-api-documentation)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Project Directory Structure](#-project-directory-structure)
- [Team & Contribution](#-team--contribution)

---

## 🌟 Executive Overview
**BISync** is a unified national standardization platform engineered to streamline how manufacturers, testing laboratories, government regulators, and consumers interact with the **Bureau of Indian Standards (BIS)** ecosystem. 

It provides:
1. **Instant IS Discovery**: Multi-filter search across 21,000+ Indian Standards with mandatory Quality Control Order (QCO) flags.
2. **AI Regulatory Assistant (RAG Pipeline)**: Statutory compliance queries with clause-level citations, Gazette references, and dynamic test parameter telemetry.
3. **NABL & BIS Lab Locator**: Geo-intelligent laboratory network index with state, pin code, and standard test scope matching.
4. **Gold Hallmarking (HUID) Verification**: Real-time 6-character alphanumeric verification against statutory assayer registers.
5. **Multilingual Access**: Multi-language support (English, Hindi, Tamil, Telugu, Marathi, Bengali).

---

## 🚀 Key Features

### 1. 🛡️ Role-Based Authentication & Session Gateway
- PBKDF2-HMAC-SHA256 password hashing with individual salt generation.
- Cryptographic JWT bearer tokens for statutory sessions.
- Pre-configured demo profiles (**Lead Auditor**, **Manufacturer**, **NABL Assayer**) + custom user registration.

### 2. 📚 Indian Standards (IS) Directory & Clause Explorer
- Full-text search by IS code, product vertical, keywords, and amendment year.
- Interactive slide-over drawer with full clause breakdowns, test requirements, and official Gazette PDF previews.

### 3. 🔬 Accredited Testing Laboratories Locator
- Search 1,840+ NABL (ISO/IEC 17025) and BIS-recognized laboratories.
- Filter by test capability, state, PIN code, sample turnaround time (TAT), and quota limits.

### 4. 🥇 Gold HUID (Hallmarking) Authenticity Validator
- Real-time 6-digit alphanumeric validation (`IS 1417:2016`).
- Displays authentic purity grade (e.g., `22K916`), article classification, jeweler license, and Assaying & Hallmarking Centre (AHC) details.
- Flags invalid / counterfeit tokens with alerts.

### 5. 🤖 Regulatory AI Reasoning Engine (RAG Pipeline)
- Contextual statutory retrieval mapping natural language questions to relevant IS codes and mandatory clauses.
- Telemetry test curves for thermal, electrical, and mechanical stress metrics.

---

## 🏗️ System Architecture

```
                                +---------------------------+
                                |  React 18 + Vite Frontend  |
                                |  (Tailwind CSS + Lucide)  |
                                +-------------+-------------+
                                              |
                                     HTTP / JSON (REST)
                                              |
                                              v
+-----------------------------------------------------------------------------------------+
|                               FastAPI Application Gateway                               |
|                                                                                         |
|  +--------------------+  +--------------------+  +------------------+  +-------------+  |
|  |   Auth Service     |  | Standards Service  |  |   Labs Service   |  | RAG Engine  |  |
|  |  (JWT & PBKDF2)    |  |  (Full-text & QCO) |  | (Geo & IS Filter)|  | (AI Reason) |  |
|  +---------+----------+  +---------+----------+  +--------+---------+  +------+------+  |
|            |                       |                      |                   |         |
|  +---------v----------+  +---------v----------+  +--------v---------+         |         |
|  |  User Repository   |  | Standard Repository|  |  Lab Repository  |         |         |
|  +--------------------+  +--------------------+  +------------------+         |         |
+-------------------------------------------------------------------------------|---------+
                                                                                |
                                                      +-------------------------v--------+
                                                      |  Vector DB / LLM Integration (RAG)|
                                                      |  (Embeddings & Clause Citation)  |
                                                      +----------------------------------+
```

---

## 💻 Tech Stack

### Frontend:
- **Framework**: React 18, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **State & Context**: Custom React Context (`LanguageContext`, `ThemeContext`)
- **API Client**: Modular REST client (`api.js`) with automatic backend connection and offline fallback

### Backend:
- **Framework**: FastAPI (Python 3.11+)
- **ASGI Server**: Uvicorn
- **Validation**: Pydantic V2 & `pydantic-settings`
- **Security**: `passlib` (PBKDF2-SHA256), `python-jose` (JWT), `email-validator`
- **Testing**: Pytest & HTTPX TestClient

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** >= 18.0.0
- **Python** >= 3.10
- **Git**

---

### 1. Backend Setup & Run

Open a terminal in the root directory:

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a Python virtual environment (if not already created)
python -m venv .venv

# On Windows:
.venv\Scripts\activate

# On macOS/Linux:
source .venv/bin/activate

# 3. Install backend dependencies
pip install -r requirements.txt

# 4. Start the FastAPI Server
python run.py
```

The backend server will start at:
- **Live API**: `http://localhost:8000`
- **Interactive Swagger Docs**: `http://localhost:8000/docs`
- **ReDoc Documentation**: `http://localhost:8000/redoc`
- **Health Check**: `http://localhost:8000/health`

---

### 2. Frontend Setup & Run

Open a **second terminal** window:

```bash
# 1. Make sure you are in the project folder
npm install

# 2. Start the Vite development server
npm run dev
```

Open your browser and navigate to **`http://localhost:5173`**.

---

## 📡 API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server health check and uptime probe |
| `POST` | `/api/v1/auth/register` | Register a new user profile |
| `POST` | `/api/v1/auth/login` | Authenticate and obtain JWT access token |
| `GET` | `/api/v1/auth/me` | Fetch authenticated user profile (`Bearer <token>`) |
| `GET` | `/api/v1/auth/personas` | Fetch pre-configured demo personas |
| `GET` | `/api/v1/standards/search` | Search standards with query, category & QCO filters |
| `GET` | `/api/v1/standards/categories` | Retrieve all product categories and standard counts |
| `GET` | `/api/v1/standards/{id}` | Get detailed specification for a standard |
| `GET` | `/api/v1/standards/{id}/clauses` | Get statutory clauses and test requirements |
| `GET` | `/api/v1/labs` | Find testing labs filtered by standard, state, and pin code |
| `GET` | `/api/v1/labs/stats/summary` | Get aggregated metrics on accredited lab network |
| `GET` | `/api/v1/services` | Get BIS Conformity Assessment modules |
| `POST` | `/api/v1/services/verify-huid` | Verify 6-character gold HUID code |
| `POST` | `/api/v1/rag/query` | Query the AI Regulatory Assistant session |
| `POST` | `/api/v1/feedback` | Submit public consultation feedback for a standard |

---

## 🧪 Testing & Quality Assurance

Run the automated integration test suite:

```bash
cd backend
pytest tests/test_api.py -v
```
to run backend:.\.venv\Scripts\python.exe backend/run.py

**Results:**
```text
tests/test_api.py::test_health_check PASSED
tests/test_api.py::test_auth_register_and_login PASSED
tests/test_api.py::test_auth_invalid_credentials PASSED
tests/test_api.py::test_get_current_user_profile PASSED
tests/test_api.py::test_standards_search PASSED
tests/test_api.py::test_standards_get_by_id PASSED
tests/test_api.py::test_labs_list_and_filter PASSED
tests/test_api.py::test_services_list PASSED
tests/test_api.py::test_huid_verification PASSED
tests/test_api.py::test_rag_query PASSED
tests/test_api.py::test_feedback_submission PASSED

======================== 11 passed in 1.20s ========================
```

---

## 📁 Project Directory Structure

```
sih-project/
├── backend/                        # FastAPI Backend Application
│   ├── app/
│   │   ├── api/v1/endpoints/       # REST API Route Handlers (auth, standards, labs, rag, etc.)
│   │   ├── core/                   # Security, JWT tokens, config & dependencies
│   │   ├── repositories/           # In-memory / Database repository layer
│   │   ├── schemas/                # Pydantic V2 Request & Response models
│   │   ├── services/               # Business logic and RAG reasoning pipelines
│   │   └── main.py                 # FastAPI Application Factory & Middleware
│   ├── tests/                      # Pytest Integration Suite
│   ├── requirements.txt            # Python Dependencies
│   └── run.py                      # Server Launch Script
├── src/                            # React Frontend Source
│   ├── components/                 # UI Components (Navbar, Footer, LoginModal, etc.)
│   ├── context/                    # LanguageContext & ThemeContext
│   ├── pages/                      # HomePage, AIAssistantPage, LabLocatorPage, etc.
│   └── services/                   # Frontend API Client & Fallback Mock Data
├── public/                         # Static Assets & Regulatory Images
├── package.json                    # Node.js Dependencies & Scripts
├── tailwind.config.js              # Tailwind Design Tokens & Utilities
└── vite.config.js                  # Vite Bundler Configuration
```

---

## 👥 Team & Contribution
Built with ❤️ for the **Smart India Hackathon (SIH)**.
Licensed under the [MIT License](LICENSE).

