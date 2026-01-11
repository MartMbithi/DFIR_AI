from triage_semantic.hybrid_scorer import HybridScore

def test_hybrid_score_structure():
    result = HybridScore(1.0, "powershell execution", "detect malicious behavior")
    assert "final_score" in result
    assert result["final_score"] >= 0.0
