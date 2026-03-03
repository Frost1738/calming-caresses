/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blwoiwbplzhoyviciovw.supabase.co",
        port: "",
        pathname: "/storage/v1/render/image/public/**",
      },
      {
        protocol: "https",
        hostname: "blwoiwbplzhoyviciovw.supabase.co",
        port: "",
        pathname: "/storage/v1/object/sign/**",
      },
    ],
  },
};

export default nextConfig;
