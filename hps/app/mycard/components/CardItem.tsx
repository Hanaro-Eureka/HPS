'use client';

import Text from '@/components/atoms/Text';
import SalaryBarGraph from '@/components/molcules/SalaryBarGraph';
import { getTotalSpent } from '../utils/cardResult';

type Props = {
  idx: number;
  cardName: string;
  cardAmount: number;
};

const cardImages = ['images/card1.png', 'images/card2.png', 'images/card3.png'];
export default function CardItem({ idx, cardName, cardAmount }: Props) {
  const colors = {
    moreSpent: 'var(--hana-green)',
    leastSpent: 'var(--gray-time)',
  };
  const usedAmount = getTotalSpent({ idx });
  const isAchieved = usedAmount >= cardAmount;

  return (
    <div className='flex py-7 pl-7 pr-3 justify-between bg-white rounded-lg [box-shadow:var(--shadow-taxbox)]'>
      <img
        src={cardImages[idx]}
        alt={`카드${idx + 1} 이미지`}
        className='items-center justify-center'
      />

      <div className='flex flex-col w-46 justify-start'>
        <Text className='text-base font-[400]'>{cardName}</Text>
        <SalaryBarGraph
          data={[{ name: '전체 카드', used: 500000, remain: 200000 }]}
          colors={{
            used: 'var(--hana-green)',
            remain: '#FFFFFF',
          }}
          height={100}
        />
        {isAchieved ? (
          <Text className='text-xs font-[400] text-hana-green text-center'>
            실적 달성!
          </Text>
        ) : (
          <Text className='text-xs font-[400] text-gray-time text-center'>
            실적 달성까지
            <span className='text-hana-green'>
              {' '}
              {cardAmount - usedAmount}원!
            </span>
          </Text>
        )}
      </div>
    </div>
  );
}
