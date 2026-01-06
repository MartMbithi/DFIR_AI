import re, uuid
from datetime import datetime, timezone
from .base_detector import BaseDetector

PATTERNS = {
    "SQL_INJECTION": r"sqli|sql injection|libinjection",
    "XSS": r"xss|cross-site",
    "RCE": r"rce|command execution",
    "XMLRPC": r"xmlrpc\.php",
    "BRUTE_FORCE": r"wp-login\.php",
    "ANOMALY_SCORE": r"inbound anomaly score exceeded"
}

IP_PATTERN = r"\b\d{1,3}(?:\.\d{1,3}){3}\b"

class WebAttackDetector(BaseDetector):
    def matches(self, line):
        return any(re.search(p, line, re.IGNORECASE) for p in PATTERNS.values())

    def parse(self, line, context):
        attack = "UNKNOWN"
        for k, p in PATTERNS.items():
            if re.search(p, line, re.IGNORECASE):
                attack = k
                break

        ip = re.search(IP_PATTERN, line)
        source_ip = ip.group(0) if ip else "UNKNOWN"

        return {
            "artifact_id": str(uuid.uuid4()),
            "case_id": context["case_id"],
            "artifact_type": "web_attack",
            "source_tool": "apache_modsecurity",
            "source_file": context["file"],
            "host_id": context["host"],
            "user_context": None,
            "artifact_timestamp": datetime.now(timezone.utc),
            "artifact_path": context["file"],
            "content_summary": f"{attack} detected from {source_ip}",
            "raw_content": line.strip(),
            "md5": None,
            "sha1": None,
            "sha256": None,
            "metadata": {
                "attack_type": attack,
                "source_ip": source_ip
            },
            "ingested_at": datetime.now(timezone.utc)
        }
