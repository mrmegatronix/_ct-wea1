import { useState, useEffect } from 'react';
import { MapPin, RefreshCcw } from 'lucide-react';

export function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const displayDate = `${days[time.getDay()]}, ${months[time.getMonth()]} ${time.getDate()}`;

  return (
    <header className="w-full px-8 md:px-16 py-6 md:py-8 flex flex-col md:flex-row justify-between items-center z-50 gap-4 md:gap-0">
      <div className="flex flex-col items-center md:items-start">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline-lg font-bold text-on-surface flex items-center gap-3 text-center md:text-left">
          <MapPin className="text-primary w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 stroke-2" />
          Christchurch, New Zealand
        </h1>
        <span className="text-xs md:text-sm text-on-surface/50 mt-1 flex items-center gap-2">
          <RefreshCcw className="w-3.5 h-3.5" /> Last Synced: Just now
        </span>
      </div>
      <div className="text-center md:text-right">
        <div className="text-4xl md:text-5xl font-display-temp font-bold text-primary-fixed mb-1">
          <span>{displayHours}</span>
          <span className="blink">:</span>
          <span>{minutes}</span> <span className="text-2xl md:text-3xl pl-1">{ampm}</span>
        </div>
        <div className="text-xl md:text-2xl text-on-surface/70">{displayDate}</div>
      </div>
    </header>
  );
}
