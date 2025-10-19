import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import LightRays from './LightRays';

const Hero = () => {
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const contentRef = useRef(null);
  const preloadRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showPreload, setShowPreload] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  // זיהוי מובייל
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // הסתר תוכן בהתחלה
    gsap.set(contentRef.current, { opacity: 0 });
    
    // אנימציית preload - לוגו אמיתי עם כוכבים
    const preloadTimeline = gsap.timeline();
    
    // שלב 1: הצג לוגו אמיתי עם אנימציות כוכבים
    preloadTimeline
      .to(preloadRef.current, {
        opacity: 1,
        duration: 0.4
      })
      .to({}, { duration: 2.2 })
      .to(preloadRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: 0.4,
        onComplete: () => {
          setShowPreload(false);
          startMainAnimation();
        }
      });

    const startMainAnimation = () => {
      // פתח וילונות מהיר
      gsap.to(curtainLeftRef.current, {
        x: '-100%',
        duration: 0.25,
        ease: 'power2.inOut'
      });
      
      gsap.to(curtainRightRef.current, {
        x: '100%',
        duration: 0.25,
        ease: 'power2.inOut',
        onComplete: () => {
          setIsLoaded(true);
          setShowVideo(true);
          gsap.to(contentRef.current, {
            opacity: 1,
            duration: 0.2
          });
        }
      });
    };

  }, []);

  // הפעל את הסרטון כשהקומפוננטה נטענת
  useEffect(() => {
    if (showVideo && videoRef.current) {
      const playVideo = async () => {
        try {
          // וודא שהסרטון מוכן
          videoRef.current.muted = true;
          videoRef.current.loop = true;
          videoRef.current.playsInline = true;
          videoRef.current.autoplay = true;
          
          // המתן שהסרטון יהיה מוכן
          if (videoRef.current.readyState >= 2) {
            await videoRef.current.play();
            console.log('Video started successfully');
          } else {
            // המתן שהסרטון יטען
            videoRef.current.addEventListener('canplay', async () => {
              await videoRef.current.play();
              console.log('Video started after canplay event');
            }, { once: true });
          }
        } catch (error) {
          console.log('Video autoplay failed:', error);
          // נסיון נוסף אחרי זמן קצר
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.play().catch(e => console.log('Second attempt failed:', e));
            }
          }, 500);
        }
      };
      
      playVideo();
    }
  }, [showVideo, isMobile]);

  // הפעל סרטון כשהמשתמש נוגע במסך (במובייל)
  useEffect(() => {
    if (isMobile && showVideo && videoRef.current) {
      const handleTouchStart = () => {
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(e => console.log('Touch play failed:', e));
        }
      };

      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      return () => document.removeEventListener('touchstart', handleTouchStart);
    }
  }, [isMobile, showVideo]);

  return (
    <>
      {/* CSS אנימציות */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap');
        
        @keyframes logoFadeIn {
          0% { 
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          100% { 
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        
        @keyframes logoGlow {
          0%, 100% { 
            filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1));
          }
          50% { 
            filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.2));
          }
        }
        
        /* כוכבים סגלגלים */
        @keyframes starFloat1 {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          50% { 
            transform: translate(10px, -15px) scale(1.2);
            opacity: 1;
          }
        }
        
        @keyframes starFloat2 {
          0%, 100% { 
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.7;
          }
          33% { 
            transform: translate(-8px, 12px) scale(0.8) rotate(120deg);
            opacity: 0.4;
          }
          66% { 
            transform: translate(15px, -8px) scale(1.1) rotate(240deg);
            opacity: 1;
          }
        }
        
        @keyframes starFloat3 {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          50% { 
            transform: translate(-12px, -20px) scale(0.9);
            opacity: 0.3;
          }
        }
        
        @keyframes starTwinkle {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
                        0 0 20px rgba(255, 255, 255, 0.4),
                        0 0 30px rgba(255, 255, 255, 0.2);
          }
          50% { 
            box-shadow: 0 0 15px rgba(255, 255, 255, 1),
                        0 0 30px rgba(255, 255, 255, 0.8),
                        0 0 45px rgba(255, 255, 255, 0.4);
          }
        }
        
        .real-logo {
          animation: logoFadeIn 1s ease-out forwards,
                     logoGlow 3s ease-in-out infinite 1s;
        }
        
        .star {
          position: absolute;
          background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 30%, transparent 70%);
          border-radius: 50%;
          animation: starTwinkle 2s ease-in-out infinite;
        }
        
        .star-1 {
          width: 4px;
          height: 4px;
          top: 25%;
          left: 20%;
          animation: starFloat1 4s ease-in-out infinite,
                     starTwinkle 2s ease-in-out infinite;
        }
        
        .star-2 {
          width: 6px;
          height: 6px;
          top: 35%;
          right: 25%;
          animation: starFloat2 6s ease-in-out infinite,
                     starTwinkle 2.5s ease-in-out infinite 0.5s;
        }
        
        .star-3 {
          width: 3px;
          height: 3px;
          top: 15%;
          left: 45%;
          animation: starFloat3 5s ease-in-out infinite,
                     starTwinkle 1.8s ease-in-out infinite 1s;
        }
        
        .star-4 {
          width: 5px;
          height: 5px;
          bottom: 30%;
          left: 15%;
          animation: starFloat1 7s ease-in-out infinite reverse,
                     starTwinkle 2.2s ease-in-out infinite 1.5s;
        }
        
        .star-5 {
          width: 4px;
          height: 4px;
          bottom: 20%;
          right: 20%;
          animation: starFloat2 5.5s ease-in-out infinite reverse,
                     starTwinkle 2.8s ease-in-out infinite 0.8s;
        }
        
        .star-6 {
          width: 7px;
          height: 7px;
          top: 45%;
          left: 10%;
          animation: starFloat3 4.5s ease-in-out infinite,
                     starTwinkle 2.1s ease-in-out infinite 0.3s;
        }
        
        .star-7 {
          width: 3px;
          height: 3px;
          top: 55%;
          right: 15%;
          animation: starFloat1 6.5s ease-in-out infinite,
                     starTwinkle 1.9s ease-in-out infinite 1.2s;
        }
        
        .star-8 {
          width: 5px;
          height: 5px;
          bottom: 45%;
          left: 35%;
          animation: starFloat2 8s ease-in-out infinite reverse,
                     starTwinkle 2.3s ease-in-out infinite 0.7s;
        }
        
        .star-9 {
          width: 4px;
          height: 4px;
          top: 20%;
          right: 40%;
          animation: starFloat3 5.8s ease-in-out infinite,
                     starTwinkle 2.6s ease-in-out infinite 1.4s;
        }
        
        .star-10 {
          width: 6px;
          height: 6px;
          bottom: 25%;
          right: 45%;
          animation: starFloat1 7.2s ease-in-out infinite reverse,
                     starTwinkle 2.4s ease-in-out infinite 0.2s;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(25px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        }

        /* התאמות LightRays למובייל */
        .hero-light-rays {
          pointer-events: none;
        }
        
        /* התאמות נוספות למובייל */
        @media (max-width: 768px) {
          .hero-light-rays {
            opacity: 0.5 !important;
          }
          
          .real-logo {
            max-width: 85vw !important;
            max-height: 65vh !important;
          }

          body {
            overflow-x: hidden;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          
          body::-webkit-scrollbar {
            display: none;
          }
          
          .glass-card {
            width: 60px !important;
            height: 60px !important;
            font-size: 1.1rem !important;
          }
        }
        
        /* התאמות tablet */
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-light-rays {
            opacity: 0.6 !important;
          }
        }

        /* וידאו רקע */
        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        /* התאמות וידאו למובייל */
        @media (max-width: 768px) {
          .hero-video {
            object-fit: cover;
            object-position: center center;
            transform: scale(1.05);
            width: 105%;
            height: 105%;
            left: -2.5%;
            top: -2.5%;
          }
          
          .video-overlay {
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.2) 100%);
          }
        }

        /* התאמות וידאו לטאבלט */
        @media (min-width: 769px) and (max-width: 1024px) {
          .hero-video {
            object-fit: cover;
            object-position: center center;
          }
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0.5) 30%,
            rgba(0, 0, 0, 0.6) 70%,
            rgba(0, 0, 0, 0.8) 100%
          );
          z-index: 2;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        background: 'linear-gradient(135deg, #1F1F1F 0%, #2A2A2A 50%, #1F1F1F 100%)',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box'
      }}>
        
        {/* וידאו רקע */}
        {showVideo && (
          <motion.video
            ref={videoRef}
            className="hero-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            onLoadedData={() => {
              if (videoRef.current) {
                videoRef.current.play().catch(e => console.log('onLoadedData play failed:', e));
              }
            }}
            onCanPlay={() => {
              if (videoRef.current) {
                videoRef.current.play().catch(e => console.log('onCanPlay play failed:', e));
              }
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 1
            }}
          >
            <source src={isMobile ? "https://res.cloudinary.com/doteohz34/video/upload/q_auto,f_auto/video_capela_pxvzeo.mp4" : "https://res.cloudinary.com/doteohz34/video/upload/q_auto,f_auto/Ha-Cerem_-_Italy_Embassy_2023_GlebSmirnovPro-VEED_sfp5fa.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        )}

        {/* שכבת חיפוי על הוידאו - מופחתת */}
        {showVideo && (
          <motion.div
            className="video-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 30%, rgba(0, 0, 0, 0.25) 70%, rgba(0, 0, 0, 0.4) 100%)',
              zIndex: 2
            }}
          />
        )}

        {/* מעבר fade תחתון לרקע שחור */}
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '200px',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 30%, rgba(0, 0, 0, 0.7) 70%, rgba(28, 28, 28, 1) 100%)',
              zIndex: 3
            }}
          />
        )}
        
        {/* רקע דינמי עם גרדיאנט - רק כשאין וידאו */}
        {!showVideo && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: `
              radial-gradient(circle at 20% 50%, rgba(201, 161, 75, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(168, 50, 121, 0.08) 0%, transparent 50%),
              radial-gradient(circle at 40% 80%, rgba(255, 179, 71, 0.06) 0%, transparent 50%),
              linear-gradient(135deg, #1F1F1F 0%, #2A2A2A 50%, #1F1F1F 100%)
            `,
            zIndex: 1
          }} />
        )}
        
        {/* שכבת חיפוי נוספת - רק כשאין וידאו */}
        {!showVideo && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.2) 100%)',
            zIndex: 2
          }} />
        )}

        {/* LightRays - קרני אור דינמיות */}
        {isLoaded && (
          <motion.div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: 3,
              opacity: isMobile ? 0.4 : 0.7
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: isMobile ? 0.4 : 0.7 }}
            transition={{ duration: 2, delay: 0.8 }}
          >
            <LightRays
              raysOrigin="top-center"
              raysColor="#C9A14B"
              raysSpeed={isMobile ? 0.6 : 0.8}
              lightSpread={isMobile ? 1.8 : 1.2}
              rayLength={isMobile ? 1.0 : 1.5}
              pulsating={true}
              fadeDistance={isMobile ? 0.6 : 0.8}
              saturation={0.9}
              followMouse={!isMobile}
              mouseInfluence={isMobile ? 0 : 0.15}
              noiseAmount={isMobile ? 0.02 : 0.05}
              distortion={isMobile ? 0.01 : 0.03}
              className="hero-light-rays"
            />
          </motion.div>
        )}
        
        {/* Preload Screen - לוגו אמיתי עם כוכבים על רקע שחור פחם */}
        {showPreload && (
          <div 
            ref={preloadRef}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: '#1C1C1C', // שחור פחם
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              opacity: 0,
              overflow: 'hidden'
            }}
          >
            
            {/* כוכבים סגלגלים */}
            <div className="star star-1"></div>
            <div className="star star-2"></div>
            <div className="star star-3"></div>
            <div className="star star-4"></div>
            <div className="star star-5"></div>
            <div className="star star-6"></div>
            <div className="star star-7"></div>
            <div className="star star-8"></div>
            <div className="star star-9"></div>
            <div className="star star-10"></div>
            
            {/* הלוגו האמיתי במרכז */}
            <motion.div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                zIndex: 103
              }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src="https://res.cloudinary.com/doteohz34/image/upload/q_auto:best,f_auto/realLOGO_ctei5e.png"
                alt="OMC Logo"
                className="real-logo"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  maxWidth: 'min(80vw, 700px)',
                  maxHeight: 'min(70vh, 600px)',
                  objectFit: 'contain',
                  zIndex: 103
                }}
              />
            </motion.div>
          </div>
        )}


        {/* וילון שמאל */}
        <div ref={curtainLeftRef} style={{
          position: 'absolute', top: 0, left: 0, width: '50%', height: '100%',
          background: 'linear-gradient(135deg, #1F1F1F 0%, #2A2A2A 100%)', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ 
            color: 'rgba(201, 161, 75, 0.4)', 
            fontSize: '1.8rem', 
            fontWeight: '300', 
            letterSpacing: '0.2em',
            fontFamily: 'Playfair Display, Times, serif'
          }}>
            OMC
          </div>
        </div>

        {/* וילון ימין */}
        <div ref={curtainRightRef} style={{
          position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
          background: 'linear-gradient(225deg, #1F1F1F 0%, #2A2A2A 100%)', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ 
            color: 'rgba(168, 50, 121, 0.4)', 
            fontSize: '1.8rem', 
            fontWeight: '300', 
            letterSpacing: '0.2em',
            fontFamily: 'Playfair Display, Times, serif'
          }}>
            EVENTS
          </div>
        </div>
        
        {/* תוכן ראשי */}
        <div ref={contentRef} style={{ 
          position: 'relative',
          zIndex: 15, 
          maxWidth: '1200px', 
          padding: '0 20px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center'
        }}>
          
          {/* Glass card container - רק בדסקטופ */}
          {!isMobile && (
            <motion.div
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '40px 30px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                marginBottom: '2rem'
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {/* משפט יחיד במרכז - פונט דק לבן */}
              <motion.h1 
                style={{ 
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
                  marginBottom: '4rem',
                  fontWeight: '200',
                  lineHeight: 1.4,
                  color: 'white',
                  fontFamily: 'Heebo, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  textShadow: '0 2px 20px rgba(0, 0, 0, 0.9), 0 4px 40px rgba(0, 0, 0, 0.6)',
                  letterSpacing: '0.02em',
                  maxWidth: '800px',
                  whiteSpace: 'nowrap',
                  zIndex: 15,
                  position: 'relative',
                  textAlign: 'center',
                  margin: 'initial'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                רוקחים טעמים, יוצרים חוויה
              </motion.h1>
            </motion.div>
          )}
          
          {/* כפתור מינימליסטי-יוקרתי */}
          <motion.button 
            style={{
              backgroundColor: isMobile ? 'rgba(201, 161, 75, 0.2)' : 'transparent',
              border: '1.5px solid white',
              color: 'white',
              padding: isMobile ? '16px 32px' : '12px 28px',
              borderRadius: '50px',
              fontSize: isMobile ? '1.2rem' : '1.1rem',
              fontWeight: '500',
              cursor: 'pointer',
              fontFamily: 'Heebo, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              position: 'relative',
              overflow: 'hidden',
              textShadow: '0 1px 10px rgba(0, 0, 0, 0.8)',
              transition: 'all 0.3s ease',
              letterSpacing: '0.02em',
              minWidth: isMobile ? '250px' : '200px',
              zIndex: 15,
              backdropFilter: 'blur(10px)',
              boxShadow: isMobile ? '0 6px 30px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.2) inset' : '0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(255, 255, 255, 0.1) inset'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ 
              backgroundColor: 'rgba(201, 161, 75, 0.2)',
              color: '#C9A14B',
              borderColor: '#C9A14B',
              scale: 1.02,
              boxShadow: '0 6px 30px rgba(201, 161, 75, 0.4), 0 1px 0 rgba(255, 255, 255, 0.2) inset'
            }}
            whileTap={{ scale: 0.98 }}
          >
            האירוע שלכם מתחיל כאן
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Hero;
