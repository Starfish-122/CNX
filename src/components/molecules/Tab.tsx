'use client';

import { Icon } from '@/components/atoms';
import {
    TAB_CONFIGS,
    LOCATION_CENTERS,
    type Coordinates,
    type LocationKey,
} from '@/utils/constants';
import { clsx } from 'clsx';

export interface TabLocation {
    label: LocationKey | '전체';
    value: string;
    center: Coordinates | null;
}

// '전체' 탭 추가하여 TABS 배열 생성
const TABS: TabLocation[] = [
    {
        label: '전체',
        value: 'all',
        center: null,
    },
    ...TAB_CONFIGS.map((config) => ({
        label: config.label,
        value: config.value,
        center: LOCATION_CENTERS[config.label],
    })),
];

interface TabProps {
    selectedTab?: string;
    onTabChange?: (tab: TabLocation) => void;
    onSortByDistance?: () => void;
    isSortedByDistance?: boolean;
}

// 탭 버튼 스타일 유틸 함수
const getTabButtonClass = (isSelected: boolean): string =>
    clsx(
        'tab__button px-3 py-3 md:px-4 md:py-4',
        'flex items-center justify-center',
        'text-sm md:text-base cursor-pointer transition-all',
        'border-2',
        isSelected
            ? 'border-blue-500 bg-blue-50 font-bold text-blue-600'
            : 'border-transparent hover:bg-blue-50'
    );

export default function Tab({
    selectedTab,
    onTabChange,
    onSortByDistance,
    isSortedByDistance = false,
}: TabProps) {
    const handleTabClick = (tab: TabLocation) => {
        onTabChange?.(tab);
    };

    const handleSortClick = () => {
        onSortByDistance?.();
    };

    return (
        <div className="container mx-auto flex justify-center align-middle gap-2.5 absolute bottom-0 left-1/2 -translate-x-1/2 bg-white z-10">
            <div className="tab w-full ">
                <div className="grid grid-cols-4 md:grid-cols-9 w-full">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => handleTabClick(tab)}
                            className={getTabButtonClass(selectedTab === tab.value)}
                            aria-pressed={selectedTab === tab.value}
                            aria-label={`${tab.label} 지역 보기`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center px-2.5">
                <button
                    type="button"
                    onClick={handleSortClick}
                    className={clsx(
                        'p-2 rounded-lg transition-all cursor-pointer',
                        isSortedByDistance ? 'bg-blue-500 text-white' : 'hover:bg-blue-50'
                    )}
                    aria-label="거리순 정렬"
                    title={isSortedByDistance ? '거리순 정렬됨' : '거리순 정렬'}
                >
                    <Icon
                        name="measuring_tape"
                        className={isSortedByDistance ? 'text-white' : 'hover:text-blue-500 '}
                    />
                </button>
            </div>
        </div>
    );
}

export { TABS };
