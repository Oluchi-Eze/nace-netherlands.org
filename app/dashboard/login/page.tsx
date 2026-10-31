'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ArrowRight } from 'lucide-react'

export default function DashboardLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Change 'NACE2026!' to whatever secure admin password you prefer
    if (password === 'NACE2026!') {
      // Set a session cookie
      document.cookie = "nace_admin_auth=true; path=/; max-age=86400; SameSite=Strict"
      router.push('/dashboard')
      router.refresh()
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-red-600/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto border border-red-500/30">
            <Lock size={22} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-red-500 block">Restricted Access</span>
          <h1 className="text-xl font-serif font-bold text-white">NACE Admin Login</h1>
          <p className="text-xs text-slate-400">
            Please enter your administrator password to unlock the management portal.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter admin password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 transition-colors"
              autoFocus
            />
            {error && (
              <p className="text-red-400 text-xs mt-1.5 pl-1">Incorrect password. Please try again.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-sm py-3 rounded-xl transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
          >
            Authenticate & Enter <ArrowRight size={16} />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-800 text-center">
          <a href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Public Website
          </a>
        </div>
      </div>
    </div>
  )
}