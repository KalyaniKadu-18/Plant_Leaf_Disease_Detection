import { useState } from "react";
import styles from "./Test.module.css";
import bgimg from "../../assets/home_bg_img.jpg";
import { ImCross } from "react-icons/im";

function Test() {
  const [image, setImage] = useState(null);

  // handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // remove image
  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className={styles.TestWrapper}>
      <img src={bgimg} alt="testBgImg" className={styles.bgimg} />

      <div className={styles.TestOverlay}>
        <div className={styles.leftContainer}>
          <h1 className={styles.TextContainerHeading1}>
            Welcome to PD<span className={styles.strokeText}>P</span>S
          </h1>

          <h2 className={styles.TextContainerHeading2}>
            Plant Disease Identifier
          </h2>

          <label className={styles.filelabel}>Choose File :  </label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          <button className={styles.VerifyBtn}>Verify</button>

          <p className={styles.TextPara}>
            Prediction Results :
          </p>
        </div>
            <div className={styles.rightContainer}>
            
              <div className={styles.imageWrapper}>
                <img src={image} />

                <span
                  className={styles.closeBtn}
                  onClick={removeImage}
                >
                  {/* <ImCross/> */}
                </span>
              </div>
            
          </div>
      </div>
    </div>
  );
}

export default Test;