import { ReactNode } from 'react';

type Surface = 'canvas' | 's1' | 's2';

const SURFACE_CLASS: Record<Surface, string> = {
  canvas: 'bg-ifl-canvas',
  s1: 'bg-ifl-s1',
  s2: 'bg-ifl-s2',
};

interface SectionProps {
  children: ReactNode;
  id?: string;
  surface?: Surface;
  className?: string;
}

export function Section({ children, id, surface = 'canvas', className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`variant-c relative ${SURFACE_CLASS[surface]} py-24 lg:py-32 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}
