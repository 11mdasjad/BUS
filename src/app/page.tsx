import React from 'react';
import Link from 'next/link';
import {
  Ticket,
  ShieldCheck,
  Download,
  Share2,
  MapPin,
  Phone,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Clock,
  CreditCard,
} from 'lucide-react';
import BusPassPreview from '@/components/passes/BusPassPreview';
import { BUS_TICKET_LOGO_BASE64, VOLVO_BUS_IMAGE_BASE64 } from '@/lib/ticketImages';

export default function LandingPage() {
  const samplePass = {
    ticketNumber: '157',
    passengerName: 'Raju Kumar Singh',
    mobileNumber: '7488202225',
    fromLocation: 'Gopalganj',
    toLocation: 'Delhi',
    dateOfJourney: '2026-07-28',
    validUntil: '2026-06-26',
    advanceAmount: 500,
    balanceAmount: 3500,
    fareAmount: 4000,
    seatCount: '1 seat',
    sleeperCount: '2 sleeper',
    busNumber: 'VOLVO B11R',
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. PUBLIC NAVBAR */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-1.5 bg-white rounded-xl shadow-md border border-blue-400 group-hover:scale-105 transition-transform duration-200">
              <img
                src={BUS_TICKET_LOGO_BASE64}
                alt="Maa Laxmi Travels"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  MAA LAXMI TRAVELS
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-600 text-white tracking-widest">
                  PORTAL
                </span>
              </div>
              <p className="text-xs text-slate-400">Gopalganj • Volvo AC Sleeper Coach</p>
            </div>
          </Link>

          {/* Quick Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#preview" className="hover:text-white transition-colors">
              Live Ticket Preview
            </a>
            <a href="#routes" className="hover:text-white transition-colors">
              Popular Routes
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Action CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all duration-200 flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-blue-400" />
              <span>Login</span>
            </Link>
            <Link
              href="/passes/new"
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 flex items-center gap-2"
            >
              <Ticket className="w-4 h-4" />
              <span>Create Ticket</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>Official Bus Ticket Generator & Management System</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Luxury Bus Pass & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
                  Ticket Generator
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Generate official <strong className="text-white">Maa Laxmi Travels</strong> Volvo B11R AC Sleeper Coach tickets in seconds. Features real-time live preview, high-resolution PNG & PDF downloads, direct WhatsApp sharing, and complete passenger history.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/passes/new"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-extrabold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 group"
                >
                  <Ticket className="w-5 h-5 text-amber-300" />
                  <span>Generate Bus Ticket Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/login"
                  className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 hover:text-white border border-slate-700 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <User className="w-5 h-5 text-blue-400" />
                  <span>Login to Portal</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center sm:text-left">
                <div>
                  <p className="text-2xl font-black text-white">100%</p>
                  <p className="text-xs text-slate-400 font-medium">Exact Template Match</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-400">PNG & PDF</p>
                  <p className="text-xs text-slate-400 font-medium">Instant Downloads</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-emerald-400">WhatsApp</p>
                  <p className="text-xs text-slate-400 font-medium">Direct Share Ready</p>
                </div>
              </div>
            </div>

            {/* Hero Visual Column (Volvo Bus Render Card) */}
            <div className="lg:col-span-5">
              <Link href="/passes/new" className="block group">
                <div className="relative rounded-3xl p-4 bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 shadow-2xl overflow-hidden transition-all duration-300 group-hover:border-blue-500/50">
                  <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-widest rounded-bl-2xl shadow">
                    ★ LUXURY VOLVO B11R ★
                  </div>

                  <div className="mt-4 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
                    <img
                      src={VOLVO_BUS_IMAGE_BASE64}
                      alt="Maa Laxmi Travels Volvo Bus"
                      className="w-full h-64 sm:h-72 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-4 space-y-2 text-center">
                    <h3 className="text-xl font-extrabold text-white group-hover:text-blue-400 transition-colors flex items-center justify-center gap-2">
                      <span>Maa Laxmi Travels Gopalganj</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-xs text-slate-400 flex items-center justify-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      <span>Banjari Pokhara, Shiv Mandir, Gopalganj</span>
                    </p>
                    <div className="pt-2 flex items-center justify-center gap-2 text-xs font-bold text-slate-300">
                      <span className="px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800">
                        AC Sleeper Coach
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                        Mo. 7488202225
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LIVE PRINTABLE TICKET PREVIEW SECTION */}
      <section id="preview" className="py-16 bg-slate-950 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-wider border border-amber-500/20">
              Template Precision
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Live Printable Ticket Preview
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Every pass generated matches the exact Maa Laxmi Travels physical ticket layout with embedded logo assets, seat counts, payment details, and booking numbers.
            </p>
          </div>

          {/* Ticket Render Card Container (Interactive & Clickable to Ticket Generator Page) */}
          <div className="max-w-4xl mx-auto">
            <Link href="/passes/new" className="block group">
              <div className="bg-slate-900 p-4 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl group-hover:border-blue-500/60 transition-all duration-300 relative">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                  <span className="text-xs sm:text-sm font-extrabold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Live Ticket Layout — Click Anywhere to Customize & Download</span>
                  </span>
                  <span className="text-xs font-extrabold text-white bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow">
                    <span>Open Generator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

                {/* Live Ticket Template Component */}
                <BusPassPreview pass={samplePass} />

                <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Base64 embedded images ensure 100% download accuracy</span>
                  </div>
                  <div
                    className="px-6 py-3 rounded-xl text-sm font-extrabold text-white bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:from-blue-500 group-hover:to-indigo-500 shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Create Your Own Ticket</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES GRID */}
      <section id="features" className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-500/20">
              Built For Speed & Accuracy
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything You Need for Bus Ticketing
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Designed specifically for travel agencies and operators to streamline passenger ticketing and pass management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Link href="/passes/new" className="block group">
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 group-hover:border-blue-500/50 transition-all duration-300 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/30 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Ticket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Instant Ticket Generator</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Fill in passenger details, dates, ticket numbers, bus models, and payment amounts to see a real-time live preview immediately.
                </p>
              </div>
            </Link>

            {/* Feature 2 */}
            <Link href="/passes/new" className="block group">
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 group-hover:border-amber-500/50 transition-all duration-300 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-amber-600/15 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">High-DPI PNG & PDF Downloads</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Download tickets as crisp, high-resolution PNG image files or multi-page printable PDFs with embedded logo graphics.
                </p>
              </div>
            </Link>

            {/* Feature 3 */}
            <Link href="/passes/new" className="block group">
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 group-hover:border-emerald-500/50 transition-all duration-300 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Share2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">Direct WhatsApp Share</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Send ticket details, passenger info, and booking summaries directly to passengers' mobile numbers via WhatsApp with one click.
                </p>
              </div>
            </Link>

            {/* Feature 4 */}
            <Link href="/history" className="block group">
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 group-hover:border-indigo-500/50 transition-all duration-300 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">Complete Ticket History</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Search, filter, edit, or re-download any previously generated bus pass from your central ticket history log.
                </p>
              </div>
            </Link>

            {/* Feature 5 */}
            <Link href="/passes/new" className="block group">
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 group-hover:border-purple-500/50 transition-all duration-300 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-purple-600/15 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">Advance & Balance Tracker</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Automatically calculates remaining balance amounts based on advance payments so passengers always have clear payment receipts.
                </p>
              </div>
            </Link>

            {/* Feature 6 */}
            <Link href="/login" className="block group">
              <div className="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/80 group-hover:border-rose-500/50 transition-all duration-300 space-y-4 h-full">
                <div className="w-12 h-12 rounded-xl bg-rose-600/15 border border-rose-500/30 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-rose-400 transition-colors">Role-Based Security</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Secure credentials authentication for admins and staff operators with system reports and user management controls.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. POPULAR ROUTES SECTION */}
      <section id="routes" className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Popular Travel Routes</h2>
            <p className="text-sm text-slate-400">Regular daily Volvo AC Sleeper Coach service from Gopalganj</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/passes/new" className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between transition-all group">
              <div>
                <p className="text-xs font-semibold text-slate-400">From Gopalganj</p>
                <p className="text-base font-black text-white group-hover:text-blue-400 transition-colors">➡ Delhi</p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-blue-900/60 text-blue-300 border border-blue-700">
                DAILY
              </span>
            </Link>

            <Link href="/passes/new" className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between transition-all group">
              <div>
                <p className="text-xs font-semibold text-slate-400">From Gopalganj</p>
                <p className="text-base font-black text-white group-hover:text-blue-400 transition-colors">➡ Patna</p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-blue-900/60 text-blue-300 border border-blue-700">
                DAILY
              </span>
            </Link>

            <Link href="/passes/new" className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between transition-all group">
              <div>
                <p className="text-xs font-semibold text-slate-400">From Gopalganj</p>
                <p className="text-base font-black text-white group-hover:text-blue-400 transition-colors">➡ Lucknow</p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-blue-900/60 text-blue-300 border border-blue-700">
                DAILY
              </span>
            </Link>

            <Link href="/passes/new" className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between transition-all group">
              <div>
                <p className="text-xs font-semibold text-slate-400">From Gopalganj</p>
                <p className="text-base font-black text-white group-hover:text-blue-400 transition-colors">➡ Gorakhpur</p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-blue-900/60 text-blue-300 border border-blue-700">
                DAILY
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 border-t border-slate-800 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ready to Generate Your Bus Tickets?
          </h2>
          <p className="text-base text-blue-200 max-w-xl mx-auto">
            Create custom ticket passes for Maa Laxmi Travels with instant PNG & PDF export and direct WhatsApp sharing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/passes/new"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-extrabold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-400/20 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Ticket className="w-5 h-5 text-slate-950" />
              <span>Create Ticket Pass</span>
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto px-7 py-4 rounded-xl text-base font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5 text-blue-400" />
              <span>Login to Account</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer id="contact" className="bg-slate-950 border-t border-slate-800 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
            {/* Column 1: Brand Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-white rounded-lg">
                  <img src={BUS_TICKET_LOGO_BASE64} alt="Logo" className="h-7 w-auto" />
                </div>
                <span className="font-extrabold text-base text-white">MAA LAXMI TRAVELS</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Official Volvo B11R AC Sleeper Coach bus ticket booking and pass management portal.
              </p>
            </div>

            {/* Column 2: Contact Info */}
            <div className="space-y-2">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Contact & Office</h4>
              <p className="flex items-center gap-2 text-slate-300">
                <User className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Prop. – Raju Kumar Singh</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                <Phone className="w-4 h-4 text-red-400 shrink-0" />
                <span className="text-red-400">Mo. – 7488202225</span>
              </p>
              <p className="flex items-start gap-2 text-slate-400 text-xs">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>Maa Laxmi Complex, Banjari Pokhara, Shiv Mandir, Gopalganj</span>
              </p>
            </div>

            {/* Column 3: Social & Partners */}
            <div className="space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider">Follow & Booking Partners</h4>
              <p className="text-slate-400">
                YouTube – Facebook: <strong className="text-white">Maa Laxmi Travels Gopalganj</strong>
              </p>
              <div className="flex items-center gap-2 pt-1">
                <span className="px-2.5 py-1 text-white rounded bg-red-600 font-black text-[10px] shadow">
                  redBus
                </span>
                <span className="px-2.5 py-1 text-white rounded bg-sky-600 font-black text-[10px] shadow">
                  Paytm
                </span>
                <span className="px-2.5 py-1 text-white rounded bg-orange-600 font-black text-[10px] shadow">
                  make my trip
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} Maa Laxmi Travels. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/login" className="hover:text-slate-300 transition-colors">
                Staff Login
              </Link>
              <Link href="/passes/new" className="hover:text-slate-300 transition-colors">
                Create Bus Pass
              </Link>
              <Link href="/history" className="hover:text-slate-300 transition-colors">
                Pass History
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
