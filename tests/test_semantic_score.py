from triage_semantic.semantic_scorer import SemanticScore

def test_semantic_score_range():
    score = SemanticScore("malware download", "detect malicious activity")
    assert 0.0 <= score <= 1.0
