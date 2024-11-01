// src/pages/Dashboard.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>
      <button onClick={() => navigate("/game")} style={styles.button}>
        Start Game
      </button>
      <button onClick={() => navigate("/profile")} style={styles.button}>
        Profile
      </button>
      <button onClick={() => navigate("/leaderboard")} style={styles.button}>
        Leaderboard
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  button: { padding: "10px 20px", margin: "5px" },
};

export default Dashboard;
