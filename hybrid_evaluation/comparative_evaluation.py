from triage_evaluation.ranking_queries import GetRankedArtifacts
from triage_evaluation.evaluation_metrics import PrecisionAtK

def CompareRuleVsHybrid(rule_ranked, hybrid_ranked, k=10):
    relevant_ids = set(a["artifact_id"] for a in rule_ranked[:k])

    rule_p = PrecisionAtK(rule_ranked, relevant_ids, k)
    hybrid_p = PrecisionAtK(hybrid_ranked, relevant_ids, k)

    return {
        "Precision@K Rule": rule_p,
        "Precision@K Hybrid": hybrid_p,
        "Improvement": round(hybrid_p - rule_p, 3)
    }
