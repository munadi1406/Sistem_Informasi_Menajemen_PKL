// /* global importScripts */

// // generatePDFWorker.js

// // import jsPDF from "../../node_modules/jspdf/dist/jspdf.umd.min.js";
// import { expose } from "comlink";
// import jsPDF from "jspdf";

// // Fungsi generatePDF
// const addFontToPDF = async (pdf, fontName, fontContent) => {
//   return new Promise((resolve, reject) => {
//     pdf.addFont(fontName, "normal", "normal");
//     resolve();
//   });
// };
// const fontsToAdd = [
//   {
//     name: "AnandaBlackPersonalUseRegular",
//     file: "../assets/font/AnandaBlackPersonalUseRegular-rg9Rx.ttf",
//   },
//   { name: "AspireDemibold", file: "../assets/font/AspireDemibold-YaaO.ttf" },
//   { name: "AutumnFlowers", file: "../assets/font/AutumnFlowers-9YVZK.otf" },
//   { name: "Calligrapher", file: "../assets/font/Calligrapher-JRxaE.ttf" },
//   {
//     name: "ChicanosPersonalUseRegular",
//     file: "../assets/font/ChicanosPersonalUseRegular-qZDw5.ttf",
//   },
//   {
//     name: "DoveOfPeacePersonalUse",
//     file: "../assets/font/DoveOfPeacePersonalUse-RpEpv.ttf",
//   },
//   {
//     name: "EmotionalRescuePersonalUseRegular",
//     file: "../assets/font/EmotionalRescuePersonalUseRegular-PKY87.ttf",
//   },
//   {
//     name: "FeelfreePersonalUseRegular",
//     file: "../assets/font/FeelfreePersonalUseRegular-lg2Bw.ttf",
//   },
//   {
//     name: "GeraldinePersonalUseItalic",
//     file: "../assets/font/GeraldinePersonalUseItalic-PK12m.ttf",
//   },
//   {
//     name: "IndentureEnglishPenmanDemo",
//     file: "../assets/font/IndentureEnglishPenmanDemo-Xdyj.ttf",
//   },
//   { name: "LambencyRegular", file: "../assets/font/LambencyRegular-eZLZe.ttf" },
//   {
//     name: "MutalisFashionPersonalUseRegular",
//     file: "../assets/font/MutalisFashionPersonalUseRegular-w1p7P.otf",
//   },
//   {
//     name: "NatureBeautyPersonalUse",
//     file: "../assets/font/NatureBeautyPersonalUse-9Y2DK.ttf",
//   },
//   { name: "SellenaBrush", file: "../assets/font/SellenaBrush-x3JyK.ttf" },
//   {
//     name: "StylishCalligraphyDemo",
//     file: "../assets/font/StylishCalligraphyDemo-XPZZ.ttf",
//   },
//   { name: "SweetHipster", file: "../assets/font/SweetHipster-PzlE.ttf" },
//   { name: "TheCheese", file: "../assets/font/TheCheese-1GKEM.ttf" },
//   {
//     name: "WeddingdayPersonalUseRegular",
//     file: "../assets/font/WeddingdayPersonalUseRegular-1Gvo0.ttf",
//   },
//   { name: "Arial", file: "../assets/font/Arial.ttf" },
//   { name: "Helvetica", file: "../assets/font/Helvetica.ttf" },
//   { name: "Tahoma", file: "../assets/font/Tahoma.ttf" },
//   { name: "Times New Roman", file: "../assets/font/TimesNewRoman.ttf" },
//   { name: "Georgia", file: "../assets/font/Georgia.ttf" },
//   { name: "Courier New", file: "../assets/font/CourierNew.ttf" },
//   { name: "Monaco", file: "../assets/font/Monaco.ttf" },
//   {
//     name: "AdorabelleFreePersonalUseRg",
//     file: "../assets/font/AdorabelleFreePersonalUseRg-rgBXO.ttf",
//   },
//   { name: "Amandez TTF Personal", file: "../assets/font/AmandezTTFTrial.ttf" },
//   { name: "Baletta", file: "../assets/font/Baletta-2OwRv.ttf" },
//   {
//     name: "BeautifulPeoplePersonalUse",
//     file: "../assets/font/BeautifulPeoplePersonalUse-dE0g.ttf",
//   },
//   { name: "Bulgathi", file: "../assets/font/Bulgathi-4B8Vx.tff" },
//   {
//     name: "CalisshascriptRegular",
//     file: "../assets/font/CalisshascriptRegular-3zv58.ttf",
//   },
//   {
//     name: "ChristmasCalligraphyPersonal",
//     file: "../assets/font/ChristmasCalligraphyPersonal-3zGlM.ttf",
//   },
//   { name: "Dharma", file: "../assets/font/Dharma-OVa93.ttf" },
//   {
//     name: "DramaQueenFreePersonalUseS",
//     file: "../assets/font/DramaQueenFreePersonalUseS-d96mK.ttf",
//   },
//   { name: "Flicker", file: "../assets/font/Flicker-JR61a.ttf" },
//   {
//     name: "GoldyearpersonalUseRegular",
//     file: "../assets/font/GoldyearpersonalUseRegular-3z6lz.otf",
//   },
//   { name: "HaniyaFreeTrial", file: "../assets/font/HaniyaFreeTrial-1GVgL.ttf" },
//   { name: "Haydena", file: "../assets/font/Haydena-6Yz7Y.otf" },
//   { name: "Kagokpersonal", file: "../assets/font/Kagokpersonal.otf" },
//   {
//     name: "KameliascriptRegular",
//     file: "../assets/font/KameliascriptRegular-eZ6gn.ttf",
//   },
//   { name: "Kastela", file: "../assets/font/Kastela-MV6zw.ttf" },
//   { name: "Krinahpersonal", file: "../assets/font/Krinahpersonal.otf" },
//   {
//     name: "LemonJellyPersonalUse",
//     file: "../assets/font/LemonJellyPersonalUse-dEqR.ttf",
//   },
//   { name: "LoveSeed", file: "../assets/font/LoveSeed-z8EVX.ttf" },
//   { name: "Matchalatte", file: "../assets/font/Matchalatte-w1KV8.ttf" },
//   {
//     name: "MuthiaraDemoVersion",
//     file: "../assets/font/MuthiaraDemoVersion-8MwGg.ttf",
//   },
//   { name: "QIUBApersonal", file: "../assets/font/QIUBApersonal use.otf" },
//   { name: "Rengkoxpersonal", file: "../assets/font/Rengkoxpersonal.otf" },
//   { name: "RisalahCinta", file: "../assets/font/RisalahCinta-ywnWY.ttf" },
//   { name: "ROBACKpersonal", file: "../assets/font/ROBACKpersonal.otf" },
//   { name: "Rostina", file: "../assets/font/Rostina-axrAg.ttf" },
//   { name: "ShawtyRegular", file: "../assets/font/ShawtyRegular-3zvjz.ttf" },
//   { name: "ShogekingOniki", file: "../assets/font/ShogekingOniki-GOerP.otf" },
//   { name: "Silentha", file: "../assets/font/Silentha OT.ttf" },
//   { name: "Sketsaramadhan", file: "../assets/font/Sketsaramadhan-nRLAO.otf" },
//   { name: "SpookyZombie", file: "../assets/font/SpookyZombie-nROvO.ttf" },
//   {
//     name: "SpringSeasonPersonalUseRegular",
//     file: "../assets/font/SpringSeasonPersonalUseRegular-51zgG.ttf",
//   },
//   { name: "WUSHINpersonaluse", file: "../assets/font/WUSHINpersonaluse.otf" },
// ];

// // Gunakan fontsToAdd sesuai kebutuhan Anda

// async function generatePDF({ splitName, textObjects, imageBlob, perihal }) {
//   console.log("worker running");
//   const pdf = new jsPDF("l", "mm", "a4");
//   console.table(pdf.getFontList());
//   console.log(imageBlob);
//   const imageUrl = URL.createObjectURL(imageBlob);
//   console.log({ textObjects });
//   // Mendapatkan tipe MIME dari URL
//   const imageType = imageUrl.split(";")[0].split(":")[1];
//   await Promise.all(
//     fontsToAdd.map(async (font) => {
//       try {
//         const response = await fetch(font.file);
//         const buffer = await response.arrayBuffer();
//         const fontFileContent = new Uint8Array(buffer);
//         console.log({ fontFileContent });
//         addFontToPDF(pdf, font.name, fontFileContent);
//       } catch (error) {
//         console.error(`Error loading font ${font.name}:`, error);
//       }
//     }),
//   );

//   splitName.forEach((name, i) => {
//     if (i > 0) {
//       pdf.addPage();
//     }

//     pdf.addImage(
//       imageUrl,
//       imageType,
//       0,
//       0,
//       pdf.internal.pageSize.width,
//       pdf.internal.pageSize.height,
//     );
//     console.log(pdf.internal.pageSize.height);
//     textObjects.forEach((text) => {
//       if (text.style.fontFamily) {
//         console.log("oke");
//         pdf.setFont(text.style.fontFamily);
//       }

//       pdf.setFontSize(text.style.fontSize.split("px")[0]);
//       const percentageFromLeft = text.percentageFromLeft || 0;
//       const percentageFromTop = text.percentageFromTop || 0;
//       console.log({ percentageFromLeft, percentageFromTop });
//       const absoluteX =
//         (pdf.internal.pageSize.width * percentageFromLeft) / 100;
//       const absoluteY =
//         (pdf.internal.pageSize.height * percentageFromTop) / 100;

//       console.log({
//         absoluteX,
//         absoluteY,
//         y: text.position.y,
//         text: text.text,
//       });
//       pdf.text(text.text, absoluteX, absoluteY + 10);
//     });
//   });

//   // pdf.autoPrint();
//   const pdfName = `${perihal}-${new Date().toLocaleString()}.pdf`;
//   pdf.save(pdfName);
//   const pdfData = pdf.output("blob");

//   return { pdfName, pdfData };
// }

// // Gunakan Comlink untuk membangun workerApi
// const workerApi = {
//   generatePDF,
// };

// expose(workerApi);

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
