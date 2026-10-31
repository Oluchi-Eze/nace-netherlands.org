import Image from 'next/image'

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 pt-28 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-4">
                        <Image
                          src="/ANBI logo.png"
                          alt="All Saints' Church Lelystad logo"
                          width={200}
                          height={80}
                          className="h-auto w-auto max-w-full object-contain drop-shadow-md"
                          priority
                        />
                      </div>
      </div>
    </main>
  )
}