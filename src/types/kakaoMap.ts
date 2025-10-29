/**
 * 카카오맵 관련 타입 정의
 */

import type { Coordinates, LocationKey } from '@/utils/constants';
import type { NotionPlace } from './notion';

// ============ 카카오맵 컴포넌트 Props ============
export interface KakaoMapProps {
    places?: NotionPlace[];
    center?: Coordinates;
    level?: number;
    className?: string;
    selectedLocation?: LocationKey | null;
    onLocationSelect?: (location: LocationKey | null) => void;
    bounds?: MapBounds | null;
}

// ============ 마커 관련 타입 ============
export interface MapMarkerData {
    position: Coordinates;
    title?: string;
    content?: string;
}

// ============ Bounds 타입 ============
export interface MapBounds {
    sw: Coordinates;
    ne: Coordinates;
}

// ============ 카카오맵 장소 검색 결과 ============
export interface KakaoPlaceResult {
    place_name: string;
    address_name: string;
    road_address_name: string;
    phone: string;
    place_url: string;
    x: string; // longitude
    y: string; // latitude
    category_name?: string;
    category_group_code?: string;
    category_group_name?: string;
}
