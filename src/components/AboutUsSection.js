// components/AboutUsSection.js
"use client";
import React from "react";
import { motion } from "framer-motion";
import { StickyScroll } from "./ui/StickyScroll";

const AboutUsSection = ({ getResponsiveValue }) => {
  // Updated content with better responsive font sizes
  const content = [
    {
      title: "הכנות",
      description: "החל מהתאמת הטעמים לאופי האירוע, לעונה ולקהל היעד, ועד בחירת אנשי הצוות האיכותיים ביותר שיעמדו מאחורי הבר – כל פרט קטן נבנה בקפידה, במיוחד בשבילכם.",
      // Add responsive font sizes for title
      titleStyle: {
        fontSize: getResponsiveValue({
          mobile: '36px',
          tablet: '40px',
          laptop: '44px',
          desktop: '48px',
          large: '52px',
          xlarge: '56px',
          ultrawide: '60px'
        }),
        maxWidth: getResponsiveValue({
          mobile: '100%',
          tablet: '100%',
          laptop: '600px',
          desktop: '700px',
          large: '800px',
          xlarge: '900px',
          ultrawide: '1000px'
        })
      },
      // Add responsive font sizes for description
      descriptionStyle: {
        fontSize: getResponsiveValue({
          mobile: '18px',
          tablet: '20px',
          laptop: '22px',
          desktop: '24px',
          large: '26px',
          xlarge: '28px',
          ultrawide: '30px'
        }),
        lineHeight: getResponsiveValue({
          mobile: '1.6',
          tablet: '1.7',
          laptop: '1.8',
          desktop: '1.9',
          large: '2',
          xlarge: '2.1',
          ultrawide: '2.2'
        }),
        maxWidth: getResponsiveValue({
          mobile: '100%',
          tablet: '100%',
          laptop: '500px',
          desktop: '600px',
          large: '700px',
          xlarge: '800px',
          ultrawide: '900px'
        })
      }
    },
    {
      title: "מה הופך אותו לשותף המעודף על החברות והמפיקים הגדולים בישראל",
      description: "אנחנו מתמחים ביצירת בר קוקטיילים מקצועי לכל סוגי האירועים. משירות ברמן פרטי ועד הפקת אירועים גדולים, אנחנו מספקים חוויה קולינרית מושלמת עם הציוד הטוב ביותר ומיטב המשקאות הפרימיום.",
      // Add responsive font sizes for title
      titleStyle: {
        fontSize: getResponsiveValue({
          mobile: '36px',
          tablet: '40px',
          laptop: '44px',
          desktop: '48px',
          large: '52px',
          xlarge: '56px',
          ultrawide: '60px'
        }),
        maxWidth: getResponsiveValue({
          mobile: '100%',
          tablet: '100%',
          laptop: '600px',
          desktop: '700px',
          large: '800px',
          xlarge: '900px',
          ultrawide: '1000px'
        })
      },
      // Add responsive font sizes for description
      descriptionStyle: {
        fontSize: getResponsiveValue({
          mobile: '18px',
          tablet: '20px',
          laptop: '22px',
          desktop: '24px',
          large: '26px',
          xlarge: '28px',
          ultrawide: '30px'
        }),
        lineHeight: getResponsiveValue({
          mobile: '1.6',
          tablet: '1.7',
          laptop: '1.8',
          desktop: '1.9',
          large: '2',
          xlarge: '2.1',
          ultrawide: '2.2'
        }),
        maxWidth: getResponsiveValue({
          mobile: '100%',
          tablet: '100%',
          laptop: '500px',
          desktop: '600px',
          large: '700px',
          xlarge: '800px',
          ultrawide: '900px'
        })
      }
    },
  ];

  // Check if mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const isTablet = typeof window !== 'undefined' && window.innerWidth <= 1024;

  // Mobile-first responsive About Us section
  if (isMobile || isTablet) {
    return (
      <section
        style={{
          width: '100vw',
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #1E3A8A 0%, #6B21A8 50%, #1F2937 100%)',
          color: 'white',
          padding: getResponsiveValue({
            mobile: '40px 20px',
            tablet: '60px 40px',
            laptop: '80px 60px',
            desktop: '100px 80px',
            large: '120px 100px'
          }),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}
      >
        {/* Decorative gradient overlays for depth */}
        <div
          style={{
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-50%',
            right: '-50%',
            width: '200%',
            height: '200%',
            background: 'radial-gradient(circle at 70% 80%, rgba(147, 51, 234, 0.2) 0%, transparent 50%)',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        <div
          style={{
            maxWidth: '1200px',
            width: '100%',
            position: 'relative',
            zIndex: 2
          }}
        >
          {content.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true, margin: "-100px" }}
              style={{
                marginBottom: getResponsiveValue({
                  mobile: '80px',
                  tablet: '100px',
                  laptop: '120px',
                  desktop: '140px',
                  large: '160px'
                }),
                padding: getResponsiveValue({
                  mobile: '30px 20px',
                  tablet: '40px 30px',
                  laptop: '50px 40px',
                  desktop: '60px 50px',
                  large: '70px 60px'
                }),
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                direction: 'rtl'
              }}
            >
              <h2
                style={{
                  fontSize: getResponsiveValue({
                    mobile: '36px',
                    tablet: '40px',
                    laptop: '44px',
                    desktop: '48px',
                    large: '52px'
                  }),
                  fontWeight: '700',
                  marginBottom: getResponsiveValue({
                    mobile: '16px',
                    tablet: '20px',
                    laptop: '24px',
                    desktop: '28px',
                    large: '32px'
                  }),
                  fontFamily: 'Varela Round, sans-serif',
                  lineHeight: '1.2',
                  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #dbeafe 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                {item.title}
              </h2>
              
              <p
                style={{
                  fontSize: getResponsiveValue({
                    mobile: '24px',
                    tablet: '26px',
                    laptop: '28px',
                    desktop: '30px',
                    large: '32px'
                  }),
                  lineHeight: '2.2',
                  fontFamily: 'Varela Round, sans-serif',
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.9)',
                  maxWidth: '100%',
                  margin: '0 auto',
                  textShadow: '0 1px 5px rgba(0, 0, 0, 0.2)'
                }}
              >
                {item.description}
              </p>
            </motion.div>
          ))}

          {/* Optional decorative elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
            style={{
              marginTop: getResponsiveValue({
                mobile: '40px',
                tablet: '50px',
                laptop: '60px',
                desktop: '70px',
                large: '80px'
              }),
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            {/* Decorative separator */}
            <div
              style={{
                width: getResponsiveValue({
                  mobile: '60px',
                  tablet: '80px',
                  laptop: '100px',
                  desktop: '120px',
                  large: '140px'
                }),
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)',
                borderRadius: '1px'
              }}
            />
            
            {/* Call to action or contact prompt */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
              style={{
                fontSize: getResponsiveValue({
                  mobile: '14px',
                  tablet: '15px',
                  laptop: '16px',
                  desktop: '17px',
                  large: '18px'
                }),
                color: 'rgba(255, 255, 255, 0.7)',
                fontWeight: '300',
                fontStyle: 'italic',
                fontFamily: 'Varela Round, sans-serif'
              }}
            >
              מוכנים ליצור עבורכם את החוויה המושלמת
            </motion.p>
          </motion.div>
        </div>
      </section>
    );
  }

  // Desktop version - with improved responsive styles
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      // Add padding for large screens to prevent edge-to-edge content
      padding: getResponsiveValue({
        mobile: '0',
        tablet: '0',
        laptop: '0',
        desktop: '0',
        large: '0 5%',
        xlarge: '0 10%',
        ultrawide: '0 15%'
      }),
      // Reduce top margin on desktop
      marginTop: getResponsiveValue({
        mobile: '0',
        tablet: '0',
        laptop: '0',
        desktop: '-2rem',
        large: '-2rem',
        xlarge: '-2rem',
        ultrawide: '-2rem'
      })
    }}>
      {/* רקע גרדיאנט BLUR RADIAL עדין יותר מאחורי כל ה-SECTION */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120%',
          height: '120%',
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.12) 0%, rgba(25, 25, 112, 0.06) 30%, rgba(47, 79, 79, 0.04) 60%, rgba(105, 105, 105, 0.015) 90%, transparent 100%)',
          filter: 'blur(80px)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* גרדיאנט נוסף - אפקט זוהר כסוף */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '20%',
          width: '60%',
          height: '60%',
          background: 'radial-gradient(circle at center, rgba(192, 192, 192, 0.08) 0%, rgba(128, 128, 128, 0.04) 50%, transparent 100%)',
          filter: 'blur(40px)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* גרדיאנט נוסף - אפקט זוהר כחול עדין */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '20%',
          width: '50%',
          height: '50%',
          background: 'radial-gradient(circle at center, rgba(25, 25, 112, 0.06) 0%, rgba(47, 79, 79, 0.03) 50%, transparent 100%)',
          filter: 'blur(50px)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      
      {/* פסים גאומטריים בצבע כסוף סביב האזור - מותאמים לתוכן */}
      {/* פס תחתון */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '70%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(192, 192, 192, 0.6), transparent)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      
      {/* פס שמאלי */}
      <div style={{
        position: 'absolute',
        left: '15%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '1px',
        height: '70%',
        background: 'linear-gradient(180deg, transparent, rgba(192, 192, 192, 0.6), transparent)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      
      {/* פס ימני */}
      <div style={{
        position: 'absolute',
        right: '15%',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '1px',
        height: '70%',
        background: 'linear-gradient(180deg, transparent, rgba(192, 192, 192, 0.6), transparent)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      
      {/* גרדיאנט מקשר בין התמונות לתוכן */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.08) 0%, rgba(128, 128, 128, 0.04) 25%, rgba(64, 64, 64, 0.02) 50%, rgba(32, 32, 32, 0.01) 75%, transparent 100%)',
        filter: 'blur(20px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      <StickyScroll 
        content={content} 
        getResponsiveValue={getResponsiveValue}
        contentClassName=""
        // Pass responsive styles to StickyScroll
        contentStyles={{
          maxWidth: getResponsiveValue({
            mobile: '100%',
            tablet: '100%',
            laptop: '100%',
            desktop: '100%',
            large: '1400px',
            xlarge: '1600px',
            ultrawide: '1800px'
          }),
          margin: '0 auto'
        }}
      />
    </div>
  );
};

export default AboutUsSection;