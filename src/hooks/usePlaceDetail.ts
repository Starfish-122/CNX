'use client';

import { useEffect, useState } from 'react';
import type { NotionPlace } from '@/types';

interface UsePlaceDetailReturn {
    placeData: NotionPlace | null;
    loading: boolean;
    error: string | null;
}

/**
 * 장소 상세 정보를 가져오는 Custom Hook
 * @param placeName - URL 파라미터로 받은 장소명
 * @returns 장소 데이터, 로딩 상태, 에러
 */
export function usePlaceDetail(placeName: string): UsePlaceDetailReturn {
    const [placeData, setPlaceData] = useState<NotionPlace | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPlaceData() {
            if (!placeName) {
                setLoading(false);
                return;
            }

            try {
                const decodedName = decodeURIComponent(placeName);
                console.log('Searching for place:', decodedName);

                const response = await fetch('/api/notion?pageSize=100', {
                    next: { revalidate: 300 }, // 5분 캐시
                });

                if (!response.ok) {
                    throw new Error('API 요청 실패');
                }

                const data = await response.json();

                if (data.ok) {
                    console.log('API Response:', data.items.length, 'items');
                    const place = data.items.find((item: NotionPlace) => item.name === decodedName);
                    console.log('Found place:', place);

                    if (place) {
                        setPlaceData(place);
                        setError(null);
                    } else {
                        setPlaceData(null);
                        setError('맛집을 찾을 수 없습니다.');
                    }
                } else {
                    console.error('[NOTION API ERROR]', data.error || data);
                    setError('데이터를 불러오는 중 오류가 발생했습니다.');
                }
            } catch (err) {
                console.error('Failed to fetch place data:', err);
                setError('서버와의 통신에 실패했습니다.');
            } finally {
                setLoading(false);
            }
        }

        fetchPlaceData();
    }, [placeName]);

    return { placeData, loading, error };
}
