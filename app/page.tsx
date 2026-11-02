'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Users, 
  Building2, 
  Sparkles, 
  BookOpen, 
  Church, 
  HandHeart, 
  GraduationCap, 
  Compass 
} from 'lucide-react'

interface VerseEntry {
  date: string       // e.g., "October 7, 2026"
  verse: string
  quotation: string
  theme: string
}

export default function NACEHomePage() {
  const [currentVerse, setCurrentVerse] = useState<VerseEntry | null>(null)
  const [todayDateString, setTodayDateString] = useState<string>('')

  useEffect(() => {
    const today = new Date()
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
    const formattedDate = today.toLocaleDateString('en-US', options)
    setTodayDateString(formattedDate)

    const savedVerses = localStorage.getItem('nace_custom_verses')
    let verseList: VerseEntry[] = []

    if (savedVerses) {
      try {
        verseList = JSON.parse(savedVerses)
      } catch (e) {
        console.error('Error parsing custom verses', e)
      }
    }

    if (verseList.length > 0) {
      const matchedVerse = verseList.find(v => v.date && v.date.trim().toLowerCase() === formattedDate.toLowerCase()) || verseList[0]
      setCurrentVerse(matchedVerse)
    } else {
      setCurrentVerse({
        date: formattedDate,
        verse: "Psalm 37:23",
        quotation: "The steps of a good man are ordered by the LORD: and he delighteth in his way.",
        theme: "God Orders Your Steps"
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Segoe_UI_Black',sans-serif] antialiased transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative isolate overflow-hidden min-h-[650px] lg:min-h-[750px] px-6 py-24 lg:py-32 flex items-center justify-center">
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/nace%20video.mp4" type="video/mp4" />
          Your browser does not support HTML video.
        </video>

        <div className="absolute inset-0 -z-10 bg-slate-950/65" />

        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight [text-shadow:_0_3px_6px_rgb(0_0_0_/_70%)]">
            Nigerian Anglican Chaplaincy Europe (Netherlands)
          </h1>

          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide [text-shadow:_0_2px_4px_rgb(0_0_0_/_80%)]">
              One Family, Uniting Communities and Sharing Christ’s Love.
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="#churches"
              className="bg-gradient-to-r from-blue-700 via-blue-800 to-red-700 hover:from-blue-600 hover:to-red-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl transition-all flex items-center gap-2.5 text-base hover:scale-[1.02]"
            >
              Visit our churches <ArrowRight size={18} />
            </Link>

          </div>
        </div>
      </section>

      {/* Who We Are & Mission Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-16">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            A Christian family committed to sharing the love of Christ.
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-sans font-normal">
            The Nigerian Anglican Chaplaincy Europe (Netherlands) is a Christian religious community established under the authority of the <strong>Church of Nigeria (Anglican Communion)</strong>, with a calling to proclaim the Gospel of Jesus Christ, strengthen believers in their faith and extend God's love to the wider community.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-sans font-normal">
            Whether you are new to the Christian faith, looking for a church family or seeking a place to deepen your relationship with God, we invite you to join us. Come as you are, grow in faith and walk with Christ.
          </p>
          <div className="pt-2">
            <Link
              href="/story"
              className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-base hover:underline font-sans"
            >
              DISCOVER OUR FULL STORY <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-800" />

        <div className="space-y-6">
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            Proclaiming the Gospel & Nurturing Believers
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal">
            Our mission is to proclaim the Gospel of Jesus Christ, promote the knowledge of God and nurture a community of believers committed to living according to the teachings and example of Christ.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal">
            Through worship, evangelism, Christian education, pastoral care and community engagement, we seek to strengthen faith, encourage spiritual growth and make a positive difference in the lives of individuals, families and the wider society.
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto space-y-16">
          
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
              Centred on the Gospel & Community Well-Being
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-sans">
              Our work is dedicated to the spiritual, moral, and social well-being of the people we serve across the Netherlands.
            </p>
          </div>

          <div className="space-y-12">
            {/* 1. Worship & Spiritual Growth */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Church size={24} className="text-amber-600 dark:text-amber-400 shrink-0" />
                Worship & Spiritual Growth
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal pl-9">
                We provide opportunities for Christ-centred worship, prayer, biblical teaching and the celebration of the Sacraments, helping believers deepen their relationship with God and grow in their Christian faith.
              </p>
            </div>

            {/* 2. Evangelism & Mission */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Compass size={24} className="text-red-600 dark:text-red-400 shrink-0" />
                Evangelism & Mission
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal pl-9">
                We are committed to sharing the Good News of Jesus Christ and making His teachings known, reaching individuals and communities with the transforming message of the Gospel.
              </p>
            </div>

            {/* 3. Christian Education */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <GraduationCap size={24} className="text-blue-600 dark:text-blue-400 shrink-0" />
                Christian Education
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal pl-9">
                We encourage the study of God's Word and the development of Christian values and morals through biblical instruction, discipleship and spiritual guidance.
              </p>
            </div>

            {/* 4. Pastoral Care & Counselling */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <ShieldCheck size={24} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                Pastoral Care & Counselling
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal pl-9">
                We value the well-being of every individual and seek to provide spiritual guidance, counselling and support to those facing life's challenges.
              </p>
            </div>

            {/* 5. Community Care & Support */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <HandHeart size={24} className="text-purple-600 dark:text-purple-400 shrink-0" />
                Community Care & Support
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal pl-9">
                We believe in demonstrating the love of Christ through practical compassion, encouraging the relief of suffering and supporting the welfare of individuals and the wider community.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Member Parishes Overview Section */}
      <section id="churches" className="py-20 px-6 bg-slate-100/60 dark:bg-slate-900/30 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white">
              NACE Member Parishes & Fellowships
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-sans font-normal">
              Wherever you are in the Netherlands, explore our congregations, discover their locations and service times, and find a place to connect with our growing Christian community.
            </p>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">All Saints' Church Lelystad</h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal">
                Our flagship member parish in Flevoland. Offering weekly Holy Communion, Sunday School, and community outreach.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
                Sundays @ 13:00 CET | Snijdersstraat 129, Lelystad
              </p>
              <Link
                href="https://www.allsaints.nace-netherlands.org"
                className="text-amber-600 dark:text-amber-400 font-bold text-sm inline-flex items-center gap-2 hover:underline pt-2 font-sans"
              >
                Explore Parish Page <ArrowRight size={16} />
              </Link>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Emerging Dutch Fellowships</h3>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal">
                NACE provides spiritual coverage for house prayer groups, student fellowships, and developing congregations across Dutch urban centers.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-sans">
                Mid-week Virtual & House Bible Studies | Amsterdam, Randstad & Beyond
              </p>
              <Link
                href="/contact"
                className="text-blue-600 dark:text-blue-400 font-bold text-sm inline-flex items-center gap-2 hover:underline pt-2 font-sans"
              >
                Contact Chaplaincy Office <ArrowRight size={16} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Be Part of Our Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto font-sans font-normal leading-relaxed">
            Your journey of faith matters, and you do not have to walk it alone. Join us for worship, connect with our Christian family and discover the joy of growing together in Christ.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 via-blue-800 to-red-700 hover:from-blue-600 hover:to-red-600 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-[1.02] font-sans"
            >
              Connect With Us Today <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Date-Adaptive Verse of the Day Section (Placed at the very bottom) */}
      {currentVerse && (
        <section className="py-16 px-6 bg-slate-100 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto space-y-4">

            <blockquote className="text-xl md:text-2xl font-normal leading-relaxed text-slate-800 dark:text-slate-100 italic">
              &ldquo;{currentVerse.quotation}&rdquo;
            </blockquote>

            <div className="flex items-center justify-between gap-4 pt-2 flex-wrap">
              <p className="text-base font-bold text-amber-600 dark:text-amber-400 font-sans tracking-wide">
                {currentVerse.verse}
              </p>

              <Link
                href={`/bible?search=${encodeURIComponent(currentVerse.verse)}`}
                className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:underline font-bold text-sm font-sans"
              >
                <BookOpen size={16} />
                <span>Read Full Chapter</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}