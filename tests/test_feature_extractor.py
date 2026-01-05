from triage.feature_extractor import ExtractFeatures
from datetime import datetime, timedelta

def test_extract_features():
    artifact = {
        "artifact_type": "file",
        "content_summary": "powershell execution",
        "timestamp": datetime.utcnow()
    }

    features = ExtractFeatures(
        artifact,
        incident_start=datetime.utcnow() - timedelta(hours=1),
        incident_end=datetime.utcnow() + timedelta(hours=1)
    )

    assert features["in_time_window"] is True
    assert features["keyword_hit"] is True
