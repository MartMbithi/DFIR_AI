"""
Master execution script for DFIR-AI framework
Runs:
1. Ingestion (test data)
2. Rule-based triage
3. Hybrid semantic triage
4. Narrative generation (OpenAI)
"""

import json
import mysql.connector
from triage.triage_engine import TriageArtifact
from triage_semantic.hybrid_scorer import HybridScore
from narrative.prompt_builder import BuildIncidentSummaryPrompt
from narrative.narrative_generator import NarrativeGenerator
from narrative_llm.openai_client import OpenAILLMClient

INVESTIGATION_GOAL = "Identify malicious execution, persistence, and suspicious downloads"

def LoadTestData(path):
    with open(path, "r") as f:
        return json.load(f)

def InsertArtifacts(artifacts):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="dfir_ai"
    )
    cur = conn.cursor()

    for a in artifacts:
        cur.execute(
            """INSERT IGNORE INTO forensic_artifacts
            (artifact_id, case_id, artifact_type, source_tool, source_file,
             host_id, user_context, timestamp, path, content_summary,
             raw_content, ingested_at)
            VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
            """,
            (
                a["artifact_id"], a["case_id"], a["artifact_type"],
                a["source_tool"], a["source_file"], a["host_id"],
                a["user_context"], a["timestamp"], a["path"],
                a["content_summary"], a["raw_content"], a["ingested_at"]
            )
        )

    conn.commit()
    cur.close()
    conn.close()

def Run():
    artifacts = LoadTestData("data/test_artifacts.json")
    InsertArtifacts(artifacts)

    triaged = []
    for a in artifacts:
        rule = TriageArtifact(a)
        hybrid = HybridScore(
            rule["triage_score"],
            a["content_summary"],
            INVESTIGATION_GOAL
        )
        triaged.append({
            "artifact_id": a["artifact_id"],
            "artifact_type": a["artifact_type"],
            "content_summary": a["content_summary"],
            **hybrid
        })

    prompt = BuildIncidentSummaryPrompt(triaged)
    llm = OpenAILLMClient()
    generator = NarrativeGenerator(llm)
    narrative = generator.Generate(prompt)

    print("===== GENERATED FORENSIC NARRATIVE =====")
    print(narrative)

if __name__ == "__main__":
    Run()
