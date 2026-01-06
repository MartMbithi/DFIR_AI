
from collections import defaultdict

def correlate_cases(cases):
    campaigns = defaultdict(list)
    for case_id, triaged in cases.items():
        ips = set()
        for a in triaged:
            for i in a.get("metadata",{}).get("interpretation",[]):
                if "IP " in i:
                    ips.add(i.split("IP ")[1].split()[0])
        for ip in ips:
            campaigns[ip].append(case_id)

    results = {}
    idx = 1
    for ip, linked in campaigns.items():
        if len(linked) > 1:
            results[f"CAMP-{idx:03d}"] = {
                "infrastructure": ip,
                "linked_cases": linked,
                "confidence": round(min(1.0, 0.3 + 0.1*len(linked)),2)
            }
            idx += 1
    return results
