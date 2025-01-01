import localFont from "next/font/local";
import type { Metadata } from "next";

import Navigation from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";

const libreBaskervilleFont = localFont({
  src: "../fonts/LibreBaskerville-Regular.otf",
  variable: "--font-librebaskerville",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Enzo Doyen",
    default: "Enzo Doyen",
  },
  description:
    "Enzo Doyen is a PhD Candidate in Natural Language Processing at the University of Strasbourg.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreBaskervilleFont.variable} max-w-4xl mx-auto px-6 py-12 md:px-8`}
      >
        <Navigation />
        <main className="mt-16">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
