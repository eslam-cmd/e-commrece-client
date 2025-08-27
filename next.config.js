module.exports = {
  images: {
    domains: ["www.sporter.com", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.sporter.com",
        pathname: "/media/catalog/product/**",
      },
    ],
  },
};
