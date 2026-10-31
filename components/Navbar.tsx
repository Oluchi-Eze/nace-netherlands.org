'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    handleScroll() // Initial check on mount
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md py-3 border-b border-slate-200 dark:border-slate-800/80 shadow-md text-slate-700 dark:text-slate-100'
          : 'bg-transparent py-5 border-b border-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
        
        {/* Brand Logo Identity */}
        <Link href="/" className="flex items-center gap-4 group">
          <Image
            src="/nace-logo.jpg"
            alt="NACE Netherlands Emblem"
            width={200}
            height={80}
            className="h-16 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-md"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav 
          className={`hidden md:flex items-center gap-8 font-semibold text-sm transition-colors ${
            !scrolled ? '[text-shadow:_0_1px_4px_rgb(0_0_0_/_60%)] text-white' : ''
          }`}
        >
          <Link 
            href="/" 
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors relative py-1"
          >
            Home
            {pathname === '/' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-amber-500 rounded-full" />}
          </Link>
          <Link 
            href="/story" 
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors relative py-1"
          >
            About Us
            {pathname === '/story' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-amber-500 rounded-full" />}
          </Link>
          <Link 
            href="/churches" 
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors relative py-1"
          >
            Member Churches
            {pathname === '/churches' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-amber-500 rounded-full" />}
          </Link>
          <Link 
            href="/bible" 
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors relative py-1"
          >
            Bible
            {pathname === '/bible' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-amber-500 rounded-full" />}
          </Link>
          <Link 
            href="/contact" 
            className="hover:text-amber-500 dark:hover:text-amber-400 transition-colors relative py-1"
          >
            Contact
            {pathname === '/contact' && <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-amber-400 rounded-full" />}
          </Link>
        </nav>

        {/* Desktop Theme Switcher */}
        <div className="hidden md:flex items-center gap-4 relative z-10">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center gap-3 relative z-20">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl cursor-pointer transition-colors border ${
              !scrolled 
                ? 'text-white border-white/20 hover:bg-white/10 backdrop-blur-sm' 
                : 'text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 px-6 py-6 space-y-4 font-bold text-slate-800 dark:text-slate-100 shadow-2xl transition-all">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-amber-500">
            Home
          </Link>
          <Link href="/story" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-amber-500">
            Our Story
          </Link>
          <Link href="/churches" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-amber-500">
            Member Churches
          </Link>
          <Link href="/bible" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-amber-500">
            Bible
          </Link>
          <Link href="/donate" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-amber-500">
            Donate (ANBI)
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-amber-500">
            Contact
          </Link>
        </div>
      )}
    </header>
  )
}