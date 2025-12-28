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
    <>
      {/* Hidden SEO content - visible to search engines */}
      <h1 className="sr-only">
        Decimal Clock — French Revolutionary Time Converter
      </h1>
      
      <div className="app-container">
        {/* Header with theme switcher */}
        <header role="banner">
          <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
        </header>
        
        {/* Main content */}
        <main id="main-content" role="main">
          <AnimatePresence mode="wait">
            <motion.div
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
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* Footer */}
        <footer role="contentinfo" className="app-footer">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span itemScope itemType="https://schema.org/CreativeWork">
              <span itemProp="name">French Revolutionary Time</span>
              {' • '}
              <time itemProp="dateCreated" dateTime="1793">Est. 1793</time>
            </span>
          </motion.p>
          
          {/* Hidden SEO-friendly content */}
          <div className="sr-only">
            <h2>About Decimal Time</h2>
            <p>
              Decimal time, also known as French Revolutionary Time or metric time, 
              is a time measurement system that divides the day into 10 decimal hours, 
              each decimal hour into 100 decimal minutes, and each decimal minute 
              into 100 decimal seconds. This creates a total of 100,000 decimal 
              seconds per day, compared to 86,400 seconds in standard time.
            </p>
            <p>
              The decimal time system was introduced in France during the French 
              Revolution as part of the Republican Calendar and was officially 
              used from 1794 to 1800.
            </p>
            <h2>How to Convert Standard Time to Decimal Time</h2>
            <p>
              To convert standard time to decimal time: Calculate the total seconds 
              since midnight, divide by 86,400 (total seconds in a standard day), 
              then multiply by 100,000 (total decimal seconds in a day).
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;