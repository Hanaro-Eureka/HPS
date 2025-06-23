import Text from '@/components/atoms/Text';
import Image from 'next/image';

type Props = {
  currentAmount: number;
  predictedAmount: number;
};

export default function AdviceMessage({
  currentAmount,
  predictedAmount,
}: Props) {
  const diff = predictedAmount - currentAmount;
  const absDiff = Math.abs(diff);
  const diffRate = currentAmount > 0 ? diff / currentAmount : 0;

  // 현재 기준 다음 달 계산
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const nextMonthLabel = `${nextMonth.getMonth() + 1}월`;

  let highlightColor = 'text-hana-yellow';
  if (diffRate > 0.05) {
    highlightColor = 'text-hana-green';
  } else if (diffRate < -0.05) {
    highlightColor = 'text-chart-overflow';
  }

  return (
    <div className='text-lg font-[500] justify-center'>
      {diffRate > 0.05 ? (
        <div className='flex flex-col items-center'>
          <Image src='/svgs/image_86.svg' alt='기뻐' width={60} height={60} />
          <Text className='text-black-font mt-1'>
            {nextMonthLabel} 수입이 최근 6개월 평균 수입보다
          </Text>
          <Text className='text-black-font'>
            <span className={highlightColor}>
              {Math.floor(absDiff / 10_000).toLocaleString()}만원
            </span>
            많게 예측됩니다.
          </Text>
          <Text className='text-black-font'>저축에 힘써보세요</Text>
        </div>
      ) : diffRate < -0.05 ? (
        <div className='flex flex-col items-center'>
          <Image src='/svgs/image_88.svg' alt='슬퍼' width={50} height={50} />
          <Text className='text-black-font mt-1'>
            {nextMonthLabel} 수입이 최근 6개월 평균 수입보다
          </Text>
          <Text className='text-black-font'>
            <span className={highlightColor}>
              {Math.floor(absDiff / 10_000).toLocaleString()}만원&nbsp;
            </span>
            적게 예측됩니다.
          </Text>
          <Text className='text-black-font'>이번 달은 소비를 줄여보세요.</Text>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <Image src='/svgs/image_118.svg' alt='슬퍼' width={50} height={50} />
          <Text className='text-black-font mt-1'>
            소득이 안정적으로 유지되고 있어요.
          </Text>
          <Text className='text-black-font'>이 흐름을 살려 저축이나</Text>
          <Text className='text-black-font'>투자 계획을 살려주세요</Text>
        </div>
      )}
    </div>
  );
}
