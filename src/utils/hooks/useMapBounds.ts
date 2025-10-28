import { useEffect } from 'react';
import type { Coordinates, LocationKey } from '@/utils/constants';

interface Bounds {
    sw: Coordinates;
    ne: Coordinates;
}

interface UseMapBoundsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map: any;
    center: Coordinates;
    bounds: Bounds | null;
    selectedLocation?: LocationKey | null;
}

/**
 * 지도 bounds 및 중심 관리 훅
 */
export function useMapBounds({ map, center, bounds, selectedLocation }: UseMapBoundsProps) {
    useEffect(() => {
        if (!map) return;

        // 온라인 탭일 때는 지도 이동 안함
        if (selectedLocation === '온라인') {
            return;
        }

        if (bounds?.sw && bounds?.ne) {
            // Bounds 설정 (폴리곤 전체를 화면에 맞춤)
            const sw = new window.kakao.maps.LatLng(bounds.sw.lat, bounds.sw.lng);
            const ne = new window.kakao.maps.LatLng(bounds.ne.lat, bounds.ne.lng);
            const kakaoMapBounds = new window.kakao.maps.LatLngBounds();
            kakaoMapBounds.extend(sw);
            kakaoMapBounds.extend(ne);

            map.setBounds(kakaoMapBounds, 50, 50, 50, 50);

            // 모바일 대응: relayout
            setTimeout(() => {
                if (map) {
                    map.relayout();
                }
            }, 100);
        } else {
            // Center 설정
            const newCenter = new window.kakao.maps.LatLng(center.lat, center.lng);
            map.setCenter(newCenter);
        }
    }, [map, center, bounds, selectedLocation]);
}
