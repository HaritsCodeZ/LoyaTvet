import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";

export default function Chat({ initialQuestion = "", onExit }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const messagesEndRef = useRef(null);

  // Track if initial question has already been processed
  const initialQuestionSent = useRef(false);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial greeting + optional initial question
  useEffect(() => {
    // Animate chat box popup
    setTimeout(() => setChatVisible(true), 100);


  }, []);

  // Handle initial question once
  useEffect(() => {
    if (initialQuestion && !initialQuestionSent.current) {
      initialQuestionSent.current = true;
      // Add user question after greeting delay
      setTimeout(() => {
        addMessage("user", initialQuestion);
        simulateBotReply(initialQuestion);
      }, 1200);
    }
  }, [initialQuestion]);

  const addMessage = (sender, text) => {
    setMessages((prev) => [...prev, { sender, text }]);
  };

  const getAnswer = (q) => {
    q = q.toLowerCase();
    if (q.includes("apa itu tvet"))
      return "TVET bermaksud Pendidikan dan Latihan Teknikal dan Vokasional.";
    if (q.includes("kolej"))
      return "Loya TVET bekerjasama dengan pelbagai kolej di seluruh Malaysia.";
    if (q.includes("pasukan"))
      return "Pasukan LOYA TVET terdiri daripada pendidik dan pakar teknikal.";
    if (q.includes("hubungi"))
      return "Anda boleh hubungi kami melalui laman rasmi atau media sosial.";
    return "Soalan menarik! Sistem masih belajar untuk menjawab dengan lebih baik.";
  };

  const simulateBotReply = (question) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      addMessage("bot", getAnswer(question));
    }, 1500);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage("user", input);
    simulateBotReply(input);
    setInput("");
  };

  return (
    <div className="chat-container">
      <video className="video-bg" autoPlay loop muted playsInline>
        <source src="/Video_BackUltras.mp4" type="video/mp4" />
      </video>
      <div className="dark-overlay"></div>

      <div className={`chat-frame ${chatVisible ? "pop-up" : "hidden"}`}>
        <div className="chat-header">
          <div className="logo-section" onClick={onExit}>
            <img src="/Logo Loya TVET.png" alt="Loya TVET Logo" className="tvet-logo" />
            <div className="flipping-text">
              <span className="flip">Anda tanya, LOYA TVET jawab</span>
              <span className="flip">Segala kekeliruan, pasti terjawab.</span>
              <span className="flip">AI teknologi masa depan</span>
            </div>
          </div>
        </div>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {typing && (
            <div className="chat-bubble bot typing">Loya TVET sedang menaip...</div>
          )}
          <div ref={messagesEndRef}></div>
        </div>

        <div className="chat-input">
          <input
            type="text"
            placeholder="Tulis soalan anda di sini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>➤</button>
        </div>
      </div>
    </div>
  );
}
