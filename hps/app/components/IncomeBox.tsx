import { redirect } from 'next/navigation';
import { getPredictedNextMonthIncome } from '@/lib/actions/income-actions';
import { auth } from '@/lib/auth';
import { getSumOfThisMonthIncomes } from '../utils/income';
import HanaMonWithCard from './HanaMonWithCard';
import IncomeButton from './IncomeButton';

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
      <IncomeButton thisMonthIncome={sumOfIncomes} />
      <HanaMonWithCard predictedNextMonthIncome={predictedNextMonthIncome} />
    </div>
  );
}
