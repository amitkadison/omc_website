import React, { useState, useEffect, useRef } from 'react';

const TeamCarousel = () => {
  // נתוני הצוות החדשים
  const teamMembers = [
    { name: "Emily Kim", role: "Founder", image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/omer2_i4vmxj.png" },
    { name: "Michael Steward", role: "Creative Director", image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/omer_shaking_e4vshq.png" },
    { name: "Emma Rodriguez", role: "Lead Developer", image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/cocktail1_pfswzd.png" },
    { name: "Julia Gimmel", role: "UX Designer", image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/DSC03566_kxexgk.jpg" },
    { name: "Lisa Anderson", role: "Marketing Manager", image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/forobs30u30_e88rln.jpg" },
    { name: "James Wilson", role: "Product Manager", image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/T.O.S_36_of_327_mgebtd.jpg" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);

  const updateCarousel = (newIndex) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const finalIndex = (newIndex + teamMembers.length) % teamMembers.length;
    setCurrentIndex(finalIndex);

    // זמן ארוך יותר לאנימציה חלקה יותר
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // Navigation functions
  const goLeft = () => {
    updateCarousel(currentIndex - 1);
  };

  const goRight = () => {
    updateCarousel(currentIndex + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        updateCarousel(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        updateCarousel(currentIndex + 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  // Touch/Swipe handling
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          updateCarousel(currentIndex + 1);
        } else {
          updateCarousel(currentIndex - 1);
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex]);

  // Card component
  const TeamCard = ({ member, index, currentIndex }) => {
    const offset = (index - currentIndex + teamMembers.length) % teamMembers.length;
    
    let className = "container";
    if (offset === 0) {
      className += " center";
    } else if (offset === 1) {
      className += " right-1";
    } else if (offset === 2) {
      className += " right-2";
    } else if (offset === teamMembers.length - 1) {
      className += " left-1";
    } else if (offset === teamMembers.length - 2) {
      className += " left-2";
    } else {
      className += " hidden";
    }

    return (
      <div 
        className={className}
        onClick={() => updateCarousel(index)}
      >
        <div className="canvas">
          <div className="tr-1"></div>
          <div className="tr-2"></div>
          <div className="tr-3"></div>
          <div className="tr-4"></div>
          <div className="tr-5"></div>
          <div className="tr-6"></div>
          <div className="tr-7"></div>
          <div className="tr-8"></div>
          <div className="tr-9"></div>
          <div className="tr-10"></div>
          <div className="tr-11"></div>
          <div className="tr-12"></div>
          <div className="tr-13"></div>
          <div className="tr-14"></div>
          <div className="tr-15"></div>
          <div className="tr-16"></div>
          <div className="tr-17"></div>
          <div className="tr-18"></div>
          <div className="tr-19"></div>
          <div className="tr-20"></div>
          <div className="tr-21"></div>
          <div className="tr-22"></div>
          <div className="tr-23"></div>
          <div className="tr-24"></div>
          <div className="tr-25"></div>
        </div>
        <div className="tracker"></div>
        <div id="card">
          {/* תמונת רקע של הכרטיסיה */}
          <div 
            className="card-background-image"
            style={{
              backgroundImage: `url(${member.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
          
          <div className="card-content">
            <div className="title noselect">{member.name}</div>
            <div id="prompt" className="noselect">{member.role}</div>
            <div className="subtitle noselect">
              Team Member<span className="highlight">#{index + 1}</span>
            </div>
            
            <div className="glowing-elements">
              <div className="glow-1"></div>
              <div className="glow-2"></div>
              <div className="glow-3"></div>
            </div>
            
            <div className="card-particles">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            <div className="cyber-lines">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            <div className="corner-elements">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            
            <div className="scan-line"></div>
            <div className="card-glare"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }

        .team-carousel-3d {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 650px;
          position: relative;
          overflow: hidden;
          margin-top: -100px;
          transition: margin-top 1.2s cubic-bezier(0.2, 0.8, 0.2, 1); /* תואם לאנימציה של הצוות */
        }

        .about-title-3d {
          font-size: 7.5rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: -0.02em;
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          white-space: nowrap;
          font-family: "Arial Black", "Arial Bold", Arial, sans-serif;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.35) 30%,
            rgba(255, 255, 255, 0) 76%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .carousel-container-3d {
          width: 100%;
          max-width: 1600px;
          height: 600px;
          position: relative;
          perspective: 1400px;
          margin-top: 50px;
        }

        .carousel-track-3d {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        /* עיצוב הכרטיסיות החדש */
        .container {
          position: absolute;
          width: 350px;
          height: 480px;
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          cursor: pointer;
        }

        .container:active {
          width: 340px;
          height: 470px;
        }

        .container.center {
          z-index: 10;
          transform: scale(1.2) translateZ(0);
        }

        .container.left-2 {
          z-index: 1;
          transform: translateX(-550px) scale(0.7) translateZ(-400px);
          opacity: 0.6;
        }

        .container.left-1 {
          z-index: 5;
          transform: translateX(-300px) scale(0.85) translateZ(-150px);
          opacity: 0.8;
        }

        .container.right-1 {
          z-index: 5;
          transform: translateX(300px) scale(0.85) translateZ(-150px);
          opacity: 0.8;
        }

        .container.right-2 {
          z-index: 1;
          transform: translateX(550px) scale(0.7) translateZ(-400px);
          opacity: 0.6;
        }

        .container.hidden {
          opacity: 0;
          pointer-events: none;
        }

        #card {
          position: absolute;
          inset: 0;
          z-index: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 20px;
          transition: all 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: linear-gradient(45deg, #1a1a1a, #262626);
          border: 2px solid rgba(255, 255, 255, 0.1);
          overflow: hidden;
          box-shadow:
            0 0 20px rgba(0, 0, 0, 0.3),
            inset 0 0 20px rgba(0, 0, 0, 0.2);
        }

        .card-background-image {
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: 0.4;
          transition: all 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
          filter: 
            brightness(0.7) 
            contrast(1.1) 
            saturate(1.2)
            blur(1px);
        }

        .tracker:hover ~ #card .card-background-image {
          opacity: 0.6;
          filter: 
            brightness(0.9) 
            contrast(1.15) 
            saturate(1.3)
            blur(0px);
          transform: scale(1.05);
        }

        .card-content {
          position: relative;
          width: 100%;
          height: 100%;
        }

        #prompt {
          bottom: 100px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
          transition: 300ms ease-in-out;
          position: absolute;
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .title {
          opacity: 0;
          transition: 300ms ease-in-out;
          position: absolute;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: 2px;
          text-align: center;
          width: 100%;
          padding-top: 30px;
          background: linear-gradient(180deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.3));
          text-shadow:
            0 0 10px rgba(255, 255, 255, 0.5),
            0 0 20px rgba(255, 255, 255, 0.3);
        }

        .subtitle {
          position: absolute;
          bottom: 40px;
          width: 100%;
          text-align: center;
          font-size: 11px;
          letter-spacing: 2px;
          transform: translateY(30px);
          color: rgba(255, 255, 255, 0.6);
        }

        .highlight {
          margin-left: 5px;
          background: linear-gradient(90deg, #ffffff, #a0a0a0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        }

        .glowing-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .glow-1,
        .glow-2,
        .glow-3 {
          position: absolute;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0) 70%
          );
          filter: blur(15px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .glow-1 {
          top: -20px;
          left: -20px;
        }
        .glow-2 {
          top: 50%;
          right: -30px;
          transform: translateY(-50%);
        }
        .glow-3 {
          bottom: -20px;
          left: 30%;
        }

        .card-particles span {
          position: absolute;
          width: 3px;
          height: 3px;
          background: #ffffff;
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        /* Hover effects */
        .tracker:hover ~ #card .title {
          opacity: 1;
          transform: translateY(-10px);
        }

        .tracker:hover ~ #card .glowing-elements div {
          opacity: 1;
        }

        .tracker:hover ~ #card .card-particles span {
          animation: particleFloat 2s infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(var(--x, 0) * 30px), calc(var(--y, 0) * 30px));
            opacity: 0;
          }
        }

        /* Particle positions */
        .card-particles span:nth-child(1) {
          --x: 1;
          --y: -1;
          top: 40%;
          left: 20%;
        }
        .card-particles span:nth-child(2) {
          --x: -1;
          --y: -1;
          top: 60%;
          right: 20%;
        }
        .card-particles span:nth-child(3) {
          --x: 0.5;
          --y: 1;
          top: 20%;
          left: 40%;
        }
        .card-particles span:nth-child(4) {
          --x: -0.5;
          --y: 1;
          top: 80%;
          right: 40%;
        }
        .card-particles span:nth-child(5) {
          --x: 1;
          --y: 0.5;
          top: 30%;
          left: 60%;
        }
        .card-particles span:nth-child(6) {
          --x: -1;
          --y: 0.5;
          top: 70%;
          right: 60%;
        }

        #card::before {
          content: "";
          background: radial-gradient(
            circle at center,
            rgba(0, 255, 170, 0.1) 0%,
            rgba(0, 162, 255, 0.05) 50%,
            transparent 100%
          );
          filter: blur(20px);
          opacity: 0;
          width: 150%;
          height: 150%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: opacity 0.3s ease;
        }

        .tracker:hover ~ #card::before {
          opacity: 1;
        }

        .tracker {
          position: absolute;
          z-index: 200;
          width: 100%;
          height: 100%;
        }

        .tracker:hover {
          cursor: pointer;
        }

        .tracker:hover ~ #card #prompt {
          opacity: 0;
        }

        .tracker:hover ~ #card {
          transition: 300ms;
          filter: brightness(1.1);
        }

        .container:hover #card::before {
          transition: 200ms;
          content: "";
          opacity: 80%;
        }

        .canvas {
          perspective: 800px;
          inset: 0;
          z-index: 200;
          position: absolute;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
          grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
          gap: 0px 0px;
          grid-template-areas:
            "tr-1 tr-2 tr-3 tr-4 tr-5"
            "tr-6 tr-7 tr-8 tr-9 tr-10"
            "tr-11 tr-12 tr-13 tr-14 tr-15"
            "tr-16 tr-17 tr-18 tr-19 tr-20"
            "tr-21 tr-22 tr-23 tr-24 tr-25";
        }

        .tr-1 { grid-area: tr-1; }
        .tr-2 { grid-area: tr-2; }
        .tr-3 { grid-area: tr-3; }
        .tr-4 { grid-area: tr-4; }
        .tr-5 { grid-area: tr-5; }
        .tr-6 { grid-area: tr-6; }
        .tr-7 { grid-area: tr-7; }
        .tr-8 { grid-area: tr-8; }
        .tr-9 { grid-area: tr-9; }
        .tr-10 { grid-area: tr-10; }
        .tr-11 { grid-area: tr-11; }
        .tr-12 { grid-area: tr-12; }
        .tr-13 { grid-area: tr-13; }
        .tr-14 { grid-area: tr-14; }
        .tr-15 { grid-area: tr-15; }
        .tr-16 { grid-area: tr-16; }
        .tr-17 { grid-area: tr-17; }
        .tr-18 { grid-area: tr-18; }
        .tr-19 { grid-area: tr-19; }
        .tr-20 { grid-area: tr-20; }
        .tr-21 { grid-area: tr-21; }
        .tr-22 { grid-area: tr-22; }
        .tr-23 { grid-area: tr-23; }
        .tr-24 { grid-area: tr-24; }
        .tr-25 { grid-area: tr-25; }

        .tr-1:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(20deg) rotateY(-10deg) rotateZ(0deg); }
        .tr-2:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(20deg) rotateY(-5deg) rotateZ(0deg); }
        .tr-3:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(20deg) rotateY(0deg) rotateZ(0deg); }
        .tr-4:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(20deg) rotateY(5deg) rotateZ(0deg); }
        .tr-5:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(20deg) rotateY(10deg) rotateZ(0deg); }
        .tr-6:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(10deg) rotateY(-10deg) rotateZ(0deg); }
        .tr-7:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(10deg) rotateY(-5deg) rotateZ(0deg); }
        .tr-8:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(10deg) rotateY(0deg) rotateZ(0deg); }
        .tr-9:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(10deg) rotateY(5deg) rotateZ(0deg); }
        .tr-10:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(10deg) rotateY(10deg) rotateZ(0deg); }
        .tr-11:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(0deg) rotateY(-10deg) rotateZ(0deg); }
        .tr-12:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(0deg) rotateY(-5deg) rotateZ(0deg); }
        .tr-13:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
        .tr-14:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(0deg) rotateY(5deg) rotateZ(0deg); }
        .tr-15:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(0deg) rotateY(10deg) rotateZ(0deg); }
        .tr-16:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-10deg) rotateY(-10deg) rotateZ(0deg); }
        .tr-17:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-10deg) rotateY(-5deg) rotateZ(0deg); }
        .tr-18:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-10deg) rotateY(0deg) rotateZ(0deg); }
        .tr-19:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-10deg) rotateY(5deg) rotateZ(0deg); }
        .tr-20:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-10deg) rotateY(10deg) rotateZ(0deg); }
        .tr-21:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-20deg) rotateY(-10deg) rotateZ(0deg); }
        .tr-22:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-20deg) rotateY(-5deg) rotateZ(0deg); }
        .tr-23:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-20deg) rotateY(0deg) rotateZ(0deg); }
        .tr-24:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-20deg) rotateY(5deg) rotateZ(0deg); }
        .tr-25:hover ~ #card { transition: 125ms ease-in-out; transform: rotateX(-20deg) rotateY(10deg) rotateZ(0deg); }

        .noselect {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        .card-glare {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            125deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 45%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0.05) 55%,
            rgba(255, 255, 255, 0) 100%
          );
          opacity: 0;
          transition: opacity 300ms;
        }

        .cyber-lines span {
          position: absolute;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(92, 103, 255, 0.2),
            transparent
          );
        }

        .cyber-lines span:nth-child(1) {
          top: 20%;
          left: 0;
          width: 100%;
          height: 1px;
          transform: scaleX(0);
          transform-origin: left;
          animation: lineGrow 3s linear infinite;
        }

        .cyber-lines span:nth-child(2) {
          top: 40%;
          right: 0;
          width: 100%;
          height: 1px;
          transform: scaleX(0);
          transform-origin: right;
          animation: lineGrow 3s linear infinite 1s;
        }

        .cyber-lines span:nth-child(3) {
          top: 60%;
          left: 0;
          width: 100%;
          height: 1px;
          transform: scaleX(0);
          transform-origin: left;
          animation: lineGrow 3s linear infinite 2s;
        }

        .cyber-lines span:nth-child(4) {
          top: 80%;
          right: 0;
          width: 100%;
          height: 1px;
          transform: scaleX(0);
          transform-origin: right;
          animation: lineGrow 3s linear infinite 1.5s;
        }

        .corner-elements span {
          position: absolute;
          width: 15px;
          height: 15px;
          border: 2px solid rgba(92, 103, 255, 0.3);
        }

        .corner-elements span:nth-child(1) {
          top: 10px;
          left: 10px;
          border-right: 0;
          border-bottom: 0;
        }

        .corner-elements span:nth-child(2) {
          top: 10px;
          right: 10px;
          border-left: 0;
          border-bottom: 0;
        }

        .corner-elements span:nth-child(3) {
          bottom: 10px;
          left: 10px;
          border-right: 0;
          border-top: 0;
        }

        .corner-elements span:nth-child(4) {
          bottom: 10px;
          right: 10px;
          border-left: 0;
          border-top: 0;
        }

        .scan-line {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(92, 103, 255, 0.1),
            transparent
          );
          transform: translateY(-100%);
          animation: scanMove 2s linear infinite;
        }

        @keyframes lineGrow {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          50% {
            transform: scaleX(1);
            opacity: 1;
          }
          100% {
            transform: scaleX(0);
            opacity: 0;
          }
        }

        @keyframes scanMove {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        #card:hover .card-glare {
          opacity: 1;
        }

        .corner-elements span {
          transition: all 0.3s ease;
        }

        #card:hover .corner-elements span {
          border-color: rgba(92, 103, 255, 0.8);
          box-shadow: 0 0 10px rgba(92, 103, 255, 0.5);
        }

        .member-info-3d {
          text-align: center;
          margin-top: 40px;
          transition: all 0.5s ease-out;
        }

        .member-name-3d {
          background: linear-gradient(180deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
          position: relative;
          display: inline-block;
          opacity: 1;
          transition: opacity 0.3s ease;
        }

        .member-name-3d::before,
        .member-name-3d::after {
          content: "";
          position: absolute;
          top: 100%;
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, #ffffff 0%, #a0a0a0 100%);
        }

        .member-name-3d::before {
          left: -120px;
        }

        .member-name-3d::after {
          right: -120px;
        }

        .member-role-3d {
          color: #848696;
          font-size: 1.5rem;
          font-weight: 500;
          opacity: 0.8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 10px 0;
          margin-top: -15px;
          position: relative;
          transition: opacity 0.3s ease;
        }

        .dots-3d {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 60px;
        }

        .dot-3d {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(8, 42, 123, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot-3d.active {
          background: rgb(8, 42, 123);
          transform: scale(1.2);
        }

        .nav-arrow-3d {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(8, 42, 123, 0.6);
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 20;
          transition: all 0.3s ease;
          font-size: 1.5rem;
          border: none;
          outline: none;
          padding-bottom: 4px;
        }

        .nav-arrow-3d:hover {
          background: rgba(0, 0, 0, 0.8);
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .nav-arrow-3d.left {
          left: 5px;
          padding-right: 3px;
        }

        .nav-arrow-3d.right {
          right: 5px;
          padding-left: 3px;
        }

        @media (max-width: 768px) {
          .team-carousel-3d {
            min-height: 450px;
            margin-top: -50px;
          }

          .about-title-3d {
            font-size: 4.5rem;
          }

          .carousel-container-3d {
            height: 400px;
            margin-top: 30px;
          }

          .container {
            width: 260px;
            height: 360px;
          }

          .container.left-2 {
            transform: translateX(-350px) scale(0.6) translateZ(-300px);
          }

          .container.left-1 {
            transform: translateX(-190px) scale(0.75) translateZ(-100px);
          }

          .container.right-1 {
            transform: translateX(190px) scale(0.75) translateZ(-100px);
          }

          .container.right-2 {
            transform: translateX(350px) scale(0.6) translateZ(-300px);
          }

          .container.center {
            transform: scale(1.0) translateZ(0);
          }

          .member-name-3d {
            font-size: 2rem;
          }

          .member-role-3d {
            font-size: 1.2rem;
          }

          .member-name-3d::before,
          .member-name-3d::after {
            width: 50px;
          }

          .member-name-3d::before {
            left: -70px;
          }

          .member-name-3d::after {
            right: -70px;
          }

          .title {
            font-size: 18px;
            padding-top: 25px;
          }

          #prompt {
            font-size: 12px;
            bottom: 80px;
          }

          .subtitle {
            font-size: 10px;
            bottom: 30px;
          }

          .nav-arrow-3d {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
          
          .nav-arrow-3d.left {
            left: 2px;
          }
          
          .nav-arrow-3d.right {
            right: 2px;
          }
        }

        @media (max-width: 480px) {
          .team-carousel-3d {
            min-height: 400px;
            margin-top: -30px;
          }

          .carousel-container-3d {
            height: 320px;
            margin-top: 20px;
          }

          .container {
            width: 220px;
            height: 280px;
          }

          .container.left-2 {
            transform: translateX(-260px) scale(0.5) translateZ(-250px);
          }

          .container.left-1 {
            transform: translateX(-140px) scale(0.7) translateZ(-80px);
          }

          .container.right-1 {
            transform: translateX(140px) scale(0.7) translateZ(-80px);
          }

          .container.right-2 {
            transform: translateX(260px) scale(0.5) translateZ(-250px);
          }

          .container.center {
            transform: scale(0.95) translateZ(0);
          }

          .member-name-3d {
            font-size: 1.7rem;
          }

          .member-role-3d {
            font-size: 1rem;
          }

          .title {
            font-size: 16px;
            padding-top: 20px;
          }

          #prompt {
            font-size: 11px;
            bottom: 60px;
          }

          .subtitle {
            font-size: 9px;
            bottom: 25px;
          }

          .nav-arrow-3d {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }
          
          .nav-arrow-3d.left {
            left: 1px;
          }
          
          .nav-arrow-3d.right {
            right: 1px;
          }
        }
      `}</style>

      <div className="team-carousel-3d">
        <div className="about-title-3d">TEAM</div>
        
        <div className="carousel-container-3d">
          <div className="carousel-track-3d">
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                member={member}
                index={index}
                currentIndex={currentIndex}
              />
          ))}
        </div>

          {/* Navigation Arrows */}
          <button 
            className="nav-arrow-3d left"
            onClick={goRight}
          >
            ›
          </button>

        <button 
            className="nav-arrow-3d right"
            onClick={goLeft}
        >
            ‹
        </button>
      </div>

        {/* Member Info */}
        <div className="member-info-3d">
          <div className="member-name-3d">
            {teamMembers[currentIndex].name}
          </div>
          <div className="member-role-3d">
            {teamMembers[currentIndex].role}
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="dots-3d">
        {teamMembers.map((_, index) => (
            <div
            key={index}
              className={`dot-3d ${index === currentIndex ? 'active' : ''}`}
              onClick={() => updateCarousel(index)}
          />
        ))}
      </div>
      </div>
    </>
  );
};

export default TeamCarousel;