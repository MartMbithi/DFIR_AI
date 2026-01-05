CREATE DATABASE IF NOT EXISTS dfir_ai;
USE dfir_ai;

CREATE TABLE IF NOT EXISTS forensic_artifacts (
    artifact_id CHAR(36) PRIMARY KEY,
    case_id VARCHAR(100) NOT NULL,
    artifact_type VARCHAR(50),
    source_tool VARCHAR(50),
    source_file TEXT,
    host_id VARCHAR(100),
    user_context VARCHAR(100),
    artifact_timestamp DATETIME NULL,
    artifact_path TEXT,
    content_summary TEXT,
    raw_content LONGTEXT,
    md5 CHAR(32),
    sha1 CHAR(40),
    sha256 CHAR(64),
    metadata JSON,
    ingested_at DATETIME NOT NULL
);
