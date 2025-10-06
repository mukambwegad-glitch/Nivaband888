// components/Player.js
export default function Player({ src }) {
  if (!src) return null;

  return (
    <div className="mt-8 text-center">
      <audio
        controls
        src={src}
        className="w-80 mx-auto rounded-md shadow-lg border border-pink-400"
      />
      <a
        href={src}
        download="nivaband888.wav"
        className="block mt-3 underline hover:text-pink-400 transition"
      >
        ⬇️ Download Track
      </a>
    </div>
  );
}
