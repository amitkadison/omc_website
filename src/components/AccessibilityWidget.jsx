import React, { useState } from 'react';
import './AccessibilityWidget.css';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  const increaseFontSize = () => {
    const newSize = fontSize + 2;
    setFontSize(newSize);
    document.body.style.fontSize = `${newSize}px`;
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(10, fontSize - 2);
    setFontSize(newSize);
    document.body.style.fontSize = `${newSize}px`;
  };

  const toggleHighContrast = () => {
    const newState = !highContrast;
    setHighContrast(newState);
    if (newState) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  };

  const toggleDarkMode = () => {
    const newState = !darkMode;
    setDarkMode(newState);
    if (newState) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  const toggleUnderlineLinks = () => {
    const newState = !underlineLinks;
    setUnderlineLinks(newState);
    if (newState) {
      document.body.classList.add('underline-links');
    } else {
      document.body.classList.remove('underline-links');
    }
  };

  return (
    <div className="accessibility-widget">
      <button 
        className="accessibility-button"
        onClick={togglePanel}
        aria-label="פתח תפריט נגישות"
      >
        ♿
      </button>
      
      {isOpen && (
        <div className="accessibility-panel">
          <h3 className="panel-title">נגישות</h3>
          <ul className="accessibility-options">
            <li onClick={increaseFontSize}>
              🔎 הגדלת גופן
            </li>
            <li onClick={decreaseFontSize}>
              🔍 הקטנת גופן
            </li>
            <li onClick={toggleHighContrast}>
              {highContrast ? '❌ בטל ניגודיות' : '⚫ ניגודיות גבוהה'}
            </li>
            <li onClick={toggleDarkMode}>
              {darkMode ? '❌ בטל מצב כהה' : '🌙 מצב כהה'}
            </li>
            <li onClick={toggleUnderlineLinks}>
              {underlineLinks ? '❌ בטל קו תחתון' : '🔗 הוסף קו תחתון לקישורים'}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccessibilityWidget;