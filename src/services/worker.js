/* global importScripts */

// generatePDFWorker.js

// import jsPDF from "../../node_modules/jspdf/dist/jspdf.umd.min.js";
import jsPDF from "jspdf";
// import html2canvas from "../../node_modules/html2canvas/dist/html2canvas.js";

// Menanggapi pesan dari utama
onmessage = (event) => {
  const { screenshots, splitName, perihal } = event.data || {};

  // Pastikan bahwa screenshots adalah array sebelum menggunakan forEach
  if (Array.isArray(screenshots)) {
    // Fungsi generatePDF ditempatkan di luar blok onmessage
    generatePDF(screenshots, splitName, perihal);
  } else {
    console.error("Screenshots data is missing or not an array.");
  }
};

// Fungsi generatePDF ditempatkan di luar blok onmessage
async function generatePDF(screenshots, splitName, perihal) {
  console.log("worker running");
  const pdf = new jsPDF("l", "mm", "a4");

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
  const pdfName = `${perihal}-${new Date().toLocaleString()}.pdf`;
  pdf.save(pdfName);
  const pdfData = pdf.output("blob");

  postMessage({ pdfName, pdfData });
}
