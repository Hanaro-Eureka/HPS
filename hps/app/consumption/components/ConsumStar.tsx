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

  useEffect(() => {
    const { imagePath } = getConsumptionRateText(salaryList, consumptionData);
    setImagePath(imagePath);
  }, [salaryList]);
  //   console.log('imagePath', imagePath);

  return (
    <div className='flex items-center justify-center'>
      <div className='relative w-[198px] h-[146px]'>
        <Image
          src='/svgs/ic_chat.svg'
          alt='채팅'
          fill
          className='object-contain'
        />
        <p className='absolute inset-0 flex items-center justify-center text-black font-medium text-lg'>
          텍스트내용
        </p>
      </div>{' '}
      {imagePath && (
        <Image src={imagePath} alt='소비율 캐릭터' width={131} height={160} />
      )}
    </div>
  );
}
