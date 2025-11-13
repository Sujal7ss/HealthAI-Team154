"""CLI tool to analyze an ECG image with the project's ML model and save a report.

Run from the `ecgbackend/app` directory as:

    python -m mlmodel.analyze_and_save path/to/ecg_image.png --outdir ../reports

The script uses the package's preprocessing and model loader, then maps the
predicted class to a human-friendly analysis (via `utils.analysis_mapper`) and
saves a timestamped JSON report.
"""
from __future__ import annotations

import argparse
from datetime import datetime
from pathlib import Path
import sys
import random

# Only import the analysis mapper at module import time (it's pure Python and
# safe). Defer importing model and PIL-based preprocess until needed so the
# script can run in --mock mode on systems without TensorFlow/Pillow.
from utils.analysis_mapper import get_analysis


def analyze_image_file(image_path: Path, mock: bool = False) -> dict:
    """Run preprocessing + prediction + analysis mapping and return report dict."""
    if not image_path.exists():
        raise FileNotFoundError(f"Input file not found: {image_path}")

    # Read the file only for bookkeeping; in mock mode we won't preprocess it
    # (preprocessing requires Pillow). This lets the CLI be used even when the
    # real model or PIL aren't installed.
    with image_path.open("rb") as f:
        _image_bytes = f.read()

    if mock:
        # Pick a likely class from the analysis mapper keys.
        possible = list(get_analysis.__globals__.get('risk_map', {}).keys())
        # Fallback to known labels if mapper internals change
        if not possible:
            possible = [
                "Left Bundle Branch Block",
                "Normal",
                "Premature Atrial Contraction",
                "Premature Ventricular Contractions",
                "Right Bundle Branch Block",
                "Ventricular Fibrillation",
            ]
        predicted_class = random.choice(possible)
    else:
        # Import heavy dependencies only when actually running real prediction
        from .preprocess import preprocess_image
        from .model_loader import predict_class

        img_array = preprocess_image(_image_bytes)
        predicted_class = predict_class(img_array)

    analysis = get_analysis(predicted_class)

    report = {
        "input_file": str(image_path),
        "predicted_class": predicted_class,
        "analysis": analysis,
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }
    return report


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Analyze ECG image and save JSON report")
    parser.add_argument("image", type=Path, help="Path to ECG image file (PNG/JPEG)")
    parser.add_argument("--outdir", type=Path, default=Path("../reports"), help="Directory to save reports")
    parser.add_argument("--mock", action="store_true", help="Run in mock mode (no TensorFlow/Pillow required)")
    parser.add_argument("--prefix", type=str, default=None, help="Filename prefix for the report")
    args = parser.parse_args(argv)

    try:
        report = analyze_image_file(args.image, mock=args.mock)
    except Exception as e:
        print(f"Error analyzing image: {e}", file=sys.stderr)
        return 2

    try:
        # Use central report writer utility
        from utils.report_writer import save_report as save_report_util

        out_path = save_report_util(report, args.outdir, prefix=args.prefix)

    except Exception as e:
        print(f"Error saving report: {e}", file=sys.stderr)
        return 3

    print(f"Report saved: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
"""CLI tool to analyze an ECG image with the project's ML model and save a report.

Run from the `ecgbackend/app` directory as:

    python -m mlmodel.analyze_and_save path/to/ecg_image.png --outdir ../reports

The script uses the package's preprocessing and model loader, then maps the
predicted class to a human-friendly analysis (via `utils.analysis_mapper`) and
saves a timestamped JSON report.
"""
from __future__ import annotations

import argparse
import json
from datetime import datetime
from pathlib import Path
import sys
import random

# Only import the analysis mapper at module import time (it's pure Python and
# safe). Defer importing model and PIL-based preprocess until needed so the
# script can run in --mock mode on systems without TensorFlow/Pillow.
from utils.analysis_mapper import get_analysis


def analyze_image_file(image_path: Path, mock: bool = False) -> dict:
    """Run preprocessing + prediction + analysis mapping and return report dict."""
    if not image_path.exists():
        raise FileNotFoundError(f"Input file not found: {image_path}")
    # Read the file only for bookkeeping; in mock mode we won't preprocess it
    # (preprocessing requires Pillow). This lets the CLI be used even when the
    # real model or PIL aren't installed.
    with image_path.open("rb") as f:
        _image_bytes = f.read()

    if mock:
        # Pick a likely class from the analysis mapper keys.
        possible = list(get_analysis.__globals__.get('risk_map', {}).keys())
        # Fallback to known labels if mapper internals change
        if not possible:
            possible = [
                "Left Bundle Branch Block",
                "Normal",
                "Premature Atrial Contraction",
                "Premature Ventricular Contractions",
                "Right Bundle Branch Block",
                "Ventricular Fibrillation",
            ]
        predicted_class = random.choice(possible)
    else:
        # Import heavy dependencies only when actually running real prediction
        from .preprocess import preprocess_image
        from .model_loader import predict_class

        img_array = preprocess_image(_image_bytes)
        predicted_class = predict_class(img_array)
    analysis = get_analysis(predicted_class)

    report = {
        "input_file": str(image_path),
        "predicted_class": predicted_class,
        "analysis": analysis,
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }
    return report


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Analyze ECG image and save JSON report")
    parser.add_argument("image", type=Path, help="Path to ECG image file (PNG/JPEG)")
    parser.add_argument("--outdir", type=Path, default=Path("../reports"), help="Directory to save reports")
    parser.add_argument("--mock", action="store_true", help="Run in mock mode (no TensorFlow/Pillow required)")
    parser.add_argument("--prefix", type=str, default=None, help="Filename prefix for the report")
    args = parser.parse_args(argv)

    try:
        report = analyze_image_file(args.image, mock=args.mock)
    except Exception as e:
        print(f"Error analyzing image: {e}", file=sys.stderr)
        return 2

    try:
        # Use central report writer utility
        from utils.report_writer import save_report as save_report_util

        out_path = save_report_util(report, args.outdir, prefix=args.prefix)

    except Exception as e:
        print(f"Error saving report: {e}", file=sys.stderr)
        return 3

    print(f"Report saved: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
"""CLI tool to analyze an ECG image with the project's ML model and save a report.
    try:
        report = analyze_image_file(args.image, mock=args.mock)

    python -m mlmodel.analyze_and_save path/to/ecg_image.png --outdir ../reports


    try:
        # Use central report writer utility
        from utils.report_writer import save_report as save_report_util

        out_path = save_report_util(report, args.outdir, prefix=args.prefix)

    except Exception as e:
        print(f"Error saving report: {e}", file=sys.stderr)
        return 3
import json
from datetime import datetime
from pathlib import Path
import sys
import random

# Only import the analysis mapper at module import time (it's pure Python and
# safe). Defer importing model and PIL-based preprocess until needed so the
# script can run in --mock mode on systems without TensorFlow/Pillow.
from utils.analysis_mapper import get_analysis


def analyze_image_file(image_path: Path, mock: bool = False) -> dict:
    """Run preprocessing + prediction + analysis mapping and return report dict."""
    if not image_path.exists():
        raise FileNotFoundError(f"Input file not found: {image_path}")
    # Read the file only for bookkeeping; in mock mode we won't preprocess it
    # (preprocessing requires Pillow). This lets the CLI be used even when the
    # real model or PIL aren't installed.
    with image_path.open("rb") as f:
        _image_bytes = f.read()

    if mock:
        # Pick a likely class from the analysis mapper keys.
        possible = list(get_analysis.__globals__.get('risk_map', {}).keys())
        # Fallback to known labels if mapper internals change
        if not possible:
            possible = [
                "Left Bundle Branch Block",
                "Normal",
                "Premature Atrial Contraction",
                "Premature Ventricular Contractions",
                "Right Bundle Branch Block",
                "Ventricular Fibrillation",
            ]
        predicted_class = random.choice(possible)
    else:
        # Import heavy dependencies only when actually running real prediction
        from .preprocess import preprocess_image
        from .model_loader import predict_class

        img_array = preprocess_image(_image_bytes)
        predicted_class = predict_class(img_array)
    analysis = get_analysis(predicted_class)

    report = {
        "input_file": str(image_path),
        "predicted_class": predicted_class,
        "analysis": analysis,
        "generated_at": datetime.utcnow().isoformat() + "Z",
    }
    return report


def save_report(report: dict, outdir: Path, prefix: str | None = None) -> Path:
    outdir.mkdir(parents=True, exist_ok=True)
    ts = datetime.utcnow().strftime("%Y%m%dT%H%M%SZ")
    base = prefix or "ecg_report"
    filename = f"{base}_{ts}.json"
    out_path = outdir / filename
    with out_path.open("w", encoding="utf-8") as fh:
        json.dump(report, fh, indent=2)
    return out_path


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Analyze ECG image and save JSON report")
    parser.add_argument("image", type=Path, help="Path to ECG image file (PNG/JPEG)")
    parser.add_argument("--outdir", type=Path, default=Path("../reports"), help="Directory to save reports")
    parser.add_argument("--mock", action="store_true", help="Run in mock mode (no TensorFlow/Pillow required)")
    parser.add_argument("--prefix", type=str, default=None, help="Filename prefix for the report")
    args = parser.parse_args(argv)

    try:
        report = analyze_image_file(args.image, mock=args.mock)
    except Exception as e:
        print(f"Error analyzing image: {e}", file=sys.stderr)
        return 2

    try:
        out_path = save_report(report, args.outdir, prefix=args.prefix)
    except Exception as e:
        print(f"Error saving report: {e}", file=sys.stderr)
        return 3

    print(f"Report saved: {out_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
