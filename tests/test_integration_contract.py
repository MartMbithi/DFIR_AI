class MockOpenAI:
    def generate(self, prompt):
        return "Mock LLM output"

from narrative.narrative_generator import NarrativeGenerator

def test_llm_contract():
    gen = NarrativeGenerator(MockOpenAI())
    output = gen.Generate("test")
    assert output == "Mock LLM output"
