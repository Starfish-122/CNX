export const runtime = 'nodejs';
import { NextResponse } from 'next/server';
import { notion, pick, buildSorts } from '@/utils/notion';

export async function GET(req: Request) {
    try {
        const sp = new URL(req.url).searchParams;

        // 쿼리 파라미터 파싱
        const cursor = sp.get('cursor') || undefined;
        const pageSize = Math.min(parseInt(sp.get('pageSize') || '20', 10), 100);

        const sortParam = sp.get('sort')?.toLowerCase();
        const orderParam = (sp.get('order') || 'desc').toLowerCase();
        const direction = orderParam === 'asc' ? 'ascending' : 'descending';

        const sorts = sortParam ? buildSorts(sortParam, direction) : undefined;

        const res = await notion.databases.query({
            database_id: process.env.NOTION_DATABASE_ID!,
            page_size: pageSize,
            start_cursor: cursor,
            ...(sorts && { sorts }),
        });

        const items = res.results.map(pick);
        return NextResponse.json({
            ok: true,
            count: items.length,
            items,
            hasMore: res.has_more,
            nextCursor: res.next_cursor ?? null,
        });
    } catch (e) {
        const error = e instanceof Error ? e.message : 'error';
        return NextResponse.json({ ok: false, error }, { status: 500 });
    }
}
