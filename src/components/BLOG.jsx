import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import './BLOG.css';
import ContactForm from './ContactForm';

const BlogPage = ({ onNavigateToArticle }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Lazy animation loading
    const timer = setTimeout(() => setShouldAnimate(true), 100);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const heroVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const postVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const featuredVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Responsive animation config
  const getAnimationConfig = (baseConfig) => {
    if (prefersReducedMotion || !shouldAnimate) {
      return { initial: {}, animate: {}, transition: {} };
    }
    return isMobile ? { ...baseConfig, transition: { duration: 0 } } : baseConfig;
  };

  const blogPosts = [
    {
      id: 1,
      title: "10 הקוקטיילים שהכי אהובים באירועים בישראל – ומה כדאי לשים בתפריט שלכם",
      excerpt: "גלו את 10 הקוקטיילים שהכי אהובים באירועים בישראל עם שילוב של קלאסיקות נצחיות, טעמים מרעננים וגרסאות ללא אלכוהול",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800",
      category: "טיפים מקצועיים",
      date: "15 בינואר 2025",
      readTime: "5 דקות",
      featured: true,
      heroImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200",
      content: [
        {
          type: "h2",
          text: "המדריך המלא לקוקטיילים המובילים באירועים בישראל"
        },
        {
          type: "p",
          text: "אין אירוע מושלם בלי קוקטיילים מעולים. הנה המדריך המלא עם 10 הקוקטיילים המובילים לאירועים בישראל, כולל המלצות מקצועיות וטיפים שיעזרו לכם ליצור חוויה בלתי נשכחת לאורחים שלכם."
        },
        {
          type: "h2",
          text: "🍹 מוחיטו – המלך של הקיץ הישראלי"
        },
        {
          type: "p",
          text: "המוחיטו, עם רום, נענע טרייה, ליים וסודה, הוא בחירה מושלמת לאירועים קיציים. הוא קליל, מרענן ולא מכביד, ולכן מתאים במיוחד לאירועי חוץ כמו בגינות או חתונות בשטח פתוח. אפשר להציע גם גרסת מוקטייל ללא אלכוהול – פתרון שמתאים לכל קהל. חפשו מתכונים למוחיטו קל להכנה ותשמחו לגלות כמה קל לרשים!"
        },
        {
          type: "h2",
          text: "🍸 מרגריטה – טעם של חגיגה"
        },
        {
          type: "p",
          text: "המרגריטה הקלאסית, עם טקילה, ליים וקמפרי, היא קוקטייל שתמיד עובד – במיוחד בחתונות ובאירועי חברה. גרסאות פירותיות כמו פסיפלורה, מנגו או תות מוסיפות צבע וטעם, והן מושלמות לצילומים ברשתות החברתיות. נסו להוסיף טוויסט למרגריטה עם מרכיבים מקומיים כמו רימונים בעונה."
        },
        {
          type: "h2",
          text: "🍷 סנגריה – אווירה חגיגית בכוס אחת"
        },
        {
          type: "p",
          text: "סנגריה, קוקטייל יין עם פירות חתוכים, קינמון וסודה, מתאימה גם לחורף וגם לקיץ. היא משדרת קלילות וחברותיות, ותוכלו לשדרג אותה עם יינות ישראליים מהגליל או מהנגב. חפשו מתכון סנגריה ישראלית לטאץ' מקומי אותנטי."
        },
        {
          type: "h2",
          text: "🍹 קוסמופוליטן – אלגנטיות בוורוד"
        },
        {
          type: "p",
          text: "הקוסמופוליטן, עם וודקה, חמוציות וליים, מביא נגיעה של יוקרה לאירועים. הוא פופולרי במיוחד במסיבות רווקות ורווקים, והצבע הוורוד-אדום שלו מושך את העין. נסו קוסמופוליטן קל להכנה כדי להרשים גם בלי מאמץ."
        },
        {
          type: "h2",
          text: "🍹 מוחיטו פסיפלורה – טעם ישראלי טרופי"
        },
        {
          type: "p",
          text: "גרסה ישראלית למוחיטו עם פסיפלורה טרייה מוסיפה מתיקות וצבע צהוב-כתום מדהים. זה קוקטייל שמצטלם נהדר ונותן תחושת חופשה, גם באירוע עסקי. חפשו פסיפלורה טרייה לקוקטיילים בשווקים המקומיים."
        },
        {
          type: "h2",
          text: "🍸 ג'ין טוניק – קלאסיקה מינימליסטית"
        },
        {
          type: "p",
          text: "הג'ין טוניק, עם ג'ין, טוניק ופרוסת לימון, הוא פשוט אך מדויק. תוכלו לגוון עם רוזמרין, מלפפון או פלפל אנגלי, והוא מתאים לכל סוגי האירועים. נסו ג'ין טוניק עם תוספות לטעם ייחודי."
        },
        {
          type: "h2",
          text: "🍹 פינה קולדה – טעם טרופי בישראל"
        },
        {
          type: "p",
          text: "עם רום, חלב קוקוס ואננס, פינה קולדה מביאה את החופים הטרופיים לאירועים פרטיים ומסיבות קיץ. גרסה ללא אלכוהול עם סירופ קוקוס היא גם אופציה מצוינת. חפשו מתכון פינה קולדה קל להתחלה מהירה."
        },
        {
          type: "h2",
          text: "🍸 אולד פאשן – קוקטייל ליודעי דבר"
        },
        {
          type: "p",
          text: "וויסקי, סוכר, ביטר וקליפת תפוז – האולד פאשן משדר יוקרה ואיכות, מתאים לקהל בוגר יותר. הוא פופולרי בישראל בקרב חובבי משקאות מתוחכמים. נסו אולד פאשן ביתי לטעם אישי."
        },
        {
          type: "h2",
          text: "🍹 אפרול שפריץ – טעם איטלקי מרענן"
        },
        {
          type: "p",
          text: "אפרול שפריץ, עם פרוסקו, אפרול וסודה, הוא קוקטייל קליל ומריר-מתוק שמתאים לאירועי ערב. הוא מצטלם נהדר לסטורי ופופולרי במיוחד בקיץ. חפשו אפרול שפריץ מתכון ליצירת אווירה איטלקית."
        },
        {
          type: "h2",
          text: "🍸 מוקטיילים מעוצבים – כולם בחגיגה"
        },
        {
          type: "p",
          text: "לא כל האורחים שותים אלכוהול, ולכן מוקטיילים מעוצבים הם חובה. הכינו גרסאות ללא אלכוהול למוחיטו, מרגריטה ועוד, כדי שכולם ירגישו חלק מהחוויה. נסו רעיונות למוקטיילים עם מיצים טריים."
        }
      ]
    },
    {
      id: 2,
      title: "בר קוקטיילים לחתונה – איך להפוך את הרחבה למרכז חיי הלילה של האירוע",
      excerpt: "מדריך מקצועי ליצירת בר קוקטיילים מושלם שיהפוך את החתונה שלכם לחוויה בלתי נשכחת",
      image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800",
      category: "אירועים",
      date: "12 בינואר 2025",
      readTime: "6 דקות",
      heroImage: "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=1200",
      content: [
        {
          type: "h2",
          text: "בר קוקטיילים לחתונה – המרכיב הסודי של לילה מוצלח"
        },
        {
          type: "p",
          text: "חתונה היא אחד הרגעים המרגשים ביותר בחיים, וכל זוג חולם שהיום הזה יהיה בלתי נשכח עבורו ועבור האורחים. מעבר למוזיקה שמכניסה את כולם לריקודים ואוכל משובח שמפנק את החך, בר קוקטיילים מקצועי יכול להפוך את הרחבה ללב הפועם של האירוע. עם קוקטיילים יצירתיים, שירות אישי ותאורה מרשימה, הבר הזה לא רק מספק משקאות – הוא יוצר חוויה ייחודית שתישאר בזיכרון של כולם."
        },
        {
          type: "h2",
          text: "למה בר קוקטיילים הוא הבחירה המושלמת לחתונה?"
        },
        {
          type: "p",
          text: "בר קוקטיילים לחתונה מציע הרבה יותר מסתם כוס משקה. הוא הופך את השתייה לחלק בלתי נפרד מהאווירה, עם יתרונות כמו:"
        },
        {
          type: "ul",
          items: [
            "קוקטיילים מעוצבים: משקאות שמשתלבים עם צבעי האירוע ומוסיפים נופך אסתטי",
            "טעמים מגוונים: משקאות מותאמים אישית שמתאימים לכל טעם, מקלאסיקות ועד חדשנות",
            "אווירה חברתית: ברמנים מיומנים שיוצרים קשר עם האורחים ומעצימים את החוויה"
          ]
        },
        {
          type: "p",
          text: "במקום בר רגיל שמגיש רק בירה או יין, הבר הזה הופך למוקד משיכה שמושך את האורחים לרחבת הריקודים.תכננים נכון, הוא הופך את החתונה ללילה של ממש, עם אנרגיה שזורמת מהבר אל הרחבה."
        },
        {
          type: "h2",
          text: "איך לבחור את הבר המושלם לחתונה שלכם"
        },
        {
          type: "p",
          text: "כדי שהבר יעבוד לטובתכם, חשוב לשים לב לפרטים קטנים:"
        },
        {
          type: "ul",
          items: [
            "מיקום אסטרטגי: הצבו את הבר במרכז הרחבה או קרוב אליה, כך שהוא יהיה נגיש ומושך את תשומת הלב",
            "תפריט מותאם: בחרו קוקטיילים שמתאימים לעונה ולסגנון האירוע, כמו מוחיטו בקיץ או סנגריה חמה בחורף",
            "ברמנים מקצועיים: צוות שיודע לערבב משקאות וגם לשמח את האורחים עם חיוך ושיחה",
            "עיצוב מרשים: תאורה צבעונית, קישוטים תואמי נושא ומיקסולוגיה יצירתית שמוסיפים קסם ויזואלי"
          ]
        },
        {
          type: "p",
          text: "בר מוצלח לא רק משרת את האורחים – הוא הופך לחלק מהחגיגה עצמה."
        },
        {
          type: "h2",
          text: "טיפים לשדרוג חוויית הבר בחתונה"
        },
        {
          type: "p",
          text: "כדי להבטיח שהבר יהיה מרכז האירוע, הנה כמה רעיונות:"
        },
        {
          type: "ul",
          items: [
            "מוקטיילים לכל אחד: הכינו קוקטיילים ללא אלכוהול עם פירות טריים וסירופים, כך גם מי שלא שותה ייהנה",
            "מותאם לעונות: בחרו משקאות קרים עם קרח בקיץ או משקאות חמימים עם תבלינים בחורף",
            "חוויה אינטראקטיבית: תנו לאורחים לערבב קוקטיילים קלים בעצמם עם הדרכה של הברמנים – זה מוסיף כיף וייחודיות"
          ]
        },
        {
          type: "h2",
          text: "הבר כמרכז הרחבה – המרכיב הסודי של לילה מוצלח"
        },
        {
          type: "p",
          text: "כשמשקיעים בעיצוב הבר, בתאורה ובשירות, הרחבה הופכת למוקד האנרגיה של החתונה. תאורה צבעונית שמשתלבת עם צבעי השמלה והאולם יוצרת אפקט ויזואלי מרהיב, בעוד ברמנים מיומנים דואגים שהתור לא יהיה ארוך מדי. תחנות בר קטנות נוספות יכולות לחלק את התנועה ולהבטיח שכולם יקבלו את המשקה המועדף עליהם בזמן."
        },
        {
          type: "h2",
          text: "סיכום – הפכו את החתונה שלכם ללילה בלתי נשכח"
        },
        {
          type: "p",
          text: "בר קוקטיילים לחתונה הוא לא סתם פינוק – הוא כלי שיוצר אווירה, מחבר בין האורחים ומשדרג את הרחבה למרכז חיי הלילה. עם תפריט מותאם אישית, עיצוב מרשים וברמנים מקצועיים, תוכלו להבטיח שכל רגע יהיה חוויה מלאת קסם. השקיעו בבר הזה, והאורחים שלכם ידברו על החתונה שלכם עוד שנים!"
        }
      ]
    },
    {
      id: 3,
      title: "איך לחשב כמה קוקטיילים צריך להזמין לאירוע – טיפים שיחסכו לכם כסף",
      excerpt: "מדריך מקצועי לחישוב מדויק של כמות הקוקטיילים לאירועים, כולל נוסחאות פשוטות וטיפים לחיסכון",
      image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=800",
      category: "טיפים מקצועיים",
      date: "10 בינואר 2025",
      readTime: "7 דקות",
      heroImage: "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=1200",
      content: [
        {
          type: "h2",
          text: "תכנון כמות הקוקטיילים לאירוע – המדריך המלא"
        },
        {
          type: "p",
          text: "תכנון כמות הקוקטיילים לאירוע, בין אם מדובר בחתונה מרגשת, בר/בת מצווה משפחתית או אירוע עסקי חשוב, יכול להיות משימה מאתגרת. חישוב מדויק של הקוקטיילים מאפשר לכם להבטיח שהאורחים יהיו מרוצים ונהנים, תוך חיסכון משמעותי בעלויות ובזבוז מיותר. במדריך זה נחשוף טיפים פרקטיים, נוסחאות פשוטות והמלצות מקצועיות שיעזרו לכם לתכנן בר קוקטיילים איכותי ומותאם אישית לאירוע שלכם. בואו נתחיל!"
        },
        {
          type: "h2",
          text: "למה חשוב לחשב את כמות הקוקטיילים בצורה מדויקת?"
        },
        {
          type: "p",
          text: "חישוב נכון של כמות הקוקטיילים לאירוע הוא מפתח להצלחה. כשמזמינים קוקטיילים, יש לקחת בחשבון גורמים כמו מספר האורחים, משך האירוע, סוגי הקוקטיילים (אלכוהוליים ולא אלכוהוליים) והעדפות הקהל – כמה שותים קוקטיילים ואילו מעדיפים משקאות אחרים. חישוב נכון לא רק חוסך כסף, אלא גם מבטיח שכל אורח ירגיש חלק מהחוויה, בלי להישאר עם עודפי קוקטיילים מיותרים בסוף הערב."
        },
        {
          type: "h2",
          text: "נוסחאות פשוטות לחישוב כמות הקוקטיילים"
        },
        {
          type: "h3",
          text: "1. חישוב לפי מספר אורחים"
        },
        {
          type: "p",
          text: "כלל אצבע פשוט: כל אורח צורך בממוצע 1–2 קוקטיילים לשעה. לדוגמה, באירוע של 4 שעות עם 50 אורחים:"
        },
        {
          type: "p",
          text: "50 אורחים × 1.5 קוקטיילים לשעה × 4 שעות ≈ 300 קוקטיילים."
        },
        {
          type: "p",
          text: "התאימו את הכמות לפי סגנון האירוע – חתונה עשויה לדרוש יותר קוקטיילים מיוחדים, בעוד אירוע עסקי עשוי להסתפק בקוקטיילים קלאסיים."
        },
        {
          type: "h3",
          text: "2. חלוקה לפי סוגי קוקטיילים"
        },
        {
          type: "p",
          text: "חלקו את כמות הקוקטיילים לפי העדפות הקהל:"
        },
        {
          type: "ul",
          items: [
            "קוקטיילים קלאסיים: כ-40% מהקוקטיילים, כמו מוחיטו, מרגריטה וג'ין טוניק",
            "קוקטיילים מיוחדים: כ-35%, קוקטיילים ייחודיים עם טוויסט מקומי או עונתי",
            "מוקטיילים: כ-25%, קוקטיילים ללא אלכוהול למי שלא שותה או נהגים"
          ]
        },
        {
          type: "p",
          text: "חלוקה זו עוזרת לנהל את התקציב בצורה חכמה ולהתאים את תפריט הקוקטיילים לקהל היעד."
        },
        {
          type: "h3",
          text: "3. התאמה לאופי האירוע"
        },
        {
          type: "ul",
          items: [
            "חתונות ואירועי ערב: התמקדו בקוקטיילים יצירתיים ומיוחדים עם עיצוב מרשים",
            "אירועים עסקיים: העדיפו קוקטיילים קלאסיים ומעודנים כמו מרטיני או אולד פאשן",
            "מסיבות פרטיות: הוסיפו גיוון, כולל מוקטיילים צבעוניים ומרעננים"
          ]
        },
        {
          type: "h2",
          text: "טיפים למקסום התקציב והחוויה"
        },
        {
          type: "ul",
          items: [
            "מדידה מדויקת: השתמשו בג'יגר למדידת כמות המשקה בקוקטיילים, כדי למנוע בזבוז",
            "קוקטיילים מותאמים: השקיעו בקוקטיילים מקוריים שמוסיפים ערך בלי להזמין עודפי חומרי גלם",
            "מוקטיילים ללא אלכוהול: הכינו אפשרויות מרעננות לפלח האורחים שאינם שותים – זה חוסך כסף ומרחיב את החוויה",
            "בר נייד: בר קל לתנועה מאפשר ניהול יעיל של קוקטיילים ברחבי האירוע ומפחית עומס על הבר המרכזי",
            "טבלאות חישוב: השתמשו בטבלאות פשוטות לבדיקת כמות הקוקטיילים הנדרשת, כדי להימנע מטעויות"
          ]
        },
        {
          type: "h2",
          text: "טעויות נפוצות שכדאי להימנע מהן"
        },
        {
          type: "ul",
          items: [
            "הזמנת עודף \"ליתר ביטחון\": מובילה לבזבוז כסף ומשאבים על חומרי גלם מיותרים",
            "אי התחשבות בסוגי אורחים: שכחת ילדים, נהגים או מי שממעט בשתיית קוקטיילים עלולה להוביל לחוסר איזון",
            "חישוב לפי בקבוקים: חישוב לפי יחידות במקום קוקטיילים עלול להטעות ולהשפיע על הכמות המדויקת"
          ]
        },
        {
          type: "blockquote",
          text: "חישוב חכם של כמות הקוקטיילים לא רק חוסך מאות שקלים, אלא גם מבטיח חוויית אורחים מושלמת!"
        },
        {
          type: "h2",
          text: "סיכום – תכנון מושלם לאירוע שלכם"
        },
        {
          type: "p",
          text: "תכנון נכון של כמות הקוקטיילים הוא צעד קריטי להצלחת כל אירוע. באמצעות נוסחאות פשוטות, חלוקה נבונה בין סוגי קוקטיילים ושימת לב לפרטים, תוכלו להבטיח חוויה מוצלחת ללא בזבוז מיותר. בר קוקטיילים מקצועי עם תפריט מותאם אישית יוסיף קסם לרחבה ויהפוך את האירוע שלכם לבלתי נשכח. התחילו לתכנן עכשיו ותיהנו מתוצאות מושלמות!"
        }
      ]
    },
    {
      id: 4,
      title: "קוקטיילים - המפתח לאירוע בלתי נשכח",
      excerpt: "איך להפוך קוקטיילים ללב הפועם של האירוע שלך עם טעמים, עיצוב וחוויה שתשאיר רושם",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800",
      category: "טיפים מקצועיים",
      date: "8 בינואר 2025",
      readTime: "5 דקות",
      heroImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1200",
      content: [
        {
          type: "h2",
          text: "קוקטיילים – המפתח לבלתי נשכח באירוע שלך"
        },
        {
          type: "p",
          text: "אם אתה מתכנן אירוע בישראל, בין אם מדובר בחתונה, מסיבת יום הולדת או אירוע עסקי, קוקטיילים הם הדרך המושלמת להפוך את הרחבה למרכז החוויה. כשהדבר היחיד שאני \"מוכר\" הוא קוקטיילים, אני כאן כדי לעזור לך לגלות איך להפוך אותם ללב הפועם של האירוע שלך, עם טעמים, עיצוב וחוויה שתשאיר רושם."
        },
        {
          type: "h2",
          text: "למה קוקטיילים הם הכל באירוע?"
        },
        {
          type: "p",
          text: "קוקטיילים לא רק משמחים את החך – הם יוצרים אווירה ומייצרים חיבור חברתי. עם צבעים עזים, טעמים ייחודיים וקישוטים מרהיבים, הם הופכים כל רגע לשווה צילום. בר קוקטיילים מקצועי מביא:"
        },
        {
          type: "ul",
          items: [
            "חוויה מותאמת: קוקטיילים שמתאימים לנושא האירוע שלך",
            "אינטראקציה: ברמנים שמגישים את המשקאות עם חיוך וסיפור",
            "מרכז אנרגיה: מושך את האורחים לרחבה בזכות הטעמים והעיצוב"
          ]
        },
        {
          type: "blockquote",
          text: "קוקטייל טוב הוא כמו ניצוץ – הוא מדליק את האווירה ומשאיר זיכרון."
        },
        {
          type: "h2",
          text: "התאמת הקוקטיילים לקונספט האירוע"
        },
        {
          type: "p",
          text: "כדי שהקוקטיילים יבלטו, התאימו אותם לסגנון האירוע:"
        },
        {
          type: "ul",
          items: [
            "חתונות: קוקטיילים עם שמות רומנטיים כמו \"אהבה בליים\" או צבעים שמשתלבים עם השמלה",
            "אירועים עסקיים: משקאות אלגנטיים עם טעמים עדינים כמו ג'ין טוניק מוגז",
            "מסיבות: קוקטיילים צבעוניים עם פירות טריים ותוספות כמו מוחיטו פסיפלורה"
          ]
        },
        {
          type: "p",
          text: "הוספת מרכיבים מקומיים כמו רימונים או תמרים מוסיפה טאץ' ישראלי ייחודי."
        },
        {
          type: "h2",
          text: "עיצוב קוקטיילים שגונב את ההצגה"
        },
        {
          type: "p",
          text: "העיצוב של הבר והקוקטיילים הוא חלק מהקסם:"
        },
        {
          type: "ul",
          items: [
            "תאורה: צבעים שתואמים את האירוע, כמו תאורה ורודה לחתונה או כחולה למסיבה",
            "קישוטים: פרחים, עלי נענע או קליפות הדר שמוסיפים נופך ויזואלי",
            "מיקום: הצבה במרכז הרחבה כדי למשוך את האורחים"
          ]
        },
        {
          type: "p",
          text: "קוקטיילים מוגשים עם קרח, תותים או קשיות מעוצבות – כל פרט קטן משנה."
        },
        {
          type: "h2",
          text: "קוקטיילים מותאמים אישית לחוויה בלתי נשכחת"
        },
        {
          type: "p",
          text: "התאימו את הקוקטיילים לטעמים ולסיפור שלך:"
        },
        {
          type: "ul",
          items: [
            "עונתיים: מוחיטו קיצי עם ליים או אפרול שפריץ מרענן",
            "אינטראקטיביים: עמדה שבה האורחים בוחרים מרכיבים ויוצרים משקה משלהם",
            "ללא אלכוהול: מוקטיילים עם סירופים ופירות שמתאימים לכל אחד"
          ]
        },
        {
          type: "p",
          text: "שמות קוקטיילים כמו \"חלום של קיץ\" או \"ריקוד בלילה\" מוסיפים אופי."
        },
        {
          type: "h2",
          text: "טיפים לשדרוג חוויית הקוקטיילים"
        },
        {
          type: "ul",
          items: [
            "בר נייד: תחנות קוקטיילים שזזות ברחבי האירוע ומגבירות את האנרגיה",
            "ברמנים מומחים: צוות שיודע לערבב ולספר על כל משקה",
            "גיוון: שילוב קוקטיילים קלאסיים כמו מרגריטה עם יצירתיים כמו קוסמופוליטן"
          ]
        },
        {
          type: "h2",
          text: "סיכום – קוקטיילים כחלק מהסיפור שלך"
        },
        {
          type: "p",
          text: "קוקטיילים הם לא סתם משקאות – הם הופכים את האירוע שלך לחוויה בלתי נשכחת. עם עיצוב מוקפד, טעמים מותאמים וברמנים מקצועיים, הבר שלך יהיה המרכז שמגבש את האורחים. התחל לתכנן עכשיו והפוך כל רגע לקסום עם קוקטייל מושלם!"
        }
      ]
    },
    {
      id: 5,
      title: "סדנת קוקטיילים לאירועי חברה",
      excerpt: "איך סדנת קוקטיילים יכולה להפוך את אירוע החברה שלכם לחוויה בלתי נשכחת",
      image: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=800",
      category: "סדנאות",
      date: "5 בינואר 2025",
      readTime: "6 דקות",
      heroImage: "https://images.unsplash.com/photo-1534353473418-4cfa6c56fd38?w=1200",
      content: [
        {
          type: "h2",
          text: "סדנת קוקטיילים - חוויה מקצועית ומהנה"
        },
        {
          type: "p",
          text: "סדנת קוקטיילים לאירועי חברה היא דרך מושלמת לשבור את הקרח, ליצור חיבור בין העובדים, ולהעניק להם חוויה ייחודית שהם יזכרו זמן רב."
        },
        {
          type: "h2",
          text: "🎯 למה סדנת קוקטיילים?"
        },
        {
          type: "ul",
          items: [
            "יוצרת אווירה קלילה ומהנה",
            "מאפשרת לעובדים להכיר זה את זה מחוץ למשרד",
            "מלמדת מיומנות חדשה ומעניינת",
            "מתאימה לכל סוגי האירועים"
          ]
        },
        {
          type: "h2",
          text: "🍹 מה כוללת הסדנה?"
        },
        {
          type: "p",
          text: "סדנה מקצועית כוללת הדרכה על קלאסיקות הקוקטיילים, טכניקות הכנה, והזדמנות לכל משתתף להכין קוקטיילים בעצמו."
        },
        {
          type: "h2",
          text: "👥 התאמה לקבוצה"
        },
        {
          type: "p",
          text: "הסדנה מותאמת לגודל הקבוצה, רמת הניסיון, והעדפות הטעם של המשתתפים."
        }
      ]
    },
    {
      id: 6,
      title: "הציוד החיוני לבר ביתי",
      excerpt: "רשימת הכלים והאביזרים שכל חובב קוקטיילים חייב במטבח שלו",
      image: "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=800",
      category: "ציוד",
      date: "2 בינואר 2025",
      readTime: "5 דקות",
      heroImage: "https://images.unsplash.com/photo-1609951651556-5334e2706168?w=1200",
      content: [
        {
          type: "h2",
          text: "הציוד הבסיסי לבר ביתי"
        },
        {
          type: "p",
          text: "כדי להכין קוקטיילים מקצועיים בבית, צריך את הציוד הנכון. הנה רשימת הכלים החיוניים שכל חובב קוקטיילים צריך במטבח שלו."
        },
        {
          type: "h2",
          text: "🥄 כלי העבודה הבסיסיים"
        },
        {
          type: "ul",
          items: [
            "שייקר (Shaker) - הכלי החשוב ביותר",
            "מסננת (Strainer) - להפרדת הקרח מהנוזל",
            "כפית ערבוב (Bar Spoon) - לערבוב עדין",
            "מדיד (Jigger) - למדידות מדויקות"
          ]
        },
        {
          type: "h2",
          text: "🍹 כלים נוספים מומלצים"
        },
        {
          type: "ul",
          items: [
            "מערוך למוחיטו (Muddler)",
            "מסחטת ליים",
            "סכין חדה לחיתוך פירות",
            "כוסות קוקטיילים מתאימות"
          ]
        },
        {
          type: "h2",
          text: "❄️ קרח ואיחסון"
        },
        {
          type: "p",
          text: "קרח איכותי הוא המפתח לקוקטיילים מושלמים. השקיעו במכונת קרח טובה או קנו קרח איכותי."
        }
      ]
    },
    {
      id: 7,
      title: "אירועי קוקטיילים בחוץ - המדריך המלא",
      excerpt: "כל מה שצריך לדעת על ארגון בר קוקטיילים באירועים חיצוניים",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800",
      category: "אירועים",
      date: "30 בדצמבר 2024",
      readTime: "7 דקות",
      heroImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200",
      content: [
        {
          type: "h2",
          text: "אירועי קוקטיילים בחוץ - אתגרים והזדמנויות"
        },
        {
          type: "p",
          text: "אירועי קוקטיילים בחוץ מציעים חוויה ייחודית ומרעננת, אבל גם מציבים אתגרים מיוחדים שצריך לקחת בחשבון. הנה המדריך המלא לארגון בר קוקטיילים מושלם באירועים חיצוניים."
        },
        {
          type: "h2",
          text: "🌤️ התמודדות עם מזג האוויר"
        },
        {
          type: "p",
          text: "מזג האוויר הוא הגורם הכי חשוב באירועים חיצוניים. צריך להיות מוכנים לכל תרחיש."
        },
        {
          type: "ul",
          items: [
            "אוהל או מבנה מגן מהשמש והגשם",
            "מערכת קירור לקרח ומשקאות",
            "תאורה מתאימה לערב",
            "מערכת חימום לחורף"
          ]
        },
        {
          type: "h2",
          text: "🚚 לוגיסטיקה וציוד"
        },
        {
          type: "p",
          text: "העברת ציוד לאירוע חיצוני דורשת תכנון מדויק וציוד מתאים."
        },
        {
          type: "ul",
          items: [
            "רכב הובלה מתאים",
            "גנרטור לחשמל",
            "מים נקיים לניקוי",
            "מערכת ניקוז"
          ]
        },
        {
          type: "h2",
          text: "🍹 תפריט מותאם לסביבה"
        },
        {
          type: "p",
          text: "התפריט צריך להיות מותאם לסביבה החיצונית - קוקטיילים מרעננים לקיץ, ומחממים לחורף."
        }
      ]
    }
  ];

  const featuredPost = blogPosts[0];
  const regularPosts = blogPosts.slice(1);

  const handleArticleClick = (post) => {
    if (onNavigateToArticle) {
      onNavigateToArticle(post);
    }
  };

  return (
    <div className="blog-page">
      {/* Global Contact Form Handler */}
      <ContactForm isGlobalHandler={true} />
      
      {/* Background gradients */}
      <div className="gradient-bg gradient-1" />
      <div className="gradient-bg gradient-2" />
      <div className="gradient-bg gradient-3" />

      {/* Hero Section */}
      <motion.div 
        className="blog-header"
        variants={prefersReducedMotion ? {} : heroVariants}
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
      >
        <motion.h1 
          className="blog-main-title"
          variants={prefersReducedMotion ? {} : {
            hidden: { y: 60, opacity: 0 },
            visible: { 
              y: 0, 
              opacity: 1,
              transition: { 
                duration: 0.8,
                ease: "easeOut"
              }
            }
          }}
        >
          הבלוג שלנו
        </motion.h1>
        <motion.p 
          className="blog-description"
          variants={prefersReducedMotion ? {} : {
            hidden: { y: 30, opacity: 0 },
            visible: { 
              y: 0, 
              opacity: 1,
              transition: { 
                duration: 0.6,
                ease: "easeOut"
              }
            }
          }}
        >
          טיפים, מתכונים וסיפורים מעולם הקוקטיילים
        </motion.p>
      </motion.div>

      {/* Blog Container */}
      <div className="blog-container">
        
        {/* Featured Post */}
        <motion.article 
          className="featured-post"
          variants={prefersReducedMotion ? {} : featuredVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
          whileHover={prefersReducedMotion ? {} : { 
            y: -8,
            transition: { duration: 0.3 }
          }}
        >
          <div 
            className="featured-link" 
            onClick={() => handleArticleClick(featuredPost)}
            style={{ cursor: 'pointer' }}
          >
            <div className="featured-image-container">
              <motion.img 
                src={featuredPost.image} 
                alt={featuredPost.title}
                className="featured-image"
                style={{ 
                  y: useTransform(scrollY, [0, 1000], [0, -100]),
                  willChange: "transform"
                }}
                transition={{ type: "spring", stiffness: 100 }}
              />
              <div className="image-overlay" />
            </div>
            
            <div className="featured-content">
              <div className="post-meta">
                <span className="post-category">{featuredPost.category}</span>
                <span className="post-date">
                  <Calendar size={14} />
                  {featuredPost.date}
                </span>
              </div>
              
              <h2 className="featured-title">{featuredPost.title}</h2>
              <p className="featured-excerpt">{featuredPost.excerpt}</p>
              
              <div className="post-footer">
                <span className="read-time">
                  <Clock size={14} />
                  {featuredPost.readTime} קריאה
                </span>
                <span className="read-more">
                  קרא עוד
                  <ArrowLeft size={16} />
                </span>
              </div>
            </div>
          </div>
        </motion.article>

        {/* Regular Posts Grid */}
        <motion.div 
          className="posts-grid"
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          animate={shouldAnimate ? "visible" : "hidden"}
        >
          {regularPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              className="blog-post"
              variants={prefersReducedMotion ? {} : postVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              whileHover={prefersReducedMotion ? {} : { 
                y: -8,
                transition: { duration: 0.3 }
              }}
              style={{ 
                willChange: "transform",
                transformStyle: "preserve-3d"
              }}
            >
              <div 
                className="post-link" 
                onClick={() => handleArticleClick(post)}
                style={{ cursor: 'pointer' }}
              >
                <div className="post-image-container">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="post-image"
                  />
                  <div className="image-overlay" />
                </div>
                
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-category">{post.category}</span>
                    <span className="post-date">
                      <Calendar size={12} />
                      {post.date}
                    </span>
                  </div>
                  
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  
                  <div className="post-footer">
                    <span className="read-time">
                      <Clock size={12} />
                      {post.readTime}
                    </span>
                    <span className="read-more-small">
                      קרא עוד
                      <ArrowLeft size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>

      {/* CTA Section */}
      <motion.section 
        className="cta-section"
        style={{
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '2rem 1.25rem' : '3rem 2rem',
          marginTop: '20px',
          zIndex: 1
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <style>{`
          .cta-container {
            background: rgba(255, 255, 255, 0.02);
            background-image: linear-gradient(to bottom right, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.01));
            backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
            -webkit-backdrop-filter: blur(20px) brightness(1.1) saturate(180%);
            border-radius: 24px;
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            box-shadow: 
              0 15px 35px rgba(0, 0, 0, 0.5),
              inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
              0 0 0 1px rgba(255, 255, 255, 0.05);
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            max-width: 1200px;
            width: 100%;
            padding: 50px;
            z-index: 2;
          }

          .cta-container:hover {
            background: rgba(255, 255, 255, 0.18);
            transform: translateY(-2px);
            box-shadow: 0 16px 64px rgba(0, 0, 0, 0.25);
          }

          .cta-title {
            font-size: 1.6rem;
            font-weight: 700;
            background: linear-gradient(180deg, #ffffff 0%, #999999 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-align: center;
            margin-bottom: 2rem;
            font-family: 'Varela Round', sans-serif;
            letter-spacing: -0.5px;
          }

          .form-container {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
            direction: rtl;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            flex: 1;
            min-width: 200px;
          }

          .form-input {
            flex: 1;
            min-width: 200px;
            padding: 16px 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 17px;
            border-radius: 16px;
            direction: rtl;
            backdrop-filter: blur(15px);
            box-sizing: border-box;
            font-family: 'Varela Round', sans-serif;
            font-weight: 400;
            letter-spacing: -0.1px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            outline: none;
          }

          .form-textarea {
            padding: 16px 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 17px;
            border-radius: 16px;
            direction: rtl;
            backdrop-filter: blur(15px);
            box-sizing: border-box;
            font-family: 'Varela Round', sans-serif;
            font-weight: 400;
            letter-spacing: -0.1px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
            outline: none;
            resize: vertical;
            min-height: 100px;
          }

          .form-label {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 8px;
            font-family: 'Varela Round', sans-serif;
          }

          .form-feedback {
            padding: 12px 16px;
            border-radius: 12px;
            margin-top: 16px;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            font-family: 'Varela Round', sans-serif;
          }

          .success-feedback {
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid rgba(34, 197, 94, 0.4);
            color: #22c55e;
          }

          .error-feedback {
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid rgba(239, 68, 68, 0.4);
            color: #ef4444;
          }

          .required-asterisk {
            color: #ef4444;
            margin-left: 4px;
          }

          .form-input:focus {
            border: 1px solid rgba(255, 255, 255, 0.6);
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-2px);
          }

          .form-input::placeholder {
            color: rgba(255, 255, 255, 0.8);
            font-weight: 500;
            opacity: 1;
          }

          .submit-btn {
            padding: 18px 36px;
            background: linear-gradient(135deg, #007AFF 0%, #0051D5 100%);
            border: none;
            border-radius: 12px;
            color: white;
            font-size: 17px;
            cursor: pointer;
            min-width: 160px;
            width: auto;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            font-family: 'Varela Round', sans-serif;
            font-weight: 700;
            letter-spacing: -0.1px;
            box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
            position: relative;
            overflow: hidden;
          }

          .submit-btn:hover {
            background: linear-gradient(135deg, #0088FF 0%, #0066E6 100%);
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 8px 24px rgba(0, 122, 255, 0.4);
          }

          .submit-btn:active {
            transform: translateY(-1px) scale(1.02);
          }

          @media (max-width: 768px) {
            .cta-container {
              padding: 25px 20px;
              border-radius: 20px;
              margin: 0 15px;
              box-shadow:
                0 8px 24px rgba(0, 0, 0, 0.4),
                inset 0 1px 0 0 rgba(255, 255, 255, 0.15);
            }

            .cta-title {
              font-size: 1.4rem !important;
              margin-bottom: 1.5rem !important;
            }

            .form-container {
              flex-direction: column !important;
              gap: 0.9rem !important;
            }

            .form-input {
              min-width: 100% !important;
              padding: 14px 18px !important;
              font-size: 16px !important;
              border-radius: 14px !important;
              background: rgba(255, 255, 255, 0.15) !important;
              border: 1.5px solid rgba(255, 255, 255, 0.25) !important;
              transition: all 0.3s ease !important;
            }

            .form-input:focus {
              background: rgba(255, 255, 255, 0.22) !important;
              border: 1.5px solid rgba(201, 161, 75, 0.5) !important;
              box-shadow: 0 0 0 3px rgba(201, 161, 75, 0.15) !important;
              transform: translateY(-1px) !important;
            }

            .form-input::placeholder {
              color: rgba(255, 255, 255, 0.75) !important;
              font-size: 16px !important;
            }

            .submit-btn {
              width: 100%;
              padding: 16px 28px !important;
              font-size: 16px !important;
              margin-top: 0.5rem;
              background: linear-gradient(135deg, #C9A14B 0%, #A67C52 100%) !important;
              box-shadow: 0 4px 16px rgba(201, 161, 75, 0.35) !important;
              border-radius: 14px !important;
            }

            .submit-btn:hover {
              background: linear-gradient(135deg, #D4AF5E 0%, #B88A61 100%) !important;
              box-shadow: 0 6px 20px rgba(201, 161, 75, 0.45) !important;
            }
          }
        `}</style>
        
        {/* רדיאל גרדיאנט */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1200px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.06) 0%, rgba(75, 0, 130, 0.04) 25%, rgba(25, 25, 112, 0.03) 50%, transparent 80%)',
          filter: 'blur(60px)',
          zIndex: 1,
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
        
        <motion.div
          className="cta-container"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <h2 className="cta-title">השאירו פרטים ונחזור אליכם</h2>
          
          <form className="form-container">
            <input 
              type="text" 
              name="name"
              placeholder="השם שלך"
              className="form-input"
              aria-label="שם"
              required
            />
            
            <input 
              type="tel" 
              name="phone"
              placeholder="מספר הטלפון"
              className="form-input"
              aria-label="טלפון"
              required
            />
            
            <button
              type="submit"
              className="submit-btn"
              aria-label="שלח טופס"
            >
              שלח
            </button>
          </form>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default BlogPage;