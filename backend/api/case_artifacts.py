from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from backend.db.session import get_db
from backend.deps import get_current_user
from backend.models.cases import Case
from backend.storage.file_storage import save_uploaded_file

router = APIRouter()

@router.post("/{case_id}/artifacts/upload")
def upload_case_artifact(
    case_id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    case = (
        db.query(Case)
        .filter(
            Case.case_id == case_id,
            Case.organization_id == current_user.organization_id,
        )
        .first()
    )

    if not case:
        raise HTTPException(status_code=404, detail="Case not found")

    content = file.file.read()
    stored_path = save_uploaded_file(case_id, file.filename, content)

    return {
        "filename": file.filename,
        "stored_path": stored_path,
        "case_id": case_id,
    }