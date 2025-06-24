'use client';

import Text from '@/components/atoms/Text';
import ListItem from '@/components/molcules/ListItem';
import icons from '@/constants/categoryIcons';
import { consumptionData } from '@/constants/consumptionData';
import Image from 'next/image';
import {
  filterThisMonthData,
  formatDate,
  formatTime,
  getCurrentMonth,
  groupByDateInSpendList,
} from '../utils/spending';

export default function SpendList() {
  const currentMonth = getCurrentMonth();

  const thisMonthData = filterThisMonthData(
    consumptionData,
    currentMonth,
    'trans_date'
  );
  const grouped = groupByDateInSpendList(thisMonthData);
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className='flex-1 overflow-y-auto mt-6 ml-1 pr-1'>
      <div className='flex flex-col gap-4'>
        {sortedDates.map((date) => (
          <div key={date}>
            <Text className='text-sm font-[500] mb-1.5 text-gray-time'>
              {formatDate(date)}
            </Text>
            {grouped[date]
              .sort((a, b) => b.trans_date.localeCompare(a.trans_date))
              .map((item, idx) => (
                <ListItem
                  key={idx}
                  icon={
                    <Image
                      src={icons[item.trans_category as keyof typeof icons]}
                      alt={item.trans_category}
                      className='w-9 h-9'
                    />
                  }
                  label={item.merchant_name}
                  time={formatTime(item.trans_date)}
                  amount={-item.trans_amt}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
