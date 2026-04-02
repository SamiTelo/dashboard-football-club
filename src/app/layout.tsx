import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Football Club",
  description: "site web de gestion d'un club de foot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}