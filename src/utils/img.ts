export function imgSrc(url: string, w: number): string {
  if (!url) return url;
  const sep = url.includes('?') ? '&' : '?';
  if (/[?&]w=\d+/.test(url)) {
    return url.replace(/([?&])w=\d+/, `$1w=${w}`);
  }
  return `${url}${sep}w=${w}`;
}