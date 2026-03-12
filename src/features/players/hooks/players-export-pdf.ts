"use client";

import { players } from "../data/players.data";

const teamLogos: Record<string, string> = {
  Arsenal: "/assets/teams/arsenal.png",
  "Fc barcelone": "/assets/teams/fc-barcelona.png",
  "Real Madrid": "/assets/teams/real-madrid.png",
  PSG: "/assets/teams/psg.png",
  "Man City": "/assets/teams/man-city.png",
};

async function getBase64Image(url: string): Promise<string> {
  const res = await fetch(url);
  const blob = await res.blob();

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

export function usePlayersExport() {
  const exportPDF = async () => {
    try {
      const pdfMakeModule = await import("pdfmake/build/pdfmake");
      const pdfFontsModule = await import("pdfmake/build/vfs_fonts");

      const pdfMake = pdfMakeModule.default;
      const fonts = pdfFontsModule.default;

      if (fonts?.pdfMake?.vfs) pdfMake.vfs = fonts.pdfMake.vfs;
      else if (fonts?.vfs) pdfMake.vfs = fonts.vfs;

      // convertir tous les logos
      const logos: Record<string, string> = {};

      for (const team in teamLogos) {
        logos[team] = await getBase64Image(teamLogos[team]);
      }

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
              widths: [40, "*", "*", "*", "*"],
              body: [
                ["ID", "Nom", "Equipe", "Position", "Status"],

                ...players.map((p) => [
                  p.id,
                  `${p.name} ${p.lastname}`,
                  p.team,
                  p.position,
                  p.status,
                ]),
              ],
            },

            layout: {
              fillColor: (rowIndex: number) => {
                if (rowIndex === 0) return "#22c55e"; // header
                return rowIndex % 2 === 0 ? "#f9f9f9" : null; // lignes alternées
              },

              hLineWidth: () => 0.5,
              vLineWidth: () => 0.5,
              hLineColor: () => "#ccc",
              vLineColor: () => "#ccc",
            },
          },
        ],

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
