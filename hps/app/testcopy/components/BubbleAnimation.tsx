'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  category: string;
  color: string;
  size: string;
  anim: {
    x: number;
    y: number;
    duration: number;
    delay: number;
  };
  position: {
    top: string;
    left: string;
  };
};

export default function BubbleAnimation({
  category,
  color,
  size,
  anim,
  position,
}: Props) {
  return (
    <motion.div
      animate={{ y: [0, anim.y, 0], x: [0, anim.x, 0] }}
      transition={{
        duration: anim.duration,
        delay: anim.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={cn(
        'absolute rounded-full flex items-center justify-center text-center text-black font-semibold',
        size
      )}
      style={{
        background: `radial-gradient(circle at 40% 40%, white 10%, ${color})`,
        boxShadow: `
            inset 0 -4px 6px rgba(0, 0, 0, 0.15),
            inset 0 2px 4px rgba(255, 255, 255, 0.25),
            0 4px 10px rgba(0, 0, 0, 0.08)
          `,
        top: position.top,
        left: position.left,
      }}
    >
      <span className='z-10 text-sm'>{category}</span>
    </motion.div>
  );
}
