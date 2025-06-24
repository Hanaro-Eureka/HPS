import HeaderLayout from '@/components/templates/HeaderLayout';
import { getStartAndEndOfMonth } from '@/utils/spending';
import { getMonthlySalary } from '@/lib/actions/salary-actions';
import ConsumStar from './components/ConsumStar';
import ConsumptionGraph from './components/ConsumptionGraph';
import ConsumptionRateText from './components/ConsumptionRateText';
import ConsumptionRatio from './components/ConsumptionRatio';
import GoSpendButton from './components/GoSpendButton';

export default async function Consumption() {
  const userId = 1; // TODO: 실제 로그인 유저 ID로 교체

  const now = new Date();

  // 이번 달
  const thisMonth = getStartAndEndOfMonth(now);

  // 지난 달
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = getStartAndEndOfMonth(lastMonthDate);

  // 두 달치 급여 가져오기
  const [thisMonthSalaryList, lastMonthSalaryList] = await Promise.all([
    getMonthlySalary(userId, thisMonth.start, thisMonth.end),
    getMonthlySalary(userId, lastMonth.start, lastMonth.end),
  ]);

  const monthlySalary = thisMonthSalaryList.reduce(
    (sum, s) => sum + s.amount,
    0
  );
  const allSalaryList = [...thisMonthSalaryList, ...lastMonthSalaryList];

  return (
    <HeaderLayout title='소비 관리'>
      <section className='mt-20'>
        <ConsumptionGraph salary={monthlySalary} />
        <ConsumptionRatio />
        <ConsumptionRateText salaryList={allSalaryList} />
        <ConsumStar salaryList={allSalaryList} />

        <div className='mt-10 flex justify-center'>
          <GoSpendButton />
        </div>
      </section>
    </HeaderLayout>
  );
}
