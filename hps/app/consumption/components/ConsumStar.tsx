'use client';

import { consumptionData } from '@/constants/consumptionData';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getConsumptionRateText } from '../utils/evaluation';

type Props = {
  predictedSalary: number;
};

export default function ConsumStar({ predictedSalary }: Props) {
  const [imagePath, setImagePath] = useState<string | null>(null);
  const [textMess, setTextMess] = useState<string | null>(null);
  const [colorClass, setColorClass] = useState<string>('text-black-font');

  useEffect(() => {
    const { imagePath, textMess, colorClass } = getConsumptionRateText(
      predictedSalary,
      consumptionData
    );
    setImagePath(imagePath);
    setTextMess(textMess);
    setColorClass(colorClass);
  }, [predictedSalary]);

  return (
    <div className='flex relative items-center justify-center'>
      <div className='flex relative'>
        <Image
          src='/svgs/ic_chat.svg'
          alt='채팅'
          width={224}
          height={164}
          className='object-contain'
          priority
        />
        <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-18 pr-4 flex flex-col items-center justify-center text-black-font font-medium text-sm text-center leading-snug'>
          {textMess?.split('\n').map((line, idx) => {
            const match = line.match(/(\d+%)/);
            if (match) {
              const [prefix, suffix] = line.split(match[0]);
              return (
                <span key={idx}>
                  {prefix}
                  <span className={colorClass}>{match[0]}</span>
                  {suffix}
                  <br />
                </span>
              );
            }
            return (
              <span key={idx}>
                {line}
                <br />
              </span>
            );
          })}
        </p>
      </div>
      {imagePath && (
        <Image
          src={imagePath}
          alt='소비율 캐릭터'
          width={131}
          height={160}
          className='my-5'
        />
      )}
    </div>
  );
}
