// components/MAINPAGE.jsx
// Grid-optimized and refactored main page
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { useResponsive } from '../hooks/useResponsive.js';
import CircularGallery from './CircularGallery.js';
import { StickyScroll } from "./ui/StickyScroll";
import PinterestGalleryNew from './PinterestGalleryNew';
import SplitText from './SplitText';
import ContactForm from './ContactForm';

// Register ScrollTrigger once
gsap.registerPlugin(ScrollTrigger);

// ========================================================================================
// CONSTANTS & CONFIGURATIONS
// ========================================================================================
const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.8,
  verySlow: 1.2
};

const COLORS = {
  primary: '#C9A14B',
  secondary: '#A83279',
  white: '#FFFFFF',
  dark: '#1C1C1C',
  darkBg: '#0D0D0D',
  glassBg: 'rgba(255, 255, 255, 0.15)',
  glassWhite: 'rgba(255, 255, 255, 0.2)'
};

const FONTS = {
  primary: 'Varela Round, sans-serif',
  secondary: 'Varela Round, sans-serif',
  display: 'Varela Round, sans-serif',
  system: 'Varela Round, sans-serif'
};

// Improved Grid System Configuration
const GRID_SYSTEM = {
  // Section padding - consistent spacing throughout
  sectionPadding: {
    mobile: { top: '3rem', bottom: '3rem', horizontal: '1.25rem' },
    tablet: { top: '4rem', bottom: '4rem', horizontal: '2rem' },
    laptop: { top: '5rem', bottom: '5rem', horizontal: '3rem' },
    desktop: { top: '6rem', bottom: '6rem', horizontal: '4rem' },
    large: { top: '7rem', bottom: '7rem', horizontal: '5rem' }
  },
  // Element spacing - consistent gaps between elements
  elementSpacing: {
    mobile: { xsmall: '0.3rem', small: '1rem', medium: '2rem', large: '3rem' },
    tablet: { xsmall: '0.5rem', small: '1.25rem', medium: '2.5rem', large: '3.5rem' },
    laptop: { xsmall: '0.7rem', small: '1.5rem', medium: '3rem', large: '4rem' },
    desktop: { xsmall: '0.8rem', small: '1.75rem', medium: '3.5rem', large: '4.5rem' },
    large: { xsmall: '1rem', small: '2rem', medium: '4rem', large: '5rem' }
  },
  // Max content widths
  maxWidth: {
    content: '1200px',
    wide: '1400px',
    full: '100%'
  }
};

// ========================================================================================
// SHARED STYLES
// ========================================================================================
const sharedStyles = {
  glassCard: {
    // זכוכית שקופה מושלמת
    background: 'rgba(255, 255, 255, 0.02)',
    backgroundImage: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01))',
    backdropFilter: 'blur(20px) brightness(1.1) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) brightness(1.1) saturate(180%)',
    borderRadius: '24px',
    // מספר שכבות של borders
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderTop: '1px solid rgba(255, 255, 255, 0.15)',
    // צללים למימד
    boxShadow: `
      0 15px 35px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
      inset 0 -1px 0 0 rgba(0, 0, 0, 0.2),
      0 0 0 1px rgba(255, 255, 255, 0.05) inset
    `
  },
  
  sectionTitle: {
    fontWeight: '700',
    color: COLORS.white,
    fontFamily: FONTS.primary,
    lineHeight: 1.2,
    textAlign: 'center',
    direction: 'rtl'
  },
  
  gradientText: {
    background: 'linear-gradient(180deg, #ffffff 0%, #999999 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  }
};

// ========================================================================================
// UTILITY HOOKS
// ========================================================================================
const useGridSpacing = () => {
  const { getResponsiveValue } = useResponsive();
  
  const getSectionPadding = () => {
    return getResponsiveValue({
      mobile: `${GRID_SYSTEM.sectionPadding.mobile.top} ${GRID_SYSTEM.sectionPadding.mobile.horizontal} ${GRID_SYSTEM.sectionPadding.mobile.bottom}`,
      tablet: `${GRID_SYSTEM.sectionPadding.tablet.top} ${GRID_SYSTEM.sectionPadding.tablet.horizontal} ${GRID_SYSTEM.sectionPadding.tablet.bottom}`,
      laptop: `${GRID_SYSTEM.sectionPadding.laptop.top} ${GRID_SYSTEM.sectionPadding.laptop.horizontal} ${GRID_SYSTEM.sectionPadding.laptop.bottom}`,
      desktop: `${GRID_SYSTEM.sectionPadding.desktop.top} ${GRID_SYSTEM.sectionPadding.desktop.horizontal} ${GRID_SYSTEM.sectionPadding.desktop.bottom}`,
      large: `${GRID_SYSTEM.sectionPadding.large.top} ${GRID_SYSTEM.sectionPadding.large.horizontal} ${GRID_SYSTEM.sectionPadding.large.bottom}`
    });
  };
  
  const getElementSpacing = (size = 'medium') => {
    return getResponsiveValue({
      mobile: GRID_SYSTEM.elementSpacing.mobile[size],
      tablet: GRID_SYSTEM.elementSpacing.tablet[size],
      laptop: GRID_SYSTEM.elementSpacing.laptop[size],
      desktop: GRID_SYSTEM.elementSpacing.desktop[size],
      large: GRID_SYSTEM.elementSpacing.large[size]
    });
  };
  
  return { getSectionPadding, getElementSpacing };
};

// ========================================================================================
// GLOBAL STYLES COMPONENT
// ========================================================================================
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${FONTS.system};
      background: ${COLORS.darkBg};
      color: ${COLORS.white};
      overflow-x: hidden;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    img, video {
      will-change: transform;
    }
  `}</style>
);

// ========================================================================================
// HERO SECTION
// ========================================================================================
const HeroSection = React.memo(({ onButtonClick }) => {
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const contentRef = useRef(null);
  const preloadRef = useRef(null);
  const videoRef = useRef(null);
  
  const [state, setState] = useState({
    isLoaded: false,
    showPreload: true,
    showVideo: false,
    isMobile: false,
    videoPlaying: false,
    showPlayPrompt: false
  });

  // פונקציה להפעלת הוידאו
  const playVideoHandler = async () => {
    if (videoRef.current) {
      try {
        const video = videoRef.current;
        video.muted = true;
        video.playsInline = true;
        await video.play();
        setState(prev => ({ ...prev, videoPlaying: true, showPlayPrompt: false }));
        console.log('Video playing successfully');
      } catch (error) {
        console.log('Play failed:', error);
        setState(prev => ({ ...prev, showPlayPrompt: true }));
      }
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setState(prev => ({ ...prev, isMobile: window.innerWidth <= 768 }));
    };

    checkMobile();
    const throttledCheck = () => requestAnimationFrame(checkMobile);
    window.addEventListener('resize', throttledCheck);

    return () => window.removeEventListener('resize', throttledCheck);
  }, []);

  useEffect(() => {
    gsap.set(contentRef.current, { opacity: 0 });
    setState(prev => ({ ...prev, showVideo: true }));

    const preloadTimeline = gsap.timeline();

    // במובייל - animation קצרה הרבה יותר
    const preloadDuration = state.isMobile ? 0.3 : ANIMATION_DURATIONS.normal;
    const waitDuration = state.isMobile ? 0.8 : 2.2;
    const fadeOutDuration = state.isMobile ? 0.2 : ANIMATION_DURATIONS.normal;

    preloadTimeline
      .to(preloadRef.current, {
        opacity: 1,
        duration: preloadDuration
      })
      .to({}, { duration: waitDuration })
      .to(preloadRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: fadeOutDuration,
        onComplete: () => {
          setState(prev => ({ ...prev, showPreload: false }));
          startMainAnimation();
        }
      });

    const startMainAnimation = () => {
      const tl = gsap.timeline();

      tl.to([curtainLeftRef.current, curtainRightRef.current], {
        x: (index) => index === 0 ? '-100%' : '100%',
        duration: state.isMobile ? 0.15 : 0.25,
        ease: 'power2.inOut',
        onComplete: () => {
          setState(prev => ({ ...prev, isLoaded: true, showVideo: true }));
          gsap.to(contentRef.current, {
            opacity: 1,
            duration: ANIMATION_DURATIONS.fast
          });
        }
      });
    };

    return () => {
      preloadTimeline.kill();
    };
  }, [state.isMobile]);

  useEffect(() => {
    if (videoRef.current && state.showVideo) {
      const playVideo = async () => {
        try {
          const video = videoRef.current;
          video.muted = true;
          video.loop = true;
          video.playsInline = true;
          video.autoplay = true;

          if (state.isMobile) {
            // במובייל - נסה להפעיל מיד ללא המתנה
            video.load();
            await new Promise(resolve => setTimeout(resolve, 100));
          }

          const playPromise = video.play();
          if (playPromise !== undefined) {
            await playPromise;
            console.log('Video playing successfully');
          }
        } catch (error) {
          console.error('Video play failed:', error);
          // נסה שוב אחרי רגע
          if (state.isMobile) {
            setTimeout(async () => {
              try {
                await videoRef.current.play();
                console.log('Video playing after retry');
              } catch (retryError) {
                console.error('Video retry failed:', retryError);
              }
            }, 300);
          }
        }
      };

      playVideo();
    }
  }, [state.showVideo, state.isMobile]);

  // אפקט נוסף שמופעל כש-isLoaded משתנה
  useEffect(() => {
    if (state.isLoaded && videoRef.current && state.isMobile) {
      const forcePlay = async () => {
        try {
          await videoRef.current.play();
          console.log('Video forced to play after loaded');
        } catch (error) {
          console.log('Could not force play:', error);
        }
      };

      setTimeout(forcePlay, 100);
    }
  }, [state.isLoaded, state.isMobile]);

  // אפקט נוסף להפעלת הסרטון במובייל מיד כשהדף נטען
  useEffect(() => {
    if (state.isMobile && videoRef.current) {
      const attemptAutoplay = async () => {
        try {
          const video = videoRef.current;
          video.muted = true;
          video.playsInline = true;
          video.setAttribute('playsinline', '');
          video.setAttribute('webkit-playsinline', '');
          video.setAttribute('x5-playsinline', '');
          video.removeAttribute('controls');

          // נסה להפעיל מספר פעמים
          const tryPlay = async (attempts = 5) => {
            for (let i = 0; i < attempts; i++) {
              try {
                await video.play();
                console.log('Video started playing on attempt', i + 1);
                setState(prev => ({ ...prev, videoPlaying: true }));
                break; // הצליח - צא מהלולאה
              } catch (err) {
                if (i === attempts - 1) throw err;
                await new Promise(resolve => setTimeout(resolve, 300 * (i + 1)));
              }
            }
          };

          await tryPlay();
        } catch (error) {
          console.log('Autoplay blocked - will try on user interaction');
        }
      };

      // נסה מיד
      attemptAutoplay();

      // נסה שוב אחרי זמנים שונים
      const timers = [
        setTimeout(attemptAutoplay, 300),
        setTimeout(attemptAutoplay, 600),
        setTimeout(attemptAutoplay, 1000),
        setTimeout(attemptAutoplay, 1500)
      ];

      // הוסף event listeners לאינטראקציות - כל אחד יפעיל את הוידאו
      const events = ['touchstart', 'touchmove', 'scroll', 'click', 'touchend'];

      events.forEach(eventType => {
        document.addEventListener(eventType, playVideoHandler, { once: true, passive: true });
      });

      return () => {
        timers.forEach(timer => clearTimeout(timer));
        events.forEach(eventType => {
          document.removeEventListener(eventType, playVideoHandler);
        });
      };
    }
  }, [state.isMobile]);

  return (
    <>
      <style>{`
        @keyframes logoFadeIn {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes logoGlow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.1)); }
          50% { filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.2)); }
        }
        
        @keyframes starTwinkle {
          0%, 100% { 
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8),
                        0 0 20px rgba(255, 255, 255, 0.4);
          }
          50% { 
            box-shadow: 0 0 15px rgba(255, 255, 255, 1),
                        0 0 30px rgba(255, 255, 255, 0.8);
          }
        }
        
        .real-logo {
          animation: logoFadeIn 1s ease-out forwards, logoGlow 3s ease-in-out infinite 1s;
        }
        
        .star {
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, transparent 70%);
          border-radius: 50%;
          animation: starTwinkle 2s ease-in-out infinite;
        }

        .glass-card {
          ${Object.entries(sharedStyles.glassCard).map(([key, value]) => 
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
          ).join('\n')}
        }

        .hero-video {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
        }

        /* הסתר כפתורי בקרה של הסרטון */
        .hero-video::-webkit-media-controls {
          display: none !important;
        }

        .hero-video::-webkit-media-controls-enclosure {
          display: none !important;
        }

        .hero-video::-webkit-media-controls-panel {
          display: none !important;
        }

        .hero-video::-webkit-media-controls-play-button {
          display: none !important;
        }

        .hero-video::-webkit-media-controls-start-playback-button {
          display: none !important;
        }

        @media (max-width: 768px) {
          .real-logo { max-width: 85vw !important; max-height: 65vh !important; }
          .glass-card { width: 60px !important; height: 60px !important; font-size: 1.1rem !important; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${COLORS.dark} 0%, #2A2A2A 50%, ${COLORS.dark} 100%)`,
      }}>
        
        {/* Video Background */}
        <motion.video
          key={state.isMobile ? 'mobile-video' : 'desktop-video'}
          ref={videoRef}
          className="hero-video"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          muted={true}
          loop={true}
          playsInline={true}
          autoPlay={true}
          controls={false}
          preload="auto"
          webkit-playsinline="true"
          x5-video-player-type="h5"
          x5-playsinline="true"
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
        >
          <source src={state.isMobile ? "https://res.cloudinary.com/doteohz34/video/upload/q_auto,f_auto,vc_auto/video_capela_hmgf1k.mp4" : "https://res.cloudinary.com/doteohz34/video/upload/v1761393966/%D7%A2%D7%99%D7%A6%D7%95%D7%91_%D7%9C%D7%9C%D7%90_%D7%A9%D7%9D_2_oxayip.mp4"} type="video/mp4" />
        </motion.video>

        {/* Overlay */}
        {state.showVideo && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.4) 100%)',
                zIndex: 2
              }}
            />

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
                background: 'linear-gradient(to bottom, transparent 0%, rgba(28, 28, 28, 1) 100%)',
                zIndex: 3
              }}
            />
          </>
        )}

        {/* Gradient Effect */}
        <div style={{
          position: 'absolute',
          right: '-20%',
          top: '20%',
          width: '400px',
          height: '400px',
          background: `radial-gradient(ellipse 120% 100% at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 100%)`,
          filter: 'blur(70px)',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: 0.8
        }} />
        
        {/* Preload Screen */}
        {state.showPreload && (
          <div 
            ref={preloadRef}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: COLORS.dark,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 100,
              opacity: 0
            }}
          >
            {[1,2,3,4,5].map(i => (
              <div key={i} className="star" style={{
                top: `${20 + i * 15}%`,
                left: `${15 + i * 17}%`,
                animationDelay: `${i * 0.3}s`
              }} />
            ))}
            
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

        {/* Curtains */}
        <div ref={curtainLeftRef} style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          background: `linear-gradient(135deg, ${COLORS.dark} 0%, #2A2A2A 100%)`,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRight: `1px solid ${COLORS.glassWhite}`
        }}>
          <div style={{ 
            color: 'rgba(201, 161, 75, 0.4)', 
            fontSize: '1.8rem', 
            fontWeight: '400', 
            letterSpacing: '0.2em',
            fontFamily: FONTS.display
          }}>
            OMC
          </div>
        </div>

        <div ref={curtainRightRef} style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '50%',
          height: '100%',
          background: `linear-gradient(225deg, ${COLORS.dark} 0%, #2A2A2A 100%)`,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderLeft: `1px solid ${COLORS.glassWhite}`
        }}>
          <div style={{ 
            color: 'rgba(168, 50, 121, 0.4)', 
            fontSize: '1.8rem', 
            fontWeight: '400', 
            letterSpacing: '0.2em',
            fontFamily: FONTS.display
          }}>
            EVENTS
          </div>
        </div>
        
        {/* Main Content */}
        <div ref={contentRef} style={{
          position: 'relative',
          zIndex: 15,
          maxWidth: GRID_SYSTEM.maxWidth.content,
          padding: '0 20px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: state.isMobile ? 'flex-end' : 'center',
          minHeight: '100vh',
          textAlign: 'center',
          paddingBottom: state.isMobile ? '80px' : '0'
        }}>
          <motion.button
            onClick={onButtonClick}
            style={{
              backgroundColor: state.isMobile ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              border: state.isMobile ? '1px solid rgba(255, 255, 255, 0.3)' : `1.5px solid ${COLORS.white}`,
              color: state.isMobile ? 'rgba(255, 255, 255, 0.95)' : COLORS.white,
              padding: state.isMobile ? '14px 28px' : '12px 28px',
              borderRadius: '50px',
              fontSize: state.isMobile ? '1.05rem' : '1.1rem',
              fontWeight: '400',
              cursor: 'pointer',
              fontFamily: FONTS.secondary,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              letterSpacing: '0.02em',
              minWidth: state.isMobile ? '240px' : '200px',
              zIndex: 15,
              backdropFilter: 'blur(15px)',
              boxShadow: state.isMobile ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.3)',
              marginTop: state.isMobile ? '0' : '2rem'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: state.isLoaded ? 1 : 0, scale: state.isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{
              backgroundColor: 'rgba(201, 161, 75, 0.15)',
              color: COLORS.primary,
              borderColor: COLORS.primary,
              scale: 1.02,
              boxShadow: '0 6px 25px rgba(201, 161, 75, 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            האירוע שלכם מתחיל כאן
          </motion.button>
        </div>
      </div>
    </>
  );
});

// ========================================================================================
// COMPANY CAROUSEL SECTION
// ========================================================================================
const CompanyCarouselSection = React.memo(() => {
  const { getResponsiveValue } = useResponsive();
  const { getSectionPadding, getElementSpacing } = useGridSpacing();

  const logos = useMemo(() => [
    "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_200/image-removebg-preview_47_eofrhp.png",
    "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_200/image-removebg-preview_45_ntzueh.png",
    "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_200/image-removebg-preview_44_ifam99.png",
    "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_200/image-removebg-preview_43_rytkux.png",
    "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_200/Forbs_myoluf.png"
  ], []);

  const slickSettings = useMemo(() => ({
    infinite: true,
    slidesToShow: getResponsiveValue({
      mobile: 3,
      tablet: 4,
      laptop: 5,
      desktop: 6,
      large: 7
    }),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 3000,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    cssEase: "linear",
    variableWidth: false,
    centerMode: false
  }), [getResponsiveValue]);

  return (
    <section style={{
      width: '100%',
      padding: getResponsiveValue({
        mobile: getElementSpacing('medium') + ' 0',
        tablet: getElementSpacing('medium') + ' 0',
        laptop: getElementSpacing('xsmall') + ' 0',
        desktop: getElementSpacing('xsmall') + ' 0',
        large: getElementSpacing('xsmall') + ' 0'
      })
    }}>
      <style>{`
        .logo-carousel .slick-track {
          display: flex;
          align-items: center;
        }
        
        .logo-carousel .slick-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          outline: none;
          padding: 0 4px;
        }
        
        .logo-slide {
          display: flex !important;
          justify-content: center;
          align-items: center;
          opacity: 0.8;
          padding: 0 8px;
        }
        
        .logo-slide img {
          filter: grayscale(100%) contrast(1.2) brightness(1.2);
          transition: filter 0.3s ease;
        }
      `}</style>

      <div className="logo-carousel">
        <Slider {...slickSettings}>
          {logos.map((logo, index) => (
            <div key={index} className="logo-slide">
              <img
                src={logo}
                alt={`Company logo ${index + 1}`}
                loading="lazy"
                style={{
                  width: getResponsiveValue({
                    mobile: '100px',
                    tablet: '130px',
                    laptop: '150px',
                    desktop: '160px',
                    large: '140px'
                  }),
                  height: getResponsiveValue({
                    mobile: '100px',
                    tablet: '130px',
                    laptop: '150px',
                    desktop: '160px',
                    large: '140px'
                  }),
                  objectFit: 'contain'
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
});

// ========================================================================================
// MOBILE HEADER SECTION (מה הופך אותנו)
// ========================================================================================
const MobileHeaderSection = React.memo(() => {
  const { isMobile } = useResponsive();

  if (!isMobile) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{
        width: '100%',
        padding: '30px 20px 35px',
        textAlign: 'center',
        position: 'relative'
      }}
    >
      {/* Background glow effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '250px',
        height: '150px',
        background: 'radial-gradient(ellipse at center, rgba(201, 161, 75, 0.1) 0%, transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Stars decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginBottom: '16px',
          position: 'relative',
          zIndex: 1
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              color: COLORS.primary,
              fontSize: '12px'
            }}
          >
            ✦
          </motion.div>
        ))}
      </motion.div>

      {/* Main text */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          fontSize: '22px',
          fontWeight: '300',
          lineHeight: '1.4',
          color: '#FFFFFF',
          fontFamily: "'Noto Sans Hebrew', sans-serif",
          position: 'relative',
          zIndex: 1,
          textShadow: '0 2px 15px rgba(0, 0, 0, 0.3)'
        }}
      >
        <span style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.85) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'block',
          marginBottom: '4px'
        }}>
          מה הופך אותנו
        </span>
        <span style={{
          background: 'linear-gradient(135deg, #C9A14B 0%, #D4AF5E 50%, #C9A14B 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'block',
          fontWeight: '400',
          fontSize: '24px'
        }}>
          לשותף המועדף
        </span>
        <span style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.85) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          display: 'block',
          fontSize: '20px',
          marginTop: '2px'
        }}>
          על החברות והמפיקים הגדולים בישראל
        </span>
      </motion.div>

      {/* Bottom decoration line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.7 }}
        style={{
          width: '50px',
          height: '1.5px',
          background: `linear-gradient(90deg, transparent 0%, ${COLORS.primary} 50%, transparent 100%)`,
          margin: '20px auto 0',
          position: 'relative',
          zIndex: 1
        }}
      />
    </motion.section>
  );
});

// ========================================================================================
// HEBREW TEXT SECTION
// ========================================================================================
const HebrewTextSection = React.memo(() => {
  const { getResponsiveValue, isMobile } = useResponsive();
  const { getSectionPadding, getElementSpacing } = useGridSpacing();

  const handleAnimationComplete = () => {
    console.log('Hebrew text animation complete');
  };

  if (isMobile) return null;

  return (
    <section style={{
      width: '100%',
      padding: getResponsiveValue({
        mobile: `${getElementSpacing('small')} ${getElementSpacing('medium')}`,
        tablet: `${getElementSpacing('small')} ${getElementSpacing('medium')}`,
        laptop: `${getElementSpacing('xsmall')} ${getElementSpacing('medium')}`,
        desktop: `${getElementSpacing('xsmall')} ${getElementSpacing('medium')}`,
        large: `${getElementSpacing('xsmall')} ${getElementSpacing('medium')}`
      }),
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: getResponsiveValue({
        mobile: '40vh',
        tablet: '40vh',
        laptop: '30vh',
        desktop: '20vh',
        large: '20vh'
      })
    }}>
      <style>{`
        .split-char {
          display: inline-block;
          will-change: transform, opacity;
          background: inherit !important;
          -webkit-background-clip: inherit !important;
          -webkit-text-fill-color: inherit !important;
          background-clip: inherit !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
          letter-spacing: inherit !important;
        }

        .hebrew-text-split {
          font-size: clamp(1.6rem, 3.2vw, 2.8rem) !important;
          font-weight: 700 !important;
          font-family: 'Varela Round', sans-serif !important;
          background: linear-gradient(135deg, #8B7355 0%, #A67C52 25%, #CD853F 50%, #A67C52 75%, #8B7355 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          line-height: 1.4 !important;
          letter-spacing: -0.02em !important;
          white-space: normal !important;
          word-wrap: break-word !important;
        }
      `}</style>

      {/* Radial Gradient Background */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: getResponsiveValue({
          mobile: '400px',
          tablet: '600px',
          laptop: '800px',
          desktop: '900px',
          large: '1000px'
        }),
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(201, 161, 75, 0.2) 0%, rgba(168, 50, 121, 0.1) 30%, transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 1,
        borderRadius: '50%'
      }} />

      {/* Stars Animation */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none'
      }}>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#C9A14B',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 6px #C9A14B, 0 0 12px #C9A14B'
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div style={{
        maxWidth: GRID_SYSTEM.maxWidth.content,
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        direction: 'rtl'
      }}>
        <div style={{ marginBottom: getElementSpacing('small') }}>
          <motion.div
            style={{
              fontSize: getResponsiveValue({
                mobile: '1.2rem',
                tablet: '1.4rem',
                laptop: '1.6rem',
                desktop: '1.8rem',
                large: '2.0rem'
              }),
              fontWeight: '700',
              fontFamily: FONTS.secondary,
              ...sharedStyles.gradientText,
              lineHeight: 1.4,
              textAlign: 'center',
              direction: 'rtl',
              letterSpacing: '-0.02em'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
          </motion.div>
        </div>

        <div style={{ 
          marginTop: getElementSpacing('small'),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%'
        }}>
          <div style={{
            direction: 'rtl',
            textAlign: 'center',
            fontSize: getResponsiveValue({
              mobile: '1.2rem',
              tablet: '1.4rem',
              laptop: '1.6rem',
              desktop: '1.8rem',
              large: '2.0rem'
            }),
            fontWeight: '700',
            fontFamily: FONTS.secondary,
            ...sharedStyles.gradientText,
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <h1 style={{ margin: 0, padding: 0 }}>
              מה הופך אותנו
              <div style={{ 
                marginRight: '30px',
                marginTop: '6px'
              }}>
                <SplitText
                  text="לשותף המועדף על החברות והמפיקים הגדולים בישראל"
                  className="hebrew-text-split"
                  delay={30}
                  duration={0.5}
                  ease="power3.out"
                  splitType="chars"
                  from={{ opacity: 0, y: 50, rotationX: -90 }}
                  to={{ opacity: 1, y: 0, rotationX: 0 }}
                  threshold={0.1}
                  rootMargin="150px"
                  textAlign="center"
                  tag="div"
                  onLetterAnimationComplete={handleAnimationComplete}
                  style={{
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    fontFamily: 'inherit',
                    background: 'linear-gradient(135deg, #8B7355 0%, #A67C52 25%, #CD853F 50%, #A67C52 75%, #8B7355 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: 'inherit',
                    letterSpacing: 'inherit',
                    direction: 'rtl',
                    textAlign: 'center'
                  }}
                />
              </div>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
});

// ========================================================================================
// OUR SERVICES SECTION - FIXED GALLERY HEIGHT
// ========================================================================================
const OurServicesSection = React.memo(() => {
  const { getResponsiveValue, isMobile, isTablet } = useResponsive();
  const { getSectionPadding, getElementSpacing } = useGridSpacing();
  const swiperRef = useRef(null);

  const servicesData = useMemo(() => [
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/2024-09-06GAVRIEL-126_m0bybb.jpg",
      text: "אירועים פרטיים",
      description: "בין בר מצווה לחתונת זהב - נגיע לכל מקום ונאתגר אתכם :)"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/DSC03566_trxtjs.jpg",
      text: "חתונות",
      description: "משקה שהאורח לא ישכח - הקיק של OMC בטעמים ובמקצועיות"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/forobs30u30_csnpjj.jpg",
      text: "אירועי חברה",
      description: "ליצור חיבור אמיתי בין אנשים ולשבור שגרה - חוויה בלתי נשכחת"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/barista-putting-alcohol-into-cocktail-glass-with-syrup-ice-cubes_thuy44.jpg",
      text: "סדנאות קוקטיילים",
      description: "איזה כיף להעביר ידע! יצירתיות, עבודה צוותית וצחוק - נהפוך אתכם לחברים המקיסולוגיים"
    }
  ], []);

  const MobileServicesSwiper = () => (
    <>
      <style>{`
        .services-swiper {
          width: 100%;
          height: 100%;
        }
        
        .services-swiper .swiper-wrapper {
          align-items: stretch;
        }
        
        .services-swiper .swiper-slide {
          height: auto;
          background: transparent;
        }
        
        .services-swiper .swiper-pagination {
          bottom: -50px !important;
          display: flex;
          justify-content: center;
          gap: 8px;
          position: absolute !important;
          z-index: 20 !important;
        }
        
        .services-swiper .swiper-pagination-bullet {
          width: 12px !important;
          height: 12px !important;
          background: #F7C873 !important;
          opacity: 0.4 !important;
          margin: 0 !important;
          border-radius: 50%;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }
        
        .services-swiper .swiper-pagination-bullet-active {
          opacity: 1 !important;
          transform: scale(1.3);
          background: #FFD700 !important;
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 15px rgba(247, 200, 115, 0.8);
        }
      `}</style>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          delay: 0.1,
          ease: "easeOut"
        }}
        style={{
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
          position: 'relative',
          height: '420px',
          overflow: 'visible',
          paddingTop: '60px'
        }}
      >
          <Swiper
            ref={swiperRef}
            modules={[Pagination]}
            spaceBetween={15}
            slidesPerView={1.1}
            centeredSlides={true}
            loop={true}
            speed={250}
            grabCursor={true}
            slideToClickedSlide={true}
            pagination={{
              clickable: true,
              dynamicBullets: false
            }}
            className="services-swiper"
            style={{
              height: '360px',
              overflow: 'visible',
              paddingBottom: '60px'
            }}
          >
          {servicesData.map((item, index) => (
            <SwiperSlide key={index}>
              <div 
                style={{
                  height: '360px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  ...sharedStyles.glassCard,
                  position: 'relative',
                  margin: '0 5px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                }}
                onClick={() => {
                  // Navigate to services page with service parameter using internal navigation
                  window.dispatchEvent(new CustomEvent('navigateToPage', {
                    detail: { 
                      pageId: 'services',
                      serviceId: index + 1
                    }
                  }));
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02) translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateY(0)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.5)';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '300px',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <img
                    src={item.image}
                    alt={item.text}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '100px',
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)',
                    zIndex: 1
                  }} />
                </div>
                <div style={{
                  padding: '15px',
                  height: '60px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center',
                  direction: 'rtl',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 100%)'
                }}>
                  <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    fontFamily: FONTS.secondary,
                    margin: 0,
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                    letterSpacing: '0.02em'
                  }}>
                    {item.text}
                  </h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </>
  );

  return (
    <section style={{
      width: '100%',
      padding: `0 ${getElementSpacing('medium')}`,
      paddingBottom: (isMobile || isTablet) ? '70px' : '0', // Space for pagination dots below cards
      position: 'relative',
      overflow: 'visible'
    }}>

      <div style={{
        width: '100%',
        maxWidth: GRID_SYSTEM.maxWidth.wide,
        margin: '0 auto',
        height: 'auto', // CRITICAL FIX: Changed from fixed height to auto
        position: 'relative',
        overflow: 'visible'
      }}>
        {/* Title inside the carousel area */}
        <motion.div
          initial={{ opacity: 0, y: (isMobile || isTablet) ? 10 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: (isMobile || isTablet) ? 0.25 : 0.8,
            delay: 0,
            ease: "easeOut"
          }}
          style={{
            textAlign: 'center',
            marginBottom: '0.5rem',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            zIndex: 10
          }}
        >
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            height: '80px',
            background: 'radial-gradient(ellipse at center, rgba(135, 206, 235, 0.15) 0%, transparent 70%)',
            filter: 'blur(20px)',
            zIndex: 1,
            borderRadius: '50%'
          }} />
          
          <h2 style={{
            fontSize: getResponsiveValue({
              mobile: '2rem',
              tablet: '2.5rem',
              laptop: '3rem',
              desktop: '3.5rem',
              large: '4rem'
            }),
            fontWeight: '700',
            fontFamily: "'Noto Sans Hebrew', sans-serif",
            background: 'linear-gradient(180deg, #ffffff 0%, #999999 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
            textAlign: 'center',
            direction: 'rtl',
            position: 'relative',
            zIndex: 3,
            margin: '0 auto'
          }}>
            השירותים שלנו
          </h2>
        </motion.div>

        {(isMobile || isTablet) ? (
          <MobileServicesSwiper />
        ) : (
          <CircularGallery
            items={servicesData}
            bend={getResponsiveValue({
              mobile: 2,
              tablet: 2,
              laptop: 2,
              desktop: 2,
              large: 1.8
            })}
            textColor="#FFFFFF"
            font={getResponsiveValue({
              mobile: "700 18px Varela Round, sans-serif",
              tablet: "700 20px Varela Round, sans-serif",
              laptop: "700 22px Varela Round, sans-serif",
              desktop: "700 24px Varela Round, sans-serif",
              large: "700 26px Varela Round, sans-serif"
            })}
            scrollSpeed={3}
            scrollEase={0.08}
          />
        )}
      </div>
    </section>
  );
});

// ========================================================================================
// CTA SECTION
// ========================================================================================
const CTASection = React.memo(React.forwardRef((_props, ref) => {
  const { getSectionPadding, getElementSpacing } = useGridSpacing();

  return (
    <section ref={ref} style={{
      width: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${getElementSpacing('small')} ${getElementSpacing('medium')}`,
      marginTop: '20px',
      zIndex: 1
    }}>
      <style>{`
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

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          flex: 1;
          min-width: 200px;
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

        .form-textarea {
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
          resize: vertical;
          min-height: 100px;
        }

        .form-label {
          color: rgba(255, 255, 255, 0.9);
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 8px;
          font-family: 'Varela Round', sans-serif;
        }

        .form-feedback {
          padding: 12px 16px;
          border-radius: 12px;
          margin-top: 16px;
          font-size: 16px;
          font-weight: 500;
          text-align: center;
          font-family: 'Varela Round', sans-serif;
        }

        .success-feedback {
          background: rgba(34, 197, 94, 0.2);
          border: 1px solid rgba(34, 197, 94, 0.4);
          color: #22c55e;
        }

        .error-feedback {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #ef4444;
        }

        .required-asterisk {
          color: #ef4444;
          margin-left: 4px;
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
          background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
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
          box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover {
          background: linear-gradient(135deg, #0088FF 0%, #0066E6 100%);
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(0, 122, 255, 0.4);
        }

        .submit-btn:active {
          transform: translateY(-1px) scale(1.02);
        }

        @media (max-width: 768px) {
          .cta-container {
            padding: 25px 20px;
            border-radius: 20px;
            margin: 0 15px;
            box-shadow:
              0 8px 24px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
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
            background: rgba(255, 255, 255, 0.22) !important;
            border: 1.5px solid rgba(201, 161, 75, 0.5) !important;
            box-shadow: 0 0 0 3px rgba(201, 161, 75, 0.15) !important;
            transform: translateY(-1px) !important;
          }

          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.75) !important;
            font-size: 16px !important;
          }

          .submit-btn {
            width: 100%;
            padding: 16px 28px !important;
            font-size: 16px !important;
            margin-top: 0.5rem;
            background: linear-gradient(135deg, #C9A14B 0%, #A67C52 100%) !important;
            box-shadow: 0 4px 16px rgba(201, 161, 75, 0.35) !important;
            border-radius: 14px !important;
          }

          .submit-btn:hover {
            background: linear-gradient(135deg, #D4AF5E 0%, #B88A61 100%) !important;
            box-shadow: 0 6px 20px rgba(201, 161, 75, 0.45) !important;
          }
        }
      `}</style>
      
      {/* רדיאל גרדיאנט */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1200px',
        height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.06) 0%, rgba(75, 0, 130, 0.04) 25%, rgba(25, 25, 112, 0.03) 50%, transparent 80%)',
        filter: 'blur(60px)',
        zIndex: 1,
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />
      
      <motion.div
        className="cta-container"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{ position: 'relative', zIndex: 2 }}
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
    </section>
  );
}));

// ========================================================================================
// ABOUT US SECTION
// ========================================================================================
const AboutUsSection = React.memo(() => {
  const { getResponsiveValue, isMobile, isTablet } = useResponsive();
  const { getSectionPadding, getElementSpacing } = useGridSpacing();

  const content = useMemo(() => [
    {
      title: "הכנות",
      description: "החל מהתאמת הטעמים לאופי האירוע, לעונה ולקהל היעד, ועד בחירת אנשי הצוות האיכותיים ביותר שיעמדו מאחורי הבר – כל פרט קטן נבנה בקפידה, במיוחד בשבילכם."
    },
    {
      title: "יום האירוע",
      description: "אנחנו נגיע ראשונים, נדאג לארגן את הכל עד הפרט האחרון ואתם? אתם תוכלו להיות בראש שקט, עם משקה ביד וחיוך רחב. אה והכי חשוב לגבי האורחים שלכם... אנחנו כבר נדאג שהם ימשיכו לדבר על האירוע שלכם עוד הרבה אחרי שיגמר"
    }
  ], []);

  const MobileAboutContent = () => (
    <section style={{
      width: '100%',
      color: COLORS.white,
      padding: `${getElementSpacing('medium')} ${getElementSpacing('medium')}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      textAlign: 'center'
    }}>
      <style>{`
        .about-card-mobile {
          ${Object.entries(sharedStyles.glassCard).map(([key, value]) =>
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`
          ).join('\n')}
          position: relative;
          overflow: hidden;
        }

        .about-card-mobile::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(201, 161, 75, 0.1) 0%, transparent 70%);
          animation: rotateGlow 15s linear infinite;
        }

        @keyframes rotateGlow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

      `}</style>

      <div style={{
        maxWidth: GRID_SYSTEM.maxWidth.content,
        width: '100%',
        position: 'relative',
        zIndex: 2
      }}>
        {content.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, margin: "-50px" }}
            style={{
              marginBottom: index === content.length - 1 ? 0 : getElementSpacing('large'),
              position: 'relative'
            }}
          >
            <div className="about-card-mobile" style={{
              padding: '30px 20px',
              direction: 'rtl',
              position: 'relative',
              zIndex: 1
            }}>
              {/* Decorative corner elements */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '40px',
                height: '40px',
                border: '2px solid rgba(201, 161, 75, 0.3)',
                borderLeft: 'none',
                borderBottom: 'none',
                borderRadius: '0 12px 0 0'
              }} />
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                width: '40px',
                height: '40px',
                border: '2px solid rgba(201, 161, 75, 0.3)',
                borderRight: 'none',
                borderTop: 'none',
                borderRadius: '0 0 0 12px'
              }} />

              <h3 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '16px',
                fontFamily: FONTS.secondary,
                lineHeight: 1.2,
                textAlign: 'center',
                direction: 'rtl',
                background: 'linear-gradient(135deg, #F7C873 0%, #C9A14B 50%, #A67C52 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                position: 'relative',
                zIndex: 2,
                letterSpacing: '0.5px'
              }}>
                {item.title}
              </h3>

              {/* Decorative divider */}
              <div style={{
                width: '60px',
                height: '3px',
                background: 'linear-gradient(90deg, transparent, #C9A14B, transparent)',
                margin: '0 auto 20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(201, 161, 75, 0.5)'
              }} />

              <p style={{
                fontSize: '17px',
                lineHeight: 1.7,
                fontFamily: FONTS.secondary,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.95)',
                maxWidth: '100%',
                margin: '0 auto',
                position: 'relative',
                zIndex: 2,
                textAlign: 'center'
              }}>
                {item.description}
              </p>
            </div>

            {/* Floating particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  background: '#C9A14B',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #C9A14B',
                  left: `${20 + i * 30}%`,
                  top: `${10 + i * 20}%`,
                  zIndex: 0
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );

  if (isMobile || isTablet) {
    return <MobileAboutContent />;
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      padding: getResponsiveValue({
        mobile: `${getElementSpacing('small')} ${getElementSpacing('medium')}`,
        tablet: `${getElementSpacing('small')} ${getElementSpacing('medium')}`,
        laptop: `${getElementSpacing('xsmall')} ${getElementSpacing('medium')}`,
        desktop: `${getElementSpacing('xsmall')} ${getElementSpacing('medium')}`,
        large: `${getElementSpacing('xsmall')} ${getElementSpacing('medium')}`
      })
    }}>
      <div style={{
        position: 'absolute',
        left: '-24%',
        top: '50%',
        transform: 'translateY(-40%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(ellipse 120% 100% at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 100%)',
        filter: 'blur(70px)',
        zIndex: 1,
        pointerEvents: 'none',
        opacity: 0.8
      }} />
      
      <div style={{
        position: 'relative',
        zIndex: 2
      }}>
        <StickyScroll
          content={content}
          getResponsiveValue={getResponsiveValue}
          contentClassName=""
        />
      </div>
    </div>
  );
});

// ========================================================================================
// GALLERY SECTION
// ========================================================================================
const GallerySection = React.memo(() => {
  const { getResponsiveValue } = useResponsive();
  const { getSectionPadding, getElementSpacing } = useGridSpacing();

  return (
    <section style={{
      width: '100%',
      position: 'relative',
      padding: getSectionPadding()
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ 
          textAlign: 'center', 
          marginBottom: getElementSpacing('large'),
          position: 'relative', 
          zIndex: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <div style={{ 
          position: 'relative',
          display: 'inline-block',
          padding: '20px'
        }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '300px',
            height: '100px',
            background: 'radial-gradient(ellipse at center, rgba(0, 191, 255, 0.1) 0%, transparent 80%)',
            filter: 'blur(30px)',
            zIndex: -1
          }} />
          
          <h2 style={{
            ...sharedStyles.sectionTitle,
            fontSize: getResponsiveValue({
              mobile: '2rem',
              tablet: '2.5rem',
              laptop: '3rem',
              desktop: '3.5rem',
              large: '4rem'
            }),
            position: 'relative',
            zIndex: 2,
            margin: '0 auto'
          }}>
            גלריית אירועים
          </h2>
        </div>
      </motion.div>

      <PinterestGalleryNew />
    </section>
  );
});

// ========================================================================================
// FAQ SECTION
// ========================================================================================
const FAQSection = React.memo(() => {
  const { getResponsiveValue } = useResponsive();
  const { getSectionPadding, getElementSpacing } = useGridSpacing();
  const [openQuestion, setOpenQuestion] = useState(null);

  const faqData = useMemo(() => [
    {
      question: "איך עובד התהליך של הזמנת השירות?",
      answer: "פשוט מאוד! פשוט צרו איתנו קשר עם שם ומספר טלפון, נתאם שיחת ייעוץ חינם, נבנה עבורכם תפריט מותאם ונדאג לכל השאר. הצוות המקצועי שלנו יגיע עם כל הציוד הדרוש ליצירת חוויה מושלמת."
    },
    {
      question: "איזה סוגי אירועים אתם משרתים?",
      answer: "אנחנו משרתים את כל סוגי האירועים: חתונות, אירועי חברה, השקות, הרמות כוסית, אירועים פרטיים וסדנאות קוקטיילים. כל אירוע הוא ייחודי ואנחנו מתאימים את השירות בהתאם."
    },
    {
      question: "האם אתם מספקים את כל הציוד והחומרים?",
      answer: "כן! אנחנו מגיעים עם כל הציוד הדרוש - בר מקצועי, ציוד הגשה, כלי בר מקצועיים, כל סוגי האלכוהול והמיקסרים, קרח, פירות וקישוטים. אתם לא צריכים לדאוג לכלום!"
    },
    {
      question: "כמה זמן מראש צריך להזמין?",
      answer: "מומלץ להזמין לפחות 2-3 שבועות מראש, במיוחד לאירועים בסוף השבוע ובעונות עמוסות. עם זאת, אנחנו עושים כל מאמץ להיענות גם להזמנות דחופות יותר כשיש אפשרות."
    },
    {
      question: "איזה סוגי משקאות אתם מכינים?",
      answer: "התמחות שלנו היא בקוקטיילים קלאסיים ומודרניים, משקאות חמים מתובלים, מוחיטו, מרגריטות, ג'ין טוניק, ויסקי סאוור ועוד. אנחנו גם יכולים ליצור קוקטיילים מותאמים אישית לאירוע שלכם."
    },
    {
      question: "מה כלול במחיר השירות?",
      answer: "המחיר כולל: הגעת הברמנים, כל הציוד הדרוש, עמדת בר מעוצבת, כל סוגי האלכוהול והמיקסרים, פירות וקישוטים, ניקיון בסיום האירוע. אין עלויות נוספות או הפתעות!"
    }
  ], []);

  return (
    <section style={{
      width: '100%',
      padding: getSectionPadding(),
      position: 'relative'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        style={{ 
          textAlign: 'center', 
          marginBottom: getElementSpacing('large'),
          position: 'relative', 
          zIndex: 5,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '150px',
          background: 'radial-gradient(ellipse at center, rgba(201, 161, 75, 0.15) 0%, transparent 70%)',
          filter: 'blur(30px)',
          zIndex: 1,
          borderRadius: '50%'
        }} />
        
        <h2 style={{
          ...sharedStyles.sectionTitle,
          ...sharedStyles.gradientText,
          fontSize: getResponsiveValue({
            mobile: '2rem',
            tablet: '2.5rem',
            laptop: '3rem',
            desktop: '3.5rem',
            large: '4rem'
          }),
          position: 'relative',
          zIndex: 2,
          margin: '0 auto'
        }}>
          שאלות נפוצות
        </h2>
      </motion.div>

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 5
      }}>
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.2) 0%, rgba(192, 192, 192, 0.05) 100%)',
              backdropFilter: 'blur(25px)',
              borderRadius: '20px',
              border: '1px solid rgba(192, 192, 192, 0.3)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
              style={{
                width: '100%',
                padding: '1.5rem',
                background: 'transparent',
                border: 'none',
                textAlign: 'right',
                cursor: 'pointer',
                fontSize: getResponsiveValue({
                  mobile: '1.1rem',
                  tablet: '1.2rem',
                  laptop: '1.3rem',
                  desktop: '1.4rem',
                  large: '1.5rem'
                }),
                fontWeight: '700',
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: FONTS.secondary,
                direction: 'rtl',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {faq.question}
              <span style={{
                transform: `rotate(${openQuestion === index ? 180 : 0}deg)`,
                transition: 'transform 0.3s ease',
                fontSize: '1.2rem'
              }}>
                ▼
              </span>
            </button>

            <AnimatePresence>
              {openQuestion === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    padding: '0 1.5rem 1.5rem',
                    fontSize: getResponsiveValue({
                      mobile: '1rem',
                      tablet: '1.1rem',
                      laptop: '1.2rem',
                      desktop: '1.3rem',
                      large: '1.4rem'
                    }),
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontFamily: FONTS.secondary,
                    direction: 'rtl',
                    borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                    paddingTop: '1rem'
                  }}>
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
});

// ========================================================================================
// MAIN PAGE COMPONENT
// ========================================================================================
const MAINPAGE = () => {
  const ctaRef = useRef(null);

  const scrollToCTA = () => {
    if (ctaRef.current) {
      ctaRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <>
      <GlobalStyles />
      <style>{`
        .mainpage-container {
          background: ${COLORS.darkBg};
          position: relative;
          overflow-x: hidden;
        }
        
        .mainpage-container::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.01) 0%, transparent 50%), 
                      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.005) 0%, transparent 50%);
          opacity: 0.04;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 1;
          animation: particleFloat 20s ease-in-out infinite alternate;
        }

        @keyframes particleFloat {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.06; }
          50% { transform: translateX(10px) translateY(-15px) scale(1.05); opacity: 0.1; }
          100% { transform: translateX(-5px) translateY(10px) scale(0.95); opacity: 0.08; }
        }
      `}</style>

      <div className="mainpage-container">
        {/* Global Contact Form Handler */}
        <ContactForm isGlobalHandler={true} />
        
        {/* Gradient Effects */}
        <div style={{
          position: 'absolute',
          top: '120vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.08) 0%, transparent 80%)',
          zIndex: 1,
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '380vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '250px',
          background: 'radial-gradient(ellipse at center, rgba(75, 0, 130, 0.1) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
          filter: 'blur(40px)'
        }} />

        {/* All Sections */}
        <HeroSection onButtonClick={scrollToCTA} />
        <CompanyCarouselSection />
        <MobileHeaderSection />
        <HebrewTextSection />
        <AboutUsSection />
        <OurServicesSection />
        <CTASection ref={ctaRef} />
        <GallerySection />
        <FAQSection />
      </div>
    </>
  );
};

export default MAINPAGE;
