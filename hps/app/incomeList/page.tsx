import HeaderLayout from '@/components/templates/HeaderLayout';
import { auth } from '@/lib/auth';
import GoToIncomeButton from './components/GoToIncomeButton';
import IncomeList from './components/IncomeList';
import IncomeListMonthBar from './components/IncomeListMonthBar';
import LineGraph from './components/LineGraph';
import { getSixMonthIncome, getThisYearMonth } from './utils/salary';

type Props = {
  searchParams: Promise<{
    month?: string;
  }>;
};

export default async function incomePage({ searchParams }: Props) {
  const searchParams1 = await searchParams;
  const session = await auth();
  const userId = Number(session?.user?.id);
  const sixMonthIncomes = await getSixMonthIncome(userId);
  const thisMonth = getThisYearMonth().slice(5, 7);
  const selectedMonth = searchParams1.month ?? thisMonth;

  return (
    <HeaderLayout path='/income'>
      <div className='mt-8'>
        <IncomeListMonthBar />
        <div className='border p-1 rounded-3xl [box-shadow:var(--shadow-taxbox)] mt-9 mb-15 mx-6'>
          <LineGraph
            data={sixMonthIncomes}
            xDataKey='month'
            width={343}
            height={223}
            lineColors={{
              thisIncome: '#7E9CF4',
              lastIncome: '#CBD5E0',
            }}
          />
        </div>
        <IncomeList month={selectedMonth} />
      </div>
      <div className='flex justify-center mt-5 mb-10'>
        <GoToIncomeButton />
      </div>
    </HeaderLayout>
  );
}
