import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qxcmmcfjggoaoanz.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ]
  }
};

export default nextConfig;
