/* global importScripts */

// generatePDFWorker.js

// import jsPDF from "../../node_modules/jspdf/dist/jspdf.umd.min.js";
import jsPDF from "jspdf";
// import html2canvas from "../../node_modules/html2canvas/dist/html2canvas.js";

// Menanggapi pesan dari utama
onmessage = ({ data }) => {
  console.log(data);

  // Fungsi generatePDF
  async function generatePDF() {
    const { screenshots, perihal } =
      data && data.data ? data.data : { screenshots: [], perihal: "" };
    console.log("worker running");

    const pdf = new jsPDF("l", "mm", "a4");
    let images = screenshots || [];

    images.forEach((screenshot, i) => {
      if (i > 0) {
        pdf.addPage();
      }

      // Periksa apakah screenshot.data memiliki nilai sebelum digunakan
      if (screenshot && screenshot.data) {
        pdf.addImage(
          screenshot.data,
          "JPEG",
          0,
          0,
          pdf.internal.pageSize.width,
          pdf.internal.pageSize.height,
        );
      }
    });

    pdf.autoPrint();
    const pdfName = `${perihal}-${new Date().toLocaleString()}.pdf`;
    pdf.save(pdfName);
    const pdfData = pdf.output("blob");

    postMessage({ pdfName, pdfData });
  }

  generatePDF();
};
