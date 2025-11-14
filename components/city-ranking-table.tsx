'use client'

import { useState } from 'react'
import { ArrowUpDown, Download, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { getCityRankings, type CityData } from '@/lib/city-data'
import Link from 'next/link'

type SortKey = 'rank' | 'name' | 'aqi' | 'mainPollutant'
type SortDirection = 'asc' | 'desc'

export function CityRankingTable() {
  const [sortKey, setSortKey] = useState<SortKey>('rank')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  const cities = getCityRankings()

  const sortedCities = [...cities].sort((a, b) => {
    const aValue = a[sortKey]
    const bValue = b[sortKey]
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }
    
    return sortDirection === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number)
  })

  const paginatedCities = sortedCities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(cities.length / itemsPerPage)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'text-green-700 bg-green-50'
    if (aqi <= 100) return 'text-yellow-700 bg-yellow-50'
    if (aqi <= 150) return 'text-orange-700 bg-orange-50'
    if (aqi <= 200) return 'text-red-700 bg-red-50'
    if (aqi <= 300) return 'text-purple-700 bg-purple-50'
    return 'text-maroon-700 bg-maroon-50'
  }

  const exportToCSV = () => {
    const headers = ['Rank', 'City', 'Country', 'AQI', 'Main Pollutant', 'Status']
    const rows = cities.map(city => [
      city.rank,
      city.name,
      city.country,
      city.aqi,
      city.mainPollutant,
      city.status
    ])
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'city-rankings.csv'
    a.click()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">City Rankings</h2>
          <p className="text-sm text-muted-foreground">Sortable global air quality data</p>
        </div>
        <Button onClick={exportToCSV} variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="rounded-lg border border-border overflow-hidden bg-white dark:bg-slate-950">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">
                <button
                  onClick={() => handleSort('rank')}
                  className="flex items-center gap-2 font-semibold hover:text-teal-600"
                >
                  Rank
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 font-semibold hover:text-teal-600"
                >
                  City
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead>Country</TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('aqi')}
                  className="flex items-center gap-2 font-semibold hover:text-teal-600"
                >
                  AQI
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort('mainPollutant')}
                  className="flex items-center gap-2 font-semibold hover:text-teal-600"
                >
                  Main Pollutant
                  <ArrowUpDown className="w-4 h-4" />
                </button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCities.map((city) => (
              <TableRow key={city.rank} className="hover:bg-slate-50 dark:hover:bg-slate-900">
                <TableCell className="font-medium">#{city.rank}</TableCell>
                <TableCell className="font-semibold">{city.name}</TableCell>
                <TableCell className="text-muted-foreground">{city.country}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getAqiColor(city.aqi)}`}>
                    {city.aqi}
                  </span>
                </TableCell>
                <TableCell>{city.mainPollutant}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/${city.name.toLowerCase()}`}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      View
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, cities.length)} of {cities.length} cities
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? 'bg-teal-600 hover:bg-teal-700' : ''}
                >
                  {page}
                </Button>
              )
            })}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
