'use client';

import Text from '@/components/atoms/Text';

type Props = {
  label: string;
  amount: number;
  type: 'deduction' | 'refund';
};

export default function ResultCardItem({ label, amount, type }: Props) {
  const sign = type === 'refund' ? '+' : '-';

  return (
    <div className='w-1/2 flex flex-col justify-center items-center text-center py-4 gap-2'>
      <Text className='text-sm font-[400] text-black-font'>{label}</Text>
      <Text className='text-lg font-[500] text-black-font'>
        {sign} {amount.toLocaleString()}원
      </Text>
    </div>
  );
}
