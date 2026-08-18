export const FALLBACK_IMAGE =
  'https://images.pexels.com/photos/25912582/pexels-photo-25912582.jpeg?auto=compress&cs=tinysrgb&w=800';

export function imgSrc(url: string, w: number): string {
  if (!url) return url;
  const sep = url.includes('?') ? '&' : '?';
  if (/[?&]w=\d+/.test(url)) {
    return url.replace(/([?&])w=\d+/, `$1w=${w}`);
  }
  return `${url}${sep}w=${w}`;
}

const LOCAL_PHOTO_RE = /^\/photos\/(.+?)\.(jpg|jpeg|png|webp)$/i;

function nearestWidth(w: number): number {
  if (w <= 480) return 480;
  if (w <= 800) return 800;
  return 1600;
}

export function coverSrc(url: string, w: number): string {
  if (!url) return imgSrc(FALLBACK_IMAGE, w);
  const m = url.match(LOCAL_PHOTO_RE);
  if (m) {
    return `/photos/opt/${m[1]}-${nearestWidth(w)}.webp`;
  }
  return imgSrc(url, w);
}