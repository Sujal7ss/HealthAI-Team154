"""Utilities for writing analysis reports to disk.

This centralizes report saving so both the CLI and API can reuse the same
behavior without duplicating code.
"""
from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path
from typing import Dict


def save_report(report: Dict, outdir: Path | str = Path("../reports"), prefix: str | None = None) -> Path:
    outdir = Path(outdir)
    outdir.mkdir(parents=True, exist_ok=True)
    ts = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    base = prefix or "ecg_report"
    filename = f"{base}_{ts}.json"
    out_path = outdir / filename
    with out_path.open("w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=2)
    return out_path
