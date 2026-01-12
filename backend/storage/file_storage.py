import os
from pathlib import Path

BASE_DATA_DIR = Path("data/cases")

def get_case_upload_dir(case_id: str) -> Path:
    path = BASE_DATA_DIR / case_id / "uploads"
    path.mkdir(parents=True, exist_ok=True)
    return path

def save_uploaded_file(case_id: str, filename: str, content: bytes) -> str:
    upload_dir = get_case_upload_dir(case_id)
    file_path = upload_dir / filename

    with open(file_path, "wb") as f:
        f.write(content)

    return str(file_path)