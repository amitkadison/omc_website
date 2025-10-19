import { useEffect, useState } from 'react';
import AppRouter from './components/AppRouter';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import './scrollbar-fix.css';

function App() {
  const [currentLocation, setCurrentLocation] = useState(window.location);
  const [isParallaxPage, setIsParallaxPage] = useState(false);

  useEffect(() => {
    // זיהוי דפים שמשתמשים בפרלקס (Framer Motion)
    const parallaxPages = ['/services', '/services-page', '/parallax'];
    const currentPath = currentLocation?.pathname || '';
    const isCurrentlyParallaxPage = parallaxPages.some(page => 
      currentPath.includes(page)
    );
    
    setIsParallaxPage(isCurrentlyParallaxPage);

    // אם זה דף פרלקס - השבת AOS
    if (isCurrentlyParallaxPage) {
      // השבתת AOS
      AOS.refreshHard();
      
      // הסרת כל האטריביוטים של AOS
      const elementsWithAOS = document.querySelectorAll('[data-aos]');
      elementsWithAOS.forEach(el => {
        el.removeAttribute('data-aos');
        el.removeAttribute('data-aos-duration');
        el.removeAttribute('data-aos-delay');
        el.removeAttribute('data-aos-easing');
        el.removeAttribute('data-aos-offset');
        el.removeAttribute('data-aos-anchor');
        el.removeAttribute('data-aos-anchor-placement');
      });

      console.log('🚫 AOS disabled for parallax page');
      return;
    }

    // הפעלת AOS לדפים רגילים
    AOS.init({
      duration: 1000,
      once: true,
      offset: 120,
      easing: 'ease-in-out',
      disable: false,
      mirror: false,
      anchorPlacement: 'top-bottom'
    });

    const timer = setTimeout(() => {
      AOS.refresh();
    }, 100);

    const handleResize = () => {
      if (!isCurrentlyParallaxPage) {
        AOS.refresh();
      }
    };

    window.addEventListener('resize', handleResize);

    console.log('✅ AOS enabled for standard page');

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentLocation]);

  // הוספת קלאס לbody בהתאם לסוג הדף
  useEffect(() => {
    const body = document.body;
    
    if (isParallaxPage) {
      body.classList.add('parallax-page');
      body.classList.remove('aos-page');
      // הגדרות CSS לדפי פרלקס
      body.style.scrollBehavior = 'smooth';
      body.style.overflowX = 'hidden';
    } else {
      body.classList.add('aos-page');
      body.classList.remove('parallax-page');
      // הגדרות CSS לדפים רגילים
      body.style.scrollBehavior = 'auto';
    }

    return () => {
      body.classList.remove('parallax-page', 'aos-page');
    };
  }, [isParallaxPage]);

  return <AppRouter />;
}

export default App;
