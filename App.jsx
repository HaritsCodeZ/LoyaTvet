import { useState, useEffect } from "react";
import "./App.css";
import Chat from "./Chat"; // <-- we'll create this next

function App() {
  const messages = [
    "SELAMAT DATANG KE LOYA TVET, SEDIA MEMBANTU!",
    "SYARAT KEMASUKAN KOLEJ VOKASIONAL? TANYA LOYA TVET SEKARANG!",
    "BAGAIMANA LOYA TVET BERFUNGSI? TANYA LOYA TVET SEKARANG!",
    "BERMINAT MASUK KE KV BETONG? LOYA TVET SEDIA MEMBANTU!",
    "APA ITU KOLEJ VOKASIONAL? LOYA TVET ADA JAWAPANNYA!",
  ];

  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [isChatMode, setChatMode] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setFlip(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFlip(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // ✨ Handle pressing Enter to go to Chat mode
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setQuestion(e.target.value.trim());
      setChatMode(true);
      e.target.value = "";
    }
  };

  return (
    <div className="cosmic-bg">
      {!isChatMode ? (
        <>
          {/* 🌌 NAVBAR — GLOWING + TRANSLUCENT */}
          <nav className="cosmic-nav">
            <div className="nav-links">
              <a href="#kolej" className="nav-link">Kolej Kami</a>
              <a href="#pasukan" className="nav-link">Pasukan Kami</a>
              <a href="#hubungi" className="nav-link">Hubungi Kami</a>
            </div>
          </nav>

          {/* 🪩 HERO SECTION */}
          <div className="hero-center">
            <img
              src="/BIG TITLE_1.png"
              alt="LOYA TVET Banner"
              className="main-banner"
            />

            <p className={`hero-subtitle ${flip ? "flip" : ""}`}>
              {messages[index]}
            </p>

            {/* 💬 AI Input Section */}
            <div className="ai-input-container">
              <div className="ai-input-bar animated-gradient">
                <span className="sparkle">✨</span>
                <input
                  type="text"
                  placeholder="Apa yang boleh saya bantu untuk hari ini?"
                  className="ai-input-field"
                  onKeyDown={handleKeyDown}
                />
                <button
                  className="send-btn"
                  onClick={(e) => {
                    const bar = e.target.closest(".ai-input-bar");
                    bar.classList.remove("clicked");
                    void bar.offsetWidth;
                    bar.classList.add("clicked");
                  }}
                >
                  ➜
                </button>
              </div>

              <div className="ai-suggestions">
                <button>MADE BY ISK INVENTOR TEAM</button>
              </div>
            </div>
          </div>

          {/* 🌠 BACKGROUND VIDEO */}
          <video className="video-bg" autoPlay loop muted playsInline>
            <source src="/Video_BackUltras.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        <Chat
          initialQuestion={question}
          onExit={() => setChatMode(false)}
        />
      )}
    </div>
  );
}

export default App;
