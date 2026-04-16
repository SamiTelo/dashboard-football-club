"use client";

import { Player } from "../types/players-types";

function formatDate(date?: string | Date) {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function usePlayersExport() {
  const exportPDF = async (players: Player[]) => {
    try {
      const pdfMakeModule = await import("pdfmake/build/pdfmake");
      const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

      const pdfMake = pdfMakeModule.default;
      const fonts = pdfFontsModule.default;

      // fix fonts
      if (fonts?.pdfMake?.vfs) pdfMake.vfs = fonts.pdfMake.vfs;
      else if (fonts?.vfs) pdfMake.vfs = fonts.vfs;

      // =========================
      // TABLE BODY
      // =========================
      const tableBody = [
        ["ID", "Nom", "Équipe", "Position", "Créé le", "Modifié le"],

        ...players.map((p) => [
          p.id,
          `${p.firstName} ${p.lastName}`,
          p.team?.name ?? "-",
          p.position?.name ?? "-",
          formatDate(p.createdAt),
          formatDate(p.updatedAt),
        ]),
      ];

      const docDefinition = {
        content: [
          {
            text: "Liste des joueurs",
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
            text: `Total joueurs: ${players.length}`,
            margin: [0, 10, 0, 10],
            bold: true,
          },

          {
            table: {
              headerRows: 1,
              widths: ["auto", "*", "*", "*", "auto", "auto"],
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

      pdfMake.createPdf(docDefinition).download("players.pdf");
    } catch (error) {
      console.error("Impossible d’exporter le PDF :", error);
    }
  };

  return { exportPDF };
}