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
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline-lg font-bold text-center text-primary mb-6 md:mb-8 tracking-tight">
          7-Day Forecast
        </h2>
        <div className="flex gap-3 md:gap-4 w-full items-stretch justify-center pb-4 select-none">
          {forecasts.map((f, i) => {
            const isToday = f.day === 'Today';
            return (
              <div 
                key={f.day} 
                className={`flex-1 min-w-0 md:min-w-[90px] lg:min-w-[110px] xl:min-w-[130px] glass-panel rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-6 lg:p-8 flex flex-col items-center justify-between border border-white/10 transition-all duration-300 hover:scale-[1.03] hover:border-primary/45 ${isToday ? 'bg-primary/10 border-primary/30 shadow-lg shadow-primary/5' : ''}`}
                style={{ minHeight: '260px', mdMinHeight: '320px' } as any}
              >
                <span className={`text-md md:text-lg lg:text-xl xl:text-2xl font-bold uppercase tracking-wider ${isToday ? 'text-primary' : 'text-on-surface/80'}`}>
                  {f.day}
                </span>
                
                <div className="my-3 md:my-4 lg:my-6 flex items-center justify-center">
                  <AnimatedWeatherIcon 
                    code={f.weatherCode} 
                    isDay={true} 
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" 
                    style={{ 
                      animationDelay: `${i * 0.4}s`,
                      filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' 
                    }}
                  />
                </div>
                
                <div className="flex flex-col items-center gap-1 my-2">
                  <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-on-surface tracking-tighter">{f.high.toFixed(1)}°</span>
                  <span className="text-sm md:text-base lg:text-lg xl:text-xl text-on-surface/40 font-medium">{f.low.toFixed(1)}°</span>
                </div>
                
                <span className={`text-xs md:text-sm lg:text-base xl:text-lg text-clear-blue flex items-center mt-1 font-semibold ${f.rain === 0 ? 'opacity-0' : ''}`}>
                  <Droplets className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-1" strokeWidth={2} />
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
