import Text from '@/components/atoms/Text';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  thisMonthSalary: number;
  predictedAmount: number;
};

export default function AdviceMessage({
  thisMonthSalary,
  predictedAmount,
}: Props) {
  const diff = thisMonthSalary - predictedAmount;
  const absDiff = Math.abs(diff);
  const diffRate = predictedAmount > 0 ? diff / predictedAmount : 0;

  // 이번 달 계산
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthLabel = `${thisMonth.getMonth() + 1}월`;

  const rate = Math.floor((thisMonthSalary / predictedAmount) * 100);

  let highlightColor = 'text-hana-yellow';
  if (diffRate > 0.05) {
    highlightColor = 'text-hana-green';
  } else if (diffRate < -0.05) {
    highlightColor = 'text-chart-overflow';
  }

  let highlightColor2 = 'text-hana-yellow';
  if (rate > 105) {
    highlightColor2 = 'text-hana-green';
  } else if (rate < -105) {
    highlightColor2 = 'text-chart-overflow';
  }

  return (
    <div className='text-lg font-[500] justify-center'>
      {diffRate > 0.05 ? (
        <div className='flex flex-col items-center'>
          <Image
            src='/images/img_good.svg'
            alt='green-card'
            width={60}
            height={60}
          />
          <Text className='text-black-font mt-1'>
            {thisMonthLabel} 수입이 예측 수입보다
          </Text>
          <Text className='text-black-font'>
            <span className={cn(highlightColor, 'font-bold')}>
              {Math.floor(absDiff / 10_000).toLocaleString()}만원&nbsp;
            </span>
            많습니다.
          </Text>
          <Text className='text-black-font mt-2'>
            현재 수입은 예측 수입의{' '}
            <span className={cn(highlightColor, 'font-bold')}>
              {Math.floor((diffRate + 1) * 100)}%{' '}
            </span>
            입니다!
          </Text>
        </div>
      ) : diffRate < -0.05 ? (
        <div className='flex flex-col items-center'>
          <Image
            src='/images/img_sad.svg'
            alt='red-card'
            width={50}
            height={50}
          />
          <Text className='text-black-font mt-1'>
            {thisMonthLabel} 수입이 최근 6개월 평균 수입보다
          </Text>
          <Text className='text-black-font'>
            <span className={highlightColor}>
              {Math.floor(absDiff / 10_000).toLocaleString()}만원&nbsp;
            </span>
            적게 예측됩니다.
          </Text>
          <Text className='text-black-font mt-1'>이번 달 수입은 현재까지</Text>
          <Text>
            <span>
              예측 수입의&nbsp;
              <span className={cn(highlightColor2, 'font-bold')}>{rate}% </span>
              달성했습니다.
            </span>
          </Text>
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <Image
            src='/images/img_soso.svg'
            alt='yellow-card'
            width={50}
            height={50}
          />
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
