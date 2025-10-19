"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
  getResponsiveValue
}) => {
  const [activeCard, setActiveCard] = useState(0);
  const [isInHijackZone, setIsInHijackZone] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const scrollStepsRef = useRef(0);

  const cardLength = content.length;
  const maxScrollSteps = cardLength - 1;

  const handleScroll = useCallback((e) => {
    if (!sectionRef.current) return;

    // Disable scroll hijacking on mobile and tablet
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024;
    
    if (isMobile || isTablet) {
      // Simple auto-advancing for mobile
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollPosition = (windowHeight * 0.5 - rect.top) / rect.height;
      
      if (scrollPosition >= 0 && scrollPosition <= 1) {
        const newActiveCard = Math.floor(scrollPosition * cardLength);
        if (newActiveCard !== activeCard && newActiveCard >= 0 && newActiveCard < cardLength) {
          setActiveCard(newActiveCard);
        }
      }
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // בדיקה האם אנחנו באזור הקטע
    const isInSection = rect.top <= windowHeight * 0.3 && rect.bottom >= windowHeight * 0.7;
    
    if (isInSection) {
      if (!isInHijackZone) {
        setIsInHijackZone(true);
      }

      // הפעלת scroll hijacking רק אם יש עוד צעדים
      const deltaY = e.deltaY;
      const currentSteps = scrollStepsRef.current;
      
      let shouldPrevent = false;
      
      // הוספת debounce כדי למנוע גלילה מהירה מדי
      if (Math.abs(deltaY) > 10) {
        if (deltaY > 0) {
          // גלילה למטה
          if (currentSteps < maxScrollSteps) {
            shouldPrevent = true;
            scrollStepsRef.current = Math.min(currentSteps + 1, maxScrollSteps);
            setActiveCard(scrollStepsRef.current);
            console.log('🔽 Down scroll - Step:', scrollStepsRef.current);
          }
        } else {
          // גלילה למעלה
          if (currentSteps > 0) {
            shouldPrevent = true;
            scrollStepsRef.current = Math.max(currentSteps - 1, 0);
            setActiveCard(scrollStepsRef.current);
            console.log('🔼 Up scroll - Step:', scrollStepsRef.current);
          }
        }
      }
      
      if (shouldPrevent) {
        e.preventDefault();
        e.stopPropagation();
      }
    } else {
      // יצאנו מהאזור
      if (isInHijackZone) {
        setIsInHijackZone(false);
        // איפוס רק אם יצאנו למעלה
        if (rect.bottom < windowHeight * 0.3) {
          scrollStepsRef.current = 0;
          setActiveCard(0);
          console.log('🔄 Reset - Out of zone (top)');
        }
      }
    }
  }, [isInHijackZone, maxScrollSteps, activeCard, cardLength]);

  // הוספת event listeners - רק לקונטיינר הספציפי
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleWheelPassive = (e) => handleScroll(e);
    const container = containerRef.current;
    
    // Mobile scroll handling
    const handleMobileScroll = () => {
      const isMobile = window.innerWidth <= 768;
      const isTablet = window.innerWidth <= 1024;
      
      if (isMobile || isTablet) {
        handleScroll({ deltaY: 0 }); // Call without wheel event for mobile
      }
    };
    
    // הוספת throttling כדי למנוע בעיות ביצועים
    let ticking = false;
    const throttledHandleWheel = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleWheelPassive(e);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    container.addEventListener('wheel', throttledHandleWheel, { passive: false });
    window.addEventListener('scroll', handleMobileScroll, { passive: true });
    
    return () => {
      container.removeEventListener('wheel', throttledHandleWheel);
      window.removeEventListener('scroll', handleMobileScroll);
    };
  }, [handleScroll]);

  // אופטימיזציה לוידאו
  useEffect(() => {
    // Preload the video for better performance
    const video = document.createElement('video');
    video.onloadeddata = () => {
      console.log('Video preloaded successfully');
      setMediaLoaded(true);
    };
    video.onerror = () => {
      console.log('Video preload failed');
      setMediaLoaded(false);
    };
    video.src = '/video_capela.mp4';
    video.muted = true;
    video.playsInline = true;
  }, []);

  return (
    <div 
      ref={containerRef}
      className="premium-blur-background"
      style={{
        width: '100%',
        position: 'relative',
        background: 'transparent',
        overflow: 'visible',
        willChange: 'transform'
      }}
    >
      <div 
        ref={sectionRef}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
                     padding: getResponsiveValue({
             mobile: '3rem 1rem',
             tablet: '4rem 2rem',
             laptop: '5rem 2.5rem',
             desktop: '6rem 3rem',
             large: '7rem 3.5rem'
           }),
        }}
      >
        {/* מכולה ראשית */}
        <div 
          style={{
            display: 'flex',
            height: 'auto',
            justifyContent: 'center',
            width: '100%',
            maxWidth: getResponsiveValue({
              mobile: '100%',
              tablet: '1200px',
              laptop: '1200px',
              desktop: '1400px',
              large: '1600px',
              xlarge: '1800px',
              ultrawide: '2000px'
            }),
            gap: getResponsiveValue({
              mobile: '0rem',
              tablet: '2rem',
              laptop: '2.5rem',
              desktop: '3rem',
              large: '3.5rem'
            }),
            flexDirection: getResponsiveValue({
              mobile: 'column-reverse',
              tablet: 'row',
              laptop: 'row',
              desktop: 'row',
              large: 'row'
            })
          }}
        >
                     {/* קטע הטקסט */}
           <div 
             style={{
               position: 'relative',
               display: 'flex',
               alignItems: 'flex-start',
               width: getResponsiveValue({
                 mobile: '100%',
                 tablet: '45%',
                 laptop: '45%',
                 desktop: '50%',
                 large: '55%',
                 xlarge: '60%',
                 ultrawide: '65%'
               }),
               paddingRight: getResponsiveValue({
                 mobile: '0',
                 tablet: '1rem',
                 laptop: '1.5rem',
                 desktop: '2rem',
                 large: '2.5rem'
               }),
               order: getResponsiveValue({
                 mobile: 0,
                 tablet: 2,
                 laptop: 2,
                 desktop: 2,
                 large: 2
               })
             }}
           >
                                       <div 
               className="premium-glass-container fade-in-animation"
               style={{ 
                 width: '100%', 
                 paddingTop: '1rem',
                 padding: getResponsiveValue({
                   mobile: '1rem',
                   tablet: '1.5rem',
                   laptop: '2rem',
                   desktop: '2.5rem',
                   large: '3rem'
                 }),
                 borderRadius: '15px',
                 background: 'transparent',
                 border: 'none',
                 boxShadow: 'none'
               }}
             >
              {content.map((item, index) => (
                <div 
                  key={item.title + index} 
                  style={{
                    marginBottom: getResponsiveValue({
                      mobile: '0.5rem',
                      tablet: '0.6rem',
                      laptop: '1.2rem',
                      desktop: '1.5rem',
                      large: '1.8rem',
                      xlarge: '1.8rem',
                      ultrawide: '1.8rem'
                    })
                  }}
                >
                                     <motion.h3
                     animate={{
                       opacity: activeCard === index ? 1 : 0.4,
                       color: activeCard === index ? "#ffffff" : "#666666",
                       textShadow: 'none'
                     }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                     style={{
                       fontSize: getResponsiveValue({
                         mobile: '0.9rem',
                         tablet: '1.6rem',
                         laptop: '1.8rem',
                         desktop: '2rem',
                         large: '2.1rem',
                         xlarge: '2.2rem',
                         ultrawide: '2.3rem'
                       }),
                       fontFamily: 'Varela Round, sans-serif',
                       fontWeight: '700',
                       marginBottom: '0.4rem',
                       direction: 'rtl',
                       textAlign: 'right',
                       position: 'relative',
                       willChange: 'opacity, color',
                       transform: 'translateZ(0)'
                     }}
                   >
                     {item.title}
                   </motion.h3>
                  
                                     <motion.p
                     animate={{
                       opacity: activeCard === index ? 1 : 0.4,
                       color: activeCard === index ? "#ffffff" : "#666666",
                       textShadow: 'none'
                     }}
                     transition={{ duration: 0.4, ease: "easeOut" }}
                     style={{
                       fontSize: getResponsiveValue({
                         mobile: '0.65rem',
                         tablet: '1rem',
                         laptop: '1.2rem',
                         desktop: '1.3rem',
                         large: '1.4rem',
                         xlarge: '1.5rem',
                         ultrawide: '1.6rem'
                       }),
                       fontFamily: 'Varela Round, sans-serif',
                       fontWeight: '400',
                       lineHeight: 1.8,
                       '@media (max-width: 768px)': {
                         lineHeight: 1.3
                       },
                       direction: 'rtl',
                       textAlign: 'right',
                       maxWidth: '100%',
                       position: 'relative',
                       willChange: 'opacity, color',
                       transform: 'translateZ(0)'
                     }}
                   >
                     {item.description}
                   </motion.p>
                </div>
              ))}
            </div>
                     </div>

           {/* הסרטון הקבוע - נשאר תמיד בצד ימין */}
           <div 
             className={cn("overflow-visible rounded-lg", contentClassName)}
             style={{
               height: getResponsiveValue({
                 mobile: '350px',
                 tablet: '550px',  // Increased to accommodate square frame
                 laptop: '650px',  // Increased to accommodate square frame
                 desktop: '750px', // Increased to accommodate square frame
                 large: '850px'    // Increased to accommodate square frame
               }),
               width: getResponsiveValue({
                 mobile: '100%',
                 tablet: '60%',
                 laptop: '60%',
                 desktop: '60%',
                 large: '60%'
               }),
               marginBottom: getResponsiveValue({
                 mobile: '2rem',
                 tablet: '0',
                 laptop: '0',
                 desktop: '0',
                 large: '0'
               }),
               order: getResponsiveValue({
                 mobile: 0,
                 tablet: 1,
                 laptop: 1,
                 desktop: 1,
                 large: 1
               })
             }}
           >
             <div style={{ height: '100%', width: '100%', overflow: 'visible' }}>
               <div 
                 style={{
                   display: 'flex',
                   height: '100%',
                   width: '100%',
                   alignItems: 'center', // Back to center alignment
                   justifyContent: 'center',
                   padding: '10px', // Small padding on all sides to prevent cutoff
                   overflow: 'visible', // Ensure video is not clipped
                   position: 'relative'
                 }}
               >
                 {/* TV Frame - Outer bezel - Square frame */}
                 <div 
                   style={{
                     width: getResponsiveValue({
                       mobile: '95%',
                       tablet: '90%',
                       laptop: '90%',
                       desktop: '90%',
                       large: '90%'
                     }),
                     height: getResponsiveValue({
                       mobile: '95%',
                       tablet: '95%',  // Back to taller portrait shape
                       laptop: '95%',  // Slightly shorter only to prevent cutoff
                       desktop: '95%',
                       large: '95%'
                     }),
                     position: 'relative',
                     background: 'linear-gradient(145deg, #1a1a1a 0%, #0d0d0d 30%, #000000 70%, #1a1a1a 100%)',
                     borderRadius: '25px',
                     padding: getResponsiveValue({
                       mobile: '8px',
                       tablet: '12px',
                       laptop: '15px',
                       desktop: '15px',
                       large: '18px'
                     }),
                     boxShadow: 
                       '0 0 0 3px #2a2a2a, ' +
                       '0 0 0 6px #1a1a1a, ' +
                       '0 0 0 8px #0d0d0d, ' +
                       '0 20px 40px rgba(0, 0, 0, 0.8), ' +
                       'inset 0 2px 4px rgba(255, 255, 255, 0.1), ' +
                       'inset 0 -2px 4px rgba(0, 0, 0, 0.8)',
                     border: '2px solid #333333',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center'
                   }}
                 >
                   {/* TV Brand/Power indicator */}
                   <div style={{
                     position: 'absolute',
                     bottom: '8px',
                     right: '20px',
                     width: '8px',
                     height: '8px',
                     background: 'radial-gradient(circle, #00ff00 0%, #008800 100%)',
                     borderRadius: '50%',
                     boxShadow: '0 0 10px #00ff00, 0 0 20px #00ff0050',
                     zIndex: 10
                   }} />
                   
                   {/* TV Brand text */}
                   <div style={{
                     position: 'absolute',
                     bottom: '6px',
                     left: '20px',
                     color: '#666666',
                     fontSize: '8px',
                     fontFamily: 'Arial, sans-serif',
                     fontWeight: 'bold',
                     letterSpacing: '1px',
                     zIndex: 10
                   }}>
                     OMC
                   </div>
                   {/* TV Screen - Inner content area */}
                   <div 
                     style={{
                       width: '100%',
                       height: '100%',
                       position: 'relative',
                       borderRadius: '15px',
                       overflow: 'hidden',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       background: '#000000',
                       boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.9)'
                     }}
                   >
                  {/* Glass effect overlay for video */}
                   <div
                     style={{
                       position: 'absolute',
                       top: 0,
                       left: 0,
                       right: 0,
                       bottom: 0,
                       background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 25%, rgba(138, 43, 226, 0.1) 50%, rgba(255, 255, 255, 0.06) 75%, rgba(255, 255, 255, 0.1) 100%)',
                       border: '2px solid rgba(255, 255, 255, 0.25)',
                       borderRadius: '15px',
                       zIndex: 3,
                       pointerEvents: 'none',
                       boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 rgba(255, 255, 255, 0.1)'
                     }}
                   />
                   
                   {/* Dark overlay for video depth */}
                   <div
                     style={{
                       position: 'absolute',
                       top: 0,
                       left: 0,
                       right: 0,
                       bottom: 0,
                       background: 'rgba(0, 0, 0, 0.2)',
                       borderRadius: '15px',
                       zIndex: 1,
                       pointerEvents: 'none'
                     }}
                   />
                   
                   {/* Geometric shapes around video */}
                   {/* Top left corner */}
                   <div style={{
                     position: 'absolute',
                     top: '10px',
                     left: '10px',
                     width: '20px',
                     height: '20px',
                     border: '1px solid rgba(192, 192, 192, 0.3)',
                     borderRight: 'none',
                     borderBottom: 'none',
                     zIndex: 3,
                     pointerEvents: 'none',
                     borderRadius: '0 0 0 8px'
                   }} />
                   
                   {/* Top right corner */}
                   <div style={{
                     position: 'absolute',
                     top: '10px',
                     right: '10px',
                     width: '20px',
                     height: '20px',
                     border: '1px solid rgba(192, 192, 192, 0.3)',
                     borderLeft: 'none',
                     borderBottom: 'none',
                     zIndex: 3,
                     pointerEvents: 'none',
                     borderRadius: '0 0 8px 0'
                   }} />
                   
                   {/* Bottom left corner */}
                   <div style={{
                     position: 'absolute',
                     bottom: '10px',
                     left: '10px',
                     width: '20px',
                     height: '20px',
                     border: '1px solid rgba(192, 192, 192, 0.3)',
                     borderRight: 'none',
                     borderTop: 'none',
                     zIndex: 3,
                     pointerEvents: 'none',
                     borderRadius: '0 8px 0 0'
                   }} />
                   
                   {/* Bottom right corner */}
                   <div style={{
                     position: 'absolute',
                     bottom: '10px',
                     right: '10px',
                     width: '20px',
                     height: '20px',
                     border: '1px solid rgba(192, 192, 192, 0.3)',
                     borderLeft: 'none',
                     borderTop: 'none',
                     zIndex: 3,
                     pointerEvents: 'none',
                     borderRadius: '8px 0 0 0'
                   }} />
                   
                   {/* Center geometric accent */}
                   <div style={{
                     position: 'absolute',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     width: '40px',
                     height: '40px',
                     border: '1px solid rgba(192, 192, 192, 0.2)',
                     borderRadius: '50%',
                     zIndex: 2,
                     pointerEvents: 'none',
                     opacity: 0.5
                   }} />
                   
                   {/* Small decorative dots */}
                   <div style={{
                     position: 'absolute',
                     top: '25%',
                     left: '5px',
                     width: '4px',
                     height: '4px',
                     background: 'rgba(192, 192, 192, 0.4)',
                     borderRadius: '50%',
                     zIndex: 3,
                     pointerEvents: 'none'
                   }} />
                   
                   <div style={{
                     position: 'absolute',
                     top: '75%',
                     right: '5px',
                     width: '4px',
                     height: '4px',
                     background: 'rgba(192, 192, 192, 0.4)',
                     borderRadius: '50%',
                     zIndex: 3,
                     pointerEvents: 'none'
                   }} />
                   
                   <div style={{
                     position: 'absolute',
                     top: '50%',
                     left: '5px',
                     width: '3px',
                     height: '3px',
                     background: 'rgba(192, 192, 192, 0.3)',
                     borderRadius: '50%',
                     zIndex: 3,
                     pointerEvents: 'none'
                   }} />
                   
                   <div style={{
                     position: 'absolute',
                     top: '50%',
                     right: '5px',
                     width: '3px',
                     height: '3px',
                     background: 'rgba(192, 192, 192, 0.3)',
                     borderRadius: '50%',
                     zIndex: 3,
                     pointerEvents: 'none'
                   }} />
                  <video
                     src="/video_capela.mp4"
                     autoPlay
                     loop
                     muted
                     playsInline
                     style={{
                       height: '90%', // Tall portrait height
                       width: '75%',  // Narrower width to maintain portrait ratio
                       objectFit: 'cover',
                       transition: 'transform 0.6s ease-in-out',
                       position: 'relative',
                       zIndex: 2,
                       borderRadius: '15px',
                       opacity: mediaLoaded ? 1 : 0.7,
                       willChange: 'transform',
                       transform: 'translateZ(0)',
                       backfaceVisibility: 'hidden',
                       WebkitBackfaceVisibility: 'hidden',
                       backgroundColor: 'transparent',
                       filter: 'saturate(0.9) contrast(1.1) brightness(0.95)'
                     }}
                    onLoadedData={(e) => {
                      console.log('Video loaded successfully');
                      setMediaLoaded(true);
                    }}
                    onError={(e) => {
                      console.log('Video failed to load:', e.target.src);
                      setMediaLoaded(false);
                      e.target.style.display = 'none';
                      e.target.parentElement.style.background = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)';
                      e.target.parentElement.innerHTML = '<div style="color: white; font-size: 1.5rem; font-weight: bold;">וידאו</div>';
                    }}
                  />
                   </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Progress bar צדדי משופר - צבעי כסף-אפור-שחור-לבן */}
           <div 
             style={{
               height: getResponsiveValue({
                 mobile: '0px',
                 tablet: '350px',
                 laptop: '450px',
                 desktop: '550px',
                 large: '650px'
               }),
               width: getResponsiveValue({
                 mobile: '0px',
                 tablet: '10px',
                 laptop: '12px',
                 desktop: '14px',
                 large: '16px'
               }),
               background: 'rgba(64, 64, 64, 0.3)',
               borderRadius: '8px',
               overflow: 'hidden',
               display: getResponsiveValue({
                 mobile: 'none',
                 tablet: 'block',
                 laptop: 'block',
                 desktop: 'block',
                 large: 'block'
               }),
               position: 'relative',
               boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 0 20px rgba(192, 192, 192, 0.2)',
               border: '1px solid rgba(192, 192, 192, 0.3)',
               order: getResponsiveValue({
                 mobile: 0,
                 tablet: 3,
                 laptop: 3,
                 desktop: 3,
                 large: 3
               })
             }}
           >
             {/* רקע זוהר */}
             <div style={{
               position: 'absolute',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               background: 'linear-gradient(180deg, rgba(192, 192, 192, 0.1) 0%, rgba(128, 128, 128, 0.05) 50%, rgba(192, 192, 192, 0.1) 100%)',
               borderRadius: '8px',
               zIndex: 1
             }} />
             
             {/* Progress bar זוהר עם אנימציה מתמלא לאט לאט */}
             <motion.div
               animate={{
                 height: `${((activeCard + 1) / cardLength) * 100}%`
               }}
               transition={{ 
                 duration: 1.5, // קיצור האנימציה לביצועים טובים יותר
                 ease: [0.4, 0.0, 0.2, 1], // אנימציה חלקה יותר
                 type: "tween" // שימוש ב-tween במקום spring לאנימציה חלקה יותר
               }}
               style={{
                 width: '100%',
                 background: 'linear-gradient(180deg, #FFFFFF 0%, #E0E0E0 20%, #C0C0C0 40%, #A0A0A0 60%, #808080 80%, #404040 100%)',
                 borderRadius: '8px',
                 position: 'relative',
                 zIndex: 2,
                 boxShadow: '0 0 20px rgba(192, 192, 192, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
                 willChange: 'height'
               }}
             >
               {/* אפקט זוהר פנימי */}
               <div style={{
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 right: 0,
                 bottom: 0,
                 background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 30%, transparent 50%, rgba(192, 192, 192, 0.2) 70%, rgba(255, 255, 255, 0.1) 100%)',
                 borderRadius: '8px',
                 zIndex: 3
               }} />
               
               {/* חלקיקים זוהרים */}
               <motion.div
                 animate={{
                   y: [0, -15, 0],
                   opacity: [0.6, 1, 0.6]
                 }}
                 transition={{
                   duration: 3,
                   repeat: Infinity,
                   ease: "easeInOut"
                 }}
                 style={{
                   position: 'absolute',
                   top: '25%',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   width: '3px',
                   height: '3px',
                   background: 'rgba(255, 255, 255, 0.9)',
                   borderRadius: '50%',
                   boxShadow: '0 0 8px rgba(255, 255, 255, 0.9), 0 0 12px rgba(192, 192, 192, 0.8)',
                   zIndex: 4,
                   willChange: 'transform, opacity',
                   transform: 'translateZ(0)'
                 }}
               />
               
               <motion.div
                 animate={{
                   y: [0, -20, 0],
                   opacity: [0.4, 1, 0.4]
                 }}
                 transition={{
                   duration: 3.5,
                   repeat: Infinity,
                   ease: "easeInOut",
                   delay: 1
                 }}
                 style={{
                   position: 'absolute',
                   top: '65%',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   width: '2px',
                   height: '2px',
                   background: 'rgba(192, 192, 192, 0.8)',
                   borderRadius: '50%',
                   boxShadow: '0 0 6px rgba(192, 192, 192, 0.8)',
                   zIndex: 4,
                   willChange: 'transform, opacity',
                   transform: 'translateZ(0)'
                 }}
               />
               
               <motion.div
                 animate={{
                   y: [0, -10, 0],
                   opacity: [0.3, 0.8, 0.3]
                 }}
                 transition={{
                   duration: 2.8,
                   repeat: Infinity,
                   ease: "easeInOut",
                   delay: 0.5
                 }}
                 style={{
                   position: 'absolute',
                   top: '45%',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   width: '1px',
                   height: '1px',
                   background: 'rgba(255, 255, 255, 0.7)',
                   borderRadius: '50%',
                   boxShadow: '0 0 4px rgba(255, 255, 255, 0.7)',
                   zIndex: 4,
                   willChange: 'transform, opacity',
                   transform: 'translateZ(0)'
                 }}
               />
             </motion.div>
             
             {/* אפקט זוהר חיצוני */}
             <motion.div
               animate={{
                 opacity: [0.2, 0.6, 0.2]
               }}
               transition={{
                 duration: 4,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
               style={{
                 position: 'absolute',
                 top: 0,
                 left: 0,
                 right: 0,
                 bottom: 0,
                 background: 'radial-gradient(circle at center, rgba(192, 192, 192, 0.15) 0%, transparent 70%)',
                 borderRadius: '8px',
                 zIndex: 0
               }}
             />
           </div>
        </div>
      </div>

             {/* אינדיקטור דיסקרטי למצב hijack משופר - צבעי כסף-אפור-שחור-לבן */}
       {/* אינדיקטור דיסקרטי למצב hijack - הוסר */}
    </div>
  );
};
