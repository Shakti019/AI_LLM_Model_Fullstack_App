import React, { useState, useEffect } from "react";
import LoginCredential from "./components/login";
import "./Login.css";

// Free logo SVG (you can replace with your own)
const LogoSVG = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
    <circle cx="22" cy="22" r="22" fill="#6c47ff"/>
    <text x="50%" y="58%" textAnchor="middle" fill="#fff" fontSize="20" fontFamily="Poppins, Arial" fontWeight="bold" dy=".3em">DX</text>
  </svg>
);

const textLines = [
  "Welcome to DemandX.",
  "Your Gateway to Smart Trading.",
  "Grow Your Business With Us.",
  "Connect. Trade. Succeed."
];

const LandingPage = () => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentIndex < textLines[currentLine].length) {
        setDisplayText((prev) => prev + textLines[currentLine].charAt(currentIndex));
        setCurrentIndex((prev) => prev + 1);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayText("");
          setCurrentIndex(0);
          setCurrentLine((prev) => (prev + 1) % textLines.length);
        }, 1800);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [currentIndex, currentLine]);

  return (
    <div className="landing-wrapper">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-logo"><LogoSVG /></div>
        <nav>
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main className="landing-main">
        {/* Left: Hero Section */}
        <section className="landing-hero">
          {/* Animated background shapes */}
          <div className="hero-bg-shapes">
            <div className="shape shape1"></div>
            <div className="shape shape2"></div>
            <div className="shape shape3"></div>
            <div className="shape shape4"></div>
            <div className="shape shape5"></div>
          </div>
          {/* Truck Animation */}
          <div className="truck-animation">
            <span role="img" aria-label="truck" className="truck-emoji">🚛</span>
          </div>
          {/* Food Animation */}
          <div className="food-animation">
            <span role="img" aria-label="wheat" className="food-emoji">🌾</span>
          </div>
          <div className="hero-content">
            <div className="typing-animation">
              <h1>{displayText}</h1>
              <span className="cursor">|</span>
            </div>
            <p className="hero-tagline">
              The next generation trading platform for your business growth.
            </p>
            <button className="hero-cta">Get Started</button>
            {/* Animated trading icons */}
            <div className="trading-icons">
              <div className="icon-box">
                <div className="icon truck">🚛</div>
                <div className="icon-line"></div>
              </div>
              <div className="icon-box">
                <div className="icon wheat">🌾</div>
                <div className="icon-line"></div>
              </div>
              <div className="icon-box">
                <div className="icon oil">🛢️</div>
                <div className="icon-line"></div>
              </div>
              <div className="icon-box">
                <div className="icon metal">⛓️</div>
                <div className="icon-line"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Right: Login Form */}
        <aside className="landing-login">
          <LoginCredential />
        </aside>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div>© 2024 DemandX. All rights reserved.</div>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;