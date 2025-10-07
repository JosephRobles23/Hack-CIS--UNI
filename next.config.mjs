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
  // Configuración específica para @imgly/background-removal
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
  webpack: (config, { isServer, webpack }) => {
    // Solo configurar fallbacks para el cliente
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
        net: false,
        tls: false,
        child_process: false,
      };
    }

    // Configuración para archivos WASM y binarios
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'asset/resource',
    });

    config.module.rules.push({
      test: /\.(bin|dat)$/,
      type: 'asset/resource',
    });

    // Excluir @imgly/background-removal del servidor
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('@imgly/background-removal');
    }

    // Configuración para manejar import.meta en @imgly/background-removal
    config.module.rules.push({
      test: /\.m?js$/,
      resolve: {
        fullySpecified: false,
      },
    });

    // Plugin para reemplazar import.meta.url
    config.plugins.push(
      new webpack.DefinePlugin({
        'import.meta.url': JSON.stringify(''),
      })
    );

    return config;
  },
  // Headers para CORS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'unsafe-none',
          },
        ],
      },
    ];
  },
}

export default nextConfig
