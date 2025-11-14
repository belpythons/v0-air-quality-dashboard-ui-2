'use client'

import { Card } from '@/components/ui/card'
import { MapPin } from 'lucide-react'

interface InteractiveMapProps {
  selectedCity: string
}

const cityLocations = {
  'Samarinda': { lat: -0.5, lng: 113.75, aqi: 78 },
  'Bontang': { lat: 0.125, lng: 117.5, aqi: 45 },
  'Balikpapan': { lat: -1.25, lng: 116.75, aqi: 92 },
}

export function InteractiveMap({ selectedCity }: InteractiveMapProps) {
  const selectedData = cityLocations[selectedCity as keyof typeof cityLocations] || cityLocations['Samarinda']

  const getMarkerColor = (aqi: number) => {
    if (aqi <= 50) return '#10B981'
    if (aqi <= 100) return '#F59E0B'
    if (aqi <= 150) return '#F97316'
    return '#EF4444'
  }

  return (
    <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm h-full">
      <h2 className="text-lg font-semibold text-foreground mb-4">Air Quality Map - East Kalimantan</h2>
      
      {/* Map Container */}
      <div className="w-full h-80 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-lg border border-border relative overflow-hidden">
        {/* Simplified Map Representation */}
        <svg className="w-full h-full" viewBox="0 0 400 300">
          {/* Background */}
          <rect width="400" height="300" fill="currentColor" className="text-slate-100 dark:text-slate-700" />
          
          {/* Simplified regional outline */}
          <path
            d="M 50 100 Q 100 80, 150 90 L 200 100 Q 220 110, 200 140 L 150 150 Q 100 145, 70 130 Z"
            fill="currentColor"
            className="text-slate-200 dark:text-slate-600"
            opacity="0.5"
          />

          {/* City Markers */}
          {Object.entries(cityLocations).map(([city, data]) => (
            <g key={city}>
              <circle cx={(data.lng - 110) * 20} cy={(data.lat + 5) * 40 + 150} r="12" fill={getMarkerColor(data.aqi)} opacity="0.8" />
              <circle cx={(data.lng - 110) * 20} cy={(data.lat + 5) * 40 + 150} r="12" fill="none" stroke={getMarkerColor(data.aqi)} strokeWidth="2" opacity="0.3" />
              <text
                x={(data.lng - 110) * 20}
                y={(data.lat + 5) * 40 + 155}
                textAnchor="middle"
                fill="white"
                fontSize="10"
                fontWeight="bold"
              >
                {data.aqi}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* City Details Grid */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {Object.entries(cityLocations).map(([city, data]) => (
          <div key={city} className={`p-3 rounded-lg border ${selectedCity === city ? 'border-primary bg-primary/5' : 'border-border bg-slate-50 dark:bg-slate-700'}`}>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <p className="font-medium text-sm text-foreground">{city}</p>
            </div>
            <p className="text-2xl font-bold" style={{ color: getMarkerColor(data.aqi) }}>{data.aqi}</p>
            <p className="text-xs text-muted-foreground">AQI Level</p>
          </div>
        ))}
      </div>
    </Card>
  )
}
