'use client';
import type { NotionPlace, KakaoPlaceResult } from '@/types';
import type { Coordinates } from '@/utils/constants';

/**
 * 카카오맵 API가 로드될 때까지 기다립니다.
 * @param timeout 최대 대기 시간 (ms)
 * @returns API 로드 성공 여부
 */
async function waitForKakaoAPI(timeout = 10000): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
        if (window.kakao?.maps?.services) {
            return true;
        }
        // 100ms마다 체크
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.warn('카카오맵 API 로드 시간 초과');
    return false;
}

/**
 * 카카오맵 URL에서 장소 ID를 추출합니다.
 * @param url 카카오맵 URL (예: https://place.map.kakao.com/853752524)
 * @returns 장소 ID 또는 null
 */
export function extractKakaoPlaceId(url: string): string | null {
    if (!url) return null;

    // https://place.map.kakao.com/[ID] 형식
    const match = url.match(/place\.map\.kakao\.com\/(\d+)/);
    return match ? match[1] : null;
}

/**
 * 장소의 좌표를 찾습니다 (주소 → location → 장소명 순으로 시도)
 * 카카오맵 URL은 상세페이지 링크용으로만 사용
 */
export async function findPlaceCoordinates(place: NotionPlace): Promise<Coordinates | null> {
    // 온라인 가게는 좌표 없음
    if (place.location === '인터넷' || place.location === '온라인') {
        console.log(`ℹ️ 온라인 가게: ${place.name} - 좌표 없음`);
        return null;
    }

    // 카카오맵 URL은 상세페이지에서만 사용 (좌표 검색에는 주소 우선)

    // 1. 주소로 시도
    if (place.address) {
        const coords = await addressToCoords(place.address);
        if (coords) {
            console.log(`✓ 주소로 좌표 찾음: ${place.name}`, coords);
            return coords;
        }
    }

    // 2. location 필드로 시도 (단, 지역명이 아닌 경우만)
    const locationKeywords = [
        '한강로길',
        '용리단길',
        '아모레',
        'LS',
        '래미안',
        '아이파크',
        '용산철길',
        '하이브',
        '인터넷',
        '온라인',
    ];
    const isLocationName =
        place.location && locationKeywords.some((keyword) => place.location?.includes(keyword));

    if (place.location && !isLocationName) {
        const coords = await addressToCoords(place.location);
        if (coords) {
            console.log(`✓ 위치로 좌표 찾음: ${place.name}`, coords);
            return coords;
        }
    }

    // 3. 장소명으로 Places API 검색 (용산구 지역 정보 추가)
    if (place.name) {
        // 3-1. 장소명 + "용산구"로 먼저 검색 (더 정확)
        const placeResultWithArea = await searchKakaoPlace(`${place.name} 용산구`);
        if (placeResultWithArea) {
            const coords = {
                lat: parseFloat(placeResultWithArea.y),
                lng: parseFloat(placeResultWithArea.x),
            };
            console.log(`✓ 장소명+지역으로 좌표 찾음: ${place.name}`, coords);
            return coords;
        }

        // 3-2. 장소명만으로 검색 (폴백)
        const placeResult = await searchKakaoPlace(place.name);
        if (placeResult) {
            const coords = {
                lat: parseFloat(placeResult.y),
                lng: parseFloat(placeResult.x),
            };
            console.log(`✓ 장소명으로 좌표 찾음: ${place.name}`, coords);
            return coords;
        }
    }

    console.warn(`✗ 좌표를 찾을 수 없습니다: ${place.name}`);
    return null;
}

/**
 * 주소를 좌표로 변환합니다.
 * @param address 주소
 * @returns 좌표 {lat, lng}
 */
export async function addressToCoords(
    address: string
): Promise<{ lat: number; lng: number } | null> {
    if (!address || typeof window === 'undefined') return null;

    // 카카오맵 API 로드 대기
    const apiLoaded = await waitForKakaoAPI();
    if (!apiLoaded) {
        console.warn('카카오맵 API를 사용할 수 없습니다.');
        return null;
    }

    return new Promise((resolve) => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geocoder.addressSearch(address, (result: any[], status: any) => {
            if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                resolve({
                    lat: parseFloat(result[0].y),
                    lng: parseFloat(result[0].x),
                });
            } else {
                console.warn(`주소를 찾을 수 없습니다: ${address}`);
                resolve(null);
            }
        });
    });
}

/**
 * 카카오맵 Places API를 사용하여 장소 정보를 검색합니다.
 * @param placeName 검색할 장소명
 * @returns 장소 정보 (주소, 전화번호 등)
 */
export async function searchKakaoPlace(placeName: string): Promise<KakaoPlaceResult | null> {
    if (!placeName || typeof window === 'undefined') return null;

    // 카카오맵 API 로드 대기
    const apiLoaded = await waitForKakaoAPI();
    if (!apiLoaded) {
        console.warn('카카오맵 API를 사용할 수 없습니다.');
        return null;
    }

    return new Promise((resolve) => {
        const ps = new window.kakao.maps.services.Places();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ps.keywordSearch(placeName, (data: any[], status: any) => {
            if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                const place = data[0];
                resolve({
                    place_name: place.place_name || '',
                    address_name: place.address_name || '',
                    road_address_name: place.road_address_name || '',
                    phone: place.phone || '',
                    place_url: place.place_url || '',
                    x: place.x || '',
                    y: place.y || '',
                });
            } else {
                console.warn(`장소를 찾을 수 없습니다: ${placeName}`);
                resolve(null);
            }
        });
    });
}
/**
 * 클립보드에 텍스트를 복사합니다.
 * @param text 복사할 텍스트
 * @returns 복사 성공 여부
 */
export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                textArea.remove();
                return true;
            } catch (error) {
                console.error('클립보드 복사 실패:', error);
                textArea.remove();
                return false;
            }
        }
    } catch (error) {
        console.error('클립보드 복사 실패:', error);
        return false;
    }
}
