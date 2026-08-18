import { useState } from 'react';
import { posts } from '../data/loader';
import { ClockIcon, MessageIcon } from './Icons';
import { Link } from 'react-router-dom';
import { coverSrc } from '../utils/img';

interface PostCardProps {
  post: typeof posts[0];
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/post/${post.slug}`} className="post-card">
      <img
        src={coverSrc(post.cover, 600)}
        srcSet={`${coverSrc(post.coverThumb || post.cover, 400)} 400w, ${coverSrc(post.cover, 800)} 800w`}
        sizes="(max-width: 480px) 100vw, 200px"
        alt={post.title}
        className="post-cover"
        loading="lazy"
      />
      <div className="post-body">
        <div className="post-meta-top">
          <span className="post-category">{post.category}</span>
          <span className="post-date">{post.date}</span>
        </div>
        <h2 className="post-title">{post.title}</h2>
        <p className="post-excerpt">{post.excerpt}</p>
        <div className="post-meta-bottom">
          {post.tags.map(t => <span key={t} className="post-tag">#{t}</span>)}
          <div className="post-stats">
            <span className="post-stat"><ClockIcon size={13} /> {post.views}</span>
            <span className="post-stat"><MessageIcon size={13} /> {post.comments}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BlogPage() {
  const [searchParams, setSearchParams] = useState<Record<string, string>>({});
  const activeCategory = searchParams['category'] || '';

  const categories = ['全部', ...Array.from(new Set(posts.map(p => p.category)))];

  const filtered = activeCategory
    ? posts.filter(p => p.category === activeCategory)
    : posts;

  const handleCategoryChange = (cat: string) => {
    setSearchParams(prev => {
      const next = { ...prev };
      if (cat === '全部') delete next.category;
      else next.category = cat;
      return next;
    });
  };

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-badge page-hero-badge--daily">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
            {' '}Peekaboo
          </div>
          <h1 className="page-hero-title">我和紫米的日常点滴</h1>
          <p className="page-hero-sub">共 {posts.length} 篇记录 · 关于生活、自然与每一个温柔的瞬间</p>
        </div>
      </section>

      <div className="category-filter-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="posts-list">
        {filtered.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </>
  );
}
