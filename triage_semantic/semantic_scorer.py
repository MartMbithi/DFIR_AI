import numpy as np
from triage_semantic.embedding_engine import GenerateEmbedding
from triage_semantic.semantic_config import EMBEDDING_MODEL

def CosineSimilarity(vec1, vec2):
    if vec1 is None or vec2 is None:
        return 0.0
    denom = (np.linalg.norm(vec1) * np.linalg.norm(vec2))
    if denom == 0:
        return 0.0
    return float(np.dot(vec1, vec2) / denom)

def SemanticScore(artifact_text, investigation_goal):
    artifact_vec = GenerateEmbedding(artifact_text, EMBEDDING_MODEL)
    goal_vec = GenerateEmbedding(investigation_goal, EMBEDDING_MODEL)
    return round(CosineSimilarity(artifact_vec, goal_vec), 3)
