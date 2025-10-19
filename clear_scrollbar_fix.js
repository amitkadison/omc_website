// פתרון מיידי לבעיית הגלילה - הרץ ב-Console של הדפדפן
console.log('🔧 מתחיל תיקון בעיית הגלילה...');

// נקה את כל ההגדרות הבעייתיות
document.body.style.cssText = 'min-height: 100vh !important; overflow-y: auto !important;';
document.documentElement.style.cssText = 'overflow-y: auto !important;';
document.getElementById('root').style.cssText = 'min-height: 100vh !important;';

// הצג את ה-scrollbar
Array.from(document.styleSheets).forEach(sheet => {
  try {
    Array.from(sheet.cssRules).forEach(rule => {
      if (rule.style && rule.style.overflow === 'hidden') {
        rule.style.overflow = 'visible';
        console.log('✅ תוקן overflow hidden ב:', rule.selectorText);
      }
    });
  } catch(e) {
    console.log('⚠️ לא ניתן לגשת ל-styleSheet:', e.message);
  }
});

// ביטול הסתרות scrollbar
const style = document.createElement('style');
style.textContent = `
  body::-webkit-scrollbar {
    display: block !important;
    width: 12px !important;
  }
  
  body::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1) !important;
    border-radius: 6px !important;
  }
  
  body::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #C0C0C0 0%, #808080 50%, #404040 100%) !important;
    border-radius: 6px !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
  }
  
  * {
    scrollbar-width: auto !important;
    -ms-overflow-style: auto !important;
  }
  
  *::-webkit-scrollbar {
    display: block !important;
  }
`;
document.head.appendChild(style);

console.log('✅ תיקון הושלם! ה-scrollbar אמור להיות גלוי עכשיו.');
console.log('📱 אם עדיין יש בעיה במובייל, נסה לגלול עם האצבע');
