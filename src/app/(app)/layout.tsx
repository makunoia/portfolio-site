import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { NeueMontreal, NeueMontrealMono } from "@/fonts";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Mark Noya",
  description: "Design Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${NeueMontreal.variable} ${NeueMontrealMono.variable} bg`}
      >
        <SpeedInsights />
        <Analytics />
        <div className="absolute overflow-hidden inset-0px -z-10">
          <div className="light-streak"></div>
        </div>

        {children}

        <Navbar />
        <Footer status="available" label="In bed" />
      </body>
    </html>
  );
}
