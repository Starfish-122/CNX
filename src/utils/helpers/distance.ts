/**
 * 거리 계산 관련 헬퍼 함수
 */

import type { Coordinates } from '@/utils/constants';

/**
 * 두 좌표 사이의 거리를 계산 (Haversine 공식 사용)
 */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371e3; // 지구 반경 (미터 단위)
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lng2 - lng1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // 미터 단위
}

/**
 * 두 좌표 객체 사이의 거리를 계산
 */
export function getDistanceBetween(coord1: Coordinates, coord2: Coordinates): number {
    return calculateDistance(coord1.lat, coord1.lng, coord2.lat, coord2.lng);
}

/**
 * 거리를 도보 시간으로 추정 (평균 도보 속도: 80m/min ≈ 4.8km/h)
 * @param distanceInMeters 거리 (미터)
 * @returns 도보 시간 (분)
 */
export function estimateWalkingTime(distanceInMeters: number): number {
    const WALKING_SPEED = 80; // 평균 도보 속도 (미터/분)
    return Math.ceil(distanceInMeters / WALKING_SPEED);
}

/**
 * 거리를 자동차 시간으로 추정 (평균 도심 속도: 400m/min ≈ 24km/h)
 * @param distanceInMeters 거리 (미터)
 * @returns 자동차 시간 (분)
 */
export function estimateDrivingTime(distanceInMeters: number): number {
    const DRIVING_SPEED = 400; // 평균 도심 자동차 속도 (미터/분)
    return Math.ceil(distanceInMeters / DRIVING_SPEED);
}
