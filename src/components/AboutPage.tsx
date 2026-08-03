import { authorInfo } from '../data/loader';
import { LeafIcon, SunIcon, FlowerIcon, MusicIcon, FeatherIcon } from './Icons';

export function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-badge" style={{ background: 'var(--theme-accent)', color: 'var(--color-on-accent)' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 7h.01"/><path d="M3.4 18H12a8 8 0 0 0 8-8V7l-3-2a2 2 0 0 0-2.7.4L2 16v2a2 2 0 0 0 2 2h1"/></svg>
            {' '}关于紫米
          </div>
          <h1 className="page-hero-title">岛屿居民档案</h1>
          <p className="page-hero-sub">一只绿鹦鹉的岛屿生活记录</p>
        </div>
      </section>

      <div className="about-page">
        <img
          src="https://images.pexels.com/photos/247466/pexels-photo-247466.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="岛上的花园"
          className="about-page-hero"
          loading="lazy"
        />
        <div className="about-page-body">
          <div className="about-name-row">
            <img src={authorInfo.avatar} alt="紫米" className="about-avatar" />
            <div>
              <div className="about-name">{authorInfo.name}</div>
              <div className="about-nick">绿鹦鹉 · 岛屿居民 · 花园园丁</div>
            </div>
          </div>
          <div className="about-bio">
            我是一只绿色的鹦鹉，最喜欢的事情就是在岛上散步、收集种子、和邻居们聊天。我的窝在岛最东边的那棵椰子树下，每天清晨听着海浪声醒来，傍晚坐在阳台上看着太阳沉入海平面。这里没有闹钟，没有打卡，只有风的声音和朋友的问候。
          </div>
          <div className="about-grid">
            <div className="about-detail-card">
              <div className="about-detail-card-icon" style={{ background: 'rgb(111 186 44 / 10%)', color: '#6fba2c', borderColor: 'rgb(111 186 44 / 25%)' }}>
                <LeafIcon size={16} />
              </div>
              <div>
                <div className="about-detail-card-label">性格类型</div>
                <div className="about-detail-card-value">INFP · 调停者</div>
              </div>
            </div>
            <div className="about-detail-card">
              <div className="about-detail-card-icon" style={{ background: 'rgb(247 205 103 / 15%)', color: 'var(--theme-accent)', borderColor: 'rgba(247,205,103,0.4)' }}>
                <SunIcon size={16} />
              </div>
              <div>
                <div className="about-detail-card-label">岛上住所</div>
                <div className="about-detail-card-value">东边椰子树下的窝</div>
              </div>
            </div>
            <div className="about-detail-card">
              <div className="about-detail-card-icon" style={{ background: 'rgb(25 200 185 / 10%)', color: 'var(--theme-primary)', borderColor: 'rgb(25 200 185 / 25%)' }}>
                <FlowerIcon size={16} />
              </div>
              <div>
                <div className="about-detail-card-label">最爱的事</div>
                <div className="about-detail-card-value">园艺 · 烘焙 · 散步</div>
              </div>
            </div>
            <div className="about-detail-card">
              <div className="about-detail-card-icon" style={{ background: 'rgb(169 185 220 / 20%)', color: '#6b7fa3', borderColor: 'rgba(169,185,220,0.4)' }}>
                <MusicIcon size={16} />
              </div>
              <div>
                <div className="about-detail-card-label">常听的音乐</div>
                <div className="about-detail-card-value">岛歌 BGM · 轻音乐</div>
              </div>
            </div>
          </div>
          <div className="about-quote">
            <FeatherIcon size={14} />
            假如我再也见不到你，祝你早安，午安，晚安。
          </div>
        </div>
      </div>
    </>
  );
}
