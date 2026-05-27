import { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { CurrentWeatherSlide } from './components/CurrentWeatherSlide';
import { ForecastSlide } from './components/ForecastSlide';
import { CloudRain, AlertTriangle } from 'lucide-react';

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

interface DailyForecast {
  day: string;
  weatherCode: number;
  high: number;
  low: number;
  rain: number;
}

interface WeatherState {
  current: CurrentWeatherData;
  forecast: DailyForecast[];
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [progressWidth, setProgressWidth] = useState(0);
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const SLIDE_DURATION = 15000; // 15 seconds per slide

  // 1. Fetch live Christchurch weather
  useEffect(() => {
    async function fetchWeather() {
      try {
        const params = new URLSearchParams({
          latitude: '-43.5321',
          longitude: '172.6362',
          current: 'temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m,wind_direction_10m,visibility',
          daily: 'temperature_2m_max,temperature_2m_min,weather_code,uv_index_max,precipitation_probability_max',
          timezone: 'Pacific/Auckland',
          forecast_days: '7'
        });

        const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}&t=${Date.now()}`);
        if (!res.ok) throw new Error('Failed to fetch from weather API');
        const data = await res.json();

        const dailyForecasts: DailyForecast[] = data.daily.time.map((timeStr: string, idx: number) => {
          const date = new Date(timeStr);
          const dayName = idx === 0 ? 'Today' : date.toLocaleDateString('en-NZ', { weekday: 'short' });
          return {
            day: dayName,
            weatherCode: data.daily.weather_code[idx],
            high: Math.round(data.daily.temperature_2m_max[idx]),
            low: Math.round(data.daily.temperature_2m_min[idx]),
            rain: data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[idx] : 0
          };
        });

        setWeather({
          current: {
            temp: Math.round(data.current.temperature_2m),
            isDay: data.current.is_day === 1,
            weatherCode: data.current.weather_code,
            windSpeed: Math.round(data.current.wind_speed_10m),
            windDirection: data.current.wind_direction_10m,
            precipitation: data.current.precipitation,
            humidity: data.current.relative_humidity_2m,
            visibility: Math.round(data.current.visibility / 1000), // convert m to km
            uvIndex: data.daily.uv_index_max[0] || 0
          },
          forecast: dailyForecasts
        });
        setLoading(false);
        setError(false);
      } catch (err) {
        console.error('[Weather App] Fetch Error:', err);
        setError(true);
        setLoading(false);
      }
    }

    fetchWeather();
    const refreshInterval = setInterval(fetchWeather, 15 * 60 * 1000); // refresh every 15 mins
    return () => clearInterval(refreshInterval);
  }, []);

  // 2. Manage slide progression & progress bar
  useEffect(() => {
    if (loading || error) return;

    setProgressWidth(0);

    const timeout1 = setTimeout(() => {
      setProgressWidth(100);
    }, 50);

    const timeout2 = setTimeout(() => {
      setCurrentSlide((prev) => (prev === 1 ? 2 : 1));
    }, SLIDE_DURATION);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [currentSlide, loading, error]);

  return (
    <div className="bg-background text-on-surface font-body-md overflow-hidden w-screen h-screen flex flex-col relative text-white">
      <Background />
      <Header />
      
      <main className="flex-1 relative px-4 md:px-16 pb-16 z-10 w-full h-full flex items-center justify-center">
        {loading && (
          <div className="glass-panel w-full max-w-7xl rounded-[2rem] md:rounded-[3rem] p-12 flex flex-col items-center justify-center border border-white/10 animate-pulse min-h-[500px]">
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-white/5 mb-8"></div>
            <div className="h-12 w-64 bg-white/10 rounded-xl mb-4"></div>
            <div className="h-6 w-48 bg-white/5 rounded-lg mb-12"></div>
            <div className="flex gap-4 w-full justify-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex-1 min-w-[100px] h-28 bg-white/5 rounded-2xl"></div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="glass-panel w-full max-w-2xl rounded-[2rem] p-12 flex flex-col items-center justify-center border border-white/10 text-center">
            <AlertTriangle className="w-24 h-24 text-sunset-orange mb-6 animate-pulse" />
            <h2 className="text-4xl font-headline-lg font-bold mb-4">Connection Offline</h2>
            <p className="text-xl text-on-surface/60 mb-8">
              Unable to load live weather data for Christchurch. Please check your internet connection.
            </p>
            <button 
              onClick={() => { setLoading(true); setError(false); window.location.reload(); }}
              className="px-8 py-3 bg-primary text-black font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-md"
            >
              Retry Connection
            </button>
          </div>
        )}

        {!loading && !error && weather && (
          <>
            <CurrentWeatherSlide 
              isActive={currentSlide === 1} 
              current={weather.current}
              todayHigh={weather.forecast[0].high}
              todayLow={weather.forecast[0].low}
            />
            <ForecastSlide 
              isActive={currentSlide === 2} 
              forecasts={weather.forecast}
            />
          </>
        )}
      </main>

      {!loading && !error && (
        <div className="fixed bottom-0 left-0 w-full h-2 bg-surface-container-highest z-50">
          <div 
            className="h-full bg-primary progress-bar-fill" 
            style={{ 
              width: `${progressWidth}%`,
              transitionDuration: progressWidth === 0 ? '0s' : `${SLIDE_DURATION}ms`
            }} 
          />
        </div>
      )}
    </div>
  );
}
