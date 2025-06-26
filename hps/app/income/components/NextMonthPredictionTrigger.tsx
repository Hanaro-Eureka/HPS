'use client';

import Image from 'next/image';
import { useState } from 'react';
import IncomePredictionModal from './IncomePredictionModal';

type Props = {
  averageAmount: number;
  predictedNextMonthAmount: number;
};

export default function NextMonthPredictionTrigger({
  averageAmount,
  predictedNextMonthAmount,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col items-center justify-center w-18'>
        <button
          onClick={() => setIsOpen(true)}
          aria-label='다음 달 예측 수입 보기'
        >
          <Image
            src='/svgs/ic_question.svg'
            alt='물음표 아이콘'
            width={30}
            height={50}
          />
        </button>
        <span className='text-sm mt-2 text-center whitespace-pre-line text-black-font'>
          {'다음 달\n예측 수입'}
        </span>
      </div>

      {isOpen && (
        <IncomePredictionModal
          averageAmount={averageAmount}
          predictedAmount={predictedNextMonthAmount}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
