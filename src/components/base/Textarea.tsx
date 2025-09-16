'use client';

import React, { forwardRef, useId, useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';

type TextareaSize = 'sm' | 'md' | 'lg' | 'full';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'children'> {
  /** 크기 */
  size?: TextareaSize;
  /** 라벨 텍스트 */
  label?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 필수 입력 여부 */
  required?: boolean;
  /** 리셋 버튼 표시 여부 */
  showResetButton?: boolean;
  /** 리셋 버튼 클릭 핸들러 */
  onReset?: () => void;
  /** 글자 수 표시 여부 */
  showCharCount?: boolean;
  /** 리사이즈 가능 여부 */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
  /** 커스텀 클래스 */
  className?: string;
}

const SIZE = {
  sm: {
    field: 'text-sm leading-relaxed px-2.5 py-1',
    fieldWithButton: 'text-sm leading-relaxed px-2.5 py-1 pr-8',
    label: 'text-sm',
    icon: 'sm',
    container: '',
    buttonPosition: 'right-6'
  },
  md: {
    field: 'text-base leading-relaxed px-4 py-1.5',
    fieldWithButton: 'text-base leading-relaxed px-4 py-1.5 pr-10',
    label: 'text-base',
    icon: 'md',
    container: '',
    buttonPosition: 'right-3'
  },
  lg: {
    field: 'text-lg leading-relaxed px-5 py-2',
    fieldWithButton: 'text-lg leading-relaxed px-5 py-2 pr-12',
    label: 'text-base',
    icon: 'lg',
    container: '',
    buttonPosition: 'right-2'
  },
  full: {
    field: 'text-base leading-relaxed px-4 py-1.5 w-full',
    fieldWithButton: 'text-base leading-relaxed px-4 py-1.5 w-full pr-10',
    label: 'text-base',
    icon: 'md',
    container: 'w-full',
    buttonPosition: 'right-3'
  },
} as const;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  size = 'md',
  label = '',
  disabled = false,
  required = false,
  showResetButton = false,
  showCharCount = false,
  resize = 'none',
  onReset,
  className,
  ...props
}, ref) => {
  const id = useId();
  const textareaId = `textarea-${id}`;

  const s = SIZE[size];
  const isControlled = props.value !== undefined;
  const [innerValue, setInnerValue] = useState<string>(() => (props.defaultValue as string) ?? '');
  const currentValue = isControlled ? String(props.value ?? '') : innerValue;
  
  const hasValue = currentValue.trim().length > 0;
  const isRequiredEmpty = required && !hasValue;
  const hasError = isRequiredEmpty;
  const currentLength = currentValue.length;
  const maxLength = props.maxLength || 0;
  const isNearLimit = maxLength > 0 && currentLength > maxLength * 0.8;
  const isOverLimit = maxLength > 0 && currentLength > maxLength;

  const isDisabled = disabled;
  const shouldShowResetButton = showResetButton && hasValue;
  const shouldShowCharCount = showCharCount && (maxLength > 0 || currentLength > 0);
  const hasButton = showResetButton || showCharCount;

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (!isControlled) setInnerValue(e.target.value);
    props.onChange?.(e);
  };
  
  const handleReset = () => {
    if (!isControlled) setInnerValue('');
    onReset?.(); // 제어형이면 부모가 여기서 상태를 ''로 바꿔줘야 함
  };

  const textareaElement = (
    <textarea
      ref={ref}
      id={textareaId}
      disabled={isDisabled}
      required={required}
      placeholder={props.placeholder ?? ' '}
      value={currentValue}
      onChange={handleChange}
      {...(hasError && { 'aria-invalid': true })}
      className={twMerge(
        clsx(
          // base
          'cnx-textarea text-gray-900 border border-gray-900 rounded-md transition-shadow outline-none ' + 
          'focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-offset-0 ' +
          // dark
          'dark:text-gray-100 dark:border-gray-100 ',
          // disabled
          'disabled:border-gray-400 disabled:cursor-not-allowed disabled:dark:bg-gray-800',
          // readonly
          'read-only:text-gray-500 read-only:border-gray-400 read-only:focus:ring-0 read-only:focus:border-gray-400',
          // error
          hasError && 'border-[var(--color-error)] text-[var(--color-error)] placeholder:text-[var(--color-error)] focus:ring-[var(--color-error)] focus:border-[var(--color-error)]',
          // resize
          resize === 'none' && 'resize-none',
          resize === 'both' && 'resize',
          resize === 'horizontal' && 'resize-x',
          resize === 'vertical' && 'resize-y',
          // field styles - 버튼이 있을 때와 없을 때 구분
          hasButton ? s.fieldWithButton : s.field,
          className
        )
      )}
      {...props}
    />
  );

  return (
    <span className={clsx(
        'cnx-textarea-container relative',
        label ? 'inline-flex flex-col w-fit' : 'inline-block',
        s.container
      )
    }>
      {label && (
        <label
          htmlFor={textareaId}
          className={twMerge(
            clsx(
              'cnx-textarea-label inline-block font-medium mb-2 relative',
              s.label,
              isDisabled ? 'text-gray-400 dark:text-gray-600' : 'text-gray-700 dark:text-gray-300',
              required && 'after:content-["*"] after:text-red-500 after:ml-1'
            )
          )}
        >
          {label}
        </label>
      )}

      <span className={clsx(
        'relative',
        size === 'full' ? 'block' : 'inline-block'
      )}>
        {textareaElement}
        
        {/* 리셋 버튼 */}
        {shouldShowResetButton && (
          <button
            type="button"
            className={clsx(
              'absolute top-3 right-3 flex items-center pointer-events-auto hover:bg-gray-100 dark:hover:bg-gray-800 rounded p-1',
              s.buttonPosition
            )}
            onClick={handleReset}
            aria-label="입력값 지우기"
          >
            <Icon
              name="close"
              className={clsx(
                'text-gray-400 dark:text-gray-500',
                s.icon
              )}
            />
          </button>
        )}

        {/* 글자 수 표시 */}
        {shouldShowCharCount && (
          <div className="absolute bottom-2 right-2 text-xs">
            <span
              className={clsx(
                'text-gray-500 dark:text-gray-400',
                isOverLimit && 'text-red-500 dark:text-red-400',
                isNearLimit && !isOverLimit && 'text-yellow-500 dark:text-yellow-400'
              )}
            >
              {maxLength > 0 ? `${currentLength}/${maxLength}` : currentLength}
            </span>
          </div>
        )}

        {/* 에러 메시지 */}
        {hasError && (
          <span
            role="alert"
            className={twMerge(
              clsx(
                'cnx-text block mt-2 text-[var(--color-error)]',
                s.label,
              )
            )}
          >
            {isRequiredEmpty ? '필수 입력 항목입니다.' : '입력값을 확인해주세요.'}
          </span>
        )}
      </span>
    </span>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
