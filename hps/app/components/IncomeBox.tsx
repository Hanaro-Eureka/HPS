import { redirect } from 'next/navigation';
import { getPredictedNextMonthIncome } from '@/lib/actions/income-actions';
import { auth } from '@/lib/auth';
import { getSumOfThisMonthIncomes } from '../utils/income';
import HanaMonWithCard from './HanaMonWithCard';
import IncomeSpendButton from './IncomeSpendButton';

export default async function IncomeBox() {
  const session = await auth();
  const userId = Number(session?.user?.id);

  if (!userId || isNaN(userId)) {
    redirect('/login');
  }

  const [sumOfIncomes, predictedNextMonthIncome] = await Promise.all([
    getSumOfThisMonthIncomes(userId),
    getPredictedNextMonthIncome(userId),
  ]);

  return (
    <div className='flex mt-16 gap-4'>
      <IncomeSpendButton lastIncome={sumOfIncomes} />
      <HanaMonWithCard predictedNextMonthIncome={predictedNextMonthIncome} />
    </div>
  );
}
