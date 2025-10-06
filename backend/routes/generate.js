import express from "express";
import axios from "axios";
import { stitchAudio } from "../utils/stitchAudio.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { prompt, type } = req.body;

  try {
    const model =
      type === "vocals"
        ? "suno/bark"
        : "riffusion/riffusion-model-v1";

    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      { inputs: prompt },
      {
        headers: { Authorization: `Bearer ${process.env.HF_API_TOKEN}` },
        responseType: "arraybuffer",
      }
    );

    // merge/extend if needed for longer audio
    const stitchedAudio = await stitchAudio(response.data);

    res.setHeader("Content-Type", "audio/wav");
    res.send(stitchedAudio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Audio generation failed." });
  }
});

export default router;
