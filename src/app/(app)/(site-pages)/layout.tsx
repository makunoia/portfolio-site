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
          <div className="absolute overflow-hidden inset-0px -z-10">
            <div className="light-streak"></div>
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
