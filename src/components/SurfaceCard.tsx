import type { MouseEvent, ReactNode } from 'react';
import { motion } from 'framer-motion';

export const springTransition = { type: 'spring' as const, stiffness: 360, damping: 28 };

export function applySpotlight(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
};

export function SurfaceCard({ children, className = '' }: SurfaceCardProps) {
  return (
    <motion.div
      onMouseMove={applySpotlight}
      whileTap={{ scale: 0.99 }}
      transition={springTransition}
      className={`surface spotlight ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default SurfaceCard;
