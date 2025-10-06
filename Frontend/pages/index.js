import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSound = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate?text=${encodeURIComponent(prompt)}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      alert('Failed to generate sound.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🎵 NivaBand 888</h1>
      <input
        type="text"
        placeholder="Describe your sound..."
        className="p-3 w-80 rounded-md text-black mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateSound}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold"
      >
        {loading ? 'Generating...' : 'Generate Sound'}
      </button>
    </div>
  );
}
