import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import type { MD3Theme } from 'react-native-paper';
import { DarkTheme, LightTheme } from './themes';
import { getThemeMode, saveThemeMode } from 'src/shared/storage/storage';

// ─── Types ───────────────────────────────────────────────────────────────────
type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: MD3Theme;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (themeMode: ThemeMode) => void;
  toggleTheme: () => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ─── Provider ────────────────────────────────────────────────────────────────
export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [isLoaded, setIsLoaded] = useState(false); // ← guard

  // 1. Load stored theme once on mount
  useEffect(() => {
    async function loadTheme() {
      const storedTheme = await getThemeMode();
      setThemeMode((storedTheme as ThemeMode) || 'dark');
      setIsLoaded(true); // ← mark load as done
    }
    loadTheme();
  }, []); // runs once on mount

  // 2. Save only AFTER the initial load is done
  useEffect(() => {
    if (!isLoaded) return; // ← skip the first render/default value
    saveThemeMode(themeMode);
  }, [themeMode, isLoaded]);

  const isDark = useMemo(() => {
    if (themeMode === 'system') return systemScheme === 'dark';
    return themeMode === 'dark';
  }, [themeMode, systemScheme]);

  const theme = isDark ? DarkTheme : LightTheme;

  const toggleTheme = useCallback(() => {
    setThemeMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, themeMode, isDark, setThemeMode, toggleTheme }),
    [theme, themeMode, isDark, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────
export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useAppTheme must be used inside <ThemeContextProvider>');
  }
  return ctx;
}
