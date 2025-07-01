'use client';

import { consumptionData } from '@/constants/consumptionData';
import Image from 'next/image';
import { getConsumptionRateText } from '../consumption/utils/evaluation';

type Props = {
  predictedNextMonthIncome: number;
};

export default function HanaMonWithCard({ predictedNextMonthIncome }: Props) {
  const { rate } = getConsumptionRateText(
    predictedNextMonthIncome,
    consumptionData
  );
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
