'use client';

import { useState, useEffect } from 'react';
import { Tab } from '@/components/molecules';
import { KakaoMap, PlaceList } from '@/components/organisms';
import { useMapState } from '@/hooks';
import { type LocationKey, TAB_CONFIGS } from '@/utils/constants';
import type { NotionPlace } from '@/types';
import type { TabLocation } from '@/components/molecules/Tab';
import Filter, { type DistanceFilterType } from '@/components/molecules/Filter';

/**
 * 홈페이지
 * Custom Hooks로 상태 관리 로직 분리
 */
export default function HomePage() {
    const [places, setPlaces] = useState<NotionPlace[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<string>('all');
    const [sortByDistance] = useState(false);
    const [sortByRating] = useState(false);
    const [distanceFilter, setDistanceFilter] = useState<DistanceFilterType>(null);
    const [ratingFilter, setRatingFilter] = useState<number>(0);

    // 지도 상태 관리 훅 사용
    const { center, bounds, selectedLocation, setLocationByKey } = useMapState('한강로길');

    // Notion 데이터 로드
    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                setIsLoading(true);
                const response = await fetch('/api/notion?pageSize=100');
                const data = await response.json();

                if (data.ok && data.items) {
                    console.log('[HomePage] Notion 데이터 로드 완료:', data.items.length, '개');
                    setPlaces(data.items);
                } else {
                    setError(data.error || '데이터를 불러오는데 실패했습니다.');
                }
            } catch (err) {
                setError('데이터를 불러오는 중 오류가 발생했습니다.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPlaces();
    }, []);

    // 탭 변경 핸들러
    const handleTabChange = (tab: TabLocation) => {
        console.log('[HomePage] 탭 변경:', tab.label);
        setSelectedTab(tab.value);

        // 온라인 탭으로 전환 시 필터 초기화
        if (tab.value === 'online') {
            setDistanceFilter(null);
            setRatingFilter(0);
            console.log('[HomePage] 온라인 탭 - 필터 초기화');
        }

        // '전체' 탭이 아닐 때만 지도 위치 변경
        if (tab.label !== '전체' && tab.center) {
            setLocationByKey(tab.label as LocationKey);
        }
    };

    // 폴리곤 클릭 핸들러
    const handleLocationSelect = (location: LocationKey | null) => {
        console.log('[HomePage] 구역 선택:', location || '전체');

        if (location) {
            const tabConfig: Record<LocationKey, string> = {
                한강로길: 'hangang',
                용리단길: 'yongri',
                '아모레 / LS': 'amore-ls',
                래미안: 'raemian',
                아이파크몰: 'ipark',
                용산철길: 'yongsan',
                하이브: 'hybe',
                온라인: 'online',
            };
            const tabValue = tabConfig[location];
            setSelectedTab(tabValue);
            setLocationByKey(location);

            // 온라인 구역 선택 시 필터 초기화
            if (tabValue === 'online') {
                setDistanceFilter(null);
                setRatingFilter(0);
                console.log('[HomePage] 온라인 구역 - 필터 초기화');
            }
        }
    };

    // 필터 변경 핸들러
    const handleDistanceFilterChange = (value: DistanceFilterType) => {
        setDistanceFilter(value);
        console.log('[HomePage] 거리 필터:', value);
    };

    const handleRatingFilterChange = (value: number) => {
        setRatingFilter(value);
        console.log('[HomePage] 평점 필터:', value);
    };

    // selectedTab에 해당하는 LocationKey 찾기 (PlaceList 필터링용)
    // 'all'일 때는 null (전체 표시)
    const filterLocation =
        selectedTab === 'all'
            ? null
            : TAB_CONFIGS.find((config) => config.value === selectedTab)?.label || null;

    return (
        <>
            {/* <h2 className="flex items-center justify-center bg-amber-50 mb-12 h-50 py-5 rounded-lg">
                카드
            </h2> */}

            <div className="map">
                <div className="relative">
                    {isLoading ? (
                        <div className="w-full h-[60vh] flex items-center justify-center bg-gray-50 rounded-lg">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                                <p className="text-gray-600">장소 정보를 불러오는 중...</p>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="w-full h-[60vh] flex items-center justify-center bg-red-50 rounded-lg">
                            <div className="text-center p-8">
                                <p className="text-red-500 mb-4">{error}</p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                >
                                    다시 시도
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <KakaoMap
                                places={places}
                                center={center}
                                bounds={bounds}
                                selectedLocation={selectedLocation}
                                onLocationSelect={handleLocationSelect}
                            />
                            <Tab selectedTab={selectedTab} onTabChange={handleTabChange} />
                        </>
                    )}
                </div>
            </div>

            {/* 온라인 탭이 아닐 때만 필터 표시 */}
            {selectedTab !== 'online' && (
                <Filter
                    distanceFilter={distanceFilter}
                    onDistanceFilterChange={handleDistanceFilterChange}
                    ratingFilter={ratingFilter}
                    onRatingFilterChange={handleRatingFilterChange}
                />
            )}

            <PlaceList
                className="mt-12 mb-24"
                sortByDistance={sortByDistance}
                sortByRating={sortByRating}
                selectedLocation={filterLocation}
                distanceFilter={distanceFilter}
                ratingFilter={ratingFilter}
            />
        </>
    );
}
