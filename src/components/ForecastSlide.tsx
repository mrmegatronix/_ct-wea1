import { CloudSun, CloudRain, Cloud, Sun, Droplets } from 'lucide-react';

interface Props {
  isActive: boolean;
}

export function ForecastSlide({ isActive }: Props) {
  // Mock forecast data for 7 days
  const forecasts = [
    { day: 'Today', icon: CloudSun, high: 18, low: 10, rain: 10, highlight: true },
    { day: 'Tue', icon: CloudRain, high: 15, low: 9, rain: 80 },
    { day: 'Wed', icon: Cloud, high: 16, low: 8, rain: 30 },
    { day: 'Thu', icon: Sun, high: 19, low: 10, rain: 0 },
    { day: 'Fri', icon: Sun, high: 21, low: 12, rain: 0 },
    { day: 'Sat', icon: CloudSun, high: 22, low: 13, rain: 0 },
    { day: 'Sun', icon: Cloud, high: 18, low: 11, rain: 20 },
  ];

  return (
    <div className={`absolute inset-0 px-4 md:px-16 pb-16 slide-transition flex flex-col justify-center items-center max-w-7xl mx-auto h-full ${isActive ? 'slide-active' : 'slide-exit pointer-events-none opacity-0'}`}>
      <div className="w-full">
        <h2 className="text-4xl md:text-6xl font-headline-lg font-bold text-center text-primary mb-8 md:mb-12 mt-8 md:mt-0">
          7-Day Forecast
        </h2>
        <div className="flex gap-2 md:gap-4 w-full h-full md:h-auto items-stretch justify-center pb-4 overflow-x-auto">
          {forecasts.map((f, i) => (
            <div 
              key={f.day} 
              className={`flex-1 min-w-[80px] md:min-w-[120px] glass-panel rounded-2xl md:rounded-[2rem] p-3 md:p-6 flex flex-col items-center justify-between ${f.highlight ? 'bg-primary/10 border-primary/30' : ''}`}
            >
              <span className={`text-lg md:text-2xl mt-2 uppercase tracking-wider ${f.highlight ? 'text-primary font-bold' : 'text-on-surface/70'}`}>
                {f.day}
              </span>
              <f.icon className="w-10 h-10 md:w-16 md:h-16 text-on-surface animate-float" style={{ animationDelay: `${i * 0.5}s` }} strokeWidth={1} />
              <div className="flex flex-col items-center gap-1 my-2">
                <span className="text-3xl md:text-5xl font-bold text-on-surface">{f.high}°</span>
                <span className="text-xl md:text-3xl text-on-surface/50">{f.low}°</span>
              </div>
              <span className={`text-sm md:text-xl text-clear-blue flex items-center mb-2 ${f.rain === 0 ? 'opacity-0' : ''}`}>
                <Droplets className="w-4 h-4 md:w-6 md:h-6 mr-1" />
                {f.rain}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
