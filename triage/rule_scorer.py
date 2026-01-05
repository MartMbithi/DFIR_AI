ARTIFACT_WEIGHTS = {
    "process": 1.0,
    "registry": 0.9,
    "file": 0.7,
    "keyword": 0.5,
    "log": 0.6,
    "network": 0.8
}

def ScoreArtifact(features):
    score = 0.0
    breakdown = {}

    # Time window contribution
    breakdown["time"] = 0.3 if features.get("in_time_window") else 0.0
    score += breakdown["time"]

    # Keyword contribution
    breakdown["keyword"] = 0.4 if features.get("keyword_hit") else 0.0
    score += breakdown["keyword"]

    # Artifact type weight
    weight = ARTIFACT_WEIGHTS.get(features.get("artifact_type"), 0.3)
    breakdown["type"] = weight
    score += weight

    return round(score, 3), breakdown
