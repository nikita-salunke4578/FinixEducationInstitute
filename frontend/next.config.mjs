/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'
    return [
      {
        // Proxy /api/auth/logout to backend (optional — logout is handled by server action)
        // Skip /api/auth/login — it's handled by the Next.js route handler in app/api/auth/login/route.ts
        // Next.js route handlers take priority over rewrites, so /api/auth/login will never be proxied.
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
