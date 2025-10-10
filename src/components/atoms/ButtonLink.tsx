import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ButtonClass, ButtonSize, ButtonVariant, ButtonColor } from './buttonStyle';

type IconName = 'add' | 'edit' | 'delete' | 'search' | 'save' | 'download' | 'newWindown';

type AnchorProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: 'start' | 'end';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  target?: string;
  rel?: string;
}

const iconMap: Record<IconName, string> = {
  add: 'add',
  edit: 'edit',
  delete: 'delete',
  search: 'search',
  save: 'save',
  download: 'download',
  newWindown: 'arrow_outward'
};

const Anchor = ({
  href = '#',
  variant = 'solid',
  color = 'primary',
  size = 'md',
  icon,
  iconPosition = 'start',
  startIcon,
  endIcon,
  disabled = false,
  className,
  children,
  target,
  rel,
}: AnchorProps) => {
  // 내장 아이콘이 있으면 해당 아이콘을 사용, 없으면 기존 startIcon/endIcon 사용
  const getIconElement = (iconName: IconName, position: 'start' | 'end') => {
    if (icon && iconPosition === position) {
      return <span className="material-symbols-outlined">{iconMap[iconName]}</span>;
    }
    return position === 'start' ? startIcon : endIcon;
  };

  const startIconElement = getIconElement(icon!, 'start');
  const endIconElement = getIconElement(icon!, 'end');

  const buttonClasses = twMerge(
    ButtonClass({ variant, color, size }), 
    (startIconElement || endIconElement) && 'gap-2',
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
    className
  );

  const buttonContent = (
    <>
      {startIconElement && <span className="button-icon flex items-center">{startIconElement}</span>}
      {children && <span>{children}</span>}
      {endIconElement && <span className="button-icon flex items-center">{endIconElement}</span>}
    </>
  );

  if (disabled) {
    return (
      <span className={buttonClasses}>
        {buttonContent}
      </span>
    );
  }

  return (
    <Link href={href} target={target} rel={rel} className={buttonClasses}>
      {buttonContent}
    </Link>
  );
};

export default Anchor;
