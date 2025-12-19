import React from 'react';
import styles from './Explore.module.css';
import bgimg from "../../assets/home_bg_img.jpg";

function Explore() {
  return (
    <div className={styles.ExploreWrapper}>
      <img src={bgimg} alt='Explorebgimg' className={styles.bgimg}/>
    </div>
  )
}

export default Explore
