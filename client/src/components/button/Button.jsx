import React from 'react';
import styles from './Button.module.css';

function Button({ Button_Name, onClick, type = "button" }) {
  return (
    <button 
      className={styles.button} 
      onClick={onClick} 
      type={type}
    >
      {Button_Name}
    </button>
  );
}

export default Button;
