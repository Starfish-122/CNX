'use client';

import { useState, useEffect } from 'react';
import { Icon } from '@/components/atoms';
import FilterSection from './FilterSection';

// 거리 필터 타입 (DISTANCE_OPTIONS value 참조)
export type DistanceFilterType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;

interface FilterProps {
    distanceFilter?: DistanceFilterType;
    onDistanceFilterChange?: (value: DistanceFilterType) => void;
    ratingFilter?: number;
    onRatingFilterChange?: (value: number) => void;
    onFilterBoxToggle?: (isOpen: boolean) => void;
}

// 거리 필터 옵션
const DISTANCE_OPTIONS = [
    { value: 0, label: '도보 1분', distance: 80 }, // 80m
    { value: 1, label: '도보 5분', distance: 400 }, // 400m
    { value: 2, label: '도보 10분', distance: 800 }, // 800m
    { value: 3, label: '도보 15분', distance: 1200 }, // 1.2km
    { value: 4, label: '도보 20분', distance: 1600 }, // 1.6km
    { value: 5, label: '도보 30분', distance: 2400 }, // 2.4km
    { value: 6, label: '차량 이동', distance: Infinity }, // 제한 없음
] as const;

// 거리 필터 값을 미터로 변환하는 객체 (하위 호환성 유지)
export const DISTANCE_FILTER_VALUES = Object.fromEntries(
    DISTANCE_OPTIONS.map((opt) => [opt.value, opt.distance])
) as Record<DistanceFilterType & number, number>;

// 거리 필터 레이블 가져오기
const getDistanceLabel = (value: DistanceFilterType): string => {
    if (value === null) return '';
    const option = DISTANCE_OPTIONS.find((opt) => opt.value === value);
    return option?.label || '';
};

const RATING_OPTIONS = [
    { value: 0, label: '전체' },
    { value: 0.5, label: '1점 미만' },
    { value: 1, label: '1점' },
    { value: 2, label: '2점' },
    { value: 3, label: '3점' },
    { value: 4, label: '4점' },
    { value: 5, label: '5점' },
] as const;

// 평점 필터 레이블 가져오기
export const getRatingFilterLabel = (rating: number): string => {
    const option = RATING_OPTIONS.find((opt) => opt.value === rating);
    return option?.label || `${rating}점 이상`;
};

export default function Filter({
    distanceFilter = null,
    onDistanceFilterChange,
    ratingFilter = 0,
    onRatingFilterChange,
    onFilterBoxToggle,
}: FilterProps) {
    // 임시 필터 상태 (버튼 조작용)
    const [tempDistanceFilter, setTempDistanceFilter] =
        useState<DistanceFilterType>(distanceFilter);
    const [tempRatingFilter, setTempRatingFilter] = useState<number>(ratingFilter);
    const [isOpen, setIsOpen] = useState(false);

    // props 변경 시 임시 상태 동기화
    useEffect(() => {
        setTempDistanceFilter(distanceFilter);
        setTempRatingFilter(ratingFilter);
    }, [distanceFilter, ratingFilter]);

    const handleDistanceChange = (value: DistanceFilterType) => {
        setTempDistanceFilter(value);
    };

    const handleRatingChange = (value: number) => {
        setTempRatingFilter(value);
    };

    // 필터 적용 버튼 클릭
    const handleApplyFilter = () => {
        onDistanceFilterChange?.(tempDistanceFilter);
        onRatingFilterChange?.(tempRatingFilter);
    };

    // 개별 초기화
    const handleResetDistance = () => {
        setTempDistanceFilter(null);
    };

    const handleResetRating = () => {
        setTempRatingFilter(0);
    };

    // 전체 초기화
    const handleResetAll = () => {
        setTempDistanceFilter(null);
        setTempRatingFilter(0);
        onDistanceFilterChange?.(null);
        onRatingFilterChange?.(0);
    };

    // 필터 변경 감지
    const hasChanges = tempDistanceFilter !== distanceFilter || tempRatingFilter !== ratingFilter;

    // 필터 박스 토글 핸들러
    const handleToggleFilterBox = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        onFilterBoxToggle?.(newIsOpen);
    };

    return (
        <div className="filter container mx-auto mt-8 mb-6 p-4 lg:p-0">
            <div className="filter__wrap">
                <button
                    type="button"
                    onClick={handleToggleFilterBox}
                    className="filter__title w-full flex items-center gap-2"
                    aria-expanded={isOpen}
                >
                    🛠️ 필터 보기
                    <Icon name={isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />
                </button>

                {isOpen && (
                    <div className="filter__box">
                        <div className="grid grid-cols-1 lg:flex lg:justify-between gap-y-6 gap-x-0 lg:gap-6">
                            <FilterSection
                                label="거리 순"
                                options={DISTANCE_OPTIONS}
                                selectedValue={tempDistanceFilter}
                                onValueChange={handleDistanceChange}
                                onReset={handleResetDistance}
                                showReset={tempDistanceFilter !== null}
                                activeColor="blue"
                                hasNullOption
                                nullLabel="전체"
                            />

                            <FilterSection
                                label="평점 순"
                                options={RATING_OPTIONS}
                                selectedValue={tempRatingFilter}
                                onValueChange={handleRatingChange}
                                onReset={handleResetRating}
                                showReset={tempRatingFilter > 0}
                                activeColor="yellow"
                            />

                            <div className="flex flex-col gap-4 justify-center items-end ">
                                <button
                                    type="button"
                                    onClick={handleApplyFilter}
                                    disabled={!hasChanges}
                                    className={`px-8 py-2 w-full h-full rounded-lg font-semibold transition-all ${
                                        hasChanges
                                            ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    {hasChanges ? '검색 시작' : '검색 완료'}
                                </button>
                            </div>
                        </div>

                        {/* 현재 적용된 필터 표시 */}
                        {(distanceFilter !== null || ratingFilter > 0) && (
                            <div className="pt-4 mt-6 border-t border-gray-200">
                                <div className="flex flex-wrap items-center gap-2">
                                    {(distanceFilter !== null || ratingFilter > 0) && (
                                        <button
                                            onClick={handleResetAll}
                                            className="text-xs text-red-600 border border-red-700 hover:text-white hover:bg-red-700 font-medium px-4 py-2 rounded-lg"
                                        >
                                            전체 초기화
                                        </button>
                                    )}
                                    {distanceFilter !== null && (
                                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                            {getDistanceLabel(distanceFilter)} 이내
                                        </span>
                                    )}
                                    {ratingFilter > 0 && (
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
                                            {getRatingFilterLabel(ratingFilter)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
