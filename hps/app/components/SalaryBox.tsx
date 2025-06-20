import { getSalariesWithUserId } from '@/lib/actions/salary-actions';
import SalarySpendButton from './SalarySpendButton';

export default async function SalaryBox() {
  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth() + 1;
  const firstDayOfThisMonth = new Date(
    `${thisYear}-${thisMonth.toString().padStart(2, '0')}-01T00:00:00`
  );
  const salariesOfThisMonth = await getSalariesWithUserId(
    1,
    firstDayOfThisMonth
  );

  const sumOfSalaries = salariesOfThisMonth.reduce(
    (sum, salary) => sum + salary.amount,
    0
  );

  return (
    <>
      <SalarySpendButton lastSalary={sumOfSalaries} />
    </>
  );
}
