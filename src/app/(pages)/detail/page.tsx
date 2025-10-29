'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingState } from '@/components/atoms';

/**
 * /detail 경로로 직접 접근 시 홈으로 리다이렉트
 */
export default function DetailPageRoute() {
    const router = useRouter();

    useEffect(() => {
        // 홈으로 리다이렉트
        router.push('/');
    }, [router]);

    return <LoadingState message="홈으로 이동 중..." />;
}
