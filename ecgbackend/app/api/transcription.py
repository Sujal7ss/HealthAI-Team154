from fastapi import APIRouter, UploadFile, File
from faster_whisper import WhisperModel
import tempfile
import shutil
import os

router = APIRouter()

# Load model (can be "tiny", "base", "small", "medium", "large-v2")
model = WhisperModel("small", device="cpu")  # Use "cuda" if you have a GPU

@router.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...)):
    suffix = os.path.splitext(file.filename)[1]
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
        shutil.copyfileobj(file.file, temp_file)
        temp_path = temp_file.name

    # Transcribe using faster-whisper
    segments, info = model.transcribe(temp_path, beam_size=5, task="translate")
    original_text = " ".join([segment.text for segment in segments])

    os.remove(temp_path)

    return {
        "text": original_text,
        "language": info.language,
         "language_probability": round(info.language_probability, 3),
        "duration": info.duration
    }
