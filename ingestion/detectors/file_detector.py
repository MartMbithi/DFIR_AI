
import uuid
from datetime import datetime, timezone
from .base_detector import BaseDetector

class FileDetector(BaseDetector):
    def matches(self, line):
        return any(x in line.lower() for x in ["chmod", "chown", "open", "delete", "create"])

    def parse(self, line, context):
        return {
            "artifact_id": str(uuid.uuid4()),
            "case_id": context["case_id"],
            "artifact_type": "file_event",
            "source_tool": "filesystem",
            "source_file": context["file"],
            "host_id": context["host"],
            "user_context": None,
            "artifact_timestamp": datetime.now(timezone.utc),
            "artifact_path": context["file"],
            "content_summary": "File system activity detected",
            "raw_content": line.strip(),
            "md5": None, "sha1": None, "sha256": None,
            "metadata": {},
            "ingested_at": datetime.now(timezone.utc)
        }
