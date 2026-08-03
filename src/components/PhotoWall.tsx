import { photos } from '../data/content';

export function PhotoWall() {
  return (
    <section className="section" id="photos">
      <div className="section-ribbon">
        <div className="section-ribbon-bg">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          {' '}生活照片墙
        </div>
        <div className="section-ribbon-sub">共 {photos.length} 张</div>
      </div>
      <div className="photo-wall-grid">
        {photos.map(p => (
          <div key={p.id} className={`photo-card ${p.wide ? 'wide' : ''} ${p.tall ? 'tall' : ''}`}>
            <img src={p.src} alt={p.caption} loading="lazy" decoding="async" />
            <div className="photo-caption">{p.caption}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
