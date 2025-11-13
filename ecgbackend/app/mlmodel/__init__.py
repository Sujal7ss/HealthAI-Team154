"""Lightweight mlmodel package initializer.

Avoid importing heavy dependencies (TensorFlow / Pillow) at import time so
tools that only need to run in "mock" mode can import the package without
causing an import error. Heavy imports are deferred into helper functions.
"""

__all__ = ["predict_from_bytes", "get_class_labels"]


def predict_from_bytes(image_bytes):
	"""Preprocess raw image bytes and return the predicted class label.

	This function performs the heavy imports (Pillow/TensorFlow) only when
	called, so importing the `mlmodel` package itself is lightweight.
	"""
	from .preprocess import preprocess_image
	from .model_loader import predict_class

	img_array = preprocess_image(image_bytes)
	return predict_class(img_array)


def get_class_labels():
	"""Return the model's class labels (imports the loader lazily)."""
	from .model_loader import class_labels

	return class_labels
