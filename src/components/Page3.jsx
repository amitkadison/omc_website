import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// ייבוא הקומפוננטים שיצרנו
import SplitText from './SplitText';
import { useResponsive } from '../hooks/useResponsive';

// 🌟 ShinyText Component
const ShinyText = ({ text, disabled = false, speed = 3, className = "" }) => {
  if (disabled) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span 
      className={`shiny-text ${className}`}
      style={{ 
        background: `linear-gradient(
          90deg,
          #1A365D 0%,
          #1A365D 40%,
          #C9A14B 50%,
          #1A365D 60%,
          #1A365D 100%
        )`,
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        animation: `shiny ${speed}s ease-in-out infinite`,
        display: 'inline-block'
      }}
    >
      {text}
      <style>{`
        @keyframes shiny {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </span>
  );
};

// 🍸 **קרוסלת השירותים עם React Slick**
const ServicesSlider = React.memo(() => {
  const { getResponsiveValue } = useResponsive();

  const services = useMemo(() => [
    {
      image: "https://via.placeholder.com/400x300/1A365D/FFFFFF?text=בר+לאירועים+פרטיים",
      title: "בר לאירועים פרטיים",
      description: "שירות בר מלא לחתונות, בר מצוות ואירועים משפחתיים"
    },
    {
      image: "https://via.placeholder.com/400x300/C9A14B/FFFFFF?text=בר+לאירועי+חברה", 
      title: "בר לאירועי חברה",
      description: "בר מקצועי לכנסים, השקות מוצרים ואירועי חברה"
    },
    {
      image: "https://via.placeholder.com/400x300/2C3E50/FFFFFF?text=בר+להפקות",
      title: "בר להפקות",
      description: "שירותי בר לצילומים, סרטים ואירועי מדיה"
    },
    {
      image: "https://via.placeholder.com/400x300/8B2635/FFFFFF?text=בר+להשקות",
      title: "בר להשקות",
      description: "בר ייחודי להשקת מוצרים ואירועי עסקיים"
    },
    {
      image: "https://via.placeholder.com/400x300/FFD700/1A365D?text=בר+למסיבות",
      title: "בר למסיבות",
      description: "בר דינמי למסיבות פרטיות ואירועי לילה"
    }
  ], []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: getResponsiveValue({
      mobile: 1,
      tablet: 2,
      laptop: 3,
      desktop: 3,
      large: 4
    }),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    arrows: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 2000,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          speed: 2500,
          dots: true
        }
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };

  const cardStyles = {
    margin: getResponsiveValue({
      mobile: '0 0.5rem',
      tablet: '0 0.75rem',
      laptop: '0 1rem',
      desktop: '0 1.25rem',
      large: '0 1.5rem'
    }),

    imageHeight: getResponsiveValue({
      mobile: '200px',
      tablet: '220px',
      laptop: '240px',
      desktop: '260px',
      large: '280px'
    }),

    titleSize: getResponsiveValue({
      mobile: '1.1rem',
      tablet: '1.2rem',
      laptop: '1.3rem',
      desktop: '1.4rem',
      large: '1.5rem'
    }),

    descriptionSize: getResponsiveValue({
      mobile: '0.9rem',
      tablet: '1rem',
      laptop: '1.05rem',
      desktop: '1.1rem',
      large: '1.15rem'
    })
  };

  return (
    <>
      <style>{`
        /* Slick Carousel Custom Styles for Services */
        .services-slider {
          background: #FFFFFF;
          position: relative;
          overflow: visible;
          min-height: 500px;
          border: 2px dashed rgba(201, 161, 75, 0.3);
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
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 1.5rem;
          margin: 0 0.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(201, 161, 75, 0.15);
          border: 2px solid rgba(201, 161, 75, 0.3);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          min-height: 400px;
        }
        
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 6px 20px rgba(201, 161, 75, 0.25);
          border-color: rgba(201, 161, 75, 0.6);
        }
        
        .service-image {
          width: 100%;
          border-radius: 12px;
          object-fit: cover;
          margin-bottom: 1rem;
          border: 1px solid rgba(201, 161, 75, 0.2);
        }
        
        .service-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        
        .service-title {
          font-family: 'Heebo', sans-serif;
          font-weight: 600;
          color: #1A365D;
          margin-bottom: 0.75rem;
          text-align: center;
        }
        
        .service-description {
          font-family: 'Heebo', sans-serif;
          color: #2C3E50;
          line-height: 1.6;
          text-align: center;
          margin-top: auto;
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
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 100
        }}>
          DEBUG: {services.length} שירותים נטענו
        </div>

        <Slider {...sliderSettings}>
          {services.map((service, index) => (
            <div key={index}>
              <motion.div
                className="service-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                  style={{ height: cardStyles.imageHeight }}
                  onLoad={() => console.log(`תמונה ${index + 1} נטענה בהצלחה`)}
                  onError={(e) => {
                    console.error(`שגיאה בטעינת תמונה ${index + 1}:`, e);
                    // Fallback to a solid color background
                    e.target.style.background = `linear-gradient(135deg, #C9A14B, #1A365D)`;
                    e.target.style.display = 'block';
                    e.target.style.minHeight = cardStyles.imageHeight;
                  }}
                />
                <div className="service-content">
                  <h3 
                    className="service-title"
                    style={{ fontSize: cardStyles.titleSize }}
                  >
                    <ShinyText text={service.title} />
                  </h3>
                  <p 
                    className="service-description"
                    style={{ fontSize: cardStyles.descriptionSize }}
                  >
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
});

// 📏 **מפריד בין חלקים**
const SectionDivider = React.memo(() => {
  const { getResponsiveValue } = useResponsive();

  const dividerStyles = {
    margin: getResponsiveValue({
      mobile: '1.5rem 0',
      tablet: '2rem 0',
      laptop: '2.5rem 0',
      desktop: '3rem 0',
      large: '3.5rem 0'
    }),

    lineWidth: getResponsiveValue({
      mobile: '60vw',
      tablet: '50vw',
      laptop: '45vw',
      desktop: '40vw',
      large: '35vw'
    })
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: dividerStyles.margin,
      position: 'relative'
    }}>
      <svg 
        style={{
          width: dividerStyles.lineWidth,
          height: '3px'
        }}
        viewBox={`0 0 400 3`}
      >
        <motion.line
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          x1="0"
          y1="1.5"
          x2="400"
          y2="1.5"
          stroke="#C9A14B"
          strokeWidth="3"
          strokeLinecap="round"
        />
        
        <motion.circle
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          cx="200"
          cy="1.5"
          r="6"
          fill="#FFD700"
        />
      </svg>
    </div>
  );
});

// 🗣️ **חלק ההמלצות - קרוסלה אינסופית**
const TestimonialsCarousel = React.memo(() => {
  const { getResponsiveValue } = useResponsive();

  const testimonials = [
    {
      quote: "עומר הביא רמה חדשה לחתונה שלנו! הקוקטיילים היו מדהימים והשירות היה מעל ומעבר לכל הציפיות.",
      name: "שרה כהן",
      role: "כלה מרוצה",
      rating: 5
    },
    {
      quote: "האירוע של החברה שלנו היה הצלחה גדולה בזכות עומר. הבר המקצועי והקוקטייליים הייחודיים עשו את כל ההבדל.",
      name: "דוד לוי",
      role: "מנהל אירועים",
      rating: 5
    },
    {
      quote: "מיקסולוג ברמה עולמית! כל אורח הזמין עוד משקה. תודה על חוויה בלתי נשכחת!",
      name: "מיכל אברהם",
      role: "מארגנת אירועים",
      rating: 5
    },
    {
      quote: "הפקה מושלמת עם בר שנראה כמו מתוך סרט. עומר מבין בדיוק איך ליצור אווירה מושלמת.",
      name: "רון גולד",
      role: "במאי",
      rating: 5
    },
    {
      quote: "השקת המוצר שלנו הייתה הצלחה בזכות הבר המיוחד. הלקוחות שלנו עדיין מדברים על הקוקטיילים!",
      name: "נועה דהן",
      role: "מנהלת שיווק",
      rating: 5
    }
  ];

  const testimonialsSettings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: getResponsiveValue({
      mobile: 1,
      tablet: 2,
      laptop: 3,
      desktop: 3,
      large: 3
    }),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };

  const testimonialsStyles = {
    padding: getResponsiveValue({
      mobile: '2rem 1rem',
      tablet: '3rem 1.5rem',
      laptop: '4rem 2rem',
      desktop: '5rem 3rem',
      large: '6rem 4rem'
    }),

    titleSize: getResponsiveValue({
      mobile: '2rem',
      tablet: '2.5rem',
      laptop: '3rem',
      desktop: '3.5rem',
      large: '4rem'
    }),

    cardPadding: getResponsiveValue({
      mobile: '1.2rem',
      tablet: '1.4rem',
      laptop: '1.6rem',
      desktop: '1.8rem',
      large: '2rem'
    }),

    quoteSize: getResponsiveValue({
      mobile: '1rem',
      tablet: '1.1rem',
      laptop: '1.2rem',
      desktop: '1.3rem',
      large: '1.4rem'
    }),

    nameSize: getResponsiveValue({
      mobile: '0.9rem',
      tablet: '1rem',
      laptop: '1.1rem',
      desktop: '1.2rem',
      large: '1.2rem'
    })
  };

  return (
    <>
      <style>{`
        /* Testimonials Slider Styles */
        .testimonials-slider {
          background: #FFFFFF;
          position: relative;
          border: 2px dashed rgba(139, 38, 53, 0.3);
          padding: 2rem 1rem;
          min-height: 400px;
        }
        
        .testimonials-slider .slick-track {
          display: flex;
          align-items: stretch;
        }
        
        .testimonials-slider .slick-slide {
          display: flex !important;
          outline: none;
          padding: 0 0.5rem;
        }
        
        .testimonials-slider .slick-slide > div {
          width: 100%;
          height: 100%;
        }
        
        .testimonial-card {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          margin: 0 0.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(201, 161, 75, 0.12);
          border: 2px solid rgba(201, 161, 75, 0.2);
          transition: all 0.3s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 300px;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 6px 20px rgba(201, 161, 75, 0.2);
          border-color: rgba(201, 161, 75, 0.5);
        }

        /* Testimonials dots and arrows styling */
        .testimonials-slider .slick-dots {
          bottom: -50px;
        }
        
        .testimonials-slider .slick-dots li button:before {
          color: #8B2635;
          font-size: 12px;
        }
        
        .testimonials-slider .slick-dots li.slick-active button:before {
          color: #C9A14B;
        }

        .testimonials-slider .slick-prev,
        .testimonials-slider .slick-next {
          z-index: 1;
          width: 40px;
          height: 40px;
        }
        
        .testimonials-slider .slick-prev {
          left: 10px;
        }
        
        .testimonials-slider .slick-next {
          right: 10px;
        }
        
        .testimonials-slider .slick-prev:before,
        .testimonials-slider .slick-next:before {
          color: #8B2635;
          font-size: 30px;
        }
      `}</style>

      <div style={{
        background: '#FFFFFF',
        padding: testimonialsStyles.padding,
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(139, 38, 53, 0.8)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '12px',
          zIndex: 100
        }}>
          DEBUG: {testimonials.length} המלצות נטענו
        </div>
        {/* כותרת */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            textAlign: 'center',
            marginBottom: getResponsiveValue({
              mobile: '1.5rem',
              tablet: '2rem',
              laptop: '2.5rem',
              desktop: '3rem',
              large: '3.5rem'
            })
          }}
        >
          <h2 style={{
            fontSize: testimonialsStyles.titleSize,
            fontWeight: '700',
            color: '#1A365D',
            fontFamily: 'Heebo, sans-serif',
            textShadow: '0 2px 4px rgba(26, 54, 93, 0.1)',
            margin: '0'
          }}>
            <ShinyText text="מה הלקוחות שלנו אומרים" />
          </h2>
        </motion.div>
          
        {/* קרוסלת ההמלצות */}
        <div className="testimonials-slider">
          <Slider {...testimonialsSettings}>
            {testimonials.map((testimonial, index) => (
              <div key={index}>
                <motion.div
                  className="testimonial-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{ padding: testimonialsStyles.cardPadding }}
                >
                  {/* דירוג כוכבים */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span
                        key={i}
                        style={{
                          color: '#FFD700',
                          fontSize: getResponsiveValue({
                            mobile: '16px',
                            tablet: '18px',
                            laptop: '20px',
                            desktop: '22px',
                            large: '24px'
                          }),
                          marginRight: '2px'
                        }}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                    
                  {/* ציטוט */}
                  <p style={{
                    fontSize: testimonialsStyles.quoteSize,
                    lineHeight: 1.6,
                    color: '#2C3E50',
                    fontFamily: 'Heebo, sans-serif',
                    fontWeight: '400',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    fontStyle: 'italic',
                    flex: 1
                  }}>
                    "{testimonial.quote}"
                  </p>

                  {/* פרטי הלקוח */}
                  <div style={{
                    textAlign: 'center',
                    borderTop: '1px solid rgba(201, 161, 75, 0.1)',
                    paddingTop: '1rem'
                  }}>
                    <div style={{
                      fontSize: testimonialsStyles.nameSize,
                      fontWeight: '600',
                      color: '#1A365D',
                      fontFamily: 'Heebo, sans-serif',
                      marginBottom: '0.25rem'
                    }}>
                      {testimonial.name}
                    </div>
                    <div style={{
                      fontSize: testimonialsStyles.nameSize * 0.9,
                      color: '#C9A14B',
                      fontFamily: 'Heebo, sans-serif',
                      fontWeight: '300'
                    }}>
                      {testimonial.role}
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
});

// 🚀 **קומפוננט ראשי - Page3**
const Page3 = () => {
  const { getResponsiveValue } = useResponsive();
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);

  const handleTitleAnimationComplete = () => {
    setTitleAnimationComplete(true);
    console.log('כותרת השירותים הושלמה!');
  };

  const titleStyles = {
    fontSize: getResponsiveValue({
      mobile: '2.5rem',
      tablet: '3rem',
      laptop: '3.5rem',
      desktop: '4rem',
      large: '4.5rem'
    }),

    padding: getResponsiveValue({
      mobile: '3rem 1rem 1rem',
      tablet: '4rem 2rem 1.5rem',
      laptop: '5rem 3rem 1.5rem',
      desktop: '6rem 4rem 2rem',  
      large: '7rem 5rem 2rem'
    })
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Heebo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* סגנונות נוספים לאנימציות חלקות */
        .split-parent {
          overflow: visible !important;
        }
      `}</style>
      
      <div style={{ 
        background: '#FFFFFF',
        position: 'relative',
        minHeight: '100vh'
      }}>
        {/* כותרת ראשית */}
        <div style={{
          textAlign: 'center',
          padding: titleStyles.padding,
          position: 'relative',
          zIndex: 10
        }}>
          <SplitText
            text="השירותים שלנו"
            className=""
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleTitleAnimationComplete}
          />
          
          <style>{`
            .split-parent {
              font-size: ${titleStyles.fontSize} !important;
              font-weight: 700 !important;
              color: #1A365D !important;
              font-family: 'Heebo', sans-serif !important;
              text-shadow: 0 2px 4px rgba(26, 54, 93, 0.15) !important;
              letter-spacing: -0.02em !important;
            }
          `}</style>
        </div>

        {/* קרוסלת השירותים */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={titleAnimationComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ServicesSlider />
        </motion.div>

        {/* מפריד */}
        <SectionDivider />

        {/* חלק ההמלצות */}
        <TestimonialsCarousel />
      </div>
    </>
  );
};

export default Page3;

