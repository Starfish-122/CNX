import { Client } from '@notionhq/client';

export const notion = new Client({ auth: process.env.NOTION_KEY });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const pick = (p: any) => {
  // console.log('=== Notion Page Properties ===');
  // console.log(JSON.stringify(p.properties, null, 2));
  // console.log('==============================');
  
  return {
    id: p.id,
    name:
      p.properties?.Name?.title?.[0]?.plain_text ??
      p.properties?.Name?.title?.[0]?.text?.content ?? '',
    status: p.properties?.Status?.select?.name ?? '',
    score: typeof p.properties?.['Score /5']?.number === 'number' ? p.properties['Score /5'].number : null,
    location: p.properties?.Location?.select?.name ?? '',
    // partySize: (p.properties?.PartySize?.multi_select ?? []).map((t: {name?: string}) => t?.name ?? '').join(', '),
    // mood: (p.properties?.Mood?.multi_select ?? []).map((t: {name?: string}) => t?.name ?? '').join(', '),
    // service: (p.properties?.Service?.multi_select ?? []).map((t: {name?: string}) => t?.name ?? '').join(', '),
    partySize: (p.properties?.PartySize?.multi_select ?? []).map((t: {name?: string}) => t?.name ?? '').join(', '),
    mood: (p.properties?.Mood?.multi_select ?? []).map((t: {name?: string}) => t?.name ?? '').join(', '),
    service: (p.properties?.Service?.multi_select ?? []).map((t: {name?: string}) => t?.name ?? '').join(', '),
    naverplace: p.properties?.NaverPlace?.url ?? null,
    kakaomap: p.properties?.Kakao?.url ?? null,
    website: p.properties?.website?.url ?? null,
    pricecap: p.properties?.PriceCap?.number ?? null,
    summary: (p.properties?.Summary?.rich_text ?? []).map((t: {plain_text?: string}) => t?.plain_text ?? '').join(''),
    partnered: p.properties?.Partnered?.checkbox ?? null,
    // notion 기본 데이터
    url: p.url ?? null,
    created: p.created_time ?? null,
    lastEdited: p.last_edited_time ?? null,
  };
};

// 정렬 키 빌더
export function buildSorts(sortKey: string, direction: 'ascending'|'descending') {
  switch (sortKey) {
    case 'id':
      return [{ property: 'Id', direction }];
    case 'score':
      return [{ property: 'Score /5', direction }];
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
