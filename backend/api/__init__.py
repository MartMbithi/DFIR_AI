from backend.api import reports, artifacts

app.include_router(reports.router)
app.include_router(artifacts.router)
