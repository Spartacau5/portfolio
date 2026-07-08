'use client';

import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useImperativeHandle, type ReactNode } from 'react';

export type ChipTrailPhase = 'expand' | 'collapse';

export type ChipTrailHandle = {
  bounce: (phase?: ChipTrailPhase) => void;
};

export const ChipTrail = forwardRef<ChipTrailHandle, { children: ReactNode; className?: string }>(
  function ChipTrail({ children, className }, ref) {
    const controls = useAnimation();

    useImperativeHandle(ref, () => ({
      bounce: async (phase: ChipTrailPhase = 'collapse') => {
        const prefersReduced =
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) return;

        const pull = phase === 'expand' ? 7 : -7;

        await controls.start({
          x: pull,
          transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
        });
        await controls.start({
          x: 0,
          transition: {
            type: 'spring',
            stiffness: 340,
            damping: 28,
            mass: 0.8,
          },
        });
      },
    }));

    return (
      <motion.span className={`wg-chip-trail${className ? ` ${className}` : ''}`} animate={controls}>
        {children}
      </motion.span>
    );
  },
);
