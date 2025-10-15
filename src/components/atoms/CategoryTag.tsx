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

const renderLabel = (label: string) => {
  return label.split(', ');
}

export default function CategoryTag({
  label,
  category,
  disabled,
  size = 'md',
  className,
}: CategoryTagProps) {
  const palette = category ? CATEGORY_COLOR[category] : NEUTRAL;
  const labels = renderLabel(label); /* 문자열 분리한 결과 */
  return (
    <>
      {labels.map((lbl, index) => (
        <Tag
          key={index}
          label={lbl}
          palette={palette}
          disabled={disabled}
          size={size}
          className={className}
        />
      ))}
    </>
  );
}
