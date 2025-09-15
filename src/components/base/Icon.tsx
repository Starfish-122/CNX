'use client';
import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// 크기별 스타일 상수 정의
const SIZE_STYLES = {
    xs: { fontSize: 'var(--font-size-xs)' },
    sm: { fontSize: 'var(--font-size-sm)' },
    base: { fontSize: 'var(--font-size-base)' },
    md: { fontSize: 'var(--font-size-2xl)' },
    lg: { fontSize: 'var(--font-size-3xl)' },
    xl: { fontSize: 'var(--font-size-4xl)' },
    xxl: { fontSize: 'var(--font-size-5xl)' },
} as const;

export interface IconProps {
    /** 아이콘 이름 (Google Material Icons) */
    name: string;
    /** 아이콘 크기 */
    size?: keyof typeof SIZE_STYLES;
    /** 채워진 스타일 여부 */
    filled?: boolean;
    /** 테일윈드 텍스트 색상 클래스 또는 CSS 색상 값 */
    color?: string;
    /** 클릭 가능 여부 (호버 효과 추가) */
    clickable?: boolean;
    /** 아이콘 이름 또는 텍스트 표시 여부 */
    showText?: boolean;
    /** 텍스트와 아이콘의 가로 정렬 여부 */
    horizontal?: boolean;
    /** 클릭 이벤트 핸들러 */
    onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
    /** 추가 CSS 클래스 */
    className?: string;
    /** 아이콘과 함께 표시할 텍스트 (미지정 시 아이콘 이름 표시) */
    text?: string;
    /** 텍스트 색상 (아이콘 색상과 다르게 설정할 경우) */
    textColor?: string;
}

const Icon = ({
    name,
    size = 'md',
    filled = false,
    color = 'text-gray-700',
    clickable = false,
    horizontal = false,
    showText = false,
    onClick,
    className,
    text,
    textColor,
    ...props
}: IconProps) => {
    const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;
    const isTailwindClass = (className?: string) =>
        className && (className.startsWith('text-') || className.startsWith('bg-'));

    const isColorClass = isTailwindClass(color);
    const isTextColorClass = isTailwindClass(textColor);

    // 직접 CSS 색상을 사용하는 경우
    const colorStyle = !isColorClass && color ? { color } : undefined;

    const iconStyle = {
        ...sizeStyle,
        ...(colorStyle || {}),
    };

    const displayText = text || name;

    return (
        <span
            className={twMerge(
                clsx(
                    'flex items-center',
                    horizontal ? 'flex-row gap-1' : 'flex-col gap-0.5',
                    clickable &&
                        'cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80',
                    isColorClass ? color : '',
                    className
                )
            )}
            style={colorStyle}
            onClick={clickable || onClick ? onClick : undefined}
            role={clickable || onClick ? 'button' : undefined}
            tabIndex={clickable || onClick ? 0 : undefined}
        >
            <span
                className={twMerge(
                    clsx(
                        'material-symbols-outlined font-normal leading-none inline-block whitespace-nowrap',
                        filled ? 'material-fill-1' : 'material-fill-0'
                    )
                )}
                style={iconStyle}
                {...props}
            >
                {name}
            </span>
            {showText && (
                <span
                    className={twMerge(
                        clsx('text-sm', isTextColorClass ? textColor : isColorClass ? color : '')
                    )}
                    style={!isTextColorClass && textColor ? { color: textColor } : colorStyle}
                >
                    {displayText}
                </span>
            )}
        </span>
    );
};

export default Icon;
