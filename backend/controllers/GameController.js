// backend/controllers/gameController.js
import fetch from "node-fetch";
import Score from "../models/Score.js";

export const getGameData = async (req, res) => {
  const apiUrl = "https://marcconrad.com/uob/banana/api.php?out=csv&base64=yes";
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(`API request failed with status: ${response.status}`);
      return res
        .status(response.status)
        .json({ message: "Failed to fetch game data from external API" });
    }

    const base64Data = await response.text();
    res.status(200).json({ imageBase64: base64Data });
  } catch (error) {
    console.error("Error in getGameData:", error);
    res
      .status(500)
      .json({ message: "Internal server error fetching game data" });
  }
};

export const submitScore = async (req, res) => {
  const { userId } = req.user;
  const { score } = req.body;
  try {
    const newScore = new Score({ user: userId, score });
    await newScore.save();
    res.status(201).json({ message: "Score submitted successfully!" });
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({ message: "Failed to submit score" });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const leaderboard = await Score.find()
      .sort({ score: -1 })
      .populate("user", "username")
      .limit(10);
    res.status(200).json(leaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard" });
  }
};
