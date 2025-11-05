import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./TeamSection.css";

const teamMembers = [
  {
    name: "Abg Sabirin Bin Abg Muis",
    role: "PENYELIA PROJEK",
    desc: "Membimbing dan memberi nasihat bagi memastikan projek mencapai matlamat.",
    image: "/Cikgu S.png",
  },
  {
    name: "Muhammad Zariff Najmi",
    role: "ASSISTANT ADVERTISING MANAGER",
    desc: "Menghasilkan reka bentuk antara muka futuristik dan pengalaman pengguna yang luar biasa.",
    image: "/Zariff-removebg-preview.png",
  },
  {
    name: "Vincent Law Fai Khong",
    role: "ADVERTISING MANAGER",
    desc: "Membangunkan sistem kukuh dan efisien bagi memastikan prestasi aplikasi yang lancar.",
    image: "/Vincent-removebg-preview.png",
  },
  {
    name: "Derrick Chieng Kai Chiong",
    role: "BACK-END DEVELOPER",
    desc: "Mereka antaramuka moden dengan gaya minimalis yang memberi impak visual tinggi.",
    image: "/Derrick-removebg-preview.png",
  },
  {
    name: "Muhammad Harits Fikri",
    role: "FRONT-END DEVELOPER",
    desc: "Memastikan pasukan kekal fokus, tersusun, dan mencapai setiap matlamat tepat pada masanya.",
    image: "/Harris-removebg-preview.png",
  },
];

export default function Team() {
  const [index, setIndex] = useState(0);
  const total = teamMembers.length;

  const nextMember = () => setIndex((prev) => (prev + 1) % total);
  const prevMember = () => setIndex((prev) => (prev - 1 + total) % total);

  useEffect(() => {
    const timer = setInterval(nextMember, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="team-section">
      {/* 🔹 Background Video */}
      <video className="video-bg" autoPlay loop muted playsInline>
        <source src="/VIDEOBACKTEAM1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>

      {/* 🔹 Title Section */}
      <h2 className="team-title">
        Pasukan <span>Kami</span>
      </h2>
      <p className="team-subtitle">
        Pemimpin. Pereka. Pembangun. Pencetus Inovasi.
      </p>

      {/* 🔹 Carousel */}
      <div className="carousel-container">
        <button className="nav-btn left" onClick={prevMember}>
          <ChevronLeft size={36} />
        </button>

        <div
          className="carousel"
          style={{
            transform: `translateZ(-250px) rotateY(${index * (-360 / total)}deg)`,
          }}
        >
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="carousel-item"
              style={{
                transform: `rotateY(${(360 / total) * i}deg) translateZ(500px)`,
              }}
            >
              <div className="team-card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  <p className="desc">{member.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="nav-btn right" onClick={nextMember}>
          <ChevronRight size={36} />
        </button>
      </div>

      {/* 🔹 Dots Navigation */}
      <div className="dots">
        {teamMembers.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </section>
  );
}
