'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '@/components/providers/ToastProvider';
import { downloadTicketPDF, downloadTicketPNG, printTicket } from '@/lib/exportTicket';
import { downloadPDF } from '@/lib/generatePDF';
import { shareViaWhatsApp } from '@/lib/shareWhatsApp';
import { generateQRCode } from '@/lib/generateQR';
import BusPassPreview from '@/components/passes/BusPassPreview';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Download,
  Printer,
  MessageCircle,
  FileText,
  QrCode,
  Image as ImageIcon,
} from 'lucide-react';

interface PassData {
  _id: string;
  passengerName: string;
  fatherGuardianName: string;
  mobileNumber: string;
  address: string;
  passengerPhoto: string;
  ticketNumber: string;
  busPassNumber: string;
  busRoute: string;
  fromLocation: string;
  toLocation: string;
  dateOfJourney: string;
  validUntil: string;
  seatNumber: string;
  busNumber: string;
  driverName: string;
  fareAmount: number;
  advanceAmount?: number;
  balanceAmount?: number;
  seatCount?: string;
  sleeperCount?: string;
  paymentStatus: string;
  notes: string;
  createdAt: string;
}

export default function PassDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const [pass, setPass] = useState<PassData | null>(null);
  const [loading, setLoading] = useState(true);
  const [qrCode, setQrCode] = useState('');
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    fetchPass();
  }, [id]);

  const fetchPass = async () => {
    try {
      const res = await fetch(`/api/passes/${id}`);
      if (res.ok) {
        const data = await res.json();
        setPass(data);
        const qr = await generateQRCode({
          ticketNumber: data.ticketNumber,
          busPassNumber: data.busPassNumber,
          passengerName: data.passengerName,
          busRoute: data.busRoute,
          fromLocation: data.fromLocation,
          toLocation: data.toLocation,
          validUntil: data.validUntil,
        });
        setQrCode(qr);
      } else {
        showToast('Pass not found', 'error');
        router.push('/passes');
      }
    } catch {
      showToast('Failed to load pass', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this pass?')) return;
    try {
      const res = await fetch(`/api/passes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Pass deleted successfully', 'success');
        router.push('/passes');
      } else {
        showToast('Failed to delete pass', 'error');
      }
    } catch {
      showToast('Something went wrong', 'error');
    }
  };

  const handleDownloadPDF = async () => {
    if (!pass) return;
    setExporting(true);
    try {
      await downloadTicketPDF('maa-laxmi-ticket', `MaaLaxmiTravels-Ticket-${pass.ticketNumber}.pdf`);
      showToast('PDF downloaded successfully!', 'success');
    } catch (err) {
      console.warn('Canvas PDF export failed, using direct jsPDF fallback:', err);
      try {
        await downloadPDF(pass, `MaaLaxmiTravels-Ticket-${pass.ticketNumber}.pdf`);
        showToast('PDF downloaded successfully!', 'success');
      } catch (err2) {
        console.error('PDF fallback failed:', err2);
        showToast('Failed to download PDF', 'error');
      }
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadPNG = async () => {
    if (!pass) return;
    setExporting(true);
    try {
      await downloadTicketPNG('maa-laxmi-ticket', `MaaLaxmiTravels-Ticket-${pass.ticketNumber}.png`);
      showToast('PNG downloaded successfully!', 'success');
    } catch (err) {
      console.error('PNG export failed:', err);
      showToast('Failed to download PNG image', 'error');
    } finally {
      setExporting(false);
    }
  };

  const handlePrint = async () => {
    if (!pass) return;
    try {
      await printTicket('maa-laxmi-ticket');
    } catch {
      showToast('Print failed', 'error');
    }
  };

  const handleShare = () => {
    if (!pass) return;
    shareViaWhatsApp(pass);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loader" />
      </div>
    );
  }

  if (!pass) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Maa Laxmi Travels Ticket</h1>
            <p className="text-sm text-slate-500">Ticket #{pass.ticketNumber}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Download PNG */}
          <button onClick={handleDownloadPNG} disabled={exporting} className="btn-primary text-xs py-2">
            <ImageIcon className="w-3.5 h-3.5" /> Download PNG
          </button>
          {/* Download PDF */}
          <button onClick={handleDownloadPDF} disabled={exporting} className="btn-secondary text-xs py-2 !border-primary-400 !text-primary-700">
            <Download className="w-3.5 h-3.5" /> Download PDF
          </button>
          {/* Print */}
          <button onClick={handlePrint} className="btn-secondary text-xs py-2">
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
          {/* WhatsApp */}
          <button onClick={handleShare} className="btn-success text-xs py-2">
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </button>
          {/* Edit */}
          <button onClick={() => router.push(`/passes/${id}/edit`)} className="btn-secondary text-xs py-2">
            <Edit className="w-3.5 h-3.5" /> Edit
          </button>
          {/* Delete */}
          <button onClick={handleDelete} className="btn-danger text-xs py-2">
            <Trash2 className="w-3.5 h-3.5" /> Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Ticket Component */}
        <div className="lg:col-span-8">
          <BusPassPreview pass={pass} />
        </div>

        {/* Right sidebar */}
        <div className="lg:col-span-4 space-y-4">
          {/* Actions Card */}
          <div className="glass-card p-6 card-enter">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Download className="w-4 h-4 text-blue-600" /> Download & Share Options
            </h3>
            <div className="space-y-2">
              <button
                onClick={handleDownloadPNG}
                disabled={exporting}
                className="w-full btn-primary py-2.5 text-xs justify-between"
              >
                <span className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Download High-Res PNG Image
                </span>
                <span>.PNG</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={exporting}
                className="w-full btn-secondary py-2.5 text-xs justify-between !border-blue-300 !text-blue-700"
              >
                <span className="flex items-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF Ticket
                </span>
                <span>.PDF</span>
              </button>
              <button
                onClick={handlePrint}
                className="w-full btn-secondary py-2.5 text-xs justify-between"
              >
                <span className="flex items-center gap-2">
                  <Printer className="w-4 h-4" /> Print Ticket
                </span>
                <span>Print</span>
              </button>
              <button
                onClick={handleShare}
                className="w-full btn-success py-2.5 text-xs justify-between"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> Share on WhatsApp
                </span>
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          {/* QR Code */}
          <div className="glass-card p-6 text-center card-enter" style={{ animationDelay: '100ms' }}>
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4 text-primary-600" />
              QR Code Verification
            </h3>
            {qrCode ? (
              <img src={qrCode} alt="QR Code" className="w-36 h-36 mx-auto rounded-xl border border-slate-200 p-2" />
            ) : (
              <div className="w-36 h-36 mx-auto rounded-xl bg-slate-100 flex items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-300" />
              </div>
            )}
            <p className="text-[10px] text-slate-400 mt-2">Scan for ticket validation</p>
          </div>

          {/* Notes */}
          {pass.notes && (
            <div className="glass-card p-6 card-enter" style={{ animationDelay: '200ms' }}>
              <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary-600" />
                Notes
              </h3>
              <p className="text-sm text-slate-600">{pass.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
