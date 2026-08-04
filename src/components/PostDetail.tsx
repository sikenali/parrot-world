import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams, Link } from 'react-router-dom';
import { getPostBySlug } from '../data/loader';
import { coverSrc } from '../utils/img';
import { ClockIcon, MessageIcon, ArrowLeftIcon } from './Icons';
import type { Post } from '../types';

export function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPost(slug ? getPostBySlug(slug) || null : null);
    setReady(true);
  }, [slug]);

  if (!ready) {
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
          返回 Peekaboo
        </Link>
      </div>
    );
  }

  return (
    <article className="post-detail">
      <Link to="/daily" className="back-link">
        <ArrowLeftIcon size={14} />
        返回 Peekaboo
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
        src={coverSrc(post.cover, 1200)}
        alt={post.title}
        className="post-detail-cover"
      />

      <div className="post-detail-body">
        <ReactMarkdown>{post.body || ''}</ReactMarkdown>
      </div>

      <div className="post-detail-footer">
        <Link to="/daily" className="back-link">
          <ArrowLeftIcon size={14} />
          返回 Peekaboo
        </Link>
      </div>
    </article>
  );
}
