// src/pages/Game.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Game = () => {
  const [questionImage, setQuestionImage] = useState(null); // Stores the question image
  const [userAnswer, setUserAnswer] = useState(""); // Stores the user's answer
  const [feedback, setFeedback] = useState(""); // Stores feedback after answering

  // Fetch a new question from the API
  const fetchQuestion = async () => {
    try {
      const response = await axios.get("https://marcconrad.com/uob/banana/api.php"); // Adjust to exact endpoint if needed
      console.log(response);
      setQuestionImage(response.data.question); // Assume response contains { image: "base64data" }
      setFeedback(""); // Clear feedback on loading a new question
      setUserAnswer(""); // Clear previous answer
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  // Validate the user's answer with the API
  const submitAnswer = async () => {
    try {
      const response = await axios.post("https://marcconrad.com/uob/banana/api.php", {
        answer: userAnswer,
      });
      
      // Assuming the response contains a boolean or similar format to check correctness
      if (response.data.solution) {
        setFeedback("Correct! 🎉");
        // Fetch a new question if correct
        fetchQuestion();
      } else {
        setFeedback("Incorrect. Try again!");
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
      setFeedback("Error checking answer. Please try again.");
    }
  };

  // Load a new question when the component mounts
  useEffect(() => {
    fetchQuestion();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Answer the Question</h2>
      {questionImage ? (
        <img src={questionImage} alt="Question" style={styles.image} />
      ) : (
        <p>Loading question...</p>
      )}
      <input
        type="text"
        placeholder="Enter your answer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        style={styles.input}
      />
      <button onClick={submitAnswer} style={styles.button}>
        Submit Answer
      </button>
      {feedback && <p>{feedback}</p>}
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
  image: {
    marginTop: "10px",
    maxWidth: "300px",
  },
  input: {
    marginTop: "10px",
    padding: "10px",
    width: "100%",
    maxWidth: "300px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Game;

