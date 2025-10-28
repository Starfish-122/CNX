/**
 * 포맷팅 관련 헬퍼 함수
 */

/**
 * 거리를 사람이 읽기 쉬운 형태로 포맷
 */
export function formatDistance(distanceInMeters: number): string {
    if (distanceInMeters < 1000) {
        return `${Math.round(distanceInMeters)}m`;
    }
    return `${(distanceInMeters / 1000).toFixed(1)}km`;
}

/**
 * 도보 시간을 사람이 읽기 쉬운 형태로 포맷
 */
export function formatWalkingTime(minutes: number): string {
    if (minutes <= 1) {
        return '1분';
    }
    if (minutes <= 5) {
        return `${minutes}분`;
    }
    return `약 ${minutes}분`;
}

/**
 * 자동차 시간을 사람이 읽기 쉬운 형태로 포맷
 */
export function formatDrivingTime(minutes: number): string {
    if (minutes <= 1) {
        return '1분';
    }
    if (minutes <= 5) {
        return `${minutes}분`;
    }
    return `약 ${minutes}분`;
}
