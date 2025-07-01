'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { getThisYearMonth } from '../utils/income';

const getMonthes = (thisMonth: string) => {
  const monthes = [];
  for (let i = 1; i <= +thisMonth; i++) {
    monthes.push(`${i}월`);
  }
  return monthes;
};

export function MonthToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const thisYearMonth = getThisYearMonth();

  const month = thisYearMonth.slice(5, 7);

  const monthes = getMonthes(month);

  const currentMonth = searchParams.get('month') || `${month}`;

  const handleChange = (newMonth: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('month', newMonth.slice(0, newMonth.length - 1));
    router.push(`?${params.toString()}`);
  };

  return (
    <select
      value={`${+currentMonth}월`}
      onChange={(e) => handleChange(e.target.value)}
      className='border rounded px-2 py-1'
    >
      {monthes.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}
