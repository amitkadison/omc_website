// components/DangerousMode.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DangerousMode = () => {
  const [isActive, setIsActive] = useState(() => {
    return localStorage.getItem('dangerous-mode') === 'true';
  });
  const [isOpen, setIsOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState({});
  const [performanceStats, setPerformanceStats] = useState({});
  const [forceMobile, setForceMobile] = useState(false);
  const [showBoundaries, setShowBoundaries] = useState(false);
  const [logLevel, setLogLevel] = useState('info');
  const [keySequence, setKeySequence] = useState('');
  const performanceRef = useRef({});

  // Secret key combination to activate: DANGER
  const secretKey = 'DANGER';
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Guard against undefined, null, or empty key
      if (!e || !e.key || typeof e.key !== 'string') return;
      
      setKeySequence(prevSequence => {
        const newSequence = (prevSequence + e.key.toUpperCase()).slice(-6);
        
        if (newSequence === secretKey) {
          toggleDangerousMode();
          return '';
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []); // Remove keySequence from dependencies to prevent re-adding listeners

  // Performance monitoring
  useEffect(() => {
    if (!isActive) return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      setPerformanceStats(prev => ({
        ...prev,
        paintEntries: entries.filter(entry => entry.entryType === 'paint'),
        navigationEntries: entries.filter(entry => entry.entryType === 'navigation'),
        resourceEntries: entries.filter(entry => entry.entryType === 'resource').slice(-10)
      }));
    });

    observer.observe({entryTypes: ['paint', 'navigation', 'resource']});

    return () => observer.disconnect();
  }, [isActive]);

  // Debug info collection
  useEffect(() => {
    if (!isActive) return;

    const updateDebugInfo = () => {
      setDebugInfo({
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          pixelRatio: window.devicePixelRatio
        },
        browser: {
          userAgent: navigator.userAgent,
          language: navigator.language,
          cookieEnabled: navigator.cookieEnabled
        },
        performance: {
          memory: performance.memory ? {
            used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
            total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB',
            limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + 'MB'
          } : 'Not available',
          timing: performance.timing
        },
        location: window.location,
        timestamp: new Date().toISOString()
      });
    };

    updateDebugInfo();
    const interval = setInterval(updateDebugInfo, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  const toggleDangerousMode = () => {
    const newState = !isActive;
    setIsActive(newState);
    localStorage.setItem('dangerous-mode', newState.toString());
    
    if (newState) {
      console.log('🚨 DANGEROUS MODE ACTIVATED 🚨');
      console.log('Available features:');
      console.log('- Performance monitoring');
      console.log('- Debug information');
      console.log('- Component boundaries');
      console.log('- Mobile simulation');
      console.log('- Enhanced logging');
    } else {
      console.log('✅ Dangerous Mode deactivated');
    }
  };

  const toggleMobileSimulation = () => {
    setForceMobile(!forceMobile);
    // Force a resize event to trigger responsive updates
    window.dispatchEvent(new Event('resize'));
    
    if (!forceMobile) {
      // Override window.innerWidth for mobile simulation
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667
      });
    } else {
      // Restore original values
      delete window.innerWidth;
      delete window.innerHeight;
    }
    window.dispatchEvent(new Event('resize'));
  };

  const exportDebugInfo = () => {
    const debugData = {
      debugInfo,
      performanceStats,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    const blob = new Blob([JSON.stringify(debugData, null, 2)], {
      type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-report-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    if ('caches' in window) {
      caches.keys().then(names => {
        names.forEach(name => caches.delete(name));
      });
    }
    console.log('🧹 Cache cleared');
  };

  if (!isActive) return null;

  return (
    <>
      {/* Component boundaries overlay */}
      {showBoundaries && (
        <style>{`
          * {
            outline: 1px solid rgba(255, 0, 0, 0.3) !important;
            outline-offset: -1px !important;
          }
          div {
            outline-color: rgba(0, 255, 0, 0.3) !important;
          }
          section {
            outline-color: rgba(0, 0, 255, 0.3) !important;
          }
        `}</style>
      )}

      {/* Floating activation button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          background: 'linear-gradient(135deg, #ff4757, #ff3742)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(255, 71, 87, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        title="Dangerous Mode Panel"
      >
        ⚠️
      </motion.button>

      {/* Debug panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 500 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '400px',
              height: '100vh',
              background: 'rgba(20, 20, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              color: 'white',
              zIndex: 9998,
              overflowY: 'auto',
              padding: '80px 20px 20px',
              fontFamily: 'Monaco, Consolas, monospace',
              fontSize: '12px',
              borderLeft: '2px solid rgba(255, 71, 87, 0.5)'
            }}
          >
            <h2 style={{ color: '#ff4757', marginBottom: '20px', fontSize: '16px' }}>
              ⚠️ DANGEROUS MODE
            </h2>

            {/* Control buttons */}
            <div style={{ marginBottom: '20px' }}>
              <button
                onClick={toggleMobileSimulation}
                style={{
                  background: forceMobile ? '#2ed573' : '#333',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  margin: '2px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                {forceMobile ? '📱 Mobile ON' : '💻 Desktop'}
              </button>
              
              <button
                onClick={() => setShowBoundaries(!showBoundaries)}
                style={{
                  background: showBoundaries ? '#2ed573' : '#333',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  margin: '2px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                {showBoundaries ? '🔍 Boundaries ON' : '🔍 Boundaries'}
              </button>

              <button
                onClick={exportDebugInfo}
                style={{
                  background: '#ffa502',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  margin: '2px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                📊 Export
              </button>

              <button
                onClick={clearCache}
                style={{
                  background: '#ff4757',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  margin: '2px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                🧹 Clear Cache
              </button>

              <button
                onClick={() => setIsActive(false)}
                style={{
                  background: '#747d8c',
                  color: 'white',
                  border: 'none',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  margin: '2px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                ❌ Disable
              </button>
            </div>

            {/* Debug Information */}
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#ffa502', fontSize: '14px', marginBottom: '8px' }}>
                🖥️ Viewport
              </h3>
              <div>
                {debugInfo.viewport?.width} × {debugInfo.viewport?.height}<br />
                Pixel Ratio: {debugInfo.viewport?.pixelRatio}
              </div>
            </div>

            {/* Performance Stats */}
            {debugInfo.performance?.memory && (
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ color: '#2ed573', fontSize: '14px', marginBottom: '8px' }}>
                  ⚡ Memory
                </h3>
                <div>
                  Used: {debugInfo.performance.memory.used}<br />
                  Total: {debugInfo.performance.memory.total}<br />
                  Limit: {debugInfo.performance.memory.limit}
                </div>
              </div>
            )}

            {/* Performance Entries */}
            {performanceStats.paintEntries?.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ color: '#5f27cd', fontSize: '14px', marginBottom: '8px' }}>
                  🎨 Paint Timing
                </h3>
                {performanceStats.paintEntries.map((entry, index) => (
                  <div key={index}>
                    {entry.name}: {Math.round(entry.startTime)}ms
                  </div>
                ))}
              </div>
            )}

            {/* Recent Resources */}
            {performanceStats.resourceEntries?.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <h3 style={{ color: '#ff6348', fontSize: '14px', marginBottom: '8px' }}>
                  📦 Resources ({performanceStats.resourceEntries.length})
                </h3>
                {performanceStats.resourceEntries.slice(-5).map((entry, index) => (
                  <div key={index} style={{ fontSize: '10px', marginBottom: '2px' }}>
                    {entry.name.split('/').pop()}: {Math.round(entry.duration)}ms
                  </div>
                ))}
              </div>
            )}

            {/* Console Commands */}
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#ff9ff3', fontSize: '14px', marginBottom: '8px' }}>
                💻 Console Commands
              </h3>
              <div style={{ fontSize: '10px', lineHeight: '1.4' }}>
                • window.dangerousMode.info() - Show all debug info<br />
                • window.dangerousMode.clear() - Clear all caches<br />
                • window.dangerousMode.mobile() - Toggle mobile mode<br />
                • window.dangerousMode.export() - Export debug data
              </div>
            </div>

            <div style={{ 
              fontSize: '10px', 
              color: '#747d8c', 
              marginTop: '20px',
              paddingTop: '10px',
              borderTop: '1px solid #333'
            }}>
              Last updated: {debugInfo.timestamp?.split('T')[1]?.split('.')[0]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Console API */}
      {typeof window !== 'undefined' && (window.dangerousMode = {
        info: () => console.log(debugInfo),
        clear: clearCache,
        mobile: toggleMobileSimulation,
        export: exportDebugInfo,
        boundaries: () => setShowBoundaries(!showBoundaries)
      })}
    </>
  );
};

export default DangerousMode;