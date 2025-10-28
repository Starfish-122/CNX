import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    // 카카오 맵 API를 위한 보안 헤더 설정
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
