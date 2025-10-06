import { useState } from "react";
import axios from "axios";
import Player from "../components/Player";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [type, setType] = useState("instrumental");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!prompt.trim()) return alert("Please describe your sound 🎧");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://YOUR_BACKEND_URL/api/generate",
        { prompt, type },
        { responseType: "blob" }
      );

      const url = URL.createObjectURL(new Blob([res.data], { type: "audio/wav" }));
      setAudioUrl(url);
    } catch (err) {
      alert("Generation failed 😢 Check your backend connection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-indigo-800 to-fuchsia-600 text-white text-center px-4">
      <h1 className="text-5xl font-bold mb-8 drop-shadow-md">🎶 NivaBand 888</h1>

      <textarea
        className="w-full max-w-md h-32 text-black p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
        placeholder="Describe your sound (e.g. ambient synths with ocean waves 🌊🎹)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex gap-3 mt-4">
        <button
          className={`px-4 py-2 rounded ${
            type === "instrumental" ? "bg-pink-600" : "bg-gray-700"
          }`}
          onClick={() => setType("instrumental")}
        >
          🎸 Instrumental
        </button>
        <button
          className={`px-4 py-2 rounded ${
            type === "vocals" ? "bg-pink-600" : "bg-gray-700"
          }`}
          onClick={() => setType("vocals")}
        >
          🎤 Vocals
        </button>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`mt-6 px-6 py-3 rounded text-black transition-all ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-pink-500 hover:text-white"
        }`}
      >
        {loading ? "Generating 🎛️..." : "Generate 🔥"}
      </button>

      <Player src={audioUrl} />

      <footer className="mt-10 text-sm opacity-70">
        Made with 💜 by <span className="font-semibold">NivaBand 888</span>
      </footer>
    </main>
  );
}
