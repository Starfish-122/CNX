import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS = 60;

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() ?? 'unknown';
    return `${ip}:${request.nextUrl.pathname}`;
}

function isRateLimited(key: string): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(key);

    if (!entry || now > entry.resetTime) {
        rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return false;
    }

    entry.count++;
    return entry.count > MAX_REQUESTS;
}

export function proxy(request: NextRequest) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    if (origin && host) {
        try {
            const originHost = new URL(origin).host;
            if (originHost !== host) {
                return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
            }
        } catch {
            return NextResponse.json({ ok: false, error: 'Bad Request' }, { status: 400 });
        }
    }

    const key = getRateLimitKey(request);
    if (isRateLimited(key)) {
        return NextResponse.json(
            { ok: false, error: 'Too Many Requests' },
            { status: 429, headers: { 'Retry-After': '60' } }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
};
