import type { NextConfig } from 'next';

const ContentSecurityPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' dapi.kakao.com *.daumcdn.net",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: places.googleapis.com *.kakao.com *.daumcdn.net",
    "font-src 'self' data:",
    "connect-src 'self' *.kakao.com *.googleapis.com *.firebaseio.com wss://*.firebaseio.com api.emailjs.com",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
].join('; ');

const securityHeaders = [
    { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
    { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    { key: 'X-DNS-Prefetch-Control', value: 'on' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(self)' },
];

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'places.googleapis.com',
                pathname: '/**',
            },
        ],
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};

export default nextConfig;
