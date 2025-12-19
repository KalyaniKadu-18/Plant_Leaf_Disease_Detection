import React, { useState } from "react";
import styles from "./Login.module.css";
import bgimg from "../../assets/home_bg_img.jpg";
import Button from '../../components/button/Button';

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
  };

  return (
    <div className={styles.LoginWrapper}>

      <img src={bgimg} className={styles.bgimg} alt="background" />

      <form className={styles.loginFormWrapper} onSubmit={handleSubmit}>
        <h2 className={styles.loginHeading}>Login</h2>

        <div className={styles.inputFeildDiv}>
          <input
            type="text"
            name="username"
            className={styles.inputFeild}
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className={styles.inputFeild}
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.forgotPass}>
          <a href="#">Forgot Password</a>
        </div>

        <Button Button_Name="Login" className={styles.signupSubmitBtn} />
      </form>
    </div>
  );
}

export default Login;
