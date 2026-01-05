import mysql.connector
import json

class ArtifactStore:

    def __init__(self, host, user, password, database):
        self.connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password,
            database=database
        )
        self.cursor = self.connection.cursor()

    def InsertArtifact(self, artifact):
        query = '''
        INSERT INTO forensic_artifacts (
            artifact_id, case_id, artifact_type, source_tool,
            source_file, host_id, user_context, artifact_timestamp,
            artifact_path, content_summary, raw_content,
            md5, sha1, sha256, metadata, ingested_at
        ) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        '''
        values = (
            artifact['artifact_id'], artifact['case_id'], artifact['artifact_type'],
            artifact['source_tool'], artifact['source_file'], artifact['host_id'],
            artifact['user_context'], artifact['timestamp'], artifact['path'],
            artifact['content_summary'], artifact['raw_content'], artifact['hashes']['md5'],
            artifact['hashes']['sha1'], artifact['hashes']['sha256'],
            json.dumps(artifact['metadata']), artifact['ingested_at']
        )
        self.cursor.execute(query, values)
        self.connection.commit()
