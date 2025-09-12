'use client';
import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type TitleProps = {
  /** 타이틀 태그 */
  element?: React.ElementType;
  /** 타이틀 내용 */
  children: React.ReactNode;
  /** 커스텀 클래스 */
  className?: string;
  /** (a 태그 전용) 링크 속성 */
  href?: string;
  /** (a 태그 전용) 링크 타겟 */
  target?: React.AnchorHTMLAttributes<HTMLAnchorElement>['target'];
};

export default function Title({
  element = 'strong',
  children,
  className,
  href,
  target,
}: TitleProps) {
  const rel = target === '_blank' ? 'noopener noreferrer' : undefined; // 보안 관련 코드

  return React.createElement(
    element,
    {
      ...(element === 'a' && { href, target, rel }),
      className: twMerge(
        clsx(
          'cnx-title block font-bold tracking-tight',
          'text-gray-900 dark:text-gray-100 leading-snug text-3xl',
          className
        )
      ),
    },
    children
  );
}