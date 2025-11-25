'use client';

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type StarRatingProps = {
  /** 현재 별점(0 ~ max), 0.5 단위 지원 */
  value: number;
  /** 최대 별 개수 */
  max?: number;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 크기 */
  size?: 'sm' | 'md' | 'lg';
  /** 변경 시 콜백 함수 */
  onChange?: (nextValue: number) => void;
  /** 커스텀 클래스 */
  className?: string;
  /** 접근성 레이블 */
  ariaLabel?: string;
  /** 반 개 단위 선택 여부 */
  allowHalf?: boolean;
  /** 테마 */
  theme?: 'light' | 'dark';
};

const sizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
} as const;

export default function StarRating({
  value,
  max = 5,
  readOnly,
  disabled,
  size = 'md',
  onChange,
  className,
  theme = 'light',
  ariaLabel = '별점',
  allowHalf = true,
}: StarRatingProps) {
  const [hoverValue, setHoverValue] = React.useState<number | null>(null);
  const interactive = !readOnly && !disabled && typeof onChange === 'function';

  const displayValue = hoverValue ?? value;

  // 키보드로 별점 선택
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const step = allowHalf ? 0.5 : 1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      onChange?.(Math.min(value + step, max));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange?.(Math.max(value - step, 0));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange?.(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange?.(max);
    }
  };

  // 마우스 포인터 위치로 별점 선택
  const pickValueAt = (starIndex: number, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width)); // 0~1
    if (allowHalf) {
      // 왼쪽 절반 → .5, 오른쪽 절반 → .0(다음 정수)
      return (starIndex - 1) + (ratio < 0.5 ? 0.5 : 1.0);
    }
    return starIndex; // half 비활성 시 정수만
  };

  // 별 채우기 비율 계산
  const fillForStar = (starIndex: number) => {
    const unit = displayValue - (starIndex - 1);
    if (unit >= 1) return 1;
    if (unit <= 0) return 0;
    // 중간 값(0~1) → half 허용이면 0.5까지 보여주고, 아니면 반올림
    if (!allowHalf) return unit >= 0.5 ? 1 : 0;
    return unit >= 0.75 ? 1 : unit >= 0.25 ? 0.5 : 0; // 살짝 관용
  };

  return (
    <div
      role="slider"
      aria-label={ariaLabel}
      aria-readonly={!!readOnly}
      aria-disabled={!!disabled}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.round(value * 2) / 2}
      aria-valuetext={`${Math.round(value * 2) / 2}점 / ${max}점`}
      tabIndex={interactive ? 0 : -1}
      onKeyDown={handleKeyDown}
      className={twMerge(
        clsx(
          'cnx-rating inline-flex items-center gap-0.5 select-none',
          disabled && 'opacity-60',
          className
        )
      )}
      onMouseLeave={() => setHoverValue(null)}
    >
      {Array.from({ length: max }, (_, i) => {
        const index = i + 1;
        const fill = fillForStar(index); // 0 | 0.5 | 1 (주로)
        // 공통 클래스
        const starBase = 'relative inline-block';
        const starSize = sizes[size];
        const starHitArea = clsx(
          'block',
          interactive && 'cursor-pointer'
        );
        const emptyColor = theme === 'light' ? 'text-indigo-900 dark:text-gray-100' : 'text-yellow-300';
        const fillColor = theme === 'light' ? 'text-indigo-900 dark:text-gray-100' : 'text-yellow-300';

        const Star = (
          <span
            className={clsx(starBase, starHitArea)}
            onMouseMove={(e) => {
              if (!interactive) return;
              const nextVal = pickValueAt(index, e);
              setHoverValue(Math.max(0, Math.min(max, nextVal)));
            }}
            onClick={(e) => {
              if (!interactive) return;
              const nextVal = pickValueAt(index, e);
              onChange?.(Math.max(0, Math.min(max, nextVal)));
            }}
            title={`${index}점${allowHalf ? ' (0.5 단위)' : ''}`}
          >
            {/* 빈 별 */}
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              className={clsx(starSize, emptyColor)}
              fill="none"
              stroke="currentColor"
            >
              <path d="M5.99854 0.883301C6.02523 0.88335 6.06025 0.88969 6.10889 0.91748C6.12216 0.925108 6.13748 0.93689 6.15381 0.976074V0.977051L7.40381 3.94385L7.521 4.22217L7.8208 4.24854L11.0376 4.52979C11.1062 4.54071 11.1312 4.55722 11.1353 4.56006C11.1544 4.57681 11.1763 4.60289 11.1948 4.65381C11.2068 4.68677 11.2095 4.7164 11.2017 4.75244C11.1992 4.76363 11.1911 4.78781 11.147 4.82764L8.70459 6.93799L8.47607 7.13623L8.54443 7.43018L9.27783 10.5796C9.28414 10.6071 9.28428 10.6232 9.28369 10.6304C9.28316 10.6366 9.28134 10.6398 9.27979 10.6431C9.25703 10.6908 9.22816 10.7264 9.19092 10.7554C9.17196 10.7701 9.14896 10.7811 9.10693 10.7847C9.09171 10.7859 9.07172 10.7854 9.03369 10.7612L9.02295 10.7554L6.25635 9.08838L5.99854 8.93311L5.73975 9.08838L2.97314 10.7544L2.96338 10.7612C2.92555 10.7853 2.90533 10.7859 2.89014 10.7847C2.84778 10.7811 2.82421 10.7702 2.80518 10.7554C2.76793 10.7264 2.73906 10.6909 2.71631 10.6431C2.71478 10.6398 2.7139 10.6365 2.71338 10.6304C2.71278 10.6233 2.71195 10.6072 2.71826 10.5796L3.45166 7.43018L3.52002 7.13623L3.2915 6.93799L0.848145 4.82764C0.804797 4.78835 0.797884 4.76363 0.79541 4.75244C0.787576 4.7164 0.789282 4.68677 0.80127 4.65381C0.819789 4.60299 0.84174 4.57683 0.86084 4.56006C0.864015 4.55775 0.888857 4.54095 0.959473 4.52979L4.17529 4.24854L4.4751 4.22217L4.59229 3.94385L5.84229 0.977051L5.84326 0.976074C5.85972 0.936567 5.87482 0.925114 5.88818 0.91748C5.93693 0.889651 5.97182 0.883301 5.99854 0.883301Z"/>
            </svg>

            {/* 채워진 별 (width로 마스킹) */}
            <span
              className={clsx('absolute inset-0 overflow-hidden', fill > 0 ? 'block' : 'hidden')}
              style={{ width: `${fill * 100}%` }}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                className={clsx(starSize, fillColor, 'transition-[width] duration-150')}
                fill="currentColor"
              >
              <path d="M5.99854 0.883301C6.02523 0.88335 6.06025 0.88969 6.10889 0.91748C6.12216 0.925108 6.13748 0.93689 6.15381 0.976074V0.977051L7.40381 3.94385L7.521 4.22217L7.8208 4.24854L11.0376 4.52979C11.1062 4.54071 11.1312 4.55722 11.1353 4.56006C11.1544 4.57681 11.1763 4.60289 11.1948 4.65381C11.2068 4.68677 11.2095 4.7164 11.2017 4.75244C11.1992 4.76363 11.1911 4.78781 11.147 4.82764L8.70459 6.93799L8.47607 7.13623L8.54443 7.43018L9.27783 10.5796C9.28414 10.6071 9.28428 10.6232 9.28369 10.6304C9.28316 10.6366 9.28134 10.6398 9.27979 10.6431C9.25703 10.6908 9.22816 10.7264 9.19092 10.7554C9.17196 10.7701 9.14896 10.7811 9.10693 10.7847C9.09171 10.7859 9.07172 10.7854 9.03369 10.7612L9.02295 10.7554L6.25635 9.08838L5.99854 8.93311L5.73975 9.08838L2.97314 10.7544L2.96338 10.7612C2.92555 10.7853 2.90533 10.7859 2.89014 10.7847C2.84778 10.7811 2.82421 10.7702 2.80518 10.7554C2.76793 10.7264 2.73906 10.6909 2.71631 10.6431C2.71478 10.6398 2.7139 10.6365 2.71338 10.6304C2.71278 10.6233 2.71195 10.6072 2.71826 10.5796L3.45166 7.43018L3.52002 7.13623L3.2915 6.93799L0.848145 4.82764C0.804797 4.78835 0.797884 4.76363 0.79541 4.75244C0.787576 4.7164 0.789282 4.68677 0.80127 4.65381C0.819789 4.60299 0.84174 4.57683 0.86084 4.56006C0.864015 4.55775 0.888857 4.54095 0.959473 4.52979L4.17529 4.24854L4.4751 4.22217L4.59229 3.94385L5.84229 0.977051L5.84326 0.976074C5.85972 0.936567 5.87482 0.925114 5.88818 0.91748C5.93693 0.889651 5.97182 0.883301 5.99854 0.883301Z"/>
              </svg>
            </span>
          </span>
        );

        return <span key={index}>{Star}</span>;
      })}
    </div>
  );
}