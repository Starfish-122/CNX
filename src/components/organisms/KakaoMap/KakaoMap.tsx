'use client';
import React from 'react';
import MapContainer from './MapContainer';
import MapLoadingSpinner from './MapLoadingSpinner';
import MapErrorMessage from './MapErrorMessage';
import { useKakaoMapInit, useMapBounds, useMapMarkers, useMapPolygons } from '@/hooks';
import { COMPANY_CENTER, DEFAULT_MAP_LEVEL, type LocationKey } from '@/utils/constants';
import type { NotionPlace } from '@/types';
import type { Coordinates } from '@/utils/constants';

interface KakaoMapProps {
    places?: NotionPlace[];
    center?: Coordinates;
    level?: number;
    className?: string;
    selectedLocation?: LocationKey | null;
    onLocationSelect?: (location: LocationKey | null) => void;
    bounds?: {
        sw: Coordinates;
        ne: Coordinates;
    } | null;
    polygonsOff?: boolean;
}

/**
 * 카카오맵 컴포넌트
 */
export default function KakaoMap({
    places = [],
    center = COMPANY_CENTER,
    level = DEFAULT_MAP_LEVEL,
    className = 'relative w-full h-[80vh] md:h-[70vh] lg:h-[60vh]',
    selectedLocation = null,
    onLocationSelect,
    bounds = null,
    polygonsOff = false,
}: KakaoMapProps): React.JSX.Element {
    const mapId = 'kakao-map-container';

    // 1. 지도 초기화
    const { map, isLoading, error } = useKakaoMapInit({
        center,
        level,
        containerId: mapId,
    });

    // 2. Bounds 관리
    useMapBounds({ map, center, bounds, selectedLocation });

    // 3. 마커 관리
    useMapMarkers({ map, places, selectedLocation });

    // 4. 폴리곤 관리
    useMapPolygons({ map, selectedLocation, onLocationSelect, polygonsOff });

    // 에러 처리
    if (error) {
        return (
            <div className={className}>
                <MapErrorMessage error={error} />
            </div>
        );
    }

    return (
        <div className={className}>
            {isLoading && <MapLoadingSpinner />}
            <MapContainer id={mapId} />
            {selectedLocation === '온라인' && (
                <div className="map-offline-overlay">
                    <div>온라인 매장입니다</div>
                </div>
            )}
        </div>
    );
}
