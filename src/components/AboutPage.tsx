import { authorInfo } from '../data/loader';
import { LeafIcon, SunIcon, FlowerIcon, MusicIcon, FeatherIcon } from './Icons';

export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-badge page-hero-badge--about">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7l-3-2a2 2 0 0 0-2.7.4L2 16v2a2 2 0 0 0 2 2h1"/></svg>
            {' '}AboutZIMI
          </div>
          <h1 className="page-hero-title">我的紫米宝宝档案</h1>
          <p className="page-hero-sub">牡丹鹦鹉的生活记录</p>
        </div>
      </section>

      <div className="about-page">
        <img
          src="https://images.pexels.com/photos/18113177/pexels-photo-18113177.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="紫米在笼子里的站杆上"
          className="about-page-hero"
          loading="lazy"
        />
        <div className="about-page-body">
          <div className="about-name-row">
            <img src={authorInfo.avatar} alt="紫米" className="about-avatar" />
            <div>
              <div className="about-name">{authorInfo.name}</div>
              <div className="about-nick">{authorInfo.nickname}</div>
            </div>
          </div>
          <div className="about-bio">
            {authorInfo.bio}
          </div>
          <div className="about-grid">
            <div className="about-detail-card">
              <div className="about-detail-card-icon" style={{ background: 'rgb(111 186 44 / 10%)', color: '#6fba2c', borderColor: 'rgb(111 186 44 / 25%)' }}>
                <LeafIcon size={16} />
              </div>
              <div>
                <div className="about-detail-card-label">性格类型</div>
                <div className="about-detail-card-value">{authorInfo.personality}</div>
              </div>
            </div>
            <div className="about-detail-card">
              <div className="about-detail-card-icon" style={{ background: 'rgb(247 205 103 / 15%)', color: 'var(--theme-accent)', borderColor: 'rgba(247,205,103,0.4)' }}>
                <SunIcon size={16} />
              </div>
              <div>
                <div className="about-detail-card-label">岛上住所</div>
                <div className="about-detail-card-value">{authorInfo.residence}</div>
              </div>
            </div>
            <div className="about-detail-card">
              <div className="about-detail-card-icon" style={{ background: 'rgb(25 200 185 / 10%)', color: 'var(--theme-primary)', borderColor: 'rgb(25 200 185 / 25%)' }}>
                <FlowerIcon size={16} />
              </div>
              <div>
                <div className="about-detail-card-label">最爱的事</div>
                <div className="about-detail-card-value">{authorInfo.hobbies}</div>
              </div>
            </div>
            <div className="about-detail-card">
              <div className="about-detail-card-icon" style={{ background: 'rgb(169 185 220 / 20%)', color: '#6b7fa3', borderColor: 'rgba(169,185,220,0.4)' }}>
                <MusicIcon size={16} />
              </div>
              <div>
                <div className="about-detail-card-label">常听的音乐</div>
                <div className="about-detail-card-value">{authorInfo.music}</div>
              </div>
            </div>
          </div>
          <div className="about-quote">
            <FeatherIcon size={14} />
            {authorInfo.quote}
          </div>
        </div>
      </div>
    </>
  );
}
