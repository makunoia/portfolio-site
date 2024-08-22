import { ImageResponse } from "next/og";
import config from "@payload-config";
import { getPayloadHMR } from "@payloadcms/next/utilities";
const payload = await getPayloadHMR({ config });

// Image metadata
export const alt = "Mark Noya | Product Designer";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
  params,
}: {
  params: { project: string };
}) {
  const NeueMontreal = fetch(
    "https://assets.marknoya.me/PPNeueMontreal-Book.otf"
  ).then((res) => res.arrayBuffer());

  const NeueMontrealMedium = fetch(
    "https://assets.marknoya.me/PPNeueMontreal-Medium.otf"
  ).then((res) => res.arrayBuffer());

  const image = await fetch(
    `https://assets.marknoya.me/opengraph-image-bg.jpg`
  ).then((res) => res.arrayBuffer());

  const slug = params.project;
  console.log(slug, "slug");
  const { docs } = await payload.find({
    collection: "projects",
    where: {
      slug: {
        equals: slug,
      },
    },
  });

  const project = docs[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          display: "flex",
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
            bottom: 90,
            left: 85,
            display: "flex",
            flexDirection: "column",
            width: "70%",
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: 500,
              lineHeight: "85px",
              color: "white",
            }}
          >
            {project.isLocked ? project.lockedData?.codename : project.title}
          </h1>
          <span
            style={{
              fontSize: 40,
              lineHeight: "50px",
              fontWeight: 400,
              color: "white",
              opacity: 0.6,
            }}
          >
            {project.desc}
          </span>
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
