import { useEffect, useRef } from 'react';

interface Props {
  isDay: boolean;
  weatherCode: number;
}

export function Background({ isDay, weatherCode }: Props) {
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

  const bgClass = getBackgroundClass(isDay, weatherCode);
  const hour = new Date().getHours();
  const showStars = !isDay && weatherCode < 3 && !(hour >= 6 && hour < 9) && !(hour >= 17 && hour < 20);

  return (
    <div className={`bg-dynamic-weather ${bgClass}`}>
      <div className="aurora-bg"></div>
      <div className={`starfield ${showStars ? 'starfield-visible' : ''}`}></div>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />
      {weatherCode >= 3 && (
        <>
          <div className="cloud w-96 h-96 top-20 left-10" style={{ animationDuration: '120s' }}></div>
          <div className="cloud w-64 h-64 top-60 right-20" style={{ animationDuration: '80s', animationDelay: '-40s' }}></div>
          <div className="cloud w-80 h-80 top-1/2 left-1/3" style={{ animationDuration: '150s', animationDelay: '-20s', opacity: 0.6 }}></div>
        </>
      )}
    </div>
  );
}

function getBackgroundClass(isDay: boolean, code: number): string {
  if (code >= 95) return 'bg-weather-stormy';
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) return 'bg-weather-rainy';
  if (code >= 3) return 'bg-weather-cloudy';
  
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 9) return 'bg-weather-sunrise';
  if (hour >= 17 && hour < 20) return 'bg-weather-sunset';
  
  return isDay ? 'bg-weather-day-clear' : 'bg-weather-night';
}
