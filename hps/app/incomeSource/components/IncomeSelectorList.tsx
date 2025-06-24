import List from '@/components/molcules/List';
import { incomeData } from '@/constants/incomeData';
import {
  filterThisMonthData,
  formatDate,
  formatTime,
  getCurrentMonth,
  groupByDate,
} from '@/utils/spending';
import Image from 'next/image';

export default function IncomeSelectorList({
  selectedIds,
  setSelectedIds,
}: {
  selectedIds: (string | number)[];
  setSelectedIds: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}) {
  const currentMonth = getCurrentMonth();
  const thisMonthData = filterThisMonthData(
    incomeData,
    currentMonth,
    'trans_dtime'
  );

  const toggleSelect = (id: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const grouped = groupByDate(thisMonthData, 'trans_dtime');
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <section className='flex flex-col gap-1'>
      {sortedDates.map((date) => {
        const items = grouped[date]
          .sort((a, b) => Number(b.trans_dtime) - Number(a.trans_dtime))

          .map((item) => ({
            id: item.id,
            label: item.trans_memo,
            time: formatTime(item.trans_dtime),
            amount: item.trans_amt,
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
            selectedIds={selectedIds}
            onToggle={toggleSelect}
          />
        );
      })}
    </section>
  );
}
