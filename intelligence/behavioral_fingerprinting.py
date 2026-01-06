
from collections import Counter
from datetime import datetime

def behavioral_fingerprint(triaged):
    times = []
    for a in triaged:
        ts = a.get("artifact_timestamp")
        if ts:
            try:
                times.append(datetime.fromisoformat(str(ts)))
            except Exception:
                pass

    hours = [t.hour for t in times]
    velocity = "high" if len(triaged) > 100 else "medium" if len(triaged) > 20 else "low"
    pattern = "night-heavy" if any(h < 6 or h > 22 for h in hours) else "business-hours"

    summaries = Counter(a.get("content_summary") for a in triaged)
    tooling = "high" if summaries and max(summaries.values()) > 20 else "medium" if summaries and max(summaries.values()) > 5 else "low"

    return {
        "attack_velocity": velocity,
        "time_pattern": pattern,
        "tooling_consistency": tooling,
        "automation_likelihood": "high" if velocity=="high" and tooling!="low" else "medium"
    }
