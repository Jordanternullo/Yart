/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import React from 'react';
import Icon from '../icon/icon';

/* eslint-disable-next-line */
export enum ButtonColor {
  Primary = 'primary',
  Dark = 'dark',
}

export enum ButtonSize {
  Normal = 'normal',
  Big = 'big',
  Small = 'small',
  Very_small = 'very_small',
}

export interface ButtonProps {
  color?: ButtonColor;
  size?: ButtonSize;
  children?: React.ReactNode;
  disabled?: boolean;
  iconLeft?: string;
  iconRight?: string;
  buttonIcon?: string;
  link?: string;
  external?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export function Button(props: ButtonProps) {
  const {
    color = ButtonColor.Primary,
    size = ButtonSize.Normal,
    children,
    disabled = false,
    iconLeft,
    buttonIcon,
    iconRight,
    link,
    external,
    onClick,
    className,
  } = props;

  const colorChoose = {
    [ButtonColor.Primary]:
      'bg-primary-500 border-2 border-primary-500 hover:bg-primary-400 hover:border-primary-400 focus:bg-primary-300 outline-primary-300',
    [ButtonColor.Dark]:
      'bg-dark-400 border-2 border-dark-300 hover:bg-dark-300 focus:bg-dark-300 outline-primary-300',
  };

  const sizeChoose = {
    [ButtonSize.Big]: 'h-14 rounded-md px-4',
    [ButtonSize.Normal]: 'h-12 rounded-md px-4',
    [ButtonSize.Small]: 'h-10 rounded p-x3',
    [ButtonSize.Very_small]: 'h-8 rounded px-3 text-sm',
  };
  const disabledClassName =
    'bg-light-100 text-dark-100 hover:bg-light-100 hover:text-dark-100 cursor-default';
  const defineClassName = `gap-2 focus:outline-2 focus:outline focus:outline-offset-[3px] inline-flex items-center text-white font-bold transition-color ${
    colorChoose[color]
  } ${sizeChoose[size]} ${disabled ? disabledClassName : ''} ${className}`;

  const buttonContent = (
    <>
      {iconLeft && <Icon data-testid="btn-iconleft" name={iconLeft} />}
      {buttonIcon ? (
        <Icon data-testid="btn-icon" name={buttonIcon} />
      ) : (
        children
      )}
      {iconRight && <Icon data-testid="btn-iconright" name={iconRight} />}
    </>
  );
  if (link && external) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={defineClassName}
        data-testid="btn-externallink"
      >
        {buttonContent}
      </a>
    );
  }

  if (link) {
    return (
      <Link href={link} passHref>
        <a className={defineClassName} data-testid="btn-internallink">
          {buttonContent}
        </a>
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={defineClassName} disabled={disabled}>
      {buttonContent}
    </button>
  );
}

export default Button;
