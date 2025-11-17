import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_KEY });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pick = (p: any) => {
    const readRichText = (prop: any): string =>
        (prop?.rich_text ?? [])
            .map((t: { plain_text?: string; text?: { content?: string } }) => t?.plain_text ?? t?.text?.content ?? '')
            .join('') || '';

    // helper: multi_select → "A, B, C"
    const readMultiSelect = (prop: any): string =>
        (prop?.multi_select ?? [])
            .map((t: { name?: string }) => t?.name ?? '')
            .filter(Boolean)
            .join(', ');

    const status: string = p.properties?.Status?.select?.name ?? '';

    // 🔹 Image: 우선 rich_text(지금 sync-place.js가 쓰는 방식), 없으면 예전 files 방식
    const imageFromRichText = readRichText(p.properties?.Image);
    const imageFromFiles =
        p.properties?.Image?.files?.[0]?.file?.url ??
        p.properties?.Image?.files?.[0]?.external?.url ??
        null;
    
    const statusFallbackMap: Record<string, string> = {
        한식: '/images/korean.png',
        일식: '/images/japanese.png',
        중식: '/images/chinese.png',
        양식: '/images/restaurant.png',
        분식: '/images/snack.png',
        카페: '/images/cafe.png',
        치킨: '/images/chicken.png',
        패스트푸드: '/images/fastfood.png',
        고기: '/images/meat.png',
        주점: '/images/drink.png',
        기타: '/images/etc.png'
    }

    const statusFallbackImage = (status && statusFallbackMap[status]) ? statusFallbackMap[status] : '/images/etc.png';
    const finalImage = imageFromRichText || imageFromFiles || statusFallbackImage;

    return {
        id: p.id,
        name:
            p.properties?.Name?.title?.[0]?.plain_text ??
            p.properties?.Name?.title?.[0]?.text?.content ??
            '',
        status: p.properties?.Status?.select?.name ?? '',
        score:
            typeof p.properties?.['Score']?.number === 'number'
                ? p.properties['Score'].number
                : null,
        location: p.properties?.Location?.select?.name ?? '',
        partySize: readMultiSelect(p.properties?.PartySize),
        mood: readMultiSelect(p.properties?.Mood),
        service: readMultiSelect(p.properties?.Service),
        kakaomap: p.properties?.Kakao?.url ?? null,
        website: p.properties?.website?.url ?? null,
        pricecap: p.properties?.PriceCap?.number ?? null,
        summary: readRichText(p.properties?.Summary),
        partnered: p.properties?.Partnered?.checkbox ?? null,
        address: readRichText(p.properties?.Address),
        phone: readRichText(p.properties?.Phone),
        image: finalImage,
        copyright: readRichText(p.properties?.Copyright) || null,
        googlemap: p.properties?.GoogleMap?.url ?? null,
        googleplaceid: readRichText(p.properties?.GooglePlaceID),
        // notion 기본 데이터
        url: p.url ?? null,
        created: p.created_time ?? null,
        lastEdited: p.last_edited_time ?? null,
    };
};

// 정렬 키 빌더
export function buildSorts(sortKey: string, direction: 'ascending' | 'descending') {
    switch (sortKey) {
        case 'id':
            return [{ property: 'Id', direction }];
        case 'score':
            return [{ property: 'Score', direction }];
        case 'name':
            return [{ property: 'Name', direction }];
        case 'location':
            return [{ property: 'Location', direction }];
        case 'created':
            return [{ timestamp: 'created_time' as const, direction }];
        case 'edited':
            return [{ timestamp: 'last_edited_time' as const, direction }];
        default:
            return undefined;
    }
}
