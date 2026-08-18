/**
 * 自动同步脚本：为 public/photos/ 中缺少对应 md 的文件生成 md 条目
 * 运行: node scripts/sync-photos.js
 */
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_PHOTOS_DIR = join(__dirname, '..', 'public', 'photos');
const CONTENT_PHOTOS_DIR = join(__dirname, '..', 'content', 'photos');

function slugify(name) {
  // 保留原始大小写，将下划线替换为连字符
  return name.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/_/g, '-');
}

function captionFromFilename(name) {
  return name.replace(/\.(jpg|jpeg|png|webp)$/i, '').replace(/_/g, ' ');
}

async function main() {
  console.log('🔄 开始同步 photos...');
  
  // 读取所有 jpg/png/webp 文件
  const publicFiles = await readdir(PUBLIC_PHOTOS_DIR);
  const imageFiles = publicFiles.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  
  // 读取已有的 md 文件
  let contentFiles = [];
  try {
    contentFiles = await readdir(CONTENT_PHOTOS_DIR);
  } catch {
    // 目录不存在也没关系
  }
  const existingMds = new Set(contentFiles.filter(f => f.endsWith('.md')).map(f => f.replace('.md', '')));
  
  let created = 0;
  for (const imgFile of imageFiles) {
    const slug = slugify(imgFile);
    if (!existingMds.has(slug)) {
      const mdContent = `---\ntitle: "${captionFromFilename(imgFile)}"\nimage: "/photos/${imgFile}"\ntags:\n  - 日常\n---\n`;
      const mdPath = join(CONTENT_PHOTOS_DIR, `${slug}.md`);
      await writeFile(mdPath, mdContent, 'utf8');
      console.log(`  ✨ 创建: ${slug}.md`);
      created++;
    }
  }
  
  console.log(`✅ 完成！新增了 ${created} 个 md 文件`);
}

main().catch(console.error);
