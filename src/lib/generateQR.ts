import QRCode from 'qrcode';

export async function generateQRCode(data: Record<string, string>): Promise<string> {
  const qrData = JSON.stringify({
    tn: data.ticketNumber,
    bp: data.busPassNumber,
    name: data.passengerName,
    route: data.busRoute,
    from: data.fromLocation,
    to: data.toLocation,
    valid: data.validUntil,
  });

  try {
    const url = await QRCode.toDataURL(qrData, {
      width: 150,
      margin: 1,
      color: {
        dark: '#1e40af',
        light: '#ffffff',
      },
    });
    return url;
  } catch (err) {
    console.error('QR Code generation error:', err);
    return '';
  }
}
