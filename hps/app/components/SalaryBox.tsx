import { use } from 'react';
import { getLastIncome, getSumOfThisMonthSalaries } from '../utils/salary';
import HanaMonWithCard from './HanaMonWithCard';
import SalarySpendButton from './SalarySpendButton';

export default function SalaryBox() {
  const sumOfSalaries = use(getSumOfThisMonthSalaries(1));
  const salaryList = use(getLastIncome(1));
  return (
    <>
      <div className='flex ml-10'>
        <SalarySpendButton lastSalary={sumOfSalaries} />
        <HanaMonWithCard salaryList={salaryList} />
      </div>
    </>
  );
}
