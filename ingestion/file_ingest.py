import os
from ingestion.parsers.autopsy_parser import ParseAutopsyCsv
from ingestion.parsers.bulk_extractor_parser import ParseBulkExtractor
from ingestion.parsers.os_log_parser import ParseOSLogs

def DiscoverAndParseRawFiles(raw_dir="data/raw"):
    artifacts = []
    for root, _, files in os.walk(raw_dir):
        for file in files:
            path = os.path.join(root, file)
            if file.lower().endswith(".csv"):
                artifacts.extend(ParseAutopsyCsv(path))
            elif file.lower().endswith(".txt"):
                artifacts.extend(ParseBulkExtractor(path))
            elif file.lower().endswith(".log"):
                artifacts.extend(ParseOSLogs(path))
    return artifacts
