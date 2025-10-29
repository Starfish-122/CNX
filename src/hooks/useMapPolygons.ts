import { useEffect, useRef, useCallback } from 'react';
import {
    LOCATION_POLYGONS,
    POLYGON_STYLE,
    POLYGON_STYLE_ACTIVE,
    POLYGON_STYLE_INACTIVE,
    type LocationKey,
} from '@/utils/constants';

interface UseMapPolygonsProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map: any;
    selectedLocation: LocationKey | null;
    onLocationSelect?: (location: LocationKey | null) => void;
}

/**
 * 지도 폴리곤 관리 훅
 * 폴리곤 생성, 스타일 업데이트, 클릭 이벤트 관리
 */
export function useMapPolygons({ map, selectedLocation, onLocationSelect }: UseMapPolygonsProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const polygonsRef = useRef<Map<LocationKey, any>>(new Map());

    // 폴리곤 스타일 업데이트
    const updatePolygonStyles = useCallback(() => {
        if (polygonsRef.current.size === 0 || !map) return;

        // 온라인 선택 시 모든 폴리곤 숨김
        if (selectedLocation === '온라인') {
            polygonsRef.current.forEach((polygon) => {
                polygon.setMap(null);
            });
            return;
        }

        // 일반 폴리곤 스타일 적용
        polygonsRef.current.forEach((polygon, locationKey) => {
            if (selectedLocation === null) {
                polygon.setMap(map);
                polygon.setOptions(POLYGON_STYLE);
            } else if (locationKey === selectedLocation) {
                polygon.setMap(map);
                polygon.setOptions(POLYGON_STYLE_ACTIVE);
            } else {
                polygon.setMap(map);
                polygon.setOptions({
                    ...POLYGON_STYLE_INACTIVE,
                    zIndex: 5,
                });
            }
        });
    }, [map, selectedLocation]);

    // 폴리곤 생성
    const createLocationPolygons = useCallback(() => {
        if (!map) return;

        Object.entries(LOCATION_POLYGONS).forEach(([locationKey, coords]) => {
            const path = coords.map((coord) => new window.kakao.maps.LatLng(coord.lat, coord.lng));

            const polygon = new window.kakao.maps.Polygon({
                map: map,
                path,
                ...POLYGON_STYLE,
                zIndex: 10,
            });

            window.kakao.maps.event.addListener(polygon, 'click', () => {
                const currentLocation = locationKey as LocationKey;
                onLocationSelect?.(currentLocation);
            });

            polygonsRef.current.set(locationKey as LocationKey, polygon);
        });

        updatePolygonStyles();
    }, [map, onLocationSelect, updatePolygonStyles]);

    // 지도 초기화 시 폴리곤 생성
    useEffect(() => {
        if (map && polygonsRef.current.size === 0) {
            createLocationPolygons();
        }
    }, [map, createLocationPolygons]);

    // 선택된 구역 변경 시 스타일 업데이트
    useEffect(() => {
        updatePolygonStyles();
    }, [selectedLocation, updatePolygonStyles]);

    return { createLocationPolygons, updatePolygonStyles };
}
