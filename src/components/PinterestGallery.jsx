import React from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '../hooks/useResponsive';
import { galleryItems } from '../data/galleryData';

const PinterestGallery = React.memo(() => {
  const { getResponsiveValue } = useResponsive();

  const columns = getResponsiveValue({
    mobile: 2,
    tablet: 3,
    laptop: 4,
    desktop: 5,
    large: 6
  });

  const containerPadding = getResponsiveValue({
    mobile: 12,
    tablet: 16,
    laptop: 20,
    desktop: 24,
    large: 28
  });

  const gap = getResponsiveValue({
    mobile: 12,
    tablet: 16,
    laptop: 20,
    desktop: 24,
    large: 28
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
        {galleryItems.map((item, index) => {
          // יצירת גדלים לא אחידים כמו Pinterest - רק במובייל
          const isMobile = window.innerWidth <= 768;
          const heightVariations = isMobile ? 
            [180, 220, 260, 300, 240, 280, 200, 250] : 
            [200, 250, 300, 350, 280, 320, 240, 290, 260, 310];
          const randomHeight = heightVariations[index % heightVariations.length];
          
          return (
            <motion.div
              key={item.id}
              className="gallery-item"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
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
                  mobile: '16px',
                  tablet: '18px',
                  laptop: '20px',
                  desktop: '22px',
                  large: '24px'
                }),
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.4s ease',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(15px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                height: isMobile ? `${randomHeight}px` : 'auto',
                width: '100%'
              }}
            >
            <img
              src={item.img}
              alt={`Gallery item ${index + 1}`}
              style={{
                width: '100%',
                height: isMobile ? '100%' : 'auto',
                objectFit: isMobile ? 'cover' : 'contain',
                objectPosition: 'center',
                display: 'block',
                borderRadius: 'inherit',
                transition: 'transform 0.4s ease'
              }}
              onLoad={(e) => {
                e.target.style.opacity = '1';
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
});

export default PinterestGallery;