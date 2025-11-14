'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Globe2, MapPin, TrendingUp, Users, Building2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import Link from 'next/link'
import { getCityRankings } from '@/lib/city-data'
import { HeaderNav } from '@/components/header-nav'
import { Footer } from '@/components/footer'

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
      <HeaderNav />

      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full border border-border bg-slate-50/50 dark:bg-slate-900/50">
            <span className="text-sm font-medium text-muted-foreground">Pemantauan Kualitas Udara Real-time</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
            Ketahui apa yang Anda hirup
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            Lacak data kualitas udara real-time dari lebih dari 50 kota di seluruh dunia. Dapatkan rekomendasi kesehatan yang dipersonalisasi dan buat keputusan yang tepat tentang aktivitas luar ruangan Anda.
          </p>

          <div className="max-w-2xl mx-auto mb-12 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Cari kota atau lokasi..."
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-border">
              <Globe2 className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{stats.citiesMonitored}+</p>
              <p className="text-sm text-muted-foreground">Kota Dipantau</p>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-border">
              <Users className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{stats.usersServed.toLocaleString()}+</p>
              <p className="text-sm text-muted-foreground">Pengguna Terlayani</p>
            </div>
            <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-border">
              <TrendingUp className="w-8 h-8 text-teal-600 mx-auto mb-3" />
              <p className="text-3xl font-bold mb-1">{stats.dataPoints.toLocaleString()}+</p>
              <p className="text-sm text-muted-foreground">Titik Data Dikumpulkan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-slate-50/50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Mengapa AeroSense?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Globe2,
                title: 'Jangkauan Global',
                description: 'Pantau kualitas udara di kota-kota di seluruh dunia dengan jaringan global kami yang luas.',
              },
              {
                icon: Users,
                title: 'Antarmuka Ramah Pengguna',
                description: 'Dirancang untuk kemudahan penggunaan, dasbor kami memberikan wawasan yang jelas sekilas.',
              },
              {
                icon: TrendingUp,
                title: 'Data Tren',
                description: 'Tetap unggul dari tren kualitas udara dengan alat analitik canggih kami.',
              },
              {
                icon: Building2,
                title: 'Dukungan Komunitas',
                description: 'Bergabunglah dengan komunitas kami untuk berbagi wawasan dan tetap terinformasi tentang peningkatan kualitas udara.',
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
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Pantau Kota Kalimantan Timur</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cities.map((city) => {
              const statusColors = {
                good: { bg: 'bg-emerald-50 dark:bg-emerald-950', border: 'border-emerald-200 dark:border-emerald-800', text: 'text-emerald-700 dark:text-emerald-300' },
                moderate: { bg: 'bg-amber-50 dark:bg-amber-950', border: 'border-amber-200 dark:border-amber-800', text: 'text-amber-700 dark:text-amber-300' },
                unhealthy: { bg: 'bg-red-50 dark:bg-red-950', border: 'border-red-200 dark:border-red-800', text: 'text-red-700 dark:text-red-300' },
              }

              const colors = statusColors[city.status as keyof typeof statusColors]
              const statusLabels: Record<string, string> = {
                good: 'Kualitas Udara Baik',
                moderate: 'Kualitas Udara Sedang',
                unhealthy: 'Kualitas Udara Tidak Sehat',
              }

              return (
                <Link href={`/dashboard/${city.name}`} key={city.name}>
                  <div className={`p-6 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:-translate-y-1 ${colors.bg} ${colors.border}`}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold">{city.name}</h3>
                      <span className={`text-2xl font-bold ${colors.text}`}>{city.aqi}</span>
                    </div>
                    <p className={`text-sm mb-4 ${colors.text}`}>{statusLabels[city.status]}</p>
                    <Button size="sm" variant="outline" className="w-full">
                      Lihat Dasbor <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
