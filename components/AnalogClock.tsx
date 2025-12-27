import React from 'react';
import { motion } from 'framer-motion';
import { DecimalTime } from '../types';

interface AnalogClockProps {
  time: DecimalTime;
  size?: number;
  showDigital?: boolean;
}

export function AnalogClock({ 
  time, 
  size = 350, 
  showDigital = true 
}: AnalogClockProps) {
  
  // ============================================
  // CORE CALCULATIONS
  // ============================================
  
  const dayProgress = time.percentOfDay;
  
  const cx = size / 2;
  const cy = size / 2;
  
  const outerRadius = size / 2 - 4;
  const dialRadius = outerRadius - 20;
  const numberRadius = dialRadius - 28;
  
  // ============================================
  // HAND ANGLES (in degrees, 0 = 12 o'clock)
  // ============================================
  
  const hourAngleDeg = (
    time.hours + 
    time.minutes / 100 + 
    time.seconds / 10000
  ) * 36; // 10 hours = 360°
  
  const minuteAngleDeg = (
    time.minutes + 
    time.seconds / 100
  ) * 3.6; // 100 minutes = 360°
  
  const secondAngleDeg = time.seconds * 3.6; // 100 seconds = 360°

  // ============================================
  // HAND LENGTHS
  // ============================================
  
  const hourLength = dialRadius * 0.48;
  const minuteLength = dialRadius * 0.70;
  const secondLength = dialRadius * 0.82;
  const secondTailLength = 25;

  // ============================================
  // HELPER: Convert angle to endpoint coordinates
  // ============================================
  // 0° = 12 o'clock (pointing up)
  // 90° = 3 o'clock (pointing right)
  // 180° = 6 o'clock (pointing down)
  // 270° = 9 o'clock (pointing left)
  
  function getHandEndpoint(angleDeg: number, length: number) {
    const angleRad = (angleDeg - 90) * (Math.PI / 180); // -90 to convert from "up" reference
    return {
      x: cx + length * Math.cos(angleRad),
      y: cy + length * Math.sin(angleRad),
    };
  }
  
  function getHandTail(angleDeg: number, length: number) {
    const angleRad = (angleDeg + 90) * (Math.PI / 180); // opposite direction
    return {
      x: cx + length * Math.cos(angleRad),
      y: cy + length * Math.sin(angleRad),
    };
  }

  // ============================================
  // CALCULATE HAND POSITIONS
  // ============================================
  
  const hourEnd = getHandEndpoint(hourAngleDeg, hourLength);
  const minuteEnd = getHandEndpoint(minuteAngleDeg, minuteLength);
  const secondEnd = getHandEndpoint(secondAngleDeg, secondLength);
  const secondTail = getHandTail(secondAngleDeg, secondTailLength);
  
  // Position for the small circle near second hand tip
  const secondTipCircle = getHandEndpoint(secondAngleDeg, secondLength - 15);

  // ============================================
  // PROGRESS RING
  // ============================================
  
  const progressCircumference = outerRadius * 2 * Math.PI;
  const progressOffset = progressCircumference - (dayProgress / 100) * progressCircumference;

  const dotAngleRad = ((dayProgress / 100) * 360 - 90) * (Math.PI / 180);
  const dotX = cx + outerRadius * Math.cos(dotAngleRad);
  const dotY = cy + outerRadius * Math.sin(dotAngleRad);

  // ============================================
  // RENDER
  // ============================================

  return (
    <div 
      className="analog-clock"
      style={{ 
        position: 'relative',
        width: size, 
        height: size,
      }}
    >
      {/* ============================================
          LAYER 1: DIAL (Static elements)
          ============================================ */}
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        {/* Progress Ring Track */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={outerRadius} 
          fill="none" 
          stroke="var(--border)" 
          strokeWidth="3" 
          opacity="0.15" 
        />
        
        {/* Progress Ring Arc */}
        <circle
          cx={cx} 
          cy={cy} 
          r={outerRadius}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={progressCircumference}
          strokeDashoffset={progressOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ 
            filter: 'drop-shadow(0 0 6px var(--accent-glow))',
            transition: 'stroke-dashoffset 0.1s linear',
          }}
        />

        {/* Progress Dot */}
        <circle
          cx={dotX}
          cy={dotY}
          r="4"
          fill="var(--accent)"
          style={{ 
            filter: 'drop-shadow(0 0 8px var(--accent)) drop-shadow(0 0 12px var(--accent))',
            transition: 'cx 0.1s linear, cy 0.1s linear',
          }}
        />

        {/* Dial Face Background */}
        <circle 
          cx={cx} 
          cy={cy} 
          r={dialRadius + 5} 
          fill="var(--bg-primary)" 
          fillOpacity="0.4" 
        />
        
        {/* Tick Marks (100 total) */}
        {Array.from({ length: 100 }).map((_, i) => {
          const isHourMark = i % 10 === 0;
          const isFiveMinuteMark = i % 5 === 0 && !isHourMark;
          
          const angle = (i * 3.6 - 90) * (Math.PI / 180);
          
          let length: number;
          let width: number;
          let opacity: number;
          
          if (isHourMark) {
            length = 16;
            width = 2.5;
            opacity = 1;
          } else if (isFiveMinuteMark) {
            length = 10;
            width = 1.5;
            opacity = 0.5;
          } else {
            length = 5;
            width = 1;
            opacity = 0.25;
          }
          
          const x1 = cx + (dialRadius - length) * Math.cos(angle);
          const y1 = cy + (dialRadius - length) * Math.sin(angle);
          const x2 = cx + dialRadius * Math.cos(angle);
          const y2 = cy + dialRadius * Math.sin(angle);

          return (
            <line
              key={`tick-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--text-primary)"
              strokeWidth={width}
              strokeOpacity={opacity}
              strokeLinecap="round"
            />
          );
        })}

        {/* Hour Numbers (0-9) */}
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i * 36 - 90) * (Math.PI / 180);
          const x = cx + numberRadius * Math.cos(angle);
          const y = cy + numberRadius * Math.sin(angle);
          
          return (
            <text
              key={`num-${i}`}
              x={x}
              y={y}
              fill="var(--text-secondary)"
              fontSize="14"
              fontWeight="500"
              textAnchor="middle"
              dominantBaseline="central"
              style={{ 
                fontFamily: 'var(--font-mono)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {i}
            </text>
          );
        })}
      </svg>

      {/* ============================================
          LAYER 2: HANDS (Animated)
          ============================================ */}
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          pointerEvents: 'none',
        }}
      >
        {/* Hour Hand */}
        <motion.line
          x1={cx}
          y1={cy}
          initial={false}
          animate={{ 
            x2: hourEnd.x, 
            y2: hourEnd.y 
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 80, 
            damping: 20,
          }}
          stroke="var(--text-primary)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* Minute Hand */}
        <motion.line
          x1={cx}
          y1={cy}
          initial={false}
          animate={{ 
            x2: minuteEnd.x, 
            y2: minuteEnd.y 
          }}
          transition={{ 
            duration: 0.15, 
            ease: 'linear',
          }}
          stroke="var(--text-primary)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity={0.85}
        />

        {/* Second Hand - Tail (counterweight) */}
        <motion.line
          x1={cx}
          y1={cy}
          initial={false}
          animate={{ 
            x2: secondTail.x, 
            y2: secondTail.y 
          }}
          transition={{ 
            duration: 0.05, 
            ease: 'linear',
          }}
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity={0.7}
        />

        {/* Second Hand - Main */}
        <motion.line
          x1={cx}
          y1={cy}
          initial={false}
          animate={{ 
            x2: secondEnd.x, 
            y2: secondEnd.y 
          }}
          transition={{ 
            duration: 0.05, 
            ease: 'linear',
          }}
          stroke="var(--accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ 
            filter: 'drop-shadow(0 0 4px var(--accent-glow))',
          }}
        />

        {/* Second Hand - Tip Circle */}
        <motion.circle
          r="3.5"
          initial={false}
          animate={{ 
            cx: secondTipCircle.x, 
            cy: secondTipCircle.y 
          }}
          transition={{ 
            duration: 0.05, 
            ease: 'linear',
          }}
          fill="var(--accent)"
          style={{ 
            filter: 'drop-shadow(0 0 4px var(--accent))',
          }}
        />

        {/* Center Cap - Outer */}
        <circle 
          cx={cx} 
          cy={cy} 
          r="9" 
          fill="var(--bg-elevated)" 
          stroke="var(--border)" 
          strokeWidth="2" 
        />
        
        {/* Center Cap - Inner Accent */}
        <circle 
          cx={cx} 
          cy={cy} 
          r="4" 
          fill="var(--accent)"
          style={{ 
            filter: 'drop-shadow(0 0 4px var(--accent-glow))',
          }}
        />
      </svg>

      {/* ============================================
          LAYER 3: DIGITAL DISPLAY (Optional)
          ============================================ */}
      {showDigital && (
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.9rem, 3.5vw, 1.2rem)',
              fontWeight: 300,
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
              fontVariantNumeric: 'tabular-nums',
              opacity: 0.85,
              textShadow: '0 0 20px var(--bg-primary)',
            }}
          >
            <span style={{ color: 'var(--text-primary)' }}>
              {time.hours}
            </span>
            <span style={{ opacity: 0.4 }}>:</span>
            <span>
              {String(Math.floor(time.minutes)).padStart(2, '0')}
            </span>
            <span style={{ opacity: 0.4 }}>:</span>
            <span style={{ opacity: 0.6 }}>
              {String(Math.floor(time.seconds)).padStart(2, '0')}
            </span>
          </div>
          
          <div
            style={{
              fontSize: '0.55rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: 'var(--text-muted)',
              opacity: 0.5,
            }}
          >
            Decimal
          </div>
        </div>
      )}
    </div>
  );
}