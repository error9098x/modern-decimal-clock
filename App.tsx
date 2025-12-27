import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DecimalClock } from './components/DecimalClock';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { Theme } from './types';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('decimal-clock-theme') as Theme;
    if (saved) return saved;
    
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('decimal-clock-theme', theme);
  }, [theme]);

  return (
    <div className="app-container">
      <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
      
      <AnimatePresence mode="wait">
        <motion.main
          key={theme}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'center',
            flex: 1,
            alignItems: 'center',
          }}
        >
          <DecimalClock />
        </motion.main>
      </AnimatePresence>
      
      {/* Footer - NOT fixed position */}
      <motion.footer
        className="app-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        French Revolutionary Time • Est. 1793
      </motion.footer>
    </div>
  );
}

export default App;