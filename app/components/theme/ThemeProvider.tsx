'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';

export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'issueflow-theme';
const DEFAULT_THEME: Theme = 'dark';

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage may be unavailable (e.g. private mode). Theme still applies.
  }
}

function getInitialTheme(): Theme {
  if (typeof document === 'undefined') {
    return DEFAULT_THEME;
  }

  return document.documentElement.classList.contains('dark')
    ? 'dark'
    : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';

    applyTheme(next);
    setTheme(next);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
