import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../../assets/PLDD_logo.png';

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className={styles.Navbar}>
      <div className={styles.Navbar_left}>
        <img
          src={logo}
          alt="PLDD_logo"
          className={styles.Navbar_logo}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        />

        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/test" className={styles.link}>Test</Link>
        <Link to="/history" className={styles.link}>History</Link>
        <Link to="/about" className={styles.link}>About</Link>
      </div>

      <div className={styles.Navbar_right}>
        <Link to="/login" className={styles.authBtn}>Login</Link>
        <Link to="/signup" className={styles.authBtn}>Sign up</Link>
      </div>
    </div>
  );
}

export default Navbar;
