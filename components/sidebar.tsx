'use client'

import { useState } from 'react'
import { MapPin, TrendingUp, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'

const cities = [
  { name: 'Samarinda', aqi: 78, status: 'moderate', population: '814k' },
  { name: 'Bontang', aqi: 45, status: 'good', population: '153k' },
  { name: 'Balikpapan', aqi: 92, status: 'unhealthy', population: '615k' },
]

export function Sidebar({ selectedCity, onCitySelect }: { selectedCity: string; onCitySelect: (city: string) => void }) {
  const [expandedCity, setExpandedCity] = useState<string | null>(null)
  const params = useParams()
  const currentRoute = params.city

  const getAqiColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950'
      case 'moderate':
        return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950'
      case 'unhealthy':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950'
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950'
    }
  }

  return (
    <aside className="w-80 border-r border-border bg-white dark:bg-slate-900 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">AeroSense</h1>
            <p className="text-xs text-muted-foreground">East Kalimantan</p>
          </div>
        </Link>
      </div>

      {/* Cities List */}
      <div className="flex-1 p-4 space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase px-2 mb-3">Monitored Cities</p>
        {cities.map((city) => (
          <Link href={`/dashboard/${city.name}`} key={city.name}>
            <button
              onClick={() => onCitySelect(city.name)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedCity === city.name
                  ? 'bg-primary/10 border-2 border-primary'
                  : 'bg-slate-50 dark:bg-slate-800 border-2 border-transparent hover:border-primary/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium text-sm text-foreground">{city.name}</p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getAqiColor(city.status)}`}>
                  AQI {city.aqi}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{city.status.charAt(0).toUpperCase() + city.status.slice(1)} Air Quality</p>
            </button>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border space-y-2">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Export Data</Button>
        <Button variant="outline" className="w-full">Print Report</Button>
      </div>
    </aside>
  )
}
