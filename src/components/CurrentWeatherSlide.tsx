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
  todayRain: number;
}

export function CurrentWeatherSlide({ isActive, current, todayHigh, todayLow, todayRain }: Props) {
  const conditionText = getWeatherCondition(current.weatherCode);

  return (
    <div className={`absolute inset-0 px-4 md:px-16 pb-16 slide-transition flex flex-col justify-center items-center ${isActive ? 'slide-active' : 'slide-exit pointer-events-none opacity-0'}`}>
      <div className="glass-panel w-full max-w-7xl rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col items-center border border-white/10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-8 hero-stagger">
          <AnimatedWeatherIcon 
            code={current.weatherCode} 
            isDay={current.isDay} 
            className="w-32 h-32 md:w-48 md:h-48"
          />
          <span className="text-[100px] md:text-[160px] lg:text-[200px] font-display-temp font-bold text-primary-fixed leading-none tracking-tighter temp-glow-pulse select-none">
            {current.temp.toFixed(1)}°
          </span>
        </div>
        
        <div className="text-center mb-8 md:mb-10 hero-stagger">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-headline-lg font-bold text-on-surface mb-2 drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]">{conditionText}</h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-body-lg text-on-surface/70 flex items-center justify-center gap-4">
            <span>H: {todayHigh.toFixed(1)}°  L: {todayLow.toFixed(1)}°</span>
            <span className="text-on-surface/30">|</span>
            <span className="text-clear-blue flex items-center">
              <Droplets className="w-6 h-6 md:w-8 md:h-8 mr-2 animate-pulse" strokeWidth={1.5} />
              {todayRain}%
            </span>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full max-w-full">
          <MetricCard staggerClass="card-stagger-1 tv-float-1 sheen-delay-1" icon={<Droplets className="text-secondary-fixed w-8 h-8 md:w-10 md:h-10 mb-2 droplet-pulse" />} label="Humidity" value={`${current.humidity}%`} />
          <MetricCard staggerClass="card-stagger-2 tv-float-2 sheen-delay-2" icon={<Sun className="text-sunset-orange w-8 h-8 md:w-10 md:h-10 mb-2 sun-ray-pulse" />} label="UV Index" value={getUVDescriptor(current.uvIndex)} />
          <MetricCard 
            staggerClass="card-stagger-3 tv-float-3 sheen-delay-3"
            icon={
              <div className="relative mb-2 flex items-center justify-center">
                <Navigation 
                  className="text-clear-blue w-8 h-8 md:w-10 md:h-10 wind-needle-gust transition-transform duration-1000" 
                  style={{ transform: `rotate(${current.windDirection - 45}deg)` }}
                />
              </div>
            } 
            label="Wind" 
            value={`${current.windSpeed.toFixed(1)} km/h ${getWindCompassDirection(current.windDirection)}`} 
          />
          <MetricCard staggerClass="card-stagger-4 tv-float-4 sheen-delay-4" icon={<Eye className="text-primary-fixed-dim w-8 h-8 md:w-10 md:h-10 mb-2 eye-vis-pulse" />} label="Vis" value={`${current.visibility.toFixed(1)} km`} />
          <MetricCard staggerClass="card-stagger-5 tv-float-5 sheen-delay-5" icon={<Droplets className="text-clear-blue w-8 h-8 md:w-10 md:h-10 mb-2 droplet-pulse" />} label="Precip" value={`${current.precipitation.toFixed(1)} mm`} />
          <MetricCard staggerClass="card-stagger-6 tv-float-6 sheen-delay-6" icon={<Moon className="text-surface-tint w-8 h-8 md:w-10 md:h-10 mb-2 moon-phase-pulse" />} label="Moon" value={getMoonPhase()} />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, staggerClass = "" }: { icon: React.ReactNode, label: string, value: string, staggerClass?: string }) {
  return (
    <div className={`glass-panel rounded-2xl p-3 md:p-4 flex flex-col items-center flex-1 min-w-[110px] md:min-w-[130px] justify-center text-center transition-all duration-300 hover:scale-[1.05] hover:border-primary/40 ${staggerClass}`}>
      <div className="scale-90 md:scale-100 flex items-center justify-center">{icon}</div>
      <span className="text-[10px] md:text-xs text-on-surface/60 mb-1 uppercase tracking-widest whitespace-nowrap">{label}</span>
      <span className="text-sm md:text-lg lg:text-xl font-bold whitespace-nowrap">{value}</span>
    </div>
  );
}
