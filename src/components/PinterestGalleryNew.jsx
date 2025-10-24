import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import { useResponsive } from '../hooks/useResponsive';
import { galleryItems, mobileGalleryItems } from '../data/galleryData';

const PinterestGalleryNew = React.memo(() => {
  const { getResponsiveValue } = useResponsive();
  const [selectedImage, setSelectedImage] = useState(null);
  const [clickPosition, setClickPosition] = useState(null);

  // Device-specific column configuration
  const columns = getResponsiveValue({
    mobile: 2,
    tablet: 3,
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

  // Handle ESC key press
  const handleEscapeKey = useCallback((event) => {
    if (event.key === 'Escape') {
      setSelectedImage(null);
      setClickPosition(null);
    }
  }, []);

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleEscapeKey);
      // document.body.style.overflow = 'hidden'; // מבוטל זמנית

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        // document.body.style.overflow = 'unset'; // מבוטל זמנית
      };
    }
  }, [selectedImage, handleEscapeKey]);

  const handleImageClick = (item, event) => {
    // Get the exact position of the clicked image relative to viewport
    const rect = event.currentTarget.getBoundingClientRect();
    
    // Calculate the center position for better positioning
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    setClickPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      centerX,
      centerY
    });
    
    setSelectedImage(item);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setClickPosition(null);
  };

  // Determine which gallery items to use based on screen size
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const currentGalleryItems = isMobile ? mobileGalleryItems : galleryItems;

  return (
    <>
      <div style={{
        width: '100%',
        maxWidth: isMobile ? 'none' : '1800px',
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
            columnFill: isMobile ? 'auto' : 'balance' // Better mobile distribution
          }}
        >
          {currentGalleryItems.map((item, index) => (
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
                opacity: selectedImage && selectedImage.id === item.id ? 0.3 : 1,
                position: 'relative'
              }}
              onClick={(e) => handleImageClick(item, e)}
            >
              <img
                src={item.img}
                alt={`Gallery item ${index + 1}`}
                style={{
                  width: '100%',
                  height: isMobile ? '280px' : 'auto', // Fixed height for mobile
                  objectFit: isMobile ? 'cover' : 'contain', // Ensure uniform appearance
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
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Separate Enlarged Image */}
      {selectedImage && clickPosition && (
        <AnimatePresence>
          {/* Background Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(6px)',
              zIndex: 999998,
            }}
            onClick={handleClose}
          />

          {/* Close Button */}
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.2 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              top: '20px',
              right: '20px',
              background: 'rgba(0, 0, 0, 0.5)',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              width: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              zIndex: 1000000
            }}
          >
            <IconX size={24} />
          </motion.button>

          {/* Enlarged Image */}
          <motion.div
            initial={{
              x: clickPosition.x,
              y: clickPosition.y,
              width: clickPosition.width,
              height: clickPosition.height,
              scale: 1
            }}
            animate={{
              x: Math.max(20, clickPosition.centerX - (clickPosition.width * 1.4) / 2),
              y: Math.max(20, clickPosition.centerY - (clickPosition.height * 1.4) / 2),
              width: Math.min(window.innerWidth - 40, clickPosition.width * 1.4),
              height: Math.min(window.innerHeight - 40, clickPosition.height * 1.4),
              scale: 1
            }}
            exit={{
              x: clickPosition.x,
              y: clickPosition.y,
              width: clickPosition.width,
              height: clickPosition.height,
              scale: 1
            }}
            transition={{ 
              duration: 0.4, 
              ease: "easeOut",
              type: "spring",
              damping: 25,
              stiffness: 120
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: 999999,
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.6)'
            }}
          >
            <img
              src={selectedImage.img}
              alt={selectedImage.eventName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                borderRadius: 'inherit'
              }}
              onError={(e) => {
                e.target.src = '/placeholder-image.jpg';
              }}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
});

export default PinterestGalleryNew;