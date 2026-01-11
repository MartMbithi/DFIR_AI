from storage.artifact_store import ArtifactStore
from datetime import datetime
import uuid

def test_insert_artifact():
    store = ArtifactStore(
        host="localhost",
        user="root",
        password="",
        database="dfir_ai"
    )

    artifact = {
        "artifact_id": str(uuid.uuid4()),
        "case_id": "TEST-CASE",
        "artifact_type": "file",
        "source_tool": "test",
        "source_file": "test_source",
        "host_id": "test_host",
        "user_context": "test_user",
        "timestamp": datetime.utcnow(),
        "path": "/tmp/test.txt",
        "content_summary": "Test artifact",
        "raw_content": "Test content",
        "hashes": {
            "md5": None,
            "sha1": None,
            "sha256": None
        },
        "metadata": {},
        "ingested_at": datetime.utcnow()
    }

    store.InsertArtifact(artifact)
