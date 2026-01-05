from triage_semantic.semantic_scorer import SemanticScore
from triage_semantic.semantic_config import RULE_WEIGHT, SEMANTIC_WEIGHT

def HybridScore(rule_score, artifact_text, investigation_goal):
    semantic_score = SemanticScore(artifact_text, investigation_goal)

    final_score = (
        RULE_WEIGHT * rule_score +
        SEMANTIC_WEIGHT * semantic_score
    )

    return {
        "rule_score": rule_score,
        "semantic_score": semantic_score,
        "final_score": round(final_score, 3),
        "semantic_explanation": "Semantic similarity between artifact content and investigation goal"
    }
