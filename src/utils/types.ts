// 카카오 맵 전역 타입 선언
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    interface Window {
        kakao: {
            maps: {
                load: (callback: () => void) => void;
                Map: new (container: HTMLElement, options: any) => any;
                LatLng: new (lat: number, lng: number) => any;
                Marker: new (options: any) => any;
                InfoWindow: new (options: any) => any;
                MarkerClusterer: new (options: any) => any;
                LatLngBounds: new () => any;
                Polygon: new (options: any) => any;
                services: {
                    Places: new () => any;
                    Geocoder: new () => any;
                    Status: {
                        OK: string;
                        ZERO_RESULT: string;
                        ERROR: string;
                    };
                };
                CustomOverlay: new (options: any) => any;
                event: {
                    addListener: (target: any, type: string, handler: () => void) => void;
                };
            };
        };
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// 타입 통합 Export
export type {
    KakaoMapProps,
    MapMarkerData,
    MapBounds,
    KakaoPlaceResult,
} from './types/kakaoMap.types';

export type { NotionPlace } from './types/notion.types';
