'use client';

import { useState, useEffect, useMemo } from 'react';
import { Tab, SearchBar } from '@/components/molecules';
import { KakaoMap, PlaceList, RecommandList } from '@/components/organisms';
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
    const [sortByDistance, setSortByDistance] = useState(false);
    const [sortByRating] = useState(false);
    const [distanceFilter, setDistanceFilter] = useState<DistanceFilterType>(null);
    const [ratingFilter, setRatingFilter] = useState<number>(0);

    // 지도 상태 관리 훅 사용
    const { center, bounds, selectedLocation, setLocationByKey, resetLocation } = useMapState('한강로길');

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // 초기 진입 시 '전체' 탭 활성화 (사무실 위치로 지도 중심 설정)
    useEffect(() => {
        resetLocation(true);
    }, [resetLocation]);

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

        // 탭 전환 시 필터 초기화
        setDistanceFilter(null);
        setRatingFilter(0);
        setSortByDistance(false);
        console.log('[HomePage] 탭 전환 - 필터 초기화');

        // '전체' 탭 클릭 시 모든 매장 활성화 및 사무실 위치로 중심 이동
        if (tab.label === '전체') {
            resetLocation(true); // true: COMPANY_CENTER 사용
        } else if (tab.center) {
            // 다른 탭 클릭 시 해당 지역으로 이동
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

            // 구역 선택 시 필터 초기화
            setDistanceFilter(null);
            setRatingFilter(0);
            setSortByDistance(false);

            setSearchTerm('');
            setSelectedTags([]);

            console.log('[HomePage] 구역 선택 - 필터 초기화');
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

    // 필터 박스 토글 핸들러
    const handleFilterBoxToggle = (isOpen: boolean) => {
        // 필터 박스가 열리면 거리순 정렬 활성화
        if (isOpen) {
            setSortByDistance(true);
            console.log('[HomePage] 필터 박스 열림 - 거리순 정렬 활성화');
        }
    };

    const handleSearch = ({ searchTerm, tags }: { searchTerm: string; tags: string[] }) => {
        const keyword = (searchTerm ?? '').trim();
        const tagList = tags ?? [];
        
        setSearchTerm(keyword);
        setSelectedTags(tagList);

        if (tagList.length > 0) {
            if (selectedTab !== 'all') {
                setSelectedTab('all');
                resetLocation(true);
                setDistanceFilter(null);
                setRatingFilter(0);
                setSortByDistance(false);
            }
            return;
        }
    
        if (!keyword && tagList.length === 0) {
            setSelectedTab('all');
            resetLocation(true);
            setDistanceFilter(null);
            setRatingFilter(0);
            setSortByDistance(false);
        }
    };

    // selectedTab에 해당하는 LocationKey 찾기 (PlaceList 필터링용)
    // 'all'일 때는 null (전체 표시)
    const filterLocation =
        selectedTab === 'all'
            ? null
            : TAB_CONFIGS.find((config) => config.value === selectedTab)?.label || null;

    const TAGS = ['카페','한식','일식','양식','중식','기타','분식','헬스','미용','주점','고기'];

    const filteredPlacesForMap = useMemo(() => {
        let base = places;
    
        // 1) 탭(지역) 필터
        if (filterLocation) {
            base = base.filter((item) => {
                // '인터넷'과 '온라인'은 동일하게 처리
                if (filterLocation === '온라인') {
                    return item.location === '인터넷' || item.location === '온라인';
                }
    
                // '아모레 / LS'는 다양한 형식 허용 (PlaceList와 동일 로직)
                if (filterLocation === '아모레 / LS') {
                    const location = item.location || '';
                    return (
                        location === '아모레 / LS' ||
                        location === '아모레/LS' ||
                        (location.includes('아모레') && location.includes('LS'))
                    );
                }
    
                return item.location === filterLocation;
            });
        }
    
        // 2) 검색어 필터 (이름 기준)
        if (searchTerm.trim()) {
            const keyword = searchTerm.trim().toLowerCase();
            base = base.filter((item) =>
                (item.name || '').toLowerCase().includes(keyword)
            );
        }
    
        // 3) 태그 필터 (지금은 status를 예시로 사용 중)
        if (selectedTags.length > 0) {
            base = base.filter((item: any) => {
                // TODO: 실제 태그 필드로 바꾸면 더 정확해짐 (ex. item.category, item.cuisine 등)
                const itemTags: string[] = item.status ? [item.status] : [];
                if (!itemTags.length) return false;
                return selectedTags.every((tag) => itemTags.includes(tag));
            });
        }
    
        return base;
    }, [places, filterLocation, searchTerm, selectedTags]);

    return (
        <>
            {/* <h2 className="flex items-center justify-center bg-amber-50 mb-12 h-50 py-5 rounded-lg">
                카드
            </h2> */}

            <div className="map relative">
                <RecommandList />
                <div className="relative">
                    <SearchBar tags={TAGS} onSearch={handleSearch} />
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
                                places={filteredPlacesForMap}
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
                    onFilterBoxToggle={handleFilterBoxToggle}
                />
            )}

            <PlaceList
                className="mt-12 mb-24 px-4 lg:px-0"
                sortByDistance={sortByDistance}
                sortByRating={sortByRating}
                selectedLocation={filterLocation}
                distanceFilter={distanceFilter}
                ratingFilter={ratingFilter}
                searchTerm={searchTerm}
                selectedTags={selectedTags}
            />
        </>
    );
}
