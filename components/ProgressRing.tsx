import React from 'react';
import { motion } from 'framer-motion';

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({ 
  progress, 
  size = 300, 
  strokeWidth = 4 
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg 
      className="progress-ring" 
      width={size} 
      height={size}
      aria-label={`Day progress: ${progress.toFixed(1)}%`}
    >
      {/* Background circle */}
      <circle
        className="progress-ring__background"
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />
      
      {/* Progress circle */}
      <motion.circle
        className="progress-ring__progress"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.1, ease: 'linear' }}
      />
      
      {/* Hour markers */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i * 36 - 90) * (Math.PI / 180);
        const x1 = size / 2 + (radius - 15) * Math.cos(angle);
        const y1 = size / 2 + (radius - 15) * Math.sin(angle);
        const x2 = size / 2 + (radius - 8) * Math.cos(angle);
        const y2 = size / 2 + (radius - 8) * Math.sin(angle);
        
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--text-muted)"
            strokeWidth={2}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
}