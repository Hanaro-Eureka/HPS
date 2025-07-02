import Text from '@/components/atoms/Text';
import HeaderLayout from '@/components/templates/HeaderLayout';
import { redirect } from 'next/navigation';
import {
  getLastYearNextMonthIncomeSum,
  getIncomeSumByPeriod,
} from '@/lib/actions/income-actions';
import { auth } from '@/lib/auth';
import {
  getLastYearSameMonthIncomeSum,
  getLastYearSamePeriodIncomeSum,
} from '@/lib/income';
import AdviceMessage from './components/AdviceMessage';
import GoToIncomeListButton from './components/GoIncomeListButton';
import ProportionalBarGraph from './components/ProportionalBarGraph';

export default async function Income() {
  const session = await auth();
  if (!session) redirect('/login');

  const userId = Number(session.user?.id);
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const threeMonthAgoStart = new Date(now.getFullYear(), now.getMonth() - 3, 1);
  const sixMonthAgoStart = new Date(now.getFullYear(), now.getMonth() - 6, 1);
  const end = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
  const [
    lastYearNextMonthSum,
    recent3MonthsSum,
    lastYear3MonthsSum,
    recent6MonthsSum,
    thisMonthSum,
    lastYearThisMonthsum,
  ] = await Promise.all([
    getLastYearNextMonthIncomeSum(userId),
    getIncomeSumByPeriod(userId, threeMonthAgoStart, end),
    getLastYearSamePeriodIncomeSum(userId),
    getIncomeSumByPeriod(userId, sixMonthAgoStart, end),
    getIncomeSumByPeriod(userId, thisMonthStart, now),
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
