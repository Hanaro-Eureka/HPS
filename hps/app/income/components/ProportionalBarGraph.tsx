import Bar from './Bar';
import NextMonthPredictionTrigger from './NextMonthPredictionTrigger';

type Props = {
  currentAmount: number;
  predictedThisMonthAmount: number;
  predictedNextMonthAmount: number;
};

export default function ProportionalBarGraph({
  currentAmount,
  predictedThisMonthAmount,
  predictedNextMonthAmount,
}: Props) {
  const diffRate =
    currentAmount > 0
      ? (predictedThisMonthAmount - currentAmount) / currentAmount
      : 0;

  let rightColor = '#FFDD3A';
  if (diffRate > 0.05) {
    rightColor = '#2F9E8C'; // 수입 상승
  } else if (diffRate < -0.05) {
    rightColor = '#E97272'; // 수입 하락
  }

  return (
    <div className='flex justify-center gap-8 items-end w-full mt-10 mb-15'>
      <div className='flex justify-center'>
        <Bar
          label={'현재\n수입'}
          amount={currentAmount}
          color='#E4E8EB'
          textColor='text-gray-400'
        />
      </div>
      <div className='flex justify-center'>
        <Bar
          label={'이번 달\n예측 수입'}
          amount={predictedThisMonthAmount}
          color={rightColor}
          textColor={rightColor}
        />
      </div>
      <NextMonthPredictionTrigger
        averageAmount={currentAmount}
        predictedNextMonthAmount={predictedNextMonthAmount}
      />
    </div>
  );
}
