import { useState, useEffect, useCallback } from 'react';
import { DecimalTime, StandardTime } from '../types';
import { toDecimalTime, getStandardTime } from '../utils/timeConversion';

interface UseDecimalTimeReturn {
  decimalTime: DecimalTime;
  standardTime: StandardTime;
  date: Date;
}

export function useDecimalTime(updateInterval: number = 100): UseDecimalTimeReturn {
  const [date, setDate] = useState(() => new Date());
  
  const updateTime = useCallback(() => {
    setDate(new Date());
  }, []);
  
  useEffect(() => {
    const intervalId = setInterval(updateTime, updateInterval);
    return () => clearInterval(intervalId);
  }, [updateTime, updateInterval]);
  
  return {
    decimalTime: toDecimalTime(date),
    standardTime: getStandardTime(date),
    date
  };
}