import sounddevice as sd
import numpy as np
import scipy.io.wavfile as wav
import tempfile

def record_audio(duration=5, fs=16000):
    print("Recording...")
    audio = sd.rec(int(duration * fs), samplerate=fs, channels=1, dtype='int16')
    sd.wait()
    print("Done.")
    
    temp_file = tempfile.NamedTemporaryFile(suffix=".wav", delete=False)
    wav.write(temp_file.name, fs, audio)
    return temp_file.name
