// src/pages/Profile.js
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { auth } = useContext(AuthContext);

  useEffect( ()=> {
    console.log("Auth state in profile:", auth);
  }, [auth]);

  return (
    <div style={styles.container}>
      <h2>Profile</h2>
      <p>Username: {auth.user?.username || "Guest"}</p>
      {/* Add more profile fields as needed */}
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
};

export default Profile;
