import React from 'react';
import { Helmet } from 'react-helmet';

const SEO = () => (
  <Helmet>
    {/* Title + Meta */}
    <title>O.M.C Mixology Art - בר קוקטיילים מולקולרי לאירועים</title>
    <meta name="description" content="בר קוקטיילים מולקולרי לאירועים, אירועי חברה, חתונות, סדנאות וקוקטיילים פרטיים. אנחנו רוקחים את הידע והדמיון לתוך כוס אחת מושלמת." />
    <meta name="keywords" content="OMC, מיקסולוגיה, בר קוקטיילים, הפקת אירועים, סדנאות קוקטיילים, ברמן מקצועי, אירועים פרטיים, חתונות, בר לאירועים, ישראל" />
    <meta name="author" content="OMC Mixology Art" />

    {/* Viewport */}
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    {/* Language */}
    <html lang="he" dir="rtl" />

    {/* Open Graph */}
    <meta property="og:title" content="O.M.C Mixology Art - בר קוקטיילים מולקולרי לאירועים" />
    <meta property="og:description" content="בר קוקטיילים מקצועי ושירותי מיקסולוגיה לאירועים. הפקת אירועים, סדנאות קוקטיילים ושירותי בר מקצועיים." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.omcmixologyart.com/" />
    <meta property="og:image" content="https://res.cloudinary.com/doteohz34/image/upload/v1760629346/realLOGO_ctei5e.png" />
    <meta property="og:site_name" content="OMC Mixology Art" />
    <meta property="og:locale" content="he_IL" />

    {/* Twitter */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="O.M.C Mixology Art" />
    <meta name="twitter:description" content="בר קוקטיילים מקצועי ושירותי מיקסולוגיה לאירועים" />
    <meta name="twitter:image" content="https://res.cloudinary.com/doteohz34/image/upload/v1760629346/realLOGO_ctei5e.png" />

    {/* Structured Data - LocalBusiness */}
    <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "O.M.C Mixology Art",
        "description": "בר קוקטיילים מולקולרי מוביל לאירועים בישראל",
        "url": "https://www.omcmixologyart.com/",
        "logo": "https://res.cloudinary.com/doteohz34/image/upload/v1760629346/realLOGO_ctei5e.png",
        "image": "https://res.cloudinary.com/doteohz34/image/upload/v1760629346/realLOGO_ctei5e.png",
        "telephone": "+972-54-251-2095",
        "priceRange": "₪₪₪",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "IL",
          "addressRegion": "Israel"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "32.0853",
          "longitude": "34.7818"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Israel"
        },
        "serviceType": [
          "בר קוקטיילים לחתונות",
          "אירועי חברה",
          "סדנאות קוקטיילים",
          "בר פרטי לאירועים פרטיים"
        ],
        "knowsAbout": [
          "Mixology",
          "Molecular Cocktails",
          "Event Planning",
          "Corporate Events",
          "Wedding Bar Service"
        ]
      })}
    </script>
  </Helmet>
);

export default SEO;
