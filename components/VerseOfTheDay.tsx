'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react'

interface SeasonalVerse {
  book: string
  chapter: number
  verse: string
  text: string
  translation: string
  seasonLabel: string
}

// Seasonal Verse Bank
const SEASONAL_VERSES: Record<string, SeasonalVerse[]> = {
  christmas: [
    {
      book: "Luke",
      chapter: 2,
      verse: "11",
      text: "For unto you is born this day in the city of David a Savior, who is Christ the Lord.",
      translation: "ESV",
      seasonLabel: "Christmas Season"
    },
    {
      book: "Isaiah",
      chapter: 9,
      verse: "6",
      text: "For to us a child is born, to us a son is given; and the government shall be upon his shoulder.",
      translation: "ESV",
      seasonLabel: "Advent & Hope"
    }
  ],
  thanksgiving: [
    {
      book: "1 Thessalonians",
      chapter: 5,
      verse: "18",
      text: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you.",
      translation: "ESV",
      seasonLabel: "Season of Gratitude"
    },
    {
      book: "Psalms",
      chapter: "100",
      verse: "4",
      text: "Enter his gates with thanksgiving, and his courts with praise! Give thanks to him; bless his name!",
      translation: "ESV",
      seasonLabel: "Autumn Reflection"
    }
  ],
  easter: [
    {
      book: "Matthew",
      chapter: 28,
      verse: "6",
      text: "He is not here, for he has risen, as he said. Come, see the place where he lay.",
      translation: "ESV",
      seasonLabel: "Easter & Resurrection"
    },
    {
      book: "1 Peter",
      chapter: 1,
      verse: "3",
      text: "According to his great mercy, he has caused us to be born again to a living hope through the resurrection of Jesus Christ.",
      translation: "ESV",
      seasonLabel: "Spring & Renewal"
    }
  ],
  newYear: [
    {
      book: "Lamentations",
      chapter: 3,
      verse: "22-23",
      text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning.",
      translation: "ESV",
      seasonLabel: "New Beginnings"
    },
    {
      book: "Isaiah",
      chapter: 43,
      verse: "19",
      text: "Behold, I am doing a new thing; now it springs forth, do you not perceive it? I will make a way in the wilderness.",
      translation: "ESV",
      seasonLabel: "Fresh Starts"
    }
  ],
  general: [
    {
      book: "John",
      chapter: 3,
      verse: "16",
      text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
      translation: "ESV",
      seasonLabel: "Daily Inspiration"
    },
    {
      book: "Proverbs",
      chapter: 3,
      verse: "5",
      text: "Trust in the Lord with all your heart, and do not lean on your own understanding.",
      translation: "ESV",
      seasonLabel: "Wisdom & Faith"
    },
    {
      book: "Romans",
      chapter: 8,
      verse: "28",
      text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
      translation: "ESV",
      seasonLabel: "Daily Encouragement"
    }
  ]
}

// Function to automatically detect the current liturgical/calendar season
function getSeasonalVerse(): SeasonalVerse {
  const now = new Date()
  const month = now.getMonth() // 0 = Jan, 11 = Dec
  const date = now.getDate()

  let seasonKey = "general"

  if (month === 11 || (month === 0 && date <= 6)) {
    seasonKey = "christmas"
  } else if (month === 10) {
    seasonKey = "thanksgiving"
  } else if (month >= 2 && month <= 4) {
    seasonKey = "easter"
  } else if (month === 0 && date > 6) {
    seasonKey = "newYear"
  }

  const pool = SEASONAL_VERSES[seasonKey] || SEASONAL_VERSES.general
  // Use day of year to deterministically pick a verse so it remains consistent for the day
  const startOfYear = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - startOfYear.getTime()
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  return pool[dayOfYear % pool.length]
}

export default function VerseOfTheDay() {
  const [verseData, setVerseData] = useState<SeasonalVerse | null>(null)

  useEffect(() => {
    setVerseData(getSeasonalVerse())
  }, [])

  if (!verseData) return null

  // Link format that connects directly to the Bible page reader
  const destinationUrl = `/bible?search=${encodeURIComponent(`${verseData.book}${verseData.chapter}`)}`

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 text-white shadow-xl">
      {/* Background Accent Glows */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Section: Verse Header & Quote */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
              <Sparkles size={13} />
              Verse of the Day
            </span>
            <span className="text-xs font-semibold text-slate-400">• {verseData.seasonLabel}</span>
            <span className="text-xs font-semibold text-slate-500">({verseData.translation})</span>
          </div>

          <blockquote className="text-lg md:text-xl font-serif font-light leading-relaxed text-slate-100">
            "{verseData.text}"
          </blockquote>

          <p className="text-sm font-bold text-amber-400 font-sans tracking-wide">
            {verseData.book} {verseData.chapter}:{verseData.verse}
          </p>
        </div>

        {/* Right Section: Direct Link to Full Chapter on Bible Page */}
        <div className="shrink-0">
          <Link
            href={destinationUrl}
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs md:text-sm px-5 py-3.5 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] group"
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