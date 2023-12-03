/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medicals-schoolfees.s3.eu-north-1.amazonaws.com",
      },
    ],
  },
  // future: { webpack5: true },
  // webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
  //   config.resolve.alias.canvas = false;
  //   config.resolve.alias.encoding = false;
  //   return config;
  // },
  // async headers() {
  //   return [
  //     {
  //       source: "/path-to-inline-script",
  //       headers: [
  //         {
  //           key: "Content-Security-Policy",
  //           value: "script-src 'self' 'unsafe-inline'",
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
