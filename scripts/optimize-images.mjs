import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { execSync } from 'child_process';

const TARGET_DIRS = [
  'public/assets/service-gallery',
  'public/assets/about-image',
  'public/assets/images',
  'public/assets/gallery'
];

let convertedCount = 0;
let totalSavedBytes = 0;

for (const dir of TARGET_DIRS) {
  if (!existsSync(dir)) continue;
  const files = readdirSync(dir);
  for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
      const fullPath = join(dir, file);
      const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');

      if (!existsSync(webpPath)) {
        try {
          const originalSize = statSync(fullPath).size;
          // quality 82 for photos, 85 for logos/graphics
          execSync(`cwebp -q 82 "${fullPath}" -o "${webpPath}"`, { stdio: 'pipe' });
          const newSize = statSync(webpPath).size;
          totalSavedBytes += (originalSize - newSize);
          convertedCount++;
          console.log(`Converted: ${file} (${Math.round(originalSize / 1024)}KB -> ${Math.round(newSize / 1024)}KB)`);
        } catch (e) {
          console.error(`Failed to convert ${file}:`, e.message);
        }
      }
    }
  }
}

console.log(`\nSuccessfully converted ${convertedCount} images.`);
console.log(`Total saved: ${Math.round(totalSavedBytes / (1024 * 1024))} MB.`);
