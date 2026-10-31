'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Mail, ShieldCheck, ArrowLeft, AlertCircle, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'

export default function AdminLoginPage() {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Check custom password from localStorage (if changed in dashboard) or default .env / fallback
    const savedCustomPassword = typeof window !== 'undefined' ? localStorage.getItem('nace_custom_password') : null
    const expectedEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'chaplain@anglican.nl'
    const expectedPassword = savedCustomPassword || process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'nace-admin-2026'

    if (emailInput.trim() === expectedEmail && passwordInput === expectedPassword) {
      localStorage.setItem('nace_admin_auth', 'true')
      router.push('/admin/dashboard')
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center px-6 py-16 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex p-3 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-200 dark:border-amber-900/40">
            <ShieldCheck size={28} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
            NACE Admin Portal
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Enter your leadership credentials to access the dashboard.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Admin Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => {
                  setEmailInput(e.target.value)
                  setError(false)
                }}
                placeholder="chaplain@anglican.nl"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl py-3.5 pl-11 pr-4 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
          </div>

          {/* Password Field with View Toggle */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value)
                  setError(false)
                }}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl py-3.5 pl-11 pr-12 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400 pt-1">
              <AlertCircle size={14} /> Incorrect email or password. Please try again.
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 via-blue-800 to-amber-600 hover:from-blue-600 hover:to-amber-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg text-sm cursor-pointer mt-2"
          >
            Access Dashboard
          </button>
        </form>

        {/* Return Link */}
        <div className="text-center pt-2 border-t border-slate-200 dark:border-slate-800/80">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft size={14} /> Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  )
}