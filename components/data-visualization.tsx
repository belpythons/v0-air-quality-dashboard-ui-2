'use client'

import { Card } from '@/components/ui/card'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface DataVisualizationProps {
  selectedCity: string
}

const trendData = [
  { day: 'Sen', aqi: 65, pm25: 35, pm10: 45 },
  { day: 'Sel', aqi: 72, pm25: 40, pm10: 52 },
  { day: 'Rab', aqi: 78, pm25: 45, pm10: 58 },
  { day: 'Kam', aqi: 82, pm25: 48, pm10: 62 },
  { day: 'Jum', aqi: 76, pm25: 42, pm10: 55 },
  { day: 'Sab', aqi: 68, pm25: 38, pm10: 48 },
  { day: 'Min', aqi: 70, pm25: 39, pm10: 50 },
]

const pollutantData = [
  { pollutant: 'PM2.5', value: 45, limit: 35 },
  { pollutant: 'PM10', value: 58, limit: 50 },
  { pollutant: 'O3', value: 65, limit: 100 },
  { pollutant: 'NO2', value: 32, limit: 40 },
]

export function DataVisualization({ selectedCity }: DataVisualizationProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 7-Day Trend */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tren AQI 7 Hari</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid var(--color-border)`,
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="aqi" stroke="var(--color-primary)" strokeWidth={2} name="AQI" />
            <Line type="monotone" dataKey="pm25" stroke="var(--color-secondary)" strokeWidth={2} name="PM2.5" />
            <Line type="monotone" dataKey="pm10" stroke="var(--color-accent)" strokeWidth={2} name="PM10" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Pollutant Levels */}
      <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tingkat Polutan Saat Ini</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pollutantData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="pollutant" stroke="var(--color-muted-foreground)" />
            <YAxis stroke="var(--color-muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-card)',
                border: `1px solid var(--color-border)`,
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="value" fill="var(--color-primary)" name="Current Level" />
            <Bar dataKey="limit" fill="var(--color-secondary)" name="Limit" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}
