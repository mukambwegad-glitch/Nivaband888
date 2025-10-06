import express from "express";
import { stitchAudio } from "../utils/stitchAudio.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt, type } = req.body;
    if (!prompt || !type) {
      return res.status(400).json({ error: "Prompt and type are required." });
    }

    // Call your model or generation logic
    const result = await stitchAudio(prompt, type);

    res.json({ success: true, audioUrl: result });
  } catch (error) {
    console.error("❌ Generation error:", error.message);
    res.status(500).json({ error: "Server error while generating audio." });
  }
});

export default router;
