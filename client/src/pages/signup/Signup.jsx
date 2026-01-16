import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Signup.module.css";
import bgimg from "../../assets/home_bg_img.jpg";
import Button from "../../components/button/Button";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
       navigate("/login");
      const response = await axios.post(
        "http://localhost:8000/signup",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      );

      alert(response.data.message); // Signup successful
      console.log("Signup Success:", response.data);

    } catch (error) {
      console.error(error.response?.data || error.message);
      alert(error.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className={styles.SignupWrapper}>
      <img src={bgimg} className={styles.bgimg} alt="background" />

      <form className={styles.signupFormWrapper} onSubmit={handleSubmit}>
        <h2 className={styles.signupHeading}>Create Account</h2>

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
            type="email"
            name="email"
            className={styles.inputFeild}
            placeholder="Email Address"
            value={formData.email}
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

          <input
            type="password"
            name="confirmPassword"
            className={styles.inputFeild}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <Button
          type="submit"
          Button_Name="Sign up"
          className={styles.signupSubmitBtn}
        />
      </form>
    </div>
  );
}

export default Signup;
