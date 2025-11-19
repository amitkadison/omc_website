import { useEffect } from 'react';
import clarity from '@microsoft/clarity';

/**
 * Microsoft Clarity Analytics Component
 * מספק ניתוח התנהגות משתמשים, heatmaps, session recordings ו-insights
 */
const ClarityAnalytics = () => {
  useEffect(() => {
    // Initialize Microsoft Clarity
    // החלף ב-Project ID האמיתי שלך מ-Clarity Dashboard
    const clarityProjectId = process.env.REACT_APP_CLARITY_PROJECT_ID;

    if (clarityProjectId) {
      try {
        clarity.init(clarityProjectId);
        console.log('✓ Microsoft Clarity initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Microsoft Clarity:', error);
      }
    } else {
      console.warn('Microsoft Clarity Project ID not found in environment variables');
    }
  }, []);

  return null; // This is a utility component, no UI needed
};

export default ClarityAnalytics;
