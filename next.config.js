/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sporter.com",
        pathname: "/media/catalog/product/",
      },
      {
        protocol: "https",
        hostname: "doxfhxflhtbwmdjtwfye.supabase.co",
        pathname: "/storage/v1/object/public/image/**",
      },
      {
        protocol: "https",
        hostname: "e-commrece-backend.vercel.app",
        pathname: "/products/",
      },
    ],
  },
};

module.exports = nextConfig;