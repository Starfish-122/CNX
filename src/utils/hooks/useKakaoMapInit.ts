import { useEffect, useState, useRef } from 'react';
import type { Coordinates } from '@/utils/constants';

interface UseKakaoMapInitProps {
    center: Coordinates;
    level: number;
    containerId: string;
}

interface UseKakaoMapInitReturn {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map: any | null;
    isLoading: boolean;
    error: string | null;
}

/**
 * 카카오맵 초기화 커스텀 훅
 * 지도 스크립트 로드 및 초기화만 담당
 */
export function useKakaoMapInit({
    center,
    level,
    containerId,
}: UseKakaoMapInitProps): UseKakaoMapInitReturn {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [map, setMap] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const isInitialized = useRef(false);

    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

        if (!apiKey) {
            setError('카카오맵 API 키가 설정되지 않았습니다.');
            setIsLoading(false);
            return;
        }

        if (isInitialized.current) return;

        const initMap = () => {
            if (window.kakao?.maps) {
                window.kakao.maps.load(() => {
                    const container = document.getElementById(containerId);
                    if (!container) {
                        setError('지도 컨테이너를 찾을 수 없습니다.');
                        setIsLoading(false);
                        return;
                    }

                    try {
                        const options = {
                            center: new window.kakao.maps.LatLng(center.lat, center.lng),
                            level: level,
                        };
                        const mapInstance = new window.kakao.maps.Map(container, options);
                        setMap(mapInstance);
                        setIsLoading(false);
                        setError(null);
                        isInitialized.current = true;
                    } catch (err) {
                        setError(`지도 초기화 실패: ${err}`);
                        setIsLoading(false);
                    }
                });
            } else {
                loadScript();
            }
        };

        const loadScript = () => {
            const existingScript = document.querySelector(`script[src*="dapi.kakao.com"]`);
            if (existingScript) {
                existingScript.addEventListener('load', initMap);
                return;
            }

            const script = document.createElement('script');
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer`;
            script.async = true;
            script.onload = initMap;
            script.onerror = () => {
                setError('카카오맵 스크립트 로드 실패');
                setIsLoading(false);
            };
            document.head.appendChild(script);
        };

        initMap();
    }, [center.lat, center.lng, level, containerId]);

    return { map, isLoading, error };
}
