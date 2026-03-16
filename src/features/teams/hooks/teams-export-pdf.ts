"use client";


import { teams } from "../data/teams-data";
import { TeamsListItem } from "../types/teams-types";

export function TeamsExport() {

  const exportPDF = async () => {
     try {
       const pdfMakeModule = await import("pdfmake/build/pdfmake");
       const pdfFontsModule = await import("pdfmake/build/vfs_fonts");
 
       const pdfMake = pdfMakeModule.default;
       const fonts = pdfFontsModule.default;
 
       if (fonts?.pdfMake?.vfs) pdfMake.vfs = fonts.pdfMake.vfs;
       else if (fonts?.vfs) pdfMake.vfs = fonts.vfs;
 
       // Corps du tableau
       const tableBody = [
         ["ID", "Team"],
 
         ...teams.map((p: TeamsListItem) => [
           p.id,
           p.name,
         ]),
       ];
 
       const docDefinition = {
         content: [
           {
             text: "Liste des postes",
             fontSize: 18,
             bold: true,
             alignment: "center",
             margin: [0, 0, 0, 15],
           },
 
           {
             text: `Exporté le ${new Date().toLocaleDateString()}`,
             alignment: "right",
             fontSize: 9,
             margin: [0, 0, 0, 10],
           },
 
           {
             text: `Total équipes: ${teams.length}`,
             margin: [0, 10, 0, 10],
             bold: true,
           },
 
           {
             table: {
               headerRows: 1,
               widths: ["auto", "*"],
               body: tableBody,
             },
 
             layout: {
               fillColor: (rowIndex: number) => {
                 if (rowIndex === 0) return "#22c55e";
                 return rowIndex % 2 === 0 ? "#f9f9f9" : null;
               },
 
               hLineWidth: () => 0.5,
               vLineWidth: () => 0.5,
               hLineColor: () => "#ccc",
               vLineColor: () => "#ccc",
             },
           },
         ],
 
         footer: (currentPage: number, pageCount: number) => ({
           text: `${currentPage} / ${pageCount}`,
           alignment: "center",
           fontSize: 9,
         }),
 
         defaultStyle: {
           fontSize: 10,
         },
       };
 
       pdfMake.createPdf(docDefinition).download("positions.pdf");
     } catch (error) {
       console.error("Impossible d’exporter le PDF :", error);
     }
   };
 
   return { exportPDF };
}