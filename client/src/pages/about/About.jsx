import React from 'react';
import styles from './About.module.css';
import bgimg from '../../assets/home_bg_img.jpg';
import logo from '../../assets/PLDD_logo.png';

function About() {
  return (
    <div className={styles.AboutWrapper}>
      <img src={bgimg} alt='Aboutbgimg' className={styles.bgimg}/>
  
      <div className={styles.AboutSubWrapper}>
         <div className={styles.logoDiv}>
          <img src={logo} className={styles.logo}/>
         </div>
              <div className={styles.AboutTextWrapper}>
        <p className={styles.AboutText}>
          This Plant Leaf Disease Detection Project has been developed for learning and practice purposes. 
           Its objective is to understand how machine learning and image processing techniques can be used to
            identify diseases in plant leaves.The application allows users to upload a leaf image, which is 
            analyzed using a trained machine learning/deep learning model to predict possible diseases. 
            This project provides practical experience in image classification, model training,
             frontend–backend integration, and API handling.The project is not intended for real agricultural
              or commercial use. All predictions are based on sample or publicly available datasets, and the 
              results may not be fully accurate. It is developed as part of an academic and self-learning 
              initiative to explore AI-based solutions in agriculture and strengthen skills in Python, 
              Machine Learning, Deep Learning, Flask, and web development.
        </p>
      </div>
      </div>
    </div>
  )
}

export default About