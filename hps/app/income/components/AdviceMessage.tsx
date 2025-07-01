import Text from '@/components/atoms/Text';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type Props = {
  thisMonthIncome: number;
  predictedAmount: number;
};

export default function AdviceMessage({
  thisMonthIncome,
  predictedAmount,
}: Props) {
  const diff = thisMonthIncome - predictedAmount;
  const absDiff = Math.abs(diff);
  const diffRate = predictedAmount > 0 ? diff / predictedAmount : 0;

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
          <Image
            src='/images/img_good.svg'
            alt='green-card'
            width={60}
            height={60}
          />
          <Text className='text-black-font mt-1'>
            예측 수입보다&nbsp;
            <span className={cn(highlightColor)}>
              {Math.floor(absDiff / 10_000).toLocaleString()}만원&nbsp;
            </span>
            많습니다.
          </Text>
          <Text className='text-black-font'>
            현재 수입은 예측 수입의{' '}
            <span className={cn(highlightColor)}>
              {Math.floor((diffRate + 1) * 100)}%{' '}
            </span>
            입니다.
          </Text>
          <Text className='text-black-font'>
            여유 자금을 저축하는 것을 추천합니다!
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
          <Text className='text-black-font'>
            예측 수입보다&nbsp;
            <span className={highlightColor}>
              {Math.floor(absDiff / 10_000).toLocaleString()}만원&nbsp;
            </span>
            적습니다.
          </Text>
          <Text>
            현재 수입은 예측 수입의{' '}
            <span className={cn(highlightColor)}>
              {Math.floor((diffRate + 1) * 100)}%{' '}
            </span>
            입니다.
          </Text>
          <Text className='text-black-font'>
            또 다른 일을 구해보는 건 어떨까요??
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
            수입이 안정적으로 유지되고 있어요.
          </Text>
          <Text>
            현재 수입은 예측 수입의{' '}
            <span className={cn(highlightColor)}>
              {Math.floor((diffRate + 1) * 100)}%{' '}
            </span>
            입니다.
          </Text>
          <Text className='text-black-font'>
            안정적인 수입관리를 하고 계세요.
          </Text>
        </div>
      )}
    </div>
  );
}
