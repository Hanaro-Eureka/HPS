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

  let highlightColor = 'text-hana-yellow'; // 기본 노랑
  if (diffRate > 0.1) {
    highlightColor = 'text-hana-green'; // 초록
  } else if (diffRate < -0.1) {
    highlightColor = 'text-chart-overflow'; // 빨강
  }

  return (
    <div className='text-lg font-[500] justify-center'>
      {diff > 0 ? (
        <div className='flex flex-col items-center'>
          <Image src='/svgs/image_86.svg' alt='기뻐' width={60} height={60} />
          <Text className='text-black-font mt-1'>
            다음 달 수입이 이번 달보다
          </Text>
          <Text className='text-black-font'>
            <span className={highlightColor}>
              {Math.floor(absDiff / 10_000).toLocaleString()}만원
            </span>{' '}
            많게 예측됩니다.
          </Text>
          <Text className='text-black-font'>저축에 힘써보세요</Text>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <Image src='/svgs/image_88.svg' alt='슬퍼' width={50} height={50} />
          <Text className='text-black-font mt-1'>
            다음 달 수입이 이번 달보다
          </Text>
          <Text className='text-black-font'>
            <span className={highlightColor}>
              {Math.floor(absDiff / 10_000).toLocaleString()}만원
            </span>{' '}
            적게 예측됩니다.
          </Text>
          <Text className='text-black-font'>이번 달은 소비를 줄여보세요.</Text>
        </div>
      )}
    </div>
  );
}
