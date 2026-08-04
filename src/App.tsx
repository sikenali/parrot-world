import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { NoticesBar } from './components/NoticesBar';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { useTheme } from './hooks/useTheme';

const PhotoPage = lazy(() => import('./components/PhotoPage').then(m => ({ default: m.PhotoPage })));
const BlogPage = lazy(() => import('./components/BlogPage').then(m => ({ default: m.BlogPage })));
const AboutPage = lazy(() => import('./components/AboutPage').then(m => ({ default: m.AboutPage })));
const PostDetail = lazy(() => import('./components/PostDetail').then(m => ({ default: m.PostDetail })));

function HomeLayout({ children }: { children?: React.ReactNode }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <Header
        activeTab={''}
        onTabChange={() => {}}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        isCompact={false}
      />
      <NoticesBar />
      <Hero />
      {children && (
        <main className="main-content main-content--full">
          <div className="content-primary">{children}</div>
        </main>
      )}
      <Footer />
    </>
  );
}

function BlogLayout({ children }: { children: React.ReactNode }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <>
      <Header
        activeTab={''}
        onTabChange={() => {}}
        isDark={isDark}
        onThemeToggle={toggleTheme}
        isCompact={false}
      />
      <NoticesBar />
      <main className="main-content main-content--narrow">
        <div className="content-primary">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="post-loading">
            <div className="post-loading-spinner" />
            <div className="post-loading-text">正在加载…</div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomeLayout />} />
          <Route path="/photos" element={
            <BlogLayout>
              <PhotoPage />
            </BlogLayout>
          } />
          <Route path="/daily" element={
            <BlogLayout>
              <BlogPage />
            </BlogLayout>
          } />
          <Route path="/about" element={
            <BlogLayout>
              <AboutPage />
            </BlogLayout>
          } />
          <Route path="/post/:slug" element={
            <BlogLayout>
              <PostDetail />
            </BlogLayout>
          } />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
