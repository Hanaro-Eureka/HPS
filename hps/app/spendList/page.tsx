'use client';

import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import ListItem from '@/components/molcules/ListItem';
import SalaryBarGraph from '@/components/molcules/SalaryBarGraph';
import icons from '@/constants/categoryIcons';
import { consumptionData } from '@/constants/consumptionData';
import Image from 'next/image';

const formatDate = (dateStr: string) =>
  `${+dateStr.slice(4, 6)}월 ${+dateStr.slice(6, 8)}일`;
const formatTime = (dateStr: string) =>
  `${dateStr.slice(9, 11)}:${dateStr.slice(11, 13)}`;

const currentMonth = new Date().getMonth() + 1; // 1월 index가 0
const thisMonthData = consumptionData.filter(
  (item) => +item.trans_date.slice(4, 6) === currentMonth
);

const grouped = thisMonthData.reduce<Record<string, typeof thisMonthData>>(
  (acc, cur) => {
    const key = cur.trans_date.slice(0, 8);
    if (!acc[key]) acc[key] = [];
    acc[key].push(cur);
    return acc;
  },
  {}
);

const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

const salary = 2800000;
const totalSpending = thisMonthData.reduce(
  (sum, item) => sum + item.trans_amt,
  0
);
const isOverSpent = totalSpending > salary;

const used = isOverSpent
  ? (salary / totalSpending) * 100
  : (totalSpending / salary) * 100;
const remain = 100 - used;

export default function SpendListPage() {
  return (
    <div className='flex flex-col h-screen w-full pt-15 px-5 py-5'>
      <div className='flex items-center justify-between'>
        <Button
          aria-label='뒤로 가기'
          className='text-base'
          bgColor='bg-white'
          onClick={() => alert('뒤로가기!')}
        >
          <Image src='/goback.svg' alt='뒤로가기' width={10} height={18} />
        </Button>
        <div />
      </div>

      <Title tag='h1' className='text-2xl font-[600] w-full mt-10 ml-1.5'>
        이번달 소비 내역
      </Title>

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

      <div className='w-full mt-8 mb-24'>
        <Title tag='h2' className='text-2xl font-[500] ml-1.5 pb-10'>
          {currentMonth}월 소비 내역
        </Title>

        <div className='relative w-full mt-5'>
          <SalaryBarGraph
            data={[
              {
                name: '소비 내역',
                used,
                remain,
              },
            ]}
            height={40}
            colors={{
              used: '#56b8ab',
              remain: isOverSpent ? '#e97272' : 'white',
              lStroke: '#56b8ab',
              rStroke: isOverSpent ? '#e97272' : '#56b8ab',
            }}
          />

          <div
            className='absolute top-full mt-1.5 -translate-x-1/2 text-sm text-center text-[500]'
            style={{
              left: `${
                (Math.min(totalSpending, salary) /
                  Math.max(totalSpending, salary)) *
                100
              }%`,
            }}
          >
            <span>{isOverSpent ? '내 월급' : '내 소비'}</span>
            <br />
            <span>
              {(isOverSpent ? salary : totalSpending).toLocaleString()}원
            </span>
          </div>

          <div className='absolute -top-10 right-0 text-sm text-right text-[500] whitespace-nowrap leading-tight'>
            <span className={isOverSpent ? 'text-spend-alert' : ''}>
              {isOverSpent ? '내 소비' : '내 월급'}
            </span>
            <br />
            <span className={isOverSpent ? 'text-spend-alert' : ''}>
              {(isOverSpent ? totalSpending : salary).toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
