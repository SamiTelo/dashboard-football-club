import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

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
        <NextTopLoader
          color="#4ade80"
          height={3}
          showSpinner={false}
          crawlSpeed={200}
          speed={300}
        />
        {children}
      </body>
    </html>
  );
}
