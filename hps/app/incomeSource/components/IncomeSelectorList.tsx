import {
  filterThisMonthData,
  formatDate,
  formatTime,
  getCurrentMonth,
  groupByDate,
} from '@/app/spendList/utils/spending';
import List from '@/components/molcules/List';
import icons from '@/constants/categoryIcons';
import { consumptionData } from '@/constants/consumptionData';
import Image from 'next/image';

export default function IncomeSelectorList({
  selectedIds,
  setSelectedIds,
}: {
  selectedIds: (string | number)[];
  setSelectedIds: React.Dispatch<React.SetStateAction<(string | number)[]>>;
}) {
  const currentMonth = getCurrentMonth();
  const thisMonthData = filterThisMonthData(consumptionData, currentMonth);

  const toggleSelect = (id: string | number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const grouped = groupByDate(thisMonthData);

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <section className='flex flex-col gap-1'>
      {sortedDates.map((date) => {
        const items = grouped[date].map((item) => ({
          id: item.id,
          label: item.merchant_name,
          time: formatTime(item.trans_date),
          amount: -item.trans_amt,
          icon: (
            <Image
              src={icons[item.trans_category as keyof typeof icons]}
              alt={item.trans_category}
              className='w-9 h-9'
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
