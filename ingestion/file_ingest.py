import os
import socket
from ingestion.detectors.web_attack_detector import WebAttackDetector
from ingestion.detectors.auth_detector import AuthDetector
from ingestion.detectors.network_detector import NetworkDetector
from ingestion.detectors.system_detector import SystemDetector
from ingestion.detectors.process_detector import ProcessDetector
from ingestion.detectors.file_detector import FileDetector

RAW_DIR = "data/raw"

DETECTORS = [
    WebAttackDetector(),
    AuthDetector(),
    NetworkDetector(),
    SystemDetector(),
    ProcessDetector(),
    FileDetector()
]

def DiscoverAndParseRawFiles(case_id="AUTOCASE"):
    artifacts = []

    if not os.path.isdir(RAW_DIR):
        print(f"⚠ Raw data directory not found: {RAW_DIR}")
        return artifacts

    for root, _, files in os.walk(RAW_DIR):
        for fname in files:
            if not fname.lower().endswith((".log", ".txt")):
                continue

            path = os.path.join(root, fname)
            print(f"   → Scanning {path}")

            try:
                with open(path, "r", errors="ignore") as f:
                    for line in f:
                        if not line.strip():
                            continue

                        context = {
                            "case_id": case_id,
                            "file": path,
                            "host": socket.gethostname()
                        }

                        for detector in DETECTORS:
                            if detector.matches(line):
                                artifact = detector.parse(line, context)
                                artifacts.append(artifact)
                                break

            except Exception as e:
                print(f"✖ Failed reading {path}: {e}")

    return artifacts
