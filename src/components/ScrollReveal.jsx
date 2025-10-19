import { useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom"
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <motion.span 
          className="word" 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.02,
            ease: "easeOut"
          }}
        >
          {word}
        </motion.span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    const wordElements = el.querySelectorAll('.word');

    // Set initial state
    gsap.set(el, { 
      transformOrigin: '0% 50%', 
      rotate: baseRotation 
    });
    
    gsap.set(wordElements, { 
      opacity: baseOpacity,
      filter: enableBlur ? `blur(${blurStrength}px)` : 'blur(0px)'
    });

    // Rotation animation
    gsap.to(el, {
      rotate: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    });

    // Word animations
    gsap.to(wordElements, {
      opacity: 1,
      filter: 'blur(0px)',
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top 70%',
        end: 'bottom 30%',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <motion.h2 
      ref={containerRef} 
      className={`scroll-reveal ${containerClassName}`}
      initial={{ opacity: 0, y: 50, rotate: baseRotation }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        rotate: 0 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 1, 
        ease: "easeOut",
        staggerChildren: 0.05
      }}
    >
      <motion.p 
        className={`scroll-reveal-text ${textClassName}`}
        initial={{ opacity: 0, filter: `blur(${blurStrength}px)` }}
        whileInView={{ 
          opacity: 1, 
          filter: 'blur(0px)' 
        }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 0.8, 
          ease: "easeOut",
          delay: 0.2
        }}
      >
        {splitText}
      </motion.p>
    </motion.h2>
  );
};

export default ScrollReveal;
