from sentence_transformers import SentenceTransformer
from functools import lru_cache

@lru_cache(maxsize=1)
def LoadEmbeddingModel(model_name):
    return SentenceTransformer(model_name)

def GenerateEmbedding(text, model_name):
    model = LoadEmbeddingModel(model_name)
    if not text:
        text = ""
    return model.encode(text)
