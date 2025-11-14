'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { AQIDisplay } from '@/components/aqi-display'
import { WeatherIntegration } from '@/components/weather-integration'
import { PollutantBreakdown } from '@/components/pollutant-breakdown'
import { CityComparisonTable } from '@/components/city-comparison-table'
import { HealthAdvisory } from '@/components/health-advisory'
import { DataVisualization } from '@/components/data-visualization'

const cityData = {
  samarinda: {
    displayName: 'Samarinda',
    aqi: 78,
    trend: 'up' as const,
    trendValue: 5,
    temp: 28,
    humidity: 78,
    windSpeed: 12,
    visibility: 8,
    pressure: 1013,
    condition: 'cloudy',
    pollutants: [
      { name: 'PM2.5', current: 45, whoLimit: 35, status: 'warning' as const },
      { name: 'PM10', current: 58, whoLimit: 50, status: 'warning' as const },
      { name: 'O3', current: 65, whoLimit: 100, status: 'safe' as const },
      { name: 'NO2', current: 32, whoLimit: 40, status: 'safe' as const },
    ],
  },
  bontang: {
    displayName: 'Bontang',
    aqi: 45,
    trend: 'down' as const,
    trendValue: 3,
    temp: 27,
    humidity: 75,
    windSpeed: 15,
    visibility: 12,
    pressure: 1012,
    condition: 'sunny',
    pollutants: [
      { name: 'PM2.5', current: 18, whoLimit: 35, status: 'safe' as const },
      { name: 'PM10', current: 25, whoLimit: 50, status: 'safe' as const },
      { name: 'O3', current: 42, whoLimit: 100, status: 'safe' as const },
      { name: 'NO2', current: 15, whoLimit: 40, status: 'safe' as const },
    ],
  },
  balikpapan: {
    displayName: 'Balikpapan',
    aqi: 165,
    trend: 'up' as const,
    trendValue: 8,
    temp: 29,
    humidity: 82,
    windSpeed: 8,
    visibility: 4,
    pressure: 1014,
    condition: 'cloudy',
    pollutants: [
      { name: 'PM2.5', current: 95, whoLimit: 35, status: 'danger' as const },
      { name: 'PM10', current: 128, whoLimit: 50, status: 'danger' as const },
      { name: 'O3', current: 120, whoLimit: 100, status: 'warning' as const },
      { name: 'NO2', current: 58, whoLimit: 40, status: 'danger' as const },
    ],
  },
}

const allCitiesData = [
  { name: 'Samarinda', aqi: 78, temp: 28, humidity: 78, status: 'moderate' as const },
  { name: 'Bontang', aqi: 45, temp: 27, humidity: 75, status: 'good' as const },
  { name: 'Balikpapan', aqi: 165, temp: 29, humidity: 82, status: 'unhealthy' as const },
]

export default function DashboardPage() {
  const params = useParams()
  const router = useRouter()
  const cityParam = (params.city as string).toLowerCase()
  const data = cityData[cityParam as keyof typeof cityData] || cityData.samarinda
  const cityName = data.displayName

  const handleViewDetails = (city: string) => {
    router.push(`/dashboard/${city.toLowerCase()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dasbor Kualitas Udara {cityName}</h1>
          <p className="text-muted-foreground">Pemantauan real-time dan rekomendasi kesehatan</p>
        </div>

        <div>
          <CityComparisonTable cities={allCitiesData} onViewDetails={handleViewDetails} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AQIDisplay city={cityName} aqi={data.aqi} trend={data.trend} trendValue={data.trendValue} />
          <div className="md:col-span-2">
            <WeatherIntegration
              city={cityName}
              temp={data.temp}
              humidity={data.humidity}
              windSpeed={data.windSpeed}
              visibility={data.visibility}
              pressure={data.pressure}
              condition={data.condition}
            />
          </div>
        </div>

        <div>
          <PollutantBreakdown pollutants={data.pollutants} />
        </div>

        <div>
          <DataVisualization selectedCity={cityName} />
        </div>

        <div>
          <HealthAdvisory aqi={data.aqi} city={cityName} />
        </div>
      </div>
    </div>
  )
}
