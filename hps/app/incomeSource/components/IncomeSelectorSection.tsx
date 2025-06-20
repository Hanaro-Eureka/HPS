'use client';

import { useState } from 'react';
import CompleteButton from './CompleteButton';
import IncomeSelectorList from './IncomeSelectorList';

export default function IncomeSelectorSection() {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

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

      <section className='flex justify-center mt-32'>
        <CompleteButton selectedIds={selectedIds} />
      </section>
    </>
  );
}
