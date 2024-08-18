import { ImageResponse } from "next/og";
import Text from "@/components/Text";
export const runtime = "edge";

// Image metadata
export const alt = "Mark Noya | Product Designer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font
  const NeueMontrealMedium = fetch(
    new URL("../../fonts/PPNeueMontreal-Medium.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const NeueMontreal = fetch(
    new URL("../../fonts/PPNeueMontreal-Book.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const image = await fetch(
    `https://assets.marknoya.me/opengraph-image-bg.jpg`
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          /* @ts-ignore */
          src={image}
          width="100%"
          height="100%"
          style={{ position: "absolute", zIndex: 1, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            bottom: 120,
            left: 85,
            display: "flex",
            gap: 20,
          }}
        >
          <h1
            className="text-danger"
            style={{ fontSize: 100, fontWeight: 500 }}
          >
            Mark Noya
          </h1>
          <Text className="text-subtle text-[40px]">
            Get to know the designer behind the portfolio.
          </Text>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Neue Montreal",
          data: await NeueMontreal,
          style: "normal",
          weight: 400,
        },
        {
          name: "Neue Montreal",
          data: await NeueMontrealMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
