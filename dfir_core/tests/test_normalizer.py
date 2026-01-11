from ingestion.normalizer import NormalizeArtifact

def test_normalize_artifact_basic():
    raw = {
        "artifact_type": "file",
        "source_file": "test.csv",
        "host_id": "host1",
        "user": "user1",
        "timestamp": None,
        "path": "/tmp/a.txt",
        "summary": "test file",
        "content": None,
        "md5": None,
        "sha1": None,
        "sha256": None,
        "metadata": {}
    }

    artifact = NormalizeArtifact(raw, "autopsy", "CASE-TEST")

    assert artifact["case_id"] == "CASE-TEST"
    assert artifact["artifact_type"] == "file"
    assert artifact["source_tool"] == "autopsy"
    assert "artifact_id" in artifact
