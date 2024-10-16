/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: "https",
                hostname: "api.apis.guru"
            }
        ]
    }
};

export default nextConfig;
