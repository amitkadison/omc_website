import React from 'react';
import { getCloudinaryVideoUrl } from '../config/cloudinary';

/**
 * CloudinaryVideo Component
 *
 * טוען סרטונים מ-Cloudinary עם אופטימיזציה אוטומטית
 *
 * @param {string} publicId - ה-public_id של הסרטון ב-Cloudinary
 * @param {number} width - רוחב הסרטון (אופציונלי)
 * @param {number} height - גובה הסרטון (אופציונלי)
 * @param {string} className - CSS classes
 * @param {boolean} controls - הצג פקדי נגן
 * @param {boolean} autoPlay - נגן אוטומטית
 * @param {boolean} loop - נגן בלולאה
 * @param {boolean} muted - השתק סאונד
 * @param {string} poster - תמונת poster (אופציונלי)
 */
const CloudinaryVideo = ({
  publicId,
  width,
  height,
  className = '',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
  poster,
  quality = 'auto',
  format = 'auto',
  style = {},
  ...rest
}) => {
  // יצירת URL לסרטון
  const videoUrl = getCloudinaryVideoUrl(publicId, {
    width,
    height,
    quality,
    format,
  });

  // אם יש poster, השתמש בפונקציה לתמונה
  const posterUrl = poster
    ? poster.startsWith('http')
      ? poster
      : `https://res.cloudinary.com/doteohz34/image/upload/${poster}`
    : undefined;

  return (
    <video
      src={videoUrl}
      poster={posterUrl}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      className={className}
      style={{
        width: width || '100%',
        height: height || 'auto',
        ...style,
      }}
      {...rest}
    >
      הדפדפן שלך לא תומך בתגית video.
    </video>
  );
};

export default CloudinaryVideo;
