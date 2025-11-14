const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFavicons() {
  const inputImage = path.join(__dirname, 'public', 'copy.jpg');
  const publicDir = path.join(__dirname, 'public');

  console.log('🚀 Starting favicon creation...');
  console.log('📁 Input image:', inputImage);

  try {
    // 1. Create favicon.ico (32x32)
    console.log('⚙️  Creating favicon.ico (32x32)...');
    await sharp(inputImage)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat('png')
      .toFile(path.join(publicDir, 'favicon-32.png'));

    // For .ico, we'll use the PNG (browsers support it)
    await sharp(inputImage)
      .resize(32, 32, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat('png')
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✅ favicon.ico created');

    // 2. Create logo192.png (192x192)
    console.log('⚙️  Creating logo192.png (192x192)...');
    await sharp(inputImage)
      .resize(192, 192, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat('png')
      .toFile(path.join(publicDir, 'logo192.png'));
    console.log('✅ logo192.png created');

    // 3. Create logo512.png (512x512)
    console.log('⚙️  Creating logo512.png (512x512)...');
    await sharp(inputImage)
      .resize(512, 512, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat('png')
      .toFile(path.join(publicDir, 'logo512.png'));
    console.log('✅ logo512.png created');

    // 4. Create apple-touch-icon (180x180)
    console.log('⚙️  Creating apple-touch-icon.png (180x180)...');
    await sharp(inputImage)
      .resize(180, 180, {
        fit: 'cover',
        position: 'center'
      })
      .toFormat('png')
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png created');

    console.log('\n🎉 All favicons created successfully!');
    console.log('📦 Files created:');
    console.log('  - favicon.ico (32x32)');
    console.log('  - logo192.png (192x192)');
    console.log('  - logo512.png (512x512)');
    console.log('  - apple-touch-icon.png (180x180)');
  } catch (error) {
    console.error('❌ Error creating favicons:', error);
    process.exit(1);
  }
}

createFavicons();
