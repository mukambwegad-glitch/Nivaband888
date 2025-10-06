import fetch from "node-fetch";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧠 This function sends a request to the OpenAI (or your AI backend) audio API,
// retrieves the generated audio, and saves it locally before returning its path.
export const stitchAudio = async (prompt, type = "instrumental") => {
  try {
    console.log(`🎵 Generating ${type} audio for prompt:`, prompt);

    const response = await fetch(process.env.AUDIO_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({ prompt, type }),
    });

    if (!response.ok) {
      throw new Error(`Audio generation failed: ${response.statusText}`);
    }

    // 🪄 Assume the API returns an audio file (e.g., base64 or buffer)
    const audioBuffer = await response.arrayBuffer();
    const filePath = path.join(__dirname, "../outputs/generated_audio.mp3");
    fs.writeFileSync(filePath, Buffer.from(audioBuffer));

    console.log("✅ Audio successfully saved:", filePath);
    return filePath;
  } catch (err) {
    console.error("❌ Error in stitchAudio:", err.message);
    throw err;
  }
};
