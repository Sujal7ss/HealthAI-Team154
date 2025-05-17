from fastapi import APIRouter, File, UploadFile
from mlmodel.model_loader import predict_class
from mlmodel.preprocess import preprocess_image
from utils.analysis_mapper import get_analysis

router = APIRouter()

@router.post("/predict/")
async def predict_ecg(file: UploadFile = File(...)):
    contents = await file.read()
    img_array = preprocess_image(contents)
    predicted_class = predict_class(img_array)
    return get_analysis(predicted_class)
