from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import gradio as gr

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the Keras model
model = tf.keras.models.load_model("mlmodel/ecg_model.keras", compile=False)

# Class labels
class_labels = [
    "Left Bundle Branch Block",
    "Normal",
    "Premature Atrial Contraction",
    "Premature Ventricular Contractions",
    "Right Bundle Branch Block",
    "Ventricular Fibrillation"
]

# Preprocess function
def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

# Gradio wrapper
def predict_from_gradio(img):
    img_array = np.array(img.resize((224, 224))) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    prediction = model.predict(img_array)
    predicted_class = class_labels[np.argmax(prediction)]
    return predicted_class

demo = gr.Interface(fn=predict_from_gradio, inputs=gr.Image(type="pil"), outputs="text")

@app.get("/")
def gradio_ui():
    return demo.launch(share=False, inline=True, inbrowser=True)

# Prediction endpoint
@app.post("/predict/")
async def predict_ecg(file: UploadFile = File(...)):
    print("Received file:", file.filename)
    contents = await file.read()
    img_array = preprocess_image(contents)
    prediction = model.predict(img_array)
    predicted_class = class_labels[np.argmax(prediction)]
    return {"prediction": predicted_class}
