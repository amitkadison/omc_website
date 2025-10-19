import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

const useMedia = (queries, values, defaultValue) => {
  const get = () =>
    values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;

  const [value, setValue] = useState(get);

  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener("change", handler));
    return () =>
      queries.forEach((q) =>
        matchMedia(q).removeEventListener("change", handler)
      );
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async (urls) => {
  await Promise.all(
    urls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Masonry = ({
  items,
  ease = "power3.out",
  duration = 0.6,
  stagger = 0.1,
  animateFrom = "top",
  scaleOnHover = true,
  hoverScale = 0.98,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    [
      "(min-width:1200px)",
      "(min-width:900px)", 
      "(min-width:600px)",
    ],
    [4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    preloadImages(items.map((i) => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width || width < 100) return [];

    // ✅ חישוב פשוט ונקי
    const gap = 8;
    const padding = 12; // padding קטן
    const availableWidth = width - (padding * 2);
    const columnWidth = (availableWidth - gap * (columns - 1)) / columns;
    
    // ✅ דיבאג ברור
    console.log('📐 Masonry Debug:', {
      'Container Width': width,
      'Available Width': availableWidth,
      'Columns': columns,
      'Column Width': columnWidth,
      'Gap': gap,
      'Padding': padding
    });

    // ✅ וידוא שהחישוב הגיוני
    if (columnWidth < 50) {
      console.warn('⚠️ Column width too small:', columnWidth);
      return [];
    }

    const colHeights = new Array(columns).fill(0);

    return items.map((child, index) => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = padding + (columnWidth + gap) * col; // ✅ חישוב פשוט
      
      // ✅ גובה פשוט ויעיל
      const minHeight = 200;
      const maxHeight = 500;
      const aspectRatio = child.height / 400;
      const height = Math.max(minHeight, Math.min(maxHeight, columnWidth * aspectRatio));
      const y = colHeights[col];

      colHeights[col] += height + gap;

      // ✅ דיבאג לכל פריט
      if (index < 3) {
        console.log(`📦 Item ${index}:`, { x, y, width: columnWidth, height, col });
      }

      return { 
        ...child, 
        x, 
        y, 
        w: columnWidth, 
        h: height,
        col // ✅ עמודה לדיבאג
      };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return;

    console.log('🎬 Starting animations for', grid.length, 'items');

    grid.forEach((item, index) => {
      const element = document.querySelector(`[data-key="${item.id}"]`);
      
      if (!element) {
        console.warn(`❌ Element not found for item ${item.id}`);
        return;
      }

      // ✅ מיקום ישיר ללא אנימציה בהתחלה (לדיבאג)
      gsap.set(element, {
        position: 'absolute',
        left: item.x,
        top: item.y,
        width: item.w,
        height: item.h,
        opacity: 1, // ✅ ודאי שנראה
        scale: 1,
        zIndex: 1
      });

      // ✅ רק אחרי שהמיקום נקבע, עושים אנימציה
      if (!hasMounted.current) {
        // התחלה מלמעלה
        gsap.fromTo(element, 
          {
            y: item.y - 300,
            opacity: 0,
            scale: 0.8
          },
          {
            y: item.y,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            delay: index * stagger
          }
        );
      }
    });

    hasMounted.current = true;
  }, [grid, imagesReady, stagger]);

  const handleMouseEnter = (e, item) => {
    const element = e.currentTarget;
    
    if (scaleOnHover) {
      gsap.to(element, {
        scale: hoverScale,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  const handleMouseLeave = (e, item) => {
    const element = e.currentTarget;
    
    if (scaleOnHover) {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  };

  // ✅ גובה מחושב
  const containerHeight = useMemo(() => {
    if (grid.length === 0) return 800;
    const heights = new Array(columns).fill(0);
    grid.forEach((item) => {
      const col = item.col;
      heights[col] = Math.max(heights[col], item.y + item.h);
    });
    return Math.max(...heights) + 20;
  }, [grid, columns]);

  return (
    <>
      {/* ✅ דיבאג אינפו */}
      <div style={{
        position: 'fixed',
        top: '70px',
        left: '10px',
        background: 'rgba(255, 0, 0, 0.9)',
        color: 'white',
        padding: '10px',
        borderRadius: '8px',
        fontSize: '12px',
        zIndex: 9999,
        fontFamily: 'monospace'
      }}>
        Container: {width}px<br/>
        Grid Items: {grid.length}<br/>
        Columns: {columns}<br/>
        Height: {containerHeight}px<br/>
        Images Ready: {imagesReady ? '✓' : '✗'}
      </div>

      <div 
        ref={containerRef} 
        className="list" 
        style={{ 
          width: '100%',
          height: containerHeight,
          position: 'relative',
          margin: 0,
          padding: 0,
          border: '2px solid lime', // ✅ גבול ירוק לדיבאג
          backgroundColor: 'rgba(255, 255, 0, 0.1)' // ✅ רקע צהוב לדיבאג
        }}
      >
        {grid.map((item, index) => (
          <div
            key={item.id}
            data-key={item.id}
            className="item-wrapper"
            onClick={() => console.log('Image clicked:', item.id)}
            onMouseEnter={(e) => handleMouseEnter(e, item)}
            onMouseLeave={(e) => handleMouseLeave(e, item)}
            style={{
              position: 'absolute',
              // ✅ מיקום ישיר לדיבאג
              left: item.x,
              top: item.y,
              width: item.w,
              height: item.h,
              cursor: 'pointer',
              border: '1px solid red', // ✅ גבול אדום לכל תמונה
              boxSizing: 'border-box'
            }}
          >
            <div
              className="item-img"
              style={{ 
                backgroundImage: `url(${item.img})`,
                width: '100%',
                height: '100%',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '8px',
                backgroundColor: 'rgba(0, 0, 255, 0.2)' // ✅ רקע כחול לדיבאג
              }}
            />
            
            {/* ✅ מספר התמונה לדיבאג */}
            <div style={{
              position: 'absolute',
              top: '5px',
              left: '5px',
              background: 'red',
              color: 'white',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {index + 1}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Masonry;
