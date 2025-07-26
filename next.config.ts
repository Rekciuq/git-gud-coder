import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  async headers() {
    return [
      {
        source: "/api/trpc/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "http://localhost:6969",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
