import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    findPlaceCoordinates,
    createOverlayContent,
    createCompanyInfoContent,
} from '@/utils/services/kakaoMap';
import { COMPANY_CENTER, COMPANY_MARKER_Z_INDEX, OVERLAY_Y_ANCHOR } from '@/utils/constants';
import type { NotionPlace } from '@/types';
import type { Coordinates, LocationKey } from '@/utils/constants';

interface UseMapMarkersProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map: any;
    places: NotionPlace[];
    selectedLocation: LocationKey | null;
}

/**
 * 지도 마커 관리 훅
 * 회사 마커, 장소 마커, 클러스터링 관리
 */
export function useMapMarkers({ map, places, selectedLocation }: UseMapMarkersProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const markersRef = useRef<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const overlaysRef = useRef<any[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clustererRef = useRef<any>(null);
    const router = useRouter();

    // 회사 마커 생성
    const createCompanyMarker = useCallback(() => {
        if (!map) return;

        const position = new window.kakao.maps.LatLng(COMPANY_CENTER.lat, COMPANY_CENTER.lng);

        // 커스텀 오버레이 내용 (기존 InfoWindow content 대체)
        const content = `
          <div class="custom-overlay">
            ${createCompanyInfoContent()}
          </div>
        `;

        // CustomOverlay 생성
        new window.kakao.maps.CustomOverlay({
            position,
            content,
            map,
            yAnchor: 1.2, // 오버레이 아래쪽이 기준점이 되게 설정
            zIndex: COMPANY_MARKER_Z_INDEX + 1,
        });
    }, [map]);

    // 개별 장소 마커 생성
    const createPlaceMarker = useCallback(
        (place: NotionPlace, coords: Coordinates) => {
            if (!map) return;

            const position = new window.kakao.maps.LatLng(coords.lat, coords.lng);

            const marker = new window.kakao.maps.Marker({
                position,
                clickable: true,
            });
            markersRef.current.push(marker);

            const overlayContent = createOverlayContent(place.name);
            const customOverlay = new window.kakao.maps.CustomOverlay({
                position,
                content: overlayContent,
                yAnchor: OVERLAY_Y_ANCHOR,
                xAnchor: 0.5,
            });
            overlaysRef.current.push(customOverlay);

            window.kakao.maps.event.addListener(marker, 'click', () => {
                overlaysRef.current.forEach((o) => o.setMap(null));
                customOverlay.setMap(map);
            });

            overlayContent.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/detail/${encodeURIComponent(place.name)}`);
            });
        },
        [map, router]
    );

    // 마커 정리
    const clearMarkers = useCallback(() => {
        if (clustererRef.current) {
            clustererRef.current.clear();
        }
        markersRef.current.forEach((marker) => marker.setMap(null));
        overlaysRef.current.forEach((overlay) => overlay.setMap(null));
        markersRef.current = [];
        overlaysRef.current = [];
    }, []);

    // 장소 마커 추가
    const addPlaceMarkers = useCallback(
        async (places: NotionPlace[]) => {
            if (!map || !places.length) return;

            clearMarkers();

            for (const place of places) {
                // 온라인/인터넷 장소는 마커 생성 안함
                const location = place.location?.toLowerCase();
                if (location === '인터넷' || location === '온라인') {
                    console.log(`ℹ️ 온라인 매장 건너뜀: ${place.name}`);
                    continue;
                }

                const coords = await findPlaceCoordinates(place);
                if (coords) {
                    createPlaceMarker(place, coords);
                } else {
                    console.warn(`⚠️ 마커 생성 실패: ${place.name} - 좌표를 찾을 수 없음`);
                }
            }

            if (clustererRef.current && markersRef.current.length > 0) {
                clustererRef.current.addMarkers(markersRef.current);
            }
        },
        [map, clearMarkers, createPlaceMarker]
    );

    // 클러스터러 초기화
    useEffect(() => {
        if (!map) return;

        const clusterer = new window.kakao.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 4,
        });
        clustererRef.current = clusterer;

        createCompanyMarker();
    }, [map, createCompanyMarker]);

    // 장소 필터링 및 마커 업데이트
    useEffect(() => {
        if (!map || !places.length) return;

        const filteredPlaces = selectedLocation
            ? places.filter((place) => {
                  // 공백과 슬래시 모두 제거하고 소문자로 비교
                  const normalizedLocation = place.location?.replace(/[\s/]/g, '').toLowerCase();
                  const normalizedSelected = selectedLocation.replace(/[\s/]/g, '').toLowerCase();

                  // '온라인' 탭: Notion의 '인터넷' 데이터 매칭
                  if (normalizedSelected === '온라인') {
                      return normalizedLocation === '인터넷';
                  }

                  return normalizedLocation === normalizedSelected;
              })
            : places;

        addPlaceMarkers(filteredPlaces);
    }, [map, places, selectedLocation, addPlaceMarkers]);

    return { clearMarkers };
}
