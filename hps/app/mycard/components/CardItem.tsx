import Text from '@/components/atoms/Text';
import SalaryBarChart from '@/components/molcules/SalaryBarGraph';
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
      <div className='flex pl-3 items-center justify-center'>
        <img src={cardImages[idx]} alt={`카드${idx + 1} 이미지`} />
      </div>

      <div className='flex flex-col w-full justify-start'>
        <Text className='pt-3 pl-5 text-base text-black-font font-[400]'>
          {cardName}
        </Text>
        <SalaryBarChart
          data={[
            {
              moreSpent: usedAmount,
              leastSpent: Math.max(cardAmount - usedAmount, 0),
            },
          ]}
          colors={{
            moreSpent: 'var(--hana-green)',
            leastSpent: '#FFFFFF',
          }}
          width={300} //안먹어요
          height={60}
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
