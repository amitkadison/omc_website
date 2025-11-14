import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ConfettiButton } from './confetti';
import ContactForm from './ContactForm';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Use the ContactForm component's submit functionality
      const formElement = e.target;
      const formData = new FormData(formElement);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ name: '', phone: '', email: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
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

  return (
    <>
      {/* Global Contact Form Handler */}
      <ContactForm isGlobalHandler={true} />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@400;500;600;700;800;900&display=swap');
        
        .contact-page {
          min-height: 100vh;
          width: 100%;
          direction: rtl;
          font-family: 'Varela Round', sans-serif;
          background: #0D0D0D url('https://res.cloudinary.com/doteohz34/image/upload/v1760636993/CONTACKT_lvps7l.png') center/cover no-repeat fixed;
          position: relative;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 160px 20px 100px 20px;
        }

        /* שכבת כיסוי כהה מעל תמונת הרקע */
        .contact-page::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(13, 13, 13, 0.75);
          pointer-events: none;
          z-index: 1;
        }

        /* רקע חלקיקים עדינים */
        .contact-page::after {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.008) 0%, transparent 50%), 
                      radial-gradient(circle at 75% 75%, rgba(0, 120, 200, 0.01) 0%, transparent 50%);
          opacity: 0.6;
          pointer-events: none;
          z-index: 2;
          animation: subtleFloat 25s ease-in-out infinite alternate;
        }

        @keyframes subtleFloat {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateX(5px) translateY(-8px) scale(1.02); opacity: 0.8; }
          100% { transform: translateX(-2px) translateY(4px) scale(0.98); opacity: 0.7; }
        }

        .contact-container {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 1200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
          overflow: visible;
        }

        .contact-header {
          text-align: center;
        }

        .main-title {
          font-size: 4.5rem;
          font-weight: 700;
          font-family: 'Varela Round', sans-serif;
          background: linear-gradient(180deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1.2;
          margin-bottom: 20px;
          position: relative;
          z-index: 2;
        }

        .main-title::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 500px;
          height: 300px;
          background: radial-gradient(ellipse at center, rgba(139, 92, 246, 0.15) 0%, rgba(124, 58, 237, 0.1) 40%, rgba(109, 40, 217, 0.05) 70%, transparent 100%);
          filter: blur(60px);
          z-index: -1;
          pointer-events: none;
        }

        .subtitle {
          font-size: 1.4rem;
          color: #B3B3B3;
          font-family: 'Varela Round', sans-serif;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.5;
        }

        /* קונטיינר הטופס - עם מרווחים מותאמים */
        .form-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px 0px 20px; /* הוריד את הפדינג התחתון */
          position: static;
          display: flex;
          flex-direction: column;
          gap: 30px; /* הקטנת הגאפ מ-40px ל-30px */
          align-items: center;
          z-index: auto;
          overflow: visible;
          background: none !important;
          border: none !important;
          box-shadow: none !important;
          transform: none !important;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 30px;
          width: 100%;
        }

        /* עיצוב השדות החדש */
        .form__group {
          position: relative;
          padding: 20px 0 0;
          width: 100%;
        }

        .form__field {
          font-family: 'Varela Round', sans-serif;
          width: 100%;
          border: none;
          border-bottom: 2px solid #9b9b9b;
          outline: 0;
          font-size: 17px;
          color: #fff;
          padding: 7px 0;
          background: transparent;
          transition: border-color 0.2s;
          direction: rtl;
          text-align: right;
        }

        .form__field::placeholder {
          color: transparent;
        }

        .form__field:placeholder-shown ~ .form__label {
          font-size: 17px;
          cursor: text;
          top: 20px;
        }

        .form__label {
          position: absolute;
          top: 0;
          right: 0;
          display: block;
          transition: 0.2s;
          font-size: 17px;
          color: #9b9b9b;
          pointer-events: none;
          font-family: 'Varela Round', sans-serif;
        }

        .form__field:focus {
          padding-bottom: 6px;
          font-weight: 700;
          border-width: 3px;
          border-image: linear-gradient(to right, #116399, #38caef);
          border-image-slice: 1;
        }

        .form__field:focus ~ .form__label {
          position: absolute;
          top: 0;
          display: block;
          transition: 0.2s;
          font-size: 17px;
          color: #38caef;
          font-weight: 700;
        }

        .form__field:required, .form__field:invalid {
          box-shadow: none;
        }

        /* כפתור השליחה עם עיצוב זכוכית - מרווחים מעודכנים */
        .btn {
          border: none;
          width: 15em;
          height: 5em;
          border-radius: 3em;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 450ms ease-in-out;
          margin: 10px auto 5px auto; /* הקטנת המרווחים */
          font-family: 'Varela Round', sans-serif;
          
          /* אפקט זכוכית */
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .text {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.8);
          font-size: medium;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .btn:hover {
          background: linear-gradient(135deg, #C9A14B 0%, #A67C52 100%);
          border: 1px solid rgba(201, 161, 75, 0.4);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          box-shadow:
            inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4),
            inset 0px -4px 0px 0px rgba(0, 0, 0, 0.2),
            0px 0px 0px 4px rgba(201, 161, 75, 0.2),
            0px 0px 180px 0px #C9A14B;
          transform: translateY(-2px);
        }

        .btn:hover .text {
          color: white;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }

        .btn:active {
          transform: translateY(0px) scale(0.98);
          box-shadow: 
            0 4px 16px rgba(0, 0, 0, 0.4),
            inset 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(5px);
          -webkit-backdrop-filter: blur(5px);
        }

        .btn:disabled .text {
          color: rgba(255, 255, 255, 0.3);
        }

        .status-message {
          margin: 10px auto 5px auto; /* הקטנת המרווחים */
          padding: 20px 30px;
          border-radius: 16px;
          text-align: center;
          font-family: 'Varela Round', sans-serif;
          font-weight: 500;
          max-width: 400px;
          
          /* אפקט זכוכית */
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .status-success {
          color: #00E5FF;
          text-shadow: 0 0 10px rgba(0, 229, 255, 0.5);
          border-color: rgba(0, 229, 255, 0.3);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(0, 229, 255, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .status-error {
          color: #FF5252;
          text-shadow: 0 0 10px rgba(255, 82, 82, 0.5);
          border-color: rgba(255, 82, 82, 0.3);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(255, 82, 82, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        /* Social Media Icons Styles - מרווח מצומצם */
        .social-media-section {
          margin-top: -10px; /* מרווח שלילי כדי להצמיד יותר */
          text-align: center;
          width: 100%;
        }

        .social-title {
          font-size: 1.2rem;
          color: #B3B3B3;
          font-family: 'Varela Round', sans-serif;
          margin-bottom: 15px; /* הגדלת המרווח מהכותרת לאיקונים */
          font-weight: 500;
        }

        .example-2 {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .example-2 .icon-content {
          margin: 0 10px;
          position: relative;
        }

        .example-2 .icon-content .tooltip {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          padding: 6px 10px;
          border-radius: 5px;
          opacity: 0;
          visibility: hidden;
          font-size: 14px;
          transition: all 0.3s ease;
          font-family: 'Varela Round', sans-serif;
          white-space: nowrap;
        }

        .example-2 .icon-content:hover .tooltip {
          opacity: 1;
          visibility: visible;
          top: -50px;
        }

        .example-2 .icon-content a {
          position: relative;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: #4d4d4d;
          background-color: #fff;
          transition: all 0.3s ease-in-out;
          text-decoration: none;
        }

        .example-2 .icon-content a:hover {
          box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
        }

        .example-2 .icon-content a svg {
          position: relative;
          z-index: 1;
          width: 30px;
          height: 30px;
        }

        .example-2 .icon-content a:hover {
          color: white;
        }

        .example-2 .icon-content a .filled {
          position: absolute;
          top: auto;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 0;
          background-color: #000;
          transition: all 0.3s ease-in-out;
        }

        .example-2 .icon-content a:hover .filled {
          height: 100%;
        }

        .example-2 .icon-content a[data-social="whatsapp"] .filled,
        .example-2 .icon-content a[data-social="whatsapp"] ~ .tooltip {
          background-color: #128c7e;
        }

        .example-2 .icon-content a[data-social="facebook"] .filled,
        .example-2 .icon-content a[data-social="facebook"] ~ .tooltip {
          background-color: #3b5998;
        }

        .example-2 .icon-content a[data-social="instagram"] .filled,
        .example-2 .icon-content a[data-social="instagram"] ~ .tooltip {
          background: linear-gradient(
            45deg,
            #405de6,
            #5b51db,
            #b33ab4,
            #c135b4,
            #e1306c,
            #fd1f1f
          );
        }

        .example-2 .icon-content a[data-social="youtube"] .filled,
        .example-2 .icon-content a[data-social="youtube"] ~ .tooltip {
          background-color: #ff0000;
        }

        /* רספונסיביות */
        @media (max-width: 768px) {
          .contact-page {
            padding: 60px 20px;
          }

          .main-title {
            font-size: 2.8rem;
          }

          .subtitle {
            font-size: 1.1rem;
          }

          .contact-container {
            gap: 40px; /* הקטנת הגאפ במובייל */
          }

          .form-container {
            gap: 20px; /* גאפ קטן יותר במובייל */
          }

          .form-row {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .btn {
            width: 12em;
            height: 4em;
            margin: 5px auto 0px auto; /* מרווחים קטנים יותר במובייל */
          }

          .text {
            font-size: small;
          }

          .social-media-section {
            margin-top: -5px; /* פחות מרווח שלילי במובייל */
          }

          .social-title {
            font-size: 1rem;
            margin-bottom: 10px;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 2.2rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .btn {
            width: 10em;
            height: 3.5em;
          }

          .text {
            font-size: x-small;
          }

          .contact-container {
            gap: 30px; /* גאפ קטן עוד יותר במובייל קטן */
          }

          .form-container {
            gap: 15px;
          }

          .social-media-section {
            margin-top: 0px; /* ללא מרווח שלילי במובייל קטן */
          }

          .social-title {
            font-size: 0.9rem;
            margin-bottom: 8px;
          }

          .example-2 {
            gap: 15px;
          }

          .example-2 .icon-content a {
            width: 45px;
            height: 45px;
          }

          .example-2 .icon-content a svg {
            width: 25px;
            height: 25px;
          }
        }
      `}</style>

      <div className="contact-page">
        <motion.div
          className="contact-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* כותרת הדף */}
          <motion.div className="contact-header" variants={itemVariants}>
            <motion.h1 className="main-title" variants={itemVariants}>
              האירוע שלכם מתחיל כאן
            </motion.h1>
            <motion.p 
              className="subtitle" 
              variants={itemVariants}
              transition={{ delay: 0.4 }}
            >
              השאירו פרטים ונחזור אליכם תוך 24 שעות
            </motion.p>
          </motion.div>

          {/* קונטיינר הטופס */}
          <motion.form 
            className="form-container"
            variants={itemVariants}
            transition={{ delay: 0.6 }}
            onSubmit={handleSubmit}
          >
            {/* שורת השדות */}
            <motion.div 
              className="form-row"
              variants={itemVariants}
              transition={{ delay: 0.8 }}
            >
              {/* שם מלא */}
              <div className="form__group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form__field"
                  placeholder=" "
                  required
                />
                <label className="form__label">שם מלא *</label>
              </div>

              {/* טלפון */}
              <div className="form__group">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form__field"
                  placeholder=" "
                  required
                />
                <label className="form__label">טלפון *</label>
              </div>

              {/* אימייל */}
              <div className="form__group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form__field"
                  placeholder=" "
                  required
                />
                <label className="form__label">אימייל *</label>
              </div>
            </motion.div>

            {/* כפתור השליחה */}
            <motion.div
              variants={itemVariants}
              transition={{ delay: 1.0 }}
            >
              <ConfettiButton
                type="submit"
                className="btn submit-btn"
                disabled={isSubmitting}
              >
                <span className="text">
                  {isSubmitting ? "שולח..." : "שליחה"}
                </span>
              </ConfettiButton>
            </motion.div>

            {/* הודעת סטטוס */}
            {submitStatus && (
              <motion.div
                className={`status-message ${submitStatus === 'success' ? 'status-success' : 'status-error'}`}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.8 }}
                transition={{ 
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                  duration: 0.4 
                }}
              >
                {submitStatus === 'success' 
                  ? 'ההודעה נשלחה בהצלחה!'
                  : 'אירעה שגיאה בשליחת ההודעה'
                }
              </motion.div>
            )}
          </motion.form>

          {/* Social Media Section */}
          <motion.div 
            className="social-media-section"
            variants={itemVariants}
            transition={{ delay: 1.2 }}
          >
            <motion.h3 
              className="social-title"
              variants={itemVariants}
              transition={{ delay: 1.4 }}
            >
              עקבו אחרינו ברשתות החברתיות
            </motion.h3>
            
            <motion.div 
              className="example-2"
              variants={itemVariants}
              transition={{ delay: 1.6 }}
            >
              {/* Instagram */}
              <div className="icon-content">
                <a 
                  href="https://www.instagram.com/omc_mixologyart/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-social="instagram"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <div className="filled"></div>
                </a>
                <div className="tooltip">Instagram</div>
              </div>

              {/* Facebook */}
              <div className="icon-content">
                <a 
                  href="https://www.facebook.com/O.M.CMixlogyArt/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-social="facebook"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <div className="filled"></div>
                </a>
                <div className="tooltip">Facebook</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default ContactPage;