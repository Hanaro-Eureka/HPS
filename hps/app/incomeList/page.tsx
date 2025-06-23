import IncomeList from './components/IncomeList';
import IncomeListMonthBar from './components/IncomeListMonthBar';
import LineGraph from './components/LineGraph';
import { getSixMonthIncome, getThisYearMonth } from './utils/salary';

type Props = {
  searchParams: {
    month?: string;
  };
};

export default async function incomePage({ searchParams }: Props) {
  const sixMonthIncomes = await getSixMonthIncome(1);
  const thisMonth = getThisYearMonth().slice(5, 7);
  const selectedMonth = searchParams.month ?? thisMonth;

  return (
    <>
      <div className='mt-8'>
        <IncomeListMonthBar />
        <div className='border p-1 rounded-3xl [box-shadow:var(--shadow-taxbox)] mt-5 mb-5'>
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
    </>
  );
}
