
import uuid
from datetime import datetime, timezone
from .base_detector import BaseDetector

class SystemDetector(BaseDetector):
    def matches(self, line):
        return any(x in line.lower() for x in ["kernel", "systemd", "service", "error"])

    def parse(self, line, context):
        return {
            "artifact_id": str(uuid.uuid4()),
            "case_id": context["case_id"],
            "artifact_type": "system_event",
            "source_tool": "system_logs",
            "source_file": context["file"],
            "host_id": context["host"],
            "user_context": None,
            "artifact_timestamp": datetime.now(timezone.utc),
            "artifact_path": context["file"],
            "content_summary": "System-level event detected",
            "raw_content": line.strip(),
            "md5": None, "sha1": None, "sha256": None,
            "metadata": {},
            "ingested_at": datetime.now(timezone.utc)
        }
