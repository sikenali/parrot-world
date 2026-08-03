import { authorInfo } from '../data/loader';
import { LeafIcon, CoffeeIcon, MusicIcon, FlowerIcon, BookIcon } from './Icons';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-banner">
            <div className="hero-banner-content">
              <div className="hero-eyebrow">ISLAND KEEPER · 紫米的小窝</div>
              <h1 className="hero-title">
                欢迎来到<em>鹦鹉世界</em>
              </h1>
              <p className="hero-subtitle">
                 牡丹鹦鹉的生活记录。清晨的咖啡、午后的阳光、海边的散步、花园里的花开花落——在这里，时间很慢，每一天都带来开心。
              </p>
              <div className="hero-tags">
                <span className="hero-tag"><LeafIcon size={12} /> 生活在岛上</span>
                <span className="hero-tag"><CoffeeIcon size={12} /> 晨间 ☕</span>
                <span className="hero-tag"><MusicIcon size={12} /> 喜欢听音乐</span>
                <span className="hero-tag"><FlowerIcon size={12} /> 养花爱好者</span>
                <span className="hero-tag"><BookIcon size={12} /> 爱读书</span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-sidebar">
          <div className="author-card">
            <div className="author-card-header">
              <img
                src={authorInfo.avatar}
                alt="紫米的头像"
                className="author-avatar"
              />
              <div className="author-info">
                <div className="author-eyebrow">ISLAND KEEPER</div>
                <div className="author-name">{authorInfo.name}</div>
                <div className="author-role">{authorInfo.role}</div>
              </div>
            </div>
            <div className="author-card-body">
              <p className="author-bio">{authorInfo.quote}</p>
              <div className="author-detail">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {authorInfo.location}
              </div>
              <div className="author-stats">
                <div className="stat-item">
                  <div className="stat-num">{authorInfo.totalPhotos}</div>
                  <div className="stat-label">照片</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">{authorInfo.totalPosts}</div>
                  <div className="stat-label">日记</div>
                </div>
                <div className="stat-item">
                  <div className="stat-num">{authorInfo.totalVisitors}</div>
                  <div className="stat-label">访客</div>
                </div>
              </div>
              <div className="island-status">
                <div className="island-status-dot"></div>
                <span className="island-status-text">岛屿在线 · 欢迎来到我的小窝</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link to="/daily" className="explore-more">
        <span className="explore-more-text">探索更多</span>
        <span className="explore-arrow">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
        </span>
      </Link>
    </section>
  );
}
