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
    <html lang="en" className="">
      <SpeedInsights />
      <Analytics />
      <body className={`${NeueMontreal.variable} ${NeueMontrealMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
