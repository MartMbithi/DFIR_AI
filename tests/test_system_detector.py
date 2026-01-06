
from ingestion.detectors.system_detector import SystemDetector

def test_system_detector():
    d = SystemDetector()
    ctx = {"case_id": "CASE1", "file": "test.log", "host": "localhost"}
    assert d.matches("kernel error")
    art = d.parse("kernel error", ctx)
    assert art["artifact_type"] == "system_event"
