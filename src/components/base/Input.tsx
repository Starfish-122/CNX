'use client';

import React, { forwardRef, useId } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

type InputSize = 'sm' | 'md' | 'lg';
type InputType = 'text' | 'password' | 'email' | 'number' | 'tel';
type InputStyle = 'default' | 'outlined' | 'filled' | 'underline';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> {
  /** 크기 */
  size?: InputSize;
  /** 타입 */
  type?: InputType;
  /** 스타일 */
  variant: InputStyle;
  /** 라벨 텍스트 */
  label?: string;
  /** 힌트 메시지 */
  hint?: string;
  /** 에러 메시지 */
  error?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 필수 입력 여부 */
  required?: boolean;
  /** aria-invalid 토글 */
  invalid?: boolean;
  /** 시작 adornment (아이콘, 버튼 등) */
  startAdornment?: React.ReactNode;
  /** 끝 adornment (아이콘, 버튼 등) */
  endAdornment?: React.ReactNode;
  /** 커스텀 클래스 */
  className?: string;
  /** InputArea 컨테이너 클래스 */
  containerClassName?: string;
}

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

const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  type = 'text',
  variant = 'default',
  label,
  hint,
  error,
  disabled = false,
  required = false,
  invalid = false,
  startAdornment,
  endAdornment,
  className,
  containerClassName,
  ...props
}, ref) => {
  const id = useId();
  const inputId = `input-${id}`;
  const hintId = `hint-${id}`;
  const errorId = `error-${id}`;
  
  const hasError = !!error || invalid;
  const isDisabled = disabled;
  
  // aria-describedby 설정
  const ariaDescribedBy = [
    hint && !hasError ? hintId : null,
    hasError ? errorId : null,
  ].filter(Boolean).join(' ');

  const inputElement = (
    <input
      ref={ref}
      id={inputId}
      type={type}
      disabled={isDisabled}
      {...(hasError && { 'aria-invalid': true })}
      {...(ariaDescribedBy && { 'aria-describedby': ariaDescribedBy })}
      className={twMerge(
        clsx(
          'cnx-text text-gray-900 dark:text-gray-100 text-base leading-relaxed rounded-md transition-colors duration-200',
          SIZE_MAP[size],
          VARIANT_MAP[variant],
          hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          startAdornment && 'pl-10',
          endAdornment && 'pr-10',
          className
        )
      )}
      {...props}
    />
  );

  return (
    <div className={twMerge('w-full', containerClassName)}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={twMerge(
            clsx(
              'cnx-text block font-medium mb-2',
              SIZE_MAP[size],
              isDisabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300',
              required && 'after:content-["*"] after:text-red-500 after:ml-1'
            )
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        {startAdornment && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
            <span className={clsx(
              'text-gray-400 dark:text-gray-500',
              SIZE_MAP[size]
            )}>
              {startAdornment}
            </span>
          </div>
        )}
        
        {inputElement}
        
        {endAdornment && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
            <span className={clsx(
              'text-gray-400 dark:text-gray-500',
              SIZE_MAP[size]
            )}>
              {endAdornment}
            </span>
          </div>
        )}
      </div>

      {hint && !hasError && (
        <p
          id={hintId}
          className={twMerge(
            clsx(
              'cnx-text mt-2',
              SIZE_MAP[size],
              'text-gray-500 dark:text-gray-400'
            )
          )}
        >
          {hint}
        </p>
      )}

      {hasError && (
        <p
          id={errorId}
          role="alert"
          className={twMerge(
            clsx(
              'cnx-text mt-2',
              SIZE_MAP[size],
              'text-red-500 dark:text-red-400'
            )
          )}
        >
          {error || '입력값을 확인해주세요.'}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;