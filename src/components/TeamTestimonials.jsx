import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResponsive } from '../hooks/useResponsive';

export const TeamTestimonials = ({ teamMembers, autoplay = true }) => {
  const [active, setActive] = useState(0);
  const { getResponsiveValue } = useResponsive();

  const handleNext = () => {
    setActive((prev) => (prev + 1) % teamMembers.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 6000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div
      style={{
        maxWidth: getResponsiveValue({
          mobile: '100%',
          tablet: '800px',
          laptop: '1200px',
          desktop: '1400px'
        }),
        margin: '0 auto',
        padding: getResponsiveValue({
          mobile: '2rem 1rem',
          tablet: '3rem 2rem',
          laptop: '4rem 3rem',
          desktop: '5rem 4rem'
        }),
        fontFamily: 'Heebo, sans-serif'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: getResponsiveValue({
          mobile: '1fr',
          tablet: '1fr 1fr',
          laptop: '1fr 1fr',
          desktop: '1fr 1fr'
        }),
        gap: getResponsiveValue({
          mobile: '3rem',
          tablet: '4rem',
          laptop: '5rem',
          desktop: '6rem'
        }),
        alignItems: 'center'
      }}>
        {/* תמונות הצוות */}
        <div>
          <div style={{
            position: 'relative',
            height: getResponsiveValue({
              mobile: '350px',
              tablet: '400px',
              laptop: '500px',
              desktop: '550px'
            }),
            width: '100%'
          }}>
            <AnimatePresence>
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : teamMembers.length + 2 - index,
                    y: isActive(index) ? [0, -20, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transformOrigin: 'bottom'
                  }}
                >
                  <motion.img
                    src={member.src}
                    alt={member.name}
                    width={500}
                    height={500}
                    draggable={false}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '20px',
                      objectFit: 'cover',
                      objectPosition: 'center',
                      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                      transform: 'rotate(-2deg)'
                    }}
                    whileHover={{ 
                      scale: 1.05,
                      rotate: 0,
                      transition: { 
                        duration: 0.4,
                        ease: "easeOut"
                      }
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* תוכן הצוות */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: getResponsiveValue({
            mobile: '1rem 0',
            tablet: '2rem 0',
            laptop: '3rem 0',
            desktop: '4rem 0'
          }),
          direction: 'rtl'
        }}>
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            <h3 style={{
              fontSize: getResponsiveValue({
                mobile: '2rem',
                tablet: '2.5rem',
                laptop: '3rem',
                desktop: '3.5rem'
              }),
              fontWeight: '400',
              color: '#CD7F32',
              fontFamily: 'Cormorant Garamond, serif',
              marginBottom: '1rem',
              textShadow: '0 2px 10px rgba(205, 127, 50, 0.3)'
            }}>
              {teamMembers[active].name}
            </h3>
            <p style={{
              fontSize: getResponsiveValue({
                mobile: '1rem',
                tablet: '1.1rem',
                laptop: '1.2rem',
                desktop: '1.3rem'
              }),
              color: 'rgba(255, 255, 255, 0.8)',
              fontFamily: 'Heebo, sans-serif',
              fontWeight: '300',
              marginBottom: '2rem'
            }}>
              {teamMembers[active].designation}
            </p>
            <motion.p style={{
              fontSize: getResponsiveValue({
                mobile: '1rem',
                tablet: '1.1rem',
                laptop: '1.2rem',
                desktop: '1.3rem'
              }),
              color: 'rgba(255, 255, 255, 0.95)',
              fontFamily: 'Heebo, sans-serif',
              fontWeight: '300',
              lineHeight: 1.8,
              marginTop: '2rem',
              textShadow: '0 1px 5px rgba(0, 0, 0, 0.7)'
            }}>
              {teamMembers[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(8px)",
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    delay: 0.03 * index,
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* כפתורי ניווט מתחת לתמונות */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            paddingTop: getResponsiveValue({
              mobile: '2rem',
              tablet: '3rem',
              laptop: '4rem',
              desktop: '5rem'
            })
          }}>
            <motion.button
              onClick={handlePrev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(205, 127, 50, 0.2)',
                border: '2px solid rgba(205, 127, 50, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#CD7F32' }}
              >
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </motion.button>
            <motion.button
              onClick={handleNext}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(205, 127, 50, 0.2)',
                border: '2px solid rgba(205, 127, 50, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#CD7F32' }}
              >
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
