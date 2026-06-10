import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`border border-ifl-border bg-ifl-canvas rounded-xl p-6 ${className}`}>
      {children}
    </div>
  );
}
