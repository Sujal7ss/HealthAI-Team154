import tensorflow as tf
import numpy as np

# Load model once when the module is imported
model = tf.keras.models.load_model("mlmodel/ecg_model.keras", compile=False)

class_labels = [
    "Left Bundle Branch Block",
    "Normal",
    "Premature Atrial Contraction",
    "Premature Ventricular Contractions",
    "Right Bundle Branch Block",
    "Ventricular Fibrillation"
]

def predict_class(img_array: np.ndarray) -> str:
    prediction = model.predict(img_array)
    return class_labels[np.argmax(prediction)]
