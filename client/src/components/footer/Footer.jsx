import React from 'react';
import styles from './Footer.module.css';
import logo from '../../assets/PLDD_logo.png';
import {Link} from 'react-router-dom'
import {FaInstagram ,FaLinkedin ,FaGithub} from 'react-icons/fa';

function Footer() {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.logoAndHeading}>
        <img src={logo} alt='logo in footer' className={styles.logo} />
        <h3> @PD<span className="stroke-text">P</span>S.com</h3>
      </div>
      <div className={styles.footerIcons}>
        <Link to="https://github.com/KalyaniKadu-18/Plant_Leaf_Disease_Detection"><FaGithub className={styles.icons}/></Link>
                <Link to="https://www.linkedin.com/in/kalyani-kadu-491329282/"><FaLinkedin className={styles.icons}/></Link>
        <Link to="https://www.linkedin.com/in/kalyani-kadu-491329282/"><FaInstagram className={styles.icons}/></Link>
      </div>
    </div>
  )
}

export default Footer;