import React from 'react';
import { twMerge } from 'tailwind-merge';
import { ButtonClass, ButtonSize, ButtonVariant, ButtonColor } from './buttonStyle';

type IconName = 'add' | 'edit' | 'delete' | 'search' | 'save' | 'download';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const iconMap: Record<IconName, string> = {
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  search: 'search',
  save: 'save',
  download: 'download'
};

const Button = ({
  type = 'button',
  variant = 'solid',
  color = 'primary',
  size = 'md',
  icon,
  iconPosition = 'start',
  startIcon,
  endIcon,
  disabled = false,
  loading = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  const isDisabeld = disabled;
  const isLoading = loading;
  
  // 내장 아이콘이 있으면 해당 아이콘을 사용, 없으면 기존 startIcon/endIcon 사용
  const getIconElement = (iconName: IconName, position: 'start' | 'end') => {
    if (icon && iconPosition === position) {
      return <span className="material-symbols-outlined">{iconMap[iconName]}</span>;
    }
    return position === 'start' ? startIcon : endIcon;
  };

  const startIconElement = icon ? getIconElement(icon, 'start') : startIcon;
  const endIconElement = icon ? getIconElement(icon, 'end') : endIcon;

  return (
    <button
      type={type}
      disabled={isDisabeld}
      className={twMerge(
        ButtonClass({ variant, color, size }), 
        (startIconElement || endIconElement) && 'gap-2',
        isDisabeld && 'opacity-50 cursor-not-allowed',
        isLoading && 'opacity-50 cursor-progress',
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="material-symbols-outlined animate-spin">progress_activity</span>
      ) : (
        startIconElement && <span className="button-icon flex items-center">{startIconElement}</span>
      )}
      {!loading && children && <span className="button-text flex items-center">{children}</span>}
      {!loading && endIconElement && <span className="button-icon flex items-center">{endIconElement}</span>}
    </button>
  )
}

export default Button;