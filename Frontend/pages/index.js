import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [type, setType] = useState("instrumental");

  async function handleGenerate() {
    const res = await axios.post(
      "https://YOUR_BACKEND_URL/api/generate",
      { prompt, type },
      { responseType: "blob" }
    );

    const url = URL.createObjectURL(new Blob([res.data], { type: "audio/wav" }));
    setAudioUrl(url);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-indigo-800 to-fuchsia-600 text-white">
      <h1 className="text-5xl font-bold mb-8">🎶 NivaBand 888</h1>

      <textarea
        className="w-96 h-32 text-black p-3 rounded-md"
        placeholder="Describe your sound (e.g. ambient synths with ocean waves 🌊🎹)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button
          className={`px-4 py-2 rounded ${type === "instrumental" ? "bg-pink-600" : "bg-gray-700"}`}
          onClick={() => setType("instrumental")}
        >
          🎸 Instrumental
        </button>
        <button
          className={`px-4 py-2 rounded ${type === "vocals" ? "bg-pink-600" : "bg-gray-700"}`}
          onClick={() => setType("vocals")}
        >
          🎤 Vocals
        </button>
      </div>

      <button
        onClick={handleGenerate}
        className="mt-6 px-6 py-3 bg-white text-black rounded hover:bg-pink-500 hover:text-white transition-all"
      >
        Generate 🔥
      </button>

      {audioUrl && (
        <div className="mt-8 text-center">
          <audio controls src={audioUrl} className="w-80 mx-auto" />
          <a href={audioUrl} download="nivaband888.wav" className="block mt-3 underline">
            ⬇️ Download Track
          </a>
        </div>
      )}
    </main>
  );
}
