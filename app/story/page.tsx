'use client'

import Link from 'next/link'
import { ArrowRight, Church, Compass, ShieldCheck, Heart, Building2, Users, Telescope, Eye } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Segoe_UI_Black',sans-serif] antialiased transition-colors duration-300">
      
      {/* Cover Image Hero Banner */}
      <section className="relative isolate overflow-hidden min-h-[420px] lg:min-h-[500px] px-6 py-24 lg:py-32 flex items-center justify-center border-b border-slate-800">
        {/* Cover Background Image */}
        <img
          src="/../about us background.png"
          alt="About NACE Cover"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
        />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10 text-white">

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight [text-shadow:_0_3px_6px_rgb(0_0_0_/_70%)]">
            About Us
          </h1>

          <p className="text-slate-200 text-lg sm:text-xl max-w-3xl mx-auto font-sans font-normal leading-relaxed [text-shadow:_0_2px_4px_rgb(0_0_0_/_80%)]">
            One family, united in Christ and bringing communities together across the Netherlands.
          </p>
        </div>
      </section>

      {/* Main Content Body */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-20">

        {/* Who We Are */}
        <section className="space-y-6">
          <div className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400 font-sans">
            Identity & Calling
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
            Who We Are
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-sans font-normal">
            The Nigerian Anglican Chaplaincy Europe (Netherlands) is a Christian religious organisation established under the authority of the <strong>Church of Nigeria (Anglican Communion)</strong>. We exist to proclaim the Gospel of Jesus Christ, strengthen believers in their faith and bring people together through worship, fellowship and Christian service.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-sans font-normal">
            Rooted in the historic Anglican faith and tradition, we are committed to building a Christ-centred community where people can grow spiritually, find support and experience the love of God.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-sans font-normal">
            As a Chaplaincy serving across the Netherlands, we provide a spiritual home for believers and support the growth of local congregations united by one faith, one mission and one Lord.
          </p>
        </section>

        <hr className="border-slate-200 dark:border-slate-800" />

        {/* Vision & Mission */}
        <section className="space-y-12">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-sans">
            <Eye size={28} className="text-amber-400" />
          </div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-sans">
              Our Vision
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Building a Vibrant Christian Community
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-sans font-normal">
              To build a vibrant and growing Christian community across the Netherlands, where people are brought to Christ, believers are strengthened in faith and communities are transformed by the love of God.
            </p>
          </div>

          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-sans">
            <Telescope size={28} className="text-amber-400" />
          </div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-sans">
              Our Mission
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Proclaiming Christ & Demonstrating Compassion
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-sans font-normal">
              Our mission is to proclaim the Gospel of Jesus Christ, promote the knowledge of God and nurture a community of believers committed to living according to the teachings and example of Christ.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-sans font-normal">
              We pursue this through worship, evangelism, biblical teaching, Christian education, pastoral care and community engagement. We seek to make the message of Christ known, encourage spiritual growth and serve individuals, families and communities with love and compassion.
            </p>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800" />

        {/* Our Anglican Heritage */}
        <section className="space-y-6">
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <ShieldCheck className="text-red-600 dark:text-red-400 shrink-0" size={32} />
            Our Anglican Heritage
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-sans font-normal">
            Our identity and ministry are grounded in the historic faith and tradition of the Anglican Communion. Established under the authority of the Church of Nigeria (Anglican Communion), we uphold the historic faith, doctrine, Sacraments and discipline of the Church.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-sans font-normal">
            We value the authority of Holy Scripture, the teaching of Jesus Christ, reverent worship and the sacramental life of the Church. These foundations guide our faith, ministry and service.
          </p>
        </section>

        <hr className="border-slate-200 dark:border-slate-800" />

        {/* What We Do */}
        <section className="space-y-12">
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-red-600 dark:text-red-400 font-sans">
              Ministry Pillars
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              What We Do
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg font-sans">
              Our work focuses on the spiritual, moral and social well-being of individuals and communities.
            </p>
          </div>

          <div className="space-y-10">
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Church size={22} className="text-amber-500 shrink-0" />
                Worship and Spiritual Growth
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal pl-9">
                Providing opportunities for worship, prayer, biblical teaching and the celebration of the Sacraments.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Compass size={22} className="text-red-500 shrink-0" />
                Evangelism and Mission
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal pl-9">
                Sharing the Good News of Jesus Christ and reaching people with the message of the Gospel.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Building2 size={22} className="text-blue-500 shrink-0" />
                Christian Education
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal pl-9">
                Encouraging biblical understanding, discipleship and the development of Christian values.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <ShieldCheck size={22} className="text-emerald-500 shrink-0" />
                Pastoral Care
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal pl-9">
                Offering spiritual guidance, counselling and support to individuals and families.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Heart size={22} className="text-purple-500 shrink-0" />
                Community Support
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed font-sans font-normal pl-9">
                Demonstrating Christ's love through compassion, practical assistance and concern for the wider community.
              </p>
            </div>
          </div>
        </section>

        <hr className="border-slate-200 dark:border-slate-800" />

        {/* One Chaplaincy, Growing Congregations */}
        <section className="space-y-6">
          <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <Users className="text-blue-600 dark:text-blue-400 shrink-0" size={30} />
            One Chaplaincy, Growing Congregations
          </h3>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-sans font-normal">
            We believe that faith grows stronger when people come together. As the Chaplaincy develops, we seek to establish and support congregations in different parts of the Netherlands, making worship, fellowship and spiritual guidance accessible to more people.
          </p>
          <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-sans font-normal">
            Each congregation is part of a wider Christian family, sharing the same faith, values and mission while serving its local community. Together, we are building a connected community where everyone has the opportunity to worship, belong, grow and serve.
          </p>
        </section>

        <hr className="border-slate-200 dark:border-slate-800" />

        {/* Our Commitment */}
        <section className="space-y-8 pb-8">
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 font-sans">
              Looking Forward
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              Our Commitment
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-sans font-normal">
              We are committed to remaining faithful to the Gospel, preserving our Anglican heritage, nurturing believers and extending the love of Christ to the communities around us.
            </p>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed font-sans font-normal">
              Our journey is one of faith, service and growth. As we continue to develop across the Netherlands, we trust in God's guidance and remain dedicated to the mission He has entrusted to us.
            </p>
          </div>

          <div className="pt-6 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 via-blue-800 to-red-700 hover:from-blue-600 hover:to-red-600 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl transition-all hover:scale-[1.02] font-sans"
            >
              Contact Chaplaincy Office <ArrowRight size={18} />
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}