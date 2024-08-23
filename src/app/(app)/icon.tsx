import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/svg+xml";

export default function Icon() {
  let fill;

  if (process.env.NODE_ENV === "development") {
    fill = "red";
  } else if (process.env.VERCEL_ENV === "preview") {
    fill = "amber";
  } else {
    fill = "black";
  }

  return new ImageResponse(
    (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 60 60"
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
      >
        <rect width="100%" height="100%" rx="8" />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.6841 23H15.0823L10 37H15.6018L18.6135 28.7037L22.1215 28.7037L19.1098 37H24.7116L27.7233 28.7037H31.2315L28.2198 37H33.8216L36.0238 30.9337L38.226 37H44.8619L49.9442 23H44.3424L41.544 30.7087L38.8247 23.2181L38.9039 23H38.7455H33.3021H33.1437H29.7939H24.1921H20.6841Z"
          fill="white"
        />
      </svg>
    ),
    {
      ...size,
    }
  );
}
