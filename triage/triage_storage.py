import mysql.connector
import json

class TriageStore:

    def __init__(self, host, user, password, database):
        self.connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.connection.cursor()

    def InsertTriageResult(self, result):
        query = """
        INSERT INTO triage_results (artifact_id, triage_score, score_breakdown, triaged_at)
        VALUES (%s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            triage_score = VALUES(triage_score),
            score_breakdown = VALUES(score_breakdown),
            triaged_at = VALUES(triaged_at)
        """

        values = (
            result["artifact_id"],
            result["triage_score"],
            json.dumps(result["score_breakdown"]),
            result["triaged_at"]
        )

        self.cursor.execute(query, values)
        self.connection.commit()
