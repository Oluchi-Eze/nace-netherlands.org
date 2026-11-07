import Link from 'next/link'
import Image from 'next/image'
import { Mail, MapPin, Shield } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800/85 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Col 1: Brand & Contact Info */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/nace-logo.jpg"
                alt="NACE Netherlands Emblem"
                width={200}
                height={80}
                className="h-20 w-auto object-contain"
                priority
              />
            </Link>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-600 dark:text-slate-400">Lelystad, Netherlands</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">info@nace-netherlands.org</span>
              </li>
            </ul>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/churches" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Member Churches
                </Link>
              </li>
              <li>
                <Link href="/bible" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Bible
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Policies */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal & Policies
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Partners & Affiliations */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Partners & Affiliations
            </h3>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Image
                src="/Nigerian chaplaincy germany.jpg"
                alt="Nigerian Chaplaincy Germany"
                width={120}
                height={50}
                className="h-12 w-auto object-contain rounded-xl bg-white p-1 shadow-sm"
                priority
              />
              <Image
                src="/Skin logo.png"
                alt="Skin Logo"
                width={120}
                height={50}
                className="h-12 w-auto object-contain rounded-xl bg-white p-1 shadow-sm"
                priority
              />
              <Image
                src="/Church_of_Nigeria_logo.png"
                alt="Church of Nigeria Logo"
                width={120}
                height={50}
                className="h-12 w-auto object-contain rounded-xl bg-white p-1 shadow-sm"
                priority
              />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500 pt-8 border-t border-slate-200 dark:border-slate-800/80 gap-4">
          <p>© {currentYear} Anglican Chaplaincy Netherlands (NACE). All rights reserved.</p>
          <p>Powerd by 
          <Link href="https://www.honouredhands.com" className="hover:text-white"> HonouredHands</Link>
          </p>
        </div>

      </div>
    </footer>
  )
}