class NarrativeGenerator:
    def __init__(self, llm_client):
        self.llm_client = llm_client

    def Generate(self, prompt):
        # LLM client must expose a generate(text) method
        return self.llm_client.generate(prompt)
