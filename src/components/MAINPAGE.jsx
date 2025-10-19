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
    mobile: { small: '1rem', medium: '2rem', large: '3rem' },
    tablet: { small: '1.25rem', medium: '2.5rem', large: '3.5rem' },
    laptop: { small: '1.5rem', medium: '3rem', large: '4rem' },
    desktop: { small: '1.75rem', medium: '3.5rem', large: '4.5rem' },
    large: { small: '2rem', medium: '4rem', large: '5rem' }
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
const HeroSection = React.memo(() => {
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const contentRef = useRef(null);
  const preloadRef = useRef(null);
  const videoRef = useRef(null);
  
  const [state, setState] = useState({
    isLoaded: false,
    showPreload: true,
    showVideo: false,
    isMobile: false
  });

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
    
    preloadTimeline
      .to(preloadRef.current, {
        opacity: 1,
        duration: ANIMATION_DURATIONS.normal
      })
      .to({}, { duration: 2.2 })
      .to(preloadRef.current, {
        opacity: 0,
        scale: 1.1,
        duration: ANIMATION_DURATIONS.normal,
        onComplete: () => {
          setState(prev => ({ ...prev, showPreload: false }));
          startMainAnimation();
        }
      });

    const startMainAnimation = () => {
      const tl = gsap.timeline();
      
      tl.to([curtainLeftRef.current, curtainRightRef.current], {
        x: (index) => index === 0 ? '-100%' : '100%',
        duration: 0.25,
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
  }, []);

  useEffect(() => {
    if (videoRef.current && state.showVideo) {
      const playVideo = async () => {
        try {
          videoRef.current.muted = true;
          videoRef.current.loop = true;
          videoRef.current.playsInline = true;
          videoRef.current.autoplay = true;
          
          if (state.isMobile) {
            videoRef.current.load();
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          
          await videoRef.current.play();
        } catch (error) {
          console.error('Video play failed:', error);
        }
      };
      
      playVideo();
    }
  }, [state.showVideo, state.isMobile]);

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
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          webkit-playsinline="true"
        >
          <source src={state.isMobile ? "https://res.cloudinary.com/doteohz34/video/upload/q_auto,f_auto,vc_auto/video_capela_hmgf1k.mp4" : "https://res.cloudinary.com/doteohz34/video/upload/q_auto,f_auto/Ha-Cerem_-_Italy_Embassy_2023_GlebSmirnovPro-VEED_sfp5fa.mp4"} type="video/mp4" />
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

        {/* Logo */}
        <motion.div
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            zIndex: 15
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: state.isLoaded ? 1 : 0, x: state.isLoaded ? 0 : -50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="glass-card" style={{
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.4rem',
            fontWeight: '400',
            color: COLORS.white,
            fontFamily: FONTS.display,
            letterSpacing: '0.1em'
          }}>
            OMC
          </div>
        </motion.div>

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
          justifyContent: 'center',
          minHeight: '100vh',
          textAlign: 'center'
        }}>
          <motion.button
            style={{
              backgroundColor: state.isMobile ? 'rgba(201, 161, 75, 0.2)' : 'transparent',
              border: `1.5px solid ${COLORS.white}`,
              color: COLORS.white,
              padding: state.isMobile ? '16px 32px' : '12px 28px',
              borderRadius: '50px',
              fontSize: state.isMobile ? '1.2rem' : '1.1rem',
              fontWeight: '400',
              cursor: 'pointer',
              fontFamily: FONTS.secondary,
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              letterSpacing: '0.02em',
              minWidth: state.isMobile ? '250px' : '200px',
              zIndex: 15,
              backdropFilter: 'blur(10px)',
              boxShadow: state.isMobile ? '0 6px 30px rgba(0, 0, 0, 0.5)' : '0 4px 20px rgba(0, 0, 0, 0.3)',
              marginTop: state.isMobile ? '0' : '2rem'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: state.isLoaded ? 1 : 0, scale: state.isLoaded ? 1 : 0.8 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{
              backgroundColor: 'rgba(201, 161, 75, 0.2)',
              color: COLORS.primary,
              borderColor: COLORS.primary,
              scale: 1.02,
              boxShadow: '0 6px 30px rgba(201, 161, 75, 0.4)'
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
    "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_200/image-removebg-preview_33_p8i6is.png",
    "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_200/image-removebg-preview_37_aq5kep.png",
    "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_200/image-removebg-preview_31_wegaww.png",
    "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_200/image-removebg-preview_29_n28ci5.png",
    "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_200/image-removebg-preview_27_xfoxaf.png"
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
      padding: getElementSpacing('medium') + ' 0'
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
          {logos.map((logo, index) => {
            // הגדלים המותאמים אישית ללוגואים הקטנים יותר
            const isSmallLogo = logo.includes('_33_') || logo.includes('_37_');
            const sizeMultiplier = isSmallLogo ? 1.4 : 1; // הגדלה של 40% ללוגואים הקטנים
            
            return (
              <div key={index} className="logo-slide">
                <img
                  src={logo}
                  alt={`Company logo ${index + 1}`}
                  loading="lazy"
                  style={{
                    width: getResponsiveValue({
                      mobile: `${90 * sizeMultiplier}px`,
                      tablet: `${120 * sizeMultiplier}px`,
                      laptop: `${140 * sizeMultiplier}px`,
                      desktop: `${150 * sizeMultiplier}px`,
                      large: `${130 * sizeMultiplier}px`
                    }),
                    height: getResponsiveValue({
                      mobile: `${90 * sizeMultiplier}px`,
                      tablet: `${120 * sizeMultiplier}px`,
                      laptop: `${140 * sizeMultiplier}px`,
                      desktop: `${150 * sizeMultiplier}px`,
                      large: `${130 * sizeMultiplier}px`
                    }),
                    objectFit: 'contain'
                  }}
                />
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
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
        laptop: `${getElementSpacing('small')} ${getElementSpacing('medium')}`,
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
        laptop: '40vh',
        desktop: '30vh',
        large: '30vh'
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
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/forobs30u30_csnpjj.jpg",
      text: "אירועי חברה",
      description: "ליצור חיבור אמיתי בין אנשים ולשבור שגרה - חוויה בלתי נשכחת"
    },
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
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/barista-putting-alcohol-into-cocktail-glass-with-syrup-ice-cubes_thuy44.jpg",
      text: "סדנאות קוקטיילים",
      description: "איזה כיף להעביר ידע! יצירתיות, עבודה צוותית וצחוק - נהפוך אתכם לחברים המקיסולוגיים"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/forbs30u302-_h9lrig.jpg",
      text: "אירועי חברה מיוחדים",
      description: "בין Happy Hour שגרתי לאירוע הנפקה מרשים - צבע, אנרגיה וחוויה"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/cocktail1_zmqwwx.png",
      text: "קוקטיילים ייחודיים",
      description: "משקאות מותאמים אישית ויצירות קולינריות מיוחדות"
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
          bottom: -40px !important;
          display: flex;
          justify-content: center;
          gap: 8px;
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
      
      <div style={{
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        position: 'relative',
        height: '420px',
        overflow: 'visible',
        paddingTop: '60px'
      }}>
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
              height: '380px',
              overflow: 'visible',
              paddingBottom: '80px'
            }}
          >
          {servicesData.map((item, index) => (
            <SwiperSlide key={index}>
              <div style={{
                height: '360px',
                borderRadius: '20px',
                overflow: 'hidden',
                ...sharedStyles.glassCard,
                position: 'relative',
                margin: '0 5px'
              }}>
                <div style={{
                  width: '100%',
                  height: '200px',
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
                    height: '80px',
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                    zIndex: 1
                  }} />
                </div>
                <div style={{
                  padding: '20px 15px',
                  height: '160px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  textAlign: 'center',
                  direction: 'rtl',
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%)'
                }}>
                  <h3 style={{
                    fontSize: '1.3rem',
                    fontWeight: '700',
                    color: '#FFFFFF',
                    fontFamily: FONTS.secondary,
                    marginBottom: '8px',
                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                    letterSpacing: '0.02em'
                  }}>
                    {item.text}
                  </h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: FONTS.secondary,
                    lineHeight: 1.4,
                    fontWeight: '400'
                  }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );

  return (
    <section style={{
      width: '100%',
      padding: `0 ${getElementSpacing('medium')}`, // Removed top/bottom padding
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
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
            textColor="rgba(255, 255, 255, 0.9)"
            font={getResponsiveValue({
              mobile: "400 16px Varela Round, sans-serif",
              tablet: "400 18px Varela Round, sans-serif",
              laptop: "400 20px Varela Round, sans-serif",
              desktop: "400 22px Varela Round, sans-serif",
              large: "400 24px Varela Round, sans-serif"
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
const CTASection = React.memo(() => {
  const { getResponsiveValue, isMobile } = useResponsive();
  const { getSectionPadding, getElementSpacing } = useGridSpacing();

  return (
    <section style={{
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
            padding: 40px 25px; 
            border-radius: 20px; 
            margin: 0 15px;
          }
          
          .form-container {
            flex-direction: column !important;
            gap: 1rem !important;
          }
          
          .form-input {
            min-width: 100% !important;
          }
          
          .submit-btn {
            width: 100%;
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
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #0088FF 0%, #0066E6 100%)';
              e.target.style.transform = 'translateY(-2px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 24px rgba(0, 122, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, #007AFF 0%, #0051D5 100%)';
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 4px 16px rgba(0, 122, 255, 0.3)';
            }}
          >
            שלח
          </button>
        </form>
      </motion.div>
    </section>
  );
});

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
      padding: `${getElementSpacing('small')} ${getElementSpacing('medium')}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: GRID_SYSTEM.maxWidth.content,
        width: '100%',
        position: 'relative',
        zIndex: 2
      }}>
        {content.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
            style={{
              marginBottom: index === content.length - 1 ? 0 : getElementSpacing('medium'),
              padding: getElementSpacing('small'),
              direction: 'rtl',
              position: 'relative'
            }}
          >
            <div style={{
              position: 'absolute',
              left: '-20%',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '500px',
              height: '500px',
              background: 'radial-gradient(ellipse 120% 100% at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 100%)',
              filter: 'blur(50px)',
              zIndex: -1,
              pointerEvents: 'none',
              opacity: 0.8
            }} />

            <h3 style={{
              fontSize: getResponsiveValue({
                mobile: '24px',
                tablet: '32px',
                laptop: '32px',
                desktop: '36px',
                large: '40px'
              }),
              fontWeight: '700',
              marginBottom: getElementSpacing('small'),
              fontFamily: FONTS.secondary,
              lineHeight: 1.2,
              textAlign: 'center',
              direction: 'rtl',
              ...sharedStyles.gradientText,
              position: 'relative',
              zIndex: 2
            }}>
              {item.title}
            </h3>

            <p style={{
              fontSize: getResponsiveValue({
                mobile: '18px',
                tablet: '20px',
                laptop: '20px',
                desktop: '22px',
                large: '24px'
              }),
              lineHeight: 1.8,
              fontFamily: FONTS.secondary,
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '90%',
              margin: '0 auto',
              position: 'relative',
              zIndex: 2
            }}>
              {item.description}
            </p>
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
      padding: `${getElementSpacing('small')} ${getElementSpacing('medium')}`
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
        <HeroSection />
        <CompanyCarouselSection />
        <HebrewTextSection />
        <AboutUsSection />
        <OurServicesSection />
        <CTASection />
        <GallerySection />
        <FAQSection />
      </div>
    </>
  );
};

export default MAINPAGE;
