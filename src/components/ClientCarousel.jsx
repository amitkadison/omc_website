import React, { useMemo, useCallback } from 'react';
import Slider from 'react-slick';
import { useResponsive } from '../hooks/useResponsive';
import { clientLogos } from '../data/galleryData';

const ClientCarousel = React.memo(() => {
  const { getResponsiveValue } = useResponsive();
  
  const carouselStyles = useMemo(() => ({
    padding: getResponsiveValue({
      mobile: '1rem 0',
      tablet: '1.5rem 0',
      laptop: '2rem 0',
      desktop: '2.5rem 0',
      large: '3rem 0'
    }),
    logoSize: getResponsiveValue({
      mobile: { width: '60px', height: '60px' },
      tablet: { width: '75px', height: '75px' },
      laptop: { width: '90px', height: '90px' },
      desktop: { width: '110px', height: '110px' },
      large: { width: '130px', height: '130px' }
    })
  }), [getResponsiveValue]);

  const slickSettings = useMemo(() => ({
    infinite: true,
    slidesToShow: getResponsiveValue({
      mobile: 2,
      tablet: 3,
      laptop: 4,
      desktop: 5,
      large: 6
    }),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 3000,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    cssEase: "linear",
    variableWidth: false,
    centerMode: false,
    useCSS: true,
    useTransform: true,
    responsive: [
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1366, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 1599, settings: { slidesToShow: 5, slidesToScroll: 1 } }
    ]
  }), [getResponsiveValue]);

  const handleImageError = useCallback((e) => {
    e.target.style.display = 'none';
  }, []);

  return (
    <>
      <style>{`
        .logo-carousel {
          position: relative;
          overflow: hidden;
          background: transparent !important;
        }
        
        .logo-carousel .slick-track {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .logo-carousel .slick-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          outline: none;
          padding: 0 0.15rem;
        }
        
        .logo-carousel .slick-slide > div {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .logo-slide {
          display: flex !important;
          justify-content: center;
          align-items: center;
          opacity: 0.8;
          transition: opacity 0.3s ease, transform 0.3s ease;
          padding: 0 0.25rem;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }
        
        .logo-slide:hover {
          opacity: 1;
          transform: scale(1.05);
        }
        
        .logo-slide img {
          filter: grayscale(100%) contrast(1.2) brightness(1.2) drop-shadow(0 2px 8px rgba(255, 255, 255, 0.2));
          transition: filter 0.3s ease;
          background: transparent !important;
        }
        
        .logo-slide:hover img {
          filter: grayscale(100%) contrast(1.3) brightness(1.3) drop-shadow(0 4px 12px rgba(255, 255, 255, 0.3));
        }
        
        .logo-carousel .slick-dots {
          display: none !important;
        }
        
        .logo-carousel .slick-arrow {
          display: none !important;
        }
        
        /* שיפור למסכי לפטופ */
        @media (min-width: 1024px) {
          .logo-carousel .slick-slide {
            padding: 0 0.3rem;
          }
          
          .logo-slide {
            padding: 0 0.4rem;
          }
        }
        
        @media (min-width: 1366px) {
          .logo-carousel .slick-slide {
            padding: 0 0.4rem;
          }
          
          .logo-slide {
            padding: 0 0.5rem;
          }
        }
      `}</style>
      
      <div 
        className="logo-carousel" 
        style={{
          padding: carouselStyles.padding,
          position: 'relative',
          zIndex: 100,
          marginBottom: getResponsiveValue({
            mobile: '0.5rem',
            tablet: '0.8rem',
            laptop: '1rem',
            desktop: '1.2rem',
            large: '1.5rem'
          }),
          background: 'transparent'
        }}
      >
        <Slider {...slickSettings}>
          {clientLogos.map((logo, index) => (
            <div key={index} className="logo-slide">
              <img 
                src={logo} 
                alt={`Company logo ${index + 1}`} 
                style={{ 
                  width: carouselStyles.logoSize.width,
                  height: carouselStyles.logoSize.height,
                  objectFit: 'contain',
                  background: 'transparent'
                }} 
                onError={handleImageError}
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
});

export default ClientCarousel;