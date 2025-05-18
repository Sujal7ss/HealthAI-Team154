from audio_recorder import record_audio
from transcriber import transcribe_file, translate_file

def transcribe_audio_loop():
    while True:
        filepath = record_audio(duration=5)
        original_text = transcribe_file(filepath)
        translated_text = translate_file(filepath)

        print("You said:", original_text)
        print("Translated:", translated_text)

if __name__ == "__main__":
    transcribe_audio_loop()
