/**
 * 지도 관련 타입 및 상수
 */

// ========== 타입 정의 ==========
export type Coordinates = {
    readonly lat: number;
    readonly lng: number;
};

export type LocationKey =
    | '한강로길'
    | '용리단길'
    | '아모레 / LS'
    | '래미안'
    | '아이파크몰'
    | '용산철길'
    | '하이브'
    | '온라인';

export type TabConfig = {
    readonly label: LocationKey;
    readonly value: string;
};

// ========== 좌표 상수 ==========
// 회사 위치: 서울 용산구 한강로2가 422 (한강대로 95) - 컨센트릭스
export const COMPANY_CENTER: Coordinates = {
    lat: 37.5288,
    lng: 126.9666,
} as const;

// 지역별 기본 좌표
export const LOCATION_CENTERS: Record<LocationKey, Coordinates> = {
    한강로길: COMPANY_CENTER,
    용리단길: { lat: 37.534, lng: 126.9918 },
    '아모레 / LS': { lat: 37.531, lng: 126.9665 },
    래미안: { lat: 37.5295, lng: 126.9645 },
    아이파크몰: { lat: 37.5267, lng: 126.9652 },
    용산철길: { lat: 37.5318, lng: 126.9712 },
    하이브: { lat: 37.5245, lng: 126.9655 },
    온라인: COMPANY_CENTER, // 온라인은 회사 위치 기준
} as const;

// ========== 탭 설정 ==========
export const TAB_CONFIGS: readonly TabConfig[] = [
    { label: '한강로길', value: 'hangang' },
    { label: '용리단길', value: 'yongri' },
    { label: '아모레 / LS', value: 'amore-ls' },
    { label: '래미안', value: 'raemian' },
    { label: '아이파크몰', value: 'ipark' },
    { label: '용산철길', value: 'yongsan' },
    { label: '하이브', value: 'hybe' },
    { label: '온라인', value: 'online' },
] as const;

// ========== 구역별 폴리곤 좌표 ==========
export const LOCATION_POLYGONS: Record<LocationKey, Coordinates[]> = {
    한강로길: [
        { lat: 37.5307, lng: 126.9668 },
        { lat: 37.5298, lng: 126.9681 },
        { lat: 37.5333, lng: 126.9713 },
        { lat: 37.5336, lng: 126.9699 },
        { lat: 37.5321, lng: 126.9689 },
        { lat: 37.5315, lng: 126.9684 },
        { lat: 37.5312, lng: 126.9679 },
    ],
    용리단길: [
        { lat: 37.533, lng: 126.9717 },
        { lat: 37.5328, lng: 126.9721 },
        { lat: 37.5324, lng: 126.9735 },
        { lat: 37.532, lng: 126.9741 },
        { lat: 37.5309, lng: 126.9737 },
        { lat: 37.5298, lng: 126.9729 },
        { lat: 37.5288, lng: 126.9727 },
        { lat: 37.5293, lng: 126.9715 },
        { lat: 37.5285, lng: 126.9706 },
        { lat: 37.5283, lng: 126.9703 },
        { lat: 37.5299, lng: 126.969 },
    ],
    '아모레 / LS': [
        { lat: 37.53, lng: 126.969 },
        { lat: 37.529, lng: 126.9696 },
        { lat: 37.5281, lng: 126.9697 },
        { lat: 37.5269, lng: 126.9692 },
        { lat: 37.5267, lng: 126.9693 },
        { lat: 37.5264, lng: 126.9696 },
        { lat: 37.5249, lng: 126.9679 },
        { lat: 37.5263, lng: 126.9654 },
    ],
    래미안: [
        { lat: 37.5295, lng: 126.9679 },
        { lat: 37.53, lng: 126.9673 },
        { lat: 37.528, lng: 126.9654 },
        { lat: 37.5276, lng: 126.9661 },
    ],
    아이파크몰: [
        { lat: 37.5314, lng: 126.9656 },
        { lat: 37.5302, lng: 126.967 },
        { lat: 37.5282, lng: 126.9652 },
        { lat: 37.5287, lng: 126.964 },
        { lat: 37.5284, lng: 126.9636 },
        { lat: 37.5292, lng: 126.9626 },
    ],
    용산철길: [
        { lat: 37.5264, lng: 126.9649 },
        { lat: 37.5275, lng: 126.9631 },
        { lat: 37.5253, lng: 126.961 },
        { lat: 37.5251, lng: 126.9612 },
        { lat: 37.5241, lng: 126.9628 },
    ],
    하이브: [
        { lat: 37.5243, lng: 126.9635 },
        { lat: 37.5237, lng: 126.9645 },
        { lat: 37.5246, lng: 126.9655 },
        { lat: 37.5235, lng: 126.9674 },
        { lat: 37.5243, lng: 126.9682 },
        { lat: 37.5261, lng: 126.9652 },
    ],
    온라인: [], // 온라인은 폴리곤 없음
} as const;

// ========== 지도 설정 ==========
export const DEFAULT_MAP_LEVEL = 3;
export const COMPANY_MARKER_Z_INDEX = 999;
export const OVERLAY_Y_ANCHOR = 1.7;

// ========== 폴리곤 스타일 ==========
export const POLYGON_STYLE = {
    strokeWeight: 2,
    strokeColor: '#004c80',
    strokeOpacity: 0.8,
    fillColor: '#00a0e9',
    fillOpacity: 0.3,
} as const;

export const POLYGON_STYLE_ACTIVE = {
    strokeWeight: 3,
    strokeColor: 'var(--color-blue-500)',
    strokeOpacity: 1,
    fillColor: 'var(--color-blue-400)',
    fillOpacity: 0.4,
} as const;

export const POLYGON_STYLE_INACTIVE = {
    strokeWeight: 2,
    strokeColor: 'var(--color-gray-400)',
    strokeOpacity: 0.5,
    fillColor: 'var(--color-gray-300)',
    fillOpacity: 0.4,
} as const;
