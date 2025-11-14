'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'

interface CityData {
  name: string
  aqi: number
  temp: number
  humidity: number
  status: 'good' | 'moderate' | 'unhealthy'
}

interface DashboardCityNavProps {
  cities: CityData[]
  currentCity?: string
}

export function DashboardCityNav({ cities, currentCity }: DashboardCityNavProps) {
  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-emerald-500 text-white'
    if (aqi <= 100) return 'bg-amber-500 text-white'
    if (aqi <= 150) return 'bg-orange-500 text-white'
    return 'bg-red-500 text-white'
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      good: 'Baik',
      moderate: 'Sedang',
      unhealthy: 'Tidak Sehat',
    }
    return labels[status] || status
  }

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-border shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center gap-4 overflow-x-auto">
          {cities.map((city) => {
            const isActive = currentCity?.toLowerCase() === city.name.toLowerCase()
            return (
              <Link
                key={city.name}
                href={`/dashboard/${city.name.toLowerCase()}`}
                className={`flex-shrink-0 px-4 py-3 rounded-lg border-2 transition-all hover:shadow-md ${
                  isActive
                    ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20'
                    : 'border-border bg-white dark:bg-slate-800 hover:border-teal-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-semibold text-sm">{city.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${getAqiColor(city.aqi)}`}>
                        {city.aqi}
                      </span>
                      <span className="text-xs text-muted-foreground">{getStatusLabel(city.status)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
