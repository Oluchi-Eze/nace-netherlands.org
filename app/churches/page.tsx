'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Clock, MapPin, ArrowRight } from 'lucide-react'

export default function ChurchesPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden px-6 py-20 lg:py-28 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Hero Image */}
      <img
        src="/churches background.png"
        alt="Churches Background"
        className="absolute top-0 left-0 -z-20 h-96 w-full object-cover"
      />

      {/* Page Content */}
      <div className="relative font-sans transition-colors duration-300">

        {/* Adjust mt-16 / lg:mt-24 here to move the cards down relative to the top image */}
        <div className="mx-auto max-w-6xl space-y-10 mt-16 lg:mt-24">

          {/* Page Heading */}
          <div className="space-y-3 text-center text-white [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
            <h1 className="font-Segoe UI Black text-4xl font-black sm:text-5xl">
              Member Churches
            </h1>

            <p className="mx-auto max-w-xl text-sm text-slate-100 sm:text-base">
              Find Your Place. Join Our Family.
            </p>
          </div>

          {/* Churches Grid */}
          <div className="grid gap-30 md:grid-cols-2 lg:grid-cols-2">

            {/* All Saints Lelystad Card 1 */}
            <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/80 bg-white/95 p-5 text-slate-900 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900/95 dark:text-white">

              <div className="space-y-2">
                <Link
                  href="https://allsaints.nace-netherlands.org"
                  className="flex items-center gap-1.5 border-t border-slate-200/80 pt-3 text-xs font-bold text-amber-600 transition-colors hover:text-amber-700 hover:underline dark:border-slate-800 dark:text-amber-400 dark:hover:text-amber-300"
                >
                <Image
                  src="/allsaints-logo churches nace.png"
                  alt="All Saints' Church Lelystad logo"
                  width={160}
                  height={60}
                  className="h-10 w-auto max-w-full object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
                  priority
                />
                </Link>
                <h2 className="font-Segoe UI Black text-xl font-bold leading-tight">
                  All Saints' Church Lelystad
                </h2>
              </div>

              <div className="space-y-2 border-t border-slate-200/80 pt-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
                <p className="flex items-center gap-2 font-medium">
                  <Clock size={14} className="shrink-0 text-amber-500" />
                  Sundays at 11:00 AM
                </p>

                <p className="flex items-center gap-2 font-medium">
                  <MapPin size={14} className="shrink-0 text-red-500" />
                  Lelystad, Netherlands
                </p>

                <Link
                  href="https://allsaints.nace-netherlands.org"
                  className="flex items-center gap-1.5 border-t border-slate-200/80 pt-3 text-xs font-bold text-amber-600 transition-colors hover:text-amber-700 hover:underline dark:border-slate-800 dark:text-amber-400 dark:hover:text-amber-300"
                >
                  Visit Church Page
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* All Saints Lelystad Card 2 */}
            <div className="flex flex-col justify-between space-y-4 rounded-2xl border border-slate-200/80 bg-white/95 p-5 text-slate-900 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-900/95 dark:text-white">

              <div className="space-y-2">
                <Image
                  src="/../nace-logo.jpg"
                  alt="NACE-NL logo"
                  width={160}
                  height={60}
                  className="h-10 w-auto max-w-full object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
                  priority
                />
                <h2 className="font-Segoe UI Black text-xl font-bold leading-tight">
                  Amsterdam Chapel
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Coming Soon
                </p>
              </div>

              <div className="space-y-2 border-t border-slate-200/80 pt-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-300">
                <p className="flex items-center gap-2 font-medium">
                  <Clock size={14} className="shrink-0 text-amber-500" />
                  Every Sunday
                </p>

                <p className="flex items-center gap-2 font-medium">
                  <MapPin size={14} className="shrink-0 text-red-500" />
                  Amsterdam
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}