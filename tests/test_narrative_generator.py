class MockLLM:
    def generate(self, prompt):
        return "Mock narrative output"

from narrative.narrative_generator import NarrativeGenerator

def test_narrative_generator_returns_output():
    generator = NarrativeGenerator(MockLLM())
    output = generator.Generate("test prompt")
    assert output == "Mock narrative output"
