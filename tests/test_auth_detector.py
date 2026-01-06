
from ingestion.detectors.auth_detector import AuthDetector

def test_auth_detector():
    d = AuthDetector()
    ctx = {"case_id": "CASE1", "file": "test.log", "host": "localhost"}
    assert d.matches("Failed password for root")
    art = d.parse("Failed password for root", ctx)
    assert art["artifact_type"] == "auth_event"
