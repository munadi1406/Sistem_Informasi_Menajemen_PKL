/* global importScripts */

// generatePDFWorker.js

// import jsPDF from "../../node_modules/jspdf/dist/jspdf.umd.min.js";
import jsPDF from "jspdf";
// import html2canvas from "../../node_modules/html2canvas/dist/html2canvas.js";

// Menanggapi pesan dari utama
onmessage = (data) => {
  console.log(data);

  // Fungsi generatePDF
  async function generatePDF() {
    postMessage("oke");
  }

  generatePDF();
};
