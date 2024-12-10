import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import axios from "axios";

import "./css/Login.css";

export default function Login() {
  const { login } = useUser();
  const [failMesaaage, setFailMessage] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = formData;

  const onChange = (e) => {
    setFailMessage(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData: ", formData);
    console.log("Login form submitted");

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });
      if (response.status === 200) {
        console.log("Login successful: ", response.data);
        login(response.data.user, response.data.token);
        // Redirect to the dashboard
        window.location = "/dashboard";
      } else {
        console.error("Login failed: ", response.data);
      }
    } catch (error) {
      setFailMessage(true);
      console.error("Error logging in: ", error);
    }
  };

  return (
    <div className="content-container">
      <div className="login-container">
        <h3 className="signup-label">LOGIN</h3>
        <form className="form-container">
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
          />
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </form>
        <button className="login-form-button" onClick={(e) => onSubmit(e)}>
          LOGIN
        </button>
        {failMesaaage && (
          <p className="form-error">Invalid username or password</p>
        )}
      </div>
    </div>
  );
}
