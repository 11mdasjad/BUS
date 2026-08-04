import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';

export async function downloadTicketPNG(
  elementId = 'maa-laxmi-ticket',
  filename = 'Maa-Laxmi-Travels-Ticket.png'
) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} not found`);
  }

  const dataUrl = await htmlToImage.toPng(element, {
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    cacheBust: true,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  }, 250);
}

export async function downloadTicketPDF(
  elementId = 'maa-laxmi-ticket',
  filename = 'Maa-Laxmi-Travels-Ticket.pdf'
) {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} not found`);
  }

  const dataUrl = await htmlToImage.toPng(element, {
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    cacheBust: true,
  });

  const img = new Image();
  img.src = dataUrl;
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const marginX = 10;
  const contentWidth = pdfWidth - 2 * marginX;
  const contentHeight = (img.height * contentWidth) / img.width;
  const marginY = Math.max(10, (pdfHeight - contentHeight) / 2);

  pdf.addImage(dataUrl, 'PNG', marginX, marginY, contentWidth, contentHeight);

  const pdfBlob = pdf.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.download = filename;
  link.href = url;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 250);
}

export async function printTicket(elementId = 'maa-laxmi-ticket') {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element #${elementId} not found`);
  }

  const dataUrl = await htmlToImage.toPng(element, {
    pixelRatio: 2,
    backgroundColor: '#ffffff',
    cacheBust: true,
  });

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Ticket - Maa Laxmi Travels</title>
          <style>
            body { margin: 0; padding: 20px; display: flex; justify-content: center; align-items: center; }
            img { width: 100%; max-width: 800px; height: auto; }
          </style>
        </head>
        <body>
          <img src="${dataUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  }
}
