import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResponsive } from '../hooks/useResponsive';
import ShinyText from './ShinyText';

// Service data categorized by event types
const servicesData = {
  company: [
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/forobs30u30_e88rln.jpg",
      text: "אירועי חברה מקצועיים",
      description: "ליצור חיבור אמיתי בין אנשים ולשבור שגרה - אלו שני האלמנטים המרכזיים שנשים עליהם דגש באירוע"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/forbs30u302-_b18hvq.jpg",
      text: "השקות מוצרים",
      description: "בין אירוע Happy Hour שגרתי לבין אירוע הנפקה מרשים, אנחנו נדע להוסיף צבע ואנרגיה"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/cocktail1_pfswzd.png",
      text: "אירועי צוות",
      description: "חוויה בלתי נשכחת שמחזקת את הקשרים בצוות ומביאה אנרגיה חיובית"
    }
  ],
  private: [
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/omer2_i4vmxj.png",
      text: "חתונות ואירועים פרטיים",
      description: "האורח יקבל משקה שהוא לא ישכח - נשתלב עם אופי האירוע ונוסיף את הקיק של OMC"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/omer_shaking_e4vshq.png",
      text: "מסיבות יום הולדת",
      description: "נתאים את הבר והחוויה לאווירה שהאירוע משדר, לא משנה כמה אנשים"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/cocktail1_pfswzd.png",
      text: "אירועים חברתיים",
      description: "אנחנו כבר עשינו הכל, אז נשמח שתאתגרו אותנו :)"
    }
  ],
  workshops: [
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/barista-putting-alcohol-into-cocktail-glass-with-syrup-ice-cubes_fyfgrf.jpg",
      text: "סדנאות קוקטיילים",
      description: "איזה כיף זה להעביר את הידע הלאה! שבירת שגרה ויצירתיות עם עבודה צוותית"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/forobs30u30_e88rln.jpg",
      text: "קורסי מיקסולוגיה",
      description: "בין אם אתם קבוצה קטנה או גדולה - נהפוך אתכם לחברים המקיסולוגיים שלכם"
    },
    {
      image: "https://res.cloudinary.com/doteohz34/image/upload/q_auto,f_auto,w_600/forbs30u302-_b18hvq.jpg",
      text: "חוויות קולינריות",
      description: "יצירתיות, עבודה צוותית מלאה באלכוהול וצחוק - חוויה מיוחדת"
    }
  ]
};

const tabsConfig = [
  { 
    id: 'company', 
    title: 'אירועי חברה', 
    icon: '🏢',
    description: 'שירותי בר מקצועיים לאירועי חברות'
  },
  { 
    id: 'private', 
    title: 'אירועים פרטיים', 
    icon: '🎉',
    description: 'בר קוקטיילים לחגיגות אישיות ומשפחתיות'
  },
  { 
    id: 'workshops', 
    title: 'סדנאות וקורסים', 
    icon: '🍹',
    description: 'למידה והכשרה במקצועות הבר'
  }
];

// Tab Header Component
const TabHeader = ({ activeTab, onTabChange, isLoading }) => {
  const { getResponsiveValue } = useResponsive();

  const headerStyles = useMemo(() => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: getResponsiveValue({
        mobile: '1rem 0.5rem',
        tablet: '1.5rem 1rem',
        laptop: '2rem 1.5rem',
        desktop: '2rem 2rem',
        large: '2.5rem 2rem'
      }),
      gap: getResponsiveValue({
        mobile: '0.5rem',
        tablet: '0.8rem',
        laptop: '1rem',
        desktop: '1.2rem',
        large: '1.5rem'
      }),
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      WebkitOverflowScrolling: 'touch'
    },
    tab: {
      minWidth: getResponsiveValue({
        mobile: '100px',
        tablet: '120px',
        laptop: '140px',
        desktop: '160px',
        large: '180px'
      }),
      height: getResponsiveValue({
        mobile: '60px',
        tablet: '70px',
        laptop: '80px',
        desktop: '85px',
        large: '90px'
      }),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: getResponsiveValue({
        mobile: '0.5rem',
        tablet: '0.6rem',
        laptop: '0.8rem',
        desktop: '1rem',
        large: '1.2rem'
      }),
      borderRadius: '16px',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      userSelect: 'none',
      WebkitTapHighlightColor: 'transparent',
      position: 'relative',
      overflow: 'hidden'
    },
    activeTab: {
      background: 'linear-gradient(135deg, rgba(201, 161, 75, 0.2), rgba(26, 54, 93, 0.1))',
      borderColor: '#C9A14B',
      boxShadow: '0 8px 32px rgba(201, 161, 75, 0.3), 0 0 0 1px rgba(201, 161, 75, 0.2)',
      backdropFilter: 'blur(10px)'
    },
    inactiveTab: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(5px)'
    },
    text: {
      fontSize: getResponsiveValue({
        mobile: '0.75rem',
        tablet: '0.85rem',
        laptop: '0.9rem',
        desktop: '1rem',
        large: '1.1rem'
      }),
      fontWeight: '600',
      fontFamily: 'Heebo, sans-serif',
      textAlign: 'center',
      lineHeight: 1.2,
      marginTop: '4px'
    }
  }), [getResponsiveValue]);

  return (
    <div style={headerStyles.container}>
      {tabsConfig.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <motion.button
            key={tab.id}
            style={{
              ...headerStyles.tab,
              ...(isActive ? headerStyles.activeTab : headerStyles.inactiveTab),
              border: `1px solid ${isActive ? '#C9A14B' : 'rgba(255, 255, 255, 0.1)'}`,
              color: isActive ? '#FAEBCD' : 'rgba(255, 255, 255, 0.8)',
              opacity: isLoading ? 0.6 : 1,
              pointerEvents: isLoading ? 'none' : 'auto'
            }}
            onClick={() => !isLoading && onTabChange(tab.id)}
            whileHover={!isLoading ? {
              scale: 1.05,
              boxShadow: isActive 
                ? '0 12px 40px rgba(201, 161, 75, 0.4), 0 0 0 1px rgba(201, 161, 75, 0.3)'
                : '0 8px 24px rgba(255, 255, 255, 0.1)',
              y: -2
            } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
            disabled={isLoading}
            aria-label={tab.description}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '2px' }}>
              {tab.icon}
            </div>
            <span style={headerStyles.text}>
              {tab.title}
            </span>
            
            {/* Active indicator */}
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                style={{
                  position: 'absolute',
                  bottom: '4px',
                  left: '50%',
                  width: '30%',
                  height: '2px',
                  backgroundColor: '#C9A14B',
                  borderRadius: '1px'
                }}
                initial={false}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

// Loading Component
const LoadingState = () => {
  const { getResponsiveValue } = useResponsive();
  
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: getResponsiveValue({
        mobile: '200px',
        tablet: '250px',
        laptop: '300px',
        desktop: '350px',
        large: '400px'
      }),
      color: 'rgba(255, 255, 255, 0.6)'
    }}>
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
        style={{
          fontSize: '2rem',
          marginRight: '0.5rem'
        }}
      >
        🍹
      </motion.div>
      <span style={{
        fontSize: getResponsiveValue({
          mobile: '1rem',
          tablet: '1.1rem',
          laptop: '1.2rem',
          desktop: '1.3rem',
          large: '1.4rem'
        }),
        fontFamily: 'Heebo, sans-serif'
      }}>
        טוען שירותים...
      </span>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ service, index, isVisible }) => {
  const { getResponsiveValue } = useResponsive();

  const cardStyles = useMemo(() => ({
    container: {
      position: 'relative',
      width: '100%',
      maxWidth: getResponsiveValue({
        mobile: '300px',
        tablet: '320px',
        laptop: '350px',
        desktop: '380px',
        large: '400px'
      }),
      height: getResponsiveValue({
        mobile: '400px',
        tablet: '420px',
        laptop: '440px',
        desktop: '460px',
        large: '480px'
      }),
      margin: '0 auto',
      marginBottom: getResponsiveValue({
        mobile: '1.5rem',
        tablet: '2rem',
        laptop: '2.5rem',
        desktop: '3rem',
        large: '3.5rem'
      }),
      borderRadius: '20px',
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
    },
    image: {
      width: '100%',
      height: '60%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    content: {
      padding: getResponsiveValue({
        mobile: '1.2rem',
        tablet: '1.5rem',
        laptop: '1.8rem',
        desktop: '2rem',
        large: '2.2rem'
      }),
      height: '40%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      direction: 'rtl'
    },
    title: {
      fontSize: getResponsiveValue({
        mobile: '1.2rem',
        tablet: '1.3rem',
        laptop: '1.4rem',
        desktop: '1.5rem',
        large: '1.6rem'
      }),
      fontWeight: '700',
      color: '#FAEBCD',
      fontFamily: 'Heebo, sans-serif',
      marginBottom: '0.8rem',
      lineHeight: 1.2
    },
    description: {
      fontSize: getResponsiveValue({
        mobile: '0.9rem',
        tablet: '1rem',
        laptop: '1.1rem',
        desktop: '1.2rem',
        large: '1.3rem'
      }),
      color: 'rgba(255, 255, 255, 0.8)',
      fontFamily: 'Heebo, sans-serif',
      lineHeight: 1.4
    }
  }), [getResponsiveValue]);

  return (
    <motion.div
      style={cardStyles.container}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: 0, 
        scale: 1 
      } : { 
        opacity: 0, 
        y: 50, 
        scale: 0.9 
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.02,
        y: -5,
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4)'
      }}
    >
      <img
        src={service.image}
        alt={service.text}
        style={cardStyles.image}
        onError={(e) => {
          e.target.style.background = 'linear-gradient(135deg, #C9A14B, #1A365D)';
          e.target.style.display = 'block';
        }}
      />
      <div style={cardStyles.content}>
        <h3 style={cardStyles.title}>
          {service.text}
        </h3>
        <p style={cardStyles.description}>
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

// Tab Content Component
const TabContent = ({ activeTab, isLoading }) => {
  const { getResponsiveValue, isMobile } = useResponsive();
  const currentServices = servicesData[activeTab] || [];

  const contentStyles = useMemo(() => ({
    container: {
      padding: getResponsiveValue({
        mobile: '1rem 0.5rem',
        tablet: '1.5rem 1rem',
        laptop: '2rem 1.5rem',
        desktop: '2.5rem 2rem',
        large: '3rem 2.5rem'
      }),
      minHeight: getResponsiveValue({
        mobile: '600px',
        tablet: '650px',
        laptop: '700px',
        desktop: '750px',
        large: '800px'
      })
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: getResponsiveValue({
        mobile: '1rem',
        tablet: '1.5rem',
        laptop: '2rem',
        desktop: '2.5rem',
        large: '3rem'
      }),
      maxWidth: '1200px',
      margin: '0 auto'
    }
  }), [getResponsiveValue, isMobile]);

  if (isLoading) {
    return (
      <div style={contentStyles.container}>
        <LoadingState />
      </div>
    );
  }

  return (
    <div style={contentStyles.container}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          style={contentStyles.grid}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {currentServices.map((service, index) => (
            <ServiceCard
              key={`${activeTab}-${index}`}
              service={service}
              index={index}
              isVisible={true}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Main ServicesTabNavigation Component
const ServicesTabNavigation = () => {
  const { getResponsiveValue } = useResponsive();
  const [activeTab, setActiveTab] = useState('company');
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = useCallback(async (tabId) => {
    if (tabId === activeTab) return;
    
    try {
      setIsLoading(true);
      
      // Simulate content loading delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setActiveTab(tabId);
    } catch (error) {
      console.error('Error switching tabs:', error);
      // Fallback to company tab
      setActiveTab('company');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  const sectionStyles = useMemo(() => ({
    container: {
      width: '100vw',
      minHeight: getResponsiveValue({
        mobile: '100vh',
        tablet: '110vh',
        laptop: '120vh',
        desktop: '130vh',
        large: '140vh'
      }),
      position: 'relative',
      zIndex: 7,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: getResponsiveValue({
        mobile: '2rem 0',
        tablet: '3rem 0',
        laptop: '4rem 0',
        desktop: '5rem 0',
        large: '6rem 0'
      }),
      marginTop: getResponsiveValue({
        mobile: '1rem',
        tablet: '2rem',
        laptop: '3rem',
        desktop: '4rem',
        large: '5rem'
      })
    },
    title: {
      textAlign: 'center',
      marginBottom: getResponsiveValue({
        mobile: '2rem',
        tablet: '2.5rem',
        laptop: '3rem',
        desktop: '3.5rem',
        large: '4rem'
      }),
      padding: getResponsiveValue({
        mobile: '0 1rem',
        tablet: '0 2rem',
        laptop: '0 3rem',
        desktop: '0 4rem',
        large: '0 5rem'
      })
    },
    titleText: {
      fontSize: getResponsiveValue({
        mobile: '2.2rem',
        tablet: '2.8rem',
        laptop: '3.4rem',
        desktop: '4rem',
        large: '4.6rem'
      }),
      fontWeight: '700',
      fontFamily: "'Noto Sans Hebrew', sans-serif",
      background: 'linear-gradient(180deg, #ffffff 0%, #999999 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '-0.5px',
      margin: 0,
      lineHeight: 1.1
    }
  }), [getResponsiveValue]);

  return (
    <div style={sectionStyles.container}>
      <motion.div
        style={sectionStyles.title}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 style={sectionStyles.titleText}>
          <ShinyText 
            text="השירותים שלנו" 
            speed={4}
          />
        </h2>
      </motion.div>

      <motion.div
        style={{ width: '100%' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        viewport={{ once: true }}
      >
        <TabHeader 
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isLoading={isLoading}
        />
        
        <TabContent 
          activeTab={activeTab}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  );
};

export default ServicesTabNavigation;