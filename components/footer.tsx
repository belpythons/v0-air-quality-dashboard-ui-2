import { Wind, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">AeroSense</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Menyediakan data kualitas udara real-time untuk masa depan yang lebih sehat dan bersih.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/world-map" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Peta Kualitas Udara
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Ruang Berita
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Aksi & Kontribusi
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4">Sumber Daya</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Dokumentasi API
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Panduan Pengguna
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Kebijakan Privasi
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-400 hover:text-teal-400 transition-colors">
                  Syarat & Ketentuan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <Mail className="w-4 h-4" />
                <span>info@aerosense.id</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Phone className="w-4 h-4" />
                <span>+62 21 1234 5678</span>
              </li>
              <li className="flex items-start gap-2 text-slate-400">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Samarinda, Kalimantan Timur, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} AeroSense. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
