from hybrid_evaluation.comparative_evaluation import CompareRuleVsHybrid

def test_comparative_evaluation():
    rule = [{"artifact_id": "a1"}, {"artifact_id": "a2"}]
    hybrid = [{"artifact_id": "a1"}, {"artifact_id": "a2"}]
    result = CompareRuleVsHybrid(rule, hybrid, k=1)
    assert "Improvement" in result
