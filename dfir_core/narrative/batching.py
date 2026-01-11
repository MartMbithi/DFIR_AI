
# narrative/batching.py
# Deterministic batching utilities for LLM-safe narrative generation

def chunk_artifacts(triaged, batch_size=25):
    for i in range(0, len(triaged), batch_size):
        yield triaged[i:i + batch_size]


def build_batch_prompt(batch, batch_number, total_batches):
    summaries = [
        f"- {a.get('artifact_timestamp','N/A')}: {a.get('content_summary','')}"
        for a in batch
    ]

    return f"""You are a digital forensic analyst.

This is batch {batch_number} of {total_batches}.

Summarize the following forensic events conservatively.
Do NOT speculate.
Do NOT assign attribution.
Do NOT infer compromise unless explicitly stated.

Events:
{chr(10).join(summaries)}
"""
