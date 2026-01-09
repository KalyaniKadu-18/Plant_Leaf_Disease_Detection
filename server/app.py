import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image

# Reduce TensorFlow warnings
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

# Paths
model_path = r"D:\Plant-Leaf-Disease-Detectionn\server\Training_Model.keras"
test_images = r"D:\Plant-Leaf-Disease-Detectionn\server\test_images"

# Load trained model
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model not found at {model_path}")

model = tf.keras.models.load_model(model_path)
print("Model loaded successfully")

# Class labels
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

# Predict disease for a single image
def predict_leaf_disease(img_path):
    if not os.path.exists(img_path):
        raise FileNotFoundError(f"Image not found at {img_path}")

    img = image.load_img(img_path, target_size=(96, 96))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array / 255.0

    prediction = model.predict(img_array, verbose=0)
    predicted_class = np.argmax(prediction)
    return class_names[predicted_class]

# Predict all images in the folder
if __name__ == "__main__":
    for img_name in os.listdir(test_images):
        if not img_name.lower().endswith(('.jpg', '.jpeg', '.png')):
            continue

        img_path = os.path.join(test_images, img_name)
        try:
            result = predict_leaf_disease(img_path)
            print(f"{img_name} -> {result}")
        except Exception as e:
            print(f"Error processing {img_name}: {e}")
