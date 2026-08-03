import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { NoticesBar } from './components/NoticesBar';
import { Hero } from './components/Hero';
import { PhotoPage } from './components/PhotoPage';
import { BlogPage } from './components/BlogPage';
import { AboutPage } from './components/AboutPage';
import { PostDetail } from './components/PostDetail';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { useState } from 'react';

function HomeLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme-setting', next ? 'dark' : 'light');
  };

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
      <main className="main-content">
        <div className="content-primary">{children}</div>
        <Sidebar />
      </main>
      <Footer />
    </>
  );
}

function BlogLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme-setting', next ? 'dark' : 'light');
  };

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
      <Routes>
        <Route path="/" element={
          <HomeLayout>
            <PhotoPage />
            <BlogPage />
            <AboutPage />
          </HomeLayout>
        } />
        <Route path="/photos" element={
          <HomeLayout>
            <PhotoPage />
            <BlogPage />
            <AboutPage />
          </HomeLayout>
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
