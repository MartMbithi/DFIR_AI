import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env
load_dotenv()

class OpenAILLMClient:
    def __init__(self):
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            raise EnvironmentError("OPENAI_API_KEY not set in .env file")

        self.model = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
        self.temperature = float(os.getenv("OPENAI_TEMPERATURE", 0.2))
        self.max_tokens = int(os.getenv("OPENAI_MAX_TOKENS", 600))

        self.client = OpenAI(api_key=api_key)

    def generate(self, prompt):
        kwargs = {
            "model": self.model,
            "input": prompt,
            "max_output_tokens": self.max_tokens,
        }

        # GPT-5 models do NOT support temperature
        if not self.model.startswith("gpt-5"):
            kwargs["temperature"] = self.temperature
        response = self.client.responses.create(**kwargs)
        return response.output_text
