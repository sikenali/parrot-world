/**
 * 照片优化脚本：为 public/photos/ 下每张图片生成多尺寸 webp 缩略图
 * 输出到 public/photos/opt/，页面通过 /photos/opt/xxx-<w>.webp 引用
 * 运行: node scripts/optimize-photos.js
 */
import { readdir, stat, mkdir, access } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PHOTOS_DIR = join(__dirname, '..', 'public', 'photos');
const OPT_DIR = join(PHOTOS_DIR, 'opt');
const WIDTHS = [480, 800, 1600];
const QUALITY = 75;
const IMG_RE = /\.(jpg|jpeg|png|webp)$/i;

async function isNewer(source, target) {
  try {
    const [s, t] = await Promise.all([stat(source), stat(target)]);
    return t.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function main() {
  console.log('🖼️  开始优化 photos...');
  await mkdir(OPT_DIR, { recursive: true });

  const files = (await readdir(PHOTOS_DIR)).filter(f => IMG_RE.test(f));
  let generated = 0;
  let skipped = 0;

  for (const file of files) {
    const srcPath = join(PHOTOS_DIR, file);
    const base = basename(file).replace(IMG_RE, '');
    for (const w of WIDTHS) {
      const outPath = join(OPT_DIR, `${base}-${w}.webp`);
      if (await isNewer(srcPath, outPath)) {
        skipped++;
        continue;
      }
      await sharp(srcPath, { failOn: 'none' })
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outPath);
      generated++;
    }
  }

  console.log(`✅ photos 优化完成：生成 ${generated} 个，跳过 ${skipped} 个`);
}

main().catch(e => { console.error('优化失败:', e.message); process.exit(1); });
