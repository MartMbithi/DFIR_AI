
# narrative/narrative_generator.py

from narrative_llm.openai_client import OpenAIClient
from narrative.batching import chunk_artifacts, build_batch_prompt
import time

class NarrativeGenerator:
    def __init__(self):
        self.llm_client = OpenAIClient()

    def GenerateBatched(self, triaged, batch_size=25):
        batches = list(chunk_artifacts(triaged, batch_size))
        total = len(batches)
        narratives = []

        for idx, batch in enumerate(batches, start=1):
            prompt = build_batch_prompt(batch, idx, total)
            narratives.append(self.llm_client.generate(prompt))
            time.sleep(1.5)

        return narratives

    def Synthesize(self, batch_narratives):
        combined = "\n\n".join(batch_narratives)

        synthesis_prompt = f"""You are a senior digital forensic analyst.

Combine the following sectioned forensic summaries into a single cohesive narrative.
Do NOT speculate.
Do NOT attribute.
Maintain professional DFIR tone.

Summaries:
{combined}
"""

        return self.llm_client.generate(synthesis_prompt)
