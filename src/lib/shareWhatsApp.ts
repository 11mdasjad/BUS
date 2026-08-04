export function shareViaWhatsApp(passData: {
  ticketNumber: string;
  busPassNumber: string;
  passengerName: string;
  busRoute: string;
  fromLocation: string;
  toLocation: string;
  dateOfJourney: string;
  validUntil: string;
  seatNumber: string;
  busNumber: string;
  fareAmount: number;
  paymentStatus: string;
  mobileNumber?: string;
}) {
  const message = `
🚌 *BUS PASS DETAILS*
━━━━━━━━━━━━━━━
📋 *Ticket #:* ${passData.ticketNumber}
🎫 *Pass #:* ${passData.busPassNumber}

👤 *Passenger:* ${passData.passengerName}
📍 *Route:* ${passData.busRoute}
📌 *From:* ${passData.fromLocation}
📌 *To:* ${passData.toLocation}

🚌 *Bus #:* ${passData.busNumber}
💺 *Seat #:* ${passData.seatNumber}
📅 *Journey:* ${new Date(passData.dateOfJourney).toLocaleDateString()}
📅 *Valid Until:* ${new Date(passData.validUntil).toLocaleDateString()}

💰 *Fare:* ₹${passData.fareAmount}
✅ *Payment:* ${passData.paymentStatus.toUpperCase()}
━━━━━━━━━━━━━━━
_Bus Pass Management System_
  `.trim();

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = passData.mobileNumber ? passData.mobileNumber.replace(/\D/g, '') : '';
  
  const url = phoneNumber
    ? `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    : `https://wa.me/?text=${encodedMessage}`;
  
  window.open(url, '_blank');
}
