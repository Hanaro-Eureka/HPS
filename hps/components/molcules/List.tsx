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
  selectedIds?: (string | number)[];
  onToggle?: (id: string | number) => void;
  className?: string;
};

export default function List({
  date,
  data,
  selectedIds = [],
  onToggle,
  className,
}: Props) {
  return (
    <div className={cn('flex flex-col', className)}>
      <Text tag='h2' className='font-[500] text-sm text-gray-time ml-6'>
        {date}
      </Text>

      {data.map((item) => (
        <ListItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          time={item.time}
          amount={item.amount}
          isSelected={selectedIds.includes(item.id)}
          onClick={() => onToggle?.(item.id)}
        />
      ))}
    </div>
  );
}
