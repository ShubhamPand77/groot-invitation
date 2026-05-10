import "./gate.css";
import { useEffect, useState } from "react";

export default function Gate({ brand }) {
  const [open, setOpen] = useState(false);

  // 🔊 Luxury Click Sound
  const playClick = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();

    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);

    filter.type = "highpass";
    filter.frequency.setValueAtTime(1000, ctx.currentTime);

    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.08);
  };

  // ✨ Floating Particles
  useEffect(() => {
    const container = document.querySelector(".particles");
    if (!container) return;

    container.innerHTML = "";

 // ⭐ particles
for (let i = 0; i < 35; i++) {

  const dot = document.createElement("span");

  const size = Math.random() * 6 + 2;

  dot.className = "particle-dot";

  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;

  dot.style.left = Math.random() * 100 + "%";

  dot.style.animationDuration =
    8 + Math.random() * 10 + "s";

  dot.style.animationDelay =
    Math.random() * 5 + "s";

  dot.style.opacity =
    Math.random() * 0.6;

  container.appendChild(dot);
}
  }, []);

  // 🚪 Open Gate
  const handleOpen = () => {
    playClick();

    const burst = document.querySelector(".burst");
    if (!burst) return;

    burst.innerHTML = "";

    for (let i = 0; i < 70; i++) {
      const dot = document.createElement("span");

      const size = Math.random() * 7 + 3;

      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;

      dot.style.left = "50%";
      dot.style.top = "50%";

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 600 + 100;

      dot.style.setProperty("--x", `${Math.cos(angle) * distance}px`);
      dot.style.setProperty("--y", `${Math.sin(angle) * distance}px`);

      dot.style.animationDuration = `${0.7 + Math.random()}s`;

      burst.appendChild(dot);

      setTimeout(() => dot.remove(), 1500);
    }

    setTimeout(() => {
      setOpen(true);
    }, 500);
  };

  return (
    <div className="container">
      <div className="particles"></div>
      <div className="burst"></div>

      {!open && <div className="center-line"></div>}

      {/* LEFT DOOR */}
      <div className={`door left ${open ? "open" : ""}`}>
        <div className="door-overlay"></div>
        <div className="handle left-handle"></div>
      </div>

      {/* RIGHT DOOR */}
      <div className={`door right ${open ? "open" : ""}`}>
        <div className="door-overlay"></div>
        <div className="handle right-handle"></div>
      </div>
      

      {!open && (
        <div className="button" onClick={handleOpen}>
          <div className="shine"></div>

          <h1>{brand}</h1>

          <span className="button-glow"></span>

          <p>TAP TO OPEN</p>
        </div>
      )}

      {open && (
        <div className="main">
          <h1>kartike & abhishek</h1>
        </div>
      )}
    </div>
  );
}