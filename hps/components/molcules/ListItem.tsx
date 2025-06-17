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
          <Text tag='strong' className='text-black-font text-base font-[500]'>
            {label}
          </Text>
          <Text tag='span' className='text-xs text-gray-time font-[500]'>
            {time}
          </Text>
        </div>
      </div>

      <Text
        tag='span'
        className='text-right text-base text-hana-green font-[500]'
      >
        {amount.toLocaleString()}원
      </Text>
    </div>
  );
}
