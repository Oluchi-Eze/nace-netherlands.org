'use client'

import Link from 'next/link'
import { ShieldCheck, Lock, ArrowLeft, Mail, FileText } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden px-6 py-20 lg:py-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Hero Background Image */}
      <img
        src="/../privacy-policy-background.png"
        alt="Privacy Policy Background"
        className="absolute top-0 left-0 -z-20 h-96 w-full object-cover"
      />

      {/* Dynamic Gradient Overlay */}
      <div
        className="absolute top-0 left-0 -z-10 h-96 w-full bg-gradient-to-b from-black/60 via-black/40 to-slate-50 dark:to-slate-950 transition-colors duration-300"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto space-y-12 mt-12 lg:mt-16">
        
        {/* Hero Header */}
        <div className="space-y-4 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-sm border border-white/20">
            <ShieldCheck size={14} className="text-amber-400" />
            <span>NACE Netherlands Compliance</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-white tracking-tight [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
            Privacy Policy
          </h1>
          <p className="text-slate-100 text-sm sm:text-base leading-relaxed [text-shadow:_0_1px_3px_rgb(0_0_0_/_60%)]">
            How the Nigerian Anglican Chaplaincy Europe (Netherlands) collects, protects, and respects your personal data under EU GDPR regulations.
          </p>
        </div>

        {/* Effective Date Line */}
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium pt-4">
          Effective Date: October 2026 &bull; Jurisdiction: Netherlands (EU GDPR)
        </div>

        {/* Policy Body */}
        <div className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText size={20} className="text-amber-600 dark:text-amber-400" />
              1. Overview & Data Controller
            </h2>
            <p>
              The <strong>Nigerian Anglican Chaplaincy Europe (Netherlands)</strong> (NACE), operating as a recognized <em>kerkgenootschap</em> under Dutch law, is committed to safeguarding the privacy of our parishioners, website visitors, and supporters. This Privacy Policy details how we handle personal information gathered through our official website (<code className="text-xs bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">nace-netherlands.org</code>).
            </p>
          </section>

          <hr className="border-slate-200 dark:border-slate-800" />

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
              2. Information We Collect
            </h2>
            <p>We only collect personal information that you voluntarily provide to us when interacting with our chaplaincy office:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li><strong>Contact Form Submissions:</strong> Full name, email address, phone number, and inquiry details sent via our contact page.</li>
              <li><strong>Pastoral & Membership Inquiries:</strong> Details related to baptism, church membership, or pastoral prayer requests.</li>
              <li><strong>Donations & ANBI Compliance:</strong> Name and financial transfer details strictly required for tax receipting and Dutch ANBI stewardship audits.</li>
            </ul>
          </section>

          <hr className="border-slate-200 dark:border-slate-800" />

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
              3. How We Use Your Data
            </h2>
            <p>Your personal data is used solely for spiritual and administrative ministry purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li>Responding directly to your inquiries and pastoral support requests.</li>
              <li>Sending essential parish announcements or newsletter updates (only if opted-in).</li>
              <li>Processing donations and maintaining required non-profit accounting records under Dutch law.</li>
            </ul>
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
              Note: We NEVER sell, rent, or trade your personal information to third-party advertisers or commercial entities.
            </p>
          </section>

          <hr className="border-slate-200 dark:border-slate-800" />

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock size={20} className="text-blue-600 dark:text-blue-400" />
              4. Data Security & Retention
            </h2>
            <p>
              We enforce appropriate technical safeguards (including HTTPS SSL encryption and secure API gateways via Web3Forms) to protect your submission against unauthorized access. Personal data is retained only as long as necessary to fulfill the purpose for which it was collected or to fulfill legal requirements under Dutch tax regulation.
            </p>
          </section>

          <hr className="border-slate-200 dark:border-slate-800" />

          <section className="space-y-3">
            <h2 className="text-xl font-serif font-bold text-slate-900 dark:text-white">
              5. Your Rights Under GDPR
            </h2>
            <p>Under the European General Data Protection Regulation (GDPR), you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-400">
              <li>Request access to the personal data we hold about you.</li>
              <li>Request corrections or updates to inaccurate information.</li>
              <li>Request the complete deletion of your personal records from our database.</li>
              <li>Withdraw consent for spiritual communications at any time.</li>
            </ul>
          </section>

          <hr className="border-slate-200 dark:border-slate-800" />

          <section className="space-y-2">
            <h3 className="font-serif font-bold text-slate-900 dark:text-white text-lg flex items-center gap-2">
              <Mail size={18} className="text-amber-500" /> Data Privacy Officer Contact
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              If you have any questions regarding this Privacy Policy or wish to exercise your data protection rights, please contact our administrative office:
            </p>
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
              Email: <a href="mailto:info@nace-netherlands.org" className="underline">info@nace-netherlands.org</a> | Snijdersstraat 129, 8223 AA Lelystad
            </p>
          </section>

        </div>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-amber-600 dark:text-amber-400 hover:underline"
          >
            <ArrowLeft size={16} /> Return to Home
          </Link>
        </div>

      </div>
    </div>
  )
}