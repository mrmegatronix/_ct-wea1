import React from 'react';
import { Droplets, Sun, Wind, Eye, Moon, Navigation } from 'lucide-react';
import { getWeatherCondition, getUVDescriptor, getMoonPhase, getWindCompassDirection } from '../utils/weather';
import { AnimatedWeatherIcon } from './AnimatedWeatherIcon';

interface CurrentWeatherData {
  temp: number;
  isDay: boolean;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  precipitation: number;
  humidity: number;
  visibility: number;
  uvIndex: number;
}

interface Props {
  isActive: boolean;
  current: CurrentWeatherData;
  todayHigh: number;
  todayLow: number;
}

export function CurrentWeatherSlide({ isActive, current, todayHigh, todayLow }: Props) {
  const conditionText = getWeatherCondition(current.weatherCode);

  return (
    <div className={`absolute inset-0 px-4 md:px-16 pb-16 slide-transition flex flex-col justify-center items-center ${isActive ? 'slide-active' : 'slide-exit pointer-events-none opacity-0'}`}>
      <div className="glass-panel w-full max-w-7xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col items-center border border-white/10">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-8">
          <AnimatedWeatherIcon 
            code={current.weatherCode} 
            isDay={current.isDay} 
            className="w-32 h-32 md:w-48 md:h-48"
          />
          <span className="text-[150px] md:text-[250px] font-display-temp font-bold text-primary-fixed leading-none tracking-tighter">
            {current.temp}°
          </span>
        </div>
        
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-5xl md:text-7xl font-headline-lg font-bold text-on-surface mb-4">{conditionText}</h2>
          <p className="text-3xl md:text-5xl font-body-lg text-on-surface/60 flex items-center justify-center gap-4">
            <span>H: {todayHigh}°  L: {todayLow}°</span>
            <span className="text-on-surface/30">|</span>
            <span className="text-clear-blue flex items-center">
              <Droplets className="w-8 h-8 md:w-12 md:h-12 mr-2" strokeWidth={1.5} />
              {current.precipitation > 0 ? `${current.precipitation.toFixed(1)} mm` : '0%'}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 w-full max-w-full">
          <MetricCard icon={<Droplets className="text-secondary-fixed w-8 h-8 md:w-10 md:h-10 mb-2" />} label="Humidity" value={`${current.humidity}%`} />
          <MetricCard icon={<Sun className="text-sunset-orange w-8 h-8 md:w-10 md:h-10 mb-2" />} label="UV Index" value={getUVDescriptor(current.uvIndex)} />
          <MetricCard 
            icon={
              <div className="relative mb-2 flex items-center justify-center">
                <Navigation 
                  className="text-clear-blue w-8 h-8 md:w-10 md:h-10 transition-transform duration-1000" 
                  style={{ transform: `rotate(${current.windDirection - 45}deg)` }}
                />
              </div>
            } 
            label="Wind" 
            value={`${current.windSpeed} km/h ${getWindCompassDirection(current.windDirection)}`} 
          />
          <MetricCard icon={<Eye className="text-primary-fixed-dim w-8 h-8 md:w-10 md:h-10 mb-2" />} label="Vis" value={`${current.visibility} km`} />
          <MetricCard icon={<Moon className="text-surface-tint w-8 h-8 md:w-10 md:h-10 mb-2" />} label="Moon" value={getMoonPhase()} />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="glass-panel rounded-2xl p-4 lg:p-6 flex flex-col items-center flex-1 min-w-[120px] justify-center text-center">
      {icon}
      <span className="text-xs md:text-lg text-on-surface/60 mb-1 uppercase tracking-widest whitespace-nowrap">{label}</span>
      <span className="text-xl md:text-3xl font-bold whitespace-nowrap">{value}</span>
    </div>
  );
}
