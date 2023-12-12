/* global importScripts */

// generatePDFWorker.js

self.importScripts('../../node_modules/jspdf/dist/jspdf.umd.min.js');
self.importScripts('../../node_modules/html2canvas/dist/html2canvas.js');

// Menanggapi pesan dari utama
addEventListener('message', async (event) => {
  const { pages, splitName, perihal } = event.data;
  // const jsPDF = new Function('return this.jsPDF')();  
  // Evaluasi sumber kode html2canvas
  const html2canvas = new Function('return this.html2canvas')(); 
  // Fungsi generatePDF
  async function generatePDF() {
    const pdf = new jsPDF('l', 'mm', 'a4');

    const promises = pages.map(async (page, i) => {
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
    const pdfName = `${splitName.join('-')}-${perihal}-${new Date().toLocaleString()}.pdf`;
    pdf.save(pdfName);

    postMessage({ pdfName });
  }

  // Panggil fungsi generatePDF
  generatePDF();
});
