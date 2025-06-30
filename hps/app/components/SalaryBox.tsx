import { redirect } from 'next/navigation';
import { getPredictedNextMonthSalary } from '@/lib/actions/salary-actions';
import { auth } from '@/lib/auth';
import { getSumOfThisMonthSalaries } from '../utils/salary';
import HanaMonWithCard from './HanaMonWithCard';
import SalarySpendButton from './SalarySpendButton';

export default async function SalaryBox() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  if (!userId || isNaN(userId)) {
    redirect('/login');
  }

  const [sumOfSalaries, predictedNextMonthSalary] = await Promise.all([
    getSumOfThisMonthSalaries(userId),
    getPredictedNextMonthSalary(userId),
  ]);

  return (
    <div className='flex mt-16 gap-4'>
      <SalarySpendButton lastSalary={sumOfSalaries} />
      <HanaMonWithCard predictedNextMonthSalary={predictedNextMonthSalary} />
    </div>
  );
}
