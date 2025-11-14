'use client'

import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react'

interface ArticleAQIDisplayProps {
  score: number
  category: 'good' | 'moderate' | 'unhealthy-for-sensitive' | 'unhealthy' | 'hazardous'
  location: string
  date: string
}

export function ArticleAQIDisplay({ score, category, location, date }: ArticleAQIDisplayProps) {
  const categoryConfig = {
    good: { color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950', border: 'border-emerald-200 dark:border-emerald-800', label: 'Good' },
    moderate: { color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950', border: 'border-amber-200 dark:border-amber-800', label: 'Moderate' },
    'unhealthy-for-sensitive': { color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950', border: 'border-orange-200 dark:border-orange-800', label: 'Unhealthy for Sensitive Groups' },
    unhealthy: { color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-950', border: 'border-red-200 dark:border-red-800', label: 'Unhealthy' },
    hazardous: { color: 'text-red-700', bg: 'bg-red-100 dark:bg-red-900', border: 'border-red-300 dark:border-red-700', label: 'Hazardous' },
  }

  const config = categoryConfig[category]

  return (
    <div className={`p-8 rounded-xl border-2 ${config.bg} ${config.border}`}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">Air Quality Index (AQI)</p>
          <h2 className="text-4xl font-bold">{location}</h2>
          <p className="text-xs text-muted-foreground mt-1">Last updated: {new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>
        <div className="text-center">
          <div className={`text-5xl font-bold ${config.color}`}>{score}</div>
          <p className={`text-sm font-semibold ${config.color} mt-1`}>{config.label}</p>
        </div>
      </div>

      {/* Trend indicator */}
      <div className="flex items-center gap-2 pt-4 border-t border-current/10">
        {score > 100 ? (
          <>
            <TrendingUp className={`w-4 h-4 ${config.color}`} />
            <span className="text-sm text-muted-foreground">Air quality is worsening</span>
          </>
        ) : (
          <>
            <TrendingDown className={`w-4 h-4 ${config.color}`} />
            <span className="text-sm text-muted-foreground">Air quality is improving</span>
          </>
        )}
      </div>
    </div>
  )
}
