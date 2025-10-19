import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TeamPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  return (
    <div
      id="team-page"
      style={{
        width: '100vw',
        minHeight: '100vh',
        position: 'relative',
        backgroundImage: 'url(/image 6.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        overflow: 'hidden'
      }}
    >
      {/* רקע מעוצב */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.8) 100%)',
        zIndex: 1
      }} />

      {/* אפקטי זוהר */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.05, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle at center, rgba(192, 192, 192, 0.05) 0%, transparent 70%)',
          zIndex: 2,
          pointerEvents: 'none'
        }}
      />

      {/* תוכן ראשי */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        padding: '4rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
                 {/* כותרת ראשית */}
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
           transition={{ duration: 1, delay: 0.2 }}
           style={{
             textAlign: 'center',
             marginBottom: '6rem'
           }}
         >
           <h1 style={{
             fontSize: '5rem',
             fontWeight: '300',
             color: '#CD7F32',
             fontFamily: 'Cormorant Garamond, serif',
             letterSpacing: '0.02em',
             marginBottom: '1.5rem',
             textShadow: '0 4px 20px rgba(205, 127, 50, 0.3)'
           }}>
             הצוות שלנו
           </h1>
           <p style={{
             fontSize: '1.8rem',
             color: 'rgba(255, 255, 255, 0.9)',
             fontFamily: 'Heebo, sans-serif',
             fontWeight: '300',
             maxWidth: '900px',
             margin: '0 auto',
             lineHeight: 1.6,
             textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
           }}>
             צוות מקצועי ומיומן עם שנים של ניסיון ביצירת חוויות בלתי נשכחות
           </p>
         </motion.div>
      </div>
    </div>
  );
};

export default TeamPage;
