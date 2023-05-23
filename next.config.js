// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
// };

// module.exports = nextConfig;
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = {
    async rewrites() {
        return [
            {
                source: "/api/coverdreamit/:path*",
                destination: "http://coverdreamit.co.kr:2401/:path*",
            },
        ];
    },

    async serverMiddleware() {
        return [
            createProxyMiddleware("/api/coverdreamit", {
                target: "http://coverdreamit.co.kr:2401",
                changeOrigin: true,
            }),
        ];
    },
};
