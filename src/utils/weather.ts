import { 
  Sun, 
  Moon, 
  CloudSun, 
  Cloud, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudLightning,
  LucideIcon
} from 'lucide-react';

export function getWeatherIcon(code: number, isDay: boolean = true): LucideIcon {
  if (code === 0) {
    return isDay ? Sun : Moon;
  }
  if (code === 1 || code === 2) {
    return isDay ? CloudSun : Cloud;
  }
  if (code === 3 || code === 45 || code === 48) {
    return Cloud;
  }
  if (code >= 51 && code <= 57) {
    return CloudDrizzle;
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return CloudRain;
  }
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) {
    return CloudSnow;
  }
  if (code >= 95) {
    return CloudLightning;
  }
  return Cloud;
}

export function getWeatherCondition(code: number): string {
  const map: Record<number, string> = {
    0: 'Clear Sky', 
    1: 'Mainly Clear', 
    2: 'Partly Cloudy', 
    3: 'Overcast',
    45: 'Foggy', 
    48: 'Depositing Fog', 
    51: 'Light Drizzle', 
    53: 'Moderate Drizzle', 
    55: 'Dense Drizzle',
    56: 'Light Freezing Drizzle',
    57: 'Dense Freezing Drizzle',
    61: 'Slight Rain', 
    63: 'Moderate Rain', 
    65: 'Heavy Rain', 
    66: 'Light Freezing Rain',
    67: 'Heavy Freezing Rain',
    71: 'Slight Snowfall',
    73: 'Moderate Snowfall',
    75: 'Heavy Snowfall',
    77: 'Snow Grains',
    80: 'Slight Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Violent Rain Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Thunderstorm with Heavy Hail'
  };
  return map[code] || 'Cloudy';
}

export function getUVDescriptor(uv: number): string {
  if (uv <= 2) return `${Math.round(uv)} Low`;
  if (uv <= 5) return `${Math.round(uv)} Mod`;
  if (uv <= 7) return `${Math.round(uv)} High`;
  if (uv <= 10) return `${Math.round(uv)} Very High`;
  return `${Math.round(uv)} Ext`;
}

export function getMoonPhase(): string {
  const lp = 2551443; 
  const now = new Date();
  const newMoon = new Date(1970, 0, 7, 20, 35, 0);
  const phase = ((now.getTime() - newMoon.getTime()) / 1000) % lp;
  const age = phase / (24 * 3600);
  if (age < 1.84566) return "New";
  if (age < 5.53699) return "Waxing Cres";
  if (age < 9.22831) return "First Qtr";
  if (age < 12.91964) return "Waxing Gibb";
  if (age < 16.61096) return "Full";
  if (age < 20.30228) return "Waning Gibb";
  if (age < 23.99361) return "Last Qtr";
  if (age < 27.68493) return "Waning Cres";
  return "New";
}

export function getWindCompassDirection(deg: number): string {
  const index = Math.round(((deg % 360) / 22.5));
  const directions = [
    "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
    "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
  ];
  return directions[index % 16];
}

