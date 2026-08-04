import { useState } from 'react';

const STORAGE_KEY = 'parrot-theme';

function readInitialTheme(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark';
  } catch {
    return false;
  }
}

export function useTheme() {
  const [isDark, setIsDark] = useState(readInitialTheme);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme-setting', next ? 'dark' : 'light');
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    } catch {
      /* ignore storage errors */
    }
  };

  return { isDark, toggleTheme };
}