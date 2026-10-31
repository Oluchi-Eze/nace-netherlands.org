
'use client'

import { useState } from 'react'
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Navigation
} from 'lucide-react'
import { sendEmail } from '@/app/actions/sendEmail'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        setSubmitted(true)
      } else {
        setError(
          typeof result.error === 'string'
            ? result.error
            : 'Unable to send message. Please try again.'
        )
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-6 py-20 lg:py-28 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors duration-300">

      {/* Background Hero Image */}
      <img
        src="/contact background.png"
        alt="Contact Background"
        className="absolute top-0 left-0 -z-20 h-96 w-full object-cover"
      />

      <div className="relative max-w-6xl mx-auto mt-12 lg:mt-16">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight [text-shadow:_0_2px_4px_rgb(0_0_0_/_60%)]">
            Contact Us
          </h1>

          <p className="text-slate-100 text-base sm:text-lg leading-relaxed [text-shadow:_0_1px_3px_rgb(0_0_0_/_60%)]">
            Whether you have questions about our member parishes, need pastoral care, or want to learn more about our ministry in the Netherlands, we are here for you.
          </p>
        </div>

        {/* Main Content - Increased spacing from hero */}
        <div className="grid lg:grid-cols-5 gap-12 items-start mt-20 lg:mt-24">

          {/* Direct Details Column */}
          <div className="lg:col-span-2 space-y-8">

            <div className="bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-8 rounded-3xl space-y-6 shadow-xl backdrop-blur-md transition-colors duration-300">

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                Visit Us At
              </h2>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 rounded-2xl border border-red-200 dark:border-red-900/40">
                  <MapPin size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Snijdersstraat 129
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
                    8223 AA Lelystad, Netherlands
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 rounded-2xl border border-blue-200 dark:border-blue-900/40">
                  <Mail size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Email Address
                  </h3>

                  <a
                    href="mailto:info@nace-netherlands.org"
                    className="text-amber-600 dark:text-amber-400 hover:underline text-sm mt-1 block font-medium"
                  >
                    info@nace-netherlands.org
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-200 dark:border-amber-900/40">
                  <Phone size={22} />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Phone
                  </h3>

                  <a
                    href="tel:+31685863163"
                    className="text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 text-sm mt-1 block transition-colors"
                  >
                    +31 6 85863163
                  </a>
                </div>
              </div>

              {/* Google Maps */}
              <div className="pt-5 border-t border-slate-200 dark:border-slate-800">

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    Find Our Location
                  </h3>

                  <MapPin
                    size={18}
                    className="text-amber-600 dark:text-amber-400"
                  />
                </div>

                <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-md">

                  <iframe
                    src="https://maps.google.com/maps?q=Snijdersstraat%20129%2C%208223%20AA%20Lelystad%2C%20Netherlands&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="NACE Netherlands Location - Lelystad"
                  />

                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Snijdersstraat+129%2C+8223+AA+Lelystad%2C+Netherlands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold transition-colors"
                >
                  <Navigation size={16} className="text-amber-600 dark:text-amber-400" />
                  Get Directions
                </a>

              </div>

            </div>
          </div>

          {/* Contact Form Column */}
          <div className="lg:col-span-3 bg-white/95 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl relative backdrop-blur-md transition-colors duration-300">

            {submitted ? (

              <div className="text-center py-12 space-y-4">

                <div className="inline-flex p-4 bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800/60 mb-2">
                  <CheckCircle2 size={40} />
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Message Sent Successfully!
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you for contacting NACE Netherlands. Your message has been routed to info@nace-netherlands.org, and we will get back to you shortly.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold px-6 py-2.5 rounded-xl text-xs transition-all cursor-pointer"
                >
                  Send Another Message
                </button>

              </div>

            ) : (

              <form onSubmit={handleSubmit} className="space-y-6">

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Send Us a Message
                </h2>

                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
                  Fill out the form below and we will direct your inquiry to the appropriate chaplaincy lead.
                </p>

                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 rounded-xl text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Name and Email */}
                <div className="grid sm:grid-cols-2 gap-6">

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="e.g. John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                      placeholder="name@example.com"
                    />
                  </div>

                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Subject / Reason for Inquiry
                  </label>

                  <select
                    name="inquiry_type"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Pastoral Care & Prayer">Pastoral Care & Prayer</option>
                    <option value="All Saints' Church Lelystad">All Saints' Church Lelystad</option>
                    <option value="Donations & Stewardship (ANBI)">Donations & Stewardship (ANBI)</option>
                    <option value="Church Membership">Church Membership</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    Your Message *
                  </label>

                  <textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3.5 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                    placeholder="How can we assist or pray for you?"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-700 via-red-700 to-red-800 hover:from-blue-600 hover:to-red-600 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-red-950/20 flex items-center justify-center gap-2 text-base cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit
                    </>
                  )}
                </button>

              </form>

            )}

          </div>

        </div>

      </div>
    </div>
  )
}
