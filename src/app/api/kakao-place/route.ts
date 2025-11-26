import { NextResponse } from 'next/server';

const KAKAO_SEARCH_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json(
            { ok: false, error: 'query parameter is required' },
            { status: 400 }
        );
    }

    const apiKey = process.env.KAKAO_REST_API_KEY;

    if (!apiKey) {
        console.error('KAKAO_REST_API_KEY is not configured.');
        return NextResponse.json(
            { ok: false, error: 'Kakao REST API key is missing on server' },
            { status: 500 }
        );
    }

    try {
        const kakaoResponse = await fetch(
            `${KAKAO_SEARCH_URL}?query=${encodeURIComponent(query)}&size=1`,
            {
                headers: {
                    Authorization: `KakaoAK ${apiKey}`,
                },
                cache: 'no-store',
            }
        );

        if (!kakaoResponse.ok) {
            const errorText = await kakaoResponse.text();
            console.error('Failed to fetch Kakao place info:', errorText);
            return NextResponse.json(
                { ok: false, error: 'Kakao API request failed' },
                { status: 502 }
            );
        }

        const data = await kakaoResponse.json();
        const document = data?.documents?.[0];

        const payload = document
            ? {
                addressName: document.address_name ?? '',
                roadAddressName: document.road_address_name ?? '',
                phone: document.phone ?? '',
                placeUrl: document.place_url ?? '',
            }
            : null;

        return NextResponse.json({
            ok: true,
            data: payload,
        });
    } catch (error) {
        console.error('Unexpected error while calling Kakao API:', error);
        return NextResponse.json(
            { ok: false, error: 'Failed to fetch Kakao place info' },
            { status: 500 }
        );
    }
}

