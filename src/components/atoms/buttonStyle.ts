import clsx from 'clsx';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'full';
export type ButtonVariant = 'solid' | 'outline' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export const SIZE = {
  sm: 'text-sm leading-5 px-3 py-1',
  md: 'text-base leading-6 px-4 py-1.5',
  lg: 'text-lg leading-7 px-5 py-2',
  full: 'text-lg leading-7 py-2 w-full',
} as const;

export function ButtonClass({
  variant = 'solid',
  color = 'primary',
  size = 'md',
  extra
}: {
  variant?: ButtonVariant,
  color?: ButtonColor,
  size?: ButtonSize,
  extra?: string
}) {
  const colorMap = {
    primary: {
      solid: 'bg-[var(--color-primary)] text-white hover:opacity-90',
      outline: 'border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
      text: 'text-[var(--color-primary)] hover:underline'
    },
    secondary: {
      solid: 'bg-gray-600 text-white hover:opacity-90',
      outline: 'border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white',
      text: 'text-gray-600 hover:underline'
    },
    success: {
      solid: 'bg-green-600 text-white hover:opacity-90',
      outline: 'border-green-600 text-green-600 hover:bg-green-600 hover:text-white',
      text: 'text-green-600 hover:underline'
    },
    warning: {
      solid: 'bg-yellow-500 text-white hover:opacity-90',
      outline: 'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white',
      text: 'text-yellow-500 hover:underline'
    },
    error: {
      solid: 'bg-red-600 text-white hover:opacity-90',
      outline: 'border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
      text: 'text-red-600 hover:underline'
    },
    info: {
      solid: 'bg-blue-600 text-white hover:opacity-90',
      outline: 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      text: 'text-blue-600 hover:underline'
    }
  } as const;

  const variantMap = {
    solid: `
      ${colorMap[color].solid}
      hover:cursor-pointer
      disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:opacity-60
    `,
    outline: `
      border ${colorMap[color].outline}
      bg-transparent hover:cursor-pointer
      disabled:opacity-50 disabled:cursor-not-allowed
      disabled:hover:opacity-50 disabled:hover:bg-transparent disabled:hover:text-[var(--color-primary)] disabled:hover:border-[var(--color-primary)]
    `,
    text: `
      ${colorMap[color].text}
      px-0 py-0
      bg-transparent hover:cursor-pointer
      disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50
      [&_.button-icon]:no-underline
      [&_.button-icon_*]:no-underline
    `,
  } as const;

  return clsx(
    'inline-flex items-center justify-center rounded-md transition-colors outline-none select-none',
    'focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]',
    SIZE[size],
    variantMap[variant],
    extra
  );
}
