'use client'

import { Card } from '@/components/ui/card'

interface PollutantData {
  name: string
  current: number
  whoLimit: number
  status: 'safe' | 'warning' | 'danger'
}

interface PollutantBreakdownProps {
  pollutants: PollutantData[]
}

export function PollutantBreakdown({ pollutants }: PollutantBreakdownProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe':
        return { bar: 'bg-emerald-500', zone: 'Zona Aman', textColor: 'text-emerald-700 dark:text-emerald-300' }
      case 'warning':
        return { bar: 'bg-amber-500', zone: 'Zona Peringatan', textColor: 'text-amber-700 dark:text-amber-300' }
      case 'danger':
        return { bar: 'bg-red-500', zone: 'Zona Bahaya', textColor: 'text-red-700 dark:text-red-300' }
      default:
        return { bar: 'bg-slate-500', zone: 'Tidak Diketahui', textColor: 'text-slate-700' }
    }
  }

  const maxValue = 200

  return (
    <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm">
      <h3 className="text-lg font-semibold text-foreground mb-6">Rincian Polutan</h3>

      <div className="space-y-8">
        {pollutants.map((pollutant) => {
          const statusInfo = getStatusColor(pollutant.status)
          const currentPercent = (pollutant.current / maxValue) * 100
          const limitPercent = (pollutant.whoLimit / maxValue) * 100

          return (
            <div key={pollutant.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{pollutant.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">Saat Ini: {pollutant.current} µg/m³</p>
                </div>
                <div className={`text-right ${statusInfo.textColor}`}>
                  <p className="font-semibold text-sm">{statusInfo.zone}</p>
                  <p className="text-xs opacity-75">Batas WHO: {pollutant.whoLimit} µg/m³</p>
                </div>
              </div>

              {/* Reference Line Chart */}
              <div className="relative h-8 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-600 rounded-lg overflow-hidden border border-border">
                {/* Safe Zone Background */}
                <div
                  className="absolute inset-y-0 left-0 bg-emerald-100/30 dark:bg-emerald-900/20"
                  style={{ width: `${limitPercent * 0.7}%` }}
                />
                {/* Warning Zone Background */}
                <div
                  className="absolute inset-y-0 bg-amber-100/30 dark:bg-amber-900/20"
                  style={{ left: `${limitPercent * 0.7}%`, width: `${limitPercent * 0.3}%` }}
                />

                {/* WHO Standard Reference Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-slate-400 dark:bg-slate-500"
                  style={{ left: `${limitPercent}%` }}
                  title="WHO Standard"
                />

                {/* Current Level Bar */}
                <div
                  className={`absolute top-1 bottom-1 rounded transition-all ${statusInfo.bar}`}
                  style={{ width: `${currentPercent}%`, maxWidth: '100%' }}
                />

                {/* Labels */}
                <div className="absolute inset-0 px-3 flex items-center justify-between text-xs font-medium pointer-events-none">
                  <span className="text-slate-600 dark:text-slate-300">0</span>
                  <span className="text-slate-600 dark:text-slate-300">{maxValue}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="text-muted-foreground">Aman</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500" />
          <span className="text-muted-foreground">Peringatan</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-muted-foreground">Bahaya</span>
        </div>
      </div>
    </Card>
  )
}
