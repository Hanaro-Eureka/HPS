import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import { redirect } from 'next/navigation';
import { getSalaryWithUserId } from '@/lib/actions/salary-actions';
import { auth } from '@/lib/auth';
import AdviceMessage from './components/AdviceMessage';
import GoToIncomeListButton from './components/GoIncomeListButton';
import ProportionalBarGraph from './components/ProportionalBarGraph';

export default async function Income() {
  const session = await auth();
  if (!session) redirect('/login');

  const userId = Number(session.user?.id);
  const salaries = await getSalaryWithUserId(userId);
  const now = new Date();

  const formatMonthKey = (date: Date) => date.toISOString().slice(0, 7);
  const getRecentMonths = (base: Date) =>
    Array.from({ length: 3 }, (_, i) =>
      formatMonthKey(
        new Date(base.getFullYear(), base.getMonth() - 3 + i + 1, 1)
      )
    );

  const recentMonthKeys = getRecentMonths(now);
  const lastYearMonthKeys = recentMonthKeys.map((key) => {
    const [year, month] = key.split('-');
    return `${Number(year) - 1}-${month}`;
  });

  const recentSum = recentMonthKeys.reduce((sum, key) => {
    const salary = salaries.find((s) =>
      s.depositDate.toISOString().startsWith(key)
    );
    return sum + (salary?.amount ?? 0);
  }, 0);

  const lastYearSum = lastYearMonthKeys.reduce((sum, key) => {
    const salary = salaries.find((s) =>
      s.depositDate.toISOString().startsWith(key)
    );
    return sum + (salary?.amount ?? 0);
  }, 0);

  const growthRate =
    lastYearSum > 0 ? (recentSum - lastYearSum) / lastYearSum : 0;

  const currentMonthKey = formatMonthKey(now);
  const currentAmount =
    salaries.find((s) =>
      s.depositDate.toISOString().startsWith(currentMonthKey)
    )?.amount ?? 0;

  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const targetMonthKey = formatMonthKey(
    new Date(nextMonth.getFullYear() - 1, nextMonth.getMonth(), 1)
  );

  const targetLastYearAmount =
    salaries.find((s) => s.depositDate.toISOString().startsWith(targetMonthKey))
      ?.amount ?? 0;

  const predictedWithGrowth = Math.round(
    targetLastYearAmount * (1 + growthRate)
  );

  return (
    <div className='flex flex-col w-full px-5 mt-5'>
      <Title
        tag='h1'
        className='text-2xl font-[600] text-black-font m-4 text-center'
      >
        수입 관리
      </Title>

      <Text className='text-base font-[500] text-black-font mt-8'>
        다음 달 수입은 얼마나 될까?
      </Text>

      <Text className='text-xs font-[300] text-black-font mt-2.5'>
        작년 수입 데이터를 기반으로 다음 달 수입을 예측해드릴게요.
      </Text>

      <ProportionalBarGraph
        currentAmount={currentAmount}
        predictedAmount={predictedWithGrowth}
      />
      <AdviceMessage
        currentAmount={currentAmount}
        predictedAmount={predictedWithGrowth}
      />

      <div className='mt-10 flex justify-center'>
        <GoToIncomeListButton />
      </div>
    </div>
  );
}
