// src/pages/Login.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Ensure the URL matches your backend configuration
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      if (response.status === 200) {
        login(response.data.user); // Update the auth context
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
};

const styles = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", padding: "20px" },
  input: { padding: "10px", marginBottom: "10px", width: "100%", maxWidth: "300px" },
  button: { padding: "10px 20px" },
};

export default Login;
