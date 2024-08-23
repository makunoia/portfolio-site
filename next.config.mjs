import { withPayload } from "@payloadcms/next/withPayload";
import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: "incremental",
    reactCompiler: false,
    optimizePackageImports: ["moment-timezone", "moment"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.marknoya.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "marknoya.me",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pub-3fbf485d0da44dbd962a47a445921a51.r2.dev",
        port: "",
        pathname: "/**",
      },
    ],
    loader: "custom",
    loaderFile: "./src/app/(app)/lib/loader.ts",
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate=59",
          },
          {
            key: "x-page",
            value: "Homepage",
          },
        ],
      },
      {
        source: "/projects",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate=59",
          },
          {
            key: "x-slug",
            value: "Projects",
          },
        ],
      },
      {
        source: "/about-me",
        headers: [
          {
            key: "Cache-Control",
            value: "s-maxage=1, stale-while-revalidate=59",
          },
          {
            key: "x-slug",
            value: "About Me",
          },
        ],
      },
    ];
  },
};

// // Bundle analyzer
// const withBundleAnalyzer = bundleAnalyzer({
//   enabled: process.env.ANALYZE === "true",
// });

// // Combine withPayload and withBundleAnalyzer
// const combinedConfig = withPayload(withBundleAnalyzer(nextConfig));
// export default combinedConfig;

export default withPayload(nextConfig);
