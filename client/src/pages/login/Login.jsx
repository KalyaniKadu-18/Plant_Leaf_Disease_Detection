import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";
import bgimg from "../../assets/home_bg_img.jpg";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/login",
        {
          username: formData.username,
          password: formData.password
        }
      );

      alert(response.data.message); // Login successful
      console.log("Login Success:", response.data);

      // Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));

      // Redirect to home or dashboard
      navigate("/");

      // Clear form (optional)
      setFormData({
        username: "",
        password: ""
      });

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.error || "Login failed");
    }

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
          <a href="#">Forgot Password?</a>
        </div>

        <Button
          type="submit"
          Button_Name="Login"
          className={styles.signupSubmitBtn}
        />
      </form>
    </div>
  );
}

export default Login;
