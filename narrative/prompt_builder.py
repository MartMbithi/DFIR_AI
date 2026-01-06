from narrative.narrative_templates import INCIDENT_SUMMARY_TEMPLATE

def BuildIncidentSummaryPrompt(artifacts):
    evidence_lines = []
    for a in artifacts:
        line = (
            f"Artifact ID: {a['artifact_id']} | "
            f"Type: {a.get('artifact_type')} | "
            f"Summary: {a.get('content_summary')}"
        )

        meta = a.get("metadata")
        if isinstance(meta, dict) and meta.get("interpretation"):
            line += f" | Interpretation: {'; '.join(meta['interpretation'])}"

        evidence_lines.append(line)

    return INCIDENT_SUMMARY_TEMPLATE.format(evidence="\n".join(evidence_lines))
