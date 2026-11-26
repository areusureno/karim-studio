import type { ReactNode } from 'react';

export const springTransition = { type: 'spring' as const, stiffness: 420, damping: 32 };

type SurfaceCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Lightweight GPU-friendly card surface (no JS mousemove layout thrashing).
 */
export function SurfaceCard({ children, className = '' }: SurfaceCardProps) {
  return <div className={`surface ${className}`}>{children}</div>;
}

export default SurfaceCard;
