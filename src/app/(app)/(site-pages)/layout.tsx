import Navbar from "@/components/Navbar";
import Footer from "@/app/(app)/components/Footer/Index";
import {Toaster} from "@/app/(app)/components/Sonner";
import {ThemeProvider} from "@/app/(app)/components/ThemeProvider";

import {NeueMontreal, NeueMontrealMono} from "@/fonts";
import "../styles/globals.css";
import dynamic from "next/dynamic";

const VercelAnalytics = dynamic(() => import("@/components/VercelAnalytics"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${NeueMontreal.variable} ${NeueMontrealMono.variable} bg`}
      >
        <ThemeProvider>
          <VercelAnalytics />
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div
              className="pointer-events-none absolute left-[-30em] top-0 h-[70px] w-[900px] rotate-[30deg] rounded-[999px] opacity-45 blur-[150px]"
              style={{background: "var(--light-streak-color)"}}
            />
          </div>
          {children}
          <Navbar />
          <Toaster richColors />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
