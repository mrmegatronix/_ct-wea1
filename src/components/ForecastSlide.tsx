import { Droplets } from 'lucide-react';
import { AnimatedWeatherIcon } from './AnimatedWeatherIcon';

interface DailyForecast {
  day: string;
  weatherCode: number;
  high: number;
  low: number;
  rain: number;
}

interface Props {
  isActive: boolean;
  forecasts: DailyForecast[];
}

export function ForecastSlide({ isActive, forecasts }: Props) {
  return (
    <div className={`absolute inset-0 px-4 md:px-8 pb-16 slide-transition flex flex-col justify-center items-center max-w-[95vw] mx-auto h-full ${isActive ? 'slide-active' : 'slide-exit pointer-events-none opacity-0'}`}>
      <div className="w-full flex flex-col justify-center items-center h-full max-h-[85vh]">
        <h2 className="text-5xl md:text-7xl font-headline-lg font-bold text-center text-primary mb-10 md:mb-16 tracking-tight">
          7-Day Forecast
        </h2>
        <div className="flex gap-4 md:gap-6 w-full items-stretch justify-center pb-6 overflow-x-auto select-none">
          {forecasts.map((f, i) => {
            const isToday = f.day === 'Today';
            return (
              <div 
                key={f.day} 
                className={`flex-1 min-w-[130px] md:min-w-[160px] lg:min-w-[180px] xl:min-w-[200px] glass-panel rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 flex flex-col items-center justify-between border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:border-primary/45 ${isToday ? 'bg-primary/10 border-primary/30 shadow-lg shadow-primary/5' : ''}`}
                style={{ minHeight: '360px' }}
              >
                <span className={`text-xl md:text-3xl font-bold uppercase tracking-wider ${isToday ? 'text-primary' : 'text-on-surface/80'}`}>
                  {f.day}
                </span>
                
                <div className="my-6 md:my-10 flex items-center justify-center">
                  <AnimatedWeatherIcon 
                    code={f.weatherCode} 
                    isDay={true} 
                    className="w-16 h-16 md:w-28 md:h-28" 
                    style={{ 
                      animationDelay: `${i * 0.4}s`,
                      filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' 
                    }}
                  />
                </div>
                
                <div className="flex flex-col items-center gap-2 my-4">
                  <span className="text-4xl md:text-6xl font-bold text-on-surface tracking-tighter">{f.high}°</span>
                  <span className="text-2xl md:text-3xl text-on-surface/40 font-medium">{f.low}°</span>
                </div>
                
                <span className={`text-md md:text-2xl text-clear-blue flex items-center mt-2 font-semibold ${f.rain === 0 ? 'opacity-0' : ''}`}>
                  <Droplets className="w-5 h-5 md:w-7 md:h-7 mr-1.5 animate-pulse" strokeWidth={2} />
                  {f.rain}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
