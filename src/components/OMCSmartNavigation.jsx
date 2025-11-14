import React, { useEffect, useState } from 'react';

const OMCSmartNavigationWithMobile = ({ currentPage = 'home', onNavigate }) => {
  const [activeTab, setActiveTab] = useState(currentPage);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // בדיקת גודל מסך
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // מעקב אחר גלילה
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsScrolling(true);
      
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // ניווט לסקשנים
  const scrollToSection = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  // קטגוריות הניווט
  const navItems = [
    { id: 'home', label: 'בית' },
    { id: 'services', label: 'שירותים' },
    { id: 'about', label: 'אודותינו' },
    { id: 'gallery', label: 'גלריה' },
    { id: 'blog', label: 'בלוג' },
    { id: 'contact', label: 'צור קשר' }
  ];

  useEffect(() => {
    // בדיקה אם הניווט כבר קיים
    if (document.getElementById('omc-smart-navigation')) {
      return;
    }

    // יצירת CSS עם עיצוב iOS מקצועי
    const style = document.createElement('style');
    style.id = 'omc-navigation-styles';
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      
      .omc-navigation-container {
        position: fixed !important;
        top: 20px !important;
        left: 50% !important;
        transform: translateX(-50%) !important;
        z-index: 999999 !important;
        display: flex !important;
        align-items: center !important;
        gap: 40px !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif !important;
        direction: rtl !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        pointer-events: auto !important;
        width: auto !important;
        max-width: 90vw !important;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      .omc-navigation-container.scrolling {
        opacity: 0 !important;
        visibility: hidden !important;
        transform: translateX(-50%) translateY(-10px) !important;
      }

      /* הסתרה במובייל */
      @media (max-width: 768px) {
        .omc-navigation-container {
          display: none !important;
        }
      }

      .omc-smart-navigation {
        background: rgba(255, 255, 255, 0.08) !important;
        backdrop-filter: blur(20px) saturate(1.4) !important;
        -webkit-backdrop-filter: blur(20px) saturate(1.4) !important;
        border: 1.5px solid rgba(255, 255, 255, 0.15) !important;
        border-radius: 32px !important;
        box-shadow:
          0 8px 32px rgba(0, 0, 0, 0.12),
          0 2px 8px rgba(0, 0, 0, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.12) !important;
        transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        padding: 8px 32px !important;
        display: flex !important;
        align-items: center !important;
        gap: 20px !important;
        contain: layout style paint !important;
        isolation: isolate !important;
      }

      .omc-smart-navigation.scrolled {
        background: rgba(255, 255, 255, 0.06) !important;
        backdrop-filter: blur(20px) saturate(1.4) !important;
        -webkit-backdrop-filter: blur(20px) saturate(1.4) !important;
        box-shadow: 
          0 8px 32px rgba(0, 0, 0, 0.1),
          0 2px 6px rgba(0, 0, 0, 0.06),
          inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
      }

      .omc-logo {
        width: 120px !important;
        height: 120px !important;
        object-fit: contain !important;
        filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.1)) !important;
        transition: all 0.3s ease !important;
        cursor: pointer !important;
      }

      .omc-logo:hover {
        transform: scale(1.05) !important;
        filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.15)) !important;
      }

      .omc-nav-tabs {
        display: flex !important;
        align-items: center !important;
        gap: 8px !important;
        margin: 0 !important;
        padding: 0 !important;
        list-style: none !important;
      }

      .omc-nav-tab {
        position: relative !important;
        padding: 14px 32px !important;
        border-radius: 24px !important;
        background: transparent !important;
        color: rgba(255, 255, 255, 0.85) !important;
        font-weight: 600 !important;
        font-size: 16px !important;
        cursor: pointer !important;
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
        text-decoration: none !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        text-align: center !important;
        line-height: 1.2 !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        outline: none !important;
        -webkit-tap-highlight-color: transparent !important;
        white-space: nowrap !important;
        letter-spacing: 0.01em !important;
        font-feature-settings: 'kern' 1, 'liga' 1 !important;
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
        border: 1px solid transparent !important;
      }

      .omc-nav-tab:hover {
        color: rgba(255, 255, 255, 1) !important;
        transform: translateY(-2px) !important;
        background: rgba(255, 255, 255, 0.08) !important;
        border: 1px solid rgba(255, 255, 255, 0.12) !important;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1) !important;
      }

      .omc-nav-tab.active {
        background: linear-gradient(135deg, rgba(201, 161, 75, 0.25) 0%, rgba(166, 124, 82, 0.2) 100%) !important;
        backdrop-filter: blur(12px) !important;
        -webkit-backdrop-filter: blur(12px) !important;
        color: rgba(255, 255, 255, 1) !important;
        font-weight: 700 !important;
        box-shadow:
          0 4px 16px rgba(201, 161, 75, 0.25),
          inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
        border: 1.5px solid rgba(201, 161, 75, 0.4) !important;
      }

      /* אנימציות כניסה */
      @keyframes slideInScale {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(-20px) scale(0.9);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0px) scale(1);
        }
      }

      .omc-navigation-container {
        animation: slideInScale 0.6s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
      }

      /* רספונסיביות - רק לדסקטופ */
      @media (min-width: 769px) and (max-width: 1024px) {
        .omc-navigation-container {
          top: 16px !important;
          gap: 32px !important;
        }

        .omc-smart-navigation {
          padding: 3px 20px !important;
          gap: 14px !important;
        }

        .omc-nav-tab {
          padding: 8px 24px !important;
          font-size: 14px !important;
        }

        .omc-logo {
          width: 90px !important;
          height: 90px !important;
        }
      }

      /* הבטחת מיקום נכון */
      body {
        padding-top: 0 !important;
      }

      /* עיצוב מתקדם עדין */
      .omc-nav-tab::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01));
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .omc-nav-tab:hover::before {
        opacity: 1;
      }

      .omc-nav-tab.active::before {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.02));
        opacity: 1;
      }
    `;
    
    document.head.appendChild(style);

    // יצירת ניווט רק אם לא במובייל
    const createNavigation = () => {
      // בדיקה נוספת שלא במובייל
      if (window.innerWidth <= 768) return;

      const container = document.createElement('div');
      container.id = 'omc-navigation-container';
      container.className = 'omc-navigation-container';
      
      const nav = document.createElement('nav');
      nav.id = 'omc-smart-navigation';
      nav.className = 'omc-smart-navigation';
      
      const navTabs = document.createElement('ul');
      navTabs.className = 'omc-nav-tabs';
      
      navItems.forEach((item, index) => {
        const tab = document.createElement('li');
        tab.className = `omc-nav-tab ${item.id === activeTab ? 'active' : ''}`;
        tab.textContent = item.label;
        tab.onclick = () => {
          navTabs.querySelectorAll('.omc-nav-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          setActiveTab(item.id);
          
          if (onNavigate) {
            onNavigate(item.id);
          } else {
            scrollToSection(item.id);
          }
        };
        
        navTabs.appendChild(tab);
      });
      
      nav.appendChild(navTabs);
      
      const logo = document.createElement('img');
      logo.className = 'omc-logo';
      logo.src = 'https://res.cloudinary.com/doteohz34/image/upload/q_auto:best,f_auto/realLOGO_ctei5e.png';
      logo.alt = 'OMC Logo';
      logo.onclick = () => {
        if (onNavigate) {
          onNavigate('home');
        } else {
          scrollToSection('home');
        }
      };
      
      container.appendChild(nav);
      container.appendChild(logo);
      
      document.body.appendChild(container);
      
      const updateScrollState = () => {
        if (window.scrollY > 50) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }
      };
      
      const updateScrollingState = () => {
        if (isScrolling) {
          container.classList.add('scrolling');
        } else {
          container.classList.remove('scrolling');
        }
      };
      
      window.addEventListener('scroll', updateScrollState);
      updateScrollState();
      updateScrollingState();
      
      container.setAttribute('data-stable', 'true');
    };

    createNavigation();

    return () => {
      const styleToRemove = document.getElementById('omc-navigation-styles');
      const containerToRemove = document.getElementById('omc-navigation-container');
      if (styleToRemove) styleToRemove.remove();
      if (containerToRemove) containerToRemove.remove();
    };
  }, []);

  // עדכון מצב הסתרה כאשר isScrolling משתנה
  useEffect(() => {
    const container = document.getElementById('omc-navigation-container');
    if (container) {
      if (isScrolling) {
        container.classList.add('scrolling');
      } else {
        container.classList.remove('scrolling');
      }
    }
  }, [isScrolling]);

  // עדכון הניווט כאשר currentPage משתנה
  useEffect(() => {
    setActiveTab(currentPage);
    const navTabs = document.querySelector('.omc-nav-tabs');
    if (navTabs) {
      navTabs.querySelectorAll('.omc-nav-tab').forEach((tab, index) => {
        if (navItems[index] && navItems[index].id === currentPage) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
    }
  }, [currentPage]);

  return null;
};

export default OMCSmartNavigationWithMobile;
