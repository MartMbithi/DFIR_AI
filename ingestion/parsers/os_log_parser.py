import uuid
import re
from datetime import datetime, timezone

ATTACK_PATTERNS = {
    "SQL_INJECTION": r"SQL Injection Attack Detected",
    "XSS": r"XSS",
    "RCE": r"RCE",
    "XMLRPC": r"xmlrpc\.php",
    "BRUTE_FORCE": r"wp-login\.php",
    "MODSEC_ANOMALY": r"Inbound Anomaly Score Exceeded",
}

IP_PATTERN = r"\b\d{1,3}(?:\.\d{1,3}){3}\b"

def ParseOSLogs(file_path):
    artifacts = []

    with open(file_path, "r", errors="ignore") as f:
        for line in f:
            attack_type = "INFO"
            for label, pattern in ATTACK_PATTERNS.items():
                if re.search(pattern, line, re.IGNORECASE):
                    attack_type = label
                    break

            ip_match = re.search(IP_PATTERN, line)
            source_ip = ip_match.group(0) if ip_match else "UNKNOWN"

            artifacts.append({
                "artifact_id": str(uuid.uuid4()),
                "case_id": "AUTO-SERVER-CASE",
                "artifact_type": "web_security_event",
                "source_tool": "apache_modsecurity",
                "source_file": file_path,
                "host_id": "production-server",
                "user_context": None,
                "artifact_timestamp": datetime.now(timezone.utc),
                "artifact_path": file_path,
                "content_summary": f"{attack_type} detected from {source_ip}",
                "raw_content": line.strip(),
                "md5": None,
                "sha1": None,
                "sha256": None,
                "metadata": {
                    "attack_type": attack_type,
                    "source_ip": source_ip
                },
                "ingested_at": datetime.now(timezone.utc)
            })

    return artifacts
