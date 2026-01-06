
import re, uuid
from datetime import datetime, timezone
from .base_detector import BaseDetector

class NetworkDetector(BaseDetector):
    def matches(self, line):
        return re.search(r"\d+\.\d+\.\d+\.\d+:\d+", line) is not None

    def parse(self, line, context):
        return {
            "artifact_id": str(uuid.uuid4()),
            "case_id": context["case_id"],
            "artifact_type": "network_event",
            "source_tool": "network_logs",
            "source_file": context["file"],
            "host_id": context["host"],
            "user_context": None,
            "artifact_timestamp": datetime.now(timezone.utc),
            "artifact_path": context["file"],
            "content_summary": "Network communication observed",
            "raw_content": line.strip(),
            "md5": None, "sha1": None, "sha256": None,
            "metadata": {},
            "ingested_at": datetime.now(timezone.utc)
        }
