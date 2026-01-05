from triage_evaluation.evaluation_metrics import PrecisionAtK, MeanScore

def test_precision_at_k():
    ranked = [
        {"artifact_id": "a1", "triage_score": 1.0},
        {"artifact_id": "a2", "triage_score": 0.9}
    ]
    relevant = {"a1"}
    assert PrecisionAtK(ranked, relevant, k=1) == 1.0

def test_mean_score():
    ranked = [
        {"triage_score": 1.0},
        {"triage_score": 0.0}
    ]
    assert MeanScore(ranked) == 0.5
