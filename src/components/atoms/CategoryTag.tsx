'use client';

import React from 'react';
import Tag from './Tag';
import { CATEGORY_COLOR, NEUTRAL, type TagCategory } from './categoryColors';

type CategoryTagProps = {
  label: string;
  category?: TagCategory;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

export default function CategoryTag({
  label,
  category,
  disabled,
  size = 'md',
  className,
}: CategoryTagProps) {
  const palette = category ? CATEGORY_COLOR[category] : NEUTRAL;
  return (
    <Tag
      label={label}
      palette={palette}
      disabled={disabled}
      size={size}
      className={className}
    />
  );
}
