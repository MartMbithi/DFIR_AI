
from ingestion.detectors.network_detector import NetworkDetector

def test_network_detector():
    d = NetworkDetector()
    ctx = {"case_id": "CASE1", "file": "test.log", "host": "localhost"}
    assert d.matches("192.168.1.1:443")
    art = d.parse("192.168.1.1:443", ctx)
    assert art["artifact_type"] == "network_event"
