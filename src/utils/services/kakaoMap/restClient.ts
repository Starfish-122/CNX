'use client';

import type { KakaoPlaceBrief } from '@/types';

interface KakaoPlaceApiResponse {
    ok: boolean;
    data: KakaoPlaceBrief | null;
    error?: string;
}

/**
 * 서버 API를 통해 카카오 장소 요약 정보를 가져옵니다.
 */
export async function fetchKakaoPlaceBrief(keyword: string): Promise<KakaoPlaceBrief | null> {
    if (!keyword) return null;

    try {
        const response = await fetch(`/api/kakao-place?query=${encodeURIComponent(keyword)}`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            console.warn('카카오 장소 API 호출 실패:', response.statusText);
            return null;
        }

        const payload = (await response.json()) as KakaoPlaceApiResponse;
        if (!payload.ok) {
            console.warn('카카오 장소 API 에러:', payload.error);
            return null;
        }

        return payload.data;
    } catch (error) {
        console.error('카카오 장소 정보 조회 실패:', error);
        return null;
    }
}

