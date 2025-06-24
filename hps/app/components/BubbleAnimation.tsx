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
      style={{
        backdropFilter: 'blur(10px)', // 흐림 처리
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)', // 유리 테두리 효과
        boxShadow: `
  0 2px 4px rgba(0, 0, 0, 0.1),
  0 4px 8px rgba(0, 0, 0, 0.06),
  inset 0 1px 2px rgba(255, 255, 255, 0.15)
`,
      }}
    >
      <span className='text-xl font-[600]'>{category}</span>
    </motion.div>
  );
}
