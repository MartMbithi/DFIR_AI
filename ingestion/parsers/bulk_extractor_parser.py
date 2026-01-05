def ParseBulkExtractor(feature_file):
    records = []
    with open(feature_file, encoding='utf-8', errors='ignore') as f:
        for line in f:
            if line.startswith('#'):
                continue
            parts = line.strip().split('\t')
            if len(parts) < 2:
                continue
            records.append({
                "artifact_type": "keyword",
                "source_file": feature_file,
                "host_id": None,
                "user": None,
                "timestamp": None,
                "path": None,
                "summary": parts[1],
                "content": line.strip(),
                "md5": None,
                "sha1": None,
                "sha256": None,
                "metadata": {}
            })
    return records
