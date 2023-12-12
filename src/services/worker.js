/* global importScripts */

// generatePDFWorker.js

// import jsPDF from "../../node_modules/jspdf/dist/jspdf.umd.min.js";
import { expose } from "comlink";
import jsPDF from "jspdf";

// Fungsi generatePDF
async function generatePDF({ screenshots, perihal }) {
  console.log("worker running");
  const pdf = new jsPDF("l", "mm", "a4");
  let image = screenshots || [];
  image.forEach((screenshot, i) => {
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

  return { pdfName, pdfData };
}

// Gunakan Comlink untuk membangun workerApi
const workerApi = {
  generatePDF,
};

expose(workerApi);
