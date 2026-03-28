'use client';

import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-blue-50 border-blue-300 text-blue-800 hover:bg-blue-100',
  secondary: 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100',
  danger: 'bg-red-50 border-red-300 text-red-800 hover:bg-red-100',
  success: 'bg-green-50 border-green-300 text-green-800 hover:bg-green-100',
  outline: 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
};

const sizeStyles = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg',
};

export function Button({
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  loadingText,
  onClick,
  className = '',
  children,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const baseStyles = 'rounded-2xl border shadow-sm transition-all font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  const disabledStyle = isDisabled
    ? 'opacity-50 cursor-not-allowed'
    : 'hover:opacity-90 active:scale-95';

  const focusRingStyle = variant === 'primary' ? 'focus:ring-blue-500' :
                        variant === 'danger' ? 'focus:ring-red-500' :
                        variant === 'success' ? 'focus:ring-green-500' :
                        'focus:ring-gray-500';

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${disabledStyle} ${focusRingStyle} ${className}`}
    >
      {loading ? (loadingText || 'Loading...') : children}
    </button>
  );
}