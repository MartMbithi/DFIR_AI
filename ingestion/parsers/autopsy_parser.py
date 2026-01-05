import csv

def ParseAutopsyCsv(file_path):
    records = []
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            records.append({
                "artifact_type": "file",
                "source_file": file_path,
                "host_id": row.get("Host"),
                "user": row.get("User"),
                "timestamp": row.get("Modified Time"),
                "path": row.get("Path"),
                "summary": row.get("Name"),
                "content": None,
                "md5": row.get("MD5"),
                "sha1": row.get("SHA1"),
                "sha256": row.get("SHA256"),
                "metadata": {"file_size": row.get("Size")}
            })
    return records
