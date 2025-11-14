'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Wind, Search, Globe2, MapPin, TrendingUp, Users, Building2, AlertTriangle, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { getCityRankings } from '@/lib/city-data'

const cities = [
  { name: 'Samarinda', aqi: 78, status: 'moderate' },
  { name: 'Bontang', aqi: 45, status: 'good' },
  { name: 'Balikpapan', aqi: 92, status: 'unhealthy' },
]

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const cityRankings = getCityRankings()

  const [stats, setStats] = useState({
    citiesMonitored: 0,
    usersServed: 0,
    dataPoints: 0,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    const animateStats = () => {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      let step = 0
      const timer = setInterval(() => {
        step++
        const progress = step / steps

        setStats({
          citiesMonitored: Math.floor(50 * progress),
          usersServed: Math.floor(100000 * progress),
          dataPoints: Math.floor(1000000 * progress),
        })

        if (step >= steps) clearInterval(timer)
      }, interval)
    }

    animateStats()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const filteredCities = cityRankings.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.country.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5)

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-foreground overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(13, 148, 136, 0.1), transparent 80%)`,
          transition: 'all 0.3s ease-out',
        }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">AeroSense</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium hover:text-teal-600 transition-colors">Home</a>
            <Link href="/world-map" className="text-sm font-medium hover:text-teal-600 transition-colors">World Air Quality</Link>
            <Link href="/about" className="text-sm font-medium hover:text-teal-600 transition-colors">About</Link>
            <Link href="/news" className="text-sm font-medium hover:text-teal-600 transition-colors">Newsroom</Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">EN</Button>
            <Link href="#cities">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-border bg-slate-50/50 dark:bg-slate-900/50">
            <span className="text-sm font-medium text-muted-foreground">Real-time Air Quality Monitoring</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
            Know what you breathe
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            Track real-time air quality data from over 50 cities worldwide. Get personalized health recommendations and make informed decisions about your outdoor activities.
          </p>

          <div className="max-w-2xl mx-auto mb-12 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a city or location..."
                className="w-full h-14 pl-12 pr-4 text-lg rounded-xl border-2 border-border focus:border-teal-500 transition-colors"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setShowSuggestions(e.target.value.length > 0)
                }}
                onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
            </div>
            
            {showSuggestions && filteredCities.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-border rounded-xl shadow-lg overflow-hidden z-10">
                {filteredCities.map((city) => (
                  <Link
                    key={city.rank}
                    href={`/dashboard/${city.name.toLowerCase()}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{city.name}</p>
                        <p className="text-sm text-muted-foreground">{city.country}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                      city.aqi <= 50 ? 'bg-green-100 text-green-700' :
                      city.aqi <= 100 ? 'bg-yellow-100 text-yellow-700' :
                      city.aqi <= 150 ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {city.aqi}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-border">
              <Globe2 className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{stats.citiesMonitored}+</p>
              <p className="text-sm text-muted-foreground">Cities Monitored</p>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-border">
              <Users className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{stats.usersServed.toLocaleString()}+</p>
              <p className="text-sm text-muted-foreground">Users Served</p>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-border">
              <TrendingUp className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{stats.dataPoints.toLocaleString()}+</p>
              <p className="text-sm text-muted-foreground">Data Points Collected</p>
            </div>
          </div>

          {/* Floating cards animation */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Wind, label: 'Real-time Data', desc: 'Live AQI updates' },
              { icon: AlertTriangle, label: 'Health Alerts', desc: 'Smart notifications' },
              { icon: Zap, label: 'Fast Analytics', desc: 'Instant insights' },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-border hover:border-teal-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <item.icon className="w-6 h-6 text-teal-600 mx-auto mb-2" />
                <p className="font-semibold text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Why AeroSense?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Globe2,
                title: 'Global Coverage',
                description: 'Monitor air quality in cities worldwide with our extensive global network.',
              },
              {
                icon: Users,
                title: 'User-Friendly Interface',
                description: 'Designed for ease of use, our dashboard provides clear insights at a glance.',
              },
              {
                icon: TrendingUp,
                title: 'Trending Data',
                description: 'Stay ahead of air quality trends with our advanced analytics tools.',
              },
              {
                icon: Building2,
                title: 'Community Support',
                description: 'Join our community to share insights and stay informed about air quality improvements.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-border hover:border-teal-500 transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 text-teal-600 mb-3" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Monitor East Kalimantan Cities</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cities.map((city) => {
              const statusColors = {
                good: { bg: 'bg-emerald-50 dark:bg-emerald-950', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300' },
                moderate: { bg: 'bg-amber-50 dark:bg-amber-950', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300' },
                unhealthy: { bg: 'bg-red-50 dark:bg-red-950', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-300' },
              }

              const colors = statusColors[city.status as keyof typeof statusColors]

              return (
                <Link href={`/dashboard/${city.name}`} key={city.name}>
                  <div className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${colors.bg} ${colors.border}`}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold">{city.name}</h3>
                      <span className={`text-2xl font-bold ${colors.text}`}>{city.aqi}</span>
                    </div>
                    <p className={`text-sm mb-4 capitalize ${colors.text}`}>{city.status} Air Quality</p>
                    <Button size="sm" variant="outline" className="w-full">
                      View Dashboard <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center text-muted-foreground text-sm">
          <p>AeroSense © 2025 • Monitoring air quality for a healthier world</p>
        </div>
      </footer>
    </div>
  )
}
