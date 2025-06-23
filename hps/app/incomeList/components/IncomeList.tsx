import List from '@/components/molcules/List';
import Image from 'next/image';
import { getMonthlyIncomeWithUserId } from '@/lib/actions/salary-actions';
import {
  formatDate,
  formatTime,
  getThisYearMonth,
  groupByDate,
} from '../utils/salary';

type Props = {
  month: string;
};

export default async function IncomeList({ month }: Props) {
  const thisYear = getThisYearMonth().slice(0, 4);
  const monthlyIncome = await getMonthlyIncomeWithUserId(
    1,
    `${thisYear}-${month.padStart(2, '0')}`
  );
  const grouped = groupByDate(monthlyIncome, 'depositDate');
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <>
      {sortedDates.map((date) => {
        const items = grouped[date]
          .sort((a, b) => Number(b.depositDate) - Number(a.depositDate))
          .map((item) => ({
            id: item.id,
            label: item.incomeSource ?? item.depositorName ?? '',
            time: formatTime(item.depositDate.toISOString()),
            amount: item.amount,
            icon: (
              <Image
                src='/svgs/ic_income.svg'
                alt='수입 아이콘'
                width={36}
                height={36}
              />
            ),
          }));
        return (
          <List
            key={date}
            date={formatDate(date)}
            data={items}
            className='mt-14'
          />
        );
      })}
    </>
  );
}
