'use client';

import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Title from '@/components/atoms/Title';
import ListItem from '@/components/molcules/ListItem';
import icons from '@/constants/categoryIcons';
import Image from 'next/image';

const dummyData = [
  {
    trans_date: '20250504T061735',
    trans_amt: 51000,
    merchant_name: '스타벅스',
    trans_title: '카페라떼',
    trans_category: 'cafe',
    pay_method: '은행',
    pay_id: '110-409-941505',
  },
  {
    trans_date: '20250529T125434',
    trans_amt: 11000,
    merchant_name: '할리스커피',
    trans_title: '카페라떼',
    trans_category: 'cafe',
    pay_method: '무통장',
    pay_id: '무통장',
  },
  {
    trans_date: '20250526T213436',
    trans_amt: 155000,
    merchant_name: '쿠팡',
    trans_title: '여름 반팔티',
    trans_category: 'shopping',
    pay_method: '카드',
    pay_id: '****3346',
  },
  {
    trans_date: '20250527T111641',
    trans_amt: 98000,
    merchant_name: '한솥도시락',
    trans_title: '도시락 2개',
    trans_category: 'restaurant',
    pay_method: '카드',
    pay_id: '****2066',
  },
  {
    trans_date: '20250509T200723',
    trans_amt: 10000,
    merchant_name: '버거킹',
    trans_title: '점심 식사',
    trans_category: 'restaurant',
    pay_method: '선불',
    pay_id: '선불머니',
  },
  {
    trans_date: '20250516T125743',
    trans_amt: 55000,
    merchant_name: '스타벅스',
    trans_title: '모닝커피',
    trans_category: 'cafe',
    pay_method: '무통장',
    pay_id: '무통장',
  },
  {
    trans_date: '20250511T161735',
    trans_amt: 39000,
    merchant_name: '스타벅스',
    trans_title: '모닝커피',
    trans_category: 'cafe',
    pay_method: '카드',
    pay_id: '****1912',
  },
  {
    trans_date: '20250529T202826',
    trans_amt: 122000,
    merchant_name: '무신사',
    trans_title: '샌들',
    trans_category: 'shopping',
    pay_method: '선불',
    pay_id: '선불머니',
  },
  {
    trans_date: '20250515T160538',
    trans_amt: 62000,
    merchant_name: 'ABC마트',
    trans_title: '샌들',
    trans_category: 'shopping',
    pay_method: '카드',
    pay_id: '****6342',
  },
];

// 날짜 → '_월 __일' 형식
function formatDate(dateStr: string) {
  const month = Number(dateStr.slice(4, 6));
  const day = Number(dateStr.slice(6, 8));
  return `${month}월 ${day}일`;
}

// 시간 → HH:mm 형식
function formatTime(dateStr: string) {
  return `${dateStr.slice(9, 11)}:${dateStr.slice(11, 13)}`;
}

// 날짜별로 그룹화 + 시간 정렬
const grouped = dummyData.reduce<Record<string, typeof dummyData>>(
  (acc, cur) => {
    const key = cur.trans_date.slice(0, 8); // '20250527'
    if (!acc[key]) acc[key] = [];
    acc[key].push(cur);
    return acc;
  },
  {}
);

// 날짜 정렬 (최신 날짜가 위로)
const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

export default function SpendListPage() {
  return (
    <div className='flex flex-col h-screen w-full px-5 py-5'>
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
        <div className='flex flex-col gap-4 pb-32'>
          {sortedDates.map((date) => (
            <div key={date}>
              <Text className='text-sm font-[500] mb-1.5 text-[#909090]'>
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

      <div className='mt-15 w-full mb-24'>
        <Title tag='h2' className='text-2xl font-[500] mb-4 ml-1.5'>
          6월 소비 내역
        </Title>
      </div>
    </div>
  );
}
