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
};

export default function BubbleAnimation({
  category,
  color,
  size,
  anim,
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
        'rounded-full flex items-center justify-center text-center',
        color,
        size
      )}
    >
      <span className='text-xl font-[600]'>{category}</span>
    </motion.div>
  );
}
