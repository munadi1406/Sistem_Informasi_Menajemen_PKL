// generatePDFWorker.js

// Menanggapi pesan dari utama
addEventListener("message", (event) => {
  const { pages, splitName, perihal, jsPDFSource, html2canvasSource } =
    event.data;

  // Evaluasi sumber kode jsPDF dan html2canvas
  const jsPDF = new Function(jsPDFSource)();
  const html2canvas = new Function(html2canvasSource)();

  // Fungsi generatePDF
  async function generatePDF() {
    const pdf = new jsPDF("l", "mm", "a4");

    const promises = pages.map(async (page, i) => {
      const canvas = await html2canvas(page, { scale: 4 });
      const imageData = canvas.toDataURL("image/jpeg");
      return { index: i, data: imageData };
    });

    const screenshots = await Promise.all(promises);

    screenshots.forEach((screenshot, i) => {
      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(
        screenshot.data,
        "JPEG",
        0,
        0,
        pdf.internal.pageSize.width,
        pdf.internal.pageSize.height,
      );
    });

    pdf.autoPrint();
    const pdfName = `${splitName.join(
      "-",
    )}-${perihal}-${new Date().toLocaleString()}.pdf`;
    pdf.save(pdfName);

    postMessage({ pdfName });
  }

  // Panggil fungsi generatePDF
  generatePDF();
});
