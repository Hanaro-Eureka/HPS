import { getIncomeSourcesByUserId } from '@/lib/actions/salary-summary';
import SalaryCircle from '../components/SalaryCircle';

export default async function SummaryTestPage() {
  return (
    <div className='p-6'>
      <SalaryCircle></SalaryCircle>
    </div>
  );
}
