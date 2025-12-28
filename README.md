# 🕐 Modern Decimal Clock

A beautiful, modern web application that displays time in the French Revolutionary Decimal Time system. Experience timekeeping as it was envisioned during the French Revolution (1793-1805), where each day was divided into 10 hours, each hour into 100 minutes, and each minute into 100 seconds.

![Modern Decimal Clock](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite)

## ✨ Features

- **Analog Decimal Clock**: Beautiful animated analog clock face showing decimal time
- **Digital Display**: Clear digital readout of decimal time
- **Time Comparison**: Side-by-side comparison of decimal time and standard time
- **Dark/Light Theme**: Smooth theme switching with system preference detection
- **Responsive Design**: Adapts beautifully to any screen size
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **Real-time Updates**: High-frequency updates for smooth second hand movement

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

🌐 **Live Demo:** [clock.sentryagent.io](https://clock.sentryagent.io)

1. Clone the repository:
```bash
git clone https://github.com/error9098x/modern-decimal-clock.git
cd modern-decimal-clock
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory. You can preview the production build with:

```bash
npm run preview
```

## 🎨 Project Structure

```
modern-decimal-clock/
├── components/
│   ├── AnalogClock.tsx      # Analog clock face component
│   ├── ClockDisplay.tsx      # Digital time display
│   ├── DecimalClock.tsx      # Main clock container
│   ├── ProgressRing.tsx      # Progress indicator ring
│   ├── ThemeSwitcher.tsx     # Theme toggle component
│   └── TimeComparison.tsx    # Decimal vs standard time comparison
├── hooks/
│   └── useDecimalTime.ts     # Custom hook for decimal time calculations
├── utils/
│   └── timeConversion.ts     # Time conversion utilities
├── App.tsx                   # Main application component
├── index.tsx                 # Application entry point
└── types.ts                  # TypeScript type definitions
```

## 🕐 How Decimal Time Works

The French Revolutionary Decimal Time system divides the day differently:

- **10 hours** per day (instead of 24)
- **100 minutes** per hour (instead of 60)
- **100 seconds** per minute (instead of 60)

This means:
- 1 decimal hour = 2.4 standard hours
- 1 decimal minute = 1.44 standard minutes
- 1 decimal second = 0.864 standard seconds

The clock automatically converts the current standard time to decimal time and displays it in real-time.

## 🛠️ Technologies Used

- **React 19.2.3** - UI library
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool and dev server
- **Framer Motion 12.23.26** - Animation library
- **Lucide React** - Icon library

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by the French Revolutionary Calendar and Decimal Time system (1793-1805)
- Built with modern web technologies for a smooth user experience

---

**French Revolutionary Time • Est. 1793**
