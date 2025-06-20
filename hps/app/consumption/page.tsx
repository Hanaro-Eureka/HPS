import Title from '@/components/atoms/Title';
import { getMonthlySalary } from '@/lib/actions/salary-actions';
import { getStartAndEndOfMonth } from '../spendList/utils/spending';
import ConsumptionGraph from './components/ConsumptionGraph';

export default async function Consumption() {
  const userId = 1; // TODO: 실제 로그인 유저 ID로 교체
  const { start, end } = getStartAndEndOfMonth(new Date());
  const salaryList = await getMonthlySalary(userId, start, end);
  const monthlySalary = salaryList.reduce((sum, s) => sum + s.amount, 0);

  return (
    <>
      <Title tag={'h1'} className='font-[600] text-black-font text-2xl m-4'>
        소비 관리
      </Title>
      <section className='mt-30'>
        <ConsumptionGraph salary={monthlySalary} />
      </section>
    </>
  );
}
