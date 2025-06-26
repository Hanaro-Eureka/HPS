import IncomeBarGraph from '@/components/molcules/IncomeBarGraph';
import { calculateSpendingStatus } from '@/utils/spending';

type Props = {
  predictedAmount: number;
  currentAmount: number;
};

export default function IncomeGraph({ predictedAmount, currentAmount }: Props) {
  const { isOverSpent, used, remain } = calculateSpendingStatus(
    predictedAmount,
    currentAmount
  );

  const safePredictedAmount = Math.floor(
    predictedAmount / 10_000
  ).toLocaleString();
  const safeCurrentAmount = Math.floor(currentAmount / 10_000).toLocaleString();

  const referencePercentage =
    (Math.min(currentAmount, predictedAmount) /
      Math.max(currentAmount, predictedAmount)) *
    100;

  return (
    <div className='relative w-full px-12 mt-12'>
      <IncomeBarGraph
        data={[
          {
            name: '이번 달 수입',
            used,
            remain,
          },
        ]}
        height={50}
        colors={{
          used: '#56b8ab',
          remain: isOverSpent ? '#e97272' : '#E4F4F1',
        }}
      />

      <div
        className={`absolute top-full text-sm text-center font-[400] ${
          referencePercentage > 90
            ? 'translate-x-[-100%] text-right'
            : '-translate-x-1/2'
        }`}
        style={{
          left: `${referencePercentage}%`,
        }}
      >
        <span className='text-black-font'>
          {isOverSpent ? '이번 달 예측 수입' : '이번 달 수입'}
        </span>
        <br />
        <span className='whitespace-nowrap text-black-font'>
          {(isOverSpent
            ? safePredictedAmount
            : safeCurrentAmount
          ).toLocaleString()}
          만원
        </span>
      </div>
      <div className='absolute -top-10 right-10 text-sm text-right font-[400]'>
        <span className={isOverSpent ? 'text-spend-alert' : 'text-black-font'}>
          {isOverSpent ? '이번 달 수입' : '이번 달 예측 수입'}
        </span>
        <br />
        <span className={isOverSpent ? 'text-spend-alert' : 'text-black-font'}>
          {(isOverSpent
            ? safeCurrentAmount
            : safePredictedAmount
          ).toLocaleString()}
          만원
        </span>
      </div>
    </div>
  );
}
