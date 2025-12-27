import React from 'react';
import { motion } from 'framer-motion';
import { useDecimalTime } from '../hooks/useDecimalTime';
import { AnalogClock } from './AnalogClock';
import { TimeComparison } from './TimeComparison';

export function DecimalClock() {
  const { decimalTime, standardTime } = useDecimalTime(20); // Higher refresh rate for smooth sweep
  
  // Responsive clock size calculation
  const [clockSize, setClockSize] = React.useState(300);
  
  React.useEffect(() => {
    function updateSize() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      
      // Calculate optimal size: Min of width - padding OR height constraint
      const maxWidth = Math.min(vw - 48, 400); // Max 400px or full width minus padding
      const maxHeight = vh * 0.42; // Max 42% of viewport height
      
      // Ensure it's not too small (min 220px)
      setClockSize(Math.max(Math.min(maxWidth, maxHeight), 220));
    }
    
    updateSize(); // Initial call
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <motion.div 
      className="glass-card clock-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {/* Clock Wrapper */}
      <div className="clock-wrapper">
        <AnalogClock 
          time={decimalTime} 
          size={clockSize} 
          showDigital={true} 
        />
      </div>

      {/* Time Comparison */}
      <TimeComparison 
        decimalTime={decimalTime}
        standardTime={standardTime}
      />
      
      {/* Info Section */}
      <motion.p
        className="info-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        10h • 100m • 100s
      </motion.p>
    </motion.div>
  );
}