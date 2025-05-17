import whisper

model = whisper.load_model("small")  # Try "medium" or "large" for better accuracy

result = model.transcribe("audio/a1.mp3", task="translate")
print(result["text"])