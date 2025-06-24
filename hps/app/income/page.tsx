import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import { redirect } from 'next/navigation';
import {
  getLastMonthSalarySum,
  getLastYearSamePeriodSalarySum,
  getLastYearNextMonthSalarySum,
  getRecent3MonthsSalarySum,
} from '@/lib/actions/salary-actions';
import { auth } from '@/lib/auth';
import AdviceMessage from './components/AdviceMessage';
import GoToIncomeListButton from './components/GoIncomeListButton';
import ProportionalBarGraph from './components/ProportionalBarGraph';

export default async function Income() {
  const session = await auth();
  if (!session) redirect('/login');

  const userId = Number(session.user?.id);
  const [lastMonthSum, lastYearMonthSum, recent3MonthsSum, lastYear3MonthsSum] =
    await Promise.all([
      getLastMonthSalarySum(userId),
      getLastYearNextMonthSalarySum(userId),
      getRecent3MonthsSalarySum(userId),
      getLastYearSamePeriodSalarySum(userId),
    ]);
  const growthRate = recent3MonthsSum / lastYear3MonthsSum;
  const predictedWithGrowth = lastYearMonthSum * growthRate;
  return (
    <div className='flex flex-col w-full mt-5 bg-background'>
      <Title
        tag='h1'
        className='text-2xl font-[600] text-black-font m-4 text-center'
      >
        수입 관리
      </Title>

      <Text className='text-base font-[500] text-black-font mt-8 px-5'>
        다음 달 수입은 얼마나 될까?
      </Text>

      <Text className='text-xs font-[300] text-black-font py-2.5 px-5'>
        작년 수입 데이터를 기반으로 다음 달 수입을 예측해드릴게요.
      </Text>
      <div className='w-full bg-white '>
        <ProportionalBarGraph
          currentAmount={lastMonthSum}
          predictedAmount={predictedWithGrowth}
        />
      </div>
      <div className='mt-10'></div>
      <div className='w-full bg-white pt-2 pb-4'>
        <AdviceMessage
          currentAmount={lastMonthSum}
          predictedAmount={predictedWithGrowth}
        />
      </div>
      <div className='mt-10 flex justify-center'>
        <GoToIncomeListButton />
      </div>
    </div>
  );
}
