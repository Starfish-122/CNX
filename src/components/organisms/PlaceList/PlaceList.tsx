'use client';

import { useEffect, useState, useMemo } from 'react';
import { PlaceCard, SkeletonCard } from '@/components/molecules';
import { Title, type TagCategory } from '@/components/atoms';
import { findPlaceCoordinates } from '@/utils/services/kakaoMap';
import { getDistanceBetween } from '@/utils/helpers';
import { COMPANY_CENTER, type LocationKey } from '@/utils/constants';
import type { NotionPlace } from '@/types';
import { DISTANCE_FILTER_VALUES, type DistanceFilterType } from '@/components/molecules/Filter';

// Tag 타입 정의
type Tag = {
    label: string;
    category: TagCategory;
};

// 평점 필터링 함수
const matchesRatingFilter = (score: number | undefined | null, ratingFilter: number): boolean => {
    if (score === undefined || score === null) return false;

    if (ratingFilter === 0.5) return score < 1;
    if (ratingFilter === 1) return score >= 1 && score < 2;
    if (ratingFilter === 2) return score >= 2 && score < 3;
    if (ratingFilter === 3) return score >= 3 && score < 4;
    if (ratingFilter === 4) return score >= 4 && score < 5;
    if (ratingFilter === 5) return score === 5;

    return score >= ratingFilter;
};

interface NotionItemWithDistance extends NotionPlace {
    distance?: number;
}

interface PlaceListProps {
    className?: string;
    sortByDistance?: boolean;
    sortByRating?: boolean;
    selectedLocation?: LocationKey | null;
    distanceFilter?: DistanceFilterType;
    ratingFilter?: number;
}

export default function PlaceList({
    className,
    sortByDistance = false,
    sortByRating = false,
    selectedLocation = null,
    distanceFilter = null,
    ratingFilter = 0,
}: PlaceListProps): React.JSX.Element {
    const [notionData, setNotionData] = useState<NotionItemWithDistance[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    // 지역별 필터링 적용
    const filteredByLocation = useMemo(() => {
        if (!selectedLocation) {
            return notionData;
        }

        return notionData.filter((item) => {
            // '인터넷'과 '온라인'은 동일하게 처리
            if (selectedLocation === '온라인') {
                return item.location === '인터넷' || item.location === '온라인';
            }

            // '아모레 / LS'는 다양한 형식 허용 (공백, 슬래시 형식 등)
            if (selectedLocation === '아모레 / LS') {
                const location = item.location || '';
                // '아모레'와 'LS'가 모두 포함된 경우 매칭
                // 또는 정확히 일치하는 형식들
                return (
                    location === '아모레 / LS' ||
                    location === '아모레/LS' ||
                    (location.includes('아모레') && location.includes('LS'))
                );
            }

            return item.location === selectedLocation;
        });
    }, [notionData, selectedLocation]);

    // 거리 필터 적용
    const filteredByDistance = useMemo(() => {
        if (distanceFilter === null) {
            return filteredByLocation;
        }

        const maxDistance = DISTANCE_FILTER_VALUES[distanceFilter];
        return filteredByLocation.filter((item) => {
            // 거리 정보가 없으면 제외
            if (item.distance === undefined) return false;
            return item.distance <= maxDistance;
        });
    }, [filteredByLocation, distanceFilter]);

    // 평점 필터 적용
    const filteredData = useMemo(() => {
        if (ratingFilter === 0) {
            return filteredByDistance;
        }

        return filteredByDistance.filter((item) => matchesRatingFilter(item.score, ratingFilter));
    }, [filteredByDistance, ratingFilter]);

    // 정렬 함수들
    const sortByDistanceFilter = (
        data: NotionItemWithDistance[],
        maxDistance: number
    ): NotionItemWithDistance[] => {
        return [...data].sort((a, b) => {
            const aInRange = a.distance !== undefined && a.distance <= maxDistance;
            const bInRange = b.distance !== undefined && b.distance <= maxDistance;

            // 1순위: 거리 필터 범위 내인 것 우선
            if (aInRange && !bInRange) return -1;
            if (!aInRange && bInRange) return 1;

            // 2순위: 평점 높은 순
            const aScore = a.score ?? 0;
            const bScore = b.score ?? 0;
            if (bScore !== aScore) {
                return bScore - aScore;
            }

            // 3순위: 거리 가까운 순
            if (a.distance !== undefined && b.distance !== undefined) {
                return a.distance - b.distance;
            }
            if (a.distance === undefined) return 1;
            if (b.distance === undefined) return -1;
            return 0;
        });
    };

    const sortByDistanceOnly = (data: NotionItemWithDistance[]): NotionItemWithDistance[] => {
        return [...data].sort((a, b) => {
            if (a.distance === undefined) return 1;
            if (b.distance === undefined) return -1;
            return a.distance - b.distance;
        });
    };

    const sortByRatingOnly = (data: NotionItemWithDistance[]): NotionItemWithDistance[] => {
        return [...data].sort((a, b) => {
            if (a.score === undefined || a.score === null) return 1;
            if (b.score === undefined || b.score === null) return -1;
            return b.score - a.score;
        });
    };

    // 거리순/평점순 정렬 적용
    const sortedData = useMemo(() => {
        // 거리 필터가 선택된 경우: 1순위 거리 필터, 2순위 평점
        if (distanceFilter !== null) {
            const maxDistance = DISTANCE_FILTER_VALUES[distanceFilter];
            return sortByDistanceFilter(filteredData, maxDistance);
        }

        // 기존 정렬 로직 (거리 필터가 없을 때)
        if (sortByDistance) {
            return sortByDistanceOnly(filteredData);
        }

        if (sortByRating) {
            return sortByRatingOnly(filteredData);
        }

        return filteredData;
    }, [filteredData, sortByDistance, sortByRating, distanceFilter]);

    useEffect(() => {
        async function fetchNotionData() {
            try {
                const response = await fetch('/api/notion?pageSize=100');
                const data = await response.json();
                console.log('[MAP PAGE - NOTION DATA]', data);
                if (data.ok) {
                    // 먼저 노션 데이터만 표시 (거리 없이)
                    setNotionData(data.items);
                    setTotalCount(data.items.length);
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
                    }
                    // 거리 계산 완료 후 한 번에 업데이트
                    setNotionData(itemsWithDistance);
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

    // 필터링된 개수 계산
    const displayCount = loading ? totalCount : filteredData.length;

    return (
        <div className={`place-list container mx-auto ${className}`}>
            <Title element="h2" className="mb-6">
                {selectedLocation ? `${selectedLocation} 맛집 목록` : '맛집 목록'}{' '}
                {!loading && ` (${displayCount}개)`}
            </Title>
            {loading ? (
                <div className="w-full grid grid-cols-1 gap-6">
                    {[...Array(10)].map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            ) : sortedData.length === 0 ? (
                <div className="w-full py-12 text-center">
                    <p className="text-gray-500 text-lg">조건에 맞는 맛집이 없습니다.</p>
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
