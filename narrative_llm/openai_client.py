import os
from openai import OpenAI
from narrative_llm.openai_config import MODEL_NAME, TEMPERATURE, MAX_TOKENS

class OpenAILLMClient:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise EnvironmentError("OPENAI_API_KEY environment variable not set")

        self.client = OpenAI(api_key=api_key)

    def generate(self, prompt):
        response = self.client.responses.create(
            model=MODEL_NAME,
            input=prompt,
            temperature=TEMPERATURE,
            max_output_tokens=MAX_TOKENS,
        )

        return response.output_text
