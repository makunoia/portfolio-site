import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { NeueMontreal, NeueMontrealMono } from "@/fonts";
import "./styles/globals.css";
import Navbar from "./components/Navbar";

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
      <SpeedInsights />
      <Analytics />
      <body
        className={`${NeueMontreal.variable} ${NeueMontrealMono.variable} bg`}
      >
        <div className="relative inset-0 -z-10">
          <div className="light-streak"></div>
        </div>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
