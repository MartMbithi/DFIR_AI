INCIDENT_SUMMARY_TEMPLATE = '''
You are assisting a digital forensic investigator.

Task:
Generate a concise incident summary based ONLY on the evidence provided.

Rules:
- Do not speculate or infer intent.
- Do not introduce facts not present in the evidence.
- Reference artifacts explicitly by artifact_id.
- Maintain a neutral, professional tone.

Evidence:
{evidence}
'''
