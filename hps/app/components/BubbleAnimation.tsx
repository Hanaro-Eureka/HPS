'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
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
  href?: string;
};

export default function BubbleAnimation({
  category,
  color,
  size,
  anim,
  position,
  href,
}: Props) {
  const router = useRouter();
  return (
    <motion.div
      onClick={() => href && router.push(href)}
      animate={{ y: [0, anim.y, 0], x: [0, anim.x, 0] }}
      transition={{
        duration: anim.duration,
        delay: anim.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={cn(
        'absolute rounded-full flex items-center justify-center text-center',
        size
      )}
      style={{
        backgroundColor: color,
        boxShadow: `
          inset 0 -4px 6px rgba(0, 0, 0, 0.1),
          inset 0 2px 2px rgba(255, 255, 255, 0.05),
          0 4px 12px rgba(0, 0, 0, 0.08)
        `,
        top: position.top,
        left: position.left,
      }}
    >
      <span className='text-xl font-[600] px-3'>{category}</span>
    </motion.div>
  );
}
