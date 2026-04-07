import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Football Club",
  description: "site web de gestion d'un club de foot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased" suppressHydrationWarning>
        <NextTopLoader
          color="#4ade80"
          height={5}
          showSpinner={false}
          crawlSpeed={200}
          speed={300}
        />

        {/* Google Identity Services */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
          onLoad={() => console.log("Google Identity Services chargé")}
        />

        {children}
      </body>
    </html>
  );
}
