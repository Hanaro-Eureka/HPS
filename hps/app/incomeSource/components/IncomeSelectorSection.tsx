'use client';

import { incomeData } from '@/constants/incomeData';
import { useState } from 'react';
import { parseKSTDateFromDtime } from '../utils/parseKSTDate';
import CompleteButton from './CompleteButton';
import IncomeSelectorList from './IncomeSelectorList';

export default function IncomeSelectorSection({
  existingSalary,
}: {
  existingSalary: {
    depositorName: string;
    incomeSource?: string | null;
    amount: number;
    depositDate: Date;
  }[];
}) {
  const selectedIdsFromDB = incomeData
    .filter((item) => {
      const timestamp = parseKSTDateFromDtime(item.trans_dtime).getTime();

      return existingSalary.some((s) => {
        return (
          s.depositorName === item.trans_memo &&
          s.amount === item.trans_amt &&
          s.depositDate.getTime() === timestamp
        );
      });
    })
    .map((item) => item.id);

  const [selectedIds, setSelectedIds] =
    useState<(string | number)[]>(selectedIdsFromDB);

  return (
    <>
      <div className='flex flex-col h-116 mt-7'>
        <section aria-label='수입 내역' className='flex-1 overflow-y-auto'>
          <IncomeSelectorList
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </section>
      </div>
      <section className='flex justify-center mt-28'>
        <CompleteButton selectedIds={selectedIds} />
      </section>
    </>
  );
}
