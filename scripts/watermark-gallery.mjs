import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Jimp, loadFont, measureText, measureTextHeight } from "jimp";
import {
  SANS_8_BLACK,
  SANS_8_WHITE,
  SANS_16_BLACK,
  SANS_16_WHITE,
  SANS_32_BLACK,
  SANS_32_WHITE,
  SANS_64_BLACK,
  SANS_64_WHITE,
} from "@jimp/plugin-print/fonts";

const SUPPORTED_IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const WATERMARK_TEXT = "EN DESSUS";
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, "..");
const galleryDir = path.join(projectRoot, "public", "assets", "gallery");
const backupRoot = path.join(projectRoot, ".watermark-cache", "gallery-originals");
const refreshSources = process.argv.includes("--refresh");

const exists = async (targetPath) => {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
};

const collectImageFiles = async (directory, relativeDirectory = "") => {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const relativePath = path.join(relativeDirectory, entry.name);
      const absolutePath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectImageFiles(absolutePath, relativePath);
      }

      if (entry.isFile() && SUPPORTED_IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
        return [relativePath];
      }

      return [];
    }),
  );

  return files.flat().sort((left, right) => left.localeCompare(right));
};

const selectFontPair = (fontPairs, imageWidth, imageHeight) => {
  const maxTextWidth = Math.max(120, Math.round(Math.min(imageWidth, imageHeight) * 0.65));

  return (
    fontPairs.find((fontPair) => measureText(fontPair.white, WATERMARK_TEXT) <= maxTextWidth) ??
    fontPairs[fontPairs.length - 1]
  );
};

const createStamp = async (fontPair, imageWidth, imageHeight) => {
  const textWidth = measureText(fontPair.white, WATERMARK_TEXT);
  const textHeight = measureTextHeight(fontPair.white, WATERMARK_TEXT, textWidth);
  const paddingX = Math.max(10, Math.round(Math.min(imageWidth, imageHeight) * 0.04));
  const paddingY = Math.max(8, Math.round(Math.min(imageWidth, imageHeight) * 0.03));
  const baseWidth = textWidth + paddingX * 2;
  const baseHeight = textHeight + paddingY * 2;

  const shadow = new Jimp({ width: baseWidth, height: baseHeight, color: 0x00000000 });
  shadow.print({
    font: fontPair.black,
    x: paddingX + 2,
    y: paddingY + 2,
    text: WATERMARK_TEXT,
  });
  shadow.opacity(0.28);

  const text = new Jimp({ width: baseWidth, height: baseHeight, color: 0x00000000 });
  text.print({
    font: fontPair.white,
    x: paddingX,
    y: paddingY,
    text: WATERMARK_TEXT,
  });
  text.opacity(0.18);

  shadow.composite(text, 0, 0);
  shadow.rotate(-28);

  return shadow;
};

const applyWatermark = async (sourcePath, outputPath, fontPairs) => {
  const image = await Jimp.read(sourcePath);
  const { width, height } = image.bitmap;
  const fontPair = selectFontPair(fontPairs, width, height);
  const stamp = await createStamp(fontPair, width, height);
  const overlay = new Jimp({ width, height, color: 0x00000000 });
  const minSide = Math.min(width, height);

  if (minSide < 220) {
    overlay.composite(stamp, Math.round((width - stamp.bitmap.width) / 2), Math.round((height - stamp.bitmap.height) / 2));
  } else {
    const stepX = Math.max(Math.round(stamp.bitmap.width * 1.05), Math.round(width * 0.34));
    const stepY = Math.max(Math.round(stamp.bitmap.height * 1.08), Math.round(height * 0.28));

    for (let y = -Math.round(stepY * 0.35), row = 0; y < height + stepY; y += stepY, row += 1) {
      const rowOffset = row % 2 === 0 ? -Math.round(stepX * 0.4) : Math.round(stepX * 0.05);

      for (let x = rowOffset; x < width + stepX; x += stepX) {
        overlay.composite(stamp, x, y);
      }
    }
  }

  image.composite(overlay, 0, 0);
  await image.write(outputPath);
};

const main = async () => {
  if (!(await exists(galleryDir))) {
    throw new Error(`Gallery directory not found: ${galleryDir}`);
  }

  await fs.mkdir(backupRoot, { recursive: true });

  const imageFiles = await collectImageFiles(galleryDir);

  if (imageFiles.length === 0) {
    console.log("No gallery images found to watermark.");
    return;
  }

  const fontPairs = [
    {
      label: "64",
      white: await loadFont(SANS_64_WHITE),
      black: await loadFont(SANS_64_BLACK),
    },
    {
      label: "32",
      white: await loadFont(SANS_32_WHITE),
      black: await loadFont(SANS_32_BLACK),
    },
    {
      label: "16",
      white: await loadFont(SANS_16_WHITE),
      black: await loadFont(SANS_16_BLACK),
    },
    {
      label: "8",
      white: await loadFont(SANS_8_WHITE),
      black: await loadFont(SANS_8_BLACK),
    },
  ];

  let processedCount = 0;

  for (const relativePath of imageFiles) {
    const publicFilePath = path.join(galleryDir, relativePath);
    const backupFilePath = path.join(backupRoot, relativePath);

    await fs.mkdir(path.dirname(backupFilePath), { recursive: true });

    if (refreshSources || !(await exists(backupFilePath))) {
      await fs.copyFile(publicFilePath, backupFilePath);
    }

    await applyWatermark(backupFilePath, publicFilePath, fontPairs);
    processedCount += 1;
  }

  console.log(
    `Applied EN DESSUS watermark to ${processedCount} gallery image${processedCount === 1 ? "" : "s"} in public/assets/gallery.`,
  );
  console.log(`Original source backups are stored in ${path.relative(projectRoot, backupRoot)}.`);

  if (refreshSources) {
    console.log("Refresh mode was used: backup sources were rebuilt from the current public gallery files.");
  }
};

main().catch((error) => {
  console.error("Gallery watermark generation failed.");
  console.error(error);
  process.exitCode = 1;
});
