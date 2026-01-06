
import os
from datetime import datetime, timezone
from collections import Counter

from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
)
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from intelligence.case_intelligence import generate_case_intelligence

OUTPUT_DIR = "reports"
FONT_DIR = "reporting/fonts"
FONT_NAME = "Jost"

def _register_font():
    font_path = os.path.join(FONT_DIR, "Jost.ttf")
    if os.path.exists(font_path):
        pdfmetrics.registerFont(TTFont(FONT_NAME, font_path))
        return FONT_NAME
    return "Courier"

def _ensure_output_dir():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

def _ts():
    return datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")

def _base(case_id):
    return f"{OUTPUT_DIR}/{case_id}_{_ts()}"

# -------------------------
# TXT REPORT (STABLE CONTRACT)
# -------------------------
def WriteTXTReport(case_id, narrative, intensity, triaged=None):
    _ensure_output_dir()
    path = f"{_base(case_id)}_{intensity}.txt"

    with open(path, "w", encoding="utf-8") as f:
        f.write(narrative)
        if triaged:
            f.write("\n\n=== ARTIFACT SUMMARY ===\n")
            for a in triaged:
                ts = a.get("artifact_timestamp", "N/A")
                summary = a.get("content_summary", "N/A")
                f.write(f"{ts} | {summary}\n")

    return path

# -------------------------
# FULL DFIR PDF REPORT
# -------------------------
def WritePDFReport(case_id, narrative, triaged):
    _ensure_output_dir()
    font = _register_font()
    intel = generate_case_intelligence(case_id, triaged)

    path = f"{_base(case_id)}_dfir_full_report.pdf"

    doc = SimpleDocTemplate(
        path,
        pagesize=A4,
        rightMargin=2.2 * cm,
        leftMargin=2.2 * cm,
        topMargin=2.5 * cm,
        bottomMargin=2.5 * cm
    )

    styles = {
        "title": ParagraphStyle("Title", fontName=font, fontSize=18, spaceAfter=20),
        "header": ParagraphStyle("Header", fontName=font, fontSize=13, spaceBefore=18, spaceAfter=12),
        "body": ParagraphStyle("Body", fontName=font, fontSize=10.5, leading=21, alignment=TA_LEFT, spaceAfter=12),
        "mono": ParagraphStyle("Mono", fontName=font, fontSize=9, leading=16, alignment=TA_LEFT, spaceAfter=6),
    }

    story = []

    # Cover
    story.append(Paragraph("Digital Forensic Incident Report", styles["title"]))
    story.append(Paragraph(f"<b>Case ID:</b> {case_id}", styles["body"]))
    story.append(Paragraph(f"<b>Generated:</b> {datetime.now(timezone.utc)} UTC", styles["body"]))
    story.append(PageBreak())

    # Executive Summary
    story.append(Paragraph("1. Executive Summary", styles["header"]))
    story.append(Paragraph(narrative, styles["body"]))
    story.append(PageBreak())

    # Timeline
    story.append(Paragraph("2. Chronological Event Timeline", styles["header"]))
    timeline_rows = [["Timestamp (UTC)", "Artifact Summary"]]
    for a in sorted(triaged, key=lambda x: x.get("artifact_timestamp") or ""):
        timeline_rows.append([
            str(a.get("artifact_timestamp", "N/A")),
            a.get("content_summary", "N/A")
        ])

    timeline_table = Table(timeline_rows, colWidths=[5 * cm, 11 * cm], repeatRows=1)
    timeline_table.setStyle(TableStyle([
        ("FONT",(0,0),(-1,-1),font),
        ("FONTSIZE",(0,0),(-1,-1),9),
        ("BACKGROUND",(0,0),(-1,0),colors.lightgrey),
        ("GRID",(0,0),(-1,-1),0.25,colors.grey),
        ("VALIGN",(0,0),(-1,-1),"TOP"),
    ]))
    story.append(timeline_table)
    story.append(PageBreak())

    # Intelligence
    story.append(Paragraph("3. Case Intelligence", styles["header"]))
    channel_rows = [["Attack Channel", "Observed"]]
    for ch, val in intel["attack_channels"].items():
        channel_rows.append([ch.title(), "Yes" if val else "No"])

    story.append(Table(channel_rows, colWidths=[8 * cm, 8 * cm],
        style=[("GRID",(0,0),(-1,-1),0.25,colors.grey),
               ("BACKGROUND",(0,0),(-1,0),colors.lightgrey)]
    ))

    doc.build(story)
    return path
