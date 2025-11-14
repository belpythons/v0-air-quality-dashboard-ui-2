'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ChevronUp, ChevronDown, Eye } from 'lucide-react'

interface CityData {
  name: string
  aqi: number
  temp: number
  humidity: number
  status: 'good' | 'moderate' | 'unhealthy'
}

interface CityComparisonTableProps {
  cities: CityData[]
  onViewDetails: (cityName: string) => void
}

export function CityComparisonTable({ cities, onViewDetails }: CityComparisonTableProps) {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'aqi',
    direction: 'desc',
  })

  const sortedCities = [...cities].sort((a, b) => {
    const key = sortConfig.key as keyof CityData
    const aValue = a[key]
    const bValue = b[key]

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
    }
    return 0
  })

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'desc' ? 'asc' : 'desc',
    })
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      good: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300',
      moderate: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300',
      unhealthy: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300',
    }
    return badges[status as keyof typeof badges] || badges.moderate
  }

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')
  }

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig.key !== columnKey) return <div className="w-4 h-4" />
    return sortConfig.direction === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />
  }

  return (
    <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">Perbandingan Kota</h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-foreground transition-colors" onClick={() => handleSort('name')}>
                  Kota
                  <SortIcon columnKey="name" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-foreground transition-colors" onClick={() => handleSort('aqi')}>
                  AQI
                  <SortIcon columnKey="aqi" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-foreground transition-colors" onClick={() => handleSort('temp')}>
                  Suhu
                  <SortIcon columnKey="temp" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-foreground transition-colors" onClick={() => handleSort('humidity')}>
                  Kelembapan
                  <SortIcon columnKey="humidity" />
                </button>
              </th>
              <th className="text-left py-3 px-4 font-semibold text-sm text-muted-foreground">Status</th>
              <th className="text-center py-3 px-4 font-semibold text-sm text-muted-foreground">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedCities.map((city) => (
              <tr key={city.name} className="border-b border-border hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td className="py-4 px-4 font-medium text-foreground">{city.name}</td>
                <td className="py-4 px-4">
                  <span className="text-lg font-bold text-foreground">{city.aqi}</span>
                </td>
                <td className="py-4 px-4 text-foreground">{city.temp}°C</td>
                <td className="py-4 px-4 text-foreground">{city.humidity}%</td>
                <td className="py-4 px-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(city.status)}`}>
                    {getStatusLabel(city.status)}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <button
                    onClick={() => onViewDetails(city.name)}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-sm font-medium text-foreground"
                  >
                    <Eye className="w-4 h-4" />
                    Lihat
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
