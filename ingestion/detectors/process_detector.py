
import uuid
from datetime import datetime, timezone
from .base_detector import BaseDetector

class ProcessDetector(BaseDetector):
    def matches(self, line):
        return "exec" in line.lower() or "process" in line.lower()

    def parse(self, line, context):
        return {
            "artifact_id": str(uuid.uuid4()),
            "case_id": context["case_id"],
            "artifact_type": "process_event",
            "source_tool": "auditd",
            "source_file": context["file"],
            "host_id": context["host"],
            "user_context": None,
            "artifact_timestamp": datetime.now(timezone.utc),
            "artifact_path": context["file"],
            "content_summary": "Process execution activity detected",
            "raw_content": line.strip(),
            "md5": None, "sha1": None, "sha256": None,
            "metadata": {},
            "ingested_at": datetime.now(timezone.utc)
        }
