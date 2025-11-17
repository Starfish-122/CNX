'use client';

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
            class: 'filter__distance',
            active: 'filter__button--active',
            reset: 'filter__button--reset',
        },
        yellow: {
            class: 'filter__rating',
            active: 'filter__button--active',
            reset: 'filter__button--reset',
        },
    };

    return (
        <div className={`filter-item col-span-2 ${colorClasses[activeColor].class}`}>
            {/* 헤더: 라벨 + 초기화 버튼 */}
            <div className="flex items-center justify-start gap-6 lg:justify-between mb-3 h-8">
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
                                : 'filter__button'
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
                                : 'filter__button'
                        }`}
                    >
                        {optionLabel}
                    </button>
                ))}
            </div>
        </div>
    );
}
