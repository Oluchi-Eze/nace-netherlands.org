'use client'

import Link from 'next/link'
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react'

interface VerseOfTheDayProps {
  book?: string
  chapter?: number
  verse?: string
  text?: string
  translation?: string
}

export default function VerseOfTheDay({
  book = "John",
  chapter = 3,
  verse = "16",
  text = "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
  translation = "NIV"
}: VerseOfTheDayProps) {
  
  // Construct the search query string for the Bible gateway URL
  const destinationUrl = `/bible?search=${encodeURIComponent(`${book}${chapter}`)}`

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 text-white shadow-xl">
      {/* Subtle Background Accent Glows */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Section: Verse Header & Quote */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <Sparkles size={13} />
              Verse of the Day
            </span>
            <span className="text-xs font-semibold text-slate-400">• {translation}</span>
          </div>

          <blockquote className="text-lg md:text-xl font-serif font-light leading-relaxed text-slate-100">
            "{text}"
          </blockquote>

          <p className="text-sm font-bold text-amber-500 font-sans tracking-wide">
            {book} {chapter}:{verse}
          </p>
        </div>

        {/* Right Section: Button Leading to Bible Page */}
        <div className="shrink-0">
          <Link
            href={destinationUrl}
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs md:text-sm px-5 py-3 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] group"
          >
            <BookOpen size={16} />
            <span>Read Full Chapter</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

      </div>
    </div>
  )
}