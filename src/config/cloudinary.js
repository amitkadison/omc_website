// Cloudinary Configuration
export const CLOUDINARY_CONFIG = {
  cloudName: 'doteohz34',
  baseUrl: 'https://res.cloudinary.com/doteohz34',
};

// Helper function to get Cloudinary URL
export const getCloudinaryUrl = (publicId, options = {}) => {
  const {
    width,
    height,
    crop = 'fill',
    quality = 'auto',
    format = 'auto',
  } = options;

  let transformations = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (crop) transformations.push(`c_${crop}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformStr = transformations.length > 0
    ? `/${transformations.join(',')}`
    : '';

  return `${CLOUDINARY_CONFIG.baseUrl}/image/upload${transformStr}/${publicId}`;
};

// Helper function for video URLs
export const getCloudinaryVideoUrl = (publicId, options = {}) => {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
  } = options;

  let transformations = [];

  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  transformations.push(`q_${quality}`);
  transformations.push(`f_${format}`);

  const transformStr = transformations.length > 0
    ? `/${transformations.join(',')}`
    : '';

  return `${CLOUDINARY_CONFIG.baseUrl}/video/upload${transformStr}/${publicId}`;
};

// All your Cloudinary assets
export const CLOUDINARY_IMAGES = {
  // Main images
  hero: getCloudinaryUrl('תמונה_חתונה_l6uzrb.jpg'),
  logo: getCloudinaryUrl('realLOGO_ctei5e.png'),
  logo512: getCloudinaryUrl('logo512_dlz7ls.png'),
  logo192: getCloudinaryUrl('logo192_xgf9si.png'),
  favicon: getCloudinaryUrl('favicon_fqwmmx.ico'),

  // Design assets
  design1: getCloudinaryUrl('עיצוב_ללא_שם_2_nbgivx.png'),
  try2: getCloudinaryUrl('try2_gy96mb.png'),
  try1: getCloudinaryUrl('try_dpaocx.png'),
  omer2: getCloudinaryUrl('omer2_igs7hj.png'),
  omerShaking: getCloudinaryUrl('omer_shaking_nxtdee.png'),
  omerAI: getCloudinaryUrl('OMERAI_jqovc4.png'),

  // Portfolio/Work images
  tosImage: getCloudinaryUrl('T.O.S_36_of_327_tmgyby.jpg'),
  reka: getCloudinaryUrl('REKA_jnmks3.png'),
  ps1: getCloudinaryUrl('PS1_0053_resized_dytdhg.jpg'),
  dsc: getCloudinaryUrl('DSC03566_trxtjs.jpg'),
  gavriel: getCloudinaryUrl('2024-09-06GAVRIEL-126_m0bybb.jpg'),

  // UI Elements
  frame2: getCloudinaryUrl('Frame_2_ssowvw.png'),
  cocktail1: getCloudinaryUrl('cocktail1_zmqwwx.png'),
  contact: getCloudinaryUrl('CONTACKT_knya7g.png'),
  background1: getCloudinaryUrl('background_1_fbwoqk.png'),
  backgroundAbout: getCloudinaryUrl('background__aboutus_ipqsvs.png'),
  back123: getCloudinaryUrl('BACK123_cxj8cz.png'),

  // Textures
  grungeWall: getCloudinaryUrl('grunge-wall-texture_gasdj3.jpg'),

  // Generated/AI
  gemini: getCloudinaryUrl('Gemini_Generated_Image_7sxcpq7sxcpq7sxc_mykwrh.png'),
  geminiNoBg: getCloudinaryUrl('Gemini_Generated_Image_7sxcpq7sxcpq7sxc-removebg-preview_fastjy.png'),

  // Food/Bar images
  barista: getCloudinaryUrl('barista-putting-alcohol-into-cocktail-glass-with-syrup-ice-cubes_thuy44.jpg'),
  forbs1: getCloudinaryUrl('forobs30u30_csnpjj.jpg'),
  forbs2: getCloudinaryUrl('forbs30u302-_h9lrig.jpg'),

  // Icons/Logos (removebg versions)
  icon37: getCloudinaryUrl('image-removebg-preview_37_aq5kep.png'),
  icon41: getCloudinaryUrl('image-removebg-preview_41_nffl1t.png'),
  icon36: getCloudinaryUrl('image-removebg-preview_36_m1dmtt.png'),
  icon33: getCloudinaryUrl('image-removebg-preview_33_p8i6is.png'),
  icon31: getCloudinaryUrl('image-removebg-preview_31_wegaww.png'),
  icon30: getCloudinaryUrl('image-removebg-preview_30_xmaupc.png'),
  icon29: getCloudinaryUrl('image-removebg-preview_29_n28ci5.png'),
  icon28: getCloudinaryUrl('image-removebg-preview_28_mnq5wb.png'),
  icon27: getCloudinaryUrl('image-removebg-preview_27_xfoxaf.png'),
  icon26: getCloudinaryUrl('image-removebg-preview_26_rurlxi.png'),
  icon25: getCloudinaryUrl('image-removebg-preview_25_vugwqx.png'),
  icon24: getCloudinaryUrl('image-removebg-preview_24_vsyzsq.png'),
  icon23: getCloudinaryUrl('image-removebg-preview_23_z2qvlu.png'),
  icon22: getCloudinaryUrl('image-removebg-preview_22_casj8c.png'),

  // Sample images from Cloudinary
  mainSample: getCloudinaryUrl('main-sample.png'),
  sample: getCloudinaryUrl('sample.jpg'),
  cldSample: getCloudinaryUrl('cld-sample.jpg'),
  cldSample3: getCloudinaryUrl('cld-sample-3.jpg'),
  cldSample4: getCloudinaryUrl('cld-sample-4.jpg'),
  cldSample5: getCloudinaryUrl('cld-sample-5.jpg'),
};

// Videos
export const CLOUDINARY_VIDEOS = {
  videoCapela: getCloudinaryVideoUrl('video_capela_pxvzeo.mp4'),
  omc916: getCloudinaryVideoUrl('OMC_916_tnkqrf.mp4'),
  haCerem: getCloudinaryVideoUrl('Ha-Cerem_-_Italy_Embassy_2023_GlebSmirnovPro-VEED_sfp5fa.mp4'),
  video1: getCloudinaryVideoUrl('1_ywgrkg.mp4'),
};

export default {
  CLOUDINARY_CONFIG,
  CLOUDINARY_IMAGES,
  CLOUDINARY_VIDEOS,
  getCloudinaryUrl,
  getCloudinaryVideoUrl,
};
