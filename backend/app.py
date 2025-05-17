from flask import Flask, jsonify, request
from flask_socketio import SocketIO, send
from stt import transcribe_audio

app = Flask(__name__)


# Root endpoint
@app.route('/')
def home():
    transcribe_audio()
    return "Welcome to the Flask API!"

# Example API endpoint
@app.route('/api/echo', methods=['POST'])
def echo():
    data = request.get_json()
    return jsonify({
        "received": data
    })


if __name__ == '__main__':
    app.run(port=8000)
