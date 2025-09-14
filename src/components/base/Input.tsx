import React, { forwardRef } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type InputSize = 'sm' | 'md' | 'lg';
type InputType = 'text' | 'password' | 'email' | 'number' | 'tel';
type InputStyle = 'default' | 'outlined' | 'filled' | 'underline';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** 크기 */
  size?: InputSize;
  /** 타입 */
  type?: InputType;
  /** 스타일 */
  variant: InputStyle;
  /** aria-invalid 토글 */
  invalid?: boolean;
  /** aria-describedby 연결 */
  describedBy?: string;
  /** 커스텀 클래스 */
  className?: string;
  /** 버튼 추가 */
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
};

const SIZE_MAP: Record<InputSize, string> = {
  sm: 'text-sm px-2.5 py-1',
  md: 'text-base px-4 py-1.5',
  lg: 'text-lg px-5 py-2',
}

const VARIANT_MAP: Record<InputStyle, string> = {
  default: 'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
  outlined: 'bg-transparent border border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
  filled: 'bg-gray-100 dark:bg-gray-800 border border-transparent focus:bg-white dark:focus:bg-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
  underline: 'bg-transparent border-b border-gray-300 dark:border-gray-700 focus:border-b-2 focus:border-blue-500 focus:ring-0 rounded-none',
}

const Input = ({
  size = 'md',
  type = 'text',
  variant = 'default',
  invalid = false
}: InputProps) => {
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

export default Input;