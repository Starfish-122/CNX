'use client';
import React from 'react';
import clsx from 'clsx';

export interface IconProps {
    name: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    filled?: boolean;
    color?: string;
    clickable?: boolean;
    onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void;
    className?: string;
    [key: string]: any;
}

// 크기별 테일윈드 클래스 매핑
const SIZE_CLASSES = {
    xs: 'text-xs', // 0.75rem
    sm: 'text-base', // 1rem
    md: 'text-2xl', // 1.5rem
    lg: 'text-3xl', // 2rem
    xl: 'text-4xl', // 2.5rem
    xxl: 'text-5xl', // 3rem
};

/**
 * Icon 컴포넌트
 * Google Fonts Material Symbols 아이콘
 * 
 * @param {string} name - 아이콘 이름
 * @param {string} size - 아이콘 크기 ('xs', 'sm', 'md', 'lg', 'xl', 'xxl')
 * @param {boolean} filled - 채워진 스타일 여부
 * @param {string} color - 아이콘 색상
 * @param {boolean} clickable - 클릭 가능 여부
 * @param {function} onClick - 클릭 이벤트 핸들러
 * @param {string} className - 추가 CSS 클래스
 * @param {object} props - 기타 props
 */
const Icon = ({
    name,
    size = 'md',
    filled = false,
    color,
    clickable = false,
    onClick,
    className,
    ...props
}: IconProps) => {
    const sizeClass = SIZE_CLASSES[size] || SIZE_CLASSES.md;
    
    return (
        <span
            className={clsx(
                'material-symbols-outlined',
                'font-normal leading-none',
                'inline-block whitespace-nowrap align-middle',
                sizeClass,
                clickable && 'cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80',
                !clickable && 'cursor-default',
                className
            )}
            onClick={onClick}
            style={{
                color: color || '#374151', // 기본 색상
                fontVariationSettings: filled 
                    ? "'FILL' 1, 'GRAD' 0, 'opsz' 24" 
                    : "'FILL' 0, 'GRAD' 0, 'opsz' 24",
                fontFamily: "'Material Symbols Outlined', 'Material Icons', sans-serif",
                fontFeatureSettings: "'liga'",
                WebkitFontFeatureSettings: "'liga'",
                WebkitFontSmoothing: 'antialiased',
                textTransform: 'none',
                letterSpacing: 'normal',
                direction: 'ltr',
                wordWrap: 'normal'
            }}
            {...props}
        >
            {name}
        </span>
    );
};

export default Icon;