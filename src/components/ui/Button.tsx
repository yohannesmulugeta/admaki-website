import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  asLink = false,
  href,
  children,
  className = '',
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    'group relative inline-flex items-center justify-center rounded-[0.7rem] font-medium tracking-[0.01em] transition-all duration-200 ease-out select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-[0.985] disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 min-h-[38px] gap-1.5',
    md: 'text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 min-h-[44px] gap-2',
    lg: 'text-sm sm:text-base px-6 sm:px-7 py-3.5 min-h-[48px] gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-[#f4f1e9] text-[#0c0e10] border border-[#f4f1e9] hover:bg-white hover:border-white hover:-translate-y-px font-semibold',
    accent:
      'bg-[#0d7f92] text-white border border-[#0d7f92] hover:bg-[#0b7182] hover:border-[#0b7182] hover:-translate-y-px font-semibold',
    secondary:
      'bg-black/10 text-white border border-white/25 backdrop-blur-md hover:bg-white/[0.08] hover:border-white/45 hover:-translate-y-px',
    ghost:
      'bg-transparent text-zinc-300 hover:text-white border border-transparent hover:border-white/15 hover:-translate-y-px',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (asLink && href) {
    const isInternal = href.startsWith('/');
    const isExternal = href.startsWith('http://') || href.startsWith('https://');

    if (isInternal) {
      return (
        <Link href={href} className={combinedStyles} onClick={onClick}>
          {children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={combinedStyles}
        onClick={onClick}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={combinedStyles} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
