from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from pymongo import MongoClient
from PIL import Image
from io import BytesIO
import base64
import bcrypt

app = Flask(__name__)
CORS(app)

# Reduce TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

client = MongoClient(
    "mongodb+srv://Kalyani:Kalyani@plantleafdiseasepredict.xucuwtk.mongodb.net/"
)

db = client["PlantLeafDiseasePrediction"]
collection = db["predictions"]
users_collection = db["users"]

model_path = "D:\\Plant-Leaf-Disease-Detectionn\\server\\Training_Model.keras"

if not os.path.exists(model_path):
    raise FileNotFoundError("Model file not found")

model = tf.keras.models.load_model(model_path)
print("Model loaded successfully")

class_names = [
    "Pepper__bell___Bacterial_spot",
    "Pepper__bell___healthy",
    "Potato___Early_blight",
    "Potato___healthy",
    "Potato___Late_blight",
    "Tomato___Target_Spot",
    "Tomato___Tomato_mosaic_virus",
    "Tomato___Tomato_YellowLeaf_Curl_Virus",
    "Tomato___Bacterial_spot",
    "Tomato___Early_blight",
    "Tomato___healthy",
    "Tomato___Late_blight",
    "Tomato___Leaf_Mold",
    "Tomato___Septoria_leaf_spot",
    "Tomato___Spider_mites_Two_spotted_spider_mite"
]

def preprocess_image(file):
    img = Image.open(file).convert("RGB")
    img = img.resize((96, 96))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def store_prediction(image_file, prediction):
    img_io = BytesIO()
    image = Image.open(image_file)
    image.save(img_io, "JPEG")
    img_io.seek(0)

    image_base64 = base64.b64encode(img_io.read()).decode("utf-8")

    collection.insert_one({
        "image": image_base64,
        "prediction": prediction
    })
    
@app.route("/")
def home():
    return "Flask backend is running"

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    # Check if user exists
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 409

    # Hash password
    hashed_password = bcrypt.hashpw(
        password.encode("utf-8"),
        bcrypt.gensalt()
    )

    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_password
    })

    return jsonify({"message": "Signup successful"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json

    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Find user by username
    user = users_collection.find_one({"username": username})

    if not user:
        return jsonify({"error": "Invalid username or password"}), 401

    # Check password
    if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
        return jsonify({"error": "Invalid username or password"}), 401

    # Return user info on successful login
    return jsonify({
        "message": "Login successful",
        "username": user["username"],
        "email": user["email"]
    }), 200

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided"}), 400

    file = request.files["image"]

    try:
        img_array = preprocess_image(file)
        prediction = model.predict(img_array, verbose=0)
        predicted_class = class_names[np.argmax(prediction)]

        store_prediction(file, predicted_class)

        return jsonify({
            "prediction": predicted_class
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/history", methods=["GET"])
def history():
    results = []

    for doc in collection.find():
        results.append({
            "image": "data:image/jpeg;base64," + doc["image"],
            "prediction": doc["prediction"]
        })

    return jsonify(results)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
