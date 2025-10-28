import React, { useEffect } from 'react';

const WhatsAppButton = () => {
  const phoneNumber = '972542512095'; // מספר טלפון נכון

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    window.open(`https://wa.me/${phoneNumber}`, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    // בדיקה אם הכפתור כבר קיים - אל תיצור שוב!
    if (document.getElementById('fixed-whatsapp-btn') || document.getElementById('super-whatsapp-button')) {
      return;
    }

    // יצירת CSS יציב ללא אנימציות מפריעות
    const style = document.createElement('style');
    style.id = 'super-whatsapp-button';
    style.innerHTML = `
      .super-whatsapp-button {
        position: fixed !important;
        bottom: 20px !important;
        left: 20px !important;
        z-index: 999999999 !important;
        width: 65px !important;
        height: 65px !important;
        background: linear-gradient(145deg, #25D366, #1DA851) !important;
        border-radius: 50% !important;
        cursor: pointer !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-shadow: 0 8px 20px rgba(37, 211, 102, 0.6) !important;
        border: none !important;
        transition: all 0.2s ease-out !important;
        will-change: transform !important;
        pointer-events: auto !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        font-family: system-ui, -apple-system, sans-serif !important;
        outline: none !important;
        -webkit-tap-highlight-color: transparent !important;
        -webkit-touch-callout: none !important;
        -webkit-user-drag: none !important;
        overflow: visible !important;
        /* הגנה מפני layout shifts */
        contain: layout style paint !important;
        isolation: isolate !important;
        transform: translateZ(0) scale(1) !important;
        backface-visibility: hidden !important;
        /* מניעת scrollbars */
        margin: 0 !important;
        padding: 0 !important;
      }

      .super-whatsapp-button:hover {
        transform: translateZ(0) scale(1.05) !important;
        box-shadow: 0 12px 25px rgba(37, 211, 102, 0.8) !important;
        background: linear-gradient(145deg, #1DA851, #25D366) !important;
      }

      .super-whatsapp-button:active {
        transform: translateZ(0) scale(0.98) !important;
      }

      /* הסרת הpulse animation שגורם לריצוד */
      .super-whatsapp-button::before {
        display: none !important;
      }

      @media (max-width: 768px) {
        .super-whatsapp-button {
          width: 55px !important;
          height: 55px !important;
          bottom: 15px !important;
          left: 15px !important;
        }
      }

      @media (max-width: 480px) {
        .super-whatsapp-button {
          width: 50px !important;
          height: 50px !important;
          bottom: 12px !important;
          left: 12px !important;
        }
      }

      /* דריסת CSS בטוחה */
      body .super-whatsapp-button,
      div .super-whatsapp-button,
      section .super-whatsapp-button,
      main .super-whatsapp-button,
      article .super-whatsapp-button,
      .circular-gallery .super-whatsapp-button {
        position: fixed !important;
        z-index: 999999999 !important;
        contain: layout style paint !important;
      }

      /* מניעת overflow על body */
      body {
        overflow-x: hidden !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
        position: relative !important;
        left: 0 !important;
        top: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 100vh !important;
        display: block !important;
        overflow-y: auto !important;
        z-index: 1 !important;
        background: transparent !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      
      html {
        overflow-x: hidden !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
        position: relative !important;
        left: 0 !important;
        top: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        box-sizing: border-box !important;
        width: 100% !important;
        height: 100% !important;
        min-height: 100vh !important;
        display: block !important;
        overflow-y: auto !important;
        z-index: 1 !important;
        background: transparent !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
        text-shadow: none !important;
      }
      
      html::-webkit-scrollbar, 
      body::-webkit-scrollbar {
        display: none !important;
      }
    `;
    
    document.head.appendChild(style);

    // יצירת כפתור יחיד ויציב
    const createStableButton = () => {
      const button = document.createElement('div');
      button.id = 'fixed-whatsapp-btn';
      button.className = 'super-whatsapp-button';
      
      // SVG פשוט וקלין
      button.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="pointer-events: none;">
          <circle cx="12" cy="12" r="12" fill="white" opacity="0.95"/>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" fill="#25D366"/>
        </svg>
      `;

      // Event listener יחיד ויציב
      const handleButtonClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        window.open(`https://wa.me/${phoneNumber}`, '_blank', 'noopener,noreferrer');
      };

      button.addEventListener('click', handleButtonClick);
      button.addEventListener('touchend', handleButtonClick);

      // הוספה לDOM
      document.body.appendChild(button);
      
      // סמן שהכפתור נוצר
      button.setAttribute('data-stable', 'true');
    };

    // יצור כפתור אחד בלבד
    createStableButton();

    // ניקוי בלבד - ללא intervals מפריעים
    return () => {
      const styleToRemove = document.getElementById('super-whatsapp-button');
      const buttonToRemove = document.getElementById('fixed-whatsapp-btn');
      if (styleToRemove) styleToRemove.remove();
      if (buttonToRemove) buttonToRemove.remove();
    };
  }, []); // dependencies ריקות - רק פעם אחת!

  // ללא backup component - מניעת כפילות
  return null;
};

export default WhatsAppButton;