import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { GoogleScriptLoader } from "./GoogleScriptLoader";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { Toaster } from "sonner";

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

        <GoogleScriptLoader />

        <ReactQueryProvider>
          {children}
          <Toaster richColors position="top-right"  offset={16}/>
        </ReactQueryProvider>
      </body>
    </html>
  );
}