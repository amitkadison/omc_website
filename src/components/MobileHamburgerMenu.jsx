import React, { useState, useEffect } from 'react';

const MobileHamburgerMenu = ({ currentPage = 'home', onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  // סגירת התפריט כשלוחצים מחוץ לו
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.mobile-hamburger-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // מניעת גלילה כשהתפריט פתוח
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // פריטי הניווט
  const navItems = [
    { id: 'home', label: 'בית' },
    { id: 'services', label: 'שירותים' },
    { id: 'about', label: 'אודותינו' },
    { id: 'gallery', label: 'גלריה' },
    { id: 'blog', label: 'בלוג' },
    { id: 'contact', label: 'צור קשר' }
  ];

  const handleNavClick = (itemId) => {
    if (onNavigate) {
      onNavigate(itemId);
    }
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // הצגה רק במובייל
  if (!isMobile) return null;

  return (
    <>
      <style jsx>{`
        .mobile-hamburger-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 999999;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
          direction: rtl;
        }

        .hamburger-button {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .hamburger-button:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: scale(1.05);
        }

        .hamburger-line {
          width: 20px;
          height: 2px;
          background: white;
          margin: 2px 0;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          border-radius: 1px;
        }

        .hamburger-button.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger-button.open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger-button.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 999998;
          opacity: ${isOpen ? '1' : '0'};
          visibility: ${isOpen ? 'visible' : 'hidden'};
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        .menu-panel {
          position: fixed;
          top: 0;
          right: ${isOpen ? '0' : '-100%'};
          width: 300px;
          height: 100vh;
          background: linear-gradient(135deg,
            rgba(28, 28, 28, 0.95) 0%,
            rgba(20, 20, 20, 0.98) 100%);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          border-left: 1px solid rgba(255, 255, 255, 0.15);
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          z-index: 999999;
          overflow-y: auto;
          padding: 80px 0 40px 0;
          box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3);
        }

        .menu-logo {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding: 0 20px;
        }

        .menu-logo-image {
          width: 100px;
          height: 100px;
          object-fit: contain;
          filter: drop-shadow(0 2px 8px rgba(201, 161, 75, 0.3));
        }

        .menu-close-button {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          position: relative;
        }

        .menu-close-button:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: rotate(90deg) scale(1.1);
        }

        .menu-close-button::before,
        .menu-close-button::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background: white;
          border-radius: 1px;
        }

        .menu-close-button::before {
          transform: rotate(45deg);
        }

        .menu-close-button::after {
          transform: rotate(-45deg);
        }

        .menu-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .menu-item {
          margin: 10px 24px;
          opacity: ${isOpen ? '1' : '0'};
          transform: translateX(${isOpen ? '0' : '30px'});
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        ${navItems.map((_, index) => `
          .menu-item:nth-child(${index + 1}) {
            transition-delay: ${isOpen ? (index * 0.1) + 0.1 : 0}s;
          }
        `).join('')}

        .menu-link {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 24px;
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
          border-radius: 16px;
          font-size: 17px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.02em;
        }

        .menu-link:hover {
          background: rgba(255, 255, 255, 0.12);
          color: white;
          transform: translateX(-3px);
        }

        .menu-link.active {
          background: linear-gradient(135deg, rgba(201, 161, 75, 0.2) 0%, rgba(166, 124, 82, 0.15) 100%);
          color: white;
          font-weight: 600;
          border: 1px solid rgba(201, 161, 75, 0.3);
        }

        .menu-link.active::before {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 60%;
          background: linear-gradient(to bottom, #C9A14B, #A67C52);
          border-radius: 2px 0 0 2px;
        }

        .menu-text {
          flex: 1;
          text-align: center;
        }

        .close-area {
          position: absolute;
          top: 0;
          left: 0;
          right: 280px;
          bottom: 0;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .mobile-hamburger-container {
            top: 15px;
            right: 15px;
          }

          .hamburger-button {
            width: 45px;
            height: 45px;
          }

          .menu-panel {
            width: 100vw;
            right: ${isOpen ? '0' : '-100%'};
            border-left: none;
          }

          .menu-item {
            margin: 8px 20px;
          }

          .menu-link {
            padding: 16px 20px;
            font-size: 16px;
          }

          .close-area {
            display: none;
          }
        }

        /* אנימציות כניסה */
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .mobile-hamburger-container {
          animation: slideInRight 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
      `}</style>

      <div className="mobile-hamburger-container">
        <button 
          className={`hamburger-button ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="תפריט ניווט"
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>

        <div className="menu-overlay">
          <div className="close-area" onClick={() => setIsOpen(false)}></div>
          
          <div className="menu-panel">
            <div className="menu-logo">
              <img
                src="https://res.cloudinary.com/doteohz34/image/upload/q_auto:best,f_auto/realLOGO_ctei5e.png"
                alt="OMC Logo"
                className="menu-logo-image"
              />
              <div
                className="menu-close-button"
                onClick={() => setIsOpen(false)}
                aria-label="סגור תפריט"
              />
            </div>

            <ul className="menu-items">
              {navItems.map((item) => (
                <li key={item.id} className="menu-item">
                  <div
                    className={`menu-link ${currentPage === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span className="menu-text">{item.label}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHamburgerMenu;