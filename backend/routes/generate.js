import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Example AI generation endpoint (replace with real one)
    const response = await fetch("https://api-inference.huggingface.co/models/facebook/musicgen-small", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`, // if you have one
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) throw new Error("Music generation failed");

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Send audio as base64
    res.json({
      audioUrl: `data:audio/wav;base64,${buffer.toString("base64")}`,
    });
  } catch (error) {
    console.error("Generation Error:", error);
    res.status(500).json({ error: "Server error while generating music" });
  }
});

export default router;
