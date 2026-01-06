import os
from reporting.report_index import UpdateReportIndex

def test_index_update(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    UpdateReportIndex("CASE1", "report.txt", "LOW")
    assert os.path.exists("reports/index.json")
