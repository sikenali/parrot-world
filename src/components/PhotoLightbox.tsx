import { useEffect, useCallback } from 'react';
import { coverSrc } from '../utils/img';

interface PhotoLightboxProps {
  photo: { src: string; caption: string } | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PhotoLightbox({ photo, onClose, onPrev, onNext }: PhotoLightboxProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!photo) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [photo, onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!photo) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="关闭">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <button className="lightbox-nav lightbox-prev" onClick={onPrev} aria-label="上一张">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button className="lightbox-nav lightbox-next" onClick={onNext} aria-label="下一张">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img src={coverSrc(photo.src, 1400)} alt={photo.caption} className="lightbox-img" />
        {photo.caption && <div className="lightbox-caption">{photo.caption}</div>}
      </div>
    </div>
  );
}
