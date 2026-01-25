
# DFIR-AI - AI-Assisted Digital Forensics Automation Platform**


## Overview

**DFIR-AI** is a research-grade, production-ready digital forensics platform that automates forensic evidence ingestion, normalization, triage, intelligence enrichment, and forensic report generation.

Originally designed as a CLI-based DFIR engine, DFIR-AI has been refactored into a **secure, multi-tenant SaaS backend** while preserving the integrity and reproducibility of the core forensic pipeline.

The system emphasizes:

* Forensic defensibility
* Deterministic + semantic hybrid analysis
* Organizational isolation
* Scalable job execution
* Downloadable forensic intelligence reports

---

## Key Capabilities

### Core DFIR Engine

* Automated ingestion of raw forensic artifacts (logs, text, JSON)
* Multi-channel detection (web, auth, network, system, process, file)
* Indicator normalization and enrichment
* Rule-based + semantic hybrid triage
* Persistent triage audit trail
* LLM-assisted forensic narrative generation (optional)

### SaaS Backend

* Multi-tenant organization model
* Secure authentication & authorization (JWT)
* Case management
* File upload and ingestion wiring
* Asynchronous DFIR job execution
* Job progress, stages, ETA tracking
* Persistent report storage
* Secure report download endpoints

---

## System Architecture (High Level)

```
Frontend (TBD)
   |
   v
FastAPI Backend (SaaS Layer)
   ├── Auth & Organizations
   ├── Cases
   ├── Uploads
   ├── Jobs (async execution)
   ├── Reports (download)
   |
   v
DFIR Core Engine (Preserved)
   ├── Ingestion
   ├── Normalization
   ├── Triage
   ├── Semantic Reasoning
   ├── Report Generation
```

> The **DFIR core engine is intentionally isolated** from the SaaS layer to preserve forensic reproducibility and research defensibility.

---

## Technology Stack

### Backend

* Python 3.9+
* FastAPI
* SQLAlchemy
* MySQL / MariaDB
* JWT authentication
* Background task execution

### DFIR Core

* Custom ingestion detectors
* Sentence Transformers
* OpenAI Responses API (optional)
* Deterministic triage rules
* Semantic scoring engine
* PDF & TXT report generation

---

## Repository Structure

```
DFIR_AI/
├── backend/                 # SaaS backend (FastAPI)
│   ├── api/                 # API routes
│   ├── db/                  # DB sessions
│   ├── execution/           # Job runners & adapters
│   ├── models/              # SQLAlchemy models
│   ├── schemas/             # Pydantic schemas
│   └── main.py              # FastAPI entrypoint
│
├── dfir_core/               # Preserved DFIR engine
│   ├── ingestion/
│   ├── triage/
│   ├── triage_semantic/
│   ├── narrative/
│   ├── reporting/
│   └── scripts/run_all.py
│
├── reports/                 # Generated reports (per case)
├── uploads/                 # Uploaded forensic files
├── requirements.txt
├── .env
└── README.md
```

---

## Database

### Core Tables (simplified)

* `users`
* `organizations`
* `cases`
* `case_uploads`
* `forensic_artifacts`
* `triage_results`
* `jobs`
* `reports`

All tables:

* Use **plural naming**
* Use **singular attributes**
* Enforce organization isolation

---

## Environment Configuration

Create a `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=dfir_ai

DATABASE_URL=mysql+pymysql://root:@localhost:3306/dfir_ai

OPENAI_API_KEY=optional
```

---

## Running the Backend

### Install Dependencies

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Start FastAPI

```bash
uvicorn backend.main:app --reload
```

Swagger UI:

```
http://127.0.0.1:8000/docs
```

---

## API Workflow (End-to-End)

1. **Register / Login**
2. **Create Organization**
3. **Create Case**
4. **Upload Forensic Files**
5. **Create DFIR Job**
6. **Track Job Progress**
7. **Download Generated Reports**

---

## Report Downloads

Secure report download endpoint:

```
GET /reports/{report_id}/download
```

Features:

* Organization-scoped access
* Case ownership enforcement
* Safe filesystem handling
* Future-ready for signed URLs (S3 / MinIO)

---

## Forensic Integrity Principles

* Evidence ingestion is deterministic
* Semantic reasoning does not alter evidence
* LLMs are used **only for narrative synthesis**
* All triage scores are auditable
* Reports are reproducible from stored artifacts

---

## Academic & Research Use

DFIR-AI can be used as:

* A research platform
* A preprint / white-paper artifact
* A reproducible DFIR experimentation framework

LLMs do **not** influence evidence prioritization decisions.

---

## License & Disclosure

This project is provided for:

* Research
* Defensive security
* Forensic analysis

It is **not** intended for offensive use.

---

## Project Status

* ✅ Backend stable
* ✅ Jobs & reports working
* ✅ Downloads secured
* 🔄 Frontend in progress
* 🔒 Core DFIR engine preserved

---

