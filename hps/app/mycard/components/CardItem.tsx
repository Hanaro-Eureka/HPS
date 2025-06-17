'use client';

import Text from '@/components/atoms/Text';
import SalaryBarGraph from '@/components/molcules/SalaryBarGraph';

type Props = {
  label: string;
  amount: number;
  type: 'deduction' | 'refund';
};

export default function CardItem({ label, amount, type }: Props) {
  const colors = {
    moreSpent: 'var(--hana-green)',
    leastSpent: 'var(--gray-time)',
  };
  return (
    <div className='flex justify-center items-centers gap-6 bg-white rounded-lg shadow-sm'>
      <img
        src='images/card1.png'
        alt='카드1 이미지'
        className='items-center justify-center py-7'
      />

      <div className='flex flex-col justify-center items-center '>
        <Text className='text-base font-[400]'>하나 달달하나 카드</Text>
        <SalaryBarGraph
          data={[{ name: '전체 카드', used: 500000, remain: 200000 }]}
          colors={{
            used: 'var(--hana-green)',
            remain: '#FFFFFF',
          }}
          height={100}
        />
        <Text className='text-xs font-[400] text-gray-time text-center'>
          실적 달성까지 9만원!
        </Text>
      </div>
    </div>
  );
}
