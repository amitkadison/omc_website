import React from 'react';
import { motion } from 'framer-motion';

const InstagramGallery = ({ 
  title = "הגלריה שלנו באינסטגרם",
  instagramUrl = "https://instagram.com/omc_mixology",
  showTitle = true 
}) => {

  // הקישורים האמיתיים שלך מאינסטגרם
  const instagramPosts = [
    {
      id: 1,
      url: 'https://www.instagram.com/p/DM7ZHOgohTK/',
      image: '/api/placeholder/300/300',
      isVideo: false
    },
    {
      id: 2,
      url: 'https://www.instagram.com/p/DFZ0YLyIfBk/',
      image: '/api/placeholder/300/300',
      isVideo: false
    },
    {
      id: 3,
      url: 'https://www.instagram.com/p/C9PJLsRo9ZJ/?img_index=1',
      image: '/api/placeholder/300/300',
      isVideo: false
    },
    {
      id: 4,
      url: 'https://www.instagram.com/reel/DIik9X9oS4i/',
      image: '/api/placeholder/300/300',
      isVideo: true
    },
    {
      id: 5,
      url: 'https://www.instagram.com/p/C9js38VI4-C/?img_index=1',
      image: '/api/placeholder/300/300',
      isVideo: false
    }
  ];

  return (
    <>
      <style>{`
        .instagram-gallery-component {
          width: 100%;
          background: transparent;
          padding: 60px 20px;
          direction: rtl;
          font-family: 'Inter', 'Rubik', sans-serif;
        }

        .gallery-container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }

        .gallery-title {
          text-align: center;
          font-size: 3rem;
          font-weight: 700;
          font-family: 'Rubik', 'Noto Sans Hebrew', sans-serif;
          background: linear-gradient(180deg, #ffffff 0%, #a0a0a0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 50px;
          line-height: 1.2;
        }

        /* Desktop: 5 פוסטים בשורה */
        .posts-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          margin-bottom: 40px;
          justify-items: center;
        }

        .post-item {
          position: relative;
          width: 100%;
          max-width: 220px;
          aspect-ratio: 1;
          overflow: hidden;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .post-item:hover {
          transform: scale(1.05);
          background: rgba(255, 255, 255, 0.08);
        }

        .post-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
          transition: transform 0.3s ease;
        }

        .post-item:hover .post-image {
          transform: scale(1.1);
        }

        /* אייקון ווידאו */
        .video-icon {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 24px;
          height: 24px;
          background: rgba(0, 0, 0, 0.7);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
          backdrop-filter: blur(4px);
          z-index: 2;
        }

        /* Overlay */
        .post-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 8px;
        }

        .post-item:hover .post-overlay {
          opacity: 1;
        }

        .post-overlay-text {
          color: white;
          font-size: 14px;
          font-weight: 600;
          text-align: center;
        }

        /* כפתור אינסטגרם מינימליסטי */
        .instagram-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: rgba(255, 255, 255, 0.8);
          padding: 16px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          text-decoration: none;
          font-weight: 500;
          font-size: 16px;
          transition: all 0.3s ease;
          margin: 0 auto;
          width: fit-content;
          backdrop-filter: blur(10px);
        }

        .instagram-cta:hover {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          text-decoration: none;
          transform: translateY(-2px);
        }

        .camera-icon {
          width: 24px;
          height: 24px;
          color: inherit;
        }

        /* Mobile: 4 פוסטים 2x2 */
        @media (max-width: 768px) {
          .instagram-gallery-component {
            padding: 40px 15px;
          }

          .gallery-title {
            font-size: 2rem;
            margin-bottom: 30px;
          }

          .posts-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            max-width: 400px;
            margin: 0 auto 40px auto;
          }

          .post-item {
            max-width: 180px;
          }

          .instagram-cta {
            padding: 12px;
            font-size: 14px;
          }

          .camera-icon {
            width: 20px;
            height: 20px;
          }
        }

        @media (max-width: 480px) {
          .gallery-title {
            font-size: 1.6rem;
            margin-bottom: 25px;
          }

          .posts-grid {
            gap: 8px;
            max-width: 320px;
          }

          .post-item {
            max-width: 150px;
          }
        }

        /* Tablet: 4 פוסטים בשורה */
        @media (min-width: 769px) and (max-width: 1024px) {
          .posts-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }
      `}</style>

      <div className="instagram-gallery-component">
        <div className="gallery-container">
          {showTitle && (
            <motion.h2 
              className="gallery-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {title}
            </motion.h2>
          )}

          <motion.div 
            className="posts-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: showTitle ? 0.2 : 0 }}
          >
            {instagramPosts.slice(0, 5).map((post, index) => (
              <motion.div
                key={post.id}
                className="post-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => window.open(post.url, '_blank')}
              >
                <img 
                  src={post.image} 
                  alt={`Instagram post ${post.id}`}
                  className="post-image"
                  loading="lazy"
                />
                
                {post.isVideo && (
                  <div className="video-icon">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
                
                <div className="post-overlay">
                  <div className="post-overlay-text">
                    צפה בפוסט
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            style={{ textAlign: 'center' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-cta"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="camera-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 15.2c1.8 0 3.2-1.4 3.2-3.2s-1.4-3.2-3.2-3.2S8.8 10.2 8.8 12s1.4 3.2 3.2 3.2zm0-5.5c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z"/>
                <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm11 15H4V6h4.05l1.83-2h4.24l1.83 2H20v11z"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default InstagramGallery;