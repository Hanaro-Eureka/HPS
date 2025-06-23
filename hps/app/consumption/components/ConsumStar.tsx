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
    <div className='flex items-center justify-center'>
      <div className='relative'>
        <Image src='/svgs/ic_chat.svg' alt='채팅' width={198} height={146} />
        <p className='absolute inset-0 flex items-center justify-center text-black font-medium text-lg'>
          {textMess}
        </p>
      </div>
      {imagePath && (
        <Image
          src={imagePath}
          alt='소비율 캐릭터'
          width={131}
          height={160}
          className='mt-25'
        />
      )}
    </div>
  );
}
