from narrative.narrative_templates import INCIDENT_SUMMARY_TEMPLATE

def BuildIncidentSummaryPrompt(artifacts):
    evidence_lines = []
    for a in artifacts:
        evidence_lines.append(
            f"Artifact ID: {a['artifact_id']} | "
            f"Type: {a.get('artifact_type')} | "
            f"Summary: {a.get('content_summary')}"
        )

    evidence_block = "\n".join(evidence_lines)
    return INCIDENT_SUMMARY_TEMPLATE.format(evidence=evidence_block)
