'use client';

import React from 'react';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Ticket,
  Luggage,
  ShieldCheck,
  AlertTriangle,
  Armchair,
  PenTool,
  Bed,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { BUS_TICKET_LOGO_BASE64, VOLVO_BUS_IMAGE_BASE64 } from '@/lib/ticketImages';

export interface TicketData {
  ticketNumber: string;
  passengerName: string;
  fatherGuardianName?: string;
  mobileNumber: string;
  fromLocation: string;
  toLocation: string;
  dateOfJourney: string;
  validUntil?: string;
  advanceAmount?: number;
  balanceAmount?: number;
  fareAmount?: number;
  seatCount?: string;
  sleeperCount?: string;
  busNumber?: string;
}

export default function BusPassPreview({ pass }: { pass: TicketData }) {
  const advance = pass.advanceAmount !== undefined ? pass.advanceAmount : 500;
  const balance =
    pass.balanceAmount !== undefined
      ? pass.balanceAmount
      : pass.fareAmount
      ? Math.max(0, pass.fareAmount - advance)
      : 3500;

  const formatDate = (dateStr?: string, defaultStr = '28/07/26') => {
    if (!dateStr) return defaultStr;
    if (dateStr.includes('/')) {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        const yearShort = parts[2].length === 4 ? parts[2].slice(-2) : parts[2];
        return `${parts[0].padStart(2, '0')}/${parts[1].padStart(2, '0')}/${yearShort}`;
      }
    }
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = String(d.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  const journeyDateStr = formatDate(pass.dateOfJourney, '28/07/26');
  const visitDateStr = formatDate(pass.validUntil, '26/06/26');

  return (
    <div className="w-full">
      <div
        id="maa-laxmi-ticket"
        className="w-full rounded-2xl p-4 sm:p-5 shadow-xl font-sans relative overflow-hidden"
        style={{
          backgroundColor: '#f8fafc',
          borderWidth: '3px',
          borderColor: '#1e3a8a',
          borderStyle: 'solid',
          color: '#0f172a',
        }}
      >
        {/* 1. TOP HEADER BANNER */}
        <div className="text-center mb-2 sm:mb-3">
          <p
            className="font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5"
            style={{ color: '#dc2626' }}
          >
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#f59e0b', fill: '#f59e0b' }} />
            <span className="tracking-wide">!! जय माता दी !!</span>
            <Sparkles className="w-3.5 h-3.5" style={{ color: '#f59e0b', fill: '#f59e0b' }} />
          </p>
          <h1
            className="text-xl sm:text-3xl font-black tracking-tight uppercase my-0.5"
            style={{ fontFamily: "'Times New Roman', Georgia, serif", color: '#091e42' }}
          >
            MAA LAXMI TRAVELS
          </h1>
        </div>

        {/* Header Info Section */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 mb-3 pb-3"
          style={{ borderBottomWidth: '2px', borderBottomColor: '#1e3a8a', borderBottomStyle: 'solid' }}
        >
          {/* Left: Clean Bus Ticket Booking Logo (Base64 for 100% Export Compatibility) */}
          <div
            className="flex items-center justify-center p-1 rounded-xl shrink-0 bg-white shadow-sm"
            style={{ borderWidth: '1px', borderColor: '#bfdbfe', borderStyle: 'solid' }}
          >
            <img
              src={BUS_TICKET_LOGO_BASE64}
              alt="Bus Ticket Booking Logo"
              className="h-14 sm:h-16 w-auto object-contain rounded-lg"
            />
          </div>

          {/* Center: Address & Contact Details */}
          <div className="flex-1 text-center text-xs space-y-1 px-1 sm:px-2">
            <p className="flex items-center justify-center gap-1 font-semibold text-[10px] sm:text-[11px] leading-tight" style={{ color: '#1e293b' }}>
              <MapPin className="w-3 h-3 text-red-500 shrink-0" />
              <span>Maa Laxmi Complex, Banjari Pokhara, Shiv Mandir, Gopalganj</span>
            </p>
            <p className="flex items-center justify-center gap-1 font-bold text-[10px] sm:text-[11px]" style={{ color: '#0f172a' }}>
              <User className="w-3 h-3 text-blue-900 shrink-0" />
              <span>Prop. – Raju Kumar Singh</span>
            </p>
            <p className="flex items-center justify-center gap-1 font-black text-xs sm:text-sm" style={{ color: '#dc2626' }}>
              <Phone className="w-3 h-3 text-red-600 shrink-0" />
              <span>Mo. – {pass.mobileNumber || '7488202225'}</span>
            </p>
            <p className="flex items-center justify-center gap-1 text-[9.5px] leading-tight" style={{ color: '#475569' }}>
              <span className="font-bold text-red-600">▶️ f</span> YouTube – Facebook : Maa Laxmi Travels Gopalganj
            </p>
          </div>

          {/* Right: High-Res Maa Laxmi Travels Volvo Bus Badge (Base64 for 100% Export Compatibility) */}
          <div
            className="p-1.5 sm:p-2 rounded-xl text-center shadow-md shrink-0 text-white flex flex-col items-center justify-center w-28 sm:w-32"
            style={{
              backgroundColor: '#091e42',
              borderWidth: '2px',
              borderColor: '#2563eb',
              borderStyle: 'solid',
            }}
          >
            {/* Real High-Res Maa Laxmi Travels Blue Volvo Bus Photo */}
            <div className="my-0.5 overflow-hidden rounded-lg bg-white p-0.5 border border-blue-300 shadow">
              <img
                src={VOLVO_BUS_IMAGE_BASE64}
                alt="Maa Laxmi Travels Volvo Bus High-Res"
                className="w-full h-11 sm:h-12 object-cover rounded-md"
              />
            </div>

            {/* Bus Name / Number */}
            <div className="text-[11px] sm:text-xs font-black tracking-wider uppercase mt-0.5 truncate max-w-full" style={{ color: '#facc15' }}>
              {pass.busNumber || 'VOLVO B11R'}
            </div>
            <div className="text-[9px] font-bold uppercase tracking-wide truncate max-w-full" style={{ color: '#bfdbfe' }}>
              Maa Laxmi Travels
            </div>
            <div
              className="text-[7.5px] font-black mt-0.5 px-2 py-0.5 rounded-full uppercase tracking-wider shadow whitespace-nowrap"
              style={{ backgroundColor: '#15803d', color: '#ffffff' }}
            >
              ★ AC SLEEPER COACH ★
            </div>
          </div>
        </div>

        {/* 2. DATE & TICKET NO BAR (Dual Pill Boxes) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-3 sm:mb-4">
          {/* Date Box */}
          <div
            className="flex items-center justify-between rounded-xl p-2 shadow-sm"
            style={{ backgroundColor: '#ffffff', borderWidth: '2px', borderColor: '#1e3a8a', borderStyle: 'solid' }}
          >
            <div
              className="flex items-center gap-1.5 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm"
              style={{ backgroundColor: '#091e42' }}
            >
              <Calendar className="w-3.5 h-3.5 text-white" /> DATE:
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight pr-2" style={{ color: '#dc2626' }}>
              {journeyDateStr}
            </span>
          </div>

          {/* Ticket No Box */}
          <div
            className="flex items-center justify-between rounded-xl p-2 shadow-sm"
            style={{ backgroundColor: '#ffffff', borderWidth: '2px', borderColor: '#1e3a8a', borderStyle: 'solid' }}
          >
            <div
              className="flex items-center gap-1.5 text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm"
              style={{ backgroundColor: '#091e42' }}
            >
              <Ticket className="w-3.5 h-3.5 text-white" /> TICKET NO.:
            </div>
            <span className="text-2xl sm:text-3xl font-black tracking-tight pr-3" style={{ color: '#dc2626' }}>
              {pass.ticketNumber || '157'}
            </span>
          </div>
        </div>

        {/* 3. PASSENGER DETAILS CARD */}
        <div
          className="rounded-2xl overflow-hidden mb-3 sm:mb-4 shadow-md"
          style={{ backgroundColor: '#ffffff', borderWidth: '2px', borderColor: '#1e3a8a', borderStyle: 'solid' }}
        >
          {/* Dark Blue Ribbon Header */}
          <div
            className="text-white text-center py-1.5 sm:py-2 font-black text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            style={{ backgroundColor: '#091e42' }}
          >
            <Ticket className="w-4 h-4 text-white" /> PASSENGER DETAILS
          </div>

          <div className="p-3 sm:p-4 space-y-2.5 font-bold text-xs sm:text-sm">
            {/* Passenger Name */}
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-5 flex items-center gap-1.5" style={{ color: '#1e293b' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#dbeafe', color: '#1e3a8a' }}>
                  <User className="w-3.5 h-3.5" />
                </span>
                <span>Passenger Name</span>
              </div>
              <div className="col-span-1 text-center font-normal" style={{ color: '#94a3b8' }}>:</div>
              <div className="col-span-6 font-black text-base sm:text-lg truncate" style={{ color: '#dc2626' }}>
                {pass.passengerName || 'Raju Kumar singh'}
              </div>
            </div>

            {/* Date of Visit */}
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-5 flex items-center gap-1.5" style={{ color: '#1e293b' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#dbeafe', color: '#1e3a8a' }}>
                  <Calendar className="w-3.5 h-3.5" />
                </span>
                <span>Date of Visit</span>
              </div>
              <div className="col-span-1 text-center font-normal" style={{ color: '#94a3b8' }}>:</div>
              <div className="col-span-6 font-bold" style={{ color: '#091e42' }}>{visitDateStr}</div>
            </div>

            {/* Mobile Number */}
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-5 flex items-center gap-1.5" style={{ color: '#1e293b' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#dbeafe', color: '#1e3a8a' }}>
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <span>Mobile Number</span>
              </div>
              <div className="col-span-1 text-center font-normal" style={{ color: '#94a3b8' }}>:</div>
              <div className="col-span-6 font-bold" style={{ color: '#091e42' }}>{pass.mobileNumber || '7488202225'}</div>
            </div>

            <div style={{ borderBottomWidth: '1px', borderBottomColor: '#cbd5e1', borderBottomStyle: 'dashed', margin: '6px 0' }} />

            {/* From */}
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-5 flex items-center gap-1.5" style={{ color: '#1e293b' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#d1fae5', color: '#047857' }}>
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <span>From</span>
              </div>
              <div className="col-span-1 text-center font-normal" style={{ color: '#94a3b8' }}>:</div>
              <div className="col-span-6 font-black text-sm sm:text-base" style={{ color: '#091e42' }}>
                {pass.fromLocation || 'Gopalganj'}
              </div>
            </div>

            {/* To */}
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-5 flex items-center gap-1.5" style={{ color: '#1e293b' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#fee2e2', color: '#dc2626' }}>
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <span>To</span>
              </div>
              <div className="col-span-1 text-center font-normal" style={{ color: '#94a3b8' }}>:</div>
              <div className="col-span-6 font-black text-sm sm:text-base" style={{ color: '#091e42' }}>
                {pass.toLocation || 'Delhi'}
              </div>
            </div>

            {/* Seat / Sleeper */}
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-5 flex items-center gap-1.5" style={{ color: '#1e293b' }}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#dbeafe', color: '#1e3a8a' }}>
                  <Armchair className="w-3.5 h-3.5" />
                </span>
                <span>Total Seat / Sleeper</span>
              </div>
              <div className="col-span-1 text-center font-normal" style={{ color: '#94a3b8' }}>:</div>
              <div className="col-span-6 font-black flex items-center gap-1.5 flex-wrap" style={{ color: '#091e42' }}>
                <span className="flex items-center gap-1"><Armchair className="w-3.5 h-3.5" style={{ color: '#1d4ed8' }} /> {pass.seatCount || '1 seat'}</span>
                <span style={{ color: '#2563eb' }}>➡</span>
                <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" style={{ color: '#4338ca' }} /> {pass.sleeperCount || '2 sleeper'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. PAYMENT AMOUNTS BOXES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 sm:mb-4">
          {/* Advance Amount */}
          <div
            className="rounded-2xl p-2.5 sm:p-3 flex items-center gap-3 shadow-sm"
            style={{ backgroundColor: '#ecfdf5', borderWidth: '2px', borderColor: '#059669', borderStyle: 'solid' }}
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow shrink-0"
              style={{ backgroundColor: '#059669' }}
            >
              ₹
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#065f46' }}>Advance Amount</p>
              <p className="text-xl sm:text-3xl font-black" style={{ color: '#dc2626' }}>₹{advance}/-</p>
            </div>
          </div>

          {/* Balance Amount */}
          <div
            className="rounded-2xl p-2.5 sm:p-3 flex items-center gap-3 shadow-sm"
            style={{ backgroundColor: '#eff6ff', borderWidth: '2px', borderColor: '#1e3a8a', borderStyle: 'solid' }}
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white flex items-center justify-center font-black text-xl sm:text-2xl shadow shrink-0"
              style={{ backgroundColor: '#091e42' }}
            >
              ₹
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#1e3a8a' }}>Balance Amount</p>
              <p className="text-xl sm:text-3xl font-black" style={{ color: '#dc2626' }}>₹{balance}/-</p>
            </div>
          </div>
        </div>

        {/* 5. IMPORTANT INFORMATION SECTION */}
        <div
          className="rounded-2xl overflow-hidden mb-3 sm:mb-4 shadow-sm"
          style={{ backgroundColor: '#ffffff', borderWidth: '2px', borderColor: '#1e3a8a', borderStyle: 'solid' }}
        >
          {/* Red Ribbon Banner Header */}
          <div
            className="text-white text-center py-1.5 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            style={{ backgroundColor: '#dc2626' }}
          >
            <AlertTriangle className="w-4 h-4 text-white" /> IMPORTANT INFORMATION
          </div>

          <div className="p-2.5 sm:p-3 grid grid-cols-1 sm:grid-cols-4 gap-2 text-center text-xs font-bold">
            {/* Column 1 */}
            <div className="p-2 border-b sm:border-b-0 sm:border-r border-slate-200 flex flex-col items-center justify-center">
              <Luggage className="w-4 h-4 sm:w-5 sm:h-5 mb-1" style={{ color: '#1e293b' }} />
              <p className="leading-tight text-[11px]" style={{ color: '#0f172a' }}>Luggage Charges Extra</p>
            </div>

            {/* Column 2 */}
            <div className="p-2 border-b sm:border-b-0 sm:border-r border-slate-200 flex flex-col items-center justify-center">
              <User className="w-4 h-4 sm:w-5 sm:h-5 mb-1" style={{ color: '#1e293b' }} />
              <p className="leading-tight text-[11px]" style={{ color: '#0f172a' }}>Beware of Brokers</p>
            </div>

            {/* Column 3 */}
            <div className="p-2 border-b sm:border-b-0 sm:border-r border-slate-200 flex flex-col items-center justify-center">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 mb-1" style={{ color: '#1e293b' }} />
              <p className="leading-tight text-[11px]" style={{ color: '#0f172a' }}>Neither Refundable Nor Transferable</p>
            </div>

            {/* Column 4: Cancellation Policy */}
            <div className="p-2 text-left space-y-1">
              <p className="font-extrabold text-[11px]" style={{ color: '#dc2626' }}>Cancellation Policy:</p>
              <p className="text-[10px] font-semibold leading-snug" style={{ color: '#334155' }}>
                Cancel any ticket 24 hours in advance, otherwise the ticket will not be cancelled.
              </p>
            </div>
          </div>
        </div>

        {/* 6. FOOTER BAR */}
        <div
          className="rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md text-white"
          style={{ backgroundColor: '#091e42' }}
        >
          <div className="text-center sm:text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#cbd5e1' }}>
              BOOKING NUMBER / PAY PHONE NO.
            </p>
            <p className="text-lg sm:text-xl font-black flex items-center justify-center sm:justify-start gap-1" style={{ color: '#facc15' }}>
              <PhoneCall className="w-4 h-4" style={{ color: '#facc15' }} /> 7488202225
            </p>
          </div>

          {/* Partner Brand Badges */}
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-white rounded-md text-xs font-black tracking-tight shadow" style={{ backgroundColor: '#dc2626' }}>
              redBus
            </span>
            <span className="px-3 py-1 text-white rounded-md text-xs font-black tracking-tight shadow" style={{ backgroundColor: '#0284c7' }}>
              Paytm
            </span>
            <span className="px-3 py-1 text-white rounded-md text-[11px] font-black tracking-tight shadow" style={{ backgroundColor: '#ea580c' }}>
              make my trip
            </span>
          </div>
        </div>

        {/* 7. SIGNATURE */}
        <div
          className="mt-3 pt-2 text-xs font-extrabold flex items-center justify-between"
          style={{ borderTopWidth: '1px', borderTopColor: '#cbd5e1', borderTopStyle: 'solid', color: '#1e293b' }}
        >
          <div className="flex items-center gap-1.5 flex-wrap">
            <PenTool className="w-4 h-4" style={{ color: '#334155' }} />
            <span>Signature / Recipient: _________________________________________________</span>
          </div>
        </div>
      </div>
    </div>
  );
}
