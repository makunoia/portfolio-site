import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
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
      <SpeedInsights />
      <Analytics />
      <body
        className={`${NeueMontreal.variable} ${NeueMontrealMono.variable} bg`}
      >
        <div className="light-streak"></div>
        {children}
      </body>
    </html>
  );
}
