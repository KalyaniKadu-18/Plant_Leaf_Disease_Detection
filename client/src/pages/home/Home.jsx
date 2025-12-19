import React from "react";
import bgImg from "../../assets/home_bg_img.jpg";
import styles from "./Home.module.css";
import logo_img from "../../assets/PLDD_logo.png";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <div className={styles.homeWrapper}>
      <img src={bgImg} alt="background" className={styles.bgImage} />

      <div className={styles.overlay}>
        <img src={logo_img} alt="logo" className={styles.logo} />

        <div className={styles.headingBox}>
          <h1 className={styles.mainHeading}>
            PL<span className={styles.strokeText}>D</span>D
          </h1>

          <div className={styles.subHeading}>
            <div>
              <span>Identify</span>
              <span className={styles.strokeText}> Leaf </span>
            </div>
            <span>Diseases Instantly</span>
                    <button className={styles.getStarted} >Get Started</button>
          </div>
        </div>
      </div>
          <Footer/>
    </div>
  );
}

export default Home;
