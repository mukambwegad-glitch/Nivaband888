import fetch from "node-fetch";

export async function stitchAudio(prompt, type) {
  // Call your AI music generation API (e.g., Replicate, OpenAI, etc.)
  const response = await fetch("https://api.yourmusicmodel.com/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({ prompt, type }),
  });

  if (!response.ok) {
    throw new Error("API call failed");
  }

  const data = await response.json();
  return data.audioUrl; // Make sure this matches your model’s response format
}
