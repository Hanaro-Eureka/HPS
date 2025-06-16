'use client';

import Text from '@/components/atoms/Text';
import ResultCardItem from './ResultCardItem';

type Props = {
  deduction: number;
  refund: number;
  comment?: string;
};

export default function ResultCardGroup({ deduction, refund, comment }: Props) {
  return (
    <section className='bg-white rounded-3xl mt-10 shadow-[0_0_4px_rgba(0,0,0,0.15)]'>
      <div className='flex justify-between divide-x divide-[#918B8B] py-4'>
        <ResultCardItem
          label='예상 공제액'
          amount={deduction}
          type='deduction'
        />
        <ResultCardItem label='예상 환급액' amount={refund} type='refund' />
      </div>
      {comment && (
        <div className='text-center text-xs border-t border-[#918B8B] py-3'>
          <Text>
            <span className='text-[#2F9E8C]'>신용카드 </span>
            <span className='text-[#918B8B]'>
              사용 비율이 높아서, 절세효율이 낮아요!
            </span>
          </Text>
        </div>
      )}
    </section>
  );
}
