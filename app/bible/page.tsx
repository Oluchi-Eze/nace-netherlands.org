'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, ChevronLeft, ChevronRight, ListFilter, HelpCircle, Globe, Hash } from 'lucide-react'

const OLD_TESTAMENT = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
  "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon",
  "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi"
]

const NEW_TESTAMENT = [
  "Matthew", "Mark", "Luke", "John", "Acts", "Romans", "1 Corinthians", "2 Corinthians",
  "Galatians", "Ephesians", "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews", "James", "1 John", "2 John",
  "3 John", "Jude", "Revelation"
]

const ALL_BOOKS_IN_ORDER = [...OLD_TESTAMENT, ...NEW_TESTAMENT]

const ALL_VERSIONS = [
  { id: 'NKJV', name: 'New King James Version (NKJV)', source: 'bolls', bollsId: 70 },
  { id: 'ESV', name: 'English Standard Version (ESV)', source: 'bolls', bollsId: 6 },
  { id: 'NASB', name: 'New American Standard Bible (NASB)', source: 'bolls', bollsId: 5 },
  { id: 'NLT', name: 'New Living Translation (NLT)', source: 'bolls', bollsId: 68 },
  { id: 'AMP', name: 'Amplified Bible (AMP)', source: 'bolls', bollsId: 67 },
  { id: 'MSG', name: 'The Message (MSG)', source: 'bolls', bollsId: 10 },
  { id: 'NRSV', name: 'New Revised Standard Version (NRSV)', source: 'bolls', bollsId: 18 },
  { id: 'KJV', name: 'King James Version (KJV)', source: 'bible-api' },
  { id: 'WEB', name: 'World English Bible (WEB)', source: 'bible-api' },
  { id: 'ASV', name: 'American Standard Version (ASV)', source: 'bible-api' },
  { id: 'BBE', name: 'Bible in Basic English (BBE)', source: 'bible-api' },
  { id: 'YLT', name: "Young's Literal Translation (YLT)", source: 'bible-api' },
  { id: 'NBV', name: 'Nieuwe Bijbelvertaling (NBV) - Dutch', source: 'bolls', bollsId: 34 },
  { id: 'SV', name: 'Statenvertaling (SV) - Dutch', source: 'bolls', bollsId: 35 },
  { id: 'NBG', name: 'NBG-vertaling 1951 - Dutch', source: 'bolls', bollsId: 100 },
  { id: 'RVR', name: 'Reina-Valera 1960 (RVR) - Spanish', source: 'bolls', bollsId: 28 },
  { id: 'LSG', name: 'Louis Segond 1910 (LSG) - French', source: 'bolls', bollsId: 37 },
  { id: 'LUT', name: 'Lutherbibel 1912 (LUT) - German', source: 'bolls', bollsId: 44 },
  { id: 'CUV', name: 'Chinese Union Version (Traditional)', source: 'bolls', bollsId: 47 },
  { id: 'VULG', name: 'Latin Vulgate (St. Jerome)', source: 'bolls', bollsId: 58 },
  { id: 'LXX', name: 'Septuagint (LXX) - Greek OT', source: 'bolls', bollsId: 61 }
]

export default function UltimateBibleGateway() {
  const [book, setBook] = useState('John')
  const [chapter, setChapter] = useState(3)
  const [verseSelection, setVerseSelection] = useState('all')
  const [versionObj, setVersionObj] = useState(ALL_VERSIONS[2])
  const [verses, setVerses] = useState<{ text: string; verse: number }[]>([])
  const [totalVersesInChapter, setTotalVersesInChapter] = useState(36)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('John 3')
  
  const isInitialMount = useRef(true)

  const isSingleChapterBook = (bookName: string) => {
    return ["Jude", "Obadiah", "Philemon", "2 John", "3 John"].includes(bookName)
  }

  useEffect(() => {
    const formattedReference = verseSelection === 'all' 
      ? `${book} ${chapter}` 
      : `${book} ${chapter}:${verseSelection}`
    setSearchQuery(formattedReference)
  }, [book, chapter, verseSelection])

  const parseAndSetReference = (rawQuery: string) => {
    if (!rawQuery.trim()) return
    const cleanedQuery = rawQuery.trim().replace(/\s+/g, ' ')
    const parts = cleanedQuery.split(' ')
    
    let parsedBook = parts[0]
    let referencePart = parts[1] || ''

    if (!isNaN(Number(parts[0])) && parts.length > 1) {
      parsedBook = `${parts[0]} ${parts[1]}`
      referencePart = parts[2] || ''
    }

    const matchedBook = ALL_BOOKS_IN_ORDER.find(b => b.toLowerCase() === parsedBook.toLowerCase())
    if (!matchedBook) return

    let parsedChapter = 1
    let parsedVerse = 'all'

    if (referencePart.includes(':')) {
      const [ch, vs] = referencePart.split(':')
      parsedChapter = Number(ch) || 1
      parsedVerse = vs || 'all'
    } else {
      parsedChapter = Number(referencePart) || 1
    }

    setBook(matchedBook)
    setChapter(parsedChapter)
    setVerseSelection(parsedVerse)
  }

  const fetchScripture = async (targetBook: string, targetChapter: number, currentVer: typeof ALL_VERSIONS[0]) => {
    setLoading(true)
    setError('')
    try {
      let fetchedVerses: { verse: number; text: string }[] = []
      const bookIndexId = ALL_BOOKS_IN_ORDER.findIndex(b => b.toLowerCase() === targetBook.toLowerCase()) + 1

      if (currentVer.source === 'bolls') {
        const targetUrl = `https://bolls.life/get-chapter/${currentVer.id}/${bookIndexId}/${targetChapter}/`
        const res = await fetch(targetUrl)
        if (!res.ok) throw new Error('Bolls Life connection dropped.')
        
        const data = await res.json()
        if (Array.isArray(data)) {
          fetchedVerses = data.map((v: any) => ({ 
            verse: v.verse, 
            text: v.text ? v.text.replace(/<\/?[^>]+(>|$)/g, "").trim() : '' 
          }))
        }
      } else {
        const targetUrl = `https://bible-api.com/${encodeURIComponent(targetBook)}+${targetChapter}?translation=${currentVer.id.toLowerCase()}`
        const res = await fetch(targetUrl)
        if (!res.ok) throw new Error('Bible API connection dropped.')
        
        const data = await res.json()
        if (data.verses) {
          fetchedVerses = data.verses.map((v: any) => ({ 
            verse: v.verse, 
            text: v.text ? v.text.trim() : '' 
          }))
        }
      }

      if (fetchedVerses.length === 0) {
        throw new Error('No scripture text payload returned.')
      }

      setVerses(fetchedVerses)
      setTotalVersesInChapter(fetchedVerses.length)
    } catch (err) {
      console.error(err)
      try {
        const fallbackUrl = `https://bible-api.com/${encodeURIComponent(targetBook)}+${targetChapter}?translation=web`
        const fallbackRes = await fetch(fallbackUrl)
        const fallbackData = await fallbackRes.json()
        const fallbackVerses = fallbackData.verses?.map((v: any) => ({ verse: v.verse, text: v.text.trim() })) || []
        
        setVerses(fallbackVerses)
        setTotalVersesInChapter(fallbackVerses.length)
        setError('')
      } catch {
        setError('Could not retrieve translation data. Please check your network connection.')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const searchParam = params.get('search')
      if (searchParam) {
        parseAndSetReference(searchParam)
        isInitialMount.current = false
        return
      }
    }
    fetchScripture(book, chapter, versionObj)
  }, [])

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    fetchScripture(book, chapter, versionObj)
  }, [book, chapter, versionObj])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    parseAndSetReference(searchQuery)
  }

  const changeChapter = (direction: 'next' | 'prev') => {
    setVerseSelection('all')
    setChapter(prev => (direction === 'next' ? prev + 1 : Math.max(1, prev - 1)))
  }

  const displayedVerses = verseSelection === 'all' 
    ? verses 
    : verses.filter(v => v.verse === Number(verseSelection))

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-40 pb-12 selection:bg-amber-100 dark:selection:bg-amber-900/40">
      
      {/* Prominent Search & Control Bar (Fixed under Main Navbar) */}
      <div className="fixed top-[87px] left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-3.5 shadow-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-3">
          
          {/* Expanded Search Reference Input */}
          <form onSubmit={handleSearchSubmit} className="w-full md:flex-1">
            <div className="relative flex items-center">
              <input 
                type="text"
                placeholder="Search reference e.g., Romans 8, John 3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 focus:border-amber-500 text-slate-900 dark:text-white font-medium placeholder-slate-500 dark:placeholder-slate-400 rounded-2xl py-3 pl-5 pr-12 text-sm md:text-base transition-all outline-none shadow-inner"
              />
              <button 
                type="submit" 
                className="absolute right-2.5 p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-all cursor-pointer shadow-sm"
              >
                <Search size={18} className="stroke-[2.5]" />
              </button>
            </div>
          </form>

          {/* Controls Group */}
          <div className="grid grid-cols-2 gap-2 w-full md:w-auto shrink-0">
            {/* Verse Selector */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 px-3.5 py-3 rounded-2xl text-slate-900 dark:text-white transition-colors">
              <Hash size={16} className="text-amber-500 dark:text-amber-400 shrink-0" />
              <select
                value={verseSelection}
                onChange={(e) => setVerseSelection(e.target.value)}
                className="bg-transparent font-semibold outline-none w-full cursor-pointer text-slate-900 dark:text-white [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-900 dark:[&>option]:text-white text-xs md:text-sm truncate"
              >
                <option value="all">Whole Chapter</option>
                {Array.from({ length: totalVersesInChapter }, (_, i) => i + 1).map((vNum) => (
                  <option key={vNum} value={vNum}>Verse {vNum}</option>
                ))}
              </select>
            </div>

            {/* Translation Selector */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 px-3.5 py-3 rounded-2xl text-slate-900 dark:text-white transition-colors">
              <Globe size={16} className="text-amber-500 dark:text-amber-400 shrink-0" />
              <select
                value={versionObj.id}
                onChange={(e) => {
                  const match = ALL_VERSIONS.find(v => v.id === e.target.value)
                  if (match) {
                    setVersionObj(match)
                  }
                }}
                className="bg-transparent font-semibold outline-none w-full cursor-pointer text-slate-900 dark:text-white [&>option]:bg-white [&>option]:text-slate-900 dark:[&>option]:bg-slate-900 dark:[&>option]:text-white text-xs md:text-sm truncate"
              >
                {ALL_VERSIONS.map((v) => (
                  <option key={v.id} value={v.id}>{v.name}</option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Scripture View Area */}
      <div className="max-w-9xl mx-auto px-2 mx:px-10 mt-5">
        <div className="grid lg:grid-cols-4 gap-6 items-start">
          
          {/* Left Book Index Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 max-h-[70vh] overflow-y-auto lg:sticky lg:top-44 transition-colors duration-300">
            <div className="flex items-center gap-2 font-black text-xs text-amber-600 dark:text-amber-400 uppercase tracking-widest pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
              <ListFilter size={14} className="text-amber-500" />
              <span>Select Book</span>
            </div>
            
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Old Testament</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-1 mb-6">
              {OLD_TESTAMENT.map(b => (
                <button
                  key={b}
                  onClick={() => { setBook(b); setChapter(1); setVerseSelection('all'); }}
                  className={`text-left text-sm px-3 py-1.5 rounded-xl transition-colors font-medium truncate cursor-pointer ${
                    book === b 
                      ? 'bg-amber-600 dark:bg-amber-500 text-white font-bold' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">New Testament</h3>
            <div className="grid grid-cols-9 sm:grid-cols-3 lg:grid-cols-1 gap-1">
              {NEW_TESTAMENT.map(b => (
                <button
                  key={b}
                  onClick={() => { setBook(b); setChapter(1); setVerseSelection('all'); }}
                  className={`text-left text-sm px-3 py-1.5 rounded-xl transition-colors font-medium truncate cursor-pointer ${
                    book === b 
                      ? 'bg-amber-600 dark:bg-amber-500 text-white font-bold' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-amber-600 dark:hover:text-amber-400'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Right Main Scripture Display */}
          <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-10 min-h-[65vh] flex flex-col justify-between transition-colors duration-300">
            <div>
              
              {/* Heading & Navigation Controls */}
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-5 mb-8">
                <div>
                  <h2 className="text-3xl font-Segoe UI Black font-black text-slate-900 dark:text-white tracking-tight">
                    {book} {chapter}{verseSelection !== 'all' && `:${verseSelection}`}
                  </h2>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-black uppercase tracking-widest mt-1">
                    {versionObj.name}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      if (isSingleChapterBook(book)) {
                        setVerseSelection(prev => prev === 'all' ? '1' : String(Math.max(1, Number(prev) - 1)))
                      } else {
                        changeChapter('prev')
                      }
                    }}
                    disabled={(!isSingleChapterBook(book) && chapter <= 1) || loading}
                    className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => {
                      if (isSingleChapterBook(book)) {
                        setVerseSelection(prev => prev === 'all' ? '2' : String(Math.min(totalVersesInChapter, Number(prev) + 1)))
                      } else {
                        changeChapter('next')
                      }
                    }}
                    disabled={loading}
                    className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="py-24 text-center text-slate-400 dark:text-slate-500">
                  <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-xs font-mono tracking-widest uppercase animate-pulse">Syncing Library Data...</p>
                </div>
              )}

              {/* Scripture Text Output */}
              {!loading && (
                <div className="space-y-5 font-Segoe UI Black text-lg md:text-xl text-slate-800 dark:text-slate-200 leading-relaxed font-light tracking-wide">
                  {displayedVerses.map((v) => (
                    <span key={v.verse} className="inline group mr-2">
                      <sup className="text-xs font-bold font-sans text-amber-600 dark:text-amber-400 inline-block mr-1.5 select-none font-mono">
                        {v.verse}
                      </sup>
                      {v.text}{" "}
                    </span>
                  ))}
                  {displayedVerses.length === 0 && !error && (
                    <p className="text-slate-400 dark:text-slate-500 text-sm font-sans italic">No matching scriptures found inside this layout view.</p>
                  )}
                </div>
              )}

              {/* Error Callout */}
              {error && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 rounded-2xl text-xs font-medium">
                  {error}
                </div>
              )}
            </div>

            {/* Bottom Footer Navigation */}
            <div className="border-t border-slate-100 dark:border-slate-800 mt-12 pt-6 flex justify-between items-center text-sm text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-xs md:text-sm">
                <HelpCircle size={14}/> Compare phrasing layouts instantly by switching translations.
              </span>
              <div className="flex gap-4">
                <button 
                  onClick={() => {
                    if (isSingleChapterBook(book)) {
                      setVerseSelection(prev => prev === 'all' ? '1' : String(Math.max(1, Number(prev) - 1)))
                    } else {
                      changeChapter('prev')
                    }
                  }} 
                  disabled={(!isSingleChapterBook(book) && chapter <= 1)} 
                  className="hover:text-amber-600 dark:hover:text-amber-400 font-bold disabled:opacity-30 transition-colors cursor-pointer text-slate-700 dark:text-slate-300"
                >
                  &larr; Previous
                </button>
                <button 
                  onClick={() => {
                    if (isSingleChapterBook(book)) {
                      setVerseSelection(prev => prev === 'all' ? '2' : String(Math.min(totalVersesInChapter, Number(prev) + 1)))
                    } else {
                      changeChapter('next')
                    }
                  }} 
                  className="hover:text-amber-600 dark:hover:text-amber-400 font-bold transition-colors cursor-pointer text-slate-700 dark:text-slate-300"
                >
                  Next &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  )
}