export interface DailyVerse {
  day: number
  verse: string
  quotation: string
  theme: string
}

export const dailyVerses: DailyVerse[] = [
  {
    day: 1,
    verse: "John 3:16",
    quotation: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    theme: "Divine Love & Redemption"
  },
  {
    day: 2,
    verse: "Psalm 23:1",
    quotation: "The Lord is my shepherd; I shall not want.",
    theme: "Trust & Provision"
  },
  {
    day: 3,
    verse: "Proverbs 3:5-6",
    quotation: "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    theme: "Guidance & Faith"
  },
  // ... You can expand this array up to 365 days, or store/manage them dynamically!
]

// Helper function to get today's verse based on the day of the year (1 through 365)
export function getTodaysVerse(): DailyVerse {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = (now.getTime() - start.getTime()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)
  const oneDay = 1000 * 60 * 60 * 24
  const dayOfYear = Math.floor(diff / oneDay)

  // Loop around if index exceeds available array length
  const index = (dayOfYear - 1) % dailyVerses.length
  return dailyVerses[index >= 0 ? index : 0]
}