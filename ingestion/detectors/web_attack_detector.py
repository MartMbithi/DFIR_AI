import re, uuid
from datetime import datetime, timezone
from .base_detector import BaseDetector

ATTACK_MAP = {
    "SQL_INJECTION": [
        r"detected sqli",
        r"libinjection",
        r"APPLICATION-ATTACK-SQLI"
    ],
    "XSS": [
        r"APPLICATION-ATTACK-XSS",
        r"xss attack"
    ],
    "LFI": [
        r"APPLICATION-ATTACK-LFI",
        r"/\.git/",
        r"sftp-config\.json",
        r"composer\.json"
    ],
    "RFI": [
        r"APPLICATION-ATTACK-RFI"
    ],
    "RCE": [
        r"APPLICATION-ATTACK-RCE"
    ],
    "PROTOCOL_ABUSE": [
        r"PROTOCOL-ENFORCEMENT",
        r"Host header is a numeric IP",
        r"Multiple/Conflicting Connection Header"
    ],
    "WAF_CORRELATION": [
        r"Inbound Anomaly Score Exceeded"
    ],
    "ACCESS_DENIED": [
        r"AH01797",
        r"client denied by server configuration"
    ],
    "WORDPRESS_ATTACK": [
        r"xmlrpc\.php",
        r"wp-login\.php"
    ]
}

IP_PATTERN = r"\b\d{1,3}(?:\.\d{1,3}){3}\b"

class WebAttackDetector(BaseDetector):
    def matches(self, line):
        return any(
            re.search(pat, line, re.IGNORECASE)
            for patterns in ATTACK_MAP.values()
            for pat in patterns
        )

    def parse(self, line, context):
        attack_type = "UNKNOWN"
        for name, patterns in ATTACK_MAP.items():
            for pat in patterns:
                if re.search(pat, line, re.IGNORECASE):
                    attack_type = name
                    break
            if attack_type != "UNKNOWN":
                break

        ip_match = re.search(IP_PATTERN, line)
        source_ip = ip_match.group(0) if ip_match else "UNKNOWN"

        return {
            "artifact_id": str(uuid.uuid4()),
            "case_id": context["case_id"],
            "artifact_type": "web_security_event",
            "source_tool": "apache_modsecurity",
            "source_file": context["file"],
            "host_id": context["host"],
            "user_context": None,
            "artifact_timestamp": datetime.now(timezone.utc),
            "artifact_path": context["file"],
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
        }
