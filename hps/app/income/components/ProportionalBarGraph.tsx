import { calculateDiffRate, getIncomeColor } from '../utils/incomeGraph';
import Bar from './Bar';
import NextMonthPredictionTrigger from './NextMonthPredictionTrigger';

type Props = {
  currentAmount: number;
  predictedThisMonthAmount: number;
  predictedNextMonthAmount: number;
  averageAmount: number;
};

export default function ProportionalBarGraph({
  currentAmount,
  predictedThisMonthAmount,
  predictedNextMonthAmount,
  averageAmount,
}: Props) {
  const diffRate = calculateDiffRate(predictedThisMonthAmount, currentAmount);
  const { barColor, textColor } = getIncomeColor(diffRate);

  return (
    <div className='flex justify-center gap-8 items-end w-full mt-10 mb-15'>
      <div className='flex justify-center'>
        <Bar
          label={'최근 6개월\n평균 수입'}
          amount={averageAmount}
          color='#E4E8EB'
          textColor='#909090'
        />
      </div>
      <div className='flex justify-center '>
        <Bar
          label={'이번 달\n예측 수입'}
          amount={predictedThisMonthAmount}
          color={barColor}
          textColor={textColor}
        />
      </div>
      <NextMonthPredictionTrigger
        averageAmount={averageAmount}
        predictedNextMonthAmount={predictedNextMonthAmount}
      />
    </div>
  );
}
