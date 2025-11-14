import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PinterestGallery from './PinterestGallery';

const GalleryPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .gallery-title {
            font-size: 2.5rem !important;
            padding: 0 20px !important;
            background: linear-gradient(135deg, #F7C873 0%, #C9A14B 50%, #A67C52 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            text-shadow: 0 2px 8px rgba(201, 161, 75, 0.4) !important;
          }
        }

        @media (max-width: 480px) {
          .gallery-title {
            font-size: 2rem !important;
            padding: 0 15px !important;
            background: linear-gradient(135deg, #F7C873 0%, #C9A14B 50%, #A67C52 100%) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            background-clip: text !important;
            text-shadow: 0 2px 6px rgba(201, 161, 75, 0.4) !important;
          }
        }
      `}</style>
      <div
        id="gallery-page"
               style={{
           width: '100vw',
           minHeight: '100vh',
           position: 'relative',
           backgroundImage: 'url("/image 6.png")',
           backgroundColor: '#1a1a1a', // Fallback color
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           backgroundAttachment: 'fixed',
           overflow: 'hidden'
         }}
      >
      {/* Background overlay to maintain readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)', // Dark overlay over the image
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
        padding: '6rem 0 4rem 0',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto'
      }}>
        {/* כותרת ראשית */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            padding: '0 2rem'
          }}
        >
          <h1 className="gallery-title" style={{
            fontSize: '80px',
            fontWeight: '700',
            fontFamily: "'Varela Round', sans-serif",
            background: 'linear-gradient(180deg, #ffffff 0%, #999999 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: 1.1,
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center',
            direction: 'rtl'
          }}>
            גלריית עבודות
          </h1>
        </motion.div>

        {/* גלריה ברוחב מלא */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            width: '100%',
            maxWidth: '100%',
            padding: '0'
          }}
        >
          <PinterestGallery />
        </motion.div>
      </div>
      </div>
    </>
  );
};

export default GalleryPage;
