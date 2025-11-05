import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Chat from "./Chat";
import Team from "./Team"; // 👈 make sure Team.jsx exists in src/

function Home() {
  const messages = [
    "SELAMAT DATANG KE LOYA TVET, SEDIA MEMBANTU!",
    "SYARAT KEMASUKAN KOLEJ VOKASIONAL? TANYA LOYA TVET SEKARANG!",
    "BAGAIMANA LOYA TVET BERFUNGSI? TANYA LOYA TVET SEKARANG!",
    "BERMINAT MASUK KE KV BETONG? LOYA TVET SEDIA MEMBANTU!",
    "APA ITU KOLEJ VOKASIONAL? LOYA TVET ADA JAWAPANNYA!",
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [isChatMode, setChatMode] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(false);
      }, 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
          <nav className="cosmic-nav">
            <div className="nav-links">
              <a href="#kolej" className="nav-link">Kolej Kami</a>
              <Link to="/team" className="nav-link">Pasukan Kami</Link> {/* 👈 changed to Link */}
              <a href="#hubungi" className="nav-link">Hubungi Kami</a>
            </div>
          </nav>

          <div className="hero-center">
            <img
              src="/BIG TITLE_1.png"
              alt="LOYA TVET Banner"
              className="main-banner"
            />

            <div className="hero-subtitle-wrapper">
              <p className={`hero-subtitle ${fade ? "fade" : ""}`}>
                {messages[index]}
              </p>
            </div>

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

          <video className="video-bg" autoPlay loop muted playsInline>
            <source src="/Video_BackUltras.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </>
      ) : (
        <Chat initialQuestion={question} onExit={() => setChatMode(false)} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </Router>
  );
}
