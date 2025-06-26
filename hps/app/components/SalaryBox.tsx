import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { getLastIncome, getSumOfThisMonthSalaries } from '../utils/salary';
import HanaMonWithCard from './HanaMonWithCard';
import SalarySpendButton from './SalarySpendButton';

export default async function SalaryBox() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  if (!userId || isNaN(userId)) {
    redirect('/login'); // 로그인 페이지로 이동
  }

  const [sumOfSalaries, salaryList] = await Promise.all([
    getSumOfThisMonthSalaries(userId),
    getLastIncome(userId),
  ]);

  return (
    <div className='flex mt-16 gap-4'>
      <SalarySpendButton lastSalary={sumOfSalaries} />
      <HanaMonWithCard salaryList={salaryList} />
    </div>
  );
}
