/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      { source: '/work', destination: '/', permanent: true },
      { source: '/projects', destination: '/', permanent: true },
      { source: '/projects/zoominfo', destination: '/work/zoominfo', permanent: true },
      { source: '/projects/jnj', destination: '/work/jnj', permanent: true },
      { source: '/projects/hypex', destination: '/work/hypex', permanent: true },
      { source: '/projects/afiye', destination: '/', permanent: true },
      { source: '/projects/zoominfo/:path*', destination: '/work/zoominfo/:path*', permanent: true },
      { source: '/contact', destination: 'https://www.linkedin.com/in/arpitahluwalia/', permanent: false },
      { source: '/offprint', destination: 'https://chromewebstore.google.com/detail/offprint/noolmimnjfhhnkibgledocngcgbkmojl', permanent: false },
      { source: '/tashvi', destination: 'https://tashvi.ai/', permanent: false },
      { source: '/work/zoominfo-archive', destination: '/work/zoominfo', permanent: true },
    ];
  },
};

export default nextConfig;
