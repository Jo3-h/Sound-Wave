import React, { useState } from "react";
import axios from "axios";
import "./css/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [validPassword, setValidPassword] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validUsername, setValidUsername] = useState(true);

  const { username, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateUsername = async (username) => {
    if (!username) {
      console.log("No username provided");
      return false;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/api/check-username",
        { username }
      );
      return response.data.available;
    } catch (error) {
      console.error("Error validating username: ", error);
      return false;
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Initialize a local validation state
    const validationResults = {
      passwordValid: password === password2 && password !== "",
      emailValid: validateEmail(email),
      usernameValid: false, // Default until async validation is complete
    };

    // Perform username validation (await response)
    validationResults.usernameValid = await validateUsername(username);

    // Update all states at once based on local validation results
    setValidPassword(validationResults.passwordValid);
    setValidEmail(validationResults.emailValid);
    setValidUsername(validationResults.usernameValid);

    // Log validation results
    console.log("Validation results: ", validationResults);

    // Check all validations and submit the form if valid
    if (
      validationResults.passwordValid &&
      validationResults.emailValid &&
      validationResults.usernameValid
    ) {
      console.log("Form submitted successfully:", formData);
      // Uncomment to submit the form
      axios
        .post("http://localhost:3001/api/signup", formData)
        .then((response) => {
          console.log("User signed up:", response.data);
        })
        .catch((error) => {
          console.error("Error signing up user:", error);
        });
    } else {
      console.log("Form submission failed: Validation errors");
    }
  };

  return (
    <div className="content-container">
      <div className="signup-container">
        <h3 className="signup-label">SIGN UP</h3>
        <form className="form-container">
          <label>Username: </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => onChange(e)}
          />
          {!validUsername && (
            <p className="form-error">Username already taken</p>
          )}
          <label>Email: </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          {!validEmail && <p className="form-error">Invalid email</p>}
          <label>Password: </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <label>Confirm Password: </label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
          {!validPassword && (
            <p className="form-error">Passwords do not match</p>
          )}
        </form>
        <button className="signup-form-button" onClick={(e) => onSubmit(e)}>
          SIGN UP
        </button>
      </div>
    </div>
  );
};

// reCAPTCHA site key: 6LdBaoIqAAAAAMNgMJKVBBa1qHoTM3U3yh0pxwtp
// reCAPTCHA secret key: 6LdBaoIqAAAAAPX6rSt4lJ7aYtoAJw7-SDtxY0ER

export default SignUp;
