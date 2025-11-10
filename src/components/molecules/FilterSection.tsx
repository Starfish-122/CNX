'use client';

import { Icon } from '@/components/atoms';

// 필터 옵션 타입
export interface FilterOption<T> {
    value: T;
    label: string;
}

// 필터 섹션 컴포넌트 Props
export interface FilterSectionProps<T> {
    label: string;
    options: readonly FilterOption<T>[];
    selectedValue: T;
    onValueChange: (value: T) => void;
    onReset?: () => void;
    showReset?: boolean;
    activeColor: 'blue' | 'yellow';
    hasNullOption?: boolean;
    nullLabel?: string;
}

/**
 * 필터 섹션 컴포넌트
 * 라벨, 아이콘, 옵션 버튼 그룹, 초기화 버튼을 포함한 필터 UI
 */
export default function FilterSection<T>({
    label,
    options,
    selectedValue,
    onValueChange,
    onReset,
    showReset = false,
    activeColor = 'blue',
    hasNullOption = false,
    nullLabel = '전체',
}: FilterSectionProps<T>) {
    const colorClasses = {
        blue: {
            active: 'bg-blue-500 text-white shadow-md',
            reset: 'text-xs text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg',
        },
        yellow: {
            active: 'bg-yellow-500 text-white shadow-md',
            reset: 'text-xs text-white bg-yellow-500 hover:bg-yellow-700 px-4 py-2 rounded-lg',
        },
    };

    return (
        <div className="filter-item col-span-2">
            {/* 헤더: 라벨 + 초기화 버튼 */}
            <div className="flex items-center justify-between mb-3">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    {label}
                </label>
                {showReset && onReset && (
                    <button onClick={onReset} className={colorClasses[activeColor].reset}>
                        초기화
                    </button>
                )}
            </div>

            {/* 버튼 그룹 */}
            <div className="flex flex-wrap gap-2">
                {/* '전체' 옵션 버튼 */}
                {hasNullOption && (
                    <button
                        type="button"
                        onClick={() => onValueChange(null as T)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedValue === null
                                ? colorClasses[activeColor].active
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {nullLabel}
                    </button>
                )}

                {/* 옵션 버튼들 */}
                {options.map(({ value, label: optionLabel }) => (
                    <button
                        key={String(value)}
                        type="button"
                        onClick={() => onValueChange(value)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedValue === value
                                ? colorClasses[activeColor].active
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {optionLabel}
                    </button>
                ))}
            </div>
        </div>
    );
}
