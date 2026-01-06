from datetime import datetime, timezone
import uuid

def ParseOSLogs(file_path):
    artifacts = []
    with open(file_path, "r", errors="ignore") as f:
        for line in f:
            artifacts.append({
                "artifact_id": str(uuid.uuid4()),
                "case_id": "AUTO-GENERATED",
                "artifact_type": "os_log",
                "source_tool": "operating_system",
                "source_file": file_path,
                "host_id": "UNKNOWN",
                "user_context": None,
                "artifact_timestamp": datetime.now(timezone.utc),
                "artifact_path": file_path,
                "content_summary": line.strip()[:255],
                "raw_content": line.strip(),
                "md5": None,
                "sha1": None,
                "sha256": None,
                "metadata": "{}",
                "ingested_at": datetime.now(timezone.utc)
            })
    return artifacts
