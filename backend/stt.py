import whisper
import sounddevice as sd
import numpy as np
import tempfile
import scipy.io.wavfile as wav
model = whisper.load_model("base")


def record_audio(duration=5, fs=16000):
    print("Recording...")
    audio = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='int16')
    sd.wait()
    print("Done.")
    return fs, audio

def transcribe_audio():
    while True:
        fs, audio = record_audio(duration=5)
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
             wav.write(f.name, fs, audio)
             result = model.transcribe(f.name)
             resulttranslated = model.transcribe(f.name, task="translate")

             print("Translated:", resulttranslated["text"])
             print("You said:", result["text"])

__all__ = ['transcribe_audio']       
