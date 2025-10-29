'use client';

import { useState, useEffect } from 'react';
import { Tab } from '@/components/molecules';
import { KakaoMap, PlaceList } from '@/components/organisms';
import { useMapState } from '@/hooks';
import { type LocationKey } from '@/utils/constants';
import type { NotionPlace } from '@/types';
import type { TabLocation } from '@/components/molecules/Tab';

/**
 * 홈페이지
 * Custom Hooks로 상태 관리 로직 분리
 */
export default function HomePage() {
    const [places, setPlaces] = useState<NotionPlace[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<string>('hangang');
    const [sortByDistance, setSortByDistance] = useState(false);

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
        setLocationByKey(tab.label);
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
            setSelectedTab(tabConfig[location]);
            setLocationByKey(location);
        }
    };

    // 거리순 정렬 핸들러
    const handleSortByDistance = () => {
        setSortByDistance((prev) => !prev);
        console.log('[HomePage] 거리순 정렬:', !sortByDistance);
    };

    return (
        <>
            <h2 className="flex items-center justify-center bg-amber-50 my-5 py-5 rounded-lg">
                카드
            </h2>

            <div className="">
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
                            <Tab
                                selectedTab={selectedTab}
                                onTabChange={handleTabChange}
                                onSortByDistance={handleSortByDistance}
                                isSortedByDistance={sortByDistance}
                            />
                        </>
                    )}
                </div>
            </div>

            <h2 className="flex items-center justify-center bg-amber-50 my-5 py-5 rounded-lg">
                리스트
            </h2>
            <PlaceList sortByDistance={sortByDistance} />
        </>
    );
}
