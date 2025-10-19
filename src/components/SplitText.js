import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Manual SplitText implementation (fallback for when GSAP SplitText is not available)
const manualSplitText = (element, splitType = 'chars') => {
  if (!element) return null;

  const text = element.textContent || element.innerText;
  element.innerHTML = "";

  if (splitType === "chars") {
    const chars = text.split('').map((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.minWidth = char === ' ' ? '0.2em' : 'auto';
      span.className = 'split-char';
      return span;
    });
    
    chars.forEach(char => element.appendChild(char));
    return { chars, words: null, lines: null };
  }

  if (splitType === "words") {
    const words = text.split(' ').map((word, index) => {
      const span = document.createElement('span');
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.marginRight = '0.3em';
      span.className = 'split-word';
      return span;
    });
    
    words.forEach(word => element.appendChild(word));
    return { chars: null, words, lines: null };
  }

  if (splitType === "lines") {
    const lines = text.split('\n').map((line, index) => {
      const div = document.createElement('div');
      div.textContent = line;
      div.style.display = 'block';
      div.className = 'split-line';
      return div;
    });
    
    lines.forEach(line => element.appendChild(line));
    return { chars: null, words: null, lines };
  }

  return null;
};

const SplitText = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}) => {
  const ref = useRef(null);
  const animationCompletedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts.status === 'loaded') {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
      });
    }
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      const el = ref.current;

      // Clean up previous instance
      if (el._rbsplitInstance) {
        try {
          el._rbsplitInstance.revert();
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
      const sign =
        marginValue === 0
          ? ''
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets;
      
      // Use manual split since we don't have GSAP SplitText plugin
      const splitInstance = manualSplitText(el, splitType);
      
      if (splitInstance) {
        if (splitType.includes('chars') && splitInstance.chars) targets = splitInstance.chars;
        else if (splitType.includes('words') && splitInstance.words) targets = splitInstance.words;
        else if (splitType.includes('lines') && splitInstance.lines) targets = splitInstance.lines;
        else targets = splitInstance.chars || splitInstance.words || splitInstance.lines;

        if (targets && targets.length > 0) {
          // Set initial state
          gsap.set(targets, { ...from });
          
          // Create animation
          const tween = gsap.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            scrollTrigger: {
              trigger: el,
              start,
              once: true,
              fastScrollEnd: true,
              anticipatePin: 0.4,
              onToggle: () => {
                console.log(`🎯 SplitText animation triggered for: "${text.substring(0, 20)}..."`);
              }
            },
            onComplete: () => {
              animationCompletedRef.current = true;
              onLetterAnimationComplete?.();
            },
            willChange: 'transform, opacity',
            force3D: true
          });
        }
      }

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach(st => {
          if (st.trigger === el) st.kill();
        });
        try {
          if (splitInstance) {
            // Restore original text
            el.innerHTML = text;
          }
        } catch (_) {
          /* noop */
        }
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
        onLetterAnimationComplete
      ],
      scope: ref
    }
  );

  const renderTag = () => {
    const style = {
      textAlign,
      overflow: 'hidden',
      display: 'inline-block',
      whiteSpace: 'normal',
      wordWrap: 'break-word',
      willChange: 'transform, opacity'
    };
    const classes = `split-parent ${className}`;
    
    switch (tag) {
      case 'h1':
        return (
          <h1 ref={ref} style={style} className={classes}>
            {text}
          </h1>
        );
      case 'h2':
        return (
          <h2 ref={ref} style={style} className={classes}>
            {text}
          </h2>
        );
      case 'h3':
        return (
          <h3 ref={ref} style={style} className={classes}>
            {text}
          </h3>
        );
      case 'h4':
        return (
          <h4 ref={ref} style={style} className={classes}>
            {text}
          </h4>
        );
      case 'h5':
        return (
          <h5 ref={ref} style={style} className={classes}>
            {text}
          </h5>
        );
      case 'h6':
        return (
          <h6 ref={ref} style={style} className={classes}>
            {text}
          </h6>
        );
      default:
        return (
          <p ref={ref} style={style} className={classes}>
            {text}
          </p>
        );
    }
  };

  return renderTag();
};

export default SplitText;