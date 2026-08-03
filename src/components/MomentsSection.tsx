import { posts } from '../data/content';
import { ClockIcon, MessageIcon } from './Icons';

interface PostCardProps {
  post: typeof posts[0];
}

export function PostCard({ post }: PostCardProps) {
  return (
    <a href={`/post/${post.slug}`} className="post-card">
      <img src={post.cover} alt={post.title} className="post-cover" loading="lazy" />
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
    </a>
  );
}

export function MomentsSection() {
  return (
    <section className="section" id="moments">
      <div className="section-ribbon">
        <div className="section-ribbon-bg" style={{ background: 'var(--theme-accent)', color: 'var(--color-on-accent)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>
          {' '}日常点滴
        </div>
        <div className="section-ribbon-sub" style={{ color: 'var(--theme-accent)', borderColor: 'var(--theme-accent)', background: 'rgba(247,205,103,0.1)' }}>
          {posts.length} 篇记录
        </div>
      </div>
      <div className="posts-list">
        {posts.map(p => <PostCard key={p.id} post={p} />)}
      </div>
    </section>
  );
}
