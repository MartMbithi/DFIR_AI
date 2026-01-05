from datetime import datetime
from triage.feature_extractor import ExtractFeatures
from triage.rule_scorer import ScoreArtifact

def TriageArtifact(artifact, incident_start=None, incident_end=None):
    features = ExtractFeatures(artifact, incident_start, incident_end)
    score, breakdown = ScoreArtifact(features)

    return {
        "artifact_id": artifact.get("artifact_id"),
        "triage_score": score,
        "score_breakdown": breakdown,
        "triaged_at": datetime.utcnow()
    }
