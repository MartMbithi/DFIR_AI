"""
DFIR-AI :: Master Execution Pipeline
-----------------------------------
Runs:
1. Load test data
2. Persist forensic artifacts
3. Rule-based triage
4. Hybrid semantic triage
5. Persist triage results
6. Generate forensic narrative (OpenAI)

Designed for:
- End-to-end validation
- Demo / viva walkthrough
- Auditability
"""

import json
import mysql.connector
from datetime import datetime
from triage.triage_engine import TriageArtifact
from triage.triage_storage import TriageStore
from triage_semantic.hybrid_scorer import HybridScore
from narrative.prompt_builder import BuildIncidentSummaryPrompt
from narrative.narrative_generator import NarrativeGenerator
from narrative_llm.openai_client import OpenAILLMClient

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

DATA_PATH = "data/test_artifacts.json"

# ---------------- VISUAL HELPERS ----------------

def ok(msg):
    print(f"   ✔ {msg}")

def fail(msg):
    print(f"   ✖ {msg}")

def step(msg):
    print(f"\n▶ {msg}")

def banner():
    print("\n" + "=" * 60)
    print("  DFIR-AI :: AUTONOMOUS FORENSIC PIPELINE")
    print("  Status: ONLINE")
    print("  Mode  : FULL EXECUTION")
    print("=" * 60 + "\n")

# ---------------- CORE FUNCTIONS ----------------

def load_test_data():
    step("Loading forensic test artifacts")
    try:
        with open(DATA_PATH, "r") as f:
            artifacts = json.load(f)
        ok(f"Loaded {len(artifacts)} artifacts")
        return artifacts
    except Exception as e:
        fail(f"Failed to load test data: {e}")
        raise

def insert_artifacts(artifacts):
    step("Persisting forensic artifacts to database")
    try:
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
        ok("Artifacts persisted successfully")
    except Exception as e:
        fail(f"Artifact persistence failed: {e}")
        raise

def run_triage(artifacts):
    step("Executing rule-based and hybrid triage")
    try:
        store = TriageStore(**DB_CONFIG)
        triaged_for_narrative = []

        for a in artifacts:
            rule = TriageArtifact(a)

            hybrid = HybridScore(
                rule_score=rule["triage_score"],
                artifact_text=a["content_summary"],
                investigation_goal=INVESTIGATION_GOAL
            )

            store.InsertTriageResult({
                "artifact_id": a["artifact_id"],
                "triage_score": hybrid["final_score"],
                "score_breakdown": hybrid,
                "triaged_at": datetime.utcnow()
            })

            triaged_for_narrative.append({
                "artifact_id": a["artifact_id"],
                "artifact_type": a["artifact_type"],
                "content_summary": a["content_summary"],
                **hybrid
            })

        ok("Triage executed and results persisted")
        return triaged_for_narrative
    except Exception as e:
        fail(f"Triage execution failed: {e}")
        raise

def generate_narrative(triaged_artifacts):
    step("Generating forensic narrative via LLM")
    try:
        prompt = BuildIncidentSummaryPrompt(triaged_artifacts)
        llm = OpenAILLMClient()
        generator = NarrativeGenerator(llm)
        narrative = generator.Generate(prompt)

        ok("Narrative generation completed")
        return narrative
    except Exception as e:
        fail(f"Narrative generation failed: {e}")
        raise

# ---------------- MAIN ----------------

def main():
    banner()

    artifacts = load_test_data()
    insert_artifacts(artifacts)
    triaged = run_triage(artifacts)
    narrative = generate_narrative(triaged)

    print("\n" + "-" * 60)
    print("  FORENSIC NARRATIVE OUTPUT")
    print("-" * 60)
    print(narrative)
    print("\n✔ PIPELINE EXECUTION COMPLETE\n")

if __name__ == "__main__":
    main()
