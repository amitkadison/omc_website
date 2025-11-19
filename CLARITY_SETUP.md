# Microsoft Clarity - הוראות התקנה והגדרה

## מה זה Microsoft Clarity?

Microsoft Clarity הוא כלי חינמי לניתוח התנהגות משתמשים באתר שלך, הכולל:
- 📹 **Session Recordings** - הקלטות של גלישת משתמשים
- 🔥 **Heatmaps** - מפות חום שמראות איפה משתמשים לוחצים וגוללים
- 📊 **Insights** - תובנות אוטומטיות על התנהגות משתמשים
- 🤖 **Clarity Copilot** - AI שמספק סיכומים ותובנות חכמות

## התקנה שבוצעה

✅ הותקנה חבילת `@microsoft/clarity`
✅ נוצרה קומפוננטת `ClarityAnalytics.jsx`
✅ הקומפוננטה שולבה ב-`AppRouter.jsx`
✅ נוספו משתני סביבה ב-`.env.local` ו-`.env.production`

## שלבי הגדרה

### 1. יצירת פרויקט Clarity

1. עבור לאתר: https://clarity.microsoft.com/
2. התחבר עם חשבון Microsoft (או צור חשבון חדש)
3. לחץ על **"New Project"**
4. מלא את הפרטים:
   - **Project name**: שם האתר שלך (לדוגמה: "OMC Website")
   - **Website URL**: https://yourwebsite.com
5. לחץ על **"Add new project"**

### 2. קבלת Project ID

1. לאחר יצירת הפרויקט, עבור ל-**Settings** > **Overview**
2. העתק את **Project ID** (מחרוזת של 10 תווים, לדוגמה: `abc123def4`)

### 3. עדכון משתני הסביבה

פתח את הקובץ `.env.local` (לפיתוח) ו-`.env.production` (לפרודקשן):

```env
REACT_APP_CLARITY_PROJECT_ID=YOUR_CLARITY_PROJECT_ID_HERE
```

החלף את `YOUR_CLARITY_PROJECT_ID_HERE` ב-Project ID שהעתקת.

**דוגמה:**
```env
REACT_APP_CLARITY_PROJECT_ID=abc123def4
```

### 4. הפעלה מחדש של השרת

לאחר עדכון משתני הסביבה, הפעל מחדש את שרת הפיתוח:

```bash
npm start
```

## בדיקת התקנה תקינה

1. פתח את האתר בדפדפן
2. פתח את ה-Console (F12)
3. בדוק שאתה רואה הודעה: `✓ Microsoft Clarity initialized successfully`
4. עבור לדשבורד של Clarity: https://clarity.microsoft.com/projects
5. בחר בפרויקט שלך
6. תוך מספר דקות תתחיל לראות נתונים על משתמשים שביקרו באתר

## שימוש מתקדם (אופציונלי)

### Identify API - זיהוי משתמשים

אם יש לך מערכת משתמשים, תוכל לזהות משתמשים ספציפיים:

```javascript
import clarity from '@microsoft/clarity';

// בעמוד התחברות או בעת טעינת פרופיל משתמש
clarity.identify(
  userId,           // מזהה ייחודי של המשתמש
  customSessionId,  // מזהה סשן מותאם אישית (אופציונלי)
  customPageId,     // מזהה עמוד מותאם אישית (אופציונלי)
  friendlyName      // שם ידידותי (אופציונלי)
);
```

### Custom Tags - תיוג מותאם אישית

תייג סשנים לפי קריטריונים שונים:

```javascript
import clarity from '@microsoft/clarity';

// תיוג לפי סוג משתמש
clarity.setTag('userType', 'premium');

// תיוג לפי התנהגות
clarity.setTag('completedPurchase', 'true');

// תיוג מרובה
clarity.setTag('interests', ['design', 'marketing', 'tech']);
```

### Custom Events - אירועים מותאמים אישית

עקוב אחרי אירועים ספציפיים:

```javascript
import clarity from '@microsoft/clarity';

// כפתור "צור קשר" נלחץ
clarity.event('contact_form_opened');

// השלמת רכישה
clarity.event('purchase_completed');

// הורדת קובץ
clarity.event('file_downloaded');
```

### Upgrade Session - עדיפות גבוהה לסשנים חשובים

תעדף הקלטה של סשנים מסוימים:

```javascript
import clarity from '@microsoft/clarity';

// סמן סשן כחשוב
clarity.upgrade('user_encountered_error');
```

## דוגמה לשימוש בקומפוננטה

ניתן להוסיף tracking לאירועים ספציפיים בקומפוננטות שלך:

```javascript
import clarity from '@microsoft/clarity';

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    // עקוב אחרי שליחת טופס
    clarity.event('contact_form_submitted');

    // המשך עם לוגיקת השליחה...
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
};
```

## הגנת פרטיות

Clarity כבר מוגדר להגן על פרטיות המשתמשים:
- טפסים רגישים מוסתרים אוטומטית
- מידע רגיש במסך מטושטש
- אין אחסון של מידע אישי מזהה ללא הסכמה

### הסכמת עוגיות (GDPR/CCPA)

אם נדרשת הסכמת משתמש לעוגיות, השתמש ב-API הזה:

```javascript
import clarity from '@microsoft/clarity';

// המתן להסכמת משתמש
userConsentGiven().then(() => {
  clarity.consent(true);
});

// אם המשתמש דחה
clarity.consent(false);
```

## קישורים שימושיים

- 📚 [תיעוד Clarity](https://docs.microsoft.com/en-us/clarity/)
- 🎯 [דשבורד Clarity](https://clarity.microsoft.com/projects)
- 💬 [תמיכה](mailto:clarityms@microsoft.com)
- 🔒 [מדיניות פרטיות](https://privacy.microsoft.com/en-us/privacystatement)

## פתרון בעיות

### לא רואה הודעה בקונסול

1. בדוק ש-Project ID מוגדר נכון ב-`.env.local`
2. וודא שהפעלת מחדש את שרת הפיתוח
3. בדוק שהקומפוננטה `<ClarityAnalytics />` מוטמעת ב-`AppRouter.jsx`

### לא רואה נתונים ב-Clarity Dashboard

1. המתן 2-3 דקות - Clarity מעדכן נתונים בהשהיה קלה
2. וודא שה-Project ID נכון
3. בדוק שאין Ad Blockers שחוסמים את Clarity
4. נסה לנווט בין מספר עמודים באתר

### שגיאת "Failed to initialize"

1. וודא שחבילת `@microsoft/clarity` מותקנת: `npm list @microsoft/clarity`
2. נסה להתקין מחדש: `npm install @microsoft/clarity`
3. בדוק שה-Project ID תקין (10 תווים)

---

**זכור:** Microsoft Clarity הוא כלי חינמי לחלוטין, ללא הגבלת תעבורה! 🎉
