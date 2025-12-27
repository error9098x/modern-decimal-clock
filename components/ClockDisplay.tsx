import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DecimalTime } from '../types';

interface ClockDisplayProps {
  time: DecimalTime;
  variant?: 'default' | 'minimal';
}

export function ClockDisplay({ time, variant = 'default' }: ClockDisplayProps) {
  const hours = time.hours.toString();
  const minutes = Math.floor(time.minutes).toString().padStart(2, '0');
  const seconds = Math.floor(time.seconds).toString().padStart(2, '0');
  
  // Only show centiseconds if specifically needed or largely sized, 
  // but for minimal watch face, standard Seconds is cleaner.
  // We will keep them but styled subtly.
  const centiseconds = Math.floor((time.seconds % 1) * 100)
    .toString()
    .padStart(2, '0');

  const containerClasses = variant === 'minimal' 
    ? "flex flex-col items-center justify-center transform translate-y-20" // Shift down further to avoid hands
    : "clock-display";

  return (
    <div className={containerClasses}>
      <motion.div 
        className={variant === 'minimal' ? "clock-time-minimal" : "clock-time"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span className="tabular-nums inline-block text-center">
          {hours}:{minutes}<span className="opacity-50">:{seconds}</span>
        </span>
      </motion.div>
      
      {variant !== 'minimal' && (
        <motion.p 
          className="clock-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}
        >
          Decimal Time
        </motion.p>
      )}
    </div>
  );
}