import { use } from 'react';
import { auth } from '@/lib/auth';
import { getLastIncome, getSumOfThisMonthSalaries } from '../utils/salary';
import HanaMonWithCard from './HanaMonWithCard';
import SalarySpendButton from './SalarySpendButton';

export default function SalaryBox() {
  const session = use(auth());
  const userId = Number(session?.user?.id);
  const sumOfSalaries = use(getSumOfThisMonthSalaries(userId));
  const salaryList = use(getLastIncome(userId));
  return (
    <>
      <div className='flex mx-4 mt-16 gap-3'>
        <SalarySpendButton lastSalary={sumOfSalaries} />
        <HanaMonWithCard salaryList={salaryList} />
      </div>
    </>
  );
}
