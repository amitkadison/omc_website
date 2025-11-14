import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ContactForm from './ContactForm';

const ShinyText = ({ text, speed = 3 }) => {
  return (
    <span 
      style={{
        background: 'linear-gradient(90deg, #ffffff 25%, #3b82f6 50%, #ffffff 75%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: `shine ${speed}s ease-in-out infinite alternate`
      }}
    >
      {text}
      <style>{`
        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
      `}</style>
    </span>
  );
};


const AboutPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visionLines = [
    "אנחנו רוקחים את הידע והדמיון",
    "לכוס אחת מושלמת"
  ];

  const visionSectionRef = useRef(null);
  const ourStorySectionRef = useRef(null);
  const omerSectionRef = useRef(null);
  
  const imagesInView = useInView(visionSectionRef, { 
    margin: isMobile ? "0px" : "-20% 0px -20% 0px",
    once: false
  });

  const imagesFallTrigger = useInView(visionSectionRef, { 
    margin: isMobile ? "0px 0px -30% 0px" : "0px 0px -70% 0px",
    once: true 
  });

  const ourStoryInView = useInView(ourStorySectionRef, {
    margin: "0px 0px -10% 0px",
    once: false
  });

  const omerInView = useInView(omerSectionRef, { 
    margin: "0px 0px -10% 0px",
    once: false 
  });

  return (
    <>
      {/* Global Contact Form Handler */}
      <ContactForm isGlobalHandler={true} />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@400;500;600;700;800&display=swap');
        
        .about-page {
          min-height: 100vh;
          width: 100%;
          direction: rtl;
          font-family: 'Varela Round', sans-serif;
          background: #0A0A0A;
          position: relative;
          overflow-x: hidden;
        }

        .about-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        /* פסקת החזון */
        .vision-section {
          padding: 180px 40px 60px;
          text-align: center;
          position: relative;
        }

        .vision-text {
          font-size: 80px;
          font-weight: 700;
          font-family: 'Varela Round', sans-serif;
          background: linear-gradient(180deg, #ffffff 0%, #999999 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          direction: rtl;
          position: relative;
          z-index: 1;
        }

        .vision-text::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 300px;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 40%, rgba(109, 40, 217, 0.05) 70%, transparent 100%);
          filter: blur(60px);
          z-index: -1;
          pointer-events: none;
        }

        .vision-line {
          display: block;
          margin-bottom: 0.3rem;
        }

        /* תמונות זכוכית - Desktop בלבד */
        @media (min-width: 769px) {
          .vision-images-container {
            width: 100vw;
            height: 500px;
            position: relative;
            overflow: visible;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            gap: 30px;
            padding: 0 20px;
            margin: 40px calc(-50vw + 50%) 0;
          }

          .vision-image {
            flex: 1;
            height: 400px;
            overflow: hidden;
            border-radius: 12px;
            transition: all 0.4s ease;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          .vision-image:nth-child(2) {
            flex: 1.2;
            height: 480px;
          }

          .vision-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 12px;
          }
        }

        @media (max-width: 768px) {
          .vision-images-container {
            display: none;
          }
        }

        /* סקשן הסיפור שלנו */
        .our-story-section {
          padding: 40px 40px;
          position: relative;
          text-align: center;
          margin-top: -40px;
        }

        @media (min-width: 769px) {
          .our-story-section {
            min-height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            transition: all 1s ease;
          }

          .our-story-section.images-fallen {
            margin-top: -480px;
          }
        }

        @media (max-width: 768px) {
          .our-story-section {
            padding: 30px 20px;
            margin-top: 0;
            position: relative;
          }

          .our-story-section::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 200px;
            background: radial-gradient(ellipse at center, rgba(201, 161, 75, 0.1) 0%, transparent 70%);
            filter: blur(40px);
            z-index: 1;
            pointer-events: none;
          }
        }

        .our-story-title {
          font-size: 52px;
          font-weight: 600;
          font-family: 'Varela Round', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(180deg, #ffffff 0%, #999999 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          margin: 0 auto 40px auto;
          letter-spacing: -0.5px;
          position: relative;
          z-index: 2;
        }

        .our-story-title::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 250px;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 40%, rgba(109, 40, 217, 0.05) 70%, transparent 100%);
          filter: blur(60px);
          z-index: -1;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .our-story-title {
            font-size: 2.5rem;
            margin-bottom: 20px;
            letter-spacing: -0.3px;
            background: linear-gradient(135deg, #F7C873 0%, #C9A14B 50%, #A67C52 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 2px 8px rgba(201, 161, 75, 0.3);
            position: relative;
            z-index: 2;
          }
        }

        .our-story-content {
          max-width: 900px;
          margin: 0 auto;
          font-size: 22px;
          line-height: 1.7;
          color: #CCCCCC;
          font-family: 'Varela Round', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 400;
          letter-spacing: -0.2px;
          position: relative;
        }

        .our-story-content::before {
          content: '';
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 350px;
          height: 250px;
          background: radial-gradient(ellipse 100% 100% at 50% 50%, rgba(139, 92, 246, 0.12) 0%, rgba(124, 58, 237, 0.08) 40%, rgba(109, 40, 217, 0.05) 70%, transparent 100%);
          filter: blur(55px);
          z-index: -1;
          pointer-events: none;
        }

        .our-story-stars {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          z-index: 1;
        }

        .our-story-star {
          position: absolute;
          color: rgba(255, 255, 255, 0.2);
          font-size: 8px;
          animation: twinkle 6s ease-in-out infinite;
        }

        .our-story-star:nth-child(1) { top: 10%; left: 5%; animation-delay: 0s; }
        .our-story-star:nth-child(2) { top: 20%; right: 8%; animation-delay: 2s; }
        .our-story-star:nth-child(3) { top: 30%; left: 3%; animation-delay: 4s; }
        .our-story-star:nth-child(4) { top: 15%; right: 3%; animation-delay: 1s; }
        .our-story-star:nth-child(5) { top: 25%; left: 7%; animation-delay: 3s; }

        @media (max-width: 768px) {
          .our-story-content {
            font-size: 18px;
            line-height: 1.7;
            padding: 25px 20px;
            background: rgba(255, 255, 255, 0.02);
            background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01));
            backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
            -webkit-backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 
              0 12px 30px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
              inset 0 -1px 0 0 rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 2;
            color: rgba(255, 255, 255, 0.9);
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }

          .our-story-content::before {
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 280px;
            height: 180px;
            background: radial-gradient(ellipse 100% 100% at 50% 50%, rgba(139, 92, 246, 0.10) 0%, rgba(124, 58, 237, 0.07) 40%, rgba(109, 40, 217, 0.04) 70%, transparent 100%);
            filter: blur(40px);
            z-index: -1;
          }
        }

        .our-story-highlight {
          font-size: 26px;
          font-weight: 600;
          background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .our-story-highlight {
            font-size: 20px;
            display: block;
            margin-top: 12px;
            background: linear-gradient(135deg, #F7C873 0%, #C9A14B 50%, #A67C52 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 2px 8px rgba(201, 161, 75, 0.3);
            font-weight: 700;
            position: relative;
            z-index: 2;
          }
        }

        /* סקשן עומר */
        .omer-section {
          padding: 50px 40px 30px;
          position: relative;
        }

        @media (min-width: 769px) {
          .omer-section {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 80px;
            min-height: auto;
          }

          .omer-image-container {
            flex: 1;
            max-width: 450px;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .omer-image-box-desktop {
            position: absolute;
            top: -16px;
            left: -16px;
            right: -16px;
            bottom: -16px;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 20px;
            background: rgba(255, 255, 255, 0.02);
            backdrop-filter: blur(25px);
            z-index: -1;
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          }

          .omer-image-box-desktop::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.04) 0%, transparent 25%, transparent 75%, rgba(124, 58, 237, 0.03) 100%);
            border-radius: 20px;
            pointer-events: none;
            z-index: 1;
          }

          .omer-image {
            width: 100%;
            height: auto;
            max-height: 350px;
            object-fit: contain;
            filter: contrast(1.05) brightness(1.02);
            transition: transform 0.3s ease;
          }

          .omer-content {
            flex: 1;
            max-width: 500px;
            direction: rtl;
            text-align: right;
            margin-right: 20px;
            position: relative;
            padding: 40px 30px;
          }

          .omer-content::before {
            content: '';
            position: absolute;
            top: 30%;
            left: 20%;
            transform: translate(-50%, -50%);
            width: 400px;
            height: 300px;
            background: radial-gradient(ellipse 120% 100% at 20% 30%, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 40%, rgba(109, 40, 217, 0.05) 70%, transparent 100%);
            filter: blur(50px);
            z-index: -1;
            pointer-events: none;
          }

        }

        @media (max-width: 768px) {
          .omer-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 30px 20px 20px;
          }

          .omer-header-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
            width: 100%;
            direction: rtl;
          }

          .omer-image-container {
            width: 240px;
            height: 240px;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            border: 3px solid rgba(255, 255, 255, 0.2);
            flex-shrink: 0;
            position: relative;
          }

          .omer-image-box {
            position: absolute;
            top: -12px;
            left: -12px;
            right: -12px;
            bottom: -12px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 16px;
            background: rgba(255, 255, 255, 0.03);
            backdrop-filter: blur(20px);
            z-index: -1;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
          }

          .omer-image-box::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.04) 0%, transparent 25%, transparent 75%, rgba(124, 58, 237, 0.03) 100%);
            border-radius: 16px;
            pointer-events: none;
            z-index: 1;
          }

          .omer-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
          }

          .omer-content {
            text-align: right;
            width: 100%;
            padding: 25px 20px;
            position: relative;
            margin-top: 15px;
            background: rgba(255, 255, 255, 0.02);
            background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01));
            backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
            -webkit-backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 
              0 15px 35px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
              inset 0 -1px 0 0 rgba(0, 0, 0, 0.2),
              0 0 0 1px rgba(255, 255, 255, 0.05);
            transition: all 0.3s ease;
          }

          .omer-content:hover {
            background: rgba(255, 255, 255, 0.18);
            transform: translateY(-2px);
            box-shadow: 0 16px 64px rgba(0, 0, 0, 0.25);
          }

          .omer-content::before {
            content: '';
            position: absolute;
            top: 25%;
            left: 15%;
            transform: translate(-50%, -50%);
            width: 320px;
            height: 200px;
            background: radial-gradient(ellipse 110% 100% at 15% 25%, rgba(139, 92, 246, 0.12) 0%, rgba(124, 58, 237, 0.08) 40%, rgba(109, 40, 217, 0.04) 70%, transparent 100%);
            filter: blur(35px);
            z-index: -1;
            pointer-events: none;
          }

        }

        .omer-title {
          font-size: 3.2rem;
          color: #ffffff;
          font-weight: 600;
          letter-spacing: -0.5px;
          margin-bottom: 40px;
          font-family: 'Varela Round', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          line-height: 1.05;
          white-space: nowrap;
          position: relative;
          z-index: 2;
        }

        .omer-title::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 450px;
          height: 280px;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 40%, rgba(109, 40, 217, 0.05) 70%, transparent 100%);
          filter: blur(60px);
          z-index: -1;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .omer-title {
            font-size: 2.8rem;
            margin-bottom: 20px;
            text-align: center;
            white-space: nowrap;
            letter-spacing: -0.3px;
            font-weight: 700;
            background: linear-gradient(135deg, #F7C873 0%, #C9A14B 50%, #A67C52 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 0 2px 8px rgba(201, 161, 75, 0.3);
            position: relative;
            z-index: 2;
          }
        }

        .omer-description {
          font-size: 18px;
          color: #CCCCCC;
          line-height: 1.6;
          margin-bottom: 20px;
          font-family: 'Varela Round', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 400;
          letter-spacing: -0.1px;
        }

        @media (max-width: 768px) {
          .omer-description {
            font-size: 18px;
            line-height: 1.6;
            margin-bottom: 16px;
            font-weight: 400;
            color: rgba(255, 255, 255, 0.9);
            letter-spacing: -0.1px;
            font-family: 'Varela Round', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
            position: relative;
            z-index: 2;
          }
        }


        /* Experience Section */
        .experience-section {
          padding: 40px 40px;
          position: relative;
          text-align: center;
        }

        @media (max-width: 768px) {
          .experience-section {
            padding: 30px 20px;
            position: relative;
          }

          .experience-title {
            font-size: 2rem;
            margin-bottom: 20px;
            text-shadow: 0 2px 8px rgba(201, 161, 75, 0.3);
            position: relative;
            z-index: 2;
          }

          .experience-section::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 200px;
            background: radial-gradient(ellipse at center, rgba(201, 161, 75, 0.1) 0%, transparent 70%);
            filter: blur(40px);
            z-index: 1;
            pointer-events: none;
          }
        }

        .experience-title {
          font-size: 2.5rem;
          font-weight: 700;
          font-family: 'Varela Round', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #F7C873 0%, #C9A14B 50%, #A67C52 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 30px;
          letter-spacing: -0.5px;
          line-height: 1.2;
          position: relative;
          z-index: 2;
        }

        .experience-title::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 250px;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 40%, rgba(109, 40, 217, 0.05) 70%, transparent 100%);
          filter: blur(60px);
          z-index: -1;
          pointer-events: none;
        }

        .experience-content {
          max-width: 900px;
          margin: 0 auto;
          font-size: 20px;
          line-height: 1.5;
          color: #CCCCCC;
          font-family: 'Varela Round', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-weight: 400;
          letter-spacing: -0.1px;
          position: relative;
          text-align: center;
        }

        .experience-content::before {
          content: '';
          position: absolute;
          top: 35%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 350px;
          height: 250px;
          background: radial-gradient(ellipse 100% 100% at 50% 50%, rgba(139, 92, 246, 0.12) 0%, rgba(124, 58, 237, 0.08) 40%, rgba(109, 40, 217, 0.05) 70%, transparent 100%);
          filter: blur(55px);
          z-index: -1;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .experience-content {
            font-size: 17px;
            line-height: 1.5;
            padding: 20px 18px;
            background: rgba(255, 255, 255, 0.02);
            background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01));
            backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
            -webkit-backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 
              0 12px 30px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
              inset 0 -1px 0 0 rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 2;
            color: rgba(255, 255, 255, 0.9);
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
          }

          .experience-content::before {
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 280px;
            height: 180px;
            background: radial-gradient(ellipse 100% 100% at 50% 50%, rgba(139, 92, 246, 0.10) 0%, rgba(124, 58, 237, 0.07) 40%, rgba(109, 40, 217, 0.04) 70%, transparent 100%);
            filter: blur(40px);
            z-index: -1;
          }
        }

        /* CTA Section */
        .cta-section {
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px 80px;
          margin-top: 40px;
          z-index: 1;
        }

        .cta-container {
          background: rgba(255, 255, 255, 0.02);
          background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01));
          backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
          -webkit-backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 0 rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          max-width: 1200px;
          width: 100%;
          padding: 50px;
          z-index: 2;
        }

        .cta-container:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: translateY(-2px);
          box-shadow: 0 16px 64px rgba(0, 0, 0, 0.25);
        }

        .cta-title {
          font-size: 1.6rem;
          font-weight: 700;
          background: linear-gradient(180deg, #ffffff 0%, #999999 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-align: center;
          margin-bottom: 2rem;
          font-family: 'Varela Round', sans-serif;
          letter-spacing: -0.5px;
        }

        .form-container {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          direction: rtl;
        }

        .form-input {
          flex: 1;
          min-width: 200px;
          padding: 16px 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 17px;
          border-radius: 16px;
          direction: rtl;
          backdrop-filter: blur(15px);
          box-sizing: border-box;
          font-family: 'Varela Round', sans-serif;
          font-weight: 400;
          letter-spacing: -0.1px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          outline: none;
        }

        .form-input:focus {
          border: 1px solid rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          opacity: 1;
        }

        .submit-btn {
          padding: 18px 36px;
          background: linear-gradient(135deg, #C9A14B 0%, #A67C52 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 17px;
          cursor: pointer;
          min-width: 160px;
          width: auto;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: 'Varela Round', sans-serif;
          font-weight: 700;
          letter-spacing: -0.1px;
          box-shadow: 0 4px 16px rgba(201, 161, 75, 0.35);
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover {
          background: linear-gradient(135deg, #D4AF5E 0%, #B88A61 100%);
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(201, 161, 75, 0.45);
        }

        .submit-btn:active {
          transform: translateY(-1px) scale(1.02);
        }

        @media (max-width: 768px) {
          .vision-text {
            font-size: 38px;
            padding: 0 20px;
          }

          .cta-section {
            padding: 30px 20px 40px;
          }

          .cta-container {
            padding: 25px 20px !important;
            border-radius: 20px !important;
            margin: 0 15px !important;
            box-shadow:
              0 8px 24px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.15) !important;
          }

          .cta-title {
            font-size: 1.4rem !important;
            margin-bottom: 1.5rem !important;
          }

          .form-container {
            flex-direction: column !important;
            gap: 0.9rem !important;
          }

          .form-input {
            min-width: 100% !important;
            padding: 14px 18px !important;
            font-size: 16px !important;
            border-radius: 14px !important;
            background: rgba(255, 255, 255, 0.15) !important;
            border: 1.5px solid rgba(255, 255, 255, 0.25) !important;
            transition: all 0.3s ease !important;
          }

          .form-input:focus {
            background: rgba(255, 255, 255, 0.25) !important;
            border: 1.5px solid rgba(201, 161, 75, 0.6) !important;
            box-shadow: 0 0 0 3px rgba(201, 161, 75, 0.2), 0 4px 20px rgba(201, 161, 75, 0.3) !important;
            transform: translateY(-2px) !important;
          }

          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.75) !important;
            font-size: 16px !important;
          }

          .submit-btn {
            width: 100% !important;
            padding: 16px 28px !important;
            font-size: 16px !important;
            margin-top: 0.5rem;
            background: linear-gradient(135deg, #C9A14B 0%, #A67C52 100%) !important;
            box-shadow: 0 4px 16px rgba(201, 161, 75, 0.35) !important;
            border-radius: 14px !important;
          }

          .submit-btn:hover {
            background: linear-gradient(135deg, #D4AF5E 0%, #B88A61 100%) !important;
            box-shadow: 0 8px 25px rgba(201, 161, 75, 0.5), 0 0 0 1px rgba(201, 161, 75, 0.3) !important;
            transform: translateY(-2px) scale(1.02) !important;
          }

          .submit-btn:active {
            transform: translateY(-1px) scale(1.02) !important;
          }
        }

        @media (max-width: 480px) {
          .vision-text {
            font-size: 28px;
            padding: 0 15px;
          }
        }
      `}</style>

      <div className="about-page">
        <div className="about-container">
          {/* פסקת החזון */}
          <motion.div 
            className="vision-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="vision-text"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {visionLines.map((line, index) => (
                <motion.span
                  key={index}
                  className="vision-line"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  {line}
                </motion.span>
              ))}
            </motion.div>

            {/* תמונות זכוכית - רק בדסקטופ */}
            {!isMobile && (
              <motion.div
                ref={visionSectionRef}
                className="vision-images-container"
                initial={{ opacity: 0, y: 50 }}
                animate={imagesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.div
                  className="vision-image"
                  initial="idle"
                  animate={imagesFallTrigger ? "fall" : "idle"}
                  variants={{
                    idle: { y: 0, rotate: 0, opacity: 1, scale: 1 },
                    fall: {
                      y: 500,
                      rotate: -12,
                      opacity: 0,
                      scale: 0.9,
                      transition: {
                        duration: 1.1,
                        ease: "easeOut",
                        delay: 0.1
                      }
                    }
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/doteohz34/image/upload/v1760632649/_DSC8019_fv21tc.jpg"
                    alt="אירועי חברה מקצועיים"
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  className="vision-image"
                  initial="idle"
                  animate={imagesFallTrigger ? "fall" : "idle"}
                  variants={{
                    idle: { y: 0, rotate: 0, opacity: 1, scale: 1 },
                    fall: {
                      y: 650,
                      rotate: 8,
                      opacity: 0,
                      scale: 0.8,
                      transition: {
                        duration: 1.3,
                        ease: "easeOut",
                        delay: 0.25
                      }
                    }
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_800/DSC03566_trxtjs.jpg"
                    alt="חתונות וקוקטיילים"
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  className="vision-image"
                  initial="idle"
                  animate={imagesFallTrigger ? "fall" : "idle"}
                  variants={{
                    idle: { y: 0, rotate: 0, opacity: 1, scale: 1 },
                    fall: {
                      y: 480,
                      rotate: 18,
                      opacity: 0,
                      scale: 0.85,
                      transition: {
                        duration: 1.0,
                        ease: "easeOut",
                        delay: 0.15
                      }
                    }
                  }}
                >
                  <img
                    src="https://res.cloudinary.com/doteohz34/image/upload/v1760632650/_DSC8091_qmgv1z.jpg"
                    alt="קוקטיילים מקצועיים"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* סקשן הסיפור שלנו - חדש! */}
          <motion.div
            ref={ourStorySectionRef}
            className={`our-story-section ${!isMobile && imagesFallTrigger ? 'images-fallen' : ''}`}
            initial={{ opacity: 0 }}
            animate={
              isMobile
                ? (ourStoryInView ? { opacity: 1 } : { opacity: 0 })
                : (imagesFallTrigger 
                    ? { 
                        opacity: 1,
                        transition: { 
                          duration: 0.8,
                          delay: 0.8,
                          ease: "easeOut"
                        }
                      }
                    : { opacity: 0 })
            }
          >
            <h1 className="our-story-title">קצת עלינו</h1>
            <div className="our-story-content">
              <div className="our-story-stars">
                <div className="our-story-star">✦</div>
                <div className="our-story-star">✦</div>
                <div className="our-story-star">✦</div>
                <div className="our-story-star">✦</div>
                <div className="our-story-star">✦</div>
              </div>
              ב-<span style={{ fontFamily: "'Varela Round', sans-serif", direction: "ltr", display: "inline-block" }}>OMC</span> אנחנו מאמינים שתשוקה וכישרון הם המפתח להצלחה. 
              הצוות שלנו אנשים טובים שאוהבים את מה שהם עושים מביא איתו אנרגיה, חיוך והמון יצירתיות. 
              בין אם זו חתונת השנה או Happy Hour בחברה שלכם אנחנו יודעים לעשות דבר אחד מצוין:
              <br />
              <span className="our-story-highlight">להרים את האירוע שלכם כמה דרגות למעלה.</span>
            </div>
          </motion.div>

          {/* חלק עומר */}
          <motion.div 
            ref={omerSectionRef}
            className="omer-section"
            initial={{ opacity: 0, y: 50 }}
            animate={omerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            {isMobile ? (
              <>
                <motion.div
                  className="omer-header-container"
                  initial={{ opacity: 0, x: 50 }}
                  animate={omerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="omer-image-container">
                    <div className="omer-image-box"></div>
                    <img
                      src="https://res.cloudinary.com/doteohz34/image/upload/v1760629339/omer_shaking_nxtdee.png"
                      alt="הברמן עומר"
                      className="omer-image"
                    />
                  </div>
                  <h2 className="omer-title">
                    הסיפור מאחורי OMC
                  </h2>
                </motion.div>

                <motion.div 
                  className="omer-content"
                  initial={{ opacity: 0, y: 30 }}
                  animate={omerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  {/* Floating particles */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      style={{
                        position: 'absolute',
                        width: '3px',
                        height: '3px',
                        background: '#C9A14B',
                        borderRadius: '50%',
                        boxShadow: '0 0 6px #C9A14B',
                        left: `${15 + i * 25}%`,
                        top: `${10 + i * 15}%`,
                        zIndex: 1
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.3, 1]
                      }}
                      transition={{
                        duration: 2.5 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  <p className="omer-description">
                    <strong>עומר הבעלים של OMC</strong>, בוגר מיקסולוגיה בפריז עם מעל עשור ניסיון בעולם הקוקטיילים המרתק. מייסד OMC - המתמחים באמנות הקוקטיילים והפקת אירועים בלתי נשכחים.
                  </p>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  className="omer-image-container"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={omerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="omer-image-box-desktop"></div>
                  <img
                    src="https://res.cloudinary.com/doteohz34/image/upload/v1760629339/omer_shaking_nxtdee.png"
                    alt="הברמן עומר"
                    className="omer-image"
                  />
                </motion.div>

                <motion.div 
                  className="omer-content"
                  initial={{ opacity: 0, y: 30 }}
                  animate={omerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="omer-title">הסיפור מאחורי OMC</h2>
                  <p className="omer-description">
                    <strong>עומר הבעלים של OMC</strong>, בוגר לימודי מיקסולוגיה בפריז ובעל ניסיון של מעל עשור בעולם הקוקטיילים. התשוקה שלי ליצירת משקאות ייחודיים ומרהיבים הובילה אותי ליצור את OMC. כל קוקטייל שאני מכין הוא סיפור בפני עצמו - שילוב של טכניקות מסורתיות עם חידושים מודרניים. המטרה שלי היא להפוך כל אירוע לחוויה בלתי נשכחת, שבה כל משקה מספר סיפור ומשאיר טעם של עוד.
                  </p>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* פסקה חדשה על חוויות האירועים */}
          <motion.div
            className="experience-section"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="experience-title">החוויה שלנו</h3>
            <div className="experience-content">
              בכל אירוע שאנחנו מלווים – המטרה שלנו אחת: ליצור רגעים שהופכים לחוויות וזיכרונות. אנחנו רואים בבר לא רק עמדת שתייה, אלא לב האירוע – המקום שבו האורחים נפגשים, נפתחים וצוחקים יחד. עם שירות מדויק, עיצוב מוקפד וקוקטיילים שגורמים לכל אחד לעצור לרגע ולהגיד "וואו" – אנחנו מבטיחים שכל אירוע יקבל את הטוויסט שיזכרו עוד הרבה אחרי שהכוס האחרונה תתרוקן.
            </div>
          </motion.div>

        </div>

        {/* CTA Section */}
        <motion.div
          className="cta-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="cta-container"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="cta-title">השאירו פרטים ונחזור אליכם</h2>
            
            <form className="form-container">
              <input 
                type="text" 
                name="name"
                placeholder="השם שלך"
                className="form-input"
                aria-label="שם"
                required
              />
              
              <input 
                type="tel" 
                name="phone"
                placeholder="מספר הטלפון"
                className="form-input"
                aria-label="טלפון"
                required
              />
              
              <button
                type="submit"
                className="submit-btn"
                aria-label="שלח טופס"
              >
                שלח
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutPage;
