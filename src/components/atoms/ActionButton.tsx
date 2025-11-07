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
};

export default function ActionButton({
    icon,
    label,
    onClick,
    variant = 'button',
    iconSize = 'xs',
    className,
    children,
}: ActionButtonProps) {
    const isButton = variant === 'button';

    const Component = isButton ? 'button' : 'div';

    return (
        <Component
            onClick={isButton ? onClick : undefined}
            className={twMerge(
                clsx(
                    'inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full text-white text-sm',
                    isButton && 'hover:bg-white/30 transition-colors cursor-pointer',
                    className
                )
            )}
        >
            {icon && <Icon name={icon} size={iconSize} className="text-white" />}
            {label !== undefined && <span className="font-medium">{label}</span>}
            {children}
        </Component>
    );
}

