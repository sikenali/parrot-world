import { BirdIcon } from './Icons';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-brand">
            <span className="footer-brand-icon">
              <BirdIcon size={12} />
            </span>
            鹦鹉世界 · 紫米的小窝
          </div>
          <div className="footer-slogan">
            用 <span style={{ color: 'var(--theme-primary)' }}>&#9829;</span> 记录每一天
          </div>
        </div>
        <div className="footer-links">
          <div style={{ marginTop: 4 }}>
            &copy; 2026 ZiMi &middot; Powered by{' '}
            <a
              href="https://lazycat.cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-powered-link"
            >
              LightOS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
