import { useState, useEffect } from 'react';
import { notices } from '../data/loader';

export function NoticesBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % notices.length), 4000);
    return () => clearInterval(t);
  }, [notices.length]);

  return (
    <div className="notices-bar">
      <span>{notices[index].text}</span>
      {notices.map((_, i) => (
        <span
          key={i}
          className={`notice-dot ${index === i ? 'active' : ''}`}
          onClick={() => setIndex(i)}
        />
      ))}
    </div>
  );
}
