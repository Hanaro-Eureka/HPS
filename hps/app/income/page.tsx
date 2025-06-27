import Text from '@/components/atoms/Text';
import HeaderLayout from '@/components/templates/HeaderLayout';
import { redirect } from 'next/navigation';
import {
  getLastYearSamePeriodSalarySum,
  getLastYearNextMonthSalarySum,
  getRecent3MonthsSalarySum,
  getRecent6MonthsSalarySum,
  getThisMonthUntilTodaySalarySum,
  getLastYearSameMonthSalarySum,
} from '@/lib/actions/salary-actions';
import { auth } from '@/lib/auth';
import AdviceMessage from './components/AdviceMessage';
import GoToIncomeListButton from './components/GoIncomeListButton';
import ProportionalBarGraph from './components/ProportionalBarGraph';

export default async function Income() {
  const session = await auth();
  if (!session) redirect('/login');

  const userId = Number(session.user?.id);
  const [
    lastYearMonthSum,
    recent3MonthsSum,
    lastYear3MonthsSum,
    recent6MonthsSum,
    thisMonthSum,
    lastYearThisMonthsum,
  ] = await Promise.all([
    getLastYearNextMonthSalarySum(userId),
    getRecent3MonthsSalarySum(userId),
    getLastYearSamePeriodSalarySum(userId),
    getRecent6MonthsSalarySum(userId),
    getThisMonthUntilTodaySalarySum(userId),
    getLastYearSameMonthSalarySum(userId),
  ]);
  const growthRate = recent3MonthsSum / lastYear3MonthsSum;
  const predictedThisMonthWithGrouth = lastYearThisMonthsum * growthRate;
  const predictedNextMonthWithGrowth = lastYearMonthSum * growthRate;

  return (
    <HeaderLayout title='수입 관리'>
      <div className='flex flex-col w-full'>
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
            thisMonthSalary={thisMonthSum}
            predictedAmount={predictedThisMonthWithGrouth}
          />
        </div>
        <div className='mt-10 flex justify-center'>
          <GoToIncomeListButton />
        </div>
      </div>
    </HeaderLayout>
  );
}
