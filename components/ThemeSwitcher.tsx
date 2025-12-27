import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun, Sunset, Waves, Shuffle, Maximize } from 'lucide-react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleRandomTheme = () => {
    const otherThemes = themes.filter(t => t.id !== currentTheme);
    const random = otherThemes[Math.floor(Math.random() * otherThemes.length)];
    onThemeChange(random.id);
  };

  const handleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        // Request fullscreen
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          // Safari
          await (document.documentElement as any).webkitRequestFullscreen();
        } else if ((document.documentElement as any).msRequestFullscreen) {
          // IE/Edge
          await (document.documentElement as any).msRequestFullscreen();
        }
      } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
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

      {/* Fullscreen Button - Mobile Only */}
      {isMobile && (
        <motion.button
          className="theme-btn fullscreen-btn"
          onClick={handleFullscreen}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Toggle Fullscreen"
          aria-label="Toggle fullscreen mode"
          style={{ marginLeft: 'var(--space-2)' }}
        >
          <Maximize size={18} />
        </motion.button>
      )}
    </motion.div>
  );
}