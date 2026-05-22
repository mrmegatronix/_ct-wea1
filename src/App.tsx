import { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { CurrentWeatherSlide } from './components/CurrentWeatherSlide';
import { ForecastSlide } from './components/ForecastSlide';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [progressWidth, setProgressWidth] = useState(0);
  const [currTemp, setCurrTemp] = useState(16);

  const SLIDE_DURATION = 15000; // 15 seconds per slide for demo

  useEffect(() => {
    // Reset progress to 0 without transition
    setProgressWidth(0);

    // After a very short delay, start the transition to 100%
    const timeout1 = setTimeout(() => {
      setProgressWidth(100);
    }, 50);

    // After duration, move to the next slide
    const timeout2 = setTimeout(() => {
      setCurrentSlide((prev) => {
        const next = prev === 1 ? 2 : 1;
        if (next === 1) {
          // mock fetch new data
          setCurrTemp(16 + Math.floor(Math.random() * 5) - 2);
        }
        return next;
      });
    }, SLIDE_DURATION);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [currentSlide]);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-hidden w-screen h-screen flex flex-col relative text-white">
      <Background />
      <Header />
      
      <main className="flex-1 relative px-4 md:px-16 pb-16 z-10 w-full h-full">
        <CurrentWeatherSlide isActive={currentSlide === 1} currTemp={currTemp} />
        <ForecastSlide isActive={currentSlide === 2} />
      </main>

      <div className="fixed bottom-0 left-0 w-full h-2 bg-surface-container-highest z-50">
        <div 
          className="h-full bg-primary progress-bar-fill" 
          style={{ 
            width: `${progressWidth}%`,
            transitionDuration: progressWidth === 0 ? '0s' : `${SLIDE_DURATION}ms`
          }} 
        />
      </div>
    </div>
  );
}
