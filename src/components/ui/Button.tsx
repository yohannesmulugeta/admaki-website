import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asLink?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  asLink = false,
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'group relative inline-flex items-center justify-center font-medium tracking-wide transition-all duration-300 ease-out rounded-full select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 active:translate-y-0 disabled:opacity-50 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5',
    md: 'text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 gap-2',
    lg: 'text-sm sm:text-base px-7 sm:px-8 py-3.5 sm:py-4 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-white text-black hover:bg-zinc-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 font-semibold',
    secondary:
      'bg-white/[0.06] text-white/90 border border-white/20 backdrop-blur-md hover:bg-white/[0.12] hover:border-white/40 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:-translate-y-0.5',
    ghost:
      'bg-transparent text-zinc-300 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10 hover:-translate-y-0.5',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (asLink && href) {
    return (
      <a href={href} className={combinedStyles}>
        {children}
      </a>
    );
  }

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
}
