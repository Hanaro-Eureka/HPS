'use client';

import { consumptionData } from '@/constants/consumptionData';
import Image from 'next/image';
import { getConsumptionRateText } from '../consumption/utils/evaluation';

type Salary = {
  id: number;
  userId: number;
  amount: number;
  depositDate: Date;
  depositorName: string | null;
  incomeSource: string | null;
};

type Props = {
  salaryList: Salary[];
};

export default function HanaMonWithCard({ salaryList }: Props) {
  console.log(salaryList);
  const { rate, colorClass } = getConsumptionRateText(
    salaryList,
    consumptionData
  );
  console.log(rate, colorClass);
  const color =
    rate !== null
      ? rate < 60
        ? rate >= 30
          ? 'Yellow'
          : 'Green'
        : 'Red'
      : 'none';
  console.log(color);
  return (
    <>
      <div className='mt-5'>
        <Image
          src={`/HanaMonWith${color}Card.svg`}
          alt='hanaMonWithCard'
          width={168}
          height={205}
        />
      </div>
    </>
  );
}
