
from ingestion.detectors.file_detector import FileDetector

def test_file_detector():
    d = FileDetector()
    ctx = {"case_id": "CASE1", "file": "test.log", "host": "localhost"}
    assert d.matches("chmod 777 file")
    art = d.parse("chmod 777 file", ctx)
    assert art["artifact_type"] == "file_event"
