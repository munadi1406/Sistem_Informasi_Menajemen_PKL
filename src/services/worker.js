/* global importScripts */

// generatePDFWorker.js

// import jsPDF from "../../node_modules/jspdf/dist/jspdf.umd.min.js";
import { expose } from "comlink";
import jsPDF from "jspdf";

// Fungsi generatePDF
async function generatePDF({ splitName, textObjects, imageBlob, perihal }) {
  console.log("worker running");
  const pdf = new jsPDF("l", "mm", "a4");
  console.table(pdf.getFontList());
  console.log(imageBlob);
  const imageUrl = URL.createObjectURL(imageBlob);
  console.log({ textObjects });
  // Mendapatkan tipe MIME dari URL
  const imageType = imageUrl.split(";")[0].split(":")[1];

  splitName.forEach((name, i) => {
    if (i > 0) {
      pdf.addPage();
    }

    pdf.addImage(
      imageUrl,
      imageType,
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height,
    );
    textObjects.forEach((text) => {
      pdf.setFontSize(text.style.fontSize.split("px")[0]);
      const percentageFromLeft = text.percentageFromLeft || 0;
      const percentageFromTop = text.percentageFromTop || 0;
      console.log({ percentageFromLeft, percentageFromTop });
      const absoluteX =
        (pdf.internal.pageSize.width * percentageFromLeft) / 100;
      const absoluteY =
        (pdf.internal.pageSize.height * percentageFromTop) / 100;
      console.log({ absoluteX, absoluteY });
      pdf.text(text.text, absoluteX, absoluteY + 13);
    });
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
