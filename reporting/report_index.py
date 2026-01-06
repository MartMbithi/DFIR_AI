import json
import os
from datetime import datetime, timezone

INDEX_PATH = "reports/index.json"

def UpdateReportIndex(case_id, report_path, intensity):
    os.makedirs("reports", exist_ok=True)

    record = {
        "case_id": case_id,
        "report_path": report_path,
        "intensity": intensity,
        "generated_at": datetime.now(timezone.utc).isoformat()
    }

    if os.path.exists(INDEX_PATH):
        with open(INDEX_PATH, "r") as f:
            data = json.load(f)
    else:
        data = []

    data.append(record)

    with open(INDEX_PATH, "w") as f:
        json.dump(data, f, indent=2)
