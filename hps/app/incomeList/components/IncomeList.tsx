import List from '@/components/molcules/List';
import Image from 'next/image';
import {
  getMonthlyIncomeWithUserId,
  getSalaryChangeFromLastMonth,
} from '@/lib/actions/salary-actions';
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
  const ym = `${thisYear}-${month.padStart(2, '0')}`;

  const [monthlyIncome, incomeChanges] = await Promise.all([
    getMonthlyIncomeWithUserId(1, ym),
    getSalaryChangeFromLastMonth(1, ym),
  ]);

  const grouped = groupByDate(monthlyIncome, 'depositDate');
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <>
      {sortedDates.map((date) => {
        const items = grouped[date]
          .sort((a, b) => Number(b.depositDate) - Number(a.depositDate))
          .map((item) => {
            const source = item.incomeSource ?? item.depositorName ?? '기타';
            const diff = incomeChanges?.[source]?.diff ?? 0;

            return {
              id: item.id,
              label: source,
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
              description:
                diff !== 0 ? (
                  <span
                    className={`text-xs ${diff > 0 ? 'text-income-plus' : 'text-income-minus'}`}
                  >
                    {diff > 0
                      ? `+${diff.toLocaleString()}`
                      : `${diff.toLocaleString()}`}
                  </span>
                ) : null,
            };
          });

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
