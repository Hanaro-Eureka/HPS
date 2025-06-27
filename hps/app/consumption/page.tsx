import HeaderLayout from '@/components/templates/HeaderLayout';
import { getStartAndEndOfMonth } from '@/utils/spending';
import { redirect } from 'next/navigation';
import {
  getMonthlySalary,
  getPredictedNextMonthSalary,
} from '@/lib/actions/salary-actions';
import { auth } from '@/lib/auth';
import ConsumStar from './components/ConsumStar';
import ConsumptionGraph from './components/ConsumptionGraph';
import ConsumptionRatio from './components/ConsumptionRatio';
import GoSpendButton from './components/GoSpendButton';

export default async function Consumption() {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }
  const userId = Number(session?.user?.id);

  const now = new Date();

  // 지난 달
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = getStartAndEndOfMonth(lastMonthDate);

  // 급여 가져오기
  const [lastMonthSalaryList] = await Promise.all([
    getMonthlySalary(userId, lastMonth.start, lastMonth.end),
  ]);

  const monthlySalary = lastMonthSalaryList.reduce(
    (sum, s) => sum + s.amount,
    0
  );

  // 다음 달 예측 수입
  const predictedNextMonthSalary = await getPredictedNextMonthSalary(userId);

  return (
    <HeaderLayout title='소비 관리'>
      <section className='flex flex-col w-full mt-7'>
        <div className='bg-white py-14 w-full'>
          <ConsumptionGraph salary={monthlySalary} />
        </div>
        <ConsumptionRatio />

        <div className='bg-white mb-12 gap-8 w-full'>
          <ConsumStar predictedSalary={predictedNextMonthSalary} />
        </div>

        <div className='flex justify-center'>
          <GoSpendButton />
        </div>
      </section>
    </HeaderLayout>
  );
}
