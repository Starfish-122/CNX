'use client';

import { useEffect, useState } from 'react';
import { PlaceCard } from '@/components/molecules';
import { Title, type TagCategory } from '@/components/atoms';
import { findPlaceCoordinates } from '@/utils/services/kakaoMap';
import { getDistanceBetween } from '@/utils/helpers';
import { COMPANY_CENTER } from '@/utils/constants';
import type { NotionPlace } from '@/utils/types';
// Tag 타입 정의
type Tag = {
    label: string;
    category: TagCategory;
};

interface NotionItemWithDistance extends NotionPlace {
    distance?: number;
}

interface PlaceListProps {
    className?: string;
    sortByDistance?: boolean;
}

export default function PlaceList({
    className,
    sortByDistance = false,
}: PlaceListProps): React.JSX.Element {
    const [notionData, setNotionData] = useState<NotionItemWithDistance[]>([]);
    const [loading, setLoading] = useState(true);

    // 거리순 정렬 적용
    const sortedData = sortByDistance
        ? [...notionData].sort((a, b) => {
              // distance가 없는 경우 맨 뒤로
              if (a.distance === undefined) return 1;
              if (b.distance === undefined) return -1;
              return a.distance - b.distance;
          })
        : notionData;

    useEffect(() => {
        async function fetchNotionData() {
            try {
                const response = await fetch('/api/notion?pageSize=100');
                const data = await response.json();
                console.log('[MAP PAGE - NOTION DATA]', data);
                if (data.ok) {
                    // 먼저 노션 데이터만 표시 (거리 없이)
                    setNotionData(data.items);
                    setLoading(false);

                    // 백그라운드에서 좌표를 가져와서 거리 계산
                    // 순차적으로 처리하여 API 과부하 방지
                    const itemsWithDistance: NotionItemWithDistance[] = [];
                    for (const item of data.items) {
                        const coords = await findPlaceCoordinates(item);
                        if (coords) {
                            const distance = getDistanceBetween(COMPANY_CENTER, coords);
                            itemsWithDistance.push({ ...item, distance });
                        } else {
                            itemsWithDistance.push(item);
                        }
                        // 실시간으로 업데이트
                        setNotionData([...itemsWithDistance]);
                    }
                } else {
                    console.error('[NOTION API ERROR]', data.error || data);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Failed to fetch notion data:', error);
                setLoading(false);
            }
        }
        fetchNotionData();
    }, []);

    return (
        <div className={`place-list ${className}`}>
            <Title element="h2">
                맛집 목록 ({notionData.length}개)
                {sortByDistance && (
                    <span className="ml-2 text-sm text-blue-500 font-normal">· 거리순 정렬</span>
                )}
            </Title>
            {loading ? (
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 gap-6">
                    {sortedData.map((item) => {
                        const tags: Tag[] = [];
                        if (item.location) {
                            // '인터넷' → '온라인'으로 표시
                            const displayLocation =
                                item.location === '인터넷' ? '온라인' : item.location;
                            tags.push({ label: displayLocation, category: 'location' });
                        }
                        if (item.status) {
                            tags.push({ label: item.status, category: 'status' });
                        }
                        if (item.partySize) {
                            tags.push({ label: item.partySize, category: 'mood' });
                        }
                        if (item.partnered) {
                            tags.push({ label: '임직원 할인', category: 'service' });
                        }
                        return (
                            <PlaceCard
                                key={item.id}
                                name={item.name || '이름 없음'}
                                description={item.summary || ''}
                                tags={tags}
                                rating={item.score ?? undefined}
                                distance={item.distance}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
