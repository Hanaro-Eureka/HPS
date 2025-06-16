'use client';

import Text from '@/components/atoms/Text';
import { cn } from '@/lib/utils';
import ListItem from './ListItem';

type Transaction = {
  id: string | number;
  label: string;
  time: string;
  amount: number;
  icon: React.ReactNode;
};

type Props = {
  date: string;
  data: Transaction[];
  className?: string;
};

export default function List({ date, data, className }: Props) {
  return (
    <div className={cn('flex flex-col', className)}>
      <Text tag='h2' className='text-sm text-[#909090] mb-1.5'>
        {date}
      </Text>

      {data.map((item) => (
        <ListItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          time={item.time}
          amount={item.amount}
        />
      ))}
    </div>
  );
}
