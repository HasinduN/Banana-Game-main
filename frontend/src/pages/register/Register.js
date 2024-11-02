// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import the CSS file

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError(""); // Clear any previous errors
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        password,
      });

      if (response.status === 201 || response.status === 200) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to register. Please try again."); // Display a generic error message
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="register-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="register-input"
      />
      <button onClick={handleRegister} className="register-button">
        Register
      </button>
      {error && <p className="register-error">{error}</p>}
    </div>
  );
};

export default Register;


