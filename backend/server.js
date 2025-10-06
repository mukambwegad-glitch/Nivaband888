import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoute from "./routes/generate.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 🛠 Main API route
app.use("/api/generate", generateRoute);

// 🩵 Health check
app.get("/", (req, res) => {
  res.send("🎧 NivaBand 888 Backend is alive and singing!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
