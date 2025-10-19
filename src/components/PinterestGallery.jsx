import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResponsive } from '../hooks/useResponsive';
import { galleryItems } from '../data/galleryData';

const PinterestGallery = React.memo(() => {
  const { getResponsiveValue } = useResponsive();
  const [hoveredImage, setHoveredImage] = useState(null);

  const columns = getResponsiveValue({
    mobile: 3,
    tablet: 4,
    laptop: 5,
    desktop: 6,
    large: 7
  });

  const containerPadding = getResponsiveValue({
    mobile: 12,
    tablet: 16,
    laptop: 20,
    desktop: 24,
    large: 28
  });

  const gap = getResponsiveValue({
    mobile: 6,
    tablet: 8,
    laptop: 10,
    desktop: 12,
    large: 14
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 60,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const handleMouseEnter = (item) => {
    setHoveredImage(item);
  };

  const handleMouseLeave = () => {
    setHoveredImage(null);
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: '1800px',
      margin: '0 auto',
      padding: `0 ${containerPadding}px`
    }}>
      <motion.div
        className="pinterest-gallery"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        style={{
          columnCount: columns,
          columnGap: `${gap}px`,
          columnFill: 'balance'
        }}
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="gallery-item"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.08,
              transition: { duration: 0.3 }
            }}
            data-aos="fade-up"
            data-aos-delay={index * 50}
            data-aos-duration="600"
            style={{
              breakInside: 'avoid',
              marginBottom: `${gap}px`,
              cursor: 'pointer',
              borderRadius: getResponsiveValue({
                mobile: '12px',
                tablet: '14px',
                laptop: '16px',
                desktop: '18px',
                large: '20px'
              }),
              overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              transition: 'all 0.3s ease',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative'
            }}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={item.img}
              alt={`Gallery item ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: 'inherit',
                transition: 'transform 0.3s ease'
              }}
              onLoad={(e) => {
                e.target.style.opacity = '1';
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            
            {/* Hover Overlay with Text */}
            <AnimatePresence>
              {hoveredImage && hoveredImage.id === item.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.9))',
                    padding: '20px',
                    color: 'white',
                    textAlign: 'center',
                    zIndex: 10
                  }}
                >
                  <motion.h3
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    style={{
                      fontSize: getResponsiveValue({
                        mobile: '10px',
                        tablet: '12px',
                        laptop: '14px',
                        desktop: '16px',
                        large: '18px'
                      }),
                      fontWeight: 'bold',
                      marginBottom: '8px',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)'
                    }}
                  >
                    {item.eventName}
                  </motion.h3>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    style={{
                      fontSize: getResponsiveValue({
                        mobile: '9px',
                        tablet: '11px',
                        laptop: '13px',
                        desktop: '15px',
                        large: '17px'
                      }),
                      lineHeight: 1.4,
                      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
                      fontStyle: 'italic',
                      opacity: 0.9
                    }}
                  >
                    "{item.clientQuote}"
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
});

export default PinterestGallery;