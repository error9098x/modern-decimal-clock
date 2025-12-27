import { DecimalTime, StandardTime } from '../types';

/**
 * Converts standard time to French Revolutionary decimal time
 * 
 * Standard day: 24h × 60m × 60s = 86,400 seconds
 * Decimal day: 10h × 100m × 100s = 100,000 seconds
 */
export function toDecimalTime(date: Date): DecimalTime {
  const standardSeconds = 
    date.getHours() * 3600 + 
    date.getMinutes() * 60 + 
    date.getSeconds() + 
    date.getMilliseconds() / 1000;
  
  const STANDARD_DAY_SECONDS = 86400;
  const DECIMAL_DAY_SECONDS = 100000;
  
  const totalDecimalSeconds = 
    (standardSeconds / STANDARD_DAY_SECONDS) * DECIMAL_DAY_SECONDS;
  
  const hours = Math.floor(totalDecimalSeconds / 10000);
  const minutes = Math.floor((totalDecimalSeconds % 10000) / 100);
  const seconds = totalDecimalSeconds % 100;
  
  const percentOfDay = (totalDecimalSeconds / DECIMAL_DAY_SECONDS) * 100;
  
  return {
    hours,
    minutes,
    seconds,
    totalDecimalSeconds,
    percentOfDay
  };
}

export function getStandardTime(date: Date): StandardTime {
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    milliseconds: date.getMilliseconds()
  };
}

export function formatDecimalTime(time: DecimalTime): string {
  const h = time.hours.toString();
  const m = Math.floor(time.minutes).toString().padStart(2, '0');
  const s = Math.floor(time.seconds).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export function formatStandardTime(time: StandardTime): string {
  const h = time.hours.toString().padStart(2, '0');
  const m = time.minutes.toString().padStart(2, '0');
  const s = time.seconds.toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}