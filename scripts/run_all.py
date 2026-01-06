"""
DFIR-AI :: Command-Line Forensic Pipeline
========================================

Features:
✔ ASCII progress bars
✔ Execution timing
✔ CLI flags
✔ Persistent triage results
✔ Optional LLM narrative generation

Run:
  python -m scripts.run_all [--dry-run] [--no-llm]
"""

import json
import time
import argparse
import mysql.connector
from datetime import datetime
from triage.triage_engine import TriageArtifact
from triage.triage_storage import TriageStore
from triage_semantic.hybrid_scorer import HybridScore
from narrative.prompt_builder import BuildIncidentSummaryPrompt
from narrative.narrative_generator import NarrativeGenerator
from narrative_llm.openai_client import OpenAILLMClient
from ingestion.file_ingest import DiscoverAndParseRawFiles
from utils.indicator_normalizer import NormalizeIndicators

# ---------------- CONFIG ----------------

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "dfir_ai"
}

DATA_PATH = "data/test_artifacts.json"

INVESTIGATION_GOAL = (
    "Identify malicious execution, persistence mechanisms, "
    "and suspicious file downloads"
)

# ---------------- UI HELPERS ----------------

def banner():
    print("\n" + "=" * 70)
    print("  DFIR-AI :: AUTONOMOUS DIGITAL FORENSIC PIPELINE")
    print("  Status : ONLINE")
    print("  Engine : Hybrid AI (Deterministic + Semantic)")
    print("=" * 70 + "\n")

def progress(step, total, label):
    bar_len = 30
    filled = int(bar_len * step / total)
    bar = "█" * filled + "-" * (bar_len - filled)
    print(f"\r[{bar}] {label}", end="", flush=True)

def ok(msg):
    print(f"\n   ✔ {msg}")

def fail(msg):
    print(f"\n   ✖ {msg}")

def timing(label, start):
    elapsed = time.time() - start
    print(f"   ⏱ {label} completed in {elapsed:.2f}s")

# ---------------- CORE PIPELINE ----------------

def load_artifacts():
    with open(DATA_PATH, "r") as f:
        return json.load(f)

def persist_artifacts(artifacts, dry_run):
    if dry_run:
        return

    conn = mysql.connector.connect(**DB_CONFIG)
    cur = conn.cursor()

    for a in artifacts:
        cur.execute(
            """
            INSERT IGNORE INTO forensic_artifacts (
                artifact_id, case_id, artifact_type, source_tool,
                source_file, host_id, user_context,
                artifact_timestamp, artifact_path,
                content_summary, raw_content,
                md5, sha1, sha256, metadata, ingested_at
            ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                a["artifact_id"], a["case_id"], a["artifact_type"],
                a["source_tool"], a["source_file"], a["host_id"],
                a["user_context"], a["artifact_timestamp"],
                a["artifact_path"], a["content_summary"],
                a["raw_content"], a["md5"], a["sha1"],
                a["sha256"], a["metadata"], a["ingested_at"]
            )
        )

    conn.commit()
    cur.close()
    conn.close()

def run_triage(artifacts, dry_run):
    store = None if dry_run else TriageStore(**DB_CONFIG)
    triaged = []

    total = len(artifacts)
    for i, a in enumerate(artifacts, start=1):
        progress(i, total, "Triage processing")

        rule = TriageArtifact(a)
        hybrid = HybridScore(
            rule_score=rule["triage_score"],
            artifact_text=a["content_summary"],
            investigation_goal=INVESTIGATION_GOAL
        )

        if store:
            store.InsertTriageResult({
                "artifact_id": a["artifact_id"],
                "triage_score": hybrid["final_score"],
                "score_breakdown": hybrid,
                "triaged_at": datetime.utcnow()
            })

        triaged.append({
            "artifact_id": a["artifact_id"],
            "artifact_type": a["artifact_type"],
            "content_summary": a["content_summary"],
            **hybrid
        })

    return triaged

def generate_narrative(triaged, no_llm):
    if no_llm:
        return "[LLM DISABLED] Narrative generation skipped."

    prompt = BuildIncidentSummaryPrompt(triaged)
    llm = OpenAILLMClient()
    generator = NarrativeGenerator(llm)
    return generator.Generate(prompt)

# ---------------- MAIN CLI ----------------

def main():
    parser = argparse.ArgumentParser(
        description="DFIR-AI Autonomous Forensic Pipeline"
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Run pipeline without database writes"
    )
    parser.add_argument(
        "--no-llm",
        action="store_true",
        help="Disable LLM narrative generation"
    )

    args = parser.parse_args()

    banner()

    total_start = time.time()

    # Step 1: Load
    t = time.time()
    artifacts = load_artifacts()
    ok(f"Loaded {len(artifacts)} forensic artifacts")
    timing("Artifact loading", t)

    # Step 2: Persist artifacts
    t = time.time()
    persist_artifacts(artifacts, args.dry_run)
    ok("Artifacts persisted" if not args.dry_run else "Dry-run: artifact persistence skipped")
    timing("Artifact persistence", t)

    # Step 3: Triage
    t = time.time()
    triaged = run_triage(artifacts, args.dry_run)
    ok("Triage completed and persisted" if not args.dry_run else "Dry-run: triage persistence skipped")
    timing("Triage execution", t)

    # Step 4: Narrative
    t = time.time()
    narrative = generate_narrative(triaged, args.no_llm)
    ok("Narrative generated" if not args.no_llm else "LLM disabled")
    timing("Narrative generation", t)

    print("\n" + "-" * 70)
    print("FORENSIC NARRATIVE OUTPUT")
    print("-" * 70)
    print(narrative)

    timing("TOTAL PIPELINE", total_start)
    print("\n✔ DFIR-AI PIPELINE EXECUTION COMPLETE\n")

if __name__ == "__main__":
    main()
