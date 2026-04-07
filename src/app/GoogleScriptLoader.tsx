"use client";

import Script from "next/script";

export function GoogleScriptLoader() {
  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={() => console.log("Google Identity Services chargé")}
    />
  );
}