import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/content';
import { ClockIcon, MessageIcon, ArrowLeftIcon } from './Icons';

interface PostDetailData {
  id: number;
  cover: string;
  category: string;
  date: string;
  title: string;
  tags: string[];
  views: number;
  comments: number;
  slug: string;
  body: string;
}

function getPostBySlug(slug: string): PostDetailData | null {
  const post = posts.find(p => p.slug === slug);
  if (!post) return null;
  return {
    ...post,
    body: '',
  };
}

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const target = slug ?? '';
    const base = `${import.meta.env.BASE_URL || '/'}content/posts/${target}.md`;
    fetch(base)
      .then(res => {
        if (!res.ok) throw new Error('not found');
        return res.text();
      })
      .then(text => {
        const fm = parseFrontmatter(text);
        const content = fm.content;
        const dp = posts.find(p => p.slug === target);
        if (!dp) throw new Error('not found');
        setPost({ ...dp, body: content });
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="post-loading">
        <div className="post-loading-spinner"></div>
        <div className="post-loading-text">正在加载文章…</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="post-not-found">
        <div className="post-not-found-icon">🔍</div>
        <div className="post-not-found-title">文章找不到</div>
        <div className="post-not-found-text">这篇文章可能已被删除或移动了位置。</div>
        <Link to="/daily" className="back-link">
          <ArrowLeftIcon size={14} />
          返回日常点滴
        </Link>
      </div>
    );
  }

  return (
    <article className="post-detail">
      <Link to="/daily" className="back-link">
        <ArrowLeftIcon size={14} />
        返回日常点滴
      </Link>

      <header className="post-detail-header">
        <div className="post-detail-meta-top">
          <span className="post-detail-category">{post.category}</span>
          <span className="post-detail-date">{post.date}</span>
        </div>
        <h1 className="post-detail-title">{post.title}</h1>
        <div className="post-detail-tags">
          {post.tags.map(t => <span key={t} className="post-tag">#{t}</span>)}
        </div>
        <div className="post-detail-stats">
          <span className="post-stat"><ClockIcon size={13} /> {post.views} 阅读</span>
          <span className="post-stat"><MessageIcon size={13} /> {post.comments} 评论</span>
        </div>
      </header>

      <img
        src={post.cover.replace(/w=\d+/, 'w=1200')}
        alt={post.title}
        className="post-detail-cover"
      />

      <div className="post-detail-body">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>

      <div className="post-detail-footer">
        <Link to="/daily" className="back-link">
          <ArrowLeftIcon size={14} />
          返回日常点滴
        </Link>
      </div>
    </article>
  );
}

function parseFrontmatter(text: string): { title: string; content: string } {
  const match = text.match(/^---\n([\s\S]+?)\n---\n?([\s\S]*)$/);
  if (!match) return { title: '', content: text };
  const raw = match[1];
  let title = '';
  const titleMatch = raw.match(/title:\s*"([^"]+)"/);
  if (titleMatch) title = titleMatch[1];
  return { title, content: match[2] };
}
