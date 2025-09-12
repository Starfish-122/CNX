'use client';

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type TagSize = 'sm' | 'md';

export type TagPalette = {
  base: string;    // 필수: 배경/텍스트
  hover?: string;  // 선택: hover 배경
};

type TagProps = {
  /** 태그 라벨 */
  label: string;
  /** 색상 팔레트 (기본값: NEUTRAL) */
  palette?: TagPalette;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 크기 */
  size?: TagSize;
  /** 커스텀 클래스 */
  className?: string;
};

// 크기 매핑
const SIZE_MAP: Record<TagSize, string> = {
  sm: 'text-xs px-2.5 py-1',
  md: 'text-sm px-4 py-1',
};

// 기본 팔레트
const NEUTRAL: TagPalette = {
  base: 'bg-slate-200 text-gray-900 dark:bg-slate-700 dark:text-gray-100'
};

export default function Tag({
  label,
  palette = NEUTRAL,
  disabled,
  size = 'md',
  className,
}: TagProps) {
  return (
    <span
      className={twMerge(
        clsx(
          'cnx-tag inline-flex items-center rounded-full font-semibold transition-colors duration-200',
          SIZE_MAP[size],
          palette?.base,
          !disabled && palette?.hover,
          disabled && 'opacity-60 cursor-not-allowed',
          className
        )
      )}
    >
      {label}
    </span>
  );
}
