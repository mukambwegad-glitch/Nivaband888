// pages/index.js
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Test backend connection by playing a sound
  const playTestSound = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/sound/generate?text=Hello%20Niva%20Band`
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch (err) {
      alert("⚠️ Could not reach backend. Check your Render link.");
      console.error(err);
    }
  };

  // ✅ Main function to generate music
  const generateMusic = async () => {
    setLoading(true);
    setAudioUrl("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
      } else {
        alert("⚠️ No audio generated. Check backend route /generate.");
      }
    } catch (err) {
      alert("❌ Server error or invalid backend URL.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ UI layout
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white px-6">
      <h1 className="text-4xl font-bold mb-6 text-center">🎵 NivaBand 888</h1>

      <input
        type="text"
        placeholder="Describe your song idea..."
        className="p-3 w-80 rounded-md text-black mb-4 focus:outline-none"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={generateMusic}
          disabled={loading}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-md font-semibold transition disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate 🔥"}
        </button>

        <button
          onClick={playTestSound}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-semibold transition"
        >
          🎧 Play Test Sound
        </button>
      </div>

      {audioUrl && (
        <div className="mt-6 w-full flex flex-col items-center">
          <audio controls src={audioUrl} className="mt-2 w-80" />
        </div>
      )}
    </div>
  );
}
