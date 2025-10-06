import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRoute from "./routes/generate.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/generate", generateRoute);

// TEST ROUTE for sound button
app.get("/api/sound/generate", async (req, res) => {
  const text = req.query.text || "Niva Band sound test";

  // Create a short audio tone for test purposes
  const buffer = Buffer.from([82, 73, 70, 70]); // simple "RIFF" placeholder (not real sound)
  res.setHeader("Content-Type", "audio/wav");
  res.send(buffer);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
