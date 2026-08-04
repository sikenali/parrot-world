import { describe, it, expect } from 'vitest';
import { imgSrc } from './img';

describe('imgSrc', () => {
  it('replaces existing w= query param', () => {
    expect(imgSrc('https://example.com/a.jpg?auto=compress&w=800', 400))
      .toBe('https://example.com/a.jpg?auto=compress&w=400');
  });

  it('appends w= when no query string exists', () => {
    expect(imgSrc('https://example.com/a.jpg', 400))
      .toBe('https://example.com/a.jpg?w=400');
  });

  it('appends w= when query string has no w', () => {
    expect(imgSrc('https://example.com/a.jpg?auto=compress', 400))
      .toBe('https://example.com/a.jpg?auto=compress&w=400');
  });

  it('returns empty string for empty input', () => {
    expect(imgSrc('', 400)).toBe('');
  });
});
