'use client';
import type { NotionPlace, KakaoPlaceResult } from '@/types';
import type { Coordinates } from '@/utils/constants';

type KakaoKeywordSearchStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

type KakaoPagination = {
    current: number;
    last: number;
    gotoPage: (page: number) => void;
};

type KakaoKeywordSearchResult = {
    place_url?: string;
    place_name?: string;
    address_name?: string;
    road_address_name?: string;
    phone?: string;
    x?: string;
    y?: string;
};

type KakaoAddressSearchResult = {
    address_name?: string;
    road_address_name?: string;
    x?: string;
    y?: string;
};

/**
 * 카카오 SDK 로딩 상태 공유 (중복 로드를 차단)
 */
let kakaoSdkLoadingPromise: Promise<boolean> | null = null;

/**
 * 카카오맵 SDK 스크립트를 주입하거나 기존 스크립트의 로딩을 기다립니다.
 */
async function ensureKakaoMapsSdk(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    if (window.kakao?.maps?.services) {
        return true;
    }

    if (!kakaoSdkLoadingPromise) {
        kakaoSdkLoadingPromise = new Promise<boolean>((resolve) => {
            const existingScript = document.querySelector<HTMLScriptElement>(
                'script[data-kakao-maps-sdk="true"],script[src*="dapi.kakao.com"]'
            );

            const handleLoad = () => {
                if (window.kakao?.maps?.services) {
                    resolve(true);
                } else {
                    // console.error('카카오맵 SDK 로드 후에도 services 객체를 찾을 수 없습니다.');
                    resolve(false);
                }
            };

            const handleError = (error: Event | string) => {
                void error;
                // console.error('카카오맵 SDK 로드 실패:', error);
                resolve(false);
            };

            if (existingScript) {
                if (window.kakao?.maps?.services) {
                    resolve(true);
                } else {
                    existingScript.addEventListener('load', handleLoad, { once: true });
                    existingScript.addEventListener('error', handleError, { once: true });
                }
                return;
            }

            const apiKey = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;
            if (!apiKey) {
                // console.error('NEXT_PUBLIC_KAKAO_MAP_KEY 환경변수가 설정되지 않았습니다.');
                resolve(false);
                return;
            }

            const script = document.createElement('script');
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&autoload=false&libraries=services,clusterer`;
            script.async = true;
            script.dataset.kakaoMapsSdk = 'true';
            script.addEventListener('load', () => {
                try {
                    window.kakao?.maps?.load(() => handleLoad());
                } catch (err) {
                    handleError(err instanceof Error ? err.message : 'unknown error');
                }
            });
            script.addEventListener('error', handleError);

            document.head.appendChild(script);
        }).finally(() => {
            kakaoSdkLoadingPromise = null;
        });
    }

    return kakaoSdkLoadingPromise ?? Promise.resolve(false);
}

/**
 * 카카오맵 API가 로드될 때까지 기다립니다.
 * @param timeout 최대 대기 시간 (ms)
 * @returns API 로드 성공 여부
 */
async function waitForKakaoAPI(timeout = 10000): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    const sdkReady = await ensureKakaoMapsSdk();
    if (!sdkReady) {
        // console.warn('카카오맵 SDK 로드에 실패했습니다.');
        return false;
    }

    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
        if (window.kakao?.maps?.services) {
            return true;
        }
        // 100ms마다 체크
        await new Promise((resolve) => setTimeout(resolve, 100));
    }

    // console.warn('카카오맵 API 로드 시간 초과');
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
 * 장소의 좌표를 찾습니다 (kakaomap URL → 주소 → location → 장소명 순으로 시도)
 */
export async function findPlaceCoordinates(place: NotionPlace): Promise<Coordinates | null> {
    // 회사 중심 좌표 (거리 검증용)
    const COMPANY_CENTER = { lat: 37.5288, lng: 126.9666 };
    const MAX_DISTANCE = 5000; // 5km 이상이면 경고

    // 거리 계산 함수 (Haversine)
    const getDistance = (coord1: Coordinates, coord2: Coordinates): number => {
        const R = 6371e3;
        const φ1 = (coord1.lat * Math.PI) / 180;
        const φ2 = (coord2.lat * Math.PI) / 180;
        const Δφ = ((coord2.lat - coord1.lat) * Math.PI) / 180;
        const Δλ = ((coord2.lng - coord1.lng) * Math.PI) / 180;
        const a =
            Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    // 좌표 검증 및 로그 헬퍼
    const validateAndLog = (coords: Coordinates, method: string): Coordinates => {
        const distance = getDistance(COMPANY_CENTER, coords);
        const distanceKm = (distance / 1000).toFixed(2);
        void method;
        void distanceKm;

        if (distance > MAX_DISTANCE) {
            // console.warn(`⚠️ [${place.name}] ${method}으로 찾았지만 회사에서 ${distanceKm}km 떨어져 있음!`, {
            //     coords,
            //     kakaomap: place.kakaomap || '없음',
            //     address: place.address || '없음',
            //     location: place.location || '없음',
            // });
        } else {
            // console.log(`✓ [${place.name}] ${method}으로 좌표 찾음 (${distanceKm}km)`, coords);
        }

        return coords;
    };

    // 온라인 가게는 좌표 없음
    if (place.location === '인터넷' || place.location === '온라인') {
        // console.log(`ℹ️ 온라인 가게: ${place.name} - 좌표 없음`);
        return null;
    }

    // console.log(`🔍 [${place.name}] 좌표 검색 시작`, {
    //     kakaomap: place.kakaomap ? '있음' : '없음',
    //     address: place.address || '없음',
    //     location: place.location || '없음',
    // });

    // 0. 카카오맵 URL로 시도 (최우선 - 가장 정확)
    if (place.kakaomap) {
        const coords = await searchKakaoPlaceByUrl(place);
        if (coords) {
            return validateAndLog(coords, 'Kakao URL');
        }
        // console.warn(`⚠️ [${place.name}] Kakao URL이 있지만 검색 실패: ${place.kakaomap}`);
    }

    // 1. 주소로 시도
    if (place.address) {
        const coords = await addressToCoords(place.address);
        if (coords) {
            return validateAndLog(coords, '주소');
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
            return validateAndLog(coords, 'Location 필드');
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
            return validateAndLog(coords, '장소명+용산구 검색');
        }

        // 3-2. 장소명만으로 검색 (폴백)
        const placeResult = await searchKakaoPlace(place.name);
        if (placeResult) {
            const coords = {
                lat: parseFloat(placeResult.y),
                lng: parseFloat(placeResult.x),
            };
            return validateAndLog(coords, '장소명 검색 (폴백)');
        }
    }

    // console.warn(`✗ 좌표를 찾을 수 없습니다: ${place.name}`);
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
        // console.warn('카카오맵 API를 사용할 수 없습니다.');
        return null;
    }

    return new Promise((resolve) => {
        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
            address,
            (result: KakaoAddressSearchResult[], status: KakaoKeywordSearchStatus) => {
                if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
                    const { x, y } = result[0];
                    if (!x || !y) {
                        resolve(null);
                        return;
                    }
                    resolve({
                        lat: parseFloat(y),
                        lng: parseFloat(x),
                    });
                } else {
                    // console.warn(`주소를 찾을 수 없습니다: ${address}`);
                    resolve(null);
                }
            }
        );
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
        // console.warn('카카오맵 API를 사용할 수 없습니다.');
        return null;
    }

    return new Promise((resolve) => {
        const ps = new window.kakao.maps.services.Places();

        ps.keywordSearch(
            placeName,
            (data: KakaoKeywordSearchResult[], status: KakaoKeywordSearchStatus) => {
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
                    // console.warn(`장소를 찾을 수 없습니다: ${placeName}`);
                    resolve(null);
                }
            }
        );
    });
}

/**
 * 카카오맵 URL을 기준으로 장소를 검색합니다.
 * keyword 검색 결과 중 URL이 일치하는 항목의 좌표를 반환합니다.
 * @param place Notion 장소 데이터
 * @returns 좌표 {lat, lng}
 */
export async function searchKakaoPlaceByUrl(place: NotionPlace): Promise<Coordinates | null> {
    const placeName = place.name;
    const kakaoUrl = place.kakaomap;
    const location = place.location;

    if (!placeName || !kakaoUrl || typeof window === 'undefined') return null;

    // 카카오맵 API 로드 대기
    const apiLoaded = await waitForKakaoAPI();
    if (!apiLoaded) {
        // console.warn('카카오맵 API를 사용할 수 없습니다.');
        return null;
    }

    // URL에서 place ID 추출
    const placeId = extractKakaoPlaceId(kakaoUrl);
    if (!placeId) {
        // console.warn(`유효하지 않은 카카오맵 URL: ${kakaoUrl}`);
        return null;
    }

    // place ID 매칭 헬퍼 함수
    const tryMatchPlaceId = (
        data: KakaoKeywordSearchResult[],
        searchKeyword: string
    ): Coordinates | null => {
        void searchKeyword;
        // console.log(`🔎 [${placeName}] "${searchKeyword}" 검색 결과 ${data.length}개 중 place ID 매칭 시도...`);

        for (const place of data) {
            const resultUrl = place.place_url || '';
            const resultId = extractKakaoPlaceId(resultUrl);

            if (resultId === placeId) {
                if (!place.y || !place.x) {
                    continue;
                }
                // console.log(`✓ URL 일치 장소 발견: ${placeName} (ID: ${placeId}) - ${place.place_name}`);
                return {
                    lat: parseFloat(place.y),
                    lng: parseFloat(place.x),
                };
            }
        }

        // console.warn(`⚠️ "${searchKeyword}" 검색에서 place ID ${placeId} 미발견`);
        return null;
    };

    return new Promise((resolve) => {
        const ps = new window.kakao.maps.services.Places();

        // 1차 시도: 장소명만으로 검색
        ps.keywordSearch(
            placeName,
            (
                data: KakaoKeywordSearchResult[],
                status: KakaoKeywordSearchStatus,
                _pagination: KakaoPagination
            ) => {
                void _pagination;
                if (status === window.kakao.maps.services.Status.OK && data.length > 0) {
                    const result = tryMatchPlaceId(data, placeName);
                    if (result) {
                        resolve(result);
                        return;
                    }
                }

                // 2차 시도: location 필드를 조합한 검색 (동명이점 구분)
                if (location && location !== '인터넷' && location !== '온라인') {
                    // console.log(`🔄 [${placeName}] location 조합 재검색 시도: "${placeName} ${location}"`);

                    ps.keywordSearch(
                        `${placeName} ${location}`,
                        (
                            data2: KakaoKeywordSearchResult[],
                            status2: KakaoKeywordSearchStatus,
                            _pagination2: KakaoPagination
                        ) => {
                            void _pagination2;
                            if (
                                status2 === window.kakao.maps.services.Status.OK &&
                                data2.length > 0
                            ) {
                                const result2 = tryMatchPlaceId(data2, `${placeName} ${location}`);
                                if (result2) {
                                    resolve(result2);
                                    return;
                                }
                            }

                            // 최종 실패
                            // console.warn(`❌ [${placeName}] 모든 검색 시도 실패 (찾는 ID: ${placeId})`);
                            resolve(null);
                        },
                        { size: 15 }
                    );
                } else {
                    // location이 없으면 바로 실패 처리
                    // console.warn(`❌ [${placeName}] 검색 실패 (찾는 ID: ${placeId})`);
                    resolve(null);
                }
            },
            { size: 15 }
        );
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
                void error;
                // console.error('클립보드 복사 실패:', error);
                textArea.remove();
                return false;
            }
        }
    } catch (error) {
        void error;
        // console.error('클립보드 복사 실패:', error);
        return false;
    }
}
