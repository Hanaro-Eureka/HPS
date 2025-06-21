'use client';

import { motion } from 'framer-motion';

type Props = {
  data: {
    category: string;
    amount: number;
  }[];
};

export default function SalaryCircle({ data }: Props) {
  const maxAmount = Math.max(...data.map((item) => item.amount));

  const colors = [
    'bg-pink-200',
    'bg-yellow-200',
    'bg-green-200',
    'bg-blue-200',
    'bg-purple-200',
    'bg-red-200',
    'bg-orange-200',
  ];

  const sizedData = data.map((item) => {
    const ratio = item.amount / maxAmount;
    const size = 80 + ratio * 100;

    const tailwindSize =
      size >= 180
        ? 'w-44 h-44'
        : size >= 160
          ? 'w-40 h-40'
          : size >= 140
            ? 'w-36 h-36'
            : size >= 120
              ? 'w-32 h-32'
              : size >= 100
                ? 'w-28 h-28'
                : 'w-24 h-24';

    return {
      ...item,
      tailwindSize,
    };
  });

  const floatSettings = [
    { x: -13.51, y: 9.46, duration: 4.76, delay: 0.91 },
    { x: 13.6, y: 5.5, duration: 4.18, delay: 0.15 },
    { x: -11.7, y: -9.48, duration: 3.87, delay: 0.09 },
    { x: 8.76, y: -6.66, duration: 5.94, delay: 0.64 },
    { x: -3.11, y: 4.34, duration: 4.72, delay: 0.24 },
    { x: -8.1, y: 4.7, duration: 3.97, delay: 0.25 },
    { x: -3.92, y: 5.35, duration: 3.63, delay: 1.41 },
  ];

  return (
    <div className='relative flex flex-wrap gap-6 mt-6 justify-center'>
      {sizedData.map((item, idx) => {
        const anim = floatSettings[idx % floatSettings.length];

        return (
          <motion.div
            key={idx}
            animate={{ y: [0, anim.y, 0], x: [0, anim.x, 0] }}
            transition={{
              duration: anim.duration,
              delay: anim.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className={`rounded-full flex items-center justify-center flex-col text-center text-sm font-semibold shadow ${item.tailwindSize} ${colors[idx % colors.length]}`}
          >
            <span>{item.category}</span>
            <span className='text-xs'>{item.amount.toLocaleString()}원</span>
          </motion.div>
        );
      })}
    </div>
  );
}
