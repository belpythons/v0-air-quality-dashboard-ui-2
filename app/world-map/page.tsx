'use client'

import { useState } from 'react'
import { MapPin, ZoomIn, ZoomOut, Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getCityRankings } from '@/lib/city-data'
import Link from 'next/link'

export default function WorldMapPage() {
  const cities = getCityRankings()
  const [selectedCity, setSelectedCity] = useState<typeof cities[0] | null>(null)
  const [filterAQI, setFilterAQI] = useState<[number, number]>([0, 500])
  const [filterCountry, setFilterCountry] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const countries = Array.from(new Set(cities.map(c => c.country)))
  
  const filteredCities = cities.filter(city => 
    city.aqi >= filterAQI[0] && 
    city.aqi <= filterAQI[1] &&
    (filterCountry === 'all' || city.country === filterCountry)
  )

  const getMarkerColor = (aqi: number) => {
    if (aqi <= 50) return 'bg-green-500'
    if (aqi <= 100) return 'bg-yellow-500'
    if (aqi <= 150) return 'bg-orange-500'
    if (aqi <= 200) return 'bg-red-500'
    if (aqi <= 300) return 'bg-purple-500'
    return 'bg-maroon-700'
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">World Air Quality Map</h1>
              <p className="text-muted-foreground">Interactive real-time air quality monitoring</p>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-120px)]">
        {/* Map Area */}
        <div className="flex-1 relative bg-slate-100 dark:bg-slate-900">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <Button size="icon" variant="secondary" className="bg-white dark:bg-slate-800">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="secondary" className="bg-white dark:bg-slate-800">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button 
              size="icon" 
              variant="secondary" 
              className="bg-white dark:bg-slate-800"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Simplified Map View with City Markers */}
          <div className="h-full w-full relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8 p-8">
                {filteredCities.slice(0, 24).map((city, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCity(city)}
                    className="relative group"
                  >
                    <div className={`w-4 h-4 rounded-full ${getMarkerColor(city.aqi)} animate-pulse cursor-pointer hover:scale-150 transition-transform`} />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg whitespace-nowrap text-xs font-medium">
                        {city.name}: {city.aqi}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected City Popup */}
          {selectedCity && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-96">
              <Card className="p-6 shadow-xl">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedCity.name}</h3>
                    <p className="text-sm text-muted-foreground">{selectedCity.country}</p>
                  </div>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    onClick={() => setSelectedCity(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold">{selectedCity.aqi}</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedCity.aqi <= 50 ? 'bg-green-100 text-green-700' :
                      selectedCity.aqi <= 100 ? 'bg-yellow-100 text-yellow-700' :
                      selectedCity.aqi <= 150 ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {selectedCity.status.replace('-', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Main Pollutant: {selectedCity.mainPollutant}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Temperature</p>
                    <p className="font-semibold">28°C</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Humidity</p>
                    <p className="font-semibold">75%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Wind Speed</p>
                    <p className="font-semibold">12 km/h</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Updated</p>
                    <p className="font-semibold">2 min ago</p>
                  </div>
                </div>

                <Link href={`/dashboard/${selectedCity.name.toLowerCase()}`}>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">
                    View Detailed Dashboard
                  </Button>
                </Link>
              </Card>
            </div>
          )}
        </div>

        {/* Filter Sidebar */}
        {showFilters && (
          <div className="w-80 border-l border-border bg-white dark:bg-slate-950 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold">Filters</h2>
              <Button 
                size="icon" 
                variant="ghost"
                onClick={() => setShowFilters(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Country</label>
                <Select value={filterCountry} onValueChange={setFilterCountry}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map(country => (
                      <SelectItem key={country} value={country}>{country}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-3 block">
                  AQI Range: {filterAQI[0]} - {filterAQI[1]}
                </label>
                <Slider
                  min={0}
                  max={500}
                  step={10}
                  value={filterAQI}
                  onValueChange={(value) => setFilterAQI(value as [number, number])}
                  className="mb-2"
                />
              </div>

              <div>
                <h3 className="text-sm font-medium mb-3">AQI Legend</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500" />
                    <span>Good (0-50)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500" />
                    <span>Moderate (51-100)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500" />
                    <span>Unhealthy for Sensitive (101-150)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500" />
                    <span>Unhealthy (151-200)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500" />
                    <span>Very Unhealthy (201-300)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-maroon-700" />
                    <span>Hazardous (300+)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredCities.length} of {cities.length} cities
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
