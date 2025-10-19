// components/UnicornScene.jsx
import React, { useEffect, useRef } from 'react';
import './UnicornScene.css';

export default function UnicornScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    // אתחול UnicornStudio
    if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
      UnicornStudio.init()
        .then((scenes) => {
          console.log('UnicornStudio scenes are ready');
        })
        .catch((err) => {
          console.error('UnicornStudio error:', err);
        });
      window.UnicornStudio.isInitialized = true;
    }

    return () => {
      // ניקוי זיכרון
      if (window.UnicornStudio?.destroy) {
        window.UnicornStudio.destroy();
      }
    };
  }, []);

  return (
    <>
      {/* CSS להסתרת כפתור UnicornStudio */}
      <style>{`
        /* הסתרת כפתור "MADE WITH UNICORN STUDIO" */
        .unicorn-embed [data-us-branding],
        .unicorn-embed [data-us-branding="true"],
        .unicorn-embed .us-branding,
        .unicorn-embed .us-branding-button,
        .unicorn-embed a[href*="unicorn.studio"],
        .unicorn-embed a[href*="unicornstudio"],
        .unicorn-embed div[style*="unicorn"],
        .unicorn-embed button[style*="unicorn"],
        .unicorn-embed .us-credit,
        .unicorn-embed .us-credit-link {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
        
        /* הסתרת כל אלמנט עם טקסט "unicorn" */
        .unicorn-embed *:contains("unicorn"),
        .unicorn-embed *:contains("Unicorn"),
        .unicorn-embed *:contains("UNICORN") {
          display: none !important;
        }
      `}</style>
      
      <div
        ref={containerRef}
        className="unicorn-embed"
        data-us-project="oAGppPAUFHOl7p0nFBsC"
        data-us-scale="1"
        data-us-dpi="1.5"
        data-us-lazyload="true"
        data-us-production="true"
        style={{ width: '100%', height: '100vh' }}
      ></div>
    </>
  );
} 