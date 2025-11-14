'use client'

import { Card } from '@/components/ui/card'
import { AlertCircle, Activity, Heart, Shield } from 'lucide-react'

interface HealthRecommendationsProps {
  selectedCity: string
}

const recommendations = {
  'Samarinda': [
    { icon: AlertCircle, title: 'Air Quality Status', description: 'Moderate - Sensitive groups affected', color: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' },
    { icon: Activity, title: 'Outdoor Activity', description: 'Limit strenuous activities', color: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' },
    { icon: Heart, title: 'Health Advice', description: 'Wear N95 mask outdoors', color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' },
    { icon: Shield, title: 'Protection', description: 'Keep inhalers accessible', color: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' },
  ],
  'Bontang': [
    { icon: AlertCircle, title: 'Air Quality Status', description: 'Good - No restrictions', color: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300' },
    { icon: Activity, title: 'Outdoor Activity', description: 'Safe for all activities', color: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300' },
    { icon: Heart, title: 'Health Advice', description: 'Enjoy outdoor activities', color: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300' },
    { icon: Shield, title: 'Protection', description: 'No special precautions needed', color: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300' },
  ],
  'Balikpapan': [
    { icon: AlertCircle, title: 'Air Quality Status', description: 'Unhealthy - Stay indoors', color: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' },
    { icon: Activity, title: 'Outdoor Activity', description: 'Avoid all outdoor activities', color: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' },
    { icon: Heart, title: 'Health Advice', description: 'Wear N95+ masks, see doctor if symptoms', color: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' },
    { icon: Shield, title: 'Protection', description: 'Use air purifiers indoors', color: 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300' },
  ],
}

export function HealthRecommendations({ selectedCity }: HealthRecommendationsProps) {
  const recs = recommendations[selectedCity as keyof typeof recommendations] || recommendations['Samarinda']

  return (
    <Card className="p-6 bg-white dark:bg-slate-800 border-0 shadow-sm h-full">
      <h3 className="text-lg font-semibold text-foreground mb-4">Health Recommendations</h3>
      <div className="space-y-3">
        {recs.map((rec, idx) => {
          const Icon = rec.icon
          return (
            <div key={idx} className={`p-4 rounded-lg ${rec.color} border border-current/20`}>
              <div className="flex gap-3">
                <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{rec.title}</p>
                  <p className="text-xs opacity-90 mt-1">{rec.description}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
