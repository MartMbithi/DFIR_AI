# reporting/report_writer.py

import os
from datetime import datetime, timezone
from collections import defaultdict, Counter

from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak
)
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

OUTPUT_DIR = "reports"
FONT_DIR = "reporting/fonts"
FONT_NAME = "Consolas"

# -------------------------
# Font handling
# -------------------------

def _register_font():
    font_path = os.path.join(FONT_DIR, "Jost.ttf")
    if os.path.exists(font_path):
        pdfmetrics.registerFont(TTFont(FONT_NAME, font_path))
        return FONT_NAME
    return "Courier"  # Safe monospace fallback

# -------------------------
# Helpers
# -------------------------

def _ensure_output_dir():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

def _ts():
    return datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")

def _base(case_id):
    return f"{OUTPUT_DIR}/{case_id}_{_ts()}"

# -------------------------
# TXT REPORT (unchanged)
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
# PDF REPORT (JUSTIFIED, DOUBLE-SPACED)
# -------------------------

def WritePDFReport(case_id, narrative, triaged):
    _ensure_output_dir()
    font = _register_font()

    path = f"{_base(case_id)}_full.pdf"

    doc = SimpleDocTemplate(
        path,
        pagesize=A4,
        rightMargin=2.2 * cm,
        leftMargin=2.2 * cm,
        topMargin=2.5 * cm,
        bottomMargin=2.5 * cm
    )

    styles = {
        "title": ParagraphStyle(
            name="Title",
            fontName=font,
            fontSize=18,
            spaceAfter=20
        ),
        "header": ParagraphStyle(
            name="Header",
            fontName=font,
            fontSize=13,
            spaceBefore=18,
            spaceAfter=12
        ),
        "body": ParagraphStyle(
            name="Body",
            fontName=font,
            fontSize=10.5,
            leading=21,  # double spacing
            alignment=TA_LEFT,
            spaceAfter=12
        ),
        "mono": ParagraphStyle(
            name="Mono",
            fontName=font,
            fontSize=9.5,
            leading=19,
            alignment=TA_LEFT,
            spaceAfter=8
        )
    }

    story = []

    # -------------------------
    # COVER
    # -------------------------

    story.append(Paragraph("Digital Forensic Incident Report", styles["title"]))
    story.append(Paragraph(f"<b>Case ID:</b> {case_id}", styles["body"]))
    story.append(Paragraph(
        f"<b>Generated:</b> {datetime.now(timezone.utc)} UTC<br/>"
        f"<b>Engine:</b> DFIR-AI Hybrid (Deterministic + Semantic)",
        styles["body"]
    ))
    story.append(Spacer(1, 40))
    story.append(Paragraph(
        "<i>CONFIDENTIAL – Authorized Personnel Only</i>",
        styles["mono"]
    ))
    story.append(PageBreak())

    # -------------------------
    # EXECUTIVE SUMMARY
    # -------------------------

    story.append(Paragraph("1. Executive Summary", styles["header"]))
    story.append(Paragraph(narrative, styles["body"]))

    # -------------------------
    # METRICS
    # -------------------------

    story.append(Paragraph("2. Incident Metrics Overview", styles["header"]))

    attack_counts = Counter()
    for a in triaged:
        for k in ["SQL_INJECTION", "LFI", "WAF_CORRELATION", "PROTOCOL_ABUSE", "ACCESS_DENIED"]:
            if k in a.get("content_summary", ""):
                attack_counts[k] += 1

    metrics_text = [
        f"Total forensic artifacts analyzed: {len(triaged)}.",
        f"Unique source IP addresses observed: {len(set(_extract_ips(triaged)))}."
    ]

    for k, v in attack_counts.items():
        metrics_text.append(f"{k.replace('_',' ').title()} events observed: {v}.")

    story.append(Paragraph(" ".join(metrics_text), styles["body"]))

    # -------------------------
    # SOURCE IP ANALYSIS
    # -------------------------

    story.append(Paragraph("3. Source IP Behavioral Analysis", styles["header"]))

    ip_groups = _group_by_ip(triaged)

    for ip, artifacts in ip_groups.items():
        story.append(Paragraph(f"<b>Source IP:</b> {ip}", styles["body"]))

        summaries = Counter(a.get("content_summary") for a in artifacts)
        lines = [
            f"{summary} ({count} occurrences)."
            for summary, count in summaries.items()
        ]
        story.append(Paragraph(" ".join(lines), styles["body"]))

    # -------------------------
    # TIMELINE TABLE
    # -------------------------

    story.append(PageBreak())
    story.append(Paragraph("4. Chronological Event Timeline", styles["header"]))

    timeline_rows = [["Timestamp (UTC)", "Event Description"]]

    for a in sorted(triaged, key=lambda x: x.get("artifact_timestamp")):
        timeline_rows.append([
            str(a.get("artifact_timestamp")),
            a.get("content_summary")
        ])

    table = Table(
        timeline_rows,
        colWidths=[6 * cm, 10.5 * cm],
        repeatRows=1
    )

    table.setStyle(TableStyle([
        ("FONT", (0, 0), (-1, -1), font),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("BACKGROUND", (0, 0), (-1, 0), colors.lightgrey),
        ("GRID", (0, 0), (-1, -1), 0.25, colors.grey),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
    ]))

    story.append(table)

    # -------------------------
    # HASH ANALYSIS
    # -------------------------

    story.append(PageBreak())
    story.append(Paragraph("5. Hash & Payload Analysis", styles["header"]))

    story.append(Paragraph(
        "No cryptographic file hashes (MD5, SHA1, SHA256) were observed during analysis. "
        "All artifacts represent network-layer or application-layer security events. "
        "No payload delivery, file execution, or persistence mechanisms were confirmed.",
        styles["body"]
    ))

    # -------------------------
    # LIMITATIONS
    # -------------------------

    story.append(Paragraph("6. Confidence & Limitations", styles["header"]))
    story.append(Paragraph(
        "This assessment is based exclusively on provided web and access log data. "
        "No endpoint telemetry, memory artifacts, or file system evidence was available. "
        "Severity scoring was derived using deterministic rules combined with semantic similarity analysis.",
        styles["body"]
    ))

    doc.build(story)
    return path

# -------------------------
# Internal helpers
# -------------------------

def _extract_ips(triaged):
    ips = set()
    for a in triaged:
        for i in a.get("metadata", {}).get("interpretation", []):
            if "IP " in i:
                ips.add(i.split("IP ")[1].split()[0])
    return ips

def _group_by_ip(triaged):
    groups = defaultdict(list)
    for a in triaged:
        for i in a.get("metadata", {}).get("interpretation", []):
            if "IP " in i:
                ip = i.split("IP ")[1].split()[0]
                groups[ip].append(a)
    return groups
