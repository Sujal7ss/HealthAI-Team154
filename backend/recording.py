import gradio as gr
import sounddevice as sd
from scipy.io.wavfile import write
import whisper
from transformers import pipeline
from langdetect import detect
from openai import OpenAI
import os
import time

client = OpenAI(api_key="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")
# Set your API key

# ---- Core functions ----

def record_conversation_gradio(duration=10, fs=44100):
    """Records audio and returns filename"""
    gr.Info("Recording started...")
    recording = sd.rec(int(duration * fs), samplerate=fs, channels=1)
    sd.wait()
    filename = f"conversation_{int(time.time())}.wav"
    write(filename, fs, recording)
    return filename

def transcribe_audio(file_path):
    model = whisper.load_model("base")
    result = model.transcribe(file_path)
    return result["text"]

def detect_language(text):
    try:
        return detect(text)
    except:
        return "unknown"

def translate_text(text, target_lang="en"):
    translator = pipeline("translation", model="facebook/nllb-200-distilled-600M")
    return translator(text, tgt_lang=target_lang)[0]['translation_text']

def analyze_conversation(text):
    prompt = f"""Act as a medical assistant. Analyze this doctor-patient conversation:
    
{text}

Return structured JSON with:
1. Patient demographics (age, gender)
2. Vital symptoms (fever, pain location, duration)
3. Risk factors (diabetes, hypertension)
4. Potential diagnoses (max 3)
5. Red flags requiring urgent care"""

    response = client.chat.completions.create(
    model="gpt-4",
    messages=[{"role": "user", "content": prompt}],
    temperature=0.2
)

    return response.choices[0].message.content

# ---- Gradio pipeline ----

def run_pipeline(duration):
    audio_file = record_conversation_gradio(duration)
    transcript = transcribe_audio(audio_file)

    lang = detect_language(transcript)
    if lang != 'en':
        translation = translate_text(transcript, "eng_Latn")
    else:
        translation = transcript

    medical_output = analyze_conversation(translation)

    return transcript, translation, medical_output

# ---- Gradio Interface ----

with gr.Blocks(title="Doctor-Patient AI Assistant") as demo:
    gr.Markdown("## 🩺 Doctor-Patient Conversation Analyzer")

    duration = gr.Slider(minimum=5, maximum=60, value=10, label="Recording Duration (seconds)")

    record_btn = gr.Button("🔴 Record & Analyze")
    transcript_out = gr.Textbox(label="📝 Transcript")
    translation_out = gr.Textbox(label="🌐 Translated Text")
    analysis_out = gr.Textbox(label="🧠 Medical Analysis (Structured JSON)", lines=10)

    record_btn.click(fn=run_pipeline, inputs=duration, outputs=[transcript_out, translation_out, analysis_out])

demo.launch()
