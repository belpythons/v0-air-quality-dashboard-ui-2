'use client'

import { Search, Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar({ onAqiRangeChange }: { onAqiRangeChange: (range: [number, number]) => void }) {
  return (
    <nav className="border-b border-border bg-white dark:bg-slate-900 shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search cities or pollutants..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-6">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
