
from collections import Counter, defaultdict

MITRE_TACTIC_MAP = {
    "T1190": "Initial Access",
    "T1110": "Credential Access",
    "T1005": "Collection",
    "T1046": "Discovery",
    "T1048": "Exfiltration"
}

def rollup_mitre_tactics(mitre_rows):
    tactics = Counter()
    for _, tid, _ in mitre_rows:
        tactic = MITRE_TACTIC_MAP.get(tid)
        if tactic:
            tactics[tactic] += 1
    return tactics

def per_ip_geo_profile(triaged):
    profile = defaultdict(lambda: {"events": 0, "countries": Counter(), "severities": Counter()})
    for a in triaged:
        ip = a.get("source_ip", "Unknown")
        profile[ip]["events"] += 1
        profile[ip]["countries"][a.get("metadata", {}).get("geo", "Unknown")] += 1
        profile[ip]["severities"][a.get("severity", "LOW")] += 1
    return profile
