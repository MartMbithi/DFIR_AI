from triage.triage_engine import TriageArtifact

def test_triage_engine_output():
    artifact = {
        "artifact_id": "id1",
        "artifact_type": "file",
        "content_summary": "wget download",
        "timestamp": None
    }

    result = TriageArtifact(artifact)

    assert result["artifact_id"] == "id1"
    assert "triage_score" in result
    assert "score_breakdown" in result
