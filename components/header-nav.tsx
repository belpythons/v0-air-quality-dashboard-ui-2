'use client'

import { useState } from 'react'
import { Wind, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">AeroSense</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/world-map" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Peta Kualitas Udara Dunia
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Tentang Kami
            </Link>
            <Link href="/news" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Ruang Berita
            </Link>
            <Link href="/contribute" className="text-sm font-medium hover:text-teal-600 transition-colors">
              Aksi & Kontribusi
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            <Link
              href="/world-map"
              className="block py-2 px-4 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Peta Kualitas Udara Dunia
            </Link>
            <Link
              href="/about"
              className="block py-2 px-4 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tentang Kami
            </Link>
            <Link
              href="/news"
              className="block py-2 px-4 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ruang Berita
            </Link>
            <Link
              href="/contribute"
              className="block py-2 px-4 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Aksi & Kontribusi
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
