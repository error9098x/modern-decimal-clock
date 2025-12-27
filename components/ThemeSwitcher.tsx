import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Sunset, Waves, Shuffle } from 'lucide-react';
import { Theme } from '../types';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

const themes: { id: Theme; icon: React.ReactNode; label: string }[] = [
  { id: 'dark', icon: <Moon size={18} />, label: 'Dark' },
  { id: 'light', icon: <Sun size={18} />, label: 'Light' },
  { id: 'sunset', icon: <Sunset size={18} />, label: 'Sunset' },
  { id: 'ocean', icon: <Waves size={18} />, label: 'Ocean' },
];

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const handleRandomTheme = () => {
    const otherThemes = themes.filter(t => t.id !== currentTheme);
    const random = otherThemes[Math.floor(Math.random() * otherThemes.length)];
    onThemeChange(random.id);
  };

  return (
    <motion.div 
      className="theme-switcher"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {themes.map((theme) => (
        <motion.button
          key={theme.id}
          className="theme-btn"
          data-active={currentTheme === theme.id}
          onClick={() => onThemeChange(theme.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={theme.label}
          aria-label={`Switch to ${theme.label} theme`}
        >
          {theme.icon}
        </motion.button>
      ))}
      
      {/* Get Lucky Button */}
      <motion.button
        className="theme-btn"
        onClick={handleRandomTheme}
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.95 }}
        title="Get Lucky - Random Theme"
        aria-label="Switch to random theme"
        style={{ marginLeft: 'var(--space-2)' }}
      >
        <Shuffle size={18} />
      </motion.button>
    </motion.div>
  );
}