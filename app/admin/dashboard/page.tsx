'use client';

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Building2, 
  LogOut, 
  Plus, 
  Trash2, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Menu, 
  X,
  CheckCircle2,
  FileText,
  RotateCcw,
  Lock,
  KeyRound,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';

interface VerseEntry {
  date: string;
  verse: string;
  quotation: string;
  theme: string;
}

export default function NACEDashboard() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Password Management State
  const [adminPassword, setAdminPassword] = useState('NACE2026!');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load custom password from localStorage if available
    const savedPassword = localStorage.getItem('nace_admin_password');
    if (savedPassword) {
      setAdminPassword(savedPassword);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === adminPassword) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPasswordInput) return;

    if (newPasswordInput !== confirmPasswordInput) {
      alert('New passwords do not match. Please try again.');
      return;
    }

    setAdminPassword(newPasswordInput);
    localStorage.setItem('nace_admin_password', newPasswordInput);
    setNewPasswordInput('');
    setConfirmPasswordInput('');
    setPasswordChangeMessage('Admin password updated successfully!');
    setTimeout(() => setPasswordChangeMessage(null), 4000);
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'verses' | 'parishes' | 'settings'>('overview');
  
  // Verse Management State
  const [verses, setVerses] = useState<VerseEntry[]>([]);
  const [newDate, setNewDate] = useState<string>('October 7, 2026');
  const [newVerse, setNewVerse] = useState<string>('');
  const [newQuotation, setNewQuotation] = useState<string>('');
  const [newTheme, setNewTheme] = useState<string>('');
  
  // Bulk Import State
  const [bulkText, setBulkText] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('nace_custom_verses');
    if (saved) {
      try {
        setVerses(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load verses', e);
      }
    } else {
      const defaultVerses: VerseEntry[] = [
        {
          date: "October 7, 2026",
          verse: "Psalm 37:23",
          quotation: "The steps of a good man are ordered by the LORD: and he delighteth in his way.",
          theme: "God Orders Your Steps"
        }
      ];
      setVerses(defaultVerses);
      localStorage.setItem('nace_custom_verses', JSON.stringify(defaultVerses));
    }
  }, []);

  const sortVersesByDate = (entries: VerseEntry[]): VerseEntry[] => {
    return [...entries].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (isNaN(dateA) || isNaN(dateB)) return a.date.localeCompare(b.date);
      return dateA - dateB;
    });
  };

  const handleAddVerse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVerse || !newQuotation || !newTheme || !newDate) return;

    const filtered = verses.filter(v => v.date.toLowerCase() !== newDate.toLowerCase());
    const updated = sortVersesByDate([
      ...filtered, 
      { date: newDate, verse: newVerse, quotation: newQuotation, theme: newTheme }
    ]);
    
    setVerses(updated);
    localStorage.setItem('nace_custom_verses', JSON.stringify(updated));

    setNewVerse('');
    setNewQuotation('');
    setNewTheme('');
    
    setSuccessMessage(`Verse for ${newDate} saved and sorted successfully!`);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleDeleteVerse = (dateKey: string) => {
    const filtered = verses.filter(v => v.date !== dateKey);
    setVerses(filtered);
    localStorage.setItem('nace_custom_verses', JSON.stringify(filtered));
    setSuccessMessage(`Devotional for ${dateKey} removed.`);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const handleBulkImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bulkText.trim()) return;

    const blocks = bulkText.split(/\r?\n\s*\r?\n/);
    const newEntries: VerseEntry[] = [];

    blocks.forEach((block) => {
      const lines = block.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
      if (lines.length >= 4) {
        const dateLine = lines[0];
        let verseVal = '';
        let quotationVal = '';
        let themeVal = '';

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];
          if (line.toLowerCase().startsWith('verse:')) {
            verseVal = line.replace(/^verse:\s*/i, '');
          } else if (line.toLowerCase().startsWith('quotation:')) {
            quotationVal = line.replace(/^quotation:\s*/i, '');
          } else if (line.toLowerCase().startsWith('theme:')) {
            themeVal = line.replace(/^theme:\s*/i, '');
          }
        }

        if (verseVal && quotationVal && themeVal) {
          newEntries.push({
            date: dateLine,
            verse: verseVal,
            quotation: quotationVal,
            theme: themeVal
          });
        }
      }
    });

    if (newEntries.length > 0) {
      const map = new Map<string, VerseEntry>();
      verses.forEach(v => map.set(v.date.toLowerCase(), v));
      newEntries.forEach(v => map.set(v.date.toLowerCase(), v));

      const sortedAndUnique = sortVersesByDate(Array.from(map.values()));

      setVerses(sortedAndUnique);
      localStorage.setItem('nace_custom_verses', JSON.stringify(sortedAndUnique));
      setBulkText('');
      setSuccessMessage(`Successfully bulk imported and date-sorted ${newEntries.length} devotionals!`);
      setTimeout(() => setSuccessMessage(null), 4000);
    } else {
      alert('Could not parse bulk text format. Please ensure each block starts with the Calendar Date.');
    }
  };

  const handleCancelAll = () => {
    if (window.confirm('Are you sure you want to clear all saved verses?')) {
      setVerses([]);
      localStorage.removeItem('nace_custom_verses');
      setSuccessMessage('All date-based verses cleared successfully.');
      setTimeout(() => setSuccessMessage(null), 4000);
    }
  };

  // If not authenticated, render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400 block">NACE Netherlands</span>
            <h1 className="font-serif font-bold text-2xl">Admin Portal Login</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Enter your administrator password to access the dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound size={16} />
                </span>
                <input 
                  type="password"
                  value={passwordInput}
                  onChange={(e) => { setPasswordInput(e.target.value); setLoginError(false); }}
                  placeholder="Enter password"
                  className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              {loginError && (
                <p className="text-xs text-red-500 font-semibold mt-1.5">Incorrect password. Please try again.</p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="text-center pt-2">
            <a href="/" className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              &larr; Return to Website Homepage
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans transition-colors duration-300">
      
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-slate-950/50 z-40 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
        flex flex-col transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-400 block">NACE Netherlands</span>
            <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-white">Admin Portal</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <button
            onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'overview' 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <LayoutDashboard size={18} /> Overview
          </button>

          <button
            onClick={() => { setActiveTab('verses'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'verses' 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen size={18} /> Verse of the Day Manager
          </button>

          <button
            onClick={() => { setActiveTab('parishes'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'parishes' 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Building2 size={18} /> Parishes & Jurisdictions
          </button>

          <button
            onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all ${
              activeTab === 'settings' 
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10' 
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Settings size={18} /> Admin Settings & Password
          </button>
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <LogOut size={18} /> Lock Admin Session
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen">
        
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)} 
              className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              <Menu size={22} />
            </button>
            <h1 className="text-xl font-serif font-bold text-slate-900 dark:text-white capitalize">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'verses' && 'Date-Matched Verse Manager'}
              {activeTab === 'parishes' && 'Parish Management'}
              {activeTab === 'settings' && 'Admin Settings & Security'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full text-xs font-bold">
              <ShieldCheck size={14} /> ANBI Verified Jurisdiction
            </div>
          </div>
        </header>

        {successMessage && (
          <div className="mx-6 mt-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-2xl flex items-center gap-3 text-sm animate-fade-in">
            <CheckCircle2 size={18} className="shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-8">
          
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Active Parishes</span>
                    <Building2 size={20} className="text-red-500" />
                  </div>
                  <div className="text-3xl font-serif font-black text-slate-900 dark:text-white">1</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">All Saints' Church Lelystad (Flagship)</p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Date-Matched Verses</span>
                    <Sparkles size={20} className="text-amber-500" />
                  </div>
                  <div className="text-3xl font-serif font-black text-slate-900 dark:text-white">{verses.length}</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Chronological calendar entries</p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-2 shadow-sm">
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider">Jurisdiction Region</span>
                    <TrendingUp size={20} className="text-blue-500" />
                  </div>
                  <div className="text-3xl font-serif font-black text-slate-900 dark:text-white">NL</div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Netherlands & Western Europe</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'verses' && (
            <div className="space-y-8">
              
              <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Bulk Import Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <FileText size={18} className="text-blue-500" />
                    <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">Bulk Import & Date Match</h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Paste your layout blocks. The homepage will automatically look up the verse matching today's calendar date:
                  </p>

                  <form onSubmit={handleBulkImport} className="space-y-3">
                    <textarea 
                      rows={6}
                      placeholder="October 7, 2026&#10;Verse: Psalm 37:23&#10;Quotation: The steps of a good man...&#10;Theme: God Orders Your Steps&#10;&#10;October 8, 2026&#10;Verse: Proverbs 16:9..."
                      value={bulkText} 
                      onChange={(e) => setBulkText(e.target.value)} 
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <button 
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <FileText size={16} /> Import & Sort by Date
                    </button>
                  </form>
                </div>

                {/* Global Controls Card */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles size={18} className="text-amber-500" />
                        <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">Global Controls</h3>
                      </div>
                      <span className="text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full">
                        {verses.length} Active Dates
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Clear all stored date-matched entries if needed.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={handleCancelAll}
                      className="w-full bg-red-100 dark:bg-red-950/60 hover:bg-red-200 dark:hover:bg-red-900/60 text-red-700 dark:text-red-300 font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={16} /> Cancel Everything / Clear All Verses
                    </button>
                  </div>
                </div>

              </div>

              {/* Single Verse Form & List Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                
                {/* Single Add Form */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-6 shadow-sm h-fit">
                  <div className="space-y-1">
                    <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">Add Single Date Entry</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Direct calendar date assignment.</p>
                  </div>

                  <form onSubmit={handleAddVerse} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Calendar Date</label>
                      <input 
                        type="text" 
                        placeholder="e.g. October 7, 2026"
                        value={newDate} 
                        onChange={(e) => setNewDate(e.target.value)} 
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Scripture Reference</label>
                      <input 
                        type="text" 
                        placeholder="e.g. John 3:16"
                        value={newVerse} 
                        onChange={(e) => setNewVerse(e.target.value)} 
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Theme / Title</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Unfailing Love"
                        value={newTheme} 
                        onChange={(e) => setNewTheme(e.target.value)} 
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Bible Quotation</label>
                      <textarea 
                        rows={3}
                        placeholder="Enter scripture text..."
                        value={newQuotation} 
                        onChange={(e) => setNewQuotation(e.target.value)} 
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Plus size={18} /> Save Date Entry
                    </button>
                  </form>
                </div>

                {/* Existing Verses List */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-lg text-slate-900 dark:text-white">Scheduled Dates ({verses.length})</h3>
                    <span className="text-xs text-slate-500">Sorted Chronologically</span>
                  </div>

                  <div className="space-y-3">
                    {verses.length === 0 ? (
                      <div className="p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl text-center text-slate-500">
                        No date entries scheduled.
                      </div>
                    ) : (
                      verses.map((v) => (
                        <div 
                          key={v.date}
                          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl flex items-start justify-between gap-4 shadow-sm"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                                {v.date}
                              </span>
                              <span className="text-xs font-bold text-slate-900 dark:text-white">{v.verse}</span>
                              <span className="text-xs text-slate-500">{v.theme}</span>
                            </div>
                            <p className="text-sm font-serif italic text-slate-600 dark:text-slate-300">
                              &ldquo;{v.quotation}&rdquo;
                            </p>
                          </div>

                          <button 
                            onClick={() => handleDeleteVerse(v.date)}
                            className="text-red-500 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                            title="Delete Date Entry"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>

            </div>
          )}

          {activeTab === 'parishes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white">NACE Netherlands Parishes</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Manage member congregations.</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4 shadow-sm">
                  <span className="bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Flagship Parish
                  </span>
                  <h4 className="font-serif font-bold text-xl text-slate-900 dark:text-white">All Saints' Church Lelystad</h4>
                  <p className="text-slate-600 dark:text-slate-300 text-sm">
                    Weekly Sunday Worship, Holy Communion, and children's Sunday school in Flevoland.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-xl space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl shadow-sm space-y-6">
                <div className="space-y-2">
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-2">
                    <KeyRound size={20} />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-slate-900 dark:text-white">Change Admin Password</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Update the security credentials used to sign into this admin dashboard.
                  </p>
                </div>

                {passwordChangeMessage && (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-2xl flex items-center gap-3 text-sm">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>{passwordChangeMessage}</span>
                  </div>
                )}

                <form onSubmit={handleUpdatePassword} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">New Password</label>
                    <div className="relative">
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        value={newPasswordInput}
                        onChange={(e) => setNewPasswordInput(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 pr-10"
                        required
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">Confirm New Password</label>
                    <input 
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPasswordInput}
                      onChange={(e) => setConfirmPasswordInput(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}