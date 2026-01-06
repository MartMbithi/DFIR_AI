import base64
import re

def _try_base64(token):
    try:
        decoded = base64.b64decode(token).decode("utf-8")
        return decoded
    except Exception:
        return None

def NormalizeIndicators(artifact):
    enriched = artifact.copy()
    interpretations = []

    raw = artifact.get("raw_content") or ""

    for t in raw.split():
        decoded = _try_base64(t)
        if decoded:
            interpretations.append(f"Decoded base64 content: {decoded}")
            break

    match = re.search(r"(\d+\.\d+\.\d+\.\d+):(\d+)", raw)
    if match:
        ip, port = match.groups()
        interpretations.append(f"Network connection to IP {ip} on port {port}")

    if interpretations:
        enriched["metadata"] = {"interpretation": interpretations}

    return enriched
