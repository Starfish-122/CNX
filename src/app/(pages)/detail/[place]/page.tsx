'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { CustomDetailCard } from '@/components/molecules';
import { Title, Text, type TagCategory } from '@/components/atoms';

import type { NotionPlace } from '@/utils/types';

type TagType = { label: string; category: TagCategory };

export default function PlaceDetailPage(): React.JSX.Element {
    const params = useParams();
    const placeName = params.place as string;
    const [placeData, setPlaceData] = useState<NotionPlace | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPlaceData() {
            try {
                console.log('Searching for place:', decodeURIComponent(placeName));
                const response = await fetch('/api/notion?pageSize=100', {
                    next: { revalidate: 300 }, // 5분 캐시
                });
                const data = await response.json();

                if (data.ok) {
                    console.log('API Response:', data.items.length, 'items');
                    const place = data.items.find(
                        (item: NotionPlace) => item.name === decodeURIComponent(placeName)
                    );
                    console.log('Found place:', place);
                    setPlaceData(place || null);
                } else {
                    console.error('[NOTION API ERROR]', data.error || data);
                }
            } catch (error) {
                console.error('Failed to fetch place data:', error);
            } finally {
                setLoading(false);
            }
        }

        if (placeName) {
            fetchPlaceData();
        }
    }, [placeName]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Text>데이터를 불러오는 중...</Text>
            </div>
        );
    }

    if (!placeData) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Title
                        element="h1"
                        className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                    >
                        맛집을 찾을 수 없습니다.
                    </Title>
                    <Text className="text-gray-600 dark:text-gray-400">
                        요청하신 맛집의 정보가 없습니다.
                    </Text>
                </div>
            </div>
        );
    }

    const tags: TagType[] = [];
    if (placeData.location) {
        tags.push({ label: placeData.location, category: 'location' as TagCategory });
    }
    if (placeData.status) {
        tags.push({ label: placeData.status, category: 'status' as TagCategory });
    }
    if (placeData.partySize) {
        tags.push({ label: placeData.partySize, category: 'mood' as TagCategory });
    }
    if (placeData.partnered) {
        tags.push({ label: '임직원 할인', category: 'service' as TagCategory });
    }

    return (
        <div className="detail min-h-[100vh] p-6">
            <CustomDetailCard data={placeData} className="detail__card" />
        </div>
    );
}
