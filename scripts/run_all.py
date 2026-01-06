"""
DFIR-AI :: Command-Line Forensic Pipeline
========================================

Features:
✔ File-based ingestion (data/raw/)
✔ Indicator normalization
✔ ASCII progress bars
✔ Execution timing
✔ CLI flags
✔ Persistent triage results
✔ Optional LLM narrative generation
✔ Severity-based report generation (TXT / PDF)
✔ Case-level report index

Run:
  python -m scripts.run_all [--dry-run] [--no-llm]
"""

import time
import argparse
import mysql.connector
from datetime import datetime, timezone

from triage.triage_engine import TriageArtifact
from triage.triage_storage import TriageStore
from triage_semantic.hybrid_scorer import HybridScore

from ingestion.file_ingest import DiscoverAndParseRawFiles
from utils.indicator_normalizer import NormalizeIndicators

from narrative.prompt_builder import BuildIncidentSummaryPrompt
from narrative.narrative_generator import NarrativeGenerator
from narrative_llm.openai_client import OpenAILLMClient

from reporting.report_writer import WriteTXTReport, WritePDFReport
from reporting.report_index import UpdateReportIndex

# ---------------- CONFIG ----------------

DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "dfir_ai"
}

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

def timing(label, start):
    elapsed = time.time() - start
    print(f"   ⏱ {label} completed in {elapsed:.2f}s")

# ---------------- LOGIC ----------------

def DetermineIntensity(triaged):
    if not triaged:
        return "NONE"

    max_score = max(a["final_score"] for a in triaged)

    if max_score >= 0.85:
        return "HIGH"
    elif max_score >= 0.55:
        return "MEDIUM"
    return "LOW"


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
                a["artifact_id"],
                a["case_id"],
                a["artifact_type"],
                a["source_tool"],
                a["source_file"],
                a["host_id"],
                a["user_context"],
                a["artifact_timestamp"],
                a["artifact_path"],
                a["content_summary"],
                a["raw_content"],
                a["md5"],
                a["sha1"],
                a["sha256"],
                str(a["metadata"]),
                a["ingested_at"],
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
                "triaged_at": datetime.now(timezone.utc)
            })

        triaged.append({
            "artifact_id": a["artifact_id"],
            "artifact_type": a["artifact_type"],
            "content_summary": a["content_summary"],
            "artifact_timestamp": a["artifact_timestamp"],
            "md5": a["md5"],
            "sha1": a["sha1"],
            "sha256": a["sha256"],
            "metadata": a.get("metadata"),
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
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--no-llm", action="store_true")

    args = parser.parse_args()
    banner()

    total_start = time.time()

   # STEP 1: Ingest files
    t = time.time()
    raw_artifacts = DiscoverAndParseRawFiles()
    ok(f"Discovered {len(raw_artifacts)} raw artifacts")
    timing("File ingestion", t)

    # 🚨 HARD GUARD (ADD THIS)
    if not raw_artifacts:
        print("\n⚠ No forensic artifacts were ingested.")
        print("⚠ Check data/raw/ paths and detector patterns.")
        print("✔ PIPELINE TERMINATED SAFELY\n")
        return

    # STEP 2: Normalize indicators
    t = time.time()
    artifacts = [NormalizeIndicators(a) for a in raw_artifacts]
    ok("Indicator normalization completed")
    timing("Indicator normalization", t)

    # STEP 3: Persist artifacts
    t = time.time()
    persist_artifacts(artifacts, args.dry_run)
    ok("Artifacts persisted" if not args.dry_run else "Dry-run: artifact persistence skipped")
    timing("Artifact persistence", t)

    # STEP 4: Triage
    t = time.time()
    triaged = run_triage(artifacts, args.dry_run)
    ok("Triage completed" if not args.dry_run else "Dry-run: triage skipped")
    timing("Triage execution", t)

    # STEP 5: Narrative
    t = time.time()
    narrative = generate_narrative(triaged, args.no_llm)
    ok("Narrative generated" if not args.no_llm else "LLM disabled")
    timing("Narrative generation", t)

    # STEP 6: Reporting
    intensity = DetermineIntensity(triaged)
    case_id = triaged[0]["artifact_id"][:8]

    if intensity == "HIGH":
        report_path = WritePDFReport(case_id, narrative, triaged)
    elif intensity == "MEDIUM":
        report_path = WriteTXTReport(case_id, narrative, "detailed")
    else:
        report_path = WriteTXTReport(case_id, narrative, "summary")

    UpdateReportIndex(case_id, report_path, intensity)
    ok(f"Forensic report generated: {report_path}")

    timing("TOTAL PIPELINE", total_start)
    print("\n✔ DFIR-AI PIPELINE EXECUTION COMPLETE\n")
    
    if not triaged:
        print("\n⚠ No forensic artifacts were ingested.")
        print("⚠ No triage or report generated.")
        print("✔ PIPELINE TERMINATED SAFELY\n")
        return

if __name__ == "__main__":
    main()
