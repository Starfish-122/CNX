'use client';

import React, { forwardRef, useId, useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Icon from './Icon';

type InputSize = 'sm' | 'md' | 'lg' | 'full';
type InputType = 'text' | 'password' | 'email' | 'number' | 'tel';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'children'> {
  /** 크기 */
  size?: InputSize;
  /** 타입 */
  type?: InputType;
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
  // startAdornment?: React.ReactNode;
  /** 끝 adornment (아이콘, 버튼 등) */
  // endAdornment?: React.ReactNode;
  /** 비밀번호 토글 버튼 표시 여부 */
  showPasswordToggle?: boolean;
  /** 리셋 버튼 표시 여부 */
  showResetButton?: boolean;
  /** 리셋 버튼 클릭 핸들러 */
  onReset?: () => void;
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

const Input = forwardRef<HTMLInputElement, InputProps>(({
  size = 'md',
  type = 'text',
  label = '',
  hint,
  error,
  disabled = false,
  required = false,
  invalid = false,
  // startAdornment,
  // endAdornment,
  showPasswordToggle = false,
  showResetButton = false,
  onReset,
  className,
  ...props
}, ref) => {
  const id = useId();
  const inputId = `input-${id}`;
  const hintId = `hint-${id}`;
  const errorId = `error-${id}`;

  const s = SIZE[size];
  const isControlled = props.value !== undefined;
  const [innerValue, setInnerValue] = useState<string>(() => (props.defaultValue as string) ?? '');
  const currentValue = isControlled ? String(props.value ?? '') : innerValue;
  
  const [showPassword, setShowPassword] = useState(false);
  
  const hasValue = currentValue.trim().length > 0;
  const isRequiredEmpty = required && !hasValue;
  const hasError = !!error || invalid || isRequiredEmpty;
  const hasHint = !!hint && !hasError;

  const isDisabled = disabled;
  const isPassword = type === 'password';
  const currentType = (isPassword && showPassword) ? 'text' : type;
  
  // 자동으로 비밀번호 토글 표시 (type이 password이고 showPasswordToggle이 true일 때)
  const shouldShowPasswordToggle = isPassword && showPasswordToggle;
  const shouldShowResetButton = showResetButton && hasValue;
  const hasButton = shouldShowPasswordToggle || showResetButton;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!isControlled) setInnerValue(e.target.value);
    props.onChange?.(e);
  };
  const handleReset = () => {
    if (!isControlled) setInnerValue('');
    onReset?.(); // 제어형이면 부모가 여기서 상태를 ''로 바꿔줘야 함
  };

  
  
  // aria-describedby 설정
  const ariaDescribedBy = [
    hint && !hasError ? hintId : null,
    hasError ? errorId : null,
  ].filter(Boolean).join(' ');

  const inputElement = (
    <input
      ref={ref}
      id={inputId}
      type={currentType}
      disabled={isDisabled}
      required={required}
      placeholder={props.placeholder ?? ' '}
      value={currentValue}
      onChange={handleChange}
      {...(hasError && { 'aria-invalid': true })}
      {...(ariaDescribedBy && { 'aria-describedby': ariaDescribedBy })}
      className={twMerge(
        clsx(
          // base
          'cnx-input peer text-gray-900 border border-gray-900 rounded-md transition-shadow outline-none ' + 
          'focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] focus:ring-offset-0 ' +
          // dark
          'dark:text-gray-100 dark:border-gray-100 ',
          // disabled
          'disabled:border-gray-400 disabled:cursor-not-allowed disabled:dark:bg-gray-800',
          // readonly
          'read-only:text-gray-500 read-only:border-gray-400 read-only:focus:ring-0 read-only:focus:border-gray-400',
          hasButton ? s.fieldWithButton : s.field,
          hasError && 'border-[var(--color-error)] text-[var(--color-error)] placeholder:text-[var(--color-error)] focus:ring-[var(--color-error)] focus:border-[var(--color-error)] ',
          // startAdornment && 'pl-10',
          // (endAdornment || shouldShowPasswordToggle || shouldShowResetButton) && 'pr-10',
          className
        )
      )}
      {...props}
    />
  );

  return (
    <span className={clsx(
        'cnx-input-container relative',
        label ? 'inline-flex flex-col w-fit' : 'inline-block',
        s.container
      )
    }>
      {label && (
        <label
          htmlFor={inputId}
          className={twMerge(
            clsx(
              'cnx-input-label inline-block font-medium mb-2 relative',
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
        {inputElement}
        
        {/* 비밀번호 토글 버튼 */}
        {shouldShowPasswordToggle && (
          <button
            type="button"
            className={clsx(
              'absolute top-1/2 transform -translate-y-1/2 flex items-center pointer-events-auto hover:bg-gray-100 dark:hover:bg-gray-800 rounded p-1',
              s.buttonPosition
            )}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            <Icon
              name={showPassword ? 'visibility_off' : 'visibility'}
              className={clsx(
                'text-gray-400 dark:text-gray-500',
                s.icon
              )}
            />
          </button>
        )}
        
        {/* 리셋 버튼 */}
        {shouldShowResetButton && (
          <button
            type="button"
            className={clsx(
              'absolute top-1/2 transform -translate-y-1/2 flex items-center pointer-events-auto hover:bg-gray-100 dark:hover:bg-gray-800 rounded p-1',
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

        {hasHint && (
          <span
            id={hintId}
            className={twMerge(
              clsx(
                'hidden cnx-text mt-2 text-gray-500 dark:text-gray-400 peer-focus:block peer-[&:not(:placeholder-shown)]:hidden',
                s.label,
              )
            )}
          >
            {hint}
          </span>
        )}

        {hasError && (
          <span
            id={errorId}
            role="alert"
            className={twMerge(
              clsx(
                'cnx-text block mt-2 text-[var(--color-error)]',
                s.label,
              )
            )}
          >
            {error || (isRequiredEmpty ? '필수 입력 항목입니다.' : '입력값을 확인해주세요.')}
          </span>
        )}
      </span>
    </span>
  );
});

Input.displayName = 'Input';

export default Input;