import "./gate.css";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Gate({ brand }) {
  const [open, setOpen] = useState(false);

  // 🚪 Body Scroll Control
  useEffect(() => {
    document.body.style.overflow = open ? "auto" : "hidden";
  }, [open]);

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

    for (let i = 0; i < 15; i++) {
      const dot = document.createElement("span");
      const size = Math.random() * 6 + 2;
      dot.className = "particle-dot";
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = Math.random() * 100 + "%";
      dot.style.animationDuration = 8 + Math.random() * 10 + "s";
      dot.style.animationDelay = Math.random() * 5 + "s";
      dot.style.opacity = Math.random() * 0.6;
      container.appendChild(dot);
    }
  }, []);

  // 🚪 Open Gate Function
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
    <div className={`container ${open ? "gate-is-open" : ""}`}>
      <div className="particles"></div>
      <div className="burst"></div>

      <div className="lux-lines">
        <span className="line left-line"></span>
        <span className="line right-line"></span>
        <span className="curve top-left"></span>
        <span className="curve top-right"></span>
        <span className="curve bottom-left"></span>
        <span className="curve bottom-right"></span>
      </div>

      {!open && <div className="center-line"></div>}

      {/* DOORS */}
      <div className={`door left ${open ? "open" : ""}`}>
        <div className="door-overlay"></div>
        <div className="handle left-handle"></div>
      </div>

      <div className={`door right ${open ? "open" : ""}`}>
        <div className="door-overlay"></div>
        <div className="handle right-handle"></div>
      </div>

      {/* TAP BUTTON */}
      {!open && (
        <motion.div 
          className="button" 
          onClick={handleOpen}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="shine"></div>
          <h1>{brand}</h1>
          <span className="button-glow"></span>
          <p>TAP TO OPEN</p>
        </motion.div>
      )}

      {/* MAIN CONTENT WITH SCROLLING SECTIONS */}
      {open && (
        <div className="main">
          
          {/* --- 🌟 SECTION 1: PERFECT MOBILE CENTERED HERO SECTION --- */}
          <section className="hero-fullscreen-section">
            {/* 🛠️ असली इमेज टैग जो मोबाइल में 100% सेंटर और फिक्स रहेगा */}
            <img src="/couple.jpg" alt="Background Couple" className="fullscreen-bg-img" />
            <div className="hero-overlay"></div> 
            
            <div className="hero-content-area">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="hero-welcome-text"
              >
                WE ARE GETTING MARRIED
              </motion.p>
              
              <div className="hero-names-section">
                <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.6 }}>
                  Kartike
                </motion.h1>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="hero-ampersand">&</motion.span>
                <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.8 }}>
                  Abhishek
                </motion.h1>
              </div>

              <motion.div initial={{ width: 0 }} animate={{ width: "120px" }} transition={{ duration: 1, delay: 1.2 }} className="hero-divider">
                <span className="hero-gold-dot"></span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.5 }} className="hero-details">
                <p className="hero-event-type">HOUSE WARMING PARTY</p>
                <p className="hero-date">SUNDAY | MAY 25, 2026</p>
                <p className="hero-venue">GORAKHPUR, UTTAR PRADESH</p>
              </motion.div>
            </div>
          </section>

          {/* --- SECTION 2: EVENT TIMELINE --- */}
          <section className="section">
            <div className="timeline-container">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="section-title"
              >
                Event Schedule
              </motion.h2>
              <div className="divider"><span className="gold-dot"></span></div>

              <div className="timeline">
                <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="timeline-item">
                  <div className="time">09:00 AM</div>
                  <div className="event-details">
                    <h3>Grah Pravesh Puja</h3>
                    <p>Auspicious havan and rituals to welcome positivity into our new home.</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="timeline-item">
                  <div className="time">01:00 PM</div>
                  <div className="event-details">
                    <h3>Mahaprasad / Lunch</h3>
                    <p>Join us for a traditional and delicious feast with family and friends.</p>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="timeline-item">
                  <div className="time">07:00 PM</div>
                  <div className="event-details">
                    <h3>Grand Celebration & Dinner</h3>
                    <p>An evening filled with music, laughter, and celebrations followed by dinner.</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* --- SECTION 3: VENUE & MAP --- */}
          <motion.section className="section" initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 1 }}>
            <h2 className="section-title">The Venue</h2>
            <div className="divider"><span className="gold-dot"></span></div>
            <p style={{ color: '#54111d', textAlign: 'center', fontSize: '1.2rem', lineHeight: '1.6', letterSpacing: '1px' }}>
              Radisson Blu, Gorakhpur <br />
              Near Mohaddipur Crossing, Uttar Pradesh
            </p>
            <motion.a href="https://goo.gl/maps/xyz" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rsvp-btn" style={{ marginTop: '20px', textDecoration: 'none', display: 'inline-block' }}>
              OPEN IN GOOGLE MAPS
            </motion.a>
          </motion.section>

          {/* --- SECTION 4: RSVP --- */}
          <motion.section className="section" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} style={{ background: 'rgba(212, 175, 55, 0.03)', width: '100%' }}>
            <h2 style={{ color: '#d4af37', fontSize: '2rem', textTransform: 'uppercase' }}>Join Our Joy</h2>
            <p style={{ color: '#54111d', marginBottom: '30px', letterSpacing: '1px' }}>We are waiting for your precious presence!</p>
            <button className="rsvp-btn" style={{ background: '#d4af37', color: 'white', border: 'none' }}>
              RSVP NOW
            </button>
          </motion.section>

        </div>
      )}
    </div>
  );
}