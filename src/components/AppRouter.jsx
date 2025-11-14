import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import MAINPAGE from './MAINPAGE';
import ServicesPage from './ServicesPage';
import AboutPage from './AboutPage';
import GalleryPage from './GalleryPage';
import BLOG from './BLOG';
import ArticlePage from './ArticlePage';
import ContactPage from './ContactPage';
import WhatsAppButton from './WhatsAppButton';
import AccessibilityWidget from './AccessibilityWidget';
import OMCSmartNavigationWithMobile from './OMCSmartNavigation';
import MobileHamburgerMenu from './MobileHamburgerMenu';
import DangerousMode from './DangerousMode';

const AppRouter = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' && window.innerWidth <= 1024);

  const navigate = useNavigate();
  const location = useLocation();

  // Get current page from location
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/' || path === '/home') return 'home';
    if (path.startsWith('/services')) return 'services';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/gallery')) return 'gallery';
    if (path.startsWith('/blog')) return 'blog';
    if (path.startsWith('/article')) return 'article';
    if (path.startsWith('/contact')) return 'contact';
    return 'home';
  };

  const currentPage = getCurrentPage();

  // פונקציה לניווט בין דפים
  const navigateToPage = (pageId, articleData = null, serviceId = null) => {
    console.log('AppRouter: Navigating to', pageId, 'serviceId:', serviceId);

    if (articleData) {
      setSelectedArticle(articleData);
    }
    if (serviceId) {
      setSelectedService(serviceId);
    }

    // Navigate using React Router
    const routes = {
      'home': '/',
      'services': '/services',
      'about': '/about',
      'gallery': '/gallery',
      'blog': '/blog',
      'article': '/article',
      'contact': '/contact'
    };

    navigate(routes[pageId] || '/');

    // גלילה לראש העמוד
    window.scrollTo(0, 0);
  };

  // האזנה לשינויים בניווט (for backward compatibility with custom events)
  useEffect(() => {
    const handleNavigation = (event) => {
      const { detail } = event;
      if (detail && detail.pageId) {
        navigateToPage(detail.pageId, detail.articleData, detail.serviceId);
      }
    };

    window.addEventListener('navigateToPage', handleNavigation);
    return () => {
      window.removeEventListener('navigateToPage', handleNavigation);
    };
  }, []);

  // האזנה לשינויי גודל מסך
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // עדכון הניווט החכם
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('updateNavigation', {
      detail: { currentPage }
    }));
  }, [currentPage]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {/* Mobile-only: ServicesPage styling effects */}
      {currentPage === 'home' && isMobile && (
        <style>{`
          .App::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at 25% 25%, rgba(127, 0, 255, 0.03) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(0, 240, 255, 0.02) 0%, transparent 50%);
            opacity: 0.08;
            mix-blend-mode: screen;
            pointer-events: none;
            z-index: 1;
            animation: particleFloat 20s ease-in-out infinite alternate;
          }

          .App::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 3px;
            height: 100%;
            background: linear-gradient(to bottom,
              transparent 0%,
              rgba(218, 165, 132, 0.15) 20%,
              rgba(218, 165, 132, 0.25) 40%,
              rgba(218, 165, 132, 0.15) 60%,
              transparent 80%);
            z-index: 2;
            pointer-events: none;
            box-shadow: 0 0 10px rgba(218, 165, 132, 0.3);
          }

          @keyframes particleFloat {
            0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.06; }
            50% { transform: translateX(10px) translateY(-15px) scale(1.05); opacity: 0.1; }
            100% { transform: translateX(-5px) translateY(10px) scale(0.95); opacity: 0.08; }
          }
        `}</style>
      )}

      <div className="App" style={{
        overflowX: 'hidden',
        position: 'relative',
        left: 0,
        top: 0,
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        width: '100%',
        display: 'block',
        overflowY: 'auto',
        zIndex: 1,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        textShadow: 'none',
        // Mobile-only: Apply ServicesPage background styling to entire Home page
        ...(currentPage === 'home' && isMobile ? {
          background: `linear-gradient(to bottom right, #0D0D0D, #1A1A1A, #110011),
                       radial-gradient(circle at 20% 20%, rgba(59, 0, 102, 0.15) 0%, transparent 60%),
                       radial-gradient(circle at 80% 80%, rgba(0, 30, 54, 0.12) 0%, transparent 60%)`,
          position: 'relative'
        } : {})
      }}>
        {/* ניווט חכם קבוע לדסקטופ */}
        <OMCSmartNavigationWithMobile currentPage={currentPage} onNavigate={navigateToPage} />

        {/* תפריט המבורגר למובייל */}
        <MobileHamburgerMenu currentPage={currentPage} onNavigate={navigateToPage} />

        {/* תוכן הדף הנוכחי */}
        <Routes>
          <Route path="/" element={<MAINPAGE />} />
          <Route path="/home" element={<MAINPAGE />} />
          <Route path="/services" element={<ServicesPage selectedService={selectedService} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/blog" element={<BLOG onNavigateToArticle={(articleData) => navigateToPage('article', articleData)} />} />
          <Route path="/article" element={<ArticlePage articleData={selectedArticle} onBackToBlog={() => navigateToPage('blog')} />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Catch-all route for 404 - redirect to home */}
          <Route path="*" element={<MAINPAGE />} />
        </Routes>

        {/* כפתור ווטצאפ קבוע */}
        <WhatsAppButton />

        {/* כפתור נגישות קבוע */}
        <AccessibilityWidget />

        {/* Dangerous Mode - Development Tool */}
        <DangerousMode />
      </div>
    </>
  );
};

export default AppRouter;
