import { ImageLoaderProps } from "next/image";

export default function CloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  const params = [
    `format=webp`,
    `fit=contain`,
    `width=${width}`,
    `quality=${quality || 75}`,
  ];

  const file = encodeURIComponent(src);

  return `https://marknoya.me/cdn-cgi/image/${params.join(",")}/${file}`;
}
