from triage.triage_engine import TriageArtifact
from triage_semantic.hybrid_scorer import HybridScore
from triage.triage_storage import TriageStore
import mysql.connector

INVESTIGATION_GOAL = "Identify malicious execution, persistence mechanisms, and suspicious downloads"

def RunHybridTriage():
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="dfir_ai"
    )
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM forensic_artifacts")
    artifacts = cursor.fetchall()

    store = TriageStore("localhost", "root", "", "dfir_ai")

    for artifact in artifacts:
        rule_result = TriageArtifact(artifact)
        hybrid = HybridScore(
            rule_result["triage_score"],
            artifact.get("content_summary", ""),
            INVESTIGATION_GOAL
        )

        store.InsertTriageResult({
            "artifact_id": artifact["artifact_id"],
            "triage_score": hybrid["final_score"],
            "score_breakdown": hybrid,
            "triaged_at": rule_result["triaged_at"]
        })

    cursor.close()
    connection.close()

if __name__ == "__main__":
    RunHybridTriage()
