# reporting/report_writer.py

import os
from datetime import datetime, timezone
from collections import defaultdict, Counter

from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from reportlab.lib import colors

OUTPUT_DIR = "reports"

# -------------------------
# Helpers
# -------------------------

def _ensure_output_dir():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

def _ts():
    return datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")

def _base(case_id):
    return f"{OUTPUT_DIR}/{case_id}_{_ts()}"

def _new_page(c):
    c.showPage()
    return A4[1] - 2 * cm

def _section(c, title, y):
    if y < 3 * cm:
        y = _new_page(c)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(2 * cm, y, title)
    y -= 0.2 * cm
    c.setStrokeColor(colors.grey)
    c.line(2 * cm, y, 19 * cm, y)
    y -= 0.6 * cm
    return y

def _paragraph(c, text, y, size=10):
    c.setFont("Helvetica", size)
    for line in text.split("\n"):
        if y < 2.5 * cm:
            y = _new_page(c)
            c.setFont("Helvetica", size)
        c.drawString(2 * cm, y, line[:110])
        y -= 0.45 * cm
    return y

def _bullet(c, text, y):
    return _paragraph(c, f"- {text}", y)

# -------------------------
# TXT REPORT (unchanged, but safer)
# -------------------------

def WriteTXTReport(case_id, narrative, intensity, triaged=None):
    _ensure_output_dir()
    path = f"{_base(case_id)}_{intensity}.txt"

    with open(path, "w", encoding="utf-8") as f:
        f.write(narrative)
        if triaged:
            f.write("\n\n=== ARTIFACT SUMMARY ===\n")
            for a in triaged:
                f.write(f"{a.get('artifact_timestamp')} | {a.get('content_summary')}\n")

    return path

# -------------------------
# PDF REPORT (FULL REFACTOR)
# -------------------------

def WritePDFReport(case_id, narrative, triaged):
    _ensure_output_dir()
    path = f"{_base(case_id)}_full.pdf"

    c = canvas.Canvas(path, pagesize=A4)
    width, height = A4

    # -------------------------
    # COVER PAGE
    # -------------------------

    c.setFont("Helvetica-Bold", 20)
    c.drawString(2 * cm, height - 3 * cm, "Digital Forensic Incident Report")

    c.setFont("Helvetica", 12)
    c.drawString(2 * cm, height - 4.2 * cm, f"Case ID: {case_id}")
    c.drawString(2 * cm, height - 5.0 * cm, "Engine: DFIR-AI Hybrid (Deterministic + Semantic)")
    c.drawString(2 * cm, height - 5.8 * cm, f"Generated: {datetime.now(timezone.utc)} UTC")

    c.setFont("Helvetica-Oblique", 10)
    c.drawString(2 * cm, height - 7.5 * cm, "CONFIDENTIAL – FOR AUTHORIZED USE ONLY")

    c.showPage()

    y = height - 2 * cm

    # -------------------------
    # EXECUTIVE SUMMARY
    # -------------------------

    y = _section(c, "1. Executive Summary", y)
    y = _paragraph(c, narrative, y)

    # -------------------------
    # METRICS OVERVIEW
    # -------------------------

    y = _section(c, "2. Incident Metrics Overview", y)

    event_types = Counter(a.get("artifact_type") for a in triaged)
    attack_labels = Counter()

    for a in triaged:
        summary = a.get("content_summary", "")
        for key in ["SQL_INJECTION", "LFI", "WAF_CORRELATION", "PROTOCOL_ABUSE", "ACCESS_DENIED"]:
            if key in summary:
                attack_labels[key] += 1

    y = _bullet(c, f"Total forensic artifacts analyzed: {len(triaged)}", y)
    y = _bullet(c, f"Unique artifact types: {len(event_types)}", y)

    for k, v in attack_labels.items():
        y = _bullet(c, f"{k.replace('_', ' ').title()} events observed: {v}", y)

    # -------------------------
    # ATTACK VECTOR ANALYSIS
    # -------------------------

    y = _section(c, "3. Attack Vector Analysis", y)

    for attack, count in attack_labels.items():
        y = _bullet(
            c,
            f"{attack.replace('_', ' ').title()} — {count} correlated events indicating automated probing or exploitation attempts.",
            y
        )

    # -------------------------
    # SOURCE IP BEHAVIOR
    # -------------------------

    y = _section(c, "4. Source IP Behavioral Analysis", y)

    ip_groups = defaultdict(list)
    for a in triaged:
        for i in a.get("metadata", {}).get("interpretation", []):
            if "IP " in i:
                ip = i.split("IP ")[1].split()[0]
                ip_groups[ip].append(a)

    for ip, artifacts in ip_groups.items():
        if y < 4 * cm:
            y = _new_page(c)

        c.setFont("Helvetica-Bold", 11)
        c.drawString(2 * cm, y, f"Source IP: {ip}")
        y -= 0.5 * cm

        summaries = Counter(a.get("content_summary") for a in artifacts)
        y = _bullet(c, f"Total events: {len(artifacts)}", y)

        for s, cnt in summaries.items():
            y = _bullet(c, f"{s} ({cnt} occurrences)", y)

        y -= 0.3 * cm

    # -------------------------
    # TIMELINE
    # -------------------------

    y = _section(c, "5. Chronological Event Timeline", y)

    for a in sorted(triaged, key=lambda x: x.get("artifact_timestamp")):
        line = f"{a.get('artifact_timestamp')} — {a.get('content_summary')}"
        y = _paragraph(c, line, y, size=9)

    # -------------------------
    # HASH & PAYLOAD ANALYSIS
    # -------------------------

    y = _section(c, "6. Hash & Payload Analysis", y)

    hashes_present = any(a.get("md5") or a.get("sha1") or a.get("sha256") for a in triaged)

    if not hashes_present:
        y = _paragraph(
            c,
            "No file hashes (MD5, SHA1, SHA256) were observed. "
            "All artifacts represent network-layer or application-layer events. "
            "No payload delivery or file execution was confirmed.",
            y
        )

    # -------------------------
    # CONFIDENCE & LIMITATIONS
    # -------------------------

    y = _section(c, "7. Confidence & Limitations", y)
    y = _bullet(c, "Scoring derived from deterministic rules combined with semantic similarity.", y)
    y = _bullet(c, "Analysis limited to provided server access logs.", y)
    y = _bullet(c, "No endpoint telemetry, memory, or file system artifacts were available.", y)

    c.save()
    return path
