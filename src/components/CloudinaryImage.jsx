import React, { useState } from 'react';
import { getCloudinaryUrl } from '../config/cloudinary';

/**
 * CloudinaryImage Component
 *
 * טוען תמונות מ-Cloudinary עם אופטימיזציה אוטומטית
 *
 * @param {string} publicId - ה-public_id של התמונה ב-Cloudinary
 * @param {string} alt - טקסט חלופי לתמונה
 * @param {number} width - רוחב התמונה (אופציונלי)
 * @param {number} height - גובה התמונה (אופציונלי)
 * @param {string} className - CSS classes
 * @param {string} crop - סוג ה-crop (fill, scale, fit וכו')
 * @param {string} quality - איכות התמונה (auto, best, good וכו')
 * @param {boolean} lazy - טעינה עצלנית (lazy loading)
 * @param {string} placeholder - צבע placeholder בזמן טעינה
 */
const CloudinaryImage = ({
  publicId,
  alt = '',
  width,
  height,
  className = '',
  crop = 'fill',
  quality = 'auto',
  format = 'auto',
  lazy = true,
  placeholder = '#f0f0f0',
  style = {},
  onClick,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // יצירת URL עם טרנספורמציות
  const imageUrl = getCloudinaryUrl(publicId, {
    width,
    height,
    crop,
    quality,
    format,
  });

  // URL לתמונת placeholder קטנה (10px blur)
  const placeholderUrl = getCloudinaryUrl(publicId, {
    width: 10,
    quality: 'auto:low',
    format: 'auto',
  });

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    console.error(`Failed to load image: ${publicId}`);
  };

  if (hasError) {
    return (
      <div
        className={`cloudinary-image-error ${className}`}
        style={{
          backgroundColor: '#fee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: width || '100%',
          height: height || 'auto',
          ...style,
        }}
      >
        <span style={{ color: '#c00' }}>Failed to load image</span>
      </div>
    );
  }

  return (
    <div
      className={`cloudinary-image-wrapper ${className}`}
      style={{ position: 'relative', ...style }}
    >
      {/* Placeholder - מוצג בזמן הטעינה */}
      {!isLoaded && (
        <img
          src={placeholderUrl}
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'blur(10px)',
            transition: 'opacity 0.3s ease',
          }}
          aria-hidden="true"
        />
      )}

      {/* התמונה האמיתית */}
      <img
        src={imageUrl}
        alt={alt}
        className={className}
        loading={lazy ? 'lazy' : 'eager'}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        style={{
          width: width || '100%',
          height: height || 'auto',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          display: 'block',
        }}
        {...rest}
      />
    </div>
  );
};

export default CloudinaryImage;
