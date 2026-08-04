import jsPDF from 'jspdf';

interface PassData {
  ticketNumber: string;
  busPassNumber?: string;
  passengerName: string;
  fatherGuardianName?: string;
  mobileNumber: string;
  address?: string;
  passengerPhoto?: string;
  busRoute?: string;
  fromLocation: string;
  toLocation: string;
  dateOfJourney: string;
  validUntil?: string;
  seatNumber?: string;
  busNumber?: string;
  driverName?: string;
  fareAmount?: number;
  advanceAmount?: number;
  balanceAmount?: number;
  seatCount?: string;
  sleeperCount?: string;
  paymentStatus?: string;
  notes?: string;
  createdAt?: string;
}

export async function generatePDF(passData: PassData): Promise<jsPDF> {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 12;
  const contentWidth = pageWidth - 2 * margin;

  // Outer border with double line styling
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(1.2);
  doc.rect(margin - 2, margin - 2, contentWidth + 4, pageHeight - 2 * margin + 4);
  doc.setLineWidth(0.4);
  doc.rect(margin, margin, contentWidth, pageHeight - 2 * margin);

  let y = margin + 5;

  // 1. TOP HEADER BANNER
  // Top Hindi Motto
  doc.setTextColor(220, 38, 38);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('!! JAI MATA DI !!', pageWidth / 2, y, { align: 'center' });
  y += 9;

  // Main Header Title: MAA LAXMI TRAVELS
  doc.setTextColor(15, 23, 84); // Navy Blue
  doc.setFontSize(26);
  doc.setFont('times', 'bold');
  doc.text('MAA LAXMI TRAVELS', pageWidth / 2, y, { align: 'center' });
  y += 7;

  // Bus Logo Icon Representation (Left Side)
  doc.setFillColor(30, 64, 175);
  doc.roundedRect(margin + 5, y - 6, 26, 18, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('BUS TICKET', margin + 18, y, { align: 'center' });
  doc.setFontSize(7);
  doc.text('- BOOKING -', margin + 18, y + 5, { align: 'center' });

  // Center Office Details
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Address: Maa Laxmi Complex, Banjari Pokhara, Shiv Mandir, Gopalganj', margin + 35, y - 2);
  doc.setFont('helvetica', 'bold');
  doc.text('Prop. - Raju Kumar Singh', margin + 35, y + 4.5);
  doc.setTextColor(220, 38, 38);
  doc.setFontSize(10);
  doc.text('Mo. - 7488202225', margin + 35, y + 11);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('YouTube - Facebook : Maa Laxmi Travels Gopalganj', margin + 35, y + 16);

  // Right Side Volvo Bus Image / Graphic Badge
  doc.setFillColor(239, 246, 255);
  doc.setDrawColor(59, 130, 246);
  doc.setLineWidth(0.5);
  doc.roundedRect(pageWidth - margin - 42, y - 6, 38, 22, 3, 3, 'FD');
  doc.setTextColor(30, 64, 175);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('VOLVO B11R', pageWidth - margin - 23, y + 2, { align: 'center' });
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('AC Sleeper Coach', pageWidth - margin - 23, y + 8, { align: 'center' });

  y += 24;

  // Horizontal Separator Line
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(1);
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  // 2. DATE & TICKET NO. SECTION (Dual Pill Boxes)
  const boxWidth = (contentWidth - 6) / 2;

  // Date Box
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y, boxWidth, 14, 4, 4, 'D');

  doc.setFillColor(15, 23, 84);
  doc.roundedRect(margin + 2, y + 2, 28, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('DATE:', margin + 16, y + 8.5, { align: 'center' });

  const journeyDateFormatted = passData.dateOfJourney
    ? new Date(passData.dateOfJourney).toLocaleDateString('en-GB')
    : new Date().toLocaleDateString('en-GB');

  doc.setTextColor(220, 38, 38);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(journeyDateFormatted, margin + 55, y + 9.5);

  // Ticket No Box
  const ticketX = margin + boxWidth + 6;
  doc.roundedRect(ticketX, y, boxWidth, 14, 4, 4, 'D');

  doc.setFillColor(15, 23, 84);
  doc.roundedRect(ticketX + 2, y + 2, 38, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('TICKET NO.:', ticketX + 21, y + 8.5, { align: 'center' });

  doc.setTextColor(220, 38, 38);
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text(passData.ticketNumber || '157', ticketX + 68, y + 9.5);

  y += 20;

  // 3. PASSENGER DETAILS SECTION WITH RIBBON
  // Dark Blue Ribbon Banner Header
  doc.setFillColor(15, 23, 84);
  doc.roundedRect(pageWidth / 2 - 50, y, 100, 10, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('PASSENGER DETAILS', pageWidth / 2, y + 7, { align: 'center' });

  y += 12;

  // Passenger Details Outer Box
  const detailsBoxY = y;
  const detailsBoxHeight = 58;
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, detailsBoxY, contentWidth, detailsBoxHeight, 3, 3, 'D');

  let py = detailsBoxY + 9;
  const colLeftLabel = margin + 8;
  const colLeftColon = margin + 62;
  const colLeftValue = margin + 68;

  const addDetailRow = (label: string, value: string, isRed = false) => {
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10.5);
    doc.setFont('helvetica', 'bold');
    doc.text(label, colLeftLabel, py);
    doc.text(':', colLeftColon, py);

    if (isRed) {
      doc.setTextColor(220, 38, 38);
    } else {
      doc.setTextColor(15, 23, 84);
    }
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(value, colLeftValue, py);
    py += 8;
  };

  addDetailRow('Passenger Name', passData.passengerName || 'Raju Kumar singh', true);

  const visitDate = passData.validUntil
    ? new Date(passData.validUntil).toLocaleDateString('en-GB')
    : new Date().toLocaleDateString('en-GB');

  addDetailRow('Date of Visit', visitDate, false);
  addDetailRow('Mobile Number', passData.mobileNumber || '7488202225', false);

  // Dotted Line Divider
  py -= 2;
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.line(margin + 5, py, pageWidth - margin - 5, py);
  py += 7;

  addDetailRow('From', passData.fromLocation || 'Gopalganj', false);
  addDetailRow('To', passData.toLocation || 'Delhi', false);

  const seatStr = `${passData.seatCount || '1 seat'}   =>   ${passData.sleeperCount || '2 sleeper'}`;
  addDetailRow('Total Seat / Sleeper', seatStr, false);

  y = detailsBoxY + detailsBoxHeight + 8;

  // 4. PAYMENTS SECTION (Advance Amount & Balance Amount)
  const payBoxWidth = (contentWidth - 6) / 2;
  const advanceVal = passData.advanceAmount !== undefined ? passData.advanceAmount : 500;
  const balanceVal = passData.balanceAmount !== undefined ? passData.balanceAmount : (passData.fareAmount ? passData.fareAmount - advanceVal : 3500);

  // Advance Amount Box
  doc.setDrawColor(22, 163, 74); // Green Border
  doc.setLineWidth(0.9);
  doc.roundedRect(margin, y, payBoxWidth, 22, 4, 4, 'D');

  doc.setFillColor(22, 163, 74);
  doc.circle(margin + 12, y + 11, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('RS', margin + 12, y + 14.5, { align: 'center' });

  doc.setTextColor(22, 163, 74);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Advance Amount', margin + 24, y + 8);
  doc.setTextColor(220, 38, 38);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`Rs ${advanceVal}/-`, margin + 24, y + 17);

  // Balance Amount Box
  const balX = margin + payBoxWidth + 6;
  doc.setDrawColor(30, 64, 175); // Blue Border
  doc.setLineWidth(0.9);
  doc.roundedRect(balX, y, payBoxWidth, 22, 4, 4, 'D');

  doc.setFillColor(30, 64, 175);
  doc.circle(balX + 12, y + 11, 7, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('RS', balX + 12, y + 14.5, { align: 'center' });

  doc.setTextColor(30, 64, 175);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Balance Amount', balX + 24, y + 8);
  doc.setTextColor(220, 38, 38);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(`Rs ${balanceVal}/-`, balX + 24, y + 17);

  y += 28;

  // 5. IMPORTANT INFORMATION SECTION
  // Red Ribbon Header
  doc.setFillColor(220, 38, 38);
  doc.roundedRect(pageWidth / 2 - 50, y, 100, 9, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10.5);
  doc.setFont('helvetica', 'bold');
  doc.text('! IMPORTANT INFORMATION !', pageWidth / 2, y + 6.5, { align: 'center' });

  y += 11;

  // Outer Box for Important Info
  const infoBoxY = y;
  const infoBoxHeight = 36;
  doc.setDrawColor(30, 64, 175);
  doc.setLineWidth(0.6);
  doc.roundedRect(margin, infoBoxY, contentWidth, infoBoxHeight, 3, 3, 'D');

  const colW = (contentWidth - 60) / 3;

  // Column 1: Luggage
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Luggage', margin + colW / 2, infoBoxY + 14, { align: 'center' });
  doc.text('Charges Extra', margin + colW / 2, infoBoxY + 22, { align: 'center' });

  doc.setDrawColor(203, 213, 225);
  doc.line(margin + colW, infoBoxY + 5, margin + colW, infoBoxY + infoBoxHeight - 5);

  // Column 2: Beware of Brokers
  doc.text('Beware of', margin + colW + colW / 2, infoBoxY + 14, { align: 'center' });
  doc.text('Brokers', margin + colW + colW / 2, infoBoxY + 22, { align: 'center' });

  doc.line(margin + 2 * colW, infoBoxY + 5, margin + 2 * colW, infoBoxY + infoBoxHeight - 5);

  // Column 3: Neither Refundable Nor Transferable
  doc.text('Neither Refundable', margin + 2 * colW + colW / 2, infoBoxY + 14, { align: 'center' });
  doc.text('Nor Transferable', margin + 2 * colW + colW / 2, infoBoxY + 22, { align: 'center' });

  doc.line(margin + 3 * colW, infoBoxY + 5, margin + 3 * colW, infoBoxY + infoBoxHeight - 5);

  // Column 4: Cancellation Policy
  const policyX = margin + 3 * colW + 4;
  doc.setTextColor(220, 38, 38);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Cancellation Policy:', policyX, infoBoxY + 10);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'normal');
  doc.text('Cancel any ticket 24 hours', policyX, infoBoxY + 17);
  doc.text('in advance, otherwise the ticket', policyX, infoBoxY + 22);
  doc.text('will not be cancelled.', policyX, infoBoxY + 27);

  y = infoBoxY + infoBoxHeight + 8;

  // 6. FOOTER BAR (Booking Number + Partner Brands)
  doc.setFillColor(15, 23, 84);
  doc.roundedRect(margin, y, contentWidth, 15, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('BOOKING NUMBER / PAY PHONE NO.', margin + 8, y + 6);
  doc.setTextColor(250, 204, 21); // Bright Yellow
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('7488202225', margin + 8, y + 12);

  // Partner Badges on Right: redBus | Paytm | MakeMyTrip
  const badgeRightX = pageWidth - margin - 6;

  doc.setFillColor(220, 38, 38);
  doc.roundedRect(badgeRightX - 60, y + 3.5, 18, 8, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('redBus', badgeRightX - 51, y + 8.5, { align: 'center' });

  doc.setFillColor(2, 132, 199);
  doc.roundedRect(badgeRightX - 39, y + 3.5, 18, 8, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(7);
  doc.text('Paytm', badgeRightX - 30, y + 8.5, { align: 'center' });

  doc.setFillColor(234, 88, 12);
  doc.roundedRect(badgeRightX - 18, y + 3.5, 18, 8, 2, 2, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(6.5);
  doc.text('make my trip', badgeRightX - 9, y + 8.5, { align: 'center' });

  y += 22;

  // 7. SIGNATURE LINE AT BOTTOM
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  doc.text('Signature / Recipient: __________________________________________', margin + 5, y);

  return doc;
}

export async function downloadPDF(passData: PassData, filename?: string) {
  const doc = await generatePDF(passData);
  doc.save(filename || `MaaLaxmiTravels-Ticket-${passData.ticketNumber || '157'}.pdf`);
}

export async function printPDF(passData: PassData) {
  const doc = await generatePDF(passData);
  const pdfBlob = doc.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  }
}
