module.exports = {
  images: {
    domains: [
      "www.sporter.com",
      "localhost",
      "e-commrece-backend.vercel.app"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sporter.com",
        pathname: "/media/catalog/product/**",
      },
      {
        protocol: "https",
        hostname: "e-commrece-backend.vercel.app",
        pathname: "/products/**",
      },
    ],
  },
};