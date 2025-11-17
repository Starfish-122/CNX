import { useState, useCallback, useMemo } from 'react';
import { LOCATION_POLYGONS, COMPANY_CENTER, type LocationKey } from '@/utils/constants';
import { getPolygonCenter, getPolygonBounds } from '@/utils/helpers';
import type { Coordinates } from '@/utils/constants';

interface MapState {
    center: Coordinates;
    bounds: {
        sw: Coordinates;
        ne: Coordinates;
    } | null;
    selectedLocation: LocationKey | null;
}

interface UseMapStateReturn extends MapState {
    setLocationByKey: (location: LocationKey) => void;
    resetLocation: (useCompanyCenter?: boolean) => void;
}

/**
 * 지도 상태 관리 커스텀 훅
 * HomePage의 상태 로직을 분리
 */
export function useMapState(initialLocation: LocationKey = '한강로길'): UseMapStateReturn {
    const initialPolygon = useMemo(() => LOCATION_POLYGONS[initialLocation], [initialLocation]);
    const initialCenter = useMemo(
        () => (initialPolygon ? getPolygonCenter(initialPolygon) : { lat: 0, lng: 0 }),
        [initialPolygon]
    );
    const initialBounds = useMemo(
        () => (initialPolygon ? getPolygonBounds(initialPolygon) : null),
        [initialPolygon]
    );

    const [state, setState] = useState<MapState>({
        center: initialCenter,
        bounds: initialBounds,
        selectedLocation: initialLocation,
    });

    const setLocationByKey = useCallback(
        (location: LocationKey) => {
            const polygon = LOCATION_POLYGONS[location];

            // 폴리곤이 없는 경우 (온라인 등)
            if (!polygon || polygon.length === 0) {
                setState({
                    center: initialCenter, // 기본 중심 사용
                    bounds: null,
                    selectedLocation: location,
                });
                return;
            }

            // 폴리곤이 있는 경우
            const bounds = getPolygonBounds(polygon);
            const center = getPolygonCenter(polygon);
            setState({
                center,
                bounds,
                selectedLocation: location,
            });
        },
        [initialCenter]
    );

    const resetLocation = useCallback((useCompanyCenter = false) => {
        setState({
            center: useCompanyCenter ? COMPANY_CENTER : initialCenter, // '전체' 탭일 때만 사무실 위치 사용
            bounds: useCompanyCenter ? null : initialBounds, // '전체' 탭일 때는 bounds 없이 줌 아웃 가능하도록
            selectedLocation: null,
        });
    }, [initialCenter, initialBounds]);

    return {
        ...state,
        setLocationByKey,
        resetLocation,
    };
}
