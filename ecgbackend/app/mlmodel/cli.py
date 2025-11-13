"""Command-line entry for analyzing ECG images and saving reports.

This is a clean replacement CLI that avoids touching the existing
`analyze_and_save.py` file (which became corrupted during edits). Run it as:

    python -m mlmodel.cli path/to/image --mock --outdir ../reports
"""
from __future__ import annotations

import argparse
from pathlib import Path
import sys

from utils.analysis_mapper import get_analysis


def analyze_image_file(image_path: Path, mock: bool = False):
    if not image_path.exists():
        raise FileNotFoundError(image_path)

    with image_path.open("rb") as f:
        _ = f.read()

    if mock:
        # Make a deterministic mock using file name hash for reproducibility
        import hashlib

        h = hashlib.sha256(str(image_path).encode()).digest()[0]
        labels = [
            "Left Bundle Branch Block",
            "Normal",
            "Premature Atrial Contraction",
            "Premature Ventricular Contractions",
            "Right Bundle Branch Block",
            "Ventricular Fibrillation",
        ]
        predicted = labels[h % len(labels)]
    else:
        from .preprocess import preprocess_image
        from .model_loader import predict_class

        with image_path.open("rb") as f:
            img_bytes = f.read()
        img_array = preprocess_image(img_bytes)
        predicted = predict_class(img_array)

    analysis = get_analysis(predicted)
    return {
        "input_file": str(image_path),
        "predicted_class": predicted,
        "analysis": analysis,
    }


def main(argv=None):
    parser = argparse.ArgumentParser()
    parser.add_argument("image", type=Path)
    parser.add_argument("--outdir", type=Path, default=Path("../reports"))
    parser.add_argument("--mock", action="store_true")
    parser.add_argument("--prefix", type=str, default=None)
    args = parser.parse_args(argv)

    report = analyze_image_file(args.image, mock=args.mock)

    # Defer import to avoid circular issues at package import
    from utils.report_writer import save_report

    out = save_report(report, args.outdir, prefix=args.prefix)
    print(f"Report saved: {out}")


if __name__ == "__main__":
    raise SystemExit(main())
