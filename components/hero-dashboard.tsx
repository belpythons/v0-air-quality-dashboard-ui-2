'use client'

import { Cloud, Droplets, Wind } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface HeroDashboardProps {
  selectedCity: string
}

const cityData = {
  'Samarinda': { aqi: 78, status: 'Moderate', temp: 28, humidity: 78, wind: 12, pollutant: 'PM2.5' },
  'Bontang': { aqi: 45, status: 'Good', temp: 27, humidity: 75, wind: 15, pollutant: 'PM10' },
  'Balikpapan': { aqi: 92, status: 'Unhealthy', temp: 29, humidity: 82, wind: 8, pollutant: 'O3' },
}

export function HeroDashboard({ selectedCity }: HeroDashboardProps) {
  const data = cityData[selectedCity as keyof typeof cityData] || cityData['Samarinda']
  
  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'text-emerald-600 dark:text-emerald-400'
    if (aqi <= 100) return 'text-amber-600 dark:text-amber-400'
    if (aqi <= 150) return 'text-orange-600 dark:text-orange-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getStatusColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-emerald-500'
    if (aqi <= 100) return 'bg-amber-500'
    if (aqi <= 150) return 'bg-orange-500'
    return 'bg-red-500'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Main AQI Card */}
      <Card className="md:col-span-1 p-6 bg-white dark:bg-slate-800 border-0 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-sm font-medium text-muted-foreground">{selectedCity} Air Quality</p>
          
          {/* Circular Progress */}
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-border" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeDasharray={`${(data.aqi / 500) * 2 * Math.PI * 54} ${2 * Math.PI * 54}`}
                className={`transition-colors ${getStatusColor(data.aqi)}`}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className={`text-3xl font-bold ${getAqiColor(data.aqi)}`}>{data.aqi}</p>
              <p className="text-xs text-muted-foreground">AQI</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className={`text-lg font-semibold ${getAqiColor(data.aqi)}`}>{data.status}</p>
            <p className="text-xs text-muted-foreground mt-1">Main Pollutant: {data.pollutant}</p>
          </div>
        </div>
      </Card>

      {/* Weather Info Cards */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Temperature</p>
            <p className="text-3xl font-bold text-foreground">{data.temp}°C</p>
          </div>
          <Cloud className="w-8 h-8 text-primary" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Humidity</span>
            <span className="font-medium">{data.humidity}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-1"></div>
        </div>
      </Card>

      <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Wind Speed</p>
            <p className="text-3xl font-bold text-foreground">{data.wind} km/h</p>
          </div>
          <Wind className="w-8 h-8 text-accent" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Direction</span>
            <span className="font-medium">NE</span>
          </div>
          <div className="w-full bg-border rounded-full h-1"></div>
        </div>
      </Card>
    </div>
  )
}
