from triage.triage_engine import TriageArtifact
from triage.triage_storage import TriageStore
import mysql.connector

def RunTriage():
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
        result = TriageArtifact(artifact)
        store.InsertTriageResult(result)

    cursor.close()
    connection.close()

if __name__ == "__main__":
    RunTriage()
