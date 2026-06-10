interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = '' }: EyebrowProps) {
  return (
    <p
      className={`text-[10px] tracking-[0.28em] uppercase text-ifl-signal font-mono font-medium ${className}`}
    >
      {children}
    </p>
  );
}
