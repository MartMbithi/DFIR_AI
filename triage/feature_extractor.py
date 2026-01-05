from datetime import datetime

def ExtractFeatures(artifact, incident_start=None, incident_end=None):
    features = {}

    # Temporal relevance
    if incident_start and incident_end and artifact.get("timestamp"):
        try:
            features["in_time_window"] = incident_start <= artifact["timestamp"] <= incident_end
        except Exception:
            features["in_time_window"] = False
    else:
        features["in_time_window"] = False

    # Keyword relevance
    suspicious_terms = ["powershell", "cmd.exe", "wget", "curl", "mimikatz"]
    content = (artifact.get("content_summary") or "").lower()
    features["keyword_hit"] = any(term in content for term in suspicious_terms)

    # Artifact type
    features["artifact_type"] = artifact.get("artifact_type")

    return features
