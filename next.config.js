/** @type {import('next').NextConfig} */
const backendUrl = (
  process.env.BACKEND_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");

const nextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/admin", destination: `${backendUrl}/admin` },
        {
          source: "/admin/api/:path*",
          destination: `${backendUrl}/api/admin/:path*`,
        },
        {
          source: "/admin/:path*",
          destination: `${backendUrl}/admin/:path*`,
        },
        { source: "/admin.css", destination: `${backendUrl}/admin.css` },
        { source: "/admin.js", destination: `${backendUrl}/admin.js` },
        {
          source: "/api/admin/:path*",
          destination: `${backendUrl}/api/admin/:path*`,
        },
        { source: "/api/content", destination: `${backendUrl}/api/content` },
        { source: "/api/contact", destination: `${backendUrl}/api/contact` },
        {
          source: "/backend/uploads/:path*",
          destination: `${backendUrl}/uploads/:path*`,
        },
        {
          source: "/uploads/:path*",
          destination: `${backendUrl}/uploads/:path*`,
        },
      ],
    };
  },
};

module.exports = nextConfig;
