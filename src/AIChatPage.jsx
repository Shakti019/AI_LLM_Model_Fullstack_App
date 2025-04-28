import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  FaPaperPlane,
  FaDownload,
  FaUserCircle,
  FaRobot,
  FaRegCopy,
  FaRedo,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "./AIChatPage.css";

const EXAMPLES = [
  "What are the best crops for my region?",
  "How can I improve soil fertility?",
  "Show me a chart of rainfall trends.",
];

const AIChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [copyIdx, setCopyIdx] = useState(null);
  const chatContainerRef = useRef(null);

  // Load chat history
  useEffect(() => {
    const saved = localStorage.getItem("aichat-messages");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chat history
  useEffect(() => {
    localStorage.setItem("aichat-messages", JSON.stringify(messages));
  }, [messages]);

  // Theme effect
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Smooth scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping]);

  // Typing animation for AI
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    if (!isTyping) return;
    const lastMsg = messages[messages.length - 1];
    if (!lastMsg || lastMsg.type !== "ai") return;
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(lastMsg.content.slice(0, i));
      i++;
      if (i > lastMsg.content.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [isTyping, messages]);

  // Handle send
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMessage = { type: "user", content: input, time: Date.now() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      // REAL API CALL
      const response = await fetch('http://localhost:5000/api/ai-chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      const aiMessage = {
        type: "ai",
        content: data.text || "No response.",
        time: Date.now(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { type: "ai", content: "Sorry, I couldn't process your request.", time: Date.now() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Regenerate last AI response
  const handleRegenerate = async () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.type === "user");
    if (!lastUserMsg) return;
    setIsTyping(true);
    try {
      // REAL API CALL
      const response = await fetch('http://localhost:5000/api/ai-chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message: lastUserMsg.content }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          type: "ai",
          content: data.text || "No response.",
          time: Date.now(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Welcome message
  const showWelcome = messages.length === 0 && !isTyping;

  // Copy message
  const handleCopy = (content, idx) => {
    navigator.clipboard.writeText(content);
    setCopyIdx(idx);
    setTimeout(() => setCopyIdx(null), 1000);
  };

  return (
    <div className={`aichat-container ${darkMode ? "dark" : ""}`}>
      <div className="aichat-sidebar">
        <div className="aichat-sidebar-header">
          <button className="aichat-new-chat-btn">+ New Chat</button>
        </div>
        <div className="aichat-history">
          {/* Chat history would go here */}
        </div>
        <div className="aichat-sidebar-footer">
          <button
            className="aichat-theme-btn"
            onClick={() => setDarkMode((d) => !d)}
            title="Toggle theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>
      
      <div className="aichat-main">
        <div className="aichat-header">
          <h1 className="aichat-title">Agriculture AI Assistant</h1>
        </div>
        
        <div ref={chatContainerRef} className="aichat-messages">
          {showWelcome && (
            <div className="aichat-welcome">
              <div className="aichat-welcome-icon">
                <FaRobot size={48} />
              </div>
              <h2>How can I help you today?</h2>
              <div className="aichat-examples-grid">
                {EXAMPLES.map((ex, i) => (
                  <div
                    key={i}
                    onClick={() => setInput(ex)}
                    className="aichat-example-card"
                  >
                    <div className="aichat-example-icon">
                      <FaPaperPlane size={14} />
                    </div>
                    <p>{ex}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((message, index) => (
            <div
              key={index}
              className={`aichat-message ${message.type}`}
            >
              <div className="aichat-message-content">
                <div className="aichat-message-avatar">
                  {message.type === "user" ? (
                    <FaUserCircle size={24} />
                  ) : (
                    <FaRobot size={24} />
                  )}
                </div>
                <div className="aichat-message-text">
                  {message.type === "ai" ? (
                    <ReactMarkdown>
                      {isTyping && index === messages.length - 1
                        ? displayedText
                        : message.content}
                    </ReactMarkdown>
                  ) : (
                    <span>{message.content}</span>
                  )}
                </div>
                <div className="aichat-message-actions">
                  <button
                    className="aichat-copy-btn"
                    onClick={() => handleCopy(message.content, index)}
                    title="Copy message"
                  >
                    <FaRegCopy size={14} />
                    {copyIdx === index && (
                      <span className="aichat-copied-tooltip">Copied!</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="aichat-message ai">
              <div className="aichat-message-content">
                <div className="aichat-message-avatar">
                  <FaRobot size={24} />
                </div>
                <div className="aichat-message-text">
                  <div className="aichat-typing-indicator">
                    <div className="aichat-typing-dot"></div>
                    <div className="aichat-typing-dot"></div>
                    <div className="aichat-typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="aichat-input-container">
          <form onSubmit={handleSubmit} className="aichat-form">
            <div className="aichat-input-wrapper">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Agriculture AI..."
                className="aichat-input"
                disabled={isTyping}
              />
              {messages.length > 0 && !isTyping && (
                <button
                  type="button"
                  className="aichat-regenerate-btn"
                  onClick={handleRegenerate}
                  title="Regenerate response"
                >
                  <FaRedo size={16} />
                </button>
              )}
              <button
                type="submit"
                className="aichat-send-btn"
                disabled={isTyping || !input.trim()}
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
            <div className="aichat-footer-note">
              Agriculture AI can make mistakes. Consider checking important information.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AIChatPage;