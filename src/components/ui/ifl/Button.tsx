import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
  showArrow?: boolean;
}

const BASE =
  'inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ifl-signal focus-visible:ring-offset-2 focus-visible:ring-offset-ifl-canvas';

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-ifl-signal text-white hover:bg-ifl-signal-dark group',
  ghost:
    'border border-ifl-border text-ifl-ink hover:border-ifl-ink-70 hover:bg-ifl-s1',
};

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  external = false,
  showArrow = false,
}: ButtonProps) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {showArrow && (
        <ArrowRight
          size={18}
          className="group-hover:translate-x-1 transition-transform duration-200"
        />
      )}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
