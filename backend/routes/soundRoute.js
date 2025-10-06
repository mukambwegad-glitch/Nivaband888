// routes/soundRoute.js
import express from "express";
import fs from "fs";
import path from "path";
import fetch from "node-fetch"; // already installed
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Example: Generate a test audio tone from an online TTS API (like Hugging Face)
router.get("/generate", async (req, res) => {
  try {
    const text = req.query.text || "Niva band online sound test";

    // Example TTS API call (you can replace this with your model)
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: text })
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to generate sound." });
    }

    // Receive audio and save to temp file
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const audioPath = path.join(__dirname, "output.wav");
    fs.writeFileSync(audioPath, buffer);

    // Stream audio back to frontend
    res.setHeader("Content-Type", "audio/wav");
    const fileStream = fs.createReadStream(audioPath);
    fileStream.pipe(res);

  } catch (err) {
    console.error("Audio generation error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
