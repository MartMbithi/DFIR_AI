def PrecisionAtK(ranked_artifacts, relevant_ids, k=10):
    top_k = ranked_artifacts[:k]
    hits = sum(1 for a in top_k if a["artifact_id"] in relevant_ids)
    return hits / k

def MeanScore(ranked_artifacts):
    if not ranked_artifacts:
        return 0.0
    return sum(a["triage_score"] for a in ranked_artifacts) / len(ranked_artifacts)
