import { useState } from "react";
import styles from "./Test.module.css";
import bgimg from "../../assets/home_bg_img.jpg";
import { ImCross } from "react-icons/im";
import axios from "axios";

function Test() {
  const [image, setImage] = useState(null); // preview
  const [imageFile, setImageFile] = useState(null); // real file
  const [prediction, setPrediction] = useState("__"); // prediction result
  const [loading, setLoading] = useState(false); // button loading

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
      setPrediction("__");
    }
  };

  // Remove uploaded image
  const removeImage = () => {
    setImage(null);
    setImageFile(null);
    setPrediction("__");
  };

  // Verify button → send image to backend and save history
  const handleVerify = async () => {
    if (!imageFile) {
      alert("Please upload an image first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(
        "http://localhost:8000/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const predictionResult =
        response.data.prediction || JSON.stringify(response.data);

      setPrediction(predictionResult);
      setLoading(false);

      // Save to localStorage history
      const previousHistory =
        JSON.parse(localStorage.getItem("predictionHistory")) || [];

      const newHistoryItem = {
        image: image,
        prediction: predictionResult,
      };

      const updatedHistory = [newHistoryItem, ...previousHistory];
      localStorage.setItem(
        "predictionHistory",
        JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error("Prediction error:", error);
      alert("Prediction failed");
      setLoading(false);
    }
  };

  return (
    <div className={styles.TestWrapper}>
      <img src={bgimg} alt="Background" className={styles.bgimg} />

      <div className={styles.TestOverlay}>
        <div className={styles.leftContainer}>
          <h1 className={styles.TextContainerHeading1}>
            Welcome to PD<span className={styles.strokeText}>P</span>S
          </h1>
          <h2 className={styles.TextContainerHeading2}>
            Plant Disease Identifier
          </h2>

          <label className={styles.filelabel}>Choose File:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <button
            className={styles.VerifyBtn}
            onClick={handleVerify}
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <p className={styles.TextPara}>
            Prediction Result: <span>{prediction}</span>
          </p>
        </div>

        <div className={styles.rightContainer}>
          {image && (
            <div className={styles.imageWrapper}>
              <img src={image} alt="preview" />
              <span className={styles.closeBtn} onClick={removeImage}>
                <ImCross />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Test;
