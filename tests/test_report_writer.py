from reporting.report_writer import WriteTXTReport

def test_txt_report_creation(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    path = WriteTXTReport("CASE1", "test narrative", "summary", ["abc"])
    assert path.endswith("summary.txt")
