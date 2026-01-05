from narrative.prompt_builder import BuildIncidentSummaryPrompt
from narrative.narrative_generator import NarrativeGenerator
from narrative_llm.openai_client import OpenAILLMClient

def RunNarrativeGeneration(artifacts):
    prompt = BuildIncidentSummaryPrompt(artifacts)
    llm = OpenAILLMClient()
    generator = NarrativeGenerator(llm)
    return generator.Generate(prompt)
