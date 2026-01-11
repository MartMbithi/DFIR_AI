from triage.rule_scorer import ScoreArtifact

def test_rule_scorer_score_positive():
    features = {
        "in_time_window": True,
        "keyword_hit": True,
        "artifact_type": "file"
    }

    score, breakdown = ScoreArtifact(features)

    assert score > 0
    assert "time" in breakdown
    assert "keyword" in breakdown
    assert "type" in breakdown
