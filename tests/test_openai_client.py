import pytest
from narrative_llm.openai_client import OpenAILLMClient

def test_openai_client_missing_key(monkeypatch):
    monkeypatch.delenv("OPENAI_API_KEY", raising=False)
    with pytest.raises(EnvironmentError):
        OpenAILLMClient()
