'use client';

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';

type ActionButtonProps = {
    /** 아이콘 이름 */
    icon?: string;
    /** 라벨 (텍스트 또는 숫자) */
    label?: string | number;
    /** 클릭 핸들러 */
    onClick?: () => void;
    /** 버튼 타입 (info는 클릭 불가) */
    variant?: 'button' | 'info';
    /** 아이콘 크기 */
    iconSize?: 'xs' | 'sm' | 'md';
    /** 커스텀 클래스 */
    className?: string;
    /** children (커스텀 컨텐츠) */
    children?: React.ReactNode;
    /** 활성 상태 (좋아요 등) */
    isActive?: boolean;
};

export default function ActionButton({
    icon,
    label,
    onClick,
    variant = 'button',
    iconSize = 'xs',
    className,
    children,
    isActive = false,
}: ActionButtonProps) {
    const isButton = variant === 'button';

    const Component = isButton ? 'button' : 'div';

    return (
        <Component
            onClick={isButton ? onClick : undefined}
            className={twMerge(
                clsx(
                    'inline-flex items-center gap-1.5 backdrop-blur-sm px-3 py-2 rounded-full text-white text-sm transition-colors',
                    isActive ? 'bg-red-500/80 hover:bg-red-600/80' : 'bg-white/20',
                    isButton && !isActive && 'hover:bg-white/30',
                    isButton && 'cursor-pointer',
                    className
                )
            )}
        >
            {icon && (
                <Icon
                    name={icon}
                    size={iconSize}
                    className={clsx('transition-colors', isActive ? 'text-white' : 'text-white')}
                />
            )}
            {label !== undefined && <span className="font-medium">{label}</span>}
            {children}
        </Component>
    );
}

