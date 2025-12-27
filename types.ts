export interface DecimalTime {
  hours: number;
  minutes: number;
  seconds: number;
  totalDecimalSeconds: number;
  percentOfDay: number;
}

export interface StandardTime {
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export type Theme = 'dark' | 'light' | 'sunset' | 'ocean';