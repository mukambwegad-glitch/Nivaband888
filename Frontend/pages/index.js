import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateMusic = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.audioUrl || 'Error: no audio generated.');
    } catch (err) {
      setResponse('Server error or invalid backend URL.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">🎵 NivaBand 888</h1>
      <input
        type="text"
        placeholder="Describe your song idea..."
        className="p-3 w-80 rounded-md text-black mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateMusic}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md font-semibold"
      >
        {loading ? 'Generating...' : 'Generate Music'}
      </button>

      {response && (
        <div className="mt-6">
          <audio controls src={response} className="mt-2" />
        </div>
      )}
    </div>
  );
}
