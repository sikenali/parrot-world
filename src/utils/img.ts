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

export function coverSrc(url: string, w: number): string {
  if (!url) return imgSrc(FALLBACK_IMAGE, w);
  if (url.startsWith('/photos/') || url.startsWith('photos/')) return imgSrc(url, w);
  return imgSrc(url, w);
}