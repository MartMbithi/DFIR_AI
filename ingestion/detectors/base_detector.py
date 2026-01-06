
class BaseDetector:
    def matches(self, line: str) -> bool:
        raise NotImplementedError

    def parse(self, line: str, context: dict) -> dict:
        raise NotImplementedError
