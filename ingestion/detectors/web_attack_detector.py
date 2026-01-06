
import re, uuid
from datetime import datetime, timezone
from .base_detector import BaseDetector

class WebAttackDetector(BaseDetector):
    def matches(self, line):
        return any(x in line.lower() for x in ["sql injection", "xss", "xmlrpc", "wp-login"])

    def parse(self, line, context):
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
            "content_summary": "Web application attack detected",
            "raw_content": line.strip(),
            "md5": None, "sha1": None, "sha256": None,
            "metadata": {},
            "ingested_at": datetime.now(timezone.utc)
        }
