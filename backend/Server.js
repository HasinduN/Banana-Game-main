import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import gameRoutes from "./routes/Game.js";
import authRoutes from "./routes/Auth.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://janithiaia:0uY1UuXW9gYRqt5n@cluster0.ztsig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Routes
app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
