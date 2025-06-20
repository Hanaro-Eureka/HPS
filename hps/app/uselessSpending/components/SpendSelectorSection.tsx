'use client';

import { useState } from 'react';
import CompleteButton from './CompleteButton';
import SpendSelectorList from './SpendSelectorList';

export default function SpendSelectorSection() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  return (
    <>
      <div className='flex flex-col h-116 mt-7'>
        <section aria-label='소비내역' className='flex-1 overflow-y-auto'>
          <SpendSelectorList
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
          />
        </section>
      </div>

      <section className='flex justify-center mt-32'>
        <CompleteButton selectedIds={selectedIds} />
      </section>
    </>
  );
}
