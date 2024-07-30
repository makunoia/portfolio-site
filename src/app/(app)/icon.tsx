import { ImageResponse } from "next/og";

export default function Icon() {
  let fill = "black";

  if (process.env.NODE_ENV === "development") {
    fill = "red";
  }

  if (process.env.VERCEL_ENV === "preview" || "development") {
    fill = "amber";
  }

  return new ImageResponse(
    (
      <svg
        width="60"
        height="60"
        viewBox="0 0 60 60"
        fill={fill}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.6841 23H15.0823L10 37H15.6018L18.6135 28.7037L22.1215 28.7037L19.1098 37H24.7116L27.7233 28.7037H31.2315L28.2198 37H33.8216L36.0238 30.9337L38.226 37H44.8619L49.9442 23H44.3424L41.544 30.7087L38.8247 23.2181L38.9039 23H38.7455H33.3021H33.1437H29.7939H24.1921H20.6841Z"
          fill="white"
        />
      </svg>
    )
  );
}
