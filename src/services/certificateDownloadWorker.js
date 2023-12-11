// pdfWorker.js

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = async ({ pages, splitName, perihal }) => {
  const pdf = new jsPDF('l', 'mm', 'a4');
  const promises = Array.from(pages).map(async (page, i) => {
    const canvas = await html2canvas(page, { scale: 4 });
    const imageData = canvas.toDataURL('image/jpeg');
    return { index: i, data: imageData };
  });

  const screenshots = await Promise.all(promises);

  screenshots.forEach((screenshot, i) => {
    if (i > 0) {
      pdf.addPage();
    }
    pdf.addImage(
      screenshot.data,
      'JPEG',
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height,
    );
  });

  pdf.autoPrint();
  return pdf.output('blob');
};

self.onmessage = async function (event) {
  const { data } = event;
  const result = await generatePDF(data);
  self.postMessage(result);
};
