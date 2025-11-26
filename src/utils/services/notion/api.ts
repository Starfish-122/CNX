import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_KEY });

// Notion 페이지 속성 타입 정의
interface NotionRichTextProperty {
    rich_text?: Array<{ plain_text?: string; text?: { content?: string } }>;
}

interface NotionMultiSelectProperty {
    multi_select?: Array<{ name?: string }>;
}

interface NotionPageProperties {
    Name?: { title?: Array<{ plain_text?: string; text?: { content?: string } }> };
    Status?: { select?: { name?: string } };
    Score?: { number?: number };
    Location?: { select?: { name?: string } };
    PartySize?: NotionMultiSelectProperty;
    Mood?: NotionMultiSelectProperty;
    Service?: NotionMultiSelectProperty;
    Kakao?: { url?: string | null };
    website?: { url?: string | null };
    PriceCap?: { number?: number | null };
    Summary?: NotionRichTextProperty;
    Partnered?: { checkbox?: boolean | null };
    Address?: NotionRichTextProperty;
    Phone?: NotionRichTextProperty;
    Image?:
        | NotionRichTextProperty
        | { files?: Array<{ file?: { url?: string }; external?: { url?: string } }> };
    Copyright?: NotionRichTextProperty;
    GoogleMap?: { url?: string | null };
    GooglePlaceID?: NotionRichTextProperty;
}

interface NotionPage {
    id: string;
    properties?: NotionPageProperties;
    url?: string | null;
    created_time?: string | null;
    last_edited_time?: string | null;
}

export const pick = (p: NotionPage) => {
    const readRichText = (prop: NotionRichTextProperty | undefined): string =>
        (prop?.rich_text ?? [])
            .map(
                (t: { plain_text?: string; text?: { content?: string } }) =>
                    t?.plain_text ?? t?.text?.content ?? ''
            )
            .join('') || '';

    // helper: multi_select → "A, B, C"
    const readMultiSelect = (prop: NotionMultiSelectProperty | undefined): string =>
        (prop?.multi_select ?? [])
            .map((t: { name?: string }) => t?.name ?? '')
            .filter(Boolean)
            .join(', ');

    const status: string = p.properties?.Status?.select?.name ?? '';

    // 🔹 Image: 우선 rich_text(지금 sync-place.js가 쓰는 방식), 없으면 예전 files 방식
    const imageProperty = p.properties?.Image;
    const imageFromRichText =
        'rich_text' in (imageProperty || {})
            ? readRichText(imageProperty as NotionRichTextProperty)
            : '';
    const imageFromFiles =
        imageProperty && 'files' in imageProperty
            ? (
                  imageProperty as {
                      files?: Array<{ file?: { url?: string }; external?: { url?: string } }>;
                  }
              ).files?.[0]?.file?.url ??
              (
                  imageProperty as {
                      files?: Array<{ file?: { url?: string }; external?: { url?: string } }>;
                  }
              ).files?.[0]?.external?.url ??
              null
            : null;

    const statusFallbackMap: Record<string, string> = {
        전체: '/images/etc.png',
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
        기타: '/images/etc.png',
    };

    const statusFallbackImage =
        status && statusFallbackMap[status] ? statusFallbackMap[status] : '/images/etc.png';
    const finalImage = imageFromRichText || imageFromFiles || statusFallbackImage;
    const bestProperty = (p.properties as Record<string, { checkbox?: boolean }> | undefined)?.Best;

    return {
        id: p.id,
        name:
            p.properties?.Name?.title?.[0]?.plain_text ??
            p.properties?.Name?.title?.[0]?.text?.content ??
            '',
        status: p.properties?.Status?.select?.name ?? '',
        best: bestProperty?.checkbox ?? false,
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
