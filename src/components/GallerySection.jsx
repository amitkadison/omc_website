import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useResponsive } from '../hooks/useResponsive';
import ShinyText from './ShinyText';
import PinterestGalleryNew from './PinterestGalleryNew';

// FAQ Component
const FAQSection = ({ getResponsiveValue }) => {
  const [openQuestion, setOpenQuestion] = React.useState(null);

  const faqData = [
    {
      question: "איך עובד התהליך של הזמנת השירות?",
      answer: "פשוט מאוד! פשוט צרו איתנו קשר עם שם ומספר טלפון, נתאם שיחת ייעוץ חינם, נבנה עבורכם תפריט מותאם ונדאג לכל השאר. הצוות המקצועי שלנו יגיע עם כל הציוד הדרוש ליצירת חוויה מושלמת."
    },
    {
      question: "איזה סוגי אירועים אתם משרתים?",
      answer: "אנחנו משרתים את כל סוגי האירועים: חתונות, אירועי חברה, השקות, הרמות כוסית, אירועים פרטיים וסדנאות קוקטיילים. כל אירוע הוא ייחודי ואנחנו מתאימים את השירות בהתאם."
    },
    {
      question: "האם אתם מספקים את כל הציוד והחומרים?",
      answer: "כן! אנחנו מגיעים עם כל הציוד הדרוש - בר מקצועי, ציוד הגשה, כלי בר מקצועיים, כל סוגי האלכוהול והמיקסרים, קרח, פירות וקישוטים. אתם לא צריכים לדאוג לכלום!"
    },
    {
      question: "כמה זמן מראש צריך להזמין?",
      answer: "מומלץ להזמין לפחות 2-3 שבועות מראש, במיוחד לאירועים בסוף השבוע ובעונות עמוסות. עם זאת, אנחנו עושים כל מאמץ להיענות גם להזמנות דחופות יותר כשיש אפשרות."
    },
    {
      question: "איזה סוגי משקאות אתם מכינים?",
      answer: "התמחות שלנו היא בקוקטיילים קלאסיים ומודרניים, משקאות חמים מתובלים, מוחיטו, מרגריטות, ג'ין טוניק, ויסקי סאוור ועוד. אנחנו גם יכולים ליצור קוקטיילים מותאמים אישית לאירוע שלכם."
    },
    {
      question: "מה כלול במחיר השירות?",
      answer: "המחיר כולל: הגעת הצוות המקצועי, כל הציוד והאביזרים, חומרי הגלם (אלכוהול, מיקסרים, פירות), הכנה והגשה במשך כל האירוע, וניקיון מלא בסיום. נציג יצור איתכם קשר לפרטים מדויקים על התמחור."
    }
  ];

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div style={{
      width: '100vw',
      position: 'relative',
      zIndex: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: getResponsiveValue({
        mobile: '2rem 1rem',
        tablet: '2.5rem 2rem',
        laptop: '3rem 2.5rem',
        desktop: '3.5rem 3rem',
        large: '4rem 3.5rem'
      }),
      marginTop: getResponsiveValue({
        mobile: '0rem',
        tablet: '0rem',
        laptop: '0rem',
        desktop: '0rem',
        large: '0rem'
      }),
      // Background image - same as Page1
      backgroundImage: 'url(/image 6.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>
                    {/* Background overlay - very light for better visibility */}
       <div style={{
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         background: 'rgba(0, 0, 0, 0.2)', // Much lighter overlay
         zIndex: -1
       }} />

       {/* Silver Dots Scattered */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        overflow: 'hidden'
      }}>
        {/* Large silver dots */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '12%',
          width: '8px',
          height: '8px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.8) 0%, rgba(192, 192, 192, 0.4) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          animation: 'twinkle 4s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '18%',
          width: '6px',
          height: '6px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.7) 0%, rgba(192, 192, 192, 0.3) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          animation: 'twinkle 3s ease-in-out infinite 1s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '10px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.9) 0%, rgba(192, 192, 192, 0.5) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          animation: 'twinkle 2.5s ease-in-out infinite 0.5s'
        }} />
        
        {/* Medium silver dots */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '5px',
          height: '5px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.6) 0%, rgba(192, 192, 192, 0.2) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 3.5s ease-in-out infinite 1.5s'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '35%',
          right: '25%',
          width: '7px',
          height: '7px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.8) 0%, rgba(192, 192, 192, 0.4) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.8s ease-in-out infinite 0.8s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '15%',
          width: '4px',
          height: '4px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.5) 0%, rgba(192, 192, 192, 0.2) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 3.2s ease-in-out infinite 1.2s'
        }} />
        
        {/* Small silver dots scattered */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '3px',
          height: '3px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.7) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2s ease-in-out infinite 0.3s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '8%',
          width: '4px',
          height: '4px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.6) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.5s ease-in-out infinite 0.7s'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '35%',
          width: '3px',
          height: '3px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.5) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.8s ease-in-out infinite 1.1s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '70%',
          left: '30%',
          width: '5px',
          height: '5px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.8) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 3.5s ease-in-out infinite 0.9s'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '45%',
          left: '8%',
          width: '4px',
          height: '4px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.6) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.2s ease-in-out infinite 0.4s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '18%',
          width: '6px',
          height: '6px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.7) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 3s ease-in-out infinite 1.3s'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '40%',
          width: '3px',
          height: '3px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.5) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.7s ease-in-out infinite 0.6s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '80%',
          right: '45%',
          width: '4px',
          height: '4px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.6) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.9s ease-in-out infinite 1.4s'
        }} />
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>

              {/* FAQ Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: getResponsiveValue({
              mobile: '1.5rem',
              tablet: '2rem',
              laptop: '2.5rem',
              desktop: '3rem',
              large: '3.5rem'
            }),
            position: 'relative',
            zIndex: 10
          }}
        >
        <h2 style={{
          fontSize: getResponsiveValue({
            mobile: '2rem',
            tablet: '2.5rem',
            laptop: '3rem',
            desktop: '3.5rem',
            large: '4rem'
          }),
          fontWeight: '300',
          color: 'white',
          fontFamily: 'Heebo, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          letterSpacing: '0.02em',
          marginBottom: '1rem',
          direction: 'rtl'
        }}>
          <ShinyText text="שאלות נפוצות" speed={4} />
        </h2>
        <p style={{
          fontSize: getResponsiveValue({
            mobile: '1rem',
            tablet: '1.1rem',
            laptop: '1.2rem',
            desktop: '1.3rem',
            large: '1.4rem'
          }),
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: 'Heebo, sans-serif',
          fontWeight: '300',
          direction: 'rtl'
        }}>
          כל מה שרציתם לדעת על השירות שלנו
        </p>
      </motion.div>

              {/* FAQ Container */}
        <div style={{
          width: getResponsiveValue({
            mobile: '95vw',
            tablet: '80vw',
            laptop: '70vw',
            desktop: '60vw',
            large: '50vw'
          }),
          maxWidth: '900px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          direction: 'rtl',
          position: 'relative',
          zIndex: 10
        }}>
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(25px)',
              WebkitBackdropFilter: 'blur(25px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{
              background: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
              transform: 'translateY(-2px)'
            }}
          >
            <button
              onClick={() => toggleQuestion(index)}
              style={{
                width: '100%',
                padding: getResponsiveValue({
                  mobile: '1.2rem',
                  tablet: '1.5rem',
                  laptop: '1.8rem',
                  desktop: '2rem',
                  large: '2.2rem'
                }),
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
                fontSize: getResponsiveValue({
                  mobile: '1rem',
                  tablet: '1.1rem',
                  laptop: '1.2rem',
                  desktop: '1.3rem',
                  large: '1.4rem'
                }),
                fontFamily: 'Heebo, sans-serif',
                fontWeight: '400',
                textAlign: 'right',
                direction: 'rtl',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              <span style={{ flex: 1, textAlign: 'right' }}>
                {faq.question}
              </span>
              <motion.span
                animate={{ rotate: openQuestion === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: '1rem'
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </motion.span>
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: openQuestion === index ? 'auto' : 0, opacity: openQuestion === index ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                padding: getResponsiveValue({
                  mobile: '0 1.2rem 1.5rem 1.2rem',
                  tablet: '0 1.5rem 1.8rem 1.5rem',
                  laptop: '0 1.8rem 2rem 1.8rem',
                  desktop: '0 2rem 2.2rem 2rem',
                  large: '0 2.2rem 2.5rem 2.2rem'
                }),
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: getResponsiveValue({
                  mobile: '0.9rem',
                  tablet: '1rem',
                  laptop: '1.1rem',
                  desktop: '1.2rem',
                  large: '1.3rem'
                }),
                fontFamily: 'Heebo, sans-serif',
                fontWeight: '300',
                lineHeight: 1.6,
                textAlign: 'right',
                direction: 'rtl'
              }}>
                {faq.answer}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const GallerySection = React.memo(() => {
  const { getResponsiveValue } = useResponsive();

  const sectionStyles = useMemo(() => ({
    minHeight: getResponsiveValue({
      mobile: '200vh',
      tablet: '220vh',
      laptop: '240vh',
      desktop: '260vh',
      large: '280vh'
    }),
    paddingVertical: getResponsiveValue({
      mobile: '3rem',
      tablet: '4rem',
      laptop: '5rem',
      desktop: '6rem',
      large: '7rem'
    }),
    titleSize: getResponsiveValue({
      mobile: '2rem',
      tablet: '2.5rem',
      laptop: '3rem',
      desktop: '3.5rem',
      large: '4rem'
    })
  }), [getResponsiveValue]);

  return (
    <div style={{
      width: '100vw',
      minHeight: sectionStyles.minHeight,
      position: 'relative',
      zIndex: 9,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: sectionStyles.paddingVertical,
      paddingBottom: sectionStyles.paddingVertical,
      paddingLeft: 0,
      paddingRight: 0,
      marginTop: getResponsiveValue({
        mobile: '0.5rem',
        tablet: '0.8rem',
        laptop: '1rem',
        desktop: '1.2rem',
        large: '1.5rem'
      }),
      // Background image - same as FAQ section
      backgroundImage: 'url(/image 6.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed'
    }}>

                    {/* Background overlay - very light for better visibility */}
       <div style={{
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         background: 'rgba(0, 0, 0, 0.2)', // Much lighter overlay
         zIndex: -1
       }} />

       {/* Silver Dots Scattered - Different positions than FAQ */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        overflow: 'hidden'
      }}>
        {/* Large silver dots - Different positions */}
        <div style={{
          position: 'absolute',
          top: '8%',
          left: '15%',
          width: '10px',
          height: '10px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.9) 0%, rgba(192, 192, 192, 0.5) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          animation: 'twinkle 3.5s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '22%',
          right: '20%',
          width: '7px',
          height: '7px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.8) 0%, rgba(192, 192, 192, 0.4) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          animation: 'twinkle 4.2s ease-in-out infinite 0.8s'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '25%',
          width: '8px',
          height: '8px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.7) 0%, rgba(192, 192, 192, 0.3) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(1px)',
          animation: 'twinkle 3.8s ease-in-out infinite 1.2s'
        }} />
        
        {/* Medium silver dots - Gallery specific positions */}
        <div style={{
          position: 'absolute',
          top: '35%',
          right: '12%',
          width: '5px',
          height: '5px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.6) 0%, rgba(192, 192, 192, 0.2) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.8px)',
          animation: 'twinkle 3.2s ease-in-out infinite 0.5s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '65%',
          left: '18%',
          width: '6px',
          height: '6px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.7) 0%, rgba(192, 192, 192, 0.3) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.8px)',
          animation: 'twinkle 2.9s ease-in-out infinite 1.5s'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '30%',
          width: '4px',
          height: '4px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.5) 0%, rgba(192, 192, 192, 0.2) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.8px)',
          animation: 'twinkle 3.6s ease-in-out infinite 0.9s'
        }} />
        
        {/* Small silver dots scattered */}
        <div style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: '3px',
          height: '3px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.6) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.4s ease-in-out infinite 0.2s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '45%',
          left: '8%',
          width: '4px',
          height: '4px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.7) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.7s ease-in-out infinite 1.1s'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '40%',
          right: '15%',
          width: '3px',
          height: '3px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.5) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 3.1s ease-in-out infinite 0.7s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '75%',
          left: '35%',
          width: '5px',
          height: '5px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.8) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.8s ease-in-out infinite 1.3s'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '12%',
          width: '4px',
          height: '4px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.6) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.2s ease-in-out infinite 0.4s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '55%',
          right: '25%',
          width: '6px',
          height: '6px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.7) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 3.4s ease-in-out infinite 0.6s'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '5%',
          left: '40%',
          width: '3px',
          height: '3px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.5) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 2.6s ease-in-out infinite 1.4s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '85%',
          right: '40%',
          width: '4px',
          height: '4px',
          background: 'radial-gradient(circle, rgba(192, 192, 192, 0.6) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.5px)',
          animation: 'twinkle 3.0s ease-in-out infinite 0.8s'
        }} />
        
        {/* Additional floating particles for richness */}
        <div style={{
          position: 'absolute',
          top: '28%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '2px',
          height: '2px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.3px)',
          animation: 'twinkle 1.8s ease-in-out infinite 0.3s'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '18%',
          left: '30%',
          width: '2px',
          height: '2px',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(0.3px)',
          animation: 'twinkle 2.1s ease-in-out infinite 1.0s'
        }} />
      </div>

      {/* Keyframes for twinkle animation */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: false, margin: '-50px' }}
        data-aos="fade-up"
        data-aos-duration="1000"
        style={{
          textAlign: 'center',
          marginBottom: getResponsiveValue({
            mobile: '3rem',
            tablet: '4rem',
            laptop: '5rem',
            desktop: '6rem',
            large: '7rem'
          }),
          width: '100%',
          paddingLeft: '20px',
          paddingRight: '20px',
          position: 'relative',
          zIndex: 10
        }}
      >
        <h2 style={{
          fontSize: sectionStyles.titleSize,
          fontWeight: '300',
          color: 'white',
          fontFamily: 'Heebo, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)',
          letterSpacing: '0.02em',
          margin: '0 0 10px 0',
          lineHeight: 1.2
        }}>
          <ShinyText 
            text="גלריית עבודות" 
            speed={4}
          />
        </h2>
        <p style={{
          fontSize: getResponsiveValue({
            mobile: '1rem',
            tablet: '1.1rem',
            laptop: '1.2rem',
            desktop: '1.3rem',
            large: '1.4rem'
          }),
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: 'Heebo, sans-serif',
          fontWeight: '300',
          margin: 0
        }}>
          אוסף מהעבודות הקודמות שלנו - חוויות קולינריות בלתי נשכחות
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: false, margin: '-100px' }}
        style={{
          width: '100%',
          position: 'relative'
        }}
      >
                 <PinterestGalleryNew />
      </motion.div>

      {/* 3D Separator Line - Right after the gallery images */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: getResponsiveValue({
            mobile: '2rem 0',
            tablet: '2.5rem 0',
            laptop: '3rem 0',
            desktop: '3.5rem 0',
            large: '4rem 0'
          }),
          position: 'relative',
          zIndex: 10,
          marginTop: getResponsiveValue({
            mobile: '1rem',
            tablet: '1.5rem',
            laptop: '2rem',
            desktop: '2.5rem',
            large: '3rem'
          })
        }}
      >
        <div style={{
          width: '95%',
          height: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(192, 192, 192, 0.3) 20%, rgba(192, 192, 192, 0.8) 50%, rgba(192, 192, 192, 0.3) 80%, transparent 100%)',
          position: 'relative',
          borderRadius: '1px',
          boxShadow: `
            0 0 10px rgba(192, 192, 192, 0.3),
            0 0 20px rgba(192, 192, 192, 0.2),
            0 0 30px rgba(192, 192, 192, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)
          `,
          transform: 'perspective(1000px) rotateX(5deg)',
          transformStyle: 'preserve-3d'
        }}>
          {/* 3D Glow Effect */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '0',
            right: '0',
            height: '20px',
            background: 'radial-gradient(ellipse at center, rgba(192, 192, 192, 0.2) 0%, transparent 70%)',
            filter: 'blur(5px)',
            transform: 'translateZ(-5px)'
          }} />
          
          {/* Reflection Effect */}
          <div style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
            borderRadius: '1px'
          }} />
        </div>
      </motion.div>

      {/* FAQ Section - Right after the separator */}
      <FAQSection getResponsiveValue={getResponsiveValue} />
    </div>
  );
});

export default GallerySection;