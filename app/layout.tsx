import type { Metadata } from "next";
import "./globals.css";
import { Instrument_Serif, Inter } from "next/font/google";
import { restaurant } from "@/data/restaurant";
import { MafiaProvider } from "@/components/mafia/MafiaContext";
import MafiaOverlay from "@/components/mafia/MafiaOverlay";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

// next/font pre-loads fonts server-side — eliminates the FOUT "wink" on load
const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "block", // 'block' prevents invisible text flash; font is above-fold critical
})

const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

import { getMafiaStoryEvents } from "@/data/mafia";

export const metadata: Metadata = {
  title: "Porca & Vaca | Alwarpet, Chennai",
  description: "A modern house for people who take food seriously. Built around meat.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch story events on the server side
  const storyEvents = await getMafiaStoryEvents();

  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="bg-obsidian text-bone antialiased selection:bg-ember selection:text-white relative">
        <MafiaProvider initialStoryEvents={storyEvents}>
          <SmoothScrollProvider>
            {children}
            <MafiaOverlay />
          </SmoothScrollProvider>
        </MafiaProvider>
      </body>
    </html>
  );
}
