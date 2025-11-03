import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

const ServicesPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services = useMemo(() => [
    {
      id: 1,
      title: "אירועי חברה",
      description: "אנחנו מאמינים שהחשיבות של גיבוש הצוות מובנת מאליה, אבל השאלה היא איך עושים את זה בצורה מדויקת. המטרה היא ליצור חיבור אמיתי בין אנשים ולשבור שגרה – אלו שני האלמנטים המרכזיים שנשים עליהם דגש באירוע. בין אירוע Happy Hour שגרתי לבין אירוע הנפקה מרשים, אנחנו נדע להוסיף צבע, אנרגיה וחוויה בלתי נשכחת לאירוע שלכם.",
      images: ["https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/forobs30u30_csnpjj.jpg", "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/forbs30u302-_h9lrig.jpg"]
    },
    {
      id: 2,
      title: "אירועים פרטיים",
      description: "בין אם זה בר מצווה, חתונת זהב או אפילו סתם חגיגה חברית כי למה לא! אנחנו נגיע לאירוע שלכם. נתאים את הבר והחוויה לאווירה שהאירוע משדר, לא משנה כמה אנשים ובאיזה לוקיישן. אנחנו כבר עשינו הכל, אז נשמח שתאתגרו אותנו :)",
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/2024-09-06GAVRIEL-126_m0bybb.jpg"
    },
    {
      id: 3,
      title: "חתונות",
      description: "אנחנו כאן כדי לדאוג שהפעם האורח שיגיע לחתונה יקבל משקה שהוא לא ישכח! אנחנו מצד אחד נשתלב עם אופי האירוע שלכם – העיצוב, הקהל – ומצד שני מוסיפים את הקיק שרק OMC יודעים לייצר, בטעמים, בחוויה ובמקצועיות חסרת פשרות.",
      images: ["https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/DSC03566_trxtjs.jpg", "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/cocktail1_zmqwwx.png"]
    },
    {
      id: 4,
      title: "סדנאות קוקטיילים",
      description: "איזה כיף זה להעביר את הידע הלאה! כמה כיף זה לשבור שגרה ולגלות תחומים חדשים. נוסיף על כך יצירתיות, עבודה צוותית מלאה באלכוהול וצחוק. בין אם אתם קבוצה קטנה או גדולה שרוצה לייצר חוויה מיוחדת – אנחנו כאן ללמד, לשתף ולהפוך אתכם לחברים המקיסולוגיים שלכם.",
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/barista-putting-alcohol-into-cocktail-glass-with-syrup-ice-cubes_thuy44.jpg"
    }
  ], []);


  // Animation variants for service rows
  const slideVariants = {
    hiddenRight: {
      x: isMobile ? 100 : 300,
      opacity: 0
    },
    hiddenLeft: {
      x: isMobile ? -100 : -300,
      opacity: 0
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: -50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const ctaVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      }
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;500;600;700;800;900&display=swap');
        
        /* CSS Variables for consistency */
        :root {
          --gradient-bg: linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 50%, #0D0D0D 100%);
          --text-primary: #FFFFFF;
          --text-secondary: #B3B3B3;
          --accent-purple: rgba(138, 43, 226, 0.15);
          --border-light: rgba(255, 255, 255, 0.25);
          --max-width: 1400px;
          --mobile-break: 768px;
          --animation-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Reset and Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        /* Single Background Definition */
        .services-page {
          min-height: 100vh;
          width: 100%;
          direction: rtl;
          font-family: 'Varela Round', sans-serif;
          background: var(--gradient-bg);
          position: relative;
          overflow-x: hidden;
        }
        
        .services-page::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.01) 0%, transparent 50%), 
                      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.005) 0%, transparent 50%);
          opacity: 0.04;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 1;
          animation: particleFloat 20s ease-in-out infinite alternate;
        }

        @keyframes particleFloat {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.06; }
          50% { transform: translateX(10px) translateY(-15px) scale(1.05); opacity: 0.1; }
          100% { transform: translateX(-5px) translateY(10px) scale(0.95); opacity: 0.08; }
        }
        
        /* Performance Optimizations */
        @media (min-width: 769px) {
          .services-page {
            transform: translateZ(0);
            will-change: scroll-position;
          }
        }

        /* Animated background overlay */
        .services-page::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle at 25% 25%, rgba(138, 43, 226, 0.08) 0%, transparent 40%);
          animation: floatGradient 20s ease-in-out infinite;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes floatGradient {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        /* Header Section */
        .page-header {
          text-align: center;
          padding: clamp(80px, 15vh, 120px) 20px clamp(60px, 10vh, 80px);
          position: relative;
          z-index: 2;
        }

        .page-header::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(700px, 90vw);
          height: 350px;
          background: radial-gradient(ellipse at center, var(--accent-purple) 0%, transparent 75%);
          filter: blur(40px);
          z-index: -1;
          pointer-events: none;
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .main-title {
          font-size: clamp(2.5rem, 6vw, 5rem);
          font-weight: 700;
          font-family: 'Varela Round', sans-serif;
          background: linear-gradient(180deg, #ffffff 0%, #999999 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }

        .subtitle {
          font-size: clamp(1rem, 2vw, 1.5rem);
          color: var(--text-secondary);
          font-weight: 300;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Services Container */
        .services-container {
          max-width: var(--max-width);
          margin: 0 auto;
          padding: clamp(20px, 3vw, 40px);
          position: relative;
          z-index: 2;
        }

        /* Service Row - Fixed RTL */
        .service-row {
          display: flex;
          align-items: stretch;
          gap: clamp(30px, 4vw, 50px);
          margin-bottom: clamp(60px, 10vh, 120px);
          position: relative;
          direction: rtl; /* Ensure RTL for row */
        }

        .service-row.reverse {
          flex-direction: row-reverse;
        }

        /* Remove separator lines between sections */
        .service-row::after {
          display: none;
        }

        /* Image Sections */
        .service-image,
        .images-section {
          flex: 0.7;
          position: relative;
        }

        .service-image {
          width: 100%;
          max-width: 350px;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .service-image:hover {
          transform: scale(1.02) translateY(-5px);
        }

        .images-section {
          display: flex;
          gap: 35px;
          align-items: flex-end;
        }

        .image-container {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.6);
          transition: all 0.3s ease;
        }

        .image-container:hover {
          transform: scale(1.03) translateY(-8px);
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.6);
        }

        .image-container:first-child {
          width: 280px;
          height: 450px;
          align-self: flex-start;
        }

        .image-container:last-child {
          width: 300px;
          height: 530px;
        }

        .service-image img,
        .image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.8;
          filter: saturate(0.9) contrast(1.05) brightness(0.95);
          transition: all 0.3s ease;
        }

        .service-image:hover img,
        .image-container:hover img {
          opacity: 0.9;
          filter: saturate(1) contrast(1.1) brightness(1);
        }

        .service-image::before,
        .image-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(255, 255, 255, 0.12) 0%,
            rgba(138, 43, 226, 0.06) 50%,
            rgba(255, 255, 255, 0.1) 100%);
          border: 2px solid var(--border-light);
          border-radius: 20px;
          z-index: 2;
          pointer-events: none;
        }

        /* Content Section */
        .service-content {
          flex: 1.3;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 0;
          max-width: 450px;
        }

        .service-title {
          font-size: 2rem;
          color: var(--text-primary);
          font-weight: 700;
          text-shadow: 0 4px 20px rgba(138, 43, 226, 0.25);
          margin-bottom: 20px;
          position: relative;
        }

        .service-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          right: 0;
          width: 60%;
          height: 2px;
          background: linear-gradient(90deg, #8B7355 0%, #A67C52 25%, #CD853F 50%, #A67C52 75%, #8B7355 100%);
          border-radius: 1px;
        }

        .service-description {
          font-size: 17px;
          color: var(--text-secondary);
          line-height: 1.8;
          font-weight: 300;
          text-shadow: 0 2px 8px rgba(0,0,0,0.4);
          text-align: justify;
        }

        /* CTA Section */
        .cta-section {
          padding: 60px 20px 80px;
          margin-top: 40px;
          position: relative;
          z-index: 2;
        }

        .cta-container {
          background: rgba(255, 255, 255, 0.02);
          background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01));
          backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
          -webkit-backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.5),
            inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 0 rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.05) inset;
          max-width: 1200px;
          width: 100%;
          padding: 50px;
          z-index: 2;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .cta-container:hover {
          background: rgba(255, 255, 255, 0.18);
          transform: translateY(-2px);
          box-shadow: 0 16px 64px rgba(0, 0, 0, 0.25);
        }

        .cta-title {
          font-size: 1.6rem;
          font-weight: 700;
          background: linear-gradient(180deg, #ffffff 0%, #999999 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Varela Round', sans-serif;
          margin: 0;
          letter-spacing: -0.5px;
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-container {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
          direction: rtl;
        }

        .form-input {
          flex: 1;
          min-width: 200px;
          padding: 16px 20px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 17px;
          border-radius: 16px;
          direction: rtl;
          backdrop-filter: blur(15px);
          box-sizing: border-box;
          font-family: 'Varela Round', sans-serif;
          font-weight: 400;
          letter-spacing: -0.1px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          outline: none;
        }

        .form-input:focus {
          border: 1px solid rgba(255, 255, 255, 0.6);
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          opacity: 1;
        }

        .submit-btn {
          padding: 18px 36px;
          background: linear-gradient(135deg, #C9A14B 0%, #A67C52 100%);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 17px;
          cursor: pointer;
          min-width: 160px;
          width: auto;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: 'Varela Round', sans-serif;
          font-weight: 700;
          letter-spacing: -0.1px;
          box-shadow: 0 4px 16px rgba(201, 161, 75, 0.35);
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover {
          background: linear-gradient(135deg, #D4AF5E 0%, #B88A61 100%);
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 24px rgba(201, 161, 75, 0.45);
        }

        .submit-btn:active {
          transform: translateY(-1px) scale(1.02);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .service-row,
          .service-row.reverse {
            flex-direction: column;
            gap: 30px;
            margin-bottom: 60px;
          }

          .service-row::after {
            display: none;
          }

          .service-image {
            height: 350px;
            max-width: 100%;
            margin: 0 auto;
          }

          .images-section {
            gap: 20px;
            justify-content: center;
          }

          .image-container:first-child {
            width: 45%;
            height: 320px;
          }

          .image-container:last-child {
            width: 45%;
            height: 380px;
          }

          .service-content {
            padding: 30px 0;
            text-align: center;
            max-width: 100%;
          }

          .service-title {
            font-size: 1.5rem;
          }

          .service-title::after {
            left: 50%;
            transform: translateX(-50%);
            width: 50%;
          }

          .service-description {
            font-size: 15px;
            padding: 0 10px;
          }

          .cta-container {
            padding: 25px 20px !important;
            border-radius: 20px !important;
            margin: 0 15px !important;
            box-shadow:
              0 8px 24px rgba(0, 0, 0, 0.4),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.15) !important;
          }

          .cta-title {
            font-size: 1.4rem !important;
            margin-bottom: 1.5rem !important;
          }

          .form-container {
            flex-direction: column !important;
            gap: 0.9rem !important;
          }

          .form-input {
            width: 100% !important;
            min-width: 100% !important;
            padding: 14px 18px !important;
            font-size: 16px !important;
            border-radius: 14px !important;
            background: rgba(255, 255, 255, 0.15) !important;
            border: 1.5px solid rgba(255, 255, 255, 0.25) !important;
            transition: all 0.3s ease !important;
          }

          .form-input:focus {
            background: rgba(255, 255, 255, 0.22) !important;
            border: 1.5px solid rgba(201, 161, 75, 0.5) !important;
            box-shadow: 0 0 0 3px rgba(201, 161, 75, 0.15) !important;
            transform: translateY(-1px) !important;
          }

          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.75) !important;
            font-size: 16px !important;
          }

          .submit-btn {
            width: 100% !important;
            padding: 16px 28px !important;
            font-size: 16px !important;
            margin-top: 0.5rem;
            background: linear-gradient(135deg, #C9A14B 0%, #A67C52 100%) !important;
            box-shadow: 0 4px 16px rgba(201, 161, 75, 0.35) !important;
            border-radius: 14px !important;
          }

          .submit-btn:hover {
            background: linear-gradient(135deg, #D4AF5E 0%, #B88A61 100%) !important;
            box-shadow: 0 6px 20px rgba(201, 161, 75, 0.45) !important;
          }
        }

        /* Performance: Reduce animations on low-end devices */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="services-page">
        {/* Global Contact Form Handler */}
        <ContactForm isGlobalHandler={true} />
        
        {/* Gradient Effects - same as MAINPAGE */}
        <div style={{
          position: 'absolute',
          top: '120vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.08) 0%, transparent 80%)',
          zIndex: 1,
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '380vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '250px',
          background: 'radial-gradient(ellipse at center, rgba(75, 0, 130, 0.1) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
          filter: 'blur(40px)'
        }} />
        
        <motion.div
          className="page-header"
          variants={headerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="main-title"
            variants={childVariants}
          >
            השירותים שלנו
          </motion.h1>
        </motion.div>

        <div className="services-container">
          {services.map((service, index) => {
            const isReverse = index % 2 === 1;
            return (
              <motion.div
                key={service.id}
                className={`service-row ${isReverse ? 'reverse' : ''}`}
                variants={slideVariants}
                initial={isReverse ? "hiddenLeft" : "hiddenRight"}
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {service.images ? (
                  <motion.div 
                    className="images-section"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.images.map((img, i) => (
                      <div key={i} className="image-container">
                        <img 
                          src={img} 
                          alt={`${service.title} ${i + 1}`}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    className="service-image"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={service.image} 
                      alt={service.title}
                      loading="lazy"
                    />
                  </motion.div>
                )}

                <div className="service-content">
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="cta-section"
          variants={ctaVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="cta-container"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="cta-title">השאירו פרטים ונחזור אליכם</h2>
            
            <form className="form-container">
              <input 
                type="text" 
                name="name"
                placeholder="השם שלך"
                className="form-input"
                aria-label="שם"
                required
              />
              
              <input 
                type="tel" 
                name="phone"
                placeholder="מספר הטלפון"
                className="form-input"
                aria-label="טלפון"
                required
              />
              
              <button
                type="submit"
                className="submit-btn"
                aria-label="שלח טופס"
              >
                שלח
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ServicesPage;