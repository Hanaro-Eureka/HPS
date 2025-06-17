'use client';

import ResultCardItem from './ResultCardItem';

type Props = {
  deduction: number; // 공제액
  refund: number; // 환급액
};

export default function ResultCardGroup({ deduction, refund }: Props) {
  return (
    <section className='bg-white rounded-3xl mt-10 [box-shadow:var(--shadow-taxbox)]'>
      <div className='flex justify-between divide-x divide-[color:var(--divide)] py-2'>
        <ResultCardItem
          label='예상 누적 공제액'
          amount={deduction}
          type='deduction'
        />
        <ResultCardItem
          label='예상 누적 환급액'
          amount={refund}
          type='refund'
        />
      </div>
    </section>
  );
}
