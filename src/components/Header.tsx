import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { BirdIcon } from './Icons';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDark: boolean;
  onThemeToggle: () => void;
  isCompact: boolean;
}

export function Header({ onTabChange, isDark, onThemeToggle, isCompact }: HeaderProps) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleTabSelect = (id: string) => {
    onTabChange(id);
    setMenuOpen(false);
  };

  const tabs = [
    { id: 'photos', label: 'XiaoJiBaoBao', path: '/photos' },
    { id: 'moments', label: 'Peekaboo', path: '/daily' },
    { id: 'about', label: 'AboutZIMI', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className={`site-header${isCompact ? ' is-compact' : ''}${menuOpen ? ' is-menu-open' : ''}`} data-scroll-header>
      <div className="header-surface">
        <div className="header-inner">
          <Link to="/home" className="brand">
            <span className="brand-mark">
              <span className="brand-mark-inner">
                <BirdIcon size={22} />
              </span>
            </span>
            <span className="brand-copy">
              <strong>鹦鹉世界</strong>
              <small>ZiMi&apos;s Nest</small>
            </span>
          </Link>
          {!isCompact && (
            <div className="primary-nav" id="primary-navigation">
              <nav aria-label="主导航">
                <ul>
                  {tabs.map(t => (
                    <li key={t.id}>
                      <Link
                        to={t.path}
                        className={`nav-link ${isActive(t.path) ? 'active' : ''}`}
                        onClick={() => handleTabSelect(t.id)}
                      >
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
          <div className="header-actions">
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen(v => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          <button
            className="theme-toggle"
            type="button"
            aria-label={isDark ? '切换至亮色模式' : '切换至暗色模式'}
            onClick={onThemeToggle}
          >
            {isDark
              ? <span className="theme-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg></span>
              : <span className="theme-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="2" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="22" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg></span>
            }
          </button>
          </div>
        </div>
      </div>
    </header>
  );
}
