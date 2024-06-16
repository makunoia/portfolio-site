import localFont from "next/font/local";

const NeueMontreal = localFont({
  src: [
    {
      path: "../../../fonts/PPNeueMontreal-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../fonts/PPNeueMontreal-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../fonts/PPNeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../fonts/PPNeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal",
});

const NeueMontrealMono = localFont({
  src: [
    {
      path: "../../../fonts/PPNeueMontrealMono-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../fonts/PPNeueMontrealMono-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-neue-montreal-mono",
});

export { NeueMontreal, NeueMontrealMono };
