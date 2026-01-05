from triage_evaluation.ranking_queries import GetRankedArtifacts
from triage_evaluation.evaluation_metrics import PrecisionAtK, MeanScore

def RunEvaluation():
    ranked = GetRankedArtifacts(limit=50)

    # Example ground truth (replace with labeled IDs)
    relevant_ids = set(a["artifact_id"] for a in ranked[:10])

    p_at_10 = PrecisionAtK(ranked, relevant_ids, k=10)
    mean_score = MeanScore(ranked)

    print("Precision@10:", p_at_10)
    print("Mean Triage Score:", mean_score)

if __name__ == "__main__":
    RunEvaluation()
