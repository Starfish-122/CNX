/**
 * 폴리곤 계산 관련 헬퍼 함수
 */

import type { Coordinates } from '@/utils/constants';

/**
 * 점이 폴리곤 내부에 있는지 확인 (Ray Casting 알고리즘)
 */
export function isPointInPolygon(point: Coordinates, polygon: Coordinates[]): boolean {
    let inside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].lng;
        const yi = polygon[i].lat;
        const xj = polygon[j].lng;
        const yj = polygon[j].lat;

        const intersect =
            yi > point.lat !== yj > point.lat &&
            point.lng < ((xj - xi) * (point.lat - yi)) / (yj - yi) + xi;

        if (intersect) inside = !inside;
    }

    return inside;
}

/**
 * 폴리곤의 중심 좌표를 계산
 */
export function getPolygonCenter(polygon: Coordinates[]): Coordinates {
    if (polygon.length === 0) {
        return { lat: 0, lng: 0 };
    }

    const sum = polygon.reduce(
        (acc, point) => ({
            lat: acc.lat + point.lat,
            lng: acc.lng + point.lng,
        }),
        { lat: 0, lng: 0 }
    );

    return {
        lat: sum.lat / polygon.length,
        lng: sum.lng / polygon.length,
    };
}

/**
 * 폴리곤의 경계(bounds)를 계산
 */
export function getPolygonBounds(polygon: Coordinates[]): {
    sw: Coordinates;
    ne: Coordinates;
} | null {
    if (polygon.length === 0) {
        return null;
    }

    let minLat = polygon[0].lat;
    let maxLat = polygon[0].lat;
    let minLng = polygon[0].lng;
    let maxLng = polygon[0].lng;

    for (const point of polygon) {
        minLat = Math.min(minLat, point.lat);
        maxLat = Math.max(maxLat, point.lat);
        minLng = Math.min(minLng, point.lng);
        maxLng = Math.max(maxLng, point.lng);
    }

    return {
        sw: { lat: minLat, lng: minLng },
        ne: { lat: maxLat, lng: maxLng },
    };
}
