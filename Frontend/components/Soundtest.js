import React from "react";

export default function SoundTest() {
  const playSound = async () => {
    const response = await fetch("https://nivaband888.onrender.com/api/sound/generate?text=Hello%20Niva%20Band");
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🎶 Sound Test</h2>
      <button onClick={playSound}>Play Test Sound</button>
    </div>
  );
}
