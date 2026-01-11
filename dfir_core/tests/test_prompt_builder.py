from narrative.prompt_builder import BuildIncidentSummaryPrompt

def test_prompt_contains_artifacts():
    artifacts = [
        {"artifact_id": "a1", "artifact_type": "file", "content_summary": "test file"},
        {"artifact_id": "a2", "artifact_type": "process", "content_summary": "cmd.exe execution"}
    ]

    prompt = BuildIncidentSummaryPrompt(artifacts)

    assert "Artifact ID: a1" in prompt
    assert "Artifact ID: a2" in prompt
    assert "Do not speculate" in prompt
