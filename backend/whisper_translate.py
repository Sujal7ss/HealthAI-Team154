import whisper
import sounddevice as sd
import numpy as np
import queue
import threading
from datetime import datetime

# Configuration
MODEL_SIZE = "small"  # Balance between speed and accuracy
CHUNK_DURATION = 4    # Seconds per processing chunk (optimized for Whisper)
SAMPLE_RATE = 16000    # Whisper's native sample rate

class LiveTranslator:
    def __init__(self):
        self.model = whisper.load_model(MODEL_SIZE)
        self.audio_queue = queue.Queue()
        self.transcript = []
        self.running = True
        self.start_time = datetime.now()

        # Audio buffer configuration
        self.buffer = np.zeros((0,), dtype=np.float32)
        self.samples_needed = CHUNK_DURATION * SAMPLE_RATE

    def audio_callback(self, indata, frames, time, status):
        """Called for each audio block from microphone"""
        if status:
            print("Audio error:", status)
        # Convert to float32 and normalize
        audio = indata.astype(np.float32) / 32768.0
        self.buffer = np.concatenate([self.buffer, audio.squeeze()])

        # Send chunks when enough data accumulated
        while len(self.buffer) >= self.samples_needed:
            chunk = self.buffer[:self.samples_needed]
            self.buffer = self.buffer[self.samples_needed:]
            self.audio_queue.put(chunk)

    def process_audio(self):
        """Worker thread for processing audio chunks"""
        while self.running:
            try:
                chunk = self.audio_queue.get(timeout=1)
                result = self.model.transcribe(
                    chunk,
                    task="translate",
                    fp16=False,  # Disable if using CPU
                    language="en"  # Force English output
                )
                translated = result['text'].strip()
                
                if translated:
                    timestamp = datetime.now().strftime("%H:%M:%S")
                    entry = f"[{timestamp}] {translated}"
                    print("\r" + " " * 100 + "\r", end="")  # Clear line
                    print(f"Live: {translated}")
                    self.transcript.append(entry)
                
            except queue.Empty:
                continue

    def start(self):
        """Start the translation system"""
        print(f"Starting live translation (model: {MODEL_SIZE})...")
        print("Press Ctrl+C to stop and save transcript\n")

        # Start processing thread
        processor = threading.Thread(target=self.process_audio)
        processor.start()

        try:
            # Start audio stream
            with sd.InputStream(
                samplerate=SAMPLE_RATE,
                channels=1,
                dtype='int16',
                blocksize=SAMPLE_RATE,  # 1-second blocks
                callback=self.audio_callback
            ):
                while self.running:
                    sd.sleep(1000)
        except KeyboardInterrupt:
            self.running = False
            processor.join()
            
            # Save conversation transcript
            filename = self.start_time.strftime("conversation_%Y-%m-%d_%H-%M.txt")
            with open(filename, "w") as f:
                f.write("\n".join(self.transcript))
            print(f"\nConversation saved to {filename}")

if __name__ == "__main__":
    translator = LiveTranslator()
    translator.start()