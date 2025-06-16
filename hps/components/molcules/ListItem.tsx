'use client';

import Text from '@/components/atoms/Text';
import { cn } from '@/lib/utils';

type Props = {
  icon: React.ReactNode;
  label: string;
  time: string;
  amount: number;
  className?: string;
};

export default function ListItem({
  icon,
  label,
  time,
  amount,
  className,
}: Props) {
  return (
    <div className={cn('flex items-center justify-between py-4', className)}>
      <div className='flex items-center gap-3'>
        <div className='w-9 h-9 rounded-full flex items-center justify-center'>
          {icon}
        </div>
        <div className='flex flex-col'>
          <Text tag='strong' className='text-base font-[500] '>
            {label}
          </Text>
          <Text tag='span' className='text-sm font-[500] text-[#909090] '>
            {time}
          </Text>
        </div>
      </div>

      <Text
        tag='span'
        className='text-right text-base font-[500] text-[#2F9E8C]'
      >
        {amount.toLocaleString()}원
      </Text>
    </div>
  );
}
