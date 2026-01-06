import os
from ingestion.parsers.autopsy_parser import ParseAutopsyCsv
from ingestion.parsers.bulk_extractor_parser import ParseBulkExtractor
from ingestion.parsers.os_log_parser import ParseOSLogs
from ingestion.detectors.auth_detector import AuthDetector
from ingestion.detectors.web_attack_detector import WebAttackDetector
from ingestion.detectors.network_detector import NetworkDetector
from ingestion.detectors.process_detector import ProcessDetector
from ingestion.detectors.file_detector import FileDetector
from ingestion.detectors.system_detector import SystemDetector

DETECTORS = [
    WebAttackDetector(),
    AuthDetector(),
    NetworkDetector(),
    ProcessDetector(),
    FileDetector(),
    SystemDetector()
]

def DiscoverAndParseRawFiles(raw_dir="data/raw"):
    artifacts = []
    for root, _, files in os.walk(raw_dir):
        for file in files:
            path = os.path.join(root, file)
            if file.lower().endswith(".csv"):
                artifacts.extend(ParseAutopsyCsv(path))
            elif file.lower().endswith(".txt"):
                artifacts.extend(ParseBulkExtractor(path))
            elif file.lower().endswith(".log"):
                artifacts.extend(ParseOSLogs(path))
    return artifacts
