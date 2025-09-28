/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimizaciones para Vercel
  experimental: {
    serverComponentsExternalPackages: [
      '@imgly/background-removal',
    ],
  },
  // Configuración para librerías que requieren transpilación
  transpilePackages: [
    '@react-three/fiber',
    '@react-three/drei',
    'three',
  ],
  // Configuración de webpack para compatibilidad
  webpack: (config, { isServer }) => {
    // Configuración para librerías que usan WebGL/Canvas
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
        buffer: false,
        util: false,
        assert: false,
        http: false,
        https: false,
        os: false,
        url: false,
        zlib: false,
      };
    }

    // Configuración específica para @imgly/background-removal
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    // Configuración para archivos binarios
    config.module.rules.push({
      test: /\.(bin|dat)$/,
      type: 'asset/resource',
    });

    // Optimización para Three.js
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'three/examples/jsm': 'three/examples/jsm',
      };
    }

    return config;
  },
  // Headers para CORS y seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  // Configuración de salida para Vercel
  output: 'standalone',
  // Configuración de compresión
  compress: true,
  // Configuración de trailing slash
  trailingSlash: false,
  // Configuración de redirects si es necesario
  async redirects() {
    return [];
  },
}

export default nextConfig
