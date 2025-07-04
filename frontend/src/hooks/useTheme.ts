import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>('system');
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

    // Detect system theme preference
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // Load saved theme preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
            setTheme(savedTheme);
        }
    }, []);

    // Apply theme to document
    useEffect(() => {
        const effectiveTheme = theme === 'system' ? systemTheme : theme;

        // Remove existing theme classes
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.removeAttribute('data-theme');

        // Apply new theme
        document.documentElement.classList.add(effectiveTheme);
        document.documentElement.setAttribute('data-theme', effectiveTheme);

        // Store theme preference
        localStorage.setItem('theme', theme);
    }, [theme, systemTheme]);

    const toggleTheme = () => {
        const themes: Theme[] = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        const nextIndex = (currentIndex + 1) % themes.length;
        setTheme(themes[nextIndex]);
    };

    const setSpecificTheme = (newTheme: Theme) => {
        setTheme(newTheme);
    };

    const effectiveTheme = theme === 'system' ? systemTheme : theme;

    return {
        theme,
        effectiveTheme,
        systemTheme,
        toggleTheme,
        setTheme: setSpecificTheme
    };
};