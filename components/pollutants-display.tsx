interface Pollutant {
  name: string
  level: string
}

interface PolluantsDisplayProps {
  pollutants: Pollutant[]
}

export function PollutantsDisplay({ pollutants }: PolluantsDisplayProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Key Pollutants</h3>
      {pollutants.map((pollutant, index) => (
        <div key={index} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <span className="font-medium">{pollutant.name}</span>
            <span className="text-sm text-muted-foreground">{pollutant.level}</span>
          </div>
          {/* WHO guideline reference bar */}
          <div className="mt-2 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-red-500 w-3/4" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">WHO Annual Guideline: 15 µg/m³</p>
        </div>
      ))}
    </div>
  )
}
