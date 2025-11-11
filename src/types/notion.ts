/**
 * Notion API 관련 타입 정의
 */

// Notion API로부터 받는 장소 데이터 타입
export interface NotionPlace {
    id: string;
    name: string;
    status: string;
    score: number | null;
    location: string;
    partySize: string;
    mood: string;
    service: string;
    googlemap: string | null;
    googleplaceid: string | null;
    kakaomap: string | null;
    website: string | null;
    pricecap: number | null;
    summary: string;
    partnered: boolean | null;
    address: string;
    phone: string;
    image: string | null;
    copyright: string | null;
    url: string | null;
    created: string | null;
    lastEdited: string | null;
    distance?: number; // 회사로부터의 거리 (미터)
    coordinates?: { lat: number; lng: number }; // 장소의 좌표
}

// Notion API 응답 타입
export interface NotionApiResponse {
    ok: boolean;
    items?: NotionPlace[];
    error?: string;
}
