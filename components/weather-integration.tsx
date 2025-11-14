'use client'

import { Cloud, Droplets, Wind, Eye, Gauge } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface WeatherIntegrationProps {
  city: string
  temp: number
  humidity: number
  windSpeed: number
  visibility: number
  pressure: number
  condition: string
}

export function WeatherIntegration({
  city,
  temp,
  humidity,
  windSpeed,
  visibility,
  pressure,
  condition,
}: WeatherIntegrationProps) {
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'cloudy':
        return <Cloud className="w-12 h-12 text-slate-400" />
      case 'sunny':
        return <div className="w-12 h-12 text-yellow-400">☀️</div>
      case 'rainy':
        return <div className="w-12 h-12 text-blue-400">🌧️</div>
      default:
        return <Cloud className="w-12 h-12 text-slate-400" />
    }
  }

  const getAqiCorrelation = (humidity: number, windSpeed: number): string => {
    if (windSpeed > 15) return 'High wind helps disperse pollutants'
    if (humidity > 80) return 'High humidity can trap pollutants'
    return 'Normal conditions'
  }

  return (
    <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">Current Weather</h3>

      {/* Main Weather Display */}
      <div className="flex items-start justify-between mb-8 pb-8 border-b border-border">
        <div className="flex-1">
          <p className="text-5xl font-bold text-foreground mb-2">{temp}°C</p>
          <p className="text-sm text-muted-foreground capitalize">{condition}</p>
        </div>
        <div className="flex-shrink-0">{getWeatherIcon(condition)}</div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Humidity */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-xs text-muted-foreground font-medium">Humidity</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">{humidity}%</p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all" style={{ width: `${humidity}%` }} />
          </div>
        </div>

        {/* Wind Speed */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-teal-500" />
            <span className="text-xs text-muted-foreground font-medium">Wind Speed</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">{windSpeed} km/h</p>
          <p className="text-xs text-muted-foreground">Direction: NE</p>
        </div>

        {/* Visibility */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-amber-500" />
            <span className="text-xs text-muted-foreground font-medium">Visibility</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">{visibility} km</p>
        </div>

        {/* Pressure */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-purple-500" />
            <span className="text-xs text-muted-foreground font-medium">Pressure</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">{pressure} mb</p>
        </div>
      </div>

      {/* AQI Correlation */}
      <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
        <p className="text-xs font-medium text-foreground mb-2">Air Quality Correlation</p>
        <p className="text-sm text-muted-foreground">{getAqiCorrelation(humidity, windSpeed)}</p>
      </div>
    </Card>
  )
}
