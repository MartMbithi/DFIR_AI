
from ingestion.detectors.web_attack_detector import WebAttackDetector

def test_web_attack_detector():
    d = WebAttackDetector()
    ctx = {"case_id": "CASE1", "file": "test.log", "host": "localhost"}
    assert d.matches("SQL Injection detected")
    art = d.parse("SQL Injection detected", ctx)
    assert art["artifact_type"] == "web_attack"
