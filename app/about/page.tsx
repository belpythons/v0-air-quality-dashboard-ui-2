'use client'

import { useState, useEffect } from 'react'
import { Wind, Target, TrendingUp, Award, Users, Globe2, Heart, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function AboutPage() {
  const [stats, setStats] = useState({
    citiesMonitored: 0,
    usersServed: 0,
    dataPoints: 0,
    yearsActive: 0,
  })

  useEffect(() => {
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
        yearsActive: Math.floor(5 * progress),
      })

      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const team = [
    { name: 'Dr. Sarah Chen', role: 'Chief Environmental Scientist', image: '/scientist-in-lab.png' },
    { name: 'Michael Rodriguez', role: 'Head of Technology', image: '/diverse-engineers-meeting.png' },
    { name: 'Emma Thompson', role: 'Data Analytics Lead', image: '/data-scientist.jpg' },
    { name: 'James Wilson', role: 'Product Manager', image: '/diverse-team-manager.png' },
  ]

  const partners = [
    'Environmental Protection Agency',
    'WHO Air Quality Initiative',
    'Green Tech Foundation',
    'Global Climate Alliance',
    'Clean Air Partnership',
    'Sustainability Network',
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">AeroSense</span>
            </div>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Our Mission
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed text-balance">
            We believe everyone deserves to breathe clean air. AeroSense is dedicated to providing accurate, real-time air quality data to empower communities worldwide to make informed decisions about their health and environment.
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-8 text-center">
              <Globe2 className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">{stats.citiesMonitored}+</p>
              <p className="text-muted-foreground">Cities Monitored</p>
            </Card>
            <Card className="p-8 text-center">
              <Users className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">{stats.usersServed.toLocaleString()}+</p>
              <p className="text-muted-foreground">Users Served</p>
            </Card>
            <Card className="p-8 text-center">
              <TrendingUp className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">{stats.dataPoints.toLocaleString()}+</p>
              <p className="text-muted-foreground">Data Points</p>
            </Card>
            <Card className="p-8 text-center">
              <Award className="w-12 h-12 text-teal-600 mx-auto mb-4" />
              <p className="text-4xl font-bold mb-2">{stats.yearsActive}+</p>
              <p className="text-muted-foreground">Years Active</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {[
              { year: '2020', title: 'Foundation', desc: 'AeroSense was founded with a vision to democratize air quality data.' },
              { year: '2021', title: 'Expansion', desc: 'Expanded monitoring network to 20 cities across multiple regions.' },
              { year: '2022', title: 'Innovation', desc: 'Launched real-time mobile app and advanced analytics platform.' },
              { year: '2023', title: 'Recognition', desc: 'Received Environmental Technology Award for impact on public health.' },
              { year: '2024', title: 'Global Reach', desc: 'Now monitoring 50+ cities with 100,000+ active users worldwide.' },
            ].map((milestone, index) => (
              <div key={index} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < 4 && <div className="w-0.5 flex-1 bg-border mt-2" />}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our diverse team of scientists, engineers, and environmental advocates work tirelessly to bring you the most accurate air quality data.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-900 dark:to-emerald-900 relative overflow-hidden">
                  <img 
                    src={member.image || "/placeholder.svg"} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="flex items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-xl border border-border hover:border-teal-500 transition-colors"
              >
                <p className="text-sm font-medium text-center">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">Join the Movement</h2>
          <p className="text-xl mb-8 opacity-90">
            Help us build a cleaner, healthier future for everyone. Start monitoring your air quality today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#cities">
              <Button size="lg" variant="secondary" className="bg-white text-teal-600 hover:bg-slate-100">
                Get Started
              </Button>
            </Link>
            <Link href="/news">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Read Our Blog
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
