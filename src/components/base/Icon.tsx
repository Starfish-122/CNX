'use client';
import React from 'react';
import clsx from 'clsx';

export interface IconProps {
    name: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    filled?: boolean;
    color?: string;
    clickable?: boolean;
    showName?: boolean;
    onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
    className?: string;
    [key: string]: unknown;
}

/**
 * Icon 컴포넌트
 * Google Fonts Material Symbols 아이콘
 * 
 * @param {string} name - 아이콘 이름
 * @param {string} size - 아이콘 크기 ('xs', 'sm', 'md', 'lg', 'xl', 'xxl')
 * @param {boolean} filled - 채워진 스타일 여부
 * @param {string} color - 테일윈드 텍스트 색상 클래스 (예: 'text-red-500') 또는 CSS 색상 값
 * @param {boolean} clickable - 클릭 가능 여부
 * @param {boolean} showName - 아이콘 이름 표시 여부
 * @param {function} onClick - 클릭 이벤트 핸들러
 * @param {string} className - 추가 CSS 클래스
 * @param {object} props - 기타 props
 */

const SIZE_STYLES = {
    xs: { fontSize: 'var(--font-size-xs)' }, 
    sm: { fontSize: 'var(--font-size-sm)' }, 
    base: { fontSize: 'var(--font-size-base)' }, 
    md: { fontSize: 'var(--font-size-2xl)' }, 
    lg: { fontSize: 'var(--font-size-3xl)' }, 
    xl: { fontSize: 'var(--font-size-4xl)' }, 
    xxl: { fontSize: 'var(--font-size-5xl)' }, 
};

const Icon = ({
    name,
    size = 'md',
    filled = false,
    color = 'text-gray-700', 
    clickable = false,
    showName = false,
    onClick,
    className,
    ...props
}: IconProps) => {
    const sizeStyle = SIZE_STYLES[size] || SIZE_STYLES.md;
    const isColorClass = color && (color.startsWith('text-') || color.startsWith('bg-'));
    
    const colorStyle = !isColorClass && color ? { color } : undefined;
    
    return (
        <span 
            className={clsx(
                'flex flex-col items-center',
                clickable && 'cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80',
                className,
                isColorClass ? color : ''
            )}
            style={colorStyle}
            onClick={onClick}
        >
            <span 
                className={clsx(
                    'material-symbols-outlined font-normal leading-none inline-block whitespace-nowrap',
                    filled ? 'material-fill-1' : 'material-fill-0'
                )}
                style={{
                    ...sizeStyle,
                    ...(colorStyle || {})
                }}
                {...props}
            >
                {name}
            </span>
            {showName && (
                <span 
                    className={clsx(
                        "mt-2 text-sm", 
                        isColorClass ? color : ''
                    )}
                    style={colorStyle}
                >
                    {name}
                </span>
            )}
        </span>
    );
};

export default Icon;