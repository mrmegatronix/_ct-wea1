import React from 'react';

interface Props {
  code: number;
  isDay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedWeatherIcon({ code, isDay = true, className = "w-16 h-16", style }: Props) {
  // Common gradients
  const Gradients = () => (
    <defs>
      <linearGradient id="sun-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="100%" stopColor="#FF8F00" />
      </linearGradient>
      <linearGradient id="cloud-silver" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ECEFF1" />
        <stop offset="100%" stopColor="#90A4AE" />
      </linearGradient>
      <linearGradient id="cloud-dark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#546E7A" />
        <stop offset="100%" stopColor="#263238" />
      </linearGradient>
      <linearGradient id="moon-glow" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ECEFF1" />
        <stop offset="100%" stopColor="#B0BEC5" />
      </linearGradient>
    </defs>
  );

  // 1. Clear Sky (Day)
  if (code === 0 && isDay) {
    return (
      <svg viewBox="0 0 64 64" className={`${className} icon-float`} style={style} overflow="visible">
        <Gradients />
        <g className="icon-spin">
          <circle cx="32" cy="32" r="14" fill="url(#sun-gold)" filter="drop-shadow(0 0 6px rgba(255, 143, 0, 0.4))" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect 
              key={deg}
              x="30" y="3" width="4" height="8" rx="2" 
              fill="#FFB300" 
              transform={`rotate(${deg} 32 32)`} 
            />
          ))}
        </g>
      </svg>
    );
  }

  // 2. Clear Sky (Night)
  if (code === 0 && !isDay) {
    return (
      <svg viewBox="0 0 64 64" className={`${className} icon-float`} style={style} overflow="visible">
        <Gradients />
        <path 
          d="M42 12 A 20 20 0 1 0 42 52 A 15 15 0 1 1 42 12" 
          fill="url(#moon-glow)" 
          filter="drop-shadow(0 0 4px rgba(236, 239, 241, 0.3))"
        />
        {/* Tiny pulsing stars */}
        <circle cx="16" cy="18" r="1" fill="#fff" className="blink" style={{ animationDelay: '0s' }} />
        <circle cx="48" cy="22" r="1.5" fill="#fff" className="blink" style={{ animationDelay: '1s' }} />
      </svg>
    );
  }

  // 3. Partly Cloudy (Day)
  if ((code === 1 || code === 2) && isDay) {
    return (
      <svg viewBox="0 0 64 64" className={`${className} icon-float`} style={style} overflow="visible">
        <Gradients />
        {/* Sun behind cloud */}
        <g className="icon-spin" transform="translate(-8, -8) scale(0.8)">
          <circle cx="32" cy="32" r="14" fill="url(#sun-gold)" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect 
              key={deg}
              x="30" y="3" width="4" height="8" rx="2" 
              fill="#FFB300" 
              transform={`rotate(${deg} 32 32)`} 
            />
          ))}
        </g>
        {/* Cloud in front */}
        <path 
          className="icon-drift-left-right"
          d="M46 48H18C11.4 48 6 42.6 6 36c0-6.2 4.6-11.3 10.6-11.9C17.8 15.6 25 9 33.5 9c9.3 0 17 6.8 18.5 15.8 5.6 1.1 10 5.9 10 11.7 0 6.3-5.2 11.5-11.5 11.5z" 
          fill="url(#cloud-silver)"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
        />
      </svg>
    );
  }

  // 4. Partly Cloudy (Night) / Cloudy / Overcast / Fog
  const isCloudy = code === 3 || code === 45 || code === 48 || (code <= 2 && !isDay);
  if (isCloudy) {
    return (
      <svg viewBox="0 0 64 64" className={`${className} icon-float`} style={style} overflow="visible">
        <Gradients />
        {/* Background cloud */}
        <path 
          d="M38 40H14C8.4 40 4 35.6 4 30c0-5.2 3.9-9.5 9-10C14 12 20 7 27.5 7c7.8 0 14.3 5.7 15.5 13.2 4.7 1 8.5 5 8.5 9.8 0 5.5-4.5 10-10 10z" 
          fill="url(#cloud-silver)"
          opacity="0.7"
          transform="translate(10, -6) scale(0.8)"
        />
        {/* Main cloud */}
        <path 
          className="icon-drift-left-right"
          d="M46 48H18C11.4 48 6 42.6 6 36c0-6.2 4.6-11.3 10.6-11.9C17.8 15.6 25 9 33.5 9c9.3 0 17 6.8 18.5 15.8 5.6 1.1 10 5.9 10 11.7 0 6.3-5.2 11.5-11.5 11.5z" 
          fill={code === 3 ? "url(#cloud-silver)" : "url(#cloud-silver)"}
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
        />
      </svg>
    );
  }

  // 5. Drizzle
  if (code >= 51 && code <= 57) {
    return (
      <svg viewBox="0 0 64 64" className={`${className} icon-float`} style={style} overflow="visible">
        <Gradients />
        <path 
          d="M46 38H18C11.4 38 6 32.6 6 26c0-6.2 4.6-11.3 10.6-11.9C17.8 5.6 25 -1 33.5 -1c9.3 0 17 6.8 18.5 15.8 5.6 1.1 10 5.9 10 11.7 0 6.3-5.2 11.5-11.5 11.5z" 
          fill="url(#cloud-silver)"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
        />
        {/* Tiny drizzle lines */}
        <g>
          <line x1="20" y1="42" x2="18" y2="48" stroke="#90CAF9" strokeWidth="2" strokeLinecap="round" className="icon-rain-drop" style={{ animationDelay: '0s' }} />
          <line x1="28" y1="42" x2="26" y2="48" stroke="#90CAF9" strokeWidth="2" strokeLinecap="round" className="icon-rain-drop" style={{ animationDelay: '0.5s' }} />
          <line x1="36" y1="42" x2="34" y2="48" stroke="#90CAF9" strokeWidth="2" strokeLinecap="round" className="icon-rain-drop" style={{ animationDelay: '0.2s' }} />
          <line x1="44" y1="42" x2="42" y2="48" stroke="#90CAF9" strokeWidth="2" strokeLinecap="round" className="icon-rain-drop" style={{ animationDelay: '0.7s' }} />
        </g>
      </svg>
    );
  }

  // 6. Rain (all rain and shower codes)
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return (
      <svg viewBox="0 0 64 64" className={`${className} icon-float`} style={style} overflow="visible">
        <Gradients />
        <path 
          d="M46 38H18C11.4 38 6 32.6 6 26c0-6.2 4.6-11.3 10.6-11.9C17.8 5.6 25 -1 33.5 -1c9.3 0 17 6.8 18.5 15.8 5.6 1.1 10 5.9 10 11.7 0 6.3-5.2 11.5-11.5 11.5z" 
          fill="url(#cloud-dark)"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.2))"
        />
        {/* Thick rain drops */}
        <g>
          <line x1="20" y1="42" x2="17" y2="52" stroke="#42A5F5" strokeWidth="3" strokeLinecap="round" className="icon-rain-drop" style={{ animationDelay: '0s' }} />
          <line x1="30" y1="42" x2="27" y2="52" stroke="#42A5F5" strokeWidth="3" strokeLinecap="round" className="icon-rain-drop" style={{ animationDelay: '0.4s' }} />
          <line x1="40" y1="42" x2="37" y2="52" stroke="#42A5F5" strokeWidth="3" strokeLinecap="round" className="icon-rain-drop" style={{ animationDelay: '0.8s' }} />
        </g>
      </svg>
    );
  }

  // 7. Snow
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return (
      <svg viewBox="0 0 64 64" className={`${className} icon-float`} style={style} overflow="visible">
        <Gradients />
        <path 
          d="M46 38H18C11.4 38 6 32.6 6 26c0-6.2 4.6-11.3 10.6-11.9C17.8 5.6 25 -1 33.5 -1c9.3 0 17 6.8 18.5 15.8 5.6 1.1 10 5.9 10 11.7 0 6.3-5.2 11.5-11.5 11.5z" 
          fill="url(#cloud-silver)"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"
        />
        {/* Floating/drifting snowflakes */}
        <g>
          {/* Snowflake 1 */}
          <g className="icon-snow-flake" style={{ animationDelay: '0s' }}>
            <circle cx="20" cy="46" r="2" fill="#fff" />
          </g>
          {/* Snowflake 2 */}
          <g className="icon-snow-flake" style={{ animationDelay: '1s' }}>
            <circle cx="30" cy="46" r="2.5" fill="#fff" />
          </g>
          {/* Snowflake 3 */}
          <g className="icon-snow-flake" style={{ animationDelay: '2.2s' }}>
            <circle cx="40" cy="46" r="2" fill="#fff" />
          </g>
        </g>
      </svg>
    );
  }

  // 8. Thunderstorm
  if (code >= 95) {
    return (
      <svg viewBox="0 0 64 64" className={`${className} icon-float`} style={style} overflow="visible">
        <Gradients />
        {/* Lightning bolt behind */}
        <polygon 
          points="26,38 34,38 28,48 38,48 24,62 30,48 24,48" 
          fill="#FFD54F" 
          className="icon-lightning-flash"
        />
        <path 
          d="M46 38H18C11.4 38 6 32.6 6 26c0-6.2 4.6-11.3 10.6-11.9C17.8 5.6 25 -1 33.5 -1c9.3 0 17 6.8 18.5 15.8 5.6 1.1 10 5.9 10 11.7 0 6.3-5.2 11.5-11.5 11.5z" 
          fill="url(#cloud-dark)"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))"
        />
        {/* Rain drops */}
        <g>
          <line x1="22" y1="42" x2="20" y2="50" stroke="#42A5F5" strokeWidth="2.5" strokeLinecap="round" className="icon-rain-drop" style={{ animationDelay: '0.2s' }} />
          <line x1="38" y1="42" x2="36" y2="50" stroke="#42A5F5" strokeWidth="2.5" strokeLinecap="round" className="icon-rain-drop" style={{ animationDelay: '0.8s' }} />
        </g>
      </svg>
    );
  }

  // Fallback (generic cloud)
  return (
    <svg viewBox="0 0 64 64" className={`${className} icon-float`} style={style} overflow="visible">
      <Gradients />
      <path 
        d="M46 48H18C11.4 48 6 42.6 6 36c0-6.2 4.6-11.3 10.6-11.9C17.8 15.6 25 9 33.5 9c9.3 0 17 6.8 18.5 15.8 5.6 1.1 10 5.9 10 11.7 0 6.3-5.2 11.5-11.5 11.5z" 
        fill="url(#cloud-silver)"
      />
    </svg>
  );
}
