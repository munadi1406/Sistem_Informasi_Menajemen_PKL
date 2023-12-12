/* global importScripts */

// generatePDFWorker.js

// import jsPDF from "../../node_modules/jspdf/dist/jspdf.umd.min.js";
import jsPDF from "jspdf";
// import html2canvas from "../../node_modules/html2canvas/dist/html2canvas.js";

// Menanggapi pesan dari utama
onmessage = (data) => {
  console.log(data);
  const { screenshots, perihal } = data.data;

  // Fungsi generatePDF

  generatePDF(screenshots, perihal);
};

async function generatePDF(screenshots, perihal) {
  console.log("worker running");
  const pdf = new jsPDF("l", "mm", "a4");

  screenshots?.forEach((screenshot, i) => {
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
