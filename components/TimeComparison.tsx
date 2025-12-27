import React from 'react';
import { motion } from 'framer-motion';
import { DecimalTime, StandardTime } from '../types';
import { formatStandardTime } from '../utils/timeConversion';

interface TimeComparisonProps {
  decimalTime: DecimalTime;
  standardTime: StandardTime;
}

export function TimeComparison({ decimalTime, standardTime }: TimeComparisonProps) {
  return (
    <motion.div 
      className="time-comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <div className="time-block">
        <div className="time-block__value">
          {formatStandardTime(standardTime)}
        </div>
        <div className="time-block__label">Standard Time</div>
      </div>
      
      <div className="time-block">
        <div className="time-block__value">
          {decimalTime.percentOfDay.toFixed(2)}%
        </div>
        <div className="time-block__label">Day Progress</div>
      </div>
    </motion.div>
  );
}