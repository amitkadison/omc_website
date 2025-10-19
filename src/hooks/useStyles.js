import { useMemo } from 'react';
import { useResponsive, RESPONSIVE_SIZES } from './useResponsive';

export const useStyles = () => {
  const { isMobile, getResponsiveValue } = useResponsive();

  return useMemo(() => ({
    mainContainer: {
      width: '100vw',
      minHeight: '600vh',
      position: 'relative',
      background: `url('/image 6.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'scroll', // Always use scroll for better performance
      overflow: 'hidden',
      willChange: 'auto', // Prevent unnecessary GPU layer creation
      backfaceVisibility: 'hidden'
    },
    
    globalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.2) 100%)',
      zIndex: 1,
      pointerEvents: 'none'
    },

    heroSection: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      color: 'white',
      padding: '0 20px'
    },

    logo: {
      width: getResponsiveValue({
        mobile: 'min(250px, 60vw)',
        tablet: 'min(300px, 50vw)',
        laptop: 'min(350px, 40vw)',
        desktop: 'min(400px, 35vw)',
        large: 'min(450px, 30vw)'
      }),
      height: 'auto',
      marginBottom: '2rem',
      filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.8))'
    },

    heroButton: {
      backgroundColor: 'transparent',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      color: 'white',
      padding: getResponsiveValue({
        mobile: '12px 30px',
        tablet: '14px 35px',
        laptop: '15px 40px',
        desktop: '16px 45px',
        large: '18px 50px'
      }),
      borderRadius: '50px',
      fontSize: getResponsiveValue(RESPONSIVE_SIZES.BODY_SIZES),
      fontWeight: '400',
      cursor: 'pointer',
      fontFamily: 'Heebo, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
      textShadow: '0 1px 10px rgba(0, 0, 0, 0.8)'
    },

    contentSection: {
      width: '100vw',
      height: '100vh',
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '0vh',
      marginTop: '-15vh'
    },

    contentContainer: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: 'flex-start',
      justifyContent: 'center',
      position: 'relative'
    },

    videoContainer: {
      position: isMobile ? 'relative' : 'absolute',
      top: isMobile ? '0' : '10vh',
      left: isMobile ? '0' : '50%',
      transform: isMobile ? 'none' : 'translateX(-50%)',
      width: getResponsiveValue({
        mobile: '100vw',
        tablet: '70vw', 
        laptop: '40vw',
        desktop: '35vw',
        large: '32vw'
      }),
      height: getResponsiveValue({
        mobile: '60vh',
        tablet: '70vh',
        laptop: '65vh',
        desktop: '60vh',
        large: '55vh'
      }),
      maxWidth: isMobile ? 'none' : getResponsiveValue({
        tablet: '500px',
        laptop: '550px',
        desktop: '600px',
        large: '650px'
      }),
      borderRadius: isMobile ? '0' : '15px',
      overflow: 'hidden',
      boxShadow: '0 0 30px rgba(192, 192, 192, 0.8)',
      border: '1px solid rgba(192, 192, 192, 0.9)',
      background: 'rgba(0, 0, 0, 0.3)',
      zIndex: 3,
      marginBottom: isMobile ? '1rem' : '0',
      // Mobile optimizations
      ...(isMobile && {
        willChange: 'auto',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden'
      })
    },

    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: isMobile ? '0' : '13px',
      willChange: isMobile ? 'auto' : 'transform',
      backfaceVisibility: 'hidden',
      transform: 'translateZ(0)',
      transition: 'opacity 0.5s ease',
      // Additional optimizations for mobile
      ...(isMobile && {
        transform: 'translateZ(0)',
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      })
    },

    textSection: {
      position: isMobile ? 'relative' : 'absolute',
      top: isMobile ? '0' : '18vh',
      left: isMobile ? '0' : getResponsiveValue({
        tablet: '65%',
        laptop: '67.5%',
        desktop: '66%',
        large: '65%'
      }),
      width: getResponsiveValue({
        mobile: '100vw',
        tablet: '30vw',  
        laptop: '28vw',
        desktop: '26vw',
        large: '24vw'
      }),
      height: isMobile ? 'auto' : getResponsiveValue({
        tablet: '50vh',
        laptop: '50vh',
        desktop: '48vh',
        large: '45vh'
      }),
      maxWidth: isMobile ? 'none' : getResponsiveValue({
        tablet: '350px',
        laptop: '400px',
        desktop: '450px',
        large: '500px'
      }),
      zIndex: 4,
      color: 'white',
      textAlign: isMobile ? 'center' : 'right',
      padding: getResponsiveValue({
        mobile: '2rem 1rem',
        tablet: '1rem',
        laptop: '1rem',
        desktop: '1rem',
        large: '1rem'
      }),
      opacity: 0,
      transform: isMobile ? 'translateY(20vh)' : 'translateY(35vh)',
      overflow: 'hidden'
    },

    cocktailPage: {
      width: '100vw',
      minHeight: getResponsiveValue({
        mobile: '110vh',
        tablet: '115vh',
        laptop: '120vh',
        desktop: '125vh',
        large: '130vh'
      }),
      position: 'relative',
      background: `url('/T.O.S (36 of 327).jpg')`,
      backgroundSize: getResponsiveValue({
        mobile: '110%',
        tablet: '105%',
        laptop: '100%',
        desktop: 'cover',
        large: 'cover'
      }),
      backgroundPosition: getResponsiveValue({
        mobile: 'center 60%',
        tablet: 'center 65%',
        laptop: 'center 70%',
        desktop: 'center 70%',
        large: 'center 70%'
      }),
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'scroll', // Always use scroll for better performance
      imageRendering: 'optimize-quality',
      willChange: 'auto', // Prevent unnecessary layer creation
      backfaceVisibility: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
      marginTop: getResponsiveValue({
        mobile: '0',
        tablet: '0', 
        laptop: '0',
        desktop: '1rem',     
        large: '2rem'        
      })
    }
  }), [isMobile, getResponsiveValue]);
};
