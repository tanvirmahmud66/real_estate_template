/** @type {import('next').NextConfig} */
const nextConfig = {
  // Experimental features (optional)
  // reactCompiler: true, // Only if you're using React 19+

  images: {
    // For Netlify static deployment, uncomment this line:
    // unoptimized: true,
    
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },

  // Essential for Netlify deployment
  output: 'standalone',
};

export default nextConfig;