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
    <div className='w-1/2 flex flex-col justify-center items-center text-center mt-4'>
      <Text className='text-lg font-semibold text-[#212121]'>
        {sign} {amount.toLocaleString()}원
      </Text>
      <Text className='text-sm text-gray-500'>{label}</Text>
    </div>
  );
}
