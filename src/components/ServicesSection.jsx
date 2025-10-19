import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '../hooks/useResponsive';
import { servicesData } from '../data/galleryData';
import ShinyText from './ShinyText';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ServicesSection = React.memo(() => {
  const { getResponsiveValue } = useResponsive();

  const sectionStyles = useMemo(() => ({
    minHeight: getResponsiveValue({
      mobile: '80vh',
      tablet: '85vh',
      laptop: '90vh',
      desktop: '95vh',
      large: '100vh'
    }),
    padding: getResponsiveValue({
      mobile: '3rem 0',
      tablet: '4rem 0',
      laptop: '5rem 0',
      desktop: '6rem 0',
      large: '7rem 0'
    }),
    titleSize: getResponsiveValue({
      mobile: '2.2rem',
      tablet: '2.8rem',
      laptop: '3.4rem',
      desktop: '4rem',
      large: '4.6rem'
    })
  }), [getResponsiveValue]);

  const cardStyles = useMemo(() => ({
    imageHeight: getResponsiveValue({
      mobile: '180px',
      tablet: '200px',
      laptop: '220px',
      desktop: '240px',
      large: '260px'
    })
  }), [getResponsiveValue]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: getResponsiveValue({
      mobile: 1,
      tablet: 2,
      laptop: 3,
      desktop: 4,
      large: 4
    }),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div style={{
      width: '100vw',
      minHeight: sectionStyles.minHeight,
      position: 'relative',
      zIndex: 7,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: sectionStyles.padding,
      marginTop: getResponsiveValue({
        mobile: '2rem',
        tablet: '3rem',
        laptop: '4rem',
        desktop: '5rem',
        large: '6rem'
      })
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          textAlign: 'center',
          marginBottom: getResponsiveValue({
            mobile: '1rem',
            tablet: '1.2rem',
            laptop: '1.5rem',
            desktop: '1.8rem',
            large: '2rem'
          }),
          width: '100%',
          paddingLeft: getResponsiveValue({
            mobile: '1rem',
            tablet: '2rem',
            laptop: '3rem',
            desktop: '4rem',
            large: '5rem'
          }),
          paddingRight: getResponsiveValue({
            mobile: '1rem',
            tablet: '2rem',
            laptop: '3rem',
            desktop: '4rem',
            large: '5rem'
          })
        }}
      >
        <h2 style={{
          fontSize: sectionStyles.titleSize,
          fontWeight: '700',
          fontFamily: "'Noto Sans Hebrew', sans-serif",
          background: 'linear-gradient(180deg, #ffffff 0%, #999999 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.5px',
          margin: 0,
          lineHeight: 1.1
        }}>
          <ShinyText 
            text="השירותים שלנו" 
            speed={4}
          />
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          width: '100vw',
          position: 'relative'
        }}
      >
        <style>{`
          /* Slick Carousel Custom Styles for Services */
          .services-slider {
            background: transparent;
            position: relative;
            overflow: visible;
            min-height: 500px;
            padding: 2rem 1rem;
          }
          
          .services-slider .slick-track {
            display: flex;
            align-items: stretch;
          }
          
          .services-slider .slick-slide {
            display: flex !important;
            outline: none;
            padding: 0 0.5rem;
          }
          
          .services-slider .slick-slide > div {
            width: 100%;
            height: 100%;
          }
          
          .service-card {
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 500px;
            overflow: hidden;
            border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            transition: all 0.3s ease;
          }
          
          .service-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.35);
          }
          
          .service-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
          }
          
          .service-overlay {
            position: absolute;
            inset: 2px;
            background: rgba(50, 49, 50, 0.9);
            border-radius: 14px;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 1.5rem;
            z-index: 2;
          }
          
          .service-content {
            text-align: center;
            color: white;
          }
          
          .service-title {
            font-family: 'Heebo', sans-serif;
            font-weight: 600;
            color: white;
            margin-bottom: 0.5rem;
            text-align: center;
            font-size: ${getResponsiveValue({
              mobile: '1.2rem',
              tablet: '1.3rem',
              laptop: '1.4rem',
              desktop: '1.5rem',
              large: '1.6rem'
            })};
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          }
          
          .service-description {
            font-family: 'Heebo', sans-serif;
            color: rgba(255, 255, 255, 0.8);
            line-height: 1.4;
            text-align: center;
            font-size: ${getResponsiveValue({
              mobile: '0.85rem',
              tablet: '0.9rem',
              laptop: '0.95rem',
              desktop: '1rem',
              large: '1.05rem'
            })};
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          }

          /* Blur effect background */
          .service-card::before {
            content: '';
            position: absolute;
            width: 224px;
            height: 192px;
            background: white;
            filter: blur(50px);
            left: -50%;
            top: -50%;
            z-index: 0;
            opacity: 0.3;
          }

          /* Slick dots styling */
          .services-slider .slick-dots {
            bottom: -50px;
          }
          
          .services-slider .slick-dots li button:before {
            color: #C9A14B;
            font-size: 12px;
          }
          
          .services-slider .slick-dots li.slick-active button:before {
            color: #1A365D;
          }

          /* Slick arrows styling */
          .services-slider .slick-prev,
          .services-slider .slick-next {
            z-index: 1;
            width: 40px;
            height: 40px;
          }
          
          .services-slider .slick-prev {
            left: 10px;
          }
          
          .services-slider .slick-next {
            right: 10px;
          }
          
          .services-slider .slick-prev:before,
          .services-slider .slick-next:before {
            color: #C9A14B;
            font-size: 30px;
          }
        `}</style>

        <div 
          className="services-slider"
          style={{
            padding: getResponsiveValue({
              mobile: '2rem 1rem',
              tablet: '3rem 1.5rem',
              laptop: '4rem 2rem',
              desktop: '5rem 3rem',
              large: '6rem 4rem'
            })
          }}
        >
          <Slider {...sliderSettings}>
            {servicesData.map((service, index) => (
              <div key={index}>
                <motion.div
                  className="service-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <img
                    src={service.image}
                    alt={service.text}
                    className="service-image"
                    onLoad={() => console.log(`תמונה ${index + 1} נטענה בהצלחה`)}
                    onError={(e) => {
                      console.error(`שגיאה בטעינת תמונה ${index + 1}:`, e);
                      e.target.style.background = `linear-gradient(135deg, #C9A14B, #1A365D)`;
                      e.target.style.display = 'block';
                    }}
                  />
                  <div className="service-overlay">
                    <div className="service-content">
                      <h3 className="service-title">{service.text}</h3>
                      <p className="service-description">
                        שירות מקצועי ואיכותי
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </div>
  );
});

export default ServicesSection;