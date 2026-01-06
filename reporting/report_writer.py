
import os
from datetime import datetime, timezone
from collections import Counter

from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
)
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

from reporting.report_utils import rollup_mitre_tactics, per_ip_geo_profile

OUTPUT_DIR = "reports"
FONT_DIR = "reporting/fonts"
FONT_NAME = "Consolas"

MITRE_ATTACK_MAP = {
    "SQL_INJECTION": ("T1190", "Exploit Public-Facing Application"),
    "LFI": ("T1005", "Data from Local System"),
    "WAF_CORRELATION": ("T1046", "Network Service Discovery"),
    "PROTOCOL_ABUSE": ("T1048", "Exfiltration Over Alternative Protocol"),
    "ACCESS_DENIED": ("T1110", "Brute Force")
}

def _register_font():
    font_path = os.path.join(FONT_DIR, "Consolas.ttf")
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

def WritePDFReport(case_id, narrative, triaged):
    _ensure_output_dir()
    font = _register_font()
    path = f"{_base(case_id)}_dfir_report.pdf"

    doc = SimpleDocTemplate(
        path, pagesize=A4,
        rightMargin=2.2*cm, leftMargin=2.2*cm,
        topMargin=2.5*cm, bottomMargin=2.5*cm
    )

    styles = {
        "title": ParagraphStyle("Title", fontName=font, fontSize=18, spaceAfter=24),
        "header": ParagraphStyle("Header", fontName=font, fontSize=13, spaceBefore=18, spaceAfter=12),
        "body": ParagraphStyle("Body", fontName=font, fontSize=10.5, leading=21, alignment=TA_LEFT, spaceAfter=12),
        "center": ParagraphStyle("Center", fontName=font, fontSize=11, alignment=TA_CENTER, spaceAfter=10),
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

    # MITRE Mapping + Tactic Rollup
    story.append(PageBreak())
    story.append(Paragraph("2. MITRE ATT&CK Mapping & Tactic Rollup", styles["header"]))

    mitre_rows = [["Indicator", "Technique ID", "Technique Name"]]
    for a in triaged:
        for k,(tid,name) in MITRE_ATTACK_MAP.items():
            if k in a.get("content_summary",""):
                mitre_rows.append([k, tid, name])

    story.append(_styled_table(mitre_rows, font))

    tactic_counts = rollup_mitre_tactics(mitre_rows[1:])
    tactic_rows = [["ATT&CK Tactic", "Observed Events"]]
    for t,c in tactic_counts.items():
        tactic_rows.append([t,c])
    story.append(Spacer(1,12))
    story.append(_styled_table(tactic_rows, font))

    # Severity Heat Bars (visual)
    story.append(PageBreak())
    story.append(Paragraph("3. Severity Heat Visualization", styles["header"]))
    heat = Counter(a.get("severity","LOW") for a in triaged)
    heat_rows = [
        ["Severity","Count",""],
    ]
    for lvl,color in [("HIGH",colors.red),("MEDIUM",colors.orange),("LOW",colors.green)]:
        heat_rows.append([lvl, heat.get(lvl,0), ""])

    heat_table = Table(heat_rows, colWidths=[4*cm,4*cm,8*cm])
    heat_table.setStyle(TableStyle([
        ("FONT",(0,0),(-1,-1),font),
        ("GRID",(0,0),(-1,-1),0.25,colors.grey),
        ("BACKGROUND",(0,0),(-1,0),colors.lightgrey),
        ("BACKGROUND",(2,1),(2,1),colors.red),
        ("BACKGROUND",(2,2),(2,2),colors.orange),
        ("BACKGROUND",(2,3),(2,3),colors.green),
    ]))
    story.append(heat_table)

    # Per-IP Geo Behavioral Profiles
    story.append(PageBreak())
    story.append(Paragraph("4. Per-IP Geo-Behavioral Profiles", styles["header"]))
    profiles = per_ip_geo_profile(triaged)
    rows = [["Source IP","Events","Countries","Severity Mix"]]
    for ip,data in profiles.items():
        rows.append([
            ip,
            data["events"],
            ", ".join(f"{c}:{n}" for c,n in data["countries"].items()),
            ", ".join(f"{s}:{n}" for s,n in data["severities"].items())
        ])
    story.append(_styled_table(rows, font))

    doc.build(story)
    return path

def _styled_table(rows, font):
    table = Table(rows, repeatRows=1)
    table.setStyle(TableStyle([
        ("FONT",(0,0),(-1,-1),font),
        ("FONTSIZE",(0,0),(-1,-1),9),
        ("GRID",(0,0),(-1,-1),0.25,colors.grey),
        ("BACKGROUND",(0,0),(-1,0),colors.lightgrey),
        ("VALIGN",(0,0),(-1,-1),"TOP"),
        ("BOTTOMPADDING",(0,0),(-1,-1),8),
    ]))
    return table
