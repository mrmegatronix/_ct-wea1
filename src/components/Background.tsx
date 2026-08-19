import { useEffect, useRef } from 'react';

interface Props {
  isDay: boolean;
  weatherCode: number;
  currentSlide?: number;
}

export function Background({ isDay, weatherCode, currentSlide = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{ x: number; y: number; v: number; l: number; w: number }> = [];

    const isSnow = (weatherCode >= 71 && weatherCode <= 77) || (weatherCode >= 85 && weatherCode <= 86);
    const isRain = (weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82);
    const isStorm = weatherCode >= 95;

    const particleType = isSnow ? 'snow' : (isRain || isStorm ? 'rain' : 'none');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    const count = particleType === 'none' ? 0 : (isStorm ? 120 : (isSnow ? 80 : 100));
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        v: isSnow ? (Math.random() * 1.5 + 1) : (Math.random() * 8 + 8),
        l: isSnow ? (Math.random() * 3 + 2) : (Math.random() * 15 + 15),
        w: isSnow ? (Math.random() * 0.6 - 0.3) : 0
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particleType === 'rain') {
        ctx.strokeStyle = 'rgba(174, 219, 255, 0.4)';
        ctx.lineWidth = 1.5;
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x - 1, p.y + p.l);
          ctx.stroke();
          
          p.y += p.v;
          p.x -= p.v * 0.05;
          
          if (p.y > canvas.height) {
            p.y = -p.l;
            p.x = Math.random() * canvas.width;
          }
        });
      } else if (particleType === 'snow') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        particles.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.l, 0, Math.PI * 2);
          ctx.fill();

          p.y += p.v;
          p.x += Math.sin(p.y * 0.01) * 0.5 + p.w;

          if (p.y > canvas.height) {
            p.y = -p.l;
            p.x = Math.random() * canvas.width;
          }
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    if (particleType !== 'none') {
      animate();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [weatherCode]);

  const slide1Bg = getSlideBackground(1, isDay, weatherCode);
  const slide2Bg = getSlideBackground(2, isDay, weatherCode);
  const slide3Bg = getSlideBackground(3, isDay, weatherCode);

  const hour = new Date().getHours();
  const showStars = !isDay && weatherCode < 3 && !(hour >= 6 && hour < 9) && !(hour >= 17 && hour < 20);

  return (
    <div className="bg-dynamic-weather bg-[#030408]">
      {/* Slide 1 Background Layer (Current Weather) */}
      <div 
        className={`absolute inset-0 ${slide1Bg} transition-opacity duration-1000 ease-in-out ${currentSlide === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />
      
      {/* Slide 2 Background Layer (Hourly Forecast) */}
      <div 
        className={`absolute inset-0 ${slide2Bg} transition-opacity duration-1000 ease-in-out ${currentSlide === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />
      
      {/* Slide 3 Background Layer (7-Day Forecast) */}
      <div 
        className={`absolute inset-0 ${slide3Bg} transition-opacity duration-1000 ease-in-out ${currentSlide === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />

      {/* Atmospheric Aurora layer with slide transition */}
      <div className={`aurora-bg transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-60'}`} />
      
      {/* Starfield for Night Mode */}
      <div className={`starfield ${showStars ? 'starfield-visible' : ''}`} />
      
      {/* Dynamic weather particles canvas (rain/snow) */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Animated ambient clouds */}
      {weatherCode >= 0 && (
        <div className={`transition-opacity duration-1000 ${weatherCode < 3 ? 'opacity-20' : 'opacity-90'}`}>
          <div className="cloud w-96 h-96 top-20 left-10" style={{ animationDuration: '120s' }}></div>
          <div className="cloud w-64 h-64 top-60 right-20" style={{ animationDuration: '80s', animationDelay: '-40s' }}></div>
          <div className="cloud w-80 h-80 top-1/2 left-1/3" style={{ animationDuration: '150s', animationDelay: '-20s', opacity: 0.6 }}></div>
        </div>
      )}
    </div>
  );
}

function getSlideBackground(slide: number, isDay: boolean, code: number): string {
  const hour = new Date().getHours();
  const isSunrise = hour >= 6 && hour < 9;
  const isSunset = hour >= 17 && hour < 20;

  if (slide === 1) {
    if (code >= 95) return 'bg-weather-stormy';
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'bg-weather-rainy';
    if (code >= 3) return 'bg-weather-cloudy';
    if (isSunrise) return 'bg-weather-sunrise';
    if (isSunset) return 'bg-weather-sunset';
    return isDay ? 'bg-weather-day-clear' : 'bg-weather-night';
  }

  if (slide === 2) {
    if (code >= 95) return 'bg-hourly-stormy';
    if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'bg-hourly-rainy';
    if (code >= 3) return 'bg-hourly-cloudy';
    if (isSunrise) return 'bg-hourly-sunrise';
    if (isSunset) return 'bg-hourly-sunset';
    return isDay ? 'bg-hourly-day-clear' : 'bg-hourly-night';
  }

  // slide === 3 (7-Day Forecast)
  if (code >= 95) return 'bg-forecast-stormy';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'bg-forecast-rainy';
  if (code >= 3) return 'bg-forecast-cloudy';
  if (isSunrise) return 'bg-forecast-sunrise';
  if (isSunset) return 'bg-forecast-sunset';
  return isDay ? 'bg-forecast-day-clear' : 'bg-forecast-night';
}
