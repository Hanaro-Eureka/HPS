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
  const { rate } = getConsumptionRateText(salaryList, consumptionData);
  const color =
    rate !== null
      ? rate < 60
        ? rate >= 30
          ? 'Yellow'
          : 'Green'
        : 'Red'
      : 'Red';
  const hanamon = `/images/img_hanaMonWith${color}Card.svg`;
  return (
    <>
      <Image
        src={hanamon}
        alt={`${hanamon}`}
        width={120}
        height={120}
        className='ml-2'
      />
    </>
  );
}
