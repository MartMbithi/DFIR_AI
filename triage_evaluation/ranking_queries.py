import mysql.connector

def GetRankedArtifacts(limit=20):
    connection = mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="dfir_ai"
    )
    cursor = connection.cursor(dictionary=True)

    query = '''
    SELECT f.artifact_id, f.artifact_type, f.content_summary,
           t.triage_score, t.score_breakdown
    FROM forensic_artifacts f
    JOIN triage_results t ON f.artifact_id = t.artifact_id
    ORDER BY t.triage_score DESC
    LIMIT %s
    '''
    cursor.execute(query, (limit,))
    results = cursor.fetchall()

    cursor.close()
    connection.close()
    return results
