import { parseFrontmatter, parseYaml } from './frontmatter';
import type { Post, Photo, AuthorInfo, Notice, Tag } from '../types';

interface RawPost {
  title: string;
  date: string;
  cover: string;
  category: string;
  excerpt?: string;
  tags?: string[];
  views?: number;
  comments?: number;
}

interface RawPhoto {
  title: string;
  caption?: string;
  image: string;
  wide?: boolean;
  tall?: boolean;
  tags?: string[];
}

interface RawAuthor {
  name?: string;
  nickname?: string;
  avatar?: string;
  bio?: string;
  quote?: string;
  location?: string;
  totalPhotos?: number;
  totalPosts?: number;
  totalVisitors?: number;
}

interface RawNotices {
  items?: { text?: string }[];
}

const postModules = import.meta.glob('/content/posts/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const photoModules = import.meta.glob('/content/photos/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const authorModule = import.meta.glob('/content/settings/author.yml', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const noticesModule = import.meta.glob('/content/settings/notices.yml', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function slugOf(path: string): string {
  const name = path.split('/').pop() || '';
  return name.replace(/\.(md|yml)$/, '');
}

function formatDate(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  const [, y, mo, d] = m;
  return `${y}年${Number(mo)}月${Number(d)}日`;
}

function excerptOf(content: string, fallback: string): string {
  const first = content
    .split(/\n+/)
    .map(s => s.trim())
    .find(s => s && !s.startsWith('#'));
  if (first) return first.slice(0, 90) + (first.length > 90 ? '…' : '');
  return fallback || '';
}

function sortByDateDesc<T extends { date: string }>(arr: T[]): T[] {
  return [...arr].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export const posts: Post[] = sortByDateDesc(
  Object.entries(postModules).map(([path, raw], idx) => {
    const { data, content } = parseFrontmatter(raw);
    const fm = data as unknown as RawPost;
    return {
      id: idx + 1,
      cover: fm.cover || '',
      category: fm.category || '随笔',
      date: formatDate(fm.date || ''),
      title: fm.title || '未命名',
      excerpt: excerptOf(content, fm.excerpt || ''),
      tags: fm.tags || [],
      views: fm.views ?? 0,
      comments: fm.comments ?? 0,
      slug: slugOf(path),
      body: content,
    };
  }),
);

export const photos: Photo[] = Object.entries(photoModules).map(([, raw], idx) => {
  const { data } = parseFrontmatter(raw);
  const fm = data as unknown as RawPhoto;
  return {
    id: idx + 1,
    src: fm.image || '',
    caption: fm.caption || fm.title || '',
    wide: !!fm.wide,
    tall: !!fm.tall,
    tags: fm.tags || [],
  };
});

const authorRaw = Object.values(authorModule)[0] || '';
const authorData = authorRaw ? (parseYaml(authorRaw) as unknown as RawAuthor) : {};

export const authorInfo: AuthorInfo = {
  name: authorData.name || '紫米 ZiMi',
  nickname: authorData.nickname || '紫鹦鹉 · 岛屿居民',
  role: authorData.nickname || '紫鹦鹉 · 岛屿居民',
  avatar: authorData.avatar || '',
  quote: authorData.quote || '',
  location: authorData.location || '',
  totalPhotos: authorData.totalPhotos ?? photos.length,
  totalPosts: authorData.totalPosts ?? posts.length,
  totalVisitors: authorData.totalVisitors ?? 0,
};

const noticesRaw = Object.values(noticesModule)[0] || '';
const noticesData = noticesRaw ? (parseYaml(noticesRaw) as unknown as RawNotices) : {};

export const notices: Notice[] = (noticesData.items || [])
  .map(i => i.text)
  .filter((t): t is string => !!t)
  .map(text => ({ text }));

export function getAllTags(): Tag[] {
  const count = new Map<string, number>();
  [...posts, ...photos].forEach(item => {
    (item.tags || []).forEach(t => count.set(t, (count.get(t) || 0) + 1));
  });
  return Array.from(count.entries())
    .map(([name, n]) => ({ name, count: n }))
    .sort((a, b) => b.count - a.count);
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug);
}
