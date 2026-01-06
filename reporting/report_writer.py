# reporting/report_writer.py

import os
from datetime import datetime, timezone
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm
from collections import defaultdict

OUTPUT_DIR = "reports"

def _ensure_output_dir():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

def _ts():
    return datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")

def _base(case_id):
    return f"{OUTPUT_DIR}/{case_id}_{_ts()}"

def WriteTXTReport(case_id, narrative, intensity, hash_summary=None):
    _ensure_output_dir()

    path = f"{_base(case_id)}_{intensity}.txt"
    with open(path, "w", encoding="utf-8") as f:
        f.write(narrative)

        if hash_summary:
            f.write("\n\nHASH SUMMARY\n")
            for h in hash_summary:
                f.write(f"{h}\n")

    return path

def group_by_ip(triaged):
    groups = defaultdict(list)
    for a in triaged:
        for i in a.get("metadata", {}).get("interpretation", []):
            if "IP" in i:
                ip = i.split("IP ")[1].split()[0]
                groups[ip].append(a)
    return groups


def WritePDFReport(case_id, narrative, triaged_artifacts):
    _ensure_output_dir()

    path = f"{_base(case_id)}_full.pdf"
    c = canvas.Canvas(path, pagesize=A4)
    width, height = A4

    # Title
    c.setFont("Helvetica-Bold", 16)
    c.drawString(2*cm, height-2*cm, "DFIR-AI Forensic Report")

    y = height-3*cm
    c.setFont("Helvetica", 10)

    # Narrative
    c.drawString(2*cm, y, "Narrative Summary")
    y -= 0.5*cm
    for line in narrative.split("\n"):
        if y < 2*cm:
            c.showPage()
            y = height-2*cm
        c.drawString(2*cm, y, line[:110])
        y -= 0.4*cm

    # Timeline
    c.showPage()
    c.setFont("Helvetica-Bold", 12)
    c.drawString(2*cm, height-2*cm, "Event Timeline")
    y = height-3*cm
    c.setFont("Helvetica", 10)

    for a in sorted(triaged_artifacts, key=lambda x: x.get("artifact_timestamp", "")):
        line = f"{a.get('artifact_timestamp')} - {a.get('content_summary')}"
        if y < 2*cm:
            c.showPage()
            y = height-2*cm
        c.drawString(2*cm, y, line[:110])
        y -= 0.4*cm

    # Hash Summary
    c.showPage()
    c.setFont("Helvetica-Bold", 12)
    c.drawString(2*cm, height-2*cm, "Hash Summary")
    y = height-3*cm
    c.setFont("Helvetica", 10)

    for a in triaged_artifacts:
        for h in (a.get("md5"), a.get("sha1"), a.get("sha256")):
            if h:
                if y < 2*cm:
                    c.showPage()
                    y = height-2*cm
                c.drawString(2*cm, y, h)
                y -= 0.4*cm

    c.save()
    return path
