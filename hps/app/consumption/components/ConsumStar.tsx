'use client';

import { consumptionData } from '@/constants/consumptionData';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getConsumptionRateText } from '../utils/evaluation';

type Salary = {
  depositDate: Date;
  amount: number;
};

type Props = {
  salaryList: Salary[];
};

export default function ConsumStar({ salaryList }: Props) {
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [textMess, settextMess] = useState<string | null>(null);

  useEffect(() => {
    const { imagePath, textMess } = getConsumptionRateText(
      salaryList,
      consumptionData
    );
    setImagePath(imagePath);
    settextMess(textMess);
  }, [salaryList]);

  return (
    <div className='flex relative items-center justify-center'>
      <div className='flex relative'>
        <Image
          src='/svgs/ic_chat.svg'
          alt='채팅'
          width={200}
          height={150}
          className='object-contain'
          priority
        />
        <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-39 h-14 pr-4 flex flex-col items-center justify-center text-black font-medium text-base text-center leading-snug'>
          {textMess?.split('\n').map((line, idx) => (
            <span key={idx}>
              {line}
              <br />
            </span>
          ))}
        </p>
      </div>
      {imagePath && (
        <Image
          src={imagePath}
          alt='소비율 캐릭터'
          width={131}
          height={160}
          className='mt-12'
        />
      )}
    </div>
  );
}
