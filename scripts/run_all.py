import json
import time
import argparse
from datetime import datetime, timezone
import mysql.connector

# ===== Config & Console FX =====
from config.settings import DB_CONFIG
from utils.console_fx import holo_print, pulse, stage

# ===== Core Engines =====
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


# ---------------- INVESTIGATION GOAL ----------------

INVESTIGATION_GOAL = (
    "Identify malicious execution, persistence mechanisms, "
    "and suspicious file downloads"
)

# ---------------- UI ----------------

def banner():
    holo_print("INITIALIZING DFIR-AI CORE …")
    holo_print("LINKING DETERMINISTIC + SEMANTIC ENGINES …")
    print("\n" + "█" * 70)
    print("  DFIR-AI :: AUTONOMOUS DIGITAL FORENSIC PIPELINE")
    print("  MODE   : HYBRID ANALYSIS")
    print("  STATUS : OPERATIONAL")
    print("█" * 70 + "\n")

def ok(msg):
    holo_print(f"✔ {msg}")

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
    if dry_run or not artifacts:
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
                a.get("md5"),
                a.get("sha1"),
                a.get("sha256"),
                json.dumps(a.get("metadata") or {}),
                a["ingested_at"]
            )
        )

    conn.commit()
    cur.close()
    conn.close()


def run_triage(artifacts, dry_run):
    if not artifacts:
        return []

    store = None if dry_run else TriageStore(**DB_CONFIG)
    triaged = []

    for a in artifacts:
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
                "score_breakdown": json.dumps(hybrid),
                "triaged_at": datetime.now(timezone.utc)
            })

        triaged.append({
            "artifact_id": a["artifact_id"],
            "artifact_type": a["artifact_type"],
            "content_summary": a["content_summary"],
            "artifact_timestamp": a["artifact_timestamp"],
            "md5": a.get("md5"),
            "sha1": a.get("sha1"),
            "sha256": a.get("sha256"),
            "metadata": a.get("metadata") or {},
            **hybrid
        })

    return triaged


def generate_narrative(triaged, no_llm):
    if no_llm or not triaged:
        return "[LLM DISABLED OR NO DATA] Narrative generation skipped."

    prompt = BuildIncidentSummaryPrompt(triaged)
    llm = OpenAILLMClient()
    generator = NarrativeGenerator(llm)
    return generator.Generate(prompt)

# ---------------- MAIN ----------------

def main():
    parser = argparse.ArgumentParser(description="DFIR-AI Autonomous Forensic Pipeline")
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--no-llm", action="store_true")
    args = parser.parse_args()

    banner()
    total_start = time.time()

    # ===== INGESTION =====
    stage("FILE INGESTION")
    t = time.time()
    pulse("Scanning raw logs")
    raw_artifacts = DiscoverAndParseRawFiles()
    ok(f"Discovered {len(raw_artifacts)} raw artifacts")
    timing("File ingestion", t)

    if not raw_artifacts:
        holo_print("NO ARTIFACTS DETECTED — SAFE TERMINATION")
        return

    # ===== NORMALIZATION =====
    stage("INDICATOR NORMALIZATION")
    t = time.time()
    pulse("Normalizing indicators")
    artifacts = [NormalizeIndicators(a) for a in raw_artifacts]
    ok("Indicators normalized and enriched")
    timing("Indicator normalization", t)

    # ===== PERSISTENCE =====
    stage("ARTIFACT PERSISTENCE")
    t = time.time()
    persist_artifacts(artifacts, args.dry_run)
    ok("Artifacts persisted" if not args.dry_run else "Dry-run: persistence skipped")
    timing("Artifact persistence", t)

    # ===== TRIAGE =====
    stage("TRIAGE & SCORING")
    t = time.time()
    pulse("Scoring artifacts")
    triaged = run_triage(artifacts, args.dry_run)
    timing("Triage execution", t)

    if not triaged:
        holo_print("NO TRIAGE RESULTS — PIPELINE HALTED")
        return

    ok("Triage completed")

    # ===== NARRATIVE =====
    stage("SEMANTIC REASONING")
    t = time.time()
    pulse("Generating narrative")
    narrative = generate_narrative(triaged, args.no_llm)
    ok("Narrative generated" if not args.no_llm else "LLM disabled")
    timing("Narrative generation", t)

    # ===== REPORTING =====
    stage("REPORT GENERATION")
    intensity = DetermineIntensity(triaged)
    case_id = triaged[0]["artifact_id"][:8]

    txt_report = WriteTXTReport(case_id, narrative, "detailed", triaged)
    pdf_report = WritePDFReport(case_id, narrative, triaged)

    UpdateReportIndex(case_id, txt_report, intensity)
    UpdateReportIndex(case_id, pdf_report, intensity)

    ok(f"TXT report generated: {txt_report}")
    ok(f"PDF report generated: {pdf_report}")


    timing("TOTAL PIPELINE", total_start)
    holo_print("CASE SEALED")
    holo_print("FORENSIC CHAIN INTACT")
    print("\n✔ DFIR-AI PIPELINE EXECUTION COMPLETE\n")


if __name__ == "__main__":
    main()
