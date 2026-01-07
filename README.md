
# DFIR-AI: AI-Assisted Digital Forensics Automation

## Overview
DFIR-AI is an end-to-end, research-grade digital forensics and incident response (DFIR) platform that automates evidence ingestion, normalization, triage, semantic prioritization, **case intelligence generation**, and forensic narrative production.

The system is designed with **forensic defensibility, explainability, reproducibility, and auditability** as first-class principles.  
Artificial Intelligence is used only where it is methodologically appropriate and never replaces deterministic forensic reasoning.

---

## Core Design Principles
- Deterministic evidence handling
- Explainable triage decisions
- Clear separation between evidence, intelligence, and narrative
- AI-assisted narrative generation only (non-decisional)
- Academic and legal defensibility

---

## Key Capabilities

### Evidence & Triage
- Automated ingestion of forensic artifacts
- Unified relational evidence schema (MySQL)
- Rule-based and semantic hybrid triage
- Persistent triage audit trail
- CLI-driven execution with progress bars and timing

### Intelligence Generation
- Attack channel classification (web, authentication, network, endpoint, cloud)
- Behavioral fingerprinting (velocity, timing, automation likelihood)
- Cross-case campaign correlation
- Infrastructure reuse detection
- Explainable intelligence outputs (JSON-serializable)

### Reporting & Narrative
- TXT reports for canonical archival evidence
- Intelligence-aware PDF forensic reports
- MITRE ATT&CK contextual mapping
- Executive and analyst-ready narratives
- LLM-assisted narrative generation (OpenAI Responses API)

---

## Technology Stack
- Python 3.9+
- MySQL (XAMPP / LAMPP)
- Autopsy CSV exports
- Bulk Extractor feature files
- Sentence Transformers
- OpenAI Responses API
- ReportLab (PDF generation)

---

## Directory Structure
```
dfir-ai/
├── ingestion/              # Artifact ingestion pipelines
├── storage/                # Database schema and persistence
├── triage/                 # Rule-based triage logic
├── triage_semantic/        # Semantic similarity analysis
├── intelligence/           # Phase 4 case intelligence modules
│   ├── attack_channel_classifier.py
│   ├── behavioral_fingerprinting.py
│   ├── campaign_correlation.py
│   └── case_intelligence.py
├── narrative/              # Narrative orchestration
├── narrative_llm/          # OpenAI client abstraction
├── reporting/              # TXT & PDF report generation
├── scripts/                # CLI entry points
├── data/                   # Sample datasets
├── tests/                  # Unit and integration tests
├── .env
├── requirements.txt
└── README.md
```

---

## Setup

### Database
```bash
mysql -u root -p dfir_ai < storage/schema.sql
```

### Python Environment
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Environment Variables
Create a `.env` file:
```env
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5-nano-2025-08-07
OPENAI_MAX_TOKENS=1000000
```

Note: GPT-5 models operate deterministically and do not support temperature parameters.

---

## Run Pipeline
```bash
python -m scripts.run_all
```

Optional flags:
- `--dry-run` : Parse and validate artifacts without persistence
- `--no-llm`  : Disable narrative generation (deterministic-only run)

---

## Testing
```bash
pytest
```

---

## Academic & Ethical Note
Large Language Models are used **strictly for narrative assistance** and do not influence:
- Evidence ingestion
- Triage prioritization
- Severity scoring
- Intelligence generation

All forensic decisions remain deterministic, explainable, and auditable.  
This design ensures the system is suitable for academic evaluation, professional DFIR use, and legal scrutiny.

