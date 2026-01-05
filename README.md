# DFIR-AI: AI-Assisted Digital Forensics Automation

## Overview
This repository contains the ingestion and schema layer for an AI-assisted digital forensics platform. It automates parsing, normalization, and storage of forensic artifacts from standard DFIR tools into a MySQL database, enabling downstream AI-driven analysis.

## Technology Stack
- Python 3.9+
- MySQL (XAMPP / LAMPP)
- Autopsy CSV exports
- Bulk Extractor feature files

## Directory Structure
```
dfir-ai/
├── ingestion/
│   ├── parsers/
│   │   ├── autopsy_parser.py
│   │   ├── bulk_extractor_parser.py
│   ├── normalizer.py
│   ├── ingest.py
├── storage/
│   ├── artifact_store.py
│   └── schema.sql
├── data/
│   ├── raw/
│   ├── normalized/
├── utils/
│   └── uuid_utils.py
```

## Setup Instructions

### MySQL
Start MySQL via XAMPP/LAMPP, then run:
```
mysql -u root -p
SOURCE storage/schema.sql;
```

### Python Environment
```
python -m venv venv
source venv/bin/activate
pip install mysql-connector-python
```

## Running the Ingestion Pipeline
```
python ingestion/ingest.py
```

## Verification
```
SELECT COUNT(*) FROM forensic_artifacts;
```

## Academic Relevance
This module supports the methodology, implementation, and evaluation chapters of the MSc thesis.

## Next Phase
Module 2 will introduce AI feature engineering and evidence correlation.
