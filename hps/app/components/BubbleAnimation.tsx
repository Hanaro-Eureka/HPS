'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  category: string;
  amount: number;
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
  amount,
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
        'rounded-full flex items-center justify-center flex-col text-center text-sm font-semibold shadow',
        color,
        size
      )}
    >
      <span className='text-xl'>{category}</span>
      <span className='text-xs'>{amount.toLocaleString()}원</span>
    </motion.div>
  );
}
