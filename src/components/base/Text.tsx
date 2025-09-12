import React from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type TextElement = 'p' | 'span' | 'div';

type TextProps = {
  element?: TextElement;
  children: React.ReactNode;
  className?: string;
};

export default function Text({ element = 'p', children, className }: TextProps) {
  return React.createElement(
    element,
    {
      className: twMerge(
        clsx(
          'cnx-text text-gray-900 dark:text-gray-100 text-base leading-relaxed',
          className
        )
      )
    },
    children
  );
}