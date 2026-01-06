# DFIR-AI: AI-Assisted Digital Forensics Automation

## Overview
DFIR-AI is an end-to-end, research-grade digital forensics platform that automates evidence ingestion, normalization, triage, semantic prioritization, and forensic narrative generation.  
The system is designed with forensic defensibility, explainability, and reproducibility as first-class principles.

## Key Capabilities
- Automated ingestion of forensic artifacts
- Unified relational evidence schema (MySQL)
- Rule-based and semantic hybrid triage
- Persistent triage audit trail
- LLM-assisted forensic narrative generation (OpenAI)
- CLI-driven execution with progress bars and timing

## Technology Stack
- Python 3.9+
- MySQL (XAMPP / LAMPP)
- Autopsy CSV exports
- Bulk Extractor feature files
- Sentence Transformers
- OpenAI Responses API

## Directory Structure
```
dfir-ai/
    ├── ingestion/
    ├── storage/
    ├── triage/
    ├── triage_semantic/
    ├── narrative/
    ├── narrative_llm/
    ├── scripts/
    ├── data/
    ├── tests/
    ├── .env
    ├── requirements.txt
    └── README.md
```
## Setup

### Database
mysql -u root -p dfir_ai < storage/schema.sql

### Python
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

### Environment
Create .env file:
OPENAI_API_KEY=your_key_here

## Run Pipeline
python -m scripts.run_all

Optional flags:
--dry-run
--no-llm

## Testing
pytest

## Academic Note
LLMs are used strictly for narrative assistance and do not influence evidence prioritization.
