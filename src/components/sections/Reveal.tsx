import { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE } from '../../config/motion';

interface RevealCProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function RevealC({ children, delay = 0, className }: RevealCProps) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
