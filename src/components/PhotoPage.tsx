import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { photos } from '../data/loader';
import { PhotoLightbox } from './PhotoLightbox';
import { coverSrc } from '../utils/img';
import { CameraIcon } from './Icons';

function getAllTags() {
  const set = new Set<string>();
  photos.forEach(p => (p.tags || []).forEach(t => set.add(t)));
  return ['全部', ...Array.from(set).sort()];
}

export function PhotoPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [lightboxPhoto, setLightboxPhoto] = useState<typeof photos[0] | null>(null);
  const allTags = useMemo(() => getAllTags(), []);
  const activeTag = searchParams.get('tag') || '全部';

  const filtered = activeTag === '全部'
    ? photos
    : photos.filter(p => (p.tags || []).includes(activeTag));

  const handleTagClick = (tag: string) => {
    if (tag === '全部') {
      setSearchParams({});
    } else {
      setSearchParams({ tag });
    }
  };

  const handlePhotoClick = (photo: typeof photos[0]) => {
    setLightboxPhoto(photo);
  };

  const handleClose = () => setLightboxPhoto(null);

  useEffect(() => {
    if (!lightboxPhoto) return;
    const idx = filtered.indexOf(lightboxPhoto);
    const neighbors = [filtered[idx - 1], filtered[idx + 1]].filter(Boolean);
    neighbors.forEach(p => {
      const img = new Image();
      img.src = coverSrc(p.src, 1600);
    });
  }, [lightboxPhoto]);
  const handlePrev = () => {
    if (!lightboxPhoto) return;
    const idx = filtered.indexOf(lightboxPhoto);
    if (idx > 0) setLightboxPhoto(filtered[idx - 1]);
  };
  const handleNext = () => {
    if (!lightboxPhoto) return;
    const idx = filtered.indexOf(lightboxPhoto);
    if (idx < filtered.length - 1) setLightboxPhoto(filtered[idx + 1]);
  };

  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="page-hero-badge page-hero-badge--photos">
            <CameraIcon size={12} />
            {' '}XiaoJiBaoBao
          </div>
          <h1 className="page-hero-title">我和紫米的欢乐时光</h1>
          <p className="page-hero-sub">共 {photos.length} 张 · 用镜头记录每一个平凡而温暖的瞬间</p>
        </div>
      </section>

      <div className="tag-filter-bar">
        {allTags.map(tag => (
          <button
            key={tag}
            className={`tag-filter-btn ${activeTag === tag ? 'active' : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📷</div>
          <div className="empty-state-text">这个标签下还没有照片</div>
        </div>
      ) : (
        <div className="photo-wall-grid">
          {filtered.map(p => (
            <div
              key={p.id}
              className={`photo-card ${p.wide ? 'wide' : ''} ${p.tall ? 'tall' : ''}`}
              onClick={() => handlePhotoClick(p)}
            >
              <img
                src={coverSrc(p.src, 600)}
                srcSet={`${coverSrc(p.src, 400)} 400w, ${coverSrc(p.src, 800)} 800w`}
                sizes="(max-width: 900px) 50vw, 25vw"
                alt={p.caption}
                loading="lazy"
                decoding="async"
              />
              <div className="photo-caption">{p.caption}</div>
            </div>
          ))}
        </div>
      )}

      <PhotoLightbox
        photo={lightboxPhoto}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
