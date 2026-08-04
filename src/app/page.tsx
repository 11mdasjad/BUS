'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Phone,
  User,
  ArrowRightLeft,
  Search,
  Sparkles,
  Zap,
  Clock,
  Award,
  Share2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { BUS_TICKET_LOGO_BASE64 } from '@/lib/ticketImages';

export default function LandingPage() {
  const [fromCity, setFromCity] = useState('Gopalganj');
  const [toCity, setToCity] = useState('Delhi');
  const [journeyDate, setJourneyDate] = useState('2026-07-28');
  const [busType, setBusType] = useState('Volvo AC Sleeper');

  const swapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900 font-sans selection:bg-[#00baf2] selection:text-white pb-16 sm:pb-0">
      {/* 1. CONFIRMTKT MOBILE-OPTIMIZED TOP HEADER */}
      <header className="bg-[#002970] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 min-w-0 group">
            <div className="p-1 bg-white rounded-lg shadow-sm border border-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={BUS_TICKET_LOGO_BASE64}
                alt="Maa Laxmi Travels"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-black text-sm sm:text-base tracking-tight text-white truncate group-hover:text-[#00baf2] transition-colors">
                  MAA LAXMI TRAVELS
                </span>
                <span className="hidden sm:inline-block text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#00baf2] text-[#002970] tracking-wider">
                  VERIFIED
                </span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-blue-200 truncate">Gopalganj • Official Ticket Portal</p>
            </div>
          </Link>

          {/* Quick Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-blue-100">
            <a href="#search-widget" className="hover:text-white transition-colors">
              Book Tickets
            </a>
            <a href="#routes" className="hover:text-white transition-colors">
              Bus Routes
            </a>
            <a href="#offers" className="hover:text-white transition-colors">
              Offers
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </nav>

          {/* Mobile Optimized Login Button */}
          <div className="shrink-0">
            <Link
              href="/login"
              className="px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-xs font-extrabold text-white bg-[#00baf2] hover:bg-[#009ed0] shadow-md transition-all flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              <span>LOGIN</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. CONFIRMTKT HERO BANNER WITH SEARCH WIDGET */}
      <section id="search-widget" className="relative bg-gradient-to-b from-[#002970] via-[#00378b] to-[#f4f7fb] pt-6 sm:pt-8 pb-16 sm:pb-20 px-3 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header Title */}
          <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-6 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-[11px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0" />
              <span>Fastest & Most Reliable Bus Pass Generator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Maa Laxmi Travels Ticket Portal
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl mx-auto">
              Generate, preview, and download official Volvo B11R AC Sleeper Coach tickets instantly
            </p>
          </div>

          {/* ConfirmTkt Style Search Widget Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border border-slate-200">
            {/* Bus Service Selector Tabs (Full Width Scrollable on Mobile) */}
            <div className="flex items-center gap-2 sm:gap-3 mb-4 pb-3 border-b border-slate-100 text-xs font-bold overflow-x-auto no-scrollbar">
              <button
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center gap-1.5 shrink-0 transition-all ${
                  busType === 'Volvo AC Sleeper'
                    ? 'bg-[#002970] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => setBusType('Volvo AC Sleeper')}
              >
                <span>🚌 Volvo AC Sleeper Coach</span>
              </button>
              <button
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center gap-1.5 shrink-0 transition-all ${
                  busType === 'AC Seater'
                    ? 'bg-[#002970] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
                onClick={() => setBusType('AC Seater')}
              >
                <span>💺 Deluxe AC Seater</span>
              </button>
            </div>

            {/* From / Swap / To / Date Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* FROM City */}
              <div className="md:col-span-4 bg-slate-50 hover:bg-blue-50/50 p-3 rounded-xl border border-slate-200 focus-within:border-[#002970] transition-all">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">FROM CITY</label>
                <div className="flex items-center gap-2 mt-0.5">
                  <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                  <input
                    type="text"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    className="w-full bg-transparent font-black text-slate-900 text-base focus:outline-none"
                    placeholder="Gopalganj"
                  />
                </div>
              </div>

              {/* SWAP BUTTON */}
              <div className="md:col-span-1 flex items-center justify-center my-1 md:my-0">
                <button
                  type="button"
                  onClick={swapCities}
                  className="w-10 h-10 rounded-full bg-[#00baf2] hover:bg-[#009ed0] text-white flex items-center justify-center shadow-md hover:rotate-180 transition-all duration-300"
                  title="Swap Cities"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* TO City */}
              <div className="md:col-span-4 bg-slate-50 hover:bg-blue-50/50 p-3 rounded-xl border border-slate-200 focus-within:border-[#002970] transition-all">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">TO CITY</label>
                <div className="flex items-center gap-2 mt-0.5">
                  <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                  <input
                    type="text"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    className="w-full bg-transparent font-black text-slate-900 text-base focus:outline-none"
                    placeholder="Delhi"
                  />
                </div>
              </div>

              {/* DATE OF JOURNEY */}
              <div className="md:col-span-3 bg-slate-50 hover:bg-blue-50/50 p-3 rounded-xl border border-slate-200 focus-within:border-[#002970] transition-all">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">JOURNEY DATE</label>
                <div className="flex items-center gap-2 mt-0.5">
                  <Calendar className="w-4 h-4 text-[#002970] shrink-0" />
                  <input
                    type="date"
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 text-sm focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row Action Button (With Ample Mobile Padding to avoid Safari URL bar overlay) */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-center sm:justify-start gap-3 text-xs font-semibold text-slate-500 flex-wrap">
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free Cancellation</span>
                <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> High-DPI PNG/PDF</span>
              </div>

              <Link
                href="/login"
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-[#002970] to-[#0047ba] hover:from-[#001f54] hover:to-[#003896] shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Search className="w-4 h-4 text-[#00baf2]" />
                <span>SEARCH BUSES / GENERATE PASS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONFIRMTKT STYLE OFFERS & ADVANTAGES GRID */}
      <section id="offers" className="py-8 sm:py-12 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-[#002970] flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 leading-tight">Instant Exports</h4>
              <p className="text-[10px] text-slate-500">Base64 PNG & PDF</p>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 leading-tight">WhatsApp Ticket</h4>
              <p className="text-[10px] text-slate-500">Direct mobile share</p>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 leading-tight">Official Template</h4>
              <p className="text-[10px] text-slate-500">Maa Laxmi Gopalganj</p>
            </div>
          </div>

          <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-slate-900 leading-tight">Passenger Logs</h4>
              <p className="text-[10px] text-slate-500">History & editing</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POPULAR BUS ROUTES GRID */}
      <section id="routes" className="py-8 sm:py-12 max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 space-y-1.5">
          <h2 className="text-xl sm:text-3xl font-black text-slate-900">Popular Travel Routes</h2>
          <p className="text-slate-500 text-xs sm:text-sm">Daily Volvo B11R AC Sleeper Coach departures from Gopalganj</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-[#002970] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Route</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800">DAILY</span>
            </div>
            <p className="text-base font-black text-slate-900 mt-1">Gopalganj ➡ Delhi</p>
            <p className="text-xs text-slate-500 mt-1">Volvo AC Sleeper • Night Coach</p>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-[#002970]">Fare: ₹2,500</span>
              <Link href="/login" className="font-extrabold text-[#00baf2] hover:underline flex items-center gap-1">
                Book <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-[#002970] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Route</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800">DAILY</span>
            </div>
            <p className="text-base font-black text-slate-900 mt-1">Gopalganj ➡ Patna</p>
            <p className="text-xs text-slate-500 mt-1">Volvo AC Sleeper • Express</p>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-[#002970]">Fare: ₹800</span>
              <Link href="/login" className="font-extrabold text-[#00baf2] hover:underline flex items-center gap-1">
                Book <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-[#002970] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Route</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800">DAILY</span>
            </div>
            <p className="text-base font-black text-slate-900 mt-1">Gopalganj ➡ Lucknow</p>
            <p className="text-xs text-slate-500 mt-1">Volvo AC Sleeper • Night Coach</p>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-[#002970]">Fare: ₹1,800</span>
              <Link href="/login" className="font-extrabold text-[#00baf2] hover:underline flex items-center gap-1">
                Book <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-[#002970] transition-all">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Route</span>
              <span className="px-2 py-0.5 rounded text-[9px] font-black bg-emerald-100 text-emerald-800">DAILY</span>
            </div>
            <p className="text-base font-black text-slate-900 mt-1">Gopalganj ➡ Gorakhpur</p>
            <p className="text-xs text-slate-500 mt-1">Volvo AC Sleeper • Direct</p>
            <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-[#002970]">Fare: ₹600</span>
              <Link href="/login" className="font-extrabold text-[#00baf2] hover:underline flex items-center gap-1">
                Book <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONFIRMTKT FOOTER */}
      <footer id="contact" className="bg-[#001f54] text-white py-10 sm:py-12 text-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-blue-900">
            {/* Column 1 */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-white rounded">
                  <img src={BUS_TICKET_LOGO_BASE64} alt="Logo" className="h-6 w-auto" />
                </div>
                <span className="font-black text-base text-white">MAA LAXMI TRAVELS</span>
              </div>
              <p className="text-blue-200 text-xs leading-relaxed">
                Official Volvo B11R AC Sleeper Coach bus ticket booking and pass management portal.
              </p>
            </div>

            {/* Column 2 */}
            <div className="space-y-2">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Contact & Office</h4>
              <p className="flex items-center gap-2 text-blue-100">
                <User className="w-3.5 h-3.5 text-[#00baf2]" />
                <span>Prop. – Raju Kumar Singh</span>
              </p>
              <p className="flex items-center gap-2 text-blue-100 font-bold">
                <Phone className="w-3.5 h-3.5 text-red-400" />
                <span className="text-red-400">Mo. – 7488202225</span>
              </p>
              <p className="flex items-start gap-2 text-blue-200 text-xs">
                <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0 mt-0.5" />
                <span>Maa Laxmi Complex, Banjari Pokhara, Shiv Mandir, Gopalganj</span>
              </p>
            </div>

            {/* Column 3 */}
            <div className="space-y-2.5">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider">Booking Partners</h4>
              <p className="text-blue-200 text-xs">
                YouTube – Facebook: <strong className="text-white">Maa Laxmi Travels Gopalganj</strong>
              </p>
              <div className="flex items-center gap-2 pt-1 flex-wrap">
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-blue-300 text-[11px]">
            <p>© {new Date().getFullYear()} Maa Laxmi Travels. All Rights Reserved.</p>
            <div className="flex items-center gap-6 font-semibold">
              <Link href="/login" className="hover:text-white transition-colors">
                Staff Login
              </Link>
              <Link href="/history" className="hover:text-white transition-colors">
                Pass History
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
