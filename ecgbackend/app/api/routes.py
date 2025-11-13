from fastapi import APIRouter, File, UploadFile
from mlmodel.model_loader import predict_class
from mlmodel.preprocess import preprocess_image
from utils.analysis_mapper import get_analysis
from utils.report_writer import save_report
from pathlib import Path
import traceback

router = APIRouter()


@router.post("/predict/")
async def predict_ecg(file: UploadFile = File(...)):
    contents = await file.read()
    img_array = preprocess_image(contents)
    predicted_class = predict_class(img_array)
    analysis = get_analysis(predicted_class)

    # Save a report for each prediction (non-blocking small JSON write is OK here)
    try:
        report = {
            "input_filename": file.filename,
            "predicted_class": predicted_class,
            "analysis": analysis,
        }
        # Save to ecgbackend/reports by default
        out = save_report(report, Path("../reports"))
    except Exception:
        # Don't fail the request if saving the report fails; log server-side
        traceback.print_exc()

    return analysis
