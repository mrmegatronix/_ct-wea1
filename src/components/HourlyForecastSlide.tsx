import { Droplets } from 'lucide-react';
import { AnimatedWeatherIcon } from './AnimatedWeatherIcon';

interface HourlyForecast {
  time: string;
  temp: number;
  weatherCode: number;
  rainProb: number;
  isDay?: boolean;
}

interface Props {
  isActive: boolean;
  hourly: HourlyForecast[];
}

export function HourlyForecastSlide({ isActive, hourly }: Props) {
  return (
    <div className={`absolute inset-0 px-4 md:px-8 pb-16 slide-transition flex flex-col justify-center items-center max-w-[95vw] mx-auto h-full ${isActive ? 'slide-active' : 'slide-exit pointer-events-none opacity-0'}`}>
      <div className="w-full flex flex-col justify-center items-center h-full max-h-[85vh]">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline-lg font-bold text-center text-[#a5b4fc] mb-6 md:mb-8 tracking-tight drop-shadow-[0_0_25px_rgba(165,180,252,0.4)] hero-stagger">
          Hourly Forecast
        </h2>
        <div className="flex gap-3 md:gap-4 w-full items-stretch justify-center pb-4 select-none">
          {hourly.map((h, i) => {
            const isNow = i === 0;
            const staggerIndex = Math.min(i + 1, 8);
            return (
              <div 
                key={h.time + i} 
                className={`flex-1 min-w-0 md:min-w-[90px] lg:min-w-[110px] xl:min-w-[130px] glass-panel rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-6 lg:p-8 flex flex-col items-center justify-between border border-white/10 transition-all duration-300 card-stagger-${staggerIndex} tv-float-${staggerIndex} sheen-delay-${staggerIndex} ${isNow ? 'bg-[#4338ca]/25 border-[#818cf8]/70 shadow-xl shadow-[#4338ca]/35 ring-1 ring-[#818cf8]/40 glow-pulse-indigo' : ''}`}
                style={{ minHeight: '260px', mdMinHeight: '320px' } as any}
              >
                <span className={`text-md md:text-lg lg:text-xl xl:text-2xl font-bold uppercase tracking-wider text-center ${isNow ? 'text-[#c7d2fe] drop-shadow-[0_0_10px_rgba(199,210,254,0.5)]' : 'text-on-surface/80'}`}>
                  {isNow ? 'Now' : h.time}
                </span>
                
                <div className="my-3 md:my-4 lg:my-6 flex items-center justify-center">
                  <AnimatedWeatherIcon 
                    code={h.weatherCode} 
                    isDay={h.isDay !== undefined ? h.isDay : true} 
                    className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" 
                    style={{ 
                      animationDelay: `${i * 0.3}s`,
                      filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.3))' 
                    }}
                  />
                </div>
                
                <div className="flex flex-col items-center gap-1 my-2">
                  <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-on-surface tracking-tighter">{h.temp.toFixed(1)}°</span>
                </div>
                
                <span className={`text-xs md:text-sm lg:text-base xl:text-lg text-clear-blue flex items-center mt-1 font-semibold ${h.rainProb === 0 ? 'opacity-0' : ''}`}>
                  <Droplets className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 mr-1" strokeWidth={2} />
                  {h.rainProb}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
