from ingestion.parsers.autopsy_parser import ParseAutopsyCsv
from ingestion.normalizer import NormalizeArtifact
from storage.artifact_store import ArtifactStore

def RunAutopsyIngestion(csv_path, case_id):
    store = ArtifactStore('localhost', 'root', '', 'dfir_ai')
    raw_records = ParseAutopsyCsv(csv_path)
    for record in raw_records:
        artifact = NormalizeArtifact(record, 'autopsy', case_id)
        store.InsertArtifact(artifact)

if __name__ == '__main__':
    RunAutopsyIngestion('data/raw/autopsy_export.csv', 'CASE-001')
