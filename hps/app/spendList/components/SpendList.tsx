'use client';

import { getCategoryIcon } from '@/app/utils/getCategoryIcon';
import Text from '@/components/atoms/Text';
import ListItem from '@/components/molcules/ListItem';
import { consumptionData } from '@/constants/consumptionData';
import Image from 'next/image';
import {
  filterThisMonthData,
  formatDate,
  formatSpendTime,
  getCurrentMonth,
  groupByDateInSpendList,
} from '../../../utils/spending';

export default function SpendList() {
  const thisMonthData = filterThisMonthData(
    consumptionData,
    getCurrentMonth(),
    'trans_date'
  );

  const grouped = groupByDateInSpendList(thisMonthData);
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className='flex flex-col overflow-y-auto w-full h-[calc(100vh-160px)] py-15'>
      <div className='flex flex-col gap-4'>
        {sortedDates.map((date) => (
          <div key={date}>
            <Text className='text-sm font-[500] ml-6 text-gray-time'>
              {formatDate(date)}
            </Text>
            {grouped[date]
              .sort((a, b) => b.trans_date.localeCompare(a.trans_date))
              .map((item, idx) => (
                <ListItem
                  key={idx}
                  icon={
                    <Image
                      src={getCategoryIcon(item.trans_category)}
                      alt={item.trans_category}
                      className='w-9 h-9'
                    />
                  }
                  label={item.merchant_name}
                  time={formatSpendTime(item.trans_date)}
                  amount={-item.trans_amt}
                />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
