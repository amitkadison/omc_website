// components/UnicornScene.tsx
import React, { useEffect, useRef } from 'react';

export default function UnicornScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // בדיקה אם הסקריפט כבר נטען
    if (!document.getElementById('unicornstudio-sdk')) {
      const script = document.createElement('script');
      script.id = 'unicornstudio-sdk';
      script.src = '/vendors/unicornStudio.umd.js'; // ✅ הנתיב הנכון
      script.async = true;

      script.onload = () => {
        // @ts-ignore
        if (window.UnicornStudio) {
          // @ts-ignore
          window.UnicornStudio.init();
        }
      };

      document.body.appendChild(script);
    } else {
      // אם כבר נטען
      // @ts-ignore
      if (window.UnicornStudio) {
        // @ts-ignore
        window.UnicornStudio.init();
      }
    }

    return () => {
      // ניקוי זיכרון
      // @ts-ignore
      if (window.UnicornStudio?.destroy) {
        // @ts-ignore
        window.UnicornStudio.destroy();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="unicorn-embed"
      data-us-project="oAGppPAUFHOl7p0nFBsC"
      data-us-scale="1"
      data-us-dpi="1.5"
      data-us-lazyload="true"
      data-us-production="true"
      style={{ width: '100%', height: '900px' }}
    ></div>
  );
}
