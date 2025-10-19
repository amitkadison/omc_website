import { useState, useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

// 🎯 **הוקים מקצועיים לזיהוי מסכים על פי react-responsive**
export const useResponsiveBreakpoints = () => {
  const [screenInfo, setScreenInfo] = useState({});
  
  // 📱 בדיקת מובייל חזקה - עדיפות ראשונה!
  const isMobileStrict = useMediaQuery({ query: '(max-width: 768px)' });
  const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isMobileTouch = 'ontouchstart' in window;
  const isMobileByWidth = window.innerWidth <= 768;
  
  // אם אחד מהם מצביע על מובייל - זה מובייל!
  const isMobileFinal = isMobileStrict || isMobileUserAgent || (isMobileTouch && isMobileByWidth);
  
  // Enhanced breakpoints - כולל תמיכה במסכים גדולים מאוד
  const isMobile = isMobileFinal;
  const isTablet = useMediaQuery({ query: '(min-width: 769px) and (max-width: 1024px)' }) && !isMobileFinal;
  const isLaptop = useMediaQuery({ query: '(min-width: 1025px) and (max-width: 1366px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 1367px) and (max-width: 1919px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1920px) and (max-width: 2559px)' });
  const isXLarge = useMediaQuery({ query: '(min-width: 2560px) and (max-width: 3839px)' });
  const isUltraWide = useMediaQuery({ query: '(min-width: 3840px)' });
  
  // זיהויים נוספים שימושיים
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' });
  const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' });
  const is4K = useMediaQuery({ query: '(min-width: 3840px) and (min-height: 2160px)' });
  const isUltraWideScreen = useMediaQuery({ query: '(min-aspect-ratio: 21/9)' });
  
  useEffect(() => {
    const detectScreenType = () => {
      const screen = window.screen;
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      
      const screenWidth = screen.width;
      const screenHeight = screen.height;
      const pixelRatio = window.devicePixelRatio || 1;
      const actualScreenWidth = screenWidth / pixelRatio;
      const aspectRatio = screenWidth / screenHeight;
      
      const isLikelyLaptop = (
        (actualScreenWidth >= 800 && actualScreenWidth <= 1920) &&
        (screenHeight / screenWidth >= 0.5 && screenHeight / screenWidth <= 0.8) &&
        (pixelRatio >= 1.5 && pixelRatio <= 3) &&
        (screenWidth <= 3840)
      );
      
      const isLikelyExternalMonitor = (
        (actualScreenWidth > 2000) || 
        (pixelRatio === 1 && actualScreenWidth > 1200) ||
        (screenHeight / screenWidth < 0.5 && actualScreenWidth > 1500)
      );
      
      const isLikely4K = screenWidth >= 3840 && screenHeight >= 2160;
      const isLikelyUltraWide = aspectRatio >= 2.33; // 21:9 or wider
      
      setScreenInfo({
        screenWidth: actualScreenWidth,
        screenHeight,
        pixelRatio,
        aspectRatio,
        isLikelyLaptop,
        isLikelyExternalMonitor,
        isLikely4K,
        isLikelyUltraWide,
        viewportWidth: viewport.width,
        viewportHeight: viewport.height
      });
    };
    
    // Debounce resize events to prevent excessive re-renders
    let timeoutId;
    const debouncedDetectScreenType = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(detectScreenType, 150);
    };
    
    detectScreenType();
    window.addEventListener('resize', debouncedDetectScreenType);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', debouncedDetectScreenType);
    };
  }, []);
  
  const smartBreakpoint = useMemo(() => {
    // 📱 אם זיהינו מובייל - זה מובייל! אין ויכוחים
    if (isMobileFinal) {
      return 'mobile';
    }
    
    // תעדוף מסכים גדולים מאוד
    if (isUltraWide || screenInfo.isLikely4K) {
      return 'ultrawide';
    }
    
    if (isXLarge || screenInfo.isLikelyUltraWide) {
      return 'xlarge';
    }
    
    const preferLaptop = screenInfo.pixelRatio && screenInfo.pixelRatio > 1.5;
    
    if (screenInfo.isLikelyLaptop && !screenInfo.isLikelyExternalMonitor) {
      return 'laptop';
    }
    
    if (screenInfo.isLikelyExternalMonitor && !preferLaptop) {
      return 'large';
    }
    
    if (preferLaptop && screenInfo.screenWidth && screenInfo.screenWidth < 1000) {
      return 'laptop';
    }
    
    // Default breakpoint detection
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    if (isLaptop) return 'laptop';
    if (isDesktop) return 'desktop';
    if (isLargeScreen) return 'large';
    if (isXLarge) return 'xlarge';
    if (isUltraWide) return 'ultrawide';
    
    if (preferLaptop) return 'laptop';
    
    return 'desktop';
  }, [screenInfo, isMobile, isTablet, isLaptop, isDesktop, isLargeScreen, isXLarge, isUltraWide, isMobileFinal]);
  
  return { 
    isMobile: isMobileFinal,
    isTablet: smartBreakpoint === 'tablet', 
    isLaptop: smartBreakpoint === 'laptop',
    isDesktop: smartBreakpoint === 'desktop',
    isLargeScreen: smartBreakpoint === 'large',
    isXLarge: smartBreakpoint === 'xlarge',
    isUltraWide: smartBreakpoint === 'ultrawide',
    isPortrait, 
    isRetina,
    is4K,
    isUltraWideScreen,
    screenInfo,
    smartBreakpoint
  };
};

// 🎨 **פונקציית עזר לקבלת ערכים רספונסיביים - מורחבת**
export const getResponsiveValue = (values, breakpoints) => {
  const { isMobile, isTablet, isLaptop, isDesktop, isLargeScreen, isXLarge, isUltraWide } = breakpoints;
  
  // תמיכה מלאה בכל הגדלים
  if (isMobile && values.mobile) return values.mobile;
  if (isTablet && values.tablet) return values.tablet;
  if (isLaptop && values.laptop) return values.laptop;
  if (isDesktop && values.desktop) return values.desktop;
  if (isLargeScreen && values.large) return values.large;
  if (isXLarge && values.xlarge) return values.xlarge;
  if (isUltraWide && values.ultrawide) return values.ultrawide;
  
  // Fallback chain - חכם יותר
  if (isUltraWide) {
    return values.xlarge || values.large || values.desktop || values.laptop || values.mobile;
  }
  if (isXLarge) {
    return values.large || values.desktop || values.laptop || values.mobile;
  }
  if (isLargeScreen) {
    return values.desktop || values.laptop || values.mobile;
  }
  
  return values.laptop || values.desktop || values.mobile;
};

// 🎯 **הוק משולב לנוחות - מחזיר גם הברייקפוינטים וגם הפונקציה**
export const useResponsive = () => {
  const breakpoints = useResponsiveBreakpoints();
  
  return {
    ...breakpoints,
    getResponsiveValue: (values) => getResponsiveValue(values, breakpoints)
  };
};

// 📊 **קבועים נפוצים לגדלים רספונסיביים - מורחב**
export const RESPONSIVE_SIZES = {
  // גדלי טקסט נפוצים - כולל מסכים גדולים
  TITLE_SIZES: {
    mobile: '2rem',
    tablet: '2.5rem',
    laptop: '3rem',
    desktop: '3.5rem',
    large: '4rem',
    xlarge: '4.5rem',
    ultrawide: '5rem'
  },
  
  SUBTITLE_SIZES: {
    mobile: '1.5rem',
    tablet: '1.8rem',
    laptop: '2rem',
    desktop: '2.2rem',
    large: '2.5rem',
    xlarge: '2.8rem',
    ultrawide: '3rem'
  },
  
  BODY_SIZES: {
    mobile: '1rem',
    tablet: '1.1rem',
    laptop: '1.2rem',
    desktop: '1.3rem',
    large: '1.4rem',
    xlarge: '1.5rem',
    ultrawide: '1.6rem'
  },
  
  // Padding נפוץ - מותאם למסכים גדולים
  SECTION_PADDING: {
    mobile: '2rem 1rem',
    tablet: '3rem 2rem',
    laptop: '4rem 3rem',
    desktop: '5rem 4rem',
    large: '6rem 5rem',
    xlarge: '7rem 6rem',
    ultrawide: '8rem 8rem'
  },
  
  // Gap נפוץ
  GRID_GAP: {
    mobile: '1rem',
    tablet: '1.5rem',
    laptop: '2rem',
    desktop: '2.5rem',
    large: '3rem',
    xlarge: '3.5rem',
    ultrawide: '4rem'
  },
  
  // Container widths - חשוב למסכים גדולים
  MAX_WIDTH: {
    mobile: '100%',
    tablet: '768px',
    laptop: '1200px',
    desktop: '1400px',
    large: '1600px',
    xlarge: '2000px',
    ultrawide: '2400px'
  },
  
  // Font scaling factors for better readability
  FONT_SCALE: {
    mobile: 1,
    tablet: 1.1,
    laptop: 1.15,
    desktop: 1.2,
    large: 1.25,
    xlarge: 1.3,
    ultrawide: 1.35
  }
};

// Helper function to calculate responsive font size with max limit
export const getResponsiveFontSize = (baseSize, breakpoints) => {
  const scale = getResponsiveValue(RESPONSIVE_SIZES.FONT_SCALE, breakpoints);
  const calculatedSize = parseFloat(baseSize) * scale;
  // Cap maximum font size for readability
  const maxSize = parseFloat(baseSize) * 1.5;
  return `${Math.min(calculatedSize, maxSize)}rem`;
};

// Helper function to get container max width
export const getContainerMaxWidth = (breakpoints) => {
  return getResponsiveValue(RESPONSIVE_SIZES.MAX_WIDTH, breakpoints);
};
