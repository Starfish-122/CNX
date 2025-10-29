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
            console.error('❌ 카카오맵 API 키가 설정되지 않았습니다.');
            setError('카카오맵 API 키가 설정되지 않았습니다. .env.local 파일을 확인해주세요.');
            setIsLoading(false);
            return;
        }

        if (isInitialized.current) return;

        const initMap = () => {
            if (window.kakao?.maps) {
                console.log('✅ 카카오맵 API 로드됨, 지도 초기화 시작');
                window.kakao.maps.load(() => {
                    const container = document.getElementById(containerId);
                    if (!container) {
                        console.error('❌ 지도 컨테이너를 찾을 수 없습니다:', containerId);
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
                        console.log('✅ 카카오맵 초기화 완료');
                    } catch (err) {
                        console.error('❌ 지도 초기화 실패:', err);
                        setError(`지도 초기화 실패: ${err}`);
                        setIsLoading(false);
                    }
                });
            } else {
                console.log('📡 카카오맵 스크립트 로드 시작');
                loadScript();
            }
        };

        const loadScript = () => {
            const existingScript = document.querySelector(`script[src*="dapi.kakao.com"]`);
            if (existingScript) {
                console.log('⏳ 기존 카카오맵 스크립트 발견, 로드 대기 중');
                existingScript.addEventListener('load', initMap);
                return;
            }

            console.log('🔄 새 카카오맵 스크립트 생성 및 로드');
            const script = document.createElement('script');
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer`;
            script.async = true;
            script.onload = () => {
                console.log('✅ 카카오맵 스크립트 로드 성공');
                initMap();
            };
            script.onerror = (error) => {
                console.error('❌ 카카오맵 스크립트 로드 실패:', error);
                setError('카카오맵 스크립트 로드 실패. 네트워크를 확인해주세요.');
                setIsLoading(false);
            };
            document.head.appendChild(script);
        };

        // 초기화 시작
        console.log('🗺️ 카카오맵 초기화 시작 - containerId:', containerId);
        initMap();

        // Cleanup: 컴포넌트 언마운트 시
        return () => {
            console.log('🧹 카카오맵 훅 정리');
        };
    }, [center.lat, center.lng, level, containerId]);

    return { map, isLoading, error };
}
