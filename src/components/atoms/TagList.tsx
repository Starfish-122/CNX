'use client';

import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type TagListProps = {
  children: React.ReactNode;
  gap?: 'sm' | 'md' | 'lg';
  wrap?: boolean;
  className?: string;
};

const GAP_MAP = { sm: 'gap-1.5', md: 'gap-3', lg: 'gap-4' };

export default function TagList({
  children,
  gap = 'md',
  wrap = true,
  className,
}: TagListProps) {
  return (
    <div
      className={twMerge(
        clsx('cnx-taglist inline-flex items-center', wrap ? 'flex-wrap' : 'flex-nowrap', GAP_MAP[gap], className)
      )}
    >
      {children}
    </div>
  );
}
