import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./ArticlePage.css";

const ArticlePage = ({ articleData, onBackToBlog }) => {
  // אם אין נתוני כתבה, נציג הודעת שגיאה
  if (!articleData) {
    return (
      <div className="article-page">
        <div className="article-container">
          <h1 className="article-title">כתבה לא נמצאה</h1>
          <p>הכתבה המבוקשת לא נמצאה. אנא חזור לעמוד הבלוג.</p>
          {onBackToBlog && (
            <button 
              onClick={onBackToBlog}
              className="back-button"
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '16px',
                fontFamily: "'Varela Round', sans-serif"
              }}
            >
              חזור לבלוג
            </button>
          )}
        </div>
      </div>
    );
  }

  const currentArticle = articleData;

  return (
    <div className="article-page">
      {/* Background gradients */}
      <div className="article-gradient gradient-1" />
      <div className="article-gradient gradient-2" />
      
      {/* Navigation */}
      <motion.div 
        className="article-nav"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <button 
          onClick={onBackToBlog}
          className="back-button"
        >
          <ArrowRight size={16} />
          חזור לבלוג
        </button>
      </motion.div>
      
      <div className="article-container">
        <h1 className="article-title">{currentArticle.title}</h1>
        {currentArticle.heroImage && (
          <img src={currentArticle.heroImage} alt={currentArticle.title} className="article-hero" />
        )}

      {currentArticle.content && Array.isArray(currentArticle.content) && currentArticle.content.length > 0 ? (
        currentArticle.content.map((block, index) => {
        switch (block.type) {
          case "p":
            return <p key={index}>{block.text}</p>;
          case "h2":
            return <h2 key={index}>{block.text}</h2>;
          case "h3":
            return <h3 key={index}>{block.text}</h3>;
          case "blockquote":
            return <blockquote key={index}>{block.text}</blockquote>;
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index}>
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            );
          default:
            return null;
        }
        })
      ) : (
        <div style={{ textAlign: 'center', padding: '2rem', color: '#ccc' }}>
          <p>תוכן הכתבה יגיע בקרוב...</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default ArticlePage;
