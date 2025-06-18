import { getSalaryWithUserId } from '@/lib/actions/salary-actions';
import SalarySpendButton from './SalarySpendButton';

function getNextPayday(date?: Date): Date {
  if (!date) return new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 2).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return new Date(`${year}-${month}-${day}`);
}

export default async function SalaryBox() {
  const lastSalary = await getSalaryWithUserId(2);
  const nextPayday = getNextPayday(lastSalary?.depositDate);
  const now = new Date();

  const diffInMs = nextPayday.getTime() - now.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return (
    <>
      <SalarySpendButton
        lastSalary={Number(lastSalary?.amount)}
        nextPaydayCountDown={diffInDays}
      />
    </>
  );
}
