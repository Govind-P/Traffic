from flask import Flask, request, jsonify
import requests
from PIL import Image
import base64
import io
import os
from roboflow import Roboflow
from flask_cors import CORS
import random
import json

app = Flask(__name__)
CORS(app)

def save_image_from_base64(base64_string, image_path):
    if "data:image" in base64_string:
        header, base64_string = base64_string.split(";base64,")
    image_data = base64.b64decode(base64_string)
    image = Image.open(io.BytesIO(image_data))
    image.save(image_path)
    return True

@app.route('/upload', methods=['POST'])
def upload_image():
    if request.method == 'POST':
        data = request.get_json()
        base64_string = data.get('image', '')
        if not base64_string:
            return jsonify({'error': 'No image data found'}), 400
        image_path = "uploaded_image.jpg"
        
        try:
            save_image_from_base64(base64_string, image_path)
            # url = "https://api.ultralytics.com/v1/predict/QQm0gi5J4ncagOEif9rj"
            # headers = {"x-api-key": "59cef9a42fa24dcd7d4d57f9b1ab894f9b7638b3e0"}
            # data = {"size": 640, "confidence": 0.25, "iou": 0.45}
            # with open(image_path, "rb") as f:
            #     response = requests.post(url, headers=headers, data=data, files={"image": f})
            # response_json = response.json()
            # print(response_json)
            # num_predictions = len(response_json["data"])
            # rf = Roboflow(api_key="LjofPnAYfb987fDAN0fg")
            # project = rf.workspace().project("emergency_traffic")
            # model = project.version(1).model
            # prediction = model.predict(image_path, confidence=40, overlap=30).json()
            # num_predictions = len(prediction["predictions"])
            return jsonify({"number_of_predictions": random.randint(5, 20)}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid request method'}), 405






@app.route('/emergency', methods=['POST'])
def emergency_check():
    if request.method == 'POST':
        data = request.get_json()
        base64_string= data.get('image', '')
        if not base64_string:
            return jsonify({'error': 'No image data found'}), 400
        emergency_path = "emergency_image.jpg"
        
        try:
            save_image_from_base64(base64_string, emergency_path)
            # url = "https://api.ultralytics.com/v1/predict/QQm0gi5J4ncagOEif9rj"
            # headers = {"x-api-key": "59cef9a42fa24dcd7d4d57f9b1ab894f9b7638b3e0"}
            # data = {"size": 640, "confidence": 0.25, "iou": 0.45}
            # with open(emergency_path, "rb") as f:
            #     response = requests.post(url, headers=headers, data=data, files={"image": f})
            # response_json = response.json()
            # has_emergency = any(p['name'] == "emergency" for p in response_json['data'])
            # rf = Roboflow(api_key="LjofPnAYfb987fDAN0fg")
            # project = rf.workspace().project("emergency_traffic")
            # model = project.version(1).model
            # prediction = model.predict(emergency_path, confidence=40, overlap=30).json()
            # num_predictions = len(prediction["predictions"])
            # has_emergency = any(p['class'] == 'emergency' for p in prediction['predictions'])
            has_emergency = False
            a=random.randint(8,11)
            if(a==10):
                has_emergency = True
            return jsonify({"emergency": has_emergency}), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500

    return jsonify({'error': 'Invalid request method'}), 405


if __name__ == '__main__':
    app.run(debug=True, port=5000)
