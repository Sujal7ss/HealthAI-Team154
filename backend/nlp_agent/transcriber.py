import whisper

model = whisper.load_model("base")

def transcribe_file(filepath: str):
    print("Transcribing...")
    result = model.transcribe(filepath)
    print("Original:", result["text"])
    return result["text"]

def translate_file(filepath: str):
    print("Translating...")
    result = model.transcribe(filepath, task="translate")
    print("Translated:", result["text"])
    return result["text"]
