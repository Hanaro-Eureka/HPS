import Text from '@/components/atoms/Text';
import HeaderLayout from '@/components/templates/HeaderLayout';
import { redirect } from 'next/navigation';
import {
  getLastYearSamePeriodIncomeSum,
  getLastYearNextMonthIncomeSum,
  getRecent3MonthsIncomeSum,
  getRecent6MonthsIncomeSum,
  getThisMonthUntilTodayIncomeSum,
  getLastYearSameMonthIncomeSum,
} from '@/lib/actions/income-actions';
import { auth } from '@/lib/auth';
import AdviceMessage from './components/AdviceMessage';
import GoToIncomeListButton from './components/GoIncomeListButton';
import ProportionalBarGraph from './components/ProportionalBarGraph';

export default async function Income() {
  const session = await auth();
  if (!session) redirect('/login');

  const userId = Number(session.user?.id);
  const [
    lastYearNextMonthSum,
    recent3MonthsSum,
    lastYear3MonthsSum,
    recent6MonthsSum,
    thisMonthSum,
    lastYearThisMonthsum,
  ] = await Promise.all([
    getLastYearNextMonthIncomeSum(userId),
    getRecent3MonthsIncomeSum(userId),
    getLastYearSamePeriodIncomeSum(userId),
    getRecent6MonthsIncomeSum(userId),
    getThisMonthUntilTodayIncomeSum(userId),
    getLastYearSameMonthIncomeSum(userId),
  ]);
  const growthRate = recent3MonthsSum / lastYear3MonthsSum;
  const predictedThisMonthWithGrouth = lastYearThisMonthsum * growthRate;
  const predictedNextMonthWithGrowth = lastYearNextMonthSum * growthRate;

  return (
    <HeaderLayout title='수입 관리'>
      <div className='flex flex-col w-full relative'>
        <Text className='text-xl font-[500] text-black-font mt-6 ml-6'>
          이번 달 수입은 얼마나 될까?
        </Text>

        <Text className='text-xs font-[300] text-black-font py-2.5 px-6'>
          작년 수입을 기반으로 이번 달 수입을 예측해 드릴게요.
        </Text>
        <div className='bg-white mt-8'>
          <ProportionalBarGraph
            currentAmount={thisMonthSum}
            predictedThisMonthAmount={predictedThisMonthWithGrouth}
            predictedNextMonthAmount={predictedNextMonthWithGrowth}
            averageAmount={recent6MonthsSum / 6}
          />
        </div>
        <div className='mt-8' />
        <div className='w-full bg-white px-6 py-9'>
          <AdviceMessage
            thisMonthIncome={thisMonthSum}
            predictedAmount={predictedThisMonthWithGrouth}
          />
        </div>
        <div className='pt-10 flex justify-center'>
          <GoToIncomeListButton />
        </div>
      </div>
    </HeaderLayout>
  );
}
