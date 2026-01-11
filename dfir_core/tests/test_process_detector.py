
from ingestion.detectors.process_detector import ProcessDetector

def test_process_detector():
    d = ProcessDetector()
    ctx = {"case_id": "CASE1", "file": "test.log", "host": "localhost"}
    assert d.matches("exec /bin/bash")
    art = d.parse("exec /bin/bash", ctx)
    assert art["artifact_type"] == "process_event"
