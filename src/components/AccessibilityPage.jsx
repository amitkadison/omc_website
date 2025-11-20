import React from 'react';
import { motion } from 'framer-motion';

const AccessibilityPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      direction: 'rtl',
      fontFamily: 'Varela Round, sans-serif',
      background: '#0A0A0A',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '120px'
    }}>
      <style>{`
        .accessibility-page {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 30px 80px;
          color: #CCCCCC;
          line-height: 1.8;
        }

        .accessibility-page h1 {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(180deg, #ffffff 0%, #999999 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 30px;
          text-align: center;
        }

        .accessibility-page h2 {
          font-size: 1.8rem;
          font-weight: 600;
          color: #ffffff;
          margin-top: 40px;
          margin-bottom: 20px;
        }

        .accessibility-page p {
          font-size: 17px;
          margin-bottom: 20px;
          color: #CCCCCC;
        }

        .accessibility-page ul {
          margin: 20px 0;
          padding-right: 25px;
        }

        .accessibility-page li {
          margin-bottom: 10px;
          font-size: 17px;
        }

        .accessibility-page strong {
          color: #ffffff;
          font-weight: 600;
        }

        .contact-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 25px;
          margin-top: 30px;
        }

        .contact-box p {
          margin-bottom: 10px;
        }

        .contact-box a {
          color: #C9A14B;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-box a:hover {
          color: #D4AF5E;
        }

        @media (max-width: 768px) {
          .accessibility-page {
            padding: 30px 20px 60px;
          }

          .accessibility-page h1 {
            font-size: 2.2rem;
          }

          .accessibility-page h2 {
            font-size: 1.5rem;
          }

          .accessibility-page p,
          .accessibility-page li {
            font-size: 16px;
          }
        }
      `}</style>

      <motion.div
        className="accessibility-page"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>הצהרת נגישות</h1>

        <p>
          <strong>omc mixology art</strong>, אחראית על הקמת והפעלת אתר https://www.omcmixologyart.com.
          אנו רואים חשיבות רבה במתן שירות שוויוני לכלל האזרחים ובשיפור השירות הניתן לאזרחים עם מוגבלות.
        </p>

        <p>
          אנו משקיעים משאבים רבים בהנגשת האתר והנכסים הדיגיטליים שלנו על מנת להפוך את שירותי החברה
          לזמינים יותר עבור אנשים עם מוגבלות.
        </p>

        <p>
          במדינת ישראל כ-20 אחוזים מקרב האוכלוסייה הינם אנשים עם מוגבלות הזקוקים לנגישות דיגיטלית,
          על מנת לצרוך מידע ושירותים כללים.
        </p>

        <p>
          הנגשת האתר של <strong>omc mixology art</strong>, נועדה להפוך אותו לזמין, ידידותי ונוח יותר לשימוש
          עבור אוכלוסיות עם צרכים מיוחדים, הנובעים בין היתר ממוגבלויות מוטוריות שונות, לקויות קוגניטיביות,
          קוצר רואי, עיוורון או עיוורון צבעים, לקויות שמיעה וכן אוכלוסייה הנמנית על בני הגיל השלישי.
        </p>

        <p>
          הנגשת אתר זה בוצעה על ידי חברת הנגשת האתרים <strong>"Vee הנגשת אתרים"</strong>.
        </p>

        <h2>רמת הנגישות באתר - AA</h2>

        <p>
          חברת "Vee", התאימה את נגישות האתר לדפדפנים הנפוצים ולשימוש בטלפון הסלולרי ככל הניתן,
          והשתמשה בבדיקותיה בקוראי מסך מסוג Jaws ו- NVDA.
        </p>

        <p>
          מקפידה על עמידה בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות 5568 התשע"ג 2013 ברמת AA.
          וכן, מיישמת את המלצות מסמך WCAG2.2 מאת ארגון W3C.
        </p>

        <ul>
          <li>בעברית: הנחיות לנגישות תכנים באינטרנט</li>
          <li>באנגלית: Web Content Accessibility Guidelines (WCAG) 2.0</li>
        </ul>

        <p>
          הנגשת האתר בוצעה בהתאם להנחיות רשות התקשוב להנגשת יישומים בדפדפני אינטרנט.
        </p>

        <h2>כיצד עוברים למצב נגיש?</h2>

        <p>
          באתר מוצב אייקון נגישות (בד"כ בדפנות האתר). לחיצה על האייקון מאפשרת פתיחת של תפריט הנגישות.
          לאחר בחירת הפונקציה המתאימה בתפריט יש להמתין לטעינת הדף ולשינוי הרצוי בתצוגה (במידת הצורך).
        </p>

        <p>
          במידה ומעוניינים לבטל את הפעולה, יש ללחוץ על הפונקציה בתפריט פעם שניה. בכל מצב, ניתן לאפס הגדרות נגישות.
        </p>

        <p>
          התוכנה פועלת בדפדפנים הפופולריים: Chrome, Firefox, Safari, Opera בכפוף (תנאי יצרן)
          הגלישה במצב נגישות מומלצת בדפדפן כרום.
        </p>

        <p>
          האתר מספק מבנה סמנטי עבור טכנולוגיות מסייעות ותמיכה בדפוס השימוש המקובל להפעלה עם מקלדת
          בעזרת מקשי החיצים, Enter ו- Esc ליציאה מתפריטים וחלונות.
        </p>

        <p>
          לצורך קבלת חווית גלישה מיטבית עם תוכנת הקראת מסך, אנו ממליצים לשימוש בתוכנת NVDA העדכנית ביותר.
        </p>

        <h2>תיקונים והתאמות שבוצעו באתר:</h2>

        <ul>
          <li>התאמה לקורא מסך - התאמת האתר עבור טכנולוגיות מסייעות כגון NVDA , JAWS</li>
          <li>אמצעי הניווט באתר פשוטים וברורים</li>
          <li>תכני האתר כתובים באופן ברור, מסודר והיררכי</li>
          <li>האתר מותאם לצפייה בדפדפנים מודרניים</li>
          <li>התאמת האתר לתצוגה תואמת מגוון מסכים ורזולוציות</li>
          <li>כל הדפים באתר בעלי מבנה קבוע (H1/H2/H3 וכו')</li>
          <li>לכל התמונות באתר יש הסבר טקסטואלי חלופי (alt)</li>
        </ul>

        <h2>פונקציונליות תוכנת נגישות:</h2>

        <ul>
          <li>התאמה לקורא מסך - התאמת האתר עבור טכנולוגיות מסייעות כגון NVDA , JAWS</li>
          <li>עצירת הבהובים - עצירת אלמנטים נעים וחסימת אנימציות</li>
          <li>דילוג ישיר לתוכן - דילוג על התפריט הראשי ישירות אל התוכן</li>
          <li>התאמה לניווט מקלדת</li>
          <li>הגדלה / הקטנה של טקסט</li>
          <li>ריווח בין אותיות / מילים / שורות</li>
          <li>ניגודיות וצבע - גבוהה, הפוכה, שחור לבן</li>
          <li>גופן קריא</li>
          <li>הדגשת קישורים</li>
          <li>מדריך קריאה</li>
          <li>שינוי אייקון סמן עכבר</li>
          <li>תיאור לתמונות</li>
        </ul>

        <h2>החרגות</h2>

        <p>
          חשוב לציין, כי למרות מאמצינו להנגיש את כלל הדפים והאלמנטים באתר, ייתכן שיתגלו חלקים או יכולות
          שלא הונגשו כראוי או שטרם הונגשו.
        </p>

        <p>
          אנו פועלים לשפר את נגישות האתר שלנו כל העת, כחלק ממחויבותנו לאפשר לכלל האוכלוסייה להשתמש בו,
          כולל אנשים עם מוגבלות.
        </p>

        <h2>יצירת קשר בנושא נגישות</h2>

        <p>
          במידה ונתקלתם בבעיה בנושא נגישות באתר, נשמח לקבל הערות ובקשות באמצעות פנייה לרכז הנגישות שלנו:
        </p>

        <p>
          על מנת שנוכל לטפל בבעיה בדרך הטובה ביותר, אנו ממליצים מאוד לצרף פרטים מלאים ככל שניתן:
        </p>

        <ul>
          <li>תיאור הבעיה</li>
          <li>מהי הפעולה שניסיתם לבצע</li>
          <li>קישור לדף שבו גלשתם</li>
          <li>סוג הדפדפן וגרסתו</li>
          <li>מערכת הפעלה</li>
          <li>סוג הטכנולוגיה המסייעת (במידה והשתמשתם)</li>
        </ul>

        <p>
          <strong>omc mixology art</strong> תעשה ככל יכולה על מנת להנגיש את האתר בצורה המיטבית
          ולענות לפניות בצורה המקצועית והמהירה ביותר.
        </p>

        <div className="contact-box">
          <h2 style={{ marginTop: 0, fontSize: '1.5rem' }}>רכז נגישות:</h2>
          <p><strong>נופר חיון</strong></p>
          <p>טלפון: <a href="tel:0542512095">0542512095</a></p>
          <p>דוא"ל: <a href="mailto:nofar.chayun@gmail.com">nofar.chayun@gmail.com</a></p>
          <p style={{ marginTop: 20, marginBottom: 0 }}>
            <strong>תאריך עדכון הצהרת נגישות: 19-11-2025</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AccessibilityPage;
